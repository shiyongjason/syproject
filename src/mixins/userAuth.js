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
            'findPlatformslist', // 平台公司（取自发展在线）
            'findAuthList' // 大区、分部、区域
        ]),
        async newBossAuth (arr = ['D', 'F', 'Q', 'P'], params) {
            let hasPlatformslist = false
            if (arr.indexOf('P') > -1) {
                hasPlatformslist = true
                arr.splice(arr.indexOf('P'), 1)
            }
            let p1 = []
            let tempParams = {
                pkDeptDoc: this.userInfo.pkDeptDoc,
                ...params
            }
            arr.forEach((value) => {
                tempParams.deptType = value
                p1.push(this.findAuthList({ ...tempParams }))
            })
            // 0总部 1大区 2分部 3区域
            await Promise.all(p1).then(res => {
                this.region = this.userInfo.deptType < 2
                this.branch = this.userInfo.deptType < 3
                this.district = this.userInfo.deptType < 4
                // 0总部 1大区 2分部 3区域
                if (this.userInfo.deptType == 0 && hasPlatformslist) {
                    this.findPlatformslist()
                }
            }).catch(err => {
                this.$message.error(`error:${err}`)
            })
        }
    }
}
