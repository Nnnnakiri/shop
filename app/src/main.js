import Vue from 'vue'
import App from './App.vue'

// 注册全局组件 三级联动  轮播图
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

Vue.config.productionTip = false

// 引入路由
import router from '@/router'
// 引入仓库
import store from './store';

//#region 
// import { reqCategoryList } from './api';
// reqCategoryList();
// console.log(reqCategoryList());
// import { reqGetSearchInfo } from './api';
// // reqGetSearchInfo();
// console.log(reqGetSearchInfo({}));
//#endregion

import '@/mock/mockServer'

// 引入轮播图样式
import 'swiper/css/swiper.css'
// 引入箭头图标
import '@/iconfont/iconfont.css'


// 按需引入elementui
import { MessageBox } from 'element-ui';
// Vue.component(Button.name, Button);


// 引入所有的接口
import * as API from '@/api'

// 引入图片懒加载插件
import loadingGIF from './assets/1.gif'
import VueLazyload from 'vue-lazyload'

import '@/plugins/vaildate'

// 使用插件
Vue.use(VueLazyload,{
  loading: loadingGIF,
})


new Vue({
  render: h => h(App),
  beforeCreate() {
    // 安装全局事件总线
    Vue.prototype.$bus = this;
    // 将所有的接口安装到 vue 原型上
    Vue.prototype.$api = API;
    // 注册原型  ElementUI
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')
