<template>
    <div class="page-body B2b SpuEdit">
        <div class="page-body-cont">
            <el-form ref="formmain" :model="form" :rules="rules" label-width="110px">
                <div class="title-cont">
                    <span class="title-cont__label">基本信息</span>
                </div>
                <div>
                    <el-form-item label="商品品牌：" style="width: 460px;">
                        xxxxx
                    </el-form-item>
                    <el-form-item label="商品型号：" style="width: 460px;">
                        xxxxx
                    </el-form-item>
                    <el-form-item label="商品类目：" style="width: 460px;">
                        A/B/C
                    </el-form-item>
                    <el-form-item label="商品名称：" style="width: 460px;">
                        xxxxx
                    </el-form-item>
                    <el-form-item label="SPU价格：" style="width: 460px;">
                        <el-radio-group v-model="form.radio">
                            <el-radio label="不展示"></el-radio>
                            <el-radio label="展示"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="商品销售名称：" style="width: 460px;">
                        <el-input></el-input>
                    </el-form-item>
                </div>
                <div class="title-cont">
                    <span class="title-cont__label">销售信息</span>
                </div>
                <div>
                    <el-form-item label="商品图片：" prop="pics">
                        <div class="productPicture">
                            <div style="margin-right:10px">
                                <HosJoyUpload class="crmshopMallSpuEdit" v-model="form.pics" :multiple='false' :showPreView='true' :fileSize=20 :action='action' :fileNum='1' :uploadParameters='uploadParameters' accept='.jpg,.png,.jpeg' style="margin:10px 0 0 5px" />
                                <div style="color:#ff7a45;textAlign:center">* 主图</div>
                            </div>
                            <div style="margin-right:10px" class="vicepics">
                                <HosJoyUpload class="crmshopMallSpuEdit" v-model="form.pics2" :showPreView='true' :fileSize=20 :action='action' :fileNum='4' :uploadParameters='uploadParameters' accept='.jpg,.png,.jpeg' style="margin:10px 0 0 5px" />
                                <div style="color:#00000065;marginLeft:40px">副图</div>
                            </div>

                        </div>
                        <div class="picture-prompt" style="width:100%">
                            <p>副图最多支持上传4张，大小不超过20M，仅支持jpeg，jpg，png格式</p>
                        </div>
                    </el-form-item>
                </div>
                <!-- {{JSON.stringify(nodeList)}} -->
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
                        <div class="skutableForm">
                            <el-form-item label="" :prop="`skuList.${scope.data.$index}.minSalePrice`" :rules="rules.minSalePrice">
                                <el-input style="width:140px" placeholder="请输入" v-isNum:2 v-inputMAX='100000000' v-model="scope.data.row.minSalePrice" size="mini" @blur="()=>compore(scope.data.row,scope.data.$index)"><template slot="append">{{scope.$index}}元</template></el-input>
                            </el-form-item>
                            <font style="margin:0 10px">-</font>
                            <el-form-item label="" :prop="`skuList.${scope.data.$index}.maxSalePrice`" :rules="rules.maxSalePrice">
                                <el-input style="width:140px" placeholder="请输入" v-isNum:2 v-inputMAX='100000000' v-model="scope.data.row.maxSalePrice" size="mini" @blur="()=>compore(scope.data.row,scope.data.$index)"><template slot="append">元</template></el-input>
                            </el-form-item>
                        </div>
                    </template>
                    <template #action="slotProps">
                        <h-button table >上架</h-button>
                    </template>
                </hosJoyTable>
                <div class="addNew" @click="onAddSKU">+ 新增SKU</div>
            </el-form>
            <div class="submit-btns">
                <h-button type="assist" >保存编辑</h-button>
                <div>
                    <h-button >取消</h-button>
                    <h-button type="primary" >提交编辑</h-button>
                </div>
            </div>
        </div>

        <el-dialog title="选择SKU" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :before-close="onCloseDialog" width="50%">
            <hosJoyTable isShowselection @selection-change="selectChange" ref="hosjoyTableSKU"  align="center" border stripe  :column="tableLabelSKU" :data="addSKUlist" >
                <template #action="slotProps">
                    <h-button table >编辑</h-button>
                </template>
            </hosJoyTable>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCloseDialog">取 消</el-button>
                <el-button type="primary" @click="onChooseSku">确定选择</el-button>
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
import { getChiness } from './api/index'
import { ElTree } from 'element-ui/types/tree'
import { errorTxt } from './const'
const _queryParams = {
    xxx: '',
    categoryIdArr: [],
    pageNumber: 1,
    pageSize: 10
}

@Component({
    name: 'crmshopMallSpuEdit',
    components: { hosJoyTable, HosJoyUpload }
})
export default class SpuEdit extends Vue {
    rowIndex = ''
    Selection = [] // 列表选择
    addSKUlist = [
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 },
        { name: 1 }
    ]
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
    form = {
        radio: '',
        pics: [],
        pics2: [],
        // area: [[''], ['120000000000', '120100000000']],
        area: [],
        skuList: [
            {
                id: '', spuId: '', code: '', name: 'xxxxxxxxxxxxxxxxxxxxxxxx', imageUrls: '', specifications: '', optionValues: [], minSalePrice: '1', maxSalePrice: '1222', isOnShelf: '' // 是否上架 0:下架 1:上架
            },
            {
                id: '', spuId: '', code: '', name: 'xxxxxxxxxxxxxxxxxxxxxxxx', imageUrls: '', specifications: '', optionValues: [], minSalePrice: '2333333', maxSalePrice: '1222', isOnShelf: '' // 是否上架 0:下架 1:上架
            }
        ]
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
    page = {
        sizes: [10, 20, 50, 100],
        total: 0
    }

    tableLabel: tableLabelProps = [
        { label: 'SKU编号', prop: 'name' },
        { label: '规格1', prop: 'name' },
        { label: '规格2', prop: 'name' },
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
        { label: '状态', prop: 'name' }
    ]

    tableLabelSKU: tableLabelProps = [
        { label: '商品名称', prop: 'name' },
        { label: '商品类目', prop: 'name' },
        { label: '商品品牌', prop: 'name' },
        { label: '商品型号', prop: 'name' },
        { label: '商品规格', prop: 'name' },
        { label: 'SKU编码', prop: 'name' }
    ]

    compore (row, index) {
        let from:any = this.$refs.formmain
        // this.form.skuList.map((item, index) => {
        //     from.validateField(`skuList.${index}.maxSalePrice`)
        // })
        // `skuList.${scope.data.$index}.minSalePrice`
        from.validateField(`skuList.${index}.minSalePrice`)
        from.validateField(`skuList.${index}.maxSalePrice`)
        console.log('log::::::', 111)
    }

    // 列表选择
    selectChange (val:any[]) {
        console.log('🚀 --- selectChange --- val', val)
        this.Selection = val
    }
    onCloseDialog () {
        console.log('log::::::before-close')
        let ref:any = this.$refs.hosjoyTableSKU
        ref.clearSelection()
        this.dialogTableVisible = false
    }
    onChooseSku () {
        if (this.Selection.length == 0) {
            this.$message.error('请选择要新增的SKU')
            return
        }
        let ref:any = this.$refs.hosjoyTableSKU
        ref.clearSelection()
        this.dialogTableVisible = false
    }
    onAddSKU () {
        this.Selection = []
        this.dialogTableVisible = true
    }

    //
    //
    recursiveChineseArea (array = [], frequency = 0) {
        let level = frequency + 1 // MARK 0代表全国，1代表省，2代表市
        // 构造省市2级数据
        if (frequency < 2) {
            return array.map(item => {
                return {
                    level,
                    value: item.countryId || item.cityId || item.provinceId, // 区域ID
                    label: item.name,
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
        console.log('🚀 --- getAreacode --- this.areaList', this.areaList)
    }

    treeChangeHandler () {
        // @ts-ignore 通过 node 获取
        this.nodeList = this.$refs.selectCityTree.getCheckedNodes()
    }

    log () {
        console.log('log::::::', this.form)
        // @ts-ignore
        this.$refs['formmain'].validate(async (value, r) => {
            if (value) {
                console.log('log::::::提交')
            } else {
                console.log('log::::::不通过')
            }
        })
        /* let allProvince = []
        let allCity = []
        // this.formatNodeList
        console.log('log::::::', this.nodeList)
        let provinceID:any = ''

        for (let i = 0, len = this.nodeList.length; i < len; i++) {
            let item = this.nodeList[i]
            if (item.level == 1) {
                allProvince.push(item)
                provinceID = item.value // 获取省ID
                continue
            }
            if (item.level != 1 && item.parentID != provinceID) {
                allCity.push(item)
            }
        }
        // level == 1 全省
        console.log('🚀 --- log --- 全省', allProvince)
        // level == 2 某市
        console.log('🚀 --- log --- 某市', allCity) */
    }

    mounted () {
        this.getAreacode()
        this.$nextTick(() => {
            // @ts-ignore 设置默认选中
            // this.$refs.selectCityTree.setCheckedKeys(['']) // 全国
        })
    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>