export interface CameraLocationResponseModel {
    code: number,
    data: CameraLocationResponseDataModel,
    err: string
    rendered: string,
    str: string,
}

export interface CameraLocationResponseDataModel {
    cams: CameraLocationResponseDataCamsModel,
    locs: CameraLocationResponseDataLocsModel,
}

export interface CameraLocationResponseDataLocsModel {
    data: CameraLocationResponseDataLocsDataModel[],
    key: CameraLocationResponseDataLocsKeyModel
}

export interface CameraLocationResponseDataCamsModel {
    data: CameraLocationResponseDataCamsDataModel[],
    key: CameraLocationResponseDataCamsKeyModel
}

export interface CameraLocationResponseDataLocsDataModel {
    id: number,
    lat: number,
    lon: Float32Array,
    st: string,
    lp: number
}

export interface CameraLocationResponseDataLocsKeyModel {
    id: string,
    lat: string,
    lon: string,
    st: string,
    lp: string
}

export interface CameraLocationResponseDataCamsKeyModel {
    af: string,
    ato: string,
    br: string,
    cc: string,
    cl: string,
    cn: string,
    co: string, 
    foc: string,
    fov: string, 
    hn: string,
    id: string,
    img: string, 
    isp: string, 
    lid: string, 
    lmt: string, 
    off: string,
    p: string,
    pi: string,
    pl: string,
    pr: string,
    ps: string,
    ptz: string,
    pv: string,
    sp: string,
    st: string,
    t: string,
    tb: string,
    tr: string,
    trg: string, 
    typ: string,
}

export interface CameraLocationResponseDataCamsDataModel {
    af: number,
    ato: number,
    br: string,
    cc: string,
    cl: number,
    cn: string,
    co: string, 
    foc: string,
    fov: string, 
    hn: string,
    id: string,
    img: string, 
    isp: string, 
    lid: number, 
    lmt: string, 
    off: number,
    p: string,
    pi: string,
    pl: string,
    pr: string,
    ps: string,
    ptz: number,
    pv: number,
    sp: string,
    st: string,
    t: string,
    tb: number,
    tr: string,
    trg: number, 
    typ: string,
}

export interface CameraLocationResponseDataCamsAndLocsDataModel {
    lat: number,
    lon: Float32Array,
    lp: number
    af: number,
    ato: number,
    br: string,
    cc: string,
    cl: number,
    cn: string,
    co: string, 
    foc: string,
    fov: string, 
    hn: string,
    id: string,
    img: string, 
    isp: string, 
    lid: number, 
    lmt: string, 
    off: number,
    p: string,
    pi: string,
    pl: string,
    pr: string,
    ps: string,
    ptz: number,
    pv: number,
    sp: string,
    st: string,
    t: string,
    tb: number,
    tr: string,
    trg: number, 
    typ: string,
}