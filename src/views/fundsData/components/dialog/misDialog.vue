<template>
    <el-dialog :title="detailData.title" :visible.sync="dialogVisible" :close-on-click-modal='false' width="1200px" :before-close='onCancle' center>
        <div class="form">
            <el-form :model="form" :rules="rules" ref="form" label-width="130px" class="demo-form">
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账编号：" prop="name">
                            <el-input v-isNum:0="form.name" v-model.trim="form.name" placeholder="请输入台账编号"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="金云系统编号：" prop="name">
                            <el-input v-model.trim="form.name" placeholder="如有请输入，无请忽略"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="借款单位：" prop="loanCompanyName" ref="loanCompanyName">
                            <HAutocomplete :selectArr="paltformList" v-if="paltformList" @back-event="backPlat" :placeholder="'选择平台公司'" />
                        </el-form-item>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="onCancle">取 消</el-button>
                    <el-button type="primary">保 存</el-button>
                </span>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'misDialog',
    components: { HAutocomplete },
    data () {
        return {
            paltformList: [],
            form: {
                name: '',
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
            },
            rules: {
                name: [
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
            default: () => ({})
        }
    },
    computed: {
        ...mapGetters({
            platformData: 'platformData'
        })
    },
    methods: {
        ...mapActions({
            findPlatformslist: 'findPlatformslist'
        }),
        onCancle () {
            this.$emit('onClose')
        },
        async onFindPlatformslist () {
            console.log('onFindPlatformslist')
            await this.findPlatformslist()
            this.paltformList = this.platformData
            console.log(this.paltformList)
        },
        backPlat (val) {
            console.log(val)
            this.form.loanCompanyCode = val.value ? val.value.selectCode : ''
            this.form.loanCompanyName = val.value ? val.value.value : ''
            this.form.subsectionCode = val.value ? val.value.subsectionCode : ''
            this.form.subsectionName = val.value ? val.value.subsectionName : ''
        }
    },
    mounted () {
        this.onFindPlatformslist()
        console.log(this.detailData)
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
    padding: 20px 24px;
}
</style>
