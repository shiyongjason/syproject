<template>
    <div class="page-body B2b liveplayer">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">落地页面名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.roomName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>

                <div class="query-cont__col">
                    <div class="query-col__label">直播间ID：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.roomId" maxlength="20" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <h-button type="primary" class="ml20" @click="onAdd" v-if="hosAuthCheck(Auths.CRM_LIVE_ADD)">新建落地页</h-button>
                </div>
            </div>
            <!-- end search bar -->
            <hosJoyTable localName="V3.5.1" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe :column="tableLabel" :data="tableData" actionWidth='250' isAction :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <div v-if="!slotProps.data.row.homePage">
                        <h-button table @click="onEditLive(slotProps.data.row)" v-if="hosAuthCheck(Auths.CRM_LIVE_EDIT)">编辑</h-button>
                        <h-button table v-if="slotProps.data.row.status==1&&hosAuthCheck(Auths.CRM_LIVE_ONTOP)" @click="onPutHome(slotProps.data.row)">放在首页</h-button>
                        <h-button table @click="onDelete(slotProps.data.row)" v-if="hosAuthCheck(Auths.CRM_LIVE_DELETE)">删除</h-button>
                    </div>
                    <div v-else>
                        <h-button table @click="onNoHome(slotProps.data.row)" v-if="hosAuthCheck(Auths.CRM_LIVE_NOTOP)">不放在首页</h-button>
                    </div>
                </template>
            </hosJoyTable>
        </div>
        <el-dialog width="600px" title="视频播放" @close="()=>{this.innerVisible= false}" :visible.sync="innerVisible" append-to-body>
            <Video ref="videoPlay" :src="brandVideoUrl" class="avatarVideo" controls="controls">您的浏览器不支持视频播放
            </Video>
        </el-dialog>
    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import * as Auths from '@/utils/auth_const'
import * as Api from './api/index'
import { LiveRoomResponse } from './live'
import filters from '@/utils/filters'

import moment from 'moment'
const ImageAddToken = require('@/components/imageAddToken/index.vue').default

@Component({
    name: 'liveplayer',
    components: {
        hosJoyTable,
        ImageAddToken
    }
})

export default class Liveplayer extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    Auths=Auths
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    innerVisible:boolean = false
    brandVideoUrl:string = ''
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableData:LiveRoomResponse[]= []

    private _queryParams = {}
    queryParams: any = {
        roomName: '',
        roomId: ''

    }

    @State('userInfo') userInfo: any

    tableLabel:tableLabelProps = [
        { label: '品牌视频',
            prop: 'brandVideoUrl',
            width: '100',
            render: (h: CreateElement, scope:TableRenderParam): JSX.Element => {
                return (
                    <div>
                        {
                            scope.row.brandVideoUrl
                                ? <span class="label_img" onClick={() => this.onShowVide(scope)}>
                                    <img src='https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20210706/356a3aec-5c8e-47df-941a-91a222fe9e07.png'/>
                                </span>
                                : '-'
                        }
                    </div>
                )
            }
        },
        { label: '落地页名称', prop: 'roomName', width: '130' },
        { label: '品牌logo',
            prop: 'brandLogoUrl',
            render: (h: CreateElement, scope:TableRenderParam): JSX.Element => {
                return (
                    <span class="label_img">
                        {
                            scope.row.brandLogoUrl
                                ? <a href={scope.row.brandLogoUrl} target="_blank"><img src={scope.row.brandLogoUrl}/></a>
                                : '-'
                        }
                    </span>
                )
            }
        },
        { label: '直播间ID', prop: 'roomId' },
        { label: '创建时间', prop: 'createTime', width: '160', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新时间', prop: 'updateTime', width: '160', displayAs: 'YYYY-MM-DD HH:mm:ss' },
        { label: '更新人', prop: 'updateBy', width: '160' },
        { label: '落地页状态', prop: 'status', width: '150', dicData: [{ value: 1, label: '启用' }, { value: 2, label: '禁用' }] }

    ]

    async getList () {
        const { data } = await Api.getLiveList(this.queryParams)
        this.tableData = data || []
    }

    async onAdd () {
        this.$router.push({ path: '/goodwork/playeredit' })
    }

    async onPutHome (val) {
        await Api.getHomePage(val.id)
        this.$message.success('设置首页成功~')
        this.getList()
    }
    async onNoHome (val) {
        await Api.getNoHomePage(val.id)
        this.getList()
    }

    onDelete (val) {
        this.$confirm('确定删除该条落地页信息吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            await Api.deleteLiveInfo(val.id)
            this.$message.success('落地页删除成功~')
            this.getList()
        }).catch(() => {

        })
    }

    onShowVide (val) {
        this.innerVisible = true
        this.brandVideoUrl = val.row.brandVideoUrl
    }

    onEditLive (val) {
        this.$router.push({ path: '/goodwork/playeredit', query: { id: val.id } })
    }

    onReset () {
        this.queryParams = JSON.parse(JSON.stringify(this._queryParams))
        this.getList()
    }

    async mounted () {
        this.getList()
        this._queryParams = JSON.parse(JSON.stringify(this.queryParams))
    }
}
</script>

<style lang='scss' scoped>
@import "./css.scss";
</style>
