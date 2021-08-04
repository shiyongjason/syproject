<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">预付款支付单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
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
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">预付款支付单编号：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请时间：</div>
                    <div class="query-col__input">
                        <HDatePicker :start-change="onStartChange" :end-change="onEndChange" :options="options"></HDatePicker>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">项目名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">状态：</div>
                    <div class="query-col__input">
                        <el-select v-model="queryParams.paymentStatus" placeholder="请选择">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="待支付" :value="1"></el-option>
                            <el-option label="部分支付" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont__col">
                    <div class="query-col__label">申请人：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="请输入" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont__col">
                    <h-button type="primary" @click="getList">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </div>
            </div>
            <div class="query-cont__row">
                <el-tag size="medium" class="tag_top">已筛选 {{page.total}} 项 <span>累计金额：{{totalAmount|fundMoneyHasTail}}</span></el-tag>
            </div>
            <!-- end search bar -->
            <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe showPagination :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" actionWidth='250' isAction
                :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <h-button table>查看详情</h-button>
                </template>
            </hosJoyTable>
        </div>
        <el-dialog title="预付款支付单详情" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
            <div class="advance_wrap">
                <h3>项目信息</h3>
                <el-row type="flex" class="row-bg">
                    <el-col :span="7" :offset='1'>项目：222222222222</el-col>
                    <el-col :span="7" :offset='1'>经销商：2233333333333333</el-col>
                    <el-col :span="7" :offset='1'>所属分部：333333333333333</el-col>
                </el-row>
                <h3>上游支付信息</h3>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>申请金额(元)：</el-col>
                    <el-col :span="10" :offset='1'>上游支付方式：</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>上游供应商：</el-col>
                    <el-col :span="10" :offset='1'>供应商开户行名称：</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>供应商开户行名称：</el-col>
                    <el-col :span="10" :offset='1'>供应商银行账号：</el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>期望上游支付日期：</el-col>
                    <el-col :span="10" :offset='1'>备注：</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>申请时间：</el-col>
                    <el-col :span="10" :offset='1'>申请时间：</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>审核人：</el-col>
                    <el-col :span="10" :offset='1'>申请时间：</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>申核结果：</el-col>
                    <el-col :span="10" :offset='1'>申核备注：</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>已向上游支付(元)：</el-col>
                    <el-col :span="10" :offset='1'>支付日期：</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>上游支付凭证：
                        <div class="advance_wrap-pic">
                            <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
                        </div>
                    </el-col>
                    <el-col :span="7" :offset='1'>支付凭证上传时间：2102-8-9</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="24" :offset='20'>
                        <el-button type="primary" @click="dialogVisible = false">确认上游支付</el-button>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 审核 -->
        <el-dialog title="预付款支付单审核" :visible.sync="examineVisble" width="40%" :before-close="handleClose">
            <div class="advance_examine">
                <div class="advance_examine-left">
                    <h3>项目信息</h3>
                    <el-row type="flex" class="row-bg">
                        <el-col :span="23" :offset='1'>项目：222222222222</el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg">
                        <el-col :span="23" :offset='1'>经销商：222222222222</el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg">
                        <el-col :span="23" :offset='1'>所属分部：222222222222</el-col>
                    </el-row>
                    <h3>上游支付信息</h3>
                    <el-row>
                        <el-col class="col-padding" :span="23" :offset='1'>申请金额(元)：</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>上游支付方式：</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>上游供应商：</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>供应商开户行名称：</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>供应商银行账号：</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>期望上游支付日期：</el-col>
                        <el-col class="col-padding" :span="23" :offset='1'>备注信息：</el-col>
                    </el-row>
                </div>
                <div class="advance_examine-right">
                    <h3>审核信息</h3>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="审核结果">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="线上品牌商赞助"></el-radio>
                                <el-radio label="线下场地免费"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
              <p>审核通过后，将会发送钉钉预付款支付审批流程</p>
            <span slot="footer" class="dialog-footer">

                <el-button type="primary" @click="dialogVisible = false">确认审核</el-button>
            </span>
        </el-dialog>

        <!-- 确认上游支付 -->
        <el-dialog title="预付款支付单详情" :visible.sync="comfireVisble" width="40%" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>经销商：</el-col>
                    <el-col :span="10" :offset='1'>项目：</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>分部：</el-col>
                    <el-col :span="10" :offset='1'>上游：</el-col>
                </el-row>
                <el-row ype="flex" class="row-bg">
                    <el-col :span="10" :offset='1'>上游支付方式：</el-col>
                    <el-col :span="10" :offset='1'>剩余应上游支付(元)：</el-col>
                </el-row>
                <el-form-item label="本次支付金额" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="支付日期：" prop="name">
                    <el-date-picker v-model="ruleForm.name" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="上传上游支付凭证：" prop="payVouchers" style="margin-bottom:20px">
                    <OssFileHosjoyUpload v-model="ruleForm.payVouchers" :showPreView='true' :fileSize=20 :fileNum=9 :uploadParameters='uploadParameters' @successCb="$refs.form.clearValidate()" accept=".jpg,.png,.pdf">
                        <div class="a-line">
                            <h-button>上传文件</h-button>
                        </div>
                    </OssFileHosjoyUpload>
                    <p class="tips">支持扩展名：jpg.png.pdf...</p>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确认上游支付</el-button>
                <el-button @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { CreateElement } from 'vue'
import { Action, Getter, State } from 'vuex-class'
import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import './css/css.scss'
interface Query{
    [key:string]:any
}
@Component({
    name: 'Advancelist',
    components: {
        hosJoyTable,
        OssFileHosjoyUpload
    }
})
export default class Advancelist extends Vue {
    $refs!: {
        form: HTMLFormElement
    }
    uploadParameters = {
        updateUid: '',
        reservedName: false
    }
    private dialogVisible:boolean = false
    private comfireVisble:boolean = false
    private examineVisble:boolean = true
    queryParams:Query = {

    }
    ruleForm:object = {
        payVouchers: []
    }
    page = {
        total: 0
    }
    tableLabel:tableLabelProps = [
        { label: '支付单编号', prop: 'paymentOrderNo', width: '100' },
        { label: '所属分部', prop: 'deptName', width: '130' },
        { label: '经销商', prop: 'companyName', width: '150', resizable: true },
        { label: '上游供应商', prop: 'supplierCompanyName', width: '180' },
        { label: '项目名称', prop: 'projectName', minWidth: '300' },
        { label: '采购单金额', prop: 'poAmount', width: '160', displayAs: 'money' }
    ]
    tableData = []
    @State('userInfo') userInfo: any
    @Getter('crmmanage/crmdepList') crmdepList!: Array<HCGCommonInterface.Branch>
    @Action('crmmanage/findCrmdeplist') findCrmdeplist!: Function
    get options () {
        return {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
            startTime: this.queryParams.startExpectSupplierPaymentDate,
            endTime: this.queryParams.endExpectSupplierPaymentDate
        }
    }

    public getList (): void {

    }
    public created (): void {
        console.log('created')
    }

    public async mounted () {
        console.log('mounted')
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

<style lang="scss" scoped>
</style>>
