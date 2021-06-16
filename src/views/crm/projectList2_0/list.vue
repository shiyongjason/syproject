<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont__row">
                <div class="query-cont__col">
                    <div class="query-col__label">客户手机号：</div>
                    <div class="query-col__input">
                        <el-input  placeholder="请输入客户手机号" maxlength="13"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">客户姓名：</div>
                    <div class="query-col__input">
                        <el-input  placeholder="请输入客户姓名" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">企业名称：</div>
                    <div class="query-col__input">
                        <el-input  placeholder="请输入企业名称" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">所属分部：</div>
                    <div class="query-col__input">
                        <el-select placeholder="请选择" :clearable=true>
                            <el-option :label="item.deptName" :value="item.pkDeptDoc" v-for="item in crmdepList" :key="item.pkDeptDoc"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">客户经理：</div>
                    <div class="query-col__input">
                        <el-input  placeholder="请输入姓名/手机号" maxlength="50"></el-input>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import moment from 'moment'
@Component({
    name: 'ProjectList2',
    components: {
        hosJoyTable
    }
})
export default class ProjectList2 extends Vue {
    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist: Function

    async mounted () {
        // await this.findCrmdeplist({ deptType: 'F', pkDeptDoc: this.userInfo.pkDeptDoc, jobNumber: this.userInfo.jobNumber, authCode: JSON.parse(sessionStorage.getItem('authCode')) })
    }
}
</script>
<style lang='scss' scoped>
</style>