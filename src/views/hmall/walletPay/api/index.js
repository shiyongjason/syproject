import axios from 'axios'

// 钱包支付开通情况
export const findWalletList = (params) => axios.get('index.do', { params })
