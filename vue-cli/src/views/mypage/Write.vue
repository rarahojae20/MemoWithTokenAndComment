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
                <v-textarea v-model="text" label="내용" outlined rows="13" style="width: 1300px;"></v-textarea>
                <div class="button" style="text-align: right">
                <v-btn width="100px" style=" margin-bottom:30px;" @click="$router.push('/mypage')">취소</v-btn>
                <v-btn width="100px" style="margin-left: 30px; margin-bottom:30px;" type="submit">제출</v-btn>
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
        // 작성한 글을 서버에 저장하고, 리스트로 이동하는 코드를 작성합니다.
        const memoData = {
          title: this.title,
          content: this.text,
        };
//         Axios 또는 다른 HTTP 라이브러리를 사용하여 서버에 데이터를 전송합니다.
//         예를 들어 Axios를 사용하면 다음과 같이 작성할 수 있습니다.
         axios.post('/api/memos', memoData)
           .then((response) => {
             // 서버에서 응답을 받았을 때 처리할 로직을 작성합니다.
             console.log("글 작성 완료");
             this.$router.push('/mypage'); // 작성 후 리스트 페이지로 이동
           })
           .catch((error) => {
             // 에러 처리 로직을 작성합니다.
             console.error("글 작성 실패:", error);
           });

        // 위의 코드를 Axios 또는 다른 HTTP 라이브러리를 사용하여 서버에 데이터를 저장하는 형태로 변경해주세요.
      },
    },
  }
</script>

<style scoped>

</style>
