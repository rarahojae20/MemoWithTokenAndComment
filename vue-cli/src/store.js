import Vue from "vue"
import Vuex from "vuex"
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userInfo:null,
    allUsers:[
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
      },
    ],
    isLogin: false,
    isLoginError:false
  },
  mutations:{
    // 로그인 성공
    loginSuccess(state,payload){
      state.isLogin=true
      state.isLoginError = false
      state.userInfo = payload
      // 로그인 정보를 로컬 스토리지에 저장
      localStorage.setItem("userInfo", JSON.stringify(payload));
    },
    //로그인 실패
    loginError(state,payload){
      state.isLogin = false
      state.isLoginError = true
    },
    logout(state){
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
      // 로그인 정보를 로컬 스토리지에서 제거
      localStorage.removeItem("userInfo");
    },
    initLoginState(state) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        state.isLogin = true;
        state.userInfo = userInfo;
      }
    }
    },
  actions:{
    //로그인 시도
    login({state, commit},loginObj){
        let selectedUser = null
        state.allUsers.forEach(user => {
          if (user.email === loginObj.email) selectedUser = user
        })
        if(selectedUser === null || selectedUser.password !== loginObj.password)
          commit("loginError")
    else {
          commit("loginSuccess", selectedUser)
          router.push('/mypage')
        }
    },
    logout({commit}){
      commit("logout")
      router.push('/')
    }
  },
})
