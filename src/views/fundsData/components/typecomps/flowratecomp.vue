<template>
    <div>
        {{flowrateform}}
         <!-- 流贷组件 -->
        <h3>逾期</h3>
        <div class="query-cont-row">
            <el-form-item label="阶梯式计息：" prop="isStepOverInterest">
                <el-radio v-model.trim="flowrateform.isStepOverInterest" label=0>否</el-radio>
                <el-radio v-model.trim="flowrateform.isStepOverInterest" label=1>是</el-radio>
            </el-form-item>
        </div>
        <div class="smalltitle">逾期第一阶段利息：</div>
        <div class="query-cont-row" v-for="(item,index) in flowrateform.overdueList" :key="index">
            <div class="query-cont-col">
                <el-form-item :label="'第' +(index+1)+'阶段时长：'">
                    <el-input v-model.trim="item.dateNum" placeholder="请输入逾期时长"><template slot="append">月</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-form-item label="该阶段逾期利率：">
                    <el-input v-model.trim="item.overDueInterest" placeholder="请输入逾期利息"><template slot="append">%</template></el-input>
                </el-form-item>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" size="small" @click="onDeleteRate(index)" icon="el-icon-minus">删除</el-button>
            </div>
        </div>
        <div>
            <el-button type="primary" size="small" @click="onAddrate" icon="el-icon-plus" v-if="flowrateform.overdueList.length<5">下阶段利息</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'flowrateform',
    props: {
        flowrateform: {
            type: Object,
            default: {}
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
                console.log(this.newRata)
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法，如果设置了false，那么效果和上边例子一样
            immediate: true
        }
        // flowrateform (newName) {
        //     console.log(newName)
        //     this.newRata = JSON.parse(JSON.stringify(newName.overdueList[0]))
        //     console.log(this.newRata)
        // }
    },
    methods: {
        onAddrate () {
            let newObj = {...this.newRata}
            this.flowrateform.overdueList.push(newObj)
        },
        onDeleteRate (index) {
            this.flowrateform.overdueList.splice(index, 1)
        }
    }
}
</script>