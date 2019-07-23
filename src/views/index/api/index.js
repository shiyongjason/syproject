import axios from 'axios'

// 平台公司经营概况
export const getPlatformInfo = (params) => axios.get('/report/api/index-page/business-overview', {
    params
})
// 运营数据分析
export const getOperationInfo = (params) => axios.get('/report/api/index-page/data-analysis', {
    params
})
// 跳转金云平台
export const gotoJinYun = (jinyun, params) => jinyun + 'bossLogin.do?mobileNo=' + params.mobileNo + '&token=' + params.token
