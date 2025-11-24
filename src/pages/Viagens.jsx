import React, { useState } from 'react'
import { Plus, Edit, Trash2, Search, MapPin } from 'lucide-react'

export default function Viagens() {
  const [viagens, setViagens] = useState([
    { 
      id: 1, 
      motorista: 'João Silva', 
      veiculo: 'ABC-1234', 
      origem: 'São Paulo - SP', 
      destino: 'Rio de Janeiro - RJ',
      distancia: '450 km',
      status: 'em_andamento',
      dataInicio: '2025-11-24 08:00'
    },
    { 
      id: 2, 
      motorista: 'Maria Santos', 
      veiculo: 'DEF-5678', 
      origem: 'Belo Horizonte - MG', 
      destino: 'Salvador - BA',
      distancia: '1.200 km',
      status: 'agendada',
      dataInicio: '2025-11-25 06:00'
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Viagens</h1>
          <p className="text-slate-400">Gestão de viagens e rotas</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all">
          <Plus size={20} />
          Nova Viagem
        </button>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar viagem..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {viagens.map((viagem) => (
            <div key={viagem.id} className="glass-hover rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">Viagem #{viagem.id}</h3>
                  <p className="text-slate-400 text-sm">{viagem.dataInicio}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  viagem.status === 'agendada' ? 'bg-blue-500/20 text-blue-400' :
                  viagem.status === 'em_andamento' ? 'bg-yellow-500/20 text-yellow-400' :
                  viagem.status === 'concluida' ? 'bg-green-500/20 text-green-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {viagem.status.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Motorista</p>
                  <p className="font-semibold">{viagem.motorista}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Veículo</p>
                  <p className="font-semibold">{viagem.veiculo}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <MapPin size={20} className="text-blue-400" />
                <div className="flex-1">
                  <p className="text-sm"><span className="text-green-400">●</span> {viagem.origem}</p>
                  <p className="text-sm"><span className="text-red-400">●</span> {viagem.destino}</p>
                </div>
                <p className="text-slate-400">{viagem.distancia}</p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 hover:bg-slate-700 rounded-lg transition-colors">
                  Ver no Mapa
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                  <Edit size={18} />
                </button>
                <button className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}