import { useRef } from 'react'
import Map, { NavigationControl } from 'react-map-gl/maplibre';
import mapLibregl from 'maplibre-gl';
// @ts-ignore
import {setMapref} from '@/redux/features/mapFeatures'
import { useDispatch } from 'react-redux';
import DrawControl from '@/map/mapLibre/mapbox/MapboxDraw';

const INITIAL_POSITION = {
  latitude: -12.020545729298373,
  longitude: -77.0269319335112,
  zoom: 12
}

export default function MapLibre() {
  const dispatch = useDispatch()
  const mapRef = useRef(null);


  const onLoad = () => {
    dispatch(setMapref(mapRef.current))    
    
  }


  return (
    <>
      <Map
        ref={mapRef}
        // onClick={handleclickSelect}  
        onLoad={onLoad}              
        // onStyleData={onStyleData}
        attributionControl={true}
        initialViewState={{longitude: INITIAL_POSITION.longitude, latitude: INITIAL_POSITION.latitude, zoom: INITIAL_POSITION.zoom}}
        mapLib={mapLibregl}  interactive={true}
        // mapStyle={mapType.source}
        mapStyle={'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'}
        style={{width:  '100vw', height: '100vh'}}

      >  
      <DrawControl position='top-left' />
      <NavigationControl position='bottom-left' />
      </Map>
    </>
  )
}
