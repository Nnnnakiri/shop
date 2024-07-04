import axios from 'axios'

// 引入进度条及其样式
// nProgress上有两个方法  start 进度条开始   done 进度条结束
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 引入仓库
import store from '@/store';

// 利用axios对象的方法 create  创建一个axios实例对象
const requests = axios.create({
    // 基础路径  发请求会默认携带'/api'
    baseURL:'/api',
    // 超时时间
    timeout:5000,
})

// 请求拦截器  在发请求之前，请求拦截器可以检测到
requests.interceptors.request.use((config)=>{
    // 进度条开始
    nProgress.start();
    // 为用户存储UUID作为临时ID使用  以分辨购物车列表
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 为请求添加 token 请求头  以向服务器获取对应的用户信息
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    // config是配置对象  其中有一个headers 请求头
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nProgress.done();
    // 返回res中的data字段
    // console.log('响应的结果为:res.data@');
    // console.log(res.data);
    return res.data
},(err)=>{
    // 响应失败的回调
    return Promise.reject(new Error('faile'));
});

export default requests