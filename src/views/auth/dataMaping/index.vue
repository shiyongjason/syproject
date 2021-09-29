<template>
    <div class="page-body B2b">
        <div class="page-body-cont flex-wrap">
            <div class="page-left">
                <el-tree :data="data" node-key="id" :expand-on-click-node="false" default-expand-all @node-click="onClickEHR"  highlight-current>

                </el-tree>
            </div>
            <div class="page-center">
                <el-button type="text" size="mini" @click="onMatching">
                    批量匹配
                </el-button>
            </div>
            <div class="page-right">
                <el-tree :data="data" node-key="id" show-checkbox :expand-on-click-node="false" default-expand-all @check="onClickBoss" @node-drag-end="handleDragEnd" :check-strictly='true' :check-on-click-node='true' @node-drop="handleDrop" draggable :allow-drop="allowDrop"
                    :allow-drag="allowDrag">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}123</span>
                        <span>
{{data.ehrNode&&data.ehrNode.label}}
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
    id: number = 1000
    ehrData:Record<string, string> = {}
    bossData:Record<string, string> = {}

    data: Array<any> = [
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
                            ehrNode: { label: '西部世界' }
                        },
                        {
                            id: 10,
                            label: '三级 1-1-2',
                            ehrNode: { label: '西部世界2' }
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
                            label: '三级 3-2-1',
                            disabled: true
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
    ];
    defaultProps = {
        children: 'children',
        label: 'label'
    };

    onMatching () {
        console.log(this.bossData)
        // console.log(this.checkMaping(this.bossData, this.data, this.ehrData))
        this.data = this.checkMaping(this.bossData, this.data, this.ehrData)
        console.log(this.data)
    }

    // 递归 匹配
    checkMaping (val, data, ehr) {
        return data.map((item:any) => {
            if (item.id == val.id) {
                item.ehrNode = ehr
                // this.$set(this.data, item, ehr)
            }
            if (item.children) {
                item.children = this.checkMaping(val, item.children, ehr)
            }
            return item
        })
    }

    handleDragEnd (draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    }

    handleDrop (draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType)
    }
    onClickBoss (data) {
        this.bossData = data
        console.log(this.bossData)
    }

    onClickEHR (data):void {
        this.ehrData = data
    }

    allowDrop (draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
            return type !== 'inner'
        } else {
            return true
        }
    }

    allowDrag (draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1
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
}
</script>