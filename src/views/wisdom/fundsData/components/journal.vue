<template>
    <div class="journal">
        <div class="journal-wrap">
            <div class="journal-wrap_box">
                <span>状态：sas</span>
                <el-button size="mini" type="primary" @click="onExamine">超小按钮</el-button>
            </div>
            <div class="journal-wrap_box">
                <span>申请时间：sas</span>
                <span>申请人：施勇</span>
            </div>
            <div class="journal-wrap_box">
                内容：从奥术大师多客户
            </div>
        </div>
        <el-dialog title="审核意见" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form ref="examineForm" :model="examineForm" :rules="examineRules">
                <el-form-item label="活动名称">
                    <el-input v-model="examineForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component({
    name: 'xx'
})
export default class Journal extends Vue {
    @Prop({ default: false }) private isLevel !: boolean
    private name = ''
    private dialogVisible = false
    examineForm:Record<any, any> = {}

    get examineRules () {
        return {}
    }

    // emit 事件 装饰
    @Emit()
    getName () {

    }

    public onExamine () {
        this.dialogVisible = true
    }

    public handleClose () {

    }
}
</script>
<style lang="scss" scoped>
.journal {
    &-wrap {
        span {
            margin-right: 40px;
        }
        position: relative;
        &::after {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            border-bottom: 1px solid #e5e5e5;
        }
        &_box {
            margin-bottom: 15px;
        }
    }
}
</style>