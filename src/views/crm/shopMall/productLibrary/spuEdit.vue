<template>
    <div class="page-body B2b SpuEdit">
        <div class="page-body-cont">
            <el-form ref="formmain" :model="form" :rules="rules" label-width="110px">
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
                    <el-form-item label="商品类目：" style="width: 460px;">
                        {{form.categoryPath || '-'}}
                    </el-form-item>
                    <el-form-item label="商品名称：" style="width: 460px;">
                        {{form.name || '-'}}
                    </el-form-item>
                    <el-form-item label="SPU价格：" style="width: 460px;">
                        <el-radio-group v-model="form.priceVisible">
                            <el-radio :label="0">不展示</el-radio>
                            <el-radio :label="1">展示</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="商品销售名称：" style="width: 460px;">
                        <el-input  v-model="form.showName" ></el-input>
                    </el-form-item>
                </div>
                <div class="title-cont">
                    <span class="title-cont__label">销售信息</span>
                </div>
                <div>
                    <el-form-item label="商品图片：" prop="pics">
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
                                    <span style="color:#00000065" class="sidepic">* 副图</span>
                                </div>
                            </div>
                            <!-- <div style="margin-right:10px" class="vicepics">
                                <HosJoyUpload class="crmshopMallSpuEdit" v-model="form.sidePicture" :showPreView='true' :fileSize=20 :action='action' :fileNum='4' :uploadParameters='uploadParameters' accept='.jpg,.png,.jpeg' style="margin:10px 0 0 5px" />
                                <div style="color:#00000065;marginLeft:40px">副图</div>
                            </div> -->
                        </div>
                        <div class="picture-prompt" style="width:100%">
                            <p>副图最多支持上传4张，大小不超过20M，仅支持jpeg，jpg，png格式</p>
                        </div>
                    </el-form-item>
                </div>
                <!-- {{JSON.stringify(nodeList)}}-->
                <el-form-item label="可售卖区域：" style="width: 460px;">
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
                <!-- {{JSON.stringify(formatNodeList)}} -->
                <h-button type='primary' @click="log">打印</h-button>
                <hosJoyTable  ref="hosjoyTable"  align="center" border stripe  :column="tableLabel" :data="form.skuList"  actionWidth='100' isAction >
                    <template slot="price" slot-scope="scope">
                        <div class="skutableForm" v-if="scope.data.isOnShelf!=2">
                            <el-form-item label="" :prop="`skuList.${scope.data.$index}.minSalePrice`" :rules="rules.minSalePrice">
                                <el-input style="width:150px" placeholder="请输入" v-model="scope.data.row.minSalePrice"  v-isNum:2 v-inputMAX='100000000' size="mini" @blur="()=>compore(scope.data.row,scope.data.$index)"><template slot="append">元</template></el-input>
                            </el-form-item>
                            <font style="margin:0 10px">-</font>
                            <el-form-item label="" :prop="`skuList.${scope.data.$index}.maxSalePrice`" :rules="rules.maxSalePrice">
                                <el-input style="width:150px" placeholder="请输入"  v-model="scope.data.row.maxSalePrice" v-isNum:2 v-inputMAX='100000000' size="mini" @blur="()=>compore(scope.data.row,scope.data.$index)"><template slot="append">元</template></el-input>
                            </el-form-item>
                        </div>
                        <div v-else class="skutableForm" >
                            {{scope.data.row.minSalePrice}} - {{scope.data.row.maxSalePrice}}
                        </div>
                    </template>
                    <template #action="slotProps">
                        <h-button table v-if="slotProps.data.row.isOnShelf==2" @click="()=>onRack(slotProps.data.row)">下架</h-button>
                        <div v-else><h-button table @click="()=>onTheShelves(slotProps.data.row)">上架</h-button><h-button table @click="()=>onDel(slotProps.data.row)">删除</h-button></div>
                    </template>
                </hosJoyTable>
                <div class="addNew" @click="onAddSKU">+ 新增SKU</div>
            </el-form>
            <div class="submit-btns">
                <h-button >取消</h-button>
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
                <div style="color:#f00;marginTop:10px" v-if="rackData.recommendLocation">当前商品在【{{rackData.recommendLocation.toString()}}】被选用</div>
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
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import { ccpBaseUrl } from '@/api/config'
import { getChiness, getSpudetail, putSKU, skuhelftatus, batchDelete, submitSpu } from './api/index'
import { ElTree } from 'element-ui/types/tree'
import { errorTxt } from './const'
import { RespBossB2bSkuPage, RespBossSku, RespBossSpuDetail } from '@/interface/hbp-shop'
import { bulkPullSku, getSkuList } from '../addProduct/api'
import { isNum } from '@/utils/validate/format'

const _queryParams = {
    name: '',
    brandName: '',
    model: '',
    spuCode: '',
    skuCode: '',
    categoryIds: [],
    pageNumber: 1,
    pageSize: 10
}

@Component({
    name: 'crmshopMallSpuEdit',
    components: { hosJoyTable, HosJoyUpload }
})
export default class SpuEdit extends Vue {
    @State('userInfo') userInfo: any
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
        status: '', // 编辑状态 1：草稿 2：已提交
        saleRules: [],
        skuList: [
            {
                id: '', spuId: '', code: '', name: 'xxxxxxxxxxxxxxxxxxxxxxxx', imageUrls: '', specifications: '', minSalePrice: '1', maxSalePrice: '1222', isOnShelf: '' // 是否上架 1:下架 2:上架
            },
            {
                id: '', spuId: '', code: '', name: 'xxxxxxxxxxxxxxxxxxxxxxxx', imageUrls: '', specifications: '', minSalePrice: '2333333', maxSalePrice: '1222', isOnShelf: '' // 是否上架 1:下架 2:上架
            }
        ],
        createBy: '', // this.userInfo.employeeName
        createPhone: '' // this.userInfo.phoneNumber
    }
    // 自定义校验规则
    checkPrice = (rule, value, callback) => {
        let fieldList = rule.field.split('.')
        let min = this.form[fieldList[0]][fieldList[1]]['minSalePrice'] * 1
        let max = this.form[fieldList[0]][fieldList[1]]['maxSalePrice'] * 1
        if (min >= max) {
            callback(new Error('后一个数不能小于前一个数'))
        } else {
            callback()
        }
    }
    rules = {
        // pics: [
        //     { required: true, message: '请选择商品主图', trigger: 'change' }
        // ],
        minSalePrice: [
            { required: true, message: '必填项不能为空', trigger: 'blur' },
            { validator: this.checkPrice, message: '前一个数不能大于后一个数', trigger: 'blur' }
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
                                    : scope.row.isOnShelf == 1 ? '下架SKU' : ''
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
        console.log('log::::::', this.form)
    }

    // 设为主图
    setMainPic ({ index, data }) {
        this.form.imageUrls.unshift((this.form.imageUrls.splice(index, 1))[0])
    }

    // 确认下架sku
    async onHandleRack () {
        await skuhelftatus({
            skuIdList: [this.rackData.id],
            isOnShelf: 1 // 1:下架 2:上架
        })
        this.$message.success('下架成功')
        this.onReloadTable()
        this.rackDialog = false
    }

    // 下架sku
    async onRack (data:RespBossSku) {
        this.rackDialog = true
        this.rackData = data
    }
    // 上架sku
    async onTheShelves (data) {
        await skuhelftatus({
            skuIdList: [data.id],
            isOnShelf: 2 // 1:下架 2:上架
        })
        this.$message.success('上架成功')
        this.onReloadTable()
    }
    // 删除sku
    async onDel (data) {
        await batchDelete({
            skuIds: [data.id]
        })
        this.$message.success('删除成功')
        this.onReloadTable()
    }

    async onReloadTable () {
        // 刷新表格
        const { data: detail } = await getSpudetail(this.$route.query.id)
        this.form.skuList = detail.skuList
    }

    async compore (row, index) {
        console.log('🚀 --- compore --- row', row)
        if (!row.minSalePrice || !row.maxSalePrice) {
            return
        }
        let from:any = this.$refs.formmain
        let isError = false
        if (row.minSalePrice !== null) {
            from.validateField(`skuList.${index}.minSalePrice`, message => {
                if (message) {
                    isError = true
                }
            })
        }
        if (row.maxSalePrice !== null) {
            from.validateField(`skuList.${index}.maxSalePrice`, message => {
                if (message) {
                    isError = true
                }
            })
        }
        if (isError) {
            return
        }
        from.validateField(`skuList.${index}.maxSalePrice`)
        // sub
        row.minSalePrice = isNum(row.minSalePrice, 2)
        row.maxSalePrice = isNum(row.maxSalePrice, 2)
        if (row.minSalePrice * 1 > 100000000) {
            row.minSalePrice = 100000000
        }
        if (row.maxSalePrice * 1 > 100000000) {
            row.maxSalePrice = 100000000
        }
        // await putSKU(
        //     {
        //         'id': row.id,
        //         'minSalePrice': row.minSalePrice,
        //         'maxSalePrice': row.maxSalePrice,
        //         'updateBy': this.userInfo.employeeName,
        //         'updatePhone': this.userInfo.phoneNumber
        //     }
        // )
    }

    // 列表选择
    selectChange (val:any[]) {
        this.Selection = val
    }
    onCloseDialog () {
        console.log('log::::::before-close')
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
        try {
            // await bulkPullSku({ skuIds: this.Selection }) // 拉取
            console.log('log::::::', this.Selection)
            this.Selection.map(item => {
                let obj = {
                    id: '',
                    mainSkuId: item.id,
                    minSalePrice: '',
                    maxSalePrice: ''
                }
            })
            let ref:any = this.$refs.hosjoyTableSKU
            ref.clearSelection()
            this.dialogTableVisible = false
            this.Selection = []
            // 刷新列表
            this.onReloadTable()
        } catch (error) {
            console.log('error::::::', error)
        }
    }

    // getList
    async getList () {
        let query = JSON.parse(JSON.stringify(this.queryParams))
        if (query.categoryIds.length > 0) {
            query.categoryIds = query.categoryIds.toString()
        }
        const { data } = await getSkuList(query)
        this.addSKUlist = data.records
        this.page.total = data.total
    }

    // 添加SKU
    async onAddSKU () {
        this.Selection = []
        await this.getList()
        this.dialogTableVisible = true
    }

    // 处理勾选状态
    handleSelectable (row, index) {
        if (row.isPullAble) {
            return false
        } else {
            return true
        }
    }

    // 构造省市2级数据
    recursiveChineseArea (array = [], frequency = 0) {
        let level = frequency + 1 // MARK 0代表全国，1代表省，2代表市
        if (frequency < 2) {
            return array.map(item => {
                let n = frequency == 0 ? item.provinceId : item.cityId
                return {
                    level,
                    value: item.countryId || item.cityId || item.provinceId, // 区域ID
                    label: item.name + n,
                    children: this.recursiveChineseArea(item.cities || item.countries, frequency + 1),
                    parentID: (level == 0 || level == 1) ? '' : item.provinceId || item.cityId || item.countryId // 父级ID
                }
            })
        } else {
            return null
        }
    }

    // 查询省市区接口
    async getAreacode () {
        const { data } = await getChiness()
        this.areaList = data
        this.areaList = this.recursiveChineseArea(this.areaList)
        this.areaList = [{ level: 0, value: '', label: '全国', children: [...this.areaList] }]
    }

    treeChangeHandler () {
        // @ts-ignore 通过 node 获取
        this.nodeList = this.$refs.selectCityTree.getCheckedNodes()
    }

    log () {
        let apiRes = [{ provinceId: '120000000000', cityId: '', areaId: '' }, { provinceId: '130000000000', cityId: '130100000000', areaId: '' }, { provinceId: '130000000000', cityId: '130200000000', areaId: '' }, { provinceId: '140000000000', cityId: '', areaId: '' }]
        let checkedNodes = []
        for (let item of apiRes) {
            // 全省
            if (!item.cityId) {
                checkedNodes.push(item.provinceId)
                continue
            }
            if (item.cityId) {
                checkedNodes.push(item.cityId)
            }
        }
        console.log('🚀 --- log --- checkedNodes', checkedNodes)
        // @ts-ignore
        this.$refs.selectCityTree.setCheckedKeys(
            checkedNodes
        )
        // .....
        // @ts-ignore
        // this.$refs['formmain'].validate(async (value, r) => {
        //     if (value) {
        //         console.log('log::::::提交')
        //     } else {
        //         console.log('log::::::不通过')
        //     }
        // })
        let allProvince = []
        let allCity = []
        // @ts-ignore
        this.nodeList = this.$refs.selectCityTree.getCheckedNodes()
        console.log('log::::::nodeList', this.nodeList)
        let provinceID:any = ''
        // 提交
        for (let i = 0, len = this.nodeList.length; i < len; i++) {
            let item = this.nodeList[i]
            // level == 1 全省
            if (item.level == 1) {
                allProvince.push({
                    provinceId: item.value,
                    cityId: '',
                    areaId: ''
                })
                provinceID = item.value // 获取省ID
                continue
            }
            // level == 2 某市
            if (item.level == 2 && item.parentID != provinceID) {
                allCity.push({
                    provinceId: item.parentID,
                    cityId: item.value,
                    areaId: ''
                })
            }
        }
        let result = [...allProvince, ...allCity]
        this.form.saleRules = result
        console.log('log::::::form', this.form)
    }

    async getDetail () {
        const { data } = await getSpudetail(this.$route.query.id)
        this.form = Object.assign({}, this.form, data)
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
        console.log('🚀 --- getDetail --- this.form', this.form)
    }

    async mounted () {
        await this.getAreacode()
        // this.$nextTick(() => {
        //     // @ts-ignore 设置默认选中
        //     this.$refs.selectCityTree.setCheckedKeys(
        //         ['120000000000', '130100000000', '130200000000'] // 天津市、石家庄市
        //     ) // 全国
        // })
        this.getDetail()
        this.queryParams.spuCode = this.$route.query.spuCode as string
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>