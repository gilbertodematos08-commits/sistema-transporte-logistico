import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { supabase } from '../utils/supabase'
import Modal from '../components/Modal'

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState([])
  const [motoristas, setMotoristas] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    marca: '',
    ano: new Date().getFullYear(),
    capacidade_kg: '',
    tipo: 'caminhao',
    status: 'disponivel',
    motorista_id: null
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [veiculosRes, motoristasRes] = await Promise.all([
        supabase.from('veiculos').select('*, motoristas(nome)').order('created_at', { ascending: false }),
        supabase.from('motoristas').select('id, nome').eq('status', 'disponivel')
      ])

      if (veiculosRes.error) throw veiculosRes.error
      if (motoristasRes.error) throw motoristasRes.error

      setVeiculos(veiculosRes.data || [])
      setMotoristas(motoristasRes.data || [])
    } catch (error) {
      console.error('Erro ao carregar:', error)
      alert('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const dataToSave = {
        ...formData,
        motorista_id: formData.motorista_id || null
      }

      if (editingId) {
        const { error } = await supabase
          .from('veiculos')
          .update(dataToSave)
          .eq('id', editingId)

        if (error) throw error
        alert('Veículo atualizado com sucesso!')
      } else {
        const { error } = await supabase
          .from('veiculos')
          .insert([dataToSave])

        if (error) throw error
        alert('Veículo cadastrado com sucesso!')
      }

      setIsModalOpen(false)
      setEditingId(null)
      resetForm()
      loadData()
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar veículo: ' + error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      placa: '',
      modelo: '',
      marca: '',
      ano: new Date().getFullYear(),
      capacidade_kg: '',
      tipo: 'caminhao',
      status: 'disponivel',
      motorista_id: null
    })
  }

  const handleEdit = (veiculo) => {
    setEditingId(veiculo.id)
    setFormData({
      placa: veiculo.placa,
      modelo: veiculo.modelo,
      marca: veiculo.marca,
      ano: veiculo.ano,
      capacidade_kg: veiculo.capacidade_kg,
      tipo: veiculo.tipo,
      status: veiculo.status,
      motorista_id: veiculo.motorista_id
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este veículo?')) return

    try {
      const { error } = await supabase.from('veiculos').delete().eq('id', id)
      if (error) throw error
      alert('Veículo excluído com sucesso!')
      loadData()
    } catch (error) {
      console.error('Erro ao excluir:', error)
      alert('Erro ao excluir veículo: ' + error.message)
    }
  }

  const filteredVeiculos = veiculos.filter(v =>
    v.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.marca.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-2xl">Carregando...</div></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Veículos</h1>
          <p className="text-slate-400">Gestão de frota de veículos</p>
        </div>
        <button 
          onClick={() => { resetForm(); setEditingId(null); setIsModalOpen(true) }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all"
        >
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
              {filteredVeiculos.map((veiculo) => (
                <tr key={veiculo.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-semibold">{veiculo.placa}</td>
                  <td className="py-4 px-4">{veiculo.modelo}</td>
                  <td className="py-4 px-4 text-slate-400">{veiculo.marca}</td>
                  <td className="py-4 px-4 text-slate-400">{veiculo.tipo}</td>
                  <td className="py-4 px-4 text-slate-400">{veiculo.capacidade_kg} kg</td>
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
                      <button onClick={() => handleEdit(veiculo)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(veiculo.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Veículo' : 'Novo Veículo'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Placa *</label>
              <input type="text" required value={formData.placa} onChange={(e) => setFormData({...formData, placa: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ano</label>
              <input type="number" value={formData.ano} onChange={(e) => setFormData({...formData, ano: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Modelo *</label>
              <input type="text" required value={formData.modelo} onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Marca *</label>
              <input type="text" required value={formData.marca} onChange={(e) => setFormData({...formData, marca: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo</label>
              <select value={formData.tipo} onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="caminhao">Caminhão</option>
                <option value="van">Van</option>
                <option value="carreta">Carreta</option>
                <option value="utilitario">Utilitário</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Capacidade (kg)</label>
              <input type="number" value={formData.capacidade_kg} onChange={(e) => setFormData({...formData, capacidade_kg: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="disponivel">Disponível</option>
                <option value="em_uso">Em Uso</option>
                <option value="manutencao">Manutenção</option>
              </select>
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