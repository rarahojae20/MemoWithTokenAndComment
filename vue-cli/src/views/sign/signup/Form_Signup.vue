<template>
  <div id="formSignup">
    <el-form :model="formData" :rules="rules" ref="form">
      <el-form-item prop="username">
        <el-input placeholder="아이디" v-model="formData.username"  autocomplete="off" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="비밀번호" v-model="formData.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input placeholder="비밀번호 확인" v-model="formData.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="name">
        <el-input placeholder="이름" v-model="formData.name" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="submitForm">회원가입</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "FormSignup",
    data() {
      return {
        formData: {
          password: "",
          checkPass: "",
          username:"",
          name:""
        },
        rules: {
          password: [
            { required: true, message: "비밀번호를 입력해주세요.", trigger: "blur" },
            { min: 4, message: "아이디는 최소 4자리 이상이어야 합니다." },
          ],
          checkPass: [
            { required: true, message: "비밀번호재확인을 입력해주세요.", trigger: "blur" },
            { validator: this.PasswordMatch, trigger: "blur" },
          ],
          username:[
            {required: true, message: '아이디를 입력해주세요.', trigger: 'blur',},
            {type: 'email', message: '이메일 형식으로 입력해주세요.', trigger:['blur','change'],}
          ],
          name:[
            {required: true, message: '이름을 입력해주세요.', trigger: 'blur',},
          ]
        },
        passwordMismatch: false,
      };
    },
    methods: {
      submitForm() {
        const vm = this
        vm.$refs.form.validate(valid => {
          if (valid) {
            console.log("Form submitted:", this.formData);
//            vm.$alert('회원가입 완료!','알림')
            vm.$emit('changeComp','Com')
          } else {
            console.log("Validation failed");
          }
        });
      },
      PasswordMatch(rule, value, callback) {
        if (value !== this.formData.password) {
          this.passwordMismatch = true;
          callback(new Error("비밀번호가 일치하지 않습니다."));
        } else {
          this.passwordMismatch = false;
          callback();
        }
      },
    },
  };
</script>
