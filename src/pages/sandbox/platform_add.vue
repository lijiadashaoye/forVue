<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div id="forTable">
      <div class="sandow1">
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="ruleForm"
          label-width="90px"
          label-suffix=" :"
        >
          <el-form-item label="银行" size="mini" prop="bank">
            <el-select
              :disabled="this.pageType==='edit'"
              filterable
              v-model="ruleForm.bank"
              clearable
              placeholder="请选择"
              style="width:508px;"
            >
              <el-option-group v-for="group in bankList" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="!item.use"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>

          <el-form-item label="渠道" size="mini" prop="qudao">
            <div class="sandow_radioGrop">
              <el-form-item label="内部渠道">
                <el-checkbox
                  style="display:inline-block;margin:0 20px 0 13px;"
                  :indeterminate="isIndeterminate1"
                  v-model="checkAll1"
                  @change="handleCheckAllChange1"
                >全部</el-checkbox>
                <el-checkbox-group
                  style="display:inline-block;"
                  v-model="ruleForm.qudao.inset"
                  @change="handleCheckedCitiesChange1"
                >
                  <el-checkbox
                    v-for="t in dictData.inner_channel"
                    :label="t.label"
                    :key="t.label"
                  >{{t.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="外部渠道">
                <el-checkbox
                  style="display:inline-block;margin:0 20px 0 13px;"
                  :indeterminate="isIndeterminate2"
                  v-model="checkAll2"
                  @change="handleCheckAllChange2"
                >全部</el-checkbox>
                <el-checkbox-group
                  style="display:inline-block;"
                  v-model="ruleForm.qudao.outset"
                  @change="handleCheckedCitiesChange2"
                >
                  <el-checkbox
                    v-for="t in dictData.out_channel"
                    :label="t.label"
                    :key="t.label"
                  >{{t.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
        <div class="addPlatformButton">
          <el-button size="mini" type="primary" @click="next">提交</el-button>
          <el-button size="mini" type="info" @click="back">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var check_qudao = (rule, value, callback) => {
      if (value.inset.length || value.outset.length) {
        callback();
      } else {
        callback(new Error("请选择渠道！"));
      }
    };
    return {
      bankList: [],
      env: "",
      pageName: "",
      dictData: "",
      pageType: "",
      isIndeterminate1: false,
      checkAll1: false,
      isIndeterminate2: false,
      checkAll2: false,
      ruleForm: {
        bank: "",
        qudao: {
          inset: [],
          outset: []
        }
      },

      rules: {
        bank: [{ required: true, message: "请选择银行", trigger: "change" }],
        qudao: [{ required: true, validator: check_qudao, trigger: "blur" }]
      }
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageType = this.$route.query.type;

    switch (this.pageType) {
      case undefined:
        this.pageName = sessionStorage.getItem("page") + " > 新增银行配置"; // 获取页面名称
        break;
      case "copy":
        this.pageName = sessionStorage.getItem("page") + " > 新增银行配置"; // 获取页面名称
        this.getItemData(this.$route.query.id, "copy");
        break;
      case "edit":
        this.pageName = sessionStorage.getItem("page") + " > 编辑银行配置"; // 获取页面名称
        this.getItemData(this.$route.query.id, "edit");
        break;
    }
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.getBankList();
  },
  methods: {
    // 获取银行列表
    getBankList() {
      this.$api
        .getBankList({
          vm: this
        })
        .then(res => {
          if (res) {
            this.bankList = [
              {
                label: "未配置银行",
                options: res.data.notConfigured.map(tar => ({
                  id: tar.id,
                  name: tar.name,
                  use: true
                }))
              },
              {
                label: "已配置银行",
                options: res.data.configured.map(tar => ({
                  id: tar.id,
                  name: tar.name,
                  use: false
                }))
              }
            ];
          }
        });
    },
    // 内部渠道checkbox
    handleCheckAllChange1(val) {
      this.ruleForm.qudao.inset = val
        ? this.dictData.inner_channel.map(tar => tar.label)
        : [];
      this.isIndeterminate1 = false;
    },
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.dictData.inner_channel.length;
      this.isIndeterminate1 =
        checkedCount > 0 && checkedCount < this.dictData.inner_channel.length;
    },
    // 内部渠道checkbox
    handleCheckAllChange2(val) {
      this.ruleForm.qudao.outset = val
        ? this.dictData.out_channel.map(tar => tar.label)
        : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.dictData.out_channel.length;
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.dictData.out_channel.length;
    },
    // 保存
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let notConfigured,
            httpType = "",
            url = "";
          if (this.pageType === "edit") {
            notConfigured = this.bankList[1].options;
            httpType = "put";
            url = "/product/sandBox/platform/update";
          } else {
            notConfigured = this.bankList[0].options;
            httpType = "post";
            url = `/product/sandBox/platform/add`;
          }

          let obj = {
            bankId: this.ruleForm.bank,
            bankName: notConfigured.filter(
              tar => tar.id == this.ruleForm.bank
            )[0].name,
            innerChannel: [],
            outChannel: []
          };

          if (this.ruleForm.qudao.inset.length) {
            let kk = this.dictData.inner_channel;
            this.ruleForm.qudao.inset.forEach(str => {
              for (let i = kk.length; i--; ) {
                if (kk[i].label === str) {
                  obj.innerChannel.push({
                    channelLabel: kk[i].label,
                    channelCode: kk[i].value,
                    channelType: "inner",
                    bankId: this.ruleForm.bank
                  });
                } else {
                  continue;
                }
              }
            });
          }
          if (this.ruleForm.qudao.outset.length) {
            let kk = this.dictData.out_channel;
            this.ruleForm.qudao.outset.forEach(str => {
              for (let i = kk.length; i--; ) {
                if (kk[i].label === str) {
                  obj.outChannel.push({
                    channelLabel: kk[i].label,
                    channelCode: kk[i].value,
                    channelType: "out",
                    bankId: this.ruleForm.bank
                  });
                } else {
                  continue;
                }
              }
            });
          }

          if (this.pageType === "edit") {
            obj.id = this.ruleForm.id;
          }
          this.$api
            .addPlatform({
              vm: this,
              data: obj,
              httpType: httpType,
              url: url
            })
            .then(res => {
              if (res) {
                this.reset();
                this.$message.success("新增成功！");
                this.getBankList();
              }
            });
        }
      });
    },
    back() {
      this.$router.push({
        name: "platform"
      });
    },
    reset() {
      this.$refs.ruleForm.resetFields();
      this.isIndeterminate1 = false;
      this.checkAll1 = false;
      this.isIndeterminate2 = false;
      this.checkAll2 = false;
      this.ruleForm.bank = "";
      this.ruleForm.qudao.inset = [];
      this.ruleForm.qudao.outset = [];
    },
    // 获取详情
    getItemData(id, type) {
      this.$api
        .getItemData({
          vm: this,
          id: id
        })
        .then(res => {
          if (res) {
            if (type === "edit") {
              this.ruleForm = {
                id: res.data.id,
                bank: res.data.bankId,
                qudao: {
                  inset: res.data.innerChannel.map(tar => tar.channelLabel),
                  outset: res.data.outChannel.map(tar => tar.channelLabel)
                }
              };
            } else {
              this.ruleForm = {
                bank: "",
                qudao: {
                  inset: res.data.innerChannel.map(tar => tar.channelLabel),
                  outset: res.data.outChannel.map(tar => tar.channelLabel)
                }
              };
            }
          }
        });
    }
  }
};
</script>
