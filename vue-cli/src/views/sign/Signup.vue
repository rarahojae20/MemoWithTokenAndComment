<template>
  <div id="SignUpView">
    <div id="signup">
      <div class="su_box">
        <p class="sign_title">회원가입</p>
        <p>회원가입을 위한 정보를 기입해주세요.</p>
      </div>
      <div class="su_row">
        <input type="email" value="아이디" style="border: 1px solid black">

      </div>
    </div>
  </div>
</template>

<script>
  import  SignInput from '../../components/SignInput'
  export default {
    name: "Signup",
    components:{
      SignInput
    },
    data(){
      return{

      }
    }
  }
</script>
