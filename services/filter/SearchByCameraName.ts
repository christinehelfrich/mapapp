import { CameraLocationResponseDataCamsAndLocsDataModel } from "@/models/Camera/CameraLocationModel";

export function searchByCameraName(
    data: CameraLocationResponseDataCamsAndLocsDataModel[], 
    searchString: string
): CameraLocationResponseDataCamsAndLocsDataModel[] {
    // Convert search string to lowercase for case-insensitive search
    const lowerCaseSearchString = searchString.toLowerCase();

    // Use the filter method to return items where cn contains the search string
    return data.filter(item => item.cn.toLowerCase().includes(lowerCaseSearchString));
}