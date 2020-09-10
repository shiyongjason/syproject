<template>
    <div class="page-body">
        <div class="page-body-cont query-cont spanflex">
            <span>广告弹窗编辑</span>
        </div>
        <div class="page-body-cont">
            <el-form ref="smartPlayForm" :model="smartPlayForm" :rules="rules" label-width="110px">
                <el-form-item label="广告标题：" prop="title">
                    <el-input v-model.trim="smartPlayForm.title" show-word-limit placeholder="输入标题" maxlength='20' class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="弹窗图片：" prop="picture" ref="picture">
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="smartPlayForm.picture" ref="uploadImg" @back-event="readUrl" :imgW="300" :imgH="100" />
                    <div class="upload-tips">
                        建议尺寸： 600x 800，1M以内，支持jepg,png和jpg格式。
                    </div>
                </el-form-item>
                <el-form-item label="点击跳转页面：">
                    <el-radio-group v-model="smartPlayForm.redirectType" @change="onRadioChange">
                        <el-radio :label="1">活动页</el-radio>
                        <el-radio :label="2">指定URL</el-radio>
                    </el-radio-group>
                    <div>
                        <el-select v-model="smartPlayForm.activityId" placeholder="请选择跳转活动" clearable v-if="smartPlayForm.redirectType==1">
                            <el-option v-for="item in allActivity" :key="item.selectCode" :label="item.value" :value="item.selectCode">
                            </el-option>
                        </el-select>
                        <el-input placeholder="请输入以http或https开头的URL" v-model="smartPlayForm.redirectUrl" v-else clearable>
                            
                        </el-input>
                    </div>
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
import { createAdPop, updateAdpop, getAdPopDetail } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'adPopDetail',
    data () {
        return {
            smartPlayForm: {
                activityId: '',
                picture: '',
                title: '',
                id: this.$route.query.id || '',
                redirectType: 1,
                redirectUrl: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                picture: [
                    { required: true, message: '请选择弹窗图片' }
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
            const { data } = await getAdPopDetail(this.smartPlayForm.id)
            this.smartPlayForm = { ...data.data }
        },
        readUrl (val) {
            this.smartPlayForm.picture = val.imageUrl
        },
        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/comfortCloud/operationsManagement/adpop')
        },
        onSaveSmartPlay () {
            this.loading = true
            this.$refs['smartPlayForm'].validate(async (valid) => {
                if (valid) {
                    try {
                        let message = '创建'
                        if (this.smartPlayForm.id) {
                            message = '修改'
                            await updateAdpop({ ...this.smartPlayForm, operator: this.userInfo.employeeName })
                        } else {
                            await createAdPop({ ...this.smartPlayForm, operator: this.userInfo.employeeName })
                        }
                        this.$message({
                            message: `${message}广告弹窗成功`,
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
        },
        onRadioChange(radio) {
            this.smartPlayForm.redirectType = radio
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
