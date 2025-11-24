import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { supabase } from '../utils/supabase'
import Modal from '../components/Modal'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    cnpj_cpf: '',
    telefone: '',
    email: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  })

  useEffect(() => {
    loadClientes()
  }, [])

  const loadClientes = async () => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setClientes(data || [])
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
      alert('Erro ao carregar clientes')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingId) {
        const { error } = await supabase
          .from('clientes')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
        alert('Cliente atualizado com sucesso!')
      } else {
        const { error } = await supabase
          .from('clientes')
          .insert([formData])

        if (error) throw error
        alert('Cliente cadastrado com sucesso!')
      }

      setIsModalOpen(false)
      setEditingId(null)
      resetForm()
      loadClientes()
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar cliente: ' + error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      cnpj_cpf: '',
      telefone: '',
      email: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    })
  }

  const handleEdit = (cliente) => {
    setEditingId(cliente.id)
    setFormData({
      nome: cliente.nome,
      cnpj_cpf: cliente.cnpj_cpf,
      telefone: cliente.telefone || '',
      email: cliente.email || '',
      endereco: cliente.endereco || '',
      cidade: cliente.cidade || '',
      estado: cliente.estado || '',
      cep: cliente.cep || ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return

    try {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id)

      if (error) throw error
      alert('Cliente excluído com sucesso!')
      loadClientes()
    } catch (error) {
      console.error('Erro ao excluir:', error)
      alert('Erro ao excluir cliente: ' + error.message)
    }
  }

  const filteredClientes = clientes.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cnpj_cpf.includes(searchTerm) ||
    (c.cidade && c.cidade.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-2xl">Carregando...</div></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Clientes</h1>
          <p className="text-slate-400">Gestão de clientes cadastrados</p>
        </div>
        <button 
          onClick={() => { resetForm(); setEditingId(null); setIsModalOpen(true) }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all"
        >
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4 px-4">{cliente.nome}</td>
                  <td className="py-4 px-4 text-slate-400">{cliente.cnpj_cpf}</td>
                  <td className="py-4 px-4 text-slate-400">{cliente.telefone}</td>
                  <td className="py-4 px-4 text-slate-400">{cliente.cidade}/{cliente.estado}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(cliente)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(cliente.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Cliente' : 'Novo Cliente'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome *</label>
            <input type="text" required value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">CNPJ/CPF *</label>
              <input type="text" required value={formData.cnpj_cpf} onChange={(e) => setFormData({...formData, cnpj_cpf: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input type="text" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Endereço</label>
            <input type="text" value={formData.endereco} onChange={(e) => setFormData({...formData, endereco: e.target.value})}
              className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Cidade</label>
              <input type="text" value={formData.cidade} onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Estado</label>
              <input type="text" maxLength={2} value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value.toUpperCase()})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CEP</label>
              <input type="text" value={formData.cep} onChange={(e) => setFormData({...formData, cep: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-all">
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all">
              {editingId ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}