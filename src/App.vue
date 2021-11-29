<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode';
      export default {
          name: 'app',
          created() {
            const token = localStorage.getItem('blogToken');
           if(token){
             const decode = jwt_decode(token);
             this.$store.dispatch('audpdateInfo',decode);
           }else{
             return;
           }
           
          },
      };
</script>

<style lang="scss" scoped>
  html,
  body {
    width: 100%;
    height: 100%;
  }

  #app {
    height: 937px;

    /* @media screen and (max-width: 375px) {
      height: 17.783333rem;

    } */
  }

</style>
