import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from "@chakra-ui/react";
import "react-multi-carousel/lib/styles.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider >
      <App />
    </ChakraProvider>
  </StrictMode>,
)
