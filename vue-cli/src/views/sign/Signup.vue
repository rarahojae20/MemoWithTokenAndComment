<template>
  <div id="SignUpView">
    <div id="signup">
      <div class="su_box">
        <div class="box_title" v-if="component !== 'Com'">
          <div v-if="component === 'Form'">
          <p class="sign_title">회원가입</p>
          <p>회원가입을 위한 정보를 기입해주세요.</p>
          </div>
          <div v-else>
            <p class="sign_title">약관동의</p>
          </div>
        </div>
        <component :is="component" @changeComp="changeComp"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import Com from  '../../views/sign/signup/Complete'
  import Term from  '../../views/sign/signup/Term'
  import Form from  '../../views/sign/signup/Form_Signup'
  export default {
    name: "Signup",
    components:{
      Com,Term,Form
    },
    data(){
      return{
        component:'Form'
      }
    },
    methods:{
      changeComp(component){
        this.component = component
      }
    }
  }
</script>
