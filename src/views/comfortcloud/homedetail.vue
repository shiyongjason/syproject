<template>
    <div>
        <div class="page-body">
            <div class="query-cont">
                <p>家庭概览</p>
                <div class="query-flex">
                    <div>名称：{{ homeDetail.familyPopulation | isNotBlank}}</div>
                    <div>家庭成员数：4</div>
                    <div>创建时间：2019-08-08</div>
                    <div>设备数：2</div>
                    <div>零科米网关：-----</div>
                    <div>物联网关：50294D104DAC</div>
                    <div>房间数：5</div>
                    <div>家庭地址：江苏省南京市玄武区五星股大厦</div>
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
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true" :actionMinWidth='280'>
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
                    <div>房屋面积：100 m²</div>
                    <div>家庭人口：4</div>
                    <div>所在楼层：17楼</div>
                    <div>建筑保温层：有</div>
                    <div>窗户玻璃：单层</div>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="page-body page-wrap">
            <div class="page-body-cont">
                <el-tabs v-model="activeName" @tab-click="handleTableClick">
                    <el-tab-pane label="用户管理" name="first"></el-tab-pane>
                    <el-tab-pane label="配置管理" name="second"></el-tab-pane>
                    <el-tab-pane label="角色管理" name="third"></el-tab-pane>
                    <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
                </el-tabs>
                <div class="home-wrap">
                    <p>所有设备</p>
                    <div class="home-wrap-flex">
                        <span>温湿度传感器 * 3</span>
                        <span>空调内机 * 1</span>
                        <span>人体移动传感器 * 2</span>
                    </div>
                </div>
                <div class="home-wrap">
                    <p>所有设备</p>
                    <div class="home-wrap-flex">
                        <span>温湿度传感器 * 3</span>
                        <span>空调内机 * 1</span>
                        <span>人体移动传感器 * 2</span>
                        <span>人体移动传感器 * 2</span>
                    </div>
                </div>
                <div class="home-wrap">
                    <p>所有设备</p>
                    <div class="home-wrap-flex">
                        <span>温湿度传感器 * 3</span>
                        <span>空调内机 * 1</span>
                        <span>人体移动传感器 * 2</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { findHomeGeneralDetails, findHomePopulationDetails } from './api/index'
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
            activeName: 'first'
        }
    },
    mounted () {
        this.findHomeGeneralDetails()
        this.findHomePopulationDetails()
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
            console.log(this.$route.query.homeId)
            const { data } = await findHomeGeneralDetails(this.$route.query.homeId)
            this.homeDetail = data
        },
        async findHomePopulationDetails () {
            console.log(this.$route.query.homeId)
            const { data } = await findHomePopulationDetails(this.$route.query.homeId)
            this.tableData = data.data
        },
        handleTableClick () {

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
/deep/ .el-tabs__header{
    margin: 0
}
</style>
