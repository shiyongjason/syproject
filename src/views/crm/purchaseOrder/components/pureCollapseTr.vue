<template>
    <div>
        <template v-if="contracts.length> 0">
            <div class="tr" :key="item.id" v-for="item in contracts">
                <div class="td">{{ item.contractNo }}</div>
                <div class="td">{{ item.contractName }}</div>
                <div class="td"><span class="info-status" v-if="item.effectiveState === 1">{{ item.effectiveState | attributeComputed(PurchaseOrderDict.contractIsRunning.list) }}</span></div>
                <div class="td">{{ item.contractStatus | attributeComputed(PurchaseOrderDict.contractStatus.list) }}</div>
                <div class="td">{{ item.signedTime | formatDate('YYYY-MM-DD HH:mm:ss') }}</div>
                <div class="td">{{ item.createBy }}</div>
                <div class="td">
                    <h-button table v-if="hosAuthCheck(CRM_PURCHASE_ORDER_CONTRACT_SEE)" @click="goContractDetail(item.contractId)">查看合同</h-button>
<!--                    todo 当合同状态为“合同已签署”时，操作列常驻展示“去归档”。点击去归档，进入合同详情页面。-->
<!--                    合同签署类型 1：线上 2：线下-->
<!--                    合同状态：1：草稿 2：待分财审核 3：分财审核未通过 4：待运营审核 5：运营审核未通过 6：待法务审核 7：法务审核未通过 8：待客户签署 9：客户拒签 10：待平台签署 11：平台签署未通过 12：合同已签署 13：异常关闭 14：超时关闭 15：用印发起失败 16：发起线上待客户签署 17：合同废止-->
                    <h-button table v-if="item.contractSignType ==2 && item.contractStatus == 12 && hosAuthCheck(CRM_PURCHASE_DETAIL_FILE)" @click="goContractDetail(item.contractId)">去归档</h-button>
                </div>
            </div>
        </template>
        <template v-else>
            <p class="tips">暂无合同</p>
        </template>
    </div>
</template>

<script>
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'
import { CRM_PURCHASE_DETAIL_FILE, CRM_PURCHASE_ORDER_CONTRACT_SEE } from '@/utils/auth_const'

export default {
    name: 'pureCollapseTr',
    props: {
        contracts: {
            required: true,
            type: Array
        }
    },
    data () {
        return {
            CRM_PURCHASE_ORDER_CONTRACT_SEE,
            CRM_PURCHASE_DETAIL_FILE,
            PurchaseOrderDict
        }
    },
    methods: {
        goContractDetail (id) {
            let routeUrl = this.$router.resolve({
                path: '/goodwork/contractSigningManagementDetail',
                query: {
                    id: id
                }
            })
            window.open(routeUrl.href, '_blank')
        }
    }
}
</script>

<style scoped lang="scss">
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
.info-status {
    background: #FF7A45;
    font-size: 12px;
    color: #ffffff;
    padding: 2px 10px;
    border-radius: 4px;
    cursor: default;
}
.tips {
    padding: 20px;
    font-size: 12px;
    text-align: center;
    color: #333333;
}
</style>
