<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="page-body-main flex-wrap">
                <div class="page-left">
                    <div class="page-title">
                        EHR组织机构
                    </div>
                    <el-input placeholder="输入关键字进行过滤" v-model="filterEhr">
                    </el-input>
                    <el-tree ref="leftTree" :data="ehrList" show-checkbox :expand-on-click-node="false" :check-strictly='true' node-key="id" default-expand-all @check-change="handleChangeEhr" :props="{label:'deptname',children:'children'}" :filter-node-method="filterEhrNode">
                    </el-tree>
                </div>
                <div class="page-center">
                    <el-button type="info"  size="mini" @click="onMatching" :disabled=isDisabled>
                        批量匹配
                    </el-button>
                </div>
                <div class="page-right">
                    <div class="page-title">
                        Boss组织机构
                    </div>
                    <el-input placeholder="输入关键字进行过滤" v-model="filterBoss">
                    </el-input>
                    <el-tree ref="rightTree" :data="bossList" node-key="id" show-checkbox :expand-on-click-node="false" default-expand-all :check-strictly='true' @check-change="handleChangeBoss" draggable :props="{label:'organizationName',children:'childOrganizations'}"
                        @node-drag-end="handleDragEnd" :allow-drop="allowDrop" :filter-node-method="filterBossNode">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span  class="page-left-tree">{{ node.label }} </span>
                            <span class="page-right-tree">
                                <template v-for="(item,index) in data.ehrDeptResponseList">
                                    <el-tag closable @close='handleCloseTag(data.ehrDeptResponseList,item,index,node)' size="mini" type="info" :key=item.id>{{item.ehrDeptName}}</el-tag>
                                </template>

                            </span>
                            <span>
                                 <el-button type="text" size="mini" @click="() => edit(data,'edit')">
                                    编辑
                                </el-button>
                                <el-button type="text" size="mini" @click="() => append(data,'add')">
                                    新增
                                </el-button>
                                <el-button type="text" size="mini" @click="() => remove(node, data)">
                                    删除
                                </el-button>
                            </span>
                        </span>
                    </el-tree>
                </div>
            </div>
            <el-button type="primary" @click="handleSumbit">确 定</el-button>
        </div>
        <el-dialog title="节点信息" :visible.sync="dialogVisible" :close-on-click-modal=false width="30%" :before-close="handleClose">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="节点名称" prop="name">
                    <el-input v-model="form.name" maxlength="50"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSaveNode">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang='tsx'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { findOrganizationTree, findEhrTree, updateOrganizationTree, updateOrganizationNode, editOrganizationNode, deleteOrganizationNode } from './api/index'
import './index.scss'

@Component({
    name: 'datamaping'
})
export default class Datamaping extends Vue {
    @State('userInfo') userInfo: any
    $refs!: {
        rightTree: HTMLFormElement,
        leftTree:HTMLFormElement
    }
    id: number = 1010
    ehrData: Record<string, string> = {}
    bossData: Record<string, string> = {}
    bossTreeNodes:Array<any> = []
    ehrTreeNodes:Array<any> = []
    filterEhr:string = ''
    filterBoss:string = ''
    dialogVisible:boolean = false
    form:any = {
        name: ''
    }
    pNode:any = {}
    type:string = ''
    ehrList: Array<any> = []
    bossList: Array<any> = []
    isDisabled: boolean = true
    @Watch('filterEhr') findEhr (val) {
        this.$refs.leftTree.filter(val)
    }

    @Watch('filterBoss') findBoss (val) {
        this.$refs.rightTree.filter(val)
    }

    filterEhrNode (value, data) {
        if (!value) return true
        return data.deptname.indexOf(value) !== -1
    }
    filterBossNode (value, data) {
        if (!value) return true
        return data.organizationName.indexOf(value) !== -1
    }
    rules = {
        name: [
            { required: true, message: '名称必填', trigger: blur }
        ]
    }

    onMatching () {
        // const bossData = this.onClickBoss()
        // const ehrData = this.onClickEHR()
        // if (ehrData.length == 0) {
        //     this.$message.warning('请选择EHR组织机构节点')
        //     return
        // }
        // if (bossData.length == 0) {
        //     this.$message.warning('请选择Boss组织机构节点')
        //     return
        // }
        // console.log(this.checkMaping(this.bossData, this.data, this.ehrData))
        this.ehrTreeNodes.map(item => {
            this.bossList = this.checkMaping(this.bossTreeNodes[0], this.bossList, item)
            this.checkMaping(item, this.ehrList, '')
        })
        this.$refs.rightTree.setCheckedKeys([])
    }

    // 递归 匹配  boss 数据  ehr数据
    checkMaping (val, data, ehr:any) {
        return data.map((item: any) => {
            if (item.id == val.id) {
                console.log('==', item.id, val.id)
                //
                if (ehr == '') {
                    console.log('go')
                    item.disabled = true
                    this.$refs.leftTree.setCheckedKeys([])
                } else {
                    ehr = {
                        ehrDeptCode: ehr.pkDeptdoc,
                        ehrDeptName: ehr.deptname
                    }
                    if (item.ehrDeptResponseList) {
                        item.ehrDeptResponseList.push(ehr)
                    } else {
                        item.ehrDeptResponseList = []
                        item.ehrDeptResponseList.push(ehr)
                    }
                }
                // this.$set(this.data, item, ehr)
            }
            if (item.children) {
                item.children = this.checkMaping(val, item.children, ehr)
            }
            if (item.childOrganizations) {
                item.childOrganizations = this.checkMaping(val, item.childOrganizations, ehr)
            }
            return item
        })
    }
    // 重组EHR数据 末级有 父级不可以选
    onCheckEhrLastStage (data) {
        return data.map(item => {
            item.children = item.childNodeList
            item.id = item.pkDeptdoc
            // 初始化验证 是否关联
            console.log('2', item.hasOwnProperty('relativeNewOrganization'))
            if (item.hasOwnProperty('relativeNewOrganization')) {
                item.disabled = item.relativeNewOrganization
            }
            if (item.childNodeList && item.childNodeList.length > 0) {
                // item.disabled = true
                item.childNodeList = this.onCheckEhrLastStage(item.childNodeList)
            }

            return item
        })
    }
    // 重组BOSS数据 末级有 父级不可以选
    onCheckBossLastStage (data) {
        return data.map(item => {
            // item.children = item.childOrganizations
            if (item.childOrganizations && item.childOrganizations.length > 0) {
                item.disabled = true
                item.childOrganizations = this.onCheckBossLastStage(item.childOrganizations)
            }
            return item
        })
    }
    onCheckEhr (data, val, index) {
        return data.map(item => {
            if (item.id == val.ehrDeptCode) {
                item.disabled = false
            }
            if (item.id == val.id) {
                if (item.ehrDeptResponseList) {
                    // item.ehrNode.filter(i => i.id != val.id)
                    item.ehrDeptResponseList.splice(index, 1)
                }
            }
            if (item.children) {
                item.children = this.onCheckEhr(item.children, val, index)
            }
            if (item.childOrganizations) {
                item.childOrganizations = this.onCheckEhr(item.childOrganizations, val, index)
            }
            return item
        })
    }
    // 放弃单个映射
    handleCloseTag (data, val, index, node) {
        console.log(123, val)
        this.$nextTick(() => {
            // node.data.ehrNode.splice(index, 1)
            this.bossList = this.onCheckEhr(this.bossList, node.data, index)
            // this.$set(data, index, '')
            // 重新渲染ehr 数据
            this.ehrList = this.onCheckEhr(this.ehrList, val, index)
            // this.$forceUpdate()
        })
    }
    // tree 单选
    handleChangeBoss (data, checked) {
        if (checked) {
            this.$refs.rightTree.setCheckedKeys([data.id])
        }
        this.onClickBoss()
    }

    handleChangeEhr () {
        this.onClickEHR()
    }

    onClickBoss () {
        this.bossTreeNodes = this.$refs.rightTree.getCheckedNodes()
        if (this.bossTreeNodes.length > 0 && this.ehrTreeNodes.length > 0) {
            this.isDisabled = false
        } else {
            this.isDisabled = true
        }
    }

    onClickEHR () {
        this.ehrTreeNodes = this.$refs.leftTree.getCheckedNodes()
        if (this.bossTreeNodes.length > 0 && this.ehrTreeNodes.length > 0) {
            this.isDisabled = false
        } else {
            this.isDisabled = true
        }
    }
    // 编辑节点
    edit (data) {
        console.log(data)
        this.dialogVisible = true
        this.form.name = ''
        this.type = 'edit'
        this.pNode = data
    }
    // 新增节点
    append (data) {
        this.dialogVisible = true
        this.form.name = ''
        this.pNode = data
        this.type = 'add'
    }
    // 删除节点
    async remove (node, data) {
        console.log(node, data)
        const parent = node.parent
        const childOrganizations = parent.data.childOrganizations || parent.data
        const index = childOrganizations.findIndex((d) => d.id === data.id)
        childOrganizations.splice(index, 1)
        await deleteOrganizationNode(data.id)
        this.findBossTree()
    }

    handleDragEnd (draggingNode, dropNode, dropType, ev) {
        // console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    }

    // 节点平级移动
    allowDrop (draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
            return type !== 'inner'
        } else {
            return true
        }
    }

    handleClose () {
        this.dialogVisible = false
        this.form.name = ''
    }

    async handleSumbit () {
        await updateOrganizationTree({ organizationNodeList: this.bossList, createBy: this.userInfo.employeeName })
        this.findBossTree()
    }

    handleSaveNode () {
        let params:any = {
            organizationName: this.form.name,
            type: 1
        }
        this.$refs['form'].validate(async valid => {
            if (valid) {
                if (this.type == 'add') {
                    const newChild = { id: this.id++, organizationName: this.form.name, childOrganizations: [] }
                    // 展示的数据
                    // 入库的数据
                    if (!this.pNode.childOrganizations) {
                        this.$set(this.pNode, 'childOrganizations', [])
                    }
                    this.pNode.disabled = true
                    this.pNode.childOrganizations.push(newChild)
                    params.createBy = this.userInfo.employeeName
                    params.parentOrganizationCode = this.pNode.organizationCode
                    await updateOrganizationNode(params)
                } else {
                    params.updateBy = this.userInfo.employeeName
                    params.organizationCode = this.pNode.organizationCode
                    this.$set(this.pNode, 'organizationName', this.form.name)
                    await editOrganizationNode(params)
                }
                this.dialogVisible = false
            }
        })
    }

    private async findBossTree () {
        const { data } = await findOrganizationTree(1)
        this.bossList = this.onCheckBossLastStage(data.organizationNodeList)
    }

    private async findEhrTree () {
        const { data } = await findEhrTree(1)
        this.ehrList = this.onCheckEhrLastStage(data.departmentNodeVOS)
        console.log(this.ehrList)
    }

    mounted () {
        this.findBossTree()
        this.findEhrTree()
    }
}
</script>