
<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label"><i>*</i>品类名称：</div>
                    <div class="query-col__input">
                        <el-input v-model.trim="cateGoryForm.frontCategoryName" placeholder="请输入" maxlength="10"></el-input>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label"><i>*</i>关联类目：</div>
                    <div class="query_tag">
                        <el-tag :key="index" v-for="(item,index) in checkList" closable :disable-transitions="false" @close="handleClose(item,index)">
                            {{item.pcategoryName}}>{{item.scategoryName}}>{{item.name}}
                        </el-tag>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">类名搜索：</div>
                    <div class="query-col__input" style="width:500px">
                        <el-input v-model="queryParams.searchContent" placeholder="可输入类目名称、类目编码进行搜索" maxlength="50">
                            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                        </el-input>
                    </div>
                </div>

            </div>
            <!-- end search bar -->
            <div class="block">
                <p>类目列表</p>
                <el-tree :data="data" @check="onChecked" show-checkbox node-key="id" ref="tree" highlight-current :props=defaultProps>
                    <span class="custom-tree-node" slot-scope="{data }">
                        <span>{{ data.name }}</span>
                        <span>类目编码：{{ data.id }}</span>
                        <span>上架商品数量：{{ data.spuNumber }}</span>
                    </span>
                </el-tree>
            </div>
            <div class="category_bot">
                <el-button @click="onCancel">取消</el-button>
                <el-button type="primary" @click="onSave">确定</el-button>
            </div>
        </div>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
// import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import { CreateElement } from 'vue'
import { getTreeCateGroy, addCateGroy, getCateGroyDetail, editCateGroy } from './api/index'

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
    data:any[] = []
    expandCell:any[]=[]
    // checkList:any[]|[]=[]  这里有个类型定义问题 never
    checkList:any[]=[]
    cateGoryForm:any={
        frontCategoryName: '',
        categoryIdList: []
    }
    async getList () {
        const { data } = await getTreeCateGroy(this.queryParams)
        this.data = this.resolveData(data)
    }

    async getDetail () {
        let _tags = []
        const { data } = await getCateGroyDetail(this.$route.query.id)
        this.cateGoryForm = { ...data }
        data.bossCategorySpuDetailResponseList && data.bossCategorySpuDetailResponseList.length > 0 && data.bossCategorySpuDetailResponseList.map((item:any) => {
            _tags.push(item.categoryId)
        })
        this.$nextTick(async () => {
            console.log(_tags)
            this.$refs['tree'].setCheckedKeys(_tags)
            // 渲染时候会有个先后
            setTimeout(() => {
                let _nodes = this.$refs['tree'].getCheckedNodes()
                this.checkList = _nodes.filter((item) => item.level == 3)
            }, 0)
        })
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

    handleClose (item, index) {
        let _tags = []
        this.checkList.splice(index, 1)
        let newTags = this.checkList.filter(val => item.id != val.id)
        console.log(newTags)
        newTags.map(item => {
            _tags.push(item.id)
        })
        this.$refs['tree'].setCheckedKeys(_tags)
    }

    async onSave () {
        this.cateGoryForm.categoryIdList = []
        this.checkList.map(item => {
            this.cateGoryForm.categoryIdList.push(item.id)
        })
        if (!this.cateGoryForm.frontCategoryName) {
            this.$message.warning('请输入品类名称')
            return
        }
        if (this.cateGoryForm.categoryIdList.length == 0) {
            this.$message.warning('请选择关联类目')
            return
        }
        if (this.$route.query.id) {
            await editCateGroy(this.cateGoryForm)
        } else {
            await addCateGroy(this.cateGoryForm)
        }
        this.$router.push({ path: '/goodwork/category' })
    }

    onCancel () {
        this.$router.push({ path: '/goodwork/category' })
    }

    onChecked (row, cnode) {
        let checkedNodes = cnode.checkedNodes
        this.checkList = checkedNodes.filter((item) => item.level == 3)
        // if (row.level == 1 && checked) {
        //     row.subCategoryList.length > 0 && row.subCategoryList.map(item => {
        //         item.subCategoryList && item.subCategoryList.map(jtem => {
        //             this.checkList.push(jtem)
        //         })
        //     })
        // } else if (row.level == 1) {
        //     row.subCategoryList.length > 0 && row.subCategoryList.map(item => {
        //         item.subCategoryList && item.subCategoryList.map(jtem => {
        //             let one = this.checkList.filter(val => jtem.id == val.id)
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
        // if (row.level == 3) {
        //     console.log(333)
        //     let one = this.checkList.filter(val => row.id == val.id)
        //     console.log(one)
        //     if (one.length > 0) {
        //         this.checkList.splice(this.checkList.indexOf(one[0]), 1)
        //     } else {
        //         this.checkList.push(row)
        //     }
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
        if (this.$route.query.id) {
            this.getDetail()
        }
    }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>
