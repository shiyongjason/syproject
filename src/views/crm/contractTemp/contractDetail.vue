<template>
    <div class="page-body B2b">
        <div class="contract-temp  page-component__scroll">
            <div class="page-body-cont">
                <div class="contract-temp_title">查看合同模板</div>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_name">合同模板设置</div>
                <el-form ref="contractForm" :model="contractForm" label-width="">
                    <el-form-item label="模板名称：">
                        <el-input v-model="contractForm.templateName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="合同类型：">
                        <el-select v-model="contractForm.typeId" placeholder="请选择合同类型" disabled>
                            <el-option v-for="item in contract_list" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_name">合同模板内容</div>
                <div class="contract-temp_flex" id="editor">
                    <div v-html="contractForm.content" class=""></div>
                </div>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_head">
                    签署方
                </div>
                <div v-if="busData.length>0">
                    <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe :column="busLabel" :data="busData">
                    </hosJoyTable>
                </div>
                <div v-if="perData.length>0">
                    <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe :column="perLabel" :data="perData">
                    </hosJoyTable>
                </div>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_head">
                    平台签署方
                </div>
                <div v-if="platData.length>0">
                    <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe :column="platLabel" :data="platData" :isAction=false>

                    </hosJoyTable>
                </div>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_head">
                    推荐签署方式
                </div>
                <template>
                    <el-radio v-model="contractForm.recommendSigner" disabled :label=1>电子签</el-radio>
                    <el-radio v-model="contractForm.recommendSigner" disabled :label=2>线下签</el-radio>
                </template>
            </div>
            <div class="page-body-cont">
                <el-button type="default" @click="onCancelTemp">取消</el-button>
            </div>
        </div>

    </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import * as Auths from '@/utils/auth_const'

export default {
    name: 'contractTemp',
    components: { hosJoyTable },
    data () {
        return {
            statusArr: [{ key: 1, value: '企业章' }, { key: 3, value: '手绘章' }, { key: 4, value: '模板章' }],
            diffHtml: '',
            // content: '<p>甲方：<input class="inputCont newinput"  ref="newinput" value="newinput"  readonly></p> <p>乙方：</p>',
            content: '',
            newContent: '',
            drawer: false,
            contractForm: {
                id: '',
                typeId: '',
                templateNo: '',
                templateName: '',
                status: '', // 状态
                content: '',
                reqParam: [],
                signerSetting: [], // 签署方设置
                operatorBy: '',
                operatorAccount: '',
                recommendSigner: 1

            },
            valid_form: {},
            rules: {},
            contract_list: [],
            options: [],
            form: {

            },
            dialogVisible: false,
            busLabel: [
                { label: '签署方', prop: 'signerName' },
                { label: '签署方类型', prop: 'signerType', dicData: [{ value: 1, label: '企业' }, { value: 2, label: '个人' }] },
                { label: '合同企业', prop: 'paramGroupName' },
                { label: '经办人', prop: 'agent' },
                { label: '签署区域', prop: 'signatureParam' },
                {
                    label: '签署要求',
                    prop: 'signerDemand',
                    render: (h, scope) => {
                        return <span>{this.findChinese(scope.row.signerDemand)}</span>
                    }
                }
            ],
            busData: [],
            perLabel: [
                { label: '签署方', prop: 'signerName' },
                { label: '签署方类型', prop: 'signerType', dicData: [{ value: 1, label: '企业' }, { value: 2, label: '个人' }] },
                { label: '合同个人', prop: 'paramGroupName' },
                { label: '签署区域', prop: 'signatureParam' },
                {
                    label: '签署要求',
                    prop: 'signerDemand',
                    render: (h, scope) => {
                        return <span>{this.findChinese(scope.row.signerDemand)}</span>
                    }
                }
            ],
            perData: [],
            platLabel: [],
            platData: [],
            radio: '',
            bakParams: [],
            newParams: [],
            num: Date.now(), // 最好是个随机的
            edit_index: ''
        }
    },
    async mounted () {
        await this.onFindtempType()
        if (this.$route.query.id) {
            this.findTempDetail(this.$route.query.id)
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            tempType: 'contractTemp/tempType',
            tempParams: 'contractTemp/tempParams',
            verTempDetail: 'contractTemp/verTempDetail'
        })

    },
    methods: {
        ...mapActions({
            getContratType: 'contractTemp/getContratType',
            getAllparams: 'contractTemp/getAllparams',
            findVerdetail: 'contractTemp/findVerdetail'
            // findCApage: 'contractTemp/findCApage'
        }),
        findChinese (val) {
            // console.log(val)
            const a = val.split(',')
            const cArr = []
            a.forEach(item => {
                cArr.push(this.statusArr.filter(val => val.key == item)[0].value)
            })
            return cArr.toString()
        },
        async onFindtempType () {
            await this.getContratType({
                typeAuth: this.hosAuthCheck(Auths.CONTRACTLIST_TYPE_AUTH) ? '' : 2 // 1确认函
            })
            this.contract_list = this.tempType
        },
        async findTempDetail (val) {
            await this.findVerdetail(val)
            // 编辑时候 把 插入的合同字段 重新复制一份 bakParams
            this.contractForm = { ...this.contractForm, ...this.verTempDetail }
            // 复制一份
            this.valid_form = JSON.parse(JSON.stringify(this.contractForm))
            // 签署方 type=2
            let singerArr = []
            // 对客户签署区进行汉化处理，英文的customSign转成客户签署区
            singerArr = this.verTempDetail.signerSetting.filter((val) => val.type == 2).map(item => {
                item.signatureParam = item.signatureParam ? item.signatureParam.map(i => i.replace('customSign', '客户签署区')) : '-'
                return item
            })
            this.busData = singerArr.filter(val => val.signerType == 1)
            this.perData = singerArr.filter(val => val.signerType == 2)

            this.platData = this.verTempDetail.signerSetting.filter((val) => val.type == 1)
            if (this.platData[0].signerType == 1) {
                this.platLabel = [
                    { label: '签署方', prop: 'signerName' },
                    { label: '签署方类型', prop: 'signerType', dicData: [{ value: 1, label: '企业' }, { value: 2, label: '个人' }] },
                    { label: '签署方企业来源', prop: 'signerType', dicData: [{ value: 1, label: '指定企业' }, { value: 2, label: '合同企业' }] },
                    { label: '签署方企业名称', prop: 'paramGroupName' },
                    {
                        label: '签署要求',
                        prop: 'signerDemand',
                        render: (h, scope) => {
                            return <span>{this.findChinese(scope.row.signerDemand)}</span>
                        }
                    }
                ]
            } else if (this.platData[0].signerType == 2) {
                this.platLabel = [
                    { label: '签署方', prop: 'signerName' },
                    { label: '签署方类型', prop: 'signerType', dicData: [{ value: 1, label: '企业' }, { value: 2, label: '个人' }] },
                    { label: '签署方企业来源', prop: 'signerType', dicData: [{ value: 1, label: '指定企业' }, { value: 2, label: '合同企业' }] },
                    { label: '合同企业', prop: 'paramGroupName' },
                    {
                        label: '签署要求',
                        prop: 'signerDemand',
                        render: (h, scope) => {
                            return <span>{this.findChinese(scope.row.signerDemand)}</span>
                        }
                    }
                ]
            }
        },
        onCancelTemp () {
            history.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
.contract-temp {
    &_flex {
        display: flex;
        padding: 10px 0;
        .el-input {
            width: 180px;
        }
    }
    &_title {
        font-size: 20px;
    }
    &_rich {
        margin-top: 20px;
        flex: 1;
    }
    &_txt {
        width: 700px;
    }
    ._flex {
        display: flex;
        justify-content: space-around;
    }
    &_head {
        margin-bottom: 10px;
    }
}
.page-body-cont {
    margin-bottom: 10px;
}
.contract-temp_flex {
}
/deep/#editor {
    table {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
    }
    th {
        border-bottom: 2px solid #ccc;
        text-align: center;
        background-color: #f1f1f1;
        border-right: 1px solid #ccc;
        padding: 3px 5px;
        min-height: 30px;
    }
    td {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        padding: 3px 5px;
        min-height: 30px;
    }
    img {
        max-width: 500px;
    }
}

/deep/.w-e-text-container {
    z-index: 100 !important;
}
/deep/#editor input {
    color: #ff7a45;
    display: inline-block;
    height: 22px;
    min-width: 20px;
    // max-width: 100px;
    // background: #efeeee;
    border: none;
    text-align: center;
    margin-right: 3px;
    border-radius: 5px;
    cursor: pointer;
}
.mention {
    background: rgba(0, 0, 0, 0.1);
    font-size: 0.8rem;
    font-weight: 700;
    border-radius: 5px;
    padding: 0.2rem 0.5rem;
    white-space: nowrap;
}
/deep/.el-select-dropdown {
    z-index: 20000 !important;
}
/deep/.w-e-menu {
    z-index: 500 !important;
}
/deep/.w-e-text p {
    word-break: break-all;
}
</style>
