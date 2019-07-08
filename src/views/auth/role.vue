<template>
    <div class="page-body">

        <div class="role">
            <div class="h-page-title">
                基本信息
            </div>
            <div class="h-page-flex">
                <div class="flex-col">
                    <div class="flex-row">姓名：{{roleInfo.psnname}}</div>
                    <div class="flex-row">工号：{{roleInfo.psncode}}</div>
                </div>
                <div class="flex-col">
                    <div class="flex-row">用户名：{{roleInfo.mobile}}</div>
                    <div class="flex-row">所属部门：{{roleInfo.deptName}}</div>
                </div>
            </div>
            <div class="h-page-title">
                权限管理
            </div>
            <div class="h-roletable">
                <table class="tablelist">
                    <thead>
                        <tr>
                            <td width="20%">一级菜单</td>
                            <td width="20%">二级菜单</td>
                            <td
                                width="60%"
                                colspan=3
                            >权限</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item) in tableList">
                            <template v-for="(itema) in item.childAuthList">
                                <tr
                                    v-for="(itemb,indexb) in itema.childAuthList"
                                    :key="indexb+'_'+itemb.id?itemb.id:item.id"
                                >
                                    <td
                                        :rowspan="item.total"
                                        v-if="itemb.sort==0"
                                    >
                                        <el-checkbox
                                            v-model="item.have"
                                            @change="onCheckboxChange([item], item.have)"
                                        >{{item.authName}}</el-checkbox>
                                    </td>
                                    <td
                                        :rowspan="itema.childAuthList.length"
                                        v-if="indexb==0"
                                    >
                                        <div v-if="itema.authName">
                                            <el-checkbox
                                                v-model="itema.have"
                                                @change="onCheckboxChange([item, itema], itema.have)"
                                            >{{itema.authName}}</el-checkbox>
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="itemb.authName">
                                            <el-checkbox
                                                v-model="itemb.have"
                                                @change="onCheckboxChange([item, itema, itemb], itemb.have)"
                                            >{{itemb.authName}}</el-checkbox>
                                        </div>
                                    </td>
                                    <td>
                                        <div :class="!(item.have&&(itema.authName?itema.have:true)&&(itemb.authName?itemb.have:true))?'gryrole':''">
                                            <el-checkbox
                                                v-if="itemb.childAuthList.length>0"
                                                v-model="itemb.childAuthList[0].allhave"
                                                @change="onSearchRole(itemb.childAuthList[0].allhave,itemb)"
                                                :disabled="!itemb.have"
                                            >查询</el-checkbox>
                                            <div class="el-radio-group">
                                                <button
                                                    :disabled="!itemb.childAuthList[0].allhave"
                                                    v-if="itemb.childAuthList[0]"
                                                    class="el-radio-button__inner"
                                                    :class="itemb.childAuthList[0].status==0?'taborg':''"
                                                    @click="changeTabs(0,itemb)"
                                                >全部</button>
                                                <button
                                                    :disabled="!itemb.childAuthList[0].allhave"
                                                    v-if="itemb.childAuthList[0]"
                                                    class="el-radio-button__inner"
                                                    :class="itemb.childAuthList[0].status==1?'taborg':''"
                                                    @click="changeTabs(1,itemb)"
                                                >配置</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div :class="!(item.have&&itema.have&&itemb.have)?'gryrole':''">
                                            <el-checkbox
                                                v-if="itemb.childAuthList.length>0"
                                                v-model="itemb.childAuthList[1].operateHave"
                                                @change="onOperateRole(itemb.childAuthList[1].operateHave,itemb)"
                                                :disabled="!itemb.have"
                                            >操作</el-checkbox>
                                            <div class="el-radio-group">
                                                <button
                                                    :disabled="!itemb.childAuthList[1].operateHave"
                                                    v-if="itemb.childAuthList[1]"
                                                    class="el-radio-button__inner"
                                                    :class="itemb.childAuthList[1].status==0?'taborg':''"
                                                    @click="changeTwoTabs(0,itemb,itema)"
                                                >全部</button>
                                                <button
                                                    :disabled="!itemb.childAuthList[1].operateHave"
                                                    v-if="itemb.childAuthList[1]"
                                                    class="el-radio-button__inner"
                                                    :class="itemb.childAuthList[1].status==1?'taborg':''"
                                                    @click="changeTwoTabs(1,itemb,itema)"
                                                >配置</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>

        </div>
        <div
            class="h-foot"
            :class="isCollapse?'minLeft':'maxLeft'"
        >
            <el-button
                name="white-color"
                @click="onCancelRole()"
            >取消</el-button>
            <el-button name="green-color">另存为模板</el-button>
            <el-button
                name="hosjoy-color"
                @click="onSaveRole()"
            >保存</el-button>
        </div>
        <el-dialog
            title="查询配置"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal='false'
        >
            <div class="h-dialog">
                <table class="tablelist textCenter">
                    <thead>
                        <tr>
                            <td width="20%">菜单</td>
                            <td width="80%">权限</td>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{authName}}</td>
                            <td style="text-align:left">
                                <el-checkbox
                                    v-model="item.have"
                                    :label="item.fieldShowName"
                                    v-for="(item,index) in pageConfig"
                                    :key="index"
                                ></el-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="onCancelCongifg(),dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="dialogVisible = false"
                >保 存</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="操作配置"
            :visible.sync="twodialogVisible"
            width="30%"
            :close-on-click-modal='false'
        >
            <div class="h-dialog">
                <table class="tablelist textCenter">
                    <thead>
                        <tr>
                            <td width="20%">菜单</td>
                            <td width="80%">权限</td>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{authName}}</td>
                            <td style="text-align:left">
                                <el-checkbox
                                    v-model="item.have"
                                    :label="item.authName"
                                    v-for="(item,index) in operateConfig"
                                    :key="index"
                                ></el-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="onCanceloperateCongifg(),twodialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="twodialogVisible = false"
                >保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { findMenuList, saveAuthRole, getRoleInfo } from './api/index'
import { mapState } from 'vuex'
export default {
    name: 'role',
    data () {
        return {
            dialogVisible: false,
            twodialogVisible: false,
            radio1: '全部',
            checked: true,
            tableList: [],
            newTableList: [],
            changeTab: 1,
            pageConfig: [],
            authName: '',
            operateConfig: [],
            roleInfo: {
                deptName: '',
                mobile: '',
                psncode: '',
                psnname: ''
            }
        }
    },
    computed: {
        ...mapState({
            isCollapse: state => state.isCollapse,
            menuList: state => state.menuList
        })
    },
    async mounted () {
        this.tableList = []
        const jobNumber = this.$route.query.jobNumber
        const { data } = await findMenuList(jobNumber)
        console.log(data)
        this.tableList = this.restArr(data)
        this.newTableList = JSON.parse(JSON.stringify(data))
        const { data: roleInfo } = await getRoleInfo(jobNumber)
        this.roleInfo = roleInfo
    },
    methods: {
        restArr (data) {
            return data.map(item => {
                item.allhave = !!((item.status == 0 || item.status == 1))
                item.operateHave = item.status == 0 || item.status == 1
                if (item.childAuthList) {
                    item.childAuthList = this.restArr(item.childAuthList)
                }
                return item
            })
        },
        restPageConfig (data, val) {
            return data && data.map(item => {
                if (item.pageConfig) {
                    item.pageConfig.map(item => {
                        item.have = val
                    })
                }
                return item
            })
        },
        changeChildHave (itemArr, value) {
            // console.log(1, itemArr, value)
            return itemArr.map(item => {
                item.have = value
                item.allhave = value
                item.operateHave = value
                item.status = 0
                item.pageConfig && item.pageConfig.filter(item => {
                    item.have = value
                })
                if (item.childAuthList) {
                    this.changeChildHave(item.childAuthList, value)
                }
                return item
            })
        },
        onCheckboxChange (itemArr, value) {
            const len = itemArr.length
            this.changeChildHave(itemArr[len - 1].childAuthList, value)
            // TODO 每一层赋值 changeChildHave 没执行
            itemArr = itemArr.map((item) => {
                item.allhave = value
                item.operateHave = value
                return item
            })
            // 重置 pageConfig 权限
            this.restPageConfig(itemArr, value)
            if (value) {
                itemArr = itemArr.map((item) => {
                    item.have = value
                    return item
                })
            } else {
                if (len > 1) {
                    itemArr = itemArr.slice(0, len - 1).reverse()
                    //  console.log(itemArr)
                    itemArr = itemArr.map(item => {
                        item.have = item.childAuthList.filter(itemC => itemC.have == true).length > 0
                    })
                }
            }
            // todo pageCofig
            // this.restPageConfig(itemArr[len - 1].pageConfig, value)
        },
        onSearchRole (val, item) {
            val = !val
            if (val) {
                item.childAuthList[0].status = 3
            } else {
                item.childAuthList[0].status = 0
            }
            // 查询 权限
            item.pageConfig && item.pageConfig.filter(item => {
                item.have = !val
            })
        },
        onOperateRole (val, item) {
            val = !val
            if (val) {
                item.childAuthList[1].status = 3
            } else {
                item.childAuthList[1].status = 0
            }
            // 操作 权限
            item.childAuthList && item.childAuthList.filter(item => {
                if (item.menuType == 2) {
                    item.have = !val
                }
            })
        },
        async  onSaveRole () {
            const isHave = this.tableList && this.tableList.filter(item => item.have == true).length > 0
            if (!isHave) {
                this.$message({ message: '请先设置权限', type: 'warning' })
            } else {
                const params = { employeeAuthLists: this.tableList, jobNumber: '1001' }
                await saveAuthRole(params)
                this.$message({ message: '权限保存成功', type: 'success' })
            }
        },
        onCancelRole () {
            if (JSON.stringify(this.newTableList) != JSON.stringify(this.tableList)) {
                this.$confirm('取消后录入的数据将无法保存?', '取消确认', {
                    confirmButtonText: '继续填写',
                    cancelButtonText: '确认取消'
                }).then(() => {

                }).catch(() => {
                    this.$router.push({ path: '/auth/organization' })
                })
            } else {
                this.$router.push({ path: '/auth/organization' })
            }
        },
        changeTabs (val, item) {
            // this.restChildAuth(item)
            if (val == 0) {
                item.pageConfig && item.pageConfig.filter(item => {
                    item.have = true
                })
            }
            item.childAuthList[0].status = val
            this.dialogVisible = !!val
            this.newCongig = JSON.parse(JSON.stringify(item.pageConfig))
            this.pageConfig = item.pageConfig
            this.authName = item.authName
            // TOdo 取消回到默认结构
            this.newItem = item
        },
        changeTwoTabs (val, item, itema) {
            if (val == 0) {
                item.childAuthList && item.childAuthList.filter(item => {
                    item.have = true
                })
            }
            item.childAuthList[1].status = val
            this.twodialogVisible = !!val
            this.operateConfig = item.childAuthList && item.childAuthList.filter(item => item.menuType == 2)
            this.newchildAuthList = JSON.parse(JSON.stringify(item.childAuthList))
            this.authName = itema.authName
            // TOdo 取消回到默认结构
            this.newItem = item
        },
        onCancelCongifg () {
            this.newItem.pageConfig = this.newCongig
        },
        onCanceloperateCongifg () {
            this.newItem.childAuthList = this.newchildAuthList
        }
    }
}
</script>

<style lang="scss" scoped>
.role {
    background: #ffffff;
    padding: 20px 24px;
    margin-bottom: 50px;
}
.h-page-title {
    height: 60px;
    background: #fafafa;
    line-height: 60px;
    font-size: 17px;
    padding-left: 10px;
}
.h-page-flex {
    height: 120px;
    padding: 0 10px;
    .flex-col {
        height: 60px;
        align-items: center;
        display: flex;
        .flex-row {
            flex: 1;
        }
    }
}

.h-roletable {
    padding: 10px 0;
}

.tablelist {
    border: 1px solid #dddddd;
    border-collapse: collapse;
    width: 100%;

    thead {
        background: #fafafa;
    }
    th {
        border: 1px solid #dddddd;
        color: #ffffff;
    }
    td {
        border: 1px solid #dddddd;
        line-height: 40px;
        padding-left: 40px;
    }
    tbody {
        td {
            width: 20%;
        }
        min-width: 1280px;
        overflow-x: scroll;
    }
}
.textCenter {
    td {
        text-align: center;
        padding: 0;
    }
}
.h-foot {
    position: fixed;
    bottom: 0;
    background: #ffffff;
    left: 0;

    right: 0;
    padding: 10px;
    text-align: center;
    z-index: 99;
}
.minLeft {
    left: 64px;
    transition: 0.3s;
}
.maxLeft {
    left: 200px;
    transition: 0.3s;
}
.gryrole {
    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #dddddd;
        border-color: #dddddd;
    }
    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #dddddd;
    }
    /deep/ .el-checkbox {
        color: #dddddd;
    }
    .el-radio-button__inner {
        color: #dddddd;
        border: 1px solid #dddddd;
        border-left: 1px solid #dddddd !important;
        border-right: 1px solid #dddddd !important;
    }
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: transparent;
    color: #ff7a45;
    border-color: #ff7a45;
    box-shadow: -1px 0 0 0 #ff7a45;
}
.el-radio-group {
    button {
        // background-color: #dddddd;
        // border-color: #dddddd;
        // -webkit-box-shadow: -1px 0 0 0 #dddddd;
        // box-shadow: -1px 0 0 0 #dddddd;

        padding: 7px 20px;
        font-size: 12px;
        border-left: 1px solid #dcdfe6;
        border-radius: 4px 0 0 4px;
        &:first-child {
            border-right: none;
        }
        &:last-child {
            // border-right: 1px solid #DCDFE6;
            border-radius: 0 4px 4px 0;
            // border-left: none;
        }
    }
}
.taborg {
    color: #ff7a45;
    border-color: #ff7a45;
    border-left: 1px solid #ff7a45 !important;
    border-right: 1px solid #ff7a45 !important;
}
.h-dialog {
    margin-top: 20px;
    .el-checkbox {
        margin-left: 10px;
    }
}
</style>
