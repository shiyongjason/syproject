import axios from 'axios'

export const getExcelTableList = () => axios.get(`/common/excel/table/list`)

export const createExcelData = (params) => axios.post(`/common/excel/import`, params)
