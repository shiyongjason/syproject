<template>
    <el-drawer title="项目详情" :visible.sync="drawer" :before-close="handleClose" :modal-append-to-body='false' size='680px'>
        <div class="ProjectList2Detail">
            <el-radio-group v-model="radio1">
                <el-radio-button label="跟进记录"></el-radio-button>
                <el-radio-button label="项目信息"></el-radio-button>
            </el-radio-group>
            <div class="ProjectList2Detail-ctx">
                <div>
                    <b>项目类型：</b>项目植入供应链产品
                </div>
                <!-- 流程 -->
                <div class="process">
                    <div class="process-item isActive">首次接触</div>
                    <div class="step_arrow"></div>
                    <div class="process-item isActive">需求确认</div>
                    <div class="step_arrow"></div>
                    <div class="process-item isActive">提供方案/报价</div>
                    <div class="step_arrow"></div>
                    <div class="process-item isActive">商务洽谈，待签约</div>
                    <div class="step_arrow down"></div>
                    <div class="process-item pos5">商务洽谈，待签约</div>
                    <div class="step_arrow left"></div>
                    <div class="process-item pos6">已签约</div>

                </div>

            </div>

        </div>
    </el-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'ProjectList2Detail',
    components: {
    }
})
export default class ProjectList2Detail extends Vue {
    @Prop({ type: Boolean, required: true, default: false }) drawer:any
    radio1: string = '跟进记录';

    handleClose () {
        this.$emit('backEvent')
    }
}
</script>
<style lang='scss' scoped>
@import "./css/detail.scss";
</style>