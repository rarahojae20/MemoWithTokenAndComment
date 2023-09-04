<template>
  <div id="mypage" v-if="isLogin">
    <div class="title">
      <h1>
        {{userInfo.name}}님의 메모장
      </h1>
    </div>
   <div class="list">
     <v-app>
       <v-main>
         <v-container>
           <v-row>
             <v-col cols="12" md="4"></v-col>
             <v-col cols="12" md="2">
               <v-btn color="cyan" @click="$router.push('/')"
                      :style="{height:'50px', width:'170px', fontWeight:'bold', fontSize:'large'}">홈으로</v-btn>
             </v-col>
             <v-col cols="12" md="2">
               <v-btn color="pink accent-1" @click="$router.push('/mypage/write')"
                      :style="{height:'50px', width:'170px', fontWeight:'bold', fontSize:'large'}">글작성</v-btn>
             </v-col>
             <v-col cols="12" md="4"></v-col>
             <v-col cols="12" md="2">
             </v-col>
           </v-row>
           <v-row>
             <v-simple-table style="width: 100%;">
               <thead>
               <tr style="font-weight: bolder;">
                 <td style="width:50%; font-size: x-large;">제목</td>
                 <td style="width:30%; font-size: x-large;">작성일</td>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in contentlist" :key="item.id" @click="movetocontent(item.id)">
                 <td>{{item.title}}</td>
                 <td>{{item.createdAt.split('T')[0]}}</td>
               </tr>
               </tbody>
             </v-simple-table>
           </v-row>
         </v-container>
       </v-main>
     </v-app>
   </div>
<!--    <router-view/>-->
  </div>
  <div class="mypage"  v-else>
    <h1>
      로그인해주세요
    </h1>
  </div>
</template>

<script>
//  import useRouter from 'vue-router'
  import {mapState} from "vuex"
  export default {
    name: "mypage",
    data(){
      return{
//        useRouter
        contentlist:[{id:1,title:'test',createdAt:'2021-12-10T12:38:52.000Z'}],

      }
    },
    computed:{
      ...mapState(["userInfo","isLogin"])
    }
  }
</script>
