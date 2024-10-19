import { LatLngExpression } from "leaflet";
import { useRef } from "react";
import { MapContainer, WMSTileLayer, ZoomControl,LayersControl } from "react-leaflet";
import { BaseLayerMap } from "./components/BaseLayerMap";
import { Geoman } from "./toolbox/Geoman";
const { BaseLayer } = LayersControl;
const center: LatLngExpression = [-12.119348084105265, -77.02913761138917];


export const MapLeaflet = () => {
    const mapRef: any = useRef();
  return (
    <>
        <MapContainer
            ref={mapRef}
            center={center}
            zoomControl={false}
            zoom={7}
            scrollWheelZoom={true}
            className="w-screen h-screen"
        >
            <LayersControl position="topright">
                <BaseLayerMap BaseLayer={BaseLayer} WMSTileLayer={WMSTileLayer} />
            </LayersControl>

            <ZoomControl position="bottomleft" />

            <Geoman />
        </MapContainer>
    </>
  )
}
