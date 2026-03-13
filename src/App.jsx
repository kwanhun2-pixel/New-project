import React, { useState } from 'react'
import Header from './components/Header'
import KeyStats from './components/KeyStats'
import StatSearch from './components/StatSearch'
import StatViewer from './components/StatViewer'
import './App.css'

export default function App() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_ECOS_API_KEY || '')
  const [selectedStat, setSelectedStat] = useState(null)

  return (
    <div className="app">
      <Header apiKey={apiKey} onApiKeyChange={setApiKey} />

      <main className="main-content">
        <KeyStats apiKey={apiKey} />

        <StatSearch apiKey={apiKey} onSelectStat={setSelectedStat} />

        {selectedStat && (
          <StatViewer
            key={selectedStat.STAT_CODE}
            stat={selectedStat}
            apiKey={apiKey}
            onClose={() => setSelectedStat(null)}
          />
        )}
      </main>

      <footer className="footer">
        <p>
          데이터 출처: <a href="https://ecos.bok.or.kr" target="_blank" rel="noopener noreferrer">
            한국은행 경제통계시스템(ECOS)
          </a>
          &nbsp;|&nbsp;
          <a href="https://ecos.bok.or.kr/api/#/" target="_blank" rel="noopener noreferrer">
            Open API 문서
          </a>
        </p>
      </footer>
    </div>
  )
}
