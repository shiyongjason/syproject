<template>
    <div class="page-body">
        <div class="index h-content">
            <div class="tree">
                <h2 class="h-h2">机构</h2>
                <el-tree :data="treeList" :props="defaultProps" @node-click="handleNodeClick" ref="tree" :expand-on-click-node="false"
                         :default-expanded-keys="['']" node-key="id" :highlight-current="true"></el-tree>
            </div>
            <div class="table">
                <h2 class="h-h2">人员/账号</h2>
                <div class="demo-input-suffix">
                    <el-input
                        placeholder="请输入工号/姓名/登录名进行检索"
                        v-model="queryParams.keyWord" class="keywords" @keyup.enter.native="findOrganizationEmployee">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <el-button type="primary" v-if="true" @click="findOrganizationEmployee">搜索</el-button>
                </div>
                <div class="result">
                    <OrganizationTable :tableData="tableData" :paginationData="paginationData"></OrganizationTable>
                    <div>
                        <Pagination :paginationData="paginationData" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></Pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OrganizationTable from './components/organizationTable'
import Pagination from '@/components/pagination/HPagination'
import { mapState } from 'vuex'
import { findBOSSOrganization, findOrganizationEmployee } from './api'

export default {
    name: 'index',
    components: {
        OrganizationTable,
        Pagination
    },
    computed: {
        ...mapState({
            menuList: state => state.menuList
        })
    },
    data () {
        return {
            treeList: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            queryParams: {
                pageSize: 10,
                pageNum: 1,
                keyWord: '',
                pkDeptdoc: '' // 公司主键
            },
            paginationData: {},
            tableData: [],
            lastTime: null,
            timeout: null
        }
    },
    methods: {
        makeTreeList (data) {
            let subTemp = []
            if (data.childNodeList && data.childNodeList.length) {
                data.childNodeList.forEach(value => {
                    subTemp.push(this.makeTreeList(value))
                })
            }

            return {
                label: data.deptname,
                id: data.pkDeptdoc,
                children: subTemp
            }
        },
        handleNodeClick (data) {
            this.queryParams.pkDeptdoc = data.id
            this.debounce(this.findOrganizationEmployee, 500)()
        },
        async findBOSSOrganization () {
            const { data } = await findBOSSOrganization()
            let treeList = []
            data.departmentNodeVOS.forEach(value => {
                treeList.push(this.makeTreeList(value))
            })
            this.treeList = [{ label: '好享家', id: '', children: treeList }]
            this.$nextTick(function () {
                this.$refs.tree.setCurrentKey({ id: '' })
            })
        },
        async findOrganizationEmployee () {
            const { ...params } = this.queryParams
            const { data } = await findOrganizationEmployee(params)
            this.tableData = data.records
            this.paginationData = {
                pageNum: data.current,
                pageSize: data.size,
                totalElements: data.total
            }
        },
        onSizeChange (val) {
            this.queryParams.pageSize = val
            this.findOrganizationEmployee()
        },
        onCurrentChange (val) {
            this.queryParams.pageNum = val
            this.findOrganizationEmployee()
        },
        debounce (func, wait) {
            let _this = this
            return function () {
                let now = new Date()
                if (now - _this.lastTime - wait > 0) {
                    _this.timeout = setTimeout(() => {
                        func.apply(_this, arguments)
                    }, wait)
                } else {
                    if (_this.timeout) {
                        clearTimeout(_this.timeout)
                        _this.timeout = null
                    }
                    _this.timeout = setTimeout(() => {
                        func.apply(_this, arguments)
                    }, wait)
                }

                _this.lastTime = now
            }
        }
    },
    mounted () {
        this.findBOSSOrganization()
        this.findOrganizationEmployee()
        // console.log(this.$route)
    }
}
</script>

<style scoped lang="scss">
    .index {
        overflow: hidden;
        .tree {
            width: 220px;
            padding-right: 24px;
            float: left;

        }
        .table{
            /*width: 810px;*/
            margin-left: 244px;
            padding-left: 24px;
            box-sizing: border-box;
            border-left: 1px solid #E5E5EA;
            h2{
                text-indent: 20px;
            }
            .keywords{
                width: 406px;
                margin-right: 10px;
            }
        }
    }
</style>
