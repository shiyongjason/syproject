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
                    <el-form-item label="商品图片：">
                        <div class="productPicture">
                            <div style="margin-right:10px">
                                <HosJoyUpload class="crmshopMallSpuEdit" v-model="form.pics" :showPreView='true' :fileSize=20 :action='action' :fileNum='1' :uploadParameters='uploadParameters' accept='.jpg,.png,.jpeg' style="margin:10px 0 0 5px" />
                                <div style="color:#00000065;textAlign:center">* 主图</div>
                            </div>
                            <div style="margin-right:10px" class="vicepics">
                                <HosJoyUpload class="crmshopMallSpuEdit" v-model="form.pics2" :showPreView='true' :fileSize=20 :action='action' :fileNum='4' :uploadParameters='uploadParameters' accept='.jpg,.png,.jpeg' style="margin:10px 0 0 5px" />
                                <div style="color:#00000065;marginLeft:40px">* 副图</div>
                            </div>
                        </div>

                    </el-form-item>
                </div>
            </el-form>
        </div>

    </div>
</template>
<script lang='tsx'>
import { ElForm } from 'element-ui/types/form'
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { State, namespace, Getter, Action } from 'vuex-class'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
import HosJoyUpload from '@/components/HosJoyUpload/HosJoyUpload.vue'
import { ccpBaseUrl } from '@/api/config'

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
    action= ccpBaseUrl + 'common/files/upload-old'
    uploadParameters = {
        updateUid: '',
        reservedName: true
    }
    form = {
        radio: '',
        pics: [],
        pics2: []
    }
    rules= {
        categoryId: [
            { type: 'number', required: true, whitespace: true, message: '请选择商品类目' }
        ],
        model: [
            { required: true, whitespace: true, message: '请填写规格/型号', trigger: 'blur' }
        ],
        brandId: [
            { type: 'number', required: true, whitespace: true, message: '请选择商品品牌' }
        ],
        imgUrls: [
            { required: true, message: '请选择商品主图', trigger: 'change' }
        ]
    }
    mounted () {

    }
}
</script>
<style lang='scss' scoped>
@import "./css/list.scss";
</style>