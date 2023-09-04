<template>
    <div id="complete_view">
      <img src="../../../assets/images/complete_img.png">
      <p class="p1">회원가입 완료</p>
      <p class="p2">이메일 인증 및 회원가입이 완료되었습니다.<br>
        인증된 이메일로 로그인하세요</p>
      <button @click="$router.push('/login')">로그인</button>
    </div>
</template>

<script>
  export default {
    name: "Complete"
  }
</script>

