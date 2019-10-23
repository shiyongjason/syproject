<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont">
                <div class="title">
                    <span class="tit-l">新增档案</span>
                    <span class="tit-r">
                        <el-button type="primary" style="width:100px">编辑</el-button>
                        <el-button type="primary" style="width:100px" @click="dialogVisible = true">档案标注</el-button>
                    </span>
                </div>
               <div class="tabs">
                    <el-tabs v-model="activeName" type="card">
                            <el-tab-pane label="基础信息" name="base">
                                <el-form :model="form.baseInfo" ref='formBaseInfo' :rules="rules.baseInfo" label-width="140px" label-position='left'>
                                    <baseInfo v-model="form.baseInfo" />
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="A档-尽调材料" name="typea">
                                <el-form :model="form.tuneMaterials" ref='formTuneMaterials' label-width="140px" label-position='left'>
                                    <tuneMaterials />
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="B档-签约材料" name="typeb">
                                <el-form :model="form.sign" ref='formSign' label-width="140px" label-position='left'>
                                    <!-- v-if为了兼容上传图片误删-->
                                    <signMaterials v-model="form.sign" v-if="activeName==='typeb'" />
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="C档-工商材料" name="typec">
                                <el-form :model="form.business" ref='formSign' label-width="140px" label-position='left'>
                                    <!-- v-if为了兼容上传图片误删-->
                                    <businessMaterials v-model="form.business" v-if="activeName==='typec'" />
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="其余材料" name="others">
                                <el-form :model="form.business" ref='formSign' label-width="140px" label-position='left'>
                                    <!-- v-if为了兼容上传图片误删-->
                                    <otherMaterials v-model="form.otherMaterials" v-if="activeName==='others'" />
                                </el-form>
                            </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="btn">
                    <el-button style="width:130px">取 消</el-button>
                    <!-- <el-button type="primary" style="width:130px">存 档</el-button> -->
                    <hosjoy-button type="primary" style="width:130px" @click="buttonClick">存 档</hosjoy-button>
                </div>
            </div>
        </div>
        <el-dialog center title="档案标注" :visible.sync="dialogVisible" width="600px">
            <el-form :model="dialogForm.status" ref='dialogForm' label-width="140px" label-position='left'>
                <el-form-item label="公司状态：" prop="status" :rules="rules.dialogForm.status">
                    <el-radio v-model="radio" label="1">档案齐全</el-radio>
                    <el-radio v-model="radio" label="2">档案缺失</el-radio>
                </el-form-item>
                <el-form-item label="档案备注：">
                    <el-input v-model="dialogForm.remark" placeholder="此处备注档案信息" type='textarea' :rows="6"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import baseInfo from './components/baseInfo'
import tuneMaterials from './components/tuneMaterials'
import signMaterials from './components/signMaterials'
import businessMaterials from './components/businessMaterials'
import otherMaterials from './components/otherMaterials'
import hosjoyButton from '@/components/HosJoyButton/hosJoyButton'

export default {
    name: 'archivesManagement',
    components: { baseInfo, tuneMaterials, signMaterials, hosjoyButton, businessMaterials, otherMaterials },
    data () {
        return {
            activeName: 'base',
            dialogVisible: false,
            form: {
                baseInfo: {},
                tuneMaterials: {},
                sign: {},
                business: {},
                otherMaterials: {}
            },
            rules: {
                baseInfo: {
                    num: [
                        { required: true, message: '请输入档案编号', trigger: 'blur' }
                    ]
                },
                dialogForm: {
                    status: [
                        { required: true, message: '请输入档案编号', trigger: 'change' }
                    ]
                }
            },
            dialogForm: {},
            radio: ''
        }
    },
    methods: {
        buttonClick (done) {
            console.log('123', done)
            setTimeout(() => {
                done()
            }, 3000)
        }
    },
    watch: {
        form: {
            handler (val) {
                console.log(val)
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.tabs>>>.el-tabs__header{margin:0}
.tabs>>>.el-form{padding:0}
.btn{ margin-top: 20px}
.tit-l{ font-size: 18px; padding-left: 10px}
.tit-r{ float: right;}
.title{ margin-bottom: 20px}
</style>