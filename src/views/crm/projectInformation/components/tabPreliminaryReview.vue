<template>
    <div class="preliminaryreview">
        <div class="preliminaryreview-col" style="margin-top:0">
            <h2 class="preliminaryreview-title">经销商</h2>
            <p>江苏舒适云信息技术有限公司</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">所属分部</h2>
            <p>南京分部</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">工程项目名称</h2>
            <p>华远华时代（长沙）项目C塔家电采购招标</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">项目地址</h2>
            <p>长沙市开福区芙蓉中路与德雅路交汇处东南角</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">甲方名称</h2>
            <p>长沙隆熙致远房地产开发有限公司</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">项目类别</h2>
            <p>地产项目</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">工程项目进度</h2>
            <p>招投标</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">项目合同总额</h2>
            <p><b>¥</b>2,000,000.00</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">设备总额</h2>
            <p><b>¥</b>2,000,000.00</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">设备品类</h2>
            <p>其他</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">设备品牌</h2>
            <p>海信/万和</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">上游供应商类型</h2>
            <p>厂商</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">上游供应商名称</h2>
            <p>青岛海信电器营销股份有限公司/广东万和电气股份有限公司</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">上游接受付款方式</h2>
            <p>承兑</p>
            <p>承兑描述：</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">上游接受付款周期</h2>
            <p>6个月</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">预估赊销金额</h2>
            <p><b>¥</b>2,000,000.00</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">预估赊销周期</h2>
            <p>6个月</p>
        </div>
        <div class="preliminaryreview-col">
            <h2 class="preliminaryreview-title">工程项目回款方式</h2>
            <p class="preliminaryreview-p"><span>预付款比例</span>10%</p>
            <p class="preliminaryreview-p"><span>货到付款比例</span>10%</p>
            <p class="preliminaryreview-p"><span>安装进度款比例</span>10%</p>
            <p class="preliminaryreview-p"><span>验收款比例</span>10%</p>
            <p class="preliminaryreview-p"><span>交付款比例</span>10%</p>
            <p class="preliminaryreview-p"><span>审计结算款比例</span>10%</p>
            <p class="preliminaryreview-p"><span>其他</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
        </div>
        <div class="preliminaryreview-annex">
            <h2 class="preliminaryreview-title">附件</h2>
            <div class="preliminaryreview-annex-annexs">
                <el-image style="width: 80px; height: 80px;margin-right:8px" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" :preview-src-list="srcList" />
                <el-image style="width: 80px; height: 80px;margin-right:8px" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" :preview-src-list="srcList" />
                <el-image style="width: 80px; height: 80px;margin-right:8px" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" :preview-src-list="srcList" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tabPreliminaryReview',
    data () {
        return {
            srcList: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ]
        }
    },
    methods: {

    },
    mounted () {
        console.log('tabPreliminaryReview')
    }
}
</script>

<style scoped lang='scss'>
.preliminaryreview {
    &-annex {
        margin-top: 20px;
        margin-bottom: 30px;
        &-annexs {
            margin-top: 10px;
        }
    }
    &-col {
        margin-top: 20px;
        h2 {
            color: #333;
        }
        p {
            color: #333;
            font-size: 14px;
            b {
                font-size: 18px;
                margin-right: 6px;
            }
            span {
                display: inline-block;
                width: 200px;
            }
        }
    }
    &-title {
        font-size: 15px;
        margin-bottom: 6px;
    }
    &-p {
        margin-top: 10px;
    }
}
</style>