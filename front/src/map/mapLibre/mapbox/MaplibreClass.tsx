import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Map as MaplibreMap, IControl } from 'maplibre-gl'; // Importa el tipo MaplibreMap

// Crear una clase personalizada que implemente IControl de Maplibre
class MaplibreDraw implements IControl {
  private draw: MapboxDraw;
  static modes: any;

  constructor(options?: any) {
    this.draw = new MapboxDraw(options); // Inicializar la instancia de MapboxDraw
  }

  // Implementar el método onAdd para Maplibre
  onAdd(map: MaplibreMap): HTMLElement {
    const container = this.draw.onAdd(map as any); // Llamar a onAdd de MapboxDraw con el mapa de Maplibre
    return container;
  }

  // Implementar el método onRemove para Maplibre
  onRemove(map: MaplibreMap): void {
    this.draw.onRemove(map as any); // Llamar a onRemove de MapboxDraw con el mapa de Maplibre
  }

  // Métodos adicionales para interactuar con MapboxDraw
  add(geojson: any) {
    return this.draw.add(geojson);
  }

  delete(ids: string[]) {
    return this.draw.delete(ids);
  }

  getAll() {
    return this.draw.getAll();
  }
}

export default MaplibreDraw;
