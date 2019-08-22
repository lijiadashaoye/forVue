<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>
        <span @click="$router.back()">短信列表></span>
        {{pageName}}
      </h3>
    </div>
    <div id="forTable">
      <div class="form-box" style="display:inline-block;">
        <span class="boldTitle">批量发送短信</span>
        <br />
        <br />
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="ruleForm"
          labelWidth="200px"
          label-position="left"
        >
          <el-form-item label="发送方式" prop="sendType">
            <el-radio-group v-model="ruleForm.sendType">
              <el-radio label="SYSTEM_USER">系统用户</el-radio>
              <el-radio label="IMPORT_PHONE">导入手机号</el-radio>
              <el-radio label="TEXT">文本</el-radio>
            </el-radio-group>
          </el-form-item>

          <template v-if="ruleForm.sendType=='SYSTEM_USER'">
            <el-form-item label="手机号码" prop="sendTarget">
              <el-radio-group v-model="ruleForm.sendTarget">
                <el-radio label="TOTAL_USER">全部注册用户</el-radio>
                <el-radio label="PART_USER">发送给部分用户</el-radio>
              </el-radio-group>
            </el-form-item>
            <span class="boldTitle">设定发送时间</span>
            <br />
            <br />
            <el-form-item label="发送类型">
              <el-radio-group v-model="sendType">
                <el-radio :label="0">立即发送</el-radio>
                <el-radio :label="1">自定义发送时间</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-if="sendType==1" prop="selectTime" label="选择时间">
              <el-date-picker
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd HH:mm"
                @change="timeChange"
                v-model="ruleForm.selectTime"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>

            <el-form-item v-if="sendType==1&&ruleForm.sendTimeList.length!=0" label="已选中时间">
              <div class="showTime">
                <div class="showBlock" v-for="(item,index) in ruleForm.sendTimeList" :key="index">
                  {{item}}&nbsp;
                  <i class="el-icon-close" @click="deleteTimeIndex(index)"></i>
                </div>
              </div>
            </el-form-item>
            <template v-if="ruleForm.sendTarget=='PART_USER'">
              <span class="boldTitle">发送地区选择</span>
              <br />
              <el-form-item label="发送方式" prop="changeLocation">
                <el-radio-group v-model="ruleForm.changeLocation">
                  <el-radio label="PHONE_LOCATION">按手机号归属地</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="选择省份" prop="sendLocationList">
                <el-select multiple v-model="ruleForm.sendLocationList" placeholder="请选择（可多选）">
                  <el-option
                    v-for="(item,index) in locationList"
                    :key="index"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
          </template>

          <template v-else-if="ruleForm.sendType=='IMPORT_PHONE'">
            <el-form-item label="手机号码" prop="filePath">
              <el-input v-model="ruleForm.filePath" v-show="false"></el-input>

              <el-upload
                style="display:inline;"
                action
                :show-file-list="false"
                :http-request="uploadPhoneFile"
                prop
              >
                <el-button type="primary">
                  <span v-if="ruleForm.filePath">已上传</span>
                  <span v-else>上传</span>
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
              <span style="padding-left:20px;color:#409EFF">下载模板</span>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="手机号码" prop="sendPhone">
              <el-input
                style="width:400px;"
                type="textarea"
                v-model="ruleForm.sendPhone"
                :rows="2"
                placeholder="请输入手机号"
              ></el-input>
              <br />注意：手机号以英文逗号分隔
            </el-form-item>
          </template>

          <span class="boldTitle">设置发送内容</span>
          <br />
          <br />
          <el-form-item label="标题" prop="title">
            <el-input style="width:400px;" v-model="ruleForm.title" placeholder="请输入标题"></el-input>
            <br />注意：手机号以英文逗号分隔
          </el-form-item>
          <el-form-item label="短信内容" prop="templateCode">
            <el-select v-model="ruleForm.templateCode" placeholder="选择模板">
              <el-option
                v-for="item in templateArr"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="smsContent">
            <el-input
              style="width:400px;"
              v-model="ruleForm.smsContent"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-form>

        <span style="display:block;float:right;">0/22</span>
      </div>
      <div class="btn">
        <el-button type="primary" @click="saveFn('ruleForm')">保存</el-button>
        <el-button @click="cancelFn">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { spreadLocationList } from "@/constant.js";
import { mapActions } from "vuex";
import { phoneRegx } from "@/sets/regex.js";
import messageMixin from "../messageMixin.js";
export default {
  name: "sendMessage",
  components: {},
  mixins:[messageMixin],
  data() {
    // 手机号逗号分隔正则
    const validatePhone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("手机号不能为空"));
      } else {
        let arr = value.split(",");
        let phoneType = arr.every(item => {
          return phoneRegx(item);
        });
        if (!phoneType) {
          callback("请输入正确格式手机号");
        } else {
          callback();
        }
      }
    };
    return {
      sendType: 0, //自定义时间类型
      locationList: [],
      phoneFileUrl: "", //上传文件后用于展示图片
      pageName: "", //二级title
      templateArr: [], //短信模板列表
      // 禁用的时间选择
      pickerOptions: {
        disabledDate(time) {
          // 大于当前时间的日期
          const timeType =
            time.getTime() <
            new Date(new Date().toLocaleDateString()).getTime();
          return timeType;
        }
      },
      ruleForm: {
        // 表单数据
        sendType: "SYSTEM_USER", //发送方式类型
        sendTarget: "TOTAL_USER", //发送目标
        changeLocation: "PHONE_LOCATION", //发送地区选择手机号
        sendLocationList: [], //发送地区数组
        templateCode: "", //模板code
        sendPhone: "", //发送的文本手机号
        smsContent: "", //短信内容
        title: "", //短信标题
        filePath: "",
        file:{},
        sendTimeList: [], //定时发送的时间数组
        selectTime: "" //下拉框选择的时间  提交会删除
      },
      rules: {
        sendType: [{ required: true }],
        sendTarget: [{ required: true }],
        changeLocation: [{ required: true }],
        sendLocationList: [{ required: true, message: "省份不能为空" }],
        smsContent: [{ required: true, message: "短信内容不能为空" }],
        title: [{ required: true, message: "短信标题不能为空" }],
        templateCode: [{ required: true, message: "模板选择项不能为空" }],
        sendPhone: [{ required: true, validator: validatePhone }],
        filePath: [{ required: true, message: "导入文件不能为空" }],
        selectTime: [{ required: true, message: "时间不能为空" }]
      },
      productForm: {
        pageSize: 200,
        pageNum: 1,
        linkLocationEnum: "",
        name: null
      }
    };
  },
  created() {
    this.locationList = spreadLocationList;
    //   获取二级title
    this.pageName = this.$route.name.trim();
    // 获取短信模板列表
    this.getSmsTemplate(1).then(data => {
      this.templateArr = data;
    });
  },
  computed: {
    sendTypeForm() {
      return this.ruleForm.sendType;
    }
  },
  watch: {
    sendTypeForm() {
      this.$refs["ruleForm"].clearValidate();
    }
  },
  mounted() {},
  methods: {
    ...mapActions({
      getSmsTemplate: "message/getSmsTemplate",
      addSmsManage: "message/addSmsManage",
      upLoadFile: "message/upLoadFile"
    }),
    //上传文件
    uploadPhoneFile(params) {
      const _file = params.file;
      // const isLt2M = _file.size / 1024 / 1024 < 2;
      // const idJPG =
      //   _file.type === "image/jpeg" ||
      //   "image/gif" ||
      //   "image/png" ||
      //   "image/jpg";
      var formData = new FormData();
      formData.append("file", _file);
      // if (!idJPG) {
      //   this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
      //   return false;
      // }
      // if (!isLt2M) {
      //   this.$message.error("请上传2M以下的图片");
      //   return false;
      // }
      this.ruleForm.file = _file;
      this.$message.success("上传成功");
      this.ruleForm.filePath = "success";
    },

    // 取消
    cancelFn() {
      this.$refs["ruleForm"].resetFields();
      this.$router.back();
    },
    // 根据不同发送方式清空数据
    sendDefaultInfo() {
      delete this.ruleForm["sendTarget"];
      delete this.ruleForm["changeLocation"];
      delete this.ruleForm["sendLocationList"];
      delete this.ruleForm["sendTimeList"];
      delete this.ruleForm["selectTime"];
    },
    // 保存
    saveFn(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          // 删除time的中转数据
          delete this.ruleForm["selectTime"];
          // 判断类型将不必要的参数清空
          if (this.ruleForm.sendType == "SYSTEM_USER") {
            delete this.ruleForm["filePath"];
            delete this.ruleForm["sendPhone"];
            // 避免自定义发送时间参数 干扰
            if (this.sendType == 0) {
              delete this.ruleForm["sendTimeList"];
            } else {
              this.ruleForm.sendTimeList = this.ruleForm.sendTimeList.map(
                item => {
                  return new Date(item).getTime();
                }
              );
            }
            // 部分用户才有选择地区
            if (this.ruleForm.sendTarget == "TOTAL_USER") {
              delete this.ruleForm["sendLocation"];
              delete this.ruleForm["changeLocation"];
            }
          } else if (this.ruleForm.sendType == "IMPORT_PHONE") {
            this.ruleForm.filePath = this.phoneFileUrl;
            delete this.ruleForm["sendPhone"];
            this.sendDefaultInfo();
          } else {
            delete this.ruleForm["filePath"];
            this.sendDefaultInfo();
          }
          this.addSmsManage(this.ruleForm).then(() => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.$router.back();
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.form-box {
  padding: 20px;
  margin-top: 40px;
  margin-left: 40px;
  .el-input {
    width: 400px;
  }
  .el-select {
    width: 400px;
  }
  .el-autocomplete {
    width: 400px;
  }
  .tag {
    width: 600px;
    padding: 20px;
    min-height: 200px;
    border: 1px solid #ddd;
    .el-tag {
      margin-right: 20px;
    }
  }
}
.btn {
  text-align: center;
  .el-button:nth-child(2) {
    margin-left: 20px;
  }
}
.avatar {
  width: 200px;
  height: 200px;
}

// 加黑标题
.boldTitle {
  font-weight: bold;
  position: relative;
  left: -15px;
}
// time选中展示框
.showTime {
  padding: 10px;
  border: 1px solid gray;
  width: 400px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-height: 300px;
  overflow-y: auto;
  .showBlock {
    padding: 0px 10px;
    width: 49%;
    height: 40px;
    border: 1px solid green;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
