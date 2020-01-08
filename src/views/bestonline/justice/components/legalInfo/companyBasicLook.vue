<template>
    <div>
        <p class="small-title">主体资格</p>
        <div class="flex-wrap-col" v-if="justiceData.affairs">
            <el-form label-position="top" :model="justiceData">
                <el-form-item label="工商年报：">
                    <p>{{justiceData.affairs.annualReport}}</p>
                </el-form-item>
                <el-form-item label="营业执照：">
                    <p>{{justiceData.affairs.businessLicense}}</p>
                </el-form-item>
                <el-form-item label="公司章程：">
                    <p>{{justiceData.affairs.articlesOfAssociation}}</p>
                </el-form-item>
                <el-form-item label="股权质押：">
                    <p>{{justiceData.affairs.pledgeOfStockRight}}</p>
                </el-form-item>
            </el-form>
        </div>
        <p class="small-title">经营资质</p>
        <div class="flex-wrap-row" v-if="justiceData.affairs">
            <el-form label-position="top" :model="justiceData">
                <el-form-item label="经营资质:">
                    <p>{{justiceData.affairs.businessQualification}}</p>
                </el-form-item>
            </el-form>
        </div>

        <p class="small-title">分支机构</p>
        <div class="flex-wrap-col info-wrap" v-for="(item, index) in justiceData.branchAgencyList" :key="'branchAgencyList'+item.type+index">
            <el-form label-position="right" label-width="150px" class="legal-form">
                <el-form-item label="分支机构">
                    <p>{{item.branch}}</p>
                </el-form-item>
            </el-form>
        </div>
        <p class="small-title">关联公司</p>
        <div class="flex-wrap-col info-wrap" v-for="(item, index) in justiceData.relatedCompanyList" :key="'relatedCompanyList'+item.type+index">
            <el-form label-position="right" label-width="150px" class="legal-form">
                <el-form-item label="关联公司">
                    <p>{{item.relatedCompany}}</p>
                </el-form-item>
            </el-form>
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
            }
        }
    },
    computed: {
        ...mapState({
            justiceData: state => state.dueDiligence.justiceData
        })
    },
    methods: {
    },
    mounted () {}
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
        height: 40px;
    }
}
/deep/.flex-wrap-row {
    .el-form-item__content {
        display: inline-block;
    }
    .el-form-item__label {
        margin-right: 20px;
        height: 40px;
    }
}
</style>
