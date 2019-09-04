import axios from 'axios'
// 档案信息条件分页查询
export const findRecordList = (params) => axios.get('service/api/house/archives', { params })
// 档案信息详情
export const findRecordDetail = (params) => axios.get(`/service/api/house/archives/detail/${params}`)
// 报告信息条件分页查询
export const findReportList = (params) => axios.get('service/api/house/reports', { params })
// 报告信息详情
export const findReportDetail = (params) => axios.get(`/service/api/house/reports/${params}`)
