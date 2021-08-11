<template>
    <div class="sku-cont_table mb20">
        <table border>
            <thead>
                <tr>
                    <td v-for="(item,index) in optionTypeListFilter" :key="index" style="min-width:100px;">{{item.name}}</td>
                    <td class="fixed-width">
                        <span class="tr-label">图片</span>
                        <SingleUpload :upload="uploadInfo" :imgW="44" :imgH="44" :imageUrl="params.skuImgurl" @back-event="backPicUrl" />
                        <el-dropdown placement="bottom-end" @command="handleCommand">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="imageUrls">应用全部</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!-- <div class="image-wrap" v-if="$route.query.id"></div> -->
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
                        <span class="tr-label">净重/KG</span>
                    </td>
                    <td v-if="$route.query.id">
                        <span class="tr-label">SKU编码</span>
                    </td>
                    <td>
                        <span class="tr-label">状态</span>
                    </td>
                    <td>
                        <span class="tr-label">操作</span>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in form.mainSkus" :key="index">
                    <template v-for="(sItem,sIndex) in item.optionValues">
                        <td :key="sIndex" v-if="item.optionValues.length">
                            <el-form-item label-width='0' :prop="`mainSkus[${index}].optionValues`" :rules="rules.optionValues">
                                <el-select v-model="item.optionValues[sIndex].id" @change="onChangeValue(index,sIndex)" clearable :disabled="item.disabled">
                                    <el-option v-for="(i,ssIndex) in optionValuesFilter(sItem.optionTypeId).optionValues" :key="ssIndex" :label="i.name" :value="i.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </template>
                    <td class="fixed-width">
                        <el-form-item label-width='0' :prop="`mainSkus[${index}].imageUrls`" :rules="rules.imageUrls">
                            <SingleUpload :upload="uploadInfo" :imgW="44" :imgH="44" :imageUrl="item.imageUrls" @back-event="backPicUrlSku($event, index)" />
                            <input type="hidden" v-model="item.imageUrls">
                        </el-form-item>
                        <!-- <div class="image-wrap" v-if="item.disabled"></div> -->
                    </td>
                    <td>
                        <el-form-item label-width='0' :prop="`mainSkus[${index}].serialNumber`" :rules="rules.serialNumber">
                            <el-input v-model="item.serialNumber" maxlength="20" :disabled="item.disabled"></el-input>
                        </el-form-item>
                    </td>
                    <td class="log-width">
                        <el-form-item label-width='0' :prop="`mainSkus[${index}].length`" :rules="rules.length">
                            <el-input v-model="item.length" maxlength="15" :disabled="item.disabled"></el-input>
                            <el-input v-model="item.width" maxlength="15" :disabled="item.disabled"></el-input>
                            <el-input v-model="item.height" maxlength="15" :disabled="item.disabled"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0' :prop="`mainSkus[${index}].grossWeight`" :rules="rules.grossWeight">
                            <el-input v-model="item.grossWeight" maxlength="15" :disabled="item.disabled"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0' :prop="`mainSkus[${index}].volume`" :rules="rules.volume">
                            <el-input v-model="item.volume" maxlength="15" :disabled="item.disabled"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0' :prop="`mainSkus[${index}].netWeight`" :rules="rules.netWeight">
                            <el-input v-model="item.netWeight" maxlength="15" :disabled="item.disabled"></el-input>
                        </el-form-item>
                    </td>
                    <td v-if="$route.query.id">
                        <el-form-item label-width='0'>
                            <span>{{item.mainSkuCode}}</span>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0'>
                            <span>{{checkStatus(item.enabled,item.auditStatus)}}</span>
                        </el-form-item>
                    </td>
                    <td>
                        <template v-if="item.auditStatus == 1">
                            <h-button table @click="onEfficacySku(item,index)" v-if="item.enabled">失效</h-button>
                            <h-button table @click="onEffectiveSku(item,index)" v-if="!item.enabled">生效</h-button>
                            <h-button table @click="onEditSku(index)" v-if="!item.enabled">编辑</h-button>
                        </template>
                        <template v-else>
                            <h-button table @click="onEditSku(index)" :disabled="!item.auditStatus && item.auditStatus != 0">编辑</h-button>
                            <h-button table @click="onDelSku(index)" v-if="form.optionTypeList.length>0">删除</h-button>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { deepCopy } from '@/utils/utils'
import { mapActions } from 'vuex'
import { interfaceUrl } from '@/api/config'
export default {
    name: 'skuTable',
    props: {
        formData: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data () {
        return {
            params: {
                skuImgurl: ''
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
                optionValues: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (value.every(item => item.id == '')) {
                                return callback(new Error('请选择属性值'))
                            }
                            return callback()
                        },
                        trigger: 'change'
                    }
                ],
                // imageUrls: [
                //     {
                //         required: true,
                //         validator: (rule, value, callback) => {
                //             if (!value || value == '') {
                //                 return callback(new Error('请上传图片'))
                //             }
                //             return callback()
                //         },
                //         trigger: 'change'
                //     }
                // ],
                serialNumber: [
                    {
                        validator: (rule, value, callback) => {
                            const reg = /^[A-Za-z0-9]+$/
                            if (value && !reg.test(value)) {
                                return callback(new Error('条头码仅支持字母和数字'))
                            }
                            return callback()
                        }
                    }
                ],
                length: [
                    {
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,9})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            this.form.mainSkus.map(item => {
                                if (item.length && !reg.test(item.length)) {
                                    return callback(new Error('长宽高格式为小数点前十位，小数点后两位'))
                                }
                                if (item.width && !reg.test(item.width)) {
                                    return callback(new Error('长宽高格式为小数点前十位，小数点后两位'))
                                }
                                if (item.height && !reg.test(item.height)) {
                                    return callback(new Error('长宽高格式为小数点前十位，小数点后两位'))
                                }
                            })
                            return callback()
                        }
                    }
                ],
                grossWeight: [
                    {
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,9})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            if (value && !reg.test(value)) {
                                return callback(new Error('毛重格式为小数点前十位，小数点后两位'))
                            }
                            return callback()
                        }
                    }
                ],
                volume: [
                    {
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,9})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            if (value && !reg.test(value)) {
                                return callback(new Error('体积格式为小数点前十位，小数点后两位'))
                            }
                            return callback()
                        }
                    }
                ],
                netWeight: [
                    {
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,9})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            if (value && !reg.test(value)) {
                                return callback(new Error('净重格式为小数点前十位，小数点后两位'))
                            }
                            return callback()
                        }
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
                this.form.mainSkus = deepCopy(this.form.mainSkus).map(item => {
                    item.disabled = !!(item.auditStatus == 0 || item.auditStatus == 1 || item.auditStatus == 2)
                    return item
                })
            }
        }
    },
    methods: {
        optionValuesFilter (id) {
            return this.form.optionTypeList.find(item => item.id == id)
        },
        backPicUrl (file) {
            this.params.skuImgurl = file.imageUrl
        },
        backPicUrlSku (file, index) {
            this.$set(this.form.mainSkus[index], 'imageUrls', file.imageUrl)
        },
        handleCommand (command) {
            deepCopy(this.form.mainSkus).map((item, index) => {
                if (command == 'imageUrls') {
                    this.$set(this.form.mainSkus[index], 'imageUrls', this.params.skuImgurl)
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
        // 生效sku
        async onEffectiveSku (row, index) {
            await this.effectiveSKU({ id: row.mainSkuId })
            this.$set(this.form.mainSkus[index], 'enabled', !this.form.mainSkus[index].enabled)
            this.$set(this.form.mainSkus[index], 'disabled', true)
            this.$message.success('生效成功！')
        },
        // 失效sku
        async onEfficacySku (row, index) {
            await this.efficacySKU({ id: row.mainSkuId })
            this.$set(this.form.mainSkus[index], 'enabled', !this.form.mainSkus[index].enabled)
            this.$message.success('失效成功！')
        },
        onEditSku (index) {
            this.$set(this.form.mainSkus[index], 'disabled', !this.form.mainSkus[index].disabled)
        },
        onDelSku (index) {
            this.$confirm('是否确认删除该SKU?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                this.form.mainSkus.splice(index, 1)
            }).catch(() => { })
        },
        onChangeValue (index, sIndex) {
            this.form.mainSkus[index].optionValues[sIndex].name = this.changeValue(this.form.mainSkus[index].optionValues[sIndex].optionTypeId, this.form.mainSkus[index].optionValues[sIndex].id)
            this.$nextTick(() => {
                this.$parent.clearValidate()
            })
        },
        changeValue (optionTypeId, id) {
            const result = this.form.optionTypeList.filter(item => item.id == optionTypeId)[0].optionValues.filter(item => item.id == id)
            return result && result.length > 0 ? result[0].name : ''
        },
        ...mapActions({
            effectiveSKU: 'productManage/effectiveSKU',
            efficacySKU: 'productManage/efficacySKU'
        })
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
                    position: relative;
                    padding: 10px 12px;
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
                    position: relative;
                    padding: 10px 12px;
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

.image-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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
