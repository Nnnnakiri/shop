// 引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShowCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'


export default [
    // home
    {
        path: '/home',
        name: 'home',
        component: ()=>import('@/pages/Home'),
        meta: {
            // 改路由页面是否显示footer组件
            showFooter: true
        }
    },
    // search
    {
        name: 'search',
        // path中的params占位符添加一个 ? 就可以指定该参数是否必须传递
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta: {
            showFooter: true
        }

    },
    // login
    {
        name: 'login',
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: {
            showFooter: false
        }

    },
    // register
    {
        name: 'register',
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: {
            showFooter: false
        }

    },
    // 重定向
    {
        path: '/',
        redirect: '/home'
    },
    // detail
    {
        path: '/detail/:skilId',
        name: 'detail',
        component: ()=>import('@/pages/Detail'),
        meta: {
            // 改路由页面是否显示footer组件
            showFooter: true
        }
    },
    // AddCartSuccess
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: {
            // 改路由页面是否显示footer组件
            showFooter: true
        }
    },
    // ShowCart
    {
        path: '/showcart',
        name: 'showcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: {
            showFooter: true
        }
    },
    // Trade
    {
        path: '/trade',
        name: 'trade',
        component: ()=>import('@/pages/Trade'),
        meta: {
            showFooter: true
        },
        beforeEnter: (to,from,next) =>{
            if(from.path =='/showcart'){
                next();
            }else{
                next(from.path);
            }
        },
    },
    // Pay
    {
        path: '/pay',
        name: 'pay',
        component: ()=>import('@/pages/Pay'),
        meta: {
            showFooter: true
        },
        beforeEnter: (to,from,next) =>{
            if(from.path =='/trade'){
                next();
            }else{
                next(from.path);
            }
        },
    },
    // PaySuccess
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: {
            showFooter: true
        },
        beforeEnter: (to,from,next) =>{
            if(from.path =='/pay'){
                next();
            }else{
                next(from.path);
            }
        },
    },
    // Center
    {
        path: '/center',
        name: 'center',
        component: ()=>import('@/pages/Center'),
        meta: {
            showFooter: true
        },
        children:[
            {
                path:'myorder',
                name:'myorder',
                component: ()=>import('@/pages/Center/myOrder'),

            },
            {
                path:'grouporder',
                name:'grouporder',
                component: ()=>import('@/pages/Center/groupOrder'),
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            },
        ],
        
    },
]