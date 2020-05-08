<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>舒适度场景</span>
        </div>
        <div class="smart-time">
            <div>
                <h3>总运行时长: {{totalTime ? totalTime : '0'}} 小时</h3>
            </div>
            <div class="echart-time">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="params.startDate" :picker-options="pickerOptionsStart">
                </el-date-picker>
                <span class="ml10 mr10">-</span>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" v-model="params.endDate" :picker-options="pickerOptionsEnd">>
                </el-date-picker>
                <el-button type="primary" class="ml20" @click="onFindRuntimeR()">
                    查询
                </el-button>
            </div>
        </div>
        <div class="query-cont-row">
            <div class="query-cont-col">
                <div class="query-col-title">手机号：</div>
                <div class="query-col-input">
                    <el-input v-model="homeParams.phone" placeholder="输入手机号" maxlength="11"></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">注册时间：</div>
                <div class="query-col-input">
                    <el-date-picker type="date" :editable="false" :clearable="false"  v-model="homeParams.startDate" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerHomeDetailStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker type="date" :editable="false" :clearable="false"  v-model="homeParams.endDate" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerHomeDetailEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" @click="findCloudHomeDetailList(homeParams)">
                    查询
                </el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="[]" :pagination="{}"
                        @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
            </basicTable>
        </div>
    </div>
</template>

<script>
export default {
    name: 'comfortable',
    data () {
        return {
            homeParams: {},
            params: {},
            totalTime: '',
            tableLabel: [
                { label: '统计时间', prop: 'phone' },
                { label: '手机号', prop: 'phone' },
                { label: '所在房间', prop: 'phone' },
                { label: '总运行时长（h）', prop: 'phone' },
                { label: '恒温恒湿时长（h）', prop: 'phone' },
                { label: '智能调温时长（h)', prop: 'phone' },
                { label: '智能除湿时长（h)', prop: 'phone' }
            ]
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.smartparams.endDate
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.smartparams.startDate
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    methods: {
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onQuery () {
            console.log(1)
        },
        onFindRuntimeR () {

        }
    }
}
</script>

<style scoped lang="scss">
    .spanflex {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        span {
            flex: 1;
        }
    }
    .smart-time {
        display: flex;
        padding: 30px 12px;
        div {
            display: flex;
            flex: 1;
            align-items: center;
        }
    }
</style>
