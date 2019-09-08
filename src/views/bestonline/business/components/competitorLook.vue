<template>
    <el-collapse-item name="8">
        <template slot="title">
            <p class="title-p">竞争对手</p>
        </template>
        <div class="compete supplier" v-for="(item,index) in competitorCreateFormList" :key=index>
            <el-form-item label="竞争对手：" prop="competitorName " placeholder="竞争对手" maxlength="25">
                {{item.competitorName?item.competitorName:'-'}}
            </el-form-item>
            <el-form-item label="主营业态：" prop="mainForms" placeholder="主营业态" maxlength="25" class="mb20">
                {{item.mainForms?item.mainForms:'-'}}
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
