<template>
    <div class="baseinfo">
        <el-form-item label="档案编号：" prop="num">
            <el-input v-if="!isEdit" v-isNum="baseInfo.num" v-model="baseInfo.num" placeholder="请输入档案编号"></el-input>
            <span v-else>xxx</span>
        </el-form-item>
        <el-form-item label="公司状态：" prop="aa">
            <template v-if="!isEdit">
                <el-radio v-model="radio" label="1">合作中</el-radio>
                <el-radio v-model="radio" label="2">未合作</el-radio>
                <el-radio v-model="radio" label="3">淘汰</el-radio>
            </template>
            <span v-else>{{baseInfo.aa}}</span>
        </el-form-item>
        <el-form-item label="平台公司名称：" prop="cc">
            <el-input v-if="!isEdit" v-isNum:2="baseInfo.cc" v-model="baseInfo.cc"  placeholder="请输入平台公司名称"></el-input>
            <span v-else>{{baseInfo.cc}}</span>
        </el-form-item>
        <el-form-item label="老公司名称：">
            <el-input v-if="!isEdit" v-model="baseInfo.bb" placeholder="请输入老公司名称"></el-input>
            <span v-else>{{baseInfo.bb}}</span>
        </el-form-item>
        <el-form-item label="地址：">
            <template v-if="!isEdit">
                <el-select v-model="value" clearable placeholder="请选择省份">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value" clearable placeholder="请选择市" style="margin:0 10px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value" clearable placeholder="请选择区">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div>
                    <el-input v-model="baseInfo.dd" placeholder="请输入地址" style="width:500px;margin-top:10px"></el-input>
                </div>
            </template>
            <span v-else>{{baseInfo.dd}}</span>
        </el-form-item>
        <el-form-item label="分部：">
            <el-select v-if="!isEdit" v-model="value" clearable placeholder="请选择所属分部">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span v-else>{{baseInfo.ee}}</span>
        </el-form-item>
        <el-form-item label="区域：">
            <el-select v-if="!isEdit" v-model="value" clearable placeholder="请选择所属区域">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span v-else>{{baseInfo.ff}}</span>
        </el-form-item>
        <el-form-item label="档案位置：">
            <el-input v-if="!isEdit" v-model="baseInfo.gg" placeholder="请输入纸质档案所在位置" type='textarea' :rows="6" style="width:700px"></el-input>
            <span v-else>{{baseInfo.gg}}</span>
        </el-form-item>
    </div>
</template>

<script>
export default {
    name: 'baseInfo',
    props: ['value', 'isEdit'],
    data () {
        return {
            radio: '', // 1
            options: []
        }
    },
    computed: {
        baseInfo: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {

    },
    mounted () {

    }
}
</script>

<style scoped>
.baseinfo {
    border: 1px solid #e4e7ed;
    border-top: none;
    padding: 70px;
}
</style>