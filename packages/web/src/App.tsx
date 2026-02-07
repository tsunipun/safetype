import { useState, useMemo } from 'react'
import { Detector } from '@safetype/core'
import './App.css'

function App() {
  const [text, setText] = useState("Here is my secret api key: sk-1234567890abcdef1234567890abcdef")

  const detector = useMemo(() => new Detector(), [])

  const results = useMemo(() => {
    return detector.scan(text)
  }, [text, detector])

  return (
    <div className="container">
      <h1>SafeType Demo</h1>
      <p>Type below to detect sensitive info locally.</p>

      <div className="editor-container">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Paste text here..."
        />
      </div>

      <div className="results">
        <h2>Detections ({results.length})</h2>
        {results.length === 0 ? (
          <div className="empty-state">No sensitive data found.</div>
        ) : (
          <div className="results-list">
            {results.map((r, i) => (
              <div key={i} className={`result-card ${r.type.toLowerCase()}`}>
                <div className="result-header">
                  <span className="badge">{r.type}</span>
                  <span className="confidence">{(r.confidence * 100).toFixed(0)}% confidence</span>
                </div>
                <p className="message">{r.message}</p>
                <code className="match">{r.match}</code>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
