<template>
    <el-collapse-item name="8">
        <template slot="title">
            <p class="title-p">仓储</p>
        </template>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="仓库地址">
                    <el-select v-model="form.dueFinanceBasic.storeProvince" placeholder="省" @change="onProvince">
                        <el-option v-for="item in storeProvince" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item>
                    <el-select v-model="form.dueFinanceBasic.storeCity" placeholder="市" @change="onCity">
                        <el-option v-for="item in storeCity" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item>
                    <el-select v-model="form.dueFinanceBasic.storeArea" placeholder="区">
                        <el-option v-for="item in storeArea" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="详细地址：">
                    <el-input type="textarea" style="width:1030px" rows="2" placeholder="请输入详细地址" maxlength="250" v-model="form.dueFinanceBasic.storeAddress">
                    </el-input>
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="仓库面积（㎡）：">
                    <el-input v-model="form.dueFinanceBasic.storeSize" placeholder="请输入仓库面积（㎡）" maxlength="25">
                    </el-input>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="仓库形式：">
                    <el-select v-model="form.dueFinanceBasic.storeForm" placeholder="请选择">
                        <el-option v-for="item in storeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="仓库摆放有序程度：">
                    <el-select v-model="form.dueFinanceBasic.degreeOfStorageOrder" placeholder="请选择">
                        <el-option v-for="item in warehouseOrderOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="接受好享家仓库监管方式：">
                    <el-select v-model="form.dueFinanceBasic.isAgreeCustody" placeholder="请选择">
                        <el-option v-for="item in agreeCustodyOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="具体监管时间：">
                    <el-date-picker v-model="form.dueFinanceBasic.dateOfCustody" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </div>
        </div>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { WAREHOUSE_ORDER_OPTIONS, WAREHOUSE_FORM, SUPERVISION_METHOD } from '../const'
import { getAreacode } from '../../api/index.js'
export default {
    name: 'finance_profitability',
    data () {
        return {
            warehouseOrderOptions: WAREHOUSE_ORDER_OPTIONS,
            agreeCustodyOptions: SUPERVISION_METHOD,
            storeOptions: WAREHOUSE_FORM,
            storeProvince: [],
            storeCity: [],
            storeArea: []
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        })
    },
    watch: {
        'form.dueFinanceBasic.storeProvince': {
            handler (val) {
                if (val) {
                    this.storeCity = this.storeProvince.filter((value, index) => {
                        return value.key == val
                    })[0].cityList
                }
            },
            deep: true
        },
        'form.dueFinanceBasic.storeCity': {
            handler (val) {
                if (val) {
                    this.storeArea = this.storeCity.filter((value, index) => {
                        return value.key == val
                    })[0].areaList
                }
            },
            deep: true
        }
    },
    methods: {
        async getAreacode () {
            const { data } = await getAreacode()
            this.storeProvince = data.data.dictpro
        },
        onProvince (key) {
            this.form.dueFinanceBasic.storeCity = ''
            this.form.dueFinanceBasic.storeArea = ''
            this.storeArea = []
            this.storeCity = this.storeProvince.filter((val, index) => {
                return val.key == key
            })[0].cityList
        },
        onCity (key) {
            this.form.dueFinanceBasic.storeArea = ''
            this.storeArea = this.storeCity.filter((val, index) => {
                return val.key == key
            })[0].areaList
        }
    },
    mounted () {
        this.getAreacode()
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
