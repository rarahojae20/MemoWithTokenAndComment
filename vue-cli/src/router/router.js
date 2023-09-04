import Vue from "vue"
import Router from "vue-router"
import Home from "../views/home/Home"
import Login from "../views/sign/Login"
import store from '../store'
import mypage from '../views/home/mypage'
import Signup from '../views/sign/Signup'
import Write from '../views/mypage/Write'
import Content from '../views/mypage/Content'

Vue.use(Router)
//로그인했을경우
const rejectAuthUser = (to,from,next)=>{
  if(store.state.isLogin === true){
    alert('이미 로그인을 하였습니다.')
    next("/")
  }else{
    next()
  }
}
//로그인 안했을경우
const onlyAuthUser = (to,from,next)=>{
  if(store.state.isLogin === false){
    alert('로그인이 필요한 기능입니다.')
    next("/login")
  }else{
    next()
  }
}
export default new Router({
    mode:"history",
    base:process.env.BASE_URL,
    routes:[
      {
        path:'/',
        name:'home',
        component:Home
      },
      {
        path:'/mypage',
        name:'mypage',
        beforeEnter : onlyAuthUser,
        component:mypage
      },
      {
        path:'/login',
        name:'login',
        beforeEnter : rejectAuthUser,
        component:Login
      },
      {
        path:'/signup',
        name:'signup',
        beforeEnter : rejectAuthUser,
        component:Signup
      },
      {
        path:'/mypage/write',
        name:'Write',
        component:Write
      },
      {
        path:'/mypage/content',
        name:'Content',
        component:Content
      },
    ]
})
