<template>
    <el-collapse-item name="8">
        <template slot="title">
            <p class="title-p">仓储</p>
        </template>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="仓库地址">
                    <p>{{proveName + cityName + areaName?proveName + cityName + areaName:'-'}}</p>
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="详细地址：">
                    {{form.dueFinanceBasic.storeAddress?form.dueFinanceBasic.storeAddress:'-'}}
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="仓库面积（㎡）：">
                    {{form.dueFinanceBasic.storeSize?form.dueFinanceBasic.storeSize:'-'}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="仓库形式：">
                    {{form.dueFinanceBasic.storeForm === 0?'自有':form.dueFinanceBasic.storeForm == 1?'租赁':form.dueFinanceBasic.storeForm == 2?'第三方监督':'-'}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="仓库摆放有序程度：">
                    {{form.dueFinanceBasic.degreeOfStorageOrder === 0?'高':form.dueFinanceBasic.degreeOfStorageOrder == 1?'中':form.dueFinanceBasic.degreeOfStorageOrder == 2?'低':'-'}}
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="接受好享家仓库监管方式：">
                    {{form.dueFinanceBasic.custodyType === 0?'将仓库移至我司指定的第三方仓库进行管理':form.dueFinanceBasic.custodyType == 1?'接受我司指定的第三方对仓库进行监管':form.dueFinanceBasic.custodyType == 2?'设立单独库区 ,接受我司定期盘点':form.dueFinanceBasic.custodyType == 3?'不接受':'-'}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="具体监管时间：">
                    {{form.dueFinanceBasic.dateOfCustody?form.dueFinanceBasic.dateOfCustody:'-'}}
                </el-form-item>
            </div>
        </div>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { WAREHOUSE_ORDER_OPTIONS, WAREHOUSE_FORM, SUPERVISION_METHOD } from '../const'
import { getChiness } from '../../api/index.js'
export default {
    name: 'finance_profitability',
    data () {
        return {
            warehouseOrderOptions: WAREHOUSE_ORDER_OPTIONS,
            agreeCustodyOptions: SUPERVISION_METHOD,
            storeOptions: WAREHOUSE_FORM,
            storeProvince: [],
            storeCity: [],
            storeArea: [],
            proveName: '',
            cityName: '',
            areaName: ''
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        })
    },
    watch: {
        async form (form) {
            if (form.dueFinanceBasic.storeProvince) {
                const { data } = await this.getChiness(form.dueFinanceBasic.storeProvince)
                this.proveName = data.citys.cityName
            }
            if (form.dueFinanceBasic.storeCity) {
                const { data } = await this.getChiness(form.dueFinanceBasic.storeCity)
                this.cityName = data.citys.cityName
            }
            if (form.dueFinanceBasic.storeArea) {
                const { data } = await this.getChiness(form.dueFinanceBasic.storeArea)
                this.areaName = data.citys.cityName
            }
        }
    },
    methods: {
        async getChiness (value) {
            const { data } = await getChiness({ id: value })
            return data
        }
    }
}
</script>

<style lang="scss" scoped>
.title-p {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
}
.small-title {
    padding: 10px;
    font-size: 17px;
    line-height: 40px;
    background: #fafafa;
}
.item-wrapper {
    margin: 20px 0 20px;
}
table {
    border-collapse: collapse;
}
table,
tr,
td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>
