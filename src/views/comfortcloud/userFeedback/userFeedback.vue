<template>
    <div class="page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>用户反馈</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">反馈时间： </div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startDate" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10">-</span>
                    <el-date-picker v-model="queryParams.endDate" type="datetime" value-format='yyyy-MM-dd HH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">问题类型：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.type">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="设备配网" value="设备配网"></el-option>
                        <el-option label="设备离线" value="设备离线"></el-option>
                        <el-option label="设备控制" value="设备控制"></el-option>
                        <el-option label="场景相关" value="场景相关"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="findUserFeedbackList(queryParams)">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="cloudUserFeedbackList" :pagination="cloudUserFeedbackPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange'>
                <template slot="pictureList" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onSee(scope.data.row.pictureList)" v-if="scope.data.row.pictureList&&scope.data.row.pictureList.length > 0">查看</el-button>
                    <span v-else>-</span>
                </template>
            </basicTable>
        </div>
<!--        <el-dialog-->
<!--            title="问题图片"-->
<!--            :visible.sync="dialogVisible"-->
<!--            width="30%">-->

<!--        </el-dialog>-->
        <div v-if="dialogVisible" class="dialog">
            <div class="container">
                <div class="title">问题图片</div>
                <div class="close-icon">
                    <i class="el-icon-close" @click="dialogVisible = false"></i>
                </div>
                <div class="image-container">
                    <el-image v-for="(item,index) in previewList" :src="item" :key="item" @click="makeIndex(index,item)"
                              :preview-src-list="previewListTemp" class="wrapper-image">
                    </el-image>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'userFeedback',
    data () {
        return {
            queryParams: {
                type: '全部',
                startDate: '',
                endDate: ''
            },
            tableLabel: [
                { label: '反馈人账号', prop: 'phone' },
                { label: '问题类型', prop: 'type' },
                { label: '问题描述', prop: 'note' },
                { label: '问题图片', prop: 'pictureList' },
                { label: '反馈时间', prop: 'date' },
                { label: '联系方式', prop: 'contacts' }
            ],
            tableData: [],
            pagination: {},
            dialogVisible: false,
            previewList: [],
            previewListTemp: []
        }
    },
    computed: {
        ...mapGetters({
            cloudUserFeedbackList: 'cloudUserFeedbackList',
            cloudUserFeedbackPagination: 'cloudUserFeedbackPagination'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endDate
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startDate
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    methods: {
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.findUserFeedbackList(this.queryParams)
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.findUserFeedbackList(this.queryParams)
        },
        ...mapActions({
            findUserFeedbackList: 'findUserFeedbackList'
        }),
        onSee (previewList) {
            this.dialogVisible = true
            this.previewList = previewList
            this.previewListTemp = previewList.concat()
        },
        makeIndex (index, item) {
            this.previewListTemp = this.previewList.concat()
            this.previewListTemp.splice(index, 1)
            this.previewListTemp.unshift(item)
        }
    },
    mounted () {
        this.findUserFeedbackList()
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
    .wrapper-image {
        width: 100px;
        margin-top: 20px;
        margin-right: 20px;
        /deep/.el-image-viewer__wrapper{
            width: 100%;
            height: 100%;
        }
    }
    .dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        background: rgba(0,0,0,.2);
        padding-top: 30vh;
        .container {
            margin: auto;
            width: 340px;
            padding: 20px;
            background: #ffffff;
            position: relative;
        }
        .image-container {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-right: -20px;
        }
        .close-icon{
            position: absolute;
            right: 20px;
            top: 10px;
            cursor: pointer;
            font-size: 24px;
            width: 20px;
            height: 20px;
            color: #999999;
        }
    }
</style>
