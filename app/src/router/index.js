import Vue from "vue";
import VueRouter from 'vue-router';
import routes from './routers'

// 引入仓库
import store from "@/store";
// 使用插件
Vue.use(VueRouter);



// 保存原本的 push 方法 和 replace 方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 对 push 和 replace 方法进行重写 解决重复跳转报错
VueRouter.prototype.push  = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}

VueRouter.prototype.replace  = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

let router = new VueRouter({
    mode: 'history',
    // 路由配置
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})


// 全局路由守卫
router.beforeEach(async (to,from,next)=>{
    // to去哪  from从哪来  next放行函数  next()  next('/path')  next(false)

    // 获取用户token  有token用户一定登录了
    let token = store.state.user.token;
    let name  = store.state.user.userInfo.name;
    // 未登录禁止通过的路径
    let toBan = ['/center','/trade','/pay','/paysuccess','/trade']
    if(token){
        // 用户登陆了还去login 让他停留在首页
        if(to.path == '/login' || to.path ==  '/register'){
            alert('请勿重复登录！')

            next('/');

        }else{
            // 如果能获取到用户信息则放行 否则重新获取用户信息再放行
            if(name){
                next();
            }else{
                try {
                    // 重新获取用户信息
                    await store.dispatch('UserInfo');
                    next();
                } catch (error) {
                    // 如果获取用户信息失败了 则说明服务器派发的token过期了  需要用户重新登录 重新让服务器派发token
                    // 退出登录 并清除过期的token
                    store.dispatch('LogOut');
                    // alert('身份信息过期，请重新登录')
                    // 让用户去重新登录
                    next('/login');
                }

            }
            next();
        }
    }else{
        // 如果没有登录  那么需要改变用户的跳转目标
        // 将要去的地址存下来
        let toPath = to.path;
        let flag = 0;
        toBan.forEach((path)=>{
            // 如果跳转目标在禁止数组内 则重定向
            if(toPath.indexOf(path) != -1){
                flag = 1;
            }
        })
        if(flag){
            next('/login?redirect='+toPath);
        }else{
            next();
        }

        
        
    }
})

export default router