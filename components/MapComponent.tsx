/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // This is a client component
import config from '@arcgis/core/config'
import { useEffect, useRef } from 'react'
import { MapClass } from '@/util/MapClass';


config.apiKey = process.env.NEXT_PUBLIC_API_KEY as string

const points = [
  {longitude: -117.24788118125575, latitude: 32.94823280197382}, 
  {longitude: -117.16020678817303, latitude: 32.73760419615398},
  {longitude: -117.27315754062893, latitude: 32.849750083987075}
]

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

        webmap = mapClass.addPointsToMap(webmap, points)

        return () => view && view.destroy()
  
      }
    }, []);
  
    return (
    <div className="mapDiv" ref={mapDiv} style={{height: '100vh', width: "100%"}}></div>
    )
    
  }
  
  export default MapComponent;