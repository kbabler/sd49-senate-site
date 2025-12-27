import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App_live'
import './index.css'

export const LISTENING_POST_URL = 'https://script.google.com/macros/s/AKfycbxuxvBAaUcnfYEJXbigmIayuYplHKuC2MXlWdDqKpoNyB2ilOcrJ2j4ej_QJmFb8Ts/exec'

const root = document.getElementById('root')
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
