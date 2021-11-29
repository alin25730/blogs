<template>
    <div id="DarkModelPage">
        <Top></Top>
        <Left_nav></Left_nav>
        <router-view></router-view>
        <!-- <a  class="btn" @click="modelBrn">模式切换</a>
        <div ref="avc" class="abc"></div> -->
    </div>
</template>

<script>
    import Top from "../../components/Admin-Top"
    import Left_nav from "../../components/Admin-left"
    export default {
        name: 'BlogAdminpage',
      
        components: { Top, Left_nav },
        data() {
            return {
              
            };
        },
        methods: {
          

            modelBrn() {
                this.dark = !this.dark;
                if (this.dark) {
                    window.document.documentElement.setAttribute("data-theme", 'dark');
                    this.$refs.avc.setAttribute("data-theme", 'img');
                } else {
                    window.document.documentElement.setAttribute("data-theme", 'light');
                    this.$refs.avc.setAttribute("data-theme", 'dark');
                }
            },
        },
        created() {
           
        },
    };
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/common/common';




</style>
