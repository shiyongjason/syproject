<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>价格管理</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">
                    <h-button type="create" class="ml20" @click="addShop">新增商品</h-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <!-- 表格使用老毕的组件 -->
            <basicTable :tableLabel="tableLabel" :tableData="cloudMerchantOrderList" :pagination="cloudMerchantOrderListPagination" :isAction="true" @onCurrentChange='onCurrentChange' isShowIndex @onSizeChange='onSizeChange'>
                <template slot="level" slot-scope="scope">
                    {{ scope.data.row.level === 1 ? '一级': '二级' }}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                    <el-button class="orangeBtn" @click="onDelete(scope.data.row)">上架</el-button>
                </template>
            </basicTable>
        </div>

        <el-dialog width="1000px" title="新增商品" :visible.sync="dialogShopEdit" :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
                <el-form-item>
                    归属品类：
                    <el-select v-model="queryParams.categoryId">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="全部" value=""></el-option>

                        <!-- <el-option :label="item.dataValue" :value="item.dataKey" v-for="item in cloudDict" :key="item.dataKey"></el-option> -->
                    </el-select>
                    商品型号：
                    <el-select v-model="queryParams.categoryId">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="全部" value=""></el-option>

                        <!-- <el-option :label="item.dataValue" :value="item.dataKey" v-for="item in cloudDict" :key="item.dataKey"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称：">
                    <el-input maxlength="10" style="width: 300px" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品图片：">
                    <SingleUpload :upload="uploadInfo" :imageUrl="imageUrl" ref="uploadImg" @back-event="readUrl" :imgW="100" :imgH="100" />
                    <div class="upload-tips">
                        建议尺寸：172*1728图片，1M以内，支持jpeg,png和jpg格式
                    </div>
                </el-form-item>
                <el-form-item>
                    <h3>价格设置：</h3>
                    零售价
                    <el-input maxlength="10" style="width: 100px" placeholder="填写价格"></el-input> 元
                </el-form-item>
                <el-form-item>
                    销售价：
                    <el-input v-model.number='num' maxlength="10" style="width: 100px" placeholder="填写价格"></el-input> 元
                    商品ID：
                    <el-input maxlength="10" style="width: 250px" placeholder="输入和微信小店一致的商品ID"></el-input>
                    商品链接：
                    <el-input maxlength="10" style="width: 250px" placeholder="输入和微信小店一致的商品链接"></el-input>
                </el-form-item>
                <el-form-item>
                    二级经销商价格：
                    <el-input v-model.number='num' maxlength="10" style="width: 100px" placeholder="填写价格"></el-input> 元
                    商品ID：
                    <el-input maxlength="10" style="width: 250px" placeholder="输入和微信小店一致的商品ID"></el-input>
                    商品链接：
                    <el-input maxlength="10" style="width: 250px" placeholder="输入和微信小店一致的商品链接"></el-input>
                </el-form-item>
                <el-form-item>
                    一级经销商价格：
                    <el-input maxlength="10" style="width: 100px" placeholder="填写价格"></el-input> 元
                    商品ID：
                    <el-input maxlength="10" style="width: 250px" placeholder="输入和微信小店一致的商品ID"></el-input>
                    商品链接：
                    <el-input maxlength="10" style="width: 250px" placeholder="输入和微信小店一致的商品链接"></el-input>
                </el-form-item>
                <el-form-item label="佣金设置：">
                    <el-input maxlength="10" style="width: 100px" placeholder="填写佣金比例"></el-input>%
                </el-form-item>
                <!-- <el-form-item label="零售价">

                </el-form-item>
                <el-form-item label="销售价">
                </el-form-item> -->
                <!-- <el-form-item label="品牌编号" v-if="this.status === 'modify'">
                    {{form.code}}
                </el-form-item>
                <el-form-item prop="name" label="品牌名称">
                    <el-input v-model="form.name" maxlength="10" style="width: 300px" placeholder="请输入品牌中文名称"></el-input>
                </el-form-item>
                <el-form-item prop="englishName" label="英文名称">
                    <el-input v-model="form.englishName" placeholder="请输入英文名称" maxlength="25" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item prop="logoUrl" label="品牌logo">
                    <SingleUpload :upload="uploadInfo" :imageUrl="imageUrl" ref="uploadImg" @back-event="readUrl" />
                    <div class="upload-tips">
                        尺寸300x300,2m以内，支持jpg、jpeg、png
                    </div>
                </el-form-item>
                <el-form-item prop="description" label="品牌描述">
                    <el-input type="textarea" maxlength="100" placeholder="100字以内" v-model="form.description" style="width: 300px;" :rows="5"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <h-button @click="dialogShopEdit = false">取 消</h-button>
                <h-button type="primary" @click="submitForm('form')" :loading="isSaving">保 存</h-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'merchantPriceManage',
    data () {
        return {
            queryParams: {
                payNo: '',
                status: '',
                payStartDate: '',
                payEndDate: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableLabel: [
                { label: '创建时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '订单号', prop: 'payNo' },
                { label: '省', prop: 'provinceName' },
                { label: '市', prop: 'cityName' },
                { label: '联系地址', prop: 'contactAddress' },
                { label: '代理级别', prop: 'level' },
                { label: '代理品类', prop: 'categoryName' },
                { label: '订单状态', prop: 'status' }],
            dialogShopEdit: false
        }
    },
    mounted () {
        this.queryList(this.queryParams)
    },
    computed: {
        ...mapGetters({
            cloudMerchantOrderList: 'cloudMerchantOrderList',
            cloudMerchantOrderListPagination: 'cloudMerchantOrderListPagination'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.payEndDate
                    if (beginDateVal) {
                        return (time.getTime() > new Date(beginDateVal).getTime()) || (time.getTime() > Date.now())
                    }
                    return time.getTime() > Date.now()
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.payStartDate
                    if (beginDateVal) {
                        return (
                            (time.getTime() < new Date(beginDateVal).getTime()) || (time.getTime() > Date.now())
                        )
                    }
                    return time.getTime() > Date.now()
                }
            }
        }
    },
    methods: {
        ...mapActions({
            findCloudMerchantOrderList: 'findCloudMerchantOrderList'
        }),
        addShop: function () {
            // 新增商品
            this.dialogShopEdit = true
        },
        onCurrentChange: function (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.queryList(this.queryParams)
        },
        onSizeChange: function (val) {
            this.queryParams.pageSize = val
            this.queryList(this.queryParams)
        },
        queryList: function (params) {
            this.findCloudMerchantOrderList(params)
        },
        payStatus: function (status) {
            if (status === 0) {
                // 已支付
                return '未支付'
            } else if (status === 10) {
                // 未支付
                return '已支付'
            } else if (status === 15) {
                // 已取消
                return '已取消'
            } else if (status === 30) {
                // 已退款
                return '已退款'
            }
        }
    }
}
</script>

<style scoped>
.upload-tips {
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
    height: 100px;
    padding-left: 10px;
}
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}

.address {
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
