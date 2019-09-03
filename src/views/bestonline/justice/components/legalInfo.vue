<template>
    <el-form-item>
        <p class="small-title">资产信息（万）</p>
        <el-form-item v-for="(item, index) in assetList" :key="'assetList'+item.type+index">
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
            <div v-if="type != 2 && type != 3">
                 <el-form label-position="left" label-width="100px" class="fawuForm">
                        <el-form-item label="合计：">
                            {{ assureTotal }}
                        </el-form-item>
                    </el-form>
                <div v-for="(item, index) in assureList" :key="'assureList'+item.type+index" class="flex-wrap-col info-wrap">
                    <template>
                        <i class="el-icon-circle-plus-outline pointer" v-if="index==0" @click="onAddList('assureList', 'defaultAssure', type == 3 ? 4 : type)"></i>
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
            <div v-if="type ==2 || type == 3">
                <p class="legallnfoTitle">经营性担保</p>
                <div v-for="(item, index) in assureList" :key="'assureList'+item.type+index" class="flex-wrap-col info-wrap">
                    <template>
                        <i class="el-icon-circle-plus-outline pointer" v-if="index==0" @click="onAddList('assureList', 'defaultAssure', type == 3 ? 4 : type)"></i>
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
            <div v-if="type ==2 || type === 3">
                <p class="legallnfoTitle">非经营性担保{{type}}</p>
                <div v-for="(item, index) in nonOperationalAssureList" :key="'assureList'+item.type+index" class="flex-wrap-col info-wrap">
                    <template>
                        <i class="el-icon-circle-plus-outline pointer" v-if="index==0" @click="onAddList('assureList', 'defaultAssure', type == 2 ? 3 : 5)"></i>
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
                            <el-select v-model="item.punishmentType" placeholder="请选择事件类型">
                                <el-option v-for="item in punishmentTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="事件名称：">
                            <el-input v-model="item.caseInfo" placeholder="请输入事件名称" maxlength="25"></el-input>
                        </el-form-item>
                        <el-form-item label="涉及金额：">
                            <el-input v-model="item.moneyInvolved" placeholder="请输入涉及金额" maxlength="25"></el-input>
                        </el-form-item>
                        <el-form-item label="严重性：">
                            <el-select placeholder="请选择严重性" v-model="item.ponderance">
                                <el-option v-for="item in ponderanceOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-form-item>
    </el-form-item>
</template>

<script>
import { mapState } from 'vuex'
import { DEBT_PURPOSE_OPTIONS, PUNISHMENT_TYPE_OPTIONS, PONDERANCE_OPTIONS } from '../const'
import { fileUploadUrl } from '@/api/config'
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
        }),
        // assetListType0 () {
        //     return this.justiceData.assetList.filter(value => {
        //         if (value.type === 0) {
        //             if (!value.attachInfo) {
        //                 value.attachInfo = []
        //             } else {
        //                 // value.attachInfo = JSON.parse(value.attachInfo)
        //             }
        //             return value
        //         }
        //     })
        // },
        uploadInfo () {
            return {
                action: fileUploadUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.name
                },
                accept: '.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.xlsx,.xls,.ppt,.doc,.docx',
                name: 'multiFile'
            }
        },
        defaultAsset () {
            return {
                realEstate: '',
                chattelReal: '',
                movableProperty: '',
                intangibleAssets: '',
                patent: '',
                brand: '',
                other: '',
                type: this.type
            }
        },
        assetList () {
            let assetList = this.justiceData.assetList
            const result = assetList.filter(item => item.type == this.type)
            if (result.length == 0) {
                const tempObj = JSON.parse(JSON.stringify(this.defaultAsset))
                assetList.push(tempObj)
            }
            return assetList.filter(item => item.type == this.type)
        },
        defaultDebt () {
            return {
                debt: '',
                type: this.type,
                id: Date.now()
            }
        },
        debtList () {
            let debtList = this.justiceData.debtList
            const result = debtList.filter(item => item.type == this.type)
            if (result.length == 0) {
                const tempObj = JSON.parse(JSON.stringify(this.defaultDebt))
                debtList.push(tempObj)
            }
            return debtList.filter(item => item.type == this.type)
        },
        defaultAssure () {
            return {
                assure: '',
                money: '',
                type: this.type,
                id: Date.now()
            }
        },
        assureList () {
            let assureList = this.justiceData.assureList
            // type = 2和3的情况下分为经营性担保和非经营担保，2的经营性担保对应的是2,3的经营性担保对应的是4
            // 0：实际控制人 1：实际控制人配偶 2：拟选合伙人（经营性担保）3：拟选合伙人（非经营性担保）4：尽调公司（经营性担保）5：尽调公司（非经营性担保）
            const result = assureList.filter(item => item.type == (this.type == 3 ? 4 : this.type))
            if (result.length == 0) {
                const tempObj = JSON.parse(JSON.stringify(this.defaultAssure))
                tempObj.type = (this.type == 3 ? 4 : this.type)
                assureList.push(tempObj)
            }
            return assureList.filter(item => item.type == (this.type == 3 ? 4 : this.type))
        },
        nonOperationalAssureList () {
            // 非经营性担保,只有type=2和3的时候是有效的
            let assureList = this.justiceData.assureList
            const result = assureList.filter(item => item.type == (this.type == 2 ? 3 : 5))
            if (result.length == 0) {
                const tempObj = JSON.parse(JSON.stringify(this.defaultAssure))
                tempObj.type = (this.type == 2 ? 3 : 5)
                assureList.push(tempObj)
            }
            return assureList.filter(item => item.type == (this.type == 2 ? 3 : 5))
        },
        defaultPunishment () {
            return {
                punishmentType: 3,
                ponderance: 0,
                moneyInvolved: '',
                type: this.type,
                id: Date.now()
            }
        },
        punishmentList () {
            let punishmentList = this.justiceData.punishmentList
            const result = punishmentList.filter(item => item.type == this.type)
            if (result.length == 0) {
                const tempObj = JSON.parse(JSON.stringify(this.defaultPunishment))
                punishmentList.push(tempObj)
            }
            return punishmentList.filter(item => item.type == this.type)
        },
        debtTotal () {
            const debtArr = this.debtList.map(item => item.debt)
            const result = debtArr.reduce((itemA, itemB) => (itemA - 0) + (itemB - 0), 0)
            return isNaN(result) ? '' : result
        },
        assureTotal () {
            const assureArr = this.assureList.map(item => item.money)
            const result = assureArr.reduce((itemA, itemB) => (itemA - 0) + (itemB - 0), 0)
            return isNaN(result) ? '' : result
        }
    },
    methods: {
        uploadId (item) {
            this.tempFileId = item.id
        },
        handleSuccess (response, file, fileList) {
            if (response.code !== 200) {
                this.$confirm(response.message, '提示信息').catch(() => {
                })
            } else {
                let uploadedUrl = response.data.accessUrl
                let name = response.data.fileName
                this.justiceData.assetList.forEach(value => {
                    if (value.id === this.tempFileId) {
                        const val = { url: uploadedUrl, name: name }
                        value.attachInfo.push(val)
                    }
                })
            }
        },
        beforeRemove (file, attachInfo) {
            return this.$confirm(`确定移除 ${file.name}？`).then(() => {
                this.justiceData.assetList.forEach(value => {
                    if (value.attachInfo) {
                        let temp = -1
                        value.attachInfo.forEach((value1, index) => {
                            if (value1.url === file.url) {
                                temp = index
                            }
                        })
                        if (temp > -1) value.attachInfo.splice(temp, 1)
                    }
                })
            })
        },
        handleExceed (files, attachInfo) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + attachInfo.length} 个文件`)
        },
        handleUpload (file) {
            if (file.size / (1024 * 1024) > 10) {
                this.$message({
                    message: '建议不要超过10M',
                    type: 'warning'
                })
                return false
            }
        },
        onAddList (key, defaultKey, type) {
            console.log(key)
            console.log(defaultKey)
            console.log(this.justiceData)
            const tempObj = JSON.parse(JSON.stringify(this[defaultKey]))
            tempObj.id = Date.now()
            tempObj.type = type
            this.justiceData[key].push(tempObj)
        },
        onRemoveList (key, id) {
            this.justiceData[key] = this.justiceData[key].filter(item => item.id !== id)
        }
        // ...mapActions([
        //     'findJusticeData'
        // ])
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
