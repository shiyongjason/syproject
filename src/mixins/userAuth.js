import { mapState, mapActions } from 'vuex'
export const departmentAuth = {
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    data () {
        return {
            region: true,
            branch: true,
            district: true,
            platForm: true
        }
    },
    methods: {
        ...mapActions([
            'findPlatformslist', // 平台公司
            'findAuthList' // 大区、分部、区域
        ]),
        async newBossAuth (arr = ['D', 'F', 'Q']) {
            let p1 = []
            arr.map(i => p1.push(this.findAuthList({ deptType: i, pkDeptDoc: this.userInfo.pkDeptDoc })))
            // 0总部 1大区 2分部 3区域
            await Promise.all(p1).then(res => {
                this.region = this.userInfo.deptType < 2
                this.branch = this.userInfo.deptType < 3
                this.district = this.userInfo.deptType < 4
                // 0总部 1大区 2分部
                switch (this.userInfo.deptType) {
                    case 0:
                        this.findPlatformslist()
                        break
                    default:
                }
            }).catch(err => {
                this.$message.error(`error:${err}`)
            })
        }
    }
}