<template>
    <el-collapse-item name="8">
        <template slot="title">
            <p class="title-p">仓储</p>
        </template>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="仓库地址">
                    <el-select v-model="form.dueFinanceBasic.storeProvince" placeholder="省" @change="onProvince">
                        <el-option v-for="item in storeProvince" :key="item.id" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item>
                    <el-select v-model="form.dueFinanceBasic.storeCity" placeholder="市" @change="onCity">
                        <el-option v-for="item in storeCity" :key="item.id" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item>
                    <el-select v-model="form.dueFinanceBasic.storeArea" placeholder="区">
                        <el-option v-for="item in storeArea" :key="item.id" :label="item.cityName" :value="item.cityId">
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
                    <el-input v-model="form.dueFinanceBasicstoreSize" placeholder="" maxlength="25" @keyup.native="oninput('storeSize',$event)">
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
import { WAREHOUSE_ORDER_OPTIONS, WAREHOUSE_FORM } from '../const'
import { YES_NO_STATUS } from '../../const'
import { provinces } from '../../api/index.js'
export default {
    name: 'finance_profitability',
    data () {
        return {
            warehouseOrderOptions: WAREHOUSE_ORDER_OPTIONS,
            agreeCustodyOptions: YES_NO_STATUS,
            storeOptions: WAREHOUSE_FORM
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        })
    },
    methods: {
        onProvince (parentId) {
            this.dueFinanceBasic.storeCity = ''
            this.dueFinanceBasic.storeArea = ''
            this.storeCity = []
            this.storeArea = []
            if (parentId) {
                this.provinces({ parentId }, 1)
            }
        },
        onCity (parentId) {
            this.dueFinanceBasic.storeArea = ''
            this.storeArea = []
            if (parentId) {
                this.provinces({ parentId }, 2)
            }
        },
        async provinces (params, city) {
            const { data } = await provinces(params)
            console.log(data)
            switch (city) {
                case 0:
                    this.storeProvince = data.citys
                    this.storeProvince.unshift({ cityId: '', cityName: '请选择省', id: 0 })
                    break
                case 1:
                    this.storeCity = data.citys
                    this.storeCity.unshift({ cityId: '', cityName: '请选择市', id: 0 })
                    break
                case 2:
                    this.storeArea = data.citys
                    this.storeArea.unshift({ cityId: '', cityName: '请选择区', id: 0 })
                    break
            }
        }
    },
    mounted () {
        // 签名错误，请确认请求签名或私钥是否正确
        // this.provinces({ parentId: 0 }, 0)
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
