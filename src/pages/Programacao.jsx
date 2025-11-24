import React, { useState } from 'react'
import { Calendar, Clock, Filter } from 'lucide-react'
import TripTimer from '../components/TripTimer'

export default function Programacao() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [viagens, setViagens] = useState([
    { id: 1, motorista: 'João Silva', veiculo: 'ABC-1234', rota: 'SP → RJ', horario: '08:00', duracao: 360 },
    { id: 2, motorista: 'Maria Santos', veiculo: 'DEF-5678', rota: 'BH → SSA', horario: '06:00', duracao: 720 },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Programação</h1>
        <p className="text-slate-400">Agenda e cronogramas de viagens</p>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-blue-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-800/50 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-700 rounded-xl transition-colors">
            <Filter size={20} />
            Filtros
          </button>
        </div>

        <div className="space-y-4">
          {viagens.map((viagem) => (
            <div key={viagem.id} className="glass-hover rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{viagem.motorista}</h3>
                  <p className="text-slate-400">{viagem.veiculo} • {viagem.rota}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-blue-400" />
                  <span className="text-lg">{viagem.horario}</span>
                </div>
              </div>

              <TripTimer durationMinutes={viagem.duracao} />

              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                    Iniciar Viagem
                  </button>
                  <button className="px-4 py-2 hover:bg-slate-700 rounded-lg transition-colors">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}