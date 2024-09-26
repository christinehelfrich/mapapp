/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '@arcgis/core/config'
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Basemap from "@arcgis/core/Basemap.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
//import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import { CameraLocationResponseDataLocsDataModel } from '@/models/Camera/CameraLocationModel';
import { onPinClickedFunction } from '@/models/Map/MapEventFunctions';
import { onMapZoomChangeFunction } from '@/models/Map/MapEventFunctions';
// type onPinClickedFunction = (attributes: any) => void;
// type onMapZoomChangeFunction = (attributes: any) => void;
config.apiKey = process.env.NEXT_PUBLIC_API_KEY as string

export class MapClass {
    // name is a private member variable
    public constructor() {}
  
    public initiateWebMap = (mapStyle: string) => {
      // This function just initiates the base map 
      // based on a style selected 
      // and returns a Map
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
      // This function just initiates the MapView
      // based on the Map, the map div, center point, and scale
      // and returns a MapView
      const view = new MapView({
        container: mapDiv.current, // The id or node representing the DOM element containing the view.
        map: map, // An instance of a Map object to display in the view.
        center: center,
        scale: scale // Represents the map scale at the center of the view.
      });

      return view
    }

    public addPointsToMap = (map: Map, mapView: MapView, points: CameraLocationResponseDataLocsDataModel[], onPinClicked: onPinClickedFunction) => {
      // This function adds points to a map
      // based on MapView, points in lat and long, and a function to be called on pin clicked 
      // and returns the updated map

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
          symbol: simpleMarkerSymbol,
          attributes: p
       });
       graphicsLayer.add(pointGraphic);
      })

      mapView.on('click', (event: any) => {
        mapView.hitTest(event).then((response: any) => {
          const graphicHits = response.results?.filter(
            (hitResult: any) => hitResult.type === "graphic" && hitResult.graphic.layer === graphicsLayer
          );
          if (graphicHits?.length > 0) {
               onPinClicked(graphicHits[0].graphic.attributes)
          }
        });
      });

      // symbol options: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-Symbol.html
      return map
    }

    public addOnZoomFunction = (mapView: MapView, onMapZoomChange: onMapZoomChangeFunction, pinLocations: any[]) => {
      // This function adds the zoom anad extend events to the map 
      // based on a MapView, and a function to be called when the frame changes
      // and returns a nothing

      mapView.watch('extent', (newValue, oldValue) => {
        if (newValue !== oldValue) {
          const visiblePins = this.updateVisiblePins(pinLocations, mapView)
          onMapZoomChange(visiblePins)
        }
      });
    }

    private updateVisiblePins = (pinLocations: any[], mapView: MapView) => {
      const visiblePins = pinLocations.filter((pin: any) => {
        return mapView.extent.contains(new Point({
          latitude: pin.lat,
          longitude: pin.lon,
        }));
      });

      return visiblePins
    };

  }