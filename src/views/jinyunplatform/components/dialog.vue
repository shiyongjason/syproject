<template>
    <el-dialog class="customeredit" :title="getTitle" :visible.sync="dialog" :close-on-click-modal="false" :before-close="onCancel">
        <div class="detail">
            <div class="title">基本信息</div>
            <el-row :gutter="10">
                <el-col :span="11"><span class="detail-name">渠道名称：</span>111</el-col>
                <el-col :span="11"><span class="detail-name">客户身份：</span>222</el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="11"><span class="detail-name">姓名：</span>{{customerForm.name}}</el-col>
                <el-col :span="11"><span class="detail-name">微信号：</span>{{customerForm.wechatId}}</el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="11"><span class="detail-name">手机号：</span>{{customerForm.mobile}}</el-col>
                <el-col :span="11"><span class="detail-name">微信昵称：</span>{{customerForm.nickname}}</el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="11"><span class="detail-name">成为客户：</span>{{customerForm.createTime}}</el-col>
                <el-col :span="11"><span class="detail-name">地址：</span>
                    <p style="float: right;width: 78%;text-align: left">{{customerForm.address}}</p>
                </el-col>
            </el-row>
            <div class="title">印章图片展示链接:</div>
            <span>http://open.esign.cn/docs/wk/%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/</span>
            <div slot="footer" class="footer-close">
                <el-button type="primary" @click="onCancel">关 闭</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'CAdialog',
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
    },
    data () {
        return {
            getTitle: '企业CA认证信息详情',
            customerForm: {}
        }
    },
    methods: {
        onCancel () {
            this.$emit('onCancel')
        }
    }
}
</script>

<style scoped lang="scss">
.el-col {
    margin-bottom: 20px;
}
.detail-name {
    display: inline-block;
    width: 80px;
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
</style>
