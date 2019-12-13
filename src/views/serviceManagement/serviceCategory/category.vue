<template>
<div class="category">
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery()">添加子类目</el-button>
                    <el-button type="primary" class="ml20" @click="onReset()">编辑类目</el-button>
                    <el-button type="primary" class="ml20" @click="onReset()">删除类目</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont content">
            <div class="tree">
                <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
                </el-input>
                <el-tree
                    class="filter-tree"
                    :data="data"
                    :props="defaultProps"
                    default-expand-all
                    :filter-node-method="filterNode"
                    ref="tree">
                </el-tree>
            </div>
            <div class="edit">
               <div class="main">
                   <div class="sub-title">
                       家电服务 ->家电清洗 -> 空调清洗
                   </div>
                   <el-form class="form">
                       test
                   </el-form>
               </div>
                <div class="btn-group">
                    <el-button type="primary" class="ml20">保存</el-button>
                    <el-button type="primary" class="ml20">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'category',
    data () {
        return {
            filterText: []
        }
    }
}
</script>

<style scoped>
    .content{
        display: flex;
    }
.tree {
    width: 380px;
}
    .edit{
        margin-left: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
