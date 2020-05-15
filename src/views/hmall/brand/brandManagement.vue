<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">供应商：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入供应商">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">品牌：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.brandName" placeholder="请输入品牌名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">商品类目：</div>
                <div class="query-col-input">
                    <el-cascader :options="categoryList" v-model="categoryIdArr" clearable @change="productCategoryChange">
                    </el-cascader>
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
            class="page-body-drawer brand-drawer"
            :title="drawerMsg.title"
            :visible.sync="drawerShow"
            direction="rtl"
            size='630px'>
            <el-form ref="editForm" :rules="rules" :model="editForm" class="editForm" label-width="100px">
                <el-form-item label="供应商：">
                    {{drawerMsg.title}}
                </el-form-item>
                <el-form-item label="品牌名称：">
                    {{drawerMsg.title}}
                </el-form-item>
                <el-form-item label="到期日：">
                    <el-date-picker v-model="editForm.expirationTime" type="date" value-format='yyyy-MM-dd' format="yyyy-MM-dd" placeholder="请选择到期日" @change="datePickerChange" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="代理证书：" ref="reqPictures" class="mb60">
                    <el-upload :action="uploadInfo.action" :data="uploadInfo.data" :name="uploadAttr.name" :list-type="uploadAttr.listType" :show-file-list="uploadAttr.showFileList" :on-success="handleSuccess" :accept="uploadAttr.accept" :before-upload="beforeUpload"
                        v-if="drawerMsg.certificatePoList.length !== 5">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div class="picture-content">
                        <ul>
                            <li v-for="(item, index) in drawerMsg.certificatePoList" :key="index">
                                <div class="mask"></div>
                                <div class="mask-btn">
                                    <span @click="onRemove(index)">删除图片</span>
                                </div>
                                <img :src="item.pictureUrl">
                            </li>
                        </ul>
                    </div>
                    <div class="picture-prompt">
                        <p>最多上传5张，750x750， 不超过2M，仅支持jpeg、jpg、png格式</p>
                    </div>
                </el-form-item>
                <!-- <el-form-item label="代理证书：">
                    <div class="proxyCert">
                        <template v-for="(item, index) in drawerMsg.certificatePoList">
                            <a :href="item.pictureUrl" target="_blank" :key="index">
                                <img :src="item.pictureUrl" alt="">
                            </a>
                        </template>
                    </div>
                </el-form-item> -->
                <el-form-item label="关联类目：">
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
                <el-form-item label="售卖区域：">
                    <el-cascader
                        v-model="cascader"
                        @change="cascaderChange"
                        :options="options"
                        :props="props"
                        collapse-tags
                        clearable>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="最近维护人：" label-width="120px" class="mb-5">
                    {{drawerMsg.title}}
                </el-form-item>
                <el-form-item label="最近维护时间：" label-width="120px" class="mb-5">
                    {{drawerMsg.title}}
                </el-form-item>
            </el-form>
            <div class="drawer-footer">
                <el-button name="white-color" @click="onCancel">取消</el-button>
                <el-button name="hosjoy-color" @click="onConfirm"  v-if="drawerMsg.type === 'review'">保存</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { auditBrandArea } from './api/index'
import { mapState, mapActions } from 'vuex'
import { fileUploadUrl } from '@/api/config'

export default {
    name: 'brandAudit',
    data () {
        return {
            uploadAttr: {
                name: 'multiFile',
                listType: 'picture-card',
                showFileList: false,
                limit: 5,
                dialogImageUrl: '',
                accept: 'image/jpeg, image/jpg, image/png'
            },
            categoryList: [{
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
            categoryIdArr: [],
            cascader: [],
            cascaderPanel: ['江苏省', '安徽省淮南市'],
            props: {
                multiple: true,
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
                { label: '供应商', prop: 'merchantName' },
                { label: '授权品牌', prop: 'brandName' },
                { label: '授权类目', prop: 'category' },
                { label: '到期日', prop: 'approveTime' },
                { label: '最近维护人', prop: 'auditStatusTransform' },
                { label: '最近维护时间', prop: 'brandName' }
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
                type: '',
                certificatePoList: []
            },
            editForm: {
                expirationTime: '',
                auditResult: '',
                auditRemark: '',
                certificatePoList: []
            },
            rules: {
                auditResult: [
                    { required: true, message: '审核结果不能为空！' }
                ]
            }
        }
    },
    computed: {
        uploadInfo () {
            return {
                action: fileUploadUrl + '/files/upload',
                data: {
                    updateUid: 'Hosjoy'
                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        },
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
        onRemove (index) {
            // this.form.reqSpuBo.reqPictureList.splice(index, 1)
        },
        handleSuccess (file, fileList) {
            // const imgObj = {
            //     isDefault: 0,
            //     pictureUrl: file.data.accessUrl,
            //     sort: ''
            // }
            // this.form.reqSpuBo.reqPictureList.push(imgObj)
        },
        beforeUpload (file) {
            if (this.uploadAttr.accept.indexOf(file.type) > -1) {

            } else {
                this.$message.error('上传文件格式不正确!')
                return false
            }
            const fileSize = file.size / 1024 / 1024 < 2
            if (!fileSize) {
                this.$message.error('上传图片大小不能超过 2MB!')
            }
            return fileSize
        },
        datePickerChange (value) {
            console.log(value)
        },
        productCategoryChange (val) {
            this.queryParams.categoryId = val[val.length - 1]
        },
        cascaderChange () {

        },
        cascaderPanelChange (val) {
            this.queryParams.categoryId = val
        },
        async showDrawer (scope, type) {
            await this.findBrandArea({ id: scope.id })
            this.drawerMsg = this.brandAreaInfo
            if (type === 'review') {
                this.drawerMsg.title = '品牌资质审核'
                this.drawerMsg.type = 'watch'
            } else if (type === 'watch') {
                this.drawerMsg.title = '品牌资质查看'
                this.drawerMsg.type = 'review'
            }
            this.drawerShow = true
            this.$nextTick(() => {
                this.$refs['editForm'].clearValidate()
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
            this.$refs['editForm'].resetForm()
        },
        async auditBrandArea () {
            this.$refs['editForm'].validate(async (valid) => {
                if (valid) {
                    const form = {
                        updateBy: this.userInfo.employeeName,
                        auditStatus: +this.editForm.auditResult,
                        id: this.drawerMsg.id,
                        remark: this.editForm.auditRemark
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
    box-sizing: border-box;
    color: #000000;
    /deep/ .el-form-item__label {
        color: #000000;
    }
    /deep/ .el-cascader-menu {
        min-width: 160px;
    }
    /deep/ .el-cascader-panel {
        width: 490px;
    }
    .category-tip {
        box-sizing: border-box;
        display: inline-block;
        width: 160px;
        padding-left: 5px;
    }
    .mask {
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 4px;
        background: #000;
        opacity: 0.65;
        z-index: -1;
    }
    .mask-btn {
        position: absolute;
        width: 78px;
        height: 78px;
        border-radius: 4px;
        z-index: -1;
        span {
            float: left;
            cursor: pointer;
            margin-left: 14px;
            padding: 0px 6px;
            height: 22px;
            line-height: 22px;
            color: #fff;
            font-size: 12px;
            border-radius: 4px;
            background: $hosjoyColor;

            &:nth-child(1) {
                margin-top: 22px;
            }
            &:nth-child(2) {
                margin-top: 14px;
            }

            &:hover {
                background: $hosjoyColorHover;
            }
            &:active {
                background: $hosjoyColorActive;
            }
        }
    }
    .picture-content {
        li {
            width: 80px;
            height: 80px;
            line-height: 80px;
            margin-right: 10px;
        }
        img {
            width: 78px;
            height: 78px;
            max-width: 80px;
            max-height: 80px;
            z-index: 4;
            vertical-align: middle;
        }
    }
}
.audit-opinion {
    margin-top: 10px;
    padding-left: 5px;
}
</style>
