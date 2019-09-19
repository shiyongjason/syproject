<template>
    <div class="jd-manage">
         <p v-if="form.operationNode">已提交 {{form.updateTime}} {{ form.updateUser}} </p>
        <p class="title-p">合作目标</p>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="尽调规模：" prop="scale" :rules="rules.scale">
                <el-input v-model="form.scale" placeholder="请输入金额"  maxlength="25">
                    <template slot="suffix">万</template>
                </el-input>
            </el-form-item>
            <table class="custom-table">
                <thead>
                    <tr>
                        <td>年份</td>
                        <td><span class="red-word">*</span>年度递增率</td>
                        <td><span class="red-word">*</span>净利润率</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in form.yearRateTabelContents" :key="index">
                        <td>{{item.year}}</td>
                        <td>
                            <el-form-item :prop="`yearRateTabelContents[${index}].yearGrowthRate`" :rules="rules.yearGrowthRate" label-width="0">
                                <el-input placeholder="请输入内容" v-model="item.yearGrowthRate" maxlength="10">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item :prop="`yearRateTabelContents[${index}].netProfitRate`" :rules="rules.netProfitRate" label-width="0">
                                <el-input placeholder="请输入内容" v-model="item.netProfitRate" maxlength="10">
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </tbody>
            </table>
            <el-form-item label="股权比例（合作方:好享家）：" prop="equityRatio" label-width="220px">
                <el-input v-model="form.equityRatio" placeholder="请输入股权比例（例：3:4）" maxlength="25"></el-input>
            </el-form-item>
        </el-form>

        <div class="jd-bottom" :class="isCollapse?'minLeft':'maxLeft'">
            <el-col :span="2" :offset="6">
                <el-button type="info" @click.native="onSave(0)" v-if="hosAuthCheck(draftAuthCode)">暂存</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" @click.native="onSubmit(1)" v-if="hosAuthCheck(commitAuthCode)">提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { addCooperativetarget, putCooperativetarget } from '../api/index.js'
import { MoneyMinus, MoneyOrConnector } from '@/utils/rules.js'
import { mapState } from 'vuex'
import { AUTH_BESTONLINE_REVIEW_TARGET_DRAFT, AUTH_BESTONLINE_REVIEW_TARGET_COMMIT } from '@/utils/auth_const'
export default {
    data () {
        return {
            rules: {
                scale: [
                    { required: true, message: '请输入尽调规模', trigger: 'blur' },
                    { validator: MoneyOrConnector, trigger: 'blur' }
                ],
                equityRatio: [
                    { required: true, message: '请输入股权比例', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            var Reg = /^\d+(:\d+)$/
                            if (value && !(Reg.test(value))) {
                                return callback(new Error('股权比例格式不对'))
                            }
                            return callback()
                        }
                    }
                ],
                yearGrowthRate: [
                    { required: true, message: '请输入年度递增率', trigger: 'blur' },
                    { validator: MoneyMinus, trigger: 'blur' }
                ],
                netProfitRate: [
                    { required: true, message: '请输入净利润率', trigger: 'blur' },
                    { validator: MoneyMinus, trigger: 'blur' }
                ]
            },
            draftAuthCode: AUTH_BESTONLINE_REVIEW_TARGET_DRAFT,
            commitAuthCode: AUTH_BESTONLINE_REVIEW_TARGET_COMMIT
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.cotargetData,
            isCollapse: state => state.isCollapse,
            userInfo: state => state.userInfo
        })
    },
    methods: {
        async _saveOrUpdate () {
            this.form.applyId = this.$route.query.applyId
            this.form.yearRateTabelContents = this.form.yearRateTabelContents
            console.log(this.userInfo)
            if (this.form.id) {
                this.form.updateUser = this.userInfo.employeeName
                await putCooperativetarget(this.form)
                this.$message.success('暂存成功！')
                this.$router.go(-1)
                this.$emit('init')
            } else {
                this.form.createUser = this.userInfo.employeeName
                await addCooperativetarget(this.form)
                this.$message.success('提交成功！')
                this.$router.go(-1)
                this.$emit('init')
            }
        },
        async onSave () {
            this.form.operationNode = 0
            await this._saveOrUpdate()
            // this.$router.go(-1)
        },
        async onSubmit () {
            this.form.operationNode = 1
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    for (const i of this.form.yearRateTabelContents) {
                        if (i.yearGrowthRate === null || i.yearGrowthRate === '') {
                            this.$message.warning('请输入年度递增率')
                            return false
                        } else if (i.netProfitRate === null || i.netProfitRate === '') {
                            this.$message.warning('请输入净利润率')
                            return false
                        }
                    }
                    this._saveOrUpdate()
                }
            })
        }
    },
    mounted () {
    }
}
</script>
<style lang="scss" scoped>
.jd-manage {
    padding: 0 15px;
    h3 {
        margin: 0;
        line-height: 40px;
        border-bottom: 1px solid #dcdfe6;
    }
}
.custom-table {
    // width: 50%;
}
</style>
