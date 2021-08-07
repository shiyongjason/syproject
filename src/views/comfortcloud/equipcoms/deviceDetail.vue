<template>
    <div class="page-body">
        <div class="query-cont">
            <p>设备明细</p>
            <div class="query-flex">
                <div>设备ID：{{ this.$route.query.subIotId | isNotBlank}}</div>
                <div>入网时间：{{parseInt(this.$route.query.createTime) | formatterTime}}</div>
                <div>设备状态：{{ deviceInfo.status}}</div>
                <div>经销商：{{deviceInfo.dealer | isNotBlank}}</div>
                <div>经销商电话：{{deviceInfo.dealerPhone | isNotBlank}}</div>
                <div></div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="deviceInfo.deviceLogins.content"
                        :pagination="pagination"
                        isShowIndex @onCurrentChange='onCurrentChange'
                        @onSizeChange='onSizeChange'>
                <template slot="homeName" slot-scope="scope">
                    <p @click="onShowHome(scope.data.row)" class="colred overflowhidden">{{ scope.data.row.homeName | isNotBlank }}</p>
                </template>
                <template slot="status" slot-scope="scope">
                    {{ scope.data.row.status == 1 ? '在线' : '离线' }}
                </template>
            </basicTable>
        </div>
    </div>
</template>

<script>
import { getCloudDeviceDetail, getCloudSubDeviceDetail, getHomeUser } from '../api'
import moment from 'moment'
export default {
    name: 'deviceDetail',
    data () {
        return {
            deviceInfo: {
                deviceLogins: {
                    content: []
                }
            },
            tableLabel: [
                { label: '时间', prop: 'createTime', formatters: 'dateTime' },
                { label: '设备状态', prop: 'status' },
                { label: '家庭名称', prop: 'homeName' },
                { label: '手机号', prop: 'phone' },
                { label: '网关号', prop: 'iotId' }
            ],
            pagination: {},
            queryParams: {
                iotId: '',
                subDevId: '',
                pageSize: 10,
                pageNumber: 1
            }

        }
    },
    mounted () {
        this.queryParams.iotId = this.$route.query.iotId
        this.queryParams.subDevId = this.$route.query.subIotId
        this.requestDeviceInfo(this.queryParams)
    },
    computed: {

    },
    methods: {
        async requestDeviceInfo (params) {
            let data = null
            if (this.$route.query.deviceClass === '1') {
                data = await getCloudDeviceDetail(params)
            } else {
                data = await getCloudSubDeviceDetail(params)
            }
            if (data) {
                this.deviceInfo = data.data.data
                this.pagination = {
                    pageNumber: data.data.data.deviceLogins.number + 1,
                    pageSize: data.data.data.deviceLogins.size,
                    total: data.data.data.deviceLogins.totalElements
                }
            }
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.requestDeviceInfo(this.queryParams)
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.requestDeviceInfo(this.queryParams)
        },
        async onShowHome (val) {
            if (val.homeId) {
                let { data } = await getHomeUser({ homeId: val.homeId })
                if (data.data == null) {
                    this.$message.warning('该家庭已被删除')
                } else {
                    this.$router.push({ path: '/comfortCloud/homedetail', query: { homeId: val.homeId } })
                }
            }
        }

    }
}
</script>

<style lang="scss" scoped>
    .query-cont {
    p {
        font-size: 16px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
    }

    .query-flex {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

    div {
        flex: 1;
        flex-basis: 25%;
        padding: 10px;
    }
    }
    }

    .colred {
        color: #ff7a45;
    }

    .overflowhidden {
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>
