/**
 * 한국은행 ECOS Open API 연동 모듈
 * API 문서: https://ecos.bok.or.kr/api/#/
 *
 * API Key는 https://ecos.bok.or.kr 에서 무료 발급 가능합니다.
 * 개발/테스트용 샘플 키: sample (일부 데이터만 조회 가능)
 */

const BASE_URL = '/api/ecos'
const DEFAULT_KEY = import.meta.env.VITE_ECOS_API_KEY || 'sample'

function buildUrl(service, apiKey, params) {
  const key = apiKey || DEFAULT_KEY
  const parts = [BASE_URL, service, key, 'json', '1.0', ...params]
  return parts.join('/')
}

async function fetchEcos(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()

  const root = data[Object.keys(data)[0]]
  if (root?.RESULT) {
    throw new Error(`API 오류: ${root.RESULT.MESSAGE} (코드: ${root.RESULT.CODE})`)
  }
  return root
}

/**
 * 통계 목록 검색
 * @param {string} keyword - 검색 키워드 (빈값이면 전체)
 * @param {string} apiKey
 */
export async function searchStatTables(keyword = '', apiKey) {
  const params = ['1', '100', keyword]
  const url = buildUrl('StatisticTableList', apiKey, params)
  const data = await fetchEcos(url)
  return data?.row || []
}

/**
 * 통계 항목 목록 조회
 * @param {string} statCode - 통계표 코드
 * @param {string} apiKey
 */
export async function getStatItems(statCode, apiKey) {
  const params = ['1', '200', statCode]
  const url = buildUrl('StatisticItemList', apiKey, params)
  const data = await fetchEcos(url)
  return data?.row || []
}

/**
 * 통계 데이터 조회
 * @param {object} params
 * @param {string} params.statCode - 통계표 코드
 * @param {string} params.cycle   - 주기 (A/Q/M/D/S)
 * @param {string} params.startDate - 시작일 (예: 202001)
 * @param {string} params.endDate   - 종료일 (예: 202312)
 * @param {string} params.itemCode1 - 항목코드1
 * @param {string} params.itemCode2 - 항목코드2 (선택)
 * @param {string} params.itemCode3 - 항목코드3 (선택)
 * @param {string} params.itemCode4 - 항목코드4 (선택)
 * @param {string} apiKey
 */
export async function getStatData({ statCode, cycle, startDate, endDate, itemCode1, itemCode2 = '?', itemCode3 = '?', itemCode4 = '?' }, apiKey) {
  const params = ['1', '10000', statCode, cycle, startDate, endDate, itemCode1, itemCode2, itemCode3, itemCode4]
  const url = buildUrl('StatisticSearch', apiKey, params)
  const data = await fetchEcos(url)
  return {
    rows: data?.row || [],
    totalCount: data?.list_total_count || 0,
  }
}

/**
 * 주요지표 조회
 * @param {string} apiKey
 */
export async function getKeyStats(apiKey) {
  const params = ['1', '100']
  const url = buildUrl('KeyStatisticList', apiKey, params)
  const data = await fetchEcos(url)
  return data?.row || []
}

/**
 * M0/M1/M2 통화량 조회 (최근 월 기준)
 * @param {string} apiKey
 */
export async function getMoneySupply(apiKey) {
  const now = new Date()
  // 최신 데이터 확보를 위해 14개월 전부터 현재까지 조회 후 최신 값 추출
  const endYear = now.getFullYear()
  const startYear = endYear - 1
  const endMonth = String(now.getMonth() + 1).padStart(2, '0')
  const startDate = `${startYear}01`
  const endDate = `${endYear}${endMonth}`

  const queries = [
    { label: '본원통화(M0)', statCode: '101Y004', itemCode1: 'BBKA00' },
    { label: '협의통화(M1)', statCode: '101Y002', itemCode1: 'BBJA00' },
    { label: '광의통화(M2)', statCode: '101Y003', itemCode1: 'BBJA00' },
  ]

  const results = await Promise.all(
    queries.map(async ({ label, statCode, itemCode1 }) => {
      try {
        const { rows } = await getStatData(
          { statCode, cycle: 'M', startDate, endDate, itemCode1 },
          apiKey
        )
        const latest = rows[rows.length - 1]
        return latest ? { label, value: latest.DATA_VALUE, time: latest.TIME, unit: latest.UNIT_NAME } : null
      } catch {
        return null
      }
    })
  )

  return results.filter(Boolean)
}

/**
 * 통계 용어 검색
 * @param {string} keyword
 * @param {string} apiKey
 */
export async function searchTerms(keyword, apiKey) {
  const params = ['1', '50', keyword]
  const url = buildUrl('StatisticWord', apiKey, params)
  const data = await fetchEcos(url)
  return data?.row || []
}

// 주기(Cycle) 한국어 매핑
export const CYCLE_LABELS = {
  A: '연간',
  Q: '분기',
  M: '월간',
  D: '일간',
  S: '반기',
}

// 기본 주요 통계표 목록 (즐겨찾기용)
export const POPULAR_STATS = [
  { code: '200Y001', name: '국내총생산(GDP)', cycle: 'A', item: '1400' },
  { code: '200Y002', name: '1인당 GNI', cycle: 'A', item: '1070' },
  { code: '021Y125', name: '소비자물가지수', cycle: 'M', item: '*' },
  { code: '722Y001', name: '원/달러 환율', cycle: 'M', item: '0000001' },
  { code: '028Y009', name: '기준금리', cycle: 'M', item: '7020000' },
  { code: '403Y001', name: '실업률', cycle: 'M', item: 'I61B' },
]
