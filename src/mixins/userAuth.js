import { mapState, mapActions } from 'vuex'
export const departmentAuth = {
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            platForm: true,
            branch: true
        }
    },
    methods: {
        ...mapActions([
            'findPlatformslist', // 平台公司
            'findAuthList' // 大区、分部、区域
        ]),
        async oldAuth () {
            this.findAuthList({ deptType: 'D', pkDeptDoc: this.userInfo.deptDoc })
            this.findAuthList({ deptType: 'Q', pkDeptDoc: this.userInfo.deptDoc })
            const data = await this.findAuthList({
                deptType: 'F',
                pkDeptDoc: this.userInfo.deptDoc
            })
            // 0总部 1大区 2分部
            switch (this.userInfo.deptType) {
                case 0:
                    this.findPlatformslist()
                    break
                case 2:
                    this.branch = false
                    this.findPlatformslist({ subsectionCode: data[0].crmDeptCode })
                    break
                default:
            }
        }
    }
}