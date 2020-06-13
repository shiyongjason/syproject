<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">SKU编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入SKU编码">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">子订单编号：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.brandName" placeholder="请输入子订单编号">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">商品类目：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入商品类目">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">商品SKU名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入商品SKU名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">会员店：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入会员店">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">所属品牌：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入所属品牌">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">订单状态：</div>
                <div class="flex-wrap-cont">
                    <el-select v-model="queryParams.status">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="审核未通过" value="2"></el-option>
                        <el-option label="过期失效" value="3"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">订单渠道：</div>
                <div class="flex-wrap-cont">
                    <el-select v-model="queryParams.status">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="审核未通过" value="2"></el-option>
                        <el-option label="过期失效" value="3"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">支付方式：</div>
                <div class="flex-wrap-cont">
                    <el-select v-model="queryParams.status">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="审核未通过" value="2"></el-option>
                        <el-option label="过期失效" value="3"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">所属商家：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入所属商家">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">下单时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.applicationTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.applicationTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">支付时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.applicationTimeStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.applicationTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" @click="onQuery">搜索</el-button>
                <el-button type="primary" @click="onReset">重置</el-button>
                <el-button type="primary" @click="onReset">导出</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">

            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { transactionInfoTableLabel } from './const'
export default {
    name: 'transactionInfo',
    data () {
        return {
            queryParams: {

            },
            tableLabel: transactionInfoTableLabel,
            tableData: [],
            paginationData: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.applicationTimeEnd
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.applicationTimeStart)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        ...mapActions([

        ]),
        init () {

        },
        onQuery () {

        },
        onReset () {

        },
        onSizeChange () {

        },
        onCurrentChange () {

        }
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
</style>
