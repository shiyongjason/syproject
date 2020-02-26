<template>
    <div v-if="flowrateform.length>0">
        <!-- 敞口组件 -->
        <div v-for="(item,index) in flowrateform" :key="index">
            <div class="smalltitle">第{{index+1}}次还款：</div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="约定还款日期：" prop="endTime">
                        <!-- <el-date-picker v-model="" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="datetime" placeholder="请选择约定还款日期">
                        </el-date-picker> -->
                        {{item.endTime}}
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
        <h3>逾期</h3>
        <div class="query-cont-row">
            <div class="query-cont-col">
                <el-form-item label="阶梯式计息：" prop="isStepOverInterest">
                    <el-radio v-model.trim="flowrateform[0].isStepOverInterest" :label=0 @change="()=>{$emit('stepOver',1)}">否</el-radio>
                    <el-radio v-model.trim="flowrateform[0].isStepOverInterest" :label=1 @change="()=>{$emit('stepOver',2)}">是</el-radio>
                </el-form-item>
            </div>
        </div>
        <div class="query-cont-row">
            <div class="query-cont-col" v-if="flowrateform[0].isStepOverInterest==0">
                <el-form-item label="逾期利率：" prop="overDueInterest">
                    <el-input v-model.trim="flowrateform[0].overDueInterest" v-isNum="flowrateform[0].overDueInterest" maxlength='20' placeholder="请输入逾期利率"><template slot="append">%</template>
                    </el-input>
                </el-form-item>
            </div>
        </div>
        <template v-if="flowrateform[0].isStepOverInterest==1">
            <div class="" v-for="(item,index) in flowrateform[0].overdueList" :key="item.id">
                <div class="smalltitle">逾期第{{index+1}}阶段利息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item :label="'第' +(index+1)+'阶段时长：'">
                            <el-input v-model.trim="item.dateNum" v-isNum:0="item.dateNum" maxlength='5' placeholder="请输入逾期时长"><template slot="append">月</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="该阶段逾期利率：">
                            <el-input v-model.trim="item.overDueInterest" v-isNum:0="item.overDueInterest" maxlength='5' placeholder="请输入逾期利息"><template slot="append">%</template></el-input>
                        </el-form-item>
                    </div>
                </div>
                <!-- <div class="query-cont-col">
                    <el-button type="primary" size="small" @click="onDeleteRate(index)" icon="el-icon-minus">删除
                    </el-button>
                </div>  -->
            </div>
            <!-- <div>
                 <el-button type="primary" size="small" @click="onAddrate" icon="el-icon-plus" v-if="flowrateform[0].overdueList.length<5">下阶段利息</el-button>
            </div> -->
        </template>
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
    },
    watch: {
        // flowrateform (val) {
        //     console.log(1, val)
        // }
        // flowrateform: {
        //     handler (newName) {
        //         console.log(newName)
        //         newName[0].overdueList[0].overDueInterest = 12
        //     },
        //     deep: true
        // }
    },
    methods: {
        onAddrate () {
            let newObj = { ...this.newRata }
            this.flowrateform[0].overdueList.push(newObj)
        },
        onDeleteRate (index) {
            this.flowrateform[0].overdueList.splice(index, 1)
        }
    }
}
</script>