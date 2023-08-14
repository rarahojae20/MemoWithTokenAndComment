<template>
  <div id="home">
<!--    <video width="100%" height="100%"-->
<!--           src="/media/home_video.mp4"-->
<!--           autoplay loop muted playsinline/>-->
<!--    <div class="video-bg"></div>-->
    <div class="page1">
      <Section1/>
    </div>
    <div class="page2">
      <Section2/>
    </div>
  </div>
</template>

<script>
  import Section1 from '../../layout/home/Section1'
  import Section2 from '../../layout/home/Section2'
  export default {
    name: "Home.vue",
    beforeRouteEnter(to, from, next) {
      // 홈 페이지로 진입할 때마다 상태 변경
      next((vm) => {
        vm.$store.commit("setResetDrawer", true);
      });
    },
    data(){
      return{

      }
    },
    components:{
      Section1,
      Section2
    }
  }
</script>

