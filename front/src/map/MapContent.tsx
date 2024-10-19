import MapLibre from '@/map/mapLibre/MapLibre'
import { useParams } from 'react-router-dom'

export default function MapContent() {
  const {id} = useParams()
  return (
    <div>
      {id == 'maplibre' ? (
        <MapLibre />
      ):(
        null
      )}
    </div>
  )
}
