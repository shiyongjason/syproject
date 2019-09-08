// 根据后端返回的URI，生成router
export const makeMenus = (Route, Data) => {
    return Route.filter(value => {
        if (value.path === '') {
            return true
        }
        const hasAuth = Data.includes(value.path)
        if (value.children) {
            value.children = makeMenus(value.children, Data)
        }
        return hasAuth
    })
}

// 拍平后端返回的权限数据
export const handleMenuResources =  (data, resourceList) => {
    data.forEach(item => {
        const url = item.authUri || item.resourceAddress
        if (url) {
            resourceList.push(url)
        }
        if (item.childAuthList) {
            handleMenuResources(item.childAuthList, resourceList)
        }
        if (item.authResourceList) {
            handleMenuResources(item.authResourceList, resourceList)
        }
    })
}
