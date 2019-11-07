<template>
    <div class="platformBasicInfoPO" :class="!isEdit?'showlayout':''">
        <el-form-item label="档案编号：" prop="archiveNo">
            <el-input v-if="isEdit" v-model="platformBasicInfoPO.archiveNo" placeholder="请输入档案编号" maxlength='30'></el-input>
            <span v-else>{{platformBasicInfoPO.archiveNo?platformBasicInfoPO.archiveNo:'-'}}</span>
        </el-form-item>
        <el-form-item label="公司状态：" prop="companyStatus">
            <template v-if="isEdit">
                <el-radio v-model="platformBasicInfoPO.companyStatus" label="1">合作中</el-radio>
                <el-radio v-model="platformBasicInfoPO.companyStatus" label="2">未合作</el-radio>
                <el-radio v-model="platformBasicInfoPO.companyStatus" label="3">淘汰</el-radio>
            </template>
            <span v-else>
                {{
                    platformBasicInfoPO.companyStatus==='1'
                    ?'合作中'
                    :platformBasicInfoPO.companyStatus==='2'
                    ?'未合作'
                    :platformBasicInfoPO.companyStatus==='3'
                    ?'淘汰'
                    :'-'
                }}
            </span>
        </el-form-item>
        <el-form-item label="平台公司名称：" prop="companyName">
            <HAutocomplete v-if="isEdit" :selectArr="platComList" @back-event="backPlat" placeholder="请输入平台公司名称" :selectObj="selectPlatObj" :maxlength='30' :canDoBlurMethos='false'></HAutocomplete>
            <span v-else>{{platformBasicInfoPO.companyName?platformBasicInfoPO.companyName:'-'}}</span>
        </el-form-item>
        <el-form-item label="老公司名称：">
            <el-input v-if="isEdit" v-model="platformBasicInfoPO.oldCompanyName" placeholder="请输入老公司名称" maxlength='30'></el-input>
            <span v-else>{{platformBasicInfoPO.oldCompanyName?platformBasicInfoPO.oldCompanyName:'-'}}</span>
        </el-form-item>
        <el-form-item label="地址：">
            <template v-if="isEdit">
                <el-select v-if="addressPrivince" v-model="platformBasicInfoPO.addressPrivince" placeholder="请选择省份" @change="onProvince">
                    <el-option v-for="item in addressPrivince" :key="item.id" :label="item.cityName" :value="item.cityId+''">
                    </el-option>
                    <!-- <el-option label="item.cityName" value="330000"></el-option> -->
                </el-select>
                <el-select v-model="platformBasicInfoPO.addressCity" placeholder="请选择市" style="margin:0 10px" @change="onCity">
                    <el-option v-for="item in addressCity" :key="item.id" :label="item.cityName" :value="item.cityId+''">
                    </el-option>
                </el-select>
                <el-select v-model="platformBasicInfoPO.addressDistrict" placeholder="请选择区">
                    <el-option v-for="item in addressDistrict" :key="item.id" :label="item.cityName" :value="item.cityId+''">
                    </el-option>
                </el-select>
                <div>
                    <el-input v-model="platformBasicInfoPO.addressOther" placeholder="请输入详细地址" style="width:500px;margin-top:10px" maxlength='50'></el-input>
                </div>
            </template>
            <span v-else>{{datailAddress?datailAddress:'-'}}</span>
        </el-form-item>
        <el-form-item label="分部：">
            <el-select v-if="isEdit&&branchList" v-model="platformBasicInfoPO.departmentId" clearable placeholder="请选择所属分部">
                <el-option v-for="item in branchList" :key="item.subsectionCode" :label="item.subsectionName" :value="item.subsectionCode">
                </el-option>
            </el-select>
            <span v-else>
                {{
                    platformBasicInfoPO.departmentId
                    ?getPlatform(platformBasicInfoPO.departmentId).length>0&&getPlatform(platformBasicInfoPO.departmentId)[0].subsectionName
                    :'-'
                }}
            </span>
        </el-form-item>
        <el-form-item label="区域：">
            <!-- todo  id -->
            <el-input v-if="isEdit" v-model="platformBasicInfoPO.districtId" placeholder="请输入所属区域" maxlength='30'></el-input>
            <span v-else>{{platformBasicInfoPO.districtId?platformBasicInfoPO.districtId:'-'}}</span>
        </el-form-item>
        <el-form-item label="档案位置：">
            <el-input v-if="isEdit" v-model="platformBasicInfoPO.archiveLocation" placeholder="请输入纸质档案所在位置" type='textarea' :rows="6" style="width:700px" show-word-limit  maxlength="520"></el-input>
            <span v-else>{{platformBasicInfoPO.archiveLocation?platformBasicInfoPO.archiveLocation:'-'}}</span>
        </el-form-item>
    </div>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { provinces, findPaltList, findBranchListNew } from '../api/index.js'
export default {
    name: 'platformBasicInfoPO',
    props: ['value', 'isEdit'],
    components: { HAutocomplete },
    data () {
        return {
            platComList: [], // 平台公司
            addressPrivince: [], // 省
            addressCity: [], // 市
            addressDistrict: [], // 区
            branchList: [], // 分部列表
            options: [],
            datailAddress: '',
            selectPlatObj: {
                selectCode: '',
                selectName: ''
            }
        }
    },
    computed: {
        platformBasicInfoPO () {
            return this.value
        }
    },
    methods: {
        getPlatform (code) {
            const arr = this.branchList.filter(item => {
                return item.subsectionCode === code
            })
            return arr
        },
        getCodeByName (name, code = this.branchList) {
            return code.filter(item => {
                return item.subsectionName === name
            })
        },
        async backPlat (val) {
            // 平台公司名称点击后事件
            console.log(val)
            if (val && val.value && val.value.value && !val.value.value.companyShortName) {
                this.platformBasicInfoPO.companyName = val.value.value
            }
            if (val && val.value && val.value.companyShortName) {
                this.platformBasicInfoPO.companyName = val.value.companyShortName
                this.platformBasicInfoPO.oldCompanyName = val.value.originaCompanyName
                this.platformBasicInfoPO.addressOther = val.value.address
                this.platformBasicInfoPO.addressPrivince = val.value.provinceCode
                this.onProvince(Number(val.value.provinceCode))
                this.$nextTick(() => {
                    this.platformBasicInfoPO.addressCity = val.value.cityCode
                    this.onCity(Number(this.platformBasicInfoPO.addressCity))
                })
                this.$nextTick(() => {
                    this.platformBasicInfoPO.addressDistrict = val.value.areaCode || ''
                })
                let temp = val.value.subsectionName && this.getCodeByName(val.value.subsectionName)
                this.platformBasicInfoPO.departmentId = temp && temp[0].subsectionCode
                this.$forceUpdate()
            }
        },
        onProvince (parentId) {
            this.$set(this.platformBasicInfoPO, 'addressCity', '')
            this.$set(this.platformBasicInfoPO, 'addressDistrict', '')
            this.addressCity = []
            this.addressDistrict = []
            if (parentId) {
                this.provinces({ parentId }, 1)
            }
        },
        onCity (parentId) {
            this.$set(this.platformBasicInfoPO, 'addressDistrict', '')
            this.addressDistrict = []
            if (parentId) {
                this.provinces({ parentId }, 2)
            }
        },
        async provinces (params = { parentId: 0 }, city = 0) {
            const { data } = await provinces(params)
            switch (city) {
                case 0:
                    this.addressPrivince = data.citys
                    this.addressPrivince.unshift({ cityId: '', cityName: '请选择省', id: 0 })
                    break
                case 1:
                    this.addressCity = data.citys
                    this.addressCity.unshift({ cityId: '', cityName: '请选择市', id: 0 })
                    break
                case 2:
                    this.addressDistrict = data.citys
                    this.addressDistrict.unshift({ cityId: '', cityName: '请选择区', id: 0 })
                    break
            }
        },
        async findPaltList () {
            // 平台公司名称
            const { data } = await findPaltList()
            for (let i of data.data.pageContent) {
                i.value = i.companyShortName
                i.selectCode = i.companyCode
            }
            this.platComList = data.data.pageContent
        },
        async findBranchListNew () {
            // 平台分部
            const { data } = await findBranchListNew()
            this.branchList = data.data
        }
    },
    watch: {
        'platformBasicInfoPO.companyName' (val) {
            this.selectPlatObj.selectName = val
        }
    },
    mounted () {
        this.provinces()
        this.findPaltList()
        this.findBranchListNew()
    }
}
</script>

<style scoped>
.platformBasicInfoPO {
    border: 1px solid #e4e7ed;
    border-top: none;
    padding: 70px;
}
.showlayout>>>.el-form-item__label:before{
    content:'' !important
}
.showlayout>>>.el-form-item__error{
   display: none !important
}
</style>