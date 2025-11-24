import React from 'react'
import { Truck } from 'lucide-react'

export default function Login({ onLogin }) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="glass rounded-3xl p-12 w-full max-w-md shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <Truck className="w-16 h-16 text-blue-400 mb-4" />
          <h1 className="text-3xl font-bold text-white">Sistema de Transporte</h1>
          <p className="text-slate-400 mt-2">Logística Premium</p>
        </div>

        <button
          onClick={onLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
        >
          ENTRAR NO SISTEMA
        </button>
      </div>
    </div>
  )
}