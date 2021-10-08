<template>
    <div class="page-body B2b">
        <div class="page-body-cont flex-wrap">
            <div class="page-left">
                <div class="page-title">
                    EHR组织机构
                </div>
                <el-input placeholder="输入关键字进行过滤" v-model="filterEhr">
                </el-input>
                <el-tree ref="leftTree" :data="data1" show-checkbox :expand-on-click-node="false" :check-strictly='true' node-key="id" default-expand-all :filter-node-method="filterEhrNode">
                </el-tree>
            </div>
            <div class="page-center">
                <el-button type="text" size="mini" @click="onMatching">
                    批量匹配
                </el-button>
            </div>
            <div class="page-right">
                <div class="page-title">
                    Boss组织机构
                </div>
                <el-input placeholder="输入关键字进行过滤" v-model="filterBoss">
                </el-input>
                <el-tree ref="rightTree" :data="data" node-key="id" show-checkbox :expand-on-click-node="false" default-expand-all :check-strictly='true' @check-change="handleCheckChange" draggable @node-drag-end="handleDragEnd"  :allow-drop="allowDrop" :filter-node-method="filterBossNode">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }} </span>
                        <span class="page-right-tree">
                            <template v-for="(item,index) in data.ehrNode">
                                <el-tag closable @close='handleCloseTag(data.ehrNode,item,index)' size="mini" type="info" :key=item.id>{{item.label}}</el-tag>
                            </template>
                            <el-button type="text" size="mini" @click="() => append(data)">
                                编辑
                            </el-button>
                            <el-button type="text" size="mini" @click="() => append(data)">
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
        <el-button type="primary" @click="handleSumbit">确定</el-button>
    </div>
</template>

<script lang='tsx'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
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
    id: number = 1000;
    ehrData: Record<string, string> = {}
    bossData: Record<string, string> = {}
    filterEhr:string = ''
    filterBoss:string = ''

    data1: Array<any> = [
        {
            id: 1,
            label: '一级 1',
            children: [
                {
                    id: 4,
                    label: '二级 1-1',
                    children: [
                        {
                            id: 9,
                            label: '三级 1-1-1',
                            ehrNode: [{ label: '西部世界' }]
                        },
                        {
                            id: 10,
                            label: '三级 1-1-2',
                            ehrNode: [{ label: '西部世界2' }]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            label: '一级 2',
            children: [
                {
                    id: 5,
                    label: '二级 2-1'
                },
                {
                    id: 6,
                    label: '二级 2-2'
                }
            ]
        },
        {
            id: 3,
            label: '一级 3',
            children: [
                {
                    id: 7,
                    label: '二级 3-1'
                },
                {
                    id: 8,
                    label: '二级 3-2',
                    children: [
                        {
                            id: 11,
                            label: '三级 3-2-1'
                        },
                        {
                            id: 12,
                            label: '三级 3-2-2'
                        },
                        {
                            id: 13,
                            label: '三级 3-2-3'
                        }
                    ]
                }
            ]
        }
    ]
    data: Array<any> = [
        {
            id: 1,
            label: '一级 1',
            disabled: true,
            children: [
                {
                    id: 4,
                    label: '二级 1-1',
                    disabled: true,
                    children: [
                        {
                            id: 9,
                            label: '三级 1-1-1',
                            ehrNode: [{ label: '西部世界' }]
                        },
                        {
                            id: 10,
                            label: '三级 1-1-2',
                            ehrNode: [{ label: '西部世界2' }]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            label: '一级 2',
            disabled: true,
            children: [
                {
                    id: 5,
                    label: '二级 2-1'
                },
                {
                    id: 6,
                    label: '二级 2-2'
                }
            ]
        }
    ]
    defaultProps = {
        children: 'children',
        label: 'label'
    }

    @Watch('filterEhr') findEhr (val) {
        this.$refs.leftTree.filter(val)
    }

    @Watch('filterBoss') findBoss (val) {
        this.$refs.rightTree.filter(val)
    }

    filterEhrNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
    }
    filterBossNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
    }
    onMatching () {
        const bossData = this.onClickBoss()
        const ehrData = this.onClickEHR()
        if (ehrData.length == 0) {
            this.$message.warning('EHR组织机构')
            return
        }
        if (bossData.length == 0) {
            this.$message.warning('boss组织机构')
            return
        }
        // console.log(this.checkMaping(this.bossData, this.data, this.ehrData))
        ehrData.map(item => {
            this.data = this.checkMaping(bossData[0], this.data, item)
            this.checkMaping(item, this.data1, '')
        })
        this.$refs.rightTree.setCheckedKeys([])
    }

    // 递归 匹配
    checkMaping (val, data, ehr) {
        return data.map((item: any) => {
            if (item.id == val.id) {
                //
                if (ehr == '') {
                    item.disabled = true
                    // this.$refs.leftTree.setCheckedKeys([val.id], false)
                    this.$refs.leftTree.setCheckedKeys([])
                } else {
                    if (item.ehrNode) {
                        item.ehrNode.push(ehr)
                    } else {
                        item.ehrNode = []
                        item.ehrNode.push(ehr)
                    }
                }
                // this.$set(this.data, item, ehr)
            }
            if (item.children) {
                item.children = this.checkMaping(val, item.children, ehr)
            }
            return item
        })
    }
    onCheckLastStage (data) {
        return data.map(item => {
            item.ehrNode = []
            if (item.children && item.children.length > 0) {
                item.disabled = true
                item.children = this.onCheckLastStage(item.children)
            }
            return item
        })
    }
    onCheckEhr (data, val) {
        return data.map(item => {
            if (item.id == val.id) {
                item.disabled = false
                if (item.ehrNode) {
                    item.ehrNode.filter(i => i.id != val.id)
                }
            }
            if (item.children) {
                item.children = this.onCheckEhr(item.children, val)
            }
            return item
        })
    }
    // 放弃当个映射
    handleCloseTag (data, val, index) {
        console.log(123, data, val)
        data.splice(index, 1)
        // this.$set(data, index, '')
        this.data1 = this.onCheckEhr(this.data1, val)
        // this.$forceUpdate()
    }
    // tree 单选
    handleCheckChange (data, checked) {
        // console.log('00', data)
        if (checked) {
            this.$refs.rightTree.setCheckedKeys([data.id])
        }
    }

    onClickBoss () {
        return this.$refs.rightTree.getCheckedNodes()
    }

    onClickEHR () {
        return this.$refs.leftTree.getCheckedNodes()
    }

    append (data) {
        // 弹窗
        const newChild = { id: this.id++, label: 'testtest', children: [] }
        if (!data.children) {
            this.$set(data, 'children', [])
        }
        data.children.push(newChild)
    }

    remove (node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex((d) => d.id === data.id)
        children.splice(index, 1)
    }

    handleDragEnd (draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    }

    // 节点平级移动
    allowDrop (draggingNode, dropNode, type) {
        console.log(draggingNode, dropNode)
        if (dropNode.data.label === '二级 3-1') {
            return type !== 'inner'
        } else {
            return true
        }
    }

    handleSumbit () {
        console.log(this.data)
    }

    mounted () {
        this.data1 = this.onCheckLastStage(this.data1)
        this.data = this.onCheckLastStage(this.data)
        console.log(this.data)
    }
}
</script>