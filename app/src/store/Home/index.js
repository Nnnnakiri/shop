// 引入请求函数 获取三级联动列表
import { reqCategoryList,reqGetBannerList,reqGetFloorList } from "@/api";


// 数据仓库
const state = {
    categoryList:[],
    // 轮播图数组
    bannerList:[],
    // 楼层数组
    floorList:[]
};

// 可以书写业务逻辑
const actions = {
    async getCategoryList({commit}){
        // reqcategorylist方法返回一个promise对象  通过await修饰 将 promise 的返回值return
        let result = await reqCategoryList();
        // console.log('result');
        // console.log(result);
        if(result.code === 200){
            commit('GETCATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){
        // console.log('获取轮播图数组');
        let result =  await reqGetBannerList();
        if(result.code === 200){
            commit('GETBANNERLIST',result.data)
        }
        // console.log(result);
    },
    async getFloorList({commit}){
        let result = await reqGetFloorList();
        if(result.code === 200){
            commit('GETFLOORLIST',result.data);
        }
    }
};

// 可以对state进行修改
const mutations = {
    GETCATEGORYLIST(state,categoryList){    
        state.categoryList = categoryList;
        // console.log(categoryList);
    },

    GETBANNERLIST(state,bannerlist){
        // console.log('修改轮播图数组');
        state.bannerList = bannerlist;
    },
    GETFLOORLIST(state,floorlist){
        state.floorList = floorlist;
    }

};

// 理解为计算属性 用于简化仓库数据
const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters,
    // 命名空间开启时  dispatch的路径为 文件名/dispatch事件名
    // namespaced: true
}