<template>
    <div>
        <iframe :src="biUrl" frameborder="0" style="width: 100%; height: 100vh"></iframe>
    </div>
</template>

<script>
import { findBiToken } from './api'
export default {
    name: 'crm_bi',
    data () {
        return {
            biToken: ''
        }
    },
    computed: {
        biUrl () {
            return `https://bi.aliyuncs.com/token3rd/dashboard/view/pc.htm?pageId=82f46847-4181-4804-8411-6112b5bb8f7d&accessToken=${this.biToken}`
        }
    },
    async mounted () {
        const { data } = await findBiToken()
        this.biToken = data.data
    }
}
</script>
