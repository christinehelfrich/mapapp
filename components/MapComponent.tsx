/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // This is a client component
import config from '@arcgis/core/config'
import { useEffect, useRef } from 'react'
import { MapClass } from '@/util/MapClass';
import { GetCameraLocations } from '@/services/Cameras/CameraService';


config.apiKey = process.env.NEXT_PUBLIC_API_KEY as string

const MapComponent = () => {

    const mapDiv = useRef(null);
  
    useEffect(() => {
      if (mapDiv.current) {
        /**
         * Initialize application
         */

        const mapClass = new MapClass()

        let webmap = mapClass.initiateWebMap("arcgis/dark-gray")

        const view = mapClass.initiateMapView(mapDiv, webmap, [-117.1490,32.7353], 1000000)

        GetCameraLocations().then((res: any) => {
          webmap = mapClass.addPointsToMap(webmap, res)
        })

        

        return () => view && view.destroy()
  
      }
    }, []);

  
    return (
    <div className="mapDiv" ref={mapDiv} style={{height: '100vh', width: "100%"}}></div>
    )
    
  }
  
  export default MapComponent;