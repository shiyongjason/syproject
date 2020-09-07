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
export default {
    data () {
        return {
            editableTabsValue: '首页'
        }
    },
    computed: {
        showTags () {
            return this.tagsList.length > 0
        },
        ...mapState({
            tagsList: state => state.tagsList, // TODO  以前是 state.layout.tagslist
            isReload: state => state.layout.isReload
        })
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

                !isExist && this.tagsList.push({
                    title: route.meta.tagName,
                    path: (route.fullPath).split('?')[0],
                    name: route.name,
                    query: route.query
                })
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
        }
    },
    watch: {
        $route (newValue, oldValue) {
            this.setTags(newValue)
        }
    },
    mounted () {
        let tags = []
        if (this.isReload) {
            tags = JSON.parse(sessionStorage.getItem('tagsList'))
            this.tagUpdate(tags || [])
            this.reloadUpdate(false)
        }
        this.setTags(this.$route)
    }
}

</script>

<style  lang="scss">
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
