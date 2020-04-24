<template>
    <!-- 流贷 -->
    <el-dialog :title="detailData[0].title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center>
        <div class="form">
            <el-form :model="detailData[0]" :rules="rules" ref="form" label-width="175px">
                <div>
                    <b class="dialogtitle">还款方式：</b>
                    <span class="ftitle">一次性还款</span>
                </div>
                <div class="dialogtitle">还款信息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="本次还本金时间：">
                            <el-date-picker v-model="detailData[0].thisPaidCapitalTime" type="date" :picker-options="pickerOptionsStart" value-format='yyyy-MM-dd' placeholder="请输入本次还本金时间" @change="dealCount(detailData[0])" :editable='false' :clearable='false'>
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次还本金金额：">
                            <el-input v-inputMAX="thisPaidCapitalSur" v-isNegative maxlength='16' v-model.trim="detailData[0].thisPaidCapital" placeholder="请输入本次还本金金额" :disabled='!detailData[0].thisPaidCapitalTime' @blur="dealCount(detailData[0])">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col badCrop">
                        <el-form-item label="欠收本金：" prop="thisPaidCapitalSur">
                            <!-- 总本金-已还-本次还本金金额thisPaidCapital -->
                            <div class="w250">
                                <span>{{thisPaidCapitalSur}}</span>
                                <span class="dw">元</span>
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="是否存在宽限期：">
                            <el-radio style="margin-right:5px" v-model.trim="detailData[0].exsitGrace" @change="dealCount(detailData[0])" :label="1">是</el-radio>
                            <el-radio style="margin:0 5px 0 15px" v-model.trim="detailData[0].exsitGrace" @change="dealCount(detailData[0])" :label="0">否</el-radio>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <template v-if="detailData[0].exsitGrace">
                        <div class="query-cont-col">
                            <!-- 仅允许输入非负整数，最多允许输入3位 -->
                            <el-form-item label="宽限日期：">
                                <el-input placeholder="请输入宽限期限" v-model.trim="detailData[0].graceDay" v-isNum:0='detailData[0].graceDay' maxlength='3' @blur="dealCount(detailData[0])">
                                    <template slot="append">天</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <!-- 仅允许输入非负整数，最多允许输入3位 -->
                            <el-form-item label="宽限期利率：">
                                <el-input v-model.trim="detailData[0].graceInterest" v-isNum:2="detailData[0].graceInterest" maxlength='16' placeholder="请输入宽限期利率" @blur="dealCount(detailData[0])">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </template>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="累计宽限期实时利息：">
                            <!-- 实时从接口获取 -->
                            <div class="w250">
                                <span>{{`${(detailData[0].graceInterestAmount||0)}`}}{{`${detailData[0].graceInterestPranayama?detailData[0].graceInterestPranayama>0?'(调息：+'+detailData[0].graceInterestPranayama+')':'('+detailData[0].graceInterestPranayama+')':''}`}}</span>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次还宽限利息时间：">
                            <el-date-picker v-model="detailData[0].thisPaidGraceInterestTime" :picker-options="pickerOptionsStart" type="date" value-format='yyyy-MM-dd' placeholder="请选择本次还宽限利息时间" :editable='false' :clearable='false'>
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次收取宽限利息：">
                            <!-- 支持修改，修改规则同通用样式，仅允许输入数字，允许输入俩位小数，含小数点最多20位 -->
                            <el-input @blur="verity('thisPaidGraceInterestSur')" v-isNegative maxlength='16' v-model.trim="detailData[0].thisPaidGraceInterest" placeholder="请输入本次收取宽限利息" :disabled="!detailData[0].thisPaidGraceInterestTime">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col badCrop">
                        <el-form-item label="剩余宽限利息：" prop="thisPaidGraceInterestSur">
                            <!-- 剩余宽限期利息=总宽限期利息-已还-本次收取宽限利息 -->
                            <div class="w250">
                                <span>{{(+thisPaidGraceInterestSur + detailData[0].graceInterestPranayama).toFixed(2)}}</span>
                                <span class="dw">元</span>
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="累计应收正常利息：">
                            <!-- 实时自动计算 -->
                            <div class="w250">
                                <span>{{`${(detailData[0].interestAmount||0)}`}}
                                    {{detailData[0].normalInterestPranayama?detailData[0].normalInterestPranayama>0?`(调息：+${detailData[0].normalInterestPranayama})`:`(调息：${detailData[0].normalInterestPranayama})`:''}}</span>
                                <span class="dw">元</span>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次还正常利息时间：">
                            <el-date-picker v-model="detailData[0].thisPaidInterestTime" :picker-options="pickerOptionsStart" type="date" value-format='yyyy-MM-dd' placeholder="请选择本次还正常利息时间" :editable='false' :clearable='false'>
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="本次收取正常利息：">
                            <el-input @blur="verity('thisPaidInterestSur')" v-isNegative maxlength='16' v-model.trim="detailData[0].thisPaidInterest" placeholder="请输入本次收取正常利息" :disabled="!detailData[0].thisPaidInterestTime">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col badCrop">
                        <el-form-item label="剩余正常利息：" prop="thisPaidInterestSur">
                            <!-- 总利息-已还-本次还利息 -->
                            <span>{{(+thisPaidInterestSur + detailData[0].normalInterestPranayama).toFixed(2)}}</span>
                            <span class="dw">元</span>
                        </el-form-item>
                    </div>
                </div>
                <template v-if="detailData[0].isOverDue">
                    <div class="dialogtitle">逾期</div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="阶梯式计息：">
                                <el-radio v-model.trim="detailData[0].isStepOverInterest" :label="0" @change="dealCount(detailData[0])">否</el-radio>
                                <el-radio v-model.trim="detailData[0].isStepOverInterest" :label="1" @change="onChange">是</el-radio>
                            </el-form-item>
                        </div>
                    </div>
                    <div v-if="detailData[0].isStepOverInterest==0">
                        <div class="query-cont-row">
                            <div class="query-cont-col">
                                <el-form-item label="逾期利率：">
                                    <el-input v-model.trim="detailData[0].overDueInterest" v-isNum:2='detailData[0].overDueInterest' maxlength='16' placeholder="请输入逾期利率" @blur="dealCount(detailData[0])">
                                        <template slot="append">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div v-else v-for="(item,index) in detailData[0].overdueList" :key="index">
                        <div class="smalltitle">
                            {{index+1==1?`逾期第一阶段利息：`:`逾期第二阶段利息：`}}
                        </div>
                        <div class="query-cont-row">
                            <div class="query-cont-col">
                                <el-form-item :label="index+1==1?`第一阶段时长：`:`第二阶段时长：`">
                                    <el-input v-model.trim="item.dateNum" v-isNum:0='item.dateNum' maxlength='5' placeholder="请输入逾期时长" @blur="dealCount(detailData[0])">
                                        <template slot="append">月</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="query-cont-col">
                                <el-form-item label="该阶段逾期利率：">
                                    <el-input v-isNum:2="item.overDueInterest" maxlength='16' v-model.trim="item.overDueInterest" placeholder="请输入逾期利率" @blur="dealCount(detailData[0])">
                                        <template slot="append">%</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div class="query-cont-row">
                        <div class="query-cont-col">
                            <el-form-item label="累计应缴纳逾期罚息:">
                                <div class="w250">
                                    <span>{{`${(detailData[0].overDueInterestAmount||0)}`}}
                                        {{detailData[0].overDueInterestPranayama?detailData[0].overDueInterestPranayama>0?`(调息：+${detailData[0].overDueInterestPranayama})`:`(调息：${detailData[0].overDueInterestPranayama})`:''}}</span>
                                    <span class="dw">元</span>
                                </div>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次还罚息时间：">
                                <el-date-picker v-model="detailData[0].thisPaidOverDueInterestTime" :picker-options="pickerOptionsStart" type="date" value-format='yyyy-MM-dd' placeholder="请选择约定还款日期" :editable='false' :clearable='false'>
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col">
                            <el-form-item label="本次缴纳逾期罚息:">
                                <el-input @blur="verity('thisPaidOverDueInterestSur')" v-isNegative maxlength='16' v-model.trim="detailData[0].thisPaidOverDueInterest" placeholder="请输入逾期利息" :disabled="!detailData[0].thisPaidOverDueInterestTime">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="query-cont-col badCrop">
                            <el-form-item label="剩余逾期罚息:" prop="thisPaidOverDueInterestSur">
                                <!-- 总逾期-已还-本次还逾期 -->
                                <div class="w250">
                                    <span>{{(+thisPaidOverDueInterestSur + detailData[0].overDueInterestPranayama).toFixed(2)}}</span>
                                    <span class="dw">元</span>
                                </div>
                            </el-form-item>
                        </div>
                    </div>
                </template>
                <div class="dialogtitle" v-else>未逾期</div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSave" :loading='loading'>保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { setPlan } from '../../../api'
import { mapState } from 'vuex'
import { setCountMixin } from '../../../mixins/setCount'
export default {
    name: 'AnnualInterestRateDialog',
    mixins: [setCountMixin],
    data () {
        return {
            radio: '是',
            radio2: '1',
            // 校验时加上手动调息
            rules: {
                thisPaidCapitalSur: [
                    {
                        validator: (r, v, callback) => {
                            if (+this.thisPaidCapitalSur < 0) {
                                return callback(new Error('欠收本金不能小于0'))
                            }
                            return callback()
                        }
                    }
                ],
                thisPaidGraceInterestSur: [
                    {
                        validator: (r, v, callback) => {
                            if ((+this.thisPaidGraceInterestSur + this.detailData[0].graceInterestPranayama) < 0) {
                                return callback(new Error('剩余宽限利息不能小于0'))
                            }
                            if (Number.isNaN((+this.thisPaidGraceInterestSur + this.detailData[0].graceInterestPranayama))) {
                                return callback(new Error('请输入正确的调息'))
                            }
                            return callback()
                        }
                    }
                ],
                thisPaidInterestSur: [
                    {
                        validator: (r, v, callback) => {
                            if ((+this.thisPaidInterestSur + this.detailData[0].normalInterestPranayama) < 0) {
                                return callback(new Error('剩余正常利息不能小于0'))
                            }
                            if (Number.isNaN((+this.thisPaidInterestSur + this.detailData[0].normalInterestPranayama))) {
                                return callback(new Error('请输入正确的调息'))
                            }
                            return callback()
                        }
                    }
                ],
                thisPaidOverDueInterestSur: [
                    {
                        validator: (r, v, callback) => {
                            if ((+this.thisPaidOverDueInterestSur + this.detailData[0].overDueInterestPranayama) < 0) {
                                return callback(new Error('剩余逾期罚息不能小于0'))
                            }
                            if (Number.isNaN((+this.thisPaidOverDueInterestSur + this.detailData[0].overDueInterestPranayama))) {
                                return callback(new Error('请输入正确的调息'))
                            }
                            return callback()
                        }
                    }
                ]
            },
            loading: false
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        detailData: {
            type: Array,
            default: () => {
                return [
                    {
                        'capitalAmount': '',
                        'capitalOwe': '',
                        'capitalPaid': '',
                        'capitalTime': '',
                        'endTime': '',
                        'exsitGrace': '',
                        'graceDay': '',
                        'graceInterest': '',
                        'graceInterestAmount': '',
                        'graceInterestOwe': '',
                        'graceInterestPaid': '',
                        'graceInterestTime': '',
                        'id': '',
                        'interestAmount': '',
                        'interestOwe': '',
                        'interestPaid': '',
                        'interestTime': '',
                        'isStepOverInterest': '',
                        'loanId': '',
                        'overDueInterest': '',
                        'overDueInterestAmount': '',
                        'overDueInterestOwe': '',
                        'overDueInterestPaid': '',
                        'overDueInterestTime': '',
                        'overdueList': [
                            {
                                'dateNum': '',
                                'dateType': '',
                                'id': '',
                                'overDueInterest': '',
                                'planId': '',
                                'sort': '',
                                'startTime': ''
                            }
                        ],
                        'startTime': ''
                    }
                ]
            }
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    return time.getTime() > Date.now()
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        }),
        thisPaidCapitalSur () {
            return ((this.detailData[0].capitalAmount || 0) - (this.detailData[0].capitalPaid || 0) - (this.detailData[0].thisPaidCapital || 0)).toFixed(2) || 0
        },
        thisPaidGraceInterestSur () {
            return ((this.detailData[0].graceInterestAmount || 0) - (this.detailData[0].graceInterestPaid || 0) - (this.detailData[0].thisPaidGraceInterest || 0)).toFixed(2) || 0
        },
        thisPaidInterestSur () {
            return ((this.detailData[0].interestAmount || 0) - (this.detailData[0].interestPaid || 0) - (this.detailData[0].thisPaidInterest || 0)).toFixed(2) || 0
        },
        thisPaidOverDueInterestSur () {
            return ((this.detailData[0].overDueInterestAmount || 0) - (this.detailData[0].overDueInterestPaid || 0) - (this.detailData[0].thisPaidOverDueInterest || 0)).toFixed(2) || 0
        }
    },
    methods: {
        async dealCount (query) {
            const res = await this.onCount(query)
            query.graceInterestAmount = res.graceInterestAmount || 0
            query.interestAmount = res.interestAmount || 0
            query.overDueInterestAmount = res.overDueInterestAmount || 0
            this.$forceUpdate()
        },
        // 逾期阶梯切换,没有值就取默认值
        onChange () {
            const overdueList = [
                { dateNum: '3', dateType: '', overDueInterest: '16', planId: '', sort: '', startTime: '' },
                { dateNum: '999', dateType: '', overDueInterest: '20', planId: '', sort: '', startTime: '' }
            ]
            if (this.detailData[0].overdueList.length != 2) this.$set(this.detailData[0], 'overdueList', overdueList)
            this.dealCount(this.detailData[0])
        },
        verity (validateField) {
            this.$refs.form.validateField(validateField)
        },
        onCancle () {
            this.$emit('onClose')
        },
        onSave () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    let form = {
                        createBy: this.userInfo.employeeName,
                        planList: [...this.detailData]
                    }
                    await setPlan(form)
                    this.loading = false
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                    this.onCancle()
                    this.$emit('reload')
                }
            })
        }
    },
    mounted () {
        // console.log('detailData', this.detailData)
        let obj = {
            'dateNum': '',
            'dateType': '',
            'id': '',
            'overDueInterest': '',
            'planId': '',
            'sort': '',
            'startTime': ''
        }
        if (this.detailData[0].overdueList.length < 2) {
            this.detailData[0].overdueList.push(obj)
        }
        this.dealCount(this.detailData[0])
    }
}
</script>

<style lang="scss" scoped>
.w250 {
    width: 250px;
    padding: 0 16px;
    box-sizing: border-box;
}
/deep/ .el-dialog__body {
    padding: 20px 24px;
    max-height: 600px;
    overflow: auto;
}
/deep/.yuqi .el-form-item__label {
    width: 206px !important;
}
/deep/.yuqi .el-form-item__content {
    width: 298px !important;
}
/deep/.el-form .el-input {
    width: 250px;
}
.dialogtitle {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 30px;
    color: #000;
    border-bottom: none;
}
.ftitle {
    font-size: 18px;
}
.dw {
    margin-left: 10px;
}
.smalltitle {
    line-height: 30px;
    margin-left: 27px;
}
.badCrop {
    color: rgba($color: #FF3030, $alpha: 0.9);
    font-weight: 700;
    /deep/ .el-form-item__label {
        color: rgba($color: #FF3030, $alpha: 0.9);
    }
}
</style>
