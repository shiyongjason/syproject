<template>
    <div class="page-body B2b">
        <div class="contract-temp  page-component__scroll">
            <div class="page-body-cont">
                <div class="contract-temp_title">新增合同模版</div>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_name">合同模版设置</div>
                <el-form ref="form" :model="form" label-width="">
                    <el-form-item label="模版名称：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="合同类型：">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_name">合同模版内容</div>
                <div class="contract-temp_flex">
                    <div class="contract-temp_rich">
                        <RichEditor ref="RichEditor" v-model="content" :menus="menus" :uploadImgServer="uploadImgServer" :height="500" :uploadFileName="uploadImgName" :uploadImgParams="uploadImgParams" style="margin-bottom: 12px;width:100%"></RichEditor>
                    </div>
                    <div class="contract-temp_txt">
                        <el-form ref="form" :model="form" label-width="200px">
                            <el-form-item label="请选择需要插入的字段：">
                                <el-select v-model="keyValue" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item">
                                    </el-option>
                                </el-select>
                                <el-button type="primary" style="margin-left:20px" @click="onInsertInfo">插入当前位置</el-button>
                            </el-form-item>
                            <el-form-item label="自定义合同条款：">
                                <el-button type="primary" @click="onFindRef">插入当前位置</el-button>
                            </el-form-item>
                            <el-form-item label="平台签署区：">
                                <el-button type="primary">插入当前位置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_head">
                    签署方
                    <h-button type="primary" @click="onClick_Dialog()">添加签署方</h-button>
                </div>
                <hosJoyTable localName="V3.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe :column="tableLabel" :data="tableData" actionWidth='260' isAction :isActionFixed='tableData&&tableData.length>0'>
                    <template slot="action" slot-scope="scope">
                        <h-button table @click="onShowVer()">查看</h-button>
                        <h-button table @click="onShowVer()">预览</h-button>
                    </template>
                </hosJoyTable>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_head">
                    平台签署方
                    <h-button type="primary">设置</h-button>
                </div>
                <hosJoyTable localName="V3.*" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe :column="tableLabel" :data="tableData" actionWidth='260' isAction :isActionFixed='tableData&&tableData.length>0'>
                    <template slot="action" slot-scope="scope">
                        <h-button table @click="onShowVer()">查看</h-button>
                        <h-button table @click="onShowVer()">预览</h-button>
                    </template>
                </hosJoyTable>
            </div>
            <div class="page-body-cont">
                <div class="contract-temp_head">
                    平台签署方
                </div>
                <template>
                    <el-radio v-model="radio" label="1">备选项</el-radio>
                    <el-radio v-model="radio" label="2">备选项</el-radio>
                </template>
            </div>
</div>
        </div>
</template>
<script>
export default {
    data () {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
</style>