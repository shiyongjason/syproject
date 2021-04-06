<template>
    <div class="B2b">
        <div class="page-body-cont" v-if="!showBI">
            <div class="list-wrapper">
                <div v-for="item in biList" :key="item.id" @click="onShowBI(item.id)" class="bi-card">
                    <div class="card-info">{{item.name}}</div>
                </div>
            </div>
        </div>
        <div v-if="biToken && showBI">
            <div class="back-menu hidden-sm-and-up" @click="onBackMenu">返回菜单</div>
            <div class="hidden-height hidden-sm-and-up"></div>
            <iframe :src="biUrl" frameborder="0" style="width: 100%; height: 100vh"></iframe>
        </div>
    </div>
</template>
<script>

import { findBiToken } from '../api'
export default {
    name: 'businessBI',
    data () {
        return {
            biToken: '',
            biList: [],
            pageId: '',
            showBI: false
        }
    },
    computed: {
        biUrl () {
            return `https://bi.aliyuncs.com/token3rd/dashboard/view/pc.htm?pageId=${this.pageId}&accessToken=${this.biToken}`
        }
    },
    methods: {
        onShowBI (id) {
            this.pageId = id
            this.showBI = true
        },
        onBackMenu () {
            this.showBI = false
        }
    },
    async mounted () {
        const authResourceKeys = sessionStorage.getItem('authResourceKeys')
        console.log(sessionStorage.getItem('authResourceKeys'))
        this.biList = authResourceKeys ? authResourceKeys.split(',').filter(item => item.indexOf('舒适云BI') != -1).map(item => {
            const arr = item.split('_')
            return {
                name: arr[1],
                id: arr[2]
            }
        }) : []
        console.log(this.biList, 'yaowenyaowenyaowen')
        // this.biList = [{name: '测试Bi测试Bi测试Bi测试Bi测试Bi测试Bi', id: '82f46847-4181-4804-8411-6112b5bb8f7d'}]
        const { data } = await findBiToken()
        this.biToken = data.data
    }
}
</script>
<style lang="scss" scoped>
.list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
}
.bi-card {
    position: relative;
    padding: 10px;
    margin-bottom: 10px;
    width: 200px;
    height: 200px;
    text-align: center;
    font-size: 18px;
    border: 1px solid #ccc;
    color: #fff;
    background-color: #ff7a45;
}
.card-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.back-menu {
    position: fixed;
    top: 50px;
    height: 50px;
    width: 100%;
    line-height: 50px;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
}
.hidden-height {
    margin-bottom: 50px;
}
</style>
