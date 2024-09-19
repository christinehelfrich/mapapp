/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '@arcgis/core/config'
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Basemap from "@arcgis/core/Basemap.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";

config.apiKey = process.env.NEXT_PUBLIC_API_KEY as string

export class MapClass {
    // name is a private member variable
    public constructor() {}
  
    public initiateWebMap = (mapStyle: string) => {
        const basemap = new Basemap({
          style: {
            id: mapStyle,
            places: "all"
          }
        });
  
        basemap.when(function(){
          // This function will execute once the promise is resolved
          console.log('basemap loaded')
        }, function(error: any){
          console.log('basemap err', error)
          // This function will execute if the promise is rejected due to an error
        });
  
  
        const webmap = new Map({
          basemap: basemap
        });
  
        return webmap
      }

    public initiateMapView = (mapDiv: any, map: Map, center: number[], scale: number) => {
      const view = new MapView({
        container: mapDiv.current, // The id or node representing the DOM element containing the view.
        map: map, // An instance of a Map object to display in the view.
        center: center,
        scale: scale // Represents the map scale at the center of the view.
      });

      return view
    }

    public addPointsToMap = (map: Map, points: any[]) => {
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      const simpleMarkerSymbol = {
         type: "simple-marker",
         color: [226, 119, 40],  // Orange
         outline: {
             color: [255, 255, 255], // White Outline
             width: 1
         }
      };

      points.map((p: any) => {
        const point = new Point({
          longitude: p.lon,
          latitude: p.lat
        })
        const pointGraphic = new Graphic({
          geometry: point,
          symbol: simpleMarkerSymbol
       });
       graphicsLayer.add(pointGraphic);
      })
     


      // symbol options: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-Symbol.html
     

      return map
    }
  }