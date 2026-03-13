import React, { useEffect, useState } from 'react'
import { getKeyStats } from '../api/ecos'

export default function KeyStats({ apiKey }) {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getKeyStats(apiKey)
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [apiKey])

  if (loading) return <div className="card loading-card">주요지표 불러오는 중...</div>
  if (error) return <div className="card error-card">{error}</div>

  const highlight = stats.slice(0, 8)

  return (
    <section className="key-stats">
      <h2 className="section-title">주요 경제지표</h2>
      <div className="key-stats-grid">
        {highlight.map((item, i) => (
          <div key={i} className="kstat-card">
            <div className="kstat-name">{item.KEYSTAT_NAME}</div>
            <div className="kstat-value">
              {Number(item.DATA_VALUE).toLocaleString()}
              <span className="kstat-unit">{item.UNIT_NAME}</span>
            </div>
            <div className="kstat-date">{item.TIME} 기준</div>
          </div>
        ))}
      </div>
    </section>
  )
}
