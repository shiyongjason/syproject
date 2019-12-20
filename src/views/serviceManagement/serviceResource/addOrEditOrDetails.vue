<template>
    <div>
        <div class="page-body">
            <h3>新建服务资源</h3>
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title"><span class="red">*</span>资源模板名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="20" v-model="message.name" placeholder="请输入" @blur="nameChange">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title"><span class="red">*</span>资源类目：</div>
                    <div class="flex-wrap-cont">
                        <el-cascader
                            v-model="message.categoryId"
                            :options="doneServiceCategoryList"
                           ></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">说明：</div>
                    <div class="flex-wrap-cont">
                       <el-input v-model="message.description"></el-input>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <h3 class="add-btn title">
                    资源规格
                </h3>
                <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <div class="row" v-for="(item,idx) in form.serviceResourceList" :key="item.id">
                        <span @click.prevent="removeServiceResourceList(idx)" class="ml10 el-icon-remove-outline parent-delete form-add-remove"></span>
                        <el-form-item label="规格名" :prop="'serviceResourceList.'+ idx + '.name'"
                                      :rules="[
                                      { required: true, whitespace: true, trigger: 'blur', message: '请输入规格名' },
                                      {validator: checkFormValue,trigger: 'blur', whitespace: true}]"
                        >
                            <el-input type="text" v-model="item.name" max-length="20"  @blur="attributeChangeHandler"></el-input>
                        </el-form-item>
                        <div v-show="item.name.trim().length> 0">
                            <el-form-item  :label="index === 0 ? '规格值': ''" v-for="(subItem,index) in item.attributeList" :key="subItem.id" class="attribute-list"
                                           :prop="'serviceResourceList.'+ idx +'.attributeList.'+ index + '.value'"
                                           :rules="[{ required: true, whitespace: true, trigger: 'blur', message: '请输入规格值' },
                                      {validator: checkFormValue,trigger: 'blur', whitespace: true}]">
                                <el-input type="text" v-model="subItem.value" max-length="20" @blur="attributeChangeHandler"></el-input>
                                <span @click.prevent="removeAttributeList(item,index)" class="ml10 el-icon-remove-outline form-add-remove" v-show="item.attributeList.length > 1"></span>
                                <span @click.prevent="addAttributeList(item)" class="ml10 el-icon-circle-plus-outline form-add-remove"></span>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="add">
                        <el-button type="primary" size="mini" @click="addSpecification">添加规格值</el-button>
                    </div>
                </el-form>
                <h3 class="detailed-title title" v-show="attributeTable.length> 0">
                    规格明细
                    <!--<el-button type="primary" size="mini"  class="right" @click="onClose">一键关闭</el-button>-->
                </h3>
                <div class="details" v-show="attributeTable.length> 0">
                    <table>
                        <tr>
                            <th v-for="(item,index) in serviceResourceName" :key="index" v-text="item.name"></th>
                            <th>资源名称</th>
                            <th>关联MDM编码</th>
                            <th>是否可用</th>
                        </tr>
                        <tr v-for="(item,index) in attributeTable" :key="index">
                            <td v-for="(subItem,idx) in item.attributeList" :key="idx" v-text="subItem.value"></td>
                            <td v-text="attributeTablePrefixName + item.totalName"></td>
                            <td><el-input type="text" class="mdm-number" v-model="item.mdmCode"></el-input></td>
                            <td>
                                <el-switch
                                    v-model="item.isDisable"
                                    active-color="#13ce66"
                                    inactive-color="#DCDFE6">
                                </el-switch>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btn-group">
                    <el-button type="primary" class="ml20" @click="onSave">保存</el-button>
                    <el-button type="primary" class="ml20" @click="onCancel">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { deepCopy } from '../../../utils/utils'
import { mapGetters, mapActions } from 'vuex'
import { createServiceResourcesTemplate } from '../api/index'
export default {
    name: 'addOrEditOrDetails',
    data () {
        return {
            message: {
                categoryId: [],
                description: '',
                name: ''
            },
            form: {
                serviceResourceList: []
            },
            rules: {},
            options: [],
            defaultAttribute: {
                key: '',
                value: ''
            },
            defaultSpecification: {
                name: '',
                attributeList: [{ value: '' }]
            },
            attributeTable: [],
            serviceResourceName: [],
            attributeTablePrefixName: ''
        }
    },
    computed: {
        ...mapGetters(['doneServiceCategoryList'])
    },
    methods: {
        nameChange () {
            if (this.message.name.trim()) {
                this.attributeTablePrefixName = this.message.name
            }
        },
        resetAttribute () {
            let tempAll = []
            this.form.serviceResourceList.forEach(value => {
                let temp = deepCopy(value.attributeList)
                tempAll.push(temp)
            })
            let temp = this.calcDescartes(tempAll)
            this.attributeTable = temp.map(value => {
                let totalName = ''
                value.forEach(value1 => {
                    totalName += value1.value
                })
                return {
                    attributeList: value,
                    totalName: totalName
                }
            })
        },
        attributeChangeHandler () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    let serviceResourceName = []
                    this.form.serviceResourceList.forEach(value => {
                        serviceResourceName.push({
                            name: value.name
                        })
                    })
                    this.serviceResourceName = serviceResourceName
                    this.resetAttribute()
                }
            })
        },
        calcDescartes (array) {
            if (array.length < 2) return array || []
            return [].reduce.call(array, function (col, set) {
                var res = []
                col.forEach(function (c) {
                    set.forEach(function (s) {
                        var t = [].concat(Array.isArray(c) ? c : [c])
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
        onSave () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    const params = { ...this.message }
                    params.categoryId = params.categoryId[params.categoryId.length - 1]
                    params.serviceResourceList = this.attributeTable.map(value => {
                        return {
                            name: value.name,
                            mdmCode: value.mdmCode,
                            isDisabled: value.isDisabled,
                            attributeList: value.attributeList
                        }
                    })
                    try {
                        await createServiceResourcesTemplate(params)
                    } catch (e) {}
                }
            })
        },
        onCancel () {
            history.go(-1)
        },
        addSpecification () {
            if (this.form.serviceResourceList.length > 10) {
                this.$message({
                    type: 'error',
                    message: '规格值不能超过10个'
                })
            }
            const temp = deepCopy(this.defaultSpecification)
            this.form.serviceResourceList.push(temp)
        },
        removeServiceResourceList (index) {
            this.form.serviceResourceList.splice(index, 1)
            this.resetAttribute()
        },
        removeAttributeList (item, index) {
            let temp = !(item[index] && item[index].value)
            item.attributeList.splice(index, 1)
            if (temp) this.resetAttribute()
        },
        addAttributeList (item) {
            const temp = { ...this.defaultAttribute }
            item.attributeList.push(temp)
        },
        ...mapActions(['findServiceResourcesCategory'])
    },
    mounted () {
        this.findServiceResourcesCategory()
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
                padding: 12px 5px;
            }

        }
    }
    .mdm-number {
        width: 150px;
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
