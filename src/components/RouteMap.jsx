import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix para ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function RouteMap({ origin, destination, originCoords, destinationCoords }) {
  // Coordenadas padrão (São Paulo e Rio de Janeiro)
  const defaultOrigin = originCoords || [-23.5505, -46.6333]
  const defaultDestination = destinationCoords || [-22.9068, -43.1729]

  const center = [
    (defaultOrigin[0] + defaultDestination[0]) / 2,
    (defaultOrigin[1] + defaultDestination[1]) / 2
  ]

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4">Mapa da Rota</h3>

      <div className="h-96 rounded-xl overflow-hidden mb-4">
        <MapContainer 
          center={center} 
          zoom={6} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={defaultOrigin}>
            <Popup>{origin || 'Origem'}</Popup>
          </Marker>
          <Marker position={defaultDestination}>
            <Popup>{destination || 'Destino'}</Popup>
          </Marker>
          <Polyline 
            positions={[defaultOrigin, defaultDestination]} 
            color="blue" 
            weight={3}
            opacity={0.7}
          />
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-slate-400">Origem</p>
          <p className="font-semibold">{origin || 'São Paulo - SP'}</p>
        </div>
        <div>
          <p className="text-sm text-slate-400">Destino</p>
          <p className="font-semibold">{destination || 'Rio de Janeiro - RJ'}</p>
        </div>
      </div>
    </div>
  )
}