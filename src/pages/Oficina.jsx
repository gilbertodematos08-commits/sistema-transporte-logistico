import React, { useState } from 'react'
import { Plus, Wrench, AlertTriangle } from 'lucide-react'

export default function Oficina() {
  const [manutencoes, setManutencoes] = useState([
    { id: 1, veiculo: 'ABC-1234', tipo: 'Preventiva', descricao: 'Troca de óleo', status: 'em_andamento', entrada: '2025-11-23' },
    { id: 2, veiculo: 'DEF-5678', tipo: 'Corretiva', descricao: 'Reparo de freios', status: 'pendente', entrada: '2025-11-24' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Oficina</h1>
          <p className="text-slate-400">Gestão de manutenções e reparos</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all">
          <Plus size={20} />
          Nova Manutenção
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <AlertTriangle className="text-yellow-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold">2</p>
              <p className="text-slate-400 text-sm">Pendentes</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Wrench className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold">3</p>
              <p className="text-slate-400 text-sm">Em Andamento</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Wrench className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold">15</p>
              <p className="text-slate-400 text-sm">Concluídas (mês)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">Manutenções Ativas</h2>
        <div className="space-y-4">
          {manutencoes.map((manutencao) => (
            <div key={manutencao.id} className="glass-hover rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{manutencao.veiculo}</h3>
                  <p className="text-slate-400">{manutencao.tipo} • {manutencao.entrada}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  manutencao.status === 'pendente' ? 'bg-yellow-500/20 text-yellow-400' :
                  manutencao.status === 'em_andamento' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {manutencao.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-slate-300 mb-4">{manutencao.descricao}</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                  Ver Detalhes
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors">
                  Concluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}