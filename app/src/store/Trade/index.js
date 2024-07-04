import {reqGetUserAddress,reqGetTrade} from '@/api'



const state = {
    userAddress:[],
    data:{}
};
const actions = {
    // 获取用户地址信息
    async getUserAddress({commit}){
        let result =  await reqGetUserAddress();
        if(result.code ==200){
            commit('GETUSERADDRESS',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }
        
    },
    // 获取订单交易页信息
    async getTrade({commit}){
        let result = await reqGetTrade();
        if(result.code ==200){
            commit('GETTRADE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }
    }
};
const mutations = {
    GETUSERADDRESS(state,userAddress){
        state.userAddress = userAddress;
    },
    GETTRADE(state,data){
        state.data = data;
    }
};
const getters = {};

export default {
    state,
    actions,
    mutations,
    getters,
};