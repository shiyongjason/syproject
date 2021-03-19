<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">支付单号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.orderNum" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" v-model="queryParams.subsectionCode" :clearable='true'>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">经销商：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.dealer" maxlength="20" placeholder="请输入经销商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">上游出票方式：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.dealer" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="银行承兑" :value="1"></el-option>
                            <el-option label="银行转账" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">上游供应商：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.dealer" maxlength="20" placeholder="请输入上游供应商名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input type="text" v-model="queryParams.dealer" maxlength="20" placeholder="请输入项目名称"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">出票状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.dealer" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待出票" :value="1"></el-option>
                            <el-option label="部分出票" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'

@Component({
    name: 'UpstreamPaymentManagement'
})
export default class UpstreamPaymentManagement extends Vue {
    queryParams = {
        dealer: '',
        orderNum: '',
        subsectionCode: ''
    };
    @State('userInfo') userInfo: any;
    @Getter('crmmanage/crmdepList') crmdepList!: Array<CommonInterface.Branch>;
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function;

    async mounted () {
        console.log(this.userInfo)
        await this.findCrmdeplist({
            deptType: 'F',
            pkDeptDoc: this.userInfo.pkDeptDoc,
            jobNumber: this.userInfo.jobNumber,
            authCode: sessionStorage.getItem('authCode')
                ? JSON.parse(sessionStorage.getItem('authCode') || '')
                : ''
        })
    }
}
</script>

<style lang='scss' scoped>
.upstreamPaymentManagement {
    //
}
</style>