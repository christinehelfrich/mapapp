/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // This is a client component
import config from '@arcgis/core/config'
import { useEffect, useRef } from 'react'
import { MapClass } from '@/util/MapClass';
import { GetCameraLocations } from '@/services/data/Cameras/CameraService';
import { filterCamerasByPrivate, filterCamerasByState } from '@/services/filter/CameraLocationFilteringService';


config.apiKey = process.env.NEXT_PUBLIC_API_KEY as string

const MapComponent = () => {

    const mapDiv = useRef(null);

    const onPinClicked = (attributes: any) => {
      return attributes
    }

    const onMapZoomChange = (attributes: any) => {
      return attributes
    }
  
    useEffect(() => {
      if (mapDiv.current) {
        /**
         * Initialize application
         */

        const mapClass = new MapClass()

        let webmap = mapClass.initiateWebMap("arcgis/dark-gray")

        const view = mapClass.initiateMapView(mapDiv, webmap, [-117.1490,32.7353], 1000000)

        GetCameraLocations().then((res: any) => {
          const filteredByState = filterCamerasByState(res, 'CA')
          const filteredByPrivate = filterCamerasByPrivate(filteredByState)
          webmap = mapClass.addPointsToMap(webmap, view, filteredByPrivate, onPinClicked)
          mapClass.addOnZoomFunction(view, onMapZoomChange, filteredByPrivate)
        })


        

        return () => view && view.destroy()
  
      }
    }, []);

  
    return (
    <div className="mapDiv" ref={mapDiv} style={{height: '100vh', width: "100%"}}></div>
    )
    
  }
  
  export default MapComponent;