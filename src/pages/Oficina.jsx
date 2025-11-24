import React, { useState, useEffect } from 'react'
import { Plus, Wrench, AlertTriangle, Check } from 'lucide-react'
import { supabase } from '../utils/supabase'
import Modal from '../components/Modal'

export default function Oficina() {
  const [manutencoes, setManutencoes] = useState([])
  const [veiculos, setVeiculos] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    veiculo_id: '',
    tipo: '',
    descricao: '',
    custo: '',
    status: 'pendente'
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [manutencoesRes, veiculosRes] = await Promise.all([
        supabase.from('manutencoes').select('*, veiculos(placa, modelo)').order('created_at', { ascending: false }),
        supabase.from('veiculos').select('id, placa, modelo')
      ])

      if (manutencoesRes.error) throw manutencoesRes.error

      setManutencoes(manutencoesRes.data || [])
      setVeiculos(veiculosRes.data || [])
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
      if (editingId) {
        const { error } = await supabase.from('manutencoes').update(formData).eq('id', editingId)
        if (error) throw error
        alert('Manutenção atualizada com sucesso!')
      } else {
        const { error } = await supabase.from('manutencoes').insert([formData])
        if (error) throw error
        alert('Manutenção cadastrada com sucesso!')
      }

      setIsModalOpen(false)
      setEditingId(null)
      resetForm()
      loadData()
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar manutenção: ' + error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      veiculo_id: '',
      tipo: '',
      descricao: '',
      custo: '',
      status: 'pendente'
    })
  }

  const handleEdit = (manutencao) => {
    setEditingId(manutencao.id)
    setFormData({
      veiculo_id: manutencao.veiculo_id,
      tipo: manutencao.tipo,
      descricao: manutencao.descricao || '',
      custo: manutencao.custo || '',
      status: manutencao.status
    })
    setIsModalOpen(true)
  }

  const handleConcluir = async (id) => {
    if (!confirm('Marcar esta manutenção como concluída?')) return

    try {
      const { error } = await supabase
        .from('manutencoes')
        .update({ 
          status: 'concluida',
          data_saida: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error
      alert('Manutenção concluída!')
      loadData()
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao concluir manutenção: ' + error.message)
    }
  }

  const stats = {
    pendentes: manutencoes.filter(m => m.status === 'pendente').length,
    em_andamento: manutencoes.filter(m => m.status === 'em_andamento').length,
    concluidas: manutencoes.filter(m => m.status === 'concluida').length
  }

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-2xl">Carregando...</div></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Oficina</h1>
          <p className="text-slate-400">Gestão de manutenções e reparos</p>
        </div>
        <button 
          onClick={() => { resetForm(); setEditingId(null); setIsModalOpen(true) }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all"
        >
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
              <p className="text-3xl font-bold">{stats.pendentes}</p>
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
              <p className="text-3xl font-bold">{stats.em_andamento}</p>
              <p className="text-slate-400 text-sm">Em Andamento</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Check className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.concluidas}</p>
              <p className="text-slate-400 text-sm">Concluídas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">Manutenções</h2>
        <div className="space-y-4">
          {manutencoes.map((manutencao) => (
            <div key={manutencao.id} className="glass-hover rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {manutencao.veiculos?.placa} - {manutencao.veiculos?.modelo}
                  </h3>
                  <p className="text-slate-400">{manutencao.tipo}</p>
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
              {manutencao.custo && (
                <p className="text-slate-400 mb-4">Custo: R$ {parseFloat(manutencao.custo).toFixed(2)}</p>
              )}
              <div className="flex gap-2">
                <button onClick={() => handleEdit(manutencao)}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                  Editar
                </button>
                {manutencao.status !== 'concluida' && (
                  <button onClick={() => handleConcluir(manutencao.id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors">
                    Concluir
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Manutenção' : 'Nova Manutenção'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Veículo *</label>
            <select required value={formData.veiculo_id} onChange={(e) => setFormData({...formData, veiculo_id: e.target.value})}
              className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Selecione...</option>
              {veiculos.map(v => <option key={v.id} value={v.id}>{v.placa} - {v.modelo}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Manutenção *</label>
            <input type="text" required value={formData.tipo} onChange={(e) => setFormData({...formData, tipo: e.target.value})}
              placeholder="Ex: Troca de óleo, Revisão, Reparo de freios"
              className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea value={formData.descricao} onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              rows={3} placeholder="Descreva o problema ou serviço"
              className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Custo (R$)</label>
              <input type="number" step="0.01" value={formData.custo} onChange={(e) => setFormData({...formData, custo: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="pendente">Pendente</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluida">Concluída</option>
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