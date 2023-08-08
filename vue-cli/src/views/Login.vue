<template>
  <section id="login_view">
  <div id="login">
    <vue-container>
      <v-alert
          :value="isLoginError"
          type="error">
        아이디와 비밀번호를 확인해주세요.
      </v-alert>
      <v-alert
          :value="isLogin"
          type="success">
        로그인이 완료되었습니다.
      </v-alert>
      <p class="p1">로그인</p>
      <p class="p2">메모참여를 위해 로그인해주시기 바랍니다.</p>
      <vue-layout row wrap>
        <v-flex xs12>
          <v-text-field
          v-model="email"
          label="이메일을 입력하세요"
          >
          </v-text-field>
          <v-text-field
              v-model="password"
              type="password"
              @keyup.enter="login({email,password})"
              label="패스워드를 입력하세요"
          >
          </v-text-field>
        </v-flex>
        <v-btn
            color="primary"
            depressed
            block
            large
            @click="login({email,password})"
        >로그인
        </v-btn>
      </vue-layout>
    </vue-container>
  </div>
  </section>
</template>

<script>
//  import Vuex from "vuex"
  import {mapState,mapActions} from "vuex"
  const AllUsers =[
      {
        id:1,
        name:"rara",
        email:"rara@naver.com",
        password: "123123"
      },
    {
      id:2,
      name:"jack",
      email:"jack@naver.com",
      password: "123123"
    }
      ]
  export default {
    name: "Login.vue",
    data(){
      return{
        email:null,
        password:null,
        AllUsers,
      }
    },
    computed:{
      ...mapState(["isLogin","isLoginError"])
    },
    methods:{
      ...mapActions(['login']),
    }
  }
</script>
