<template>
    <div>
        <el-drawer title="VIP详情" :visible.sync="drawer" :before-close="handleClose" size="50%">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="信用详情" name="1"></el-tab-pane>
                <el-tab-pane label="授信资料清单" name="2"></el-tab-pane>
            </el-tabs>
            <div class="drawer-wrap" v-if="activeName=='1'">
                <div class="drawer-wrap_title">江苏舒适云信息技术有限公司</div>
                <div class="drawer-wrap_btn">
                    <div class="drawer-wrap_btn-flex">信用详情</div>
                </div>
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" :isMultiple="false" :isAction="true" :actionMinWidth=100 :isShowIndex='true' :maxHeight=500>
                    <template slot="action" slot-scope="scope">
                        <el-button type="success" size="mini" plain @click="onEditVip(scope.data.row.id)">设置信用评级</el-button>
                    </template>
                </basicTable>
                <p>
                    最近维护时间：2019-12-06 13:00:06
                </p>
                <p>
                    最近维护人：赵娟（15195954045）
                </p>
            </div>
            <div class="collect-wrapbox" v-if="activeName=='2'">
                <el-form :model="approveForm" ref="approveForm" class="demo-ruleForm">
                    <div class="" v-for="item in approveForm.projectDocList" :key="item.firstCatagoryId">
                        <div class="collect-title">{{item.firstCatagoryName}} <el-button type="primary" size="mini">打回记录</el-button></div>
                        <template v-for="obj in item.respRiskCheckDocTemplateList">
                            <el-form-item label="" prop="type" :key="'item'+obj.templateId">
                                <div class="collect-box">
                                    <div class="collect-boxtxt">
                                        <h3><i v-if="obj.mondatoryFlag">*</i>{{obj.secondCatagoryName}}</h3>
                                        <p>备注：{{obj.remark?obj.remark:'-'}}</p>
                                        <p>规定格式：{{obj.formatName}}</p>
                                    </div>
                                </div>
                                <div class="upload-file_list" v-for="(jtem,index) in obj.riskCheckProjectDocPos" :key="index">
                                    <p>
                                        <span class="posrtv">
                                            <template v-if="jtem&&jtem.fileUrl">
                                                <i class="el-icon-document"></i>
                                                <a :href="jtem.fileUrl" target="_blank">
                                                    <font>{{jtem.fileName}}</font>
                                                </a>
                                            </template>
                                        </span>
                                    </p>
                                    <p style="flex:0.5">{{moment(jtem.createTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
                                    <p>
                                        <font class="fileItemDownLoad" v-if="jtem.fileName.toLowerCase().indexOf('.png') != -1||jtem.fileName.toLowerCase().indexOf('.jpg') != -1||jtem.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="handleImgDownload(jtem.fileUrl, jtem.fileName)">下载</font>
                                        <font v-else><a class='fileItemDownLoad' :href="jtem.fileUrl" target='_blank'>下载</a></font>
                                    </p>
                                </div>
                                <hosjoyUpload v-model="obj.riskCheckProjectDocPos" :showPreView=false :fileSize='200' :fileNum='50' :action='action' :uploadParameters='uploadParameters' @successCb="()=>{handleSuccessCb(obj)}" style="margin:10px 0 0 5px">
                                    <el-button type="primary">上 传</el-button>
                                </hosjoyUpload>
                            </el-form-item>
                        </template>
                    </div>
                </el-form>
            </div>
            <div class="drawer-footer">
                <div class="drawer-button">
                    <el-button @click="handleClose">取 消</el-button>
                </div>
            </div>
        </el-drawer>
        <el-dialog title="签约" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="企业名称：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="信用评级：" prop="name">
                    <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="服务费：" prop="name">
                    <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="可代采购额度：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="信用授予日期：" prop="name">
                    <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="信用到期时间：" prop="name">
                    <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="说明" prop="name">
                    <el-input type="textarea" v-model="ruleForm.desc" maxlength="300" show-word-limit :rows="6"></el-input>
                </el-form-item>
                <el-form-item label="附件：" prop="projectUpload" ref="projectUpload">
                    <hosjoyUpload v-model="ruleForm.projectUpload" accept='.jpeg,.jpg,.png,.BMP,.pdf' :fileSize='20' :fileNum='9' :action='action' :uploadParameters='uploadParameters'>
                    </hosjoyUpload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
export default {
    name: 'vipdrawer',
    data () {
        return {
            moment,
            activeName: '1',
            drawer: false,
            tableData: [{ projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }],
            tableLabel: [
                { label: '信用评级', prop: 'projectName', width: '' },
                { label: '服务费', prop: 'projectNo', width: '150' },
                { label: '可代采购额度(万元)', prop: 'deptName', width: '150' },
                { label: '剩余代采购额度(万元)', prop: 'predictLoanAmount', width: '150' },
                { label: '信用到期日', prop: 'companyName', width: '180' },
                { label: '状态', prop: 'firstPartName' }
            ],
            paginationInfo: {},
            dialogVisible: false,
            rules: {
                name: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                des: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            },
            ruleForm: {
                projectUpload: []
            },
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            approveForm: { 'projectId': '1269802593951862785', 'projectDocList': [{ 'respRiskCheckDocTemplateList': [{ 'templateId': '1268832124482273282', 'firstCatagoryId': 1005, 'firstCatagoryName': '终审清单', 'secondCatagoryId': 1028, 'secondCatagoryName': '评审会决议', 'bizId': 1003, 'bizName': '终审材料', 'functionId': 1001, 'functionName': '上传', 'formatId': 1005, 'formatName': 'excel', 'mondatoryFlag': 0, 'remark': '', 'riskCheckDocTemplateSamplePos': null, 'riskCheckProjectDocPos': null, 'refuse': false }], 'firstCatagoryId': 1005, 'firstCatagoryName': '终审清单' }], 'approveResult': false, 'remark': '阿萨德(阿萨德)' }
        }
    },
    components: {
        hosjoyUpload
    },
    watch: {
        'form.projectUpload' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['projectUpload'].clearValidate()
            })
        }
    },
    methods: {
        onShowDrawerinfn () {
            this.drawer = true
        },
        handleClose () {
            this.drawer = false
        },
        onEditVip () {
            this.dialogVisible = true
        },
        handleSuccessCb () {

        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-drawer__body {
    overflow-y: scroll;
    // position: relative;
}
.drawer-wrap {
    padding: 0 10px;
    &_title {
        background: #efeeee;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
    }
    &_btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        &-flex {
            flex: 1;
            &:nth-child(1) {
                color: #ff7a45;
            }
            &:nth-child(2) {
                text-align: right;
            }
        }
    }
    p {
        margin-top: 25px;
    }
}
.drawer-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 24px;
    border-top: 1px solid #e5e5ea;
    background: #fff;
    z-index: 1000;
    button {
        flex: 1;
    }
    .drawer-button {
        text-align: right;
    }
}

/deep/.el-dialog .el-input {
    width: 100%;
}

/deep/.el-tabs__nav {
    margin: 0 10px;
}
.collect-wrapbox{
    padding: 0 10px;
}
.collect-title {
    font-size: 20px;
    line-height: 45px;
    margin-top: 10px;
    font-weight: bold;
  /deep/ .el-button--mini{
        margin-left: 50px;
    }
}
.collect-box {
    display: flex;
    .el-checkbox {
        margin-right: 10px;
    }
}
.collect-boxtxt {
    i {
        color: #ff0000;
        vertical-align: middle;
        padding: 0 2 0 0px;
        font-style: normal;
    }
}
.collect-call {
    background: #ff7a45;
    color: #fff;
    font-size: 13px;
    border-radius: 6px;
    margin-left: 10px;
    padding: 1px 4px;
}
.upload-file_list {
    display: flex;
    p {
        &:first-child {
            flex: 1;
        }
    }
}
.fileItemDownLoad {
    font-size: 12px;
    border-radius: 3px;
    padding: 8px 16px;
    color: #fff;
    background-color: #ff7a45;
    border-color: #ff7a45;
    display: block;
    line-height: 13px;
    float: left;
    height: 13px;
    cursor: pointer;
    margin-left: 10px;
}
.posrtv {
    position: relative;
    color: #ff7a45;
    a {
        color: #ff7a45;
        margin-left: 10px;
    }
    font {
        font-size: 14px;
    }
}
</style>