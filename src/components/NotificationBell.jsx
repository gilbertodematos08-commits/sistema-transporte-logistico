import React, { useState } from 'react'
import { Bell } from 'lucide-react'

export default function NotificationBell() {
  const [notifications] = useState([
    { id: 1, message: 'Viagem #123 iniciada', time: '5 min atrás' },
    { id: 2, message: 'Manutenção ABC-1234 concluída', time: '1h atrás' },
    { id: 3, message: 'Novo cliente cadastrado', time: '2h atrás' },
  ])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-slate-800 rounded-xl transition-colors"
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 glass rounded-2xl shadow-2xl p-4 z-50">
          <h3 className="font-bold mb-4">Notificações</h3>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="p-3 hover:bg-slate-700/50 rounded-xl cursor-pointer">
                <p className="text-sm">{notif.message}</p>
                <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}