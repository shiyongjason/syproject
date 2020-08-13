<template>
    <div class="page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>APP闪屏管理</span>
        </div>
        <div class="page-body-cont">
            <el-form ref="smartPlayForm" :model="smartPlayForm" :rules="rules" label-width="110px">
                <el-form-item label="标题：" prop="title">
                    <el-input v-model.trim="smartPlayForm.title" show-word-limit placeholder="输入标题" maxlength='20' class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="闪屏图片：" prop="picture" ref="picture">
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="smartPlayForm.picture" ref="uploadImg" @back-event="readUrl" :imgW="300" :imgH="100" />
                    <div class="upload-tips">
                        建议尺寸：1242*2688或9:19.5比例图片，1M以内，支持jpeg,png和jpg格式
                    </div>
                </el-form-item>
                <el-form-item label="跳转活动：:">
                        <el-select v-model="smartPlayForm.activityId" placeholder="请选择跳转活动" clearable>
                            <el-option v-for="item in allActivity" :key="item.selectCode" :label="item.value" :value="item.selectCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSaveSmartPlay" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                    <el-button @click="onBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { interfaceUrl } from '@/api/config'
import { createSplashScreen, updateSplashScreen, getSplashScreenDetail } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'splashScreenDetail',
    data () {
        return {
            smartPlayForm: {
                activityId: '',
                picture: '',
                title: '',
                id: this.$route.query.id || ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                picture: [
                    { required: true, message: '请选择闪屏图片' }
                ]
            },
            loading: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudSmartPlayPostDetail: 'cloudSmartPlayPostDetail',
            allActivity: 'allActivity'
        }),
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        }
    },
    watch: {
        'smartPlayForm.picture' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['picture'].clearValidate()
            })
        }
    },
    mounted () {
        this.getAllActivity()
        if (this.smartPlayForm.id) {
            this.getDetail()
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags',
            getAllActivity: 'getAllActivity'
        }),
        async getDetail () {
            const { data } = await getSplashScreenDetail(this.smartPlayForm.id)
            this.smartPlayForm = { ...data.data }
        },
        backPlat (val) {
            this.smartPlayForm.activityId = val.value.selectCode
            this.smartPlayForm.activityName = val.value.value
        },
        readUrl (val) {
            this.smartPlayForm.picture = val.imageUrl
        },
        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/comfortCloud/operationsManagement/splashScreenManagement')
        },
        onSaveSmartPlay () {
            this.loading = true
            this.$refs['smartPlayForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        let message = '创建'
                        if (this.smartPlayForm.id) {
                            message = '修改'
                            await updateSplashScreen({ ...this.smartPlayForm, operator: this.userInfo.employeeName })
                        } else {
                            await createSplashScreen({ ...this.smartPlayForm, operator: this.userInfo.employeeName })
                        }
                        this.$message({
                            message: `${message}闪屏成功`,
                            type: 'success'
                        })
                        this.onBack()
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.spanflex {
    font-size: 16px;
    padding-bottom: 10px;
}
.page-body-title {
    margin-bottom: 20px;
}
.upload-tips {
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
    height: 100px;
    margin-left: 10px;
}
/deep/.avatar-uploader {
    margin-right: 10px;
}
.editor-wrap {
    margin-top: 20px;
}
/deep/.newTitle {
    width: 400px !important;
}
.el-picker-panel {
    z-index: 99999 !important;
}
/deep/.w-e-text-container {
    z-index: 40 !important;
}
/deep/.w-e-menu {
    z-index: 99 !important;
}
/deep/.editor-wrap {
    margin-bottom: 23px !important;
}
</style>
