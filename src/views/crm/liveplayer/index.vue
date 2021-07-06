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
                    <h-button type="primary" class="ml20" @click="onAdd">新建落地页</h-button>
                </div>
            </div>
            <!-- end search bar -->
            <hosJoyTable localName="V3.5.1" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe  :column="tableLabel" :data="tableData"  actionWidth='250' isAction :isActionFixed='tableData&&tableData.length>0' >
                <template #action="slotProps">
                    <h-button table @click="onEditLive(slotProps.data.row)">编辑</h-button>
                    <h-button table >放在首页</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)">删除</h-button>
                </template>
            </hosJoyTable>
        </div>

    </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import { CreateElement } from 'vue'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import ImageAddToken from '@/components/imageAddToken/index.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import * as Api from './api/index'
import { LiveRoomResponse } from './live'
import filters from '@/utils/filters'

import moment from 'moment'

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
     uploadParameters = {
         updateUid: '',
         reservedName: false
     }
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableData:LiveRoomResponse[] | [] = []

    private _queryParams = {}
    queryParams: any = {
        roomName: '',
        roomId: ''

    }

    PAYMENTSTATUS: Map<number | null, string> = new Map([
        [null, '-'],
        [1, '待支付'],
        [2, '部分支付']
    ])
    @State('userInfo') userInfo: any

    tableLabel:tableLabelProps = [
        { label: '品牌视频', prop: 'brandVideoUrl', width: '100' },
        { label: '落地页名称', prop: 'roomName', width: '130' },
        { label: '品牌logo',
            prop: 'brandLogoUrl',
            render: (h: CreateElement, scope:TableRenderParam): JSX.Element => {
                return (
                    <span class="label_img">
                        <ImageAddToken file-url={scope.row.brandLogoUrl}/>
                    </span>
                )
            }
        },
        { label: '直播间ID', prop: 'roomId' },
        { label: '创建时间', prop: 'createTime', displayAs: 'YYYY-MM-DD HH:mm:ss' },
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

    onDelete (val) {
        this.$confirm('确定删除该条落地页信息吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            console.log(val)

            await Api.deleteLiveInfo(val.id)
            this.$message.success('落地页删除成功~')
            this.getList()
        }).catch(() => {

        })
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
