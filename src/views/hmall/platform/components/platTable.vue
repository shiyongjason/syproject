<template>
    <div class="page-table">
        <basicTable :isShowIndex=true :tableData="tableData" :pagination="paginationData" :tableLabel="tableLabel" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=150>
            <template slot-scope="scope" slot="status">
                {{scope.data.row.status == 1 ? '开启' : '未开启' }}
            </template>
            <template slot-scope="scope" slot="registerStatus">
                <span v-if="scope.data.row.registerStatus === 0">开通中</span>
                <span v-if="scope.data.row.registerStatus === 1">已开通</span>
                <span v-if="scope.data.row.registerStatus === 2">未开通</span>
            </template>
            <template slot-scope="scope" slot="operational">
                <el-switch v-model="scope.data.row.operational" active-color="#13ce66" @change="onTypeChange(scope.data.row.organizationCode, scope.data.row.operational, 'operational', scope.data.row)">
                </el-switch>
            </template>
            <template slot-scope="scope" slot="commodity">
                <el-switch v-model="scope.data.row.commodity" active-color="#13ce66" @change="onTypeChange(scope.data.row.organizationCode, scope.data.row.commodity, 'commodity', scope.data.row)">
                </el-switch>
            </template>
            <template slot-scope="scope" slot="autoDispatch">
                <el-switch v-if="scope.data.row.operational" v-model="scope.data.row.autoDispatch" active-color="#13ce66" @change="onAutoChange(scope.data.row.organizationCode, scope.data.row)">
                </el-switch>
                <span v-if="!scope.data.row.operational">/</span>
            </template>
            <template slot-scope="scope" slot="action">
                <el-button class="orangeBtn" @click="open(scope.data.row)" v-if="scope.data.row.status != 1">开启</el-button>
                <el-button class="orangeBtn" disabled="disabled" v-else>经营数据</el-button>
            </template>
        </basicTable>
        <!-- <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column
                type="index"
                width="80px"
                :index="indexMethod"
                align="center"
                label="序号">
            </el-table-column>
            <el-table-column
                prop="organizationName"
                align="center"
                label="公司名称">
            </el-table-column>
            <el-table-column
                prop="subsectionName"
                align="center"
                label="分部">
            </el-table-column>
            <el-table-column
                prop="province"
                align="center"
                label="省份">
            </el-table-column>
            <el-table-column
                prop="city"
                align="center"
                label="城市">
            </el-table-column>
            <el-table-column
                prop="productNum"
                align="center"
                label="上架商品数量">
            </el-table-column>
            <el-table-column
                prop="orderNum"
                align="center"
                label="成交订单数">
            </el-table-column>
            <el-table-column
                prop="memberShops"
                align="center"
                label="会员店数量">
            </el-table-column>
            <el-table-column
                align="center"
                label="B2b状态">
                <template slot-scope="scope">
                    {{scope.row.status == 1 ? '开启' : '未开启' }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="开通帐号">
                <template slot-scope="scope">
                    {{scope.row.account ? scope.row.account : '-'}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="开启时间">
                <template slot-scope="scope">
                    <span v-if="scope.row.createTime">{{scope.row.createTime | formatterTime }}</span>
                    <span v-else v-text="'-'"></span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="钱包开通状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.registerStatus === 0">开通中</span>
                    <span v-if="scope.row.registerStatus === 1">已开通</span>
                    <span v-if="scope.row.registerStatus === 2">未开通</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="开通时间">
                <template slot-scope="scope">
                    <span v-if="scope.row.bankRegisterOpenTime">{{scope.row.bankRegisterOpenTime | formatterTime}}</span>
                    <span v-else v-text="'-'"></span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="运营型商家">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.operational"
                        active-color="#13ce66"
                        @change="onTypeChange(scope.row.organizationCode, scope.row.operational, 'operational')">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="商品型商家">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.commodity"
                        active-color="#13ce66"
                        @change="onTypeChange(scope.row.organizationCode, scope.row.commodity, 'commodity')">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button class="orangeBtn" @click="open(scope.row)" v-if="scope.row.status != 1">开启</el-button>
                    <el-button class="orangeBtn" disabled="disabled" v-else>经营数据</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination
                class="el-page"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationData.pageNumber"
                :page-sizes="[10,20,30,40,50]"
                layout="total, sizes, prev, pager, next, jumper"
                :onQuery="onQuery"
                :total="paginationData.totalElements">
            </el-pagination>1
        </div> -->
        <el-dialog title="开启确认" width="500px" :visible.sync="dialog" :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form" :label-width="'100px'">
                <el-form-item prop="phoneNumber" label="开启手机号">
                    <el-input type="text" maxlength="11" placeholder="请输入老板手机号码" :rules="{required: true,message: '请输入老板手机号码'}" v-model="form.phoneNumber"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="enter('form')" :loading="isEnter">确认</el-button>
                <el-button @click="dialog = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { createOpen, updatePlatformType } from '../api/index'
import { mapState } from 'vuex'
import { PHONE } from '@/rules'
export default {
    name: 'platTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        paginationData: {
            type: Object,
            default () {
                return {
                    totalElements: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            organizationSource: '',
            openId: '',
            dialog: false,
            form: {
                phoneNumber: ''
            },
            rules: {
                phoneNumber: [
                    { required: true, message: '请输入老板手机号码', trigger: 'blur' },
                    { validator: PHONE, trigger: 'blur', whitespace: true }
                ]
            },
            isEnter: false,
            tableLabel: [
                { label: '公司名称', prop: 'organizationName' },
                { label: '分部', prop: 'subsectionName' },
                { label: '省份', prop: 'province' },
                { label: '城市', prop: 'city' },
                { label: '自有商品上架数', prop: 'productNum' },
                { label: '店铺商品上架数', prop: 'shopProductNum' },
                { label: '成交订单数', prop: 'orderNum' },
                { label: '会员店数量', prop: 'memberShops' },
                { label: 'B2b状态', prop: 'status' },
                { label: '开通帐号', prop: 'account' },
                { label: '开启时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '网商支付开通状态', prop: 'registerStatus' },
                { label: '开通时间', prop: 'bankRegisterOpenTime', formatters: 'dateTime' },
                { label: '运营型商家', prop: 'operational' },
                { label: '商品型商家', prop: 'commodity' },
                { label: '自动推至店铺', prop: 'autoDispatch' }
            ]
        }
    },
    methods: {
        enter (formName) {
            if (this.isEnter) {
                return
            }
            this.isEnter = true
            try {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.createOpen()
                        this.isEnter = false
                    } else {
                        this.isEnter = false
                    }
                })
            } catch (error) {
                this.isEnter = false
            }
        },
        async createOpen () {
            const params = {
                account: this.form.phoneNumber,
                createBy: this.userInfo.employeeName,
                organizationCode: this.openId,
                status: 1, // 开启
                organizationSource: this.organizationSource
            }
            const { data } = await createOpen(params)
            // todo 目前格式未统一
            if (data.code == 200) {
                this.$message({
                    message: '开启成功！',
                    type: 'success'
                })
                this.dialog = false
                this.onQuery()
            } else {
                this.$message({
                    message: data.message,
                    type: 'error'
                })
            }
        },
        onQuery () {
            this.$emit('onQuery')
        },
        open (row) {
            this.openId = row.organizationCode
            this.organizationSource = row.organizationSource
            this.form.phoneNumber = ''
            this.dialog = true
        },
        onSizeChange (val) {
            this.loading = true
            this.$emit('onSizeChange', val)
        },
        onCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val)
        },
        handleCheckAllChange (val) {
            this.selectTh = val ? this.defaultTh : []
        },
        indexMethod (index) {
            return this.paginationData.pageSize * (this.paginationData.pageNumber - 1) + index + 1
        },
        async onTypeChange (merchantCode, value, type, obj) {
            if (type == 'operational') {
                await updatePlatformType({
                    merchantCode: merchantCode,
                    autoDispatch: value
                })
            }
            await updatePlatformType({
                merchantCode,
                [type]: value ? 1 : 0
            })
            this.$message({ message: '商家角色设置成功', type: 'success' })
        },
        async onAutoChange (merchantCode, obj) {
            await updatePlatformType({
                merchantCode: merchantCode,
                autoDispatch: obj.autoDispatch
            })
            this.$message({ message: '自动推至店铺设置成功', type: 'success' })
        }
    },
    mounted () {
    }
}
</script>

<style scoped>
.el-button.orangeBtn {
    padding: 5px 10px;
}
</style>
