/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image';
import placeholderimg from '../assets/images/elementor-placeholder-image.webp'

type Props = {
    cameraDetails: any;
  };

const CameraDetails = ({cameraDetails}: Props) => {
  return (
    <div className='camera-details' key={cameraDetails.id}>
    <Image
    src={placeholderimg} // Route of the image file
    // height={100} // Desired size with correct aspect ratio
    // width={144} // Desired size with correct aspect ratio
    alt="Placeholder Img"
    objectFit="cover"
  />
    <p>{cameraDetails.id}</p>
  </div>
  )
}

export default CameraDetails
