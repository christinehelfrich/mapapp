import { CameraLocationResponseDataCamsAndLocsDataModel, CameraLocationResponseDataLocsDataModel, CameraLocationResponseModel } from "@/models/Camera/CameraLocationModel"

export const GetCameraLocations = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_CAMERA_API_URL + '/api/getCameraDataByLoc')
    const repo: CameraLocationResponseModel = await res.json()
    return combineCameraAndLocationDataOptimized(repo)//repo.data.locs.data
}

export function combineCameraAndLocationDataOptimized(input: CameraLocationResponseModel): CameraLocationResponseDataCamsAndLocsDataModel[] {
    // Destructure cams and locs data from input
    const { cams, locs } = input.data;

    // Build a hash map for the locs data for quick lookup by id
    const locsMap: { [key: number]: CameraLocationResponseDataLocsDataModel } = {};
    locs.data.forEach((loc) => {
        locsMap[loc.id] = loc;
    });

    // Prepare an array to hold the merged data
    const combinedData: CameraLocationResponseDataCamsAndLocsDataModel[] = [];

    // Iterate over cams data
    cams.data.forEach((cam) => {
        // Find corresponding location data using the hash map
        const correspondingLoc = locsMap[Number(cam.lid)];

        if (correspondingLoc) {
            // Merge cam and loc data into the combined model
            const mergedData: CameraLocationResponseDataCamsAndLocsDataModel = {
                // Location data
                lat: correspondingLoc.lat,
                lon: correspondingLoc.lon,
                lp: correspondingLoc.lp,
                st: correspondingLoc.st,
                
                // Camera data
                af: cam.af,
                ato: cam.ato,
                br: cam.br,
                cc: cam.cc,
                cl: cam.cl,
                cn: cam.cn,
                co: cam.co,
                foc: cam.foc,
                fov: cam.fov,
                hn: cam.hn,
                id: cam.id,
                img: cam.img,
                isp: cam.isp,
                lid: cam.lid,
                lmt: cam.lmt,
                off: cam.off,
                p: cam.p,
                pi: cam.pi,
                pl: cam.pl,
                pr: cam.pr,
                ps: cam.ps,
                ptz: cam.ptz,
                pv: cam.pv,
                sp: cam.sp,
                t: cam.t,
                tb: cam.tb,
                tr: cam.tr,
                trg: cam.trg,
                typ: cam.typ,
            };

            // Add the merged data to the combined array
            combinedData.push(mergedData);
        }
    });

    // Return the combined data
    return combinedData;
}