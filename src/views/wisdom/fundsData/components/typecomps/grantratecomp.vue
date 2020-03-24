<template>
    <div v-if="flowrateform.length>0">
        <!-- 敞口和分授信逾期组件-还款方式约定还款模块 -->
        <div v-for="(item,index) in flowrateform" :key="index">
            <div class="smalltitle">第{{index+1}}次还款：</div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="约定还款日期：" prop="endTime">
                        {{item.endTime || '-'}}
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item label="还款金额：" prop="capitalAmount">
                        <el-input disabled v-model.trim="item.capitalAmount" v-isNum="item.capitalAmount" maxlength='20' placeholder="请输入还款金额"><template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'grantrateform',
    props: {
        flowrateform: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            newRata: {
                dateNum: '',
                dateType: '',
                overDueInterest: '',
                planId: '',
                sort: '',
                startTime: ''
            }
        }
    }
}
</script>