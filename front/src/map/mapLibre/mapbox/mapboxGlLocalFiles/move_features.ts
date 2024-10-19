import constrainFeatureMovement from './constrain_feature_movement';
import * as Constants from './constants';

export default function(features: any, delta: any) {
  const constrainedDelta = constrainFeatureMovement(features.map((feature: any) => feature.toGeoJSON()), delta);

  features.forEach((feature: any) => {
    const currentCoordinates = feature.getCoordinates();

    const moveCoordinate = (coord: any) => {
      const point = {
        lng: coord[0] + constrainedDelta.lng,
        lat: coord[1] + constrainedDelta.lat
      };
      return [point.lng, point.lat];
    };
    const moveRing = (ring: any) => ring.map((coord: any) => moveCoordinate(coord));
    const moveMultiPolygon = (multi: any) => multi.map((ring: any) => moveRing(ring));

    let nextCoordinates;
    if (feature.type === Constants.geojsonTypes.POINT) {
      nextCoordinates = moveCoordinate(currentCoordinates);
    } else if (feature.type === Constants.geojsonTypes.LINE_STRING || feature.type === Constants.geojsonTypes.MULTI_POINT) {
      nextCoordinates = currentCoordinates.map(moveCoordinate);
    } else if (feature.type === Constants.geojsonTypes.POLYGON || feature.type === Constants.geojsonTypes.MULTI_LINE_STRING) {
      nextCoordinates = currentCoordinates.map(moveRing);
    } else if (feature.type === Constants.geojsonTypes.MULTI_POLYGON) {
      nextCoordinates = currentCoordinates.map(moveMultiPolygon);
    }

    feature.incomingCoords(nextCoordinates);
  });
}