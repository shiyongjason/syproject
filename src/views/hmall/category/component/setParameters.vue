<template>
    <div>
      <div class="drawer-page">
          <div class="page-body-cont query-cont">
              <div class="query-cont-row">
                  <div class="query-cont-col">
                      <el-button type="primary" class="ml20" @click="onShowAdd('child')">
                          新增参数
                      </el-button>
                      <el-button type="primary" class="ml20" @click="onShowAdd('brother')">
                          批量删除
                      </el-button>
                  </div>
              </div>
          </div>
          <div class="page-body-cont">
              <basicTable
                  isMultiple
                  :isAction="true"
                  :tableData="tableData"
                  :tableLabel="tableLabel"
                  :isShowIndex="false"
                  :multiSelection.sync="multiSelection"
                  :actionMinWidth='120'
              >
                  <template slot="required" slot-scope="scope">
                      {{ requiredMap.get(scope.data.row.required) || '-' }}
                  </template>
                  <template slot="type" slot-scope="scope">
                      {{ typeMap.get(scope.data.row.type) || '-' }}
                  </template>
                  <template slot="style" slot-scope="scope">
                      <template v-if="scope.data.row.type === 1">
                          <el-input placeholder="请输入内容" disabled>
                              <template v-if="scope.data.row.unit" slot="append">{{scope.data.row.unit}}</template>
                          </el-input>
                      </template>
                      <template v-else>
                          <el-select v-model="scope.data.row.style" placeholder="请选择"></el-select>
                      </template>
                  </template>
                  <template slot="action" slot-scope="scope">
                      <el-button class="orangeBtn" @click="onEdit(scope.data.row)">编辑</el-button>
                      <el-button class="orangeBtn" @click="onDelete(scope.data.row)">删除</el-button>
                  </template>
              </basicTable>
          </div>
      </div>
      <el-dialog
        title="设置参数"
        :visible.sync="attributeVisible"
        append-to-body
        width="500px"
      >
            <el-form
                ref="attributeForm"
                :model="attributeForm"
                :rules="attributeFormRules"
                label-width="150px">
                <el-form-item label="属性名称：" prop="name">
                     <el-input type="input" v-model="attributeForm.name" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="属性类型：" prop="type">
                     <el-input type="input" v-model="attributeForm.type" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="是否必填：" prop="required">
                    <el-radio-group v-model="attributeForm.required">
                        <el-radio label="1">必填</el-radio>
                        <el-radio label="0">非必填</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div class="mt10 center-btn">
                <el-button @click="attributeVisible = false">取消</el-button>
                <el-button type="primary">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { SETTING_REQUIRED_MAP, SETTING_TYPE_MAP } from '../const'
export default {
    data () {
        return {
            tableData: [
                {
                    name: '参数1',
                    required: 1,
                    type: 1,
                    unit: 'm'
                },
                {
                    name: '参数2',
                    required: 0,
                    type: 2,
                    unit: ''
                }
            ],
            tableLabel: [
                { label: '参数名称', prop: 'name' },
                { label: '是否必填', prop: 'required' },
                { label: '类型', prop: 'type' },
                { label: '样式', prop: 'style', minWidth: '120px' }
            ],
            multiSelection: [],
            requiredMap: SETTING_REQUIRED_MAP,
            typeMap: SETTING_TYPE_MAP,
            attributeVisible: false,
            attributeForm: {
                name: '',
                type: '',
                required: ''
            },
            attributeFormRules: {
                name: [
                    { required: true, message: '审核结果不能为空！' }
                ],
                type: [
                    { required: true, message: '审核结果不能为空！' }
                ],
                required: [
                    { required: true, message: '审核结果不能为空！' }
                ]
            }
        }
    },
    methods: {
        onDelete (row) {
            this.$confirm('是否删除该参数', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        onEdit (row) {
            this.attributeVisible = true
            this.$emit('onEditAttribute', row)
        }
    }
}
</script>

<style lang="scss" scoped>
.center-btn {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>
