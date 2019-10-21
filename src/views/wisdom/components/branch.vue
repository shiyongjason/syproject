<template>
    <div class="page-table">
        <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationData" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250 >
        </basicTable>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'branch',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        paginationData: {
            type: Object,
            default () {
                return {
                    totalElements: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        }
    },
    data () {
        return {
            tableLabel: [
                { label: '分部编码', prop: 'subsectionCode' },
                { label: '分部', prop: 'subsectionName', choosed: true },
                { label: '目标年份', prop: 'data', choosed: true },
                { label: '新增会员店目标/家', prop: 'memberShopTarget', choosed: true },
                { label: '保底目标/万',
                    tableLabel: [
                        { label: '整体', prop: 'overallGuaranteeStockTarget', choosed: true },
                        { label: '增量', prop: 'guaranteeIncreaseTarget', choosed: true },
                        { label: '存量', prop: 'guaranteeStockTarget', choosed: true }
                    ] },
                { label: '平衡目标/万',
                    tableLabel: [
                        { label: '整体', prop: 'overallBalanceStockTarget', choosed: true },
                        { label: '增量', prop: 'balanceIncreaseTarget', choosed: true },
                        { label: '存量', prop: 'balanceStockTarget', choosed: true }
                    ] },
                { label: '冲刺目标/万',
                    tableLabel: [
                        { label: '整体', prop: 'overallSprintStockTarget', choosed: true },
                        { label: '增量', prop: 'sprintIncreaseTarget', choosed: true },
                        { label: '存量', prop: 'sprintStockTarget', choosed: true }
                    ] },
                { label: '毛利率目标/％', prop: 'annualGrossProfitTarget', choosed: true },
                { label: '最近操作人', prop: 'updateUser', choosed: true },
                { label: '最近操作时间', prop: 'updateTime', choosed: true }
            ],
            selectTh: [],
            checkAll: true,
            checkedCities: [],
            isIndeterminate: true,
            collapse: false
        }
    },
    methods: {
        handleSizeChange (val) {
            this.loading = true
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val)
        },
        onCurrentChange (val) {
            this.$emit('onCurrentChange', val)
        },
        onSizeChange (val) {
            this.$emit('onSizeChange', val)
        }
    },
    mounted () {
        // const selectTh = JSON.parse(localStorage.getItem('selectTh'))
        // if (selectTh) {
        //     let { name, value } = selectTh
        //     if (name === this.userInfo.uid && value) {
        //         if (value.length === this.defaultTh.length) {
        //             this.isIndeterminate = true
        //             this.checkAll = true
        //         } else {
        //             this.isIndeterminate = false
        //             this.checkAll = false
        //         }
        //         this.selectTh = value
        //     } else {
        //         this.selectTh = this.defaultTh
        //     }
        // } else {
        //     this.selectTh = this.defaultTh
        // }
    }
}
</script>

<style scoped>
.wrapper {
    position: relative;
}
.collapse {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 2px;
    z-index: 1;
    cursor: pointer;
}
.collapse-content {
    position: absolute;
    width: 180px;
    top: 35px;
    right: 10px;
    background: #ffffff;
    z-index: 2;
    padding: 10px 18px;
    box-sizing: border-box;
}
.el-checkbox + .el-checkbox {
    margin-left: 0;
    float: left;
    width: 100%;
}
</style>
