<template>
    <div>
        <div class="tr" :key="item.id" v-for="item in contracts">
            <div class="td">{{ item.contractNo }}</div>
            <div class="td">{{ item.contractName }}</div>
            <div class="td"><span class="info-status">{{ findStatusName('contractIsRunning', item.effectiveState) }}</span></div>
<!--            <div class="td">{{ findStatusName('contractStatus', item.contractStatus) }}</div>-->
            <div class="td">{{ item.signedTime | formatDate('YYYY-MM-DD') }}</div>
            <div class="td">{{ item.createBy }}</div>
            <div class="td"><h-button table>查看合同</h-button></div>
        </div>
    </div>
</template>

<script>
import PurchaseOrderDict from '@/views/crm/purchaseOrder/purchaseOrderDict'

export default {
    name: 'pureCollapseTr',
    props: {
        contracts: {
            required: true,
            type: Array
        }
    },
    methods: {
        findStatusName (type, status) {
            let name = ''
            if (status > -1) {
                PurchaseOrderDict[type].list.forEach(value => {
                    if (value.key == status) {
                        name = value.value
                    }
                })
                return name
            }
            return '-'
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
</style>
