/**
 * LiWj 2019-03-26 
 *  axios共用请求请求
 */

import Axios from './axios_set';

//GET请求
export const AxiosGet = (url, data) => {
    return Axios.get(url,{params:data})
}

//POST请求
export const AxiosPost = (url, data) => {

    
    return Axios.post(url, data)
}

//DELETE请求
export const AxiosDelete = (url, data) => {
    return Axios.delete(url, {params:data})
}

//PUT请求

export const AxiosPut = (url, data) => {
    return Axios.put(url, data)
}

//PATCH请求
export const AxiosPatch = (url, data) => {
    return Axios.patch(url, data)
}