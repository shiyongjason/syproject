<template>
    <div>
        <div class="page-body">
            <div class="query-cont">
                <p>家庭概览</p>
                <div class="query-flex">
                    <div>名称：{{ comfortInfo.homeName | isNotBlank}}</div>
                    <div>家庭成员数：{{comfortInfo.memberCount | isNotBlank}}</div>
                    <div>创建时间：{{ comfortInfo.createTime | formatDate}}</div>
                    <div>设备数：{{ comfortInfo.deviceCount}}</div>
                    <div>零科米网关：{{comfortInfo.linkIotId | isNotBlank}}</div>
                    <div>物联网关：{{comfortInfo.wuLianIotId}}</div>
                    <div>房间数：{{comfortInfo.roomCount}}</div>
                    <div>家庭地址：{{comfortInfo.address | isNotBlank}}</div>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="page-body page-wrap">
            <div class="page-body-cont">
                <div class="page-title">
                    <p>家庭成员</p>
                </div>
                <!-- 表格使用老毕的组件 -->
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination"
                            @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true"
                            :actionMinWidth='280'>
                    <template slot="action" slot-scope="scope">
                        <el-button class="orangeBtn" @click="onEdit(scope.data.row)">详情</el-button>
                    </template>
                </basicTable>
            </div>
        </div>
        <div class="page-body page-wrap">
            <div class="page-body-cont">
                <div class="page-title">
                    <p>房屋详情</p>
                </div>
                <div class="query-flex">
                    <div>房屋面积：{{homeDetail.size | isNotBlank}}</div>
                    <div>家庭人口：{{homeDetail.familyPopulation | isNotBlank}}</div>
                    <div>所在楼层：{{homeDetail.floor | isNotBlank}}</div>
                    <div>建筑保温层：
                        <template v-if="homeDetail.insulationLayer">
                            {{homeDetail.insulationLayer === 1 ? '无' : '有'}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div>窗户玻璃：
                        <template v-if="homeDetail.glassLayer">
                            {{homeDetail.glassLayer=== 1? '单层': '多层'}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="page-body page-wrap">
            <div class="page-body-cont">
                <el-tabs v-model="activeName" @tab-click="handleTableClick">
                    <template v-for="item in roomList">
                        <el-tab-pane :label="item.roomName" :name="item.roomName + item.roomId" :key="item.roomId"></el-tab-pane>
                    </template>
                </el-tabs>
                <template v-if="this.activeList.devices && this.activeList.devices.length > 0">
                    <div class="home-wrap" v-for="(item,index) in this.activeList.devices" :key="index">
                        <p>{{item.type | isNotBlank}}</p>
                        <div class="home-wrap-flex">
                            <span>{{item.deviceName}} * {{item.deviceCount}}</span>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <p class="no-device">暂无设备</p>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { findHomeGeneralDetails, findHomeUserList, findRoomDetail } from './api/index'

export default {
    name: 'homedetail',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            homeDetail: {},
            homePopulationDetail: {},
            tableLabel: [
                { label: '昵称', prop: 'nick' },
                { label: '手机号', prop: 'phone' },
                { label: '角色', prop: 'role' }
            ],
            tableData: [],
            pagination: {},
            activeName: '',
            activeList: [],
            comfortInfo: {},
            roomList: []
        }
    },
    mounted () {
        this.comfortInfo = JSON.parse(sessionStorage.getItem('comfortCloud'))
        this.findHomeGeneralDetails()
        this.findHomePopulationDetails()
        this.findRoomDetail()
    },
    methods: {
        // TODO 还未提供接口
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        async findHomeGeneralDetails () {
            const { data } = await findHomeGeneralDetails(this.$route.query.homeId)
            this.homeDetail = data
        },
        async findHomePopulationDetails () {
            const { data } = await findHomeUserList(this.$route.query.homeId)
            this.tableData = data.data
        },
        async findRoomDetail () {
            const { data } = await findRoomDetail(this.$route.query.homeId)
            this.roomList = data.data
            if (this.roomList.length > 0) {
                this.activeName = this.roomList[0].roomName + this.roomList[0].roomId
                this.activeList = this.roomList[0]
            }
        },
        handleTableClick (tab, event) {
            let indexTemp
            this.roomList.forEach((value, index) => {
                if (tab.paneName === value.roomName + value.roomId) {
                    indexTemp = index
                }
            })
            this.activeName = this.roomList[indexTemp].roomName + this.roomList[indexTemp].roomId
            this.activeList = this.roomList[indexTemp]
        },
        onEdit (row) {
            // todo 跳转到会员详情
            this.$router.push({ path: '/comfortCloud/homedetail', query: { id: row.id } })
        }
    }
}
</script>

<style lang='scss' scoped>
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

    .page-wrap {
        padding-top: 0;

        .page-title {
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e5e5;

            p {
                font-size: 16px;
            }
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

    .home-wrap {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        border-bottom: 1px solid #e5e5e5;

        &:last-child {
            border: none;
        }

        p {
            font-size: 16px;
            padding-bottom: 10px;
            display: block;
            font-weight: 600;
        }

        .home-wrap-flex {
            flex-direction: row;
            display: flex;
            flex-wrap: wrap;

            span {
                margin: 10px 0;
                flex-basis: 33%;
                justify-content: space-between;
            }
        }
    }

    /deep/ .el-tabs__item.is-active {
        color: #333;
        background: transparent;
    }

    /deep/ .el-tabs__header {
        margin: 0
    }
    .no-device{
        padding: 20px;
        color: #8c939d;
    }
</style>
