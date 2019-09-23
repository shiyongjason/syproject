<template>
    <div v-if="justiceData.assetList&&justiceData.assetList.length>0">
        <p class="small-title">资产信息</p>
        <el-form label-position="right" label-width="150px" >
            <el-form-item label="不动产：">
                <p>{{justiceData.assetList[type].realEstate}}</p>
            </el-form-item>
            <el-form-item label="准不动产：">
                <p>{{justiceData.assetList[type].chattelReal}}</p>
            </el-form-item>
            <el-form-item label="动产：">
                <p>{{justiceData.assetList[type].movableProperty}}</p>
            </el-form-item>
            <el-form-item label="无形资产：">
                <p>{{justiceData.assetList[type].intangibleAssets||'-'}}</p>
            </el-form-item>
            <el-form-item label="专利：">
                <p>{{justiceData.assetList[type].patent}}</p>
            </el-form-item>
            <el-form-item label="商标：">
                <p>{{justiceData.assetList[type].brand}}</p>
            </el-form-item>
            <el-form-item label="其他：">
                <p>{{justiceData.assetList[type].other}}</p>
            </el-form-item>
            <el-form-item label="附件：">
                <div class="cont" v-if="justiceData.assetList[type].attachInfo">
                    <div v-if="justiceData.assetList[type].attachInfo.length === 0">暂无附件</div>
                    <p v-else class="upload" v-for="(sub,index) in justiceData.assetList[type].attachInfo" :key="index" @click="uploadId(item)">
                        <a :href="sub.url" target="_blank">{{sub.name}}</a>
                    </p>
                </div>
            </el-form-item>
        </el-form>
        <p class="small-title">负债信息（万）</p>
        <div class="flex-wrap-row">
            <div class="flex-wrap-box">
                <el-form label-position="left" label-width="100px" class="fawuForm">
                    <el-form-item label="合计：">
                        {{ debtTotal }}
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="flex-wrap-col info-wrap" v-for="(item,index) in debtInformation" :key="index">
            <el-form label-position="right" label-width="150px" class="legal-form">
                <el-form-item label="借款：">
                    <p>{{item.debt?item.debt + '万':'-'}}</p>
                </el-form-item>
                <el-form-item label="用途：">
                    <p>{{item.purpose?debtPurposeOptions[item.purpose].label:'-'}}</p>
                </el-form-item>
            </el-form>
        </div>
        <el-form class="legallnfoRemark" label-position="top" label-width="200px" v-if="justiceData.dueLegalRemarkCreateForm" :model="justiceData.dueLegalRemarkCreateForm">
            <el-form-item label="备注：" v-if="type === 0">
                <p>{{justiceData.dueLegalRemarkCreateForm.controllerDebtRemark||'-'}}</p>
            </el-form-item>
            <el-form-item label="备注：" v-if="type === 1">
                <p>{{justiceData.dueLegalRemarkCreateForm.controllerMateDebtRemark||'-'}}</p>
            </el-form-item>
            <el-form-item label="备注：" v-if="type === 2">
                <p>{{justiceData.dueLegalRemarkCreateForm.proposedPartnerDebtRemark||'-'}}</p>
            </el-form-item>
            <el-form-item label="备注：" v-if="type === 3">
                <p>{{justiceData.dueLegalRemarkCreateForm.companyDebtRemark||'-'}}</p>
            </el-form-item>
        </el-form>

        <p class="small-title">担保信息（万）</p>
        <div v-if="type !== 3">
            <p v-if="type === 2" class="legallnfoTitle">经营性担保</p>
            <div class="flex-wrap-row">
                <div class="flex-wrap-box">
                    <el-form label-position="left" label-width="100px" class="fawuForm">
                        <el-form-item label="合计：">
                            {{ assureTotal }}
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="flex-wrap-col info-wrap" v-for="(item,index) in assureInformation" :key="index">
                <el-form label-position="right" label-width="150px" class="legal-form">
                    <el-form-item label="担保：">
                        <p>{{item.assure||'-'}}</p>
                    </el-form-item>
                    <el-form-item label="对应金额：">
                        <p>{{item.money||'-'}}</p>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div v-if="type === 3">
            <p class="legallnfoTitle">经营性担保</p>
            <div class="flex-wrap-row">
                <div class="flex-wrap-box">
                    <el-form label-position="left" label-width="100px" class="fawuForm">
                        <el-form-item label="合计：">
                            {{ assureTotal }}
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="flex-wrap-col info-wrap" v-for="(item,index) in assureInformation" :key="index">
                <el-form label-position="right" label-width="150px" class="legal-form">
                    <el-form-item label="担保：">
                        <p>{{item.assure||'-'}}</p>
                    </el-form-item>
                    <el-form-item label="对应金额：">
                        <p>{{item.money||'-'}}</p>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-form class="legallnfoRemark" label-position="top" label-width="200px" v-if="justiceData.dueLegalRemarkCreateForm" :model="justiceData.dueLegalRemarkCreateForm">
            <el-form-item label="备注：" v-if="type === 0">
                <p>{{justiceData.dueLegalRemarkCreateForm.controllerAssureRemark||'-'}}</p>
            </el-form-item>
            <el-form-item label="备注：" v-if="type === 1">
                <p>{{justiceData.dueLegalRemarkCreateForm.controllerMateAssureRemark||'-'}}</p>
            </el-form-item>
            <el-form-item label="备注：" v-if="type === 2">
                <p>{{justiceData.dueLegalRemarkCreateForm.proposedPartnerAssureRemark||'-'}}</p>
            </el-form-item>
            <el-form-item label="备注：" v-if="type === 3">
                <p>{{justiceData.dueLegalRemarkCreateForm.companyOperatingAssureRemark||'-'}}</p>
            </el-form-item>
        </el-form>
        <div v-if="type === 2||type === 3">
            <p class="legallnfoTitle">非经营性担保</p>
            <div class="flex-wrap-row">
                <div class="flex-wrap-box">
                    <el-form label-position="left" label-width="100px" class="fawuForm">
                        <el-form-item label="合计：">
                            {{ noAssureTotal }}
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="flex-wrap-col info-wrap" v-for="(item,index) in noAssureInformation" :key="index">
                <el-form label-position="right" label-width="150px" class="legal-form">
                    <el-form-item label="担保：">
                        <p>{{item.assure||'-'}}</p>
                    </el-form-item>
                    <el-form-item label="对应金额：">
                        <p>{{item.money||'-'}}</p>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-form class="legallnfoRemark" label-position="top" label-width="200px" v-if="justiceData.dueLegalRemarkCreateForm" :model="justiceData.dueLegalRemarkCreateForm">
            <el-form-item label="备注：" v-if="type === 3">
                <p>{{justiceData.dueLegalRemarkCreateForm.companyNotOperatingAssureRemark}}</p>
            </el-form-item>
        </el-form>

        <p class="small-title">诉讼、仲裁及行政处罚事件</p>
        <div class="flex-wrap-col info-wrap" v-for="item in punishmentList" :key="item.id">
            <el-form label-position="right" label-width="150px" class="legal-form">
                <el-form-item label="事件类型：">
                    <p>{{item.punishmentType!=null?punishmentTypePlus[item.punishmentType].label:'-'}}</p>
                </el-form-item>
                <el-form-item label="事件名称：">
                    <p>{{item.caseInfo||'-'}}</p>
                </el-form-item>
                <el-form-item label="涉及金额：">
                    <p>{{item.moneyInvolved||'-'}}</p>
                </el-form-item>
                <el-form-item label="严重性：">
                    <p>{{item.ponderance!==null?newOpitions[item.ponderance].label:'-'}}</p>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
// 数据来源 0：实际控制人 1：实际控制人配偶 2：拟选合伙人（经营性担保）3：拟选合伙人（非经营性担保）4：尽调公司（经营性担保）5：尽调公司（非经营性担保）
import { mapState } from 'vuex'
import { DEBT_PURPOSE_OPTIONS, PUNISHMENT_TYPE_OPTIONS, PONDERANCE_OPTIONS, CONTROLLER_MATE_LEGAL_RISKS_OPTIONS } from '../const'
export default {
    name: 'legal_info',
    props: {
        type: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            debtPurposeOptions: DEBT_PURPOSE_OPTIONS,
            punishmentTypeOptions: PUNISHMENT_TYPE_OPTIONS,
            ponderanceOptions: PONDERANCE_OPTIONS,
            newOpitions: CONTROLLER_MATE_LEGAL_RISKS_OPTIONS
        }
    },
    watch: {
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            justiceData: state => state.dueDiligence.justiceData
        }),
        punishmentTypePlus () {
            let newArr = this.punishmentTypeOptions.concat()
            newArr.splice(0, 1)
            console.log(newArr)

            return newArr || []
        },
        /* debtTotal () {
            const debtArr = this.justiceData.debtList.map(item => item.debt)
            const result = debtArr.reduce((itemA, itemB) => (itemA - 0) + (itemB - 0), 0)
            return isNaN(result) ? '' : result
        }, */
        /* assureTotal () {
            const assureArr = this.justiceData.assureList.map(item => item.money)
            const result = assureArr.reduce((itemA, itemB) => (itemA - 0) + (itemB - 0), 0)
            return isNaN(result) ? '' : result
        }, */
        debtInformation () {
            let res = []
            if (this.justiceData.debtList && this.justiceData.debtList.length > 0) {
                res = this.justiceData.debtList.filter(item => item.type === this.type)
            }
            return res
        },
        assureInformation () {
            let res = []
            let type = this.type === 3 ? 4 : this.type
            if (this.justiceData.assureList && this.justiceData.assureList.length > 0) {
                res = this.justiceData.assureList.filter(item => item.type === type)
            }
            return res
        },
        noAssureInformation () {
            let res = []
            let type = this.type === 2 ? 3 : 5
            if (this.justiceData.assureList && this.justiceData.assureList.length > 0) {
                res = this.justiceData.assureList.filter(item => item.type === type)
            }
            return res
        },
        punishmentList () {
            let res = []
            if (this.justiceData.punishmentList && this.justiceData.punishmentList.length > 0) {
                res = this.justiceData.punishmentList.filter(item => item.type === this.type)
            }
            return res
        },
        debtTotal () {
            let total = 0
            this.debtInformation.map(item => {
                total += item.debt
            })
            return total || '-'
        },
        assureTotal () {
            let total = 0
            this.assureInformation.map(item => {
                total += item.money
            })
            return total || '-'
        },
        noAssureTotal () {
            let total = 0
            this.noAssureInformation.map(item => {
                total += item.money
            })
            return total || '-'
        }
    },
    methods: {
    },
    mounted () {
    }
}
</script>

<style lang="scss" scoped>
.small-title {
    padding: 10px;
    font-size: 17px;
    line-height: 40px;
    background: #fafafa;
}
.legal-form {
    flex-direction: row;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;

    p {
        display: inline-block;
    }
}

.legal-form .el-form-item {
    display: inline-block;
    margin-bottom: 0;
}

.info-wrap {
    border: 1px solid #dcdcdc;
    position: relative;
    padding-right: 40px;
    padding-top: 15px;
    margin-bottom: 20px;

    > i {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
    }
}

/deep/ .el-textarea__inner {
    width: 70%;
}

.small-title {
    margin-bottom: 20px;
}
.legallnfoRemark {
    margin-top: -15px;
    margin-bottom: 20px;
}
.legallnfoTitle {
    font-size: 14px;
    margin-bottom: 10px;
}
</style>
