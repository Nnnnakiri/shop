<template>
    <div>
        <!-- 三级导航 全局组件  不需要在此注册即可直接使用 -->
        <TypeNav></TypeNav>
        <!-- 轮播图及快报 -->
        <ListContainer></ListContainer>
        <!-- 进入推荐 -->
        <Recommend></Recommend>
        <!-- 排行 -->
        <Rank></Rank>
        <!-- 猜你喜欢 -->
        <Like></Like>
        <!-- 楼层 -->
        <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"></Floor>
        <!-- 商标 -->
        <Brand></Brand>
    </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

import { mapState } from 'vuex'

    export default {
        name:'Home',
        components:{
            ListContainer,
            Recommend,
            Rank,
            Like,
            Floor,
            Brand
        },
        computed:{
            ...mapState({
                floorList:(state)=>{
                    return state.home.floorList
                }
            })
        },
        mounted(){
            // 派发action 获取 floor 组件的数据
            this.$store.dispatch('getFloorList');

            // 获取用户信息 (获取用户信息在导航守卫中已经做了  每次路由跳转前判断有没有用户信息 没有则发送actions)
            // this.$store.dispatch('UserInfo');
        }

    }
</script>

<style lang="less" scoped>

</style>