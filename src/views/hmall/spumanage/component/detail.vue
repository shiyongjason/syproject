<template>
    <el-form label-width="110px">
        <div class="page-body-title">
            <h3>商品信息（SPU）</h3>
        </div>
        <el-form-item label="商品类目：" style="width: 460px;">
            {{form.categoryPathName}}
        </el-form-item>
        <el-form-item label="商品品牌：" style="width: 460px;">
            {{form.brandName}}
        </el-form-item>
        <el-form-item label="商品型号：" style="width: 460px;">
            {{form.model}}
        </el-form-item>
        <el-form-item label="商品名称：" style="width: 460px;">
            {{form.name}}
        </el-form-item>
        <el-form-item label="商品主图：">
            <ul class="picture-container">
                <template v-if="pictureContainer.length > 0">
                    <li v-for="(item,index) in pictureContainer" :key="index">
                        <img :src="item.url" :alt="item.url">
                    </li>
                </template>
            </ul>
        </el-form-item>
        <div class="page-body-title" v-if="form.specifications.length>0">
            <h3>商品参数信息</h3>
        </div>
        <div :key="index" v-for="(item,index) in form.specifications" class="el-form-item" style="width: 460px;">
            <el-form-item :label="item.k + ':'">
                <template v-if="item.v">
                    {{item.v}} {{item.unit}}
                </template>
            </el-form-item>
        </div>
        <div class="page-body-title">
            <h3>商品详情</h3>
        </div>
        <div v-html="form.reqDetailList[0].content">
        </div>
        <slot></slot>
    </el-form>
</template>

<script>
export default {
    name: 'spu_detail',
    props: {
        form: {
            type: Object,
            default: () => ({})
        },
        pictureContainer: {
            type: Array,
            default: () => ([])
        }
    }
}
</script>

<style lang="scss" scoped>
.page-body-title {
    padding: 24px 0 14px;
    border-bottom: 1px solid #E5E5EA;
    margin-bottom: 20px;
    h3 {
        font-size: 22px;
        line-height: 32px;
        font-weight: 400;
    }
}
.picture-container {
    float: left;
}
.picture-container li {
    width: 102px;
    height: 102px;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    margin-right: 12px;
    float: left;
    margin-bottom: 12px;
    cursor: pointer;
}
.picture-container li img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    z-index: 1;
}
</style>
