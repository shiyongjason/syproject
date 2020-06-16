<template>
    <keep-alive :include="cachedInclude" :exclude="cachedExclude">
        <router-view></router-view>
    </keep-alive>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            cachedInclude: state => state.cachedInclude,
            cachedExclude: state => state.cachedExclude
        })
    }
}
</script>

<style>
</style>
