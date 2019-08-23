<template>
<el-collapse-item name="2">
    <template slot="title">
        <p class="title-p">业务模式</p>
    </template>
    <div class="form-cont-row mb20">
        <div class="form-cont-col">
            <el-form-item label="主营业态1：" prop="mainBusinessFormatOneId">
                <el-select v-model="form.mainBusinessFormatOneId" placeholder="请选择主营业态">
                    <el-option v-for="item in mainCommercialOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="业态占比1：" prop="businessFormatOneRatio">
                <el-input v-model="form.businessFormatOneRatio" placeholder="业态占比">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row mb20">
        <div class="form-cont-col">
            <el-form-item label="主营业态2：">
                <el-select v-model="form.mainBusinessFormatTwoId" placeholder="请选择主营业态">
                    <el-option v-for="item in mainCommercialOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="业态占比2：">
                <el-input v-model="form.businessFormatTwoRatio" placeholder="业态占比">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row mb20">
        <div class="form-cont-col">
            <el-form-item label="主营业态3：">
                <el-select v-model="form.mainBusinessFormatThreeId" placeholder="请选择主营业态">
                    <el-option v-for="item in mainCommercialOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="业态占比3：">
                <el-input v-model="form.businessFormatTwoThreeRatio" placeholder="业态占比">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row mb20">
        <div class="form-cont-col">
            <el-form-item label="主营品类1：" prop="mainCategoryOneId">
                <el-select v-model="form.mainCategoryOneId" placeholder="请选择主营品类">
                    <el-option v-for="item in mainCategoryOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="销售比重1：" prop="categoryOneSalesRatio">
                <el-input v-model="form.categoryOneSalesRatio" placeholder="销售比重">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row mb20">
        <div class="form-cont-col">
            <el-form-item label="主营品类2：">
                <el-select v-model="form.mainCategoryTwoId" placeholder="请选择主营品类">
                    <el-option v-for="item in mainCategoryOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="销售比重2：">
                <el-input v-model="form.categoryTwoSalesRatio" placeholder="销售比重">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row mb20">
        <div class="form-cont-col">
            <el-form-item label="主营品牌1：" prop="mainBrandOneName">
                <el-input v-model="form.mainBrandOneName" placeholder="销售占比大于30%">
                </el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="销售比重1：" prop="brandOneSalesRatio">
                <el-input v-model="form.brandOneSalesRatio" placeholder="销售比重">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row mb20">
        <div class="form-cont-col">
            <el-form-item label="主营品牌2：">
                <el-input v-model="form.mainBrandTwoName" placeholder="销售占比大于30%">
                </el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="销售比重2：">
                <el-input v-model="form.brandTwoSalesRatio" placeholder="销售比重">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row mb20">
        <div class="form-cont-col">
            <el-form-item label="主营品牌3：">
                <el-input v-model="form.mainBrandThreeName" placeholder="销售占比大于30%">
                </el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="销售比重3：">
                <el-input v-model="form.brandThreeSalesRatio" placeholder="销售比重">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
    </div>
</el-collapse-item>
</template>

<script>
import { MAIN_COMMERCIAL_OPTIONS, MAIN_CATEGORY_OPTIONS } from '../const'
import { mapState } from 'vuex'
export default {
    name: 'business_mode',
    data () {
        return {
            mainCommercialOptions: MAIN_COMMERCIAL_OPTIONS,
            mainCategoryOptions: MAIN_CATEGORY_OPTIONS
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        })
    },
    mounted () {

    }
}
</script>
