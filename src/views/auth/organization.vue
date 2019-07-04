<template>
    <div class="page-body">
        <div class="index h-content">

            <div class="tree">
                <h2 class="h-h2">机构</h2>
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
            <div class="table">
                <h2 class="h-h2">人员/账号</h2>
                <div class="demo-input-suffix">
                    <el-input
                        placeholder="请输入工号\姓名\登陆名进行检索"
                        v-model="keywords" class="keywords">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <el-button type="primary" v-if="true">搜索</el-button>
                </div>
                <div class="result">
                    <OrganizationTable></OrganizationTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OrganizationTable from './components/organizationTable'
export default {
    name: 'index',
    components: {
        OrganizationTable
    },
    data () {
        return {
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            keywords: ''
        }
    },
    methods: {
        handleNodeClick (data) {
            // console.log(data)
        }
    }
}
</script>

<style scoped lang="scss">
    .index {
        overflow: hidden;
        .tree {
            width: 316px;
            padding-right: 24px;
            float: left;

        }
        .table{
            width: 810px;
            float: right;
            padding-left: 24px;
            box-sizing: border-box;
            border-left: 1px solid #E5E5EA;
            h2{
                text-indent: 20px;
            }
            .keywords{
                width: 406px;
                margin-right: 10px;
            }
        }
    }
</style>
