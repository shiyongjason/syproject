<template>
    <CotargetEdit v-if="canEdit" />
    <CotargetShow v-else />
</template>

<script>
import CotargetEdit from './edit.vue'
import CotargetShow from './show.vue'

export default {
    name: 'cotarget',
    components: {
        CotargetEdit, CotargetShow
    },
    data () {
        return {
            canEdit: true
        }
    }
}
</script>
