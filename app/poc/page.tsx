import React from 'react'
import dynamic from "next/dynamic";
import CameraListComponent from '@/components/CameraListComponent';
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

const page = () => {
  return (
    <div className='map-page-container'>
      <div className='map-component'>
        <MapComponent></MapComponent>
      </div>
      <div className='camera-list-component'>
        <CameraListComponent></CameraListComponent>
      </div>
    </div>
  )
}

export default page
