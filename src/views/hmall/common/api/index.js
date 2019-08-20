import instance from '@/api/axios_new.js'
import { interfaceUrl } from '@/api/config'
// 获取B2b用户信息
export const getB2bUserInfo = (params) => { return instance.get(interfaceUrl + `ims/organization/${params.organizationCode}`) }
