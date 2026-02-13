import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// MONGO_URL = mongodb+srv://workbyself778899:workbyself778899@book-store-system.g1t0agi.mongodb.net/?retryWrites=true&w=majority&appName=book-store-system
// PORT=3900
// PASSWORD=sfhb jjzr eowo iaug
// JWT=21mytime
// IMAGEKIT_PRIVATE_KEY=private_tIIMQKZlG8vb1cqZhjWXHtOepZY=
// IMAGEKIT_PUBLIC_KEY=public_PQFtg07DIJDNmpEL8gaPd0iIAXQ=
// IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/zx6p823zj
// TOKEN_SECREAT=mykey23astype
