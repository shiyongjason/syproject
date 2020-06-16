<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="sendMessage" :model="sendMessage" :rules="rules" label-width="130px">
                <div class="page-body-title">
                    <h3>创建消息</h3>
                </div>
                <el-form-item label="消息主题：" prop="theme">
                    <el-input v-model.trim="sendMessage.theme" show-word-limit placeholder="输入消息主题" maxlength='50'
                              class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="目标用户：" prop="target">
                    <el-select v-model="sendMessage.target">
                        <el-option :label="item.dataValue" :value="+item.dataKey" v-for="item in pushTargetTypeList" :key="item.dataKey"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消息通知内容：" prop="content">
                    <el-input
                        type="textarea"
                        show-word-limit
                        placeholder="请输入内容"
                        v-model="sendMessage.content" maxlength="200" :rows="5" class="newTitle">
                    </el-input>
                </el-form-item>
                <el-form-item label="点击后打开：" prop="redirectType">
                    <el-radio-group v-model="sendMessage.redirectType">
                        <el-radio :label="sendMessageRedirectType.app">应用</el-radio>
                        <el-radio :label="sendMessageRedirectType.appUrl">应用内指定页面</el-radio>
                        <el-radio :label="sendMessageRedirectType.h5Url">URL</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="redirectUrl">
                    <p class="select-type" v-show="inputType === sendMessageRedirectType.appUrl" @click="openModel"><i class="el-icon-plus"></i>选择页面 <span>{{pageName}}</span></p>
                    <el-input v-show="inputType === sendMessageRedirectType.h5Url" v-model="sendMessage.redirectUrl" placeholder="请输入已http或https开头的url"></el-input>
                </el-form-item>
                <el-form-item label="推送时间：" prop="pushTime">
                    <el-date-picker type="datetime" v-model="sendMessage.pushTime" :clearable=false
                                    placeholder="生效时间" value-format='yyyy-MM-dd HH:mm:ss'
                                    :picker-options="pickerOptionsStart">
                    </el-date-picker>
                </el-form-item>
                <el-form-item style="text-align: center" class="newTitle">
                    <el-button type="primary" @click="onSaveApplication" :loading="loading">
                        {{ loading ? '提交中 ...' : '确 定'
                        }}
                    </el-button>
                    <el-button @click="onBack()">返回</el-button>
                </el-form-item>
                <el-dialog title="选择应用内指定页面" :visible.sync="selectApplication" class="select-application" width="500px"
                           :close-on-click-modal="false">
                    <el-form-item prop="redirectUrl" label-width="0">
                        <el-radio-group v-model="sendMessage.redirectUrl" class="el-radio-table">
                            <table>
                                <tr>
                                    <th>页面编号</th>
                                    <th>页面名称</th>
                                </tr>
                                <tr v-for="item in pushAppInnerPageList" :key="item.dataKey">
                                    <td><el-radio :label="item.dataKey">{{item.dataKey}}</el-radio></td>
                                    <td>{{item.dataValue}}</td>
                                </tr>
                            </table>
                        </el-radio-group>
                    </el-form-item>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="closeModel">取 消</el-button>
                        <el-button type="primary" @click="selectApplication= false" :loading="loading">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form>
    </div>
    </div>
</template>
<script>
import { createCloudSendMessage, updateCloudSendMessage } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'
import { sendMessageRedirectType } from '../enum/enum'
export default {
    name: 'sendMessageEdit',
    data () {
        return {
            sendMessage: {
                content: '',
                id: '',
                operateUserName: '',
                pushTime: '',
                redirectType: '',
                redirectUrl: '',
                target: '',
                theme: ''
            },
            rules: {
                theme: [
                    { required: true, message: '请输入消息主题', trigger: 'blur' }
                ],
                target: [
                    { required: true, message: '请选择目标用户' }
                ],
                content: [
                    { required: true, message: '请输入消息通知内容', trigger: 'blur' }
                ],
                pushTime: [
                    { required: true, message: '请选择推送时间', trigger: 'blur' }
                ],
                redirectType: [
                    { required: true, message: '请选择点击后打开', trigger: 'change' }
                ],
                redirectUrl: [
                    { required: true, validator: this.redirectTypePass }
                ]
            },
            loading: false,
            selectApplication: false,
            pushTargetTypeList: [],
            pushAppInnerPageList: [],
            inputType: null
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudSendMessagePostDetail: 'cloudSendMessagePostDetail',
            cloudDict: 'cloudDict'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    return time.getTime() < Date.now() - 8.64e7
                }
            }
        },
        sendMessageRedirectType () {
            return sendMessageRedirectType
        },
        pageName () {
            if (this.inputType === this.sendMessageRedirectType.appUrl) {
                let temp = ''
                this.pushAppInnerPageList.forEach(value => {
                    if (value.dataKey === this.sendMessage.redirectUrl) {
                        temp = value.dataValue
                    }
                })
                return temp
            }
            return ''
        }
    },
    watch: {
        'sendMessage.redirectType' (val) {
            if (this.isFirstLoad) {
                this.sendMessage.redirectUrl = ''
            }
            this.inputType = this.sendMessage.redirectType
        }
    },
    async mounted () {
        this.isFirstLoad = false
        if (this.$route.query.id) {
            this.getActivityDetail(this.$route.query.id)
        }
        await this.findCloudDict({ item: 'push_target_type' })
        this.pushTargetTypeList = this.cloudDict.concat()
        await this.findCloudDict({ item: 'push_app_inner_page' })
        this.pushAppInnerPageList = this.cloudDict.concat()
        this.isFirstLoad = true
    },
    methods: {
        ...mapActions(
            {
                setNewTags: 'setNewTags',
                findCloudSendMessagePostDetail: 'findCloudSendMessagePostDetail',
                findCloudDict: 'findCloudDict'
            }
        ),
        redirectTypePass (rule, value, callback) {
            if (this.sendMessage.redirectType && this.sendMessage.redirectType !== this.sendMessageRedirectType.app) {
                if (this.sendMessage.redirectUrl.length < 1) {
                    if (this.sendMessage.redirectType === this.sendMessageRedirectType.appUrl) {
                        return callback(new Error('请选择页面'))
                    } else if (this.sendMessage.redirectType === this.sendMessageRedirectType.h5Url) {
                        return callback(new Error('请填写Url'))
                    }
                }
            }
            return callback()
        },
        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/comfortCloud/operationsManagement/sendMessage')
        },
        async getActivityDetail (id) {
            await this.findCloudSendMessagePostDetail(id)
            this.cloudSendMessagePostDetail.pushTime = this.$root.$options.filters.formatDate(this.cloudSendMessagePostDetail.pushTime, 'YYYY-MM-DD HH:mm:ss')
            this.sendMessage = { ...this.cloudSendMessagePostDetail }
        },
        onSaveApplication () {
            this.loading = true
            this.$refs['sendMessage'].validate(async (valid) => {
                if (valid) {
                    try {
                        if (this.$route.query.id) {
                            this.sendMessage.operateUserName = this.userInfo.employeeName
                            this.sendMessage.operateAccount = this.userInfo.phoneNumber
                            await updateCloudSendMessage(this.sendMessage)
                            this.$message.success('修改成功')
                        } else {
                            this.sendMessage.operateUserName = this.userInfo.employeeName
                            this.sendMessage.operateAccount = this.userInfo.phoneNumber
                            await createCloudSendMessage(this.sendMessage)
                            this.$message.success('保存成功')
                        }
                        this.setNewTags((this.$route.fullPath).split('?')[0])
                        this.$router.push('/comfortCloud/operationsManagement/sendMessage')
                        this.loading = false
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        },
        openModel () {
            this.selectApplication = true
        },
        closeModel () {
            this.sendMessage.redirectUrl = ''
            this.selectApplication = false
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-body-title {
        margin-bottom: 20px;
    }
    /deep/ .newTitle {
        width: 500px !important;
    }
    .select-type {
        font-size: 16px;
        color: #ff7a45;
        cursor: pointer;
        float: left;
        span {
            margin-left: 10px;
            color: #333333;
            font-size: 14px;
        }
    }
    /deep/ .el-icon-plus{
        margin-right: 8px;
    }
    .el-radio-table {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        table{
            width: 100%;
            line-height: 20px;
            border-collapse: collapse;
            th{
                color: #333333;
                font-size: 14px;
                text-align: left;
                padding: 10px;
                border: 1px solid #f1f1f1;
            }
            td{
                width: 50%;
                font-size: 14px;
                padding: 10px;
                border: 1px solid #f1f1f1;
            }
        }
    }
</style>
