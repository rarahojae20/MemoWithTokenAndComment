<template>
  <section id="section2">
    <div class="footer">
      <div class="s2_left">
        <p class="p1">우리LAB</p>
        <p class="p2">우리들의 개발기록.</p>
        <button @click="GoToGoogle">
          <img src="../../assets/images/home/section2/icon-play.png" width="24px">
          Google Play
        </button>
        <button @click="GoToApp">
            <img src="../../assets/images/home/section2/icon-store.png" width="24px">
            App Store
        </button>
      </div>
      <div class="s2_right">
        <div class="right_box">
          <strong class="right_p1">주식회사 사업노트</strong>
          <span><strong>대표</strong>이우리</span>
          <span><strong>사업자등록번호</strong>408-88-02312</span><br/>
          <span><strong>주소</strong> 서울특별시 명일동 155-1 <strong></strong></span>
          <span><strong>E-mail</strong>raraho@naver.com</span>
        </div>
        <div class="right_box2">
          <p class="right_p2">Copyright by 4UPNOTE Inc.</p>
          <p class="right_p2">© All rights reserved.</p>
        </div>
        </div>
      </div>
  </section>
</template>

<script>
  export default {
    name: "Section2",
    methods:{
      GoToGoogle(){
        window.open('https://play.google.com/')
      },
      GoToApp(){
        window.open('https://apps.apple.com/')
      }
    }
  }
</script>

<style scoped>

</style>
