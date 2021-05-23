<template>
    <div class="tab-layout" >
        <div v-for="(item,index) in loanTransferRecord" :key="index + 'loanTransferRecord'">
            <div class="info-layout">
                <div class="info-layout-item"><font style="color:#169BD5;margin-right:6px;min-width: 32px;">{{item.operator||'-'}}</font><span>{{item.operator||'-'}}</span></div>
                <div class="info-layout-item" style="flex:0 0 150px"><font>{{item.operatorTime|formatterTime}}</font></div>
            </div>
            <div class="remark-infos">
                备注：{{item.remark||'-'}}
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'ViewHandoverRecords'
})
export default class ViewHandoverRecords extends Vue {
    @Prop({ default: '' }) readonly loanTransferRecord!:any

    openDialog:boolean=false

    handleOpenDialog=() => {
        this.openDialog = true
    }

    onCancel=() => {

    }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>
