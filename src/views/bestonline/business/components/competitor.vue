<template>
<el-collapse-item name="8">
    <template slot="title">
        <p class="title-p">竞争对手</p>
    </template>
     <div class="compete supplier" v-for="(item,index) in competitorCreateFormList" :key=index>
       <i class="el-icon-circle-plus-outline pointer"  @click="addCompet" v-if="index==0"></i>
        <i class="el-icon-remove-outline pointer"  v-else @click="deleteCompet(index)"></i>
       <el-form-item label="竞争对手：" prop="competitorName " placeholder="竞争对手" maxlength="25" >
            <el-input v-model="item.competitorName"></el-input>
        </el-form-item>
     <el-form-item label="主营业态：" prop="mainForms" placeholder="主营业态" maxlength="25" class="mb20">
            <el-input v-model="item.mainForms"></el-input>
        </el-form-item>
    </div>
</el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
            defaultCompetitor: {
                competitorName: '',
                mainForms: ''
            }
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.businessData
        }),
        competitorCreateFormList () {
            let businessCompetitorCreateFormList = this.form.dueBusinessCompetitorCreateFormList
            if (!businessCompetitorCreateFormList) {
                businessCompetitorCreateFormList = []
            }
            if (businessCompetitorCreateFormList.length == 0) {
                let defaultObj = JSON.parse(JSON.stringify(this.defaultCompetitor))
                businessCompetitorCreateFormList.push(defaultObj)
            }
            return businessCompetitorCreateFormList
        }
    },
    mounted () {
    },
    methods: {
        addCompet () {
            const tempObj = JSON.parse(JSON.stringify(this.defaultCompetitor))
            this.form.dueBusinessCompetitorCreateFormList.push(tempObj)
        },
        deleteCompet (index) {
            this.form.dueBusinessCompetitorCreateFormList.splice(index, 1)
        }
    }
}
</script>
