<template>
    <div class="jd-manage">
        <p class="titlt-p">合作目标</p>
        <p v-show="isdisabled && type">已提交 {{updateTime}} {{updateUser}} </p>
        <el-form :model="form" :rules="rules">
            <el-form-item label="尽调规模：" prop="scale">
                <el-input v-model="form.scale" @keyup.native="oninput('scale',$event)">
                    <template slot="suffix">万</template>
                </el-input>
            </el-form-item>

            <div class="table-flex table-width">
                <div class="table-row">
                    <div class="table-col">年份</div>
                    <div class="table-col"><span class="red-word">*</span>年度递增率</div>
                    <div class="table-col"><span class="red-word">*</span>净利润率</div>
                </div>
                <div class="table-row">
                    <div class="table-col">第1年</div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="formData.scale" @keyup.native="oninput('scale',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="formData.scale" @keyup.native="oninput('scale',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                </div>
                <div class="table-row">
                    <div class="table-col">第2年</div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="formData.yearGrowthRate" @keyup.native="oninput('yearGrowthRate',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="formData.scale" @keyup.native="oninput('scale',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                </div>
                <div class="table-row">
                    <div class="table-col">第3年</div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="formData.scale" @keyup.native="oninput('scale',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="formData.scale" @keyup.native="oninput('scale',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                </div>
                <div class="table-row">
                    <div class="table-col">第4年</div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="formData.netProfitRate" @keyup.native="oninput('netProfitRate',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="formData.scale" @keyup.native="oninput('scale',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                </div>
                <div class="table-row">
                    <div class="table-col">第5年</div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="formData.netProfitRate" @keyup.native="oninput('netProfitRate',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                    <div class="table-col">
                        <el-input placeholder="请输入内容" v-model="formData.scale" @keyup.native="oninput('scale',$event)" :disabled="isdisabled" maxlength="25">
                            <template slot="suffix">%</template>
                        </el-input>
                    </div>
                </div>
            </div>
            <el-form-item label="股权比例：" prop="equityRatio">
                <el-input v-model="form.equityRatio">
                </el-input>
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
import { mapState } from 'vuex'
import { plusOrMinus } from '../../../rules'
export default {
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            formData: {
                scale: '', // 尽调规模
                yearGrowthRate: '', // 年度递增率
                equityRatio: '', // 股权比例
                netProfitRate: '' // 净利润率
            },
            data: {},
            isdisabled: false,
            updateUser: '',
            updateTime: '',
            type: false,
            form: {
                scale: '',
                equityRatio: ''
            },
            rules: {
                scale: [
                    { required: true, message: '请输入尽调规模', trigger: 'blur' }
                ],
                equityRatio: [
                    { required: true, message: '请输入股权比例', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        roleTypes () {
            return this.roleType
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    mounted () {
        this.getDueLegal()
    },
    methods: {
        oninput (value, e) {
            if (value === 'equityRatio') {
                // 股权比例
            } else {
                e.target.value = plusOrMinus(e.target.value.toString())
            }
            this.formData[value] = (e.target.value)
        },
        vaildEmpty (value) {
            if (value !== null && value !== undefined && value !== '') {
                return true
            } else {
                return false
            }
        },
        showWarnMsg (msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'warning'
            })
        },
        async getDueLegal () {
            const { data } = await getDueLegal(this.$route.query.applyId)
            // console.log(data)
            // if (!data.data.operationNode) {
            //     this.isdisabled = (!!data.data.operationNode) || !this.roleType
            // } else {
            //     this.isdisabled = (!!data.data.operationNode)
            // }
            this.type = !!data.data.operationNode
            this.data = data.data
            this.updateUser = data.data.updateUser
            this.updateTime = data.data.updateTime
            this.formData.scale = data.data.scale
            this.formData.yearGrowthRate = data.data.yearGrowthRate
            this.formData.equityRatio = data.data.equityRatio
            this.formData.netProfitRate = data.data.netProfitRate
        },
        async onSubmit (i) {
            const type = i === 0 ? '保存' : '提交'
            let data = {
                applyId: this.$route.query.applyId,
                ...this.formData,
                operationNode: i
            }
            if (i === 0) {
                if (this.data.id) {
                    Object.assign(data, { updateUser: this.userInfo.name, id: this.data.id })
                    await putCooperativetarget(data)
                } else {
                    Object.assign(data, { createUser: this.userInfo.name })
                    await addCooperativetarget(data)
                }
                this.$router.go(-1)
            }
            if (i === 1) {
                if (!this.vaildEmpty(this.formData.scale)) {
                    this.showWarnMsg('请输入尽调规模')
                    return false
                }
                if (!this.vaildEmpty(this.formData.yearGrowthRate)) {
                    this.showWarnMsg('请输入年度递增率')
                    return false
                }
                if (!this.vaildEmpty(this.formData.equityRatio)) {
                    this.showWarnMsg('请选择股权比例')
                    return false
                }
                // eslint-disable-next-line
                const regex = /^\d+(\:\d+)$/.test(this.formData.equityRatio)
                if (!regex) {
                    this.$message({
                        showClose: true,
                        message: '股权比例格式不对',
                        type: 'warning'
                    })
                    return false
                }
                if (!this.vaildEmpty(this.formData.netProfitRate)) {
                    this.showWarnMsg('请选择净利润率')
                    return false
                }
                if (this.data.id) {
                    Object.assign(data, { updateUser: this.userInfo.name, id: this.data.id })
                    await putCooperativetarget(data)
                } else {
                    Object.assign(data, { createUser: this.userInfo.name })
                    await addCooperativetarget(data)
                }
                this.isdisabled = true
                this.type = true
            }
            this.$message({
                type: 'success',
                message: `${type}成功`
            })
            this.$emit('parentFun')
        }
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
