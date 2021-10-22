// import { deepCopy } from '@/utils/utils'
import { cloneDeep } from 'lodash'

const makeMenusReal = (Route, Data) => {
    const tempRoute = cloneDeep(Route)
    const result = tempRoute.filter(value => {
        if (value.path === '') {
            return true
        }
        // const hasAuth = Data.includes(value.path)
        // [{url:url,authCode:authCoe}] 匹配 val
        const hasAuth = Data.filter(val => val.url == value.path).length > 0
        if (value.children) {
            value.children = makeMenusReal(value.children, Data)
        }
        return hasAuth
    })
    return result
}

// 根据后端返回的URI，生成router
export const makeMenus = (Route, Data) => {
    const result = makeMenusReal(Route, Data)
    result.push({
        path: '*',
        meta: {
            isMenu: false
        },
        redirect: '/403'
    })
    return result
}

// 拍平后端返回的权限数据
export const handleMenuResources = (data, resourceList, level = 1) => {
    data && data.forEach(item => {
        const url = item.authUri || item.resourceAddress
        if (url) {
            resourceList.push({ url: url, authCode: item.authCode, level: level })
        }
        if (item.childAuthList) {
            handleMenuResources(item.childAuthList, resourceList, 2)
        }
        if (item.authResourceList) {
            handleMenuResources(item.authResourceList, resourceList, 3)
        }
    })
}

// 根据后端返回的URI，去authCode
