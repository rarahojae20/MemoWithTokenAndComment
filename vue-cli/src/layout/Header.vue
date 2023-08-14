<template>
  <div id="header">
    <v-navigation-drawer v-if="shouldShowDrawer"
                         v-model="drawer"
                         fixed
                         app
    >
      <p @click="$router.push('/')">홈</p>
      <p v-if="isLogin === false" @click="$router.push('/login')">로그인</p>
      <p @click="$router.push('/mypage')">마이페이지</p>
    </v-navigation-drawer>
    <v-app-bar app class="v_bar">
      <v-app-bar-nav-icon @click="nav_drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items  class="hidden-sm-and-down" style="height: 33px">
        <v-menu offset-y v-if="isLogin">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                dark
                v-bind="attrs"
                v-on="on"
                icon
            >
              <v-icon style="color: black">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$router.push('/mypage')">
              <v-list-item-title>마이페이지</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="login_btn" v-else router :to="{name:'login'}">로그인</v-btn>
        <v-btn class="signup_btn" v-if="!isLogin" @click="$router.push('/signup')">회원가입</v-btn>
      </v-toolbar-items>
    </v-app-bar>

  </div>
</template>

<script>
  import useRouter from 'vue-router'
  import {mapState, mapActions} from 'vuex'
  export default {
    name: "Header",
    props: {
      isTop: Boolean
    },
    data: () => ({
      drawer: false,
      useRouter,
    }),
    computed:{
      ...mapState(["isLogin"]),
      shouldShowDrawer() {
        return this.$route.meta.resetDrawer !== true;
      },
    },
    methods:{
      ...mapActions(['logout']),
      nav_drawer(){
        if (this.drawer === false){
          this.drawer = true
        }else{
          this.drawer = false
        }
      }
    },
    watch: {
      $route(to, from) {
        if (to.meta.resetDrawer !== from.meta.resetDrawer) {
          this.drawer = false;
        }
      }
  }
  }
</script>
