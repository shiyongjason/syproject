<template>
    <div class="drawer-wrap">
        <el-drawer title="客户详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='40%' :before-close="handleClose" :wrapperClosable=false>
            <div class="drawer-content">
                <div class="drawer-cont" v-if="modelType==1">
                    <div class="drawer-cont_top">
                        <img :src="wxUserForm.avatar?wxUserForm.avatar:require('../../../../assets/images/hosjoy_logo48@2x.png')" alt="">
                        {{wxUserForm.name||'-'}}
                    </div>
                    <div class="drawer-cont_text">
                        <h3 class="drawer-cont_text-tit">注册信息</h3>
                        <div class="drawer-cont_text-info">是否注册：{{wxUserForm.register?'是':'否'}}</div>
                        <div class="drawer-cont_text-info">注册账号：<span>{{wxUserForm.mobile||'-'}}</span></div>
                    </div>
                    <div class="drawer-cont_text">
                        <h3 class="drawer-cont_text-tit">基本信息</h3>
                        <div class="drawer-cont_text-info">性别：{{wxUserForm.gender==1?'男':wxUserForm.gender==0?'女':'-'}}</div>
                        <div class="drawer-cont_text-info">电话：<i v-for="(item,index) in wxUserForm.remarkMobile" :key="index">{{item}}</i> <em v-if="!wxUserForm.remarkMobile">-</em></div>
                        <div class="drawer-cont_text-info">添加人：{{wxUserForm.psnname||'-'}}</div>
                        <div class="drawer-cont_text-info">添加时间：{{wxUserForm.createTime|formatterTimes}}</div>
                        <div class="drawer-cont_text-info">类型：{{wxUserForm.type==1?'微信':"企业微信"}}</div>
                        <div class="drawer-cont_text-info">企业：{{wxUserForm.corpFullName||'-'}}</div>
                    </div>
                    <div class="drawer-cont_text">
                        <h3 class="drawer-cont_text-tit">标签</h3>
                        <div v-for="(item,index) in wxUserForm.tagList" :key="index">
                            <div class="drawer-cont_text-info">{{item.groupName}}：<i>{{item.tagName}}</i></div>

                        </div>
                    </div>
                </div>
                <div class="drawer-table" v-if="modelType==2">
                    <div class="drawer-table_search">
                        <div class="drawer-table_search-title">添加时间：</div>
                        <div class="drawer-table_search-input">
                            <el-date-picker v-model="modelParams.minCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="开始日期" :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            <span>-</span>
                            <el-date-picker v-model="modelParams.maxCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="结束日期" :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </div>
                        <h-button type='primary' @click="onFindallPage()">查询</h-button>
                        <h-button type='primary' @click="onRest">重置</h-button>
                    </div>
                    <h3>数据</h3>

                    <div class="drawer-table_row">
                        <div class="drawer-table_col"><b>{{staticInfo.memberNum}}</b>
                            <p>企业微信客户数（个）</p>
                        </div>
                        <div class="drawer-table_col"><b>{{staticInfo.registerMemberNum}}</b>
                            <p>注册用户（个）</p>
                        </div>
                        <div class="drawer-table_col"><b>{{staticInfo.conversionRate}}</b>
                            <p>注册转化率（%）</p>
                        </div>
                    </div>
                    <h-button type='assist' @click="onExport">导出数据分析</h-button>
                    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                        <el-tab-pane label="按分部" name="first"></el-tab-pane>
                        <el-tab-pane label="按员工" name="second"></el-tab-pane>
                    </el-tabs>
                    <!-- <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='pagination' @onCurrentChange='handleCurrentChange' @onSizeChange='handleSizeChange' isShowIndex>
                    </basicTable> -->
                    <hosJoyTable isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="modelParams.pageNumber" :pageSize.sync="modelParams.pageSize" :total="paginationInfo.total" @pagination="()=>onFindallPage()"
                        actionWidth='300' :isAction=false :isActionFixed='tableData&&tableData.length>0' @sort-change='sortChange'>
                    </hosJoyTable>
                </div>
                <div class="drawer-footer">
                    <div class="drawer-button">
                        <h-button @click="drawer=false">取 消</h-button>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { interfaceUrl } from '@/api/config'
import { mapState, mapGetters, mapActions } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
export default {
    name: 'userOrdepart',
    data () {
        return {
            drawer: false,
            activeName: 'first',
            modelParams: {
                maxCreateTime: '',
                minCreateTime: '',
                pageNumber: 1,
                pageSize: 5
            },
            tableLabel: [

            ],
            tableDepart: [{ label: '分部', prop: 'deptName' },
                { label: '企业微信客户数', prop: 'memberNum' },
                { label: '注册用户数', prop: 'registerMemberNum' },
                { label: '注册转化率', prop: 'conversionRate' }],
            tableUser: [
                { label: '员工', prop: 'psnname' },
                { label: '企业微信客户数', prop: 'memberNum' },
                { label: '注册用户数', prop: 'registerMemberNum' },
                { label: '注册转化率', prop: 'conversionRate' }
            ],
            pagination: {},
            tableData: [],
            modelType: 1,
            staticInfo: {},
            paginationInfo: {},
            wxUser: {},
            wxUserForm: {}
        }
    },
    components: {
        hosJoyTable
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            wxMemberloan: 'wxMember/wxMemberloan',
            wxDepartstatic: 'wxMember/wxDepartstatic',
            wxUserstatic: 'wxMember/wxUserstatic',
            wxMemberUser: 'wxMember/wxMemberUser'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.modelParams.maxCreateTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.modelParams.minCreateTime
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    methods: {
        ...mapActions({
            findwxMemberloan: 'wxMember/findwxMemberloan',
            findDepartstatic: 'wxMember/findDepartstatic',
            findUserstatic: 'wxMember/findUserstatic',
            findWxmemberUser: 'wxMember/findWxmemberUser'
        }),
        onFindCustomer (type, val) {
            this.modelType = type
            this.wxUserForm = {}
            if (val) {
                this.wxUser = {
                    externalUserid: val.externalUserid,
                    wxCorpUserId: val.wxCorpUserId
                }
            }
            this.onFindallPage(() => {
                this.drawer = true
            })
        },
        handleClose () {
            this.drawer = false
        },
        handleClick (tab, index) {
            this.modelParams.pageNumber = 1
            this.onFindallPage()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onFindallPage()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onFindallPage()
        },
        async onFindallPage (callback) {
            if (this.modelType == 1) {
                await this.onFindWxmemberUser(this.wxUser)
                this.wxUserForm = this.wxMemberUser
            } else {
                await this.findwxMemberloan(this.modelParams)
                this.staticInfo = this.wxMemberloan
                if (this.activeName == 'first') {
                    this.tableLabel = this.tableDepart
                    await this.findDepartstatic(this.modelParams)
                    this.tableData = this.wxDepartstatic.records
                    this.paginationInfo = {
                        pageNumber: this.wxDepartstatic.current,
                        pageSize: this.wxDepartstatic.size,
                        total: this.wxDepartstatic.total
                    }
                } else {
                    this.tableLabel = this.tableUser
                    await this.findUserstatic(this.modelParams)
                    this.tableData = this.wxUserstatic.records
                    this.paginationInfo = {
                        pageNumber: this.wxUserstatic.current,
                        pageSize: this.wxUserstatic.size,
                        total: this.wxUserstatic.total
                    }
                }
            }
            if (callback) {
                callback()
            }
        },
        async onFindWxmemberUser () {
            await this.findWxmemberUser(this.wxUser)
        },
        onExport () {
            let url = ''
            for (const key in this.modelParams) {
                if (this.modelParams[key] !== '') {
                    url += (`${key}=${this.modelParams[key]}&`)
                }
            }
            if (this.activeName == 'first') {
                window.location = interfaceUrl + 'memeber/wx/company/member/department/export?' + url
            } else {
                window.location = interfaceUrl + 'memeber/wx/company/member/users/export?' + url
            }
        },
        onRest () {
            this.modelParams.minCreateTime = ''
            this.modelParams.maxCreateTime = ''
            this.onFindallPage()
        },
        sortChange (e) {

        }
    },
    mounted () {

    }
}
</script>
<style  lang="scss" scoped>
/deep/ .el-drawer__body {
    overflow-y: scroll;
}
.drawer-content {
    padding: 0 20px 100px 20px;
    .drawer-cont {
        &_top {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 10px;
            img {
                width: 50px;
                height: 50px;
                margin-right: 15px;
                border-radius: 50%;
            }
        }
        &_text {
            margin-top: 25px;
            line-height: 30px;
            &-tit {
                color: #ff7a45;
                font-size: 15px;
            }
            &-info {
                span {
                    color: #ff7a45;
                }
                i {
                    background: #e5e5e5;
                    color: #ff7a45;
                    font-style: normal;
                    border-radius: 2px;
                    padding: 0 5px;
                    font-size: 12px;
                }
            }
        }
    }
    .drawer-table {
        h3 {
            margin-top: 15px;
        }
        &_search {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 15px;
            &-input {
                margin-right: 10px;
            }
        }
        &_row {
            display: flex;
        }
        &_col {
            flex-direction: column;
            display: flex;
            justify-content: center;
            flex: 1;
            border: 1px solid #d2cac8;
            text-align: center;
            margin: 20px;
            padding-bottom: 10px;
            b {
                color: #ff7a45;
                padding: 20px 0;
                font-size: 24px;
            }
        }
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
        button {
            flex: 1;
        }
        .drawer-button {
            text-align: right;
        }
    }
}
/deep/ .el-tabs {
    margin-top: 15px;
}
</style>
