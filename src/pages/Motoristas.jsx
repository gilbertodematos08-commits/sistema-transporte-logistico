import React, { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState([
    { id: 1, nome: 'João Silva', cpf: '123.456.789-00', cnh: 'AB123456', status: 'disponivel', telefone: '(11) 98765-4321' },
    { id: 2, nome: 'Maria Santos', cpf: '987.654.321-00', cnh: 'CD789012', status: 'em_viagem', telefone: '(11) 91234-5678' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Motoristas</h1>
          <p className="text-slate-400">Gestão de motoristas cadastrados</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all">
          <Plus size={20} />
          Novo Motorista
        </button>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar motorista..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-4 font-semibold">Nome</th>
                <th className="text-left py-4 px-4 font-semibold">CPF</th>
                <th className="text-left py-4 px-4 font-semibold">CNH</th>
                <th className="text-left py-4 px-4 font-semibold">Telefone</th>
                <th className="text-left py-4 px-4 font-semibold">Status</th>
                <th className="text-right py-4 px-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {motoristas.map((motorista) => (
                <tr key={motorista.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4 px-4">{motorista.nome}</td>
                  <td className="py-4 px-4 text-slate-400">{motorista.cpf}</td>
                  <td className="py-4 px-4 text-slate-400">{motorista.cnh}</td>
                  <td className="py-4 px-4 text-slate-400">{motorista.telefone}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      motorista.status === 'disponivel' ? 'bg-green-500/20 text-green-400' :
                      motorista.status === 'em_viagem' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {motorista.status.replace('_', ' ')}
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