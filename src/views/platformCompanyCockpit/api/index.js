import axios from 'axios'
import { B2bUrl } from '@/api/config'

// 生成验证码
export const getVerifica = (params) => axios.get('/uaa/api/verification-code', params)
// 修改密码
export const editPassword = (params) => axios.post('/uaa/api/account/change-password', params)
// 省
export const getProvinces = () => {
    return axios.get(B2bUrl + 'common/region/provinces/nesting')
}
// 市
export const getCities = (provinceId) => {
    return axios.get(B2bUrl + `common/region/provinces/${provinceId}/cities`)
}
// 区
export const getAreas = (cityId) => {
    return axios.get(B2bUrl + `common/region/cities/${cityId}/countries`)
}
// 查询平台公司
export const findPaltList = (params) => {
    return axios.get('develop/developbasicinfo/queryCompany', {
        params
    })
}
// 分部列表查询
export const findBranchListNew = (params) => {
    return axios.get('rms/subsectiontarget/subsection', { params })
}
// 分部列表查询
export const findAllBranchList = (params) => {
    return axios.get('/uaa/department/subsections', { params })
}
// 保存档案
export const saveInfo = (params) => {
    return axios.post('/fms/api/risk-management', params)
}
// 更新档案
export const upData = (params) => {
    return axios.put('/fms/api/risk-management', params)
}
// 风险控制分页查询
export const getList = (params) => {
    return axios.post('/fms/api/risk-management/list', params)
}
// 档案借阅 管理
export const borrow = (params) => {
    return axios.put('/fms/api/risk-management/borrow', params)
}
// 档案标注
export const remark = (params) => {
    return axios.put('/fms/api/risk-management/remark', params)
}
// 删除风险控制
export const deleteFile = (params) => {
    return axios.delete(`/fms/api/risk-management/${params}`, {})
}
// 编辑风险控制-页面信息
export const getDetail = (params) => {
    return axios.get(`/fms/api/risk-management/info/${params}`, {})
}
