<template>
  <div class="loginPage" :class="toaddClass?setBk:''">
    <div class="setLoadingIn" ref="succLogin" style="z-index:-50;">
      <p>比财数据科技</p>
    </div>
    <img :src="imgSrc" class="isImg" />
    <div class="layer" id="login">
      <div class="login_isLogo">
        <span>比财数据科技</span>
      </div>
      <div class="login_isFooter">
        <p>CHANNEL MANAGEMENT SYSTEM</p>
        <p>比财渠道管理系统</p>
      </div>

      <div class="isCard" ref="isCard">
        <p class="for_img">
          <span ref="isS" class="isS"></span>
        </p>
        <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin">
          <el-form-item prop="username">
            <el-input
              @focus="changeBK(1)"
              @blur="changeBK('')"
              type="text"
              v-model="formLogin.username"
              placeholder="用户名"
              @keyup.enter.native="submit"
            >
              <i slot="prepend" class="myIcon12px icon-yonghu"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              @focus="changeBK(2)"
              @blur="changeBK('')"
              type="password"
              v-model="formLogin.password"
              placeholder="密码"
              @keyup.enter.native="submit"
            >
              <i slot="prepend" class="myIcon12px icon-jianpan"></i>
            </el-input>
          </el-form-item>
          <el-button @click="submit" type="primary" class="button-login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// aes 加密
// import secret from "../../secret";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      imgSrc: "",
      setBk: "",
      toaddClass: false,
      // 表单
      formLogin: {
        username: "",
        password: ""
      },
      // 校验
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$store.dispatch("clearToken");
    // 动态设置登录背景
    this.$nextTick(() => {
      let num = Math.ceil(Math.random() * 27);
      this.setBk = `setBk${num}`;
      this.imgSrc = require(`../../assets/${num}.png`);
      this.toaddClass = true;
    });
  },
  methods: {
    changeBK(num) {
      let isS = this.$refs.isS;
      isS.className = `isS${num}`;
    },
    ...mapActions(["login"]),
    // 执行登录
    toLogin() {
      this.$loading({
        lock: true,
        text: "比财数据科技",
        customClass: "setLoading",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.6)"
      });
      let loginData = {
        username: this.formLogin.username,
        password: this.formLogin.password,
        grant_type: "password",
        scope: "server"
      };

      this.login({
        vm: this,
        data: loginData
      }).then(isOk => {
        if (isOk) {
          let styleId = document.querySelector("#ll");
          if (!styleId) {
            let env = sessionStorage.getItem("env") === "development",
              head = document.querySelector("head"),
              style = document.createElement("style");
            style.id = "ll";
            if (env) {
              // 修改滚动条颜色
              style.innerHTML = `.is-opened i {color: rgb(151, 24, 255); !important}
            #app ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: rgb(151, 24, 255);
            }.el-table ::-webkit-scrollbar-thumb {
            border-radius: 5px !important;
            background: rgb(151, 24, 255) !important;}`;
            } else {
              style.innerHTML = `.is-opened i {color:  #188FFF !important;}
             #app ::-webkit-scrollbar-thumb {
             border-radius: 4px;background: rgb(112, 179, 243)}
             .el-table ::-webkit-scrollbar-thumb {
             border-radius: 5px !important;
             background: rgb(112, 179, 243) !important;}`;
            }
            head.appendChild(style);
          }

          this.$loading().close();
          this.$refs.isCard.style = "display:none;";

          let succLogin = this.$refs.succLogin,
            num = 50;
          succLogin.style.zIndex = 654;
          setTimeout(() => {
            succLogin.children[0].style.paddingTop = 0;
            succLogin.children[0].style.transform = "scale(30)";

            let digui = () => {
              if (num > 10) {
                num--;
                succLogin.children[0].style.opacity = 0.02 * num;
                setTimeout(digui, 30);
              } else {
                this.$router.push({
                  name: "home"
                });
              }
            };
            setTimeout(digui, 30);
          }, 1000);
        } else {
          this.$loading().close();
        }
      });
    },
    // 提交登陆信息
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.toLogin();
        } else {
          // 登陆表单校验失败
          this.$message.error("请输入用户名和密码！");
        }
      });
    }
  }
};
</script>
<style lang='scss'>
@import url("../../components/allCss.scss");
@import "./layout.scss";
@import "./them.scss";
</style>
