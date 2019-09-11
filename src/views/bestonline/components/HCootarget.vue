<template>
    <div class="jd-manage">
        <p class="titlt-p">合作目标</p>
        <p v-show="isdisabled && type">已提交 {{updateTime}} {{updateUser}} </p>
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="尽调规模：" prop="scale">
                <el-input v-model="form.scale" placeholder="请输入金额" @keyup.native="oninput('scale',$event)" :disabled="isdisabled" maxlength="25">
                    <template slot="suffix">万</template>
                </el-input>
            </el-form-item>
            <div class="table-flex table-width">
                <div class="table-row">
                    <div class="table-col">年份</div>
                    <div class="table-col"><span class="red-word">*</span>年度递增率</div>
                    <div class="table-col"><span class="red-word">*</span>净利润率</div>
                </div>
                <div class="table-row" v-for="(item,index) in form.yearRateTabelContents" :key="index">
                    <div class="table-col">{{item.year}}</div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="item.yearGrowthRate" @keyup.native="oninput('yearGrowthRate',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="item.netProfitRate" @keyup.native="oninput('netProfitRate',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                </div>
            </div>
            <el-form-item label="股权比例：" prop="equityRatio">
                <el-input v-model="form.equityRatio" placeholder="请输入内容" :disabled="isdisabled" maxlength="25"></el-input>
            </el-form-item>
        </el-form>

        <div class="flex-wrap-row top20 " v-if="!isdisabled">
            <el-col :span="2" :offset="6">
                <el-button type="info" @click.native="onSubmit(0)">保存</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" @click.native="onSubmit(1)">提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { getDueLegal, addCooperativetarget, putCooperativetarget } from '../api/index.js'
import { plusOrMinus } from '../../../utils/rules.js'
export default {
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            id: '',
            form: {
                applyId: '',
                scale: '',
                yearRateTabelContents: [],
                equityRatio: ''
            },
            rules: {
                scale: [
                    { required: true, message: '请输入尽调规模', trigger: 'blur' }
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
                ]
            },
            isdisabled: false,
            updateUser: '',
            updateTime: '',
            type: false
        }
    },
    computed: {
        roleTypes () {
            return this.roleType
        }
    },
    methods: {
        oninput (value, e) {
            if (value === 'equityRatio') {
                // 股权比例
            } else {
                e.target.value = plusOrMinus(e.target.value.toString())
            }
            this.form[value] = (e.target.value)
        },
        async getDueLegal () {
            const { data } = await getDueLegal(this.$route.query.applyId)
            if (!data.data.operationNode) {
                this.isdisabled = (!!data.data.operationNode) || !this.roleType
            } else {
                this.isdisabled = (!!data.data.operationNode)
            }
            this.type = !!data.data.operationNode
            this.id = data.data.id
            this.updateUser = data.data.updateUser
            this.updateTime = data.data.updateTime
            this.form.equityRatio = data.data.equityRatio
            this.form.scale = data.data.scale
            this.form.yearRateTabelContents = data.data.yearRateTabelContents
        },
        async onSubmit (i) {
            const type = i === 0 ? '保存' : '提交'
            this.form.yearRateTabelContents = this.form.yearRateTabelContents.map(item => {
                item.yearGrowthRate = item.yearGrowthRate - 0
                item.netProfitRate = item.netProfitRate - 0
                return item
            })
            this.form.applyId = this.$route.query.applyId
            this.form.operationNode = i
            if (i === 0) {
                if (this.id != '') {
                    this.form.id = this.id
                    this.form.updateUser = JSON.parse(sessionStorage.getItem('user_data')).name
                    await putCooperativetarget(this.form)
                    this.$message.success(type + '成功！')
                } else {
                    this.form.createUser = JSON.parse(sessionStorage.getItem('user_data')).name
                    await addCooperativetarget(this.form)
                    this.$message.success(type + '成功！')
                }
                this.$router.go(-1)
            } else if (i === 1) {
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
                        if (this.id != '') {
                            this.form.id = this.id
                            this.form.updateUser = JSON.parse(sessionStorage.getItem('user_data')).name
                            await putCooperativetarget(this.form)
                            this.$message.success(type + '成功！')
                        } else {
                            this.form.createUser = JSON.parse(sessionStorage.getItem('user_data')).name
                            await addCooperativetarget(this.form)
                            this.$message.success(type + '成功！')
                        }
                        this.isdisabled = true
                        this.type = true
                    }
                })
            }
            this.$emit('parentFun')
        }
    },
    mounted () {
        this.getDueLegal()
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
.table-width {
    width: 50%;
}
.el-input__inner {
    text-align: center;
}
</style>
