
import { reqGoodsInfo, reqGetOrUpdateShopCar } from '@/api/index'
import {getUUID} from '@/utils/uuid_token'

const state = {
    goodInfo: {

    },
    uuid_token:getUUID(),
};
const actions = {
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code === 200) {
            commit('GETGOODINFO', result.data);
        }
    },
    async GetOrUpdateShopCar({ commit }, { skuId, skuNum }) {
        let result = await reqGetOrUpdateShopCar(skuId, skuNum);
        // 服务器接受请求后不会返回数据  只会返回接受是否成功
        if (result.code === 200) {
            // 如果成功了 就将 Promise 对象状态设置为成功
            return 'ok'
        } else {
            // 如果失败了 就调用 reject 方法将 Promise 对象设置为失败 并返回一个失败对象
            return Promise.reject(new Error('fail'));
        }
    }


};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
const getters = {
    // 简化产品导航的数据
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 简化产品选项的数据
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}