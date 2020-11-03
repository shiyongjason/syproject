<template>
    <el-drawer title="查看信息" :visible.sync="drawer" :with-header="false" :wrapperClosable="false" :before-close="onCancel">
        <div class="p20">
            <div class="subtitle">基本信息</div>
            <div class="baseInfo">
                <div>
                    <span>经办人: {{customerForm.legalName}}</span>
                    <h-button table>查看认证信息</h-button>
                    <h-button table>查看CA信息</h-button>
                </div>

                <p>企业</p>
                <div>
                    <span>{{customerForm.companyName}}</span>
                    <h-button table>查看认证信息</h-button>
                </div>
            </div>

            <div class="subtitle">印章</div>
            <div v-if="customerForm.companySealImage" class="showPicture">
                <a :href="customerForm.companySealImage" target="_blank">
                    <img :src="customerForm.companySealImage" alt="印章图片">
                </a>
            </div>
            <div v-else>无</div>
        </div>
    </el-drawer>
</template>

<script>
export default {
    name: 'drawer',
    props: {
        drawer: {
            type: Boolean,
            default: false
        },
        customerForm: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        onCancel () {
            this.$emit('onCancel')
        }
    },
    mounted () {
        console.log('shy')
        console.log(this.customerForm)
    }
}
</script>

<style lang='scss' scoped>
/deep/ .el-drawer__header {
    margin: 0;
    padding: 20px 30px;
    border-bottom: 1px solid #999999;
    span {
        font-weight: 700;
        font-size: 20px;
        color: #000;
    }
}
.p20 {
    padding: 0 20px;
    .subtitle {
        font-size: 16px;
        margin: 10px 0;
        font-weight: 700;
    }
    .baseInfo {
        font-size: 16px;
        div {
            line-height: 40px;
            height: 40px;
            span {
                padding-right: 10px;
                vertical-align: middle;
            }
        }
        div:last-child {
            margin-bottom: 20px;
        }
    }
    .showPicture {
        width: 200px;
        height: 200px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>