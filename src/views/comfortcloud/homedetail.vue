<template>
    <div>
        <div class="page-body">
            <div class="query-cont">
                <p>家庭概览</p>
                <div class="query-flex">
                    <div>名称：我的家</div>
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
                <el-tabs v-model="activeName" @tab-click="handleClick">
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
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
export default {
    name: 'homedetail',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '昵称', prop: 'productN' },
                { label: '手机号', prop: 'platformTypeN', width: '120px' },
                { label: '角色 ', prop: 'versionCode' }
            ]
        }
    },
    watch: {

    },
    mounted () {
        this.onSearch()
    },
    methods: {
        async onQuery () {
            // console.log(this.searchParams)
            const { data } = await getAppVersionList(this.searchParams)
            // console.log(data)
            this.tableData = data.data.list
            this.pagination = {
                pageNumber: data.data.pageNum,
                pageSize: data.data.pageSize,
                total: data.data.total
            }
            this.tableData.map(i => {
                i.productN = i.product == 1 ? '单分享' : i.product == 2 ? 'IOT' : i.product
                i.platformTypeN = i.platformType == 1 ? '安卓' : i.platformType == 2 ? '苹果' : i.platformType
                i.forcedN = i.forced ? '是' : '否'
            })
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onReset () {
            this.$set(this.queryParams, 'product', '')
            this.$set(this.queryParams, 'platformType', '')
            this.$set(this.queryParams, 'beginDate', '')
            this.$set(this.queryParams, 'endDate', '')
            this.onSearch()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
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
    padding-top: 0px;
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
