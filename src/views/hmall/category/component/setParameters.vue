<template>
    <div>
      <div class="set-drawer">
          <div class="page-body-cont query-cont">
              <div class="query-cont-row">
                  <div class="query-cont-col">
                      <el-button type="primary" class="ml20" @click="onAdd">
                          新增参数
                      </el-button>
                      <el-button type="primary" class="ml20" @click="onDelete">
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
                  <template slot="isRequired" slot-scope="scope">
                      {{ isRequiredMap.get(scope.data.row.isRequired) || '-' }}
                  </template>
                  <template slot="isCombobox" slot-scope="scope">
                      {{ typeMap.get(scope.data.row.isCombobox) || '-' }}
                  </template>
                  <template slot="style" slot-scope="scope">
                      <template v-if="scope.data.row.isCombobox === 0">
                          <el-input placeholder="请输入内容" disabled>
                              <template v-if="scope.data.row.unit" slot="append">{{scope.data.row.unit}}</template>
                          </el-input>
                      </template>
                      <template v-if="scope.data.row.isCombobox === 1">
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
        :title="attributeInfo.title"
        :visible.sync="attributeVisible"
        :before-close="closeDialog"
        append-to-body
        width="500px"
      >
            <el-form
                ref="attributeForm"
                :model="attributeForm"
                :rules="attributeFormRules"
                label-width="150px">
                <el-form-item label="参数名称：" prop="k">
                     <el-input type="input" v-model="attributeForm.k" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="参数类型：" prop="isCombobox">
                     <el-select v-model="attributeForm.isCombobox" placeholder="请选择">
                         <el-option
                            label="下拉框"
                            :value="1">
                        </el-option>
                         <el-option
                            label="输入框"
                            :value="0">
                        </el-option>
                     </el-select>
                </el-form-item>

                <!-- 根据不同的选择出现不同的操作， -->
                <div v-if="attributeForm.isCombobox === 1" class="isCombobox-box">
                    <el-form-item
                        v-for="(item, index) in attributeForm.options"
                        :label="'选项' + (index+1) + '：'"
                        :key="index"
                        :prop="`options[${index}].option`"
                        :rules="attributeFormRules.option"
                    >
                        <el-input v-model="item.option" style="width: 200px" maxlength="20"></el-input>

                        <span
                            class="ml10 el-icon-remove-outline form-add-remove"
                            v-if="index > 0"
                            @click="removeOption(item)"
                        ></span>
                        <span
                            class="ml10 el-icon-circle-plus-outline form-add-remove"
                            v-if="attributeForm.options.length < 10 && index + 1 === attributeForm.options.length"
                            @click="addOption(item)"
                        ></span>
                    </el-form-item>
                </div>

                <el-form-item label="单位：" prop="unit" v-show="attributeForm.isCombobox === 0">
                    <el-input type="input" v-model="attributeForm.unit" maxlength="20" placeholder="请输入单位"></el-input>
                </el-form-item>

                <el-form-item label="是否必填：" prop="isRequired">
                    <el-radio-group v-model="attributeForm.isRequired">
                        <el-radio :label="1">必填</el-radio>
                        <el-radio :label="0">非必填</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div class="mt10 center-btn">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="onSave">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    createSpecifications, updateSpecifications
} from '../api/index.js'
import { SETTING_REQUIRED_MAP, SETTING_TYPE_MAP } from '../const'
import { mapState, mapActions } from 'vuex'
import { deepCopy } from '@/utils/utils'
export default {
    props: {
        categoryId: {
            type: Number,
            default: 0,
            required: true
        }
    },
    data () {
        return {
            isFirst: false,
            tableData: [],
            tableLabel: [
                { label: '参数名称', prop: 'k' },
                { label: '是否必填', prop: 'isRequired' },
                { label: '类型', prop: 'isCombobox' },
                { label: '样式', prop: 'style', minWidth: '120px' }
            ],
            specificationsReq: [],
            multiSelection: [],
            isRequiredMap: SETTING_REQUIRED_MAP,
            typeMap: SETTING_TYPE_MAP,
            attributeVisible: false,
            editObj: {},
            attributeForm: {
                k: '',
                isCombobox: '',
                isRequired: 0,
                unit: '',
                options: [
                    {
                        option: ''
                    }
                ]
            },
            attributeFormRules: {
                k: [
                    { required: true, message: '参数名称不能为空！' }
                ],
                isCombobox: [
                    { required: true, message: '参数类型不能为空！' }
                ],
                isRequired: [
                    { required: true, message: '是否必填不能为空！' }
                ],
                option: [
                    { required: true, message: '此项为必填项！' }
                ]
            },
            attributeInfo: {
                type: 'add',
                title: '参数新增'
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapState('category', {
            specificationsInfo: 'specificationsInfo'
        })
    },
    mounted () {
        this.findSpecificationsAsync()
    },
    methods: {
        ...mapActions('category', [
            'findSpecifications'
        ]),
        onAdd () {
            this.attributeInfo.type = 'add'
            this.attributeInfo.title = '参数新增'
            this.attributeVisible = true
        },
        // 编辑时保存行对象，用于保存时查询index
        onEdit (row) {
            this.attributeInfo.type = 'edit'
            this.attributeInfo.title = '参数编辑'
            this.editObj = deepCopy(row)
            this.attributeForm = deepCopy(row)
            this.attributeVisible = true
        },

        // 添加下拉框选项
        addOption (item) {
            // const index = this.attributeForm.options.indexOf(item)
            this.attributeForm.options.push({
                option: ''
            })
        },

        // 删除下拉框选项
        removeOption (item) {
            const index = this.attributeForm.options.indexOf(item)
            this.attributeForm.options.splice(index, 1)
        },

        onSave () {
            this.$refs['attributeForm'].validate(async (valid) => {
                if (valid) {
                    // 如果是第一次新增，走post接口
                    if (this.isFirst) {
                        this.specificationsReq.push(this.attributeForm)
                        let newArray = this.specificationsReq.map(v => {
                            return {
                                ...v,
                                options: v.options.map(i => {
                                    return i.option
                                })
                            }
                        })
                        await createSpecifications({
                            categoryId: this.categoryId,
                            id: '',
                            specifications: newArray
                        })
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        })
                        this.closeDialog()
                        this.findSpecificationsAsync()
                        // 不是走put更新接口
                    } else {
                        // 判断是否是页面的新增类型，是的话直接push，不是再做处理
                        if (this.attributeInfo.type === 'add') {
                            // 判断参数名称是否重复，重复则不可以添加
                            let hasRepeat = this.specificationsReq.find(v => {
                                return v.k == this.attributeForm.k
                            })
                            if (hasRepeat) {
                                this.$message.warning('参数不可重复')
                                return
                            }

                            this.specificationsReq.push(this.attributeForm)
                        } else {
                            // 判断编辑的对象所属index，并作替换操作
                            let updeteIndex = this.specificationsReq.findIndex(v => v == this.editObj)
                            this.specificationsReq.splice(updeteIndex, 1, this.attributeForm)
                        }
                        let newArray = this.specificationsReq.map(v => {
                            return {
                                ...v,
                                options: v.options.map(i => {
                                    return i.option
                                })
                            }
                        })
                        this.updateSpecificationsAsync({
                            categoryId: this.categoryId,
                            id: this.specificationsInfo.id,
                            specifications: newArray
                        }, this.attributeInfo.type === 'add' ? 'add' : 'edit')
                    }
                }
            })
        },
        // 获取原数组中不包含选中的元素数组并更新
        deleteAsync () {
            let newSpecificationsReq = this.specificationsReq.filter(v1 => {
                return this.multiSelection.every(v2 =>
                    v1.k != v2.k
                )
            }).map(v => {
                return {
                    ...v,
                    options: v.options.map(i => {
                        return i.option
                    })
                }
            })
            this.updateSpecificationsAsync({
                categoryId: this.categoryId,
                id: this.specificationsInfo.id,
                specifications: newSpecificationsReq
            }, 'delete')
        },
        onDelete (row) {
            if (row.k) {
                this.multiSelection = [row]
            } else {
                if (this.multiSelection.length === 0) {
                    this.$message.warning('请先选择参数')
                    return
                }
            }
            this.$confirm('是否删除该参数', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteAsync()
            }).catch(() => {
            })
        },
        closeDialog () {
            this.attributeForm = {
                k: '',
                isCombobox: '',
                isRequired: 0,
                unit: '',
                options: [
                    {
                        option: ''
                    }
                ]
            }
            // 这边存在一个问题，直接删除不出现attributeForm会报错
            try {
                this.$refs['attributeForm'].resetFields()
            } catch (error) {

            }
            this.attributeVisible = false
        },
        async findSpecificationsAsync () {
            await this.findSpecifications({ categoryId: this.categoryId })
            // 这边如果后台返回data是空，则手动赋值数值，并记录为第一次新增操作是新增，以后的所有操作都是编辑
            if (this.specificationsInfo) {
                this.isFirst = false
            } else {
                this.isFirst = true
            }

            // 这里对参数字段进行了对象化处理，为了满足动态表单
            let newArray = (this.specificationsInfo.specifications || []).map(v => {
                return {
                    ...v,
                    options: v.options.map(i => {
                        return {
                            option: i
                        }
                    })
                }
            })
            this.tableData = newArray || []
            this.specificationsReq = newArray || []
        },

        // 注意req.specifications中的options元素是普通字符串
        async updateSpecificationsAsync (req, type) {
            await updateSpecifications(req)
            this.closeDialog()
            this.$message({
                type: 'success',
                message: type === 'add' ? '新增成功' : (type === 'edit' ? '编辑成功' : '删除成功')
            })
            this.findSpecificationsAsync()
        }
    }

}
</script>

<style lang="scss" scoped>
.form-add-remove {
    font-size: 22px;
    color: #ff9c31;
    cursor: pointer;
    line-height: 40px;
    vertical-align: top;
}
.set-drawer {
    padding: 20px;
}
.center-btn {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
}
.isCombobox-box {
    height: 240px;
    padding: 20px 0;
    overflow-y: scroll;
    border: 1px solid rgb(247, 229, 229);
}
</style>
