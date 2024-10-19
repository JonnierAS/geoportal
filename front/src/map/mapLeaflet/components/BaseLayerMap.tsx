
export const BaseLayerMap = ({BaseLayer,WMSTileLayer}: any) => {
    return (
        <>
            <BaseLayer checked name="GoogleStreet">
                <WMSTileLayer
                    key={1}
                    url={`http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}`}
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    transparent={false}
                    maxZoom={22}
                />
            </BaseLayer>

            <BaseLayer name="OpenStreetMap">
                <WMSTileLayer
                    key={2}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    format="image/png"
                    transparent={false}
                    maxZoom={22}
                />
            </BaseLayer>

            <BaseLayer name="Satellite">
                <WMSTileLayer
                    key={3}
                    url={`http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`}
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    transparent={false}
                    maxZoom={22}
                />
            </BaseLayer>
        </>
    )
}
