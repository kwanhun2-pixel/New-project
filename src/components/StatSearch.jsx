import React, { useState, useCallback } from 'react'
import { searchStatTables, CYCLE_LABELS } from '../api/ecos'

export default function StatSearch({ apiKey, onSelectStat }) {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = useCallback(async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSearched(true)
    try {
      const rows = await searchStatTables(keyword, apiKey)
      setResults(rows)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [keyword, apiKey])

  return (
    <section className="card stat-search">
      <h2 className="section-title">통계표 검색</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="통계명 검색 (예: 물가, GDP, 금리, 환율...)"
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '검색 중...' : '검색'}
        </button>
      </form>

      {error && <div className="error-msg">{error}</div>}

      {searched && !loading && results.length === 0 && (
        <div className="empty-msg">검색 결과가 없습니다.</div>
      )}

      {results.length > 0 && (
        <div className="search-results">
          <p className="result-count">총 {results.length}개 통계표</p>
          <div className="result-table-wrap">
            <table className="result-table">
              <thead>
                <tr>
                  <th>통계표명</th>
                  <th>통계코드</th>
                  <th>주기</th>
                  <th>수록기간</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <tr key={i}>
                    <td className="stat-name-cell">{row.STAT_NAME}</td>
                    <td className="code-cell">{row.STAT_CODE}</td>
                    <td>
                      <span className="cycle-badge">
                        {CYCLE_LABELS[row.CYCLE] || row.CYCLE}
                      </span>
                    </td>
                    <td className="period-cell">
                      {row.START_TIME} ~ {row.END_TIME}
                    </td>
                    <td>
                      <button
                        className="btn-select"
                        onClick={() => onSelectStat(row)}
                      >
                        조회
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
