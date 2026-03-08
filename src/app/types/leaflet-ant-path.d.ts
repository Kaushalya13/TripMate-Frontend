declare module 'leaflet-ant-path' {
  import * as L from 'leaflet';
  export class AntPath extends L.Polyline {
    constructor(path: L.LatLngExpression[] | L.LatLngExpression[][], options?: any);
  }
  export function antPath(path: L.LatLngExpression[] | L.LatLngExpression[][], options?: any): AntPath;
}