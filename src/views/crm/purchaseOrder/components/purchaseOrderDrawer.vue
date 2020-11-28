<template>
    <div class="drawer-wrap">
        <el-drawer title="采购单详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%' :before-close="handleClose" :wrapperClosable=false>
            <div class="info-content">
                <div class="row-filed">
                    <p class="col-filed">
                        经销商: 企业名称经销商企业名称
                    </p>
                    <p class="col-filed">
                        项目编号: 企业名称经销商企业名称
                    </p>
                </div>
                <div class="row-filed">
                    <p class="col-filed">
                        <span class="info-title">采购单</span><span class="info-status">待提交</span>
                    </p>
                </div>
                <div class="row-filed">
                    <p class="col-filed">
                        采购单名称: 这里是采购单的名称
                    </p>
                    <p class="col-filed">
                        采购单编号: 9999999999
                    </p>
                </div>
                <div class="row-filed">
                    <p class="col-filed">
                        创建人: 赵娟（15195954045）
                    </p>
                    <p class="col-filed">
                        创建时间: 2019-06-11 16:32
                    </p>
                </div>
<!--                多种状态判断 -->
                <div class="row-filed">
                    <p class="col-filed">
                        提交人：赵娟（15195954045）
                    </p>
                    <p class="col-filed">
                        提交时间：2019-06-11 16:32
                    </p>
                </div>
                 <div class="row-filed">
                    <p class="col-filed">
                        采购单金额： 12,000,000元
                    </p>
                    <p class="col-filed">
                        经销商预付款比例： 50%
                    </p>
                     <p class="col-filed">
                         剩余货款支付周期： 6月
                    </p>
                </div>
                <div class="row-filed">
                    <p class="col-filed">
                        采购明细表：
                        <img src="" alt="">
                    </p>
                </div>
                <div class="row-filed">
                    <p class="col-filed">
                        采购批次： 一次性采购
                    </p>
                    <p class="col-filed">
                        最迟发货日期： 2020年11月25日
                    </p>
                </div>
                <div class="row-filed">
                    <p class="col-filed">
                        收货地址：
                        江苏省南京市中山东路311-2号五星控股大厦江苏省南京市中山东路311-2号五星控股大厦
                    </p>
                </div>
                <div class="row-filed">
                    <p class="col-filed">
                        监管户户名：
                        重庆新日日顺家电有限公司宁波大榭分公司
                    </p>
                    <p class="col-filed">
                        收款账户户名：
                        好享家舒适智能家居股份有限公司
                    </p>
                </div>
                <div class="row-filed">
                    <p class="col-filed">
                        监管户银行账号：
                        6227778888888888888
                    </p>
                    <p class="col-filed">
                        收款账户银行账号：
                        6227778888888888888
                    </p>
                </div>
                <div class="row-filed">
                    <p class="col-filed">
                        监管户开户行：
                        中国银行(江宁科学园支行)
                    </p>
                    <p class="col-filed">
                        收款账户开户行：
                        中国银行(江宁科学园支行)
                    </p>
                </div>
                <div class="row-filed">
                    <p class="col-filed">
                        免息方式： 无
                    </p>
                </div>
                <div class="row-filed">
                    <p class="col-filed">
                        更新时间：2019-06-11 16:32
                    </p>
                    <p class="col-filed">
                        更新人：赵娟（15195954045）
                    </p>
                </div>
<!--                多种状态判断-->
                <div class="row-filed">
                    <div class="jumbotron">
                        <p class="jumbotron-title">订单变更：已确认！</p>
                        <p>
                            提交变更人：赵娟（15195954045） 提交变更时间：2019-06-11 16:32
                        </p>
                        <p>
                            变更备注：江苏省南京市中山东路311-2号五星控股大厦江苏省南京市中山东路311-2号五星控股大厦
                        </p>
                        <p>
                            确认变更人：赵娟（15195954045） 确认变更时间：2019-06-11 16:32
                        </p>
                        <p>
                            <h-button table @click="onClickRecord">查看变更</h-button>
                        </p>
                    </div>
                </div>
            </div>
            <div class="drawer-wrap">
                <div class="drawer-wrap_btn">
                    <div class="drawer-wrap_btn-flex">合同</div>
                </div>
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="一致性 Consistency" name="1">
                        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                    </el-collapse-item>
                    <el-collapse-item title="反馈 Feedback" name="2">
                        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                    </el-collapse-item>
                    <el-collapse-item title="效率 Efficiency" name="3">
                        <div>简化流程：设计简洁直观的操作流程；</div>
                        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                    </el-collapse-item>
                    <el-collapse-item title="可控 Controllability" name="4">
                        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :isMultiple="false" :isAction="true" :actionMinWidth=100 :isShowIndex='true' :maxHeight=500>
                <template slot="No" slot-scope="scope">
                    <span :class="scope.data.row.No?'colgry':'colred'">{{scope.data.row.No}}</span>
                </template>
            </basicTable>
        </el-drawer>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    name: 'purchaseOrderDrawer',
    props: {
        drawer: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            activeNames: ['1'],
            tableData: [],
            tableLabel: [
                { label: '支付单编号', prop: 'creditLevel', width: '120' },
                { label: '金额', prop: 'creditLevel', width: '100' },
                { label: '状态', prop: 'creditLevel', width: '100' },
                { label: '申请时间', prop: 'creditLevel', width: '150', formatters: 'dateTimes' },
                { label: '更新时间', prop: 'creditLevel', width: '150', formatters: 'dateTimes' }
            ]
        }
    },
    components: {
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            nestDdata: 'nestDdata'
        })
    },
    methods: {
        ...mapActions({
            findNest: 'findNest',
            findBusinessDetail: 'crmauthen/findBusinessDetail'

        }),
        onChangeCheckbox (b, key) {
            if (!b) {
                this.businessType[key] = ''
            }
        },
        serviceCapabilityChange () {
            if (this.businessDetail.serviceCapability == 2) {
                this.serviceCapabilityDetail = []
            }
        },
        handleChange (val) {
            console.log(val)
        },
        onClickRecord () {
        }
    },
    mounted () {

    }
}
</script>

<style scoped>

</style>
