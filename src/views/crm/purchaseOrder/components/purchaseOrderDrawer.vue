<template>
    <div class="drawer-wrap">
        <el-drawer title="采购单详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%'
                   :before-close="handleClose" :wrapperClosable=false>
            <div class="drawer-content">
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
                            <div class="jumbotron-status">
                                <img src="../../../../assets/images/good-job-status-icon.png" alt="">
                            </div>
                            <div>
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
                </div>
                <div class="info-content">
                    <div class="info-title info-title-main-color">合同</div>
                    <div class="table-header">
                        <div class="th">合同编号</div>
                        <div class="th">合同名称</div>
                        <div class="th"></div>
                        <div class="th">合同状态</div>
                        <div class="th">签约完成时间</div>
                        <div class="th">发起人</div>
                        <div class="th">操作</div>
                    </div>
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="销售合同" name="1">
                            <div class="table-body">
                                <div class="tr">
                                    <div class="td">9999</div>
                                    <div class="td">这里是合同名称</div>
                                    <div class="td"><h-button table>生效中</h-button></div>
                                    <div class="td">签署完成</div>
                                    <div class="td">2019-06-11</div>
                                    <div class="td">赵娟</div>
                                    <div class="td"><h-button table>查看合同</h-button></div>
                                </div>
                                <div class="tr">
                                    <div class="td">9999</div>
                                    <div class="td">这里是合同名称</div>
                                    <div class="td"><h-button table>生效中</h-button></div>
                                    <div class="td">签署完成</div>
                                    <div class="td">2019-06-11</div>
                                    <div class="td">赵娟</div>
                                    <div class="td"><h-button table>查看合同</h-button></div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="采购合同" name="2">
                            <div class="table-body">
                                <div class="tr">
                                    <div class="td">9999</div>
                                    <div class="td">这里是合同名称</div>
                                    <div class="td"><h-button table>生效中</h-button></div>
                                    <div class="td">签署完成</div>
                                    <div class="td">2019-06-11</div>
                                    <div class="td">赵娟</div>
                                    <div class="td"><h-button table>查看合同</h-button></div>
                                </div>
                                <div class="tr">
                                    <div class="td">9999</div>
                                    <div class="td">这里是合同名称</div>
                                    <div class="td"><h-button table>生效中</h-button></div>
                                    <div class="td">签署完成</div>
                                    <div class="td">2019-06-11</div>
                                    <div class="td">赵娟</div>
                                    <div class="td"><h-button table>查看合同</h-button></div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="担保合同" name="3">
                            <div class="table-body">
                                <div class="tr">
                                    <div class="td">9999</div>
                                    <div class="td">这里是合同名称</div>
                                    <div class="td"><h-button table>生效中</h-button></div>
                                    <div class="td">签署完成</div>
                                    <div class="td">2019-06-11</div>
                                    <div class="td">赵娟</div>
                                    <div class="td"><h-button table>查看合同</h-button></div>
                                </div>
                                <div class="tr">
                                    <div class="td">9999</div>
                                    <div class="td">这里是合同名称</div>
                                    <div class="td"><h-button table>生效中</h-button></div>
                                    <div class="td">签署完成</div>
                                    <div class="td">2019-06-11</div>
                                    <div class="td">赵娟</div>
                                    <div class="td"><h-button table>查看合同</h-button></div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="应收账款质押合同" name="4">
                            <div class="table-body">
                                <div class="tr">
                                    <div class="td">9999</div>
                                    <div class="td">这里是合同名称</div>
                                    <div class="td"><h-button table>生效中</h-button></div>
                                    <div class="td">签署完成</div>
                                    <div class="td">2019-06-11</div>
                                    <div class="td">赵娟</div>
                                    <div class="td"><h-button table>查看合同</h-button></div>
                                </div>
                                <div class="tr">
                                    <div class="td">9999</div>
                                    <div class="td">这里是合同名称</div>
                                    <div class="td"><h-button table>生效中</h-button></div>
                                    <div class="td">签署完成</div>
                                    <div class="td">2019-06-11</div>
                                    <div class="td">赵娟</div>
                                    <div class="td"><h-button table>查看合同</h-button></div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="其他合同" name="5">
                            <div class="table-body">
                                <div class="tr">
                                    <div class="td">9999</div>
                                    <div class="td">这里是合同名称</div>
                                    <div class="td"><h-button table>生效中</h-button></div>
                                    <div class="td">签署完成</div>
                                    <div class="td">2019-06-11</div>
                                    <div class="td">赵娟</div>
                                    <div class="td"><h-button table>查看合同</h-button></div>
                                </div>
                                <div class="tr">
                                    <div class="td">9999</div>
                                    <div class="td">这里是合同名称</div>
                                    <div class="td"><h-button table>生效中</h-button></div>
                                    <div class="td">签署完成</div>
                                    <div class="td">2019-06-11</div>
                                    <div class="td">赵娟</div>
                                    <div class="td"><h-button table>查看合同</h-button></div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <div class="info-title info-title-main-color">支付单</div>
                    <basicTable :tableData="tableData" :tableLabel="tableLabel" :isMultiple="false" :isAction="true"
                                :actionMinWidth=100 :isShowIndex='true' :maxHeight=500>
                        <template slot="No" slot-scope="scope">
                            <span :class="scope.data.row.No?'colgry':'colred'">{{ scope.data.row.No }}</span>
                        </template>
                    </basicTable>
                </div>
                <div class="drawer-footer">
                    <div class="drawer-button">
                        <h-button type="assist">确认采购单</h-button>
<!--                        <h-button type="primary">审核通过</h-button>-->
                         <h-button type="default" @click="handleClose">取消</h-button>
                    </div>
                </div>
            </div>
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
    components: {},
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
        },
        handleClose () {
            this.$emit('backEvent')
        }
    },
    mounted () {

    }
}
</script>

<style scoped lang="scss">
.info-content {
    padding: 0 20px;

    .row-filed {
        display: flex;
        padding: 10px;

        .col-filed {
            display: flex;
            align-items: center;
            padding-right: 30px;
            font-size: 14px;
            color: #333333;
            font-weight: 400;
            cursor: default;
            line-height: 15px;
        }
    }
    .info-title {
        font-size: 15px;
        color: #000000;
        font-weight: 600;
        padding-right: 20px;
        line-height: 30px;
    }

    .info-status {
        background: #FF7A45;
        font-size: 12px;
        color: #ffffff;
        padding: 4px 14px;
        border-radius: 4px;

    }
    .info-title-main-color {
        color: #FF7A45;
        line-height: 30px;
        padding: 15px 0;
    }
    .jumbotron {
        width: 100%;
        background: #fffbe6;
        border: 1px solid #ffe58f;
        border-radius: 12px;
        padding: 12px;
        font-size: 14px;
        display: flex;
        .jumbotron-status {
            padding: 0 15px;
        }
        .jumbotron-status img{
            width: 30px;
        }
        .jumbotron-title {
            font-size: 16px;
            font-weight: 400;
            padding: 8px 0 10px;
        }
        p {
            padding: 6px 0;
            line-height: 16px;
        }
    }
    .table-header {
        display: flex;
        height: 54px;
        font-weight: 600;
        font-size: 12px;
        color: #000000;
        background: #fafafa;
        div {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
        }
        >:nth-child(1){
            width: 15%;
        }
        >:nth-child(2){
            width: 15%;
        }
        >:nth-child(3){
            width: 10%;
        }
        >:nth-child(4){
            width: 10%;
        }
        >:nth-child(5){
            width: 15%;
        }
        >:nth-child(6){
            width: 10%;
        }
        >:nth-child(7){
            width: 25%;
        }
    }
    .table-body{
        .tr{
            display: flex;
            padding: 10px;
            border-bottom: 1px solid #EBEEF5;
            div {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            >:nth-child(1){
                width: 15%;
            }
            >:nth-child(2){
                width: 15%;
            }
            >:nth-child(3){
                width: 10%;
            }
            >:nth-child(4){
                width: 10%;
            }
            >:nth-child(5){
                width: 15%;
            }
            >:nth-child(6){
                width: 10%;
            }
            >:nth-child(7){
                width: 25%;
            }
        }
        .tr:last-child{
            border-bottom: none;
        }
    }
}
/deep/ .el-drawer__body {
    overflow-y: scroll;
}
.drawer-content {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 100px;
    .drawer-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px 24px;
        border-top: 1px solid #e5e5ea;
        background: #fff;
        z-index: 1000;
        button {
            flex: 1;
        }
        .drawer-button {
            text-align: right;
        }
    }
}
/deep/.el-tabs__nav-scroll {
    padding-left: 20px;
}
/deep/.el-drawer__header {
    padding: 20px 20px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
    font-size: 16px;
}
/deep/.el-collapse-item__header{
    font-weight: 600;
    color: #000000;
    font-size: 14px;
}
</style>
