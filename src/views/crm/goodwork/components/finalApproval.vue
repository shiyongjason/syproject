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
                <div class="tab-layout-title-box">客户基本信息<h-button table>编辑</h-button>
                </div>
            </div>
            <div class="item">
                <div class="item-title">企业信息：</div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px">经销商：</font>
                        <span>河南电力局设备工程公司</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 150px">经销商客户经理：</font>
                        <span>许攸(15025572771)</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px">可代采购额度(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 150px">剩余代采购额度(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px">经销商评级：</font>
                        <span>B</span>
                    </div>

                </div>
            </div>
            <div class="item">
                <div class="item-title">项目信息：</div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>项目名称：</font>
                        <span>山东绿地泉事业部绿地溪山境一期空气源热水器新材料科技创意谷综合楼多联机空调系统设备</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>项目合同总额(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>项目评级：</font>
                        <span>B</span>
                    </div>
                </div>

            </div>
            <!--  -->
            <div class="tab-layout-title">
                <span></span>
                <div class="tab-layout-title-box">采购结论<h-button table>编辑</h-button>
                </div>
            </div>
            <div class="item">
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>申请代付金额(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 165px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>经销商首付款比例(%)：</font>
                        <span>100%</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>设备总额(元)：</font>
                        <span>20,000,000.00</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 165px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>剩余货款支付周期：</font>
                        <span>3个月</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item" style="margin-left:10px">
                        <font style="flex:0 0 135px">执行费率(%)：</font>
                    </div>
                </div>
                <div class="info-layout" style="margin-left:50px">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>银行承兑：</font>
                        <span>5</span>
                    </div>
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>银行转账：</font>
                        <span>6</span>
                    </div>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item" style="margin-left:10pxmargin-top:20px">
                        <font style="flex:0 0 135px">采购信息：</font>
                    </div>
                </div>
                <div class="table">
                    <hosJoyTable ref="hosjoyTable" align="center"  border stripe showPagination :column="tableLabel" :data="tableData" actionWidth='375' prevLocalName="V3.*" localName="V3.*.18">
                    </hosJoyTable>
                </div>
                <div class="info-layout">
                    <div class="info-layout-item">
                        <font style="flex:0 0 135px"><em style="color:#ff0000;font-style: normal;margin-right: 3px">*</em>备注信息：</font>
                    </div>
                </div>
                <div class="tab-textarea" style="margin:15px 0 0 15px">
                    <!-- <el-input  type="textarea" placeholder="可在此填写放款交接中的注意事项等" v-model="loanTransfersConfirm.remark" maxlength="500" rows="5" show-word-limit>
                    </el-input> -->
                    <p>123</p>
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
                            <el-option label="A" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目合同总额：" prop='reviewResolutionStatus' style="marginLeft:-9px;marginTop:10px">
                        <el-input placeholder="请输入" @input="(val)=>inputChage(val,baseInfoForm.name)" :value="money(baseInfoForm.name)">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button>取消</h-button>
                <h-button type="primary">确定</h-button>
            </div>
        </el-dialog>
        <!--  -->
        <el-dialog title="采购结论" :close-on-click-modal='false' :visible.sync="purchaseConclusionVisible" width="1080px" :before-close="()=>editBaseInfoVisible=false" :modal='false'>
            <div class="dialog-ctx reviewResolution">
                <el-form id='elform' :model="baseInfoForm" :rules="formRules" label-width="180px" label-position='right' ref="purchaseConclusionForm" class="purchaseConclusion">
                    <div class="form-item">
                        <!-- 仅可输入数字，区间为（0，100000000），最多保留2位小数。 -->
                        <el-form-item label="申请代付金额：" prop='pledgeNo'>
                            <el-input v-isNum:2 v-inputMAX='100000000' placeholder="请输入" v-model="baseInfoForm.name" maxlength="50">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <!-- 0-100,最多保留2位小数 -->
                        <el-form-item label="经销商首付款比例" prop='reviewResolutionStatus'>
                            <el-input placeholder="请输入" v-model="baseInfoForm.name" maxlength="50">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="form-item">
                        <!-- 仅可输入数字，区间为（0，100000000），最多保留2位小数。 -->
                        <!-- @input="(val)=>inputChage(val,baseInfoForm.name)" :value="money(baseInfoForm.name)" -->
                        <el-form-item label="设备总额：" prop='reviewResolutionStatus'>
                            <el-input placeholder="请输入"  v-isNum:2 v-inputMAX='100000000' v-model="baseInfoForm.name" :value="money(baseInfoForm.name)">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <!--  -->
                        <el-form-item label="剩余货款支付周期：" prop='reviewResolutionStatus' style="marginLeft:-9px;marginTop:10px">
                            <el-select v-model="baseInfoForm.name" placeholder="请选择">
                                <el-option label="1个月" :value="1"></el-option>
                                <el-option label="2个月" :value="2"></el-option>
                                <el-option label="3个月" :value="3"></el-option>
                                <el-option label="4个月" :value="4"></el-option>
                                <el-option label="5个月" :value="5"></el-option>
                                <el-option label="6个月" :value="6"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="reviewResolutionForm-title" style="marginTop:0px">
                        执行费率(%)：
                    </div>
                    <div class="form-item">
                        <!-- 仅可输入数字，区间为（0，100），最多保留2位小数 -->
                        <el-form-item label="银行转账：" prop='reviewResolutionStatus'>
                            <el-input v-isNum:2 v-inputMAX='100' placeholder="请输入" v-model="baseInfoForm.name">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                        <!-- 仅可输入数字，区间为（0，100），最多保留2位小数 -->
                        <el-form-item label="银行承兑：" prop='reviewResolutionStatus' style="marginLeft:-9px;marginTop:10px">
                            <el-input v-isNum:2 v-inputMAX='100' placeholder="请输入" v-model="baseInfoForm.name">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="reviewResolutionForm-title" style="marginTop:0px">
                        采购信息：
                    </div>
                    <div class="form-table">
                        <hosJoyTable ref="hosjoyTable" align="center" border stripe :showPagination='false' :column="formTableLabel" :data="tableForm" actionWidth='50' prevLocalName="V3.*" localName="V3.*.26" isAction>
                            <template #action="slotProps">
                                <h-button table @click="del(slotProps.data)">删除</h-button>
                            </template>
                        </hosJoyTable>
                        <span style='color: #1890FF;text-decoration: underline;marginTop:-10px;cursor: pointer;' @click="onAddItem"> + 添加采购信息</span>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <h-button>取消</h-button>
                <h-button type="primary" @click="submit">确定</h-button>
            </div>
        </el-dialog>

    </div>
</template>

<script lang='tsx'>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue'
import { isNum } from '@/utils/validate/format'
import utils from '@/utils/filters'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { getTYCList } from '../api/index'
import { useDebounce } from '@/decorator'

@Component({
    name: 'finalApproval',
    components: {
        hosJoyTable
    }
})
export default class FinalApproval extends Vue {
    radio1: string = '评审决议内容';
    tableData: any[] = [];
    baseInfoForm: any = {
        name: ''
    };
    editBaseInfoVisible: boolean = false;
    purchaseConclusionVisible: boolean = true;
    disabled: boolean = true;
    TYCList:any[]=[]
    tableForm: any[] = [
        {
            name: '1'
        },
        {
            name: '2'
        }
    ];
    category: any[] = [
        { value: '空调' },
        { value: '采暖' },
        { value: '新风' },
        { value: '净水' },
        { value: '智能化' },
        { value: '辅材' },
        { value: '电梯' },
        { value: '电器' },
        { value: '热水器' }
    ];

    otherCategory: any = {
        value: ''
    }

    get formRules () {
        let rules = {
            pledgeNo: [
                {
                    required: true,
                    validator: (rule, value, callback) => {
                        var Reg = /^[A-Za-z0-9]+$/
                        if (value && !Reg.test(value)) {
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
            oaStatus: [{ required: true, message: '必填项不能为空' }]
        }
        return rules
    }

    tableLabel: tableLabelProps = [
        { label: '设备品牌', prop: 'purchaseOrderNo', width: '120' },
        { label: '上游供应商', prop: 'poAmount', width: '120' },
        { label: '上游供应商类型', prop: 'status', width: '150' },
        { label: '上游支付方式', prop: 'createTime' },
        { label: '设备品类', prop: 'updateTime' }
    ];

    formTableLabel: tableLabelProps = [
        {
            label: '设备品牌',
            prop: 'name',
            className: 'form-table-header',
            showOverflowTooltip: false,
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div>
                        <el-input
                            class="mini"
                            size="mini"
                            placeholder="请输入"
                            value={scope.row[scope.column.property]}
                            onInput={(val) => {
                                scope.row[scope.column.property] = val
                            }}
                            maxlength={20}
                        ></el-input>
                        {/* <p class='required-txt'>222</p>**/}
                    </div>
                )
            }
        },
        {
            label: '上游供应商',
            prop: 'name',
            width: '240',
            className: 'form-table-header',
            showOverflowTooltip: false,
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div>
                        <el-autocomplete
                            class="miniSelectCompany"
                            size="mini"
                            placeholder="请输入"
                            value={scope.row[scope.column.property]}
                            onInput={(val) => {
                                scope.row[scope.column.property] = val
                            }}
                            fetch-suggestions={this.querySearch}
                            hide-loading
                            // remoteMethod
                            maxlength={50}
                        >
                        </el-autocomplete>
                        {/* <p class='required-txt'>222</p>**/}
                    </div>
                )
            }
        },
        {
            label: '上游供应商类型',
            prop: 'name',
            width: '130',
            className: 'form-table-header',
            showOverflowTooltip: false,
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div>
                        <el-select
                            class="miniSelect"
                            size="mini"
                            placeholder="请选择"
                            value={scope.row[scope.column.property]}
                            onInput={(val) => {
                                scope.row[scope.column.property] = val
                            }}
                        >
                            <el-option key="厂商" value="厂商" label="厂商">厂商</el-option>
                            <el-option key="代理商" value="代理商" label="代理商">代理商</el-option>
                            <el-option key="经销商" value="经销商" label="经销商">经销商</el-option>
                        </el-select>
                        {/* <p class='required-txt'>222</p>**/}
                    </div>
                )
            }
        },
        {
            label: '上游支付方式',
            prop: 'name',
            width: '130',
            className: 'form-table-header',
            showOverflowTooltip: false,
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div>
                        <el-select
                            class="miniSelect"
                            size="mini"
                            placeholder="请选择"
                            value={scope.row[scope.column.property]}
                            onInput={(val) => {
                                scope.row[scope.column.property] = val
                            }}
                        >
                            <el-option key="银行转账" value="银行转账" label="银行转账">银行转账</el-option>
                            <el-option key="银行承兑" value="银行承兑" label="银行承兑">银行承兑</el-option>
                        </el-select>
                        {/* <p class='required-txt'>222</p>**/}
                    </div>
                )
            }
        },
        {
            label: '设备品类',
            prop: 'name',
            width: '200',
            className: 'form-table-header',
            showOverflowTooltip: false,
            render: (h: CreateElement, scope: TableRenderParam) => {
                let create = this.$createElement // 或者不写箭头函数
                return (
                    create('el-select', {
                        class: 'miniSelectSupplier',
                        // 组件 prop
                        props: {
                            size: 'mini',
                            placeholder: '请选择',
                            value: scope.row[scope.column.property]
                        },
                        on: {
                            input: (val) => { console.log(' 🚗 🚕 🚙 🚌 🚎 ', val); scope.row[scope.column.property] = val },
                            focus: () => { console.log(' 🚗 🚕 🚙 🚌 🚎 focus'); this.otherCategory.value = '' }
                        },
                        scopedSlots: {
                            default: props => this.onRenderChild(create, scope)
                        },
                        // Vue jsx 的 ref需要借助createElement的语法生成
                        ref: 'categoryRef'
                    })
                )
            }
        }
    ];

    onRenderChild (h: CreateElement, scope: TableRenderParam) {
        return (
            <div>
                {this.category.map((item, index) => {
                    return (
                        <el-option
                            key={index + 'option'}
                            value={item.value}
                            label={item.value}
                        >
                            {item.value}
                        </el-option>
                    )
                })}
                <el-option disabled={this.disabled} key="其它" value={this.otherCategory.value} label={this.otherCategory.value} class="categoryminioption">
                    <span style="float: left;color:#606266;margin-right:5px">其它：</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">
                        <el-input
                            class="categorymini"
                            size="mini"
                            placeholder="请输入"
                            value={this.otherCategory.value}
                            onInput={(val) => {
                                console.log(' 🚗 🚕 🚙 🚌 🚎其它 ', val)
                                this.otherCategory.value = val
                            }}
                            maxlength={15}
                            style="width:150px"
                        ></el-input>
                        <span class="colorypointer">
                            <i class="el-icon-check" style="cursor: pointer;color:#FF7A45;padding:0 5px;font-size: 18px;" onClick={() => this.onAddOption(scope)}></i>
                        </span>
                    </span>
                </el-option>
            </div>
        )
    }

    @useDebounce(1000)
    async querySearch (queryString: string, callback: (arg: any) => void) {
        if (!queryString) return
        // 天眼查查询
        const { data } = await getTYCList({ word: queryString })
        if (data) {
            this.TYCList = data.items
        }
        for (let item in this.TYCList) {
            this.TYCList[item].value = this.TYCList[item].name
        }
        callback(this.TYCList)
    }

    // onRenderHeader () {
    //     return '22'
    // }

    money (val) {
        return utils.money(val)
    }

    inputChage (val, item, propName) {
        let num = isNum(val, 2)
        if (num == '.' || !num) {
            num = ''
        }
        item[propName] = num
    }

    // 删除添加采购信息一行
    del (v) {
        this.tableForm.splice(v.$index, 1)
    }

    // 添加采购信息
    onAddItem () {
        let _temp = { name: '' }
        this.tableForm.push(_temp)
        console.log(' 🚗 🚕 🚙 🚌 🚎 add', this.tableForm)
    }

    // 添加设备品类
    onAddOption (scope) {
        if (!this.otherCategory.value) {
            return
        }
        let one = this.category.find(i => this.otherCategory.value == i.value)
        if (one) {
            return
        }
        this.disabled = false
        scope.row[scope.column.property] = JSON.parse(JSON.stringify(this.otherCategory.value))
        this.category.push({
            value: JSON.parse(JSON.stringify(this.otherCategory.value))
        })
        // let categoryRef:any = this.$refs['categoryRef']
        setTimeout(() => {
            this.disabled = true
        }, 0)
    }

    submit () {
        console.log(' 🚗 🚕 🚙 🚌 🚎 ', this.tableForm)
    }
}
</script>

<style  lang='scss' scoped>
@import "../css/finalApproval.scss";
</style>