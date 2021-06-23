<template>
    <el-drawer title="线索详情" :visible.sync="drawer" :before-close="handleClose" :modal-append-to-body='false' size='680px'>
        <div class="ThreadDetail">
            <div class="radio-group">
                <el-radio-group v-model="radio">
                    <el-radio-button label="跟进记录"></el-radio-button>
                    <el-radio-button label="客户信息"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="ThreadDetail-ctx" :style="radio=='跟进记录'?'bottom:0':'bottom:60px'">
                <div v-if="radio=='跟进记录'">
                    <h-button type='assist' @click='add'> + 新增跟进记录</h-button>
                    <div style="margin-top:20px">
                        <b>跟进动态</b>
                    </div>
                    <div class="follow-records">
                        <div class="follow-cell">
                            <div class="info"><img src="" class="avatar">
                                <div class="name-container">
                                    <div class="follow-tag">跟进人</div>
                                    <div class="name">王小二xxxxxxxx</div>
                                </div>
                                <div class="time">2021/06/10 11:20</div>
                            </div>
                            <div class="content-container">
                                <div class="line"></div>
                                <div class="content">
                                    <div class="title-tag">语音通话</div>
                                    <div class="audio-player-container">
                                        <div class="crm-audio-player">
                                            <audio controls>
                                                <source src="https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/files/temp/2021-06-17/14288512729326857274_1623833656365_external5072153392980475027.amr" type="audio/mpeg">
                                                您的浏览器不支持 音频 插件，请使用谷歌浏览器。
                                            </audio>
                                        </div>
                                    </div>
                                    <div class="watch-audio-text">查看语音文本</div>
                                    <div class="desc">xxxxxxxx您收到我们的样品箱了，使用中有什么问题呢？您收到我们的样品箱了，使用中有什么问题呢？</div>
                                </div>
                            </div>
                        </div>
                        <div class="follow-cell">
                            <div class="info"><img src="" class="avatar">
                                <div class="name-container">
                                    <div class="follow-tag">跟进人2</div>
                                    <div class="name">王小二xxxxxxxx</div>
                                </div>
                                <div class="time">2021/06/10 11:20</div>
                            </div>
                            <div class="content-container">
                                <div class="line"></div>
                                <div class="content">
                                    <div class="title-tag">当面拜访</div>
                                    <div class="audio-player-container">
                                        <div class="crm-audio-player">
                                            <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                            <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                            <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                            <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                            <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                            <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                            <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                            <el-image style="width: 100px; height: 100px;margin-right:5px" :src="url" :preview-src-list="srcList"></el-image>
                                        </div>
                                    </div>
                                    <div style="margin-top:10px">跟进节点<font style="margin-left:52px;">提供方案/报价</font>
                                    </div>
                                    <div style="margin-top:10px;display: flex;">
                                        <font style="flex:0 0 58px">跟进内容</font><span style="margin-left:50px;">上门拜访，并进行产品演示，需带样品箱上门拜访，并进行产品演示，需带样品箱上门拜访，并进行产品演示，需带样品箱上门拜访，并进行产品演示，需带样品箱</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="radio=='客户信息'" class="project-information">
                    <el-form id='elform' :model="threadDetail" :rules="formRules" label-width="140px" label-position='right' ref="threadDetailForm" class="list2">
                        <div style="color:#606266;line-height:40px">
                            <font class="project-detail-others">线索来源：</font>{{origin}}
                        </div>
                        <div class="project-detail-item">
                            <el-form-item prop='userMobile' label="客户手机号：">
                                <el-input placeholder="请输入客户手机号" v-model='threadDetail.userMobile'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item prop='userName' label="客户姓名：">
                                <el-input placeholder="请输入客户姓名" v-model='threadDetail.userName'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="企业名称：">
                                <el-input placeholder="请输入企业名称" v-model='threadDetail.companyName'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item area-select">
                            <el-form-item label="">
                                <div slot="label" style="line-height: 20px;"> 客户地址：</div>
                                <el-select v-model="threadDetail.provinceId" @change="onProvince" placeholder="省" clearable>
                                    <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                                    </el-option>
                                </el-select>
                                <span class="ml10 mr10">-</span>
                                <el-select v-model="threadDetail.cityId" @change="onCity" placeholder="市" clearable>
                                    <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                                    </el-option>
                                </el-select>
                                <span class="ml10 mr10">-</span>
                                <el-select v-model="threadDetail.countryId" @change="onArea" placeholder="区" clearable>
                                    <el-option v-for="item in getCountry" :key="item.id" :label="item.name" :value="item.countryId">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="">
                                <el-input v-model="threadDetail.address" placeholder="请输入详细地址"></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="">
                                <div slot="label">主营品类：</div>
                                <el-select v-model="threadDetail.deviceCategory" placeholder="请选择">
                                    <el-option v-for="item in categorys" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="主营品牌：">
                                <el-input placeholder="请输入企业名称" v-model='threadDetail.deviceBrand'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="">
                                <div slot="label">所属分部：</div>
                                <el-select v-model="threadDetail.customerDeptName" placeholder="请选择">
                                    <el-option v-for="item in branchArr" :key="item.crmDeptCode" :label="item.deptName" :value="item.crmDeptCode"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="客户经理：">
                                <el-input placeholder="请输入企业名称" v-model='threadDetail.customerName'></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div style="color:#606266;line-height:40px">
                        <font class="project-detail-others">创建时间：</font>{{threadDetail.createTime | formatDate('YYYY年MM月DD日 HH:mm:ss')}}
                    </div>
                    <div style="color:#606266;line-height:40px">
                        <font class="project-detail-others">创建人：</font>{{threadDetail.createBy}}
                    </div>
                    <div style="color:#606266;line-height:40px">
                        <font class="project-detail-others">最近维护时间：</font>{{threadDetail.updateTime | formatDate('YYYY年MM月DD日 HH:mm:ss')}}
                    </div>
                    <div style="color:#606266;line-height:40px;margin-bottom:20px">
                        <font class="project-detail-others">最近维护人：</font>{{threadDetail.updateBy || '-'}}
                    </div>
                </div>

            </div>
            <div class="bottom-line" v-if="radio=='客户信息'"></div>
            <div class="fixed-btn" v-if="radio=='客户信息'">
                <h-button type="primary" @click="onUpDateThreadDetail">保存</h-button>
            </div>
            <!-- 添加跟进记录 -->
            <el-dialog title="添加跟进记录" class="record-dialog" :visible.sync="addRecord" :modal='false' width="800px">
                <div class="record-layout">
                    <div class="header-title">
                        <el-radio-group v-model="radioRecord">
                            <el-radio label="当面拜访">当面拜访</el-radio>
                            <el-radio label="电话/微信沟通/邮件等">电话/微信沟通/邮件等</el-radio>
                        </el-radio-group>
                        <p class="tips">温馨提示：推荐使用企业微信与客户聊天，自动更新记录，更方便。</p>
                    </div>
                    <div style="margin-top:-10px">
                        <el-form :rules="formRules">
                            <div class="record-dialog-item" v-if="radioRecord==='当面拜访'">
                                <el-form-item prop='name' label="上传现场图片："></el-form-item>
                                <div style="margin-top:-20px">
                                    <OssFileHosjoyUpload :showPreView=true v-model="threadDetail.upload" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" accept=".jpg,.jpeg,.png">
                                        <div class="a-line">
                                            <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                                        </div>
                                    </OssFileHosjoyUpload>
                                </div>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item prop='name' label="客户联系人：" class="textarea">
                                    <el-input placeholder="请选择客户联系人" suffix-icon="el-icon-arrow-right" @focus="onOpenContactVisible"></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item prop='name' label="跟进内容：" class="textarea">
                                    <el-input v-model="threadDetail.name" placeholder="请输入此次跟进结果/下次跟进事项" style="width:380px;" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item label="下次跟进时间：" class="textarea">
                                    <el-date-picker v-model="threadDetail.name" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item label="邀请同事协助：" class="textarea">
                                    <el-input placeholder="请选择同事协助" suffix-icon="el-icon-arrow-right" @focus="onOpenHelp"></el-input>
                                </el-form-item>
                                <p class="tips" style="margin-top:-10px;margin-left:120px">同事将协助你解决客户的问题，更快促成交。</p>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item label="需协助内容：" class="textarea">
                                    <el-input placeholder="请输入需协助内容" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item" v-if="radioRecord!=='当面拜访'">
                                <el-form-item prop='name' label="附件（不超过8个）："></el-form-item>
                                <div style="margin-top:-20px">
                                    <OssFileHosjoyUpload :showPreView=true v-model="projectDetail.upload" :fileNum=8 :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" accept=".jpg,.jpeg,.png">
                                        <div class="a-line">
                                            <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                                        </div>
                                    </OssFileHosjoyUpload>
                                </div>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item label="其他备注：" class="textarea">
                                    <el-input placeholder="其他需特殊说明事项可添加" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
            </el-dialog>
        </div>

    </el-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import { ccpBaseUrl, ossAliyun, ossOldBucket } from '@/api/config'
import { getChiness } from './api/index'
import OssFileUtils from '@/utils/OssFileUtils'
import { State, namespace, Action, Getter } from 'vuex-class'
import { Clue } from '@/interface/hbp-member'
import { validateForm } from '@/decorator'
import { THREAD_ORIGIN, DEVICE_CATEGORY } from './const/index'

@Component({
    name: 'ThreadDetail',
    components: { OssFileHosjoyUpload }
})
export default class ThreadDetail extends Vue {
    @State('userInfo') userInfo: any
    @Prop({ type: Boolean, required: true, default: false }) drawer: boolean;
    @Prop({ type: Object, required: true }) threadDetail: Clue;
    @Action('crmmanage/findCrmdeplist') findCrmdeplist: Function
    @Action('vipApply/findContract') findContract: Function
    @Getter('vipApply/contracts') contracts: any
    @Getter('crmmanage/crmdepList') branchArr: any
    @Watch('getCity')
    onCityChange (newVal) {
        this.cityList = newVal
    }
    action = ccpBaseUrl + 'common/files/upload-old'
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }

    formRules = {
        userMobile: [
            { required: true, message: '请输入客户手机', trigger: 'blur' }
        ],
        userName: [
            { required: true, message: '请输入客户姓名', trigger: 'blur' }
        ]
    }

    radio: string = '跟进记录';
    radioRecord: string = '当面拜访';
    // 添加跟进记录 弹窗
    addRecord: boolean = false
    // 选择联系人 弹窗
    innerContactVisible: boolean = false
    // 邀请同事协助 弹窗
    innerHelpVisible: boolean = false
    radioContact: string = ''
    provinceList: any[] = []
    cityList: any[] = []
    countryList: any[] = []
    categorys = DEVICE_CATEGORY
    stateN = ''
    url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    srcList = [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
    ]

    queryParams = {
        keyWord: ''
    }
    timeout = null

    get origin () {
        switch (this.threadDetail.origin) {
            case 1:
                return '好橙工'
            case 2:
                return '享钱'
            case 3:
                return '单分享'
            case 4:
                return 'CRM'
            case 5:
                return '第三方渠道'
            default:
                return ''
        }
    }
    get getCity () {
        const province = this.provinceList.filter(item => item.provinceId === this.threadDetail.provinceId)
        if (province.length > 0) {
            return province[0].cities
        }
        return []
    }

    get getCountry () {
        const city = this.cityList.filter(item => item.cityId == this.threadDetail.cityId)
        if (city.length > 0) {
            return city[0].countries
        }
        return []
    }

    change (val) {
        console.log('🚀 --- change --- val', val)
    }

    handleClose () {
        let threadDetailForm: any = this.$refs['threadDetailForm']
        if (threadDetailForm) {
            threadDetailForm.resetFields()
        }
        this.$emit('handleClose')
    }
    add () {
        this.addRecord = true
    }
    onOpenContactVisible () {
        this.innerContactVisible = true
    }
    onOpenHelp () {
        this.innerHelpVisible = true
    }

    // 预览文件
    async handleLink (fileUrl) {
        let tokenUrl = await OssFileUtils.getUrl(fileUrl)
        if (tokenUrl.indexOf(ossOldBucket + '.') === -1) {
            tokenUrl = ossAliyun + tokenUrl.replace(OssFileUtils.hostReg, '')
        }
        window.open(tokenUrl)
    }

    handleDelFile (index, fileList) {
        fileList.splice(index, 1)
    }

    @validateForm('threadDetailForm')
    async onUpDateThreadDetail () {
        console.log(this.threadDetail)
        // await upDateProjectDetail(this.threadDetail)
        // this.$message.success('保存成功')
        // this.$emit('getDetail', this.threadDetail.id)
    }

    onProvince (key) {
        this.threadDetail.provinceId = key || ''
        this.threadDetail.cityId = ''
        this.threadDetail.countryId = ''
        if (key.length > 0) {
            const province = this.provinceList.filter(item => {
                return item.provinceId === this.threadDetail.provinceId
            })
            this.threadDetail.provinceName = province.length > 0 ? province[0].name : ''
        }
        if (!key) {
            return
        }
        const res = this.provinceList.filter(item => {
            return item.provinceId === key
        })
    }

    onArea (key) {
        this.threadDetail.countryId = key
        if (key.length > 0) {
            const country = this.getCountry.filter(item => {
                return item.countryId === this.threadDetail.countryId
            })
            this.threadDetail.countryName = country.length > 0 ? country[0].name : ''
        }
    }

    onCity (key) {
        this.threadDetail.cityId = key || ''
        this.threadDetail.countryId = ''
        if (key.length > 0) {
            const city = this.getCity.filter(item => {
                return item.cityId === this.threadDetail.cityId
            })
            this.threadDetail.cityName = city.length > 0 ? city[0].name : ''
        }
        if (!key) {
            return
        }
        const res = this.getCity.filter(item => {
            return item.cityId === key
        })
    }

    async getAreacode () {
        const { data } = await getChiness()
        this.provinceList = data || []
    }

    async onGetbranch () {
        await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : '' })
        console.log(this.branchArr)
    }

    mounted () {
        this.getAreacode()
        this.onGetbranch()
        console.log(' 🚗 🚕 🚙 🚌 🚎 xiaoqiche ', this.threadDetail)
    }
}
</script>
<style lang='scss' scoped>
@import "./css/detail.scss";
</style>
