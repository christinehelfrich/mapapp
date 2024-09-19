import { CameraLocationResponseDataLocsDataModel } from "@/models/Camera/CameraLocationModel";

export const filterCamerasByState = (locationsList: CameraLocationResponseDataLocsDataModel[], stateToFilterBy: string) => {
    return locationsList.filter((loc: CameraLocationResponseDataLocsDataModel) => {
        return loc.st === stateToFilterBy
    })
}

export const filterCamerasByPrivate = (locationsList: CameraLocationResponseDataLocsDataModel[]) => {
    return locationsList.filter((loc: CameraLocationResponseDataLocsDataModel) => {
        return loc.lp === 0
    })
}