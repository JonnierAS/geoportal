import * as turf from "@turf/turf";

// Definición del contexto completo
interface MapContext {
  addFeature(polygon: Polygon): unknown;
  updateUIClasses(arg0: { mouse: string; }): unknown;
  setActionableState(arg0: { trash: boolean; }): unknown;
  map: {
    doubleClickZoomCircle: {
      enable: () => void;
      disable: () => void;
    };
    fire: (event: string, data: any) => void;
    deleteFeature: (featureIds: string[], options?: { silent?: boolean }) => void;
    changeMode: (mode: string, {},options?: { silent?: boolean }) => void
  };
  _ctx?: {
    store: {
      getInitialConfigValue: (key: string) => any;
    };
  };
}

// Ajusta la definición del polígono para incluir el tipo
interface Polygon {
  type: "Feature"; // Aquí se agrega la propiedad 'type'
  properties: {
    isCircle: boolean;
    center: number[];
    radiusInKm?: number;
    id?: string; // Asegúrate de que esto sea único
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  incomingCoords: (coords: number[][][]) => void;
  isValid: () => boolean;
  toGeoJSON: () => any;
  id: string; // Asegúrate de tener un identificador único
}

interface State {
  polygon: Polygon;
  currentVertexPosition: number;
}

interface Event {
  lngLat: {
    lng: number;
    lat: number;
  };
}

const handleDoubleClickZoom = {
  enable(ctx: any) {
    setTimeout(() => {
      if (ctx?.map?.doubleClickZoomCircle && ctx._ctx?.store) {
        const initConfig = ctx._ctx.store.getInitialConfigValue;
        if (initConfig?.("doubleClickZoomCircle")) {
          ctx.map.doubleClickZoomCircle.enable();
        }
      }
    }, 0);
  },
  disable(ctx: any) {
    setTimeout(() => {
      if (ctx?.map?.doubleClickZoomCircle) {
        ctx.map.doubleClickZoomCircle.disable();
      }
    }, 0);
  }
};

// Modo para arrastrar y crear círculos personalizados
const DragCircleCustomMode = {
  onSetup(this: MapContext): State {
    const polygon: Polygon = {
      type: "Feature",
      properties: {
        isCircle: true,
        center: [],
      },
      geometry: {
        type: "Polygon",
        coordinates: [],
      },
      incomingCoords(coords) {
        this.geometry.coordinates = coords;
      },
      isValid() {
        return true;
      },
      toGeoJSON() {
        return {
          type: "Feature",
          properties: this.properties,
          geometry: this.geometry,
        };
      },
      id: "unique-id", // Asegúrate de que esto sea único
    };

    this.addFeature(polygon);
    handleDoubleClickZoom.disable(this);
    this.updateUIClasses({ mouse: "pointer" });
    this.setActionableState({ trash: true });

    return { polygon, currentVertexPosition: 0 };
  },

  onMouseMove(this: MapContext, state: State, e: Event) { // Añadir this: MapContext
    const center = state.polygon.properties.center;
    if (center.length === 0) {
      return;
    }

    const distance = turf.distance(
      turf.point(center),
      turf.point([e.lngLat.lng, e.lngLat.lat]),
      { units: 'kilometers' }
    );

    const circle = turf.circle(center, distance, { steps: 170 });
    state.polygon.incomingCoords(circle.geometry.coordinates);
    state.polygon.properties.radiusInKm = distance;
  },

  onStop(this: MapContext, state: State) { // Añadir this: MapContext
    handleDoubleClickZoom.enable(this);

    if (state.polygon.isValid()) {
      this.map.fire("draw.create", {
        features: [state.polygon.toGeoJSON()],
      });
    } else {
      this.map.deleteFeature([state.polygon.id], { silent: true }); // Ahora debería funcionar
      this.map.changeMode("simple_select", {}, { silent: true });
    }
  },

  onClick(this: MapContext, state: State, e: Event) { // Añadir this: MapContext
    const currentCenter = state.polygon.properties.center;

    if (currentCenter.length === 0) {
      state.polygon.properties.center = [e.lngLat.lng, e.lngLat.lat];
    } else {
      this.map.changeMode("simple_select", { featureIds: [state.polygon.id] });
    }
  },

  toDisplayFeatures(this: MapContext, state: State, geojson: any, display: any) { // Añadir this: MapContext
    const isActive = geojson.properties.id === state.polygon.id;
    geojson.properties.active = isActive ? "true" : "false";
    display(geojson);
  },
};

export default DragCircleCustomMode;
