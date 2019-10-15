import axios from 'axios'
// import { ccpBaseUrl } from '../../../api/config'
import { ossUrl } from '@/api/config'
/*
@申请
*/

// axios.defaults.baseURL = 'http://192.168.27.251:34000/'
export const getDueapply = (params) => {
    return axios.get('/develop/dueapply/queryPageList', { params })
}
export const adddueapply = (params) => {
    return axios.post('/develop/dueapply/add', params)
}
export const updateDueapply = (params) => {
    return axios.post('/develop/dueapply/update', params)
}
export const deleteDueapply = (params) => {
    return axios.delete(`/develop/dueapply/delete/${params}`, params)
}
export const appDueapply = (params) => {
    return axios.post('/develop/dueapply/apply', params)
}
export const getDueapplydetail = (params) => {
    return axios.get('/develop/dueapply/query', { params })
}
export const getDueApproval = (params) => {
    return axios.get('/develop/dueflowprocess/queryCompanyProcessList', { params })
}
// export const getFlow = (params) => {
//     return axios.get('/develop/dueflowprocess/queryList/', { params })
// }
export const getFlow = (params) => {
    return axios.get('/develop/dueflowprocess/queryCompanyProcessList', { params })
}
/*
@评审
*/
// 获取评审
export const getDuemain = (params) => {
    return axios.get('develop/duemain/queryPageList', { params })
}
export const postDuemain = (params) => {
    return axios.post('develop/duemain/apply', params)
}
// 获取天眼查url
export const getTianyanUrl = (params) => {
    return axios.get(`develop/companyurl/${params}`)
}

// 查询合作目标
export const getCooperativetarget = (params) => {
    return axios.get(`develop/cooperativetarget/${params}`)
}
/*
@ 组织尽调
*/
// 新增组织尽调
export const addOrganization = (params) => {
    return axios.post('develop/organization', params)
}
export const updateOrganization = (params) => {
    return axios.put('develop/organization', params)
}
// 查询组织尽调
export const getOrganization = (params) => {
    return axios.get(`develop/organization/${params}`)
}

/**
 * 商业尽调
 */
export const getBusiness = (params) => {
    return axios.get(`develop/business/${params}`)
}
export const addBusiness = (params) => {
    return axios.post('develop/business', params)
}
export const putBusiness = (params) => {
    return axios.put('develop/business', params)
}
export const findChannels = (params) => {
    return axios.get('develop/channels', params)
}
/*
查询一项否决
*/
// 查询一项否决
export const getoneticketveto = (params) => {
    return axios.get('develop/oneticketveto', { params })
}
// 查询 分类 and 指标
export const getDueconfig = (params) => {
    return axios.get('develop/dueconfig', { params })
}
// 新增 一票否决
export const addoneticketveto = (params) => {
    return axios.post('develop/oneticketveto', params)
}
// 编辑 一票否决
export const updateoneticketveto = (params) => {
    return axios.put('develop/oneticketveto', params)
}
// 删除 一票否决
export const deleteoneticketveto = (params) => {
    return axios.delete(`develop/oneticketveto/${params}`)
}

/*
评分项配置
*/
export const getScorerules = (params) => {
    return axios.get('develop/scorerules', { params })
}
// 新增标准分
export const addScorerules = (params) => {
    return axios.post('develop/scorerules', params)
}
// 编辑标准分
export const putScorerules = (params) => {
    return axios.put('develop/scorerules', params)
}
// 删除标准分
export const deleteScorerules = (params) => {
    return axios.delete(`develop/scorerules/${params}`)
}

/*
@标准分数配置列表查询
*/
// 查看标准分
export const getStandardscore = (params) => {
    return axios.get('develop/standardscore/', { params })
}
/*
合作目标
*/
// 查询合作目标
export const getDueLegal = (params) => {
    return axios.get(`develop/cooperativetarget/${params}`)
}
// 新增合作目标
export const addCooperativetarget = (params) => {
    return axios.post('develop/cooperativetarget', params)
}
// 修改合作目标
export const putCooperativetarget = (params) => {
    return axios.put('develop/cooperativetarget', params)
}

/*
财务尽调
*/
export const getFinance = (params) => {
    return axios.get(`develop/duefinance/${params}`)
}
export const saveFinance = (params) => {
    return axios.post('develop/duefinance', params)
}
/*
尽调评估及KPI
*/
export const getAssessment = (params) => {
    return axios.get(`develop/dueapply/assessment/${params}`)
}
export const getDueapprovalconclusion = (params) => {
    return axios.get('develop/dueapprovalconclusion/list', { params })
}
// 省市区
export const provinces = (params) => {
    return axios.post(ossUrl + 'api/httpH5/3041', params)
}
// 新增
export const addStandardscore = (params) => {
    return axios.post('develop/standardscore/', params)
}
export const updateStandardscore = (params) => {
    return axios.put('develop/standardscore/', params)
}
export const deleteStandardscore = (params) => {
    return axios.delete(`develop/standardscore/${params}`)
}

/*
@附件
*/
export const getAttach = (params) => {
    return axios.get(`develop/dueattach/${params}`)
}

export const addAttach = (params) => {
    return axios.post('develop/dueattach/', params)
}
// 法务查询
// export const findJusticeData = (params) => {
//     return axios.get(`develop/duelegal/${params.applyId}`)
// }
// 法务保存,提交 第一次
export const createJusticeDoFirst = (params) => {
    return axios.post('develop/duelegal/', params)
}
// 法务保存,提交
export const createJusticeDo = (params) => {
    return axios.put('develop/duelegal/', params)
}
// 省市区
export const getAreacode = (params) => {
    return axios.post(ossUrl + '/api/httpH5/3044', params)
}
// 省市区
export const getChiness = (params) => {
    return axios.get(ossUrl + '/api/httpH5/3164', { params })
}
