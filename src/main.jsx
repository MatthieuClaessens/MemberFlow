/*
  main.jsx

  Point d'entrée de l'application React.
  - Importe les styles globaux et monte le composant <App/> dans la div#root.
  - StrictMode est activé pour aider à détecter certains problèmes en développement.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
