<template>
  <div>
    <Header></Header>

    <router-view></router-view>
    <!-- 在home search下显示  在login  register隐藏 -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 获取三级联动列表数据
    // 组件挂载完毕派发 dispatch 来发送请求  放在 app 跟组件内 请求只会发送一次
    this.$store.dispatch('getCategoryList');

  }

}
</script>

<style>
  a{
    cursor: pointer;
  }
</style>
