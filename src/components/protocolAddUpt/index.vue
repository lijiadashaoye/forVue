<template>
  <el-card class="box-card">
    <div class="card-item" v-if="flag">
      <span class="item-text">*选择App：</span>
      <div class="item-input">
        <el-radio-group v-model="appChannelVal">
          <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label">{{val.value}}</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="card-item" v-if="flag">
      <span class="item-text">*选择类型：</span>
      <div class="item-input">
        <el-select v-model="config_type" placeholder="请选择类型">
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
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 6}"
          placeholder="请输入内容"
          :disabled="detailFlag"
          v-model="config_content"
        ></el-input>
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
      config_content: "", //服务协议内容
      appChannelVal: "", //app渠道
      config_type: "", //类型  服务/隐私
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
        }
      ]
    };
  },
  mounted() {
    //判断是修改或是添加 upd为true时是修改  detailFlag为true时是详情
    if (this.upd) {
      this.flag = false; //是修改时 不显示config_type appChannelVal
    } else {
      this.flag = true;
    }
    //修改传入参数
    if (this.opts) {
      this.id = this.opts.id;
      this.highlight = this.opts.highlight;
      this.highlightColor = this.opts.highlightColor;
      this.appChannelVal = this.opts.appChannelCode;
      this.config_type = this.opts.config_type;
      this.title = this.opts.title;
    }
    //取markedWords config_content
    if (this.id) {
      protocol_detail(this.id).then(res => {
        this.markedWords = res.data.markedWords;
        this.config_content = res.data.config_content;
      });
    }
  },
  methods: {
    //点击保存
    save() {
      if (
        this.appChannelVal &&
        this.title &&
        this.config_type &&
        this.highlight &&
        this.highlightColor &&
        this.markedWords
      ) {
        let appName;
        //取 appName
        this.appChannel.forEach((v, i) => {
          if (v.label == this.appChannelVal) {
            appName = v.value;
          }
        });
        //整理params
        let obj = {
          id: this.id,
          appChannelCode: this.appChannelVal,
          appChannelName: appName,
          config_type: this.config_type,
          title: this.title,
          highlight: this.highlight,
          highlightColor: this.highlightColor,
          markedWords: this.markedWords,
          config_content: this.config_content
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
      if (this.upd) {
        this.$emit("cancle", false);
      } else {
        this.title = "";
        this.highlight = "";
        this.highlightColor = "";
        this.markedWords = "";
        this.config_content = "";
        this.appChannelVal = "";
        this.config_type = "";
      }
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
      protocol_detail(this.id).then(res => {
        this.markedWords = res.data.markedWords;
        this.config_content = res.data.config_content;
      });
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
    "opts.config_type"() {
      this.config_type = this.opts.config_type;
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
