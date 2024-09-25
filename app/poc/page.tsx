/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // This is a client component
import React, { useState } from 'react'
import dynamic from "next/dynamic";
import CameraListComponent from '@/components/CameraListComponent';
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

const page = () => {

  const [pinClicked, setPinClicked] = useState({})
  const [visiblePins, setVisiblePins] = useState([])

  const onPinClickedEvent = (attributes: any) => {
    setPinClicked(attributes)
  }

  const onZoomChangeEvent = (attributes: any) => {
    setVisiblePins(attributes)
  }

  return (
    <div className='map-page-container'>
      <div className='map-component'>
        <MapComponent onPinClickedEvent={onPinClickedEvent} onZoomChangeEvent={onZoomChangeEvent}></MapComponent>
      </div>
      <div className='camera-list-component'>
        <CameraListComponent pinClicked={pinClicked} visiblePins={visiblePins}></CameraListComponent>
      </div>
    </div>
  )
}

export default page
