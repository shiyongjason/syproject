<template>
    <div class="page-body B2b">
        <div class="page-body-cont approvalcontract">
            <div class="approvalcontract-head">
                分财审核合同
            </div>
            <div class="approvalcontract-layout">
                <div class="approvalcontract-layout-left">

                    <h1>字段/自定义合同条款修订</h1>
                    <div class="setarea" v-if="currentKey">
                        <p class="setarea-key">{{currentKey.keyTxt}}：</p>
                        <p><el-input v-model="currentKey.val" @input='(val)=>onInputChange(val,currentKey.key)' placeholder="请输入内容"></el-input></p>
                    </div>
                    <div class="tips">
                        <div><b>注意事项：</b></div>
                        <p>1、点击保存，则会记录修订记录，并保存为最新的合同文档；</p>
                        <p>2、暂不审核，不会撤销字段修订记录；</p>
                    </div>
                </div>
                <div class="approvalcontract-layout-right">
                    <h1>合同预览</h1>
                    <div class="approvalcontract-content-layout">
                        <div class="approvalcontract-content" v-html='vHtml'></div>
                    </div>
                    <div class="approvalcontract-btn">
                        <h-button>暂不审核</h-button>
                        <h-button type="primary">驳回</h-button>
                        <h-button type="primary">通过</h-button>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
<script>
export default {
    name: 'approveContract',
    data () {
        return {
            vHtml: '',
            keyValue: [
                {
                    key: 'key1',
                    keyTxt: '甲方经销商',
                    val: '宇宙第一大帅比'
                },
                {
                    key: 'key2',
                    keyTxt: '乙方经销商',
                    val: '孙军'
                }
            ],
            currentKey: ''
        }
    },
    methods: {
        onInputChange (val, key) {
            console.log('val: ', val)
            let intDom = document.getElementsByClassName(key)[0]
            intDom.value = val
            intDom.setAttribute('value', val)
            let inputWidth = val.length * 14
            intDom.style.width = `${inputWidth}px`
            // 通过dom生成最新的html
            console.log('approvalcontract-content', document.getElementsByClassName('approvalcontract-content')[0].outerHTML)
        }

    },
    beforeMount () {
        this.vHtml = '<p><span style="font-size: medium;">甲方：<input class="key1" value="甲方经销商" readonly style="width: 70px;color: #ff7a45;display: inline-block;height: 22px;min-width: 20px;border: none;text-align: center;margin-right: 3px;border-radius: 5px;cursor: pointer;"></span></p> <p><span style="font-size: medium;">乙方：<input class="key2" value="乙方经销商" readonly style="width: 70px;color: #ff7a45;display: inline-block;height: 22px;min-width: 20px;border: none;text-align: center;margin-right: 3px;border-radius: 5px;cursor: pointer;"></span></p><p><span style="font-size: medium;">&nbsp; &nbsp;&nbsp;&nbsp;<span style="color: rgb(51, 51, 51); font-family: PingFangSC-Regular, &quot;PingFang SC&quot;;">为使公司车辆管理统一合理化，合理有效的使用各种车辆，最大限度的节约成本，更有效的控制车辆使用，最真实的反映车辆的实际情况，尽可能的发挥最大经济效益以及对公司所有车辆的保养，最真实的反映车辆的实际情况，尽可能的发挥最大经济效益以及对公司所反映车辆的实际情况，尽可能的发挥最大经济效益以及对公司所有车辆的保养和维修进行控制，以确保车辆安全、良好的运行状况以及保养和维修的及时、经济、可靠，特制定本制度。</span></span><br></p><p><span style="font-size: medium;">&nbsp; &nbsp;&nbsp;&nbsp;<span style="color: rgb(51, 51, 51); font-family: PingFangSC-Regular, &quot;PingFang SC&quot;;">为使公司车辆管理统一合理化，合理有效的使用各种车辆，最大限度的节约成本，更有效的控制车辆使用，最真实的反映车辆的实际情况，尽可能的发挥最大经济效运行状况以及保养和维修的及时、经济、可靠，特制定本制度。为使公司车辆管理统一合理化，合理有效的使用各种车辆，最大限度的节约成本，更有效的控制车辆大限度的节约成本，更有效的控制车辆使用，最真实的反映车辆的实际情况，尽可能的发挥最大经济效益以及对公司所反映车辆的实际情况，尽可能的发挥最大经济效益以及对公司所有车辆的保养和维修进行控制，以确保车辆安全、良好的运行状况以及保养和维修的及时、经济、可靠，特制定本制度。</span></span><br></p><p><span style="font-size: medium;">&nbsp; &nbsp;&nbsp;&nbsp;<span style="color: rgb(51, 51, 51); font-family: PingFangSC-Regular, &quot;PingFang SC&quot;;">为使公司车辆管理统一合理化，合理有效的使用各种车辆，最大限度的节约成本，更有效的控制车辆使用，最真实的反映车辆的实际情况，尽可能的发挥最大经济效运行状况以及保养和维修的及时、经济、可靠，特制定本制度。为使公司车辆管理统一合理化，合理有效的使用各种车辆，最大限度的节约成本，更有效的控制车辆大限度的节约成本，更有效的控制车辆使用，最真实的反映车辆的实际情况，尽可能的发挥最大经济效益以及对公司所反映车辆的实际情况，尽可能的发挥最大经济效益以及对公司所有车辆的保养和维修进行控制，以确保车辆安全、良好的运行状况以及保养和维修的及时、经济、可靠，特制定本制度。</span></span><br></p><p><span style="font-size: medium;">&nbsp; &nbsp;&nbsp;&nbsp;<span style="color: rgb(51, 51, 51); font-family: PingFangSC-Regular, &quot;PingFang SC&quot;;">为使公司车辆管理统一合理化，合理有效的使用各种车辆，最大限度的节约成本，更有效的控制车辆使用，最真实的反映车辆的实际情况，尽可能的发挥最大经济效运行状况以及保养和维修的及时、经济、可靠，特制定本制度。为使公司车辆管理统一合理化，合理有效的使用各种车辆，最大限度的节约成本，更有效的控制车辆大限度的节约成本，更有效的控制车辆使用，最真实的反映车辆的实际情况，尽可能的发挥最大经济效益以及对公司所反映车辆的实际情况，尽可能的发挥最大经济效益以及对公司所有车辆的保养和维修进行控制，以确保车辆安全、良好的运行状况以及保养和维修的及时、经济、可靠，特制定本制度。</span></span><br></p><p><span style="font-size: medium;">&nbsp; &nbsp;&nbsp;&nbsp;<span style="color: rgb(51, 51, 51); font-family: PingFangSC-Regular, &quot;PingFang SC&quot;;">为使公司车辆管理统一合理化，合理有效的使用各种车辆，最大限度的节约成本，更有效的控制车辆使用，最真实的反映车辆的实际情况，尽可能的发挥最大经济效运行状况以及保养和维修的及时、经济、可靠，特制定本制度。为使公司车辆管理统一合理化，合理有效的使用各种车辆，最大限度的节约成本，更有效的控制车辆大限度的节约成本，更有效的控制车辆使用，最真实的反映车辆的实际情况，尽可能的发挥最大经济效益以及对公司所反映车辆的实际情况，尽可能的发挥最大经济效益以及对公司所有车辆的保养和维修进行控制，以确保车辆安全、良好的运行状况以及保养和维修的及时、经济、可靠，特制定本制度。</span></span><br></p>'
        this.$nextTick(() => {
            var dom = document.getElementsByClassName('el-main')[0]
            dom.addEventListener('scroll', function () {
                console.log('', dom.scrollTop)
            })
            // 查找合同里面第一个input字段，用于左侧修改
            let firstKsy = document.getElementsByClassName('approvalcontract-content')[0].getElementsByTagName('input')[0].className
            if (firstKsy) {
                const obj = this.keyValue.filter(item => item.key === firstKsy)
                this.currentKey = obj[0]
            }
            // 给合同模板赋值、绑定点击事件
            this.keyValue.map(item => {
                let inputWidth = item.val.length * 14
                let intDom = document.getElementsByClassName(item.key)[0]
                intDom.value = item.val
                intDom.style.width = `${inputWidth}px`
                intDom.onclick = () => {
                    this.currentKey = item
                }
            })
        })
    }
}
</script>
<style scoped lang="scss">
.approvalcontract {
    height: 80%;
    position: fixed;
    overflow: hidden;
    .approvalcontract-head {
        font-size: 23px;
        font-weight: 650;
        border-bottom: 1px solid #e9e9e9;
        padding-bottom: 10px;
    }
    .approvalcontract-content-layout{
        height:calc(100vh - 305px);
         overflow-y:scroll;
         min-width: 600px;
    }
    .approvalcontract-content{

    }
    .approvalcontract-layout{
        height: calc(100vh - 200px);
        position: relative;
        overflow: hidden;
        &-left{
            width: 26%;
            margin-right: 3%;
            position: fixed;
            overflow: hidden;
            h1{
                font-size: 20px;
            }
            // flex:0 0 450px;
            margin-right: 40px;
            box-sizing: border-box;
            padding:15px 0;
            .setarea{
                height: 160px;
                border-bottom: 1px solid #e9e9e9;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }
            .tips{
                font-size: 16px;
                b{
                    margin-bottom: 10px;
                    display: inline-block;
                }
                p{
                    font-size: 14px;
                    line-height: 2;
                    color: #6b6868;
                }
            }
        }
        &-right{
            position: relative;
            width: 65%;
            float: right;
            // overflow-y: scroll;
            height:100%;
            h1{
                font-size: 20px;
                margin-bottom: 10px;
            }
            box-sizing: border-box;
            padding:15px 20px 0;
        }
    }
    .setarea-key{
        font-size: 16px;
        margin:10px 0 10px
    }
    .approvalcontract-btn{
        position: absolute;
        right: 30px;
        bottom:6px;
    }
}
</style>