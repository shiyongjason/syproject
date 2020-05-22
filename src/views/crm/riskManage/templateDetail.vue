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
                    <tr>
                        <td rowspan="2"> 123</td>
                        <td> *三证正副本</td>
                        <td> 上传</td>
                        <td> 复印件</td>
                        <td>
                            123123123123
                        </td>
                        <td class="table-img">
                            <template v-for="index in 6">
                                <span :key="index"><img :src="require('../../../assets/images/img_0.png')" alt=""></span>
                                <br v-if="index==3" :key="index+'risk'">
                            </template>
                        </td>
                        <td>
                            <el-button size="mini" type="primary" @click="onEditTem()">编辑</el-button>
                        </td>
                    </tr>
                    <tr>
                        <td> 123</td>
                        <td> 123</td>
                        <td> 123</td>
                        <td> 123</td>
                        <td> 123</td>
                        <td> 123</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
            <div class="tem-wrap">
                <el-form :model="form" :rules="rules" ref="ruleForm" class="project-form" :label-width="formLabelWidth">
                    <el-form-item label="一级类目：">
                        <el-input v-model="form.deptName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="二级类目：">
                        <el-input v-model="form.deptName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="功能：">
                        <el-input v-model="form.deptName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="规定格式：">
                        <el-input v-model="form.deptName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="必填：">
                        <el-radio-group>
                            <el-radio>123</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="30" show-word-limit>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="样例：">
                        <hosjoyUpload v-model="form.projectUpload" accept='.jpeg,.jpg,.png,.BMP,.pdf' :fileSize='20' :fileNum='15' :action='action' @successCb="onBackUpload()" :uploadParameters='uploadParameters'>
                    </hosjoyUpload>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
export default {
    name: 'templatedetail',
    components: {
        hosjoyUpload
    },
    data () {
        return {
            formLabelWidth: '120px',
            dialogVisible: false,
            form: { deptName: '',
                projectUpload: [] },
            rules: {},
            action: interfaceUrl + 'tms/files/upload',
            uploadParameters: {
                updateUid: '',
                reservedName: true
            }
        }
    },
    methods: {
        handleClose () {

        },
        onBackUpload (str) {
            console.log()
        },
        onEditTem () {
            this.dialogVisible = true
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
/deep/.el-upload-dragger{
    width:90px;
    height: 90px;
}
/deep/ .default-pre-view-mask{
     width:90px;
    height: 90px;
}
/deep/.default-pre-view-image{
     width:90px;
    height: 90px;
}
/deep/.elupload{
    height: 90px;
}
</style>