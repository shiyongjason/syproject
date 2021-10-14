<template>
    <div>
        <el-cascader placeholder="选择" v-model="optarr" :options="trees" :props="{ multiple: true,value:'organizationCode',label:'organizationName',children:'childOrganizations'}" :collapse-tags=true @change="handleChange" clearable filterable></el-cascader>
    </div>
</template>
<script>
import { findNewOrganizationTree } from '../api/index'
export default {
    name: 'regioncascader',
    props: {
        // authCode: {
        //     type: String,
        //     default: ''
        // }
    },
    data () {
        return {
            trees: [],
            optarr: '',
            jobNumber: JSON.parse(sessionStorage.getItem('userInfo')).jobNumber,
            authCode: sessionStorage.getItem('authCode') ? JSON.parse(sessionStorage.getItem('authCode')) : ''
        }
    },
    methods: {
        async findTrees () {
            const { data } = await findNewOrganizationTree(1, this.jobNumber, this.authCode)
            this.trees = data.organizationNodeList
        },
        handleChange (val) {
            let _codeArr = []
            val.map(item => _codeArr.push(item[item.length - 1]))
            this.$emit('backEvent', _codeArr)
        },
        onBackRest () {
            this.optarr = ''
        }
    },
    mounted () {
        this.findTrees()
    }
}
</script>