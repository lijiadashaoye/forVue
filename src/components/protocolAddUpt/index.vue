<template>
  <el-card class="box-card">
    <div class="card-item">
      <span class="item-text">*选择App：</span>
      <div class="item-input">
        <el-radio-group v-model="appChannelVal" :disabled="upd">
          <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label">{{val.value}}</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="card-item">
      <span class="item-text">*选择类型：</span>
      <div class="item-input">
        <el-select v-model="configType" placeholder="请选择类型" :disabled="upd">
          <el-option
            v-for="(item,ind) in options"
            :key="ind"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>

    <div class="card-item">
      <span class="item-text">*标题:</span>
      <div class="item-input">
        <el-input v-model="title" placeholder="请输入标题" :disabled="detailFlag"></el-input>
      </div>
    </div>

    <div class="card-item">
      <span class="item-text">*高亮字体说明:</span>
      <div class="item-input">
        <el-input v-model="highlight" placeholder="请输入标题" :disabled="detailFlag"></el-input>
      </div>
    </div>

    <div class="card-item">
      <span class="item-text">*高亮字体颜色:</span>
      <div class="item-input">
        <el-color-picker v-model="highlightColor" :disabled="detailFlag"></el-color-picker>
      </div>
    </div>

    <div class="card-item card-textarea">
      <span class="item-text">*提示语:</span>
      <div class="item-input">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 5}"
          placeholder="请输入内容"
          v-model="markedWords"
          :disabled="detailFlag"
        ></el-input>
      </div>
    </div>

    <div class="card-item">
      <span class="item-text">*服务协议/隐私政策:</span>
      <div class="item-input input-quill">
        <quill-editor v-model="configContent"></quill-editor>
        <!-- <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 6}"
          placeholder="请输入内容"
          :disabled="detailFlag"
          v-model="configContent"
        ></el-input> -->
      </div>
    </div>

    <div class="card-footer" v-if="!detailFlag">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>

    <div class="card-footer" v-else>
      <el-button @click="close">关闭</el-button>
    </div>
  </el-card>
</template>

<script>
import { protocol_detail } from "../../api/setting_use.js";
export default {
  name: "protocolAddUpt",
  props: ["appChannel", "upd", "opts", "detailFlag"],
  components: {
    // quillEditor
  },
  data() {
    return {
      flag: true,
      id: "",
      title: "", //标题
      highlight: "", //高亮字体说明
      highlightColor: "", //高亮字体颜色
      markedWords: "", //提示语
      configContent: "", //服务协议内容
      appChannelVal: "", //app渠道
      configType: "", //类型  服务/隐私
      options: [
        {
          value: "SERVER",
          label: "服务协议"
        },
        {
          value: "PRIVATE",
          label: "隐私政策"
        },
        {
          value: "WALLET_QUESTION",
          label: "钱包问题"
        },
        {
          value: "ASSETS_QUESTION",
          label: "资产问题"
        },
        {
          value: "CONTACT_OUR",
          label: "联系我们"
        },
        {
          value: "AUTHENTICATION_PAGE",
          label: "实名认证"
        },
        {
          value: "INDEX_PRIVATE_SHOW",
          label: "首页协议"
        },
      ]
    };
  },
  mounted() {
    //判断是修改或是添加 upd为true时是修改  detailFlag为true时是详情

    //修改传入参数
    if (this.opts) {
      this.id = this.opts.id;
      this.highlight = this.opts.highlight;
      this.highlightColor = this.opts.highlightColor;
      this.appChannelVal = this.opts.appChannelCode;
      this.configType = this.opts.configType;
      this.title = this.opts.title;
      this.configContent = this.opts.configContent
    }
    //取markedWords configContent
    if (this.id) {
      protocol_detail(this.id).then(res => {
        this.markedWords = res.data.markedWords;
        this.configContent = res.data.configContent;
      });
    }
  },
  methods: {
    //点击保存
    save() {
      if (
        this.appChannelVal &&
        this.title &&
        this.configType &&
        this.highlight &&
        this.highlightColor &&
        this.markedWords &&
        this.configContent
      ) {
        let appName;
        //取 appName
        this.appChannel && this.appChannel.forEach((v, i) => {
          if (v.label == this.appChannelVal) {
            appName = v.value;
          }
        });
        //整理params
        let obj = {
          id: this.id,
          appChannelCode: this.appChannelVal,
          appChannelName: appName,
          configType: this.configType,
          title: this.title,
          highlight: this.highlight,
          highlightColor: this.highlightColor,
          markedWords: this.markedWords,
          configContent: this.configContent
        };
        this.$emit("req", obj);
      } else {
        this.$alert("*号是必填项", "提交失败", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
      }
    },

    //点击取消 数据回归初始化
    cancel() {
      this.$emit("cancle");
      this.title = "";
      this.highlight = "";
      this.highlightColor = "";
      this.markedWords = "";
      this.configContent = "";
      this.appChannelVal = "";
      this.configType = "";
    },

    //点击关闭
    close() {
      this.$emit("close", false);
    }
  },
  watch: {
    //监听传入的参数变化   data变化
    "opts.id"() {
      this.id = this.opts.id;
      if(this.id != '' && this.id != null) {
        protocol_detail(this.id).then(res => {
          this.markedWords = res.data.markedWords;
          this.configContent = res.data.configContent;
        });
      }
    },
    "opts.highlight"() {
      this.highlight = this.opts.highlight;
    },
    "opts.highlightColor"() {
      this.highlightColor = this.opts.highlightColor;
    },
    "opts.appChannelCode"() {
      this.appChannelVal = this.opts.appChannelCode;
    },
    "opts.configType"() {
      this.configType = this.opts.configType;
    },
    "opts.title"() {
      this.title = this.opts.title;
    }
  }
};
</script>

<style scoped="true" lang="scss">
.card-item {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  .item-text {
    width: 200px;
  }
  .item-input {
    width: 400px;
  }
  .input-quill {
    width: 600px;
  }
}
.card-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100px;
  align-items: center;
}
</style>
