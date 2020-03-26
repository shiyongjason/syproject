<template>
    <el-dialog :title="detailData[0].title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1000px" :before-close='onCancle'>
        <el-form :model="{detailData}" :rules="rules" ref="form" label-width="180px">
            <div v-for="(item, index) in detailData" :key="index">
                <el-divider v-if="detailData.length == 3" content-position="left">第{{index+1}}期还款调息：</el-divider>
                <!-- 应收正常利息 -->
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="应收正常利息：">
                            <div class="w250">{{item.interestAmount}}</div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <div class="checkStyle">
                            <el-checkbox label="正常利息调息" v-model="item.normalInterestPranayamaType"></el-checkbox>
                        </div>
                        <el-input @blur="verity(`detailData[${index}].normalInterestPranayamaAfterAdjust`)" v-show="item.normalInterestPranayamaType" v-isNegative:2 v-model="item.normalInterestPranayama" maxlength='20' placeholder="请输入手动调息金额"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="调息后应收正常利息：" :prop='`detailData[${index}].normalInterestPranayamaAfterAdjust`'>
                            <div class="w250">
                                {{interest[index].normalInterestPranayamaAfterAdjust}}
                            </div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="调息后剩余正常利息：" :prop='`detailData[${index}].normalInterestPranayamaAfterAdjustOwe`'>
                            <div class="w250">
                                {{interest[index].normalInterestPranayamaAfterAdjustOwe}}
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <!-- 应收宽限期利息 -->
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="应收宽限期利息：">
                            <div class="w250">{{item.graceInterestAmount}}</div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <div class="checkStyle">
                            <el-checkbox label="宽限期利息调息" v-model="item.graceInterestPranayamaType"></el-checkbox>
                        </div>
                        <el-input @blur="verity(`detailData[${index}].graceInterestPranayamaAfterAdjust`)" v-show="item.graceInterestPranayamaType" v-isNegative:2 v-model="item.graceInterestPranayama" maxlength='20' placeholder="请输入手动调息金额"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="调息后应收宽限期利息：" :prop='`detailData[${index}].graceInterestPranayamaAfterAdjust`'>
                            <div class="w250">
                                {{interest[index].graceInterestPranayamaAfterAdjust}}
                            </div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="调息后剩余宽限期利息：" :prop='`detailData[${index}].graceInterestPranayamaAfterAdjustOwe`'>
                            <div class="w250">
                                {{interest[index].graceInterestPranayamaAfterAdjustOwe}}
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <!-- 应收逾期罚息 -->
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="应收逾期罚息：">
                            <div class="w250">{{item.overDueInterestAmount}}</div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <div class="checkStyle">
                            <el-checkbox label="逾期罚息调息" v-model="item.overDueInterestPranayamaType"></el-checkbox>
                        </div>
                        <el-input @blur="verity(`detailData[${index}].overDueInterestPranayamaAfterAdjust`)" v-show="item.overDueInterestPranayamaType" v-isNegative:2 v-model="item.overDueInterestPranayama" maxlength='20' placeholder="请输入手动调息金额"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="调息后应收逾期罚息：" :prop='`detailData[${index}].overDueInterestPranayamaAfterAdjust`'>
                            <div class="w250">
                                {{interest[index].overDueInterestPranayamaAfterAdjust}}
                            </div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="调息后剩余逾期罚息：" :prop='`detailData[${index}].overDueInterestPranayamaAfterAdjustOwe`'>
                            <div class="w250">
                                {{interest[index].overDueInterestPranayamaAfterAdjustOwe}}
                            </div>
                        </el-form-item>
                    </div>
                </div>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSure" :loading='loading'>确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { setPlan } from '../../../api'
import { mapState } from 'vuex'
export default {
    name: 'regulatingBreathingDialog',
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        detailData: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        interest () {
            let newArr = []
            this.detailData.map((val, index) => {
                newArr.push({})
                newArr[index].normalInterestPranayamaType = val.normalInterestPranayamaType
                newArr[index].normalInterestPranayama = val.normalInterestPranayama
                if (!val.normalInterestPranayamaType) {
                    newArr[index].normalInterestPranayamaAfterAdjust = '-'
                    newArr[index].normalInterestPranayamaAfterAdjustOwe = '-'
                } else {
                    newArr[index].normalInterestPranayamaAfterAdjust = (val.interestAmount + +(val.normalInterestPranayama ? val.normalInterestPranayama : 0)).toFixed(2)
                    newArr[index].normalInterestPranayamaAfterAdjustOwe = (val.interestOwe + +(val.normalInterestPranayama ? val.normalInterestPranayama : 0)).toFixed(2)
                }
                newArr[index].graceInterestPranayamaType = val.graceInterestPranayamaType
                newArr[index].graceInterestPranayama = val.graceInterestPranayama
                if (!val.graceInterestPranayamaType) {
                    newArr[index].graceInterestPranayamaAfterAdjust = '-'
                    newArr[index].graceInterestPranayamaAfterAdjustOwe = '-'
                } else {
                    newArr[index].graceInterestPranayamaAfterAdjust = (val.graceInterestAmount + +(val.graceInterestPranayama ? val.graceInterestPranayama : 0)).toFixed(2)
                    newArr[index].graceInterestPranayamaAfterAdjustOwe = (val.graceInterestOwe + +(val.graceInterestPranayama ? val.graceInterestPranayama : 0)).toFixed(2)
                }
                newArr[index].overDueInterestPranayamaType = val.overDueInterestPranayamaType
                newArr[index].overDueInterestPranayama = val.overDueInterestPranayama
                if (!val.overDueInterestPranayamaType) {
                    newArr[index].overDueInterestPranayamaAfterAdjust = '-'
                    newArr[index].overDueInterestPranayamaAfterAdjustOwe = '-'
                } else {
                    newArr[index].overDueInterestPranayamaAfterAdjust = (val.overDueInterestAmount + +(val.overDueInterestPranayama ? val.overDueInterestPranayama : 0)).toFixed(2)
                    newArr[index].overDueInterestPranayamaAfterAdjustOwe = (val.overDueInterestOwe + +(val.overDueInterestPranayama ? val.overDueInterestPranayama : 0)).toFixed(2)
                }
            })
            return newArr
        }
    },
    data () {
        return {
            loading: false,
            rules: {}
        }
    },
    mounted () {
        this.detailData.map((i, n) => {
            if (i.normalInterestPranayama) this.$set(i, 'normalInterestPranayamaType', true)
            if (i.graceInterestPranayama) this.$set(i, 'graceInterestPranayamaType', true)
            if (i.overDueInterestPranayama) this.$set(i, 'overDueInterestPranayamaType', true)
            let rules = {
                normalInterestPranayamaAfterAdjust: `detailData[${n}].normalInterestPranayamaAfterAdjust`,
                normalInterestPranayamaAfterAdjustOwe: `detailData[${n}].normalInterestPranayamaAfterAdjustOwe`,
                graceInterestPranayamaAfterAdjust: `detailData[${n}].graceInterestPranayamaAfterAdjust`,
                graceInterestPranayamaAfterAdjustOwe: `detailData[${n}].graceInterestPranayamaAfterAdjustOwe`,
                overDueInterestPranayamaAfterAdjust: `detailData[${n}].overDueInterestPranayamaAfterAdjust`,
                overDueInterestPranayamaAfterAdjustOwe: `detailData[${n}].overDueInterestPranayamaAfterAdjustOwe`,
            }
            this.rules = {
                ...this.rules,
                [rules.normalInterestPranayamaAfterAdjust]: [{
                    validator: (r, v, callback) => {
                        if (this.interest[n].normalInterestPranayamaAfterAdjust < 0) {
                            return callback(new Error('调息后应收正常利息不能小于0'))
                        }
                        if (this.interest[n].normalInterestPranayamaAfterAdjust == 'NaN') {
                            return callback(new Error('请输入正确的调息'))
                        }
                        return callback()
                    }
                }],
                [rules.normalInterestPranayamaAfterAdjustOwe]: [{
                    validator: (r, v, callback) => {
                        if (this.interest[n].normalInterestPranayamaAfterAdjustOwe < 0) {
                            return callback(new Error('调息后剩余正常利息不能小于0'))
                        }
                        if (this.interest[n].normalInterestPranayamaAfterAdjustOwe == 'NaN') {
                            return callback(new Error('请输入正确的调息'))
                        }
                        return callback()
                    }
                }],
                [rules.graceInterestPranayamaAfterAdjust]: [{
                    validator: (r, v, callback) => {
                        if (this.interest[n].graceInterestPranayamaAfterAdjust < 0) {
                            return callback(new Error('调息后应收宽限期利息不能小于0'))
                        }
                        if (this.interest[n].graceInterestPranayamaAfterAdjust == 'NaN') {
                            return callback(new Error('请输入正确的调息'))
                        }
                        return callback()
                    }
                }],
                [rules.graceInterestPranayamaAfterAdjustOwe]: [{
                    validator: (r, v, callback) => {
                        if (this.interest[n].graceInterestPranayamaAfterAdjustOwe < 0) {
                            return callback(new Error('调息后剩余宽限期利息不能小于0'))
                        }
                        if (this.interest[n].graceInterestPranayamaAfterAdjustOwe == 'NaN') {
                            return callback(new Error('请输入正确的调息'))
                        }
                        return callback()
                    }
                }],
                [rules.overDueInterestPranayamaAfterAdjust]: [{
                    validator: (r, v, callback) => {
                        if (this.interest[n].overDueInterestPranayamaAfterAdjust < 0) {
                            return callback(new Error('调息后应收逾期罚息不能小于0'))
                        }
                        if (this.interest[n].overDueInterestPranayamaAfterAdjust == 'NaN') {
                            return callback(new Error('请输入正确的调息'))
                        }
                        return callback()
                    }
                }],
                [rules.overDueInterestPranayamaAfterAdjustOwe]: [{
                    validator: (r, v, callback) => {
                        if (this.interest[n].overDueInterestPranayamaAfterAdjustOwe < 0) {
                            return callback(new Error('调息后剩余逾期罚息不能小于0'))
                        }
                        if (this.interest[n].overDueInterestPranayamaAfterAdjustOwe == 'NaN') {
                            return callback(new Error('请输入正确的调息'))
                        }
                        return callback()
                    }
                }],
            }
        })
    },
    methods: {
        verity (validateField) {
            this.$refs.form.validateField(validateField)
            this.$refs.form.validateField(validateField + 'Owe')
        },
        async onSure () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    this.detailData.map(i => {
                        if (!i.normalInterestPranayamaType) i.normalInterestPranayama = 0
                        if (!i.graceInterestPranayamaType) i.graceInterestPranayama = 0
                        if (!i.overDueInterestPranayamaType) i.overDueInterestPranayama = 0
                    })
                    let form = {
                        // createBy: this.userInfo.employeeName,
                        planList: [...this.detailData]
                    }
                    await setPlan(form)
                    this.loading = false
                    this.$message({ type: 'success', message: '修改成功' })
                    this.onCancle()
                    this.$emit('reload')
                }
            })
        },
        onCancle () {
            this.$emit('onClose')
        }
    }
}
</script>

<style lang="scss" scoped>
.w250 {
    width: 250px;
    padding: 0 16px;
    box-sizing: border-box;
}
.checkStyle {
    width: 180px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding-right: 12px;
    box-sizing: border-box;
}
/deep/ .el-dialog__body {
    padding: 20px 24px;
}
/deep/.el-form .el-input {
    width: 250px;
}
/deep/ .el-dialog__body {
    padding: 0 24px;
    max-height: 600px;
    overflow: auto;
}
</style>
