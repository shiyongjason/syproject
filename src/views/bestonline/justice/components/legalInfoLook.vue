<template>
    <div>
        <p class="small-title">资产信息</p>
        <div v-for="(item, index) in assetList" :key="'assetList'+item.type+index">
            <el-form label-position="right" label-width="150px">
                <el-form-item label="不动产：">
                    <el-input type="textarea" v-model="item.realEstate" placeholder="请输入不动产" rows="3"></el-input>
                </el-form-item>
                <el-form-item label="准不动产：">
                    <el-input type="textarea" v-model="item.chattelReal" placeholder="请输入准不动产" rows="3"></el-input>
                </el-form-item>
                <el-form-item label="动产：">
                    <el-input type="textarea" v-model="item.movableProperty" placeholder="请输入动产" rows="3"></el-input>
                </el-form-item>
                <el-form-item label="无形资产-专利：">
                    <el-input type="textarea" v-model="item.patent" placeholder="专利" rows="3"></el-input>
                </el-form-item>
                <el-form-item label="无形资产-商标：">
                    <el-input type="textarea" v-model="item.brand" placeholder="商标" rows="3"></el-input>
                </el-form-item>
                <el-form-item label="无形资产-其他：">
                    <el-input type="textarea" v-model="item.other" placeholder="其他" rows="3"></el-input>
                </el-form-item>
            </el-form>
                <div class="flex-wrap-box">
                    <div class="flex-wrap-title">附件：</div>
                    <div class="flex-wrap-cont">
                        <el-upload class="upload-demo" v-bind="uploadInfo" :on-success="handleSuccess" :before-remove="beforeRemove" :on-exceed="handleExceed" :file-list="item.attachInfo" :before-upload="handleUpload">
                            <el-button size="small" type="primary" @click="uploadId(item)">点击上传
                            </el-button>
                        </el-upload>
                    </div>
                    <div class="cont" v-if="item.attachInfo">
                        <div v-if="item.attachInfo.length === 0">暂无附件</div>
                        <p v-else class="upload" v-for="(sub,index) in item.attachInfo" :key="index" @click="uploadId(item)">
                            <a :href="sub.url" target="_blank">{{sub.name}}</a>
                        </p>
                    </div>
                </div>
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
            <div v-for="(item, index) in debtList" :key="'debtList'+item.type+index">
                <div class="flex-wrap-col info-wrap">
                    <template>
                        <i class="el-icon-circle-plus-outline pointer" v-if="index === 0" @click="onAddList('debtList', 'defaultDebt')"></i>
                        <i class="el-icon-remove-outline pointer" v-else @click="onRemoveList('debtList', item.id)"></i>
                    </template>
                    <el-form label-position="right" label-width="150px" class="legal-form">
                        <el-form-item label="借款：">
                            <el-input v-model="item.debt" placeholder="借款" maxlength="25"></el-input>
                        </el-form-item>
                        <el-form-item label="用途：">
                            <el-select v-model="item.purpose" placeholder="请选择用途">
                                <el-option v-for="item in debtPurposeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <el-form class="legallnfoRemark" label-position="top" label-width="200px" v-if="justiceData.dueLegalRemarkCreateForm" :model="justiceData.dueLegalRemarkCreateForm">
                <el-form-item label="备注：" v-if="type === 0">
                    <el-input type="textarea" rows="4" maxlength="25" v-model="justiceData.dueLegalRemarkCreateForm.controllerDebtRemark">
                    </el-input>
                </el-form-item>
                <el-form-item label="备注：" v-if="type === 1">
                    <el-input type="textarea" rows="4" maxlength="25" v-model="justiceData.dueLegalRemarkCreateForm.controllerMateDebtRemark">
                    </el-input>
                </el-form-item>
                <el-form-item label="备注：" v-if="type === 2">
                    <el-input type="textarea" rows="4" maxlength="25" v-model="justiceData.dueLegalRemarkCreateForm.proposedPartnerDebtRemark">
                    </el-input>
                </el-form-item>
                <el-form-item label="备注：" v-if="type === 3">
                    <el-input type="textarea" rows="4" maxlength="25" v-model="justiceData.dueLegalRemarkCreateForm.companyDebtRemark">
                    </el-input>
                </el-form-item>
            </el-form>

            <p class="small-title">担保信息（万）</p>
            <div v-if="type !== 3">
                <div v-for="(item, index) in assureList" :key="'assureList'+item.type+index" class="flex-wrap-col info-wrap">
                    <template>
                        <i class="el-icon-circle-plus-outline pointer" v-if="index==0" @click="onAddList('assureList', 'defaultAssure')"></i>
                        <i class="el-icon-remove-outline pointer" v-else @click="onRemoveList('assureList', item.id)"></i>
                    </template>
                    <el-form label-position="right" label-width="150px" class="legal-form">
                        <el-form-item label="担保：">
                            <el-input v-model="item.assure" placeholder="担保" maxlength="25"></el-input>
                        </el-form-item>
                        <el-form-item label="对应金额：">
                            <el-input v-model="item.money" placeholder="对应金额" maxlength="25"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div v-if="type === 3">
                <p class="legallnfoTitle">经营性担保</p>
                <div v-for="(item, index) in assureList" :key="'assureList'+item.type+index" class="flex-wrap-col info-wrap">
                    <template>
                        <i class="el-icon-circle-plus-outline pointer" v-if="index==0" @click="onAddList('assureList', 'defaultAssure')"></i>
                        <i class="el-icon-remove-outline pointer" v-else @click="onRemoveList('assureList', item.id)"></i>
                    </template>
                    <el-form label-position="right" label-width="150px" class="legal-form">
                        <el-form-item label="担保：">
                            <el-input v-model="item.assure" placeholder="担保" maxlength="25"></el-input>
                        </el-form-item>
                        <el-form-item label="对应金额：">
                            <el-input v-model="item.money" placeholder="对应金额" maxlength="25"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <el-form class="legallnfoRemark" label-position="top" label-width="200px" v-if="justiceData.dueLegalRemarkCreateForm" :model="justiceData.dueLegalRemarkCreateForm">
                <el-form-item label="备注：" v-if="type === 0">
                    <el-input type="textarea" rows="4" maxlength="25" v-model="justiceData.dueLegalRemarkCreateForm.controllerAssureRemark">
                    </el-input>
                </el-form-item>
                <el-form-item label="备注：" v-if="type === 1">
                    <el-input type="textarea" rows="4" maxlength="25" v-model="justiceData.dueLegalRemarkCreateForm.controllerMateAssureRemark">
                    </el-input>
                </el-form-item>
                <el-form-item label="备注：" v-if="type === 2">
                    <el-input type="textarea" rows="4" maxlength="25" v-model="justiceData.dueLegalRemarkCreateForm.proposedPartnerAssureRemark">
                    </el-input>
                </el-form-item>
                <el-form-item label="备注：" v-if="type === 3">
                    <el-input type="textarea" rows="4" maxlength="25" v-model="justiceData.dueLegalRemarkCreateForm.companyOperatingAssureRemark">
                    </el-input>
                </el-form-item>
            </el-form>
            <div v-if="type === 3">
                <p class="legallnfoTitle">非经营性担保</p>
                <div v-for="(item, index) in assureList" :key="'assureList'+item.type+index" class="flex-wrap-col info-wrap">
                    <template>
                        <i class="el-icon-circle-plus-outline pointer" v-if="index==0" @click="onAddList('assureList', 'defaultAssure')"></i>
                        <i class="el-icon-remove-outline pointer" v-else @click="onRemoveList('assureList', item.id)"></i>
                    </template>
                    <el-form label-position="right" label-width="150px" class="legal-form">
                        <el-form-item label="担保：">
                            <el-input v-model="item.assure" placeholder="担保" maxlength="25"></el-input>
                        </el-form-item>
                        <el-form-item label="对应金额：">
                            <el-input v-model="item.money" placeholder="对应金额" maxlength="25"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <el-form class="legallnfoRemark" label-position="top" label-width="200px" v-if="justiceData.dueLegalRemarkCreateForm" :model="justiceData.dueLegalRemarkCreateForm">
                <el-form-item label="备注：" v-if="type === 3">
                    <el-input type="textarea" rows="4" maxlength="25" v-model="justiceData.dueLegalRemarkCreateForm.companyNotOperatingAssureRemark">
                    </el-input>
                </el-form-item>
            </el-form>

            <p class="small-title">诉讼、仲裁及行政处罚事件</p>
            <div v-for="(item,index) in punishmentList" :key="'punishmentList'+item.type+index">
                <div class="flex-wrap-col info-wrap">
                    <template>
                        <i class="el-icon-circle-plus-outline pointer" v-if="index==0" @click="onAddList('punishmentList', 'defaultPunishment')"></i>
                        <i class="el-icon-remove-outline pointer" v-else @click="onRemoveList('punishmentList', item.id)"></i>
                    </template>
                    <el-form label-position="right" label-width="150px" class="legal-form">
                        <el-form-item label="事件类型：">
                            <el-select v-model="item.punishmentType" placeholder="诉讼、仲裁">
                                <el-option v-for="item in punishmentTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="事件名称：">
                            <el-input v-model="item.caseInfo" placeholder="请输入" maxlength="25"></el-input>
                        </el-form-item>
                        <el-form-item label="涉及金额：">
                            <el-input v-model="item.moneyInvolved" placeholder="涉及金额" maxlength="25"></el-input>
                        </el-form-item>
                        <el-form-item label="严重性：">
                            <el-select placeholder="诉讼、仲裁" v-model="item.ponderance">
                                <el-option v-for="item in ponderanceOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { DEBT_PURPOSE_OPTIONS, PUNISHMENT_TYPE_OPTIONS, PONDERANCE_OPTIONS } from '../const'
import { FileUploadUrl } from '@/api/config'
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
    mounted () {

    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            justiceData: state => state.dueDiligence.justiceData
        })
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
}

.legal-form .el-form-item {
    display: inline-block;
}

.info-wrap {
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
