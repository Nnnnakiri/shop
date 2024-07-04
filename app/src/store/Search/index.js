import { reqGetSearchInfo } from '@/api';



// 数据仓库
const state = {
    searchList:{},
};

// 可以书写业务逻辑
const actions = {
    async getSearchList({commit},params={}){
        let result = await reqGetSearchInfo(params);
        if(result.code === 200){
            commit('GETSEARCHLIST',result.data)
        }  
    }
};

// 可以对state进行修改
const mutations = {
    GETSEARCHLIST(state,searchlist){
        state.searchList =  searchlist;
    }
};

// 理解为计算属性 主要作用是简化仓库数据
const getters = {
    goodsList(state){
        return state.searchList.goodsList || [];
    },
    attrsList(state){
        return state.searchList.attrsList  || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    },
}

export default {
    state,
    actions,
    mutations,
    getters,

}