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
            <el-form-item label="无形资产-专利：">
                <p>{{justiceData.assetList[type].patent}}</p>
            </el-form-item>
            <el-form-item label="无形资产-商标：">
                <p>{{justiceData.assetList[type].brand}}</p>
            </el-form-item>
            <el-form-item label="无形资产-其他：">
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
                    <p>{{item.debt||'-'}}</p>
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
            <div class="flex-wrap-col info-wrap">
                <el-form label-position="right" label-width="150px" class="legal-form">
                    <el-form-item label="担保：">
                        <p>{{justiceData.assureList[type].assure||'-'}}</p>
                    </el-form-item>
                    <el-form-item label="对应金额：">
                        <p>{{justiceData.assureList[type].money||'-'}}</p>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div v-if="type === 3">
            <p class="legallnfoTitle">经营性担保</p>
            <div class="flex-wrap-col info-wrap">
                <el-form label-position="right" label-width="150px" class="legal-form">
                    <el-form-item label="担保：">
                        <p>{{justiceData.assureList[type].assure||'-'}}</p>
                    </el-form-item>
                    <el-form-item label="对应金额：">
                        <p>{{justiceData.assureList[type].money||'-'}}</p>
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
        <div v-if="type === 3">
            <p class="legallnfoTitle">非经营性担保</p>
            <div class="flex-wrap-col info-wrap">
                <el-form label-position="right" label-width="150px" class="legal-form">
                    <el-form-item label="担保：">
                        <p>{{justiceData.assureList[type].assure||'-'}}</p>
                    </el-form-item>
                    <el-form-item label="对应金额：">
                        <p>{{justiceData.assureList[type].assure||'-'}}</p>
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
        <div class="flex-wrap-col info-wrap">
            <el-form label-position="right" label-width="150px" class="legal-form">
                <el-form-item label="事件类型：">
                    <p>{{justiceData.punishmentList[type].punishmentType?punishmentTypeOptions[justiceData.punishmentList[type].punishmentType].label:'-'}}</p>
                </el-form-item>
                <el-form-item label="事件名称：">
                    <p>{{justiceData.punishmentList[type].caseInfo||'-'}}</p>
                </el-form-item>
                <el-form-item label="涉及金额：">
                    <p>{{justiceData.punishmentList[type].moneyInvolved||'-'}}</p>
                </el-form-item>
                <el-form-item label="严重性：">
                    <p>{{justiceData.punishmentList[type].ponderance?ponderanceOptions[justiceData.punishmentList[type].ponderance].label:'-'}}</p>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { DEBT_PURPOSE_OPTIONS, PUNISHMENT_TYPE_OPTIONS, PONDERANCE_OPTIONS } from '../const'
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
            ponderanceOptions: PONDERANCE_OPTIONS
        }
    },
    watch: {
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            justiceData: state => state.dueDiligence.justiceData
        }),
        /* debtTotal () {
            const debtArr = this.justiceData.debtList.map(item => item.debt)
            const result = debtArr.reduce((itemA, itemB) => (itemA - 0) + (itemB - 0), 0)
            return isNaN(result) ? '' : result
        }, */
        assureTotal () {
            const assureArr = this.justiceData.assureList.map(item => item.money)
            const result = assureArr.reduce((itemA, itemB) => (itemA - 0) + (itemB - 0), 0)
            return isNaN(result) ? '' : result
        },
        debtInformation () {
            let res = []
            if (this.justiceData.debtList && this.justiceData.debtList.length > 0) {
                res = this.justiceData.debtList.filter(item => item.type === this.type)
            }
            return res
        },
        debtTotal () {
            let total = 0
            this.debtInformation.map(item => {
                total += item.debt
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
