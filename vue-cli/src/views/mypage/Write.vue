<template>
  <div id="write">
  <v-app >
    <v-main>
      <v-container style="display: flex;justify-content: center">
        <v-row>
          <v-col cols="12" md="1" style="position: relative">
            <img src="../../assets/images/home/icon_home_n.png" height="50px"
                 style="cursor: pointer;position: absolute;right:0" @click="$router.push('/')">
          </v-col>
          <v-col cols="12" md="10">
            <v-card>
              <v-form ref="form" @submit.prevent="submit" style="padding: 24px">
                <v-text-field v-model="title" dense outlined label="제목"
                              :rules="[v => !!v || '제목은 필수입니다.']"></v-text-field>
                <v-textarea v-model="text" label="내용" outlined rows="13" ></v-textarea>
                <div class="button" style="text-align: right">
                <v-btn width="100px" @click="$router.push('/mypage')">취소</v-btn>
                <v-btn width="100px" style="margin-left: 30px;" type="submit">제출</v-btn>
                </div>
              </v-form>
            </v-card>
          </v-col>
<!--          <v-col cols="12" md="1"/>-->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  </div>
</template>


<script>
  import axios from 'axios';
  export default {
    name: "Write",
    data(){
      return {
        title: '',
        text: '',
      }
    },
    methods: {
      submit() {
        const memoData = {
          title: this.title,
          content: this.text,
        };
         axios.post('/api/memos', memoData)
           .then((response) => {
             console.log("글 작성 완료");
             this.$router.push('/mypage');
           })
           .catch((error) => {
             console.error("글 작성 실패:", error);
           });
      },
    },
  }
</script>

