<template>
    <div v-if="flowrateform">
        <!-- 流贷组件 -->
        <!-- <h3>流贷</h3> -->
        <div class="query-cont-row">
            <el-form-item label="阶梯式计息：" prop="isStepOverInterest">
                <el-radio v-model.trim="flowrateform.isStepOverInterest" :label=0 @change="()=>{$emit('stepOver',1)}">否</el-radio>
                <el-radio v-model.trim="flowrateform.isStepOverInterest" :label=1 @change="()=>{$emit('stepOver',2)}">是111</el-radio>
            </el-form-item>
        </div>
        <div class="query-cont-row" v-if="flowrateform.isStepOverInterest==0">
            <div class="query-cont-col">
                <el-form-item label="逾期利率：" prop="overDueInterest">
                    <el-input v-model.trim="flowrateform.overdueList[0].overDueInterest" v-isNum="flowrateform.overdueList[0].overDueInterest" maxlength='20' placeholder="请输入逾期利率"><template slot="append">%</template>
                    </el-input>
                </el-form-item>
            </div>
        </div>
        <template v-if="flowrateform.isStepOverInterest==1">
            <div class="" v-for="(item,index) in flowrateform.overdueList" :key="item.id">
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
                </div> -->
            </div>
            <div>
                <!-- <el-button type="primary" size="small" @click="onAddrate" icon="el-icon-plus" v-if="flowrateform.overdueList.length<5">下阶段利息</el-button> -->
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name: 'flowrateform',
    props: {
        flowrateform: {
            type: Object,
            default: () => { }
        }
    },
    data () {
        return {
            newRata: {}
        }
    },
    watch: {
        flowrateform: {
            handler (newName) {
                // console.log(newName)
                // newName.overdueList[0].overDueInterest = 12
            },
            deep: true
        }
    },
    methods: {
        onAddrate () {
            let newObj = { ...this.newRata }
            this.flowrateform.overdueList.push(newObj)
        },
        onDeleteRate (index) {
            this.flowrateform.overdueList.splice(index, 1)
        }
    }
}
</script>