<template>
    <div class="sku-cont_table mb20">
        <table border>
            <thead>
                <tr>
                    <td v-for="(item,index) in optionTypeListFilter" :key="index" style="min-width:100px;">{{item.name}}</td>
                    <td class="fixed-width">
                        <span class="tr-label">图片</span>
                        <SingleUpload :upload="uploadInfo" :imgW="44" :imgH="44" :imageUrl="params.skuImgurl" v-if="seeTask" @back-event="backPicUrl" />
                        <el-dropdown placement="bottom-end" @command="handleCommand" v-if="seeTask">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="imageUrls">应用全部</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </td>
                    <td>
                        <span class="tr-label">条头码</span>
                    </td>
                    <td>
                        <span class="tr-label">长宽高/mm</span>
                    </td>
                    <td>
                        <span class="tr-label">毛重/KG</span>
                    </td>
                    <td>
                        <span class="tr-label">体积/m³</span>
                    </td>
                    <td>
                        <span class="tr-label" v-if="edite">SKU编码</span>
                    </td>
                    <td>
                        <span class="tr-label">状态</span>
                    </td>
                    <td v-if="!edite">
                        <span class="tr-label">操作</span>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in form.mainSkus" :key="index">
                    <template v-for="(sItem,sIndex) in item.optionValues">
                        <td :key="sIndex">
                            <el-select v-model="sItem.id" @change="onChangeValue(index,sIndex)" clearable :disabled="!seeTask">
                                <el-option v-for="i in optionValuesFilter(sItem.optionTypeId)" :key="i.id" :label="i.name" :value="i.id"></el-option>
                            </el-select>
                        </td>
                    </template>
                    <td class="fixed-width">
                        <el-form-item label-width='0'>
                            <SingleUpload :upload="uploadInfo" :imgW="44" :imgH="44" :imageUrl="item.imageUrls" @back-event="backPicUrlSku($event, index)" v-if="!seeTask" />
                            <img :src="item.imgUrls" v-if="seeTask" />
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0'>
                            <el-input v-model="item.serialNumber" maxlength="16" :disabled="!seeTask"></el-input>
                        </el-form-item>
                    </td>
                    <td class="log-width">
                        <el-form-item label-width='0'>
                            <el-input v-model="item.length" maxlength="16" :disabled="!seeTask"></el-input>
                            <el-input v-model="item.width" maxlength="16" :disabled="!seeTask"></el-input>
                            <el-input v-model="item.height" maxlength="16" :disabled="!seeTask"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0'>
                            <el-input v-model="item.grossWeight" maxlength="8" :disabled="!seeTask"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0'>
                            <el-input v-model="item.volume" maxlength="8" :disabled="!seeTask"></el-input>
                        </el-form-item>
                    </td>
                    <td v-if="edite">
                        <el-form-item label-width='0'>
                            <span>{{item.mainSkuId}}</span>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0'>
                            <span>{{checkStatus(item.enabled,item.auditStatus)}}</span>
                        </el-form-item>
                    </td>
                    <td v-if="!edite">
                        <el-form-item label-width='0'>
                            <h-button table v-if="item.auditStatus && !item.enabled">生效</h-button>
                            <h-button table v-if="item.enabled">失效</h-button>
                            <h-button table v-if="!item.enabled">编辑</h-button>
                            <h-button table @click="onDelSKU(index)">删除</h-button>
                        </el-form-item>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { interfaceUrl } from '@/api/config'
export default {
    name: 'skuTable',
    props: {
        formData: {
            type: Object,
            default: () => {
                return {}
            }
        },
        seeTask: {
            type: Boolean
        },
        edite: {
            type: Boolean
        }
    },
    data () {
        return {
            params: {
                skuImgurl: '',
                sellPrice: '',
                retailPrice: '',
                saleableStock: '',
                commission: '',
                costPrice: ''
            },
            form: {
                mainSkus: [
                    {
                        name: '',
                        imageUrls: '',
                        serialNumber: '',
                        length: '',
                        width: '',
                        height: '',
                        grossWeight: '',
                        volume: '',
                        netWeight: ''
                    }
                ]
            },
            rules: {
                imgUrls: [
                    { required: true, message: '请上传图片', trigger: 'change' }
                ],
                sellPrice: [
                    { required: true, message: '请输入销售价', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            if (!reg.test(value)) {
                                return callback(new Error('销售价格式为小数点前十三位，小数点后两位'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                retailPrice: [
                    { required: true, message: '请输入零售价', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            if (!reg.test(value)) {
                                return callback(new Error('零售价格式为小数点前十三位，小数点后两位'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                saleableStock: [
                    { required: false, message: '请输入库存', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            const reg = /^[0-9]\d*$/
                            if (value < 0 || !reg.test(value)) {
                                return callback(new Error('库存为大于等于0的数字'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                commission: [
                    { required: true, message: '请输入佣金', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            const reg = /(?!^0\.0?0$)^[0-9][0-9]?(\.[0-9]{1,2})?$|^100$/
                            if (!reg.test(value)) {
                                return callback(new Error('佣金为小于100的2位小数或整数'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                costPrice: [
                    {
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            if (value && !reg.test(value)) {
                                return callback(new Error('成本价格式为小数点前十三位，小数点后两位'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    computed: {
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: 'Hosjoy'
                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        },
        optionTypeListFilter () {
            return this.form.optionTypeList.filter(item => item.name && item.optionValues.length)
        }
    },
    watch: {
        formData: {
            immediate: true,
            handler (val) {
                this.form = val
            }
        }
    },
    methods: {
        optionValuesFilter (id) {
            const result = this.optionTypeListFilter.filter(item => item.id == id)
            return result[0].optionValues || []
        },
        backPicUrl (file) {
            this.params.skuImgurl = file.imageUrl
        },
        backPicUrlSku (file, index) {
            this.form.mainSkus[index].imageUrls = file.imageUrl
        },
        handleCommand (command) {
            this.form.mainSkus.map((item, index) => {
                if (command == 'imageUrls') {
                    this.$set(this.form.mainSkus[index], 'imageUrls', this.params.skuImgurl)
                } else {
                    this.$set(this.form.mainSkus[index], command, this.params[command])
                }
            })
        },
        checkStatus (enabled, auditStatus) {
            if (auditStatus == 0) {
                return '待审核'
            } else if (auditStatus == 1) {
                return enabled ? '生效' : '失效'
            } else if (auditStatus == 2) {
                return '未通过'
            } else {
                return '-'
            }
        },
        onDelSKU (index) {
            this.form.mainSkus.splice(index, 1)
        },
        onChangeValue (index, sIndex) {
            this.form.mainSkus[index].optionValues[sIndex].name = this.changeValue(this.form.mainSkus[index].optionValues[sIndex].optionTypeId, this.form.mainSkus[index].optionValues[sIndex].id).name
        },
        changeValue (optionTypeId, id) {
            return this.form.optionTypeList.filter(item => item.id == optionTypeId)[0].optionValues.filter(item => item.id == id)[0]
        }
    },
    mounted () {
        this.$emit('update:formData', this.form)
    }
}
</script>
<style lang="scss" scoped>
.sku-cont {
    &_table {
        width: 100%;
        overflow-y: auto;

        table {
            width: 100%;
            border: 1px solid #e5e5ea;
            box-sizing: border-box;
            border-collapse: collapse;
            border-spacing: 1px;
        }

        thead {
            tr {
                background: #f2f2f4;
            }
            td {
                padding: 2px 10px;
                min-width: 270px;
                line-height: 40px;
                text-align: center;
                font-size: 12px;
                border-right: 1px solid #e5e5ea;
                border-bottom: 1px solid #e5e5ea;
                box-sizing: border-box;
                white-space: nowrap;

                &.fixed-width {
                    padding: 2px 5px;
                    min-width: 150px;
                }

                .el-input {
                    width: 150px;
                }

                /deep/ .el-input__inner {
                    height: 30px;
                    line-height: 30px;
                }
            }
        }

        tbody {
            tr {
                &:nth-child(2n) {
                    background: #fcfcfc;
                }
            }
            td {
                padding: 10px 10px;
                min-width: 100px;
                font-size: 12px;
                text-align: center;
                color: #333;
                border-right: 1px solid #dddddd;
                border-bottom: 1px solid #dddddd;
                box-sizing: border-box;

                &.fixed-width {
                    padding: 2px 5px;
                    min-width: 150px;
                }
                .el-select {
                    width: 150px;

                    /deep/.el-input {
                        width: 150px;
                    }
                }

                .el-input {
                    width: 150px;
                }

                /deep/ .el-input__inner {
                    height: 30px;
                    line-height: 30px;
                }

                /deep/ .el-form-item__error {
                    margin-left: 38px;
                    transform: translate(0%, -38%);
                }
            }
        }

        .avatar-uploader {
            float: none !important;
            display: inline-block;
            vertical-align: middle;
        }
    }
}

.tr-label {
    display: inline-block;
    width: 60px;
    text-align: right;
}

.sku-cont_table {
    .el-form-item {
        margin-bottom: 0;
    }
    /deep/ .el-input__icon {
        line-height: 20px;
    }
}

.log-width {
    min-width: 500px !important;
}
</style>
