<template>
    <el-select class="change-style" v-bind="$attrs" placeholder="请输入员工姓名检索" v-on="$listeners" multiple filterable remote clearable reserve-keyword :remote-method="remotePostPeoMethod" :loading="loading">
        <el-option v-for="item in option" :key="item.psncode" :label="item.psnname" :value="item.psncode">
            <span style="float: left">{{ item.psnname }}</span>
            <span style="float: right;color: #8492a6; font-size: 12px;">{{ item.mobile || '' }}</span>
        </el-option>
    </el-select>
</template>

<script>
import * as Api from '../api'
export default {
    data () {
        return {
            loading: false,
            option: []
        }
    },
    props: {
        // 修改岗位管理员-回显option
        postOptions: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        postOptions: {
            handler (o) {
                console.log(o)
                if (o && o.length > 0) {
                    this.option = o
                }
            },
            immediate: true
        }
    },
    methods: {
        async remotePostPeoMethod (val) {
            if (val !== '') {
                this.loading = true
                const { data } = await Api.getEmployeeInfo(val)
                this.option = data
                this.loading = false
            } else {
                this.option = []
            }
        }
    }
}
</script>

<style lang="scss">
.change-style .el-input:not(:first-child) {
    margin-left: 0px;
}
</style>