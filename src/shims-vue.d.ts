import Vue from 'vue'
import { Route, VueRouter } from 'vue-router/types/router'
declare module '*.vue' {

    export default Vue
}
// 在 types/vue.d.ts 里 Vue 有构造函数类型
// https://cn.vuejs.org/v2/guide/typescript.html#%E5%A2%9E%E5%BC%BA%E7%B1%BB%E5%9E%8B%E4%BB%A5%E9%85%8D%E5%90%88%E6%8F%92%E4%BB%B6%E4%BD%BF%E7%94%A8
declare module 'vue/types/vue' {
    // 声明为 Vue 补充的东西
    interface Vue {
        /** 精确加法 */
        $plus: Function,
        /** 精确减法 */
        $minus: Function,
        /** 精确除法 */
        $dividedBy: Function,
        /** 精确乘法 */
        $multipliedBy: Function,
        $router: VueRouter,
        $route: Route,
        /** 鉴权 */
        hosAuthCheck: Function
    }
}