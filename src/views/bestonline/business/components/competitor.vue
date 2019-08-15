<template>
<el-collapse-item name="8">
    <template slot="title">
        <p class="titlt-p">竞争对手</p>
    </template>
    <div class="compete supplier" v-for="(item,index) in form.dueBusinessCompetitorCreateFormList" :key=index>
        <i class="el-icon-circle-plus-outline pointer" v-show="!isdisabled" @click="addCompet" v-if="index==0"></i>
        <i class="el-icon-remove-outline pointer" v-show="!isdisabled" v-else @click="deleteCompet(index)"></i>
        <el-form-item label="竞争对手：" prop="competitorName " placeholder="竞争对手" maxlength="25" :disabled="isdisabled">
            <el-input v-model="item.competitorName"></el-input>
        </el-form-item>
        <el-form-item label="主营业态：" prop="mainForms" placeholder="主营业态" maxlength="25" :disabled="isdisabled" class="mb20">
            <el-input v-model="item.mainForms"></el-input>
        </el-form-item>
    </div>
</el-collapse-item>
</template>

<script>
export default {
    
}
</script>
