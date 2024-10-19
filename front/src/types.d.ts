declare module 'path';

declare module './drawCircle/drawCircle'

declare module '@mapbox/mapbox-gl-draw' {
    import * as React from 'react';
  
    // Aquí define los tipos que necesitas, o usa `any` si no estás seguro
    const MapboxDraw: any;
    export default MapboxDraw;
  }