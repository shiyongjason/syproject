<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div>
                <label class="el-form-item__label" style="width: 150px;">目标合伙人：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.targetPartner }}</div>
            </div>
            <div>
                <label class="el-form-item__label" style="width: 150px;">尽调公司名称：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.companyName }}</div>
            </div>
            <div>
                <label class="el-form-item__label" style="width: 150px;">合作模式：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.cooperateTypeName }}</div>
            </div>
            <div v-if="formData.cooperateType == '1'">
                <label class="el-form-item__label" style="width: 150px;">新合作模式说明：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.newCooperateContent }}</div>
            </div>
            <div>
                <label class="el-form-item__label" style="width: 150px;">主营业态：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.mainBusinessName }}</div>
            </div>
            <div>
                <label class="el-form-item__label" style="width: 150px;">主营品类：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.mainSystemName }}</div>
            </div>
            <div v-if="checkList.indexOf('4') != -1">
                <label class="el-form-item__label" style="width: 150px;">主营品类其他说明：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.mainSystemOther }}</div>
            </div>
            <div>
                <label class="el-form-item__label" style="width: 150px;">品牌：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.brand }}</div>
            </div>
            <div>
                <label class="el-form-item__label" style="width: 150px;">销售形式：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.salesTypeName }}</div>
            </div>
            <div>
                <label class="el-form-item__label" style="width: 150px;">合作目的：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.cooperateTarget }}</div>
            </div>
            <div>
                <label class="el-form-item__label" style="width: 150px;">拟签约规模：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.signScale }}万</div>
            </div>
            <div>
                <label class="el-form-item__label" style="width: 150px;">备注：</label>
                <div class="el-form-item__content" style="margin-left: 150px;">{{ formData.remark }}</div>
            </div>
            <div>
                <label class="el-form-item__label" style="width: 150px;">附件：</label>
                <div  class="el-form-item__content" style="margin-left: 150px;" v-for="(item,index) in fileList" :key="index">
                    <a :href="item.url" target="_blank">{{item.name}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getDueapplydetail } from '../api/index'
import { COOPERATE_TYPE_MAP, SALES_TYPE_MAP, CATEGORY_MAP } from './const.js'
export default {
    name: 'applyShow',
    data () {
        return {
            formData: {
                targetPartner: '',
                companyName: '',
                cooperateType: '',
                newCooperateContent: '',
                mainBusinessName: '',
                mainBusinessId: '',
                mainSystem: '',
                mainSystemName: '',
                mainSystemOther: '',
                brand: '',
                salesType: '',
                cooperateTarget: '',
                signScale: '',
                remark: '',
                attachmentsUrl: '',
                applyId: '',
                createUserName: '',
                organizationCode: ''
            },
            fileList: [],
            checkList: [],
            applyId: ''
        }
    },
    mounted () {
        this.applyId = this.$route.query.id
        if (this.applyId) {
            this.getDueapplydetail(this.applyId)
        }
    },
    methods: {
        async getDueapplydetail (applyId) {
            const { data } = await getDueapplydetail({ applyId: applyId })
            this.formData = data.data
            this.fileList = JSON.parse(this.formData.attachmentsUrl)
            this.formData.cooperateTypeName = COOPERATE_TYPE_MAP.get(this.formData.cooperateType)
            this.formData.salesTypeName = SALES_TYPE_MAP.get(this.formData.salesType)
            this.checkList = this.formData.mainSystem.split(',')
            this.formData.mainSystemName = this.checkList.map(item => CATEGORY_MAP.get(Number(item))).join(',')
        }
    }
}
</script>
<style lang="scss" scoped>
.remark {
    width: 598px;
}
.newcooperateType {
    margin-right: 10px;
}
.applyW {
    width: 30%;
}

.unit {
    margin: 0 0 0 12px;
}
/*主题内容*/

/*flex  横布局*/
.flex-wrap-row {
    display: flex;
}
</style>
