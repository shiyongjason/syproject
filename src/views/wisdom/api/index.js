import axios from 'axios'
import { ossUrl } from '@/api/config'

// 公司概览 公司统计信息
export const getStatistics = (params) => {
    return axios.get('rms/report/overall/company/statistics', {
        params
    })
}

// 饼状图 统计
export const getSales = (params) => {
    return axios.get('rms/report/overall/sales-rate', {
        params
    })
}
// 折线图统计
export const getSummary = (params) => {
    return axios.get('rms/report/overall/summary', {
        params
    })
}

// 新增数据统计
export const addStatistics = (params) => {
    return axios.get('rms/report/add/statistics', {
        params
    })
}
// 新增数据统计 接口拆分  一年
export const addStatisticsYear = (params) => {
    return axios.get('rms/report/add/statistics-year', {
        params
    })
}

// 销售数据统计
export const sellStatistics = (params) => {
    return axios.get('rms/report/sell/statistics', {
        params
    })
}

// 英雄榜
export const hexoList = (params) => {
    return axios.get('rms/report/hero/list', {
        params
    })
}

// 平台公司基本信息
// export const findPlatCompany = (params) => {
//     return axios.post('/hamdevelopbasicinfo/queryPageList', params)
// }

// 分部目标管理列表
export const findBrandTargetTable = (params) => {
    return axios.get('rms/subsectiontarget/queryPageList', {
        params
    })
}
// 分部列表查询
export const findBranchList = (params) => {
    return axios.get('rms/dept/queryDeptList', { params })
}
// 新增－－－－分部列表查询
export const findBranchListNew = (params) => {
    return axios.get('rms/subsectiontarget/subsection', {
        params
    })
}
// 大区列表查询
export const findRegionList = (params) => {
    return axios.get('rms/dept/queryRegionList', { params })
}
// 获取平台目标列表
export const findTableList = (params) => {
    return axios.get('rms/companyTarget/queryPageList', {
        params
    })
}
// 根据大区获取平台公司
export const queryCompanyByParams = (params) => {
    return axios.post('develop/developbasicinfo/queryCompanyByParams', params)
}
// 获取平台销售分析列表
export const getPlatformSale = (params) => {
    return axios.get('rms/platSaleAnalyze', {
        params
    })
}
// 获取平台销售分析列表 合计
export const getPlatformSaleSum = (params) => {
    return axios.get('rms/platSaleAnalyze/platSaleAnalyzeSum', {
        params
    })
}
// 获取分部销售分析列表
export const getBranchSale = (params) => {
    return axios.get('rms/subsection-sale/adjective', {
        params
    })
}
// 获取分部销售分析列表 合计
export const getBranchSaleSum = (params) => {
    return axios.get('rms/subsection-sale/total', {
        params
    })
}
// 查询平台公司基本信息
export const findCompanyList = (params) => {
    return axios.get('develop/developbasicinfo/queryPageListPlusMis', { params })
}

// 机构在线的 分部查询
export const findDepList = (params) => {
    return axios.get(ossUrl + 'api/httpH5/3107', {
        params
    })
}

// 查询省市区
export const findProvinceAndCity = (params) => {
    return axios.get('develop/developbasicinfo/findProvinceAndCity', {
        params
    })
}

// 查询平台公司
export const findPaltList = (params) => {
    return axios.get('develop/developbasicinfo/queryCompany', {
        params
    })
}

// 变更记录
export const findSignscale = (params) => {
    return axios.get('develop/developsignscalechange/querySignScaleChange', {
        params
    })
}

// 查询平台公司目标分部
export const findSubsectionList = (params) => {
    return axios.get('rms/companyTarget/subsection', {
        params
    })
}
export const getCompany = (params) => {
    return axios.get('rms/companyTarget/queryCompanyShortName', {
        params
    })
}
export const getCityList = (params) => {
    return axios.get('rms/companyTarget/queryCity', {
        params
    })
}
// 新增 公司分类级别
export const updateBasicinfo = (params) => {
    return axios.post('develop/developbasicinfo/update', params)
}
// 平台品类销售分析
export const getPaltCategory = (params) => {
    return axios.get('rms/platform/category-analy', { params })
}
// 平台品类销售分析
export const findPlatCategorySum = (params) => axios.get('rms/platform/category-analy/total', { params })
// 平台品牌列表查询
export const getPaltbarnd = (params) => {
    return axios.get('rms/platform/category-analy/brand', { params })
}
// 平台品类查询
export const getPaltSys = (params) => {
    return axios.get('rms/platform/category-analy/system-category', { params })
}
// 平台利润统计分页列表
export const getProfitList = (params) => {
    return axios.get('rms/platform/profit-statistics', { params })
}
// 平台利润统计导出
export const statisticsExport = (params) => {
    return axios.get('rms/platform/profit-statistics/export', { params })
}
// 平台利润统计合计
export const total = (params) => {
    return axios.get('rms/platform/profit-statistics/total', { params })
}

// 公司类型
export const getCompanyType = (params) => {
    return axios.get(ossUrl + 'api/httpH5/4710', { params })
}

// 平台公司数据
export const developBasicInfoList = (params) => {
    return axios.post('develop/developbasicinfo/queryPageList', params)
}

// 平台公司数据弹窗
export const developSignscaleChange = (params) => {
    return axios.post('develop/developsignscalechange/queryPageList', params)
}
// 平台公司数据弹窗
export const developregisteredfundchange = (params) => {
    return axios.post('develop/developregisteredfundchange/queryPageList', params)
}
// 变更签约规模
export const updateDevelopsginInfo = (params) => {
    return axios.post('develop/developsgininfo/update', params)
}
export const triggerApply = (params) => {
    return axios.post(`develop/developbasicinfo/triggerApply`, params)
}
// 发展在线 基础信息校验
export const getCheckField = (params) => {
    return axios.post('develop/developbasicinfo/checkField', params)
}
// 发展在线 新增
export const addDevelopinfo = (params) => {
    return axios.post('develop/developbasicinfo/add', params)
}
// 发展在线 基本信息
export const getDevelopbasic = (params) => {
    return axios.get('develop/developbasicinfo/query', { params })
}
export const updateDevelopbasic = (params) => {
    return axios.post('develop/developbasicinfo/update', params)
}

// 发展在线 其他信息
export const getDevelopother = (params) => {
    return axios.get('develop/developotherinfo/query', { params })
}
export const updateDevelopother = (params) => {
    return axios.post('develop/developotherinfo/update', params)
}
// 发展在线 签约信息
export const getDevelopsign = (params) => {
    return axios.get('develop/developsgininfo/query', { params })
}
export const updateDevelopsign = (params) => {
    return axios.post('develop/developsgininfo/update', params)
}
// 发展在线 账户信息
export const getDevelopaccount = (params) => {
    return axios.get('develop/developaccountinfo/query', { params })
}
export const updateDevelopaccount = (params) => {
    return axios.post('develop/developaccountinfo/update', params)
}
// 天眼查数据
export const getTycHolder = (params) => {
    return axios.get(`develop/developbasicinfo/getTycHolder/${params}`)
}
// 发展在线接口迁移
export const getTycBasicInfo = (params) => {
    return axios.get(`develop/developbasicinfo/getTycBasicInfo/${params}`)
}
export const getTycMainStaff = (params) => {
    return axios.get(`develop/developbasicinfo/getTycMainStaff/${params}`)
}
// 承诺值分页
export const getCommitmentList = (params) => {
    return axios.get(`backend/fund-plan/commitment`, { params })
}
// 承诺值合计信息
export const getCommitmentTotal = (params) => {
    return axios.get(`backend/fund-plan/commitment/total`, { params })
}
