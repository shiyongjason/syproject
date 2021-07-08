 <hosJoyTable localName="V3.5.1" isShowIndex ref="hosjoyTable" align="center" collapseShow border stripe :column="tableLabel" :data="tableData" actionWidth='250' isAction :isActionFixed='tableData&&tableData.length>0'>
                <template #action="slotProps">
                    <div v-if="!slotProps.data.row.homePage">
                        <h-button table @click="onEditLive(slotProps.data.row)">编辑</h-button>
                        <h-button table v-if="slotProps.data.row.status==1" @click="onPutHome(slotProps.data.row)">放在首页</h-button>
                        <h-button table @click="onDelete(slotProps.data.row)">删除</h-button>
                    </div>
                    <div v-else>
                        <h-button table @click="onNoHome(slotProps.data.row)">不放在首页</h-button>
                    </div>
                </template>
            </hosJoyTable>