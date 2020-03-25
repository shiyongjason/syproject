<template>
    <el-dialog :title="detailData[0].title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1000px" :before-close='onCancle'>
        <el-form :model="{detailData}" :rules="rules" ref="form" label-width="180px">
            <div v-for="(item, index) in detailData" :key="index">
                <el-divider v-if="detailData.length == 3" content-position="left">第{{index+1}}期还款调息：</el-divider>
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
                        <el-input v-show="item.normalInterestPranayamaType" v-model="item.normalInterestPranayama" maxlength='20' placeholder="请输入手动调息金额"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="调息后应收正常利息：">
                            <div class="w250">
                                {{item.normalInterestPranayamaType ? item.interestAmount + +(item.normalInterestPranayama?item.normalInterestPranayama:0) : '-' }}
                            </div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="调息后剩余正常利息：">
                            <div class="w250">
                                {{item.normalInterestPranayamaType? item.interestOwe + +(item.normalInterestPranayama?item.normalInterestPranayama:0):'-'}}
                            </div>
                        </el-form-item>
                    </div>
                </div>
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
                        <el-input v-show="item.graceInterestPranayamaType" v-model="item.graceInterestPranayama" maxlength='20' placeholder="请输入手动调息金额"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="调息后应收宽限期利息：">
                            <div class="w250">
                                {{item.graceInterestPranayamaType?item.graceInterestAmount + +(item.graceInterestPranayama?item.graceInterestPranayama:0):'-'}}
                            </div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="调息后剩余宽限期利息：">
                            <div class="w250">
                                {{item.graceInterestPranayamaType?item.graceInterestOwe + +(item.graceInterestPranayama?item.graceInterestPranayama:0):'-'}}
                            </div>
                        </el-form-item>
                    </div>
                </div>
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
                        <el-input v-show="item.overDueInterestPranayamaType" v-model="item.overDueInterestPranayama" maxlength='20' placeholder="请输入手动调息金额"><template slot="append">元</template></el-input>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="调息后应收逾期罚息：">
                            <div class="w250">
                                {{item.overDueInterestPranayamaType?item.overDueInterestAmount + +(item.overDueInterestPranayama?item.overDueInterestPranayama:0):'-'}}
                            </div>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="调息后剩余逾期罚息：">
                            <div class="w250">
                                {{item.overDueInterestPranayamaType?item.overDueInterestOwe + +(item.overDueInterestPranayama?item.overDueInterestPranayama:0):'-'}}
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
        })
    },
    data () {
        return {
            loading: false,
            rules: {

            }
        }
    },
    methods: {

        async onSure () {
            console.log(111)
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
                    console.log(form)
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
