<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked" @change="updateChecked(item, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('mins', -1, item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt"
              @change="handler('change', $event.target.value * 1, item)">
            <a href="javascript:void(0)" class="plus" @click="handler('plus', 1, item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteCartById(item)" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length > 0"
          @click='changeAllChecked'>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push({name:'trade'})">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 引入 throttle 节流
import throttle from 'lodash/throttle';

export default {
  name: 'ShopCart',
  mounted() {
    this.getData();
  },
  methods: {
    // 获取购物车列表
    getData() {
      this.$store.dispatch('getCartList');
    },
    // 修改商品数量的信息
    handler: throttle(async function (type, val, cart) {
      switch (type) {
        case 'plus':
          val = 1;
          break;
        case 'mins':
          val = cart.skuNum > 1 ? -1 : 0;
          break;
        case 'change':
          // 判断非法输入   字符和负数
          if (isNaN(val) || val < 1) {
            val = 0;
          } else {
            // 判断浮点数  
            val = parseInt(val) - cart.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch('GetOrUpdateShopCar', { skuId: cart.skuId, skuNum: val });
        this.getData();
      } catch (error) {

      }
    }, 1000),
    // 删除某一个商品的信息
    async deleteCartById(item) {
      try {
        await this.$store.dispatch('deleteCartlist', item.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改一个产品的选中信息
    async updateChecked(item, event) {
      try {
        let checked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('updateChecked', { skuId: item.skuId, isChecked: checked });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除选中的所有产品
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteAllCheckedCart');
        this.getData();
      } catch (error) {
        alert(error.message);
      }

    },
    // 全选按钮
    async changeAllChecked(event) {
      if (this.cartInfoList.length > 0) {
        let checked = event.target.checked ? '1' : '0';
        // 派发actions
        try {
          await this.$store.dispatch('changeAllChecked', checked);
          this.getData();
        } catch (error) {
          alert(error.message);

        }
      }
    }

  },
  computed: {
    ...mapGetters(['cartList']),
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice
      });
      return sum
    },
    isAllChecked() {
      let flag = 1;
      this.cartInfoList.forEach(item => {
        if (!item.isChecked) {
          flag = 0;
        }
      });
      return flag;
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }


        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            cursor: pointer;
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>