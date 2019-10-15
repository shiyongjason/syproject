<template>
    <el-collapse-item name="2">
        <template slot="title">
            <p class="title-p">业务模式</p>
        </template>
        <div class="form-cont-row mb20">

            <div class="form-cont-col">
                <el-form-item label="主营业态1：" prop="mainBusinessFormatOneId">
                    {{vaildEmpty(form.mainBusinessFormatOneId)?mainCommercialOptions[form.mainBusinessFormatOneId].value:'-'}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="业态占比1：" prop="businessFormatOneRatio">
                    {{form.businessFormatOneRatio?form.businessFormatOneRatio + '%':'-'}}
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="主营业态2：">
                    {{vaildEmpty(form.mainBusinessFormatTwoId)?mainCommercialOptions[form.mainBusinessFormatTwoId].value:'-'}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="业态占比2：">
                    {{form.businessFormatTwoRatio?form.businessFormatTwoRatio + '%':'-'}}
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="主营业态3：">
                    {{vaildEmpty(form.mainBusinessFormatThreeId)?mainCommercialOptions[form.mainBusinessFormatThreeId].value:'-'}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="业态占比3：">
                    {{form.businessFormatTwoThreeRatio?form.businessFormatTwoThreeRatio +'%':'-'}}
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="主营品类1：" prop="mainCategoryOneId">
                    {{vaildEmpty(form.mainCategoryOneId)?mainCategoryOptions[form.mainCategoryOneId].value:'-'}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="销售比重1：" prop="categoryOneSalesRatio">
                    {{form.categoryOneSalesRatio?form.categoryOneSalesRatio +'%':'-'}}
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="主营品类2：">
                    {{vaildEmpty(form.mainCategoryTwoId)?mainCategoryOptions[form.mainCategoryTwoId].value:'-'}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="销售比重2：">
                    {{form.categoryTwoSalesRatio?form.categoryTwoSalesRatio +'%':'-'}}
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="主营品牌1：" prop="mainBrandOneName">
                    {{form.mainBrandOneName?form.mainBrandOneName:'-'}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="销售比重1：" prop="brandOneSalesRatio">
                    {{form.brandOneSalesRatio?form.brandOneSalesRatio + '%':'-'}}
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="主营品牌2：">
                    {{form.mainBrandTwoName?form.mainBrandTwoName:'-'}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="销售比重2：">
                    {{form.brandTwoSalesRatio?form.brandTwoSalesRatio +'%':'-'}}
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="主营品牌3：">
                    {{form.mainBrandThreeName?form.mainBrandThreeName:'-'}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="销售比重3：">
                    {{form.brandThreeSalesRatio?form.brandThreeSalesRatio +'%':'-'}}
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
    methods: {
        vaildEmpty (value) {
            if (value !== null && value !== undefined && value !== '') {
                return true
            }
            return false
        }
    }
}
</script>
