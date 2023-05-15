import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ChakraProvider>
    <App />
    <Toaster/>
    </ChakraProvider>
  </BrowserRouter>
)
