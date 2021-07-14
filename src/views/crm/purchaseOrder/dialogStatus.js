const PurchaseOrderDialogStatus = Object.freeze({
    enter: {
        status: 1,
        title: '采购单确认'
    },
    changeEnter: {
        title: '采购单变更确认',
        status: 2
    },
    watch: {
        title: '查看变更',
        status: 3
    }
})
export default PurchaseOrderDialogStatus
