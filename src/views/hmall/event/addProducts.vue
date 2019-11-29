<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-select v-model="queryParams">
                            <el-option label="SPU编号" value="">
                            </el-option>
                            <el-option label="SKU编号" value="1">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                     <div class="query-col-input">
                        <el-input v-model="queryParams" placeholder="输入对应的商品编号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-button type="primary" class="ml20" @click="searchList()">
                            查询
                        </el-button>
                        <el-button type="primary" class="ml20" @click="onRest()">
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange"
            :multiSelection.sync="multiSelection" :isMultiple="true" :isAction="false" :actionMinWidth=250  :isShowIndex='false'>
                <template slot="product" slot-scope="scope">
                    <div class="proImg">
                        <img src="../../../assets/images/img_1.png" alt="">
                        {{scope.data.row.product}}
                    </div>
                </template>
            </basicTable>
        </div>
        <!-- <shopManagerTable ref="shopManagerTable" :tableData="tableData" :paginationData="paginationData" @updateStatus="onQuery" @updateBrand="updateBrandChange" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></shopManagerTable> -->
    </div>
</template>
<script>
import { EVENT_LIST } from './const'
export default {
    name: 'eventmanage',
    data () {
        return {
            queryParams: {},
            tableData: [],
            tableLabel: [
                { label: '商品', prop: 'product', width: '250' },
                { label: 'SPU编码', prop: 'spuCode' },
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '品牌', prop: 'brand' },
                { label: '所属商家', prop: 'member' },
                { label: '建议零售价', prop: 'price' },
                { label: '销售价', prop: 'price' },
                { label: '库存', prop: 'price' }
            ],
            paginationInfo: {},
            eventsState: EVENT_LIST
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    mounted () {
        console.log(EVENT_LIST)
        this.tableData = [{ product: '23', spuCode: '123123', skuCode: '2222', brand: '大金', member: '勇哥' }, { spuCode: '123123' }, { skuCode: '2222' }]
    },
    methods: {
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.searchList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchList()
        },
        multiSelection () {

        },
        onClickStatics () {
            this.$router.push({ path: '/hmall/eventStatistics', query: {} })
        }
    }
}
</script>
<style lang="scss" scoped>
.proImg{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
}
</style>