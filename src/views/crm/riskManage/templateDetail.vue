<template>
    <div class="page-body">
        <div class="page-body-cont risk-table">
            <div class="risk-table_title">{{tempName}}</div>
            <table class="tablelist">
                <thead>
                    <tr>
                        <td width="10%">一级类目</td>
                        <td width="10%">二级类目</td>
                        <td width="10%">功能</td>
                        <td width="10%">规定格式</td>
                        <td width="20%">备注</td>
                        <td width="">样例</td>
                        <td width="10%">操作</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item) in docTable">
                        <tr v-for="(obj,index) in item.respRiskCheckDocTemplateList" :key="obj.templateId">
                            <td :rowspan="computedRowspan(item.respRiskCheckDocTemplateList)" v-if="index==0 ">{{item.firstCatagoryName}}</td>
                            <td><em v-if="obj.mondatoryFlag">*</em>{{obj.secondCatagoryName}}</td>
                            <td>{{obj.functionName}}</td>
                            <td>{{obj.formatName}}</td>
                            <td>
                                {{obj.remark}}
                            </td>
                            <td class="table-img">
                                <template v-for="(objs,objindex) in obj.riskCheckDocTemplateSamplePos">
                                    <span :key="objindex">
                                        <!-- <img :src="require('../../../assets/images/img_0.png')" alt=""></span> -->
                                        <el-image style="width: 100px; height: 100px" :src="objs.fileUrl" :preview-src-list="onPreview(obj.riskCheckDocTemplateSamplePos,objindex)">
                                        </el-image>
                                    </span>
                                    <br v-if="objindex==2" :key="objindex+'risk'">
                                </template>
                            </td>
                            <td>
                                <el-button size="mini" type="primary" @click="onEditTem(obj.templateId)">编辑</el-button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
            <div class="tem-wrap">
                <el-form :model="formTemp" :rules="rules" ref="ruleForm" class="project-form" :label-width="formLabelWidth">
                    <el-form-item label="一级类目：">
                        <el-input v-model="formTemp.firstCatagoryName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="二级类目：">
                        <el-input v-model="formTemp.secondCatagoryName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="功能：" prop="functionName">
                        <el-input v-model="formTemp.functionName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="规定格式：">
                       <el-select v-model="formTemp.formatId"   placeholder="请选择">
                            <el-option v-for="item in formatList" :key="item.formatId" :label="item.formatName" :value="item.formatId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="必填：" prop="mondatoryFlag">
                        <el-radio-group v-model="formTemp.mondatoryFlag">
                            <el-radio :label=1>是</el-radio>
                            <el-radio :label=0>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" placeholder="请输入内容" v-model="formTemp.remark" maxlength="500" :autosize="{ minRows: 2, maxRows: 7}" show-word-limit>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="样例：">
                        <hosjoyUpload v-model="formTemp.projectUpload" accept='.jpeg,.jpg,.png' :fileSize='20' :fileNum='6' :action='action' @successCb="onBackUpload()" :uploadParameters='uploadParameters'>
                        </hosjoyUpload>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onSaveTemp" :loading=loading>{{loading?'保存中':'确 定'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
import { mapGetters, mapActions } from 'vuex'
import { saveDoctemp, docTempformat } from './api/index'
export default {
    name: 'templatedetail',
    components: {
        hosjoyUpload
    },
    data () {
        return {
            loading: false,
            formLabelWidth: '120px',
            dialogVisible: false,
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            queryParams: {
                bizType: this.$route.query.bizType
            },
            docTable: [],
            formTemp: {
                projectUpload: []
            },
            tempName: '',
            rules: {
                functionName: [
                    { required: true, message: '请选择审核状态', trigger: 'change' }
                ],
                mondatoryFlag: [
                    { required: true, message: '请输入说明', trigger: 'blur' }
                ]
            },
            formatList: []
        }
    },
    computed: {
        ...mapGetters({
            docTempdata: 'riskManage/docTempdata',
            docTempdetail: 'riskManage/docTempdetail'
        })
    },
    mounted () {
        this.tempName = this.$route.query.bizType == 1 ? '好橙工项目材料清单' : this.$route.query.bizType == 2 ? '好橙工立项材料清单' : '好橙工终审材料清单'
        this.onFindDoctemp()
        this.findFormat()
    },
    methods: {
        ...mapActions({
            findDocTemplist: 'riskManage/findDocTemplist',
            findDocTempdetail: 'riskManage/findDocTempdetail'
        }),
        async onFindDoctemp () {
            await this.findDocTemplist(this.queryParams.bizType)
            this.docTable = this.docTempdata
        },
        handleClose () {
            this.dialogVisible = false
        },
        onBackUpload (str) {
            this.formTemp.projectUpload && this.formTemp.projectUpload.map((val, index) => {
                val.templateId = this.formTemp.templateId
            })
        },
        onPreview (list, index) {
            console.log(list)
            const newList = []
            list && list.map(val => {
                newList.push(val.fileUrl)
            })
            return newList.length > 0 && [newList[index]]
        },
        async onEditTem (val) {
            await this.findDocTempdetail(val)
            this.formTemp = { ...this.formTemp, ...this.docTempdetail }
            this.formTemp.projectUpload = this.formTemp.riskCheckDocTemplateSamplePos
            this.dialogVisible = true
        },
        async onSaveTemp () {
            this.dialogVisible = false
            this.formTemp.riskCheckDocTemplateSamplePos = this.formTemp.projectUpload
            await saveDoctemp(this.formTemp)
            this.onFindDoctemp()
        },
        computedRowspan (list) {
            return list.length
        },
        async findFormat () {
            const { data } = await docTempformat()
            console.log(data)
            this.formatList = data
        }
    }
}
</script>
<style lang="scss" scoped>
.risk-table_title {
    font-size: 18px;
    margin-bottom: 20px;
}
.tablelist {
    border: 1px solid #dddddd;
    border-collapse: collapse;
    width: 100%;

    thead {
        background: #fafafa;
    }
    th {
        border: 1px solid #dddddd;
        color: #ffffff;
    }
    td {
        border: 1px solid #dddddd;
        line-height: 40px;
        padding-left: 10px;
    }
    tbody {
        td {
            em{
                font-style: normal;
                color: #f00;
            }
        }
        min-width: 1280px;
        overflow-x: scroll;
    }
    .table-img {
        padding-top: 10px;
        text-align: center;
        span {
            flex: 1;
            flex-wrap: wrap;
            flex-basis: 33%;
            margin: 0 19px;
        }
    }
}
/deep/.el-upload-dragger {
    width: 90px;
    height: 90px;
}
/deep/ .default-pre-view-mask {
    width: 90px;
    height: 90px;
}
/deep/.default-pre-view-image {
    width: 90px;
    height: 90px;
}
/deep/.elupload {
    height: 90px;
}
</style>