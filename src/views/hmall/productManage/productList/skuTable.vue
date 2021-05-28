<template>
    <div class="sku-cont_table mb20">
        <table border>
            <thead>
                <tr>
                    <td v-for="(item,index) in specTemplateFilter" :key="index" style="min-width:100px;">{{item.k}}</td>
                    <td class="fixed-width">
                        <span class="tr-label">图片</span>
                        <SingleUpload :upload="uploadInfo" :imgW="44" :imgH="44" :imageUrl="params.skuImgurl" @back-event="backPicUrl" />
                        <el-dropdown placement="bottom-end" @command="handleCommand">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="imgUrls">应用全部</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </td>
                    <td>
                        <span class="tr-label">tiao'touma</span>
                        <el-input v-model="params.sellPrice" maxlength="16"><template slot="suffix">元</template></el-input>
                        <el-dropdown placement="bottom-end" @command="handleCommand">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="sellPrice">应用全部</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </td>
                    <td>
                        <span class="tr-label">零售价</span>
                        <el-input v-model="params.retailPrice" maxlength="16"><template slot="suffix">元</template></el-input>
                        <el-dropdown placement="bottom-end" @command="handleCommand">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="retailPrice">应用全部</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </td>
                    <td>
                        <span class="tr-label">销售库存</span>
                        <el-input v-model="params.saleableStock" maxlength="8" disabled></el-input>
                        <el-dropdown placement="bottom-end" @command="handleCommand">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="saleableStock">应用全部</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </td>
                    <td>
                        <span class="tr-label">总库存</span>
                    </td>
                    <td>
                        <span class="tr-label">佣金</span>
                        <el-input v-model="params.commission" maxlength="6"><template slot="suffix">%</template></el-input>
                        <el-dropdown placement="bottom-end" @command="handleCommand">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="commission">应用全部</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </td>
                    <td>
                        <span class="tr-label">成本价</span>
                        <el-input v-model="params.costPrice" maxlength="16"><template slot="suffix">元</template></el-input>
                        <el-dropdown placement="bottom-end" @command="handleCommand">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="costPrice">应用全部</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </td>
                    <td>
                        <span class="tr-label">上下架状态</span>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in form.skuList" :key="index">
                    <template v-for="(sItem,sIndex) in item.specifications">
                        <td :key="sIndex">{{sItem.v}}</td>
                    </template>
                    <td class="fixed-width">
                        <el-form-item label-width='0' :prop="`skuList[${index}].imgUrls`" :rules="rules.imgUrls">
                            <SingleUpload :upload="uploadInfo" :imgW="44" :imgH="44" :imageUrl="item.imgUrls" @back-event="backPicUrlSku($event, index)" />
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0' :prop="`skuList[${index}].sellPrice`" :rules="rules.sellPrice">
                            <el-input v-model="item.sellPrice" maxlength="16"><template slot="suffix">元</template></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0' :prop="`skuList[${index}].retailPrice`" :rules="rules.retailPrice">
                            <el-input v-model="item.retailPrice" maxlength="16"><template slot="suffix">元</template></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0' :prop="`skuList[${index}].saleableStock`" :rules="rules.saleableStock">
                            <el-input v-model="item.saleableStock" maxlength="8" disabled @input="onChangeStock(item, index)"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0' :prop="`skuList[${index}].availableStock`" :rules="rules.availableStock">
                            <el-input v-model="item.availableStock" maxlength="8" disabled></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0' :prop="`skuList[${index}].commission`" :rules="rules.commission">
                            <el-input v-model="item.commission" maxlength="6"><template slot="suffix">%</template></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width='0' :prop="`skuList[${index}].costPrice`" :rules="rules.costPrice">
                            <el-input v-model="item.costPrice" maxlength="16"><template slot="suffix">元</template></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <span>{{item.isOnShelf == 0 ? '下架':item.isOnShelf == 1?'上架':'下架'}}</span>
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
                skuList: [
                    {
                        name: '',
                        imgUrls: '',
                        sellPrice: 0,
                        retailPrice: '',
                        commission: 0,
                        costPrice: '',
                        orderMinCount: '',
                        saleableStock: 0,
                        availableStock: 0
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
        specTemplateFilter () {
            return this.form.specTemplate.filter(item => item.k && item.v.length)
        }
    },
    watch: {
        formData: {
            immediate: true,
            handler (val) {
                this.form = val
                this.form.skuList = this.form.skuList.map(item => {
                    item.difference = item.availableStock - item.saleableStock
                    return item
                })
            }
        }
    },
    methods: {
        backPicUrl (file) {
            this.params.skuImgurl = file.imageUrl
        },
        backPicUrlSku (file, index) {
            this.form.skuList[index].imgUrls = file.imageUrl
        },
        handleCommand (command) {
            this.form.skuList.map((item, index) => {
                if (command == 'imgUrls') {
                    this.$set(this.form.skuList[index], 'imgUrls', this.params.skuImgurl)
                } else {
                    this.$set(this.form.skuList[index], command, this.params[command])
                }
            })
            this.onChangeStock()
        },
        onChangeStock () {
            this.form.skuList.map(item => {
                if (item.difference) {
                    this.$set(item, 'availableStock', item.saleableStock - 0 + item.difference - 0)
                } else {
                    this.$set(item, 'availableStock', item.saleableStock - 0)
                }
            })
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
</style>
