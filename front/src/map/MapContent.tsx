import MapLibre from '@/map/mapLibre/MapLibre'
import { useParams } from 'react-router-dom'
import { MapLeaflet } from './mapLeaflet/MapLeaflet'

export default function MapContent() {
  const {id} = useParams()
  return (
    <div>
      {id == 'maplibre' ? (
        <MapLibre />
      ):(
        <MapLeaflet />
      )}
    </div>
  )
}
