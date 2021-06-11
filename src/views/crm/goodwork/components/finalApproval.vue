<template>
    <div class="finalApproval">
        <el-radio-group v-model="radio1">
            <el-radio-button label="评审决议内容"></el-radio-button>
            <el-radio-button label="决议修改记录"></el-radio-button>
        </el-radio-group>
        <div class="tab-layout">
            <div class="status-title">评审会决议【待提交】</div>
            <div class="status-description">（待风控完善评审决议内容后，提交钉钉审批流程）</div>
            <div class="tab-layout-title">
                <span></span>
                <div class="tab-layout-title-box">客户基本信息<h-button table>编辑</h-button></div>
            </div>
            <div class="item">
                <div class="item-title">企业信息：</div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;">经销商：</font>
                        <span>河南电力局设备工程公司</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 150px;">经销商客户经理：</font>
                        <span>许攸(15025572771)</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;">可代采购额度(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 150px;">剩余代采购额度(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;">经销商评级：</font>
                        <span>B</span>
                    </div>

                </div>
            </div>
            <div class="item">
                <div class="item-title">项目信息：</div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>项目名称：</font>
                        <span>山东绿地泉事业部绿地溪山境一期空气源热水器新材料科技创意谷综合楼多联机空调系统设备</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>项目合同总额(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font ><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>项目评级：</font>
                        <span>B</span>
                    </div>
                </div>

            </div>
            <!--  -->
            <div class="tab-layout-title">
                <span></span>
                <div class="tab-layout-title-box">采购结论<h-button table>编辑</h-button></div>
            </div>
            <div class="item">
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>申请代付金额(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 165px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>经销商首付款比例(%)：</font>
                        <span>100%</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>设备总额(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 165px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>剩余货款支付周期：</font>
                        <span>3个月</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item" style="margin-left:10px">
                        <font style="flex:0 0 135px;">执行费率(%)：</font>
                    </div>
                </div>
                <div class="info-layout" style="margin-left:50px">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>银行承兑：</font>
                        <span>5</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>银行转账：</font>
                        <span>6</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item" style="margin-left:10px;margin-top:20px">
                        <font style="flex:0 0 135px;">采购信息：</font>
                    </div>
                </div>
                <div class="table">
                    <hosJoyTable ref="hosjoyTable" align="center" collapseShow border stripe showPagination :column="tableLabel" :data="tableData"
                actionWidth='375'   prevLocalName="V3.*" localName="V3.*.18">
                    </hosJoyTable>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px;"><em style="color:#ff0000;font-style: normal;margin-right: 3px;">*</em>备注信息：</font>
                    </div>
                </div>
                <div class="tab-textarea" style="margin:15px 0 0 15px">
                    <!-- <el-input  type="textarea" placeholder="可在此填写放款交接中的注意事项等" v-model="loanTransfersConfirm.remark" maxlength="500" rows="5" show-word-limit>
                    </el-input> -->
                    <p >123</p>
                </div>
            </div>

        </div>
        <el-dialog title="质押与终审决议信息" :close-on-click-modal='false' :visible.sync="editBaseInfoVisible" width="750px" :before-close="()=>editBaseInfoVisible=false" :modal='false'>
            <div class="dialog-ctx reviewResolution">
                <div class="reviewResolutionForm-title" style="marginTop:0px">
                    企业信息：
                </div>
                <div class="dialogbaseinfo">
                    <div class="dialogbaseinfo-item">经销商：河南电力局设备工程公司</div>
                    <div class="dialogbaseinfo-item">经销商客户经理：许攸(15025572771)</div>
                </div>
                <div class="dialogbaseinfo">
                    <div class="dialogbaseinfo-item">可代采购额度(元)：2,000,000.00</div>
                    <div class="dialogbaseinfo-item">剩余代采购额度(元)：2,000,000.00</div>
                </div>
                <el-form id='elform' :model="baseInfoForm" :rules="formRules" label-width="180px" label-position='right' ref="reviewResolutionForm">
                    <div class="reviewResolutionForm-title" style="marginTop:0px">
                        项目信息：
                    </div>
                    <el-form-item label="项目名称：" prop='pledgeNo' style="marginLeft:-8px">
                        <el-input placeholder="请输入" v-model="baseInfoForm.name" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="评审决议流程状态：" prop='reviewResolutionStatus' style="marginLeft:-9px;marginTop:10px">
                        <el-select v-model="baseInfoForm.name" placeholder="请选择">
                            <el-option label="已完结" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目合同总额："  prop='reviewResolutionStatus' style="marginLeft:-9px;marginTop:10px">
                        <el-input placeholder="请输入" @input="(val)=>inputChage(val,baseInfoForm.name)" :value="money(baseInfoForm.name)">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button >取消</h-button>
                <h-button type="primary">确定</h-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='tsx'>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { isNum } from '@/utils/validate/format'
import utils from '@/utils/filters'
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
    name: 'finalApproval',
    components: {
        hosJoyTable
    }
})
export default class FinalApproval extends Vue {
    radio1:string='评审决议内容'
    tableData:any[]=[]
    editBaseInfoVisible:boolean=true
    tableLabel:tableLabelProps= [
        { label: '设备品牌', prop: 'purchaseOrderNo', width: '120' },
        { label: '上游供应商', prop: 'poAmount', width: '120' },
        { label: '上游供应商类型', prop: 'status', width: '150' },
        { label: '上游支付方式', prop: 'createTime' },
        { label: '设备品类', prop: 'updateTime' }
    ]
    baseInfoForm:any={
        name: ''
    }

    get formRules () {
        let rules = {
            pledgeNo: [
                {
                    required: true,
                    validator: (rule, value, callback) => {
                        var Reg = /^[A-Za-z0-9]+$/
                        if (value && !(Reg.test(value))) {
                            return callback(new Error('只能为数字或字母'))
                        }
                        if (!value) {
                            return callback(new Error('请输入中登网质押编号'))
                        }
                        return callback()
                    },
                    trigger: 'blur'
                }
            ],
            oaStatus: [
                { required: true, message: '必填项不能为空' }
            ]
        }
        return rules
    }

    money (val) {
        return utils.money(val)
    }

    inputChage (val, item) {
        let num = isNum(val, 2)
        if (num == '.' || !num) {
            num = ''
        }
        item.amount = num
    }
}
</script>

<style  lang='scss' scoped>
@import "../css/finalApproval.scss";
</style>