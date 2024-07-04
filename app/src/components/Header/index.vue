<template>
    <div>
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!userName">
                            <span>请</span>
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                        <p v-if="userName">
                            <a>{{ userName }}</a>
                            <a @click="logout" class="register">退出</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <a @click="$router.push({name:'myorder'})">我的订单</a>
                        <a @click="$router.push({name:'showcart'})">我的购物车</a>
                        <a >我的尚品汇</a>
                        <a >尚品汇会员</a>
                        <a >企业采购</a>
                        <a >关注尚品汇</a>
                        <a >合作招商</a>
                        <a >商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link to="/home" class="logo" title="尚品汇">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input v-model="keyword" type="text" id="autocomplete" class="input-error input-xxlarge" />
                        <button @click="goSearch" class="sui-btn btn-xlarge btn-danger" type="button">搜索
                        </button>
                    </form>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        goSearch() {
            let location = {
                // 对象写法要给路由添加name属性
                // 跳转可以使用name或者path属性  但是使用path属性时  无法传递params参数
                name: 'search',
                // 通过路由配置可以指定params参数是否必须传递  在params占位符后面添加一个 ? 即可
                params: {
                    // 可以使用undefined解决params传递空字符串的问题
                    // keyword:''||undefined
                    keyword: this.keyword || undefined
                }

            };
            // 合并参数
            if (this.$route.query) {
                location.query = this.$route.query
            }
            // 第一种
            // 路由跳转并传递参数
            // this.$router.push('/search/'+this.keyword+'?keyword='+this.keyword);
            // 第二种 模板字符串
            // this.$router.push(`/search/${this.keyword}?keyword=${this.keyword}`);
            // 第三种 对象写法
            this.$router.push(location)

        },
        // 退出登录
        async logout() {
            // 需要向服务器发送请求清除服务器上的token
            // 需要清除本地存储的token
            try {
                await this.$store.dispatch('LogOut');
                this.$router.push({
                    name:'home'
                });
            } catch (error) {
                alert(error.message);
            }

        }
    },
    mounted() {
        this.$bus.$on('clearKeyword', () => {
            this.keyword = '';
        })
    },
    computed: {
        userName() {
            return this.$store.state.user.userInfo.name
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>