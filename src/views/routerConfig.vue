<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="box">
                <div class="h-page-title">
                    <div>路由配置<i style="color: red">（请勿擅自修改菜单名，菜单名与左侧菜单无任何关系）</i></div>
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
                            <!--
                                  item  一级菜单
                                  itema 二级菜单
                                  itemb 三级菜单
                                  itemc 四级菜单
                            -->
                            <template v-for="(item, index) in tableList">
                                <template v-for="(itema, indexa) in item.childAuthList">
                                    <template v-for="(itemb, indexb) in itema.childAuthList">
                                        <tr v-for="(itemc, indexc) in itemb.childAuthList" :key="`${index}_${indexa}_${indexb}_${indexc}`">
                                            <td :id="index" :rowspan="computedRowspan(item.childAuthList, 0)" v-if="indexa==0 && indexb==0 && indexc==0">
                                                <div @click="onEdit(1, item)">{{item.authName}}</div>
                                                <h-button table @click="popupMenu(2, item)">添加</h-button>
                                                <h-button v-show="item.authName" @click="onDelete(item)">删除</h-button>
                                            </td>
                                            <td :rowspan="computedRowspan(itema.childAuthList, 0)" v-if="indexb==0 && indexc==0">
                                                <div>
                                                    <div @click="onEdit(2, itema, item)">
                                                        <span class="point">{{itema.authName}}</span>
                                                    </div>
                                                    <h-button table @click="popupMenu(3, itema, itemb)">添加</h-button>
                                                    <h-button v-show="itema.authName" @click="onDelete(itema)">删除</h-button>
                                                </div>
                                            </td>
                                            <td :rowspan="computedRowspan(itemb.childAuthList, 0)" v-if="indexc==0">
                                                <div>
                                                    <div @click="onEdit(3, itemb, itema)">{{itemb.authName}}</div>
                                                    <h-button table @click="popupMenu(4, itemb, itema)">添加</h-button>
                                                    <h-button v-show="itemb.authName" @click="onDelete(itemb)">删除</h-button>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <div @click="onEdit(4, itemc, itemb)">{{itemc.authName}}</div>
                                                    <h-button v-show="itemc.authName" @click="onDelete(itemc)">删除</h-button>
                                                </div>
                                            </td>
                                            <!-- 敏感字段和敏感操作 -->
                                            <template v-for="(i, d) in itemc.authTypes">
                                                <td v-if="i.id" :key="`${index}_${indexa}_${indexb}_${indexc}_${d}`" width='300'>
                                                    <div>{{i.authType==0 ? '敏感字段' : i.authType==1 ? '敏感操作' : '已添加敏感数据'  }}</div>
                                                    <div class="el-radio-group">
                                                        <h-button type="primary" v-if="i.authType != 2" @click="onShowFieldConfig(itemc.authTypes[i.authType])">配置</h-button>
                                                    </div>
                                                </td>
                                                <td v-else :key="`${index}_${indexa}_${indexb}_${indexc}_${d}`" width='300'>
                                                    <h-button table @click="addSensitive(itemc, itemb, itema, i.authType)">添加</h-button>
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
        <el-dialog :title="title" :visible.sync="dialogSeedVisible" width="30%" :close-on-click-modal='false' @close="handleClose">
            <el-form :model="form" :rules="formRules" ref="form">
                <el-form-item v-show="title.indexOf('编辑') === -1" label="开发中..." label-width="80px">
                    <el-select v-model="value" placeholder="请选择菜单" @change="onChangeHandle">
                        <el-option v-for="(item, index) in options" :key="index" :label="item.meta.title" :value="JSON.stringify(item)" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单名称" label-width="80px" prop="authName">
                    <el-input v-model="form.authName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单路由" label-width="80px" prop="authUri">
                    <el-input v-model="form.authUri" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" label-width="80px">
                    <el-input v-model="form.sort" autocomplete="off" type='number'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <h-button @click="dialogSeedVisible = false">取消</h-button>
                <h-button type="primary" @click="onAddMenuSure('form')">确定</h-button>
            </div>
        </el-dialog>
        <el-dialog title="敏感配置" :visible.sync="fieldVisible" width="50%" :close-on-click-modal='false'>
            <div class="h-dialog">
                <table class="tablelist textCenter">
                    <thead>
                        <tr>
                            <td width="20%">敏感名</td>
                            <td width="15%">Key</td>
                            <td width="5%">排序</td>
                            <td width="20%">资源uri</td>
                            <td width="10%">操作</td>
                            <td width="10%">操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value, index) in list" :key="index">
                            <td>
                                <el-input v-model="value.resourceName" placeholder="敏感名"></el-input>
                            </td>
                            <td>
                                <el-input v-model="value.resourceKey" placeholder="Key"></el-input>
                            </td>
                            <td>
                                <el-input v-model="value.sort" placeholder="排序"></el-input>
                            </td>
                            <td>
                                <el-input v-model="value.resourceAddress" placeholder="资源uri"></el-input>
                            </td>
                            <td>
                                <h-button @click="onResourceSure(index)">保存</h-button>
                            </td>
                            <td>
                                <h-button table @click="addAuthList" v-show="index + 1 == list.length">添加</h-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
                <h-button @click="onClose">关闭</h-button>
                <!-- <el-button @click="fieldVisible = false">取 消</el-button>
                <el-button type="primary" @click="fieldVisible = false">保 存</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getAuth, addAuth, addAuthType, addAuthResource, editAuthResource, editAuth, clearCache, deleteAuth } from './auth/api'
import { routerMapping } from '../router'
export default {
    name: 'routerConfig',
    data () {
        return {
            options: [],
            value: '',
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
                    { required: true, message: '请输入菜单名称', trigger: 'blur' }
                ],
                authUri: [
                    { required: true, message: '请输入菜单路由', trigger: 'blur' }
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
        handleClose () {
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        onChangeHandle (value) {
            let obj = JSON.parse(value)
            this.form.authUri = obj.path
            this.form.authName = obj.meta.title
        },
        handleRouterData (data, uid) {
            data.map(i => {
                // 添加唯一的uid标识
                if (i.path) {
                    i.uid = uid + i.path
                } else {
                    i.uid = uid
                }
                if (i.children && i.children.length !== 0) {
                    this.handleRouterData(i.children, i.uid + '/')
                }
            })
        },
        async init () {
            // 接口返回的路由
            const { data } = await getAuth()
            var copyData = JSON.parse(JSON.stringify(data))
            // 处理前端的路由数据
            this.handleRouterData(routerMapping, '')
            // 处理库里的路由数据
            this.handleData(copyData, '')
            this.tableList = this.handlerTableList(copyData, 0)
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
        handleData (data, uid) {
            data.map(i => {
                // 添加唯一uid标识
                i.uid = uid + i.authUri
                if (i.childAuthList.length === 0) {
                    // 处理每一级菜单下面的敏感操作
                    i.authTypes = this.compare(i.authTypes)
                } else {
                    this.handleData(i.childAuthList, i.uid + '/')
                }
            })
        },
        // 对每一级菜单下的authTypes进行统一处理
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
        // 添加菜单确认按钮
        onAddMenuSure (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addMenuCommon(this.levObj.lev)
                }
            })
        },
        // 编辑菜单
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
        // 添加菜单
        popupMenu (lev, parent, item) {
            // 初始化
            this.$set(this.form, 'authName', '')
            this.$set(this.form, 'authUri', '')
            this.$set(this.form, 'sort', '')
            this.value = ''
            this.options = []
            this.levObj = {
                lev,
                parent
            }
            if (this.levObj.parent && !this.levObj.parent.id) {
                this.$message.warning('上级菜单不存在')
                return
            }
            if (!parent) {
                this.options = routerMapping
                this.findDiffent(this.options, this.tableList)
            } else {
                this.options = this.getChidlren(parent.uid) && this.getChidlren(parent.uid).children ? this.getChidlren(parent.uid).children : []
                this.findDiffent(this.options, parent.childAuthList)
            }
            if (lev == 1) {
                this.title = '添加一级菜单'
            }
            if (lev == 2) {
                this.title = '添加二级菜单'
            }
            if (lev == 3) {
                this.title = '添加三级菜单'
            }
            if (lev == 4) {
                this.title = '添加四级菜单'
            }
            this.dialogSeedVisible = true
        },
        // 根据uid循环找到本地路由与表中路由不同，限制页面选择
        // 如果库中已添加则不可再次选择添加
        findDiffent (localRouter, originRouter) {
            localRouter.forEach(li => {
                const result = originRouter.findIndex(ri => li.uid === ri.uid)
                if (result > -1) {
                    li.disabled = true
                } else {
                    li.disabled = false
                }
            })
        },
        // 根据uid获取子菜单
        getChidlren (uid) {
            var hasFound = false // 表示是否有找到uid
            var result = null
            var fn = function (data) {
                if (Array.isArray(data) && !hasFound) { // 判断是否是数组并且没有的情况下
                    data.forEach(item => {
                        if (item.uid === uid) { // 数据循环每个子项，并且判断子项下边是否有uid值
                            result = item // 返回的结果等于每一项
                            hasFound = true // 并且找到id值
                        } else if (item.children) {
                            fn(item.children) // 递归调用下边的子项
                        }
                    })
                }
            }
            fn(routerMapping) // 调用一下
            return result
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
            const params = {
                authCode: this.configObj.authCode,
                authTypeId: this.configObj.id,
                resourceName: this.list[i].resourceName,
                resourceKey: this.list[i].resourceKey,
                resourceType: this.configObj.authType,
                sort: this.list[i].sort,
                resourceAddress: this.list[i].resourceAddress
            }
            if (this.list[i].id) {
                params.id = this.list[i].id
                await editAuthResource(params)
            } else {
                await addAuthResource(params)
            }
            this.$message.success(`保存成功`)
            this.init()
        },
        // 配置敏感数据
        onShowFieldConfig (item) {
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
            if (!itema.authCode) {
                this.$message.warning('权限配置菜单不存在')
                return
            }
            const authCode = itemc.authCode ? itemc.authCode : itemb.authCode ? itemb.authCode : itema.authCode
            const params = {
                authCode,
                authType: type
            }
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
.h-dialog {
    padding: 20px;
}
</style>
