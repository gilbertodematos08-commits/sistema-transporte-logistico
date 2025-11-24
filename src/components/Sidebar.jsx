import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  Building2, 
  MapPin, 
  Calendar, 
  Wrench,
  LogOut
} from 'lucide-react'

export default function Sidebar({ onLogout }) {
  const location = useLocation()

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/motoristas', icon: Users, label: 'Motoristas' },
    { path: '/veiculos', icon: Truck, label: 'Veículos' },
    { path: '/clientes', icon: Building2, label: 'Clientes' },
    { path: '/viagens', icon: MapPin, label: 'Viagens' },
    { path: '/programacao', icon: Calendar, label: 'Programação' },
    { path: '/oficina', icon: Wrench, label: 'Oficina' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-slate-700/50 p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Truck className="text-blue-400" size={32} />
          <div>
            <h1 className="text-xl font-bold">Transporte</h1>
            <p className="text-xs text-slate-400">Logística Premium</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <button
        onClick={onLogout}
        className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all"
      >
        <LogOut size={20} />
        <span className="font-medium">Sair</span>
      </button>
    </aside>
  )
}