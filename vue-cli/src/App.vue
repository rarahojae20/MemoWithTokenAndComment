<template>
  <v-app id="inspire">
    <Header/>
    <v-main>
      <!--  -->
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
  import useRouter from 'vue-router'
  import Header from './layout/Header'
  export default {
    data: () => ({
      drawer: null,
      useRouter,
      na: false,
    }),
    components:{
      Header
    },
    computed:{

    },
    methods:{

    }
  }
</script>
