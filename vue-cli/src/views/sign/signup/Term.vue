<template>
  <div id="term">
    <div class="all_agree">
      <el-checkbox v-model="isAgree" @change="AllChange">
        <span>이용약관, 개인정보 수집 및 이용, 위치정보 이용약관(선택), 프로모션 안내 메일 수신(선택)에 모두 동의합니다.</span>
      </el-checkbox>
    </div>
    <div class="terms">
      <el-checkbox v-model="isAgree1">
        <span>이용약관동의<span class="essential">(필수)</span></span>
      </el-checkbox>
    </div>
    <div class="terms_box">
      <div class="scroll_container">
        <p v-html="STATIC_TERMS"><p/>
      </div>
    </div>
    <div class="privacy">
      <el-checkbox v-model="isAgree2">
        <span>개인정보 수집 및 이용의 대한 안내<span class="essential">(필수)</span></span>
      </el-checkbox>
    </div>
    <div class="privacy_box">
      <div class="scroll_container">
        <p v-html="STATIC_PRIVACY"><p/>
      </div>
    </div>
    <div class="choice">
      <el-checkbox v-model="isAgree3">
        <span>이벤트 등 프로모션 알림을 위한 메일/문자 수신<span class="essential">(선택)</span></span>
      </el-checkbox>
    </div>
    <div class="button">
      <button class="cancel" @click="cancel">취소</button>
      <button class="cancel" @click="submit">확인</button>
    </div>
  </div>
</template>

<script>
  import {STATIC_PRIVACY, STATIC_TERMS} from '@/constants/terms'
  export default {
    name: "Term",
    data(){
      return{
        STATIC_PRIVACY,
        STATIC_TERMS,
        isAgree:false,
        isAgree1:false,
        isAgree2:false,
        isAgree3:false,
      }
    },
    methods:{
      AllChange(Value) {
        if (Value) {
          this.isAgree1 = true;
          this.isAgree2 = true;
          this.isAgree3 = true;
        } else {
          this.isAgree1 = false;
          this.isAgree2 = false;
          this.isAgree3 = false;
        }
      },
      cancel() {
        const vm = this;
        vm.$confirm('회원가입을 멈추시겠습니까?', '회원가입', {
          cancelButtonText: '취소',
          confirmButtonText: '확인',
          type: 'warning'
        }).then(() => {
          vm.$router.push('/login');
        }).catch(() => {
        });
      },
      submit(){
        const vm = this
        if (vm.isAgree1 && vm.isAgree2){
          vm.$emit('changeComp', 'Form')
        }else{
          if(!vm.isAgree1 && !vm.isAgree2){
            vm.$alert('약관 필수항목에 대해 동의선택을 해주시기 바랍니다.', '알림')
          } else if(vm.isAgree1){
            vm.$alert('개인정보 수집 및 이용에 동의해주시기 바랍니다.', '알림')
          }else if(vm.isAgree2){
            vm.$alert('이용약관을 동의해주시기 바랍니다.', '알림')
          }
        }
      },
    },
    watch: {
      isAgree1(value) {
        if (value && this.isAgree2 && this.isAgree3) {
          this.isAgree = true;
        } else {
          this.isAgree = false;
        }
      },
      isAgree2(value) {
        if (value && this.isAgree1 && this.isAgree3) {
          this.isAgree = true;
        } else {
          this.isAgree = false;
        }
      },
      isAgree3(value) {
        if (value && this.isAgree1 && this.isAgree2) {
          this.isAgree = true;
        } else {
          this.isAgree = false;
        }
      },
    },
  }
</script>
