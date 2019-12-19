<template>
    <div>
        <div class="page-body">
            <div class="page-body-cont query-cont">
                <div class="query-cont-col">
                    <div class="query-col-title">资源模板名称：</div>
                    <div class="query-col-input">
                        <el-input type="text" maxlength="20" v-model="message.name" placeholder="请输入">
                        </el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">资源类目：</div>
                    <div class="flex-wrap-cont">
                        <el-cascader
                            v-model="message.category"
                            :options="options"
                            :props="{ expandTrigger: 'hover' }"
                            @change="handleChange"></el-cascader>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">说明：</div>
                    <div class="flex-wrap-cont">
                       <el-input v-model="message.explain"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onQuery()">查询</el-button>
                    </div>
                </div>
            </div>
            <div class="page-body-cont">
                <div class="add-btn">
                   资源规格 <el-button type="primary" class="ml20" @click="onQuery()">添加规格值</el-button>
                </div>
                <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <div class="row">
                        <el-form-item label="规格名">
                            <el-input type="text"></el-input>
                        </el-form-item>
                        <el-form-item label="规格值">
                            <el-input type="text"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="detailed-title">
                    规格明细 <el-button type="primary" class="ml20" @click="onQuery()">一键全关</el-button>
                </div>
                <table>
                    <tr>
                        <th>单位</th>
                        <th>单位</th>
                        <th>资源名称</th>
                        <th>关联MDM编码</th>
                        <th>是否可用</th>
                    </tr>
                    <tr>
                        <td>台</td>
                        <td>台</td>
                        <td>台</td>
                        <td><el-input type="text"></el-input></td>
                        <td>
                            <el-switch
                                v-model="value"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addOrEditOrDetails',
    data () {
        return {
            message: {},
            form: {},
            rules: {}
        }
    }
}
</script>

<style scoped>

</style>
