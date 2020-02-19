<template>
    <el-dialog class="customeredit" :title="getTitle" :visible.sync="dialog" :close-on-click-modal="false" :before-close="onCancel">
        <div class="detail">
            <div class="title">基本信息</div>
            <el-row :gutter="10">
                <el-col :span="12"><span class="detail-name">操作人姓名：</span>{{customerForm.operatorName}}</el-col>
                <el-col :span="12"><span class="detail-name">操作人手机号：</span>{{customerForm.operatorPhone}}</el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12"><span class="detail-name">操作人邮箱：</span>{{customerForm.operatorEmail}}</el-col>
                <el-col :span="12"><span class="detail-name">操作人身份证号：</span>{{customerForm.operatorIdNumber}}</el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12"><span class="detail-name">企业类型：</span>{{customerForm.companyTypeN}}</el-col>
                <el-col :span="12"><span class="detail-name">企业名称：</span>{{customerForm.companyName}}</el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12"><span class="detail-name">法人姓名：</span>{{customerForm.legalName}}</el-col>
                <el-col :span="12"><span class="detail-name">法人身份证号：</span>{{customerForm.legalIdNumber}}</el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12"><span class="detail-name">法人手机号：</span>{{customerForm.legalPhone}}</el-col>
                <el-col :span="12"><span class="detail-name">组织机构代码：</span>{{customerForm.companyLicenseNumber}}</el-col>
            </el-row>
            <div class="title">印章图片:</div>
            <!-- <span>{{customerForm.companySealImage}}</span> -->
            <div v-if="customerForm.companySealImage" class="showPicture">
                <a :href="customerForm.companySealImage" target="_blank">
                    <img :src="customerForm.companySealImage" alt="印章图片">
                </a>
            </div>
            <span v-else>无</span>
            <div slot="footer" class="footer-close">
                <el-button type="primary" @click="onCancel">关 闭</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'dialog',
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        customerForm: {
            type: Object
            // default: {}
        }
    },
    data () {
        return {
            getTitle: '企业CA认证信息详情'
        }
    },
    methods: {
        onCancel () {
            this.$emit('onCancel')
        }
    }
}
</script>

<style>
.el-dialog {
    min-width: 600px;
}
</style>
<style scoped lang="scss">
.el-col {
    margin-bottom: 20px;
}
.detail-name {
    display: inline-block;
    width: 120px;
    text-align: right;
}
.footer-close {
    margin-top: 50px;
    text-align: right;
    padding-bottom: 20px;
}
.title {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
}
.showPicture {
    width: 200px;
    height: 200px;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
