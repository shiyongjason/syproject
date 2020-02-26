<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center>
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
                            <HAutocomplete :selectArr="platformData" :selectObj="detailData" v-if="platformData" @back-event="backPlat" :placeholder="'选择平台公司'" />
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="MIS编码：" prop="misCode">
                            <span class="w150">{{detailData.misCode}}</span>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="分部：" prop="subsectionName">
                            <span class="w150">{{detailData.subsectionName}}</span>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancle">取 消</el-button>
            <el-button type="primary" @click="onSave" :loading='loading'>保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { setAccountBasic } from '../../api/index'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { mapGetters } from 'vuex'
export default {
    name: 'misDialog',
    components: { HAutocomplete },
    data () {
        return {
            paltformList: [],
            selectObj: {
                selectName: '',
                selectCode: ''
            },
            rules: {
                standingBookNo: [
                    { required: true, message: '请输入台账编号', trigger: 'blur' }
                ],
                loanCompanyName: [
                    { required: true, message: '请输入借款单位', trigger: 'blur' }
                ],
                misCode: [
                    { required: true, message: '请输入misCode', trigger: 'blur' }
                ],
                subsectionName: [
                    { required: true, message: '请输入分部', trigger: 'blur' }
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
                standingBookNo: '', // 台账编号
                selectName: '',
                selectCode: ''
            })
        }
    },
    computed: {
        ...mapGetters({
            platformData: 'platformData'
        })
    },
    methods: {
        onCancle () {
            this.$emit('onClose')
        },
        backPlat (val) {
            this.detailData.loanCompanyCode = val.value ? val.value.selectCode : ''
            this.detailData.loanCompanyName = val.value ? val.value.value : ''
            this.detailData.subsectionCode = val.value ? val.value.subsectionCode : ''
            this.detailData.subsectionName = val.value ? val.value.subsectionName : ''
            this.detailData.misCode = val.value ? val.value.misCode : ''
        },
        onSave () {
            this.$refs['form'].validate(async (valid, error) => {
                if (valid) {
                    this.loading = true
                    await setAccountBasic(this.detailData)
                    this.loading = false
                    this.$message({ type: 'success', message: '修改成功' })
                    this.onCancle()
                    this.$emit('reload')
                } else {
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
    padding: 20px 24px;
}
.w150{
    width: 150px;
    display: inline-block;
}
</style>