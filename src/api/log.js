import {
    AxiosGet,
    // AxiosDelete,
    // AxiosPost,
    // AxiosPut
} from '../sets/axiosMethods';

// 设备定位列表接口
export const devicePosition = (data) => {
    return AxiosGet(`/log/manager/device-position`,data)
}
// 点位列表接口
export const pointLocation = (data) => {
    return AxiosGet(`/log/manager/point-location`,data)
}