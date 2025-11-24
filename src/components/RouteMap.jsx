import React from 'react'
import { MapPin } from 'lucide-react'

export default function RouteMap({ origin, destination, distance, duration }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-blue-400" size={24} />
        <h3 className="text-xl font-bold">Rota</h3>
      </div>

      <div className="aspect-video bg-slate-900 rounded-xl mb-4 flex items-center justify-center">
        <p className="text-slate-500">Mapa será integrado com Google Maps API</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-slate-400">Origem</p>
          <p className="font-semibold">{origin}</p>
        </div>
        <div>
          <p className="text-sm text-slate-400">Destino</p>
          <p className="font-semibold">{destination}</p>
        </div>
        <div>
          <p className="text-sm text-slate-400">Distância</p>
          <p className="font-semibold">{distance}</p>
        </div>
        <div>
          <p className="text-sm text-slate-400">Tempo Estimado</p>
          <p className="font-semibold">{duration}</p>
        </div>
      </div>
    </div>
  )
}