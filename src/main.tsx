import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ManualCalc from './components/ManualCalc.tsx'
import Layout from './Layout.tsx'


const router = createBrowserRouter([
  {
    path: '/', 
    element: <Layout />,
    children: [
      { index: true ,  element: <App /> },
      { path: '/manual-calculation', element: <ManualCalc /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
