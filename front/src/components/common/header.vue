<template>
  <div id="header">

    <el-row type="flex" align="middle">
      <el-col :span="1"></el-col>
      <el-col :xs="10" :sm="8">
        <span style="font-family: 'Comic Sans MS';color: darkgray;font-size: large;padding:5px;">LearnNode</span>
        <el-select
          v-model="value9"
          value-key="id"
          size="small"
          filterable
          remote
          @change="test"
          prefix-icon="el-icon-search"
          reserve-keyword
          placeholder="请输入关键词"
          style="width: 200px;padding: 4px;margin-left: 25px"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options4"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="0" :sm="13">
      </el-col>
      <el-col :xs="16" :sm="12" :md="5" :lg="2" :xl="2">
        <div class="nav">
          <el-button @click='showLogin' type="text" style="color:#5A5E66" v-if="seen">登录</el-button>
          <el-dialog title="登录信息" :visible.sync="this.$store.state.token.loginForm" width="350px" :center="true">
            <el-input v-model="form.name" auto-complete="off" placeholder="请输入账号"></el-input>
            <br/>
            <br/>
            <el-input v-model="form.password" placeholder="请输入密码" type="password" @enter='login'></el-input>
            <div class="login-line">微信登录</div>
            <img src="../../assets/qr.png" style="width: 200px;margin-top: -12px;margin-left: 45px">
            <div slot="footer" class="login-foot">
              <el-button @click='notShowLogin'>取 消</el-button>
              <el-button type="primary" @click="login">确 定</el-button>
            </div>
          </el-dialog>
          <el-button @click="dialogSignup = true" type="text" style="color:#5A5E66" v-if="seen" disabled>注册</el-button>
          <el-dialog title="注册信息" :visible.sync="dialogSignup" width="350px" :center="true">
            <el-input v-model="form.name" auto-complete="off" placeholder="请输入账号"></el-input>
            <br/><br/>
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            <br/><br/>
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            <div slot="footer">
              <el-button @click="dialogSignup = false">取 消</el-button>
              <el-button type="primary" @click="signup">确 定</el-button>
            </div>
          </el-dialog>
          <el-dropdown type="primary" @command="handleCommand" v-if="seen1">
            <span class="el-dropdown-link">我的设置</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='/home/person'>我的首页</el-dropdown-item>
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>修改信息</el-dropdown-item>
              <el-dropdown-item divided>
                <el-button type=text @click="signOut">退出登录</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="1">
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import jwt from "jsonwebtoken";
  import axios from "axios";

  export default {
    data() {
      return {
        options4: [],
        value9: [],
        loading: false,
        input: "",
        dialogSignup: false,
        seen: true,
        seen1: false,
        form: {
          name: "",
          password: "",
          email: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        }
      };
    },
    mounted() {

    },
    computed: {
      list() {
        return this.$store.state.article.articleList.map(item => {
          return {value: item.title, label: item.title, id: item.id.toString()}
        })
      }
    },
    created: function () {
      const token = localStorage.getItem("pagetoken");
      if (token == null || token == "null") {
        this.seen = true;
        this.seen1 = false;
        return null;
      } else {
        let decode = jwt.verify(token, "myjwtsecret");
        console.log(decode);
        this.seen = false;
        this.seen1 = true;
        this.$store.commit("NAME_SET", decode);
      }
    },
    methods: {
      test() {
        console.log('home/article?id=' + this.options4[0].id)
        if (this.options4[0].id) {
          this.$router.push({path: '/home/article', query: {id: this.options4[0].id}})
        }
      },
      homepage() {
        this.$router.push("/home/");
      },
      handleClick() {
        alert("button click");
      },
      showLogin() {
        this.$store.commit("LOGIN_SET_TRUE");
      },
      notShowLogin() {
        this.$store.commit("LOGIN_SET_FALSE");
      },
      handleCommand(command) {
        this.$router.push({path: command});
      },
      login() {
        let name = this.form.name;
        let password = this.form.password;

        this.$store
          .dispatch("createToken", {name, password})
          .then(res => {
            if (res === true) {
              this.$message.success(this.$store.state.token.notice);
              this.$store.commit("NAME_SET", name);
              this.$router.go(0);
            } else {
              this.$message.error(this.$store.state.token.notice);
            }
          })
          .catch(err => {
            this.$message.error("登录错误");
          });
      },
      signup() {
        let name = this.form.name;
        let password = this.form.password;
        let email = this.form.email;
        axios
          .post("/user/signup", {name, password, email})
          .then(res => {
            if ((res.data.code = 200)) {
              this.$message.success("注册成功");
              this.dialogSignup = false;
            } else {
              this.$message.error("用户名重复");
            }
          })
          .catch(err => {
            this.$message.error("用户名重复");
          });
      },
      signOut() {
        localStorage.setItem("pagetoken", null);
        this.$router.go(0);
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      }
    }
  };
</script>
<style lang="stylus" type="text/stylus">
  .nav {
    display: flex;
    justify-content: space-between;
    margin-right: 11px;
    align-items: center;
  }

  .line {
    width: 100%;
    left: 50%;
    margin-left: -50%;
    position: fixed;
    border: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.23);
    top: 10%;
  }

  .login-line {
    padding: 0 20px 0;
    margin: 20px 0;
    line-height: 1px;
    border-left: 80px solid #ddd;
    border-right: 80px solid #ddd;
    text-align: center;
  }

  .el-dropdown-link {
    cursor: pointer;
    margin-left 40px

  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  #header a {
    color: rgba(0, 0, 0, 0.3);
    font-family: '微软雅黑';
  }

  .login-foot {
    margin-top: -50px;
  }
</style>
