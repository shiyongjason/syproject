<template>
    <div class="page-body B2b SpuEdit">
        <div class="page-body-cont">
            <el-form ref="formmain" :model="form" :rules="rules" label-width="125px">
                <div class="title-cont">
                    <span class="title-cont__label">基本信息</span>
                </div>
                <div>
                    <el-form-item label="商品品牌：" style="width: 460px;">
                        {{form.brandName || '-'}}
                    </el-form-item>
                    <el-form-item label="商品型号：" style="width: 460px;">
                        {{form.model || '-'}}
                    </el-form-item>
                    <div class="show-err" v-if="form.priceVisible==null"></div>
                    <el-form-item label="商品类目：" style="width: 460px;">
                        {{form.categoryPath || '-'}}
                    </el-form-item>
                    <el-form-item label="商品名称：" style="width: 460px;">
                        {{form.name || '-'}}
                    </el-form-item>
                    <el-form-item label="SPU价格：" prop="priceVisible" style="width: 460px;">
                        <el-radio-group v-model="form.priceVisible">
                            <el-radio :label="0">不展示</el-radio>
                            <el-radio :label="1">展示</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="商品销售名称：" prop="showName" style="width: 460px;" >
                        <el-input  v-model="form.showName" maxlength='30'></el-input>
                    </el-form-item>
                </div>
                <div class="title-cont">
                    <span class="title-cont__label">销售信息</span>
                </div>
                <div>
                    <el-form-item label="商品图片：" prop="imageUrls">
                        <div class="productPicture">
                            <div style="margin-right:10px">
                                <HosJoyUpload class="crmshopMallSpuEdit" v-model="form.imageUrls" :showPreView='true' :fileSize=20 :action='action' :fileNum='5' :uploadParameters='uploadParameters' accept='.jpg,.png,.jpeg' style="margin:10px 0 0 5px" >
                                    <span slot="preViewExtends" @click="()=>setMainPic(scope.data)" class="preViewExtends" slot-scope="scope" v-if="scope.data&&scope.data.index!=0">
                                        <img :src="require('@/assets/images/shuffling-banner-fill.png')" width="23" alt="设为主图">
                                        <p style="line-height: 20px;">设为主图</p>
                                    </span>
                                </HosJoyUpload>
                                <div>
                                    <span style="color:#ff7a45" class="mainpic">* 主图</span>
                                    <span style="color:#00000065" class="sidepic" v-if="form.imageUrls.length>0">* 副图</span>
                                </div>
                            </div>
                        </div>
                        <div class="picture-prompt" style="width:100%">
                            <p>副图最多支持上传4张，大小不超过20M，仅支持jpeg，jpg，png格式</p>
                        </div>
                    </el-form-item>
                </div>
                <!-- {{JSON.stringify(nodeList)}}-->
                <el-form-item label="可售卖区域：" prop="saleRules" style="width: 460px;">
                    <div class="areaTree">
                        <el-tree
                        :data="areaList"
                        show-checkbox
                        :highlight-current='true'
                        ref="selectCityTree"
                        @check-change="treeChangeHandler"
                        node-key="value"
                        :default-expanded-keys="['']"
                        :indent = '16'
                        :props="{children: 'children',label: 'label'}"
                        >
                        </el-tree>
                    </div>
                </el-form-item>
                <hosJoyTable  ref="hosjoyTable"  align="center" border stripe  :column="tableLabel" :data="form.skuList"  actionWidth='70' isAction >
                    <template slot="price" slot-scope="scope">
                        <div class="skutableForm" v-if="form.priceVisible==1">
                            <el-form-item label="" :prop="`skuList.${scope.data.$index}.minSalePrice`" :rules="rules.minSalePrice">
                                <el-input style="width:150px" placeholder="请输入" v-model="scope.data.row.minSalePrice"  v-isNum:2 v-inputMAX='9999999.99' size="mini" @blur="()=>compore(scope.data.row,scope.data.$index)"><template slot="append">元</template></el-input>
                            </el-form-item>
                            <font style="margin:0 10px">-</font>
                            <el-form-item label="" :prop="`skuList.${scope.data.$index}.maxSalePrice`" :rules="rules.maxSalePrice">
                                <el-input style="width:150px" placeholder="请输入"  v-model="scope.data.row.maxSalePrice" v-isNum:2 v-inputMAX='9999999.99' size="mini" @blur="()=>compore(scope.data.row,scope.data.$index)"><template slot="append">元</template></el-input>
                            </el-form-item>
                        </div>
                        <div v-if="form.priceVisible===null" class="skutableForm" >
                            -
                        </div>
                        <div v-if="form.priceVisible==0" class="skutableForm" >
                            不展示
                        </div>
                    </template>
                    <template #action="slotProps">
                        <h-button table v-if="slotProps.data.row.isOnShelf==2&&hosAuthCheck(authOff)" @click="()=>onRack(slotProps.data.row)">下架</h-button>
                        <div v-else><h-button v-if="hosAuthCheck(authOn)" table @click="()=>onTheShelves(slotProps.data.row,slotProps.data.$index)">上架</h-button><h-button v-if="hosAuthCheck(authDel)" table @click="()=>onDel(slotProps.data.row,slotProps.data.$index)">删除</h-button></div>
                    </template>
                </hosJoyTable>
                <div class="addNew" @click="onAddSKU" v-if="hosAuthCheck(authAdd)">+ 新增SKU</div>
            </el-form>
            <div class="submit-btns">
                <h-button @click="onBack">取消</h-button>
                    <h-button type="primary" @click="onSubmit">提交编辑</h-button>
            </div>
        </div>

        <el-dialog title="选择SKU" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :before-close="onCloseDialog" width="1200px" class="chooseSKUDialog">
            <hosJoyTable isShowselection @selection-change="selectChange" ref="hosjoyTableSKU"  align="center" border stripe  :column="tableLabelSKU" :data="addSKUlist" showPagination :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList" :selectable='handleSelectable'>
            </hosJoyTable>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseDialog">取 消</el-button>
                <el-button type="primary" @click="onChooseSku">确定选择</el-button>
            </span>
        </el-dialog>
        <!-- 下架 -->
        <el-dialog title="下架确认" :visible.sync="rackDialog" :close-on-click-modal="false" :before-close="() => rackDialog = false" width="450px" class="tipsDialog">
            <div style="text-align:center;padding:20px 0">
                确定下架当前商品SKU吗？
                <div style="color:#f00;marginTop:10px" v-if="rackData.recommend||rackData.existFloor">提醒：当前商品在{{rackData.recommend?'【严选推荐】':''}}{{rackData.existFloor?'【楼层管理】':''}}被选用，确定下架后，该SKU在以上位置不可见。</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="() => {rackDialog = false}">取 消</el-button>
                <el-button type="primary" @click="onHandleRack">确定下架</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang='tsx'>
import { ElForm } from 'element-ui/types/form'
import { ElTree } from 'element-ui/types/tree'
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import { ccpBaseUrl } from '@/api/config'
import { getChiness, getSpudetail, putSKU, skuhelftatus, batchDelete, submitSpu } from './api/index'
import { errorTxt } from './const'
import { ReqBossSkuUpdate, RespBossB2bSkuPage, RespBossSku, RespBossSpuDetail } from '@/interface/hbp-shop'
import { bulkPullSku, getSkuList } from '../addProduct/api'
import { isNum } from '@/utils/validate/format'
import { CRM_SHOPP_SPUEDIT_ONTHESHELVES, CRM_SHOPP_SPUEDIT_RACK, CRM_SHOPP_SPUEDIT_ADD, CRM_SHOPP_SPUEDIT_DEL } from '@/utils/auth_const'

const _queryParams = {
    spuCode: '',
    pageNumber: 1,
    pageSize: 10
}
const showNameValidator = (rule, value, callback) => {
    let Reg = /^[\u4e00-\u9fa50-9a-zA-Z ]+$/
    if (value && !Reg.test(value)) {
        return callback(new Error())
    }
    return callback()
}

@Component({
    name: 'crmshopMallSpuEdit',
    components: { hosJoyTable, HosJoyUpload }
})
export default class SpuEdit extends Vue {
    @Ref('formmain') $refFormmain: ElForm & { fields:any[] }
    @Ref('selectCityTree') $refSelectCityTree: ElTree<any, any>;
    @State('userInfo') userInfo: any
    @Action('setNewTags') setNewTags: Function
    authOn = CRM_SHOPP_SPUEDIT_ONTHESHELVES
    authOff = CRM_SHOPP_SPUEDIT_RACK
    authAdd = CRM_SHOPP_SPUEDIT_ADD
    authDel = CRM_SHOPP_SPUEDIT_DEL
    provinceLen:number = 0
    rackDialog:boolean = false
    rackData:RespBossSku = '' as RespBossSku
    queryParams: typeof _queryParams = JSON.parse(JSON.stringify(_queryParams))
    addSKUlist:RespBossB2bSkuPage[] = []
    page:any = {
        sizes: [10, 20, 50, 100],
        total: 0
    }
    rowIndex = ''
    Selection = [] // 列表选择
    dialogTableVisible = false
    nodeList = []
    formatNodeList = []
    areaList = []
    options = []
    action = ccpBaseUrl + 'common/files/upload-old'
    uploadParameters = {
        updateUid: '',
        reservedName: true
    }
    form:Partial<RespBossSpuDetail> = {
        id: '',
        name: '',
        showName: '',
        brandName: '',
        model: '',
        priceVisible: '', // 销售价是否可见 0：否 1：是
        imageUrls: [], // 第一张为主图
        saleRules: [],
        skuList: [],
        createBy: '', // this.userInfo.employeeName
        createPhone: '' // this.userInfo.phoneNumber
    }
    // 自定义校验规则
    checkPrice (rule, value, callback, type) {
        let errorTxt = {
            minSalePrice: '前一个数不能大于后一个数',
            maxSalePrice: '后一个数不能小于前一个数'
        }
        let fieldList = rule.field.split('.') // ["skuList", "1", "maxSalePrice"]
        let key = fieldList[0]
        let index = fieldList[1]
        let field = fieldList[2]
        let min = this.form[key][index]['minSalePrice']
        let max = this.form[fieldList[0]][fieldList[1]]['maxSalePrice']
        // 根据字段判断只校验对应的输入框的值
        if (field === 'minSalePrice') {
            if (min && min * 1 == 0) {
                callback(new Error('不能为0'))
                return
            }
        } else if (field === 'maxSalePrice') {
            if (max && max * 1 == 0) {
                callback(new Error('不能为0'))
                return
            }
        }
        if (min !== null && max !== null && min * 1 >= max * 1) {
            callback(new Error(errorTxt[field]))
        } else {
            callback()
        }
    }

    rules = {
        saleRules: [
            { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        showName: [
            { required: true, message: '必填项不能为空', trigger: 'blur' },
            { message: '限中西文字、数字(含小数点)以及空格', trigger: 'blur', pattern: /^[\u4e00-\u9fa50-9.a-zA-Z ]+$/ },
            { whitespace: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        priceVisible: [
            { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        imageUrls: [
            { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        minSalePrice: [
            { required: true, message: '必填项不能为空', trigger: 'blur' },
            { validator: this.checkPrice, trigger: 'blur' }
        ],
        maxSalePrice: [
            { required: true, message: '必填项不能为空', trigger: 'blur' },
            { validator: this.checkPrice, trigger: 'blur' }
        ]
    }

    tableLabel: tableLabelProps = [
        { label: 'SKU编号', prop: 'code' },
        { label: '规格', prop: 'optionValues' },
        {
            label: '销售价(元)',
            prop: 'price',
            slot: 'price',
            width: '360px',
            labelClassName: 'pricecell',
            className: 'priceflex',
            showOverflowTooltip: false,
            renderHeader: (h, scope) => {
                return (
                    <span>
                        <font style="marginRight:5px">{scope.column.label}</font>
                        <el-tooltip effect="dark" placement="top-start">
                            <div slot="content">必填项<br/>只可输入数字，区间为（0，100,000,000）<br/>后一个输入框数值不能小于前一个输入框</div>
                            <i class='el-icon-info'></i>
                        </el-tooltip>
                    </span>
                )
            }
        },
        {
            label: '状态',
            prop: 'status',
            render: (h, scope) => {
                return (
                    <div>
                        {
                            scope.row.isOnShelf === null ? '待编辑SKU'
                                : scope.row.isOnShelf == 2 ? '上架SKU'
                                    : scope.row.isOnShelf == 1 ? '下架SKU' : '-'
                        }
                    </div>
                )
            }
        }
    ]

    tableLabelSKU: tableLabelProps = [
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'category' },
        { label: '商品品牌', prop: 'brandName' },
        { label: '商品型号', prop: 'model' },
        { label: '商品规格', prop: 'optionValues' },
        { label: 'SKU编码', prop: 'skuCode' }
    ]

    onSubmit () {
        if (this.form.skuList.length == 0) {
            this.$message.error('请至少选择一个SKU信息~')
            return
        }
        /** start  format saleRules */
        let allProvince = []
        let allCity = []
        this.nodeList = this.$refSelectCityTree.getCheckedNodes()
        let provinceID:any = ''
        for (let i = 0, len = this.nodeList.length; i < len; i++) {
            let item = this.nodeList[i]
            console.log('🚀 --- onSubmit --- item', item)
            // level == 1 全省
            if (item.level == 1) {
                let cityList = []
                item.children.map(child => {
                    cityList.push({
                        cityId: child.value,
                        cityName: child.label
                    })
                })
                allProvince.push({
                    provinceId: item.value,
                    cityId: '',
                    areaId: '',
                    provinceName: item.label,
                    cityList
                })
                provinceID = item.value // 获取省ID
                continue
            }
            // level == 2 某市
            if (item.level == 2 && item.parentID != provinceID) {
                allCity.push({
                    provinceId: item.parentID,
                    cityId: item.value,
                    areaId: '',
                    cityName: item.label,
                    provinceName: item.parentName
                })
            }
        }
        let result = []
        if (allProvince.length != this.provinceLen) {
            let tempArr = []
            let newArr = []
            // 防止再改会平级数据，建议上面别动，现添加下面方法把市根据省再次重组成tree，
            allCity.forEach((i, index) => {
                if (tempArr.indexOf(i.provinceId) === -1) {
                    newArr.push({
                        provinceName: i.provinceName,
                        provinceId: i.provinceId,
                        cityList: [i]
                    })
                    tempArr.push(i.provinceId)
                } else {
                    newArr[tempArr.indexOf(i.provinceId)].cityList.push(i)
                }
            })
            result = [...allProvince, ...newArr]
        } else {
            result = [{ provinceId: '0', cityId: '0', areaId: '0' }] // 全国
        }
        this.form.saleRules = result
        console.log('--- onSubmit --- this.form.saleRules', this.form)
        /** end  */
        this.$refFormmain.validate(async (value, r) => {
            if (value) {
                let query = JSON.parse(JSON.stringify(this.form)) // 防止修改imageUrls导致页面渲染失败
                let temp = []
                query.imageUrls.map(item => {
                    temp.push(item.fileUrl)
                })
                query.imageUrls = temp
                query.skuList.map(row => {
                    // 0 展示 1不展示
                    if (query.priceVisible == 1) {
                        // TODO fix 表格编辑bug，后期优化
                        row.minSalePrice = isNum(row.minSalePrice, 2)
                        row.maxSalePrice = isNum(row.maxSalePrice, 2)
                        if (Number(row.minSalePrice) > 9999999.99) {
                            row.minSalePrice = 9999999.99
                        }
                        if (Number(row.maxSalePrice) > 9999999.99) {
                            row.maxSalePrice = 9999999.99
                        }
                    } else {
                        row.minSalePrice = null
                        row.maxSalePrice = null
                    }
                })
                await submitSpu(query)
                this.$message.success('提交编辑成功~')
                this.onBack()
            } else {
                if (this.form.saleRules.length == 0 || this.form.priceVisible === null || !this.form.showName || this.form.imageUrls.length == 0) {
                    this.$message.error('必填项不得为空~')
                }
                this.$nextTick(() => {
                    let className = this.form.priceVisible == null ? '.show-err' : '.is-error'
                    const dom = document.querySelector(className)
                    dom && dom.scrollIntoView()
                })
            }
        })
    }

    // 设为主图
    setMainPic ({ index, data }) {
        this.form.imageUrls.unshift((this.form.imageUrls.splice(index, 1))[0])
    }

    // 确认下架sku
    async onHandleRack () {
        this.rackData.isOnShelf = 1
        this.$message.success('操作成功~')
        this.rackDialog = false
    }

    // 下架sku
    async onRack (data:RespBossSku) {
        this.rackDialog = true
        this.rackData = data
    }
    // 上架sku
    async onTheShelves (data, index) {
        let isError = false
        this.$refFormmain.validateField(`skuList.${index}.minSalePrice`, message => {
            if (message) {
                isError = true
            }
        })
        this.$refFormmain.validateField(`skuList.${index}.maxSalePrice`, message => {
            if (message) {
                isError = true
            }
        })
        if (isError) {
            return
        }
        data.isOnShelf = 2
        this.$message.success('操作成功~')
    }
    // 删除sku
    async onDel (data, index) {
        this.form.skuList.splice(index, 1)
        this.$message.success('操作成功~')
        this.$refFormmain.validateField(`skuList.${index}.minSalePrice`)
        this.$refFormmain.validateField(`skuList.${index}.maxSalePrice`)
    }

    async onReloadTable () {
        // 刷新表格
        const { data: detail } = await getSpudetail(this.$route.query.id)
        this.form.skuList = detail.skuList
    }

    async compore (row, index) {
        if (!row.minSalePrice || !row.maxSalePrice) {
            return
        }
        if (row.minSalePrice !== null) {
            this.$refFormmain.validateField(`skuList.${index}.minSalePrice`)
        }
        if (row.maxSalePrice !== null) {
            this.$refFormmain.validateField(`skuList.${index}.maxSalePrice`)
        }
    }

    // 列表选择
    selectChange (val:any[]) {
        this.Selection = val
    }
    onCloseDialog () {
        let ref:any = this.$refs.hosjoyTableSKU
        ref.clearSelection()
        this.Selection = []
        this.queryParams = JSON.parse(JSON.stringify(_queryParams))
        this.dialogTableVisible = false
    }
    // 确认新增sku
    async onChooseSku () {
        if (this.Selection.length == 0) {
            this.$message.error('请选择要新增的SKU')
            return
        }
        this.Selection.map(item => {
            let sku:ReqBossSkuUpdate&{optionValues:any, isPullAble?:boolean} = {
                id: '',
                name: item.name,
                code: item.skuCode,
                optionValues: item.optionValues,
                // isPullAble: item.isPullAble,
                mainSkuId: item.id,
                minSalePrice: null,
                maxSalePrice: null,
                isOnShelf: null,
                updateBy: this.userInfo.employeeName,
                updatePhone: this.userInfo.phoneNumber
            }
            this.form.skuList.push(sku)
        })
        this.onCloseDialog()
    }

    // getList
    async getList () {
        this.queryParams.spuCode = this.$route.query.spuCode as string
        let query = JSON.parse(JSON.stringify(this.queryParams))
        const { data } = await getSkuList(query)
        this.addSKUlist = data.records
        this.page.total = data.total
        let res:RespBossB2bSkuPage[] = []
        this.addSKUlist.map(item => {
            res = this.form.skuList.filter(jtem => jtem.code == item.skuCode)
            item.isPullAble = res.length > 0
            // if (res.length > 0) {
            //     res[0].isPullAble = true
            // } else {
            //     item.isPullAble = false
            // }
        })
        if (!this.dialogTableVisible) {
            this.dialogTableVisible = true
        }
    }

    // 添加SKU
    onAddSKU () {
        this.Selection = []
        this.getList()
    }

    // 处理勾选状态
    handleSelectable (row, index) {
        return !row.isPullAble
    }

    // 构造省市2级数据
    recursiveChineseArea (array = [], frequency = 0, name = '', parentChildren = null) {
        let level = frequency + 1 // MARK level 0代表全国，1代表省，2代表市
        if (frequency < 2) {
            return array.map(item => {
                return {
                    level,
                    value: item.countryId || item.cityId || item.provinceId, // 区域ID
                    label: item.name,
                    children: this.recursiveChineseArea(item.cities || item.countries, frequency + 1, item.name || '', item.cities || item.countries),
                    parentID: (level == 0 || level == 1) ? '' : item.provinceId || item.cityId || item.countryId, // 父级ID
                    parentName: name, // 父级Name
                    parentChildren: parentChildren

                }
            })
        } else {
            return null
        }
    }

    // 查询省市区接口
    async getAreacode () {
        const { data } = await getChiness()
        this.provinceLen = data.length
        this.areaList = data
        this.areaList = this.recursiveChineseArea(this.areaList)
        this.areaList = [{ level: 0, value: '', label: '全国', children: [...this.areaList] }] // 添加全国item
    }

    treeChangeHandler () {
        // 获取CheckedNodes
        this.nodeList = this.$refSelectCityTree.getCheckedNodes()
        if (this.nodeList.length > 0) {
            this.$refFormmain.fields.map(i => {
                if (i.prop === 'saleRules') {
                    i.clearValidate()
                }
            })
        } else {
            this.$refFormmain.validateField(`saleRules`)
        }
    }

    async getDetail () {
        const { data } = await getSpudetail(this.$route.query.id)
        // this.form = Object.assign({}, this.form, data)
        Object.assign(this.form, data)
        this.form.createBy = this.userInfo.employeeName
        this.form.createPhone = this.userInfo.phoneNumber
        let list = []
        if (this.form.imageUrls && this.form.imageUrls.length > 0) {
            this.form.imageUrls.map((item:any) => {
                list.push({
                    fileName: item,
                    fileUrl: item
                })
            })
        }
        this.form.imageUrls = list
        // 省市区反选
        if (this.form.saleRules && this.form.saleRules.length > 0) {
            let checkedNodes = []
            for (let item of this.form.saleRules) {
                if (item.provinceId == '0') {
                    this.$refSelectCityTree.setCheckedKeys(['']) // 全国
                    // break
                    return
                }
                /* if (!item.cityId) {
                    checkedNodes.push(item.provinceId)// 某省全部
                    continue
                }
                if (item.cityId) {
                    checkedNodes.push(item.cityId) // 某市
                } */
                item.cityList.map(c => {
                    checkedNodes.push(c.cityId)
                })
            }
            this.$refSelectCityTree.setCheckedKeys(
                checkedNodes
            )
        }
    }

    onBack () {
        this.setNewTags((this.$route.fullPath).split('?')[0])
        this.$router.go(-1)
    }

    async mounted () {
        await this.getAreacode()
        await this.getDetail()
        this.$nextTick(() => {
            this.$refFormmain.clearValidate()
        })
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>