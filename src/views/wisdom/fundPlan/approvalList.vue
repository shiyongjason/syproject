<template>
    <div class="page-body approval">
       <div>
           <el-tabs v-model="activeName" @tab-click="handleClick">
               <el-tab-pane label="我的待办" name="first">
                   <approvalTable></approvalTable>
               </el-tab-pane>
               <el-tab-pane label="我的已办" name="second">
                   <approvalTable></approvalTable>
               </el-tab-pane>
           </el-tabs>
       </div>
    </div>
</template>

<script>
import approvalTable from './components/approvalTable'
export default {
    name: 'ApprovalList',
    components: {
        approvalTable
    },
    data () {
        return {
            activeName: 'second'
        }
    },
    methods: {
        handleClick (tab, event) {
            console.log(tab, event)
        }
    }

}
</script>

<style scoped lang="scss">
.approval {
    background: #ffffff;
    padding: 60px 25px 30px;
    box-sizing: border-box;
}
/deep/ .el-tabs__item.is-active {
    color: #333;
    background: transparent;
}

/deep/ .el-tabs__header {
    margin: 0
}
</style>
