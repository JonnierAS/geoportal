import MapLibre from '@/map/mapLibre/MapLibre'
import { useParams } from 'react-router-dom'
import { MapLeaflet } from './mapLeaflet/MapLeaflet'
import { NavContainer } from './navbar/NavContainer'

export default function MapContent() {
  const {id} = useParams()
  return (
    <div>
      <NavContainer />

      {id == 'maplibre' ? (
        <MapLibre />
      ):(
        <MapLeaflet />
      )}
      
    </div>
  )
}
