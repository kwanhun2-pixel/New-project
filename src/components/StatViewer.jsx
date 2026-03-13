import React, { useState, useEffect, useCallback } from 'react'
import { getStatItems, getStatData, CYCLE_LABELS } from '../api/ecos'
import StatChart from './StatChart'

function getDefaultDates(cycle) {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  if (cycle === 'A') return { start: String(y - 10), end: String(y) }
  if (cycle === 'Q') return { start: `${y - 5}Q1`, end: `${y}Q${Math.ceil((now.getMonth() + 1) / 3)}` }
  if (cycle === 'D') return { start: `${y}0101`, end: `${y}${m}${String(now.getDate()).padStart(2, '0')}` }
  return { start: `${y - 3}${m}`, end: `${y}${m}` }
}

export default function StatViewer({ stat, apiKey, onClose }) {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [dates, setDates] = useState(() => getDefaultDates(stat.CYCLE))
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('chart') // 'chart' | 'table'

  useEffect(() => {
    getStatItems(stat.STAT_CODE, apiKey)
      .then((rows) => {
        setItems(rows)
        if (rows.length > 0) setSelectedItem(rows[0])
      })
      .catch(() => {})
  }, [stat.STAT_CODE, apiKey])

  const fetchData = useCallback(async () => {
    if (!selectedItem) return
    setLoading(true)
    setError(null)
    try {
      const result = await getStatData({
        statCode: stat.STAT_CODE,
        cycle: stat.CYCLE,
        startDate: dates.start.replace(/\D/g, ''),
        endDate: dates.end.replace(/\D/g, ''),
        itemCode1: selectedItem.ITEM_CODE1 || '?',
        itemCode2: selectedItem.ITEM_CODE2 || '?',
        itemCode3: selectedItem.ITEM_CODE3 || '?',
        itemCode4: selectedItem.ITEM_CODE4 || '?',
      }, apiKey)
      setData(result.rows)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [stat, selectedItem, dates, apiKey])

  useEffect(() => {
    if (selectedItem) fetchData()
  }, [selectedItem])

  const unitName = data[0]?.UNIT_NAME || ''

  return (
    <div className="stat-viewer card">
      <div className="viewer-header">
        <div>
          <h2 className="viewer-title">{stat.STAT_NAME}</h2>
          <span className="viewer-meta">
            코드: {stat.STAT_CODE} &nbsp;|&nbsp;
            주기: {CYCLE_LABELS[stat.CYCLE] || stat.CYCLE} &nbsp;|&nbsp;
            수록기간: {stat.START_TIME} ~ {stat.END_TIME}
          </span>
        </div>
        <button className="btn-close" onClick={onClose}>✕ 닫기</button>
      </div>

      <div className="viewer-controls">
        {items.length > 0 && (
          <div className="control-group">
            <label>항목 선택</label>
            <select
              value={selectedItem?.ITEM_CODE1 || ''}
              onChange={(e) => {
                const found = items.find((it) => it.ITEM_CODE1 === e.target.value)
                setSelectedItem(found || null)
              }}
            >
              {items.map((it, i) => (
                <option key={i} value={it.ITEM_CODE1}>
                  {it.ITEM_NAME1}{it.ITEM_NAME2 ? ` > ${it.ITEM_NAME2}` : ''}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="control-group">
          <label>시작</label>
          <input
            type="text"
            value={dates.start}
            onChange={(e) => setDates((d) => ({ ...d, start: e.target.value }))}
            placeholder="예: 202001"
          />
        </div>
        <div className="control-group">
          <label>종료</label>
          <input
            type="text"
            value={dates.end}
            onChange={(e) => setDates((d) => ({ ...d, end: e.target.value }))}
            placeholder="예: 202312"
          />
        </div>
        <button className="btn-primary" onClick={fetchData} disabled={loading}>
          {loading ? '조회 중...' : '조회'}
        </button>
        <div className="view-toggle">
          <button
            className={viewMode === 'chart' ? 'active' : ''}
            onClick={() => setViewMode('chart')}
          >차트</button>
          <button
            className={viewMode === 'table' ? 'active' : ''}
            onClick={() => setViewMode('table')}
          >표</button>
        </div>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {!loading && data.length === 0 && !error && (
        <div className="empty-msg">데이터가 없습니다. 조회 기간이나 항목을 확인해주세요.</div>
      )}

      {loading && <div className="loading-msg">데이터를 불러오는 중입니다...</div>}

      {!loading && data.length > 0 && (
        <>
          {viewMode === 'chart' && (
            <StatChart data={data} title={stat.STAT_NAME} unit={unitName} />
          )}
          {viewMode === 'table' && (
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>시점</th>
                    <th>항목명</th>
                    <th>값 ({unitName})</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i}>
                      <td>{row.TIME}</td>
                      <td>{row.ITEM_NAME1}{row.ITEM_NAME2 ? ` > ${row.ITEM_NAME2}` : ''}</td>
                      <td className="value-cell">
                        {row.DATA_VALUE !== null && row.DATA_VALUE !== ''
                          ? Number(row.DATA_VALUE).toLocaleString()
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="download-bar">
            <button className="btn-outline" onClick={() => downloadCSV(data, stat.STAT_NAME)}>
              CSV 다운로드
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function downloadCSV(data, name) {
  const headers = ['시점', '항목1', '항목2', '값', '단위']
  const rows = data.map((r) => [
    r.TIME, r.ITEM_NAME1 || '', r.ITEM_NAME2 || '',
    r.DATA_VALUE, r.UNIT_NAME,
  ])
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${name}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
