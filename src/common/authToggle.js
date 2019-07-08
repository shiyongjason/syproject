export function authToggle(RoutePath) {
    const route = RoutePath
    const subRoute = route.split('/').slice(-1)[0]
    const MENULIST = JSON.parse(sessionStorage.getItem('menuList'))
    MENULIST.forEach(value => {
        if (route.indexOf(value.authUri) > -1) {
            if (value.childAuthList.length > 0) {
                value.childAuthList.forEach(value2 => {
                    if (subRoute === value2.authUri) { // 这里限定只能是2级路由
                        if (value2.childAuthList.length > 0) {
                            if (value2.childAuthList[0].have) {
                                this.MODULE.push(value2.childAuthList[0].authCode)
                            }
                            value2.childAuthList[0].childAuthList.forEach(btn => {
                                // console.log(btn)
                                if (btn.have) {
                                    this.BUTTON.push(btn.authCode)
                                }
                            })
                            value2.childAuthList[0].pageConfig.forEach(title => {
                                // console.log(title)
                                if (title.have) {
                                    this.TITLE.push(title.id)
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}
