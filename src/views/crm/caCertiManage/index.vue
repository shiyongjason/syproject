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
                <div class="query-cont__col">
                    <div class="query-col__label">是否实名：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.realName" placeholder="请选择" :clearable=true>
                            <el-option label="是" :value="0"></el-option>
                            <el-option label="否" :value="1"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">创建时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.cStartTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsMax">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.cEndTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsMin">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">实名时间：</div>
                    <div class="query-col__input">
                        <el-date-picker v-model="queryParams.rStartTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsMax">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.rEndTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsMin">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onSearch()">
                        查询
                    </h-button>
                    <h-button @click="onRest()">
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
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :actionMinWidth=200 :isShowIndex='true'>
                <template slot="companyName" slot-scope="scope">
                    <span @click="onLinkCom(scope.data.row)" class="colblue">{{scope.data.row.companyName}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onDrawerinfo(scope.data.row)">查看印章</h-button>
                    <h-button table @click="onLogOut(scope.data.row)" v-show="activeName === 'enterprise'">注销</h-button>
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
import { tableLabel_person, tableLabel_enterprise } from './const'
export default {
    name: 'caCertiManage',
    data () {
        return {
            activeName: 'personage',
            copyParms: {},
            queryParams: {
                name: '',
                realName: '',
                cStartTime: '',
                cEndTime: '',
                rStartTime: '',
                rEndTime: '',
                pageNumber: 1,
                pageSize: 10
            },
            searchParams: {},
            tableLabel: tableLabel_person,
            tableData: [],
            paginationInfo: {
                pageNumber: 10,
                pageSize: 10,
                total: 100
            },
            drawer: false
        }
    },
    computed: {
        pickerOptionsMax () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.cEndTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsMin () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.cEndTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
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
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            console.log(this.searchParams)
            // 调查询接口
            if (this.activeName === 'personage') {
                this.tableLabel = tableLabel_person
                this.tableData = [{
                    name: '个人'
                }] // 个人
            }
            if (this.activeName === 'enterprise') {
                this.tableLabel = tableLabel_enterprise
                this.tableData = [{
                    name: '企业'
                }] // 企业
            }
        },
        handleClick () {
            console.log('handleClick')
            this.onQuery()
        },
        onRest () {
            this.queryParams = { ...this.copyParms }
            this.onSearch()
        },
        handleSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        handleCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        },
        onLogOut (row) {
            console.log('row: ', row)
        },
        onDrawerinfo () {
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