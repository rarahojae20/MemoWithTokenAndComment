<template>
  <section id="section1">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide text1">
          <div class="s1_text">
            <div class="swiper-pagination"></div>
            <p class="p1">호재 공부 연구소</p>
            <p class="p2">호재의 발전을 위해  끊임없이 연구하는 기업, 호재노트</p>
            <p class="p3">혁신적 메모관리 앱 ‘호재LAB’을 통해 호재의 성장을 돕습니다.</p>
          </div>
        </div>
        <div class="swiper-slide text2">
          <div class="s1_text2">
            <div class="swiper-pagination"></div>
            <p class="p1">호재의 입장에서</p>
            <p class="p2">호재가 느끼는 크고 작은 고충들을 이해하고<br>이에 대한 해소 방법을 메모한다.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/css/swiper.css';

  export default {
    name: "Section1",
    data(){
      return{
        swiperInitialized: false,
      }
    },
    mounted() {
      this.initSwiper();
    },
    updated() {
      // 페이지 내용이 업데이트되면서 Swiper 컴포넌트 초기화
      if (!this.swiperInitialized) {
        this.initSwiper();
        this.swiperInitialized = true;
      }
    },
    methods: {
      initSwiper() {
        const swiper = new Swiper('.swiper-container', {
          autoplay: {
            delay: 3000,
          },
          pagination: {
            el: '.swiper-pagination',
          },
        });
      },
    },
  };
</script>
