<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCaragoryName">×</i>
            </li>
            <!-- 关键字 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 售卖属性 -->
            <li class="with-x" v-for="(attr, index) in searchParams.props" :key="index">
              {{ attr.split(':')[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 绑定自定义事件  并设置触发回调  该回调会受到一个 trademark 参数-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- &#xe838;  icon-wind-descending降序箭头 -->
                <!-- &#xe839;  icon-wind-ascending升序箭头 -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>综合 <span v-show="isOne" class="iconfont" :class="order"> </span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格 <span v-show="isTwo" class="iconfont" :class="order"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 分页器组件 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters,mapState } from 'vuex';
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      searchParams: {
        // 一级联动ID
        "category1Id": "",
        // 二级联动ID
        "category2Id": "",
        // 三级联动ID
        "category3Id": "",
        // 分类名
        "categoryName": "",
        // 关键字
        "keyword": "",
        // 排序
        // 1: 综合,2: 价格 asc: 升序,desc: 降序  
        // 示例: "1:desc"
        "order": "1:desc",


        // 分页器  代表第几页
        "pageNo": 1,
        // 每页展示几条数据
        "pageSize": 10,
        // 平台售卖属性操作带的参数
        "props": [],
        
        // 品牌
        "trademark": ""
      }

    }
  },
  beforeMount() {
    // 合并参数  将携带的params 和 query 合并到 searchParams中 并在mounted中发送给服务器
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState({
      total:(state)=>{
        return state.search.searchList.total
      }
    }),
    ...mapGetters(['goodsList']),
    // 判断是否应该有active类名
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    order() {
      if (this.searchParams.order.indexOf('asc') != -1) {
        return 'icon-wind-ascending';
      } else {
        return 'icon-wind-descending';
      }
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams);
    },
    removeCaragoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // this.getData();
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      } else {
        this.$router.push({ name: 'search' })
      }

    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      } else {
        this.$router.push({ name: 'search' })
      }
      // 通知兄弟组件清除关键字
      this.$bus.$emit('clearKeyword');
    },
    removeTrademark() {
      // 将 品牌 清空，并再次发请求
      this.searchParams.trademark = undefined;
      this.getData();
    },
    removeAttr(index) {
      // 再次整理参数
      this.searchParams.props.splice(index);
      // 再次发送请求
      this.getData();
    },
    trademarkInfo(trademark) {
      // 整理参数  品牌ID：品牌名称
      // console.log({ ...trademark });
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 再次发请求
      this.getData();
    },
    attrInfo(attr, attrValue) {
      // ["属性ID:属性值:属性名"]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // console.log(attr.attrId,attr.attrName,attrValue);
      // 判断数组内有没有该数据  避免重复
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
      }
      this.getData();
    },
    changeOrder(flag) {
      let orginOrder = this.searchParams.order;
      let orginFlag = this.searchParams.order.split(':')[0];
      let orginSort = this.searchParams.order.split(':')[1];
      let newOrder = '';
      // 如果点击的 排序flag 和 原有的排序相同
      if (orginFlag === flag) {
        // 则判断 原有的排序方法  将 desc 变为 asc  将 asc 变为 desc
        newOrder = `${orginFlag}:${orginSort === 'desc' ? 'asc' : 'desc'}`
      } else {
        // 如果不同  则将 点击的 排序flag 设置为原有排序
        newOrder = `${flag}:desc`
      }
      this.searchParams.order = newOrder;
      this.getData();
      console.log(this.searchParams.order);
    },
    // 获取当前第几页
    getPageNo(pageNo){
      console.log(pageNo);
      this.searchParams.pageNo = pageNo;
      this.getData();
    }
  },
  watch: {
    // 监听路由的信息
    $route(newVal, oldVal) {
      // 每次发请求之前 先将Id重置  避免上一次搜索的数据残余
      // 重置为undefined就不会将不必要的数据发给服务器
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;

      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getData();


    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>