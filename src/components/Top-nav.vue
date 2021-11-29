<template>
  <div class="Nav">
    <div class="nav-break">
      <router-link class="break" to="/Home"> breaking </router-link>
      <div class="nav-right">
        <i @click="Show" :class="
            isShow == true ? 'iconfont  icon-xuanxiangqiacaidananniu' : 'iconfont icon-xuanxiangqiaguanbianniu'"></i>
        <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
          <ul v-show="!isShow">
            <li>
              <router-link to="/Home">
                <h2>首页</h2>
              </router-link>
            </li>
            <li>
              <router-link to="/About">
                <h2>关于我</h2>
              </router-link>
            </li>
            <li>
              <router-link to="/blogroll">
                <h2>友情链接</h2>
              </router-link>
            </li>
          </ul>
        </transition>
      </div>
      <div class="nav-top">
        <router-link to="/Home">
          <h2>首页</h2>
        </router-link>
        <router-link to="/About">
          <h2>关于我</h2>
        </router-link>
        <router-link to="/blogroll">
          <h2>友情链接</h2>
        </router-link>
        <div class="search-essay">
          <el-input v-model="essay" size="mini" placeholder="站内文章查找(模糊)"></el-input>
        </div>
        <div class="search" @click="search">搜索</div>
        <router-link class="login" to="/Login">
          <h2>登录</h2>
        </router-link>
      </div>
    </div>
    <div class="Title" v-show="$store.state.srcs.isShow">
      <h1>習慣の孤獨</h1>
      <p>记录所见所想</p>
    </div>
    <el-image style="width: 100%; height: 300px" :src="$store.state.srcs.src">
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
    </el-image>
  </div>
</template>

<script>
  import "animate.css";
  export default {
    name: "BlogTopNav",

    data() {
      return {
        essay: "",
        isShow: true,
      };
    },
    methods: {
      search() {
        // 搜索站内文章
        this.$axios.get(`/api/Mkdown/SearchMkdon?title=${this.essay}`)
          .then((res) => {
            if (res.data.length == 0) {
              this.$message({
                message: "抱歉没有找到相关的文章"
              })
            } else {
             
            this.$router.push({path:'/essay',query:{id:res.data[0]._id}})
            
            }
          })
      },
      Show() {
        // 选项卡
        this.isShow = !this.isShow;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .Nav {
    .iconfont {
      color: #ffffff;
    }

    position: relative;

    .Title {
      position: absolute;
      text-align: center;
      left: 45%;
      top: 40%;

      @media screen and (max-width: 375px) {
        position: absolute;
        text-align: center;
        left: 40%;
        top: 58%;
      }

      h1 {
        line-height: 78px;
        font-size: 40px;
        color: #15041D;

        @media screen and (max-width: 375px) {
          line-height: 188px;
          font-size: 120px;
          color: #15041D;
        }
      }

      p {
        font-size: 15px;
        color: #ffffff;

        @media screen and (max-width: 375px) {
          font-size: 70px;
          color: #ffffff;
        }
      }
    }

    .nav-right {
      width: 700px;
      display: inline-block;
      float: right;
      padding: 20px;

      @media screen and (min-width: 1000px) {
        display: none;
      }

      .iconfont {
        font-size: 200px;
        margin-left: 400px;
      }

      ul {
        width: 400px;
        border-radius: 30px;
        margin-left: 200px;
        background-color: white;

        li {
          line-height: 150px;
          padding: 40px;

          h2 {
            color: #000;
          }
        }
      }
    }

    .el-image {
      z-index: -1;
    }

    .nav-break {
      width: 100%;
      position: absolute;
      z-index: 1;

      .break {
        float: left;
        line-height: 38px;
        padding-left: 20px;
        font-size: 20px;
        color: #FFFFFF;

        @media screen and (max-width: 375px) {
          margin-top: 130px;
          float: left;
          line-height: 38px;
          padding-left: 50px;
          font-size: 200px;
          color: #FFFFFF;
        }
      }

      .nav-top {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        @media screen and (max-width: 1000px) {
          display: none;
        }

        a {
          margin-left: 25px;
          margin-right: 15px;
          line-height: 38px;
        }

        .search-essay {
          margin-left: 20px;
        }

        .search {
          margin-left: 5px;
          font-size: 15px;
          line-height: 38px;
          color: #ffffff;
        }


      }

      h2 {
        font-size: 16px;
        color: #ffffff;
      }
    }
  }

</style>
