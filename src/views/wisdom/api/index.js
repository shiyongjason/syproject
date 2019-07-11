import axios from 'axios'
import { interfaceUrl } from '@/api/config'
// 公司概览 公司统计信息
export const getStatistics = (params) => {
    return axios.get(interfaceUrl + 'ims/report/overall/company/statistics', {
        params
    })
}

// 饼状图 统计
export const getSales = (params) => {
    return axios.get(interfaceUrl + 'ims/report/overall/sales-rate', {
        params
    })
}
// 折线图统计
export const getSummary = (params) => {
    return axios.get(interfaceUrl + 'ims/report/overall/summary', {
        params
    })
}

// 新增数据统计
export const addStatistics = (params) => {
    return axios.get(interfaceUrl + 'ims/report/add/statistics', {
        params
    })
}
// 新增数据统计 接口拆分  一年
export const addStatisticsYear = (params) => {
    return axios.get(interfaceUrl + 'ims/report/add/statistics-year', {
        params
    })
}

// 销售数据统计
export const sellStatistics = (params) => {
    return axios.get(interfaceUrl + 'ims/report/sell/statistics', {
        params
    })
}

// 英雄榜
export const hexoList = (params) => {
    return axios.get(interfaceUrl + 'ims/report/hero/list', {
        params
    })
}

// 平台公司基本信息
// export const findPlatCompany = (params) => {
//     return axios.post(interfaceUrl + '/hamdevelopbasicinfo/queryPageList', params)
// }

// 分部目标管理列表
export const findBrandTargetTable = (params) => {
    return axios.get(interfaceUrl + 'ims/subsectiontarget/queryPageList', {
        params
    })
}
// 分部列表查询
export const findBranchList = (params) => {
    return axios.post(interfaceUrl + 'ims/dept/queryDeptList', params)
}
// 新增－－－－分部列表查询
export const findBranchListNew = (params) => {
    return axios.get(interfaceUrl + 'ims/subsectiontarget/subsection', { params })
}
// 大区列表查询
export const findRegionList = (params) => {
    return axios.post(interfaceUrl + 'ims/dept/queryRegionList', params)
}
// 获取平台目标列表
export const findTableList = (params) => {
    return axios.get(interfaceUrl + 'ims/companyTarget/queryPageList', {
        params
    })
}
// 根据大区获取平台公司
export const queryCompanyByParams = (params) => {
    return axios.post(interfaceUrl + 'develop/developbasicinfo/queryCompanyByParams', params)
}
// 获取平台销售分析列表
export const getPlatformSale = (params) => {
    return axios.get(interfaceUrl + 'ims/platSaleAnalyze', { params })
}
// 获取平台销售分析列表 合计
export const getPlatformSaleSum = (params) => {
    return axios.get(interfaceUrl + 'ims/platSaleAnalyzeSum', { params })
}
// 获取分部销售分析列表
export const getBranchSale = (params) => {
    return axios.get(interfaceUrl + 'ims/subsection-sale/adjective', { params })
}
// 获取分部销售分析列表 合计
export const getBranchSaleSum = (params) => {
    return axios.get(interfaceUrl + 'ims/subsection-sale/total', { params })
}
// 查询平台公司基本信息
export const findCompanyList = (params) => {
    return axios.post(interfaceUrl + 'develop/developbasicinfo/queryPageListPlusMis', params)
}

// 机构在线的 分部查询
export const findDepList = (params) => {
    return axios.get('api/httpH5/3107', {
        params
    })
}

// 查询省市区
export const findProvinceAndCity = (params) => {
    return axios.get(interfaceUrl + 'develop/developbasicinfo/findProvinceAndCity', {
        params
    })
}

// 查询平台公司
export const findPaltList = (params) => {
    return axios.get(interfaceUrl + 'develop/developbasicinfo/queryCompany', {
        params
    })
}

// 变更记录
export const findSignscale = (params) => {
    return axios.get(interfaceUrl + 'develop/developsignscalechange/querySignScaleChange', {
        params
    })
}

// 查询平台公司目标分部
export const findSubsectionList = (params) => {
    return axios.get(interfaceUrl + 'ims/companyTarget/subsection', {
        params
    })
}
// 新增 公司分类级别
export const updateBasicinfo = (params) => {
    return axios.post(interfaceUrl + 'develop/developbasicinfo/update', params)
}
