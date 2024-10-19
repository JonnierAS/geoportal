import * as turf from '@turf/turf'; // O puede ser importación selectiva de funciones
import * as Constants from './constants';

const {
  LAT_MIN,
  LAT_MAX,
  LAT_RENDERED_MIN,
  LAT_RENDERED_MAX,
  LNG_MIN,
  LNG_MAX
} = Constants;

// Función para ajustar límites geográficos de las características GeoJSON
export default function(geojsonFeatures: any, delta: any) {
  // Inicializa variables para los límites de latitud y longitud
  let northInnerEdge = LAT_MIN;
  let southInnerEdge = LAT_MAX;
  let northOuterEdge = LAT_MIN;
  let southOuterEdge = LAT_MAX;

  let westEdge = LNG_MAX;
  let eastEdge = LNG_MIN;

  geojsonFeatures.forEach((feature: any) => {
    const bounds = turf.bbox(feature); // Usa Turf.js para obtener el "extent"
    const featureWestEdge = bounds[0];
    const featureSouthEdge = bounds[1];
    const featureEastEdge = bounds[2];
    const featureNorthEdge = bounds[3];

    // Actualiza los límites basándote en los valores del "extent"
    if (featureSouthEdge > northInnerEdge) northInnerEdge = featureSouthEdge;
    if (featureNorthEdge < southInnerEdge) southInnerEdge = featureNorthEdge;
    if (featureNorthEdge > northOuterEdge) northOuterEdge = featureNorthEdge;
    if (featureSouthEdge < southOuterEdge) southOuterEdge = featureSouthEdge;
    if (featureWestEdge < westEdge) westEdge = featureWestEdge;
    if (featureEastEdge > eastEdge) eastEdge = featureEastEdge;
  });

  // Ajusta el delta para asegurar que no exceda los límites
  const constrainedDelta = delta;
  if (northInnerEdge + constrainedDelta.lat > LAT_RENDERED_MAX) {
    constrainedDelta.lat = LAT_RENDERED_MAX - northInnerEdge;
  }
  if (northOuterEdge + constrainedDelta.lat > LAT_MAX) {
    constrainedDelta.lat = LAT_MAX - northOuterEdge;
  }
  if (southInnerEdge + constrainedDelta.lat < LAT_RENDERED_MIN) {
    constrainedDelta.lat = LAT_RENDERED_MIN - southInnerEdge;
  }
  if (southOuterEdge + constrainedDelta.lat < LAT_MIN) {
    constrainedDelta.lat = LAT_MIN - southOuterEdge;
  }
  if (westEdge + constrainedDelta.lng <= LNG_MIN) {
    constrainedDelta.lng += Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }
  if (eastEdge + constrainedDelta.lng >= LNG_MAX) {
    constrainedDelta.lng -= Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }

  return constrainedDelta;
}
