import axios, { AxiosPromise } from 'axios'
import { B2bUrl } from '@/api/config'

export const getChiness: () => AxiosPromise<any> = () => {
    return axios.get(B2bUrl + 'merchant/openapi/region/provinces/nesting', {})
}