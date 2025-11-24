import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Motoristas from './pages/Motoristas'
import Veiculos from './pages/Veiculos'
import Clientes from './pages/Clientes'
import Viagens from './pages/Viagens'
import Programacao from './pages/Programacao'
import Oficina from './pages/Oficina'
import Sidebar from './components/Sidebar'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Simples verificação de autenticação (pode ser melhorada com Supabase Auth)
    const authStatus = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(authStatus === 'true')
  }, [])

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true')
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar onLogout={handleLogout} />
        <main className="flex-1 p-8 ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/motoristas" element={<Motoristas />} />
            <Route path="/veiculos" element={<Veiculos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/viagens" element={<Viagens />} />
            <Route path="/programacao" element={<Programacao />} />
            <Route path="/oficina" element={<Oficina />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App