import React, { useState, useEffect } from 'react'
import { Timer } from 'lucide-react'

export default function TripTimer({ durationMinutes }) {
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const progress = (elapsed / (durationMinutes * 60)) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer size={20} className="text-blue-400" />
          <span className="text-sm text-slate-400">Tempo Estimado: {durationMinutes} min</span>
        </div>
        <span className="text-2xl font-mono font-bold">{formatTime(elapsed)}</span>
      </div>

      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <button
        onClick={() => setIsRunning(!isRunning)}
        className={`w-full py-2 rounded-lg transition-colors ${
          isRunning 
            ? 'bg-red-600 hover:bg-red-500' 
            : 'bg-green-600 hover:bg-green-500'
        }`}
      >
        {isRunning ? 'Pausar' : 'Iniciar'} Cronômetro
      </button>
    </div>
  )
}