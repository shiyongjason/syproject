function makeTreeList (data) {
    let subTemp = []
    if (data.child && data.child.length) {
        data.child.forEach(value => {
            subTemp.push(makeTreeList(value))
        })
    }

    return {
        label: data.name,
        parentName: data.parentName,
        parentId: data.parentId,
        id: data.id,
        updateBy: data.updateBy,
        updateTime: data.updateTime,
        depth: data.depth,
        path: data.path,
        children: subTemp
    }
}
function resetTreeList (data) {
    let subTemp = []
    function makeList (data) {
        if (data.child && data.child.length) {
            data.child.forEach(value => {
                makeList(value)
            })
        }

        subTemp.push({
            label: data.name,
            parentName: data.parentName,
            parentId: data.parentId,
            id: data.id,
            updateBy: data.updateBy,
            updateTime: data.updateTime,
            depth: data.depth
        })
    }
    makeList(data)
    return subTemp
}
export default {
    doneServiceCategoryTree: state => {
        return [makeTreeList(state.serviceCategoryTree)]
    },
    resetServiceCategoryTree: state => {
        return resetTreeList(state.serviceCategoryTree)
    }
}
