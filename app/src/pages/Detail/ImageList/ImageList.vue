<template>
  <div class="swiper-container" ref="carousel">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slider, index) in skuImageList" :key="slider.id">
        <img :src="slider.imgUrl" :class="{ active: currentIndex == index }" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  props: ['skuImageList'],
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    changeCurrentIndex(index) {
      
      this.currentIndex = index;
      // 通知放大镜组件替换图片  将索引值送过去
      this.$bus.$emit('getIndex',this.currentIndex);
    }
  },
  watch: {
    skuImageList(newValue, oldValue) {
      this.$nextTick(function name(params) {
        var mySwiper = new Swiper(this.$refs.carousel, {
          // direction: 'vertical', // 垂直切换选项
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          // 显示几个图片
          slidesPerView: 3,
          // 一次性切换几张图片
          slidesPerGroup: 1

        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>