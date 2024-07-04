import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 引入小仓库
import home from './Home'
import search from './Search';
import detail from './Detail';
import shopcart from './ShopCart';
import user from './User';
import trade from './Trade';

// 对外暴露store类的一个实例
export default new Vuex.Store({
   // vuex的模块化开发
   modules: {
      home,
      search,
      detail,
      shopcart,
      user,
      trade
   }

})