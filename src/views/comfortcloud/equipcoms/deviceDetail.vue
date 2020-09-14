<template>
    <div class="page-body">
        <div class="query-cont">
            <p>设备明细</p>
            <div class="query-flex">
                <div>设备ID：{{ this.$route.query.subIotId | isNotBlank}}</div>
                <div>入网时间：{{deviceInfo.createTime | formatterTime}}</div>
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
            </basicTable>
        </div>
    </div>
</template>

<script>
import { getCloudDeviceDetail, getCloudSubDeviceDetail } from '../api'

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
                    pageSize: data.data.data.deviceLogins.pageable.pageSize,
                    pageNumber: data.data.data.deviceLogins.pageable.pageNumber,
                    total: data.data.data.deviceLogins.totalElements
                }
            }
        },
        onCurrentChange (val) {
            this.deviceDetailParams.pageNumber = val.pageNumber
            this.requestDeviceInfo(this.queryParams)
        },
        onSizeChange (val) {
            this.deviceDetailParams.pageSize = val
            this.requestDeviceInfo(this.queryParams)
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
</style>
