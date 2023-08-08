<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        fixed
        app
    >
      <!--  -->
      <p @click="$router.push('/')">홈</p>
      <p v-if="isLogin === false" @click="$router.push('/login')">로그인</p>
      <p @click="$router.push('/mypage')">마이페이지</p>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items  class="hidden-sm-and-down" style="height: 40px">
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
            <v-list-item>
              <v-list-item-title>마이페이지</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn v-else router :to="{name:'login'}">로그인</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
  import useRouter from 'vue-router'
  import {mapState, mapActions} from 'vuex'
  export default {
    data: () => ({
      drawer: null,
      useRouter
    }),
    computed:{
      ...mapState(["isLogin"])
    },
    methods:{
      ...mapActions(['logout'])
    }
  }
</script>
