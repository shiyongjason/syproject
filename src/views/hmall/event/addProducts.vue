<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-select v-model="queryType">
                            <el-option label="SPU编号" value="1">
                            </el-option>
                            <el-option label="SKU编号" value="2">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-input">
                        <el-input v-model="queryCode" placeholder="输入对应的商品编号" maxlength="50"></el-input>
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
                        <el-button type="primary" class="ml20" @click="onBack">
                            返回
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-button type="primary" class="ml20" @click="onAddproduct">
                        添加({{'已添加'+eventProducts.length}}个)
                    </el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :selectable="selectable" :multiSelection.sync="multiSelection" :isMultiple="true" :isAction="false" :actionMinWidth=250
              :row-class-name="tableRowClassName"  :isShowIndex='false'>
                <template slot="skuName" slot-scope="scope">
                    <div class="proImg">
                        <img :src="scope.data.row.pictureUrl" alt="">
                        {{scope.data.row.skuName}}
                    </div>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'eventmanage',
    data () {
        return {
            queryParams: {
                skuCode: '',
                spuCode: '',
                pageSize: 10,
                pageNumber: 1
            },
            copyParams: {},
            queryCode: '',
            queryType: '1',
            tableData: [],
            tableLabel: [
                { label: '商品', prop: 'skuName', width: '250' },
                { label: 'SPU编码', prop: 'spuCode' },
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '品牌', prop: 'brandName' },
                { label: '所属商家', prop: 'merchantName' },
                { label: '建议零售价', prop: 'retailPrice' },
                { label: '销售价', prop: 'sellPrice' },
                { label: '库存', prop: 'inventoryNum' }
            ],
            paginationInfo: {},
            multiSelection: []
        }
    },
    computed: {
        ...mapState({
            skuData: state => state.eventManage.skuData,
            eventProducts: state => state.eventManage.eventProducts
        }),
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
    async mounted () {
        this.onFindSkuList()
        this.copyParams = { ...this.queryParams }
    },
    methods: {
        ...mapMutations({ addProducts: 'ADD_EVENT_PRODUCTS' }),
        ...mapActions({ setNewTags: 'setNewTags', findListSku: 'findListSku' }),
        searchList () {
            this.queryParams.pageNumber = 1
            if (this.queryType === '1') {
                this.queryParams.spuCode = this.queryCode
                this.queryParams.skuCode = ''
            } else {
                this.queryParams.skuCode = this.queryCode
                this.queryParams.spuCode = ''
            }
            this.onFindSkuList()
        },
        onRest () {
            this.queryCode = ''
            this.queryType = '1'
            this.queryParams = { ...this.copyParams }
            this.searchList()
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.onFindSkuList()
        },
        handleCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.onFindSkuList()
        },
        onAddproduct () {
            if (this.multiSelection.length > 0) {
                this.addProducts(this.multiSelection)
                this.$notify({
                    message: '商品添加成功',
                    type: 'success'
                })
                this.onFindSkuList()
            } else {
                this.$message({
                    message: '请选择商品',
                    type: 'warning'
                })
            }
        },
        onBack () {
            // this.$router.go(-1)
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/hmall/createEditEvent')
        },
        selectable (row) {
            return !row.isChecked
        },
        async  onFindSkuList () {
            await this.findListSku(this.queryParams)
            this.tableData = this.skuData.records
            this.findChecked()
            this.paginationInfo = {
                total: this.skuData.total,
                pageNumber: this.skuData.current,
                pageSize: this.skuData.size
            }
        },
        findChecked () {
            this.eventProducts.map(item => {
                this.tableData.map(val => {
                    if (val.id === item.id) {
                        val.isChecked = true
                    }
                })
            })
        },
        // 设置表格已经加入我的商品的背景
        tableRowClassName ({ row, rowIndex }) {
            if (row.isChecked) return 'pulled'
        }
    }
}
</script>
<style lang="scss" scoped>
.proImg {
    // display: flex;
    // justify-content: flex-start;
    // align-items: center;
    white-space:normal;
    word-break:break-all;
    word-wrap:break-word;
    width: 240px;
    text-align: left;
    img {
        display: block;
        width: 40px;
        height: 40px;
        margin-right: 10px;
        float: left;
    }
}
/deep/ .pulled {
    background: #e3e3e3e3;
    opacity: 0.7;

}

</style>