<template>
    <div class="sku-cont_table mb20">
        <table border>
            <thead>
                <tr>
                    <td v-for="(item,index) in optionTypeListFilter" :key="index" style="min-width:100px;">{{item.name}}</td>
                    <td class="fixed-width">
                        <span class="tr-label">图片</span>
                        <SingleUpload :upload="uploadInfo" :imgW="44" :imgH="44" :imageUrl="params.skuImgurl" v-if="seeTask==false" @back-event="backPicUrl" />
                        <el-dropdown placement="bottom-end" @command="handleCommand" v-if="seeTask==false">
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
                            <el-select v-model="sItem.id" @change="onChangeValue(index,sIndex)" clearable disabled>
                                <el-option v-for="i in optionValuesFilter(sItem.optionTypeId)" :key="i.id" :label="i.name" :value="i.id"></el-option>
                            </el-select>
                        </td>
                    </template>
                    <td class="fixed-width">
                        <el-form-item label-width='0'>
                            <SingleUpload :upload="uploadInfo" :imgW="44" :imgH="44" :imageUrl="item.imageUrls" @back-event="backPicUrlSku($event, index)" v-if="seeTask==false" />
                            <img :src="item.imageUrls" style="width:44px;height:44px" v-if="seeTask==true" />
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0'>
                            <el-input v-model="item.serialNumber" maxlength="16" :disabled="seeTask == true"></el-input>
                        </el-form-item>
                    </td>
                    <td class="log-width">
                        <el-form-item label-width='0'>
                            <el-input v-model="item.length" maxlength="16" :disabled="seeTask == true"></el-input>
                            <el-input v-model="item.width" maxlength="16" :disabled="seeTask == true"></el-input>
                            <el-input v-model="item.height" maxlength="16" :disabled="seeTask == true"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0'>
                            <el-input v-model="item.grossWeight" maxlength="8" :disabled="seeTask == true"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0'>
                            <el-input v-model="item.volume" maxlength="8" :disabled="seeTask == true"></el-input>
                        </el-form-item>
                    </td>
                    <td v-if="edite">
                        <el-form-item label-width='0'>
                            <span>{{item.mainSkuId}}</span>
                        </el-form-item>
                    </td>
                    <td>
                        <span>{{checkStatus(item.enabled,item.auditStatus)}}</span>
                    </td>
                    <td v-if="!edite">
                        <el-form-item label-width='0'>
                            <template v-if="item.auditStatus == 1">
                                <h-button table @click="onEfficacySku(item)" v-if="item.enabled">失效</h-button>
                                <h-button table @click="onEffectiveSku(item)" v-if="!item.enabled">生效</h-button>
                                <h-button table @click="onEditSku(index)" v-if="!item.enabled">编辑</h-button>
                            </template>
                            <template v-else>
                                <h-button table @click="onEditSku(index)">编辑</h-button>
                                <h-button table @click="onDelSku(index)">删除</h-button>
                            </template>
                        </el-form-item>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { interfaceUrl } from '@/api/config'
import { mapActions } from 'vuex'
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
                imageUrls: [
                    { required: true, message: '请上传图片', trigger: 'change' }
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
                this.form.mainSkus.map(item => {
                    item.disabled = !!(item.auditStatus == 0 || item.auditStatus == 1 || item.auditStatus == 2)
                    return item
                })
            }
        }
    },
    methods: {
        optionValuesFilter (id) {
            const result = this.optionTypeListFilter.filter(item => item.id == id)
            if (result.length > 0) {
                return result[0].optionValues
            } else {
                return []
            }
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
        async onEffectiveSku (row) {
            await this.effectiveSKU({ id: row.mainSkuId })
            this.$message.success('商品设置生效成功！')
        },
        // 失效sku
        async onEfficacySku (row) {
            await this.efficacySKU({ id: row.mainSkuId })
            this.$message.success('商品设置失效成功！')
        },
        onEditSku (index) {
            this.form.mainSkus[index].disabled = !this.form.mainSkus[index].disabled
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
        },
        changeValue (optionTypeId, id) {
            const result = this.form.optionTypeList.filter(item => item.id == optionTypeId)[0].optionValues.filter(item => item.id == id)
            return result.length > 0 ? result[0].name : {}
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
