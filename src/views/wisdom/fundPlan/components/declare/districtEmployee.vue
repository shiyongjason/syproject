<template>
    <div>
        <h3>区域申报内容</h3>
        <el-form label-width="120px">
            <el-form-item label="2020年4月预计资金还款：">
                <div class="query-cont-col">
                    <el-input type="text" v-model="districtContent.a"></el-input>万元
                </div>
            </el-form-item>
            <el-form-item label="2020年4月预计资金用款：">
                <div class="query-cont-col">
                    <div class="w250">
                        <el-input type="text" v-model="districtContent.a"></el-input>万元
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="资金支持类型：">
                <div class="query-cont-col">
                    <div class="w250">
                        <el-select v-model="districtContent.b">
                            <el-option label="请选择" value="1"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="2020年4月预计销售：">
                <div class="query-cont-col">
                    <div class="w250">
                        <el-input type="text" v-model="districtContent.a"></el-input>万元
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="区域意见：">
                <div class="query-cont-col">
                    <div class="w250">
                        <el-input type="textarea" v-model="districtContent.a" :row="3"></el-input>
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'districtEmployee',
    data () {
        return {
            districtContent: {}
        }
    }
}
</script>

<style lang='scss' scoped>
</style>
