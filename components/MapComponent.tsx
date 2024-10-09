/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // This is a client component
import config from '@arcgis/core/config'
import { useEffect, useRef, useState } from 'react'
import { MapClass } from '@/util/MapClass';
import { GetCameraLocations } from '@/services/data/Cameras/CameraService';
import { filterCamerasByPrivate, filterCamerasByState } from '@/services/filter/CameraLocationFilteringService';
import { onPinClickedFunction } from '@/models/Map/MapEventFunctions';
import { onMapZoomChangeFunction } from '@/models/Map/MapEventFunctions';
import FilterIcon from './atoms/FilterIcon';
import PolygonIcon from './atoms/PolygonIcon';
import DownloadIcon from './atoms/DownloadIcon';
import MapFilterPopup from './molecules/MapFilterPopup';

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
    const [showFilters, setShowFilters] = useState(false)

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
      setShowFilters(!showFilters)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  
    return (
      <>
    <div className="mapDiv" ref={mapDiv} style={{height: '100vh', width: "100%"}}></div>
    <div className='map-buttons'>
    {showFilters && (
               <MapFilterPopup></MapFilterPopup>
       )}
       <button 
         className='map-button button-secondary'> 
             <DownloadIcon></DownloadIcon>
       </button>
       <button 
         className={`map-button button-secondary ${isDrawMode ? 'draw-mode' : 'not-draw-mode'}`} 
         onClick={onClickPolygon}> 
             <PolygonIcon></PolygonIcon>
       </button>
       <button 
        className={`map-button button-secondary ${showFilters ? 'draw-mode' : 'not-draw-mode'}`} 
        onClick={onClickOpenFilter}>
         <FilterIcon></FilterIcon>
       </button>

    </div>
    </>
    )
    
  }
  
  export default MapComponent;