<template>
    <div class="page-body-cont query-cont">
        <div class="query-cont-col">
            <div>请先提交创建人和企业的基本信息，然后点击上传印章图片按钮，跳到对应页面上传印章图片（注：印章图片必须为清晰的白色背景的扫描图片或高清拍照图片）</div>
        </div>
        <hr><br>
        <div class="query-cont-col">
            <div>企业CA认证申请</div>
        </div><br>
        <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="操作人姓名：" label-width='150px' prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="操作人手机号：" label-width='150px' prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="操作人邮箱：" label-width='150px' prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="操作人身份证号：" label-width='150px' prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="企业类型：" label-width='150px' prop="region">
                <el-select v-model="queryParams.channelType" clearable>
                    <el-option v-for="(item,index) in channelType" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="企业名称：" label-width='150px' prop="name">
                <el-input v-model="ruleForm.name" disabled></el-input>
                <el-button class="applyBtn" @click="dialogVisible = true">选择</el-button>
            </el-form-item>
            <el-form-item label="组织机构代码：" label-width='150px' prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名：" label-width='150px' prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="法人手机号：" label-width='150px' prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="法人身份证号：" label-width='150px' prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <!-- <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">上传印章图片</el-button>
                </el-form-item> -->
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onSubmit('ruleForm')">
                        提交
                    </el-button>
                    <el-button type="primary" class="ml20" @click="uploadSeal">上传印章图片</el-button>
                </div>
            </div>
        </el-form>
        <el-dialog title="新建标签" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <div class="add-tags-dialog">
                <div class="query-cont-col">
                    <div class="query-col-title">标签名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="20" v-model="addTags.labelName" placeholder="请输入标签名">
                        </el-input>
                    </div>
                </div>
            </div>
            <div>
                <div class="query-cont-col">
                    <div class="query-col-title">标签类型：</div>
                    <div class="query-col-input">
                        <el-radio v-model="addTags.labelType" label="1">手动标签</el-radio>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="createTags">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: '',
    data () {
        return {
            dialogVisible: false,
            addTags: {},
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                keywords: '',
                channelType: ''
            },
            ruleForm: {},
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            },
            channelType: [
                { value: '', label: '全部' },
                { value: 0, label: '借款方' },
                { value: 1, label: '资金方' },
                { value: 2, label: '组织方' },
                { value: 3, label: '合作方' },
                { value: 4, label: '担保方' }
            ]
        }
    },
    methods: {
        onQuery () {
            this.$emit('onQuery')
        },
        onSubmit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        createTags () { },
        uploadSeal () { },
        cancel () {
            this.dialogVisible = false
            this.addTags.labelName = ''
        }
    }
}
</script>

<style scoped>
.applyBtn {
    position: absolute;
    right: 0;
    border: 1px solid #f56c6c;
}
</style>