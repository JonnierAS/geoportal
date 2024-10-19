import { Link } from 'react-router-dom'
import maplibreImg from '/maplibre.png'
import leafletImg from '/leaflet.png'

const listOfMaps = [
    {id: 'maplibre', label: 'MapLibre', img: maplibreImg},
    {id: 'mapleaflet', label: 'Leaflet', img: leafletImg},
]

export default function Content() {
  return (
    <div className='mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 xl:h-[390px] h-[320px] p-2 max-w-4xl '>
        {listOfMaps.map((map, index) => (
            <Link key={index} to={`/map/${map.id}`} 
                className='border border-gray-400 rounded px-4 py-2 h-[190px] w-full font-semibold text-gray-600'
                style={{ 
                    backgroundImage: `url(${map.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }} 
            >
                {map.label}
            </Link>
        ))}
    </div>
  )
}
