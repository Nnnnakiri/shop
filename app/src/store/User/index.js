import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogOut} from '@/api'

// 登录与注册的模块
const state = {
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
};
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        // 获取验证码的接口会将验证码返还回来
        // 正常来讲 验证码会发送到用户手机上
        if(result.code === 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        };
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user);
        console.log(user);
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    // 用户登录
    async userLogin({commit},user){
        let result = await reqUserLogin(user);
        if(result.code === 200){
            commit('USERLOGIN',result.data);
            localStorage.setItem('TOKEN',result.data.token);
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    // 获取用户信息
    async UserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code === 200){
            commit('USERINFO',result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    // 退出登录
    async LogOut({commit}){
        // 发送请求清除服务器token
        let result = await reqLogOut();
        if(result.code === 200){
            commit('LOGOUT');
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'));
        }
    }
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        console.log(token);
        state.token = token.token;
    },
    USERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    LOGOUT(state){
        state.token='';
        state.userInfo={};
        localStorage.removeItem('TOKEN');
    }
};
const getters = {};

export default {
    state,
    actions,
    mutations,
    getters,
}