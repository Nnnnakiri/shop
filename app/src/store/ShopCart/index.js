import { reqCarList, reqDeleteCartlist, reqUpdateChecked } from '@/api'


const state = {
    cartList: []
};
const actions = {
    // 获取购物车列表
    async getCartList({ commit }) {
        let result = await reqCarList();
        if (result.code === 200) {
            console.log(result);
            commit('GETCARTLIST', result.data);
        }
    },
    // 删除一个产品
    async deleteCartlist({ commit }, skuId) {
        let result = await reqDeleteCartlist(skuId);
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 单个按钮的选中状态更改
    async updateChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChecked({ skuId, isChecked });
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    //  删除所有选中的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context上可以解构出  dispatch  getters commit state
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise;
            if (item.isChecked) {
                // deleteCartlist会返回一个promise对象
                promise = dispatch('deleteCartlist', item.skuId);
            } else {
                promise = '';
            }
            promiseAll.push(promise);
        });
        // 如果所有的对象都成功 则返回成功  有一个对象删除失败即为失败
        return Promise.all(promiseAll);
    },
    //  修改全部产品的状态
    changeAllChecked({ dispatch, state }, checked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateChecked', { skuId: item.skuId, isChecked: checked });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll)
    }
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

};

export default {
    state,
    actions,
    mutations,
    getters,
}