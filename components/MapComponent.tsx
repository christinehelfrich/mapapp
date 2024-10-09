/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // This is a client component
import config from '@arcgis/core/config'
import { useEffect, useRef, useState } from 'react'
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

let mapClass: any;
let view: any;


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MapComponent = ({onPinClickedEvent, onZoomChangeEvent}: Props) => {

    const mapDiv = useRef(null);
    const [isDrawMode, setIsDrawMode] = useState(false)

    const onPinClicked = (attributes: any) => {
      // do something on pin click based on pin attributes
      onPinClickedEvent(attributes);
    }

    const onMapZoomChange = (attributes: any) => {
      // do something on viewframe change based on list of visible pins and map position
      onZoomChangeEvent(attributes)
    }

    const onClickPolygon = () => {
      setIsDrawMode(true)
      mapClass.enableCreatePolygon(view, onDrawComplete)
    }

    const onDrawComplete = (verticies: any) => {
      console.log('draw complete', verticies)
      setIsDrawMode(false)
    }

    const onClickOpenFilter = () => {
      console.log('open filter')
    }
  
    useEffect(() => {
      if (mapDiv.current) {
        // If the map div exists

        mapClass = new MapClass()

        // create base map
        let webmap = mapClass.initiateWebMap("arcgis/imagery/standard")

        // create map view
        view = mapClass.initiateMapView(mapDiv, webmap, [-117.1490,32.7353], 100000)

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
          // mapClass.enableCreatePolygon(view)
        })

        return () => view && view.destroy()
  
      }
    }, []);

  
    return (
      <>
    <div className="mapDiv" ref={mapDiv} style={{height: '100vh', width: "100%"}}></div>
    <div className='map-buttons'>
    <button className='map-button button-secondary'> 
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
    </button>
    <button className={`map-button button-secondary ${isDrawMode ? 'draw-mode' : 'not-draw-mode'}`} onClick={onClickPolygon}> 
          <svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
	          viewBox="0 0 60 60">
            <g>
	            <path d="M9.64,55.354l-0.208-0.979C9.141,52.999,7.908,52,6.5,52h-1V8h1c1.408,0,2.641-0.999,2.932-2.375
	            	L9.64,4.646l41.136,8.753l-0.208,0.978C50.522,14.587,50.5,14.797,50.5,15c0,1.654,1.346,3,3,3h1v24h-1c-1.654,0-3,1.346-3,3
	            	c0,0.203,0.022,0.413,0.067,0.624l0.208,0.978L9.64,55.354z M7.5,50.103c1.586,0.327,2.932,1.418,3.582,2.9L48.5,45.041
	            	c0-0.014,0-0.027,0-0.041c0-2.415,1.721-4.435,4-4.899V19.899c-2.279-0.465-4-2.484-4-4.899c0-0.014,0-0.027,0-0.041L11.082,6.997
	            	c-0.65,1.482-1.996,2.573-3.582,2.9V50.103z"/>
	            <g>
	            	<circle cx="6.5" cy="5" r="4"/>
	            	<path d="M6.5,10c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S9.257,10,6.5,10z M6.5,2
	            		c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S8.154,2,6.5,2z"/>
	            </g>
	            <g>
	            	<circle cx="6.5" cy="55" r="4"/>
	            	<path d="M6.5,60c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S9.257,60,6.5,60z M6.5,52
	            		c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S8.154,52,6.5,52z"/>
	            </g>
	            <g>
	            	<circle cx="53.5" cy="45" r="4"/>
	            	<path d="M53.5,50c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S56.257,50,53.5,50z M53.5,42
	            		c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S55.154,42,53.5,42z"/>
	            </g>
	            <g>
	            	<circle cx="53.5" cy="15" r="4"/>
	            	<path d="M53.5,20c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S56.257,20,53.5,20z M53.5,12
	            		c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S55.154,12,53.5,12z"/>
	            </g>
            </g>
          </svg>
    </button>
    <button className='map-button button-secondary' onClick={onClickOpenFilter}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path stroke="white" d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12H16M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19H20M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </button>
    </div>
    </>
    )
    
  }
  
  export default MapComponent;