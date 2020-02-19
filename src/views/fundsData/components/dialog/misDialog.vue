<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px"
        :before-close='onCancle' center>
        <div class="form">
            <el-form :model="detailData" :rules="rules" ref="form" label-width="130px" class="demo-form">
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账编号：" prop="standingBookNo">
                            <el-input v-model.trim="detailData.standingBookNo" placeholder="请输入台账编号"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="借款单位：" prop="loanCompanyName" ref="loanCompanyName">
                            <HAutocomplete :selectArr="platformData" :selectObj.sync="detailData" v-if="paltformList"
                                @back-event="backPlat" :placeholder="'选择平台公司'" />
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="MIS编码：" prop="misCode">
                            <span>{{detailData.misCode}}</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="分部：" prop="misCode">
                            <span>{{detailData.subsectionName}}</span>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSave">保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import { getAccountBasic, setAccountBasic } from '../../api/index'
    import HAutocomplete from '@/components/autoComplete/HAutocomplete'
    import { mapGetters } from 'vuex'
    export default {
        name: 'misDialog',
        components: { HAutocomplete },
        data() {
            return {
                paltformList: [],
                selectObj: {
                    selectName: '',
                    selectCode: ''
                },
                rules: {
                    standingBookNo: [
                        { required: true, message: '请输入台账编号', trigger: 'blur' }
                    ]
                }
            }
        },
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            },
            detailData: {
                type: Object,
                default: () => ({
                    id: '',
                    accountType: '', // 台账类型 1：流贷2：敞口 3：分授信
                    jinyunArchiveNo: '', // 金云档案编号
                    loanCompanyCode: '', // 借款单位编号
                    loanCompanyName: '', // 借款单位名称
                    subsectionCode: '', // 分部编码
                    subsectionName: '', // 分部名称
                    misCode: '', // mis编码
                    productType: '', // 产品类型 1：好信用 2：供应链 3：好橙工
                    remark: '', // 备注
                    standingBookArchiveNo: '', // 台账档案编号
                    standingBookNo: '' // 台账编号
                })
            }
        },
        watch: {

        },
        computed: {
            ...mapGetters({
                platformData: 'platformData'
            })
        },
        methods: {
            onCancle() {
                this.$emit('onClose')
            },
            backPlat(val) {
                this.detailData.loanCompanyCode = val.value ? val.value.selectCode : ''
                this.detailData.loanCompanyName = val.value ? val.value.value : ''
                this.detailData.subsectionCode = val.value ? val.value.subsectionCode : ''
                this.detailData.subsectionName = val.value ? val.value.subsectionName : ''
            },
            onSave() {
                console.log(this.form)
                this.$refs['form'].validate(async (valid, object) => {
                    console.log(object) // object就是未通过校验的字段
                    if (valid) {
                        // 验证通过
                        // await setAccountBasic(this.form)
                        // this.$message({
                        //     type: 'success',
                        //     message: '修改成功'
                        // })
                        // this.onCancle()
                    } else {
                    }
                })
            }
        },
        onSave () {
            console.log(this.form)
            this.$refs['form'].validate(async (valid, object) => {
                console.log(object) // object就是未通过校验的字段
                if (valid) {
                    // 验证通过
                    await setAccountBasic(this.form)
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                    this.onCancle()
                    this.$emit('reload')
                } else {
                }
            })
        }
    }
    // mounted () {
    //     this.onFindPlatformslist()
    //     console.log('xx', this.detailData)
    //     this.form = {
    //         id: this.detailData.account_id,
    //         standingBookNo: this.detailData.account_standingBookNo,
    //         accountType: this.detailData.account_accountType,
    //         productType: this.detailData.account_productType,
    //         misCode: this.detailData.account_misCode,
    //         loanCompanyCode: this.detailData.account_loanCompanyCode,
    //         loanCompanyName: this.detailData.account_loanCompanyName,
    //         subsectionCode: this.detailData.account_subsectionCode,
    //         subsectionName: this.detailData.account_subsectionName,
    //         standingBookArchiveNo: this.detailData.account_standingBookArchiveNo,
    //         jinyunArchiveNo: this.detailData.account_jinyunArchiveNo,
    //         remark: this.detailData.account_remark
    //     }
    //     this.selectObj = {
    //         selectName: this.form.loanCompanyName,
    //         selectCode: this.form.loanCompanyCode
    //     }
    // }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog__body {
        padding: 20px 24px;
    }
</style>