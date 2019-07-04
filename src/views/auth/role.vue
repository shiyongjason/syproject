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
                            <template v-for="(itema) in item.childAuthList">
                                <tr
                                    v-for="(itemb,indexb) in itema.childAuthList"
                                    :key="'sort_'+item.id+itemb.sort"
                                >
                                    <td
                                        :rowspan="item.total"
                                        v-if="itemb.sort==0"
                                    >
                                        <el-checkbox v-model="item.have" v-if="item.authName">{{item.authName}}</el-checkbox>
                                    </td>
                                    <td
                                        :rowspan="itema.childAuthList.length"
                                        v-if="indexb==0"
                                    >
                                        <el-checkbox v-model="checked"  v-if="item.authName">{{itema.authName}}</el-checkbox>
                                    </td>
                                    <td>
                                        <el-checkbox v-model="checked">{{itemb.authName}}</el-checkbox>
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

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <span>这是一段信息</span>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="dialogVisible = false"
                >确 定</el-button>
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
            dialogVisible: false,
            radio1: '全部',
            checked: true,
            tableList: [
                {
                    'id': 1,
                    'authName': '首页',
                    'menuType': 1,
                    'authUri': '/',
                    'authLevel': 0,
                    'sort': 1,
                    'pageConfig': [

                    ],
                    'childAuthList': [
                        {
                            'id': null,
                            'authName': null,
                            'menuType': null,
                            'authUri': null,
                            'authLevel': null,
                            'sort': 0,
                            'pageConfig': null,
                            'childAuthList': [
                                {
                                    'id': null,
                                    'authName': null,
                                    'menuType': null,
                                    'authUri': null,
                                    'authLevel': null,
                                    'sort': 0,
                                    'pageConfig': null,
                                    'childAuthList': [

                                    ],
                                    'have': null,
                                    'total': 0
                                }
                            ],
                            'have': null,
                            'total': 1
                        }
                    ],
                    'have': true,
                    'total': 1
                },
                {
                    'id': 51,
                    'authName': '金云平台',
                    'menuType': 1,
                    'authUri': '/jinyunPlatform',
                    'authLevel': 0,
                    'sort': 2,
                    'pageConfig': [

                    ],
                    'childAuthList': [
                        {
                            'id': null,
                            'authName': null,
                            'menuType': null,
                            'authUri': null,
                            'authLevel': null,
                            'sort': 0,
                            'pageConfig': null,
                            'childAuthList': [
                                {
                                    'id': null,
                                    'authName': null,
                                    'menuType': null,
                                    'authUri': null,
                                    'authLevel': null,
                                    'sort': 0,
                                    'pageConfig': null,
                                    'childAuthList': [

                                    ],
                                    'have': null,
                                    'total': 0
                                }
                            ],
                            'have': null,
                            'total': 1
                        }
                    ],
                    'have': true,
                    'total': 1
                },
                {
                    'id': 101,
                    'authName': '老系统',
                    'menuType': 1,
                    'authUri': '/oldsystem',
                    'authLevel': 0,
                    'sort': 3,
                    'pageConfig': [

                    ],
                    'childAuthList': [
                        {
                            'id': null,
                            'authName': null,
                            'menuType': null,
                            'authUri': null,
                            'authLevel': null,
                            'sort': 0,
                            'pageConfig': null,
                            'childAuthList': [
                                {
                                    'id': null,
                                    'authName': null,
                                    'menuType': null,
                                    'authUri': null,
                                    'authLevel': null,
                                    'sort': 0,
                                    'pageConfig': null,
                                    'childAuthList': [

                                    ],
                                    'have': null,
                                    'total': 0
                                }
                            ],
                            'have': null,
                            'total': 1
                        }
                    ],
                    'have': true,
                    'total': 1
                },
                {
                    'id': 151,
                    'authName': '权限管理',
                    'menuType': 1,
                    'authUri': '/auth',
                    'authLevel': 0,
                    'sort': 4,
                    'pageConfig': [

                    ],
                    'childAuthList': [
                        {
                            'id': 1511,
                            'authName': '机构/人员管理',
                            'menuType': 1,
                            'authUri': 'organization',
                            'authLevel': 0,
                            'sort': 1,
                            'pageConfig': [
                                {
                                    'id': 1,
                                    'authId': 1511,
                                    'fieldShowName': null,
                                    'field': 'a',
                                    'sort': 1,
                                    'have': true
                                },
                                {
                                    'id': 2,
                                    'authId': 1511,
                                    'fieldShowName': null,
                                    'field': 'b',
                                    'sort': 2,
                                    'have': true
                                },
                                {
                                    'id': 3,
                                    'authId': 1511,
                                    'fieldShowName': null,
                                    'field': 'c',
                                    'sort': 3,
                                    'have': false
                                }
                            ],
                            'childAuthList': [
                                {
                                    'id': null,
                                    'authName': null,
                                    'menuType': null,
                                    'authUri': null,
                                    'authLevel': null,
                                    'sort': 0,
                                    'pageConfig': null,
                                    'childAuthList': [

                                    ],
                                    'have': null,
                                    'total': 0
                                }
                            ],
                            'have': true,
                            'total': 1
                        },
                        {
                            'id': 1512,
                            'authName': '角色模版设置',
                            'menuType': 1,
                            'authUri': 'role',
                            'authLevel': 0,
                            'sort': 2,
                            'pageConfig': [

                            ],
                            'childAuthList': [
                                {
                                    'id': null,
                                    'authName': null,
                                    'menuType': null,
                                    'authUri': null,
                                    'authLevel': null,
                                    'sort': 1,
                                    'pageConfig': null,
                                    'childAuthList': [

                                    ],
                                    'have': null,
                                    'total': 0
                                }
                            ],
                            'have': false,
                            'total': 1
                        }
                    ],
                    'have': true,
                    'total': 2
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
