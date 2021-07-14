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
                            <el-input v-model="queryParams.seckillName" placeholder="" maxlength="50"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="flex-wrap-title">活动状态：</div>
                        <div class="flex-wrap-cont">
                            <el-select v-model="queryParams.status" style="width: 100%">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="等待抢购" value=1></el-option>
                                <el-option label="抢购中" value=2></el-option>
                                <el-option label="已结束" value=3></el-option>
                                <el-option label="已失效" value=4></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">创建时间： </div>
                        <div class="query-col-input">
                            <el-date-picker v-model="queryParams.startCreateTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                            </el-date-picker>
                            <span class="ml10">-</span>
                            <el-date-picker v-model="queryParams.endCreateTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
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
            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :action-min-width="200">
                <template slot="status" slot-scope="scope">
                    {{operationStatus(scope.data.row)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <template class="action-active">
                        <el-button class="orangeBtn" @click="onPurchaseActive(scope.data.row)">查看商品</el-button>
                        <span class="colred" @click="onOperate(scope.data.row)">
                            {{operationShowEnable(scope.data.row)? '失效' : '--'}}
                        </span>
                    </template>
                </template>
            </basicTable>
        </div>
        <el-dialog title="查看活动商品" :visible.sync="checkActiveDialogShow" width="830px" :close-on-click-modal="false" :before-close="onCloseEditMonthDialog">
            <el-form :model="form" ref="addForm" label-width="140px" :disabled='true'>
                <el-form-item label-width="0px" v-for="(item,index) in form.seckillActivityList" :key="index">
                    <el-col :span="12">
                        <el-form-item label="商品名称：">
                            <el-input :value="shopStatus(item)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="抢购价格：">
                            <el-input v-model="item.seckillPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="cancelCheckClick">确 定</el-button>
            </span>

        </el-dialog>
        <el-dialog title="新建抢购活动" :visible.sync="activeCreateDialogShow" width="830px" :close-on-click-modal="false" :before-close="onCloseEditMonthDialog">
            <el-form :model="form" :rules="rules" ref="addForm" label-width="140px">
                <el-form-item label="活动名称：" prop="seckillName">
                    <el-input placeholder="输入活动名称" maxlength='20' v-model="form.seckillName"></el-input>
                </el-form-item>
                <el-form-item label="活动时间：" required>
                    <el-col :span="11">
                        <el-form-item prop="startTime">
                            <el-date-picker v-model="form.startTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="purchaseOptionsStart" default-time="00:00:00">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="endTime">
                            <el-date-picker v-model="form.endTime" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="purchaseOptionsEnd" default-time="23:59:59">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="选择活动商品：">
                    <el-button type="primary" @click="addClassifyMerchants">新增</el-button>
                </el-form-item>
                <el-form-item label-width="0px" v-for="(item,index) in form.seckillActivityList" :key="index">
                    <el-col :span="10">
                        <el-form-item label="商品名称：" :prop="'seckillActivityList.'+index+'.productId'" :rules="rules.productId">
                            <el-select v-model="item.productName" @change='selectItem(item)' placeholder="输入已上架的商品名称" reserve-keyword filterable remote :remote-method="remoteMethod" :loading="loading">
                                <el-option v-for="items in options" :key="items.productId" :label="items.productName" :value="items.productName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="抢购价格：" :prop="'seckillActivityList.'+index+'.seckillPrice'" :rules="rules.seckillPrice">
                            <el-input style="width:150px" v-model="item.seckillPrice" placeholder="输入抢购价格" maxlength='20'></el-input>
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
import { disableMerchantPurchase, getLikeMerchantList, createMerchantPurchase, getMerchantPurchaseDetail } from '../api'

export default {
    name: 'comfortcloudMemberPurchase',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                status: '',
                seckillName: '',
                startCreateTime: '',
                endCreateTime: ''
            },
            form: {
                seckillName: '',
                seckillActivityList: [],
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
                { label: '活动名称', prop: 'seckillName' },
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '开始时间', prop: 'startTime', formatters: 'dateTime' },
                { label: '结束时间', prop: 'endTime', formatters: 'dateTime' },
                { label: '活动状态', prop: 'status' }
            ],
            rules: {
                seckillName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
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
                seckillPrice: [
                    { required: true, message: '请设置抢购价', trigger: 'blur' },
                    { message: '请设置正确的价格', trigger: 'change', pattern: /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/ }
                ]
            }
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
                    let beginDateVal = this.queryParams.endCreateTime
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
                    let beginDateVal = this.queryParams.startCreateTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        purchaseOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.form.endTime
                    if (beginDateVal) {
                        return (
                            time.getTime() > new Date(beginDateVal).getTime()
                        )
                    } else {
                        return time.getTime() <= Date.now() - 8.64e7
                    }
                }
            }
        },
        purchaseOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.form.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        }
    },
    mounted () {
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
        async onPurchaseActive (val) {
            this.clearAddFormData()
            let { data } = await getMerchantPurchaseDetail({ id: val.id })
            this.form.seckillActivityList = data
            this.checkActiveDialogShow = true
        },
        cancelAddClick () {
            this.activeCreateDialogShow = false
            this.clearAddFormData()
        },
        cancelCheckClick () {
            this.checkActiveDialogShow = false
            this.clearAddFormData()
        },
        addClassifyMerchants: function () {
            this.form.seckillActivityList.push({ productId: '', productName: '', seckillPrice: '' })
        },
        shopStatus (item) {
            if (item.status === 30) {
                return '(已下架)' + item.productName
            }
            return item.productName
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
                    for (let i = 0; i < this.form.seckillActivityList.length; i++) {
                        const sel = this.form.seckillActivityList[i]
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
        deleteClassifyMerchants: function (index) {
            this.form.seckillActivityList.splice(index, 1)
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
                    seckillName: '',
                    seckillActivityList: [],
                    startTime: '',
                    endTime: ''
                }
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
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
            if (!val.enable) {
                return '已失效'
            } else {
                if (val.status === 1) {
                    return '等待抢购'
                } else if (val.status === 2) {
                    return '抢购中'
                } else if (val.status === 3) {
                    return '已结束'
                } else {
                    return '--'
                }
            }
        },
        operationShowEnable (val) {
            if (val.status === 1 || val.status === 2) {
                if (val.enable) {
                    return true
                }
            }
            return false
        },
        onCloseEditMonthDialog () {
            this.checkActiveDialogShow = false
            this.activeCreateDialogShow = false
            this.clearAddFormData()
        },
        hasFile () {
            return this.$refs.upload.uploadFiles.length > 0
        },
        async submitAddForm () {
            if (this.isAdding) {
                return
            }
            if (this.form.seckillActivityList.length === 0) {
                this.$message.error('请选择搭配产品')
                return
            }
            console.log(this.form)
            this.isAdding = true
            this.$refs['addForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        await createMerchantPurchase({ 'operator': this.userInfo.employeeName, ...this.form })
                        this.isAdding = false
                        this.activeCreateDialogShow = false
                        this.clearAddFormData()
                        this.onQuery()
                    } catch (e) {
                        this.isAdding = false
                    }
                } else {
                    this.isAdding = false
                }
            })
        },
        onOperate (val) {
            if (this.operationShowEnable(val)) {
                this.$confirm('下架活动后，小程序端则不展示该活动，请确认是否继续下架?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await disableMerchantPurchase({ 'id': val.id, 'operator': this.userInfo.employeeName })
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
