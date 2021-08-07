<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="auto">
                <div class="table-cont-title big-title">
                    <span class="table-title-name">代采订单号：{{form.agentOrderNo}}</span>
                </div>
                <div class="table-cont-title">
                    <span class="table-title-name">供应商信息</span>
                </div>
                <div style="display:flex;flex-wrap: wrap;">
                    <el-form-item label="供应商名称：" prop="supplierName">
                        <el-input class="form-input_big" v-model="form.supplierName" maxlength="100" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="供应商付款银行账号：" prop="supplierBankCardNo" class="ml20">
                        <el-input class="form-input_big" v-model="form.supplierBankCardNo" maxlength="100" disabled></el-input>
                    </el-form-item>
                </div>
                <div class="table-cont-title">
                    <span class="table-title-name">采购入仓仓库及收货人</span>
                </div>
                <div style="display:flex;flex-wrap: wrap;">
                    <el-form-item label="选择仓库：" prop="warehouseName">
                        <el-select v-model="form.warehouseName" disabled>
                            <el-option :label="form.warehouseName" :value="form.warehouseName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收货确认人姓名：" prop="confirmorName">
                        <el-input class="form-input_big" v-model="form.confirmorName" maxlength="100" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="确认人电话：" prop="confirmorMobile">
                        <el-input class="form-input_big" v-model="form.confirmorMobile" maxlength="100" disabled></el-input>
                    </el-form-item>
                </div>
                <div class="table-cont-title">
                    <span class="table-title-name">采购商品清单</span>
                </div>
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :isMultiple="false" :isShowIndex='true' :isfiexd="'right'" :isShowSum="true" :getSum="getSum" class="mt20 mb20">
                    <template slot="unit" slot-scope="scope">
                        {{unitMap.get(scope.data.row.unit) || '-'}}
                    </template>
                </basicTable>
                <el-form-item label="代采订单总金额：" prop="totalAmount">
                    <el-input class="form-input_big" v-model="form.totalAmount" maxlength="100" disabled></el-input>
                </el-form-item>
                <el-form-item label="待付款金额：" prop="retainageAmount">
                    <el-input class="form-input_big" v-model="form.retainageAmount" maxlength="100" disabled></el-input>
                </el-form-item>
                <el-form-item label="需商家预付金额：" prop="prepayAmount">
                    <el-input class="form-input_big" v-model="form.prepayAmount" maxlength="100" disabled></el-input>
                </el-form-item>
                <el-form-item label="付款方式：" prop="payWay">
                    <el-select v-model="form.payWay" disabled>
                        <el-option v-for="item in payOptions " :key="item.value"  :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注信息：" prop="note">
                    <el-input type="textarea" v-model="form.note" style="width:500px" rows="6" disabled>
                    </el-input>
                </el-form-item>
                <template v-if="check">
                    <el-form-item label="订单最终回款期限：" prop="period" :rules="form.status=='20'?rules.period:falseRules.period">
                        <el-input class="form-input_big" v-model="form.period" maxlength="10">
                            <template slot="suffix">天</template>
                        </el-input>
                    </el-form-item>
                    <div style="display:flex;">
                        <el-form-item label="审核：" prop="status">
                            <el-radio-group v-model="form.status" @change="onChange">
                                <el-radio :label="20">通过</el-radio>
                                <el-radio :label="60">不通过</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="原因：" prop="rejectReason" v-if="form.status=='60'">
                            <el-input v-model="form.rejectReason" maxLength="60" prop='' placeholder="请输入原因"></el-input>
                        </el-form-item>
                    </div>
                </template>
                <template v-if="auditFundStatus">
                    <div class="table-cont-title">
                        <span class="table-title-name">日志信息</span>
                    </div>
                    <basicTable :tableData="tableDataLog" :tableLabel="tableLabelLog" :isMultiple="false" class="mt20 mb20">
                    </basicTable>
                </template>
            </el-form>
        </div>
        <div class="page-body-cont btn-cont fr">
            <h-button @click="onCancel()">取消</h-button>
            <h-button type='primary' :loading="btnLoading" @click="onSave()" v-if="check">确定</h-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { PAY_OPTIONS, UNIT_MAP } from './const'
import { auditFund } from './api/index'
import { clearCache, newCache } from '@/utils/index'
export default {
    name: 'fundInfo',
    data () {
        return {
            payOptions: PAY_OPTIONS,
            unitMap: UNIT_MAP,
            btnLoading: false,
            houseOptions: [],
            form: {},
            rules: {
                period: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            const Reg = /^\+?[1-9]{1}[0-9]{0,2}\d{0,0}$/
                            if (!value) {
                                return callback(new Error('请输入最终回款期限'))
                            }
                            if (value && !Reg.test(value)) {
                                return callback(new Error('请填写大于0的整数，最大值999'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                status: [
                    { required: true, message: '请选择审核结果', trigger: 'change' }
                ],
                rejectReason: [
                    { required: true, message: '请填写理由说明', trigger: 'blur' },
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (value && value.replace(/\s/g, '').length < 1) {
                                return callback(new Error('请填写理由说明'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            },
            falseRules: {
                period: [
                    {
                        required: false,
                        validator: (rule, value, callback) => {
                            const Reg = /^\+?[1-9]{1}[0-9]{0,2}\d{0,0}$/
                            if (value && !Reg.test(value)) {
                                return callback(new Error('请填写大于0的整数，最大值999'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            },
            tableLabel: [
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '商品名称', prop: 'skuName' },
                { label: '品牌', prop: 'brandName' },
                { label: '型号', prop: 'model' },
                { label: '单位', prop: 'unit' },
                { label: '需求数量', prop: 'quantity' },
                { label: '含税单价', prop: 'price', formatters: 'moneyShow' },
                { label: '含税金额', prop: 'totalAmount', formatters: 'moneyShow' }
            ],
            tableData: [],
            tableLabelLog: [
                { label: '时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '操作人', prop: 'operator' },
                { label: '操作内容', prop: 'operateMotionDesc' }
            ],
            tableDataLog: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            auditFundInfo: state => state.hmall.fundAudit.auditFundInfo
        }),
        check () {
            return this.$route.query.check
        },
        auditFundStatus () {
            return this.$route.query.pageType
        }
    },
    methods: {
        init () {
            if (this.$route.query.id) {
                this.getInfo()
            }
        },
        ...mapActions({
            findAuditFundInfo: 'fundAudit/findAuditFundInfo'
        }),
        onSave () {
            let form = {}
            form = {
                id: this.form.id,
                period: this.form.period,
                updateBy: this.userInfo.employeeName,
                status: this.form.status,
                rejectReason: this.form.rejectReason
            }
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        await auditFund(form)
                        this.btnLoading = false
                        this.$message.success('操作成功！')
                        this.$router.go(-1)
                        this.setNewTags((this.$route.fullPath).split('?')[0])
                    } catch (error) {
                        this.btnLoading = false
                    }
                }
            })
        },
        onCancel () {
            history.go(-1)
            this.setNewTags((this.$route.fullPath).split('?')[0])
        },
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        async getInfo () {
            await this.findAuditFundInfo({ id: this.$route.query.id })
            this.form = { ...this.auditFundInfo }
            this.tableData = this.auditFundInfo.skuList
            this.tableDataLog = this.auditFundInfo.logs
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        onChange () {
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        // 商家明细合计
        getSum (param) {
            const { columns, data } = param
            const sums = []
            columns.forEach((column, index) => {
                if (index == 0) {
                    sums[index] = '合计'
                }
                if (column.property == 'totalAmount') {
                    const values = data.map(item => {
                        return Number(item[column.property])
                    })
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0)
                        sums[index] = sums[index] ? sums[index] : '-'
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                }
            })
            return sums
        }
    },
    mounted () {
        this.init()
    },
    watch: {
        $route () {
            if (this.$route.query.id) {
                this.init()
            }
        }
    },
    beforeRouteLeave (to, from, next) {
        if (!(to.name == 'auditFundList')) {
            clearCache('auditFundList')
        } else if (!(to.name == 'advancePayment')) {
            clearCache('advancePayment')
        } else if (!(to.name == 'auditFundStatus')) {
            clearCache('auditFundStatus')
        } else if (!(to.name == 'merchantBehalf')) {
            clearCache('merchantBehalf')
        }
        next()
    }
}
</script>
<style lang="scss" scoped>
.form-item-title {
    margin-bottom: 20px;
    font-size: 16px;
    color: #666666;
}

.avatar-uploader {
    display: inline-block;
    margin-right: 20px;
}

.mask {
    position: absolute;
    width: 102px;
    height: 102px;
    border-radius: 4px;
    background: #000;
    opacity: 0.65;
    z-index: -1;
}

.mask-btn {
    position: absolute;
    width: 102px;
    height: 102px;
    border-radius: 4px;
    z-index: -1;
    span {
        float: left;
        cursor: pointer;
        margin-left: 14px;
        padding: 0px 12px;
        height: 22px;
        line-height: 22px;
        color: #fff;
        font-size: 12px;
        border-radius: 4px;
        background: $hosjoyColor;

        &:nth-child(1) {
            margin-top: 22px;
        }
        &:nth-child(2) {
            margin-top: 14px;
        }

        &:hover {
            background: $hosjoyColorHover;
        }
        &:active {
            background: $hosjoyColorActive;
        }
    }
}

/deep/ .el-collapse {
    &-item {
        &:last-child {
            .el-collapse-item__header {
                border-bottom: none;
            }
        }
    }
}

.remove {
    margin-left: 10px;
    font-size: 20px;
    color: $hosjoyColor;
}

.stock-input {
    width: 160px;
}

.header-icon {
    margin-left: 10px;
}

.empty-area-setting {
    text-align: center;
}

.regional-cont {
    &-row {
        display: flex;
        flex-wrap: wrap;
    }

    &-col {
        flex-basis: calc(100% / 3);
        margin-bottom: 20px;
    }
}
</style>
