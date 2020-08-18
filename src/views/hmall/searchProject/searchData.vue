<template>
    <div class="page-body">
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" isShowIndex>
                <template slot="action" slot-scope="scope">
                    <h-button table></h-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'searchDataList',
    data () {
        return {
            tableLabel: [
                { label: '会员名称', value: '' },
                { label: '会员账号', value: '' },
                { label: '搜索词', value: '' },
                { label: '时间', value: '' },
                { label: '点击商品次数', value: '' },
                { label: '点击商品个数', value: '' }
            ],
            tableData: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo.principal
        })
    },
    methods: {
        init () {

        },
        ...mapActions([

        ])
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="scss" scoped>
</style>
