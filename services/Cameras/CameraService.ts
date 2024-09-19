/* eslint-disable @typescript-eslint/no-explicit-any */

export const GetCameraLocations = async () => {
      // Fetch data from external API
    //const res = await fetch('https://api.cdn.prod.alertwest.com/api/getCameraDataByLoc')
    //const repo: any = await res.json()
    // Pass data to the page via props
    // console.log(repo)
    // return repo.data.locs.data
    return [
        {longitude: -117.24788118125575, latitude: 32.94823280197382}, 
        {longitude: -117.16020678817303, latitude: 32.73760419615398},
        {longitude: -117.27315754062893, latitude: 32.849750083987075}
    ]
}