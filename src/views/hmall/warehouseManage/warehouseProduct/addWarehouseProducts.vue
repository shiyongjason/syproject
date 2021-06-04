<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__lable">归属商家：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.spikeName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">SKU编码：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.spikeName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品类目：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.status">
                            <el-option v-for="item in activityStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__lable">商品品牌：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.spikeName" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="onQuery()">查询</h-button>
                    <h-button @click="onReset()">重置</h-button>
                    <h-button @click="onReset()">返回</h-button>
                </div>
            </div>
            <div class="button-cont">
                <h-button type="create" @click="onCreateActivity">新建活动</h-button>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="true" :isShowIndex='true'>
                <template slot="startTime" slot-scope="scope">
                    <span>{{scope.data.row.startTime | formatterTime}}~{{scope.data.row.endTime | formatterTime}}</span>
                </template>
                <template slot="status" slot-scope="scope">
                    {{arrayToMap(activityStatusOptions).get(scope.data.row.status)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button table @click="onEditActivity(scope.data.row)" v-if="scope.data.row.status != 5 && scope.data.row.status != 4">编辑</h-button>
                    <h-button table @click="onCopyActivity(scope.data.row)">复制</h-button>
                    <h-button table @click="onOperate(scope.data.row,2)" v-if="(scope.data.row.status == 1) && scope.data.row.status != 4 && scope.data.row.status != 5">发布</h-button>
                    <h-button table @click="onOperate(scope.data.row,3)" v-if="(scope.data.row.status == 3 || scope.data.row.status == 2) && scope.data.row.status != 4">终止</h-button>
                    <el-tooltip placement="bottom-start">
                        <div slot="content" v-if="scope.data.row.pvdata">截止到{{scope.data.row.pvdata.expiryDate}}<br>累计PV：{{scope.data.row.pvdata.pv}}<br />累计UV：{{scope.data.row.pvdata.uv}}<br /> 累计订单数：{{scope.data.row.pvdata.orderCommits}}<br />累计支付金额：{{scope.data.row.pvdata.totalMoney}}</div>
                        <h-button table @click="onCheckStatistics(scope.data.row)" v-if="scope.data.row.status != 1">数据统计</h-button>
                    </el-tooltip>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'addWarehouseProducts',
    data () {
        return {
            queryParams: {

            },
            resetParams: {

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
