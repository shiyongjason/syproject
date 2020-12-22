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
                <div class="td"><h-button table v-if="hosAuthCheck(CRM_PURCHASE_ORDER_CONTRACT_SEE)" @click="goContractDetail(item.id)">查看合同</h-button></div>
            </div>
        </template>
        <template v-else>
            <p class="tips">暂无合同</p>
        </template>
    </div>
</template>

<script>
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'
import { CRM_PURCHASE_ORDER_CONTRACT_SEE } from '@/utils/auth_const'

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
            PurchaseOrderDict
        }
    },
    methods: {
        goContractDetail (id) {
            this.$router.push({
                path: '/goodwork/contractSigningManagementDetail',
                query: {
                    id: id
                }
            })
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
