import React from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App'
import './index.css'

export const LISTENING_POST_URL = 'https://script.google.com/macros/s/AKfycbxjCAL4h7o2mzToxKglPX3mNjzah8b4RnsuE_MBtqBINVawlD0eMvhzALITdgMSqtJKsA/exec'

const root = document.getElementById('root')
createRoot(root).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
)
