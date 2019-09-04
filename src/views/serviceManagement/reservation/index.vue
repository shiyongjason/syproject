<template>
    
</template>

<script>
import {findReservations} from './api/index'
export default {
    data () {
        return {
            queryParams: {
                customerName: '',
                reservationStatus: '',
                reservationMethod: ''
            }
        }
    },
    mounted () {

    }
}
</script>