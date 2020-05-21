import { deepCopy } from '@/utils/utils'

// 根据后端返回的URI，生成router
export const makeMenus = (Route, Data) => {
    const tempRoute = deepCopy(Route)
    return tempRoute.filter(value => {
        if (value.path === '') {
            return true
        }
        // const hasAuth = Data.includes(value.path)
        // [{url:url,authCode:authCoe}] 匹配 val
        const hasAuth = Data.filter(val => val.url == value.path).length > 0
        if (value.children) {
            value.children = makeMenus(value.children, Data)
        }
        return hasAuth
    })
}

// 拍平后端返回的权限数据
export const handleMenuResources = (data, resourceList) => {
    data && data.forEach(item => {
        const url = item.authUri || item.resourceAddress
        if (url) {
            resourceList.push({ url: url, authCode: item.authCode })
        }
        if (item.childAuthList) {
            handleMenuResources(item.childAuthList, resourceList)
        }
        if (item.authResourceList) {
            handleMenuResources(item.authResourceList, resourceList)
        }
    })
}

// 根据后端返回的URI，去authCode
