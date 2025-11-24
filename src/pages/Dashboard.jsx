import React, { useEffect, useState } from 'react'
import { Truck, Users, Package, Activity } from 'lucide-react'
import StatCard from '../components/StatCard'

export default function Dashboard() {
  const [stats, setStats] = useState({
    motoristasDisponiveis: 0,
    motoristasEmViagem: 0,
    veiculosDisponiveis: 0,
    veiculosEmUso: 0,
    viagensHoje: 0,
    viagensAndamento: 0
  })

  useEffect(() => {
    // Simula dados (integrar com Supabase depois)
    setStats({
      motoristasDisponiveis: 12,
      motoristasEmViagem: 8,
      veiculosDisponiveis: 15,
      veiculosEmUso: 9,
      viagensHoje: 23,
      viagensAndamento: 14
    })
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400">Visão geral do sistema de transporte</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Motoristas Disponíveis"
          value={stats.motoristasDisponiveis}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Motoristas em Viagem"
          value={stats.motoristasEmViagem}
          icon={Activity}
          color="blue"
        />
        <StatCard
          title="Veículos Disponíveis"
          value={stats.veiculosDisponiveis}
          icon={Truck}
          color="green"
        />
        <StatCard
          title="Veículos em Uso"
          value={stats.veiculosEmUso}
          icon={Truck}
          color="yellow"
        />
        <StatCard
          title="Viagens Hoje"
          value={stats.viagensHoje}
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Viagens em Andamento"
          value={stats.viagensAndamento}
          icon={Activity}
          color="yellow"
        />
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Viagens Recentes</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-hover rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">Viagem #{i}</p>
                <p className="text-sm text-slate-400">São Paulo → Rio de Janeiro</p>
              </div>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                Em andamento
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}