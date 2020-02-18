<template>
    <div>
        {{flowrateform}}
        <!-- 流贷组件 -->
        <!-- <h3>逾期</h3> -->
        <div class="query-cont-row">
            <el-form-item label="阶梯式计息：" prop="isStepOverInterest">
                <el-radio v-model.trim="flowrateform.isStepOverInterest" label=0>否</el-radio>
                <el-radio v-model.trim="flowrateform.isStepOverInterest" label=1>是</el-radio>
            </el-form-item>
        </div>
        <div v-for="(item,index) in flowrateform.overdueList" :key="index">
            <div class="smalltitle" >第{{index+1}}次还款：</div>
            <div class="query-cont-row" >
                <div class="query-cont-col">
                    <el-form-item label="约定还款日期：" prop="name">
                        <el-input v-model.trim="item.startTime" placeholder="请选择约定还款日期"></el-input>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item label="还款金额：" prop="name">
                        <el-input v-model.trim="item.startTime" placeholder="请输入还款金额"><template
                                slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </div>
            </div>
        </div>

        <h3>逾期</h3>
        <div class="query-cont-row">
            <el-form-item label="阶梯式计息：" prop="isStepOverInterest">
                <el-radio v-model.trim="flowrateform.isStepOverInterest" label=0>否</el-radio>
                <el-radio v-model.trim="flowrateform.isStepOverInterest" label=1>是</el-radio>
            </el-form-item>
        </div>
        <div class="query-cont-col">
            <el-form-item label="逾期利率：" prop="overDueInterest">
                <el-input v-model.trim="flowrateform.overDueInterest" placeholder="请输入逾期利率"><template slot="append">%</template>
                </el-input>
            </el-form-item>
        </div>
        <!-- <template v-if="flowrateform.isStepOverInterest==1">
            <div class="smalltitle">逾期第一阶段利息：</div>
            <div class="query-cont-row" v-for="(item,index) in flowrateform.overdueList" :key="index">
                <div class="query-cont-col">
                    <el-form-item :label="'第' +(index+1)+'阶段时长：'">
                        <el-input v-model.trim="item.dateNum" v-isNum:0="item.dateNum" maxlength='5'
                            placeholder="请输入逾期时长"><template slot="append">月</template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item label="该阶段逾期利率：">
                        <el-input v-model.trim="item.overDueInterest" v-isNum:0="item.overDueInterest" maxlength='5'
                            placeholder="请输入逾期利息"><template slot="append">%</template></el-input>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-button type="primary" size="small" @click="onDeleteRate(index)" icon="el-icon-minus">删除
                    </el-button>
                </div>
            </div>
            <div>
                <el-button type="primary" size="small" @click="onAddrate" icon="el-icon-plus"
                    v-if="flowrateform.overdueList.length<5">下阶段利息</el-button>
            </div>
        </template> -->
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
                this.newRata = JSON.parse(JSON.stringify(newName.overdueList[0]))
                let newObj = { ...this.newRata }
                this.flowrateform.overdueList = []
                for (let i = 0; i < 3; i++) {
                    this.flowrateform.overdueList.push(newObj)
                }
                console.log(this.flowrateform)
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法，如果设置了false，那么效果和上边例子一样
            immediate: true
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