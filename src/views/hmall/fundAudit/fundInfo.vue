<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="auto">
                <div class="table-cont-title big-title">
                    <span class="table-title-name">代采订单号：{{}}</span>
                </div>
                <div class="table-cont-title">
                    <span class="table-title-name">供应商信息</span>
                </div>
                <div style="display:flex;flex-wrap: wrap;">
                    <el-form-item label="供应商名称：" prop="name">
                        <el-input class="form-input_big" v-model="form.name" maxlength="100" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="供应商付款银行账号：" prop="showName" class="ml20">
                        <el-input class="form-input_big" v-model="form.showName" maxlength="100" disabled></el-input>
                    </el-form-item>
                </div>
                <div class="table-cont-title">
                    <span class="table-title-name">采购入仓仓库及收货人</span>
                </div>
                <div style="display:flex;flex-wrap: wrap;">
                    <el-form-item label="选择仓库：" prop="parameter1">
                        <el-cascader class="area-cascader" :append-to-body="false" v-model="entrepotList" :options="provinceData" :props="provinceProps" @change="onChangeProvince" disabled></el-cascader>
                    </el-form-item>
                    <el-form-item label="收货确认人姓名：" prop="parameter2">
                        <el-input class="form-input_big" v-model="form.parameter2" maxlength="100" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="确认人电话：" prop="parameter2">
                        <el-input class="form-input_big" v-model="form.parameter2" maxlength="100" disabled></el-input>
                    </el-form-item>
                </div>
                <div class="table-cont-title">
                    <span class="table-title-name">采购商品清单</span>
                </div>
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :isMultiple="false" :isShowIndex='true' :isfiexd="'right'" :isShowSum="true" :getSum="getSum" class="mt20 mb20">
                </basicTable>
                <el-form-item label="代采订单总金额：" prop="remark">
                    <el-input class="form-input_big" v-model="form.parameter2" maxlength="100" disabled></el-input>
                </el-form-item>
                <el-form-item label="待付款金额：" prop="remark">
                    <el-input class="form-input_big" v-model="form.parameter2" maxlength="100" disabled></el-input>
                </el-form-item>
                <el-form-item label="需商家预付金额：" prop="remark">
                    <el-input class="form-input_big" v-model="form.parameter2" maxlength="100" disabled></el-input>
                </el-form-item>
                <el-form-item label="付款方式：" prop="parameter1">
                    <el-cascader class="area-cascader" :append-to-body="false" v-model="entrepotList" :options="provinceData" :props="provinceProps" @change="onChangeProvince" disabled></el-cascader>
                </el-form-item>
                <el-form-item label="备注信息：" prop="remark">
                    <el-input type="textarea" v-model="form.remark" maxlength="50" disabled>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="pageType == 'auditFundList'" label="订单最终回款日期：" prop="authenticationStartTime">
                    <el-input class="form-input_big" v-model="form.auditFundList" maxlength="50">
                    </el-input>
                </el-form-item>
                <div style="display:flex;" v-if="pageType == 'auditFundList'">
                    <el-form-item label="审核：" prop="type">
                        <el-radio-group v-model="form.merchantType">
                            <el-radio :label="1">通过</el-radio>
                            <el-radio :label="2">不通过</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="原因：">
                        <el-input v-model="form.shopName" maxLength="60" prop='' placeholder="请输入原因"></el-input>
                    </el-form-item>
                </div>
                <basicTable :tableData="tableDataLog" :tableLabel="tableLabelLog" :isMultiple="false" class="mt20 mb20" v-if="pageType == 'auditFundStatus'">
                </basicTable>
            </el-form>
        </div>
        <div class="page-body-cont btn-cont fr">
            <h-button @click="onCancel()">取消</h-button>
            <h-button type='primary' @click="onSave()" v-if="pageType == 'auditFundList'">确定</h-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'fundInfo',
    data () {
        return {
            pageType: '',
            entrepotList: {},
            brandOption: [],
            templateOption: [],
            categoryOption: [],
            provinceData: [],
            provinceProps: {
                multiple: true
            },
            props: {
                multiple: true,
                emitPath: false,
                value: 'id',
                label: 'name',
                children: 'subCategoryList'
            },
            form: {},
            rules: {},
            tableLabel: [
                { label: 'SPU编码', prop: 'spuCode' },
                { label: '商品名称', prop: 'spuName' },
                { label: '品牌', prop: 'brandName' },
                { label: '型号', prop: 'model' },
                { label: '单位', prop: 'saleableStock' },
                { label: '需求数量', prop: 'activityStock' },
                { label: '含税单价', prop: 'attachmentCount' },
                { label: '含税金额', prop: 'isShared' }
            ],
            tableData: [],
            tableLabelLog: [
                { label: '时间', prop: 'spuCode' },
                { label: '操作人', prop: 'spuName' },
                { label: '操作内容', prop: 'brandName' }
            ],
            tableDataLog: []
        }
    },
    computed: {
        ...mapState({
        })
    },
    methods: {
        init () {
            this.pageType = this.$route.query.pageType
        },
        onSave () {
        },
        onCancel () {
            history.go(-1)
            this.setNewTags((this.$route.fullPath).split('?')[0])
        },
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        async getSkuInfo () {
        },
        onChangeProvince (value) {
        },
        // 商家明细合计
        getSum (param) {
            const { columns, data } = param
            const sums = []
            columns.forEach((column, index) => {
                if (index == 0) {
                    sums[index] = '合计'
                }
                // 含税金额
                if (column.property == 'totalAmount') {
                    sums[index] = this.childOrderStatistics.totalAmount
                }
            })
            return sums
        }
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
.form-item-title {
    margin-bottom: 20px;
    font-size: 16px;
    color: #666666;
}

.avatar-uploader {
    display: inline-block;
    margin-right: 20px;
}

.mask {
    position: absolute;
    width: 102px;
    height: 102px;
    border-radius: 4px;
    background: #000;
    opacity: 0.65;
    z-index: -1;
}

.mask-btn {
    position: absolute;
    width: 102px;
    height: 102px;
    border-radius: 4px;
    z-index: -1;
    span {
        float: left;
        cursor: pointer;
        margin-left: 14px;
        padding: 0px 12px;
        height: 22px;
        line-height: 22px;
        color: #fff;
        font-size: 12px;
        border-radius: 4px;
        background: $hosjoyColor;

        &:nth-child(1) {
            margin-top: 22px;
        }
        &:nth-child(2) {
            margin-top: 14px;
        }

        &:hover {
            background: $hosjoyColorHover;
        }
        &:active {
            background: $hosjoyColorActive;
        }
    }
}

/deep/ .el-collapse {
    &-item {
        &:last-child {
            .el-collapse-item__header {
                border-bottom: none;
            }
        }
    }
}

.remove {
    margin-left: 10px;
    font-size: 20px;
    color: $hosjoyColor;
}

.stock-input {
    width: 160px;
}

.header-icon {
    margin-left: 10px;
}

.empty-area-setting {
    text-align: center;
}

.regional-cont {
    &-row {
        display: flex;
        flex-wrap: wrap;
    }

    &-col {
        flex-basis: calc(100% / 3);
        margin-bottom: 20px;
    }
}
</style>
