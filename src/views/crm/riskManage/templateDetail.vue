<template>
    <div class="page-body">
        <div class="page-body-cont risk-table">
            <div class="risk-table_title">好橙工项目材料清单</div>
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
                    <tr v-for="(item,index) in docTable" :key="item.templateId">
                        <td :rowspan="computedRowspan(docTable)" v-if="index==0 ">{{item.firstCatagoryName}}</td>
                        <td>{{item.secondCatagoryName}}</td>
                        <td>{{item.functionName}}</td>
                        <td>{{item.formatName}}</td>
                        <td>
                            {{item.remark}}
                        </td>
                        <td class="table-img">
                            <template v-for="index in 6">
                                <span :key="index">
                                    <!-- <img :src="require('../../../assets/images/img_0.png')" alt=""></span> -->
                                    <el-image style="width: 100px; height: 100px" :src="require('../../../assets/images/img_0.png')" :preview-src-list="srcList">
                                    </el-image>
                                </span>
                                <br v-if="index==3" :key="index+'risk'">
                            </template>
                        </td>
                        <td>
                            <el-button size="mini" type="primary" @click="onEditTem(item.templateId)">编辑</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <el-dialog title="材料详情" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
            <div class="tem-wrap">
                <el-form :model="formTemp" :rules="rules" ref="ruleForm" class="project-form" :label-width="formLabelWidth">
                    <el-form-item label="一级类目：">
                        <el-input v-model="formTemp.firstCatagoryName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="二级类目：">
                        <el-input v-model="formTemp.secondCatagoryName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="功能：">
                        <el-input v-model="formTemp.functionName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="规定格式：">
                        <el-input v-model="formTemp.formatName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="必填：">
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
                        <hosjoyUpload v-model="formTemp.projectUpload" accept='.jpeg,.jpg,.png,.BMP,.pdf' :fileSize='20' :fileNum='6' :action='action' @successCb="onBackUpload()" :uploadParameters='uploadParameters'>
                        </hosjoyUpload>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSaveTemp" :loading=loading>{{loading?'保存中':'确 定'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'templatedetail',
    components: {
        hosjoyUpload
    },
    data () {
        return {
            srcList: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            loading: false,
            formLabelWidth: '120px',
            dialogVisible: false,
            rules: {},
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            },
            queryParams: {
                bizType: this.$route.query.bizType,
                pageNumber: -1,
                pageSize: -1
            },
            docTable: [],
            formTemp: {
                projectUpload: []
            }
        }
    },
    computed: {
        ...mapGetters({
            docTempdata: 'riskManage/docTempdata',
            docTempdetail: 'riskManage/docTempdetail'
        })
    },
    mounted () {
        this.onFindDoctemp()
    },
    methods: {
        ...mapActions({
            findDocTemplist: 'riskManage/findDocTemplist',
            findDocTempdetail: 'riskManage/findDocTempdetail'
        }),
        async onFindDoctemp () {
            await this.findDocTemplist(this.queryParams)
            this.docTable = this.docTempdata.records
        },
        handleClose () {

        },
        onBackUpload (str) {
            this.formTemp.projectUpload && this.formTemp.projectUpload.map((val, index) => {
                val.orderNo = index
            })
        },
        async onEditTem (val) {
            await this.findDocTempdetail(val)
            this.formTemp = { ...this.formTemp, ...this.docTempdetail }
            this.dialogVisible = true
        },
        onSaveTemp () {
            console.log(this.formTemp)
            this.dialogVisible = false
        },
        computedRowspan (list) {
            return list.length
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
        }
        min-width: 1280px;
        overflow-x: scroll;
    }
    .table-img {
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