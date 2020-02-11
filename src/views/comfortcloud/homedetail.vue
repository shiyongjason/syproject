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
                    <div>物联网关：{{comfortInfo.wuLianIotId | isNotBlank}}</div>
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
                            @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                    <template slot="role" slot-scope="scope">
                        {{scope.data.row.role === 0 ? '管理员' : '普通成员'}}
                    </template>
                    <template slot="action" slot-scope="scope">
                        <el-button class="orangeBtn" @click="goMemberDetail(scope.data.row)">详情</el-button>
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
                    <div>房屋面积：{{homeDetail.size + ' m²' | isNotBlank}}</div>
                    <div>家庭人口：{{homeDetail.familyPopulation | isNotBlank}}</div>
                    <div>所在楼层：{{homeDetail.floor + ' 楼' | isNotBlank}}</div>
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
                <div class="home-wrap">
                    <p>所有设备</p>
                    <div class="home-wrap-flex">
                        <template v-if="this.activeList.devices && this.activeList.devices.length > 0">
                             <span v-for="(item,index) in this.activeList.devices" :key="index">
                                {{item.deviceName}} * {{item.deviceCount}}
                            </span>
                        </template>
                        <template v-else>
                            <p class="no-device">暂无设备</p>
                        </template>
                    </div>
                </div>
                <div class="home-wrap">
                    <p>房间详情</p>
                    <div class="home-wrap-flex">
                        <span>房屋面积：
                            <template v-if="this.activeList.roomSize">
                                {{this.activeList.roomSize + 'm²'}}
                            </template>
                            <template v-else>-</template>
                        </span>
                        <span>是否有落地窗：{{this.activeList.window === 0 ? '无': '有'}}</span>
                    </div>
                </div>
                <div class="home-wrap">
                    <p>智能调温</p>
                    <div class="home-wrap-flex">
                        <span>是否启用：
                            <template v-if="this.activeList.bigSwitch">
                                {{this.activeList.bigSwitch === 0 ? '未启用' : '已启用'}}
                            </template>
                            <template v-else>-</template>
                        </span>
                        <span>目标温度：
                            <template v-if="this.activeList.targetTemperature">
                                {{this.activeList.targetTemperature + '℃' }}
                            </template>
                            <template v-else>-</template>
                        </span>
                        <span>模式：
                            <template v-if="this.activeList">
                                {{this.activeList.comfortType === 1 ? '制冷': '制热'}}
                            </template>
                            <template v-else>-</template>
                        </span>
                        <span>目标湿度：
                            <template v-if="this.activeList.targetHumidity">
                                {{this.activeList.targetHumidity + '%'}}
                            </template>
                            <template v-else>-</template>
                        </span>
                    </div>
                </div>
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
            this.homeDetail = data.data
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
        goMemberDetail (row) {
            this.$router.push({ path: '/comfortCloud/membermanage', query: { phone: row.phone } })
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
