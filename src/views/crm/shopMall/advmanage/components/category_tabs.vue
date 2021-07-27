
<template>
    <div class="banner-tab">
        <div class="baner-btn mb20">
            <el-button type="primary" @click="onAdd" v-if="hosAuthCheck(advcategoryAdd)">新增品类推荐</el-button>
        </div>
        <hosJoyTable  ref="hosjoyTable" align="center" showPagination border stripe :column="tableLabel" :data="tableData" actionWidth='250' :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="onFindList" isAction
            :isActionFixed='tableData&&tableData.length>0'>
            <template #action="slotProps">
                <h-button table @click="onMove(slotProps.data.row,'up')" v-if="slotProps.data.row.sort!=1&&hosAuthCheck(advcategoryMove)">上移</h-button>
                <h-button table @click="onMove(slotProps.data.row,'down')" v-if="slotProps.data.row.sort!=page.total&&hosAuthCheck(advcategoryMove)">下移</h-button>
                <h-button table @click="onCancelRemmend(slotProps.data.row)" v-if="hosAuthCheck(advcategoryCancel)">取消推荐</h-button>
            </template>
        </hosJoyTable>
        <el-dialog title="新增品类推荐" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="categoryForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="选择品类：" prop="frontCategoryId">
                    <el-select v-model="categoryForm.frontCategoryId" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.id" :label="item.frontCategoryName" :disabled="item.recommend" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品类图标：" prop="imageUrls" ref="imageUrls">
                    <HosJoyUpload v-model="categoryForm.imageUrls" :multiple='false' :showPreView='true' :fileSize=1 :fileNum=1 :uploadParameters='uploadParameters' :action="action" @successCb="$refs['imageUrls'].clearValidate()" accept=".jpg,.png,.jpeg">
                    </HosJoyUpload>
                    <p>（品类图标格式为JGP/JPEG/PNG等主流格式图片，最大不超过1M）</p>
                    <p>注意：推荐后，该品类信息将出现在小程序首页~</p>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onSave">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import { BossFrontCategoryRecommendAddRequest } from '@/interface/hbp-shop'
import { CreateElement } from 'vue'
import { findCategories, categoryMoveUp, categoryMoveDown, findCategoriesList, addCategory, cancelCategory } from '../api'
import { ccpBaseUrl } from '@/api/config'
import { CRM_ADV_CATEGORY_ADD, CRM_ADV_CATEGORY_MOVE, CRM_ADV_CATEGORY_CANCEL } from '@/utils/auth_const'

@Component({
    name: 'Categorytabs',
    components: {
        hosJoyTable,
        HosJoyUpload
    }
})
export default class Categorytabs extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    advcategoryAdd = CRM_ADV_CATEGORY_ADD
    advcategoryMove = CRM_ADV_CATEGORY_MOVE
    advcategoryCancel = CRM_ADV_CATEGORY_CANCEL

    action=ccpBaseUrl + 'common/files/upload-old'
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    options: any=[]
    queryParams: object={
        pageNumber: 1,
        pageSize: 10
    }
    dialogVisible: boolean = false
    categoryForm: BossFrontCategoryRecommendAddRequest & {imageUrls:any[]}={
        imageUrls: [],
        frontCategoryId: '',
        imageUrl: ''
    }
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableData: any[]= []

    tableLabel: tableLabelProps = [
        { label: '品类顺序', prop: 'sort' },
        { label: '品类名称', prop: 'frontCategoryName' },
        { label: '品类图标',
            prop: 'imageUrl',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                return (
                    <span class="category_img">
                        {
                            scope.row.imageUrl
                                ? <a href={scope.row.imageUrl} target="_blank"><img src={scope.row.imageUrl}/></a>
                                : '-'
                        }
                    </span>
                )
            }
        },
        { label: '更新人', prop: 'updateBy' },
        { label: '更新时间', prop: 'updateTime', displayAs: 'YYYY-MM-DD HH:mm:ss' }
    ]

    get rules () {
        let rules = {
            frontCategoryId: [
                { required: true, message: '请选择品类名称', trigger: 'change' }
            ],
            imageUrls: [
                { required: true, message: '请上传品类图标' }
            ]
        }
        return rules
    }

    handleClose () {
        this.dialogVisible = false
        this.$refs['ruleForm'].clearValidate()
    }

    async onFindList () {
        const { data } = await findCategories(this.queryParams)
        this.tableData = data.records
        this.page.total = data.total as number
    }

    onAdd () {
        this.dialogVisible = true
        this.categoryForm.imageUrls = []
        this.categoryForm.frontCategoryId = ''
        this.$nextTick(() => {
            this.$refs['ruleForm'].clearValidate()
        })
    }

    async onMove (val, type) {
        if (type == 'up') {
            await categoryMoveUp(val.id)
        } else {
            await categoryMoveDown(val.id)
        }
        this.onFindList()
    }
    onSave () {
        this.$refs['ruleForm'].validate(async (valid) => {
            if (valid) {
                this.categoryForm.imageUrl = this.categoryForm.imageUrls[0].fileUrl
                await addCategory(this.categoryForm)
                this.onFindList()
                this.onFindCategories()
                this.dialogVisible = false
            }
        })
    }

    onCancelRemmend (val) {
        this.$confirm('确定取消当前品类推荐吗？取消后，当前品类在小程序首页不可见', '取消品类推荐', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            await cancelCategory(val.id)
            this.onFindList()
            this.onFindCategories()
        }).catch(() => {

        })
    }
    async onFindCategories () {
        const { data } = await findCategoriesList()
        this.options = data
    }
    async mounted () {
        this.onFindList()
        this.onFindCategories()
    }
}
</script>
<style lang='scss' scoped>
// @import "./css.scss";
</style>
