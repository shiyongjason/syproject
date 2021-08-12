
<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-form ref="formmain" :model="categoryForm" :rules="rules">
                <div class="query-col__label">
                    <el-form-item label="品类名称：" prop="frontCategoryName">
                        <el-input v-model.trim="categoryForm.frontCategoryName" placeholder="请输入" maxlength="10"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="关联类目：" prop="categoryIdList" ref="categoryIdList">
                    <div class="query_tag">
                        <el-tag :key="index" v-for="(item,index) in checkList" closable :disable-transitions="false" @close="handleClose(item,index)">
                            {{item.pcategoryName}}>{{item.scategoryName}}>{{item.name}}
                        </el-tag>
                    </div>
                </el-form-item>
            </el-form>
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
                        <span>类目编码：{{ data.code }}</span>
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
import { Vue, Component } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
// import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import { getTreeCategroy, addCategroy, getCateGroyDetail, editCategroy } from './api/index'

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
    @Action('setNewTags') setNewTags!: Function

    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    defaultProps={
        children: 'subCategoryList',
        label: 'name',
        value: 'code'
    }
    queryParams={
        searchContent: '',
        frontCategoryId: null
    }
    data:any[] = []
    expandCell:any[]=[]
    // checkList:any[]|[]=[]  这里有个类型定义问题 never
    checkList:any[]=[]
    categoryForm:any={
        frontCategoryName: '',
        categoryIdList: []
    }
    // 校验
    get rules () {
        let rules = {
            frontCategoryName: [
                { required: true, message: '请输入楼层名称', trigger: 'blur' }
            ],
            categoryIdList: [
                { required: true,
                    validator: (rule, value, callback) => {
                        console.log(this.categoryForm.categoryIdList)
                        if ((this.categoryForm.categoryIdList && this.categoryForm.categoryIdList.length == 0) || !this.categoryForm.categoryIdList) {
                            callback(new Error('请选择关联类目'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }
            ]
        }
        return rules
    }

    async getList () {
        this.queryParams.frontCategoryId = this.$route.query.id
        const { data } = await getTreeCategroy(this.queryParams)
        this.data = this.resolveData(data)
    }

    async getDetail () {
        let _tags = []
        const { data } = await getCateGroyDetail(this.$route.query.id)
        this.categoryForm = { ...data }
        data.bossCategorySpuDetailResponseList && data.bossCategorySpuDetailResponseList.length > 0 && data.bossCategorySpuDetailResponseList.map((item:any) => {
            _tags.push(item.categoryId)
        })
        this.$nextTick(async () => {
            console.log(_tags)
            this.categoryForm.categoryIdList = _tags
            this.$refs['tree'].setCheckedKeys(_tags)
            // 渲染时候会有个先后
            setTimeout(() => {
                let _nodes = this.$refs['tree'].getCheckedNodes()
                this.checkList = _nodes.filter((item) => item.level == 3)
            }, 500)
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

        //         const map = new Map()
        //   return arr.filter((item) => !map.has(item[id] + '') && map.set(item[key] + '', 1))
    }

    getCheckedNodes () {
        console.log(this.$refs['tree'].getCheckedNodes())
    }

    handleClose (item, index) {
        this.categoryForm.categoryIdList = []
        let _tags = []
        this.checkList.splice(index, 1)
        this.checkList.map(item => {
            this.categoryForm.categoryIdList.push(item.id)
        })
        let newTags = this.checkList.filter(val => item.id != val.id)
        console.log(newTags)
        newTags.map(item => {
            _tags.push(item.id)
        })
        this.$refs['tree'].setCheckedKeys(_tags)
    }

    async onSave () {
        // if (!this.categoryForm.frontCategoryName) {
        //     this.$message.warning('请输入品类名称')
        //     return
        // }

        this.$refs['formmain'].validate(async (valid) => {
            if (valid) {
                console.log(valid)
                if (this.$route.query.id) {
                    await editCategroy(this.categoryForm)
                } else {
                    await addCategroy(this.categoryForm)
                }
                this.$router.go(-1)

                this.setNewTags((this.$route.fullPath).split('?')[0])
            }
        })
    }

    onCancel () {
        this.$router.go(-1)

        this.setNewTags((this.$route.fullPath).split('?')[0])
    }

    onChecked (row, cnode) {
        let checkedNodes = cnode.checkedNodes
        this.checkList = checkedNodes.filter((item) => item.level == 3)

        this.categoryForm.categoryIdList = []
        this.checkList.map(item => {
            this.categoryForm.categoryIdList.push(item.id)
        })
        // if (this.categoryForm.categoryIdList.length > 0) {
        //     this.$refs['formmain'].validateField('categoryIdList')
        // } else {
        //     this.$refs['categoryIdList'].clearValidate('categoryIdList')
        // }
        console.log(this.categoryForm.categoryIdList)
    }

    // 递归处理数据
    resolveData (data, parentIsFold = true, grondIsFold = true, pcategoryName = '', scategoryName = '', dcategoryName = '') {
        return data.map((item, index, arr) => {
            item.disabled = item.relation
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
