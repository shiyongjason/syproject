<template>
    <div>
        <div class="page-body">
            <h3 v-if="!propsParams.methods">新建服务资源</h3>
            <h3 v-if="propsParams.methods === 'details'">服务资源详情</h3>
            <h3 v-if="propsParams.methods === 'edit'">修改服务资源</h3>
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title"><span class="red">*</span>资源模板名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="20" v-model="message.name" placeholder="请输入" @blur="nameChange" :disabled="pageDisabled">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title"><span class="red">*</span>资源类目：</div>
                    <div class="flex-wrap-cont">
                        <el-cascader
                            :disabled="pageDisabled || propsParams.methods === 'edit'"
                            v-model="message.categoryId"
                            :options="doneServiceCategoryList"
                           ></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">说明：</div>
                    <div class="flex-wrap-cont">
                       <el-input maxlength="100" v-model="message.description" :disabled="pageDisabled"></el-input>
                    </div>
                </div>
                <div class="query-cont-col" v-if="propsParams.methods === 'edit'">
                    <div class="flex-wrap-title">资源模板编号：</div>
                    <div class="flex-wrap-cont">
                       <el-input maxlength="100" v-model="propsParams.templateId" disabled ></el-input>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <h3 class="add-btn title">
                    资源规格
                </h3>
                <el-form :disabled="propsParams.methods === 'edit'" :model="form" :rules="rules" ref="form" label-width="100px">
                    <div class="row" v-for="(item,idx) in form.serviceResourceList" :key="item.id">
                        <span v-if="!pageDisabled && propsParams.methods !== 'edit'" @click.prevent="removeServiceResourceList(idx)" class="ml10 el-icon-remove-outline parent-delete form-add-remove"></span>
                        <el-form-item label="规格名" :prop="'serviceResourceList.'+ idx + '.name'"
                                      :rules="[
                                      { required: true, whitespace: true, trigger: 'blur', message: '请输入规格名' },
                                      {validator: checkFormValue,trigger: 'blur', whitespace: true}]"
                        >
                            <el-autocomplete
                                v-model="item.name"
                                :fetch-suggestions="querySearchAsyncName"
                                :maxlength="20"
                                @blur="attributeChangeHandler"
                                placeholder="请输入规格名"
                                @select="attributeChangeHandler"
                            ></el-autocomplete>
<!--                            <el-input type="text" v-model="item.name" maxlength="20"  @blur="attributeChangeHandler" :disabled="pageDisabled"></el-input>-->
                        </el-form-item>
                        <div v-show="item.name.trim().length> 0">
                            <el-form-item  :label="index === 0 ? '规格值': ''" v-for="(subItem,index) in item.attributeList" :key="subItem.id" class="attribute-list"
                                           :prop="'serviceResourceList.'+ idx +'.attributeList.'+ index + '.value'"
                                           :rules="[{ required: true, whitespace: true, trigger: 'blur', message: '请输入规格值' },
                                      {validator: checkFormValue,trigger: 'blur', whitespace: true}]">
                                <el-autocomplete
                                    v-model="subItem.value"
                                    :fetch-suggestions="querySearchAsyncValue"
                                    :maxlength="20"
                                    @blur="attributeChangeHandler"
                                    placeholder="请输入规格名"
                                    @select="attributeChangeHandler"
                                    :disabled="pageDisabled"
                                ></el-autocomplete>
<!--                                <el-input type="text" v-model="subItem.value" maxlength="20" @blur="attributeChangeHandler" :disabled="pageDisabled"></el-input>-->
                                <span @click.prevent="removeAttributeList(item,index)" class="ml10 el-icon-remove-outline form-add-remove" v-show="(!pageDisabled && item.attributeList.length > 1) && propsParams.methods !== 'edit'"></span>
                                <span  v-if="!pageDisabled && propsParams.methods !== 'edit'" @click.prevent="addAttributeList(item)" class="ml10 el-icon-circle-plus-outline form-add-remove"></span>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="add">
                        <el-button type="primary" size="mini" @click="addSpecification" v-if="!pageDisabled && propsParams.methods !== 'edit'">添加规格名</el-button>
                    </div>
                </el-form>
                <h3 class="detailed-title title" v-show="attributeTable.list.length> 0">
                    规格明细
                    <!--<el-button type="primary" size="mini"  class="right" @click="onClose">一键关闭</el-button>-->
                </h3>
                <el-form :model="attributeTable" ref="formAttribute">
                    <div class="details" v-show="attributeTable.list.length> 0">
                        <table>
                            <tr>
                                <th v-for="(item,index) in serviceResourceName" :key="index" v-text="item.name"></th>
                                <th>资源名称</th>
                                <th width="170px">关联MDM编码</th>
                                <th>是否可用</th>
                            </tr>
                            <tr v-for="(item,index) in attributeTable.list" :key="index">
                                <td v-for="(subItem,idx) in item.attributeList" :key="idx" v-text="subItem.value"></td>
                                <td v-text="item.name"></td>
                                <td>
                                    <el-form-item :prop="'list.'+ index +'.mdmCode'"
                                                  :rules="[{ required: item.isDisable, whitespace: true, trigger: 'blur', message: '请输入mdmCode' }
                                                  ,{ required: true, whitespace: true,validator: checkedMdmCodeReport, trigger: 'blur', message: 'mdmCode重复' }]" class="mdm-number">
                                        <el-input maxlength="20" class="input" type="text" v-model="item.mdmCode" :disabled="pageDisabled"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-switch
                                        v-model="item.isDisable"
                                        :disabled="pageDisabled"
                                        @change="clearError(item.isDisable)"
                                        active-color="#13ce66"
                                        inactive-color="#DCDFE6">
                                    </el-switch>
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-form>
                <div class="btn-group">
                    <el-button type="primary" class="ml20" @click="onSave" v-if="!pageDisabled && !propsParams.methods">保存</el-button>
                    <el-button type="primary" class="ml20" @click="editSave" v-if="!pageDisabled  && propsParams.methods === 'edit'">保存</el-button>
                    <el-button type="primary" class="ml20" @click="onCancel" v-if="!pageDisabled">取消</el-button>
                    <el-button type="primary" class="ml20" @click="onCancel"  v-if="pageDisabled">关闭</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { deepCopy } from '../../../utils/utils'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { createServiceResourcesTemplate, updateServiceResourcesTemplate } from '../api/index'

export default {
    name: 'addOrEditOrDetails',
    data () {
        return {
            pageDisabled: false,
            message: {
                categoryId: [],
                description: '',
                name: ''
            },
            oldMessageName: '',
            form: {
                serviceResourceList: []
            },
            formAttribute: {

            },
            rules: {},
            options: [],
            defaultAttribute: {
                value: ''
            },
            defaultSpecification: {
                name: '',
                attributeList: [{ value: '' }]
            },
            attributeTable: { list: [] },
            serviceResourceName: [],
            tempAttributeTable: [],
            propsParams: '',
            attributeListName: [],
            attributeListValue: [],
            timeout: null
        }
    },
    computed: {
        ...mapGetters(['doneServiceCategoryList', 'doneServiceTemplateDetails', 'doneServiceResourceAttribute']),
        ...mapState({
            tagsList: state => state.layout.tagsList
        })
    },
    methods: {
        ...mapMutations({
            tagUpdate: 'TAG_UPDATE'
        }),
        querySearchAsyncName (queryString, cb) {
            const restaurants = this.attributeListName
            const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            cb(results)
        },
        querySearchAsyncValue (queryString, cb) {
            const restaurants = this.attributeListValue
            const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            cb(results)
        },
        createStateFilter (queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
            }
        },
        clearError (isDisabled) {
            if (isDisabled) {
                this.$refs.formAttribute.clearValidate()
            }
        },
        checkedMdmCodeReport (rule, value, callback) {
            if (!value) {
                callback()
                return
            }
            let temp = 0
            this.attributeTable.list.forEach(value1 => {
                if (value1.mdmCode === value) temp++
            })
            if (temp > 1) {
                callback(new Error('msm编码重复'))
            } else {
                callback()
            }
        },
        closeTags () {
            this.tagsList.some((item, index) => {
                if (item.path === (this.$route.fullPath).split('?')[0]) {
                    this.tagsList.splice(index, 1)
                    return true
                }
            })
            this.tagUpdate(this.tagsList)
        },
        nameChange () {
            if (this.message.name.trim()) {
                this.attributeTable.list.forEach(value => {
                    value.name = this.message.name + value.name.replace(this.oldMessageName, '')
                })
            }
            this.oldMessageName = this.message.name
        },
        resetAttribute () {
            let tempAll = []
            this.form.serviceResourceList.forEach(value => {
                let temp = deepCopy(value.attributeList.map(value2 => {
                    return {
                        value: value2.value,
                        mdmCode: value2.mdmCode,
                        isDisable: value2.isDisable,
                        key: value.name
                    }
                }))
                tempAll.push(temp)
            })
            let temp = []
            if (tempAll.length < 2) {
                tempAll[0] && tempAll[0].forEach(value => {
                    temp.push([value])
                })
            } else {
                temp = this.calcDescartes(tempAll)
            }
            this.attributeTable.list = temp.map(value => {
                let totalName = this.message.name
                value.forEach(value1 => {
                    totalName += ('(' + value1.value + ')')
                })
                return {
                    attributeList: value,
                    name: totalName
                }
            })
            if (this.propsParams.methods === 'edit' || this.propsParams.methods === 'details') {
                this.attributeTable.list.forEach((value1, index) => {
                    this.tempAttributeTable.forEach(value2 => {
                        if (value2.name.indexOf(value1.name) > -1) {
                            this.$set(this.attributeTable.list[index], `mdmCode`, value2.mdmCode)
                            this.$set(this.attributeTable.list[index], `isDisable`, value2.isDisable === 0)
                        }
                    })
                })
            }
        },
        attributeTableThUpdate () {
            let serviceResourceName = []
            this.form.serviceResourceList.forEach(value => {
                serviceResourceName.push({
                    name: value.name
                })
            })
            this.serviceResourceName = serviceResourceName
        },
        attributeChangeHandler () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.attributeTableThUpdate()
                    this.resetAttribute()
                }
            })
        },
        calcDescartes (array) {
            if (array.length < 2) return array || []
            return [].reduce.call(array, function (col, set) {
                const res = []
                col.forEach(function (c) {
                    set.forEach(function (s) {
                        const t = [].concat(Array.isArray(c) ? c : [c])
                        t.push(s)
                        res.push(t)
                    })
                })
                return res
            })
        },
        checkFormValue (rule, value, callback) {
            const deepLenArr = rule.field.match(/\d/g)
            let count = 0
            if (deepLenArr.length === 1) {
                this.form.serviceResourceList.forEach(val => {
                    if (val.name === value) count++
                })
                if (count > 1) return callback(new Error('规格名重复'))
            } else if (deepLenArr.length === 2) {
                this.form.serviceResourceList[deepLenArr[0]].attributeList.forEach(val => {
                    if (val.value === value) count++
                })
                if (count > 1) return callback(new Error('规格值重复'))
            }
            return callback()
        },
        checkValidate () {
            let temp = false
            if (this.message.name.trim().length < 1) {
                this.$message({
                    type: 'error',
                    message: '资源模板名称不能为空'
                })
                temp = true
            }
            if (this.message.categoryId.length < 2) {
                this.$message({
                    type: 'error',
                    message: '资源类目必须为三级类目'
                })
                temp = true
            }
            return temp
        },
        onSave () {
            if (this.checkValidate()) return
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.$refs['formAttribute'].validate(async (valid1) => {
                        if (valid1) {
                            const params = { ...this.message }
                            params.categoryId = params.categoryId[params.categoryId.length - 1]
                            params.serviceResourceList = this.attributeTable.list.map(value => {
                                return {
                                    name: params.name + value.name,
                                    mdmCode: value.mdmCode,
                                    isDisable: value.isDisable == true ? 0 : 1,
                                    attributeList: value.attributeList
                                }
                            })
                            try {
                                await createServiceResourcesTemplate(params)
                                this.onCancel()
                            } catch (e) {}
                        }
                    })
                }
            })
        },
        editSave () {
            if (this.checkValidate()) return
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.$refs['formAttribute'].validate(async (valid1) => {
                        if (valid1) {
                            const params = { ...this.message }
                            params.categoryId = params.categoryId[params.categoryId.length - 1]
                            params.serviceResourceList = this.attributeTable.list.map(value => {
                                return {
                                    name: value.name,
                                    mdmCode: value.mdmCode,
                                    isDisable: value.isDisable == true ? 0 : 1,
                                    attributeList: value.attributeList
                                }
                            })
                            try {
                                await updateServiceResourcesTemplate(this.propsParams.templateId, params)
                                this.onCancel()
                            } catch (e) {}
                        }
                    })
                }
            })
        },
        onCancel () {
            history.go(-1)
            this.closeTags()
        },
        addSpecification () {
            if (this.form.serviceResourceList.length > 9) {
                this.$message({
                    type: 'error',
                    message: '规格项不能超过10个'
                })
            }
            const temp = deepCopy(this.defaultSpecification)
            this.form.serviceResourceList.push(temp)
        },
        removeServiceResourceList (index) {
            this.form.serviceResourceList.splice(index, 1)
            this.attributeTableThUpdate()
            this.resetAttribute()
        },
        removeAttributeList (item, index) {
            let temp = !(item[index] && item[index].value)
            item.attributeList.splice(index, 1)
            if (temp) this.resetAttribute()
        },
        addAttributeList (item) {
            console.log(item)
            const temp = { ...this.defaultAttribute }
            if (item.attributeList.length > 9) {
                this.$message({
                    type: 'error',
                    message: '规格值不能超过10个'
                })
                return
            }
            item.attributeList.push(temp)
        },
        async drawDetails (templateId) {
            await this.getServiceResourcesTemplateDetails(templateId)
            const data = this.doneServiceTemplateDetails
            let categoryId = data.serviceResourceTemplate.categoryId
            this.doneServiceCategoryList.forEach(value => {
                value.children && value.children.forEach(value1 => {
                    value1.children && value1.children.forEach(value12 => {
                        if (value12.value === categoryId) {
                            categoryId = [value.value, value1.value, value12.value]
                        }
                    })
                })
            })
            this.oldMessageName = data.serviceResourceTemplate.name
            this.message = {
                name: data.serviceResourceTemplate.name,
                categoryId: categoryId,
                description: data.serviceResourceTemplate.description
            }
            this.tempAttributeTable = this.doneServiceTemplateDetails.serviceResourceList
            const serviceResourceList = []
            const keyList = [...new Set(this.doneServiceTemplateDetails.attributeList.map(item => item.key))]
            keyList.forEach(val => {
                const tempObj = { name: val }
                let temp = []
                this.doneServiceTemplateDetails.attributeList.forEach(value => {
                    if (val === value.key) {
                        temp.push(value)
                    }
                })
                tempObj.attributeList = temp
                serviceResourceList.push(tempObj)
            })
            this.form.serviceResourceList = serviceResourceList
            this.attributeChangeHandler()
        },
        ...mapActions(['findServiceResourcesCategory', 'getServiceResourcesTemplateDetails', 'getServiceResourcesAttribute'])
    },
    async mounted () {
        this.propsParams = this.$route.query
        if (!this.propsParams.methods) {
            this.findServiceResourcesCategory()
        } else {
            await this.findServiceResourcesCategory()
        }
        if (this.propsParams.methods === 'details') {
            this.drawDetails(this.propsParams.templateId)
            this.pageDisabled = true
        } else if (this.propsParams.methods === 'edit') {
            this.drawDetails(this.propsParams.templateId)
        }
        await this.getServiceResourcesAttribute()
        const data = this.doneServiceResourceAttribute
        this.attributeListName = data.attributeList.map(value => {
            return { value: value }
        })
        this.attributeListValue = data.valueList.map(value => {
            return { value: value }
        })
    }
}
</script>

<style scoped lang="scss">
    h3{
        padding: 20px;
    }
    .form-add-remove {
        font-size: 22px;
        color: #ff9c31;
        cursor: pointer;
        line-height: 40px;
        vertical-align: top;
    }
    .title{
        max-width: 700px;
    }
    .row {
        border-bottom: 1px solid #DCDFE6;
        padding-bottom: 20px;
        padding-top: 20px;
        position: relative;
    }
    .row:first-child{
        border-top: 1px solid #DCDFE6;
    }
    .right{
        float: right;
    }
    .details{
        border-top: 1px solid #DCDFE6;
        padding-top: 20px;
        table{
            border-collapse: collapse;
            border: 1px solid #DCDFE6;
            width: 800px;
            text-align: center;
            th, td{
                border: 1px solid #DCDFE6;
                padding: 20px 5px;
            }

        }
    }
    .mdm-number {
        width: 150px;
        margin: auto;
        .input{
            width: 100%;
        }
    }
    .attribute-list {
        margin-bottom: 25px;
    }
    .btn-group {
        padding: 40px 0;
        max-width: 750px;
        text-align: center;
    }
    .add {
        padding-top: 20px;
        margin-left: 40px;
    }
    .parent-delete {
        position: absolute;
        left: 0;
        top: 0;
    }
</style>
