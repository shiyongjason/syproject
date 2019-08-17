<template>
    <!-- <el-tabs v-model="editableTabsValue" type="card"  @tab-remove="closeTags">
  <el-tab-pane
    v-for="(item, index) in tagsList"
    :key="item.name"
    :label="item.title"
    :name="item.name"
    :closable="item.name!='index'"
  >

  </el-tab-pane>
</el-tabs> -->
    <div
        class="tags"
        v-if="showTags"
    >
        <ul>
            <li
                class="tags-li"
                v-for="(item,index) in tagsList"
                :class="{'active': isActive(item.path)}"
                :key="index"
            >
                <router-link
                    :to="item.path + serializeLink(item.query)"
                    class="tags-li-title"
                >
                    {{item.title}}
                </router-link>
                <span
                    class="tags-li-icon"
                    @click="closeTags(index)"
                ><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <!-- <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <div class="tags-li active">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu
                    size="small"
                    slot="dropdown"
                    background-color="#545c64"
                >
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                   <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div> -->
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data () {
        return {
            tagsList: [],
            editableTabsValue: '首页'
        }
    },
    computed: {
        showTags () {
            return this.tagsList.length > 0
        },
        ...mapState({
            newTags: state => state.tagsInfo
        })
    },
    methods: {
        ...mapMutations({
            tagsInfo: 'TAGS_INFO'
        }),
        isActive (path) {
            return path === (this.$route.fullPath).split('?')[0]
        },
        // 关闭单个标签
        closeTags (index) {
            const delItem = this.tagsList.splice(index, 1)[0]
            const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
            if (item) {
                delItem.path === this.$route.fullPath && this.$router.push(item.path)
            } else {
                this.$router.push('/')
            }
        },
        // 关闭全部标签
        closeAll () {
            // this.tagsList = [{
            //     title: '首页',
            //     path: '/',
            //     name: 'index'
            // }]
            this.tagsList = []
            this.tagsInfo(this.tagsList)
            this.$router.push('/')
        },
        // 关闭其他标签
        closeOther () {
            const curItem = this.tagsList.filter(item => {
                return item.path === this.$route.fullPath
            })
            this.tagsList = curItem
            // TODO  session
            // this.tagsInfo(this.tagsList)
            sessionStorage.setItem('tagsList', JSON.stringify(this.tagsList))
        },
        // 设置标签
        setTags (route) {
            if (route.meta.tagName) {
                const isExist = this.tagsList.some(item => {
                    return (item.path === (route.fullPath).split('?')[0])
                })
                !isExist && this.tagsList.push({
                    title: route.meta.tagName,
                    path: (route.fullPath).split('?')[0],
                    name: route.name,
                    query: route.query
                })
            }

            // this.tagsList = this.tagsList.filter(item =>
            //     item.name != 'index'
            // ).push({
            //     title: '首页',
            //     path: '/index',
            //     name: 'index'
            // })
            this.editableTabsValue = route.name
            // this.tagsInfo(this.tagsList)
            sessionStorage.setItem('tagsList', JSON.stringify(this.tagsList))
        },
        handleTags (command) {
            command === 'other' ? this.closeOther() : this.closeAll()
        },
        serializeLink (params) {
            if (Object.keys(params).length < 1) return ''
            let link = '?'
            for (let key in params) {
                link += (key + '=' + params[key] + '&')
            }
            return link
        }
    },
    watch: {
        $route (newValue, oldValue) {
            this.setTags(newValue)
        }
    },
    mounted () {
        const tags = JSON.parse(sessionStorage.getItem('tagsList'))
        // const isExist = this.newTags.some(item => {
        //     return item.path == '/'
        // })
        // !isExist && this.newTags.push({
        //     title: '首页',
        //     path: '/',
        //     name: 'index'
        // })
        this.tagsList = tags || []
        this.setTags(this.$route)
    }
    // updated () {
    //     console.log(2)
    //     const tags = JSON.parse(sessionStorage.getItem('tagsList'))
    //     // const isExist = this.newTags.some(item => {
    //     //     return item.path == '/'
    //     // })
    //     // !isExist && this.newTags.push({
    //     //     title: '首页',
    //     //     path: '/',
    //     //     name: 'index'
    //     // })
    //     this.tagsList = tags || []
    //     this.setTags(this.$route)
    // }
}

</script>

<style  lang="scss">
.tags {
    position: relative;

    overflow: hidden;
    // background: #fff;
    padding-left: 10px;
    padding-right: 120px;
}

.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-x: inherit;
}

.tags-li {
    float: left;
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
