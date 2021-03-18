<template>
  <div class="upstreamPaymentManagement">
        upstreamPaymentManagement
        {{me.name}}
  </div>
</template>

<script lang='ts'>

import { Vue, Component, Prop, Provide, Inject } from 'vue-property-decorator'
import { deepCopy } from '@/utils/utils'

interface H {
    a?:string,
    b?:number
}
type Person = {
    name: string,
    age: number,
    like: string
}

type Man = Partial<Person>

@Component({
    name: 'UpstreamPaymentManagement'
})
export default class UpstreamPaymentManagement extends Vue {
    form: H = {
        a: 'sun',
        b: 30
    }

    me:Man={
        name: 'sunjun'
    }

    func () {
        // console.log(this.form.?a)
    }

    mounted () {
        // console.log(this.me.name)
        // console.log(this.form.c)
        const obj = {
            foo: {
                bar: {
                    baz: 42
                }
            }
        }

        const a = obj?.a // undefined, 如果没有"?"可就报错喽
        console.log('a: ', a)
        // 等价于
        // const a = (obj === null || undefined === obj) ? undefined : obj.a
        const baz = obj?.foo?.bar?.baz // 42
        console.log('baz: ', baz)
    }
}
</script>

<style lang='scss' scoped>
.upstreamPaymentManagement{
    //
}
</style>