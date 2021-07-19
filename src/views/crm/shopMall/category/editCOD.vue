
<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">品类名称：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.searchContent" placeholder="请输入支付单号" maxlength="50"></el-input>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">品类名称：</div>
                    <div class="query_tag">
                      <p v-for="(item) in checkList" :key="item.id">{{item.pcategoryName}}>{{item.scategoryName}}>{{item.name}}</p>
                    </div>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont__col">
                    <div class="query-col__label">类名搜索：</div>
                    <div class="query-col__input">
                        <el-input v-model="queryParams.paymentOrderNo" placeholder="可输入类目名称、类目编码进行搜索" maxlength="50"></el-input>
                    </div>
                </div>

            </div>
            <!-- end search bar -->
            <tree-table ref="treeTable" :data="data" :columns="columns"  :expand-type="false" @checkbox-click='onClickCheckbox' children-prop="subCategoryList" :selection-type="false" @clickRow='clickRow'  @cell-click="clickRow" >
            </tree-table>
        </div>

    </div>
</template>
<script lang='tsx'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table.vue' // 组件导入需要 .vue 补上，Ts 不认识vue文件
// import OssFileHosjoyUpload from '@/components/OssFileHosjoyUpload/OssFileHosjoyUpload.vue'
import { CreateElement } from 'vue'
import { getTreeCategroy } from './api/index'

@Component({
    name: 'Categoryedit',
    components: {
        hosJoyTable
    }
})
export default class Categoryedit extends Vue {
        $refs!: {
            form: HTMLFormElement
        }
        uploadParameters = {
            updateUid: '',
            reservedName: false
        }
        queryParams:object={
            searchContent: ''
        }
        data:any[] = []
        columns= [
            {
                title: '一级类目/二级类目/三级类目',
                key: 'name',
                width: '300px'
            },
            {
                title: '类目编码',
                key: 'code',
                width: '100px'
            },
            {
                title: '上架商品数量',
                key: 'spuNumber',
                width: '100px'
            }
        ]
        expandCell:any[]=[]
        // checkList:any[]|[]=[]  这里有个类型定义问题 never
        checkList:any[]=[]

        async getList () {
            const { data } = await getTreeCategroy(this.queryParams)
            this.data = this.resolveData(data, false, false, '', '')
        }

        findUnques (arr) {
            var result = []
            var obj = {}
            for (var i = 0; i < arr.length; i++) {
                if (!obj[arr[i].id]) {
                    result.push(arr[i])
                    obj[arr[i].id] = true
                }
            }
            return result
        }

        onClickCheckbox (row, rowIndex, $event) {
            console.log(row, rowIndex, $event)
            console.log(this.$refs['treeTable'].getCheckedProp(['id', 'name']))
            // if (val && val._isChecked) {

            // }
            // 先去查询有没有 没有在push
            if (row.level == 1 && row._isChecked) {
                console.log(1)
                row.subCategoryList.length > 0 && row.subCategoryList.map(item => {
                    item.subCategoryList && item.subCategoryList.map(jtem => {
                        this.checkList.push(jtem)
                    })
                })
            } else if (row.level == 1) {
                row.subCategoryList.length > 0 && row.subCategoryList.map(item => {
                    item.subCategoryList && item.subCategoryList.map(jtem => {
                        let one = this.checkList.filter(val => jtem.id == val.id)
                        console.log(233, one)
                        one.length > 0 && one.map(e => {
                            this.checkList.splice(this.checkList.indexOf(e), 1)
                        })
                    })
                })
            }
            if (row.level == 2 && row._isChecked) {
                row.subCategoryList.length > 0 && row.subCategoryList.map(jtem => {
                    this.checkList.push(jtem)
                })
            } else if (row.level == 2) {
                row.subCategoryList && row.subCategoryList.map(jtem => {
                    let one = this.checkList.filter(val => jtem.id == val.id)
                    one.length > 0 && this.checkList.splice(this.checkList.indexOf(one[0]), 1)
                })
            }
            if (row.level == 3 && row._isChecked) {
                this.checkList.push(row)
            } else if (row.level == 3) {
                let one = this.checkList.filter(val => row.id == val.id)
                one.length > 0 && this.checkList.splice(this.checkList.indexOf(one[0]), 1)
            }
            console.log(this.findUnques(this.checkList))
            console.log(1, this.data)
        }

        clickRow (row, rowIndex, column, columnIndex, $event) {
        }

        // 递归处理数据
        resolveData (data, parentIsFold = true, grondIsFold = true, pcategoryName = '', scategoryName = '', dcategoryName = '') {
            return data.map((item, index, arr) => {
                if (item.level == 1) {
                    item.pcategoryName = item.name
                    item.scategoryName = ''
                    item.dcategoryName = ''
                }
                if (item.level == 2) {
                    item.pcategoryName = pcategoryName
                    item.scategoryName = item.name
                    item.dcategoryName = ''
                }
                if (item.level == 3) {
                    item.pcategoryName = pcategoryName
                    item.scategoryName = scategoryName
                    item.dcategoryName = item.name
                }
                // 在数组中的数据，必定是非折叠的
                if (this.expandCell.includes(item.id)) {
                    item._isFold = false
                }
                // 如果祖父级是折叠的，则必定隐藏
                if (grondIsFold) {
                    item._isHide = true
                }
                // 如果祖父级是非折叠的，父级是折叠的，则隐藏
                if (!grondIsFold && parentIsFold) {
                    item._isHide = true
                }
                // 如果祖父级是非折叠的，父级是非折叠的，则显示
                if (!grondIsFold && !parentIsFold) {
                    item._isHide = false
                }

                if (item.subCategoryList && item.subCategoryList.length > 0) {
                    this.resolveData(item.subCategoryList, item._isFold, parentIsFold, item.pcategoryName, item.name)
                }
                return item
            })
        }

        mounted () {
            this.getList()
        }
}
</script>
<style lang='scss' scoped>
@import "./css.scss";
</style>
