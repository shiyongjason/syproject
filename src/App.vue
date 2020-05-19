<template>
    <div id="app" v-watermark="$store.state.userInfo.employeeName">
        <router-view/>
    </div>
</template>

<style lang="scss">
#app {
    font-family: "Microsoft YaHei", "PingFang SC";
    font-size: 14px;
    color: #000000;
    font-weight:400;
}
.el-popper[x-placement^=bottom]{
    margin-top: 0 !important;
}
.el-autocomplete-suggestion{
    margin-top: 0 !important;
}
</style>
