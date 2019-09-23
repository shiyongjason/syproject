<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path + serializeLink(item.query)" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index,isActive(item.path))">
                    <i class="el-icon-close"></i>
                </span>
            </li>
        </ul>
    </div>
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
            tagsList: state => state.layout.tagsList,
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
            console.log(data)
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
                console.log(!path)
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
                this.$router.push(this.tagsList[this.tagsList.length - 1].path)
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
.tags {
    position: relative;
    overflow: hidden;
    padding-left: 10px;
    padding-right: 10px;
}

.tags ul {
    // box-sizing: border-box;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow-x: scroll;
}

.tags-li {
    white-space: nowrap;
    display: inline-block;
    // float: left;
    margin: 0px 2px 0px 0px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 28px;
    line-height: 28px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
    color: #fff;
    border: 1px solid #ff7a45;
    background-color: #ff7a45;
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    // margin-right: 5px;
    margin: 0 10px;
    color: #666;
}

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
