<template>
    <div class="page-body B2b">
        <div class="page-body-cont approvalcontract">
            <div class="approvalcontract-head">
                <font>{{detailRes.contractStatus == 2 ? '分财' : detailRes.contractStatus == 4 ? '风控' : '法务'}}审核合同</font>
                <h-button type="primary" @click="getHistory">审核及签署流程</h-button>
            </div>
            <div class="approvalcontract-layout">
                <div class="approvalcontract-layout-left">

                    <h1>字段/自定义合同条款修订</h1>
                    <div class="setarea" v-if="currentKey">
                        <!-- v-if 法务 -->
                        <template>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    {{currentKey.paramName}}<i class="el-icon-arrow-down el-icon--right"></i> ：
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>黄金糕</el-dropdown-item>
                                    <el-dropdown-item>狮子头</el-dropdown-item>
                                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                        <p class="setarea-key">{{currentKey.paramName}}：</p>
                        <p>
                            <el-input v-model.trim="currentKey.paramValue" placeholder="请输入内容"></el-input>
                        </p>
                        <h-button style="margin-top:10px" @click="onSaveContent" type="primary">保存</h-button>
                    </div>
                    <div class="tips">
                        <div><b>注意事项：</b></div>
                        <p>1、点击保存，则会记录修订记录，并保存为最新的合同文档；</p>
                        <p>2、暂不审核，不会撤销字段修订记录；</p>
                    </div>
                </div>
                <div class="approvalcontract-layout-right">
                    <h1>合同预览</h1>
                    <div class="approvalcontract-content-layout">
                        <!-- 分财、风控预览——纯html -->
                        <div class="approvalcontract-content" v-html='contractContentDiv'></div>
                        <div class="approvalcontract-content-hidden" style="display:none" v-html='contractContentHidden'></div>
                        <!-- 法务预览html——编辑器 -->
                        <div class="approvalcontract-content-legal-affairs">
                            <RichEditor ref="RichEditor" v-model="contractContentHidden" :menus="menus" :uploadImgServer="uploadImgServer" :height="500" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%"></RichEditor>
                        </div>
                    </div>
                    <div class="approvalcontract-btn">
                        <h-button @click="goBack">暂不审核</h-button>
                        <h-button type="primary" @click="openDialog('驳回',3)">驳回</h-button>
                        <h-button type="primary" @click="openDialog('通过',2)">通过</h-button>
                    </div>
                </div>

            </div>

        </div>
        <el-dialog :title="dialog.title" :visible.sync="dialog.dialogVisible" width="600px" :before-close="handleClose">
            <div class="dialogbox">
                <span class="dialog-layout">
                    <font>*</font>{{dialog.title}}原因：
                </span>
                <el-input v-model="dialog.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" style="width:80%"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSure">确定{{dialog.title}}</el-button>
            </span>
        </el-dialog>
        <el-drawer class="contentdrawerbox" size="550px" :visible.sync="drawerVisible" :with-header="false" :wrapperClosable='false'>
            <div slot="title">审核记录</div>
            <!-- 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回 -->
            <div class="history-css">
                <div v-if="historyList&&historyList.length==0">暂无数据</div>
                <div v-else class="history-css-flex" v-for="(item,index) in historyList" :key="index">
                    <div class="history-css-left">
                        <span class="name">{{item.operator}} </span>
                        <span>{{item.operationName}}</span>
                        <template v-if="item.operationName == '编辑了'">
                            <span class="operationcontent-css" v-html="getOperationContent(item)"></span>
                        </template>
                        <template v-else-if="item.operationName == '修订了'">
                            <font style="margin: 0 4px;">合同</font>
                            <font style="color: #ff7a45;margin-left:4px;cursor: pointer;" @click="getDiff(item.operationContent)">查看 >></font>
                        </template>
                        <template v-else>
                            <span class="operationcontent-css">
                                <font>{{item.operationContent}}</font>
                            </span>
                        </template>
                    </div>
                    <div class="history-css-right">{{item.operationTime | formatDate('YYYY年MM月DD日 HH时mm分ss秒')}}</div>
                </div>
            </div>
            <div class="history-bttom">
                <h-button type="primary" @click="drawerVisible=false">好的</h-button>
            </div>
        </el-drawer>
        <diffDialog ref="diffDialog" v-if="currentContent&&lastContent" :currentContent=currentContent :lastContent=lastContent></diffDialog>
    </div>
</template>
<script>
import diffDialog from './diffDialog'
import { mapState, mapActions } from 'vuex'
import { contractKeyValue, getContractsContent, saveContent, approvalContent, getCheckHistory, getDiffApi } from './api/index'
import { interfaceUrl } from '@/api/config'

export default {
    name: 'approveContract',
    components: { diffDialog },
    data () {
        return {
            drawerVisible: false,
            originalContentFieldsList: '',
            contractFieldsList: '',
            contractKeyValue: '',
            vHtml: '',
            currentKey: '',
            fieldName: '', // 编辑字段
            fieldOriginalContent: '', // 编辑前内容
            fieldContent: '', // 编辑内容
            contractContentDiv: '', // 合同内容
            contractContentHidden: '', // 合同内容
            approvalRemark: '',
            detailRes: '',
            dialog: {
                dialogVisible: false,
                title: '',
                status: '',
                remark: ''
            },
            historyList: '',
            menus: [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'undo', // 撤销
                'redo' // 重复
            ],
            currentContent: '',
            lastContent: ''

        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        uploadImgServer () {
            return interfaceUrl + 'tms/files/upload-list'
        },
        uploadImgParams () {
            return {
                updateUid: ''
            }
        },
        uploadImgName () {
            return 'multiFile'
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        async getDiff (item) {
            console.log(String(1326763850132430849))
            const { lastContentId, currentContentId } = JSON.parse(item)
            const { data } = await getDiffApi({
                currentId: currentContentId,
                lastId: lastContentId
            })
            console.log('data: ', data)
            this.currentContent = data.contractContent
            this.lastContent = data.lastContractContent
            this.$nextTick(() => {
                this.$refs.diffDialog.onShowDiff()
            })
        },
        async getHistory () {
            this.drawerVisible = true
            const query = {
                contractId: this.$route.query.id
            }
            const { data } = await getCheckHistory(query)
            this.historyList = data.signHistory
            console.log('this.historyList: ', this.historyList)
        },
        openDialog (title, status) {
            this.dialog.dialogVisible = true
            this.dialog.title = title
            this.dialog.status = status
        },
        handleClose () {
            this.dialog.dialogVisible = false
            this.dialog.remark = ''
        },
        onSure () {
            if (!this.dialog.remark) {
                this.$message({
                    message: `原因不能为空`,
                    type: 'error'
                })
            }
            this.onApprove()
        },
        async onApprove () {
            const query = {
                contractId: this.$route.query.id,
                approver: this.userInfo.employeeName,
                // 合同审批角色 1：分财 2：风控 3：法务
                approverRole: this.detailRes.contractStatus == 2 ? 1 : this.detailRes.contractStatus == 4 ? 2 : 3,
                approvalStatus: this.dialog.status,
                approvalRemark: this.dialog.remark
            }
            console.log('query: ', query)
            await approvalContent(query)
            this.$message({
                message: `提交成功`,
                type: 'success'
            })
            this.handleClose()
            this.goBack()
        },
        goBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/goodwork/contractSigningManagement')
        },
        async onSaveContent () {
            const { paramName, paramKey, paramValue } = this.currentKey
            if (paramValue === '') {
                this.$message({
                    message: `${paramName}不能为空`,
                    type: 'error'
                })
                return
            }
            // 修改键值对
            this.contractFieldsList.map(item => {
                if (item.paramKey === paramKey) {
                    item.paramValue = paramValue
                }
            })

            let ryanList = document.getElementsByClassName(paramKey)
            Array.from(ryanList).map(jtem => {
                jtem.innerHTML = paramValue
            })
            // input版合同
            let hiddenDom = document.getElementsByClassName('approvalcontract-content-hidden')[0].getElementsByClassName(paramKey)
            Array.from(hiddenDom).map(jtem => {
                jtem.value = paramValue
                jtem.setAttribute('value', paramValue)
                let inputWidth = paramValue.length * 14
                jtem.style.width = `${inputWidth}px`
            })

            // 通过dom生成最新的html
            this.contractContentHidden = document.getElementsByClassName('approvalcontract-content-hidden')[0].innerHTML
            this.fieldName = paramKey // 编辑字段
            this.fieldOriginalContent = this.originalContentFieldsList.filter(item => item.paramKey === paramKey)[0].paramValue // 编辑前内容
            this.fieldContent = paramValue
            await saveContent({
                'contractId': this.$route.query.id,
                'type': 2, // 类型 1：提交合同 2：编辑合同内容 3：编辑合同条款 4：审核通过 5：驳回
                'fieldName': this.fieldName,
                'fieldOriginalContent': this.fieldOriginalContent,
                'fieldContent': this.fieldContent,
                'contractContent': this.contractContentHidden, // 拿input版的合同去提交。法务审核的时候需要用到。
                'createBy': this.userInfo.employeeName,
                'contractFieldsList': JSON.stringify(this.contractFieldsList)
            })
            this.init()
        },
        async init () {
            const res = await getContractsContent({ contractId: this.$route.query.id })
            if (res) {
                this.detailRes = res.data
                this.contractContentDiv = res.data.contractContent // Div版的合同
                this.contractContentHidden = res.data.contractContent // input版的合同
                this.originalContentFieldsList = JSON.parse(res.data.contractFieldsList) // 保存最初的键值对
                this.contractFieldsList = JSON.parse(JSON.stringify(this.originalContentFieldsList)) // 可修改的键值对
                this.$nextTick(() => {
                    let inputDomList = document.getElementsByClassName('approvalcontract-content')[0].getElementsByTagName('input')
                    let firstKsy = inputDomList[0].className
                    this.currentKey = this.contractFieldsList.filter(item => item.paramKey === firstKsy)[0]
                    Array.from(inputDomList).map((item, index) => {
                        item.outerHTML = `<div class="${item.className}" style="display:inline;color:rgb(255, 122, 69);cursor: pointer;">${item.value}</div>`
                        let fields = this.contractFieldsList.filter(jtem => jtem.paramKey === item.className)[0]
                        // 给div绑定事件
                        let doms = document.getElementsByClassName('approvalcontract-content')[0].getElementsByClassName(item.className)
                        Array.from(doms).map(jtem => {
                            if (!jtem.onclick) {
                                jtem.onclick = () => {
                                    this.currentKey = { ...fields }
                                }
                            }
                        })
                    })
                })
            }
        },
        legalAffairsInit () {
            // approvalcontract-content-legal-affairs

        },
        getOperationContent (item) {
            // fieldContent编辑内容 fieldName编辑字段 fieldOriginalContent编辑前内容
            const obj = JSON.parse(item.operationContent)
            return `<font>${obj.fieldDesc}</font>从<font>${obj.fieldOriginalContent}</font>变为<font>${obj.fieldContent}</font>`
        }

    },
    beforeMount () {
        // const { data } = contractKeyValue(this.$route.query.id)
        // const { data } = await contractKeyValue(10001)

        this.init()

        // 'contractContent': '<p>甲方：<input class="projectName" value="甲方" readonly style="width: 28px; color: rgb(255, 122, 69); height: 22px; min-width: 20px; border-width: initial; border-style: none; text-align: center; margin-right: 3px; border-radius: 5px; cursor: pointer;">你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好</p><p>乙方：<input class="projectContractName" value="乙方乙方乙方乙方乙方" readonly style="width: 140px; color: rgb(255, 122, 69); height: 22px; min-width: 20px; border-width: initial; border-style: none; text-align: center; margin-right: 3px; border-radius: 5px; cursor: pointer;"></p><p>1、价格</p><p>2、效率</p><p>3、额度</p><p>4、指标</p><p><span style="font-weight: bold;">签约方</span></p><p>甲方2：<input class="projectName" value="甲方2" readonly style="width: 28px; color: rgb(255, 122, 69); height: 22px; min-width: 20px; border-width: initial; border-style: none; text-align: center; margin-right: 3px; border-radius: 5px; cursor: pointer;"></p>',
        //
        // contractTemplateType 合同模板id
    }
}
</script>
<style scoped lang="scss">
.approvalcontract {
    height: 80%;
    position: fixed;
    overflow: hidden;
    width: calc(100vw - 200px - 86px);
    .approvalcontract-head {
        font-size: 23px;
        font-weight: 650;
        border-bottom: 1px solid #e9e9e9;
        padding-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .approvalcontract-content-layout {
        height: calc(100vh - 315px);
        overflow: scroll;
        min-width: 600px;
    }
    .approvalcontract-layout {
        height: calc(100vh - 210px);
        position: relative;
        overflow: hidden;
        &-left {
            width: 27%;
            margin-right: 3%;
            position: fixed;
            overflow: hidden;
            h1 {
                font-size: 20px;
            }
            // flex:0 0 450px;
            margin-right: 40px;
            box-sizing: border-box;
            padding: 15px 0;
            .setarea {
                height: 160px;
                border-bottom: 1px solid #e9e9e9;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }
            .tips {
                font-size: 16px;
                b {
                    margin-bottom: 10px;
                    display: inline-block;
                }
                p {
                    font-size: 14px;
                    line-height: 2;
                    color: #6b6868;
                }
            }
        }
        &-right {
            position: relative;
            width: 65%;
            float: right;
            // overflow-y: scroll;
            height: 100%;
            h1 {
                font-size: 20px;
                margin-bottom: 10px;
            }
            box-sizing: border-box;
            padding: 15px 20px 0;
        }
    }
    .setarea-key {
        font-size: 16px;
        margin: 10px 0 10px;
    }
    .approvalcontract-btn {
        position: absolute;
        right: 30px;
        bottom: 2px;
    }

    /deep/.approvalcontract-content input {
        color: #ff7a45 !important;
    }
}
.dialogbox {
    margin-top: 50px;
    display: flex;
}
.dialog-layout {
    margin-right: 5px;
    display: inline-block;
    font {
        color: #f97575;
        margin-right: 5px;
    }
}
.contentdrawerbox {
    /deep/ .el-drawer__header {
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
        font-size: 18px;
    }
    /deep/.history-css {
        padding: 0 20px;
        box-sizing: border-box;
        height: calc(100vh - 150px);
        overflow-y: scroll;
        .history-css-flex {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            .history-css-left {
                font-size: 14px;
                flex: 0 0 300px;
                // word-break: break-all;
                .name {
                    color: #169bd5;
                }
            }
            .history-css-right {
                flex: 0 0 198px;
                font-size: 13px;
                color: #a7a5a5;
                margin-left: 10px;
                text-align: right;
            }
        }
        .operationcontent-css {
            font {
                color: #ff7a45;
                margin: 0 4px;
            }
        }
    }
    /deep/.history-bttom {
        border-top: 1px solid #eee;
        padding-top: 10px;
        text-align: right;
        padding-right: 20px;
        box-sizing: border-box;
    }
}
</style>