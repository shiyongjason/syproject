import axios from 'axios'

export const getPaymentOrderList = (params) => axios.get('/api/payment-orders', { params })
