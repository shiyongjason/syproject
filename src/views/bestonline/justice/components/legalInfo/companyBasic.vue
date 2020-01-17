<template>
    <div>
        <p class="small-title">主体资格</p>
        <div class="flex-wrap-col" v-if="justiceData.affairs">
            <!-- <el-form label-position="top" :model="justiceData"> -->
                <el-form-item label="工商年报：" :rules="{required: true ,message: '工商年报不能为空',trigger: 'blur'}"  :prop="'affairs.annualReport'">
                    <el-input type="textarea" v-model="justiceData.affairs.annualReport" style="width:600px" placeholder="请输入工商年报" rows="3" maxlength='250'>
                    </el-input>
                </el-form-item>
                <el-form-item label="营业执照：" :rules="{required: true ,message: '营业执照不能为空',trigger: 'blur'}"  :prop="'affairs.businessLicense'">
                    <el-input type="textarea" v-model="justiceData.affairs.businessLicense" style="width:600px" placeholder="请输入营业执照" rows="3" maxlength='250'>
                    </el-input>
                </el-form-item>
                <el-form-item label="公司章程：" :rules="{required: true ,message: '公司章程不能为空',trigger: 'blur'}" :prop="'affairs.articlesOfAssociation'">
                    <el-input type="textarea" v-model="justiceData.affairs.articlesOfAssociation" style="width:600px" placeholder="请输入公司章程" rows="3" maxlength='250'>
                    </el-input>
                </el-form-item>
                <el-form-item label="股权质押：" :rules="{ required: true, message: '股权质押不能为空', trigger: 'blur' }" :prop="'affairs.pledgeOfStockRight'">
                    <el-input type="textarea" v-model="justiceData.affairs.pledgeOfStockRight" style="width:600px" placeholder="请输入股权质押" rows="3" maxlength='250'>
                    </el-input>
                </el-form-item>
            <!-- </el-form> -->
        </div>

        <p class="small-title">经营资质</p>
        <div class="flex-wrap-row" v-if="justiceData.affairs">
            <!-- <el-form label-position="top" :model="justiceData"> -->
                <el-form-item label="经营资质:" :rules="{required: true ,message: '经营资质不能为空',trigger: 'blur'}" :prop="'affairs.businessQualification'">
                    <el-input type="textarea" v-model="justiceData.affairs.businessQualification" style="width:600px" placeholder="请输入经营资质" rows="3">
                    </el-input>
                </el-form-item>
            <!-- </el-form> -->
        </div>

        <p class="small-title">分支机构</p>
        <div class="flex-wrap-col info-wrap" v-for="(item, index) in justiceData.branchAgencyList" :key="'branchAgencyList'+item.type+index">
            <template>
                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0" @click="onAddbranchAgencyList"></i>
                <i class="el-icon-remove-outline pointer" v-else @click="onRemovebranchAgencyList(item.id)"></i>
            </template>
            <el-form-item label="分支机构" :prop="`branchAgencyList[${index}].branch`" :rules="rules.branch" label-width="150px">
                <el-input v-model="item.branch" placeholder="分支机构" maxlength="25"></el-input>
            </el-form-item>
        </div>

        <p class="small-title">关联公司</p>
        <div class="flex-wrap-col info-wrap" v-for="(item, index) in justiceData.relatedCompanyList" :key="'relatedCompanyList'+item.type+index">
            <template>
                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0" @click="onAddrelatedCompanyList"></i>
                <i class="el-icon-remove-outline pointer" v-else @click="onRemoverelatedCompanyList(item.id)"></i>
            </template>
            <el-form-item label="关联公司" :rules="rules.relatedCompany" :prop="`relatedCompanyList[${index}].relatedCompany`" label-width="150px">
                <el-input v-model="item.relatedCompany" placeholder="关联公司" maxlength="25"></el-input>
            </el-form-item>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'legal_company_basic',
    props: {
        type: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            rules: {
                relatedCompany: [
                    { required: true, message: '关联公司不能为空', trigger: 'blur' }
                ],
                branch: [
                    { required: true, message: '分支机构不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            justiceData: state => state.dueDiligence.justiceData
        }),
        defaultBranchAgency () {
            return {
                branch: '',
                id: Date.now()
            }
        },
        defaultRelatedCompany () {
            return {
                relatedCompany: '',
                id: Date.now()
            }
        }
    },
    watch: {
        'justiceData.relatedCompanyList' (val) {
            let relatedCompanyList = val
            if (relatedCompanyList.length === 0) {
                const tempObj = JSON.parse(JSON.stringify(this.defaultRelatedCompany))
                relatedCompanyList.push(tempObj)
            }
            this.justiceData.relatedCompanyList = relatedCompanyList
        },
        'justiceData.branchAgencyList' (val) {
            let branchAgencyList = val
            if (branchAgencyList.length === 0) {
                const { ...tempObj } = this.defaultBranchAgency
                branchAgencyList.push(tempObj)
            }
            this.justiceData.branchAgencyList = branchAgencyList
        }
    },
    methods: {
        onAddbranchAgencyList () {
            const tempObj = JSON.parse(JSON.stringify(this.defaultBranchAgency))
            tempObj.id = Date.now()
            this.justiceData.branchAgencyList.push(tempObj)
        },
        onRemovebranchAgencyList (id) {
            this.justiceData.branchAgencyList = this.justiceData.branchAgencyList.filter(item => item.id !== id)
        },
        onAddrelatedCompanyList () {
            const tempObj = JSON.parse(JSON.stringify(this.defaultRelatedCompany))
            tempObj.id = Date.now()
            this.justiceData.relatedCompanyList.push(tempObj)
        },
        onRemoverelatedCompanyList (id) {
            this.justiceData.relatedCompanyList = this.justiceData.relatedCompanyList.filter(item => item.id !== id)
        }
    },
    mounted () { }
}
</script>

<style lang="scss" scoped>
.small-title {
    padding: 10px;
    font-size: 17px;
    line-height: 40px;
    background: #fafafa;
}
.legal-form {
    flex-direction: row;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
}
.legal-form .el-form-item {
    display: inline-block;
}
.info-wrap {
    border: 1px solid #dcdcdc;
    position: relative;
    padding-right: 40px;
    padding-top: 15px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    &:not(:last-child) {
        padding-bottom: 15px;
    }
    > i {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
    }
}
/deep/.flex-wrap-col {
    .el-form-item__content {
        display: inline-block;
    }
    .el-form-item__label {
        margin-right: 20px;
        height: 75px;
    }
}
/deep/.flex-wrap-row {
    .el-form-item__content {
        display: inline-block;
    }
    .el-form-item__label {
        margin-right: 20px;
        height: 75px;
    }
}
</style>
