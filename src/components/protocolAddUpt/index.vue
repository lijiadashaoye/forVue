<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" label-position="left" >

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

      <el-form-item label="内容类型" prop="contentType">
        <el-select filterable v-model="ruleForm.contentType" placeholder="请选择类型" :disabled="detailFlag" @change='contentTypeChange'>
          <el-option
            v-for="(item,ind) in contentTypeList"
            :key="ind"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if='ruleForm.configType !== "BICAI_DETAILS_BTN"' label="配置内容:" prop="configContent" :rules="[{ required: true, message: '请输入内容', trigger: 'blur' }]">
        <editor-bar v-if='ruleForm.contentType != "TEXT"' v-model="ruleForm.configContent" :url="'admin/file/up/setting'" :isClear="isClear"></editor-bar>
        <el-input
          v-else
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 5}"
          placeholder="请输入配置内容"
          v-model="ruleForm.configContent"
          :disabled="detailFlag"
          class='contentItem'
        ></el-input>
      </el-form-item>
      <el-form-item v-else label="上传图片:" prop="configContent" :rules="[{ required: true, message: '请上传图片', trigger: 'blur' }]">
        <el-upload
          class="avatar-uploader"
          action="customize"
          :show-file-list="false"
          :http-request="uploadButtonImg"
          v-loading='imgLoading'
          >
          <img v-if="ruleForm.configContent" :src="$ImgBaseUrl +  ruleForm.configContent" class="avatar">
          <div v-else>
              <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
          </div>
        </el-upload>
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
</template>

<script>
import { protocol_detail, getAppChannel } from "../../api/setting_use.js";
import { upLoadImg } from '../../api/setting_use.js';
import EditorBar from '../wangEnduit'
export default {
  name: "protocolAddUpt",
  props: ["appChannel", "upd", "opts", "detailFlag", "dialogFormVisible"],
  components: {
    EditorBar,
  },
  data() {
    return {
      flag: true,
      imgLoading: false,
      id: "",
      options: [],
      isClear: false,
      contentTypeList:[
        {
          label:'纯文本',
          value: 'TEXT'
        },
        {
          label:'HTML页面',
          value:'HTML'
        }
      ],
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
        contentType: 'HTML'
      },
      rules: {
        appChannelVal: [{ required: true, message: '请选择渠道', trigger: 'blur' },],
        configType: [{ required: true, message: '请选择类型', trigger: 'blur' },],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
        highlight: [{ required: true, message: '请输入高亮字体说明', trigger: 'blur' },],
        highlightColor: [{ required: true, message: '请选择高亮字体颜色', trigger: 'blur' },],
        markedWords: [{ required: true, message: '请输入提示语', trigger: 'blur' },],
        contentType:[{required: true, message: '请选择内容类型', trigger: 'blur'}]
      },
    };
  },
  mounted() {
    getAppChannel('configuration').then(res=> {
      if(res && res.success) {
        this.options = res.data
      }
    });
   
    //修改传入参数
    if (this.opts != {} && this.opts != null) {
      this.id = this.opts.id ? this.opts.id : null;
      protocol_detail(this.opts.id).then(res=> {
        if(res && res.success) {
          this.ruleForm.markedWords = res.data.markedWords
          this.ruleForm.highlight = res.data.highlight;
          this.ruleForm.highlightColor = res.data.highlightColor;
          this.ruleForm.appChannelVal = res.data.appChannelCode;
          this.ruleForm.configType = res.data.configType;
          this.ruleForm.title = res.data.title;
          this.ruleForm.configContent = res.data.configContent;
          this.ruleForm.fontSize = res.data.fontSize;
          this.ruleForm.linkUrl = res.data.linkUrl;
          this.ruleForm.markedWords = res.data.markedWords;
          this.ruleForm.contentType = res.data.contentType;
        }
      })
    }
  },
  methods: {
    //切换类型
    contentTypeChange() {
      this.ruleForm.configContent = '';
    },
    //上传图片
    uploadButtonImg(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      const idJPG = _file.type === "image/jpeg" ||  _file.type === "image/gif" ||  _file.type === "image/png" ||  _file.type === "image/jpg";
      var formData = new FormData();
      formData.append("file", _file);
      if(!idJPG) {
          this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
          return false
      }
      if (!isLt2M) {
          this.$message.error("请上传2M以下的图片");
          return false;
      }
      this.imgLoading = true;
      upLoadImg(formData).then(res=> {
          this.imgLoading = false;
          if(res && res.success){
              this.ruleForm.configContent = res.data
          }
      })
    },
    //点击保存
    save(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let appName;
            //取 appName
            this.appChannel && this.appChannel.forEach(v => {
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
              configContent:this.ruleForm.configContent,
              fontSize: this.ruleForm.fontSize,
              linkUrl: this.ruleForm.linkUrl,
              contentType: this.ruleForm.contentType
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
    "dialogFormVisible"() {
      if(this.dialogFormVisible && this.opts != null && this.opts != {}) {
        this.id = this.opts.id;
        protocol_detail(this.opts.id).then(res=> {
          if(res && res.success) {
            this.ruleForm.markedWords = res.data.markedWords
            this.ruleForm.highlight = res.data.highlight;
            this.ruleForm.highlightColor = res.data.highlightColor;
            this.ruleForm.appChannelVal = res.data.appChannelCode;
            this.ruleForm.configType = res.data.configType;
            this.ruleForm.title = res.data.title;
            this.ruleForm.configContent = res.data.configContent;
            this.ruleForm.fontSize = res.data.fontSize;
            this.ruleForm.linkUrl = res.data.linkUrl;
            this.ruleForm.markedWords = res.data.markedWords;
            this.ruleForm.contentType = res.data.contentType;
          }
        })
      }
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
}
.card-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100px;
  align-items: center;
}
</style>
