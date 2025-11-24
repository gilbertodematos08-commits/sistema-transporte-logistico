import React from 'react'

export default function StatCard({ title, value, icon: Icon, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    red: 'bg-red-500/20 text-red-400'
  }

  return (
    <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-slate-400 text-sm">{title}</p>
    </div>
  )
}