<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <!-- contractSignType: 2线下  1线上 -->
            <div class="ctilte"><span>合同详情</span>
                <div type="primary" class="btn-right"
                v-if="res.contractStatus=='12'&&res.contractSignType==1"><a :href="res.contractUrl" target="_blank">下载合同</a></div>
            </div>
            <div v-html="vHtml" v-if="vHtml" class='approvalcontract-content-layout-css'>
            </div>
            <div v-else-if="res.contractSignType==2">线下合同</div>
            <div v-else>暂无数据</div>
            <div class="contract-fujian" v-if="res.attachementList&&res.attachementList.length>0&&res.contractSignType==2">
                <font>上传的合同附件：</font>
                <div>
                    <p v-for="(item,index) in res.attachementList" :key="index"><a :href="item.picUrl" target="_blank">{{item.picName}}</a></p>
                </div>
            </div>
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
            vHtml: '',
            res: ''
        }
    },
    methods: {
        init () {
            this.$nextTick(() => {
                let inputDomList = document.getElementsByClassName('approvalcontract-content-layout-css')[0].getElementsByTagName('input')
                console.log('inputDomList: ', inputDomList)
                Array.from(inputDomList).map((item, index) => {
                    item.outerHTML = `<span class="${item.className}" contenteditable="false" style="display:inline;word-break: break-all;">${item.value}</span>`
                })
            })
        },
        unescapeHTM (a) {
            a = '' + a
            return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
        }
    },
    async mounted () {
        const { data } = await getContractsContent({ contractId: this.$route.query.id })
        this.res = data
        this.vHtml = data.contractContent
        if (this.vHtml) {
            this.vHtml = this.unescapeHTM(this.vHtml)
            this.init()
        }
    }/* ,
    async activated () {
        const { data } = await getContractsContent({ contractId: this.$route.query.id })
        this.res = data
        this.vHtml = data.contractContent
        if (this.vHtml) {
            this.init()
        }
    } */
}
</script>
<style scoped lang="scss">
.approvalcontract-content-layout-css{
    width: 1000px;
    margin:0 auto
}
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
    background: #ff7a45;

    border-radius: 10px;
    width: 150px;
    a{
        color: #ffffff;
    }
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
.contract-fujian{
    margin-top: 20px;
    display: flex;
    p{
        margin-bottom: 5px;
        a{
            color: #ff7a45;
        }
    }
}
</style>