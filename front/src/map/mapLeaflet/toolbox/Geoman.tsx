import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import { useRef } from 'react';
import { FeatureGroup, useMapEvents } from 'react-leaflet'
import { GeomanControls } from 'react-leaflet-geoman-v2';

export const Geoman = () => {
    const featureGroupRef: any = useRef();
  return (
    <>
        <FeatureGroup ref={featureGroupRef}>
           <GeomanControls
            options={{
                position: 'bottomleft',
                drawText: true,
                cutPolygon: true,
                drawMarker: true,
                drawPolygon: true,
                drawControls: true,
                editControls: true,
                drawCircle: false,
                drawCircleMarker: false,
                drawPolyline: true,
                editMode: false,
                dragMode: true,
                customControls: true,
              }}
              lang='es'
              globalOptions={{
                continueDrawing: false,
                editable: false,
                allowEditing:true
              }}     
            //   onDrawEnd={handleDragEnd}
            //   onDrag={handleDrag}
              />
        </FeatureGroup>
      </>
  )
}
