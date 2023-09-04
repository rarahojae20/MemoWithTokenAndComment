<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="1">
            <v-btn color="cyan" @click="$router.push('/')"
                   :style="{height:'50px', width:'90px', fontWeight:'bold', fontSize:'large'}">홈으로</v-btn>
          </v-col>
          <v-col cols="12" md="10">
            <v-card>
              <v-form ref="form" @submit.prevent="onSubmitForm">
                <v-text-field v-model="writer" dense outlined label="작성자" style="width: 300px; margin-left: 100px; padding-top: 20px;"
                              :rules="[v => !!v || '작성자는 필수입니다.']"></v-text-field>
                <v-text-field v-model="title" dense outlined label="제목" style="width: 500px; margin-left: 100px;"
                              :rules="[v => !!v || '제목은 필수입니다.']"></v-text-field>
                <v-textarea v-model="text" label="내용" outlined rows="13" style="width: 730px; margin-left: 100px;"></v-textarea>
                <v-btn width="100px" style="margin-left: 600px; margin-bottom:30px;" @click="$router.push('/mypage')">취소</v-btn>
                <v-btn width="100px" style="margin-left: 30px; margin-bottom:30px;" type="submit">제출</v-btn>
              </v-form>
            </v-card>
          </v-col>
          <v-col cols="12" md="1"/>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: "Write"
  }
</script>

<style scoped>

</style>
