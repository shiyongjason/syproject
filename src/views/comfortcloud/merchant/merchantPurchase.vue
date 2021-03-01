<template>
    <div class="page-body B2b">
        <div class="page-body-cont ">
            <div class="query-cont spanflex">
                <el-button type="primary" @click="createActive()">
                    新建抢购活动
                </el-button>
            </div>

            <div class="page-body-cont query-cont">
                <div class="query-cont__row">
                    <div class="query-cont-col">
                        <div class="flex-wrap-title">活动名称：</div>
                        <div class="query-col-input">
                            <el-input v-model="queryParams.activityName" placeholder="" maxlength="50"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="flex-wrap-title">活动状态：</div>
                        <div class="flex-wrap-cont">
                            <el-select v-model="queryParams.status" style="width: 100%">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="抢购中" value=1></el-option>
                                <el-option label="等待抢购" value=4></el-option>
                                <el-option label="已结束" value=2></el-option>
                                <el-option label="已失效" value=3></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">创建时间： </div>
                        <div class="query-col-input">
                            <el-date-picker v-model="queryParams.startTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                            </el-date-picker>
                            <span class="ml10">-</span>
                            <el-date-picker v-model="queryParams.endTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">
                            <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :action-min-width="200">
                <template slot="status" slot-scope="scope">
                    {{scope.data.row.status===1?'待审核':scope.data.row.status===2?'推广中':scope.data.row.status===3?'已失效':scope.data.row.status===4?'审核不通过':'已删除'}}
                </template>
                <template slot="action" slot-scope="scope">
                    <template class="action-active">
                        <el-button class="orangeBtn" @click="onPurchaseActive(scope.data.row)">查看商品</el-button>
                        <span class="colred" @click="onOperate(scope.data.row)">
                            {{operationStatus(scope.data.row)}}
                        </span>
                    </template>
                </template>
            </basicTable>
        </div>
        <el-dialog title="查看活动商品" :visible.sync="checkActiveDialogShow" class="upload-show" width="400px" :close-on-click-modal="false" :before-close="onCloseEditMonthDialog">
            <el-form :model="form" :rules="rules" ref="addForm" label-width="140px">
                <el-form-item label-width="0px" v-for="(item,index) in form.mainProductList" :key="index">
                    <el-col :span="12">
                        <el-form-item label="商品名称：" :prop="'mainProductList.'+index+'.productId'" :rules="rules.productId">
                            <el-select v-model="item.productName" @change='selectItem(item)' placeholder="输入已上架的商品名称" reserve-keyword filterable remote :remote-method="remoteMethod" :loading="loading">
                                <el-option v-for="items in options" :key="items.productId" :label="items.productName" :value="items.productName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="抢购价格：" :prop="'mainProductList.'+index+'.price'" :rules="rules.price">
                            <el-input style="width:150px" v-model="item.price" placeholder="输入抢购价格" maxlength='20'></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddClick">取 消</el-button>
                <el-button type="primary" @click="cancelAddClick">确 定</el-button>
            </span>

        </el-dialog>
        <el-dialog title="新建抢购活动" :visible.sync="activeCreateDialogShow" class="upload-show" width="830px" :close-on-click-modal="false" :before-close="onCloseEditMonthDialog">
            <el-form :model="form" :rules="rules" ref="addForm" label-width="140px">
                <el-form-item label="活动名称：" prop="activeName">
                    <el-input placeholder="输入活动名称" maxlength='20' v-model="form.activeName"></el-input>
                </el-form-item>
                <el-form-item label="活动时间：" required>
                    <el-col :span="11">
                        <el-form-item prop="startTime">
                            <el-date-picker v-model="form.startTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="purchaseOptionsStart" default-time="00:00:00">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="endTime">
                            <el-date-picker v-model="form.endTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="purchaseOptionsEnd" default-time="23:59:59">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="选择活动商品：">
                    <el-button type="primary" @click="addClassifyMerchants">新增</el-button>
                </el-form-item>
                <el-form-item label-width="0px" v-for="(item,index) in form.mainProductList" :key="index">
                    <el-col :span="10">
                        <el-form-item label="商品名称：" :prop="'mainProductList.'+index+'.productId'" :rules="rules.productId">
                            <el-select v-model="item.productName" @change='selectItem(item)' placeholder="输入已上架的商品名称" reserve-keyword filterable remote :remote-method="remoteMethod" :loading="loading">
                                <el-option v-for="items in options" :key="items.productId" :label="items.productName" :value="items.productName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="抢购价格：" :prop="'mainProductList.'+index+'.price'" :rules="rules.price">
                            <el-input style="width:150px" v-model="item.price" placeholder="输入抢购价格" maxlength='20'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="danger" @click="deleteClassifyMerchants(index)">删除</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddClick">取 消</el-button>
                <el-button type="primary" @click="submitAddForm" :loading="isAdding">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { operationActiveStatus, getLikeMerchantList } from '../api'
import { iotUrl } from '@/api/config'

export default {
    name: 'comfortcloudMemberPurchase',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                status: '',
                activityName: '',
                startTime: '',
                endTime: ''
            },
            form: {
                activeName: '',
                mainProductList: [],
                startTime: '',
                endTime: ''
            },
            searchParams: {},
            loading: false,
            isAdding: false,
            options: [],
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            checkActiveDialogShow: false,
            activeCreateDialogShow: false,
            tableLabel: [
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime', width: 100 },
                { label: '创建手机号', prop: 'phone', width: 100 },
                { label: '创建人微信昵称', prop: 'nickName', width: 100 },
                { label: '活动城市', prop: 'cityName', width: 100 },
                { label: '活动名称', prop: 'activityName', width: 100 },
                { label: '活动地址', prop: 'shopAddress', width: 100 },
                { label: '活动开始时间', prop: 'startTime', formatters: 'dateTime', width: 100 },
                { label: '活动结束时间', prop: 'endTime', formatters: 'dateTime', width: 100 },
                { label: '活动状态', prop: 'status', width: 100 },
                { label: '备注', prop: 'remark', width: 100 }
            ],
            rules: {
                activeName: [
                    { required: true, message: '请输入主营产品名称', trigger: 'blur' }
                ],
                startTime: [
                    { required: true, message: '请选择活动开始时间', trigger: 'change' }
                ],
                endTime: [
                    { required: true, message: '请选择活动结束时间', trigger: 'change' }
                ],
                productId: [
                    { required: true, message: '请选择商品', trigger: 'change' }
                ],
                price: [
                    { required: true, message: '请设置抢购价', trigger: 'blur' },
                    { message: '请设置正确的价格', trigger: 'change', pattern: /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/ }
                ]
            },
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudMerchantActivityPurchaseData: 'cloudMerchantActivityPurchaseData'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        purchaseOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.form.startTime
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        },
        purchaseOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.form.startTime
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        )
                    }
                }
            }
        }
    },
    mounted () {
        if (this.$route.query.phone && this.$route.query !== undefined) {
            this.queryParams.phone = this.$route.query.phone
            this.queryParams.distributorName = this.$route.query.name
        }
        this.onSearch()
    },
    activated () {
        this.onQuery()
    },
    methods: {
        ...mapActions({
            getMerchantPurchaseData: 'getMerchantPurchaseData'
        }),
        async onQuery () {
            await this.getMerchantPurchaseData(this.searchParams)
            this.tableData = this.cloudMerchantActivityPurchaseData.records
            this.pagination = {
                pageNumber: this.cloudMerchantActivityPurchaseData.current,
                pageSize: this.cloudMerchantActivityPurchaseData.size,
                total: this.cloudMerchantActivityPurchaseData.total
            }
        },
        createActive () {
            this.clearAddFormData()
            this.activeCreateDialogShow = true
        },
        cancelAddClick () {
            this.activeCreateDialogShow = false
            this.clearAddFormData()
        },
        addClassifyMerchants: function () {
            this.form.mainProductList.push({ productId: '', productName: '', price: '' })
        },
        remoteMethod: async function (query) {
            if (query !== '') {
                this.loading = true
                // 请求数据
                this.loading = false
                const merchantList = await getLikeMerchantList({ productName: query })
                this.options = merchantList.data
                for (let index = 0; index < this.options.length; index++) {
                    const element = this.options[index]
                    for (let i = 0; i < this.form.mainProductList.length; i++) {
                        const sel = this.form.mainProductList[i]
                        if (element.productId === sel.productId) {
                            this.options.splice(index, 1)
                            break
                        }
                    }

                }
            } else {
                this.options = []
            }
        },
        selectItem: function (item) {
            let sel = null
            for (let index = 0; index < this.options.length; index++) {
                const element = this.options[index]
                if (element.productName == item.productName) {
                    sel = element
                    break
                }
            }
            if (sel) {
                item.productId = sel.productId
            }
            this.options = []
        },
        clearAddFormData () {
            if (this.$refs['addForm']) {
                this.$refs['addForm'].clearValidate()
                this.form = {
                    activeName: '',
                    mainProductList: [],
                    startTime: '',
                    endTime: ''
                }
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onPurchaseActive (val) {
            this.activeCreateDialogShow = true
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        operationStatus (val) {
            if (val.status === 1) {
                return ' 审核'
            } else if (val.status === 2) {
                return ' 失效'
            } else if (val.status === 3) {
                return ' 生效'
            } else if (val.status === 4) {
                return '----'
            } else if (val.status === 5) {
                return '----'
            }
        },
        onCloseEditMonthDialog () {
            this.checkActiveDialogShow = false
            this.activeCreateDialogShow = false
            this.clearAddFormData()
        },
        hasFile () {
            return this.$refs.upload.uploadFiles.length > 0
        },
        submitAddForm () {
            if (this.isAdding) {
                return
            }
            if (this.form.mainProductList.length === 0) {
                this.$message.error('请选择搭配产品')
                return
            }
            console.log(this.form)
            this.isAdding = true
            this.$refs['addForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        // await this.sendAddClassify()
                        this.isAdding = false
                    } catch (e) {
                        this.isAdding = false
                    }
                } else {
                    this.isAdding = false
                }
            })
        },
        onOperate (val) {
            if (val.status === 2) {
                this.$confirm('下架活动后，小程序端则不展示该活动，请确认是否继续下架?', '门店活动推广失效', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await operationActiveStatus({ 'id': val.id, 'operator': this.userInfo.employeeName, 'status': 3 })
                    this.$message({
                        message: '下架成功！',
                        type: 'success'
                    })
                    this.onQuery()
                })
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;

    span {
        flex: 1;

        &:first-child {
            font-size: 16px;
        }

        &:last-child {
            text-align: right;
        }
    }
}

.colred {
    color: #ff7a45;
    cursor: pointer;
    width: 40px;
    display: inline-block;
}

.colred-default {
    cursor: pointer;
    width: 40px;
    display: inline-block;
}

.redcolred {
    color: red;
    cursor: pointer;
}

.action-active {
    display: flex;
    flex-direction: column;
}

.topColred {
    color: #ff7a45;
    cursor: pointer;
}
.el-scrollbar_wrap {
    max-height: 70%; // 最大高度
    overflow-x: hidden; // 隐藏横向滚动栏
}
/deep/ .el-dialog__body {
    padding-top: 10px;
    max-height: 600px; // 最大高度
    overflow: auto;
}
</style>
