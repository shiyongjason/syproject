<template>
    <div>
        <el-drawer title="VIP详情" :visible.sync="drawer" :before-close="handleClose" size="50%">
            <div class="drawer-wrap">
                <div class="drawer-wrap_title">江苏舒适云信息技术有限公司</div>
                <div class="drawer-wrap_btn">
                    <div class="drawer-wrap_btn-flex">VIP签约信息</div>
                    <div class="drawer-wrap_btn-flex">
                        <el-button type="primary" size="mini">超小按钮</el-button>
                    </div>
                </div>
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" :isMultiple="false" :isAction="true" :actionMinWidth=100 :isShowIndex='true' :maxHeight=500>
                    <template slot="action" slot-scope="scope">
                        <el-button type="success" size="mini" plain @click="onEditVip(scope.data.row.id)">修改</el-button>
                    </template>
                </basicTable>
                <p>
                    最近维护时间：2019-12-06 13:00:06
                </p>
                <p>
                    最近维护人：赵娟（15195954045）
                </p>
            </div>
            <div class="drawer-footer">
                <div class="drawer-button">
                    <el-button @click="handleClose">取 消</el-button>
                </div>
            </div>
        </el-drawer>
        <el-dialog title="分配" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="签约人（员工）：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="签约时间：" prop="name">
                    <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                 <el-form-item label="签约年份：" prop="name">
                     <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                 <el-form-item label="VIP等级：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                  <el-form-item label="次年服务费折扣：" prop="name">
                    <el-input v-model="ruleForm.name">  <template slot="append">折</template></el-input>
                </el-form-item>
                  <el-form-item label="VIP目标：" prop="name">
                    <el-input v-model="ruleForm.name">  <template slot="append">万元</template></el-input>
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
import hosjoyUpload from '@/components/HosJoyUpload/HosJoyUpload'
import { interfaceUrl } from '@/api/config'
export default {
    name: 'vipdrawer',
    data () {
        return {
            drawer: false,
            tableData: [{ projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }, { projectName: 'hhaha' }],
            tableLabel: [
                { label: '项目名称', prop: 'projectName', width: '' },
                { label: '项目编号', prop: 'projectNo', width: '150' },
                { label: '所属分部', prop: 'deptName', width: '150' },
                { label: '赊销总额', prop: 'predictLoanAmount', width: '150' },
                { label: '经销商', prop: 'companyName', width: '180' },
                { label: '甲方名', prop: 'firstPartName' }
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
            }
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

/deep/.el-dialog .el-input{
    width: 100%;
}
</style>