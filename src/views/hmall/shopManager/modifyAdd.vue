<template>
    <div class="modify-add">
        <div class="page-body">
            <div class="page-body-cont">
                <div class="page-header">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>商品库管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="page-box base-table page-table">
                <el-form ref="form" :model="form" label-width="120px">
                    <div class="pd-20">
                        <el-form-item label="类目">
                            <el-button type="primary">切换目录</el-button>
                        </el-form-item>
                        <el-form-item label="商品编码" v-if="isAdd">
                        </el-form-item>
                    </div>
                    <div class="sub-title">
                        商品信息（spu）
                    </div>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="商品品牌">
                                <el-select v-model="queryParams.brandId" clearable placeholder="请选择" style="width: 100%">
                                    <el-option
                                        label="生效"
                                        value="1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="规格/型号">
                                <el-input type="text" style="width: 100%" placeholder="请输入规格／型号"
                                          maxlength="30" v-model="queryParams.specification"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="商品名称">
                                <el-input placeholder="多练水机室内机" maxlength="50"
                                          v-model="queryParams.productName">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="商品主图">
                                <MultiUpload></MultiUpload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="sub-title">
                        属性信息
                    </div>
                    <el-row>
                        <el-col :span="13">
                            <el-col :span="8">
                                <el-form-item label="制冷剂" style="width: 100%">
                                    <el-select style="width: 100%">
                                        <el-option label="test" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="外机重量">
                                    <el-input placeholder="" maxlength="50"
                                              style="width: 50%;margin-right: 12px"></el-input>
                                    KG
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="制冷类型">
                                    <el-select>
                                        <el-option label="test" value="1" placeholder="请选择"
                                                   style="width: 100%"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="电压／频率">
                                    <el-input placeholder="" maxlength="50"
                                              style="width: 50%;margin-right: 12px"></el-input>
                                    V/HZ
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="匹数">
                                    <el-select>
                                        <el-option label="test" value="1" placeholder="请选择"
                                                   style="width: 100%"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="能效等级">
                                    <el-select>
                                        <el-option label="test" value="1" placeholder="请选择"
                                                   style="width: 100%"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="外机尺寸">
                                    <el-input placeholder="" maxlength="50"
                                              style="width: 50%;margin-right: 12px"></el-input>
                                    V/HZ
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="定频／变频">
                                    <el-select>
                                        <el-option label="test" value="1" placeholder="请选择"
                                                   style="width: 100%"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="制冷量">
                                    <el-input placeholder="" style="width: 50%;margin-right: 12px"></el-input>
                                    W
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="制冷功率">
                                    <el-input placeholder="" maxlength="50"
                                              style="width: 50%;margin-right: 12px"></el-input>
                                    W
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="制热量">
                                    <el-input placeholder="" maxlength="50"
                                              style="width: 50%;margin-right: 12px"></el-input>
                                    W
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="制热功率">
                                    <el-input placeholder="" style="width: 50%;margin-right: 12px"></el-input>
                                    W
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="外机噪音">
                                    <el-input placeholder="" style="width: 50%;margin-right: 12px"></el-input>
                                    dB／A
                                </el-form-item>
                            </el-col>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="13">
                            <el-form-item>
                                <RichEditor></RichEditor>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item style="text-align: center">
                                <el-button type="primary" @click="onSubmit">取消</el-button>
                                <el-button>保存</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { mapState } from 'vuex'
import {findCategoryAttribute} from './api/index'

export default {
    name: 'modifyAdd',
    data () {
        return {
            queryParams: {},
            form: {},
            isAdd: false
        }
    },
    computed: {
        uploadInfo () {
            return {
                // TODO: 这个是老接口，不知道要不要更新
                action: interfaceUrl + 'api/httpH5/upload/6999',
                data: {
                    updateUid: this.userInfo.name
                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onSubmit () {
            console.log(1)
        }
    },
    async mounted() {
        const params = {
            categoryId: 1,
            isSetupthe: 1
        }
        const {data} = await findCategoryAttribute(params)
    }
}
</script>

<style scoped>
    .sub-title {
        font-size: 15px;
        padding: 12px 20px;
    }
</style>
