import { B2bUrl, ossUrl, interfaceUrl } from '@/api/config'
import instance from '@/api/axios_new.js'

// 钱包支付开通情况
export const getPurseOpenCase = (params) => {
    return instance.get(B2bUrl + 'merchant/api/mybank/merchant/member/page', {
        params
    })
}

// 通过父机构code查询子机构集合
export const getListByParent = (params) => {
    return instance.get(ossUrl + 'api/organization/listByParent', {
        params
    })
}

// 查询平台公司
export const findPaltList = (params) => {
    return instance.get(interfaceUrl + 'develop/developbasicinfo/queryCompany', {
        params
    })
}
