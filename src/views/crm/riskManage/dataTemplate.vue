<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="page-risk">
                <div class="page-risk_title">
                    <h3>材料清单配置</h3>
                    <div class="page-risk_btn">
                        好橙工项目材料清单 <h-button table @click="onEdittemp(1)">编辑</h-button>
                    </div>
                </div>
                <div class="page-risk_title">
                    <h3>立项清单配置</h3>
                    <div class="page-risk_btn">
                        好橙工立项材料清单 <h-button table @click="onEdittemp(2)">编辑</h-button>
                    </div>
                </div>
                <div class="page-risk_title">
                    <h3>终审清单配置</h3>
                    <div class="page-risk_btn">
                        好橙工终审材料清单 <h-button table @click="onEdittemp(3)">编辑</h-button>
                    </div>
                </div>
                <div class="page-risk_title">
                    <h3>授信清单配置</h3>
                    <div class="page-risk_btn">
                        好橙工授信材料清单 <h-button table @click="onEdittemp(4)">编辑</h-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dataTemp',
    methods: {
        onEdittemp (val) {
            this.$router.push({ path: '/goodwork/tempdetail', query: { bizType: val } })
        }
    }
}
</script>
<style lang="scss" scoped>
.page-risk {
    .page-risk_title {
        padding: 20px;
        h3 {
            padding: 15px 0 15px;
            font-size: 22px;
            line-height: 32px;
            font-weight: bold;
            border-bottom: 1px solid #E5E5EA;
        }
        .page-risk_btn {
            padding: 20px 0;
            font-size: 14px;
            line-height: 20px;
        }
    }
}
</style>