<template>
    <div>
        <el-table :data="list" border style="width: 100%" size="small">
            <el-table-column prop="key" align="center" label="订单号"></el-table-column>
            <el-table-column prop="key" align="center" label="渠道名称"></el-table-column>
            <el-table-column prop="key" align="center" label="预约单号"></el-table-column>
            <el-table-column prop="key" align="center" label="姓名"></el-table-column>
            <el-table-column prop="key" align="center" label="手机号"></el-table-column>
            <el-table-column prop="key" align="center" label="地址" width="220"></el-table-column>
            <el-table-column prop="key" align="center" label="预约方式"></el-table-column>
            <el-table-column prop="key" align="center" label="预约内容"></el-table-column>
            <el-table-column prop="key" align="center" property="date" label="预约时间"></el-table-column>
            <el-table-column prop="key" align="center" label="状态"></el-table-column>
            <el-table-column prop="key" align="center" label="操作" fixed="right">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                    <el-button type="text" size="mini">修改</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
export default {
    name: 'informationTable',
    props: ['list'],
    data () {
        return {}
    },
    methods: {},
    mounted () {}
}
</script>

<style scoped></style>