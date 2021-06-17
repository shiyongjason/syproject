<template>
    <el-drawer title="项目详情" :visible.sync="drawer" :before-close="handleClose" :modal-append-to-body='false' size='680px'>
        <div class="ProjectList2Detail">
            <div class="radio-group">
                <el-radio-group v-model="radio">
                    <el-radio-button label="跟进记录"></el-radio-button>
                    <el-radio-button label="项目信息"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="ProjectList2Detail-ctx" :style="radio=='跟进记录'?'bottom:0':'bottom:60px'">
                <div v-if="radio=='跟进记录'">
                    <div>
                        <b>项目类型：</b>项目植入供应链产品
                    </div>
                    <!-- 流程 -->
                    <div class="process" style="height:138px">
                        <div class="process-item isActive">首次接触</div>
                        <div class="step_arrow"></div>
                        <div class="process-item isActive">需求确认</div>
                        <div class="step_arrow"></div>
                        <div class="process-item isActive">提供方案/报价</div>
                        <div class="step_arrow"></div>
                        <div class="process-item isActive">商务洽谈，待签约</div>
                        <div class="step_arrow down"></div>
                        <div class="process-item pos5">已签约</div>
                        <div class="step_arrow left"></div>
                        <div class="process-item pos6">已回款</div>
                        <div class="step_arrow left pos7"></div>
                        <div class="process-item pos8">无需跟进</div>
                    </div>
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
                                    <div class="title-tag" >语音通话</div>
                                    <div class="audio-player-container">
                                        <div class="crm-audio-player" >
                                            <audio controls>
                                                <source src="https://chattovideofile-1256749994.cos.ap-chengdu.myqcloud.com/ctv202012002498abf1f447dd840e5dcaeb9855212.mp3" type="audio/mpeg">
                                                您的浏览器不支持 音频 插件，请使用谷歌浏览器。
                                            </audio>
                                        </div>
                                    </div>
                                    <div class="watch-audio-text" >查看语音文本</div>
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
                                    <div class="title-tag" >当面拜访</div>
                                    <div class="audio-player-container">
                                        <div class="crm-audio-player" >
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
                                    <div style="margin-top:10px">跟进节点<font style="margin-left:52px;">提供方案/报价</font></div>
                                    <div style="margin-top:10px;display: flex;"><font style="flex:0 0 58px">跟进内容</font><span style="margin-left:50px;">上门拜访，并进行产品演示，需带样品箱上门拜访，并进行产品演示，需带样品箱上门拜访，并进行产品演示，需带样品箱上门拜访，并进行产品演示，需带样品箱</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="radio=='项目信息'">
                    <el-form id='elform' :model="signForm" :rules="formRules"  label-width="140px"  label-position='right' ref="purchaseConclusionForm" class="list2">
                        <div class="project-detail-item">
                            <el-form-item  prop='fundMoneys' label="甲方名称：">
                                <el-input  placeholder="请输入甲方名称" v-model='signForm.name'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  prop='fundMoneys' label="项目名称：">
                                <el-input  placeholder="请输入项目名称" v-model='signForm.name'></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;">项目建筑类型<br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in buildingType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;"><font style="padding-right:10px">项目角色</font><br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  label="">
                                <div slot="label">项目所处的阶段：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in atthestage" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;"><font>可从总部采购产品</font><br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in purchaseproducts" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;"><font>工程项目智能化需求</font><br/>（可多选）：</div>
                                <el-select v-model="signForm.name" multiple placeholder="请选择">
                                    <el-option v-for="item in intelligentdemand" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  prop='name' label="项目预计交付时间：">
                                <el-date-picker v-model="signForm.name" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div style="color:#606266;line-height:23px">创建时间：2020年02月03日 00:00:00</div>
                    <div style="color:#606266;line-height:23px">创建人：赵娟（15134214045</div>
                    <div style="color:#606266;line-height:23px">最近维护时间：2021-06-03 09:22:23</div>
                    <div style="color:#606266;line-height:23px">最近维护人：李磊 (15950469951)</div>
                </div>

            </div>
            <div class="bottom-line" v-if="radio=='项目信息'"></div>
            <div class="fixed-btn" v-if="radio=='项目信息'"><h-button type="primary" >保存</h-button></div>
            <!--  -->
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
                                <el-form-item  prop='name' label="上传现场图片："></el-form-item>
                                <div style="margin-top:-20px">
                                    <OssFileHosjoyUpload :showPreView=true  v-model="signForm.upload" :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" accept=".jpg,.jpeg,.png">
                                    <div class="a-line">
                                        <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                                    </div>
                                    </OssFileHosjoyUpload>
                                </div>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item  prop='name' label="客户联系人：" class="textarea">
                                    <el-input  placeholder="请选择客户联系人" suffix-icon="el-icon-arrow-right" @focus="onOpenContactVisible"></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item  prop='name' label="跟进节点 ：  "  class="textarea">
                                    <el-select v-model="signForm.name" multiple placeholder="请选择">
                                        <el-option v-for="item in intelligentdemand" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                    <el-input v-model="signForm.name" placeholder="请输入无需更进原因" style="width:380px;margin-left:17px" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item  prop='name' label="跟进内容："  class="textarea">
                                    <el-input v-model="signForm.name" placeholder="请输入此次跟进结果/下次跟进事项" style="width:380px;" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item  label="下次跟进时间："  class="textarea">
                                    <el-date-picker v-model="signForm.name" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss'  placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item  label="邀请同事协助：" class="textarea">
                                    <el-input  placeholder="请选择同事协助" suffix-icon="el-icon-arrow-right" @focus="onOpenHelp"></el-input>
                                </el-form-item>
                                <p class="tips" style="margin-top:-10px;margin-left:120px">同事将协助你解决客户的问题，更快促成交。</p>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item  label="需协助内容：" class="textarea">
                                    <el-input  placeholder="请输入需协助内容" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item" v-if="radioRecord!=='当面拜访'">
                                <el-form-item  prop='name' label="附件（不超过8个）："></el-form-item>
                                <div style="margin-top:-20px">
                                    <OssFileHosjoyUpload :showPreView=true  v-model="signForm.upload" :fileNum=8 :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" accept=".jpg,.jpeg,.png">
                                    <div class="a-line">
                                        <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                                    </div>
                                    </OssFileHosjoyUpload>
                                </div>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item  label="其他备注：" class="textarea">
                                    <el-input  placeholder="其他需特殊说明事项可添加" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <!-- 内嵌弹窗-选择联系人 -->
                <el-dialog width="700px" title="选择联系人" :visible.sync="innerContactVisible" append-to-body>
                    <div class="contact">
                        <div class="contact-item">
                            <el-checkbox v-model="radioContact"></el-checkbox>
                            <div class="checkbox-right">未直接联系客户，已与客户经理沟通</div>
                        </div>
                        <div style="margin:-10px 0 8px"><b>员工列表</b></div>
                        <div class="contact-item">
                            <el-checkbox v-model="radioContact"></el-checkbox>
                            <div class="checkbox-right iborder"><i class="el-icon-user-solid"></i>张三（18994003028）<span>老板，操盘手</span></div>
                        </div>
                        <div class="contact-item">
                            <el-checkbox v-model="radioContact"></el-checkbox>
                            <div class="checkbox-right iborder"><i class="el-icon-user-solid"></i>张三（18994003028）<span>老板，操盘手</span></div>
                        </div>
                        <!--  -->
                        <div style="margin-bottom:15px">
                            <b>客户经理添加的联系人</b>  <el-button type="primary" size="mini" style="margin-left:10px"> + 添加企业新的联系人</el-button>
                        </div>
                        <!-- user -->
                        <div class="contact-item" style="margin-bottom:0px">
                            <el-checkbox v-model="radioContact" style="margin-top:3px"></el-checkbox>
                            <div class="checkbox-right">
                                <div class="contact-table">
                                    <div class="contact-table-item">
                                        <font style="color:#ff0000;">*</font>客户姓名<el-input placeholder="请输入" v-model='signForm.name' size="mini" class="contact-table-item-input"></el-input>
                                    </div>
                                    <div class="contact-table-item">
                                        <font style="color:#ff0000;">*</font>手机号<el-input placeholder="请输入" v-model='signForm.name' size="mini" class="contact-table-item-input" style="width:110px"></el-input>
                                    </div>
                                    <div class="contact-table-item">
                                        <font style="color:#ff0000;">*</font>角色
                                        <el-select v-model="signForm.name" multiple placeholder="请选择" class="contact-table-item-input" size="mini">
                                            <el-option v-for="item in buildingType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </div>
                                    <div class="contact-table-item">
                                        <el-button type="primary" size="mini">删除</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end -->
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="innerContactVisible = false">取 消</el-button>
                        <el-button type="primary" @click="innerContactVisible = false">确定</el-button>
                    </div>
                </el-dialog>
                <!-- 内嵌弹窗-邀请同事协助 -->
                <el-dialog width="450px" title="邀请同事协助" :visible.sync="innerHelpVisible" append-to-body>
                    <div class="innerHelp-layout">
                        <div class="search-input">
                            <el-autocomplete v-model="stateN" :fetch-suggestions="querySearchAsync" placeholder="请输入同事姓名查询" :trigger-on-focus="false" @select="handleSelect"  @keyup.enter.native="findOrganizationEmployee">
                                <template slot-scope="{ item }">
                                    <div class="autoflex">
                                        <div class="name">{{ item.psnname }}</div>
                                        <span class="addr">{{ item.deptName }}</span>
                                    </div>
                                </template>
                            </el-autocomplete>
                            <el-button type="primary" @click="findOrganizationEmployee" style="margin-left:20px">查询</el-button>
                        </div>
                        <div class="innerHelp-ctx">
                            <div class="helper-list">
                                已选择：
                                <div class="helper-list-box">
                                    <div class="user"><span><font class="el-icon-remove removeicon"></font>孙军</span><span>UED部门</span></div>
                                    <div class="user"><span><font class="el-icon-remove removeicon"></font>杨大大</span><span>UED部门</span></div>
                                    <div class="user"><span><font class="el-icon-remove removeicon"></font>张三三</span><span>UED部门D部门</span></div>
                                    <div class="user"><span><font class="el-icon-remove removeicon"></font>孙军</span><span>UED部门</span></div>
                                    <div class="user"><span><font class="el-icon-remove removeicon"></font>孙军</span><span>UED部门</span></div>
                                    <div class="user"><span><font class="el-icon-remove removeicon"></font>孙军</span><span>UED部门</span></div>
                                    <div class="user"><span><font class="el-icon-remove removeicon"></font>孙军</span><span>UED部门</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="innerContactVisible = false">取 消</el-button>
                        <el-button type="primary" @click="innerContactVisible = false">确定</el-button>
                    </div>
                </el-dialog>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="outerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="innerContactVisible = true">确定</el-button>
                </div>
            </el-dialog>
        </div>

    </el-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import { ccpBaseUrl, ossAliyun, ossOldBucket } from '@/api/config'
import OssFileUtils from '@/utils/OssFileUtils'
import { Action, Getter } from 'vuex-class'

@Component({
    name: 'ProjectList2Detail',
    components: { OssFileHosjoyUpload }
})
export default class ProjectList2Detail extends Vue {
    @Prop({ type: Boolean, required: true, default: false }) drawer: any;
    @Action('vipApply/findContract') findContract: Function
    @Getter('vipApply/contracts') contracts: any

    action = ccpBaseUrl + 'common/files/upload-old'
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }

    radio: string = '跟进记录';
    radioRecord: string = '当面拜访';
    // 添加跟进记录 弹窗
    addRecord:boolean = false
    // 选择联系人 弹窗
    innerContactVisible:boolean = false
    // 邀请同事协助 弹窗
    innerHelpVisible:boolean = false
    radioContact:string = ''
    stateN = ''
    url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    srcList = [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
    ]
    signForm = {
        name: '',
        upload: [

        ]
    }
    queryParams = {
        keyWord: ''
    }
    timeout = null
    get formRules () {
        let rules = {
            name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
        }
        return rules
    }
    change (val) {
        console.log('🚀 --- change --- val', val)
    }

    handleClose () {
        this.$emit('backEvent')
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

    async querySearchAsync (queryString, cb) {
        if (queryString) {
            await this.findContract(queryString)
            var restaurants = this.contracts
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                cb(results)
            }, 3000 * Math.random())
        }
    }
    createStateFilter (queryString) {
        return (state) => {
            return (state.psnname.indexOf(queryString) === 0)
        }
    }
    handleSelect (item) {
        console.log('🚀 --- handleSelect --- item', item)
        this.stateN = item.psnname
        console.log('🚀 --- handleSelect --- this.stateN ', this.stateN)
        // if (this.dialogVisible) {
        //     this.stateN = item.psnname
        //     this.stateItem = item
        //     this.ruleForm.assignedUserId = item.psncode
        // } else {
        //     this.stateUser = item.psnname
        //     this.stateItem = item
        //     this.queryParams.assignedUserId = item.psncode
        // }
    }

    findOrganizationEmployee () {
        console.log(' 🚗 🚕 🚙 🚌 🚎 findOrganizationEmployee')
    }
}
</script>
<style lang='scss' scoped>
@import "./css/detail.scss";
</style>