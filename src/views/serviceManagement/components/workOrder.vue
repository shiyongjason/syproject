<template>
    <div>
        <el-dialog title="新增工单" :visible.sync="dialog" class="edit-work-order" width="1100px" :close-on-click-modal="false" :before-close="onCloseDialog">
            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="100px" class="edit-work-order-form">
                <el-form-item label="渠道名称">
                    <el-select disabled v-model="form.channelType">
                        <el-option :label="item.name" :value="item.code" v-for="item in channelType" :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input type="text" v-model="form.orderNo" disabled maxlength="25"></el-input>
                </el-form-item>
                <el-form-item prop="customerName" label="姓名">
                    <el-input type="text" v-model="form.customerName" placeholder="请输入姓名" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item prop="customerMobile" label="手机号">
                    <el-input type="text" v-model="form.customerMobile" placeholder="请输入手机号" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item prop="houseKeeperId" label="线下管家">
                    <el-select v-model="form.houseKeeperId">
                        <el-option :label="item.name" :value="item.userId" v-for="item in houseKeeperData" :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="houseKeeperMobile" label="管家电话">
                    <el-input type="text" v-model="form.houseKeeperMobile" placeholder="请输入管家电话" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item prop="customerAddress" label="地址">
                    <el-input v-model="form.customerAddress" placeholder="请输入地址" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item prop="reserveMode" label="预约方式">
                    <el-select v-model="form.reserveMode">
                        <el-option label="公众号预约" :value="1"></el-option>
                        <el-option label="电话预约" :value="2"></el-option>
                        <el-option label="管家预约" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="goodsName" label="服务项目">
                    <el-input type="text" v-model="form.goodsName" placeholder="请输入服务项目" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="服务商">
                    <el-input type="text" v-model="form.serviceProvider" placeholder="请输入服务商" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="type" label="服务状态">
                    <el-select v-model="form.status">
                        <el-option label="已预约（待确认）" :value="1"></el-option>
                        <el-option label="已预约（已确认）" :value="2"></el-option>
                        <el-option label="已完成" :value="3"></el-option>
                        <el-option label="取消" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工程师">
                    <el-input type="text" v-model="form.engineer" placeholder="请输入工程师" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="工程师电话">
                    <el-input type="text" v-model="form.engineerMobile" placeholder="请输入工程师电话" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item prop="serviceNum" label="服务数量">
                    <el-input type="text" v-model="form.serviceNum" placeholder="请输入服务数量" maxlength="5"></el-input>
                </el-form-item>
                <el-form-item label="买家备注">
                    <el-input type="text" disabled v-model="form.buyerRemark" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="卖家备注">
                    <el-input type="text" disabled v-model="form.sellerRemark" placeholder=""></el-input>
                </el-form-item>
                <div>
                    <el-form-item prop="AloneData" label="服务时间">
                        <el-date-picker v-model="form.AloneData" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="AloneDataTimeStart" class="alone-select">
                        <el-time-select placeholder="起始时间" v-model="form.AloneDataTimeStart" :picker-options="{
                                      start: '08:30',
                                      step: '00:15',
                                      end: '18:30'
                                    }">
                        </el-time-select>
                    </el-form-item>
                    <el-form-item prop="AloneDataTimeEnd" class="alone-select">
                        <el-time-select placeholder="结束时间" v-model="form.AloneDataTimeEnd" :picker-options="{
                                  start: '08:30',
                                  step: '00:15',
                                  end: '18:30',
                                  minTime: form.AloneDataTimeStart
                                }">
                        </el-time-select>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseDialog">取 消</el-button>
                <el-button type="primary" @click="onSaveOrder" :loading="isSaving">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'workOrderDialog',
    props: {
        form: {
            type: Object,
            default () {
                return {}
            }
        },
        dialog: {
            type: Boolean,
            default () {
                return false
            }
        }
    },
    watch: {
        'form.houseKeeperId' (val) {
            let mobile = ''
            this.houseKeeperData.map(value => {
                if (value.userId === val) {
                    mobile = value.mobile
                    this.$set(this.form, 'houseKeeperMobile', mobile)
                    this.$set(this.form, 'houseKeeper', value.name)
                    return false
                }
            })
        }
    },
    data () {
        const checkMobile = (rule, value, callback) => {
            const Reg = /^1\d{10}$/
            if (!value) {
                if (rule.field === 'customerMobile') {
                    callback(new Error('请输入手机号码'))
                } else {
                    callback(new Error('请输入管家电话'))
                }
            } else if (Reg.test(value) === false) {
                callback(new Error('手机号码格式不正确'))
            } else {
                callback()
            }
        }
        const validServiceNum = (rule, value, callback) => {
            // const Reg = /\d{5}/
            const N = /^\+?[0-9]\d*$/
            if (!value) {
                callback(new Error('请填写服务数量'))
            } else if (!N.test(value)) {
                callback(new Error('服务数量格式不正确'))
            } else {
                callback()
            }
        }
        return {
            rules: {
                customerName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                customerMobile: [
                    { required: true, validator: checkMobile, trigger: 'blur' }
                ],
                houseKeeperId: [
                    { required: true, message: '管家不能为空', trigger: 'change' }
                ],
                houseKeeperMobile: [
                    { required: true, validator: checkMobile, trigger: 'change' }
                ],
                customerAddress: [
                    { required: true, message: '地址不能为空', trigger: 'blur' }
                ],
                reserveMode: [
                    { required: true, message: '预约方式不能为空', trigger: 'blur' }
                ],
                goodsName: [
                    { required: true, message: '服务项目不能为空', trigger: 'blur' }
                ],
                serviceNum: [
                    { required: true, validator: validServiceNum, trigger: 'blur' }
                ],
                AloneData: [
                    { required: true, message: '服务日期不能为空', trigger: 'blur' }
                ],
                AloneDataTimeStart: [
                    { required: true, message: '开始时间不能为空', trigger: 'blur' }
                ],
                AloneDataTimeEnd: [
                    { required: true, message: '结束时间不能为空', trigger: 'blur' }
                ]
            },
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() < Date.now() - 60 * 60 * 24 * 1000
                }
            },
            isSaving: false,
            houseKeeperData: [],
            channelType: []
        }
    },
    methods: {
        onSaveOrder () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    try {
                        this.isSaving = true
                        this.form.createBy = this.userInfo.employeeName
                        this.form.reserveBeginTime = this.form.AloneData + ' ' + this.form.AloneDataTimeStart
                        this.form.reserveEndTime = this.form.AloneData + ' ' + this.form.AloneDataTimeEnd
                        this.houseKeeperData.forEach(value => {
                            if (value.id === this.form.houseKeeperId) {
                                this.form.houseKeeper = value.name
                            }
                        })
                        await createWorkOrder(this.form)
                        this.$emit('search')
                        this.isSaving = false
                        this.onCloseDialog()
                    } catch (e) {
                        this.onCloseDialog()
                    }
                } else {
                    // this.onCloseDialog()
                }
            })
        },
        onCloseDialog () {
            this.$emit('onDialog')
        },
        clearValidate () {
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        }
    }
}
</script>

<style>
</style>