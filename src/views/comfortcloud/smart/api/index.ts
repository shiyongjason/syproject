import * as Api from '@/interface/iot-api'
import axios, { AxiosPromise } from 'axios'
import { iotUrl } from '@/api/config'

interface Response<T> {
    code: string,
    message: string,
    data: T
}
// 设备升级列表
export const findDeviceUpgrades: (params:any) => AxiosPromise<Response<Api.PageUpgradeResponse>> = (params) => {
    return axios.get(`${iotUrl}/api/boss/device-upgrades`, { params })
}
// 设备升级列表
export const findDeviceTypes: (params:any) => AxiosPromise<Response<Api.UpgradeTypeResponse[]>> = (params) => {
    return axios.get(`${iotUrl}/api/boss/device-upgrades/type`, { params })
}
// 设备升级 -- 新增
export const createDeviceUpgrades: (params: Api.UpgradeRequest) => AxiosPromise<void> = (params) => {
    return axios.post(`${iotUrl}/api/boss/device-upgrades`, params)
}
// 设备升级 -- 修改
export const updateDeviceUpgrades: (params: Api.UpgradeRequest & { id?: number }) => AxiosPromise<void> = (params) => {
    return axios.put(`${iotUrl}/api/boss/device-upgrades/${params.id}`, params)
}
// 设备升级 -- 删除
export const deleteDeviceUpgrades: (params: any) => AxiosPromise<void> = (params) => {
    return axios.delete(`${iotUrl}/api/boss/device-upgrades/${params.id}`, { params })
}

// 设备升级详情
export const findDeviceUpgradesInfo: (params: any) => AxiosPromise<Response<Api.UpgradeDetailResponse>> = (params) => {
    return axios.get(`${iotUrl}/api/boss/device-upgrades/${params.id}`, { params })
}
// 设备升级详情列表
export const findDeviceUpgradesInfoList: (params: any) => AxiosPromise<Response<Api.PageUpgradeDetailsResponse>> = (params) => {
    return axios.get(`${iotUrl}/api/boss/device-upgrades/${params.id}/page`, { params })
}
// 定向升级 -- 新增
export const createDeviceUpgradesDirectional: (params: Api.DirectionalRequest) => AxiosPromise<void> = (params) => {
    return axios.post(`${iotUrl}/api/boss/device-upgrades/directional`, params)
}
// 定向升级 -- 删除
export const deleteDeviceUpgradesDirectional: (params: any) => AxiosPromise<void> = (params) => {
    console.log(params)
    return axios.delete(`${iotUrl}/api/boss/device-upgrades/directional/${params.id}`, { params })
}
