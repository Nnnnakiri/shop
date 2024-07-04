<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveChange" @mouseenter="mouseEnter">
                <h2 class="all">全部商品分类</h2>

                <!-- 过渡动画 -->
                <transition name="sort">
                    <!-- 通过给事件委派给三级联动的所有元素添加事件 -->
                    <!-- 然后通过自定义属性来判断是不是a标签   -->
                    <!-- 并通过自定义属性将参数传递过去 -->
                    <div class="sort" @click="goSearch($event)" v-show="show">
                        <!-- 三级联动 -->
                        <div class="all-sort-list2">
                            <!-- 第一级 -->
                            <div class="item" v-for="c1 in categoryList" :key="c1.categoryId"
                                :class="{ cur: currentIndex == c1.categoryId }">
                                <h3 @mouseenter="changeIndex(c1.categoryId)">
                                    <!-- 添加自定义属性来判断是不是a标签 并传递参数 -->
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName
                                    }}</a>
                                </h3>
                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex == c1.categoryId ? 'block' : 'none' }">
                                    <!-- 第二级 -->
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <!-- 添加自定义属性来判断是不是a标签 并传递参数 -->
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                                                    c2.categoryName }}</a>
                                            </dt>

                                            <dd>
                                                <!-- 第三级 -->
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <!-- 添加自定义属性来判断是不是a标签 并传递参数 -->
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{
                                                            c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </transition>

            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>


    </div>
</template>

<script>

import { mapState } from 'vuex';
import throttle from 'lodash/throttle';

export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1,
            show: true
        }
    },
    methods: {
        // _.throttle是lodash的节流函数  
        // es5写法
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 50),
        leaveChange() {
            this.currentIndex = -1;
            if (this.$route.path != '/home') {
                this.show = false
            }
        },
        mouseEnter() {
            this.show = true
        },
        goSearch(event) {
            let element = event.target;
            // 解构赋值自定义属性
            let { categoryname, category1id, category2id, category3id } = element.dataset;
            // 有 categoryname 是a标签
            if (categoryname) {
                let location = { name: 'search' };
                let query = { categoryName: categoryname }
                // 有 category1id 是一级 有 category2id 是二级 有 category3id 是三级
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                // 参数合并  如果路由有params参数  将其添加进 location
                if(this.$route.params){
                    location.params = this.$route.params
                }
                // 将 location 添加完整
                location.query = query;
                // console.log(location);
                // 路由跳转
                this.$router.push(location)
            }
 
        }
    },
    mounted() {
        // 判断是否需要显示三级联动
        if (this.$route.path != '/home') {
            this.show = false;
        }

    },
    computed: {
        ...mapState({
            // 右侧需要一个函数  当使用这个计算属性时  函数会立刻执行一次
            // 参数state即为大仓库的数据
            categoryList: (state) => {
                return state.home.categoryList
            }
        })
    }

}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
            }
        }
        // 进入的开始动画
        // 过渡动画的开始状态
        .sort-enter,.sort-leave-to{
            opacity: 0;
        }
        // 过渡动画的结束状态
        .sort-enter-to,.sort-leave{
            opacity: 1;
        }
        // 过渡动画的时间、速率
        .sort-enter-active,.sort-leave-active{
            transition: all .3s linear;
        }



        .cur {
            background-color: skyblue;
        }
    }
}
</style>