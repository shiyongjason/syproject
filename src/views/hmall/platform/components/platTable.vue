<template>
    <div class="plat-table">
        <el-table :data="tableData"
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
                    <span v-if="scope.row.createTime">{{scope.row.createTime | formatDate('YYYY-MM-DD HH:mm:ss')}}</span>
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
                    <span v-if="scope.row.bankRegisterOpenTime">{{scope.row.bankRegisterOpenTime | formatDate('YYYY-MM-DD HH:mm:ss')}}</span>
                    <span v-else v-text="'-'"></span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="open(scope.row.organizationCode)" v-if="scope.row.status != 1">开启</el-button>
                    <el-button type="text" size="small" disabled="disabled" v-else>经营数据</el-button>
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
            </el-pagination>
        </div>
        <el-dialog
            title="开启确认"
            width="500px"
            :visible.sync="dialog"
            :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form" :label-width="'100px'">
                <el-form-item prop="phoneNumber" label="开启手机号">
                    <el-input
                        type="text"
                        maxlength="11"
                        placeholder="请输入老板手机号码"
                        :rules="{required: true,message: '请输入老板手机号码'}"
                        v-model="form.phoneNumber"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="enter('form')">确认</el-button>
                <el-button @click="dialog = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { createOpen } from '../api/index'
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
            }
        }
    },
    methods: {
        enter (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.createOpen()
                }
            })
        },
        async createOpen () {
            const params = {
                account: this.form.phoneNumber,
                createBy: this.userInfo.name,
                organizationCode: this.openId,
                status: 1 // 开启
            }
            await createOpen(params)
            this.$message({
                message: '开启成功！',
                type: 'success'
            })
            this.dialog = false
            this.onQuery()
        },
        onQuery () {
            this.$emit('onQuery')
        },
        open (id) {
            this.openId = id
            this.form.phoneNumber = ''
            this.dialog = true
        },
        handleSizeChange (val) {
            this.loading = true
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val)
        },
        handleCheckAllChange (val) {
            this.selectTh = val ? this.defaultTh : []
        },
        indexMethod (index) {
            return this.paginationData.pageSize * (this.paginationData.pageNumber - 1) + index + 1
        }
    },
    mounted () {
    }
}
</script>

<style scoped>

</style>
