<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">商家名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入商家名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">品牌名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.brandName" placeholder="请输入品牌名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">开启时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.minApproveTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.maxApproveTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">审核状态：</div>
                <div class="flex-wrap-cont">
                    <el-select v-model="queryParams.auditStatus" style="width: 100%">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="审核不通过" value="2"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onQuery()">搜索</el-button>
                    <el-button type="primary" class="ml20" @click="onReset()">重置</el-button>
                </div>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :isAction="true" :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">
                <template slot="action" slot-scope="scope">
                    <el-button v-if="scope.data.row.auditStatus == 0 || scope.data.row.auditStatus == 3" class="orangeBtn" @click="showDrawer(scope.data.row, 'review')">审核</el-button>
                    <el-button v-else class="orangeBtn" @click="showDrawer(scope.data.row, 'watch')">查看</el-button>
                </template>
            </basicTable>
        </div>
        <el-drawer
            class="brand-drawer"
            title="我是标题"
            :visible.sync="drawerShow"
            direction="rtl"
            size='580px'>
            <el-form ref="suggest" :rules="rules" :model="suggest" class="suggest" label-width="100px">
                <el-form-item label="供应商：" class="mb5">
                    {{drawerMsg.title}}
                </el-form-item>
                <el-form-item label="品牌名称：" class="mb5">
                    {{drawerMsg.title}}
                </el-form-item>
                <el-form-item label="到期日：" class="mb5">
                    {{drawerMsg.title}}
                </el-form-item>
                <el-form-item label="代理证书：" class="mb5">
                    <div class="proxyCert">
                        <template v-for="(item, index) in drawerMsg.certificatePoList">
                            <a :href="item.pictureUrl" target="_blank" :key="index">
                                <img :src="item.pictureUrl" alt="">
                            </a>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="关联类目：" class="mb5">
                    <div class="category-box">
                        <div class="category-item">
                            <div class="category-item-title">一级类目</div>
                            <ul class="category-item-ul">
                                <li :class="item.selected ? 'selected' : ''" v-for="(item, index) in categoryFirst" :key="item.key" @click="onFirst(item, index)" class="category-item-li">
                                    <span class="category-item-span">{{item.value}}</span>
                                    <i class="iconfont icon-hosjoy_right"></i>
                                </li>
                            </ul>
                        </div>
                        <div class="category-item">
                            <div class="category-item-title">二级类目</div>
                            <ul class="category-item-ul">
                                <li :class="item.selected ? 'selected' : ''" v-for="(item, index) in categorySecond" :key="item.key" @click="onSecond(item, index)" class="category-item-li">
                                    <span class="category-item-span">{{item.value}}</span>
                                    <i class="iconfont icon-hosjoy_right"></i>
                                </li>
                            </ul>
                        </div>
                        <div class="category-item">
                            <div class="category-item-title">三级类目</div>
                            <ul class="category-item-ul">
                                <li :class="item.selected ? 'selected' : ''" v-for="item in categoryThird" :key="item.key" class="category-item-li">
                                    <span class="category-item-span">{{item.value}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="售卖区域：" class="mb5">
                    <el-cascader
                    v-model="cascader"
                    @change="cascaderChange"
                    @expand-change="expandChange"
    :options="options"
    :props="props"
    clearable></el-cascader>
                    {{drawerMsg.title}}
                </el-form-item>                <p class="audit-opinion">审核意见</p>
                <!-- <template v-if="drawerMsg.type === 'review'"> -->
                    <el-form-item label="审核结果：" prop="auditResult">
                        <el-radio v-model="suggest.auditResult" label="1">审核通过</el-radio>
                        <el-radio v-model="suggest.auditResult" label="2">审核不通过</el-radio>
                    </el-form-item>
                    <el-form-item label="备注原因：">
                        <el-input type="textarea" v-model="suggest.auditRemark" rows="3" maxlength="50"></el-input>
                    </el-form-item>
                <!-- </template> -->
                <!-- <template v-else> -->
                    <el-form-item label="审核结果：" class="mb5">
                        {{drawerMsg.brandName}}
                    </el-form-item>
                    <el-form-item label="备注原因：" class="mb5">
                        {{drawerMsg.remark}}
                    </el-form-item>
                <!-- </template> -->
            </el-form>
            <div class="drawer-bottom">
                <el-button name="white-color" @click="onCancel">{{ drawerMsg.type === 'review' ? '取消' : '关闭' }}</el-button>
                <el-button name="hosjoy-color" @click="onConfirm"  v-if="drawerMsg.type === 'review'">提交</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { auditBrandArea } from './api/index'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'brandAudit',
    data () {
        return {
            cascader: [],
            props: {
                multiple: true,
                emitPath: false
            },
            options: [{
                value: 1,
                label: '东南',
                children: [{
                    value: 2,
                    label: '上海',
                    children: [
                        { value: 3, label: '普陀' },
                        { value: 4, label: '黄埔' },
                        { value: 5, label: '徐汇' }
                    ]
                }, {
                    value: 7,
                    label: '江苏',
                    children: [
                        { value: 8, label: '南京' },
                        { value: 9, label: '苏州' },
                        { value: 10, label: '无锡' }
                    ]
                }, {
                    value: 12,
                    label: '浙江',
                    children: [
                        { value: 13, label: '杭州' },
                        { value: 14, label: '宁波' },
                        { value: 15, label: '嘉兴' }
                    ]
                }]
            }, {
                value: 17,
                label: '西北',
                children: [{
                    value: 18,
                    label: '陕西',
                    children: [
                        { value: 19, label: '西安' },
                        { value: 20, label: '延安' }
                    ]
                }, {
                    value: 21,
                    label: '新疆维吾尔族自治区',
                    children: [
                        { value: 22, label: '乌鲁木齐' },
                        { value: 23, label: '克拉玛依' }
                    ]
                }]
            }],
            tableLabel: [
                { label: '商家名称', prop: 'merchantName' },
                { label: '品牌名称', prop: 'brandName' },
                { label: '审核状态', prop: 'auditStatusTransform' },
                { label: '申请时间', prop: 'approveTime' }
            ],
            tableData: [],
            initParams: {},
            searchParams: {},
            queryParams: {
                merchantName: '',
                brandName: '',
                auditStatus: '',
                minApproveTime: '',
                maxApproveTime: ''
            },
            paginationData: {
                pageNumber: 1,
                pageSize: 10
            },
            drawerShow: false,
            drawerMsg: {
                title: '',
                type: ''
            },
            categoryFirst: [
                {
                    key: '1',
                    value: '类目一sdasdasd',
                    selected: false
                },
                {
                    key: '2',
                    value: '类目二'
                }
            ],
            categorySecond: [],
            categoryThird: [],
            suggest: {
                auditResult: '',
                auditRemark: ''
            },
            rules: {
                auditResult: [
                    { required: true, message: '审核结果不能为空！' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapState('brand', {
            brandAuthorizationInfo: 'brandAuthorizationInfo',
            brandAreaInfo: 'brandAreaInfo'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.queryParams.maxApproveTime
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams.minApproveTime)
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        }
    },
    methods: {
        cascaderChange (value) {
            console.log(this.cascader)
            console.log(value)
        },
        expandChange (value) {
            console.log(value)
        },
        ...mapActions('brand', [
            'findBrandAreaList',
            'findBrandArea'
        ]),
        onQuery () {
            const { ...params } = { ...this.queryParams }
            this.searchParams = params
            this.search()
        },
        onReset () {
            this.queryParams = this.initParams
            this.paginationData = {
                pageNumber: 1,
                pageSize: 10
            }
            this.onQuery()
        },
        async search () {
            const searchParams = {
                ...this.searchParams,
                ...this.paginationData
            }
            await this.findBrandAreaList({ params: searchParams })
            this.tableData = this.brandAuthorizationInfo.records
            this.paginationData = {
                pageNumber: this.brandAuthorizationInfo.current,
                pageSize: this.brandAuthorizationInfo.size,
                total: this.brandAuthorizationInfo.total
            }
        },
        async showDrawer (scope, type) {
            await this.findBrandArea({ id: scope.id })
            this.drawerMsg = this.brandAreaInfo
            this.suggest = {}
            if (type === 'review') {
                this.drawerMsg.title = '品牌区域审核'
                this.drawerMsg.type = type
            } else if (type === 'watch') {
                this.drawerMsg.title = '查看品牌区域'
                this.drawerMsg.type = type
            }
            this.drawerShow = true
            this.$nextTick(() => {
                this.$refs['suggest'].clearValidate()
            })
        },
        onSizeChange (val) {
            this.paginationData.pageSize = val
            this.search()
        },
        onCurrentChange (val) {
            const { ...page } = val
            this.paginationData = page
            this.search()
        },
        createCouponReview () {
            this.auditBrandArea()
        },
        handleClose () {
            this.drawerShow = false
        },
        onFirst (item, index) {
            this.categoryFirst.map(item => {
                item.selected = false
            })
            this.categoryFirst[index].selected = true
            this.categorySecond = []
            this.categoryThird = []
            for (let i = 0; i < 3; i++) {
                this.categorySecond.push({
                    key: `${index + 1}${i + 1}`,
                    value: `${index + 1}的子类目${i + 1}`,
                    selected: false
                })
            }
        },
        onSecond (item, index) {
            this.categorySecond.map(item => {
                item.selected = false
            })
            this.categorySecond[index].selected = true
            this.categoryThird = []
            for (let i = 0; i < 3; i++) {
                this.categoryThird.push({
                    key: `${index + 1}${i + 1}`,
                    value: `${index + 1}的子子类目${i + 1}`,
                    selected: false
                })
            }
        },
        onConfirm () {
            this.auditBrandArea()
        },
        onCancel () {
            this.drawerShow = false
            // this.$refs['suggest'].resetForm()
        },
        async auditBrandArea () {
            this.$refs['suggest'].validate(async (valid) => {
                if (valid) {
                    const form = {
                        updateBy: this.userInfo.employeeName,
                        auditStatus: +this.suggest.auditResult,
                        id: this.drawerMsg.id,
                        remark: this.suggest.auditRemark
                    }
                    if (!this.drawerMsg.brandAreaPoList) this.drawerMsg.brandAreaPoList = []
                    if (this.drawerMsg.brandAreaPoList.length === 0) {
                        this.$message({ message: '代理区域不能为空', type: 'error' })
                        return
                    }
                    await auditBrandArea(form)
                    this.drawer.show = false
                    this.onQuery()
                } else {
                    return false
                }
            })
        }
    },
    mounted () {
        this.initParams = this.queryParams
        this.onQuery()
    }
}
</script>

<style lang='scss' scoped>
.proxyCert {
    display: flex;
    img {
        display: block;
        width: 80px;
        height: 80px;
    }
}
.remark {
    padding-top: 20px;
}
.mb5 {
    margin-bottom: 5px;
}
.brand-drawer {
    color: #000000;
    /deep/ .el-form-item__label {
        color: #000000;
    }
    /deep/ .el-drawer__header {
        color: #000000;
        padding: 20px 24px;
        margin-bottom: 0;
        border-bottom: 1px solid #e5e5ea;
    }
}
.category-box {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
    .category-item {
        width: 30%;
        .category-item-title {
            margin-bottom: 5px;
        }
        .category-item-ul {
            padding: 8px 0;
            height: 180px;
            overflow: overlay;
            border: 1px solid rgba(229, 229, 234, 1);
        }
        .category-item-li {
            padding: 0 20px;
            height: 36px;
            line-height: 36px;
            color: #666;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .category-item-span {
                float: left;
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .category-item-i {
                float: right;
                font-size: 9px;
            }
            &:hover {
                color: #000;
                background: rgba(242, 242, 244, 1);
            }
            &.selected {
                color: #000;
                background: rgba(242, 242, 244, 1);
            }
        }
        .icon-hosjoy_right {
            width: 7px;
            height: 7px;
            border-top: 2px solid rgb(66, 65, 65);
            border-right: 2px solid rgb(66, 65, 65);
            transform: rotate(45deg);
        }
    }
}
.audit-opinion {
    margin-top: 10px;
}
.drawer-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 12px 24px;
    border-top: 1px solid #E5E5EA;
    text-align: right;
}
</style>
