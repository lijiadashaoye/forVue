<template>

  <el-card class="box-card">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" label-position="left" class="demo-ruleForm">

      <el-form-item label="选择App:" prop="appChannelVal">
        <el-radio-group v-model="ruleForm.appChannelVal" :disabled="upd">
          <el-radio v-for="(val,ind) in appChannel" :key="ind" :label="val.label">{{val.value}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="选择类型:" prop="configType">
        <el-select filterable v-model="ruleForm.configType" placeholder="请选择类型" :disabled="upd">
          <el-option
            v-for="(item,ind) in options"
            :key="ind"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入标题" :disabled="detailFlag"></el-input>
      </el-form-item>
      <el-form-item label="高亮字体说明:" prop="highlight">
        <el-input v-model="ruleForm.highlight" placeholder="请输入高亮字体说明" :disabled="detailFlag"></el-input>
      </el-form-item>
      <el-form-item label="高亮字体颜色:" prop="highlightColor">
        <el-color-picker v-model="ruleForm.highlightColor" :disabled="detailFlag"></el-color-picker>
      </el-form-item>
      <el-form-item label="提示语:" prop="markedWords">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 5}"
          placeholder="请输入提示内容"
          v-model="ruleForm.markedWords"
          :disabled="detailFlag"
          class='contentItem'
        ></el-input>
      </el-form-item>
      <el-form-item label="服务协议/隐私政策:" prop="configContent">
        <quill v-model="ruleForm.configContent" :url='"/admin/file/up/setting"' class='contentItem'></quill>
      </el-form-item>
      <el-form-item label="字体大小:" prop="fontSize">
        <el-input-number v-model="ruleForm.fontSize" controls-position="right" :min="14" :max="30"></el-input-number>
      </el-form-item>
      <el-form-item label="关联地址:" prop="linkUrl">
        <el-input v-model="ruleForm.linkUrl" placeholder="请输入关联地址" :disabled="detailFlag"></el-input>
      </el-form-item>

      <el-form-item v-if="!detailFlag">
        <el-button type="primary" @click="save('ruleForm')">保存</el-button>
        <el-button @click="cancel('ruleForm')">取消</el-button>
      </el-form-item>
      <el-form-item  v-else>
        <el-button @click="close">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { protocol_detail, getAppChannel } from "../../api/setting_use.js";
import quill from '../quill';
export default {
  name: "protocolAddUpt",
  props: ["appChannel", "upd", "opts", "detailFlag"],
  components: {
    // quillEditor
    quill
  },
  data() {
    return {
      flag: true,
      id: "",
      options: [],
      ruleForm: {
        appChannelVal: "", //app渠道
        configType: "", //类型  服务/隐私
        title: "", //标题
        highlight: "", //高亮字体说明
        highlightColor: "", //高亮字体颜色
        markedWords: "", //提示语
        configContent: "", //服务协议内容
        fontSize: 14,
        linkUrl: '',
      },
      rules: {
        appChannelVal: [{ required: true, message: '请选择渠道', trigger: 'blur' },],
        configType: [{ required: true, message: '请选择类型', trigger: 'blur' },],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        highlight: [{ required: true, message: '请输入高亮字体说明', trigger: 'blur' },],
        highlightColor: [{ required: true, message: '请选择高亮字体颜色', trigger: 'blur' },],
        markedWords: [{ required: true, message: '请输入提示语', trigger: 'blur' },],
        configContent: [{ required: true, message: '请输入服务协议内容', trigger: 'blur' },],
      },
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
      this.id = this.opts.id ? this.opts.id : null;
      this.ruleForm.highlight = this.opts.highlight;
      this.ruleForm.highlightColor = this.opts.highlightColor;
      this.ruleForm.appChannelVal = this.opts.appChannelCode;
      this.ruleForm.configType = this.opts.configType;
      this.ruleForm.title = this.opts.title;
      this.ruleForm.configContent = this.opts.configContent;
      this.ruleForm.fontSize = this.opts.fontSize;
      this.ruleForm.linkUrl = this.opts.linkUrl;
      if(this.opts.id) {
        protocol_detail(this.opts.id).then(res=> {
          if(res && res.success) {
            this.ruleForm.markedWords = res.data.markedWords
          }
        })
      }
    }
  },
  methods: {
    //点击保存
    save(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let appName;
            //取 appName
            this.appChannel && this.appChannel.forEach((v, i) => {
              if (v.label == this.ruleForm.appChannelVal) {
                appName = v.value;
              }
            });
            //整理params
            let obj = {
              id: this.id ? this.id : null,
              appChannelCode: this.ruleForm.appChannelVal,
              appChannelName: appName,
              configType: this.ruleForm.configType,
              title: this.ruleForm.title,
              highlight: this.ruleForm.highlight,
              highlightColor: this.ruleForm.highlightColor,
              markedWords: this.ruleForm.markedWords,
              configContent: this.ruleForm.configContent,
              fontSize: this.ruleForm.fontSize,
              linkUrl: this.ruleForm.linkUrl
            };
            this.$emit("req", obj);
          } else {
            return false;
          }
        });
    },

    //点击取消 数据回归初始化
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.$emit("cancle");
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
      this.ruleForm.configContent = this.opts.configContent;
      if(this.opts.id) {
        protocol_detail(this.opts.id).then(res=> {
          if(res && res.success) {
            this.ruleForm.markedWords = res.data.markedWords
          }
        })
      }
    },
    "opts.markedWords"() {
      this.ruleForm.markedWords = this.opts.markedWords;
    },
    "opts.configContent"() {
      this.ruleForm.configContent = this.opts.configContent;
    },
    "opts.highlight"() {
      this.ruleForm.highlight = this.opts.highlight;
    },
    "opts.highlightColor"() {
      this.ruleForm.highlightColor = this.opts.highlightColor;
    },
    "opts.appChannelCode"() {
      this.ruleForm.appChannelVal = this.opts.appChannelCode;
    },
    "opts.configType"() {
      this.ruleForm.configType = this.opts.configType;
    },
    "opts.title"() {
      this.ruleForm.title = this.opts.title;
    },
    "opts.fontSize"() {
      this.ruleForm.fontSize = this.opts.fontSize;
    },
    "opts.linkUrl"() {
      this.ruleForm.linkUrl = this.opts.linkUrl;
    },

  }
};
</script>

<style scoped="true" lang="scss">
.box-card{
  .contentItem{
    width:70%!important;
  }
  .el-input{
    width:220px!important;
  }
}
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
