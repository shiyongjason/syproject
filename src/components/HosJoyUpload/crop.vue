<template>
   <div style='widrh:100%;height:100%'>
       <VueCropper ref="cropper" v-bind="$attrs" v-on="$listeners" ></VueCropper>
   </div>

</template>
<script>
import { VueCropper } from 'vue-cropper'
import { uploadFiles } from '@/api/index'
export default {
    name: 'Crop',
    components: { VueCropper },
    mounted () {
    }
}
</script>