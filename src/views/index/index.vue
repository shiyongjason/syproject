<template>
    <div class="page-body">
        <div class="page-body-cont">
            <div class="hos-box">
                <section>
                    <div class="jinyun"><i class="iconfont hosjoy_cloud_service"></i><span>金云平台</span></div>
                </section>
                <section>
                    <div class="oldsys" @click="onClikUrl('oldsys')"><i class="iconfont hosjoy_goods"></i><span>老系统</span></div>
                </section>
                <section>
                    <div class="other"><i class="iconfont hosjoy_stay_online"></i><span>待上线</span></div>
                </section>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    },
    methods: {
        onClikUrl (type) {
            if (type == 'oldsys') {
                window.location.href = 'https://boss.hosjoy.com/default.html#/index/'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.hos-box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    section {
        flex-grow: 1;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
}
.jinyun {
    margin: 0 auto;
    width: 230px;
    height: 230px;
    background: url(../../assets/images/icon_bg1@2x.png) center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    i{
       font-size: 100px;
       color: #ffffff;
    }
    span {
        display: block;
        font-size: 24px;
        color: #ffffff;
    }
}
.oldsys {
    margin: 0 auto;
    width: 230px;
    height: 230px;
    background: url(../../assets/images/icon_bg2@2x.png) center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    i{
       font-size: 100px;
       color: #ffffff;
    }
    span {
        display: block;
        font-size: 24px;
        color: #ffffff;
    }
}
.other {
    margin: 0 auto;
    width: 230px;
    height: 230px;
    background: url(../../assets/images/icon_bg3@2x.png) center center;
    background-size: cover;
     display: flex;
    flex-direction: column;
    justify-content: center;
    i{
       font-size: 100px;
       color: #ffffff;
    }
    span {
        display: block;
         font-size: 24px;
        color: #ffffff;
    }
}
</style>
