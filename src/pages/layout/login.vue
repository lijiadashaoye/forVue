<template>
  <div class="loginPage" :class="toaddClass?setBk:''">
    <img :src="imgSrc" class="isImg" />
    <div class="layer" id="login">
      <div class="login_isLogo">
        <span>比财数据科技</span>
      </div>
      <div class="login_isFooter">
        <p>CHANNEL MANAGEMENT SYSTEM</p>
        <p>比财渠道管理系统</p>
      </div>

      <div class="isCard">
        <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin">
          <el-form-item prop="username">
            <el-input
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
import secret from "../../secret";
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
  beforeDestroy() {
    this.$loading().close();
  },
  methods: {
    ...mapActions(["login"]),
    // 执行登录
    toLogin() {
      this.$loading({
        lock: true,
        text: "Loading",
        customClass: "setLoading",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)"
      });
      let loginData = {
        username: this.formLogin.username,
        password: this.formLogin.password,
        grant_type: "password",
        scope: "server"
      };
      setTimeout(() => {
        this.$loading().close();
      }, 5000);
      this.login({
        vm: this,
        data: loginData
      }).then(isOk => {
        if (isOk) {
          this.$loading().close();
          this.$router.push({
            name: "home"
          });
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

<style scoped lang='scss'>
@import "./them.scss";
</style>
