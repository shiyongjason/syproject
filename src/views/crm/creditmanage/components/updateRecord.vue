<template>
    <div class="update-record">
        <template v-if="list.length > 0">
            <div class="update-record_item" v-for="item in list" :key="item.id">
                <template v-if="item.type == 1">
                    <p class="p">
                        <font>{{ item.createBy || '-' }}{{ item.createPhone }}</font> 在 <font>{{ item.createTime | momentFormat }}</font> 将 <font>{{ item.labelField }}</font>关联到了当前企业
                    </p>
                </template>
                <template v-else-if="item.type == 2">
                    <p class="p">
                        <font>{{ item.createBy || '-' }}{{ item.createPhone }}</font> 在 <font>{{ item.createTime | momentFormat }}</font> 将 <font>{{ item.labelField }}</font>和当前企业取消了关联
                    </p>
                </template>
                <template v-else-if="item.type == 3">
                    <p class="p">
                        <font>{{ item.createBy || '-' }}{{ item.createPhone }}</font> 在 <font>{{ item.createTime | momentFormat }}</font> 将当前企业和<font>{{ item.labelField }}</font>进行关联
                    </p>
                </template>
                <template v-else-if="item.type == 4">
                    <p class="p">
                        <font>{{ item.createBy || '-' }}{{ item.createPhone }}</font> 在 <font>{{ item.createTime | momentFormat }}</font> 将当前企业和<font>{{ item.labelField }}</font>取消了关联
                    </p>
                </template>
                <template v-else-if="item.type == 5">
                    <p class="p">
                        <font>{{ item.createBy || '-' }}{{ item.createPhone }}</font> 在 <font>{{ item.createTime | momentFormat }}</font> 将通用额度设置为：
                    </p>
                </template>
                <template v-else-if="item.type == 6">
                    <p class="p">
                        <font>{{ item.createBy || '-' }}{{ item.createPhone }}</font> 在 <font>{{ item.createTime | momentFormat }}</font> 将 <font>"新增"</font>临时额度
                    </p>
                </template>
                <template v-else-if="item.type == 7">
                    <p class="p">
                        <font>{{ item.createBy || '-' }}{{ item.createPhone }}</font> 在 <font>{{ item.createTime | momentFormat }}</font> 将临时额度手动设置为<font>"失效"</font>
                    </p>
                </template>
                <template v-else-if="item.type == 8">
                    <p class="p">
                        <font>{{ item.createBy || '-' }}{{ item.createPhone }}</font> 在 <font>{{ item.createTime | momentFormat }}</font>临时额度<font>自动失效</font>
                    </p>
                </template>
                <template v-else-if="item.type == 9">
                    <p class="p">
                        <font>{{ item.createBy || '-' }}{{ item.createPhone }}</font> 在 <font>{{ item.createTime | momentFormat }}</font> <font>"开启"</font>风控冻结
                    </p>
                </template>
                <template v-else-if="item.type == 10">
                    <p class="p">
                        <font>{{ item.createBy || '-' }}{{ item.createPhone }}</font> 在 <font>{{ item.createTime | momentFormat }}</font> <font>"解除"</font>风控冻结
                    </p>
                </template>
                <template v-else-if="item.type == 11">
                    <p class="p">
                        <font>{{ item.createBy || '-' }}{{ item.createPhone }}</font> 在 <font>{{ item.createTime | momentFormat }}</font> 将风控冻结<font>自动解除</font>
                    </p>
                </template>
                <ul class="update-record_item--detail" v-if="item.companyCreditChangeRecordDetailList && item.companyCreditChangeRecordDetailList.length > 0">
                    <li v-for="value in item.companyCreditChangeRecordDetailList" :key="value.id">
                        <!-- 变更 -->
                        <template v-if="value.type == 1">
                            <p class="p">{{ value.fieldName }}: <font>{{ value.contentBeforeChange }}</font> 修改为 <font>{{ value.contentAfterChange }}</font>
                            </p>
                        </template>
                        <!-- 保存 -->
                        <template v-if="value.type == 2">
                            <p class="p">{{ value.fieldName }}: <font>{{ value.saveValue }}</font>
                            </p>
                        </template>
                    </li>
                </ul>
            </div>
        </template>
        <div v-else>暂无记录</div>
    </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
    // filters: {
    //     updateRecordFilter (val, name) {
    //         let result = ''
    //         switch (parseInt(val)) {
    //             case 1:
    //                 result = `将关联了当前企业`
    //                 break
    //             case 2:
    //                 result = `将${ name }和当前企业取消了关联`
    //                 break
    //             case 3:
    //                 result = `将当前企业和${name}进行关联`
    //                 break
    //             case 4:
    //                 result = `将当前企业和${name}取消了关联`
    //                 break
    //             case 5:
    //                 result = '将通用额度设置为：'
    //                 break
    //             case 6:
    //                 result = '新增临时额度'
    //                 break
    //             case 7:
    //                 result = '临时额度手动设置'
    //                 break
    //             case 8:
    //                 result = '临时额度自动失效'
    //                 break
    //             case 9:
    //                 result = '开启风控冻结'
    //                 break
    //             case 10:
    //                 result = '解除风控冻结'
    //                 break
    //             case 11:
    //                 result = '风控冻结自动解除'
    //                 break
    //             default:
    //                 break
    //         }
    //         return result
    //     }
    // }
})
export default class UpdateRecord extends Vue {
    @Prop({ default: [] }) readonly list: any[];
}
</script>
<style scoped lang='scss'>
.update-record {
    &_item {
        background-color: #eeeeee;
        margin-bottom: 10px;
        .p {
            padding: 5px 10px;
            word-break: break-all;
            font {
                color: #ff7a45;
            }
        }
    }
}
</style>
