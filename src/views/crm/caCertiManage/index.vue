<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">姓名：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.name" placeholder="请输入姓名" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col" v-show="activeName == 'personage'">
                    <div class="query-col__label">是否实名：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.isReal" placeholder="请选择" :clearable=true>
                            <el-option label="是" :value="1"></el-option>
                            <el-option label="否" :value="0"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col" v-show="activeName == 'enterprise'">
                    <div class="query-col__label">验证方式：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.realType" placeholder="请选择" :clearable=true>
                            <el-option label="对公打款" :value="2"></el-option>
                            <el-option label="企业支付宝" :value="3"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">创建时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.createStartTime" default-time="00:00:00" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsMax">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.createEndTime" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsMin">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">实名时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.realStartTime" default-time="00:00:00" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsMax">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.realEndTime" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsMin">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onSearch()">
                        查询
                    </h-button>
                    <h-button @click="onReset()">
                        重置
                    </h-button>
                </div>
            </div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="个人CA" name="personage"></el-tab-pane>
                <el-tab-pane label="企业CA" name="enterprise"></el-tab-pane>
            </el-tabs>
            <div class="clueTips">
                <el-tag size="medium" class="eltagtop">
                    <i class="el-icon-warning"></i>
                    <span class="sub-eltag">已筛选 5 项</span>
                </el-tag>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=200 :isShowIndex='true'>
                <template slot="status" slot-scope="scope">
                    <span>{{scope.data.row.status == 3? '是' : '否'}}</span>
                </template>
                <template slot="realType" slot-scope="scope">
                    <span v-if="scope.data.row.status == 1">人脸识别</span>
                    <span v-if="scope.data.row.status == 2">对公打款</span>
                    <span v-if="scope.data.row.status == 3">企业支付宝</span>
                </template>
                <!-- 企业CA -->
                <template slot="managerType" slot-scope="scope">
                    <span>{{scope.data.row.managerType == 1 ? '经办人' : ''}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onDrawerinfo(scope.data.row)">查看印章</h-button>
                </template>
            </basicTable>
            <el-drawer title="查看信息" :visible.sync="drawer" direction="rtl" :before-close="handleClose">
                <div class="drawer-content">
                    <p>印章</p>
                    <img src="https://hosjoy-hbp.oss-cn-hangzhou.aliyuncs.com/images/20200311/5c506b71-d665-4c61-948d-3cfd3cce4140.png" alt="">
                </div>
                <div class="drawer-footer">
                    <h-button @click="drawer = false">好的</h-button>
                </div>
            </el-drawer>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { tableLabelPerson, tableLabelEnterprise } from './const'
import { getCAImageBysealId } from './api'
export default {
    name: 'caCertiManage',
    data () {
        return {
            activeName: 'personage',
            copyParms: {},
            queryParams: {
                name: '',
                isReal: '', // 个人-实名认证
                realType: '', // 企业-验证方式
                createStartTime: '',
                createEndTime: '',
                realStartTime: '',
                realEndTime: '',
                pageNumber: 1,
                pageSize: 10
            },
            searchParams: {},
            tableLabel: tableLabelPerson,
            drawer: false
        }
    },
    computed: {
        ...mapState({
            tableData: state => state.caCertiManage.tableData,
            paginationInfo: state => state.caCertiManage.paginationInfo
        }),
        pickerOptionsMax () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.createEndTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(new Date(beginDateVal).toLocaleDateString()).getTime()
                    }
                }
            }
        },
        pickerOptionsMin () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.createStartTime
                    if (beginDateVal) {
                        //  - 8.64e7
                        return time.getTime() < new Date(new Date(beginDateVal).toLocaleDateString()).getTime()
                    }
                }
            }
        }
    },
    mounted () {
        this.onSearch()
        this.copyParms = { ...this.queryParams }
    },
    methods: {
        ...mapActions({
            getPersonalCAList: 'caCertiManage/getPersonalCAList',
            getCompanyCAList: 'caCertiManage/getCompanyCAList'
        }),
        compare (startTime, endTime) {
            const start = new Date(startTime).getTime()
            const end = new Date(endTime).getTime()
            if (start && end && start > end) {
                this.$message.error('开始时间不能大于结束时间')
                return false
            }
            return true
        },
        onSearch () {
            var result = this.compare(this.queryParams.createStartTime, this.queryParams.createEndTime) && this.compare(this.queryParams.realStartTime, this.queryParams.realEndTime)
            if (result) {
                this.searchParams = { ...this.queryParams }
                this.onQuery()
            }
        },
        async onQuery () {
            // console.log(this.searchParams)
            // 调查询接口
            if (this.activeName === 'personage') {
                await this.getPersonalCAList(this.searchParams)
                this.tableLabel = tableLabelPerson
            }
            if (this.activeName === 'enterprise') {
                await this.getCompanyCAList(this.searchParams)
                this.tableLabel = tableLabelEnterprise
            }
        },
        async handleClick () {
            await this.onReset()
            this.onQuery()
        },
        onReset () {
            this.queryParams = { ...this.copyParms }
            this.onSearch()
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        async onDrawerinfo (row) {
            console.log('row: ', row)
            const params = {
                sealId: row.sealId,
                caId: row.id,
                caType: 1
            }
            await getCAImageBysealId(params)
            this.drawer = true
        },
        handleClose () {
            this.drawer = false
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__header {
    margin: 0;
}
/deep/ .el-drawer__header {
    color: #000000;
}
.clueTips {
    margin: 10px 0;
    .eltagtop {
        width: 100%;
        display: table;
        i {
            font-size: 16px;
            vertical-align: middle;
        }
        .sub-eltag {
            font-size: 16px;
            padding-left: 10px;
            vertical-align: middle;
        }
    }
}
.drawer-content {
    padding: 0 24px;
}
.drawer-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 24px;
    border-top: 1px solid #e5e5ea;
    background: #fff;
    z-index: 1000;
    text-align: right;
    button {
        flex: 1;
    }
}
</style>