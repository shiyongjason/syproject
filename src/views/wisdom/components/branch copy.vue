<template>
    <div class="wrapper page-table">
        <div class="collapse">
            <img src="../../../assets/images/typeIcon.png" alt="" class="collapse" @click="collapse = !collapse">
        </div>
        <el-collapse-transition>
            <div class="collapse-content" v-if="collapse">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="selectTh" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="item in defaultTh" :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </el-collapse-transition>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column
                align="center"
                prop="subsectionCode"
                label="分部编码" v-if="selectTh.indexOf('分部编码')>-1">
            </el-table-column>
            <el-table-column
                prop="subsectionName"
                align="center"
                label="分部" v-if="selectTh.indexOf('分部')>-1">
            </el-table-column>
            <el-table-column
                prop="date"
                align="center"
                label="目标年份" v-if="selectTh.indexOf('目标年份')>-1">
            </el-table-column>
            <el-table-column
                align="center"
                label="新增会员店目标/家" v-if="selectTh.indexOf('新增会员店目标/家')>-1">
                <template slot-scope="scope">
                    {{scope.row.memberShopTarget ? scope.row.memberShopTarget : '-'}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="保底目标/万" v-if="selectTh.indexOf('保底目标/万')>-1">
                    <el-table-column
                        align="center"
                        label="整体">
                        <template slot-scope="scope">
                            {{scope.row.overallGuaranteeStockTarget ? scope.row.overallGuaranteeStockTarget : '-'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="增量">
                        <template slot-scope="scope">
                            {{scope.row.guaranteeIncreaseTarget ? scope.row.guaranteeIncreaseTarget : '-'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="存量">
                        <template slot-scope="scope">
                            {{scope.row.guaranteeStockTarget ? scope.row.guaranteeStockTarget : '-'}}
                        </template>
                    </el-table-column>
            </el-table-column>
            <el-table-column
                prop="address"
                align="center"
                label="平衡目标/万" v-if="selectTh.indexOf('平衡目标/万')>-1">
                <el-table-column
                    label="整体" align='center'
                    >
                    <template slot-scope="scope">
                    {{scope.row.overallBalanceStockTarget ? scope.row.overallBalanceStockTarget : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="增量" align='center'
                    >
                    <template slot-scope="scope">
                    {{scope.row.balanceIncreaseTarget ? scope.row.balanceIncreaseTarget : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="存量" align='center'
                    >
                    <template slot-scope="scope">
                    {{scope.row.balanceStockTarget ? scope.row.balanceStockTarget : '-'}}
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                prop="address"
                align="center"
                label="冲刺目标/万" v-if="selectTh.indexOf('冲刺目标/万')>-1">
                <el-table-column
                    label="整体" align='center'>
                    <template slot-scope="scope">
                        {{scope.row.overallSprintStockTarget ? scope.row.overallSprintStockTarget : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="增量" align='center'>
                    <template slot-scope="scope">
                    {{scope.row.sprintIncreaseTarget ? scope.row.sprintIncreaseTarget : '-'}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="存量" align='center'>
                    <template slot-scope="scope">
                    {{scope.row.sprintStockTarget ? scope.row.sprintStockTarget : '-'}}
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                align="center"
                label="毛利率目标/％" v-if="selectTh.indexOf('毛利率目标/％')>-1">
                <template slot-scope="scope">
                    {{scope.row.annualGrossProfitTarget  ? scope.row.annualGrossProfitTarget + '%' : '-'}}
                </template>
            </el-table-column>
            <el-table-column
                prop="updateUser"
                align="center"
                label="最近操作人" v-if="selectTh.indexOf('最近操作人')>-1">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                align="center"
                label="最近操作时间" v-if="selectTh.indexOf('最近操作时间')>-1">
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination
                class="el-page"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationData.pageNumber"
                :page-sizes="[10,20,30,40,50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationData.totalElements">
            </el-pagination>
        </div>
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
            defaultTh: [
                '分部编码',
                '分部',
                '目标年份',
                '新增会员店目标/家',
                '保底目标/万',
                '平衡目标/万',
                '冲刺目标/万',
                '毛利率目标/％',
                '最近操作人',
                '最近操作时间'
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
        handleCheckAllChange (val) {
            if (val) {
                this.selectTh = this.defaultTh
            } else {
                this.selectTh = []
                this.isIndeterminate = this.checkAll = false
            }
            localStorage.setItem('selectTh', JSON.stringify({ value: this.selectTh, name: this.userInfo.uid }))
        },
        handleCheckedCitiesChange (value) {
            localStorage.setItem('selectTh', JSON.stringify({ value: value, name: this.userInfo.uid }))
            let checkedCount = value.length
            this.checkAll = checkedCount === this.defaultTh.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.defaultTh.length
        }
    },
    mounted () {
        const selectTh = JSON.parse(localStorage.getItem('selectTh'))
        if (selectTh) {
            let { name, value } = selectTh
            if (name === this.userInfo.uid && value) {
                if (value.length === this.defaultTh.length) {
                    this.isIndeterminate = true
                    this.checkAll = true
                } else {
                    this.isIndeterminate = false
                    this.checkAll = false
                }
                this.selectTh = value
            } else {
                this.selectTh = this.defaultTh
            }
        } else {
            this.selectTh = this.defaultTh
        }
    }
}
</script>

<style scoped>
.wrapper{
    position: relative;
}
    .collapse{
        position: absolute;
        width: 20px;
        height: 20px;
        right: 10px;
        top: 2px;
        z-index: 1;
        cursor: pointer;
    }
    .collapse-content{
        position: absolute;
        width: 180px;
        top: 35px;
        right: 10px;
        background: #ffffff;
        z-index: 2;
        padding: 10px 18px;
        box-sizing: border-box;
    }
.el-checkbox+.el-checkbox{
    margin-left: 0;
    float: left;
    width: 100%;
}
</style>
