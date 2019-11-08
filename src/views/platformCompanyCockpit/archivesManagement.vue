<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont postionrelative">
                <div class="title">
                    <span class="tit-l" v-if="$route.query.archiveId">{{isEdit?'编辑档案':form.platformBasicInfoPO.companyName}}</span>
                    <span class="tit-l" v-else>新增档案</span>
                    <span class="tit-r">
                        <div v-if="!isEdit&&hosAuthCheck(COCKPIT_FILE_EDIT)" class="el-icon-edit-outline poseditor" @click="onIsEdit"></div>
                        <el-button type="primary" style="width:100px" @click="onDialogBtn">档案标注</el-button>
                    </span>
                </div>
               <div class="tabs">
                    <el-tabs v-model="activeName" type="card">
                            <el-tab-pane label="基础信息" name="base">
                                <el-form :model="form.platformBasicInfoPO" ref='formBaseInfo' :rules="rules.platformBasicInfoPO" label-width="140px" label-position='left'>
                                    <baseInfo ref="baseInfo" v-model="form.platformBasicInfoPO" :isEdit='isEdit'/>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="A档-尽调材料" name="typea">
                                <el-form :model="form.platformBasicInfoPO" ref='formTuneMaterials' label-width="140px" label-position='left'>
                                    <tuneMaterials :isEdit='isEdit' v-model="form.platformBasicInfoPO" />
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="B档-签约材料" name="typeb">
                                <el-form :model="form.archiveSignPO" :rules="rules.archiveSignPO" ref='formSign' label-width="140px" label-position='left'>
                                    <!-- v-if为了兼容上传图片误删-->
                                    <signMaterials v-model="form.archiveSignPO" :isEdit='isEdit' v-if="activeName==='typeb'" />
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="C档-工商材料" name="typec">
                                <el-form :model="form.archiveCommercialPO" ref='formSign' label-width="140px" label-position='left'>
                                    <!-- v-if为了兼容上传图片误删-->
                                    <businessMaterials v-model="form.archiveCommercialPO" :isEdit='isEdit' v-if="activeName==='typec'" />
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="其余材料" name="others">
                                <el-form :model="form.otherFiles" ref='formSign' label-width="140px" label-position='left'>
                                    <!-- v-if为了兼容上传图片误删-->
                                    <otherMaterials v-model="form.otherFiles" :isEdit='isEdit' v-if="activeName==='others'" />
                                </el-form>
                            </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="btn" v-if="isEdit">
                    <el-button style="width:130px" @click="onCancel">取 消</el-button>
                    <hosjoy-button type="primary" style="width:130px" @click="buttonClick">存 档</hosjoy-button>
                </div>
                <div class="btn" v-else>
                    <el-button @click="()=>{$router.go(-1)}">返 回</el-button>
                </div>
            </div>
        </div>
        <el-dialog center title="档案标注" :visible.sync="dialogVisible" width="600px">
            <div v-if="!dialogIsEdit&&hosAuthCheck(COCKPIT_FILE_EDIT)" class="el-icon-edit-outline dialogposeditor" @click="dialogIsEdit = true"></div>
            <el-form ref='dialogForm' label-width="140px" label-position='left'>
                <el-form-item label="归档情况：" >
                    <el-radio v-if="dialogIsEdit" v-model="remarkTemp.archiveStatus" label="1">档案齐全</el-radio>
                    <el-radio v-if="dialogIsEdit" v-model="remarkTemp.archiveStatus" label="2">档案缺失</el-radio>
                    <span v-if="!dialogIsEdit">{{remarkTemp.archiveStatus==='1'?'档案齐全':remarkTemp.archiveStatus==='2'?'档案缺失':'-'}}</span>
                </el-form-item>
                <el-form-item label="档案备注：">
                    <el-input v-if="dialogIsEdit" v-model="remarkTemp.remark" placeholder="此处备注档案信息" type='textarea' :rows="6" show-word-limit  maxlength="3000"></el-input>
                    <span v-if="!dialogIsEdit">{{remarkTemp.remark}}</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onRemarkCancel">取 消</el-button>
                <el-button type="primary" @click="onRemark">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { COCKPIT_FILE_EDIT } from '@/utils/auth_const'
import baseInfo from './components/baseInfo'
import tuneMaterials from './components/tuneMaterials'
import signMaterials from './components/signMaterials'
import businessMaterials from './components/businessMaterials'
import otherMaterials from './components/otherMaterials'
import hosjoyButton from '@/components/HosJoyButton/hosJoyButton'
import { saveInfo, getDetail, provinces, upData, remark } from './api/index.js'
import { mapState, mapMutations } from 'vuex'
// import { checkIdCard } from '@/utils/rules.js'

export default {
    name: 'archivesManagement',
    components: { baseInfo, tuneMaterials, signMaterials, hosjoyButton, businessMaterials, otherMaterials },
    data () {
        return {
            remarkTemp: {
                archiveStatus: '2',
                remark: ''
            },
            COCKPIT_FILE_EDIT,
            addressPrivince: [], // 省
            addressCity: [], // 市
            addressDistrict: [], // 区
            isEdit: false,
            activeName: 'base',
            dialogVisible: false,
            dialogIsEdit: false,
            signBOsForm: {
                archiveSignInvestPO: {
                    investVersion: '', // 投资协议版本 1.0,2.0,3.0,4.0,5.0
                    signInvestId: '', // id 编辑时有用
                    signerContactNo: '', // 签约人联系方式
                    signerDocFlag: '', // 签约人档案归档：1-是；0-否
                    signerIdcard: '', // 签约人身份证号码
                    signerName: '' // 签约人姓名
                },
                idCardList: [],
                documentList: []
            },
            form: {
                // 基础信息
                platformBasicInfoPO: {
                    archiveNo: '',
                    companyName: '',
                    companyStatus: '',
                    archiveStatus: '2',
                    createUser: '',
                    ddDocFlag: '0',
                    addressOther: '',
                    oldCompanyName: '',
                    departmentId: '',

                    dd: []// A-尽调材料
                },
                commonDocPOs: [],
                // tuneMaterials: {},
                archiveSignPO: {
                    rcDocFlag: '1',
                    shareholderDocFlag: '1',
                    guanranteeDocFlag: '0',
                    realcontrollerList: [], // B-实控人身份证归档
                    assureFileList: [], // B-担保函归档
                    otherBList: [], // B-其余B档签约材料
                    signBOs: []// B-投资协议归档
                },
                // C
                archiveCommercialPO: {
                    commerialDocFlag: '0',
                    capitalDocFlag: '0',
                    stocktransferDocFlag: '0',
                    commercial: [], // C-其余工商材料归档
                    capital: [], // C-增减资协议
                    stocktransfer: []// C-股转版协议
                },
                signBOs: [],
                // 其余
                otherFiles: {
                    fileList: []
                }
            },
            rules: {
                platformBasicInfoPO: {
                    archiveNo: [
                        { required: true, message: '请输入档案编号', trigger: 'blur' }
                    ],
                    companyStatus: [
                        { required: true, message: '请选择公司状态', trigger: 'change' }
                    ],
                    companyName: [
                        { required: true, message: '请输入公司名称', trigger: 'change' }
                    ]
                },
                archiveSignPO: {},
                dialogForm: {
                    status: [
                        { required: true, message: '请输入档案编号', trigger: 'change' }
                    ]
                }
            },
            dialogForm: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapState({
            tagsList: state => state.layout.tagsList
        })
    },
    methods: {
        ...mapMutations({
            tagUpdate: 'TAG_UPDATE'
        }),
        onDialogBtn () {
            this.dialogVisible = true
            if (this.isEdit) this.dialogIsEdit = true
            this.remarkTemp.archiveStatus = this.form.platformBasicInfoPO.archiveStatus || '2'
            this.remarkTemp.remark = this.form.platformBasicInfoPO.remark
        },
        onIsEdit () {
            this.isEdit = true
            this.dialogIsEdit = true
        },
        onCancel () {
            this.$confirm('取消后该条档案将不会被保存, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isEdit = false
                this.dialogIsEdit = false
                if (!this.$route.query.archiveId) {
                    this.$router.go(-1)
                } else {
                    this.getDetailInfo(this.$route.query.archiveId)
                }
            }).catch()
        },
        getFile (type, key, ikey) {
            const arr = this.form.commonDocPOs.filter(item => {
                return item.docType == type
            })
            arr.map(item => {
                this.form[key][ikey].push(item)
            })
        },
        async getDetailInfo (archiveId) {
            const { data } = await getDetail(archiveId)
            this.form = data
            this.onInit()
            this.getFile('a-dd', 'platformBasicInfoPO', 'dd')// 设置A-尽调材料
            this.getFile('b-realcontroller', 'archiveSignPO', 'realcontrollerList')// 设置B-实控人身份证归档
            this.getFile('b-guarantee', 'archiveSignPO', 'assureFileList')// 设置B-担保函归档
            this.getFile('b-other', 'archiveSignPO', 'otherBList')// 设置B-担保函归档
            this.getFile('c-commercial', 'archiveCommercialPO', 'commercial')// 设置C-其余工商材料
            this.getFile('c-capital', 'archiveCommercialPO', 'capital')// 设置C-增减资协议
            this.getFile('c-stocktransfer', 'archiveCommercialPO', 'stocktransfer')// 设置C-股转版协议
            this.getFile('d-other', 'otherFiles', 'fileList')// 设置C-股转版协议
            let arr = []
            for (let i = 0; i < 5; i++) {
                let version = []
                arr = this.form.signBOs.filter(item => {
                    return item.archiveSignInvestPO.investVersion === `${i + 1}.0`
                })
                if (arr && arr.length > 0) {
                    let idCardList = []
                    let documentList = []
                    arr.map((item, index) => { // 某版本
                        idCardList = item.signDocPOs.filter(jtem => { // 筛选出每一版本的图片文件
                            return jtem.docType === '2'
                        })
                        documentList = item.signDocPOs.filter(jtem => { // 筛选出每一版本的文档文件
                            return jtem.docType === '1'
                        })
                        this.$set(item, 'idCardList', idCardList)
                        this.$set(item, 'documentList', documentList)
                        version.push(item)
                        let obj = {
                            radio: this.form.archiveSignPO[`v${i + 1}SignerFlag`] + '',
                            version: version // n份文件
                        }
                        arr[index] = obj
                    })
                    // console.log(`v${i + 1}.0`, arr[arr.length - 1]) 勿删
                    this.form.archiveSignPO.signBOs.splice(i, 1, arr[arr.length - 1])
                }
            }
            this.$nextTick(async () => {
                let tempPrivince = this.getNameByCode(this.form.platformBasicInfoPO.addressPrivince, this.$refs['baseInfo'].addressPrivince)
                await this.provinces({ parentId: this.form.platformBasicInfoPO.addressPrivince }, 1)
                let tempCity = this.getNameByCode(this.form.platformBasicInfoPO.addressCity, this.addressCity)
                this.$refs['baseInfo'].addressCity = this.addressCity
                await this.provinces({ parentId: this.form.platformBasicInfoPO.addressCity }, 2)
                let tempArea = this.getNameByCode(this.form.platformBasicInfoPO.addressOther, this.addressDistrict)
                this.$refs['baseInfo'].addressDistrict = this.addressDistrict
                let privince = tempPrivince.length > 0 ? tempPrivince[0].cityName : ''
                let city = (tempCity.length > 0 && tempCity[0].cityName) || ''
                let area = (tempArea.length > 0 && tempArea[0].cityName && tempArea[0].cityId) || ''
                let address = `${privince} ${city} ${area} ${this.form.platformBasicInfoPO.addressOther}`
                this.$refs['baseInfo'].datailAddress = address == '   ' ? '-' : address
            })
        },
        getNameByCode (code, list) {
            return list.filter(item => {
                return code == item.cityId
            })
        },
        async buttonClick (done) {
            if (this.$route.query.archiveId) {
                // 更新 upData
                this.form.commonDocPOs = []
                this.form.signBOs = []
            }
            this.form.platformBasicInfoPO.dd.map((item) => {
                this.form.commonDocPOs.push({ docType: 'a-dd', fileName: item.fileName, fileUrl: item.fileUrl })
            })
            this.form.archiveSignPO.realcontrollerList.map(item => {
                this.form.commonDocPOs.push(item)
            })
            this.form.archiveSignPO.signBOs.map((item, index) => {
                let key = `v${index + 1}SignerFlag`
                this.$set(this.form.archiveSignPO, key, item.radio)
                item.version.map(jtem => {
                    jtem.archiveSignInvestPO.investVersion = `${index + 1}.0`
                    let temp = [...jtem.documentList, ...jtem.idCardList]
                    this.form.signBOs.push(
                        {
                            archiveSignInvestPO: jtem.archiveSignInvestPO,
                            signDocPOs: temp
                        }
                    )
                })
            })
            this.form.archiveSignPO.assureFileList.map(item => {
                this.form.commonDocPOs.push(item)
            })
            this.form.archiveSignPO.otherBList.map(item => {
                this.form.commonDocPOs.push(item)
            })
            this.form.archiveCommercialPO.commercial.map(item => {
                this.form.commonDocPOs.push(item)
            })
            this.form.archiveCommercialPO.capital.map(item => {
                this.form.commonDocPOs.push(item)
            })
            this.form.archiveCommercialPO.stocktransfer.map(item => {
                this.form.commonDocPOs.push(item)
            })
            this.form.otherFiles.fileList.map(item => {
                this.form.commonDocPOs.push(item)
            })
            this.$refs['formBaseInfo'].validate(async (valid, errors) => {
                if (valid) {
                    let flag = ''
                    try {
                        if (this.$route.query.archiveId) {
                            // updateUser
                            this.form.platformBasicInfoPO.updateUser = this.userInfo.employeeName
                            await upData(this.form)
                        } else {
                            flag = await saveInfo(this.form)
                            done()
                            if (flag.data.archiveNOFlag) {
                                this.$message.error(`档案编号重复`)
                                return
                            }
                        }
                        done()
                        this.$message({
                            message: '提交成功！',
                            type: 'success'
                        })
                        this.isEdit = false
                        if (!this.$route.query.archiveId) {
                            setTimeout(() => {
                                this.$router.go(-1)
                            }, 300)
                        }
                    } catch (error) {
                        done()
                    }
                } else {
                    this.activeName = 'base'
                    if (this.form.platformBasicInfoPO.archiveNo == '') {
                        this.$message.error(`请输入档案编号`)
                        done()
                        return
                    }
                    if (this.form.platformBasicInfoPO.companyStatus == '') {
                        this.$message.error(`请选择公司状态`)
                        done()
                        return
                    }
                    if (this.form.platformBasicInfoPO.companyName == '') {
                        this.$message.error(`请输入平台公司名称`)
                        done()
                    }
                }
            })
        },
        async provinces (params = { parentId: 0 }, city = 0) {
            const { data } = await provinces(params)
            switch (city) {
                case 0:
                    this.addressPrivince = data.citys
                    this.addressPrivince.unshift({ cityId: '', cityName: '请选择省', id: 0 })
                    break
                case 1:
                    this.addressCity = data.citys
                    this.addressCity.unshift({ cityId: '', cityName: '请选择市', id: 0 })

                    break
                case 2:
                    this.addressDistrict = data.citys
                    this.addressDistrict.unshift({ cityId: '', cityName: '请选择区', id: 0 })
                    break
            }
        },
        onInit () {
            this.$set(this.form.platformBasicInfoPO, 'dd', [])
            this.$set(this.form.archiveSignPO, 'realcontrollerList', [])
            this.$set(this.form.archiveSignPO, 'assureFileList', [])
            this.$set(this.form.archiveSignPO, 'otherBList', [])
            // this.$set(this.form.archiveSignPO, 'signBOs', [])
            this.$set(this.form.archiveCommercialPO, 'commercial', [])
            this.$set(this.form.archiveCommercialPO, 'capital', [])
            this.$set(this.form.archiveCommercialPO, 'stocktransfer', [])
            this.$set(this.form, 'otherFiles', { fileList: [] })
            this.formatForm()
        },
        async onRemark () {
            this.form.platformBasicInfoPO.archiveStatus = this.remarkTemp.archiveStatus
            this.form.platformBasicInfoPO.remark = this.remarkTemp.remark
            if (!this.dialogIsEdit || !this.$route.query.archiveId || !this.hosAuthCheck(COCKPIT_FILE_EDIT)) {
                this.dialogVisible = false
                return
            }
            let query = {
                archiveId: this.$route.query.archiveId,
                remark: this.form.platformBasicInfoPO.remark,
                archiveStatus: this.form.platformBasicInfoPO.archiveStatus// 档案状态：1-未借出；2-已借出
            }
            await remark(query)
            this.$message({
                message: '提交成功！',
                type: 'success'
            })
            this.dialogVisible = false
            this.dialogIsEdit = false
        },
        onRemarkCancel () {
            if (this.$route.query.archiveId) {
                this.getDetailInfo(this.$route.query.archiveId)
                this.dialogIsEdit = false
                this.dialogVisible = false
                return
            }
            this.dialogVisible = false
        },
        formatForm () {
            this.$set(this.form.archiveSignPO, 'signBOs', [])
            for (let i = 0; i < 5; i++) {
                let obj = { version: [JSON.parse(JSON.stringify(this.signBOsForm))] }
                this.form.archiveSignPO.signBOs.push(obj)
                let len = this.form.archiveSignPO.signBOs.length
                this.$set(this.form.archiveSignPO.signBOs[len - 1], 'radio', this.form.archiveSignPO[`v${i + 1}SignerFlag`] + '' || '0')
                // this.$set(this.form.archiveSignPO.signBOs[0], 'radio', this.form.archiveSignPO[`v${i + 1}SignerFlag`] + '' || '1')
                this.$set(this.form.archiveSignPO.signBOs[0], 'radio', this.form.archiveSignPO[`v${i + 1}SignerFlag`] + '' || '0')
            }
        }
    },
    mounted () {
        this.$forceUpdate()
        this.form.platformBasicInfoPO.createUser = this.userInfo.employeeName
        if (this.$route.query.archiveId) {
            this.getDetailInfo(this.$route.query.archiveId)
            this.isEdit = false
        } else {
            this.isEdit = true
            this.formatForm()
        }
    }
}
</script>

<style scoped>
.tabs>>>.el-textarea .el-input__count{color:#c3c6cc}
.tabs>>>.el-tabs__header{margin:0}
.tabs>>>.el-form{padding:0}
.btn{ margin-top: 20px}
.tit-l{ font-size: 18px; padding-left: 10px}
.tit-r{ float: right;}
.title{ margin-bottom: 20px}
.postionrelative{ position: relative;}
.poseditor{position: absolute;font-size: 42px;right: 58px;top: 124px;z-index: 999;cursor: pointer;}
.dialogposeditor{position: absolute;font-size: 31px;right: 16px;top: 69px;z-index: 999;cursor: pointer;}
</style>