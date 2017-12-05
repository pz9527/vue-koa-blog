<template>
  <div class="v1">
    <el-row >
      <el-col :xs="{offset:2,span:20}" :sm="{offset:1,span:22}">
        <el-card :body-style="{ padding: '0px'}" style="position: relative">
          <el-container style="height: 560px; border: 0px solid #eee">
            <el-aside width="100px">
              <el-menu
                active-text-color="#000000"
                @select="handleSelect">
                <el-menu-item index="">
                  <i class="el-icon-menu"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/home/echart">
                  <i class="el-icon-view"></i>
                  <span slot="title">流量</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">关于</span>
                </el-menu-item>
                <el-menu-item index="1">
                  <i class="el-icon-edit"></i>
                  <span slot="title">代码</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-location-outline"></i>
                  <span slot="title">旅行</span>
                </el-menu-item>
                <el-menu-item index="6">
                  <i class="el-icon-picture"></i>
                  <span slot="title">相册</span>
                </el-menu-item>
                <el-menu-item index="7">
                  <i class="el-icon-setting"></i>
                  <span slot="title">标签</span>
                </el-menu-item>
                <el-menu-item index="/home/publish">
                  <i class="el-icon-sold-out"></i>
                  <span slot="title">发文</span>
                </el-menu-item>
                <el-menu-item index="9">
                  <i class="el-icon-share"></i>
                  <span slot="title">分享</span>
                </el-menu-item>
                <el-menu-item index="10">
                  <i class="el-icon-edit-outline"></i>
                  <span slot="title">留言</span>
                </el-menu-item>
              </el-menu>
            </el-aside>
            <el-aside width="300px" v-if="see">

              <div class="v1_artivle" v-for="item in articleList">
                <router-link :to="{ path:'/home/article',query:{id:item.id}}">
                  <p class="title"> {{item.title}}</p>
                </router-link>
                <!--<span style="font-size: smaller">{{item.author}} 发布于 {{item.createAt}}</span>-->
                <!--<el-tag size="small">{{item.cate}}</el-tag>-->
                <!-- <p class="home_content">{{item.content}}</p> -->
                <!--<div style="display: flex;align-content: center;font-size: smaller;color: #8d8d8d">-->
                <!--<span><i class="el-icon-edit"></i>{{item.replys}}</span>&nbsp;&nbsp;-->
                <!--<span><i class="el-icon-view"></i>&nbsp;200</span>&nbsp;&nbsp;-->
                <!--<span><i class="el-icon-star-on"></i>&nbsp;22</span>&nbsp;&nbsp;<span>查看...</span>-->
                <!--</div>-->


              </div>
            </el-aside>
            <el-container>


              <el-main>
                <router-view></router-view>

              </el-main>


            </el-container>
          </el-container>
        </el-card>
      </el-col>
    </el-row>
    <span
      style="font-size: small;text-align: center;color: #7a7f8a;margin-left: 500px">support by XXX 存储赞助商为:七牛云存储</span>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import moment from "moment";

  export default {
    data() {
      return {
        page: 1,
        cate: "",
        see: true,
        article: "<h1 style=\"text-align:center;\">你好</h1><span>测试测试测试测试</span><h1 style=\"text-align:center;\">你好</h1><h1 style=\"text-align:center;\">你好</h1><h1 style=\"text-align:center;\">你好</h1><h1 style=\"text-align:center;\">你好</h1><h1 style=\"text-align:center;\">你好</h1><h1 style=\"text-align:center;\">你好</h1><h1 style=\"text-align:center;\">你好</h1><h1 style=\"text-align:center;\">你好</h1><h1 style=\"text-align:center;\">你好</h1><h1 style=\"text-align:center;\">你好</h1><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"
      };
    },
    methods: {
      handleChange() {
        this.$message.info("ceshi");
      },
      test() {
        console.log(this.$route.query.id)
      },
      handleSelect(key, keyPath) {
        if (key.length < 3) {
          this.see = true
          this.$router.push('/home')
          this.$store.commit('PAGE_CATE_SET', key)
          this.$store.dispatch("getArticleByPage");
        } else {
          this.see = false
          this.$router.push(key)
        }
        console.log(key.length);
      }
    },

    created() {
      this.$store.dispatch("getArticleByPage");
      this.$store.dispatch("init");
    },
    computed: {
      ...mapState({
        allArticles: state => state.article.articleList,
        initData: state => state.article.initData,
        limit: state => state.article.limit,
        currentPage: state => state.article.currentPage
      }),
      articleList() {
        return this.allArticles.map(val => {
          let obj = {};
          obj.id = val.id
          obj.title = val.title;
//          obj.author = val.user.name;
          obj.createAt = moment(val.createdAt)
            .startOf("day")
            .fromNow();
          return obj;
          console.log(obj)
        });
      }
    }
  };
</script>
<style type="text/stylus" lang="stylus">
  .line {
    position: relative;
    border-height: 1px;
    background-color #E6EBF5;
    margin-top: 10px;
    margin-bottom: 5px;

  }

  .home_content {
    font-size: small;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  * {
    padding: 0;
    margin: 0;
  }

  .root {
    position: relative;
    width: 100%;
  }


  .title {
    font-size 15px
    margin 10px
    color #000
  }

  .line {
    position: absolute;
    border-height: 1px;
    background-color: #E6EBF5;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  v1_artivle
    position fixed

  .v1-tag {
    display: inline-flex;
  }

  .v1-reply {
    font-size: smaller;
  }

  .card_title {
    margin-top: -9px;
  }

  .v1_artivle
    margin-left 20px

  .v1_artivle a
    text-decoration none
</style>
