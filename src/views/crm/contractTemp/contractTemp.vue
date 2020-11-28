<template>
    <div class="page-body B2b">
        <div class="contract-temp  page-component__scroll">
            <div class="page-body-cont">
                <div class="contract-temp_title" v-if="!$route.query.id&&!$route.query.type">新增合同模版</div>
                <div class="contract-temp_title" v-if="$route.query.id&&!$route.query.type">编辑合同模版</div>
                <div class="contract-temp_title" v-if="$route.query.type&&$route.query.id">复制合同模版</div>
            </div>
            <div class="page-body-cont ">
                <div class="contract-temp_name">合同模版设置</div>
                <el-form ref="contractForm" :model="contractForm" label-width="">
                    <el-form-item label="模版名称：" class="contract-temp_set">
                        <el-input v-model="contractForm.templateName" placeholder="请输入" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="合同类型：">
                        <el-select v-model="contractForm.typeId" placeholder="请选择" @change="onChangeparam" :disabled='!!contractForm.typeId'>
                            <el-option v-for="item in contract_list" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_name">合同模版内容</div>
                <div class="contract-temp_flex">
                    <div class="contract-temp_rich">
                        <RichEditor ref="RichEditor" v-model="contractForm.content" :menus="menus" :uploadImgServer="uploadImgServer" :height="500" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%" @change="onchange"></RichEditor>
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
                            <el-form-item label="">
                                <el-button type="primary" @click="onInsertInfo">插入当前位置</el-button>
                            </el-form-item>
                            <el-form-item label="自定义合同条款：">
                                <el-button type="primary" @click="onClickCur(1)">插入当前位置</el-button>
                            </el-form-item>
                            <el-form-item label="平台签署区：">
                                <el-button type="primary" @click="onClickCur(2)">插入当前位置</el-button>
                                <span class="ml10 red-word">平台为静默签署</span>
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
                        <template slot="action" slot-scope="scope">
                            <h-button table @click="onEditP(scope,2)">编辑</h-button>
                            <h-button table @click="onDelete(scope,1)">删除</h-button>
                        </template>
                    </hosJoyTable>
                </div>
                <div v-if="perData.length>0">
                    <hosJoyTable isShowIndex ref="hosjoyTable" align="center" border stripe :column="perLabel" isAction :data="perData" :isActionFixed='false'>
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
                <el-button type="primary" @click="onSaveTemp(1)">保存并启用模版</el-button>
            </div>
        </div>
        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
            <div class="contract-html" v-html="newContent">
            </div>
        </el-drawer>
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
        <contractDialog ref="contractDialog" @backEvent=backToTable></contractDialog>
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
                recommendSigner: 1

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
            form: {

            },
            dialogVisible: false,
            busLabel: [
                { label: '签署方', prop: 'signerName' },
                { label: '签署方类型', prop: 'signerType', dicData: [{ value: 1, label: '企业' }, { value: 2, label: '个人' }] },
                { label: '合同企业', prop: 'paramGroupName' },
                { label: '经办人', prop: 'agent' },
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
                { label: '签署企业', prop: 'paramGroupName' },
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
            edit_index: ''
        }
    },
    async mounted () {
        await this.onFindtempType()
        if (this.$route.query.id) {
            this.findTempDetail(this.$route.query.id)
        }
        this.valid_form = JSON.parse(JSON.stringify(this.contractForm))
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
        }
    },
    methods: {
        ...mapActions({
            getContratType: 'contractTemp/getContratType',
            getAllparams: 'contractTemp/getAllparams',
            getContratDetail: 'contractTemp/getContratDetail'
            // findCApage: 'contractTemp/findCApage'
        }),
        onchange () {
            this.domBindMethods()
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
        backFindparam (val) {
            this.keyValue = val.value
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
            await this.getContratType()
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
                }
            })
        },
        onInsertInfo () {
            ++this.num
            console.log(this.keyValue)
            if (!this.keyValue || !this.keyValue.paramKey) {
                this.$message({
                    message: '请选择所需插入的合同字段',
                    type: 'warning'
                })
                return
            }
            let inputWidth = this.keyValue.paramName.length * 14
            const _temp = `<span><input id="${this.keyValue.paramKey}_${this.num}" class="${this.keyValue.paramKey}" data-app-id="${this.keyValue.id}"  
            style="width:${inputWidth}px;"  value="${this.keyValue.paramName}" readonly></input></span>`
            this.$refs.RichEditor.insertHtml(_temp)
            // document.getElementById(`${this.keyValue.paramKey}_${this.num}`).value = this.keyValue.paramName

            // document.getElementsByClassName('newinput')[1].click
            // 这里每次执行插入 把 合同约定的字段插入进去
            this.bakParams.push(this.keyValue)
            document.getElementById(`${this.keyValue.paramKey}_${this.num}`).onclick = (e) => {
                console.log('我测试一下', e.target)
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
                let inputWidth = this.keyValue.paramName.length * 14
                document.getElementById(this._keyValue).setAttribute('class', `${this.keyValue.paramKey}`)
                document.getElementById(this._keyValue).setAttribute('data-app-id', `${this.keyValue.id}`)
                document.getElementById(this._keyValue).style.width = inputWidth + 'px'
                document.getElementById(this._keyValue).value = this.keyValue.paramName
                document.getElementById(this._keyValue).setAttribute('value', this.keyValue.paramName)
                document.getElementById(this._keyValue).setAttribute('id', `${this.keyValue.paramKey}_${this.num}`)

                // const _temp = `<input id="${this.keyValue.paramKey}_${this.num}" class="${this.keyValue.paramKey}" data-app-id="${this.keyValue.id}" style="width:${inputWidth}px;"
                //  value=${this.keyValue.paramName} readonly></input>`
                // this.$refs.RichEditor.insertHtml(_temp)
                this.dialogVisible = false
                document.getElementById(`${this.keyValue.paramKey}_${this.num}`).onclick = (e) => {
                    // this._keyValue = JSON.parse(JSON.stringify(this.keyValue))
                    console.log('我测试一下1', e.target)
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
            console.log('inputArr', inputArr)
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
        onClickCur (val) {
            ++this.num
            let _temp = ''
            if (val == 1) {
                _temp = `<input class="contract_sign_${this.num}"  style="width:97px;color: #ff7a45;display: inline-block;height: 22px;min-width: 20px;border: none;text-align: center;margin-right: 3px;border-radius: 5px;cursor: pointer;"  
                value="自定义合同条款" readonly></input>`
            } else {
                // if (document.getElementById('platform_sign')) {
                //     this.$message({
                //         message: '只能插入一处平台签署区',
                //         type: 'warning'
                //     })
                //     return
                // }
                _temp = `<span><img class='platform_sign' style='width:100px;margin:5px;' src="https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20201127/ab01c967-3172-4407-aba0-fa60351c19ab.png"/></span>`
            }
            // console.log(document.getElementById('platform_sign'))

            this.$refs.RichEditor.insertHtml(_temp)
        },
        onAllParams () {
            this.newParams = []
            // 校验 input dom
            const paramsArr = this.onFindInputDom()
            const bakParamsArr = this.findUnique(this.bakParams)
            console.log('交集', paramsArr, bakParamsArr)
            // 取交集 为了 在文本编辑器里面删除了哪些字段 和 入库的字段做唯一对应
            paramsArr && paramsArr.map((val) => {
                bakParamsArr.map(item => {
                    if (val.id == item.id) {
                        console.log(1, item)
                        this.newParams.push(item)
                    }
                })
            })
            console.log('this.newParams', this.newParams)
        },
        async onClick_Dialog (val) {
            // 保留编辑位置清除 不影响新增
            this.edit_index = -1
            await this.onAllParams()
            console.log('this.newParams2', this.newParams)
            this.newParams = this.newParams.filter(val => val.groupName)
            if (val == 1 && this.platData[0]) {
                this.$refs.contractDialog.onShowDialog(val, this.newParams, this.platData[0])
            } else {
                this.$refs.contractDialog.onShowDialog(val, this.newParams)
            }
        },
        backToTable (val, Type) {
            console.log('===', val, Type)
            if (Type == 2) {
                if (this.edit_index > -1) {
                    // this.perData.splice(this.edit_index, 1, val[0])
                    this.$set(this.perData, this.edit_index, val[0])
                    console.log('触发这里', this.perData)
                } else {
                    this.perData = this.perData.concat(val)
                }
            } else if (Type == 1) {
                if (this.edit_index > -1) {
                    // this.busData.splice(this.edit_index, 1, val[0])
                    this.$set(this.busData, this.edit_index, val[0])
                    console.log('触发这里1', this.busData)
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
            console.log('edit_index', this.edit_index)
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
                        paramKey: val.className
                    })
                }
            })
            this.contractForm.content = document.getElementsByClassName('w-e-text')[0].innerHTML
            this.contractForm.operatorBy = this.userInfo.employeeName
            this.contractForm.operatorAccount = this.userInfo.phoneNumber
            this.contractForm.reqParam = [...this.findUnique(reqParam), ...signParam]
            this.contractForm.status = val
            // 必填项校验
            if (!this.contractForm.templateName) {
                this.$message({
                    message: '请填写模版名称',
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

            if (val == 1) {
                // if (this.contractForm.reqParam.length == 0) {
                //     this.$message({
                //         message: '请至少添加一个合同字段',
                //         type: 'warning'
                //     })
                //     return
                // }
                if (!document.getElementsByClassName('platform_sign')) {
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
            }

            this.contractForm.signerSetting = [...this.busData, ...this.perData, ...this.platData]
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
            singerArr = this.contractTempdetail.signerSetting.filter((val) => val.type == 2)
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