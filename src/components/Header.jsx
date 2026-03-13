import React from 'react'

export default function Header({ apiKey, onApiKeyChange }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <span className="logo-mark">BOK</span>
          <div>
            <h1 className="header-title">한국은행 통계 뷰어</h1>
            <p className="header-sub">ECOS 경제통계시스템 연계</p>
          </div>
        </div>
        <div className="header-key">
          <label htmlFor="apiKey">API Key</label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="발급받은 API Key 입력 (미입력시 sample)"
            className="key-input"
          />
          <a
            href="https://ecos.bok.or.kr/api/#/user/join"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            키 발급
          </a>
        </div>
      </div>
    </header>
  )
}
