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
            :title="drawerMsg.title"
            :visible.sync="drawerShow"
            direction="rtl"
            size='580px'>
            <el-form ref="suggest" :rules="rules" :model="suggest" class="suggest" label-width="100px">
                <el-form-item label="供应商：" class="mb-5">
                    {{drawerMsg.title}}
                </el-form-item>
                <el-form-item label="品牌名称：" class="mb-5">
                    {{drawerMsg.title}}
                </el-form-item>
                <el-form-item label="到期日：" class="mb-5">
                    {{drawerMsg.title}}
                </el-form-item>
                <el-form-item label="代理证书：" class="mb-5">
                    <div class="proxyCert">
                        <template v-for="(item, index) in drawerMsg.certificatePoList">
                            <a :href="item.pictureUrl" target="_blank" :key="index">
                                <img :src="item.pictureUrl" alt="">
                            </a>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="关联类目：" class="mb-5">
                    <div>
                        <span class="category-tip">一级类目</span>
                        <span class="category-tip">二级类目</span>
                        <span class="category-tip">三级类目</span>
                    </div>
                    <el-cascader-panel
                        v-model="cascaderPanel"
                        @change="cascaderPanelChange"
                        :options="options"
                        :props="props">
                    </el-cascader-panel>
                </el-form-item>
                <el-form-item label="售卖区域：" class="mb-5">
                    {{this.cascaderPanel.join(";")}}
                    <!-- <el-cascader
                        v-model="cascader"
                        @change="cascaderChange"
                        :options="options"
                        :props="props"
                        clearable>
                    </el-cascader> -->
                </el-form-item>
                <p class="audit-opinion">审核意见</p>
                <template v-if="drawerMsg.type === 'review'">
                    <el-form-item label="审核结果：" prop="auditResult" >
                        <el-radio v-model="suggest.auditResult" label="1">审核通过</el-radio>
                        <el-radio v-model="suggest.auditResult" label="2">审核不通过</el-radio>
                    </el-form-item>
                    <el-form-item label="备注原因：">
                        <el-input type="textarea" v-model="suggest.auditRemark" rows="3" maxlength="50"></el-input>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="审核结果：" class="mb-5">
                        {{drawerMsg.brandName}}
                    </el-form-item>
                    <el-form-item label="备注原因：" class="mb-5">
                        {{drawerMsg.brandName}}
                    </el-form-item>
                    <el-form-item label="审核人：" class="mb-5">
                        {{drawerMsg.brandName}}
                    </el-form-item>
                    <el-form-item label="审核时间：" class="mb-5">
                        {{drawerMsg.brandName}}
                    </el-form-item>
                </template>
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
            cascaderPanel: ['江苏省', '安徽省淮南市'],
            props: {
                emitPath: false
            },
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                    }, {
                        value: 'color',
                        label: 'Color 色彩'
                    }, {
                        value: 'typography',
                        label: 'Typography 字体'
                    }, {
                        value: 'icon',
                        label: 'Icon 图标'
                    }, {
                        value: 'button',
                        label: 'Button 按钮'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                    }, {
                        value: 'input',
                        label: 'Input 输入框'
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                    }, {
                        value: 'select',
                        label: 'Select 选择器'
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                    }, {
                        value: 'switch',
                        label: 'Switch 开关'
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                    }, {
                        value: 'upload',
                        label: 'Upload 上传'
                    }, {
                        value: 'rate',
                        label: 'Rate 评分'
                    }, {
                        value: 'form',
                        label: 'Form 表单'
                    }]
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格'
                    }, {
                        value: 'tag',
                        label: 'Tag 标签'
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                    }, {
                        value: 'badge',
                        label: 'Badge 标记'
                    }]
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                    }, {
                        value: 'loading',
                        label: 'Loading 加载'
                    }, {
                        value: 'message',
                        label: 'Message 消息提示'
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                    }, {
                        value: 'notification',
                        label: 'Notification 通知'
                    }]
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                    }]
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                    }, {
                        value: 'card',
                        label: 'Card 卡片'
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                    }]
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
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
        cascaderPanelChange () {

        },
        async showDrawer (scope, type) {
            await this.findBrandArea({ id: scope.id })
            this.drawerMsg = this.brandAreaInfo
            this.suggest = {}
            if (type === 'review') {
                this.drawerMsg.title = '品牌资质审核'
                this.drawerMsg.type = 'watch'
            } else if (type === 'watch') {
                this.drawerMsg.title = '品牌资质查看'
                this.drawerMsg.type = 'review'
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
        onConfirm () {
            this.auditBrandArea()
        },
        onCancel () {
            this.drawerShow = false
            this.$refs['suggest'].resetForm()
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
                    this.drawerShow = false
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
.mb-5 {
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
    /deep/ .el-cascader-menu {
        min-width: 160px;
    }
    .category-tip {
        box-sizing: border-box;
        display: inline-block;
        width: 160px;
        padding-left: 5px;
    }
}
.audit-opinion {
    margin-top: 10px;
    padding-left: 5px;
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
