import { CameraLocationResponseModel } from "@/models/Camera/CameraLocationModel"

export const GetCameraLocations = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_CAMERA_API_URL + '/api/getCameraDataByLoc')
    const repo: CameraLocationResponseModel = await res.json()
    return repo.data.locs.data
}