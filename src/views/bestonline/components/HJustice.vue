<template>
    <div class="jd-manage">
        <p v-show="disabled && !!type">已提交 {{updateTime}} {{updateUser}} </p>
        <el-form ref="form" :model="justiceData">
            <el-collapse v-model="activeName" accordion>
                <KPI />
                <CoPartner/>
                <el-collapse-item v-for="(title, index) in legalInfoTitles" :key="index" :name="index + 3">
                    <template slot="title">
                        <p class="titlt-p">{{ title }}</p>
                    </template>
                    <InvestmentOut v-if="index != 3" :type="index"/>
                    <CompanyBasic v-if="index == 3" :type="index"/>
                    <LegalInfo :type="index" @add-event="onAddList"/>
                </el-collapse-item>
            </el-collapse>
            <div class="flex-wrap-row top20 ">
                <el-col :span="2" :offset="6">
                    <el-button type="info" @click="saveJusticeData(true)">暂存</el-button>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button type="primary" @click="saveJusticeData(false)">提交</el-button>
                </el-col>
            </div>
        </el-form>
    </div>
</template>

<script>
import { createJusticeDoFirst, createJusticeDo } from './../api/index.js'
import { mapState, mapActions } from 'vuex'
import KPI from '../justice/kpi.vue'
import CoPartner from '../justice/copartner.vue'
import LegalInfo from '../justice/legalInfo.vue'
import CompanyBasic from '../justice/legalInfo/companyBasic.vue'
import InvestmentOut from '../justice/legalInfo/investmentOut.vue'
export default {
    components: {
        KPI, CoPartner, CompanyBasic, InvestmentOut, LegalInfo
    },
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            legalInfoTitles: ['实际控制人法务信息', '实际控制人配偶法务信息', '拟选合伙人法务信息', '尽调公司法务信息'],
            activeName: '1',
            disabled: false,
            applyId: '',
            type: 1,
            updateTime: '',
            updateUser: '',
            tempFileId: null,
            dueLegalRemarkCreateForm: {
                companyDebtRemark: '',
                companyNotOperatingAssureRemark: '',
                companyOperatingAssureRemark: '',
                controllerAssureRemark: '',
                controllerDebtRemark: '',
                controllerMateAssureRemark: '',
                controllerMateDebtRemark: '',
                id: ''
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            justiceData: state => state.dueDiligence.justiceData
        })
        // assetListType0 () {
        //     return this.justiceData.assetList.filter(value => {
        //         if (value.type === 0) return value
        //     })
        // }
    },
    methods: {
        total (name) {
            let total = 0
            let falg = false
            let key = ''
            if (name.indexOf('assureListType') > -1) {
                key = 'money'
            } else {
                key = 'debt'
            }
            this[name].forEach((value) => {
                try {
                    let temp = value[key] - 0
                    total += temp
                } catch (e) {
                    falg = true
                }
            })
            if (falg || isNaN(total)) {
                this.$message({
                    type: 'warning',
                    message: '计算格式不正确！'
                })
                return
            }
            this[name + 'Total'] = total
        },
        onFilterUnNumber (id, fromTo, model, event) {
            let tempIndex = 0
            this['justiceData'][fromTo].forEach((value, index) => {
                if (value.id === id) tempIndex = index
            })
            this['justiceData'][fromTo][tempIndex][model] = event.target.value.replace(/[^\d]/g, '')
        },
        showWarnMsg (msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'warning'
            })
        },
        async doSave (params, message) {
            if (!params.affairs.id) {
                await createJusticeDoFirst(params)
            } else {
                await createJusticeDo(params)
            }
            this.$message({
                type: 'success',
                message: message
            })
            this.$router.go(-1)
        },
        saveJusticeData (isSave) {
            if (this.disabled) {
                this.$message({
                    type: 'warning',
                    message: '已提交数据！'
                })
                return
            }
            const params = JSON.parse(JSON.stringify(this.justiceData))
            params.applyId = this.applyId
            params.createUser = this.userInfo.name
            params.updateUser = this.userInfo.name
            params.assetList.forEach(value => {
                value.attachInfo = JSON.stringify(value.attachInfo)
            })
            let messageTip = ''
            if (isSave) {
                params.affairs.type = 0
                this.type = 0
                messageTip = '暂存成功'
            } else {
                params.affairs.type = 1
                messageTip = '提交成功'
                this.type = 1
            }
            params.applyId = this.applyId
            if (this.type === 1) {
                this.$refs['form'].validate(async (validate) => {
                    if (validate) {
                        this.doSave(params, messageTip)
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '有必填项未填写，请重新检查！'
                        })
                    }
                })
            } else {
                this.doSave(params, messageTip)
            }
        },
        onAddList (key, type) {
            const { ...obj } = this.justiceData[key][0]
            for (let key1 in obj) {
                switch (typeof obj[key1]) {
                    case 'string':
                    case 'boolean':
                        obj[key1] = ''
                        break
                    case 'number':
                        obj[key1] = 0
                        break
                    case 'obj':
                        obj[key1] = {}
                        break
                    case Array.isArray(obj[key1]):
                        obj[key1] = []
                        break
                    default:
                        obj[key1] = ''
                }
            }
            obj.type = type
            obj.id = Date.now()
            this.justiceData[key].push(obj)
        },
        onRemoveList (key, id) {
            this.justiceData[key].forEach((value, index) => {
                if (value.id === id) this.justiceData[key].splice(index, 1)
            })
        },
        ...mapActions([
            'findJusticeData'
        ])
    },
    async mounted () {
        this.applyId = this.$route.query.applyId
        await this.findJusticeData({ applyId: this.applyId })
    }
}
</script>
<style lang="scss" scoped>
    .jd-manage {
        padding: 0 15px;

        .lengthen {
            .flex-wrap-box {
                max-width: 150px;
            }
        }
    }

    .jd-manage {
        textarea {
            border: 1px solid #dddddd;
        }
    }

    table {
        border-collapse: collapse;
    }

    table,
    tr,
    td {
        border: 1px solid #dddddd;
        text-align: center;
        line-height: 40px;
    }

    .el-checkbox {
        margin-right: 20px;
    }

    .el-checkbox + .el-checkbox {
        margin-left: 0;
    }

    .supplier {
        border: 1px solid #dcdcdc;
        position: relative;
        padding-right: 40px;
        padding-top: 25px;
        margin-bottom: 20px;

        > i {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 25px;
        }

        .table-row {
            position: relative;

            &:not(:first-child) {
                border-right: none !important;
            }

            > i {
                position: absolute;
                top: 10px;
                right: -50px;
                font-size: 20px;
            }
        }
    }

    .reviewform .flex-wrap-title {
        line-height: 40px;
    }

    .flex-wrap-box-justice {
        width: 400px;
        display: flex;
    }

    .reviewform .flex-wrap-box-justice .flex-wrap-title {
        min-width: 180px;
    }

    .margin-b {
        margin: 0;
    }

    .red-span {
        color: red;
    }
    .selectconclusion{
        border-radius: 0;
    }
    .fawuForm{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .upload{
        margin-top: -10px;
        margin-bottom: 40px;
    }
    .assessmentTable {
        margin: 15px;
        /deep/ .textHeight {
            textarea {
                height: 210px;
                border: 0;
            }
        }
    }
</style>
