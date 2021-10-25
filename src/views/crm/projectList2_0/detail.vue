<template>
    <el-drawer title="项目详情" :visible.sync="drawer" :before-close="handleClose" :wrapperClosable='false' :modal-append-to-body='false' :close-on-click-modal='false' size='680px' v-if="projectDetail.companyId" >
        <div class="ProjectList2Detail">
            <div class="radio-group">
                <el-radio-group v-model="radio" @change="()=>onTabRadio()">
                    <el-radio-button label="跟进记录"></el-radio-button>
                    <el-radio-button label="项目信息"></el-radio-button>
                </el-radio-group>
            </div>
            <!--  -->
            <div class="ProjectList2Detail-ctx" :style="radio=='跟进记录'?'bottom:0':'bottom:60px'"  @scroll="recordsScroll">
                <div v-if="radio=='跟进记录'">
                    <div>
                        <b>项目类型：</b>2.0项目植入供应链产品
                    </div>
                    <!-- 流程 {nodeKey: 1, nodeName: "首次沟通", nodeStatus: 0}-->
                    <div class="process" :style="process.length && process.length > 4 ?'height:138px':'height:68px'">
                        <div class="process-item" v-if="process[0]" :class="process[0].nodeStatus==1?'isActive':''">{{process[0].nodeName}}</div>
                        <div class="step_arrow" v-if="process[1]"></div>
                        <div class="process-item" v-if="process[1]" :class="process[1].nodeStatus==1?'isActive':''">{{process[1].nodeName}}</div>
                        <div class="step_arrow" v-if="process[2]"></div>
                        <div class="process-item" v-if="process[2]" :class="process[2].nodeStatus==1?'isActive':''">{{process[2].nodeName}}</div>
                        <div class="step_arrow" v-if="process[3]"></div>
                        <div class="process-item" v-if="process[3]" :class="process[3].nodeStatus==1?'isActive':''">{{process[3].nodeName}}</div>
                        <div class="step_arrow down" v-if="process[4]"></div>
                        <div class="process-item pos5" v-if="process[4]" :class="process[4].nodeStatus==1?'isActive':''">{{process[4].nodeName}}</div>
                        <div class="step_arrow left" v-if="process[5]"></div>
                        <div class="process-item pos6" v-if="process[5]" :class="process[5].nodeStatus==1?'isActive':''">{{process[5].nodeName}}</div>
                        <div class="step_arrow left pos7" v-if="process[6]"></div>
                        <div class="process-item pos8" v-if="process[6]" :class="process[6].nodeStatus==1?'isActive':''">{{process[6].nodeName}}</div>
                    </div>
                    <div class="flowup-count">
                        <h-button type='assist' @click='add' v-if="!projectDetail.hasRefunded"> + 新增跟进记录</h-button>
                        <span>
                            累计跟进{{flowUpCount.total}}次，当面拜访{{flowUpCount.directCount}}次
                        </span>
                    </div>
                    <div style="margin-top:20px">
                        <b>跟进动态</b>
                    </div>
                    <div v-if="!recordsData.length" style="width: 80%;margin: 10px auto;"><el-divider>暂无跟进记录</el-divider></div>
                    <div v-else class="follow-records" ref='records'>
                        <div class="follow-cell" v-for="item in recordsData" :key="item.id">
                            <div class="info"><img :src="item.createAvatar||userDefault" class="avatar">
                                <div class="name-container">
                                    <div class="follow-tag">跟进人</div>
                                    <div class="name">{{item.createBy||'-'}} {{item.createPhone}}</div>
                                </div>
                                <div class="time">{{item.createTime|momentFormat('YYYY/MM/DD HH:mm:ss')}}</div>
                            </div>
                            <div class="content-container" v-if="item.flowUpDynamic&&item.flowUpDynamic.msgType === 'meeting_voice_call'">
                                <div class='line' />
                                <div class='content'>
                                    <div class='title-tag'>语音通话</div>
                                    <div class='audio-player-container' v-if="item.flowUpDynamic.msgContent&&item.flowUpDynamic.msgContent.osspath">
                                        <div class="crm-audio-player" >
                                            <audio controls>
                                                <source :src="item.flowUpDynamic.msgContent.osspath" type="audio/mpeg">
                                                您的浏览器不支持 音频 插件，请使用谷歌浏览器。
                                            </audio>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='content-container' v-if="item.flowUpDynamic&&item.flowUpDynamic.msgType === 'link'">
                                <div class='line' />
                                <div class='content'>
                                    <div class='title-tag'>发送链接</div>
                                    <div class='desc-link' >《{{item.flowUpDynamic.msgContent.title ? item.flowUpDynamic.msgContent.title : '查看链接'}}》</div>
                                </div>
                            </div>
                            <div class='content-container' v-if="item.flowUpDynamic&&item.flowUpDynamic.msgType === 'weapp'">
                                <div class='line' />
                                <div class='content'>
                                    <div class='title-tag'>发送小程序</div>
                                    <div class='desc-weapp'>《{{item.flowUpDynamic.msgContent.displayname ? item.flowUpDynamic.msgContent.displayname : ''}}》</div>
                                </div>
                            </div>
                            <!--  -->
                            <div class="content-container">
                                <div class="line"></div>
                                <div class="content">
                                    <div class="title-tag" style="margin-top:20px">{{flowUpTypes[item.type]}}</div>
                                    <div class="title-tag" v-if="flowUpTypes[item.type]==='已拒绝协助申请'">拒绝原因</div>
                                    <div class='desc' v-if="flowUpTypes[item.type]==='已拒绝协助申请'">{{item.remark}}</div>
                                    <div class="audio-player-container">
                                       <template v-if="item.picUrls&&item.picUrls.length">{{item.type ==1?'现场图片：':'附件：'}}</template>
                                        <div class="crm-audio-player" style="margin-top:-15px">
                                            <OssFileHosjoyUpload :showUpload='false' :showPreView='true'  v-model="item.picUrls" :fileNum=8 :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px"/>
                                        </div>
                                    </div>
                                    <template v-if="item.projectSupplyFlowUp">
                                        <div class='title-tag'>客户联系人</div>
                                        <div class='desc'>{{item.projectSupplyFlowUp.contactName}} {{item.projectSupplyFlowUp.contactMobile}}</div>
                                        <div class='title-tag'>跟进节点</div>
                                        <div class='desc'>{{item.projectSupplyFlowUp.flowUpProcess?getProject2FollowUpProcess(item.projectSupplyFlowUp.flowUpProcess).value:'-'}}</div>
                                        <div class="title-tag" v-if="item.content">跟进内容</div>
                                        <div class="desc" v-if="item.content">{{item.content}}</div>
                                        <div class='title-tag' v-if="item.projectSupplyFlowUp.noNeedFlowReason">无需跟进原因</div>
                                        <div class='desc'  v-if="item.projectSupplyFlowUp.noNeedFlowReason">{{item.projectSupplyFlowUp.noNeedFlowReason||'-'}}</div>
                                    </template>
                                    <div class="title-tag" v-if="item.nextFlowTime">下次跟进时间</div>
                                    <div class="desc" v-if="item.nextFlowTime">{{item.nextFlowTime | momentFormat('YYYY/MM/DD HH:mm')}}</div>
                                    <template v-if="item.customerBackLogWorks&&item.customerBackLogWorks.length">
                                        <div class="title-tag" >邀请同事协助</div>
                                        <div class="desc" v-for="w in item.customerBackLogWorks" :key="w.id">{{w.assignedUserName}} {{w.assignedUserMobile}}</div>
                                        <div class="title-tag" v-if="item.customerBackLogWorks[0].remark">需协助内容</div>
                                        <div class="desc" v-if="item.customerBackLogWorks[0].remark">{{item.customerBackLogWorks[0].remark}}</div>
                                    </template>
                                    <div class="title-tag" v-if="item.remark&&(item.type==1||item.type==2)">其他备注</div>
                                    <div class="desc" v-if="item.remark&&(item.type==1||item.type==2)">{{item.remark}}</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="isNoMore" style="width: 80%;margin: 10px auto;"><el-divider>没有更多</el-divider></div>
                    </div>
                </div>
                <div v-if="radio=='项目信息'" class="project-information">
                    <el-form id='elform' :model="projectDetail" :rules="formRules"  label-width="150px"  label-position='right' ref="projectDetailForm" class="list2">
                        <div class="project-detail-item">
                            <el-form-item  prop='firstPartName' label="甲方名称：">
                                <el-input  placeholder="请输入甲方名称" v-model='projectDetail.firstPartName' maxlength="50"></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  prop='projectName' label="项目名称：">
                                <el-input  placeholder="请输入项目名称" v-model='projectDetail.projectName' maxlength="50"></el-input>
                            </el-form-item>
                        </div>

                        <div class="flex-item area-select">
                            <el-form-item  label="项目地址：">
                                <div class="query-cont-col-area">
                                    <el-select v-model="projectDetail.provinceId" @change="onProvince" placeholder="省" clearable>
                                        <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.provinceId">
                                        </el-option>
                                    </el-select>
                                    <span class="ml10 mr10">-</span>
                                    <el-select v-model="projectDetail.cityId" @change="onCity" placeholder="市" clearable>
                                        <el-option v-for="item in getCity" :key="item.id" :label="item.name" :value="item.cityId">
                                        </el-option>
                                    </el-select>
                                    <span class="ml10 mr10">-</span>
                                    <el-select v-model="projectDetail.countryId" placeholder="区"  @change="onArea" clearable>
                                        <el-option v-for="item in getCountry" :key="item.id" :label="item.name" :value="item.countryId">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item label="">
                                <el-input v-model="projectDetail.address" maxlength="200" placeholder="请输入详细地址"></el-input>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item prop='projectBuildingTypeList' label="">
                                <div slot="label" style="line-height: 20px;">项目建筑类型<br/>（可多选）：</div>
                                <el-select v-model="projectDetail.projectBuildingTypeList" multiple placeholder="请选择">
                                    <el-option v-for="item in projectBuildingType" :key="item.value" :label="item.value" :value="Number(item.key)"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item prop='projectRoleList' label="">
                                <div slot="label" style="line-height: 20px;"><font style="padding-right:10px">客户角色</font><br/>（可多选）：</div>
                                <el-select v-model="projectDetail.projectRoleList" multiple placeholder="请选择">
                                    <el-option v-for="item in projectRole" :key="item.value" :label="item.value" :value="Number(item.key)"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item prop='projectStep' label="">
                                <div slot="label">项目所处的阶段：</div>
                                <el-select v-model="projectDetail.projectStep" placeholder="请选择">
                                    <el-option v-for="item in projectStep" :key="item.value" :label="item.value" :value="Number(item.key)"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item prop='generalGoodsList' label="">
                                <div slot="label" style="line-height: 20px;"><font>可从总部采购产品</font><br/>（可多选）：</div>
                                <el-select v-model="projectDetail.generalGoodsList" multiple placeholder="请选择">
                                    <el-option v-for="item in generalGoods" :key="item.value" :label="item.value" :value="Number(item.key)"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="project-detail-item">
                            <el-form-item  label="">
                                <div slot="label" style="line-height: 20px;"><font>工程项目智能化需求</font><br/>（可多选）：</div>
                                <el-select v-model="projectDetail.projectIntelligentNeedsList" multiple placeholder="请选择">
                                    <el-option v-for="item in projectIntelligentNeeds" :key="item.value" :label="item.value" :value="Number(item.key)"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item prop="estimatedSignAmount" label="项目预估签约额：">
                                <el-input  class="estimatedSignAmount" placeholder="请输入项目预估签约额" @input="(val)=>inputChage(val,projectDetail,'estimatedSignAmount')" :value="fundMoneys(projectDetail.estimatedSignAmount)">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item  label="项目预计交付时间：" prop="estimatedDeliverTime">
                                <el-date-picker v-model="projectDetail.estimatedDeliverTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div style="color:#606266;line-height:40px"><font class="project-detail-others">创建时间：</font>{{projectDetail.createTime | momentFormat('YYYY年MM月DD日 HH:mm:ss')}}</div>
                    <div style="color:#606266;line-height:40px"><font class="project-detail-others">创建人：</font>{{projectDetail.createBy}}（{{projectDetail.createPhone}}）</div>
                    <div style="color:#606266;line-height:40px"><font class="project-detail-others">最近维护时间：</font>{{projectDetail.updateTime | momentFormat('YYYY年MM月DD日 HH:mm:ss')}}</div>
                    <div style="color:#606266;line-height:40px;margin-bottom:20px">
                        <font class="project-detail-others">最近维护人：</font>
                        <template v-if="projectDetail.updateBy">
                            {{projectDetail.updateBy || '-'}} ({{projectDetail.updatePhone}})
                        </template>
                        <template v-else>-</template>
                    </div>
                </div>

            </div>
            <div class="bottom-line" v-if="radio=='项目信息'"></div>
            <div class="fixed-btn" v-if="radio=='项目信息'"><h-button type="primary" @click="onUpDateProjectDetail">保存</h-button></div>
            <!-- 添加跟进记录 -->
            <el-dialog title="添加跟进记录" class="record-dialog" :visible.sync="addRecord" :modal='false' width="800px" :before-close="()=>closeAddRecord()" :close-on-click-modal='false' >
                <div class="record-layout" style="height:600px;overflow-y: scroll">
                    <div class="header-title">
                        <el-radio v-model="flowUpRequest.type" :label="1">当面拜访</el-radio>
                        <el-radio v-model="flowUpRequest.type" :label="2">电话/微信沟通/邮件等</el-radio>
                        <p class="tips" v-if="flowUpRequest.type==2">温馨提示：推荐使用企业微信与客户聊天，自动更新记录，更方便。</p>
                    </div>
                    <div style="margin-top:-10px">
                        <el-form :rules="addFlowUpRules" :model="flowUpRequest" ref="addFlowUp" :validate-on-rule-change='false' v-if="reCreate">
                            <div class="record-dialog-item" v-if="flowUpRequest.type == 1">
                                <el-form-item  prop='picUrls' label="上传现场图片："></el-form-item>
                                <div>
                                    <OssFileHosjoyUpload :showPreView='true'  v-model="flowUpRequest.picUrls" :fileNum=20 :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px" accept=".jpg,.jpeg,.png" @successCb='onSuccessCb' delTips='是否确认删除现场照片，删除后无法恢复'>
                                    <div class="a-line">
                                        <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                                    </div>
                                    </OssFileHosjoyUpload>
                                </div>
                            </div>
                            <div class="record-dialog-item" style="margin-top:10px">
                                <el-form-item  prop='contactName' label="客户联系人：" class="textarea">
                                    <el-input  placeholder="请选择客户联系人" :value="flowUpRequest.contactName" suffix-icon="el-icon-arrow-right" @focus="onOpenContactVisible"></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item" style="display:flex">
                                <el-form-item  prop='flowUpProcess' label="跟进节点 ：  "  class="textarea">
                                    <el-select v-model="flowUpRequest.flowUpProcess" placeholder="请选择" @change="changeProcess">
                                        <el-option v-for="item in flowUpProcessFormat" :key="item.value" :label="item.value" :value="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item  prop='noNeedFlowReason' label=" "  class="textarea" style="margin:0 10px 0 25px">
                                    <el-input v-if="flowUpRequest.flowUpProcess==7" v-model="flowUpRequest.noNeedFlowReason" placeholder="请输入无需更进原因" style="width:380px;margin-left:17px" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item" style="margin-top:10px">
                                <el-form-item  prop='content' label="跟进内容："  class="textarea" >
                                    <el-input v-model="flowUpRequest.content" placeholder="请输入此次跟进结果/下次跟进事项" style="width:380px;" type="textarea" maxlength="500" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item prop="nextFlowTime"  label="下次跟进时间："  class="textarea">
                                    <el-date-picker v-model="flowUpRequest.nextFlowTime" type="datetime" value-format='yyyy-MM-ddTHH:mm' format='yyyy-MM-dd HH:mm'  placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item prop="assistants" label="邀请同事协助：" class="textarea">
                                    <el-input :value="assistantsNames"  placeholder="请选择同事协助" suffix-icon="el-icon-arrow-right" @focus="onOpenHelp"></el-input>
                                </el-form-item>
                                <p class="tips" style="margin-top:-10px;margin-left:120px">同事将协助你解决客户的问题，更快促成交。</p>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item prop="assistantRemark" label="需协助内容：" class="textarea">
                                    <el-input v-model="flowUpRequest.assistantRemark" placeholder="请输入需协助内容" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                            <div class="record-dialog-item" v-if="flowUpRequest.type != 1">
                                <el-form-item   label="附件（不超过9个）："></el-form-item>
                                <div>
                                    <OssFileHosjoyUpload :showPreView='true'  v-model="flowUpRequest.picUrls" :fileNum=9 :fileSize=20 :action='action' :uploadParameters='uploadParameters' style="margin:10px 0 0 5px">
                                    <div class="a-line">
                                        <el-button type="primary" size="mini"><i class="el-icon-upload file-icon"></i> 上传文件</el-button>
                                    </div>
                                    </OssFileHosjoyUpload>
                                </div>
                            </div>
                            <div class="record-dialog-item">
                                <el-form-item prop='remark' label="其他备注：" class="textarea">
                                    <el-input v-model="flowUpRequest.remark" placeholder="其他需特殊说明事项可添加" type="textarea" maxlength="200" show-word-limit rows='2'></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <!-- 内嵌弹窗-选择联系人 -->
                <el-dialog width="800px" title="选择联系人" :visible.sync="innerContactVisible" :close-on-click-modal='false' append-to-body :before-close="()=>onBeforeCloseChooseUser()">
                    <div class="contact">
                        <div class="contact-item">
                            <el-checkbox v-model="radioContact" @change="onChageRadioContact"></el-checkbox>
                            <div class="checkbox-right">未直接联系客户，已与客户经理沟通</div>
                        </div>
                        <div style="margin:10px 0 8px"><b>员工列表</b></div>
                        <template v-if="employeeList.length">
                            <div class="contact-item" v-for="(item,index) in employeeList" :key="item.id">
                                <el-checkbox v-model="item.checked" @change="()=>onChageRadioContactEmployee(item,index)"></el-checkbox>
                                <div class="checkbox-right iborder"><i class="el-icon-user-solid"></i>{{item.nickName}}（{{item.phoneNumber}}）<span>{{item.roleName}}</span></div>
                            </div>
                        </template>
                        <div v-else>
                            暂无数据
                        </div>

                        <!--  -->
                        <div style="margin-bottom:15px; marginTop:15px">
                            <b>客户经理添加的联系人</b>  <el-button type="primary" size="mini" style="margin-left:10px" @click="onAddUser"> + 添加企业新的联系人</el-button>
                        </div>
                        <!-- user -->
                        <div class="contact-item" style="margin-bottom:0px" v-for="(item,index) in companyContactList" :key="item.id">
                            <div class="checkbox-right">
                                <el-form :model="item" ref="addUserForm" :validate-on-rule-change='false'>
                                    <div class="contact-table">
                                        <el-checkbox v-model="item.checked" style="margin-right:3px" @change="()=>onChageRadioContactItem(index)"></el-checkbox>
                                        <div class="contact-table-item">
                                            <el-form-item label="客户姓名：" prop="contactName" :rules="{ required: true, validator: validatorIsChinese, message: '姓名只能为2-24个汉字！', trigger: 'blur' }">
                                                <el-input placeholder="请输入" v-model='item.contactName' maxlength="24" size="mini" class="contact-table-item-input" style="flex:0 0 80px" @blur="()=>onBlurSave(item,index,'contactName')"></el-input>
                                            </el-form-item>
                                        </div>
                                        <div class="contact-table-item" style="margin-left:-50px">
                                            <el-form-item  prop='contactMobile' label="手机号：" :rules="{required: true, validator: validatorPHONE, message: '请输入正确的手机号', trigger: 'blur'}">
                                                <el-input placeholder="请输入" maxlength="11" v-model='item.contactMobile' size="mini" class="contact-table-item-input" style="flex:0 0 110px" @blur="()=>onBlurSave(item,index,'contactMobile')"></el-input>
                                            </el-form-item>
                                        </div>
                                        <div class="contact-table-item" style="display: flex;margin-left:-20px; margin-right:0">
                                            <el-form-item  prop='roleCodes' label="角色：" :rules="{required: true, message: '必填项不能为空'}">
                                                <el-select  style="flex:0 0 160px;" v-model="item.roleCodes" multiple placeholder="请选择" class="contact-table-item-input" size="mini" @change="()=>onBlurSave(item,index,'roleCodes')">
                                                    <el-option v-for="item in role" :key="item.key" :label="item.value" :value="item.key"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                        <div class="contact-table-item" style="margin-left: 45px;">
                                            <el-button type="primary" size="mini" @click="()=>onDelCompanyContact(item,index)">删除</el-button>
                                        </div>
                                    </div>
                                </el-form>
                            </div>
                        </div>
                        <!-- end -->
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="onBeforeCloseChooseUser">取 消</el-button>
                        <el-button type="primary" @click="onChooseUser">确定</el-button>
                    </div>
                </el-dialog>
                <!-- 内嵌弹窗-邀请同事协助 -->
                <el-dialog width="450px" title="邀请同事协助" :visible.sync="innerHelpVisible" append-to-body :close-on-click-modal='false' :before-close="()=>closeInnerHelp()">
                    <div class="innerHelp-layout">
                        <div class="search-input">
                            <el-autocomplete v-model="stateN" suffix-icon='el-icon-search' :fetch-suggestions="querySearchAsync" placeholder="请输入同事姓名查询" :trigger-on-focus="false" @select="handleSelect"  @keyup.enter.native="findOrganizationEmployee" >
                                <template slot-scope="{ item }">
                                    <div class="autoflex">
                                        <div class="name">{{ item.psnname }}</div>
                                        <span class="addr">{{ item.deptName }}</span>
                                    </div>
                                </template>
                            </el-autocomplete>
                        </div>
                        <div class="innerHelp-ctx" v-if="flowUpRequest.assistants.length">
                            <div class="helper-list">
                                已选择：
                                <div class="helper-list-box">
                                    <div class="user" v-for="item in flowUpRequest.assistants" :key="item.assignedUserId"><span><font class="el-icon-remove removeicon" @click="()=>onRemoveAssistants(item)"></font>{{item.assignedUserName}}</span><span>{{item.deptName}}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="closeInnerHelp">取 消</el-button>
                        <el-button type="primary" @click="chooseInnerHelp">确定</el-button>
                    </div>
                </el-dialog>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeAddRecord">取 消</el-button>
                    <el-button type="primary" @click="onSubmitAddRecord">确定</el-button>
                </div>
            </el-dialog>
        </div>
        <el-dialog title="删除确认" :visible.sync="deleteVisible" append-to-body width="500px" class="deldialog" :close-on-click-modal='false'>
            <span>删除后该员工将无法恢复，不影响已添加过的跟进记录，是否继续删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="doRemove">确认删除</el-button>
            </span>
        </el-dialog>
    </el-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import { ccpBaseUrl, ossAliyun, ossOldBucket } from '@/api/config'
import OssFileUtils from '@/utils/OssFileUtils'
import { Action, Getter, State } from 'vuex-class'
import { CompanyContactRequest, CompanyContactResponse, FlowUpRequest, ReqProjectSupply, StaffInfoResponse } from '@/interface/hbp-member'
import { DictionaryList, getFlowUp, upDateProjectDetail, addFlowUp, getCompanyContactList, createCompanyContact, getCompanyUserList, getProcess, putCompanyContact, getChiness, getFlowUpCount, delCompanyContact } from './api'
import { handleSubmit, validateForm } from '@/decorator'
import { ROLE, SALESPHASE, USER_DEFAULT } from './const'
import filters from '@/utils/filters'
import { isNum } from '@/utils/validate/format'
import { Phone } from '@/utils/rules'

// 默认头像

const validatorIsChinese = (rule, value, callback) => {
    const Reg = /[^\u4e00-\u9fa5]/
    if (value?.length < 2 || Reg.test(value)) {
        return callback(new Error(rule.message))
    }
    return callback()
}

const _flowUpRequest = {
    assistantRemark: '', // 协助内容
    assistants: [], // (2.0项目)协助人员列表
    bizId: '',
    bizType: 4,
    contactMobile: null,
    contactName: '',
    content: '',
    createBy: '',
    createCorpUserId: '', // 创建人企业微信id
    createPhone: '',
    flowUpProcess: '',
    id: '',
    nextFlowTime: '',
    noNeedFlowReason: '',
    picUrls: [],
    remark: '',
    type: 1 // 跟进类型 1：当面拜访 2：电话/微信沟通/邮件等
}

@Component({
    name: 'ProjectList2Detail',
    components: { OssFileHosjoyUpload }
})
export default class ProjectList2Detail extends Vue {
    @Prop({ type: Boolean, required: true, default: true }) drawer: boolean;
    @Prop({ type: Object, required: true }) projectDetail: ReqProjectSupply &{companyCode?:string};
    @Prop({ type: Object, required: true }) formRules: any;
    @Prop({ type: String, required: true }) projectId: any;

    @Action('vipApply/findContract') findContract: Function
    @Getter('vipApply/contracts') contracts: any
    @Getter('projectStore/projectIntelligentNeeds') projectIntelligentNeeds: DictionaryList
    @Getter('projectStore/projectBuildingType') projectBuildingType: DictionaryList
    @Getter('projectStore/projectStep') projectStep: DictionaryList
    @Getter('projectStore/projectRole') projectRole: DictionaryList
    @Getter('projectStore/generalGoods') generalGoods: DictionaryList
    @Getter('projectStore/refundPayType') refundPayType: DictionaryList
    @Getter('projectStore/flowUpProcess') flowUpProcess: DictionaryList

    @State('userInfo') userInfo: any
    validatorPHONE = Phone
    validatorIsChinese=validatorIsChinese
    // 为了解决切换的时候校验的不正常bug
    reCreate:boolean = true
    userDefault = USER_DEFAULT
    salesphase = SALESPHASE
    role = ROLE
    employeeList:StaffInfoResponse[] = [] // 员工列表
    companyContactList:(CompanyContactResponse& {checked?:boolean})[] = []
    companyContactListBak:(CompanyContactResponse& {checked?:boolean})[] = [] // 备份用于取消后还原数据（不用接口取数据）
    action = ccpBaseUrl + 'common/files/upload-old'
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    // 没有更多
    isNoMore:boolean = false
    process = []
    radio: string = '跟进记录';
    // 添加跟进记录 弹窗
    addRecord:boolean = false
    // 选择联系人 弹窗
    innerContactVisible:boolean = false
    // 邀请同事协助 弹窗
    innerHelpVisible:boolean = false
    radioContact:boolean = false
    deleteVisible:boolean = false
    flowUpCount:any = {
        directCount: '',
        total: ''
    }
    provinceList:any[] = []
    cityList:any[] = []
    stateN = ''
    assistantsNames = ''

    queryParams = {
        keyWord: ''
    }
    timeout = null

    recordsQuery = {
        bizId: '',
        pageNumber: 1,
        pageSize: 5
    }
    recordsData:any[] = []
    recordsPagination = ''
    delContactItem:any = ''
    delContactIndex:any = ''
    flowUpRequest:FlowUpRequest & {assistantRemark: string, assistants:any[], createCorpUserId:any} = JSON.parse(JSON.stringify(_flowUpRequest))

    flowUpTypes = {
        1: '当面拜访',
        2: '电话/微信沟通/邮件等',
        5: '已接受协助申请',
        6: '已拒绝协助申请'
    }

    flowUpProcessFormat=[]

    get getCity () {
        const province = this.provinceList.filter(item => item.provinceId === this.projectDetail.provinceId)
        if (province.length > 0) {
            return province[0].cities
        }
        return []
    }
    get getCountry () {
        const city = this.cityList.filter(item => item.cityId === this.projectDetail.cityId)
        if (city.length > 0) {
            return city[0].countries
        }
        return []
    }

    @Watch('getCity', { immediate: true })
    onValueChange (newVal) {
        this.cityList = newVal
    }

    async getAreacode () {
        const { data } = await getChiness()
        this.provinceList = data
    }

    get rulesContact () {
        let rules = {
            // contactName: { required: true, validator: validatorIsChinese, message: '姓名只能为2-24个汉字！', trigger: 'blur' }
            // contactMobile: { required: true, validator: Phone, message: '请输入正确的手机号', trigger: 'blur' },
            // roles: { required: true, message: '必填项不能为空', trigger: 'change' }
        }
        return rules
    }

    get addFlowUpRules () {
        let rules = {
            picUrls: { required: true, message: '必填项不能为空' },
            contactName: { required: true, message: '必填项不能为空', trigger: 'blur' },
            content: { required: true, message: '必填项不能为空', trigger: 'blur' },
            flowUpProcess: { required: true, message: '必填项不能为空', trigger: 'blur' },
            noNeedFlowReason: { required: this.flowUpRequest.flowUpProcess == 7, message: '必填项不能为空', trigger: 'blur' }
        }
        return rules
    }

    @Watch('getCity', { immediate: true })
    onCityChange (newVal) {
        this.cityList = newVal
    }

    onProvince (key) {
        this.projectDetail.provinceId = key || ''
        this.projectDetail.cityId = ''
        this.projectDetail.countryId = ''
        if (!key) {
            this.projectDetail.provinceName = ''
            this.projectDetail.cityName = ''
            this.projectDetail.countryName = ''
            return
        }
        const res = this.provinceList.filter(item => {
            return item.provinceId === key
        })
        this.projectDetail.provinceName = res[0].name
    }

    onCity (key) {
        this.projectDetail.cityId = key || ''
        this.projectDetail.countryId = ''
        if (!key) {
            this.projectDetail.cityName = ''
            this.projectDetail.countryName = ''
            return
        }
        const res = this.getCity.filter(item => {
            return item.cityId === key
        })
        this.projectDetail.cityName = res[0].name
    }

    onArea (key) {
        this.projectDetail.countryId = key || ''
        if (!key) {
            this.projectDetail.countryName = ''
            return
        }
        const res = this.getCountry.filter(item => {
            return item.countryId === key
        })
        this.projectDetail.countryName = res[0].name
    }

    fundMoneys (val) {
        if (val === null) {
            return ''
        }
        return filters.money(val)
    }

    inputChage (val, item, key) {
        let num = isNum(val, 2)
        if (num == '.' || !num) {
            num = ''
        }

        item[key] = num
    }

    onSuccessCb () {
        // @ts-ignore
        this.$refs['addFlowUp'].fields.map(i => {
            if (i.prop === 'picUrls') {
                i.clearValidate()
            }
        })
    }

    isActive (key) {
        if (this.process.length == 0) {
            return ''
        }
        let res = this.process.find(item => item == key)
        if (res) {
            return 'isActive'
        }
        return ''
    }
    // 未直接联系客户，已与客户经理沟通
    onChageRadioContact (val) {
        console.log(' 🚗 🚕 🚙 🚌 🚎 客户经理', this.projectDetail, val)
        this.employeeList.map((item:any) => {
            item.checked = false
        })
        this.companyContactList.map(item => {
            item.checked = false
        })
        if (!val) {
            this.flowUpRequest.contactMobile = null
            this.flowUpRequest.contactName = ''
        }

        this.$forceUpdate()
    }
    // 选中员工列表
    onChageRadioContactEmployee (item, i) {
        this.radioContact = false
        this.employeeList.map((item:any, index) => {
            if (index != i) {
                item.checked = false
            }
        })
        this.companyContactList.map(item => {
            item.checked = false
        })
        this.$forceUpdate()
        console.log('🚀 --- onChageRadioContactEmployee --- this.flowUpRequest', this.flowUpRequest)
    }
    // 选中联系列表中的一项
    onChageRadioContactItem (i) {
        // 选择之前校验必填项，没填不能选择
        let addUserForm:any = this.$refs['addUserForm']
        addUserForm[i].validate((value, r) => {
            console.log('🚀 --- addUserForm[i].validate --- value', value)
            if (value) {
                this.radioContact = false
                this.employeeList.map((item:any) => {
                    item.checked = false
                })
                this.companyContactList.map((item, index) => {
                    if (index != i) {
                        item.checked = false
                    }
                })
                this.$forceUpdate()
            } else {
                this.companyContactList[i].checked = false
                this.$forceUpdate()
            }
        })
    }
    // 关闭联系人弹窗
    onBeforeCloseChooseUser () {
        console.log(' 🚗 🚕 🚙 🚌 🚎 取消', this.$refs['addUserForm'])
        let addUserForm:any = this.$refs['addUserForm']
        if (addUserForm && addUserForm.length > 0) {
            addUserForm.map(f => {
                f.clearValidate()
            })
        }
        this.innerContactVisible = false
        this.companyContactList = JSON.parse(JSON.stringify(this.companyContactListBak))
    }

    changeProcess () {
        // @ts-ignore
        this.$refs['addFlowUp'].fields.map(i => {
            if (i.prop === 'noNeedFlowReason') {
                i.clearValidate()
            }
        })
    }

    onAddUser () {
        let resValidate = []
        let addUserForm:any = this.$refs['addUserForm']
        if (addUserForm && addUserForm.length > 0) {
            for (let i = 0; i < addUserForm.length; i++) {
                addUserForm[i].validate((value, r) => {
                    if (!value) {
                        resValidate.push(value)
                    } else {
                        this.$nextTick(() => {
                            let ds = document.getElementsByClassName('contact')[0]
                            const dom = ds.querySelector('.is-error')
                            console.log('🚀 --- this.$nextTick --- dom', dom)
                            dom && dom.scrollIntoView()
                        })
                    }
                })
            }
        }
        if (resValidate.length > 0) {
            this.$message.error('请完善联系人信息')
            return
        }
        // if (addUserForm && addUserForm.length > 0) {
        //     addUserForm.map(f => {
        //         f.resetFields()
        //     })
        // }
        this.companyContactList.push({
            'companyId': this.projectDetail.companyId,
            'contactMobile': '',
            'contactName': '',
            'operator': this.userInfo.employeeName,
            'roleCodes': [],
            'checked': false
        } as CompanyContactRequest & {roleCodes:number[], checked:boolean})
    }

    // 点击确定选择客户联系人
    onChooseUser () {
        if (this.radioContact) {
            // 客户经理
            this.flowUpRequest.contactName = '客户经理'
            this.flowUpRequest.contactMobile = ''
            // this.flowUpRequest.contactName = this.projectDetail.customerName
            // this.flowUpRequest.contactMobile = this.projectDetail.customerMobile
        }
        let item = this.employeeList.find((item:any) => {
            return item.checked
        })
        if (item) {
            this.flowUpRequest.contactName = item.nickName
            this.flowUpRequest.contactMobile = item.phoneNumber
        }
        let temp = this.companyContactList.find((item:any) => {
            return item.checked
        })
        if (temp) {
            this.flowUpRequest.contactName = temp.contactName
            this.flowUpRequest.contactMobile = temp.contactMobile
        }

        if (!this.radioContact && !item && !temp) {
            this.$message.error('请选择客户联系人')
            return
        }

        this.companyContactList = JSON.parse(JSON.stringify(this.companyContactListBak))
        this.innerContactVisible = false
        if (this.flowUpRequest.contactName) {
            // @ts-ignore
            this.$refs['addFlowUp'].fields.map(i => {
                if (i.prop === 'contactName') {
                    i.clearValidate()
                }
            })
            let addUserForm:any = this.$refs['addUserForm']
            if (addUserForm && addUserForm.length > 0) {
                addUserForm.map(f => {
                    f.clearValidate()
                })
            }
        }
    }

    onTabRadio (val) {
        if (this.radio === '跟进记录') {
            this.$emit('getDetail', this.projectDetail.id)
            this.onInitGetDate()
        }
    }

    getProject2FollowUpProcess (status) {
        for (let key in this.flowUpProcess) {
            const statusInfo = this.flowUpProcess[key]
            if (statusInfo.key == status) {
                return statusInfo // {key: "7" value: "无需跟进"}
            }
        }
        return { value: '', key: '' }
    }

    async onBlurSave (item, index, prop) {
        let addUserForm:any = this.$refs['addUserForm']
        addUserForm[index].validateField(prop, async (errorMessage) => {
            if (!errorMessage) {
                console.log('🚀 --- onBlurSave --- item 校验下面3字段是否有值，有值保存', item)
                if (item.contactName && item.contactMobile && item.roleCodes.length) {
                    item.operator = this.userInfo.employeeName
                    let resValidate = []
                    if (addUserForm && addUserForm.length > 0) {
                        for (let i = 0; i < addUserForm.length; i++) {
                            addUserForm[i].validate((value, r) => {
                                if (!value) {
                                    resValidate.push(value)
                                } else {
                                    this.$nextTick(() => {
                                        let ds = document.getElementsByClassName('contact')[0]
                                        const dom = ds.querySelector('.is-error')
                                        dom && dom.scrollIntoView()
                                    })
                                }
                            })
                        }
                    }
                    if (resValidate.length > 0) {
                        console.log('请完善联系人信息')
                        return
                    }

                    // 修改
                    if (item.id) {
                        console.log(' 🚗 🚕 🚙 🚌 🚎 修改', item)
                        setTimeout(() => {
                            putCompanyContact(item)
                        }, 400)
                        return
                    }
                    // 新增
                    item.id = ''
                    if (item.contactName && item.contactMobile && item.roleCodes.length) {
                        setTimeout(async () => {
                            await createCompanyContact(item)
                            this.$message.success('添加成功')
                            this.onGetCompanyContactList()
                        }, 400)
                    }
                }
            } else {
                this.$nextTick(() => {
                    const dom = document.querySelector('.is-error')
                        dom!.scrollIntoView()
                })
            }
        })
    }

    async doRemove () {
        if (!this.delContactItem.contactMobile || !this.delContactItem.contactName || !this.delContactItem.roleCodes.length) {
            this.companyContactList.splice(this.delContactIndex, 1)
            console.log('🚀 --- onDelCompanyContact --- this.companyContactList', this.companyContactList)

            return
        }
        await delCompanyContact(this.delContactItem.id)
        this.$message.success('删除成功')
        this.onGetCompanyContactList()
        this.deleteVisible = false
    }
    // 删除联系人
    onDelCompanyContact (item, index) {
        if (!item.contactMobile || !item.contactName || !item.roleCodes.length) {
            this.companyContactList.splice(index, 1)
            return
        }
        this.deleteVisible = true
        this.delContactItem = item
        this.delContactIndex = index
    }

    @Watch('flowUpRequest.type')
    resetFields (val) {
        let temp = this.flowUpRequest.flowUpProcess
        this.$nextTick(() => {
            this.flowUpRequest = JSON.parse(JSON.stringify(_flowUpRequest))
            this.flowUpRequest.type = val
            this.flowUpRequest.flowUpProcess = temp
            // @ts-ignore
            this.$refs['addFlowUp'].clearValidate()
            this.reCreate = false
            setTimeout(() => {
                this.reCreate = true
            }, 0)
        })
    }

    // 提交新增跟进记录
    @validateForm('addFlowUp')
    @handleSubmit()
    async onSubmitAddRecord () {
        this.flowUpRequest.createBy = this.userInfo.employeeName
        this.flowUpRequest.createPhone = this.userInfo.phoneNumber
        let query = JSON.parse(JSON.stringify(this.flowUpRequest))
        if (this.flowUpRequest.picUrls) {
            let picUrls = []
            this.flowUpRequest.picUrls.map((item:any) => {
                picUrls.push(item.fileUrl)
            })
            query.picUrls = picUrls
        }
        query.bizId = this.projectId
        await addFlowUp(query)
        this.$message.success('新增成功')
        this.recordsQuery = {
            bizId: this.projectId,
            pageNumber: 1,
            pageSize: 5
        }
        this.recordsData = []
        // this.$emit('getDetail', this.projectDetail.id)
        await this.onInitGetDate()
        this.closeAddRecord()
    }
    // 关闭新增跟进记录
    closeAddRecord () {
        // @ts-ignore
        this.$refs['addFlowUp'].resetFields()
        this.addRecord = false
        this.flowUpRequest = JSON.parse(JSON.stringify(_flowUpRequest))
    }

    change (val) {
        console.log('🚀 --- change --- val', val)
    }

    handleClose () {
        let projectDetailForm:any = this.$refs['projectDetailForm']
        if (projectDetailForm) {
            projectDetailForm.resetFields()
        }
        this.recordsQuery = {
            bizId: this.projectId,
            pageNumber: 1,
            pageSize: 5
        }
        this.recordsData = []
        this.flowUpCount = {
            directCount: '',
            total: ''
        }
        this.$emit('handleClose')
    }

    async add () {
        await this.onGetCompanyUserList()
        this.addRecord = true
        let res = this.process.filter(item => {
            return item.nodeStatus
        })
        console.log('🚀 --- add --- res', res)
        if (res.length) {
            if (res[res.length - 1].nodeKey == 5) {
                // 5为已签约，不能展示
                this.flowUpRequest.flowUpProcess = ''
            } else {
                this.flowUpRequest.flowUpProcess = res[res.length - 1].nodeKey + ''
            }
        } else {
            this.flowUpRequest.flowUpProcess = '1'
        }
    }

    // 打开选择联系人弹窗
    async onOpenContactVisible () {
        this.radioContact = false
        this.employeeList.map((item:any) => {
            item.checked = false
        })
        this.companyContactList.map((item, index) => {
            item.checked = false
        })
        // 客户经理
        if (this.flowUpRequest.contactMobile === '') {
            this.radioContact = true
        }
        this.employeeList.map((item:any) => {
            if (item.phoneNumber == this.flowUpRequest.contactMobile) {
                item.checked = true
            }
        })
        this.companyContactList.map((item:any) => {
            if (item.contactMobile == this.flowUpRequest.contactMobile) {
                item.checked = true
            }
        })
        this.$forceUpdate()
        this.innerContactVisible = true
    }

    // 打开协助人
    onOpenHelp () {
        this.innerHelpVisible = true
    }

    // 获取员工列表
    async onGetCompanyUserList () {
        const { data: employeeList } = await getCompanyUserList({ companyCode: this.projectDetail.companyCode })
        this.employeeList = employeeList
        this.employeeList.map((item:any) => {
            item.checked = false
        })
        this.onGetCompanyContactList()
    }

    // 获取客户经理添加的人
    async onGetCompanyContactList () {
        const { data: companyContactList } = await getCompanyContactList(this.projectDetail.companyId)
        this.companyContactList = companyContactList
        this.companyContactList.map(item => {
            item.checked = false
        })
        this.companyContactListBak = JSON.parse(JSON.stringify(this.companyContactList))
    }

    // 跟进记录
    async getRecords () {
        if (this.recordsPagination && Number(this.recordsQuery.pageNumber) > Number(this.recordsPagination)) {
            this.isNoMore = true
            return
        }
        const { data: flowUp } = await getFlowUp(this.recordsQuery)
        this.recordsPagination = flowUp.pages
        this.recordsData = [...this.recordsData, ...flowUp.records]
        if (flowUp.total < this.recordsQuery.pageSize) {
            this.isNoMore = true
        }
        this.recordsData.map(async (item, index) => {
            if (item.picUrls) {
                let api:any = []
                let url = []
                item.picUrls.map(jtem => {
                    url.push(jtem)
                    api.push(OssFileUtils.getUrl(jtem))
                })
                const res = await Promise.all(api)
                let obj = []
                res.map((o, i) => {
                    obj.push({
                        fileUrl: url[i],
                        fileName: o,
                        tokenUrl: o
                    })
                })
                console.log('🚀 --- this.recordsData.map --- obj', obj)

                item.picUrls = obj
            }
        })
        console.log(' 🚗 🚕 🚙 🚌 🚎 recordsData', this.recordsData)
    }

    recordsScroll (event) {
        if (this.radio === '项目信息') {
            return
        }
        // 滚动距离scrollTop+元素的高clientHeight=文档的高scrollHeight
        const { scrollTop, clientHeight, scrollHeight } = event.target
        // console.log('%O', event.target)
        console.log(event.target.scrollTop)
        if (scrollHeight - scrollTop - clientHeight <= 80) {
            console.log(' 🚗 🚕 🚙 🚌 🚎 加载')
            this.recordsQuery.pageNumber += 1
            this.getRecords()
        }
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
    // 选中协助人
    handleSelect (item) {
        console.log('🚀 --- handleSelect --- item', item)
        this.stateN = ''
        console.log('🚀 --- handleSelect --- this.stateN ', this.stateN)
        this.flowUpRequest.assistants.push({
            assignedUserId: item.psncode,
            assignedUserMobile: item.mobile,
            assignedUserName: item.psnname,
            deptName: item.deptName
        })
    }

    // 删除协助人
    onRemoveAssistants (item) {
        let index = this.flowUpRequest.assistants.indexOf(item)
        if (index !== -1) {
            this.flowUpRequest.assistants.splice(index, 1)
        }
    }

    // 关闭协助人选则
    closeInnerHelp () {
        this.stateN = ''
        this.innerHelpVisible = false
        if (this.flowUpRequest.assistants.length) {
            return
        }
        this.flowUpRequest.assistants = []
    }

    // 点击协助人确定
    chooseInnerHelp () {
        this.assistantsNames = ''
        this.stateN = ''
        this.innerHelpVisible = false
        this.flowUpRequest.assistants.map(item => {
            this.assistantsNames += `${item.assignedUserName},`
        })
        this.assistantsNames = this.assistantsNames.substring(0, this.assistantsNames.length - 1)
    }

    findOrganizationEmployee () {
        console.log(' 🚗 🚕 🚙 🚌 🚎 findOrganizationEmployee')
    }

    @validateForm('projectDetailForm')
    async onUpDateProjectDetail () {
        this.projectDetail.operateUserName = this.userInfo.employeeName
        this.projectDetail.operateUserPhone = this.userInfo.phoneNumber
        await upDateProjectDetail(this.projectDetail)
        await this.onInitGetDate()
        this.$emit('getDetail', this.projectDetail.id)
        this.$message.success('保存成功')
        this.$emit('getList')
    }

    async onInitGetDate () {
        this.recordsQuery = {
            bizId: this.projectId,
            pageNumber: 1,
            pageSize: 5
        }
        this.recordsData = []
        this.getRecords()
        const { data } = await getProcess({ projectId: this.projectId })
        this.process = data.projectProcessNodes
        console.log('🚀 --- onInitGetDate --- this.process', this.process)
        const { data: flowUpCount } = await getFlowUpCount({ bizId: this.projectId })
        this.flowUpCount = flowUpCount
    }

    async mounted () {
        this.getAreacode()
        console.log(' 🚗 🚕 🚙 🚌 🚎 详情', this.projectDetail)
        this.recordsQuery.bizId = this.projectId
        this.onInitGetDate()

        this.flowUpProcessFormat = this.flowUpProcess.filter(item => {
            if (item.value != '已签约' && item.value != '已回款') {
                return item
            }
        })
        // let temp = ['1', '3', '5', '7']
        // let filter:any = ''
        // this.flowUpProcess.map((item:any) => {
        //     temp.map((jtem, jndex) => {
        //         if (item.key == jtem) {
        //             item.isActive = true
        //         }
        //         if (jtem == '7') {
        //             if (temp.length > 1) {
        //                 console.log(' 🚗 🚕 🚙 🚌 🚎 获取上一个节点', temp[jndex - 1])
        //                 filter = temp[jndex - 1]
        //             }
        //         }
        //     })
        // })
        // console.log(' 🚗 🚕 🚙 🚌 🚎 flowUpProcess', this.flowUpProcess)
        // console.log(' 🚗 🚕 🚙 🚌 🚎 filter', filter) // 5
        // let _ = this.flowUpProcess.filter(item => item.key <= filter)
        // console.log('🚀 --- mounted --- _', _)
    }
}
</script>
<style lang='scss' scoped>
@import "./css/detail.scss";
</style>