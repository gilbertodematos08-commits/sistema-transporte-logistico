import React, { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

export default function Clientes() {
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'Empresa ABC Ltda', cnpj: '12.345.678/0001-90', telefone: '(11) 3000-0000', cidade: 'São Paulo', estado: 'SP' },
    { id: 2, nome: 'Comércio XYZ S.A.', cnpj: '98.765.432/0001-10', telefone: '(21) 4000-0000', cidade: 'Rio de Janeiro', estado: 'RJ' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Clientes</h1>
          <p className="text-slate-400">Gestão de clientes cadastrados</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all">
          <Plus size={20} />
          Novo Cliente
        </button>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-4 font-semibold">Nome</th>
                <th className="text-left py-4 px-4 font-semibold">CNPJ/CPF</th>
                <th className="text-left py-4 px-4 font-semibold">Telefone</th>
                <th className="text-left py-4 px-4 font-semibold">Cidade/Estado</th>
                <th className="text-right py-4 px-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4 px-4">{cliente.nome}</td>
                  <td className="py-4 px-4 text-slate-400">{cliente.cnpj}</td>
                  <td className="py-4 px-4 text-slate-400">{cliente.telefone}</td>
                  <td className="py-4 px-4 text-slate-400">{cliente.cidade}/{cliente.estado}</td>
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