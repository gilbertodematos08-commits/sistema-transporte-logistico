import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { supabase } from '../utils/supabase'
import Modal from '../components/Modal'

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    cnh: '',
    telefone: '',
    email: '',
    status: 'disponivel'
  })

  useEffect(() => {
    loadMotoristas()
  }, [])

  const loadMotoristas = async () => {
    try {
      const { data, error } = await supabase
        .from('motoristas')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMotoristas(data || [])
    } catch (error) {
      console.error('Erro ao carregar motoristas:', error)
      alert('Erro ao carregar motoristas')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingId) {
        const { error } = await supabase
          .from('motoristas')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
        alert('Motorista atualizado com sucesso!')
      } else {
        const { error } = await supabase
          .from('motoristas')
          .insert([formData])

        if (error) throw error
        alert('Motorista cadastrado com sucesso!')
      }

      setIsModalOpen(false)
      setEditingId(null)
      setFormData({ nome: '', cpf: '', cnh: '', telefone: '', email: '', status: 'disponivel' })
      loadMotoristas()
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar motorista: ' + error.message)
    }
  }

  const handleEdit = (motorista) => {
    setEditingId(motorista.id)
    setFormData({
      nome: motorista.nome,
      cpf: motorista.cpf,
      cnh: motorista.cnh,
      telefone: motorista.telefone || '',
      email: motorista.email || '',
      status: motorista.status
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este motorista?')) return

    try {
      const { error } = await supabase
        .from('motoristas')
        .delete()
        .eq('id', id)

      if (error) throw error
      alert('Motorista excluído com sucesso!')
      loadMotoristas()
    } catch (error) {
      console.error('Erro ao excluir:', error)
      alert('Erro ao excluir motorista: ' + error.message)
    }
  }

  const filteredMotoristas = motoristas.filter(m =>
    m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.cpf.includes(searchTerm) ||
    m.cnh.includes(searchTerm)
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Motoristas</h1>
          <p className="text-slate-400">Gestão de motoristas cadastrados</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null)
            setFormData({ nome: '', cpf: '', cnh: '', telefone: '', email: '', status: 'disponivel' })
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all"
        >
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
                <th className="text-left py-4 px-4 font-semibold">CPF</th>
                <th className="text-left py-4 px-4 font-semibold">CNH</th>
                <th className="text-left py-4 px-4 font-semibold">Telefone</th>
                <th className="text-left py-4 px-4 font-semibold">Status</th>
                <th className="text-right py-4 px-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMotoristas.map((motorista) => (
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
                      <button 
                        onClick={() => handleEdit(motorista)}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(motorista.id)}
                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                      >
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Editar Motorista' : 'Novo Motorista'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome *</label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">CPF *</label>
              <input
                type="text"
                required
                value={formData.cpf}
                onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CNH *</label>
              <input
                type="text"
                required
                value={formData.cnh}
                onChange={(e) => setFormData({...formData, cnh: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="text"
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="disponivel">Disponível</option>
              <option value="em_viagem">Em Viagem</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all"
            >
              {editingId ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}