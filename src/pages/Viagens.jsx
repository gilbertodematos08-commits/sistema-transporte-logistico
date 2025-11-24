import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, MapPin } from 'lucide-react'
import { supabase } from '../utils/supabase'
import Modal from '../components/Modal'
import RouteMap from '../components/RouteMap'

export default function Viagens() {
  const [viagens, setViagens] = useState([])
  const [motoristas, setMotoristas] = useState([])
  const [veiculos, setVeiculos] = useState([])
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedViagem, setSelectedViagem] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    motorista_id: '',
    veiculo_id: '',
    cliente_id: '',
    origem: '',
    destino: '',
    data_inicio: '',
    distancia_km: '',
    tempo_estimado_minutos: '',
    valor: '',
    status: 'agendada',
    observacoes: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [viagensRes, motoristasRes, veiculosRes, clientesRes] = await Promise.all([
        supabase.from('viagens').select('*, motoristas(nome), veiculos(placa), clientes(nome)').order('created_at', { ascending: false }),
        supabase.from('motoristas').select('id, nome'),
        supabase.from('veiculos').select('id, placa, modelo'),
        supabase.from('clientes').select('id, nome')
      ])

      if (viagensRes.error) throw viagensRes.error

      setViagens(viagensRes.data || [])
      setMotoristas(motoristasRes.data || [])
      setVeiculos(veiculosRes.data || [])
      setClientes(clientesRes.data || [])
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
        motorista_id: formData.motorista_id || null,
        veiculo_id: formData.veiculo_id || null,
        cliente_id: formData.cliente_id || null
      }

      if (editingId) {
        const { error } = await supabase.from('viagens').update(dataToSave).eq('id', editingId)
        if (error) throw error
        alert('Viagem atualizada com sucesso!')
      } else {
        const { error } = await supabase.from('viagens').insert([dataToSave])
        if (error) throw error
        alert('Viagem cadastrada com sucesso!')
      }

      setIsModalOpen(false)
      setEditingId(null)
      resetForm()
      loadData()
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar viagem: ' + error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      motorista_id: '',
      veiculo_id: '',
      cliente_id: '',
      origem: '',
      destino: '',
      data_inicio: '',
      distancia_km: '',
      tempo_estimado_minutos: '',
      valor: '',
      status: 'agendada',
      observacoes: ''
    })
  }

  const handleEdit = (viagem) => {
    setEditingId(viagem.id)
    setFormData({
      motorista_id: viagem.motorista_id || '',
      veiculo_id: viagem.veiculo_id || '',
      cliente_id: viagem.cliente_id || '',
      origem: viagem.origem,
      destino: viagem.destino,
      data_inicio: viagem.data_inicio ? viagem.data_inicio.slice(0, 16) : '',
      distancia_km: viagem.distancia_km || '',
      tempo_estimado_minutos: viagem.tempo_estimado_minutos || '',
      valor: viagem.valor || '',
      status: viagem.status,
      observacoes: viagem.observacoes || ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta viagem?')) return

    try {
      const { error } = await supabase.from('viagens').delete().eq('id', id)
      if (error) throw error
      alert('Viagem excluída com sucesso!')
      loadData()
    } catch (error) {
      console.error('Erro ao excluir:', error)
      alert('Erro ao excluir viagem: ' + error.message)
    }
  }

  const filteredViagens = viagens.filter(v =>
    v.origem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.motoristas && v.motoristas.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-2xl">Carregando...</div></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Viagens</h1>
          <p className="text-slate-400">Gestão de viagens e rotas</p>
        </div>
        <button 
          onClick={() => { resetForm(); setEditingId(null); setIsModalOpen(true) }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all"
        >
          <Plus size={20} />
          Nova Viagem
        </button>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar viagem..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredViagens.map((viagem) => (
            <div key={viagem.id} className="glass-hover rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">Viagem #{viagem.id.slice(0, 8)}</h3>
                  <p className="text-slate-400 text-sm">{viagem.data_inicio ? new Date(viagem.data_inicio).toLocaleString('pt-BR') : 'Sem data'}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  viagem.status === 'agendada' ? 'bg-blue-500/20 text-blue-400' :
                  viagem.status === 'em_andamento' ? 'bg-yellow-500/20 text-yellow-400' :
                  viagem.status === 'concluida' ? 'bg-green-500/20 text-green-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {viagem.status.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Motorista</p>
                  <p className="font-semibold">{viagem.motoristas?.nome || 'Não atribuído'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Veículo</p>
                  <p className="font-semibold">{viagem.veiculos?.placa || 'Não atribuído'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Cliente</p>
                  <p className="font-semibold">{viagem.clientes?.nome || 'Não atribuído'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <MapPin size={20} className="text-blue-400" />
                <div className="flex-1">
                  <p className="text-sm"><span className="text-green-400">●</span> {viagem.origem}</p>
                  <p className="text-sm"><span className="text-red-400">●</span> {viagem.destino}</p>
                </div>
                {viagem.distancia_km && <p className="text-slate-400">{viagem.distancia_km} km</p>}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedViagem(viagem)}
                  className="flex-1 py-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Ver no Mapa
                </button>
                <button onClick={() => handleEdit(viagem)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(viagem.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedViagem && (
        <RouteMap 
          origin={selectedViagem.origem}
          destination={selectedViagem.destino}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Viagem' : 'Nova Viagem'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Motorista</label>
              <select value={formData.motorista_id} onChange={(e) => setFormData({...formData, motorista_id: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Selecione...</option>
                {motoristas.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Veículo</label>
              <select value={formData.veiculo_id} onChange={(e) => setFormData({...formData, veiculo_id: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Selecione...</option>
                {veiculos.map(v => <option key={v.id} value={v.id}>{v.placa} - {v.modelo}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cliente</label>
              <select value={formData.cliente_id} onChange={(e) => setFormData({...formData, cliente_id: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Selecione...</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Origem *</label>
              <input type="text" required value={formData.origem} onChange={(e) => setFormData({...formData, origem: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Destino *</label>
              <input type="text" required value={formData.destino} onChange={(e) => setFormData({...formData, destino: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Data/Hora</label>
              <input type="datetime-local" value={formData.data_inicio} onChange={(e) => setFormData({...formData, data_inicio: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Distância (km)</label>
              <input type="number" value={formData.distancia_km} onChange={(e) => setFormData({...formData, distancia_km: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tempo (min)</label>
              <input type="number" value={formData.tempo_estimado_minutos} onChange={(e) => setFormData({...formData, tempo_estimado_minutos: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Valor (R$)</label>
              <input type="number" step="0.01" value={formData.valor} onChange={(e) => setFormData({...formData, valor: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="agendada">Agendada</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluida">Concluída</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Observações</label>
            <textarea value={formData.observacoes} onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 bg-slate-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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