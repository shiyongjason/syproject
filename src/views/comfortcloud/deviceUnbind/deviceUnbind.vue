<template>
    <div class="tags-wrapper page-body">
        <div class="page-body-cont spanflex">
            <span>设备解绑</span>
        </div>
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">手机号：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入手机号" v-model="queryParams.phone" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">设备ID：</div>
                <div class="query-col-input">
                    <el-input placeholder="输入设备ID" v-model="queryParams.iotId" maxlength="50" clearable></el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="unbindRecord">解绑记录</el-button>
                </div>
            </div>
        </div>

        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='true' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onDetail(scope.data.row)">详情</el-button>
                    <el-button class="orangeBtn" v-if="hosAuthCheck(Auths.MERCHANT_DEVICE_UNBIND)" @click="onUnbind(scope.data.row)">解绑</el-button>
                </template>
            </basicTable>
        </div>

        <el-dialog title="请输入解绑备注" :modal-append-to-body=false :append-to-body=false :visible.sync="detailDialogVisible" width="500px">
            <div class="query-col-input">
                <el-input v-model="unBindDesc" type="textarea" :rows="11" maxlength="200" show-word-limit placeholder="请输入内容">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="conformUnbind">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { bossDeviceUnbind } from '../api/index'
import * as Auths from '@/utils/auth_const'
import Vue from 'vue'
export default {
    name: 'deviceUnbind',
    data () {
        return {
            queryParams: {
                iotId: '',
                pageNumber: 1,
                pageSize: 10,
                phone: ''
            },
            Auths,
            searchParams: {},
            tableData: [],
            tableLabel: [
                { label: '绑定时间', prop: 'bindTime', formatters: 'dateTime' },
                { label: '经销商', prop: 'dealer' },
                { label: '设备ID', prop: 'iotId' },
                { label: '管理员手机', prop: 'phone' },
                { label: '设备型号名称', prop: 'typeName' }
            ],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            unBindDesc: '',
            currentDevice: null,
            detailDialogVisible: false
        }
    },
    methods: {
        ...mapActions({
            getBossCanUnbindDeviceList: 'getBossCanUnbindDeviceList'
        }),
        async onQuery () {
            await this.getBossCanUnbindDeviceList(this.searchParams)
            this.tableData = this.unbindDeivceList.records
            this.pagination = {
                pageNumber: this.unbindDeivceList.current,
                pageSize: this.unbindDeivceList.size,
                total: this.unbindDeivceList.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.searchParams.pageNumber = 1
            this.onQuery()
        },
        onDetail (val) {
            this.$router.push({
                path: '/comfortcloud/equipmentOverview/deviceDetail',
                query: {
                    iotId: val.iotId,
                    subIotId: val.iotId,
                    deviceClass: '1'
                }
            })
        },
        onUnbind (val) {
            this.currentDevice = val
            this.unBindDesc = ''
            this.detailDialogVisible = true
        },
        unbindRecord () {
            this.$router.push('/comfortCloud/equipmentOverview/unbindRecord')
        },
        async conformUnbind () {
            if (this.currentDevice) {
                if (this.unBindDesc.length === 0) {
                    this.$message.error('请输入解绑备注')
                    return
                }
                const params = {
                    iotId: this.currentDevice.iotId,
                    operator: this.userInfo.employeeName,
                    phone: this.currentDevice.phone,
                    operatorPhone: this.userInfo.phoneNumber,
                    remark: this.unBindDesc,
                    typeName: this.currentDevice.typeName
                }
                await bossDeviceUnbind(params)
                this.$message.success('解绑成功')
                this.currentDevice = null
                this.unBindDesc = ''
                this.detailDialogVisible = false
                this.onSearch()
            }
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        }
    },
    mounted () {
        this.onSearch()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            unbindDeivceList: 'canUnbindDeivceList'
        })
    }
}
</script>

<style lang="scss" scoped>
.spanflex {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
        &:first-child {
            font-size: 16px;
        }
    }
}
</style>
