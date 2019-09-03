<template>
    <el-dialog class="customeredit" width="55%" title="新增/修改 预约订单" :visible.sync="dialog" :close-on-click-modal="false">
        <el-form :model="dialogForm" class="dialogForm" :rules="rules" ref="form" label-width="100px">
            <el-row>
                <el-col :span="8">
                    <el-form-item prop="name" label="订单号">
                        <el-input v-model="dialogForm.name" placeholder="请输入订单号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="name" label="预约单号">
                        <el-input v-model="dialogForm.name" placeholder="请输入预约单号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="name" label="预约内容">
                        <el-input v-model="dialogForm.name" placeholder="请输入预约内容"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item prop="name" label="姓名">
                        <el-input v-model="dialogForm.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="channelType" label="渠道名称">
                        <el-select v-model="dialogForm.channelType" style="width:100%">
                            <el-option label="有赞商城" value="1"></el-option>
                            <el-option label="孩子王成长家" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="channelType" label="商品名称">
                        <el-select v-model="dialogForm.channelType" style="width:100%">
                            <el-option label="xxx" value="1"></el-option>
                            <el-option label="xxxxxx" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item prop="name" label="手机号">
                        <el-input v-model="dialogForm.name" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="name" label="预约时间">
                        <el-date-picker v-model="dialogForm.name" default-time="12:00:00" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="name" label="预约状态">
                        <el-select v-model="dialogForm.role" style="width: 100%">
                            <el-option label="全部" value="0"></el-option>
                            <el-option label="已预约（未确认）" value="1"></el-option>
                            <el-option label="已预约（已确认）" value="2"></el-option>
                            <el-option label="已完成" value="3"></el-option>
                            <el-option label="取消" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item prop="name" label="预约方式">
                        <el-select v-model="dialogForm.role" style="width: 100%">
                            <el-option label="全部" value="0"></el-option>
                            <el-option label="公众号预约" value="1"></el-option>
                            <el-option label="电话预约" value="2"></el-option>
                            <el-option label="管家预约" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="name" label="地址">
                        <el-input type="textarea" placeholder="请输入地址" v-model="dialogForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="name" label="可用次数">
                        <el-input-number class="inputnumber" size="small" v-model="dialogForm.num" @change="onChange" :min="0" :max="10" label="描述文字"></el-input-number>
                        剩余<font class="rest">{{dialogForm.num}}</font>次
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="submitForm('dialogForm')" :loading="isSaving">保 存</el-button>
        </div>
    </el-dialog>
</template>

<script>
const form = {
    channelType: '',
    role: '',
    name: '',
    d: '',
    num: 0
}
export default {
    name: 'addOrUpdata',
    props: ['visible'],
    data () {
        return {
            dialogForm: JSON.parse(JSON.stringify(form)),
            rules: {
                a: [
                    {
                        required: true,
                        whitespace: true,
                        message: '请输入品牌中文名称',
                        trigger: 'blur'
                    }
                ],
                b: [
                    {
                        required: true,
                        whitespace: true,
                        message: '请输入品牌中文名称',
                        trigger: 'blur'
                    }
                ]
            },
            isSaving: false
        }
    },
    computed: {
        dialog: {
            get () {
                return this.visible
            },
            set (val) {
                this.$emit('update:visible', val)
            }
        },
        title () {
            // todo 标题
            return ''
        }
    },
    methods: {
        onCancel () {
            this.dialog = false
            this.dialogForm = JSON.parse(JSON.stringify(form))
        },
        onChange (value) {
            console.log(value)
        }
    },
    mounted () {}
}
</script>

<style lang='scss' scoped>
.el-col {
    margin-bottom: 20px
}
.rest{color:#FF3300}
</style>
<style scoped>
.inputnumber >>> .el-input{
    margin-left: 0
}
</style>