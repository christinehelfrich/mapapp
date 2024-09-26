/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // This is a client component
import config from '@arcgis/core/config'
import { useEffect, useRef } from 'react'
import { MapClass } from '@/util/MapClass';
import { GetCameraLocations } from '@/services/data/Cameras/CameraService';
import { filterCamerasByPrivate, filterCamerasByState } from '@/services/filter/CameraLocationFilteringService';
import { onPinClickedFunction } from '@/models/Map/MapEventFunctions';
import { onMapZoomChangeFunction } from '@/models/Map/MapEventFunctions';


config.apiKey = process.env.NEXT_PUBLIC_API_KEY as string

type Props = {
  onPinClickedEvent: onPinClickedFunction;
  onZoomChangeEvent: onMapZoomChangeFunction;
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MapComponent = ({onPinClickedEvent, onZoomChangeEvent}: Props) => {

    const mapDiv = useRef(null);

    const onPinClicked = (attributes: any) => {
      // do something on pin click based on pin attributes
      onPinClickedEvent(attributes);
    }

    const onMapZoomChange = (attributes: any) => {
      // do something on viewframe change based on list of visible pins and map position
      onZoomChangeEvent(attributes)
    }
  
    useEffect(() => {
      if (mapDiv.current) {
        // If the map div exists

        const mapClass = new MapClass()

        // create base map
        let webmap = mapClass.initiateWebMap("arcgis/dark-gray")

        // create map view
        const view = mapClass.initiateMapView(mapDiv, webmap, [-117.1490,32.7353], 100000)

        // call api to get the locations of cameras
        GetCameraLocations().then((res: any) => {
          // filter response by state and private
          const filteredByState = filterCamerasByState(res, 'CA')
          const filteredByPrivate = filterCamerasByPrivate(filteredByState)
          // add those pins to the map
          webmap = mapClass.addPointsToMap(webmap, view, filteredByPrivate, onPinClicked)
          // add zoom event to the map
          mapClass.addOnZoomFunction(view, onMapZoomChange, filteredByPrivate)
          onMapZoomChange(filteredByPrivate)
        })

        return () => view && view.destroy()
  
      }
    }, []);

  
    return (
    <div className="mapDiv" ref={mapDiv} style={{height: '100vh', width: "100%"}}></div>
    )
    
  }
  
  export default MapComponent;