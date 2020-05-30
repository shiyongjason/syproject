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
                    <div class="flex-row">登录名：{{roleInfo.mobile}}</div>
                    <div class="flex-row">所属部门：{{roleInfo.deptName}}</div>
                </div>
                <div class="flex-col">
                    <div class="flex-row">钉钉ID：
                        <el-input v-model="dingCode" maxlength="40" placeholder="请输入钉钉ID" style="width: 224px;"></el-input>
                    </div>
                    <div class="flex-row">岗位：
                        <el-select v-model="positionCodeList" multiple placeholder="岗位信息暂未配置" style="width: 90%;">
                            <el-option v-for="item in postOptions" :key="item.id" :label="item.positionName" :value="item.positionCode"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="h-page-title">
                权限管理
            </div>
            <div class="h-roletable">
                <table class="tablelist">
                    <thead>
                        <tr>
                            <td width="">一级菜单</td>
                            <td width="">二级菜单</td>
                            <td width="" colspan=4>权限</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, index) in tableList">
                            <template v-for="(itema, indexa) in item.childAuthList">
                                <tr v-for="(itemb, indexb) in itema.childAuthList" :key="indexb+'_'+itemb.id?itemb.id:item.id">
                                    <td :rowspan="computedRowspan(item.childAuthList, 0)" v-if="indexa==0 && indexb==0">
                                        <el-checkbox v-model="item.have" @change="onCheckboxChange([item], item.have)">{{item.authName}}</el-checkbox>
                                    </td>
                                    <td :rowspan="computedRowspan(itema.childAuthList, 1)" v-if="indexb==0">
                                        <div v-if="itema.authName">
                                            <el-checkbox v-model="itema.have" @change="onCheckboxChange([item, itema], itema.have)">{{itema.authName}}</el-checkbox>
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="itemb.authName">
                                            <el-checkbox v-model="itemb.have" @change="onCheckboxChange([item, itema, itemb], itemb.have)">{{itemb.authName}}</el-checkbox>
                                        </div>
                                    </td>
                                    <template v-if="itemb.authTypeList">
                                        <template v-for="(itemAuthType, authTypeIndex) in itemb.authTypeList">
                                            <td :key="authTypeIndex + '_authType'" width="300">
                                                <div v-if="itemAuthType.id">
                                                    <el-checkbox v-model="itemAuthType.have" @change="onChangeAuthType(itemAuthType)" :disabled="!itemb.have" class="mr10">
                                                        {{ itemAuthType.authType == 0 ? '敏感字段' :itemAuthType.authType == 1 ? '敏感操作':itemAuthType.authType == 2? '数据范围' :'1'}}
                                                    </el-checkbox>
                                                    <div class="el-radio-group">
                                                        <button class="el-radio-button__inner" :class="itemAuthType.status == 0 ? 'taborg' : ''" @click="onShowFieldConfig(0, itemAuthType)" :disabled="!itemAuthType.have">全部</button>
                                                        <button class="el-radio-button__inner" :class="itemAuthType.status == 1 ? 'taborg' : ''" @click="onShowFieldConfig(1, itemAuthType,[itema,itemb])" :disabled="!itemAuthType.have">配置</button>
                                                    </div>
                                                    <div v-else></div>
                                                </td>
                                            </template>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <td width="300"></td>
                                        <td width="300"></td>
                                        <td width="300"></td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="h-foot" :class="isCollapse ? 'minLeft' : 'maxLeft'">
            <el-button @click="onCancelRole()">取 消</el-button>
            <el-button type="primary" @click="onSaveRole()">保 存</el-button>
        </div>
        <el-dialog :title="layerTitle" :visible.sync="fieldVisible" width="40%" :close-on-click-modal='false' :before-close="onCancelFieldConfig">
            <div class="h-dialog">
                <table class="tablelist textCenter" v-if="layerType!=2">
                    <thead>
                        <tr>
                            <td width="30%">菜单</td>
                            <td width="70%">权限</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ layerAuthName }}</td>
                            <td style="text-align:left">
                                <el-checkbox v-model="item.have" :label="item.resourceName" v-for="(item,index) in fieldConfig" :key="index"></el-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="tablelist textCenter" v-else>
                    <thead>
                        <tr>
                            <td width="30%">筛选项</td>
                            <td width="70%">数据范围</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>所属分部</td>
                            <td>
                                <div class="treetable">
                                    <el-tree :data="reData" ref="treetable" :default-checked-keys="checkedkeys" show-checkbox node-key="pkDeptDoc" default-expand-all highlight-current :props="{label:'deptName'}">
                                    </el-tree>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCancelFieldConfig()">取 消</el-button>
                <el-button type="primary" @click="fieldVisible = false,onGetnodes()">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { findMenuList, saveAuthRole, getRoleInfo, findpostList, getRegionsubs } from './api/index'
import { mapState } from 'vuex'
export default {
    name: 'role',
    data () {
        return {
            reData: [],
            tableList: [],
            newTableList: [], // newTableList记录初始权限配置，在取消的时候判断是否有权限变更
            fieldVisible: false, // 敏感字段弹出层显示控制
            fieldConfig: [], // 敏感字段弹出层可选项列表或者 数据范围权限
            layerTitle: '', // 弹出层标题
            layerAuthName: '', // 弹出层列表中的表格名称
            layerType: '',
            subsectionCodes: [],
            authCode: '',
            roleInfo: {
                deptName: '',
                mobile: '',
                psncode: '',
                psnname: ''
            },
            jobNumber: '',
            postOptions: [],
            positionCodeList: [],
            dingCode: '',
            checkedkeys: []
        }
    },
    computed: {
        ...mapState({
            isCollapse: state => state.isCollapse,
            userInfo: state => state.userInfo
        })
    },
    async mounted () {
        this.tableList = []
        this.jobNumber = this.$route.query.jobNumber
        const { data } = await findMenuList(this.jobNumber)
        var shy = JSON.parse(JSON.stringify(data))
        this.handleData(shy)
        this.tableList = this.handlerTableList(shy, 0)
        this.newTableList = JSON.parse(JSON.stringify(this.tableList))
        const { data: roleInfo } = await getRoleInfo(this.jobNumber)
        this.roleInfo = roleInfo
        this.dingCode = this.roleInfo.dingCode
        this.positionCodeList = this.roleInfo.positionCodeList
        const { data: postOptions } = await findpostList('')
        this.postOptions = postOptions
        this.onGetRegionsubs()
    },
    methods: {
        async onGetRegionsubs () {
            const { data } = await getRegionsubs()
            this.reData = data
        },
        onGetnodes () {
            if (this.layerType == 2) {
                const nodeList = this.$refs.treetable.getCheckedNodes()
                const subArr = []
                nodeList && nodeList.map(val => {
                    if (val.deptCode.indexOf('F') > -1) {
                        subArr.push(val.pkDeptDoc)
                    }
                })
                const employeeSubsections = { authCode: this.authCode[this.authCode.length - 1], subsectionCodes: subArr }
                this.newItem.employeeSubsections = employeeSubsections
                this.$refs.treetable.setCheckedKeys([])
            }
        },
        // 对后端返回的数据进行处理
        // list必须有3级，如果不够3级，需要增加childAuthList，满足页面展示需求
        // 敏感字段和敏感操作相关配置挂载在3级菜单下面
        handlerTableList (data, level) {
            return data.map(item => {
                if (item.authTypeList) {
                    item.authTypeList = item.authTypeList.map(authType => {
                        // 弹出层中的authName配置到authTypeList中
                        item.authName && (authType.authName = item.authName)
                        return authType
                    })
                }
                // 如果只有敏感字段或者敏感操作一种配置，那么补充另外一个为空对象，方便循环
                if (item.authTypeList && item.authTypeList.length < 3) {
                    for (let i = 0; i < 3; i++) {
                        if (item.authTypeList[i] && item.authTypeList[i].authType == i) {

                        } else {
                            item.authTypeList.splice(i, 0, { authType: '' })
                        }
                    }

                    // if (item.authTypeList[0].authType == 2) {
                    //     item.authTypeList.splice(0, 0, {})
                    // } else if (item.authTypeList[0].authType == 1) {
                    //     item.authTypeList.splice(0, 0, {})
                    // } else {
                    //     item.authTypeList.push({})
                    // }
                }
                if (level < 2) {
                    if (!item.childAuthList) {
                        item.childAuthList = [{
                            authTypeList: item.authTypeList,
                            have: item.have
                        }]
                    }
                    item.childAuthList = this.handlerTableList(item.childAuthList, ++level)
                }
                level = 0
                return item
            })
        },
        handleData (data) {
            data.map(i => {
                if (!i.childAuthList || i.childAuthList.length === 0) {
                    i.authTypeList = this.compare(i.authTypeList)
                } else {
                    this.handleData(i.childAuthList)
                }
            })
        },
        compare (authTypeList) {
            const arr = [
                { id: '', authType: 0 },
                { id: '', authType: 1 },
                { id: '', authType: 2 }
            ]
            if (!authTypeList || authTypeList.length === 0) {
                return arr
            }
            arr.map(i => {
                const a = authTypeList.filter(it => {
                    return it.authType === i.authType
                })
                if (a.length === 0) {
                    authTypeList.push(i)
                }
            })
            return authTypeList.sort((a, b) => a.authType - b.authType)
        },
        // 计算table合并行数
        computedRowspan (list, len) {
            len += list.length
            list.forEach(item => {
                if (item.childAuthList && item.childAuthList.length > 0) {
                    len = this.computedRowspan(item.childAuthList, len) - 1
                }
            })
            return len
        },
        // 敏感字段和敏感操作的checkbox转换的处理
        onChangeAuthType (item) {
            item.status = 0
            item.authResourceList && item.authResourceList.filter(authResource => {
                authResource.have = item.have
            })
        },
        handlerAuthType (item, value) {
            if (item.authTypeList) {
                item.authTypeList = item.authTypeList.map(authType => {
                    authType.have = value
                    authType.status = 0
                    authType.authResourceList = authType.authResourceList ? authType.authResourceList.map(resource => {
                        resource.have = value
                        return resource
                    }) : null
                    return authType
                })
            }
        },
        changeChildHave (item, value) {
            const itemArr = item.childAuthList
            if (itemArr) {
                itemArr.map(obj => {
                    obj.have = value
                    this.handlerAuthType(obj, value)
                    if (obj.childAuthList) {
                        this.changeChildHave(obj, value)
                    }
                    return obj
                })
            } else {
                this.handlerAuthType(item, value)
            }
        },
        onCheckboxChange (itemArr, value) {
            const len = itemArr.length
            this.changeChildHave(itemArr[len - 1], value)
            if (value) {
                itemArr = itemArr.map((item) => {
                    item.have = value
                    return item
                })
            } else {
                if (len > 1) {
                    itemArr = itemArr.slice(0, len - 1).reverse()
                    itemArr = itemArr.map(item => {
                        item.have = item.childAuthList.filter(itemC => itemC.have == true).length > 0
                    })
                }
            }
        },
        // 在提交之前对提交的数据进行一次处理，authCodes记录选中的菜单，resourceIds记录选中的敏感信息，authTypeList记录敏感配置选项选中的是全部还是配置
        handlerRoleFilter (itemArr, resourceObj) {
            itemArr.filter(item => item.have).forEach(item => {
                if (item.authCode) {
                    resourceObj.authCodes.push(item.authCode)
                }
                // 最后一级目录才过滤，因为如果只有二级菜单没有三级菜单的时候，会在补充的三级菜单中增加authTypeList，导致会出现重复的数据
                if (item.authTypeList && !item.childAuthList) {
                    item.authTypeList.filter(authType => authType.have && authType.id).forEach(authType => {
                        authType.authResourceList && authType.authResourceList.filter(resource => resource.have).forEach(resource => {
                            resourceObj.resourceIds.push(resource.id)
                        })
                        resourceObj.authTypeList.push({
                            authTypeId: authType.id,
                            status: authType.status
                        })
                        // 全选 0 时候 不传任何  1 时候传配置的数据范围
                        if (authType.status == 1 && authType.authType == 2) {
                            console.log(authType.employeeSubsections)
                            authType.employeeSubsections && resourceObj.employeeSubsections.push(authType.employeeSubsections)
                        }
                    })
                }
                if (item.childAuthList) {
                    this.handlerRoleFilter(item.childAuthList, resourceObj)
                }
            })
        },
        // 获取选中 所有 have=true 的每一层的authCode 组成数组， 然后取最后一个code 作为数据范围的菜单code
        handlerCodeFilter (itemArr, authCodeArr) {
            itemArr.filter(item => item.have).forEach(item => {
                if (item.authCode) {
                    authCodeArr.push(item.authCode)
                }
                if (item.childAuthList) {
                    this.handlerCodeFilter(item.childAuthList, authCodeArr)
                }
            })
        },
        async onSaveRole () {
            let resourceObj = {
                resourceIds: [],
                authCodes: [],
                authTypeList: [],
                employeeSubsections: []
            }
            this.handlerRoleFilter(JSON.parse(JSON.stringify(this.tableList)), resourceObj)
            const params = {
                employeeSubsections: resourceObj.employeeSubsections,
                resourceIds: resourceObj.resourceIds,
                authCodes: resourceObj.authCodes,
                authTypeList: resourceObj.authTypeList,
                jobNumber: this.jobNumber,
                dingCode: this.dingCode,
                positionCodeList: this.positionCodeList,
                userCode: this.jobNumber
            }
            await saveAuthRole(params)
            this.$message({ message: '权限保存成功', type: 'success' })
            this.$router.push({ path: '/auth/organization' })
        },
        onCancelRole () {
            if (JSON.stringify(this.newTableList) != JSON.stringify(this.tableList)) {
                this.$confirm('取消后录入的数据将无法保存!', '取消确认', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '继续填写',
                    cancelButtonText: '确认取消'
                }).catch(action => {
                    if (action === 'cancel') {
                        this.$router.push({ path: '/auth/organization' })
                    }
                })
            } else {
                this.$router.push({ path: '/auth/organization' })
            }
        },
        onShowFieldConfig (val, item, itemArr) {
            // 获取数据范围最底层的菜单authcode
            const authCodeArr = []
            itemArr && itemArr.map(val => {
                val.authCode && authCodeArr.push(val.authCode)
            })
            this.authCode = authCodeArr
            // 调用接口获取绑定的数据范围Code
            // this.onGetJobsubs({ jobNumber: this.userInfo.jobNumber, authCode: this.authCode[this.authCode.length - 1] })
            // 当选择全部的时候，设置所有的配置都是选中状态
            if (val == 0) {
                item.authResourceList && item.authResourceList.filter(item => {
                    item.have = true
                })
            }
            // 设置页面敏感信息的高亮是在全部还是配置上
            item.status = val
            this.fieldVisible = !!val
            this.fieldConfig = item.authResourceList
            // 用于在取消的时候，返回原来的选中状态
            if (item.authType == 2) {
                this.checkedkeys = item.employeeSubsections && JSON.parse(JSON.stringify(item.employeeSubsections.subsectionCodes))
                this.cloneEmployeeSubsections = JSON.parse(JSON.stringify(item.employeeSubsections))
            } else {
                this.cloneConfig = JSON.parse(JSON.stringify(item.authResourceList))
            }
            this.newItem = item
            // 弹出层title和authName
            this.layerTitle = item.authType == 0 ? '敏感字段' : item.authType == 0 ? '敏感操作' : '数据范围'
            this.layerAuthName = item.authName
            this.layerType = item.authType
        },
        onCancelFieldConfig () {
            if (this.layerType == 2) {
                this.$refs.treetable.setCheckedKeys([])
            }
            this.newItem.employeeSubsections = this.cloneEmployeeSubsections ? this.cloneEmployeeSubsections : {}
            this.newItem.authResourceList = this.cloneConfig ? this.cloneConfig : []
            this.fieldVisible = false
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
    min-height: 180px;
    padding: 0 10px 10px;
    .flex-col {
        min-height: 45px;
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
        padding-left: 10px;
    }
    tbody {
        td {
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
    }
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: transparent;
    color: #ff7a45;
    border-color: #ff7a45;
    box-shadow: -1px 0 0 0 #ff7a45;
}
.el-radio-button__inner:hover {
    color: #ff7a45;
}
.el-radio-group {
    button {
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
    button[disabled] {
        cursor: not-allowed;
        color: #dddddd;
        border-color: #ddd;
        border-left: 1px solid #ddd !important;
        border-right: 1px solid #ddd !important;
        // border-left: 1px solid #dcdfe6 !important;
        border-right: 1px solid #ffffff !important;
        &:hover {
            color: #dddddd;
        }
        &:last-child {
            border-right: 1px solid #dcdfe6 !important;
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
    .treetable {
        height: 350px;
        overflow: scroll;
    }
    .el-checkbox {
        margin-left: 10px;
    }
}
</style>
