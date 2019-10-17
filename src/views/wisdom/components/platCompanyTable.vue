<template>
    <div class="page-table">
        <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationData" @onCurrentChange="onCurrentChange" @onSizeChange="onSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250>
            <template slot="confirmDate" slot-scope="scope">
                {{scope.data.row.companyOrderVo.confirmDate}}
            </template>
            <template slot="signScale" slot-scope="scope">
                <span @click="findSignscale(scope.data.row.companyCode)" class="pointer blue">{{scope.data.row.developSignInfoVo.signScale}}</span>
            </template>
            <template slot="salesVolume" slot-scope="scope">
                {{scope.data.row.developSignInfoVo.salesVolume*100}}%
            </template>
            <template slot="sumRegisterFund" slot-scope="scope">
                {{scope.data.row.registeredFundChangeVo.sumRegisterFund}}
            </template>
            <template slot="ourRegisteredFund" slot-scope="scope">
                {{scope.data.row.developSignInfoVo.ourRegisteredFund}}
            </template>
            <template slot="profitGrowth" slot-scope="scope">
                {{scope.data.row.developSignInfoVo.profitGrowth*100}}%
            </template>
            <template slot="totalOrderFee" slot-scope="scope">
                {{scope.data.row.companyOrderVo ? scope.data.row.companyOrderVo.totalOrderFee : ''}}
            </template>
            <template slot="signerName" slot-scope="scope">
                {{scope.data.row.developSignInfoVo.signerName}}
            </template>
        </basicTable>
        <div class="page clearfix" style="text-align: right;margin-top: 20px">
                <el-pagination class="el-page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.pageNumber" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 40, 50]" :total="paginationData.totalElements">
                </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'platCompanyTable',
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
                { label: '编码', prop: 'misCode' },
                { label: '公司简称', prop: 'companyShortName', choosed: true },
                { label: '分部', prop: 'subsectionName', choosed: true },
                { label: '省份', prop: 'provinceName', choosed: true },
                { label: '城市', prop: 'cityName', choosed: true },
                { label: '上线信息',
                    tableLabel: [
                        { label: '上线时间', prop: 'confirmDate', choosed: true },
                        { label: '最新签约规模/万', prop: 'signScale', choosed: true },
                        { label: '销售规模增长', prop: 'salesVolume', choosed: true },
                        { label: '注册资本/万', prop: 'sumRegisterFund', choosed: true },
                        { label: '我方注册资金/万', prop: 'ourRegisteredFund', choosed: true },
                        { label: '利润增长', prop: 'profitGrowth', choosed: true }
                    ] },
                { label: '往期销售',
                    tableLabel: [
                        { label: '上年度实际/万', prop: 'totalOrderFee', choosed: true }
                    ] },
                { label: '关键人员',
                    tableLabel: [
                        { label: '实际控制人', prop: 'controllerName', choosed: true },
                        { label: '新公司总经理', prop: 'signerName', choosed: true },
                        { label: '自然人股东', prop: 'signerName', choosed: true }
                    ] }
            ],
            defaultTh: [
                '编码',
                '公司简称',
                '分部',
                '省份',
                '城市',
                '上线信息',
                '往期销售',
                '关键人员',
                '业务形态',
                '老公司',
                '关联公司',
                '分类'
            ],
            selectTh: [],
            checkAll: true,
            checkedCities: [],
            isIndeterminate: true,
            collapse: false,
            platList: [],
            companyCode: '',
            show: false,
            dialogVisible: false,
            updateForm: {
                associatedCompanys: '',
                classificationLevel: '',
                companyCode: ''
            },
            options: [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'C', label: 'C' }, { value: 'D', label: 'D' }]
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    mounted () {
        const selectThObj = JSON.parse(localStorage.getItem('selectThObj'))
        if (selectThObj && (selectThObj.uid === this.userInfo.uid)) {
            this.selectTh = selectThObj.selectTh
            // console.log(this.selectTh.length === this.defaultTh.length)
            if (this.selectTh.length === this.defaultTh.length) {
                this.checkAll = true
                this.isIndeterminate = true
            } else {
                this.checkAll = false
                this.isIndeterminate = false
            }
        } else {
            this.selectTh = this.defaultTh
            this.checkAll = true
        }
    },
    methods: {
        findSignscale (value) {
            this.show = true
            this.companyCode = value
        },
        handleCheckAllChange (val) {
            this.selectTh = val ? this.defaultTh : []
            const selectThObj = {
                uid: this.userInfo.uid,
                selectTh: this.selectTh
            }
            localStorage.setItem('selectThObj', JSON.stringify(selectThObj))
            // this.isIndeterminate = false
        },
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
        },
        handleCheckedCitiesChange (value) {
            const selectThObj = {
                uid: this.userInfo.uid,
                selectTh: value
            }
            // this.checkAll = false
            // this.isIndeterminate = false
            localStorage.setItem('selectThObj', JSON.stringify(selectThObj))
            let checkedCount = value.length
            this.checkAll = checkedCount === this.defaultTh.length
            // console.log(checkedCount, this.checkAll)
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectTh.length
        },
        editType (val) {
            this.dialogVisible = true
            this.updateForm.classificationLevel = val.classificationLevel
            this.updateForm.associatedCompanys = val.associatedCompanys
            this.updateForm.companyCode = val.companyCode
        }
        // async onUpdateBasicinfo () {
        //     this.dialogVisible = false
        //     await updateBasicinfo(this.updateForm)
        //     this.$parent.findCompanyList()
        //     this.$message({
        //         showClose: true,
        //         message: '添加成功',
        //         type: 'success'

        //     })
        // }
    }
}
</script>

<style scoped lang="scss">
.wrapper {
    position: relative;
}
.collapse {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 2px;
    z-index: 100;
    cursor: pointer;
}
.collapse-content {
    position: absolute;
    width: 180px;
    top: 35px;
    right: 10px;
    background: #ffffff;
    z-index: 100;
    padding: 10px 18px;
    box-sizing: border-box;
}
.el-checkbox + .el-checkbox {
    margin-left: 0;
    float: left;
    width: 100%;
}

</style>
