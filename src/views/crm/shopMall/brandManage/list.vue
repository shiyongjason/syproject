<template>
    <div class="page-body B2b brandManage">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">品牌编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.brandCode" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">品牌名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.brandName" placeholder="请输入" maxlength="13" clearable></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">
                        查询
                    </h-button>
                    <h-button @click="onReset">
                        重置
                    </h-button>
                </div>
            </div>
            <hosJoyTable :localName="'V3.10.*'" ref="hosjoyTable" collapseShow align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList"
                actionWidth='100'>
            </hosJoyTable>
        </div>
        <el-dialog title="批量推荐确认" :visible.sync="onSureDialog" :close-on-click-modal="false" :before-close="() => onSureDialog = false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                你确定要批量推荐这些商品吗？
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="() => onSureDialog = false">取 消</el-button>
                <el-button type="primary" @click="onHandleSure">继 续</el-button>
            </span>
        </el-dialog>
        <el-dialog title="批量取消确认" :visible.sync="onCancelDialog" :close-on-click-modal="false" :before-close="() => onCancelDialog = false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                你确定要批量取消推荐这些商品吗？
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="() => onCancelDialog = false">取 消</el-button>
                <el-button type="primary" @click="onHandleDel">继 续</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改品牌信息" :visible.sync="dialogVisible" width="850px" :before-close="handleClose" :close-on-click-modal='false' :close-on-press-escape='false'>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="品牌名称：" prop="brandName">
                    <el-input v-model="ruleForm.brandName" disabled v-if="!isShowDetail"></el-input>
                    <span v-else>{{ruleForm.brandName||'-'}}</span>
                </el-form-item>
                <el-form-item label="品牌编码：" prop="brandCode">
                    <el-input v-model="ruleForm.brandCode" disabled v-if="!isShowDetail"></el-input>
                    <span v-else>{{ruleForm.brandName||'-'}}</span>
                </el-form-item>
                <el-form-item label="品牌logo：" prop="brandLogoUrl">
                    <HosJoyUpload class="crmshopMallSpuEdit" :showUpload='!isShowDetail' v-model="ruleForm.brandLogoUrl" showCrop :multiple='false' :showPreView='true' :fileSize=2 :action='action' :fileNum='1' :uploadParameters='uploadParameters' accept='.jpg,.png,.jpeg' autoCropWidth='110' autoCropHeight='110' autoCrop fixedBox :original='false' full :enlarge="1" :outputSize="0.8" outputType="jpeg"/>
                    <p>图片尺寸为110*110，不超过2M，仅支持jpeg、jpg、png格式</p>
                </el-form-item>
                <el-form-item label="品牌bannar：" prop="brandBannerUrl">
                    <HosJoyUpload class="crmshopMallSpuEdit" :showUpload='!isShowDetail' v-model="ruleForm.brandBannerUrl" showCrop :multiple='false' :showPreView='true' :fileSize=2 :action='action' :fileNum='1' :uploadParameters='uploadParameters' accept='.jpg,.png,.jpeg' autoCropWidth='750' autoCropHeight='350' autoCrop fixedBox :original='false' full :enlarge="1" :outputSize="0.8" outputType="jpeg"/>
                    <p>图片尺寸为750*350，不超过2M，仅支持jpeg、jpg、png格式</p>
                </el-form-item>
                <el-form-item label="品牌描述：" prop="brandRemark" >
                    <el-input type="textarea" rows="4" class="remark" maxlength="250" v-model="ruleForm.brandRemark" v-if="!isShowDetail">
                    </el-input>
                    <span v-else style="line-height: 22px;display: inline-block;">{{ruleForm.brandRemark||'-'}}</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseDialog">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang='tsx'>
import { ElForm } from 'element-ui/types/form'
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import { ccpBaseUrl } from '@/api/config'
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import { getListApi, postBrands, getBrands } from './api'
import { BrandDetailResponse, BrandShopExtendResponse } from '@/interface/hbp-shop'

const _queryParams = {
    brandCode: '',
    brandName: '',
    pageNumber: 1,
    pageSize: 10
}
@Component({
    name: 'crmshopMallbrandManage',
    components: { hosJoyTable, HosJoyUpload }
})
export default class brandManage extends Vue {
    // action = ccpBaseUrl + 'common/files/upload-old'
    action = ccpBaseUrl + 'common/files/upload-base64'
    isShowDetail:boolean = false
    dialogVisible:boolean = false
    uploadParameters = {
        updateUid: '',
        reservedName: false
    };
    queryParams: any = JSON.parse(JSON.stringify(_queryParams));
    page:any = {
        sizes: [10, 20, 50, 100],
        total: 0
    };
    ruleForm: any = {
        brandCode: '',
        brandId: '',
        brandLogoUrl: '',
        brandName: '',
        brandRemark: '',
        id: '',
        brandBannerUrl: ''
    };
    tableData: BrandShopExtendResponse[]= []
    onSureDialog: boolean = false;
    onCancelDialog: boolean = false;

    rules = {
        brandLogoUrl: [
            { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        brandBannerUrl: [
            { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        brandRemark: [
            { required: true, message: '必填项不能为空', trigger: 'change' }
        ]
    }
    //  列表
    tableLabel: tableLabelProps = [
        { label: '品牌编码', prop: 'brandCode' },
        { label: '品牌名称', prop: 'brandName', width: '260px' },
        {
            label: '品牌banner',
            prop: 'brandBannerUrl',
            width: '180px',
            render: (h, scope) => {
                return (
                    <div class="rowcss">
                        <el-image
                            fit="contain"
                            style="width: 130px"
                            src={scope.row[scope.column.property]}
                            preview-src-list={[
                                scope.row[scope.column.property]
                            ]}
                        ></el-image>
                    </div>
                )
            }
        },
        {
            label: '品牌logo',
            prop: 'brandLogoUrl',
            width: '120px',
            render: (h, scope) => {
                return (
                    <div class="rowcss">
                        <el-image
                            fit="contain"
                            style="width: 80px;heigth:80px"
                            src={scope.row[scope.column.property]}
                            preview-src-list={[
                                scope.row[scope.column.property]
                            ]}
                        ></el-image>
                    </div>
                )
            }
        },
        { label: '品牌介绍', prop: 'brandRemark', minWidth: '260px' },
        {
            label: '类目信息',
            prop: 'name',
            render: (h, scope) => {
                return (
                    <div>
                        {
                            scope.row.categorySpuNumList && scope.row.categorySpuNumList.length > 0
                                ? scope.row.categorySpuNumList.map(item => {
                                    return (
                                        <span>
                                            {item.frontCategoryName}({item.spuNumber})
                                        </span>
                                    )
                                })
                                : '-'
                        }
                    </div>
                )
            }
        },
        {
            label: '操作',
            width: '250px',
            // slot: 'action',
            render: (h, scope) => {
                return (
                    <div>
                        <h-button table onClick={() => this.onEdit(scope.row)}>修改品牌信息</h-button>
                        <h-button table onClick={() => this.onGetDetail(scope.row)}>查看</h-button>
                    </div>
                )
            }
        }
    ];

    // methods:::
    onCloseDialog () {
        this.dialogVisible = false
        if (this.isShowDetail) {
            this.isShowDetail = false
        }
    }

    async onGetDetail (d) {
        const { data } = await getBrands(d.brandId)
        this.isShowDetail = true
        this.onEdit(data)
    }

    async onSubmit () {
        // @ts-ignore
        this.$refs['ruleForm'].validate(async (value, r) => {
            if (value) {
                let query = JSON.parse(JSON.stringify(this.ruleForm))
                if (query.brandLogoUrl.length > 0) {
                    query.brandLogoUrl = query.brandLogoUrl[0].fileUrl
                }
                if (query.brandBannerUrl.length > 0) {
                    query.brandBannerUrl = query.brandBannerUrl[0].fileUrl
                }
                await postBrands(query)
                this.$message.success('修改成功')
                this.dialogVisible = false
                this.getList()
            }
        })
    }
    onEdit (data) {
        this.ruleForm = JSON.parse(JSON.stringify(data))
        if (this.ruleForm.brandLogoUrl) {
            this.ruleForm.brandLogoUrl = [{
                fileName: this.ruleForm.brandLogoUrl,
                fileUrl: this.ruleForm.brandLogoUrl
            }]
        } else {
            this.ruleForm.brandLogoUrl = []
        }
        if (this.ruleForm.brandBannerUrl) {
            this.ruleForm.brandBannerUrl = [{
                fileName: this.ruleForm.brandBannerUrl,
                fileUrl: this.ruleForm.brandBannerUrl
            }]
        } else {
            this.ruleForm.brandBannerUrl = []
        }
        console.log('🚀 --- onEdit --- this.ruleForm', this.ruleForm)
        this.dialogVisible = true
    }
    handleClose () {
        this.dialogVisible = false
        let ruleForm:any = this.$refs['ruleForm']
        ruleForm.clearValidate()
    }
    // 推荐提醒 Dialog
    onOPenSureDialog () {
        this.onSureDialog = true
    }

    // 打开取消确认 Dialog
    onOPenCancelDialog () {
        this.onCancelDialog = true
    }
    // 确认
    onHandleSure () {
        let ref: any = this.$refs.hosjoyTable
        ref.clearSelection()
        this.onSureDialog = false
    }
    // 批量删除确认
    onHandleDel () {
        let ref: any = this.$refs.hosjoyTable
        ref.clearSelection()
        this.onCancelDialog = false
    }

    // 搜索重置
    onReset () {
        this.queryParams = JSON.parse(JSON.stringify(_queryParams))
        this.getList()
    }

    // getList
    async getList () {
        const { data } = await getListApi(this.queryParams)
        this.tableData = data.records
        this.page.total = data.total
    }

    // 初始化数据
        fileList1= []
        fileListMap= {} // 键值对，用来存储上传图片后的 uid:url
        handleOnChange (file, fileList) {
            console.log('onChange', file, fileList)
            console.log('onChange:fileList1', this.fileList1)
            this.fileList1 = fileList
        }
        handleRemove (file, fileList) {
            console.log('onRemove', file, fileList)
            console.log('onRemove:fileList1', this.fileList1)
            this.fileList1 = fileList
        }
        handleHttpRequest (options, ajax) {
        // --------------
        // 此处可用此方法动态修改请求 options，默认使用 ajax 发送请求，但只限于 form-data 形式表单 post|put 提交
        // options.action = '1231231'
        // options.headers = {
        //   'Accept': 'application/json',
        //   'X-Requested-With': 'XMLHttpRequest'
        // }
        // ajax(options)
        // --------------
        // ---------------
        // 若要自定义发送请求，此处一定要是 Promise 类的异步函数，才会执行 onSuccess 等回调
        // 此处以 axios 发送请求举例
            return new Promise((resolve, reject) => {
                // ---------
                // 自定义请求的进度条
                // this.fileList1.forEach((item, index) => {
                //   if (item.uid === options.file.uid) {
                //     axios.post('https://a76a9787-346f-4247-83df-3c735332f3a2.mock.pstmn.io/create', {}, {
                //       onUploadProgress: progressEvent => {
                //         var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                //         item.status = 'uploading'
                //         item.percentage = complete || 0
                //         console.log('上传进度：', complete)
                //       }
                //     }).then(() => {
                //       console.log('上传成功')
                //       resolve()
                //     })
                //   }
                // })
                // ---------
                //   resolve()
            })
        // ----------------
        }
        getUploadData () {
            console.log('打印表单数据', this.fileList1)
        }
        // 处理 ELUpload 上传后的数据，用于表单提交。
        processUploadData (data) {
        // --------------
        // 结果输出[url1, url1, url3]
        // const result = []
        // data.forEach(item => {
        //   if (item.uid && item.status && item.status === 'success') {
        //     result.push(this.fileListMap[item.uid] || item.url)
        //   } else if (!item.status && item.url) {
        //     result.push(item.url)
        //   }
        // })
        // return result
        // ---------------
        }
        handleSuccess (res, file, fileList) {
            console.log('onSuccess', res, file, fileList)
            console.log('onSuccess:fileList1', this.fileList1)
            this.fileList1 = fileList // 上传成功后赋值
        // 替换 url
        // this.fileList1.forEach(item => {
        //   if (item.uid === file.uid) {
        //     item.url = this.fileListMap[file.uid] || item.url
        //   }
        // })
        }
        handleError (res, file, fileList) {
            console.log('onError', res, file, fileList)
            console.log('onError:fileList1', this.fileList1)
            this.fileList1 = fileList
        }
        postForm () {
            console.log('postFrom', this.fileList1)
        }

        mounted () {
            this.getList()
        }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>