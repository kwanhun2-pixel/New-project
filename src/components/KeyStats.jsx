import React, { useEffect, useState } from 'react'
import { getKeyStats, getMoneySupply } from '../api/ecos'

export default function KeyStats({ apiKey }) {
  const [stats, setStats] = useState([])
  const [moneySupply, setMoneySupply] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([getKeyStats(apiKey), getMoneySupply(apiKey)])
      .then(([s, m]) => {
        setStats(s)
        setMoneySupply(m)
      })
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

      {moneySupply.length > 0 && (
        <>
          <h3 className="section-subtitle">통화량</h3>
          <div className="key-stats-grid">
            {moneySupply.map((item, i) => (
              <div key={i} className="kstat-card kstat-money">
                <div className="kstat-name">{item.label}</div>
                <div className="kstat-value">
                  {Number(item.value).toLocaleString()}
                  <span className="kstat-unit">{item.unit}</span>
                </div>
                <div className="kstat-date">{item.time} 기준</div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
