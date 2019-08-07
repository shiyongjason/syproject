<template>
    <div>
        <p class="small-title">主体资格</p>
        <div class="flex-wrap-col" v-if="justiceData.affairs">
            <div class="flex-wrap-box">
                <div class="flex-wrap-title"><span class="red-span">*</span>工商年报：</div>
                <div class="flex-wrap-cont">
                    <el-form-item :rules="{required: true ,message: '工商年报不能为空',trigger: 'blur'}"
                        :prop="'affairs.annualReport'">
                        <el-input
                            type="textarea"
                            v-model="justiceData.affairs.annualReport"
                            style="width:600px"
                            placeholder="工商年报"
                            rows="3">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="flex-wrap-box">
                <div class="flex-wrap-title"><span class="red-span">*</span>营业执照：</div>
                <div class="flex-wrap-cont">
                    <el-form-item :rules="{required: true ,message: '营业执照不能为空',trigger: 'blur'}"
                        :prop="'affairs.businessLicense'">
                        <el-input
                            type="textarea"
                            v-model="justiceData.affairs.businessLicense"
                            style="width:600px"
                            placeholder="营业执照"
                            rows="3">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="flex-wrap-box">
                <div class="flex-wrap-title"><span class="red-span">*</span>公司章程：</div>
                <div class="flex-wrap-cont">
                    <el-form-item :rules="{required: true ,message: '公司章程不能为空',trigger: 'blur'}"
                        :prop="'affairs.articlesOfAssociation'">
                        <el-input
                            type="textarea"
                            v-model="justiceData.affairs.articlesOfAssociation"
                            style="width:600px"
                            placeholder="公司章程"
                            rows="3">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="flex-wrap-box ">
                <div class="flex-wrap-title"><span class="red-span">*</span>股权质押：</div>
                <div class="flex-wrap-cont">
                    <el-form-item :rules="{ required: true, message: '股权质押不能为空', trigger: 'blur' }"
                        :prop="'affairs.pledgeOfStockRight'">
                        <el-input
                            type="textarea"
                            v-model="justiceData.affairs.pledgeOfStockRight"
                            style="width:600px"
                            placeholder="股权质押"
                            rows="3">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
        </div>

        <p class="small-title">经营资质</p>
        <div class="flex-wrap-row" v-if="justiceData.affairs">
            <div class="flex-wrap-box">
                <div class="flex-wrap-title"><span class="red-span">*</span>经营资质：</div>
                <div class="flex-wrap-cont">
                    <el-form-item :rules="{required: true ,message: '经营资质不能为空',trigger: 'blur'}"
                        :prop="'affairs.businessQualification'">
                        <el-input
                            type="textarea"
                            v-model="justiceData.affairs.businessQualification"
                            style="width:600px"
                            placeholder="经营资质"
                            rows="3">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
        </div>

        <p class="small-title">分支机构</p>
        <div class="compete supplier" v-for="(item, index) in justiceData.branchAgencyList"
                :key="'branchAgencyList'+item.type+index">
            <template>
                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                    @click="addList('branchAgencyList',3)"></i>
                <i class="el-icon-remove-outline pointer" v-else
                    @click="removeList('branchAgencyList', item.id)"></i>
            </template>
            <div class="flex-wrap-row">
                <div class="flex-wrap-box">
                    <div class="flex-wrap-title"><span class="red-span">*</span>分支机构：</div>
                    <div class="flex-wrap-cont">
                        <el-form-item :rules="{required: true ,message: '分支机构不能为空',trigger: 'blur'}"
                            :prop="'branchAgencyList.'+ index + '.branch'">
                            <el-input v-model="item.branch" placeholder="分支机构" maxlength="25"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </div>
        </div>

        <p class="small-title">关联公司</p>
        <div class="compete supplier" v-for="(item,index) in justiceData.relatedCompanyList"
                :key="'relatedCompanyList'+ item.type+index">
            <template v-if="!disabled">
                <i class="el-icon-circle-plus-outline pointer" v-if="index === 0"
                    @click="addList('relatedCompanyList',3)"></i>
                <i class="el-icon-remove-outline pointer" v-else
                    @click="removeList('relatedCompanyList', item.id)"></i>
            </template>
            <div class="flex-wrap-row">
                <div class="flex-wrap-box">
                    <div class="flex-wrap-title">关联公司：</div>
                    <div class="flex-wrap-cont">
                        <el-input v-model="item.relatedCompany" placeholder="关联公司" maxlength="25"></el-input>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'legal_company_basic',
    computed: {
        ...mapState({
            justiceData: state => state.dueDiligence.justiceData
        })
    }
}
</script>
