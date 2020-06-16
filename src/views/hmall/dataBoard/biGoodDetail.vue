<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <el-tabs v-model="queryParams.processType" type="card" @tab-click="handleTabClick">
                <el-tab-pane label="普通商品" name="0"></el-tab-pane>
                <el-tab-pane label="秒杀商品" name="1"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">日期：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">SKU编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.skuCode" placeholder="请输入SKU编码">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">商品名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.skuName" placeholder="请输入商品名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">SPU编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.spuCode" placeholder="请输入SPU编码">
                    </el-input>
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
import { biGoodDetailTableLabel } from './const'
export default {
    name: 'biGoodDetail',
    data () {
        return {
            queryParams: {
                skuCode: '',
                skuName: '',
                spuCode: '',
                startTime: '',
                endTime: ''
            },
            tableLabel: biGoodDetailTableLabel,
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
                    let beginDateVal = new Date(this.queryParams.endTime)
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.startTime)
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

        },
        handleTabClick () { }
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__header {
    margin: 0;
}
.query-cont {
    margin-top: 0 !important;
}
</style>
