<template>
    <div class="page-body">

        <div class="role">
            <div class="h-page-title">
                基本信息
            </div>
            <div class="h-page-flex">
                <div class="flex-col">
                    <div class="flex-row">姓名：11</div>
                    <div class="flex-row">姓名：11</div>
                </div>
                <div class="flex-col">
                    <div class="flex-row">姓名：11</div>
                    <div class="flex-row">姓名：11</div>
                </div>
            </div>
            <div class="h-page-title">
                权限管理
            </div>
            <div class="h-roletable">
                <table class="tablelist">
                    <thead>
                        <tr>
                            <td width="20%">一级菜单</td>
                            <td width="20%">二级菜单</td>
                            <td
                                width="60%"
                                colspan=3
                            >权限</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item) in tableList">
                            <template v-for="(itema) in item.itemArr">
                                <tr v-for="(itemb,indexb) in itema.itemArr" :key="itemb.total">
                                    <td
                                        :rowspan="item.total"
                                        v-if="itemb.sindex==0"
                                    >
                                        <el-checkbox v-model="checked">{{item.name}}{{indexb}}</el-checkbox>
                                    </td>
                                    <td
                                        :rowspan="itema.itemArr.length"
                                        v-if="indexb==0"
                                    >
                                        <el-checkbox v-model="checked">{{itema.name}}</el-checkbox>
                                    </td>
                                    <td>
                                        <el-checkbox v-model="checked">{{itemb.name}}</el-checkbox>
                                    </td>
                                    <td>
                                        <el-checkbox v-model="checked">查询{{indexb}}</el-checkbox>
                                        <el-radio-group
                                            v-model="radio1"
                                            size="mini"
                                             @change="changeDialg()"
                                        >
                                            <el-radio-button label="全部"></el-radio-button>
                                            <el-radio-button label="配置"></el-radio-button>
                                        </el-radio-group>
                                    </td>
                                    <td>
                                        <el-checkbox v-model="checked">操作</el-checkbox>
                                        <el-radio-group
                                            v-model="radio1"
                                            size="mini"
                                        >
                                            <el-radio-button label="全部"></el-radio-button>
                                            <el-radio-button label="配置"></el-radio-button>
                                        </el-radio-group>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>

        </div>
        <div
            class="h-foot"
            :class="isCollapse?'minLeft':'maxLeft'"
        >
            <el-button name="white-color">取消</el-button>
            <el-button name="green-color">另存为模板</el-button>
            <el-button name="hosjoy-color">保存</el-button>

        </div>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'role',
    data () {
        return {

            radio1: '全部',
            checked: true,
            tableList: [{ name: '一级菜单A',
                total: 5,
                itemArr: [{ name: '二级菜单A', sindex: 0, total: 2, itemArr: [{ name: '模块A', title: '操作类型', sindex: 0 }, { name: '模块B', title: '操作类型', sindex: 1 }] },
                    { name: '二级菜单Aa', sindex: 1, total: 3, itemArr: [{ name: '模块A', title: '操作类型', sindex: 2 }, { name: '模块B', title: '操作类型', sindex: 3 }, { name: '模块c', title: '操作类型', sindex: 4 }] }
                ]
            },
            { name: '一级菜单A',
                total: 4,
                itemArr: [{ name: '二级菜单A', sindex: 0, total: 1, itemArr: [{ name: '模块A', title: '操作类型', sindex: 0 }] },
                    { name: '二级菜单Aa', sindex: 1, total: 3, itemArr: [{ name: '模块A', title: '操作类型', sindex: 1 }, { name: '模块B', title: '操作类型', sindex: 2 }, { name: '模块c', title: '操作类型', sindex: 3 }] }
                ]
            },
            { name: '一级菜单A',
                total: 4,
                itemArr: [{ name: '二级菜单A', sindex: 0, total: 2, itemArr: [{ name: '模块A', title: '操作类型', sindex: 0 }, { name: '模块B', title: '操作类型', sindex: 1 }] },
                    { name: '二级菜单Aa', sindex: 1, total: 2, itemArr: [{ name: '模块A', title: '操作类型', sindex: 2 }, { name: '模块B', title: '操作类型', sindex: 3 }] }
                ]
            }
            ]
        }
    },
    computed: {
        ...mapState({
            isCollapse: state => state.isCollapse
        })
    },
    mounted () {
        console.log(this.tableList)
    },
    methods: {
        changeDialg () {
            console.log(1)
        }
    }
}
</script>

<style lang="scss" scoped>
.role {
    background: #ffffff;
    padding: 20px 24px;
    margin-bottom: 50px;
}
.h-page-title {
    height: 60px;
    background: #fafafa;
    line-height: 60px;
    font-size: 17px;
    padding-left: 10px;
}
.h-page-flex {
    height: 120px;
    padding: 0 10px;
    .flex-col {
        height: 60px;
        align-items: center;
        display: flex;
        .flex-row {
            flex: 1;
        }
    }
}

.h-roletable {
    padding: 10px 0;
}

.tablelist {
    border: 1px solid #dddddd;
    border-collapse: collapse;
    width: 100%;
    thead {
        background: #fafafa;
    }
    th {
        border: 1px solid #dddddd;
        color: #ffffff;
    }
    td {
        border: 1px solid #dddddd;
        line-height: 40px;
        text-align: center;
    }
    tbody {
        td {
            width: 20%;
        }
    }
}
.h-foot {
    position: fixed;
    bottom: 0;
    background: #ffffff;
    left: 0;

    right: 0;
    padding: 10px;
    text-align: center;
    z-index: 99;
}
.minLeft {
    left: 64px;
    transition: 0.3s;
}
.maxLeft {
    left: 200px;
    transition: 0.3s;
}
</style>
