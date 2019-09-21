<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">商家名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.name" placeholder="请输入商家名称">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品类目：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.reservationPerson" placeholder="请输入商品类目">
                        </el-input>
                    </div>
                </div>
                <!-- <div class="query-cont-col">
                    <div class="flex-wrap-title">商品类目：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.reservationStatus" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="销售" value="1"></el-option>
                            <el-option label="销售总监" value="2"></el-option>
                        </el-select>
                    </div>
                </div> -->
                <div class="query-cont-col">
                    <div class="query-col-title">商品品牌：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.reservationPerson" placeholder="请输入商品品牌">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="50" v-model="queryParams.reservationPerson" placeholder="请输入商品名称">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                        <el-button type="primary" class="ml20" @click="onReset()">重置</el-button>
                        <!-- <el-button type="primary" class="ml20">导出</el-button> -->
                    </div>
                </div>
            </div>
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isPagination='true' :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
            </basicTable>
        </div>
    </div>
</template>

<script>
export default {
    name: 'marketStore',
    data () {
        return {
            tableLabel: [
                { label: '商品编码', prop: 'originatorName' },
                { label: '商品名称', prop: 'institution' },
                { label: '品牌', prop: 'originTime' },
                { label: '商品类目', prop: 'allSubmitTime' },
                { label: '商家名称', prop: 'handleTime' },
                { label: '建议零售价', prop: 'finalScore' },
                { label: '销售价格', prop: 'price', event: true },
                { label: '佣金', prop: 'brokerage' },
                { label: '商品库存', prop: 'inventory', colorLeave: { bound: 0, notReach: 'red', reach: '' } }
            ],
            tableData: [
                {
                    originatorName: '1000001',
                    institution: '格力',
                    originTime: '格力',
                    allSubmitTime: '1>2>3',
                    handleTime: '南京万x连',
                    finalScore: '1234',
                    price: '100',
                    brokerage: '2',
                    inventory: '10',
                    shy: [
                        {
                            numberCase: 10,
                            discount: '10%'
                        },
                        {
                            numberCase: 10,
                            discount: '10%'
                        }
                    ]
                }, {
                    originatorName: '1000001',
                    institution: '格力',
                    originTime: '格力',
                    allSubmitTime: '1>2>3',
                    handleTime: '南京万x连',
                    finalScore: '1234',
                    price: '100',
                    brokerage: '2',
                    inventory: '10',
                    shy: [
                        {
                            numberCase: 10,
                            discount: '10%'
                        },
                        {
                            numberCase: 10,
                            discount: '10%'
                        }
                    ]
                }, {
                    originatorName: '1000001',
                    institution: '格力',
                    originTime: '格力',
                    allSubmitTime: '1>2>3',
                    handleTime: '南京万x连',
                    finalScore: '1234',
                    price: '100',
                    brokerage: '2',
                    inventory: '0'
                }
            ],
            searchParams: {},
            queryParams: {
                name: '',
                reservationPerson: '',
                source: '',
                reservationStatus: ''
            },
            paginationData: {
                pageNumber: 1,
                pageSize: 10,
                total: 100
            }
        }
    },
    methods: {
        onQuery () {
            console.log('搜索')
            const { ...params } = { ...this.queryParams }
            this.searchParams = params
            this.search()
        },
        onReset () {
            console.log('重置')
            this.$set(this.queryParams, 'name', '')
            this.$set(this.queryParams, 'reservationPerson', '')
            this.$set(this.queryParams, 'source', '')
            this.$set(this.queryParams, 'reservationStatus', '')
            this.$set(this.paginationData, 'pageNumber', 1)
            this.$set(this.paginationData, 'pageSize', 10)
            this.onQuery()
        },
        search () {
            const searchParams = {
                ...this.searchParams,
                ...this.paginationData
            }
            console.log(searchParams)
        },
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            const { ...page } = val
            this.paginationData = page
            this.search()
        }
    },
    mounted () {
        this.onQuery()
    }
}
</script>

<style scoped>
</style>