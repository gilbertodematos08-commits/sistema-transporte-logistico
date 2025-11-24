import React, { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState([
    { id: 1, placa: 'ABC-1234', modelo: 'Scania R450', marca: 'Scania', tipo: 'caminhao', status: 'disponivel', capacidade: 25000 },
    { id: 2, placa: 'DEF-5678', modelo: 'Mercedes Actros', marca: 'Mercedes', tipo: 'carreta', status: 'em_uso', capacidade: 40000 },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Veículos</h1>
          <p className="text-slate-400">Gestão de frota de veículos</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all">
          <Plus size={20} />
          Novo Veículo
        </button>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar veículo..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-4 font-semibold">Placa</th>
                <th className="text-left py-4 px-4 font-semibold">Modelo</th>
                <th className="text-left py-4 px-4 font-semibold">Marca</th>
                <th className="text-left py-4 px-4 font-semibold">Tipo</th>
                <th className="text-left py-4 px-4 font-semibold">Capacidade</th>
                <th className="text-left py-4 px-4 font-semibold">Status</th>
                <th className="text-right py-4 px-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {veiculos.map((veiculo) => (
                <tr key={veiculo.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-semibold">{veiculo.placa}</td>
                  <td className="py-4 px-4">{veiculo.modelo}</td>
                  <td className="py-4 px-4 text-slate-400">{veiculo.marca}</td>
                  <td className="py-4 px-4 text-slate-400">{veiculo.tipo}</td>
                  <td className="py-4 px-4 text-slate-400">{veiculo.capacidade} kg</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      veiculo.status === 'disponivel' ? 'bg-green-500/20 text-green-400' :
                      veiculo.status === 'em_uso' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {veiculo.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}