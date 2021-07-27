
<template>
    <div class="banner-tab">
        <div class="baner-btn mb20">
            <el-button type="primary" @click="onAddBanner" v-if="hosAuthCheck(bannerAdd)">新增banner</el-button>
        </div>
        <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border showPagination stripe :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="onFindList" actionWidth='250' isAction
            :isActionFixed='tableData&&tableData.length>0'>
            <template #action="slotProps">
                <div v-if="slotProps.data.row.status==2">
                    <h-button table @click="onEdit(slotProps.data.row)" v-if="hosAuthCheck(bannerEdit)">编辑</h-button>
                    <h-button table @click="onDelete(slotProps.data.row)" v-if="hosAuthCheck(bannerDelete)">删除</h-button>
                    <h-button table @click="onOperate(slotProps.data.row,'enable')" v-if="hosAuthCheck(bannerOperate)&&slotProps.data.row.status!=1">启用</h-button>
                    <h-button table @click="onMove(slotProps.data.row,'up')" v-if="slotProps.data.row.sort!=1&&hosAuthCheck(bannerMove)">上移</h-button>
                    <h-button table @click="onMove(slotProps.data.row,'down')" v-if="slotProps.data.row.sort!=page.total&&hosAuthCheck(bannerMove)">下移</h-button>
                </div>
                <div v-else>
                    <h-button table @click="onOperate(slotProps.data.row,'disable')" v-if="slotProps.data.row.status==1&&hosAuthCheck(bannerOperate)">停用</h-button>
                </div>
            </template>
        </hosJoyTable>
        <el-dialog :title=bannerTitle :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :close-on-click-modal=false>
            <el-form :model="bannerForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="banner名称：" prop="bannerName">
                    <el-input v-model.trim="bannerForm.bannerName" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="banner位置：" prop="location">
                    <el-select v-model="bannerForm.location" placeholder="请选择">
                        <el-option label='商城首页' :value=1></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳转链接：">
                    <el-input v-model.trim="bannerForm.linkUrl" maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="banner图：" prop="bannerArr" ref="bannerArrs">
                    <HosJoyUpload v-model="bannerForm.bannerArr" showCrop :multiple='false' :showPreView='true' :fileSize=2 :fileNum=1 :uploadParameters='uploadParameters' :action="action" @successCb="$refs['bannerArrs'].clearValidate()" accept=".jpg,.png,.jpeg"
                     autoCropWidth='750' autoCropHeight='300' autoCrop fixedBox :original='false'  :enlarge="1" :outputSize="0.8" outputType="jpeg"
                    >
                    </HosJoyUpload>
                    <p>图片尺寸为750*300，不超过2M，仅支持jpeg、jpg、png格式</p>
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
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import { CreateElement } from 'vue'
import { getBannerPage, bannerEnable, bannerDisable, bannerMoveDown, bannerMoveUp, bannerDelete, getBannerDetail, addBanner, editBanner } from '../api/index'
import { ShopBannerAddRequest } from '@/interface/hbp-shop'
import { deepCopy } from '@/utils/utils'
import { ccpBaseUrl } from '@/api/config'
import { CRM_ADV_BANNER_ADD, CRM_ADV_BANNER_EDIT, CRM_ADV_BANNER_OPERATE, CRM_ADV_BANNER_DELETE, CRM_ADV_BANNER_MOVE } from '@/utils/auth_const'

@Component({
    name: 'Bannertabs',
    components: {
        hosJoyTable,
        HosJoyUpload
    }
})
export default class Bannertabs extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    bannerAdd = CRM_ADV_BANNER_ADD
    bannerEdit = CRM_ADV_BANNER_EDIT
    bannerOperate = CRM_ADV_BANNER_OPERATE
    bannerDelete = CRM_ADV_BANNER_DELETE
    bannerMove = CRM_ADV_BANNER_MOVE
    queryParams: object={
        pageNumber: 1,
        pageSize: 10
    }
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    dialogVisible: boolean = false
    action=ccpBaseUrl + 'common/files/upload-old'
    bannerForm:ShopBannerAddRequest & {bannerArr?:any[], id?:any} ={
        'bannerName': '',
        'bannerPicUrl': '',
        'linkUrl': '',
        'location': '',
        bannerArr: []

    }
    bannerTitle: string = '新增banner'
    private _bannerForm = {}
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableData: any[] = []

    tableLabel: tableLabelProps = [
        { label: 'banner名称', prop: 'bannerName' },
        { label: 'banner图',
            prop: 'bannerPicUrl',
            render: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                return (
                    <span class="label_img">
                        {
                            scope.row.bannerPicUrl
                                ? <a href={scope.row.bannerPicUrl} target="_blank"><img src={scope.row.bannerPicUrl}/></a>
                                : '-'
                        }
                    </span>
                )
            }
        },
        { label: '跳转链接', prop: 'linkUrl' },
        { label: 'banner位置', prop: 'location', dicData: [{ value: 1, label: '商城首页' }] },
        { label: '创建时间',
            prop: 'createTime',
            displayAs: 'YYYY-MM-DD HH:mm:ss'
        },
        { label: 'banner状态', prop: 'status', dicData: [{ value: 1, label: '启用' }, { value: 2, label: '停用' }] }
    ]

    get rules () {
        let rules = {
            bannerName: [
                { required: true, message: '请输入banner名称', trigger: 'blur' }
            ],
            location: [
                { required: true, message: '请选择banner位置', trigger: 'change' }
            ],
            bannerArr: [
                { required: true, message: '请上传banner图' }
            ]
        }
        return rules
    }

    @Watch('bannerArr') private getBArr (val) {
        if (val.length > 0) {
            // if (this.$refs['bannerArrs']) {
            //     this.$refs['ruleForm'].clearValidate('bannerArr')
            // }
        }
    }

    handleClose () {
        this.dialogVisible = false
        this.$refs['ruleForm'].clearValidate()
    }
    onAddBanner () {
        this.bannerForm = deepCopy(this._bannerForm)
        this.bannerTitle = '新增banner'
        this.dialogVisible = true
        this.$nextTick(() => {
            this.$refs['ruleForm'].clearValidate()
        })
    }

    async onFindList () {
        const { data } = await getBannerPage(this.queryParams)
        this.tableData = data.records
        this.page.total = data.total as number
    }

    async onEdit (val) {
        this.bannerTitle = '编辑banner'
        const { data } = await getBannerDetail(val.id)
        this.bannerForm = { ...this.bannerForm, ...data }
        this.bannerForm.bannerArr = [{ fileUrl: data.bannerPicUrl, fileName: data.bannerPicUrl }]
        this.dialogVisible = true
    }
    onSave () {
        this.$refs['ruleForm'].validate(async (valid) => {
            if (valid) {
                this.bannerForm.bannerPicUrl = this.bannerForm.bannerArr[0].fileUrl
                if (this.bannerForm.id) {
                    await editBanner(this.bannerForm)
                } else {
                    await addBanner(this.bannerForm)
                    this.$message.success('banner新增成功~')
                }

                this.dialogVisible = false
                this.onFindList()
            }
        })
    }

    onOperate (val, type) {
        if (type == 'enable') {
            this.$confirm('确定启用该条banner吗？启用后该条信息将展示在小程序端对应的位置', '启用确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await bannerEnable(val.id)
                this.$message.success('banner启用成功~')
                this.onFindList()
                this.$emit('backEvent')
            }).catch(() => {

            })
        } else {
            this.$confirm('确定停用该条banner吗？停用后该条信息在小程序端不可见', '停用确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await bannerDisable(val.id)
                this.$message.success('banner停用成功~')
                this.onFindList()
                this.$emit('backEvent')
            }).catch(() => {

            })
        }
    }

    async onMove (val, type) {
        if (type == 'up') {
            await bannerMoveUp(val.id)
        } else {
            await bannerMoveDown(val.id)
        }
        this.onFindList()
        this.$emit('backEvent')
    }

    onDelete (val) {
        this.$confirm('确定删除该条banner吗？', '删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            await bannerDelete(val.id)
            this.$message.success('banner删除成功~')
            this.onFindList()
        }).catch(() => {

        })
    }

    mounted () {
        this.onFindList()
        this._bannerForm = deepCopy(this.bannerForm)
    }
}
</script>
<style lang='scss' scoped>
@import "../css.scss";
</style>
