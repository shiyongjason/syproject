<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="ctilte"><span>合同详情</span>
                <h-button type="primary" class="btn-right">下载合同</h-button>
            </div>
            <div v-html=vHtml v-if="vHtml" class='approvalcontract-content-layout'>
            </div>
            <div v-else>暂无数据</div>
        </div>
        <!---->

    </div>
</template>
<script>
import { getContractsContent } from './api/index'
export default {
    name: 'SigningManagementDetail',
    data () {
        return {
            vHtml: ''
        }
    },
    methods: {
        init () {
            this.$nextTick(() => {
                let inputDomList = document.getElementsByClassName('approvalcontract-content-layout')[0].getElementsByTagName('input')
                console.log('inputDomList: ', inputDomList)
                Array.from(inputDomList).map((item, index) => {
                    item.outerHTML = `<div class="${item.className}" contenteditable="false" style="display:inline;">${item.value}</div>`
                })
            })
        }
    },
    async mounted () {
        const { data } = await getContractsContent({ contractId: this.$route.query.id })
        this.vHtml = data.contractContent
        if (this.vHtml) {
            this.init()
        }
    },
    async activated () {
        const { data } = await getContractsContent({ contractId: this.$route.query.id })
        this.vHtml = data.contractContent
        if (this.vHtml) {
            this.init()
        }
    }
}
</script>
<style scoped lang="scss">
.ctilte {
    text-align: center;
    line-height: 41px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
    span {
        font-size: 20px;
    }
}
.btn-right {
    float: right;
}

/deep/.inputCont {
    color: #ff7a45;
    display: inline-block;
    height: 22px;
    min-width: 20px;
    // max-width: 100px;
    // background: #efeeee;
    border: none;
    text-align: center;
    margin-right: 3px;
}
</style>