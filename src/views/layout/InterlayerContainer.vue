<template>
    <keep-alive :include="cachedInclude" :exclude="cachedExclude">
        <router-view  v-if="isRouterAlive"></router-view>
    </keep-alive>
    <!-- <keep-alive :include="cachedInclude" :exclude="cachedExclude">
        <router-view></router-view>
    </keep-alive> -->
</template>

<script>
import { mapState } from 'vuex'
import { clearCache } from '@/utils'
export default {
    name: 'interlayerContainer',
    provide () {
        return {
            reload: this.reload
        }
    },
    data () {
        return {
            isRouterAlive: true
        }
    },
    computed: {
        ...mapState({
            cachedInclude: state => state.cachedInclude,
            cachedExclude: state => state.cachedExclude
        })
    },
    methods: {
        reload (name) {
            name && clearCache(name)
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        }
    }
}
</script>

<style>
</style>
