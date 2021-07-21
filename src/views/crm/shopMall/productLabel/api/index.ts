import axios, { AxiosPromise } from 'axios'
import { B2bUrl } from '@/api/config'

export const getChiness: () => AxiosPromise<any> = () => {
    return axios.get(B2bUrl + 'merchant/openapi/region/provinces/nesting', {})
}

// spu推荐
export const recommend: (params: any[]) => AxiosPromise<any> = (params) => {
    return axios.post(`shop/api/boss/spu/recommend-spu`, params)
}
// spu取消推荐
export const cancelRecommend: (params: any[]) => AxiosPromise<any> = (params) => {
    return axios.post(`shop/api/boss/spu/cancel-recommend-spu`, params)
}