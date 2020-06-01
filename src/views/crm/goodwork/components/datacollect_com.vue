<template>
    <div class="collect-wrap">
        <el-form :model="colForm" :rules="colFormrules" ref="colForm" label-width="" class="demo-ruleForm">
            <el-button size="small" type="primary" @click="onGetrefuse">打回记录</el-button>
            <div class="collect-wrapbox" v-for="item in colForm.projectDocList" :key="item.firstCatagoryId">
                <div class="collect-title">{{item.firstCatagoryName}}</div>
                <template v-for="obj in item.respRiskCheckDocTemplateList">
                    <el-form-item label="" prop="type" :key="'item'+obj.templateId">
                        <div class="collect-box">
                            <div v-if="activeName=='2'&&status==3">
                                <el-checkbox label="" name="type" size="medium" v-model="obj.callback" :disabled=obj.refuse></el-checkbox>
                            </div>
                            <div class="collect-boxtxt">
                                <h3><i v-if="obj.mondatoryFlag">*</i>{{obj.secondCatagoryName}}<span class="collect-call" v-if="obj.refuse">已打回，待分部补充</span></h3>
                                <p>备注：{{obj.remark}}</p>
                                <p>规定格式：{{obj.formatName}}</p>
                            </div>
                            <div class="upload-file_list" v-for="(item,index) in obj.riskCheckProjectDocPos" :key="index">
                                <p>
                                    <span class="posrtv">
                                        <template v-if="item&&item.fileUrl">
                                            <i class="el-icon-document"></i>
                                            <a :href="item.fileUrl" target="_blank">
                                                <font>{{item.fileName}}</font>
                                            </a>
                                        </template>
                                    </span>
                                </p>
                                <p style="flex:0.5"> {{moment(item.createTime).format('YYYY-MM-DD')}}</p>
                                <p>
                                    <font class="fileItemDownLoad" v-if="item.fileName.toLowerCase().indexOf('.png') != -1||item.fileName.toLowerCase().indexOf('.jpg') != -1||item.fileName.toLowerCase().indexOf('.jpeg') != -1" @click="handleImgDownload(item.fileUrl, item.fileName)">下载</font>
                                    <font v-else><a class='fileItemDownLoad' :href="item.fileUrl" target='_blank'>下载</a></font>
                                </p>
                            </div>
                        </div>

                    </el-form-item>
                </template>
            </div>
        </el-form>
        <el-dialog title="打回记录" :visible.sync="recordsVisible" width="30%" :before-close="()=>recordsVisible = false" :modal=false>
            <div class="project-record">
                <el-timeline>
                    <el-timeline-item :timestamp="moment(item.createTime).format('YYYY-MM-DD')+' 打回操作人：'+item.createBy" placement="top" v-for="item in refuseRecord" :key=item.id>
                        <el-card>
                            <p>待补充类目:{{item.secondCategoryNames}}</p>
                            <p>待补充原因：{{item.remark}}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="recordsVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="打回原因" :visible.sync="reasonVisible" width="30%" :before-close="onCloseCol" :modal=false>
            <el-form ref="refuseForm" :model="refuseForm" :rules="refuseFormRules" label-width="100px" style="margin-top:20px">
                <el-form-item label="打回原因：" prop="remark">
                    <el-input type="textarea" v-model.trim="refuseForm.remark" maxlength="500" :rows="5" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseCol">取 消</el-button>
                <el-button type="primary" @click="onRefuse" :loading=loading>{{loading?'确 定':'保 存'}}</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="collectTitle" :visible.sync="collectVisible" width="30%" :before-close="onCloseCol" :modal=false :close-on-click-modal=false>
            <el-form ref="approveForm" :model="coldataForm" :rules="collectRules" label-width="100px" style="margin-top:20px">
                <el-form-item label="审核意见：" prop="remark">
                    <el-input type="textarea" v-model.trim="coldataForm.remark" maxlength="500" :rows="5" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseCol">取 消</el-button>
                <el-button type="primary" @click="onUpdatecolApprove">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import { refuseDoc, submitProjectdoc } from '../api/index'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'datacollectcom',
    props: {
        colForm: {
            type: Object,
            default: () => { }
        },
        activeName: {
            type: String,
            default: ''
        },
        status: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            moment,
            colFormrules: {},
            recordsVisible: false,
            reasonVisible: false,
            refuseRecord: [],
            refuseForm: {
                createBy: '',
                projectId: '',
                remark: '',
                status: 1,
                templateIds: ''
            },
            refuseFormRules: {
                remark: [
                    { required: true, message: '请输入打回原因', trigger: 'blur' }
                ]
            },
            loading: false,
            collectVisible: false,
            collectTitle: '',
            collectRules: {
                remark: [
                    { required: true, message: '请输入意见', trigger: 'blur' }
                ]
            },
            coldataForm: {
                remark: ''
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        ...mapGetters({
            refusedata: 'crmmanage/refusedata'
        })
    },
    methods: {
        ...mapActions({
            findRefuseData: 'crmmanage/findRefuseData'
        }),
        onShowcollect () {
            this.collectVisible = true
            this.collectTitle = '材料审核'
        },
        onCallback () {
            const newTempid = []
            const newList = this.colForm.projectDocList
            newList && newList.map(val => {
                val.respRiskCheckDocTemplateList.map(item => {
                    if (item.callback) newTempid.push(item.templateId)
                })
            })
            this.refuseForm.templateIds = newTempid.toString()
            if (newTempid.length > 0) {
                this.reasonVisible = true
            } else {
                this.$message.warning('请选择打回的选项')
            }
        },
        onRefuse () {
            this.loading = true
            this.refuseForm.createBy = this.userInfo.employeeName
            this.refuseForm.projectId = this.colForm.projectId
            console.log(this.refuseForm)
            this.$refs.refuseForm.validate(async (valid) => {
                if (valid) {
                    await refuseDoc(this.refuseForm)
                    this.$message.success('打回成功')
                    this.reasonVisible = false
                    this.loading = false
                } else {
                    this.loading = false
                }
            })
        },
        onUpdatecolApprove () {
            const projectDocList = this.colForm.projectDocList
            let riskCheckProjectDocPoList = []
            const params = {}
            projectDocList && projectDocList.map(val => {
                val.respRiskCheckDocTemplateList.map(obj => {
                    if (obj.mondatoryFlag) { riskCheckProjectDocPoList = riskCheckProjectDocPoList.concat(obj.riskCheckProjectDocPos) }
                })
            })
            params.submitStatus = 2
            params.bizType = 1
            params.projectId = this.colForm.projectId
            params.riskCheckProjectDocPoList = riskCheckProjectDocPoList
            params.remark = this.coldataForm.remark
            this.$refs.approveForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await submitProjectdoc(params)
                        this.$message({
                            message: `材料审核成功`,
                            type: 'success'
                        })
                        this.collectVisible = false
                        this.$emit('onCompsback')
                    } catch (error) {

                    }
                }
            })
        },
        async onGetrefuse () {
            await this.findRefuseData(this.colForm.projectId)
            this.refuseRecord = this.refusedata
            this.recordsVisible = true
        },
        onCloseCol () {
            this.coldataForm.remark = ''
            this.collectVisible = false
            this.refuseForm.remark = ''
            this.reasonVisible = false
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/.el-form {
    padding: 0;
}
.collect-wrap {
    padding: 0 10px 100px 10px;
    margin-left: 15px;
}
.collect-title {
    font-size: 20px;
    line-height: 45px;
    border-bottom: 1px solid #e5e5e5;
    margin-top: 10px;
    font-weight: bold;
}
.collect-box {
    display: flex;
    flex-direction: column;
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
    font-size: 12px;
    border-radius: 6px;
    margin-left: 10px;
    padding: 2px 8px;
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
.project-record {
    margin-top: 15px;
}
/deep/.el-card__body {
    padding: 5px;
    p {
        line-height: 30px;
    }
}
</style>