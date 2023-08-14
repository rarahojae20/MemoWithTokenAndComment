<template>
  <div>
    <h1 v-if="isLogin">
      {{userInfo.name}}님 환영합니다.
    </h1>
    <h1 v-else>
      로그인해주세요
    </h1>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: "mypage",
    computed:{
      ...mapState(["userInfo","isLogin"])
    }
  }
</script>
