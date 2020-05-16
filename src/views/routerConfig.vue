<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="box">
                <div class="h-page-title">
                    <div>路由配置</div>
                    <!-- <el-button @click="clearCache">清缓存</el-button> -->
                    <el-dropdown split-button type="primary" trigger="click" @click="popupMenu(1)">
                        添加一级菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item, index) in tableList" :key="index">
                                <a style="display: block" :href="`#${index}`">{{item.authName}}</a>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="h-roletable">
                    <table class="tablelist">
                        <thead>
                            <tr>
                                <td width="15%" rowspan="2">一级菜单</td>
                                <td width="15%" rowspan="2">二级菜单</td>
                                <td width="15%" rowspan="2">三级菜单</td>
                                <td width="15%" rowspan="2">四级菜单</td>
                                <td width="" colspan="3">权限</td>
                            </tr>
                            <tr>
                                <td width="">敏感字段</td>
                                <td width="">敏感操作</td>
                                <td width="">敏感数据</td>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- 接口不支持排序，前端判断各种情况，导致代码冗余 -->
                            <!-- SHY-AMEND 需求：展开与搜索（有空改修改） -->
                            <!--  item  一级菜单
                                  itema 二级菜单
                                  itemb 三级菜单
                                  itemc 四级菜单-->
                            <template v-for="(item, index) in tableList">
                                <template v-for="(itema, indexa) in item.childAuthList">
                                    <template v-for="(itemb, indexb) in itema.childAuthList">
                                        <tr v-for="(itemc, indexc) in itemb.childAuthList" :key="`${index}_${indexa}_${indexb}_${indexc}`">
                                            <td :id="index" :rowspan="computedRowspan(item.childAuthList, 0)" v-if="indexa==0 && indexb==0 && indexc==0">
                                                <div @click="onEdit(1, item)">{{item.authName}}</div>
                                                <el-button @click="popupMenu(2, item)" type="success">添加</el-button>
                                                <el-button v-show="item.authName" @click="onDelete(item)" class="orangeBtn">删除</el-button>
                                            </td>
                                            <td :rowspan="computedRowspan(itema.childAuthList, 0)" v-if="indexb==0 && indexc==0">
                                                <div>
                                                    <div @click="onEdit(2, itema, item)">
                                                        <span class="point">{{itema.authName}}</span>
                                                    </div>
                                                    <el-button @click="popupMenu(3, itema, itemb)" type="success">添加</el-button>
                                                    <el-button v-show="itema.authName" @click="onDelete(itema)" class="orangeBtn">删除</el-button>
                                                </div>
                                            </td>
                                            <td :rowspan="computedRowspan(itemb.childAuthList, 0)" v-if="indexc==0">
                                                <div>
                                                    <div @click="onEdit(3, itemb, itema)">{{itemb.authName}}</div>
                                                    <el-button @click="popupMenu(4, itemb, itema)" type="success">添加</el-button>
                                                    <el-button v-show="itemb.authName" @click="onDelete(itemb)" class="orangeBtn">删除</el-button>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <div @click="onEdit(4, itemc, itemb)">{{itemc.authName}}</div>
                                                    <el-button v-show="itemc.authName" @click="onDelete(itemc)" class="orangeBtn">删除</el-button>
                                                </div>
                                            </td>
                                            <!-- 敏感字段和敏感操作 -->
                                            <template v-for="(i, d) in itemc.authTypes">
                                                <td v-if="i.id" :key="`${index}_${indexa}_${indexb}_${indexc}_${d}`" width='300'>
                                                    <div>{{i.authType==0 ? '敏感字段' : i.authType==1 ? '敏感操作' : '敏感数据'  }}</div>
                                                    <div class="el-radio-group">
                                                        <el-button class="el-radio-button__inner" @click="onShowFieldConfig(itemc.authTypes[i.authType])" type="primary">配置</el-button>
                                                    </div>
                                                </td>
                                                <td v-else :key="`${index}_${indexa}_${indexb}_${indexc}_${d}`" width='300'>
                                                    <el-button @click="addSensitive(itemc, itemb, itema, i.authType)" type="success">添加</el-button>
                                                </td>
                                            </template>
                                        </tr>
                                    </template>
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
                                <el-button @click="onResourceSure(index)">保 存</el-button>
                                <!-- <el-button class="orangeBtn">删除</el-button> -->
                            </td>
                            <td>
                                <el-button type="success" @click="addAuthList" v-show="index + 1 == list.length">添加</el-button>
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
import { getAuth, addAuth, addAuthType, addAuthResource, editAuthResource, editAuth, clearCache, deleteAuth } from './auth/api'
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
            var shy = JSON.parse(JSON.stringify(data))
            this.handleData(shy)
            console.log(shy)
            this.tableList = this.handlerTableList(shy, 0)
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
        handleData (data) {
            data.map(i => {
                if (i.childAuthList.length === 0) {
                    i.authTypes = this.compare(i.authTypes)
                } else {
                    this.handleData(i.childAuthList)
                }
            })
        },
        compare (authTypes) {
            const arr = [
                { id: '', authType: 0 },
                { id: '', authType: 1 },
                { id: '', authType: 2 }
            ]
            if (authTypes.length === 0) {
                return arr
            }
            arr.map(i => {
                const a = authTypes.filter(it => {
                    return it.authType === i.authType
                })
                if (a.length === 0) {
                    authTypes.push(i)
                }
            })
            return authTypes.sort((a, b) => a.authType - b.authType)
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
                if (level < 3) {
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
                    this.addMenuCommon(this.levObj.lev)
                }
            })
        },
        onEdit (lev, it, parent) {
            this.form.authName = it.authName
            this.form.authUri = it.authUri
            this.form.sort = it.sort
            this.levObj = {
                lev,
                authCode: it.authCode,
                parent
            }
            this.title = `编辑${lev}级菜单`
            this.dialogSeedVisible = true
        },
        popupMenu (lev, parent, item) {
            // 初始化
            this.$set(this.form, 'authName', '')
            this.$set(this.form, 'authUri', '')
            this.$set(this.form, 'sort', '')
            this.levObj = {
                lev,
                parent
            }
            console.log(this.levObj)
            if (this.levObj.parent && !this.levObj.parent.id) {
                this.$message.warning('上级菜单不存在')
                return
            }
            if (lev == 1) this.title = '添加一级菜单'
            if (lev == 2) this.title = '添加二级菜单'
            if (lev == 3) this.title = '添加三级菜单'
            if (lev == 4) this.title = '添加四级菜单'
            this.dialogSeedVisible = true
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        async addMenuCommon (level) {
            if (level !== 1 && !this.levObj.parent.id) {
                this.$message.warning('上级菜单不存在')
                return
            }
            const params = {
                authName: this.form.authName,
                authUri: this.form.authUri,
                parentCode: this.levObj.parent ? this.levObj.parent.authCode : 0,
                remark: `${level}级菜单`,
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
                resourceType: this.configObj.authType,
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
        onShowFieldConfig (item) {
            console.log(item)
            // 初始化
            this.list = [{}]
            if (item.authResourceList.length > 0) {
                this.list = item.authResourceList
            }
            this.configObj = item
            this.fieldVisible = true
        },
        addAuthList () {
            this.list.push({})
        },
        async addSensitive (itemc, itemb, itema, type) {
            console.log(itemc, itemb, itema, type)
            if (!itema.authCode) {
                this.$message.warning('权限配置菜单不存在')
                return
            }
            const authCode = itemc.authCode ? itemc.authCode : itemb.authCode ? itemb.authCode : itema.authCode
            const params = {
                authCode,
                authType: type
            }
            console.log(params)
            await addAuthType(params)
            this.init()
        },
        clearCache () {
            clearCache()
        },
        onClose () {
            this.fieldVisible = false
            this.init()
        },
        onDelete (item) {
            console.log(item)
            this.$confirm(`此操作将永久删除 ${item.authName} 菜单以及下面挂载的子菜单, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteAuth(item.authCode)
                await this.init()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => { })
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
.h-page-title .el-dropdown {
    position: fixed;
    right: 44px;
    z-index: 55;
}
.el-dialog .el-input {
    width: 100%;
}
.is- {
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
td .el-button {
    font-size: 12px;
    padding: 5px 12px;
}
.point {
    cursor: pointer;
}
</style>
