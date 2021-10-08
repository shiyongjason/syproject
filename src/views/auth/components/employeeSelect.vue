<template>
    <el-select class="change-style" v-bind="$attrs" placeholder="请输入员工姓名检索" v-on="$listeners" multiple filterable remote clearable reserve-keyword :remote-method="remotePostPeoMethod" :loading="loading">
        <el-option v-for="item in option" :key="item.psncode" :label="item.psnname" :value="item.psncode"></el-option>
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
        // 是否回显
        postCode: {
            type: String,
            default: ''
        }
    },
    watch: {
        postCode: {
            handler (o) {
                o && this.getSelectionData(o)
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
        },
        async getSelectionData (val) {
            this.loading = true
            const { data } = await Api.postConfiguration(val)
            if (data && data.length > 0) {
                this.option = data.map(val => {
                    return {
                        psncode: val.jobNumber,
                        psnname: val.userName
                    }
                })
            }
            this.loading = false
        }
    }
}
</script>

<style lang="scss">
.change-style .el-input:not(:first-child) {
    margin-left: 0px;
}
</style>