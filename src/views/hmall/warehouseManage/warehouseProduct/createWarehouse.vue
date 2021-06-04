<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-form ref='form' :model="form" :rules="rules" label-width="120px">
                <el-form-item label="商品类型：" prop="spikeName">
                    <el-input v-model.trim="form.spikeName" placeholder="请输入活动名称" maxlength="255" clearable></el-input>
                </el-form-item>
                <el-form-item label="市区运费价格：" prop="startTime">
                    <el-input v-model.trim="form.spikeName" placeholder="请输入活动名称" maxlength="255" clearable></el-input>
                </el-form-item>
                <el-form-item label="县区运费价格：" prop="startTime">
                    <el-input v-model.trim="form.spikeName" placeholder="请输入活动名称" maxlength="255" clearable></el-input>
                </el-form-item>
                <el-form-item label="选择商家：" prop="spikeAreaList">
                    <el-input v-model.trim="form.spikeName" placeholder="请输入活动名称" maxlength="255" clearable></el-input>
                </el-form-item>
                <el-form-item label-width="0px">
                    <h-button type="create" @click="onAddProduct">选择商品</h-button>
                </el-form-item>
                <basicTable :tableLabel="tableLabel" :tableData="tableData" :isAction="true" :isShowIndex='true'>
                </basicTable>
            </el-form>
        </div>
        <div class="page-body-cont btn-cont">
            <h-button @click="onCancel">取消</h-button>
            <h-button type="primary" @click='onSubmit'>确认</h-button>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'createWarehouse',
    data () {
        return {
            form: {

            },
            rules: {},
            tableLabel: [

            ],
            tableData: []
        }
    },
    computed: {
        userInfo: state => state.userInfo
    },
    methods: {
        onAddProduct () {
            this.$router.push({ path: '/b2b/warehouse/addWarehouseProducts' })
        },
        onSubmit () {

        },
        onCancel () {

        }
    },
    mounted () {

    }
}
</script>
