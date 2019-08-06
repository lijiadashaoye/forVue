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

    <div class="card-item">
      <span class="item-text">字体大小:</span>
      <div class="item-input">
        <!-- <el-input v-model="fontSize" placeholder="请选择字体大小" :disabled="detailFlag"></el-input> -->
        <el-input-number v-model="fontSize" controls-position="right" :min="14" :max="30"></el-input-number>
      </div>
    </div>

    <div class="card-item">
      <span class="item-text">关联地址:</span>
      <div class="item-input">
        <el-input v-model="linkUrl" placeholder="请输入关联地址" :disabled="detailFlag"></el-input>
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
import { protocol_detail, getAppChannel } from "../../api/setting_use.js";
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
      options: [],
      fontSize: 14,
      linkUrl: '',
    };
  },
  mounted() {
    getAppChannel('configuration').then(res=> {
      if(res && res.success) {
        this.options = res.data
      }
    })

    //判断是修改或是添加 upd为true时是修改  detailFlag为true时是详情

    //修改传入参数
    if (this.opts) {
      this.id = this.opts.id;
      this.highlight = this.opts.highlight;
      this.highlightColor = this.opts.highlightColor;
      this.appChannelVal = this.opts.appChannelCode;
      this.configType = this.opts.configType;
      this.title = this.opts.title;
      this.configContent = this.opts.configContent;
      this.fontSize = this.opts.fontSize;
      this.linkUrl = this.opts.linkUrl;
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
          configContent: this.configContent,
          fontSize: this.fontSize,
          linkUrl: this.linkUrl
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
      this.fontSize = 14;
      this.linkUrl = '';
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
    },
    "opts.fontSize"() {
      this.fontSize = this.opts.fontSize;
    },
    "opts.linkUrl"() {
      this.linkUrl = this.opts.linkUrl;
    },

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
