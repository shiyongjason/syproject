<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="box">
                <div class="h-page-title">
                    <div>路由配置</div>
                    <!-- <el-button @click="clearCache">清缓存</el-button> -->
                    <el-button @click="popupMenu(1)">添加一级菜单</el-button>
                </div>
                <div class="h-roletable">
                    <table class="tablelist">
                        <thead>
                            <tr>
                                <td width="" rowspan="2">一级菜单</td>
                                <td width="" rowspan="2">二级菜单</td>
                                <!-- 三级页面做到操作按钮上！！！-->
                                <td width="" rowspan="2">三级菜单</td>
                                <td width="" colspan="2">权限</td>
                            </tr>
                            <tr>
                                <td width="">敏感字段</td>
                                <td width="">敏感操作</td>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- 接口不支持排序，前端判断各种情况，导致代码冗余 -->
                            <template v-for="(item, index) in tableList">
                                <template v-for="(itema, indexa) in item.childAuthList">
                                    <tr v-for="(itemb, indexb) in itema.childAuthList" :key="indexb+'_'+itemb.id?itemb.id:item.id">
                                        <td :rowspan="computedRowspan(item.childAuthList, 0)" v-if="indexa==0 && indexb==0">
                                            <div @click="onEdit(1, item)">{{item.authName}}</div>
                                        </td>
                                        <td :rowspan="computedRowspan(itema.childAuthList, 1)" v-if="indexb==0">
                                            <div>
                                                <!-- {{item.childAuthList.length}}{{indexa}} -->
                                                <div @click="onEdit(2, item, index, indexa)">{{itema.authName}}</div>
                                                <el-button v-show="item.childAuthList.length == indexa + 1" @click="popupMenu(2, item, index)" type="success" round>+</el-button>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <!-- {{indexb}}{{itema.childAuthList.length}} -->
                                                <div @click="onEdit(3, itema, index, indexa, indexb)">{{itemb.authName}}</div>
                                                <el-button v-show="itema.childAuthList.length == indexb + 1" @click="popupMenu(3, itema, index, indexa)" type="success" round>+</el-button>
                                            </div>
                                        </td>
                                        <template v-if="itemb.authTypes && itemb.authTypes.length == 2">
                                            <template v-if="itemb.authTypes[0].authType == 0">
                                                <td width="300">
                                                    <div>敏感字段</div>
                                                    <div class="el-radio-group">
                                                        <el-button class="el-radio-button__inner" @click="onShowFieldConfig(1, itemb.authTypes[0])" type="primary" round>配0置</el-button>
                                                    </div>
                                                </td>
                                                <td width="300">
                                                    <div>敏感操作</div>
                                                    <div class="el-radio-group">
                                                        <el-button class="el-radio-button__inner" @click="onShowFieldConfig(0, itemb.authTypes[0])" type="primary" round>配1置</el-button>
                                                    </div>
                                                </td>
                                            </template>
                                            <template v-else>
                                                <td width="300">
                                                    <div>敏感字段</div>
                                                    <div class="el-radio-group">
                                                        <el-button class="el-radio-button__inner" @click="onShowFieldConfig(0, itemb.authTypes[0])" type="primary" round>配1置</el-button>
                                                    </div>
                                                </td>
                                                <td width="300">
                                                    <div>敏感操作</div>
                                                    <div class="el-radio-group">
                                                        <el-button class="el-radio-button__inner" @click="onShowFieldConfig(1, itemb.authTypes[0])" type="primary" round>配0置</el-button>
                                                    </div>
                                                </td>
                                            </template>
                                            <!-- </template> -->
                                        </template>
                                        <template v-else-if="itemb.authTypes && itemb.authTypes.length == 1">
                                            <template v-if="itemb.authTypes[0].authType == 0">
                                                <td width="300">
                                                    <div>敏感字段</div>
                                                    <div class="el-radio-group">
                                                        <el-button class="el-radio-button__inner" @click="onShowFieldConfig(1, itemb.authTypes[0])" type="primary" round>配置</el-button>
                                                    </div>
                                                </td>
                                                <td width="300">
                                                    <el-button @click="addSensitive(index, indexa, itema, 1)" type="success" round>+</el-button>
                                                </td>
                                            </template>
                                            <template v-else>
                                                <td width="300">
                                                    <el-button @click="addSensitive(index, indexa, itema, 0)" type="success" round>+</el-button>
                                                </td>
                                                <td width="300">
                                                    <div>敏感操作</div>
                                                    <div class="el-radio-group">
                                                        <el-button class="el-radio-button__inner" @click="onShowFieldConfig(0, itemb.authTypes[0])" type="primary" round>配置</el-button>
                                                    </div>
                                                </td>
                                            </template>
                                        </template>
                                        <template v-else-if="itemb.authTypes && itemb.authTypes.length > 2">
                                            <td width="300">
                                                数据异常
                                            </td>
                                            <td width="300">
                                                数据异常
                                            </td>
                                        </template>
                                        <template v-else>
                                            <td width="300">
                                                <el-button @click="addSensitive(index, indexa, itema, 0)" type="success" round>+</el-button>
                                            </td>
                                            <td width="300">
                                                <el-button @click="addSensitive(index, indexa, itema, 1)" type="success" round>+</el-button>
                                            </td>
                                        </template>
                                    </tr>
                                </template>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="dialogSeedVisible" :close-on-click-modal='false'>
            <el-form :model="form" :rules="formRules" ref="form">
                <el-form-item label="菜单名称" label-width="120px" prop="authName">
                    <el-input v-model="form.authName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单路由" label-width="120px" prop="authUri">
                    <el-input v-model="form.authUri" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" label-width="120px">
                    <el-input v-model="form.sort" autocomplete="off" type='number'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSeedVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAddMenuSure('form')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="敏感配置" :visible.sync="fieldVisible" width="60%" :close-on-click-modal='false'>
            <div class="h-dialog">
                <table class="tablelist textCenter">
                    <thead>
                        <tr>
                            <td width="15%">菜单名</td>
                            <td width="15%">Key</td>
                            <td width="10%">排序</td>
                            <td width="20%">资源uri</td>
                            <td width="20%">操作</td>
                            <td width="20%">操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value, index) in list" :key="index">
                            <td>
                                <el-input v-model="value.resourceName" placeholder="请输入内容"></el-input>
                            </td>
                            <td>
                                <el-input v-model="value.resourceKey" placeholder="请输入内容"></el-input>
                            </td>
                            <td>
                                <el-input v-model="value.sort" placeholder="请输入内容"></el-input>
                            </td>
                            <td>
                                <el-input v-model="value.resourceAddress" placeholder="请输入内容"></el-input>
                            </td>
                            <td>
                                <el-button @click="onResourceSure(index)">确 定</el-button>
                            </td>
                            <td>
                                <el-button type="success" round @click="addAuthList" v-show="index + 1 == list.length">+</el-button>
                                <!-- <button>-</button> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onClose">关 闭</el-button>
                <!-- <el-button @click="fieldVisible = false">取 消</el-button>
                <el-button type="primary" @click="fieldVisible = false">保 存</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getAuth, addAuth, addAuthType, addAuthResource, editAuthResource, editAuth, clearCache } from './auth/api'
export default {
    data () {
        return {
            tableList: [],
            list: [
                {
                }
            ],
            form: {
                authName: '',
                authUri: '',
                sort: '',
                childAuthList: [
                    {
                        authName: ' ',
                        childAuthList: [
                            {
                                authTypeList: '',
                                have: ''
                            }
                        ]
                    }
                ]
            },
            formRules: {
                authName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                authUri: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ]
            },
            dialogFirVisible: false,
            dialogSeedVisible: false,
            fieldVisible: false,
            title: '添加菜单',
            levObj: {},
            configObj: {}
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        async init () {
            const { data } = await getAuth()
            console.log(data)
            this.tableList = this.handlerTableList(data, 0)
        },
        // 计算table合并行数
        computedRowspan (list, level) {
            if (level == 0) {
                let len = 0
                list.forEach(item => {
                    len += item.childAuthList.length
                })
                return len
            }
            return list.length
        },
        // 对后端返回的数据进行处理
        // list必须有3级，如果不够3级，需要增加childAuthList，满足页面展示需求
        // 敏感字段和敏感操作相关配置挂载在3级菜单下面
        handlerTableList (data, level) {
            return data.map(item => {
                if (item.authTypes && item.authTypes.length != 0) {
                    item.authTypes = item.authTypes.map(authType => {
                        // 弹出层中的authName配置到authTypeList中
                        item.authName && (authType.authName = item.authName)
                        return authType
                    })
                }
                // 如果只有敏感字段或者敏感操作一种配置，那么补充另外一个为空对象，方便循环
                // if (item.authTypeList && item.authTypeList.length == 1) {
                //     if (item.authTypeList[0].authType == 1) {
                //         item.authTypeList.splice(0, 0, {})
                //     } else {
                //         item.authTypeList.push({})
                //     }
                // }
                if (level < 2) {
                    if (item.childAuthList && item.childAuthList.length == 0) {
                        item.childAuthList = [{
                            authTypes: item.authTypes
                        }]
                    }
                    if (!item.childAuthList) {
                        item.childAuthList = [{
                            authTypes: item.authTypes,
                            authName: item.have
                        }]
                    }
                    item.childAuthList = this.handlerTableList(item.childAuthList, ++level)
                }
                level = 0
                return item
            })
        },
        onAddMenuSure (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(this.levObj)
                    if (this.levObj.lev == 1) this.addFirMenu()
                    if (this.levObj.lev == 2) this.addSecMenu(this.levObj.index)
                    if (this.levObj.lev == 3) this.addTirMenu(this.levObj.index, this.levObj.indexa)
                }
            })
        },
        onEdit (lev, it, index, indexa, indexb) {
            if (lev == 1) {
                this.title = '编辑一级菜单'
                this.form.authName = it.authName
                this.form.authUri = it.authUri
                this.form.sort = it.sort
                this.levObj = {
                    lev,
                    authCode: it.authCode
                }
            }
            if (lev == 2) {
                // console.log(lev, it, index, indexa)
                this.form.authName = it.childAuthList[indexa].authName
                this.form.authUri = it.childAuthList[indexa].authUri
                this.form.sort = it.childAuthList[indexa].sort
                this.levObj = {
                    lev,
                    authCode: it.childAuthList[indexa].authCode,
                    parent: it,
                    index
                }
                // console.log(this.levObj)
                this.title = '编辑二级菜单'
            }
            if (lev == 3) {
                this.form.authName = it.childAuthList[indexb].authName
                this.form.authUri = it.childAuthList[indexb].authUri
                this.form.sort = it.childAuthList[indexb].sort
                this.levObj = {
                    lev,
                    authCode: it.childAuthList[indexb].authCode,
                    parent: it,
                    index,
                    indexa
                }
                // console.log(lev, it, index, indexa, indexb)
                this.title = '编辑三级菜单'
            }
            this.dialogSeedVisible = true
        },
        popupMenu (lev, item, index, indexa) {
            // 初始化shy
            this.$set(this.form, 'authName', '')
            this.$set(this.form, 'authUri', '')
            this.$set(this.form, 'sort', '')
            // console.log(lev, item, index, indexa)
            this.levObj = {
                lev,
                parent: item,
                index,
                indexa
            }
            if (lev == 1) this.title = '添加一级菜单'
            if (lev == 2) this.title = '添加二级菜单'
            if (this.levObj.parent && !this.levObj.parent.id) {
                this.$message.warning('上级菜单不存在')
                // console.log(this.levObj)
                return
            }
            if (lev == 3) this.title = '添加三级菜单'
            this.dialogSeedVisible = true
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        async addFirMenu () {
            const params = {
                authName: this.form.authName,
                authUri: this.form.authUri,
                parentCode: 0,
                remark: '一级菜单',
                sort: this.form.sort ? this.form.sort : this.tableList.length
            }
            if (this.levObj.authCode) {
                params.authCode = this.levObj.authCode
                await editAuth(params)
            } else {
                await addAuth(params)
            }
            // console.log(params)
            this.dialogSeedVisible = false
            this.init()
        },
        async addSecMenu (index) {
            // console.log(index)
            // console.log(this.tableList[index].childAuthList)
            // console.log(this.levObj.parent.authCode)
            const params = {
                authName: this.form.authName,
                authUri: this.form.authUri,
                parentCode: this.levObj.parent.authCode,
                remark: '二级菜单',
                sort: this.form.sort
            }
            if (this.levObj.authCode) {
                params.authCode = this.levObj.authCode
                await editAuth(params)
            } else {
                await addAuth(params)
            }
            this.dialogSeedVisible = false
            this.init()
        },
        async addTirMenu (index, indexa) {
            // console.log(index, indexa)
            // console.log(this.tableList[index].childAuthList[indexa])
            if (!this.levObj.parent.id) {
                this.$message.warning('上级菜单不存在')
                // console.log(this.levObj)
                return
            }
            const params = {
                authName: this.form.authName,
                authUri: this.form.authUri,
                parentCode: this.levObj.parent.authCode,
                remark: '三级页面',
                sort: this.form.sort
            }
            if (this.levObj.authCode) {
                params.authCode = this.levObj.authCode
                await editAuth(params)
            } else {
                await addAuth(params)
            }
            this.dialogSeedVisible = false
            this.init()
        },
        onSure () {
            this.tableList.push(this.form)
            this.dialogFirVisible = false
        },
        async onResourceSure (i) {
            console.log(this.configObj)
            // console.log(this.list[i])
            const params = {
                authCode: this.configObj.authCode,
                authTypeId: this.configObj.id,
                resourceName: this.list[i].resourceName,
                resourceKey: this.list[i].resourceKey,
                sort: this.list[i].sort,
                resourceAddress: this.list[i].resourceAddress
            }
            console.log(params)
            if (this.list[i].id) {
                params.id = this.list[i].id
                await editAuthResource(params)
            } else {
                await addAuthResource(params)
            }
            this.$message.success(`保存成功`)
            this.init()
        },
        onShowFieldConfig (index, item) {
            // 初始化
            this.list = [{}]
            // console.log(index, item)
            if (item.authResourceList.length > 0) {
                this.list = item.authResourceList
            }
            this.configObj = item
            this.fieldVisible = true
        },
        addAuthList () {
            this.list.push({})
        },
        async addSensitive (index, indexa, obj, type) {
            // console.log(index, indexa, obj, type)
            // console.log(this.tableList[index].childAuthList[indexa].childAuthList)
            if (!obj.authCode) {
                this.$message.warning('权限配置菜单不存在')
                return
            }
            const authCode = obj.childAuthList[0].authCode ? obj.childAuthList[0].authCode : obj.authCode
            const params = {
                authCode,
                authType: type
            }
            // console.log(params)
            await addAuthType(params)
            // console.log(data)
            this.init()
        },
        clearCache () {
            clearCache()
        },
        onClose () {
            this.fieldVisible = false
            this.init()
        }
    }
}
</script>

<style lang='scss' scoped>
* {
    user-select: none;
}
.h-roletable {
    padding: 10px 0;
}
.h-page-title {
    height: 60px;
    background: #fafafa;
    line-height: 60px;
    font-size: 17px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
}
.h-page-title .el-button {
    position: fixed;
    right: 44px;
    z-index: 55;
    background-color: #ff7a45;
    color: #ffffff;
}
.el-dialog .el-input {
    width: 100%;
}
.is-round {
    padding: 5px 10px;
}
.tablelist {
    border: 1px solid #dddddd;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
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
</style>
