<template>
    <div>
        <p class="small-title">资产信息</p>
        <div v-for="(item, index) in assetList"
                :key="'assetList'+item.type+index">
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
            <!-- <div class="upload">
                <div class="flex-wrap-box">
                    <div class="flex-wrap-title">附件：</div>
                    <div class="flex-wrap-cont">
                        <el-upload
                            class="upload-demo"
                            v-bind="uploadInfo"
                            :on-success="handleSuccess"
                            :before-remove="beforeRemove"
                            :on-exceed="handleExceed"
                            :file-list="item.attachInfo"
                            :before-upload="handleUpload">
                            <el-button
                                size="small"
                                type="primary"
                                @click="uploadId(item)">点击上传
                            </el-button>
                        </el-upload>
                    </div>
                    <div class="cont" v-if="item.attachInfo">
                        <div v-if="item.attachInfo.length === 0">暂无附件</div>
                        <p v-else
                            class="upload"
                            v-for="(sub,index) in item.attachInfo"
                            :key="index"
                            @click="uploadId(item)">
                            <a :href="sub.url" target="_blank">{{sub.name}}</a>
                        </p>
                    </div>
                </div>
            </div> -->
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
                    <i class="el-icon-circle-plus-outline pointer"
                        @click="onAddList('debtList', 'defaultDebt')"></i>
                    <i class="el-icon-remove-outline pointer" v-if="index !== 0"
                        @click="onRemoveList('debtList', item.id)"></i>
                </template>
                <el-form label-position="right" label-width="150px" class="legal-form">
                    <el-form-item label="借款：">
                        <el-input v-model="item.debt" placeholder="借款" maxlength="25"></el-input>
                    </el-form-item>
                    <el-form-item label="用途：">
                        <el-select v-model="item.purpose" placeholder="请选择用途">
                            <el-option v-for="item in debtPurposeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-form label-position="top" label-width="200px" class="legal-form">
            <el-form-item label="备注：">
                <el-input
                    type="textarea"
                    rows="4"
                    maxlength="25">
                </el-input>
            </el-form-item>
        </el-form>

        <p class="small-title">担保信息（万）</p>
        <div class="flex-wrap-row">
            <div class="flex-wrap-box">
                <div class="flex-wrap-title">合计：</div>
                <div class="flex-wrap-cont">
                    {{ assureTotal }}
                </div>
            </div>
        </div>
        <div v-for="(item, index) in assureList" :key="'assureList'+item.type+index">
            <div class="flex-wrap-col info-wrap">
                <template>
                    <i class="el-icon-circle-plus-outline pointer" v-if="index==0"
                        @click="onAddList('assureList', 'defaultList')"></i>
                    <i class="el-icon-remove-outline pointer" v-else
                        @click="onRemoveList('assureList', item.id)"></i>
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
        <el-form label-position="top" label-width="200px">
            <el-form-item label="备注：">
                <el-input
                    type="textarea"
                    rows="4"
                    maxlength="25">
                </el-input>
            </el-form-item>
        </el-form>

        <p class="small-title">诉讼、仲裁及行政处罚事件</p>
        <div v-for="(item,index) in punishmentList" :key="'punishmentList'+item.type+index">
            <div class="flex-wrap-col info-wrap">
                <template>
                    <i class="el-icon-circle-plus-outline pointer" v-if="index==0"
                        @click="onAddList('punishmentList', 'defaultPunishment')"></i>
                    <i class="el-icon-remove-outline pointer" v-else
                        @click="onRemoveList('punishmentList', item.id)"></i>
                </template>
                <el-form label-position="right" label-width="150px" class="legal-form">
                    <el-form-item label="事件类型：">
                        <el-select v-model="item.punishmentType" placeholder="诉讼、仲裁">
                            <el-option v-for="item in punishmentTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"></el-option>
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
                            <el-option v-for="item in ponderanceOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
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
    computed: {
        ...mapState({
            justiceData: state => state.dueDiligence.justiceData
        }),
        uploadInfo () {
            return {
                action: FileUploadUrl + 'tms/files/upload',
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
            if (assetList.length == 0) {
                assetList.push(this.defaultAsset)
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
            if (debtList.length == 0) {
                debtList.push(this.defaultDebt)
            }
            return debtList.filter(item => item.type == this.type)
        },
        defaultAssureList () {
            return {
                assure: '',
                money: '',
                type: this.type,
                id: Date.now()
            }
        },
        assureList () {
            let assureList = this.justiceData.assureList
            if (assureList.length == 0) {
                assureList.push(this.defaultAssure)
            }
            return assureList.filter(item => item.type == this.type)
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
            if (punishmentList.length == 0) {
                punishmentList.push(this.defaultPunishment)
            }
            return punishmentList.filter(item => item.type == this.type)
        },
        debtTotal () {
            const result = this.debtList.reduce((itemA, itemB) => (itemA.debt - 0) + (itemB.debt - 0), { debt: 0 })
            return isNaN(result) ? '' : result
        },
        assureTotal () {
            const result = this.assureList.reduce((itemA, itemB) => (itemA.money - 0) + (itemB.money - 0), { money: 0 })
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
        onAddList (key, defaultKey) {
            const tempObj = JSON.parse(JSON.stringify(this[defaultKey]))
            tempObj.id = Date.now()
            this.justiceData[key].push(tempObj)
        },
        onRemoveList (key, id) {
            this.justiceData[key] = this.justiceData[key].filter(item => item.id !== id)
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>
