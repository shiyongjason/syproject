<template>
    <ul class="tabs-tags__cont" v-if="showTags">
        <li class="tabs-tags__item" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
            <router-link :to="item.path + serializeLink(item.query)" class="tabs-tags__item--title">
                {{item.title}}
            </router-link>
            <span class="tabs-tags__item--icon" @click="closeTags(index,isActive(item.path))">
                <i class="el-icon-close"></i>
            </span>
        </li>
    </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { clearCache, newCache } from '@/utils/index'

export default {
    data () {
        return {
            editableTabsValue: '首页',
            clickTags: false,
            newTags: [],
            oldTags: []
        }
    },
    computed: {
        showTags () {
            return this.tagsList.length > 0
        },
        ...mapState({
            tagsList: state => state.tagsList, // TODO  以前是 state.layout.tagslist
            isReload: state => state.layout.isReload,
            cachedInclude: state => state.cachedInclude,
            cachedExclude: state => state.cachedExclude
        }),
        canWatchTagsListData () {
            return JSON.parse(JSON.stringify(this.tagsList))
        }
    },
    methods: {
        ...mapMutations({
            tagUpdate: 'TAG_UPDATE',
            reloadUpdate: 'IS_RELOAD'
        }),
        isActive (path) {
            return path === (this.$route.fullPath).split('?')[0]
        },
        makeIndex (data) {
            let index = []
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    index.push(data[i].path.replace('/', ''))
                    if (data[i].children) {
                        if (data[i].children.length > 0) {
                            index.push(data[i].children[0].path.replace('/', ''))
                        }
                    }
                    break
                }
                let path = '/' + index.length > 0 ? index.join('/') : ''
                // if (path) {
                //     path = '/'
                // }
                this.$router.push({
                    path: path
                })
            }
        },
        // 关闭单个标签
        closeTags (index, isSelf) {
            let cloneTagsList = JSON.parse(JSON.stringify(this.tagsList))
            this.tagsList.splice(index, 1)
            if (this.tagsList.length < 1) {
                // this.$router.push('/')
                // TODO 不存在首页 默认跳转有权限的第一个路由
                const menu = JSON.parse(sessionStorage.getItem('menuList'))
                this.makeIndex(menu)
            } else if (isSelf) {
                let router = this.tagsList[this.tagsList.length - 1]
                if (Object.keys(router.query).length > 0) {
                    this.$router.push({ path: router.path, query: router.query })
                } else {
                    this.$router.push(this.tagsList[this.tagsList.length - 1].path)
                }
            }
            // add cachedExclude
            if (cloneTagsList.length > 0 && cloneTagsList[index].path.indexOf('/b2b/') > -1) {
                let isExist = false
                cloneTagsList.map(item => {
                    if (item.componentsName && (item.componentsName === cloneTagsList[index].componentsName) && (item.path === cloneTagsList[index].path)) {
                        this.cachedExclude.indexOf(item.componentsName) == -1 && clearCache(item.componentsName) // 如果把标签关闭掉则去掉该页面的缓存
                    }
                    if (cloneTagsList[index].middleComponents) {
                        if ((item.middleComponents === cloneTagsList[index].middleComponents) && (item.path !== cloneTagsList[index].path)) {
                            isExist = true
                        }
                    }
                })
                // 关闭的页面在tags中是否还存在使用一样的二级路由的页面，不存在则去掉二级路由的缓存
                if (!isExist) {
                    cloneTagsList[index] && cloneTagsList[index].middleComponents && this.cachedExclude.indexOf(cloneTagsList[index].middleComponents) == -1 && clearCache(cloneTagsList[index].middleComponents)
                }
                this.tagUpdate(this.tagsList)
            }
        },
        // 设置标签
        setTags (route) {
            if (route.meta.tagName) {
                const isExist = this.tagsList.some(item => {
                    let flag = false
                    if (item.path === (route.fullPath).split('?')[0]) {
                        let queryArr = (route.fullPath).split('?')[1] ? (route.fullPath).split('?')[1].split('&') : []
                        let query = {}
                        for (let j = 0; j < queryArr.length; j++) {
                            query[queryArr[j].split('=')[0]] = queryArr[j].split('=')[1]
                        }
                        item.query = query

                        flag = true
                    }
                    return flag
                })
                // add 列表页使用clearCache('spudetail')，先删缓存，fix点击别的列表项不请求详情接口的bug，又不影响tags切换缓存。

                const c = '/'
                const regex = new RegExp(c, 'g')
                const result = route.fullPath.match(regex)
                let middleComponents = ''// 二级路由name，for example:Wisdomrouter.js
                let curRouteComponents = ''
                curRouteComponents = route.matched[result.length - 1].components.default
                this.tagsList.forEach(item => {
                    if (item.componentsName && (item.componentsName == curRouteComponents.name) && this.cachedExclude.indexOf(curRouteComponents.name) > -1) {
                        setTimeout(() => {
                            route.path.indexOf('/b2b/') > -1 && newCache(item.componentsName)
                        }, 1000)
                    }
                })
                if (!isExist) {
                    // 目前只做最多三级目录的缓存
                    if (result.length === 3) { // 为了适配三级目录缓存
                        middleComponents = route.matched[result.length - 2].components.default
                        if (this.cachedInclude.indexOf(middleComponents.name) == -1) { // 不存在才添加
                            if (!middleComponents.name) console.error(':::请给二级路由加个组件唯一name:::')
                            route.path.indexOf('/b2b/') > -1 && newCache(middleComponents.name) // 缓存二级路由name
                        }
                    }
                    if (!curRouteComponents.name) console.error(':::请给当前组件加个组件唯一name:::')
                    this.cachedInclude.indexOf(curRouteComponents.name) == -1 && route.path.indexOf('/b2b/') > -1 && newCache(curRouteComponents.name || route.name)
                    this.tagsList.push({
                        title: route.meta.tagName,
                        path: (route.fullPath).split('?')[0],
                        name: route.name,
                        query: route.query,
                        componentsName: curRouteComponents.name,
                        middleComponents: middleComponents.name
                    })
                }
            }
            this.editableTabsValue = route.name
            this.tagUpdate(this.tagsList)
        },
        serializeLink (params) {
            if (params) {
                if (Object.keys(params).length < 1) return ''
                let link = '?'
                for (let key in params) {
                    link += (key + '=' + params[key] + '&')
                }
                return link
            }
        },
        onClickTags () {
            this.clickTags = true
        }
    },
    watch: {
        $route (newValue, oldValue) {
            this.$nextTick(() => {
                this.clickTags = false
            })
            if (this.clickTags === false) {
                const c = '/'
                const regex = new RegExp(c, 'g')
                const result = oldValue.path.match(regex)
                let oldRouteComponents = oldValue.matched[result.length - 1].components.default
                const isExist = this.tagsList.some(item => {
                    return item.componentsName === oldRouteComponents.name
                })
                // 处理不是通过点击tags关闭的逻辑，比如this.$router.go(-1)啥的。
                if (
                    this.cachedInclude.indexOf(oldRouteComponents.name) > -1 &&
                    this.cachedExclude.indexOf(oldRouteComponents.name) == -1 &&
                    !isExist
                ) {
                    clearCache(oldRouteComponents.name)
                }
            }
            this.setTags(newValue)
        },
        cachedInclude (val) {
            sessionStorage.setItem('cachedInclude', val)
        },
        cachedExclude (val) {
            sessionStorage.setItem('cachedExclude', val)
        }
    },
    mounted () {
        let tags = []
        if (this.isReload) {
            tags = JSON.parse(sessionStorage.getItem('tagsList'))
            this.tagUpdate(tags || [])
            this.reloadUpdate(false)
            if (this.$route.path.indexOf('/b2b/') > -1) {
                tags.map(item => {
                    if (item.middleComponents && (this.cachedInclude.indexOf(item.middleComponents) == -1)) {
                        newCache(item.middleComponents)
                    }
                    if (!item.componentsName) {
                        console.error(`:::请给${item.path}组件加个组件唯一name:::`)
                    }
                    this.cachedInclude.indexOf(item.componentsName || item.name) == -1 && newCache(item.componentsName || item.name) // 缓存所有tags打开的标签页面
                })
            }
        }
        this.setTags(this.$route)
    }
}

</script>

<style lang="scss" scoped>
.tabs-container__tags {
    display: flex;
    padding: 0 20px;
    height: 50px;
}

.tabs-tags {
    &__cont {
        display: flex;
        align-items: center;
        margin: 7px 20px 0;
        overflow: scroll;
    }

    &__item {
        margin-right: 4px;
        padding: 0 20px;
        box-sizing: border-box;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        background: #f5f7fa;
        border-radius: 2px;
        white-space: nowrap;
        transition: all 0.3s ease-in;

        &--title {
            display: inline-block;
            max-width: 80px;
            color: #666;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        &--icon {
            display: inline-block;
            margin-left: 4px;
            overflow: hidden;
        }

        &.active {
            background: #ff7a45;
            color: #ffffff;

            a {
                color: #ffffff;
            }
        }

        &:not(.active) {
            .tabs-tags__item--icon {
                display: none;
            }

            &:hover {
                .tabs-tags__item--icon {
                    display: inline-block;
                }
            }
        }
    }
}
.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
    color: #fff;
    border: 1px solid #ff7a45;
    background-color: #ff7a45;
}

// .tags-li-title {
//     float: left;
//     max-width: 80px;
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     // margin-right: 5px;
//     margin: 0 10px;
//     color: #666;
// }

.tags-li.active .tags-li-title {
    color: #fff;
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 109px;
    height: 30px;
    // background: #fff;
    z-index: 10;
}

/deep/.el-button--primary {
    background-color: #ff7a45;
    border-color: #ff7a45;
}
</style>
