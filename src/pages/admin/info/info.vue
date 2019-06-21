<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div id='forTable'>
      <div class="content">
        <el-form
          :model="menuData"
          status-icon
          :rules="rules2"
          ref="menuData"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              readonly
              v-model="menuData.username"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="原密码"
            prop="oldPass"
          >
            <el-input
              type='password'
              v-model="menuData.oldPass"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="新密码"
            prop="pass"
          >
            <el-input
              type='password'
              placeholder="请输入新密码，最多32字符"
              v-model="menuData.pass"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="确认新密码"
            prop="checkPass"
          >
            <el-input
              type='password'
              placeholder="请再次输入新密码"
              v-model="menuData.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="手机"
            prop="phone"
          >
            <el-input v-model="menuData.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm()"
            >提交</el-button>
            <el-button @click="resetForm('menuData')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.menuData.checkPass !== "") {
        this.$refs.menuData.validateField("checkPass");
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.menuData.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 验证手机号
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
      }
    };
    return {
      pageName: "", // 当前页面名字
      menuData: {
        oldPass: "",
        pass: "",
        checkPass: "",
        phone: "",
        userId: "",
        username: ""
      },
      rules2: {
        oldPass: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 19, message: "请输入6-19个字符", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { min: 6, max: 19, message: "请输入6-19个字符", trigger: "blur" },
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page");
    let kk = JSON.parse(localStorage.getItem("userData"));
    this.menuData.username = kk.username;
    this.menuData.userId = kk.userId;
    this.menuData.phone = kk.phone;
  },
  methods: {
    submitForm() {
      this.$refs.menuData.validate(valid => {
        if (valid) {
          this.$confirm("修改了用信息需要重新登录，确认修改吗？")
            .then(() => {
              let kk = {
                password: this.menuData.oldPass,
                newPassword: this.menuData.pass,
                phone: this.menuData.phone,
                userId: this.menuData.userId,
                username: this.menuData.username
              };

              let pass = ("" + kk.newPassword)
                .split("")
                .some(tar => tar.charCodeAt() > 122);
              if (pass) {
                this.$message.error("请勿使用中文作为密码");
              } else {
                this.$api
                  .admin_info_submit({
                    vm: this,
                    data: kk
                  })
                  .then(res => {
                    if (res) {
                      this.$store.dispatch("logout", this);
                    }
                  });
              }
            })
            .catch(() => {});
        } else {
          this.$message.error("请输入正确数据！");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      let kk = JSON.parse(localStorage.getItem("userData"));
      this.menuData.username = kk.username;
      this.menuData.phone = kk.phone;
    }
  }
};
</script>


<style scoped='true' lang="scss">
.content {
  width: 400px;
  margin: 20px auto 0;
}
</style>
