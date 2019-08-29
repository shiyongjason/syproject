<template>
<el-collapse-item name="5">
    <template slot="title">
        <p class="title-p">上游-供应商结构</p>
    </template>
    <div class="supplier" v-for="(item, index) in dueBusinessSupplierCreateFormList" :key=index>
        <el-form-item label="供应商名称：" :rules="rules.supplierName">
         {{item.supplierName}}
        </el-form-item>
        <el-form-item label="品牌:">
          {{item.brand}}
        </el-form-item>
        <div class="form-cont-row mb20">
            <div class="form-cont-col ">
              <el-form-item label="采购金额：" :prop="`dueBusinessSupplierCreateFormList[${index}].purchaseAmount`" :rules="rules.purchaseAmount">
                   {{item.purchaseAmount}}
                </el-form-item>
            </div>
            <div class="form-cont-col ">
                <el-form-item label="占比：" :prop="`dueBusinessSupplierCreateFormList[${index}].proportion`" :rules="rules.proportion">
                  {{item.proportion}}%
                </el-form-item>
            </div>
            <div class="form-cont-col ">
                <el-form-item label="是否提供合同：" :prop="`dueBusinessSupplierCreateFormList[${index}].isProvideContract`" :rules="rules.isProvideContract">
                {{item.isProvideContract==1?'否':item.isProvideContract==0?'是':''}}
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row mb20">
            <div class="form-cont-col">
                <el-form-item label="合同开始时间：">
                    <el-date-picker type="date" placeholder="选择日期" v-model="item.contractStartDate" :editable="false" value-format="yyyy-MM-dd"></el-date-picker>
                    {{item.contractStartDate|formatDate}}
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="合同结束时间：">
                    <el-date-picker type="date" placeholder="选择日期" v-model="item.contractEndDate" :editable="false" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                  <el-form-item label="合同规模：">
              {{item.contractScale}}
               </el-form-item>
            </div>
        </div>
    </div>
</el-collapse-item>
</template>

<script>
import { ISPROVIDE_CONTRACT } from '../../const.js'
import { mapState } from 'vuex'
export default {
    name: 'business_supplier',
    data () {
        return {
            isProvideContractOptions: ISPROVIDE_CONTRACT,
            defaultSupplier: {
                supplierName: '',
                brand: '',
                purchaseAmount: '',
                proportion: '',
                isProvideContract: '',
                contractStartDate: '',
                contractEndDate: '',
                contractScale: ''
            },
            rules: {
                supplierName: [
                    { required: true, message: '请输入供应商名称', trigger: 'blur' }
                ],
                isProvideContract: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                purchaseAmount: [
                    { required: true, message: '请输入采购金额', trigger: 'blur' }
                ],
                proportion: [
                    { required: true, message: '请输入占比', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        }),
        dueBusinessSupplierCreateFormList () {
            let businessSupplierCreateFormList = this.form.dueBusinessSupplierCreateFormList
            if (!businessSupplierCreateFormList) {
                businessSupplierCreateFormList = []
            }
            if (businessSupplierCreateFormList.length == 0) {
                let defaultObj = JSON.parse(JSON.stringify(this.defaultSupplier))
                businessSupplierCreateFormList.push(defaultObj)
            }
            return this.form.dueBusinessSupplierCreateFormList
        }
    },
    mounted () {

    },
    methods: {
        onAddSupplier () {
            const tempObj = JSON.parse(JSON.stringify(this.defaultSupplier))
            this.form.dueBusinessSupplierCreateFormList.push(tempObj)
        },
        onRemoveSupplier (index) {
            this.form.dueBusinessSupplierCreateFormList.splice(index, 1)
        }
    }
}
</script>
