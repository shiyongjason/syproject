import axios from 'axios'
// 用户房屋档案信息条件分页查询
export const findRecordList = (params) => axios.get('service/api/house/archives', { params })
// 用户房屋档案信息条件分页查询
export const findRecordDetail = (params) => axios.get(`/service/api/house/archives/detail/${params}`)
// 用户房屋报告信息条件分页查询
export const findReportList = (params) => axios.get('service/api/house/reports', { params })
// // 用户房屋报告信息条件分页查询
// export const findReportDetail = (params) => axios.get(`/service/api/house/archives/detail/${params}`)
