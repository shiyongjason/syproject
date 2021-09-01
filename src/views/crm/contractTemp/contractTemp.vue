<template>
    <div class="page-body B2b">
        <div class="contract-temp  page-component__scroll">
            <div class="page-body-cont">
                <div class="contract-temp_title" v-if="!$route.query.id&&!$route.query.type">新增合同模板</div>
                <div class="contract-temp_title" v-if="$route.query.id&&!$route.query.type">编辑合同模板</div>
                <div class="contract-temp_title" v-if="$route.query.type&&$route.query.id">复制合同模板</div>
            </div>
            <div class="page-body-cont ">
                <div class="contract-temp_name">合同模板设置</div>
                <el-form ref="contractForm" :model="contractForm" label-width="">
                    <el-form-item label="模板名称：" class="contract-temp_set">
                        <el-input v-model="contractForm.templateName" placeholder="请输入" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="合同类型：">
                        <el-select v-model="contractForm.typeId" placeholder="请选择" @change="onChangeparam" :disabled='!!contractForm.typeId'>
                            <el-option v-for="item in contract_list" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- V.07 新增 -->
                    <el-form-item label="适用情景：" class="contract-temp_scenario" style="width:500px;display: flex;">
                        <el-input type="textarea" :autosize='{ minRows: 5, maxRows: 10 }' v-model.trim="contractForm.describe" placeholder="请输入" maxlength="150" show-word-limit></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_name">合同模板内容</div>
                <div class="contract-temp_flex">
                    <div class="contract-temp_rich">
                        <RichEditor ref="RichEditor" v-model="contractForm.content" :menus="menus" :uploadImgServer="uploadImgServer" :height="500" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="outline: 0;margin-bottom: 12px;width:100%;position:relative;z-index:0"
                            tabindex="0" @change="onchange" @blur="onBlur">
                        </RichEditor>
                    </div>
                    <div class="contract-temp_txt">
                        <el-form label-width="200px">
                            <!-- <el-form-item label="请选择需要插入的字段：">
                                <el-select v-model="keyValue" value-key='id' placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.id" :label="item.paramName" :value="item">
                                        <span style="float: left">{{ item.paramName }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.select?'必选':'' }}</span>
                                    </el-option>
                                </el-select>
                                <el-button type="primary" style="margin-left:20px" @click="onInsertInfo">插入当前位置</el-button>
                            </el-form-item> -->
                            <el-form-item label="请选择需要插入的字段：">
                                <!-- <el-autocomplete class="inline-input" v-model="insertVal" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" @blur="autocompleteBlur">
                                    <template slot-scope="{ item }">
                                        <span style="float: left">{{ item.paramName }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.select?'必选':'' }}</span>
                                    </template>
                                </el-autocomplete> -->

                                <HAutocomplete :placeholder="'请选择'" :maxlength=60 @back-event="backFindparam" :selectObj="targetObj" :selectArr="restaurants" v-if="restaurants" :remove-value='removeValue' :isSettimeout=false>
                                    <template slot-scope="scope">
                                        <span style="float: left">{{ scope.data.paramName }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{ scope.data.select?'必选':'' }}</span>
                                    </template>
                                </HAutocomplete>

                            </el-form-item>
                            <!-- <el-form-item label="">
                                <el-button type="primary" @click="onInsertInfo">插入当前位置</el-button>
                            </el-form-item> -->
                            <el-form-item label="自定义合同条款：">
                                <el-button type="primary" @click="onShowCustomTermsDefine">插入当前位置</el-button>
                            </el-form-item>
                            <el-form-item label="平台签署区：">
                                <el-button type="primary" @click="onClickCur(2)">插入当前位置</el-button>
                                <span class="ml10 red-word">平台为静默签署</span>
                            </el-form-item>
                            <el-form-item label="客户签署区：">
                                <el-button type="primary" @click="onClickCur(3)">插入当前位置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_head">
                    签署方
                    <h-button type="primary" @click="onClick_Dialog(2)">添加签署方</h-button>
                </div>
                <div v-if="busData.length>0">
                    <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe :column="busLabel" :data="busData" isAction :isActionFixed='false'>
                        <template slot="signatureParam" slot-scope="scope">
                            {{scope.data.row.signatureParam ? scope.data.row.signatureParam.map(item => item.substring(0, item.indexOf('_'))).join(',') : '-'}}
                        </template>
                        <template slot="action" slot-scope="scope">
                            <h-button table @click="onEditP(scope,2)">编辑</h-button>
                            <h-button table @click="onDelete(scope,1)">删除</h-button>
                        </template>
                    </hosJoyTable>
                </div>
                <div v-if="perData.length>0">
                    <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe :column="perLabel" isAction :data="perData" :isActionFixed='false'>
                        <template slot="signatureParam" slot-scope="scope">
                            {{scope.data.row.signatureParam ? scope.data.row.signatureParam.map(item => item.substring(0, item.indexOf('_'))).join(',') : '-'}}
                        </template>
                        <template slot="action" slot-scope="scope">
                            <h-button table @click="onEditP(scope,2)">编辑</h-button>
                            <h-button table @click="onDelete(scope,2)">删除</h-button>
                        </template>
                    </hosJoyTable>
                </div>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_head">
                    平台签署方
                    <h-button type="primary" @click="onClick_Dialog(1)">设置</h-button>
                </div>
                <div v-if="platData.length>0">
                    <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe :column="platLabel" :data="platData" :isAction=false>
                    </hosJoyTable>
                </div>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_head">
                    推荐签署方式
                </div>
                <template>
                    <el-radio v-model="contractForm.recommendSigner" :label=1>电子签</el-radio>
                    <el-radio v-model="contractForm.recommendSigner" :label=2>线下签</el-radio>
                </template>
            </div>
            <div class="page-body-cont">
                <el-button type="default" @click="onCancelTemp">取消修改</el-button>
                <el-button type="primary" @click="onSaveTemp(0)">保存模板</el-button>
                <el-button type="primary" @click="onSaveTemp(1)">保存并启用模板</el-button>
            </div>
        </div>
        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
            <div class="contract-html" v-html="newContent">
            </div>
        </el-drawer>
        <el-dialog title="自定义合同条款" :visible.sync="customTermsDefineVisible" width="450px" :close-on-click-modal=false :before-close="onCancelCustomTerms">
            <el-form :model="customTermsForm" :rules="formRules" ref="customTermsForm">
                <el-form-item label="条款名称" label-width="80px" prop="parameterName">
                    <el-input v-model="customTermsForm.parameterName" autocomplete="off" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="预设内容" label-width="80px" prop="parameterValue">
                    <el-radio-group v-model="customTermsForm.hasDefault">
                        <el-radio :label="1">有内容</el-radio>
                        <el-radio :label="0">无内容</el-radio>
                    </el-radio-group>
                    <el-input type="textarea" v-model="customTermsForm.parameterValue" :maxlength="500" :rows="5" v-if="customTermsForm.hasDefault"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCancelCustomTerms">取 消</el-button>
                <el-button type="primary" @click="onClickCur(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="合同填充字段" :visible.sync="dialogVisible" width="300px" :before-close="handleClose" :close-on-click-modal=false>
            <!-- <el-select v-model="keyValue" value-key='id' placeholder="请选择" style="margin-top:10px">
                <el-option v-for="item in options" :key="item.id" :label="item.paramName" :value="item">
                    <span style="float: left">{{ item.paramName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.select?'必选':'' }}</span>
                </el-option>
            </el-select> -->
            <div style="margin-top:10px">
                <HAutocomplete :placeholder="'请选择'" :maxlength=60 @back-event="backFindparams" :selectObj="targetObjs" :selectArr="restaurants" v-if="restaurants" :remove-value='removeValue' :isSettimeout=false>
                    <template slot-scope="scope">
                        <span style="float: left">{{ scope.data.paramName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ scope.data.select?'必选':'' }}</span>
                    </template>
                </HAutocomplete>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onEditcon">确 定</el-button>
            </span>
        </el-dialog>
        <diffDialog ref="diffDialog"></diffDialog>
        <contractDialog ref="contractDialog" :customSignAll="customSignOptions" :customSignEx="customSignEx" @backEvent=backToTable></contractDialog>
    </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { interfaceUrl } from '@/api/config'
import diffDialog from './components/diffDialog'
import contractDialog from './components/contractDialog'
import { addContractTemp, putContractTemp } from './api/index'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import * as Auths from '@/utils/auth_const'

export default {
    name: 'contractTemp',
    components: { diffDialog, hosJoyTable, contractDialog, HAutocomplete },
    data () {
        return {
            restaurants: [],
            removeValue: true,
            targetObj: {
                selectName: '',
                selectCode: ''
            },
            targetObjs: {
                selectName: '',
                selectCode: ''
            },
            insertVal: '',
            statusArr: [{ key: '1', value: '企业章' }, { key: '3', value: '手绘章' }, { key: '4', value: '模板章' }],
            diffHtml: '',
            // content: '<p>甲方：<input class="inputCont newinput"  ref="newinput" value="newinput"  readonly></p> <p>乙方：</p>',
            content: '',
            newContent: '',
            keyValue: {},
            // eslint-disable-next-line
            _keyValue: {},
            drawer: false,
            contractForm: {
                id: '',
                typeId: '',
                templateNo: '',
                templateName: '',
                status: '', // 状态
                content: '',
                reqParam: [],
                signerSetting: [], // 签署方设置
                operatorBy: '',
                operatorAccount: '',
                recommendSigner: 1,
                describe: '' // 适用情景
            },
            valid_form: {},
            rules: {},
            contract_list: [],
            options: [],
            menus: [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                // 'image', // 插入图片
                // 'table', // 表格
                'undo', // 撤销
                'redo' // 重复
            ],
            customTermsForm: {
                parameterName: '',
                hasDefault: 1,
                parameterValue: ''
            },
            formRules: {
                parameterName: [
                    { required: true, message: '请输入自定义条款名称', trigger: 'blur' }
                ],
                parameterValue: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (this.customTermsForm.hasDefault == 1 && !this.customTermsForm.parameterValue) {
                                return callback(new Error('请输入预设内容'))
                            }
                            return callback()
                        }
                    }
                ]
            },
            dialogVisible: false,
            // 自定义条款自定义弹出层
            customTermsDefineVisible: false,
            busLabel: [
                { label: '签署方', prop: 'signerName' },
                { label: '签署方类型', prop: 'signerType', dicData: [{ value: 1, label: '企业' }, { value: 2, label: '个人' }] },
                { label: '合同企业', prop: 'paramGroupName' },
                { label: '经办人', prop: 'agent' },
                { label: '签署区域', prop: 'signatureParam', slot: 'signatureParam' },
                {
                    label: '签署要求',
                    prop: 'signerDemand',
                    render: (h, scope) => {
                        return <span>{this.findChinese(scope.row.signerDemand)}</span>
                    }
                }
            ],
            busData: [],
            perLabel: [
                { label: '签署方', prop: 'signerName' },
                { label: '签署方类型', prop: 'signerType', dicData: [{ value: 1, label: '企业' }, { value: 2, label: '个人' }] },
                { label: '合同个人', prop: 'paramGroupName' },
                { label: '签署区域', prop: 'signatureParam', slot: 'signatureParam' },
                {
                    label: '签署要求',
                    prop: 'signerDemand',
                    render: (h, scope) => {
                        return <span>{this.findChinese(scope.row.signerDemand)}</span>
                    }
                }
            ],
            perData: [],
            platLabel: [
                { label: '签署方', prop: 'signerName' },
                { label: '签署方类型', prop: 'signerType', dicData: [{ value: 1, label: '企业' }, { value: 2, label: '个人' }] },
                { label: '签署方企业来源', prop: 'signerType', dicData: [{ value: 1, label: '指定企业' }, { value: 2, label: '合同企业' }] },
                { label: '签署方企业名称', prop: 'paramGroupName' },
                {
                    label: '签署要求',
                    prop: 'signerDemand',
                    render: (h, scope) => {
                        return <span>{this.findChinese(scope.row.signerDemand)}</span>
                    }
                }
            ],
            platData: [],
            radio: '',
            bakParams: [],
            newParams: [],
            num: Date.now(), // 最好是个随机的
            edit_index: '',
            customSignOptions: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            tempType: 'contractTemp/tempType',
            tempParams: 'contractTemp/tempParams',
            contractTempdetail: 'contractTemp/contractTempdetail'
        }),
        /* TODO 富文本编辑器 */
        uploadImgServer () {
            return interfaceUrl + 'tms/files/upload-list'
        },
        uploadImgParams () {
            return {
                updateUid: ''
            }
        },
        uploadImgName () {
            return 'multiFile'
        },
        customSignEx () {
            let result = []
            this.perData.forEach(item => {
                result = result.concat(item.signatureParam)
            })
            this.busData.forEach(item => {
                result = result.concat(item.signatureParam)
            })
            return result
        }
    },
    watch: {
        'customTermsForm.hasDefault' (val) {
            if (val == 0) {
                this.customTermsForm.parameterValue = ''
            }
        }
    },
    async mounted () {
        await this.onFindtempType()
        if (this.$route.query.id) {
            this.$nextTick(() => {
                this.findTempDetail(this.$route.query.id)
            })
        }
        this.valid_form = JSON.parse(JSON.stringify(this.contractForm))
        this.$nextTick(() => {
            this.customSignOptions = this.findCustomSignInfo()
        })
    },
    methods: {
        ...mapActions({
            getContratType: 'contractTemp/getContratType',
            getAllparams: 'contractTemp/getAllparams',
            getContratDetail: 'contractTemp/getContratDetail'
            // findCApage: 'contractTemp/findCApage'
        }),
        findCustomSignInfo () {
            return Array.from(document.getElementsByClassName('custom_sign')).map(item => item.value + '_customSign' + item.dataset.number)
        },
        delCustomSign () {
            const newSignInfos = this.findCustomSignInfo()
            // 判断客户签署区是否有被删除的
            const delList = this.customSignOptions.filter(item => {
                return !newSignInfos.includes(item)
            })
            if (delList.length > 0) {
                // 检查被删除的客户签署区是否有关联的客户
                let delSigner = []
                this.perData = this.perData.filter(item => {
                    // 对于签署区有多个情况下，删除其中一个的，保留该签署人
                    // 如果签署人对应的签署区全部被删除，提示签署人被删除
                    item.signatureParam = item.signatureParam.filter(item => !delList.includes(item))
                    if (item.signatureParam.length == 0) {
                        delSigner.push(item)
                    }
                    return item.signatureParam.length != 0
                })
                this.busData = this.busData.filter(item => {
                    item.signatureParam = item.signatureParam.filter(item => !delList.includes(item))
                    if (item.signatureParam.length == 0) {
                        delSigner.push(item)
                    }
                    return item.signatureParam.length != 0
                })
                if (delSigner.length > 0) {
                    this.$alert('由于签署区删除，签署方：' + delSigner.map(item => item.signerName).join(',') + '已经被删除', '提示', {
                        confirmButtonText: '确定'
                    })
                }
            }
            this.customSignOptions = newSignInfos
        },
        onchange () {
            this.domBindMethods()
            this.delCustomSign()
        },
        onBlur () {
            // window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
            // console.log('===', this.$refs.RichEditor.editor)
            // var $p = this.$refs.RichEditor.$txt.find('p').last()
            // var p = $p.get(0)
            // this.$refs.RichEditor.restoreSelectionByElem(p)
        },
        // querySearch (queryString, cb) {
        //     let restaurants = this.restaurants
        //     let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        //     // 调用 callback 返回建议列表的数据
        //     cb(results)
        // },
        // createFilter (queryString) {
        //     return (restaurant) => {
        //         return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
        //     }
        // },
        // handleSelect (item) {
        //     this.keyValue = item
        // },
        // autocompleteBlur (val) {
        //     console.log('val', val)
        //     this.keyValue = this.insertVal
        // },

        // 选中下拉回调
        backFindparam (val) {
            this.keyValue = val.value
            if (this.keyValue) {
                this.onInsertInfo()
            }
        },
        backFindparams (val) {
            this.keyValue = val.value
        },
        findUnique (inputArr) {
            let result = []
            let obj = {}
            for (var i = 0; i < inputArr.length; i++) {
                if (!obj[inputArr[i].id]) {
                    result.push(inputArr[i])
                    obj[inputArr[i].id] = true
                }
            }
            return result
        },
        findChinese (val) {
            // console.log(val)
            const a = val.split(',')
            const cArr = []
            a.forEach(item => {
                cArr.push(this.statusArr.filter(val => val.key == item)[0].value)
            })
            return cArr.toString()
        },
        async onFindtempType () {
            await this.getContratType({
                typeAuth: this.hosAuthCheck(Auths.CONTRACTLIST_TYPE_AUTH) ? '' : 2 // 1确认函
            })
            this.contract_list = this.tempType
        },
        async onChangeparam (val) {
            await this.getAllparams(val)
            this.options = this.tempParams
            // 重组数据
            this.restaurants = JSON.parse(JSON.stringify(this.options))
            this.restaurants.map(item => {
                item.value = item.paramName
                item.selectCode = item.paramKey
            })
        },
        domBindMethods () {
            const inputArr = Array.from(document.getElementById('editor').getElementsByTagName('input'))
            inputArr.length > 0 && inputArr.map(val => {
                if (val.dataset.appId) {
                    val.onclick = (event) => {
                        this.targetObjs = {
                            selectName: event.target.value,
                            selectCode: event.target.className
                        }
                        this._keyValue = event.target.id
                        this.dialogVisible = true
                    }
                } else if (val.className.indexOf('contract_sign_') != -1) {
                    // 自定义合同条款绑定点击事件
                    val.onclick = (event) => {
                        this.$nextTick(() => {
                            this.$refs.customTermsForm.clearValidate()
                        })
                        this.customTermsForm = {
                            parameterName: event.target.value,
                            parameterValue: event.target.dataset.content || '',
                            hasDefault: event.target.dataset.content ? 1 : 0,
                            id: event.target.className
                        }
                        this.customTermsDefineVisible = true
                    }
                }
            })
        },
        onInsertInfo () {
            console.log('🚀 --- onInsertInfo --- this.keyValue', this.keyValue)
            ++this.num
            if (!this.keyValue || !this.keyValue.paramKey) {
                this.$message({
                    message: '请选择所需插入的合同字段',
                    type: 'warning'
                })
                return
            }
            let inputWidth = this.keyValue.paramName.length * 14
            const _temp = `<p><input id="${this.keyValue.paramKey}_${this.num}" class="${this.keyValue.paramKey}" data-app-id="${this.keyValue.id}"
            style="width:${inputWidth}px;"  value="${this.keyValue.paramName}" readonly></input></p>`
            this.$refs.RichEditor.insertHtml(_temp)
            // document.getElementById(`${this.keyValue.paramKey}_${this.num}`).value = this.keyValue.paramName

            // document.getElementsByClassName('newinput')[1].click
            // 这里每次执行插入 把 合同约定的字段插入进去
            this.bakParams.push(this.keyValue)
            document.getElementById(`${this.keyValue.paramKey}_${this.num}`).onclick = (e) => {
                // this._keyValue = JSON.parse(JSON.stringify(this.keyValue))
                this.targetObjs = {
                    selectName: e.target.value,
                    selectCode: e.target.className
                }
                this._keyValue = e.target.id
                this.dialogVisible = true
            }
        },

        onEditcon () {
            ++this.num
            // document.getElementsByClassName(`${this._keyValue.paramKey}`)[0].outerHTML = ''
            // document.getElementById(this._keyValue).outerHTML = ''
            this.$nextTick(() => {
                let curObj = this.tempParams.find(item => item.paramKey === this.targetObjs.selectCode)
                this.keyValue = curObj
                let inputWidth = this.keyValue.paramName.length * 14
                let domObj = document.getElementById(this._keyValue)
                domObj.setAttribute('class', `${this.keyValue.paramKey}`)
                domObj.setAttribute('data-app-id', `${this.keyValue.id}`)
                domObj.style.width = inputWidth + 'px'
                domObj.value = this.keyValue.paramName
                domObj.setAttribute('value', this.keyValue.paramName)
                domObj.setAttribute('id', `${this.keyValue.paramKey}_${this.num}`)

                // const _temp = `<input id="${this.keyValue.paramKey}_${this.num}" class="${this.keyValue.paramKey}" data-app-id="${this.keyValue.id}" style="width:${inputWidth}px;"
                //  value=${this.keyValue.paramName} readonly></input>`
                // this.$refs.RichEditor.insertHtml(_temp)
                this.dialogVisible = false
                document.getElementById(`${this.keyValue.paramKey}_${this.num}`).onclick = (e) => {
                    // this._keyValue = JSON.parse(JSON.stringify(this.keyValue))
                    this.targetObjs = {
                        selectName: e.target.value,
                        selectCode: e.target.className
                    }
                    this._keyValue = e.target.id
                    this.dialogVisible = true
                }
                // 继续插入合同字段  后面  编辑器里面的字段和 所有插入的字段做交集的 如果编辑器里面有多个相同字段  交集的话也不会清除掉
                this.bakParams.push(this.keyValue)
                //
                this.targetObjs = {
                    selectName: '',
                    selectCode: ''
                }
            })
        },
        onPreview () {
            this.drawer = true
        },
        handleClose () {
            this.dialogVisible = false
            this.targetObjs = {
                selectName: '',
                selectCode: ''
            }
        },
        // onContract () {
        //     this.newContent = JSON.parse(JSON.stringify(this.content))
        //     this.options.map(val => {
        //         this.newContent = this.newContent.replace(`{${val.value}}`, this.contractForm[`${val.value}`])
        //     })
        // },

        onFindInputDom () {
            // 把所有的富文本里面的 input 查出来
            const inputArr = Array.from(document.getElementById('editor').getElementsByTagName('input'))
            const reqParam = []
            inputArr.length > 0 && inputArr.map(val => {
                reqParam.push({
                    id: val.dataset.appId,
                    paramKey: val.className
                })
            })
            // 返回 去重后 唯一ID的合同字段
            return this.findUnique(reqParam)
        },
        onShowCustomTermsDefine () {
            this.customTermsDefineVisible = true
            this.customTermsForm.hasDefault = 1
            this.customTermsForm.parameterName = ''
            this.customTermsForm.parameterValue = ''
            this.$nextTick(() => {
                this.$refs.customTermsForm.clearValidate()
            })
        },
        onCancelCustomTerms () {
            this.customTermsDefineVisible = false
            this.customTermsForm.id = ''
        },
        onClickCur (val) {
            ++this.num
            let _temp = ''
            if (val == 1) {
                this.$refs.customTermsForm.validate((valid) => {
                    if (valid) {
                        let inputWidth = this.customTermsForm.parameterName.length * 14
                        if (this.customTermsForm.id) {
                            const editObj = document.getElementById(this.customTermsForm.id)
                            editObj.style.width = inputWidth + 'px'
                            editObj.setAttribute('value', this.customTermsForm.parameterName)
                            editObj.setAttribute('data-content', this.customTermsForm.parameterValue ? this.customTermsForm.parameterValue : '')
                        } else {
                            _temp = `<input id="contract_sign_${this.num}" class="contract_sign_${this.num}" style="width:${inputWidth}px;color: #ff7a45;display: inline-block;height: 22px;min-width: 20px;border: none;text-align: center;margin-right: 3px;border-radius: 5px;cursor: pointer;"
                            value="${this.customTermsForm.parameterName}" data-content="${this.customTermsForm.parameterValue}" readonly></input>`
                            this.$refs.RichEditor.insertHtml(_temp)
                        }
                        this.customTermsDefineVisible = false
                        this.customTermsForm.id = ''
                    }
                })
            } else if (val == 2) {
                // 插入平台签署区
                _temp = `<span><img class='platform_sign' src="https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20201127/ab01c967-3172-4407-aba0-fa60351c19ab.png" style='width:100px;margin:5px;'/></span>`
                this.$refs.RichEditor.insertHtml(_temp)
            } else {
                // 插入客户签署区
                // 获取最大的Number
                const arr = Array.from(document.getElementsByClassName('custom_sign')).map(item => item.dataset.number)
                const nextNum = arr.length > 0 ? Math.max.apply(Math, arr) - 0 + 1 : 1
                _temp = `<span><input class='custom_sign' data-en="customSign${nextNum}" data-number='${nextNum}' style='width:100px;margin:5px;border:1px solid #f00' value="客户签署区${nextNum}" readonly></input>`
                this.$refs.RichEditor.insertHtml(_temp)
            }
            // console.log(document.getElementById('platform_sign'))
        },
        onAllParams () {
            this.newParams = []
            // 校验 input dom
            const paramsArr = this.onFindInputDom()
            const bakParamsArr = this.findUnique(this.bakParams)
            // 取交集 为了 在文本编辑器里面删除了哪些字段 和 入库的字段做唯一对应
            paramsArr && paramsArr.map((val) => {
                bakParamsArr.map(item => {
                    if (val.id == item.id) {
                        this.newParams.push(item)
                    }
                })
            })
        },
        async onClick_Dialog (val) {
            // 保留编辑位置清除 不影响新增
            this.edit_index = -1
            await this.onAllParams()
            this.newParams = this.newParams.filter(val => val.groupName)
            if (val == 1 && this.platData[0]) {
                this.$refs.contractDialog.onShowDialog(val, this.newParams, this.platData[0])
            } else {
                this.$refs.contractDialog.onShowDialog(val, this.newParams)
            }
        },
        backToTable (val, Type) {
            if (Type == 2) {
                if (this.edit_index > -1) {
                    // this.perData.splice(this.edit_index, 1, val[0])
                    this.$set(this.perData, this.edit_index, val[0])
                } else {
                    this.perData = this.perData.concat(val)
                }
            } else if (Type == 1) {
                if (this.edit_index > -1) {
                    // this.busData.splice(this.edit_index, 1, val[0])
                    this.$set(this.busData, this.edit_index, val[0])
                } else {
                    this.busData = this.busData.concat(val)
                }
            } else {
                // this.platData = this.platData.concat(val)
                this.$set(this.platData, 0, val[0])
            }
        },
        // 表格编辑
        async onEditP (val, type) {
            // 获取下拉数据
            await this.onAllParams()
            this.edit_index = val.data.$index
            this.newParams = this.newParams.filter(val => val.groupName)
            this.$refs.contractDialog.onShowDialog(type, this.newParams, val.data.row)
        },
        // 删除
        onDelete (val, type) {
            this.$confirm('是否确认删除该签署方？', '提示', {
                confirmButtonText: '确认删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (type == 1) {
                    this.busData.splice(val.data.$index, 1)
                } else {
                    this.perData.splice(val.data.$index, 1)
                }
            }).catch(() => {

            })
        },
        onCancelTemp () {
            this.contractForm.signerSetting = [...this.busData, ...this.perData, ...this.platData]
            if (JSON.stringify(this.valid_form) == JSON.stringify(this.contractForm)) {
                history.go(-1)
            } else {
                this.$confirm('取消则不会保存当前修改', '提示', {
                    confirmButtonText: '确认取消',
                    cancelButtonText: '我再想想',
                    type: 'warning'
                }).then(() => {
                    history.go(-1)
                }).catch(() => {

                })
            }
        },
        async onSaveTemp (val) {
            const inputArr = Array.from(document.getElementById('editor').getElementsByTagName('input'))
            const reqParam = []
            const signParam = []
            inputArr.length > 0 && inputArr.map(val => {
                if (val.dataset.appId) {
                    reqParam.push({
                        id: val.dataset.appId,
                        paramKey: val.className
                    })
                }
                if (val.className.indexOf('contract_sign_') != -1) {
                    signParam.push({
                        id: '',
                        paramKey: val.className,
                        paramName: val.value,
                        paramValue: val.dataset.content
                    })
                }
            })

            // 这里去给table赋值 style
            let tableobj = document.getElementsByClassName('w-e-text')[0].getElementsByTagName('table')

            console.log(111, tableobj, Array.from(tableobj).length)
            Array.from(tableobj).map(item => {
                console.log(item.getElementsByTagName('tr'))
                Array.from(item.getElementsByTagName('tr')).map(jtem => {
                    jtem.style.border = '1px solid #333'
                })
                Array.from(item.getElementsByTagName('td')).map(jtem => {
                    jtem.style.border = '1px solid #333'
                })
            })

            this.contractForm.content = document.getElementsByClassName('w-e-text')[0].innerHTML
            this.contractForm.operatorBy = this.userInfo.employeeName
            this.contractForm.operatorAccount = this.userInfo.phoneNumber
            this.contractForm.reqParam = [...this.findUnique(reqParam), ...signParam]
            this.contractForm.status = val
            // 必填项校验
            if (!this.contractForm.templateName) {
                this.$message({
                    message: '请填写模板名称',
                    type: 'warning'
                })
                return
            }
            if (!this.contractForm.typeId) {
                this.$message({
                    message: '请选择合同类型',
                    type: 'warning'
                })
                return
            }
            if (!this.contractForm.describe) {
                this.$message({
                    message: '合同模板适用情景不得为空',
                    type: 'warning'
                })
                return
            }
            if (val == 1) {
                if (!document.getElementsByClassName('platform_sign')[0]) {
                    this.$message({
                        message: '请插入一处平台签署区',
                        type: 'warning'
                    })
                    return
                }
                if (this.busData.length == 0 && this.perData.length == 0) {
                    this.$message({
                        message: '请至少添加一个签署方',
                        type: 'warning'
                    })
                    return
                }
                if (this.platData.length == 0) {
                    this.$message({
                        message: '请设置平台签署方',
                        type: 'warning'
                    })
                    return
                }
                // 保存并启用的时候，校验签署区是否都关联到了签署方
                if (this.customSignEx.length < this.customSignOptions.length) {
                    this.$message({
                        message: '尚存在签署区未关联签署方，请检查配置',
                        type: 'warning'
                    })
                    return
                }
            }
            let _tableset = JSON.parse(JSON.stringify([...this.busData, ...this.perData, ...this.platData]))
            console.log(this.busData, this.perData)
            // 调整关联签署区，选择的时候是包含中英文的，提交的时候只要提交英文的就好
            _tableset = _tableset.map(item => {
                item.signatureParam = item.signatureParam ? item.signatureParam.map(i => i.substr(i.indexOf('_') + 1)) : []
                return item
            })
            this.contractForm.signerSetting = _tableset
            if (!this.$route.query.id) {
                try {
                    await addContractTemp(this.contractForm)
                    this.$message({
                        message: '新增合同模板成功',
                        type: 'success'
                    })
                    this.$router.push({ path: '/goodwork/contractlist' })
                } catch (error) {

                }
            } else {
                if (this.$route.query.type == 'copy') {
                    // 复制
                    this.contractForm.templateNo = ''
                    this.contractForm.id = ''
                    try {
                        await addContractTemp(this.contractForm)
                        this.$message({
                            message: '复制合同模板成功',
                            type: 'success'
                        })
                        this.$router.push({ path: '/goodwork/contractlist' })
                    } catch (error) {

                    }
                } else {
                    try {
                        await putContractTemp(this.contractForm)
                        this.$message({
                            message: '修改合同模板成功',
                            type: 'success'
                        })
                        this.$router.push({ path: '/goodwork/contractlist' })
                    } catch (error) {

                    }
                }
            }
        },

        async findTempDetail (val) {
            await this.getContratDetail(val)
            // 编辑时候 把 插入的合同字段 重新复制一份 bakParams
            this.bakParams = this.contractTempdetail.param && this.contractTempdetail.param.filter(val => val.id)
            this.contractForm = { ...this.contractForm, ...this.contractTempdetail }
            // 复制一份
            this.valid_form = JSON.parse(JSON.stringify(this.contractForm))
            // 复制模板
            // 签署方 type=2
            let singerArr = []
            // 对签署区域做处理，数据库只存储了英文名，调整成中英文
            singerArr = this.contractTempdetail.signerSetting.filter((val) => val.type == 2).map(item => {
                // 兼容老数据
                if (item.signatureParam) {
                    item.signatureParam = item.signatureParam.map(i => i.replace(/(customSign)(\d)/, '客户签署区$2_$1$2'))
                }
                return item
            })
            this.busData = singerArr.filter(val => val.signerType == 1)
            this.perData = singerArr.filter(val => val.signerType == 2)
            this.platData = this.contractTempdetail.signerSetting.filter((val) => val.type == 1)

            // 获取合同类型约定字段
            this.onChangeparam(this.contractForm.typeId)
            // 绑定click
            this.$nextTick(() => {
                const inputArr = Array.from(document.getElementById('editor').getElementsByTagName('input'))
                inputArr.length > 0 && inputArr.map(val => {
                    if (val.dataset.appId) {
                        document.getElementById(val.id).onclick = () => {
                            this.targetObjs = {
                                selectName: val.value,
                                selectCode: val.className
                            }
                            // this._keyValue = JSON.parse(JSON.stringify(keyValue))
                            this._keyValue = val.id
                            this.dialogVisible = true
                        }
                    }
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-form .el-input {
    width: 270px;
}
.contract-temp_scenario {
    /deep/.el-textarea {
        width: 400px;
    }
}
.contract-temp {
    &_flex {
        display: flex;
        .el-input {
            width: 180px;
        }
    }
    &_title {
        font-size: 20px;
    }
    &_rich {
        margin-top: 20px;
        flex: 1;
    }
    &_txt {
        width: 700px;
    }
    ._flex {
        display: flex;
        justify-content: space-around;
    }
    &_head {
        margin-bottom: 10px;
    }
}
.page-body-cont {
    margin-bottom: 10px;
}
/deep/.w-e-text-container {
    z-index: 100 !important;
}
/deep/#editor input {
    color: #ff7a45;
    display: inline-block;
    height: 22px;
    min-width: 20px;
    // max-width: 100px;
    // background: #efeeee;
    border: none;
    text-align: center;
    margin-right: 3px;
    border-radius: 5px;
    cursor: pointer;
}
.mention {
    background: rgba(0, 0, 0, 0.1);
    font-size: 0.8rem;
    font-weight: 700;
    border-radius: 5px;
    padding: 0.2rem 0.5rem;
    white-space: nowrap;
}
/deep/.el-select-dropdown {
    z-index: 20000 !important;
}
/deep/.w-e-toolbar {
    z-index: 500 !important;
}
/deep/.w-e-menu {
    z-index: 500 !important;
}
/deep/.hosjoy-table {
    background: #e5e5e5 !important;
}
/deep/.w-e-text p {
    word-break: break-all;
}
/deep/.contract-temp_set .el-input {
    width: 400px;
}
</style>
