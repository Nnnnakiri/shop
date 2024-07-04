import requests from './request'

import mockRequests from './mockAjax'


// 三级联动接口  /api/product/getBaseCategoryList  get  无参数

export const reqCategoryList = () => {
   return requests({ url: '/product/getBaseCategoryList ', methods: 'get', });
}

// 使用mock模拟请求 获取轮播图图片 该请求会被游览器拦截下来
export const reqGetBannerList = () => {
   return mockRequests.get('/banner');
}

// 获取floor数据
export const reqGetFloorList = () => {
   return mockRequests.get('/floor');
}

// 获取搜索列表数据 /api/list  post
// 需要带参数
/*{
   "category3Id": "61",
   "categoryName": "手机",
   "keyword": "小米",
   "order": "1:desc",
   "pageNo": 1,
   "pageSize": 10,
   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
   "trademark": "4:小米"
 }*/

export const reqGetSearchInfo = (params) => {
   return requests({
      url: '/list',
      method: 'post',
      data: params,
   });
}
// 获取商品详情  /api/item/{ skuId }  get
export const reqGoodsInfo = (skuId) => {
   return requests({
      url: `/item/${skuId}`,
      // params:skuId,
      method: 'get'
   })
}

//  添加到购物车(对已有物品进行数量改动) /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqGetOrUpdateShopCar = (skuId, skuNum) => {
   return requests({
      url: `/cart/addToCart/${skuId}/${skuNum}`,
      method:'post',

   })
}


//  获取购物车列表   /api/cart/cartList    get
export const reqCarList = () => { 
   return requests({
      url: `/cart/cartList`,
      method:'get',

   })
}

// 删除购物车内容  /api/cart/deleteCart/{skuId} DELETE

export const reqDeleteCartlist = (skuId) => { 
   return requests({
      url: `/cart/deleteCart/${skuId}`,
      method:'DELETE',

   })
}

// 修改商品选中状态  /api/cart/checkCart/{skuID}/{isChecked}  GET

export const reqUpdateChecked = ({skuId,isChecked}) => { 
   return requests({
      url: `/cart/checkCart/${skuId}/${isChecked}`,
      method:'get',

   })
}


// 获取验证码 /api/user/passport/sendCode/{phone}  get
export const reqGetCode = (phone) => { 
   return requests({
      url: `/user/passport/sendCode/${phone}`,
      method:'get',
   })
}

// 用户注册 /api/user/passport/register POST    参数 phone password code

export const reqUserRegister = (data) => { 
   return requests({ 
      url: `/user/passport/register`,
      method:'POST',
      data:data
   })
}

// 用户登录   /api/user/passport/login POST   phone password
export const reqUserLogin = (data) => { 
   return requests({ 
      url: `/user/passport/login`,
      method:'POST',
      data:data
   })
}

// 获取用户信息  需要在请求拦截器中添加 token /api/user/passport/auth/getUserInfo get
export const reqUserInfo = () => { 
   return requests({ 
      url: `/user/passport/auth/getUserInfo`,
      method:'get',
   })
}

// 退出登录 /api/user/passport/logout GET
export const reqLogOut = () => { 
   return requests({ 
      url: `/user/passport/logout`,
      method:'get',
   })
}

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqGetUserAddress = () => { 
   return requests({ 
      url: `/user/userAddress/auth/findUserAddressList`,
      method:'get',
   })
}
// 获取订单交易页信息   /api/order/auth/trade  get
export const reqGetTrade = () => { 
   return requests({ 
      url: `/order/auth/trade`,
      method:'get',
   })
}

// 提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}  POST
//#region 
// 参数名称
// traderNo
// consignee
// consigneeTel
// deliveryAddress
// paymentWay
// orderComment
// orderDetailList
//#endregion
export const reqSubmitOrder = (tradeNo,data) => { 
   return requests({ 
      url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
      data:data,
      method:'POST',
   })
}

// 获取订单支付信息  /api/payment/weixin/createNative/{orderId}  get

export const reqPayInfo = (orderId) => { 
   return requests({ 
      url: `/payment/weixin/createNative/${orderId}`,
      method:'get',
   })
}

// 查询订单支付状态 /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => { 
   return requests({ 
      url: `/payment/weixin/queryPayStatus/${orderId}`,
      method:'get',
   })
}

// 获取我的订单列表  /api/order/auth/{page}/{limit}  GET  page limit
export const reqMyOrder = ( page,limit) => { 
   return requests({ 
      url: `/order/auth/${page}/${limit}`,
      method:'get',
   })
}
