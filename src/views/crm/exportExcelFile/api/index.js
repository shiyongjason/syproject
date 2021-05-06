import axios from 'axios'
// 上传Excel选择的tableName
export const getExcelLabelList = () => axios.get(`/common/excel/table/list`)
// 上传excel的接口
export const createExcelData = (params) => axios.post(`/common/excel/import`, params)
// 上传操作记录列表
export const getExcelTableTableList = (params) => axios.get(`/common/excel/operate/record`, { params })
