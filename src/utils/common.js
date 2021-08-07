export default {
    install (Vue) {
        Vue.prototype.arrayToMap = (array) => {
            return new Map(array.map(item => [item.value, item.label]))
        }
    }
}
