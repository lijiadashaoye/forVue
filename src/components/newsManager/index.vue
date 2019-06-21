<template>
  <el-card class="box-card">
    <div class="step">
      <el-steps :active="active" finish-status="success">
        <el-step title="新闻基本信息"></el-step>
        <el-step title="新闻内容"></el-step>
        <el-step title="关联产品"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>

    <!-- 第一步 -->
    <div class="stepItem" v-if="active == 0">
      <div class="card-item">
        <span class="item-text">*标题:</span>
        <div class="item-input">
          <el-input v-model="newsTitle" placeholder="请输入新闻标题"></el-input>
        </div>
      </div>

      <div class="card-item">
        <span class="item-text">*位图:</span>
        <div class="item-img">
          <el-upload
            class="avatar-uploader"
            action="customize"
            :show-file-list="false"
            :http-request="upload"
          >
            <img v-if="newsImageUrl" :src="newsImageUrl" class="avatar">
            <el-button v-else>选择图片</el-button>
          </el-upload>
        </div>
      </div>

      <div class="card-item">
        <span class="item-text">*来源:</span>
        <div class="item-input">
          <el-input v-model="source" placeholder="请输入来源"></el-input>
        </div>
      </div>

      <div class="card-item">
        <span class="item-text">*摘要:</span>
        <div class="item-input input-quill">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 3}"
            placeholder="请输入摘要"
            v-model="summary"
          ></el-input>
        </div>
      </div>

      <div class="card-item">
        <span class="item-text">*初始访问量:</span>
        <div class="item-input">
          <el-input v-model="visitNumber" placeholder="请输入初始访问量" type="number"></el-input>
        </div>
      </div>

      <div class="card-item">
        <span class="item-text">*初始点赞量:</span>
        <div class="item-input">
          <el-input v-model="fabulousNumber" placeholder="请输入初始点赞量" type="number"></el-input>
        </div>
      </div>

      <div class="card-item">
        <span class="item-text">*新闻开始时间:</span>
        <div class="item-input">
          <el-date-picker
            v-model="startTime"
            type="datetime"
            :placeholder="new Date().toLocaleDateString() +' '+ ' '+ new Date().toLocaleTimeString()"
          ></el-date-picker>
        </div>
      </div>

      <div class="card-item">
        <span class="item-text">*新闻结束时间:</span>
        <div class="item-input">
          <el-date-picker
            v-model="endTime"
            type="datetime"
            :placeholder="new Date().toLocaleDateString() +' '+ ' '+ new Date().toLocaleTimeString()"
          ></el-date-picker>
        </div>
      </div>

      <div class="card-item">
        <span class="item-text">*标记:</span>
        <div class="item-input">
          <el-checkbox-group v-model="sign" class="signNoWrap">
            <el-checkbox
              v-for="(item,ind) in signOpt"
              :label="item.label"
              :value="item.value"
              :key="ind"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>

    <div class="stepItemSec" v-if="active == 1">

      <div class="card-item item-quill">
        <span class="item-text">*内容:</span>
        <div class="item-input input-quill">
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
          ></quill-editor>
          <el-upload
            class="upload-demo"
            action="customize"
            :show-file-list="false"
            :http-request="uploadMsg"
            style="display:none"
          >
            <el-button
              size="small"
              type="primary"
              id="imgInput"
              v-loading.lock="Loading"
              element-loading-text="插入中,请稍候"
            >点击上传</el-button>
          </el-upload>
          <video width="100%" height="300" controls="controls" v-if="videoUrl">
            <source :src="videoUrl">
          </video>
        </div>

      </div>

      <div class="card-item">
        <span class="item-text">*内容链接:</span>
        <div class="item-input">
          <el-input v-model="contentUrl" placeholder="请输入内容链接"></el-input>
        </div>
      </div>
    </div>

    <div class="stepItem" v-if="active == 2">
      <el-card class="box-card tabCard">
        
      </el-card>
    </div>

    <div class="card-footer">
      <el-button style="margin-top: 12px;" @click="clickStep('prev')">{{prevStep}}</el-button>
      <el-button style="margin-top: 12px;" @click="clickStep()">{{nextStep}}</el-button>
    </div>

  </el-card>
</template>

<script>
import { upLoadImg } from "../../api/setting_use.js";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [
    {
      header: 1
    },
    {
      header: 2
    }
  ], // custom button values
  [
    {
      list: "ordered"
    },
    {
      list: "bullet"
    }
  ],
  [
    {
      script: "sub"
    },
    {
      script: "super"
    }
  ], // superscript/subscript
  [
    {
      indent: "-1"
    },
    {
      indent: "+1"
    }
  ], // outdent/indent
  [
    {
      direction: "rtl"
    }
  ], // text direction
  [
    {
      size: ["small", false, "large", "huge"]
    }
  ], // custom dropdown
  [
    {
      header: [1, 2, 3, 4, 5, 6, false]
    }
  ],
  [
    {
      color: []
    },
    {
      background: []
    }
  ], // dropdown with defaults from theme
  [
    {
      font: []
    }
  ],
  [
    {
      align: []
    }
  ],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];

export default {
  name: "newsManager",
  props: [],
  data() {
    return {
      videoUrl: '',
      prevStep: "取消",
      nextStep: "下一步",
      active: 0,
      newsTitle: "", //新闻标题
      newsType: "ORDINARY_NEWS", //新闻类型
      // signStr: [],//标记是汉字 需要给后台传递成英文字段
      sign: [], //标记
      summary: "", //摘要
      newsImageUrl: "", //新闻图片
      content: ``, //内容
      contentUrl: "", //内容链接
      visitNumber: "", //初始访问量
      fabulousNumber: "", //初始点赞量
      source: "", //来源
      startTime: "", //开始时间
      endTime: "", //结束时间
      Loading: true,
      signOpt: [
        {
          label: "理财知道",
          value: "FINANCING"
        },
        {
          label: "比财宝典",
          value: "BICAITREASURE"
        },
        {
          label: "比财技巧",
          value: "BICAISKILL"
        }
      ],
      editorOption: {
        placeholder: "请输入内容",
        theme: "snow",
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector("#imgInput").click();
                } else {
                  this.quill.format("image", false);
                }
              },
              video: function(value) {
                if (value) {
                  document.querySelector("#imgInput").click();
                } else {
                  this.quill.format("video", false);
                }
              }
            }
          }
        }
      },
    };
  },
  mounted() {
    // console.log(this.newsType)
  },
  methods: {
    //图片上传
    upload(params) {
      const _file = params.file;
      const isLt5M = _file.size / 1024 / 1024 < 5;
      var formData = new FormData();
      formData.append("file", _file);
      if (!isLt5M) {
        this.$message.error("请上传5M以下的图片");
        return false;
      }
      upLoadImg(formData).then(res => {
        if (res.success) {
          this.newsImageUrl = this.$ImgBaseUrl + res.data;
        }
      });
    },
    // 文本框上传图片或者视频
    uploadMsg(params) {
      this.Loading = false;
      const _file = params.file;
      var formData = new FormData();
      formData.append("file", _file);
      let url = "";
      upLoadImg(formData).then(res => {
        if (res.success) {
          url = this.$ImgBaseUrl + res.data;
        }
        if (url != null && url.length > 0) {
          // 将文件上传后的URL地址插入到编辑器文本中
          if (_file.type.indexOf("image") != -1) {
            this.content += `<img style="wid" src="${url}" alt=""/>`;
          } else if (_file.type.indexOf("video") != -1) {
            this.videoUrl = url;
            var bq=` <video width="320" height="240" controls="controls">
              <source :src="${this.videoUrl}">
            </video>`;
            this.content += bq;
          }
        } else {
          this.$message.error(`插入失败`);
        }
      });
    },

    clickStep(data) {
      if (data === "prev") {
        //点击上一步
        this.active--;
      } else {
        //点击下一步
        this.active++;
      }
      if (this.active == 0) {
        this.sign = this.sign.split('&')
        this.sign.forEach((v, i) => {
          // console.log(v, "v");
          this.signOpt.forEach(item => {
            // console.log(item, "item");
            if (v == item.value) {
              this.sign[i] = item.label;
            }
          });
        });
        this.prevStep = "取消";
        this.nextStep = "下一步";
      } else if (this.active == 1) {
        if(typeof(this.sign) == 'object') {
          this.sign.forEach((v, i) => {
            this.signOpt.forEach(item => {
              if (v == item.label) {
                this.sign[i] = item.value;
              }
            });
          });
        this.sign = this.sign.join('&');
        }
        // console.log(this.sign)
        this.nextStep = "下一步";
        this.prevStep = "上一步";
      } else if (this.active == 2) {
        this.prevStep = "上一步";
        this.nextStep = "保存";
      } else if (this.active > 2) {
        this.prevStep = "取消";
        this.nextStep = "下一步";
        this.active = 0;
      }
    },
    onEditorChange() {
      // console.log(this.content);
    },
    //点击取消
    cancel() {},
    //点击保存
    save() {
      // console.log(this.content);
    }
  }
};
</script>

<style lang="scss">
.box-card {
  padding: 10px 20px;
  box-sizing: border-box;
}
.step {
  margin-bottom: 10px;
}
.stepItemSec {
  width: 100%;
  height: auto;
  .card-item {
    width: 80%;
    height: auto;
    display: flex;
    .item-text {
      width: 200px;
    }
    .input-quill {
      flex: 1;
      // height: 400px;
      .quill-editor {
        height: 100%;
        .ql-container {
          height: 300px;
        }
      }
    }
  }
}
.el-step__head.is-process {
  color: orange;
  border-color: orange;
}
.el-step__title.is-process {
  color: orange;
}
.tabCard {
  width: 70%;
  margin: 0 auto;
}
.signNoWrap{
  display:flex;
  flex-wrap: nowrap;
}
.card-item {
  width: 70%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .item-text {
    width: 220px;
  }
  .item-input {
    width: 400px;
    .msg {
      width: 100%;
      padding: 10px;
      color: red;
    }
  }
  .item-img {
    width: 100px;
    height: 80px;
    display: flex;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
    }
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
