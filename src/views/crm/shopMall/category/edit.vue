
<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">品类名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.searchContent" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">品类名称：</div>
                    <div class="query_tag">
                        <p v-for="(item) in checkList" :key="item.id">{{item.pcategoryName}}>{{item.scategoryName}}>{{item.name}}</p>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">类名搜索：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="可输入类目名称、类目编码进行搜索" maxlength="50"></el-input>
                    </div>
                </div>

            </div>
            <!-- end search bar -->
            <div class="block">
                <p>使用 scoped slot</p>
                <el-tree :data="data" @check="onChecked" show-checkbox default-expand-all node-key="code" ref="tree" highlight-current :props=defaultProps>
                    <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ data.name }}</span>
                    </span> -->
                </el-tree>
            </div>
            <el-button @click="getCheckedNodes">通过 key 获取</el-button>
            <el-button @click="setCheckedNodes">通过 111 获取</el-button>

        </div>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
// import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import { CreateElement } from 'vue'
import { getTreeCateGroy } from './api/index'

@Component({
    name: 'Categoryedit',
    components: {
        hosJoyTable
    }
})
export default class Categoryedit extends Vue {
        $refs!: {
            form: HTMLFormElement
        }
        uploadParameters = {
            updateUid: '',
            reservedName: false
        }
        defaultProps={
            children: 'subCategoryList',
            label: 'name',
            value: 'code'
        }
        queryParams:object={
            searchContent: ''
        }
        data:any[] = [{
            id: 1,
            name: '一级 1',
            children: [{
                id: 4,
                name: '二级 1-1',
                children: [{
                    id: 9,
                    name: '三级 1-1-1'
                }, {
                    id: 10,
                    name: '三级 1-1-2'
                }]
            }]
        }]

        expandCell:any[]=[]
        // checkList:any[]|[]=[]  这里有个类型定义问题 never
        checkList:any[]=[]

        async getList () {
            const { data } = await getTreeCateGroy(this.queryParams)
            this.data = data
        }

        findUnques (arr) {
            var result = []
            var obj = {}
            for (var i = 0; i < arr.length; i++) {
                if (!obj[arr[i].id]) {
                    result.push(arr[i])
                    obj[arr[i].id] = true
                }
            }
            return result
        }

        getCheckedNodes () {
            console.log(this.$refs['tree'].getCheckedNodes())
        }
        setCheckedNodes () {
            this.$refs['tree'].setCheckedKeys(['010101'])
        }
        onChecked (row, checked) {
            console.log(row, checked)
            // if (row.level == 1 && checked) {
            //     console.log(1)
            //     row.subCategoryList.length > 0 && row.subCategoryList.map(item => {
            //         item.subCategoryList && item.subCategoryList.map(jtem => {
            //             this.checkList.push(jtem)
            //         })
            //     })
            // } else if (row.level == 1) {
            //     row.subCategoryList.length > 0 && row.subCategoryList.map(item => {
            //         item.subCategoryList && item.subCategoryList.map(jtem => {
            //             let one = this.checkList.filter(val => jtem.id == val.id)
            //             console.log(233, one)
            //             one.length > 0 && one.map(e => {
            //                 this.checkList.splice(this.checkList.indexOf(e), 1)
            //             })
            //         })
            //     })
            // }
            // if (row.level == 2 && checked) {
            //     row.subCategoryList.length > 0 && row.subCategoryList.map(jtem => {
            //         this.checkList.push(jtem)
            //     })
            // } else if (row.level == 2) {
            //     row.subCategoryList && row.subCategoryList.map(jtem => {
            //         let one = this.checkList.filter(val => jtem.id == val.id)
            //         one.length > 0 && this.checkList.splice(this.checkList.indexOf(one[0]), 1)
            //     })
            // }
            // if (row.level == 3 && checked) {
            //     this.checkList.push(row)
            // } else if (row.level == 3) {
            //     let one = this.checkList.filter(val => row.id == val.id)
            //     one.length > 0 && this.checkList.splice(this.checkList.indexOf(one[0]), 1)
            // }
            // console.log(this.findUnques(this.checkList))
        }

        // 递归处理数据
        resolveData (data, parentIsFold = true, grondIsFold = true, pcategoryName = '', scategoryName = '', dcategoryName = '') {
            return data.map((item, index, arr) => {
                if (item.level == 1) {
                    item.pcategoryName = item.name
                    item.scategoryName = ''
                    item.dcategoryName = ''
                }
                if (item.level == 2) {
                    item.pcategoryName = pcategoryName
                    item.scategoryName = item.name
                    item.dcategoryName = ''
                }
                if (item.level == 3) {
                    item.pcategoryName = pcategoryName
                    item.scategoryName = scategoryName
                    item.dcategoryName = item.name
                }

                if (item.subCategoryList && item.subCategoryList.length > 0) {
                    this.resolveData(item.subCategoryList, item._isFold, parentIsFold, item.pcategoryName, item.name)
                }
                return item
            })
        }

        mounted () {
            this.getList()
        }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>
