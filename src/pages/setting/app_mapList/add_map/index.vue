<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div style="overflow:auto;padding-bottom:20px;">
      <el-form
        v-if="detailType"
        label-suffix=":"
        class="showForm"
        labelWidth="120px"
        label-position="right"
      >
        <el-form-item label="广告图标题">{{ruleForm.bannerTitle}}</el-form-item>
        <el-form-item label="高亮字体">{{ruleForm.highlight}}</el-form-item>
        <el-form-item label="高亮字体颜色">
          <el-color-picker disabled v-model="ruleForm.highlightColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="显示系统">{{defaultChange(ruleForm.sysType,true,'sysTypeList')}}</el-form-item>
        <el-form-item label="广告图片">
          <img v-if="ruleForm.imageUrl !='' " :src="ImgBaseUrl + ruleForm.imageUrl" height="40px" />
        </el-form-item>
        <el-form-item label="开始时间">{{ruleForm.beginTime}}</el-form-item>
        <el-form-item label="结束时间">{{ruleForm.endTime}}</el-form-item>
        <el-form-item
          v-for="(item,index) of ruleForm.bannerButtons"
          :label="`跳转页面${index+1}`"
          :key="index"
        >{{productType(item.productType)}}</el-form-item>

        <el-form-item v-if="pageType==0" label="弹窗文案">{{ruleForm.copyWrit}}</el-form-item>
        <el-form-item label="备注" prop="bannerTitle">{{ruleForm.remark}}</el-form-item>
      </el-form>
      <el-form
        v-else
        class="form-box"
        ref="ruleForm"
        :rules="rules"
        :model="ruleForm"
        label-suffix=":"
        labelWidth="120px"
        label-position="right"
      >
        <el-form-item label="广告图标题" prop="bannerTitle">
          <el-input maxlength="30" v-model="ruleForm.bannerTitle" placeholder="请输入30个字符以内的标题"></el-input>
        </el-form-item>
        <el-form-item label="高亮字体" prop="highlight">
          <el-input maxlength="30" v-model="ruleForm.highlight" placeholder="请输入高亮字体"></el-input>
        </el-form-item>
        <el-form-item label="高亮字体颜色" prop="highlightColor">
          <el-color-picker v-model="ruleForm.highlightColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="显示系统" style="margin-bottom:5px;" prop="sysType">
          <el-select v-model="ruleForm.sysType" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item of sysTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片" prop="title">
          <el-upload
            class="avatar-uploader"
            action="customize"
            :show-file-list="false"
            :http-request="uploadMapFile"
            :disabled="detailFlag"
            :on-change="uploadBgProcess"
          >
            <img
              v-if="ruleForm.imageUrl !='' && bgFlag == false"
              :src="ImgBaseUrl + ruleForm.imageUrl"
              height="40px"
            />
            <div v-else-if="ruleForm.imageUrl =='' && bgFlag == false">
              <el-button>
                选择图片
                <br />
                <span style="font-size:12px;color:red">不能大于2M</span>
                <br />
                <span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span>
              </el-button>
            </div>
            <el-progress
              v-if="bgFlag == true"
              type="circle"
              :percentage="bgUploadPercent"
              style="margin-top:30px;"
            ></el-progress>
          </el-upload>
        </el-form-item>
        <el-form-item label="显示时间" prop="timeArr">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="ruleForm.timeArr"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <div v-for="(item,index) of ruleForm.bannerButtons" :key="index">
          <el-form-item :label="`跳转页面${index+1}`">
            <el-select
              filterable
              @change="((val)=>{typeChange(val, index)})"
              v-model="item.productType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in productTypeArr"
                :key="item.id"
                :label="item.linkName"
                :value="item.linkModel"
              ></el-option>
            </el-select>
            <el-button type="primary" @click="deleteItem(index)" style="flot:right;" size="mini">删除</el-button>
          </el-form-item>
          <!-- 产品类型附属结构 -->
          <el-form-item
            v-if="item.producInfos.productInfo.defaultType&&!item.producInfos.productInfo.inputType"
            :label="changeTitle"
          >
            <el-select
              filterable
              clearable
              remote
              reserve-keyword
              :remote-method="((val)=>{searchChange(val, index)})"
              v-loadmore="loadmore(index)"
              v-model="item.productId"
              placeholder="请选择"
            >
              <el-option
                style="display:flex;"
                v-for="(info,index) in item['producInfos']['productArr']"
                :key="index"
                :label="info.name"
                :value="info.id"
              >
                <span style="float: left;flex:1;">{{ info.institutionName }}</span>
                <span
                  style="float: right; color: #8492a6; font-size: 13px;flex:1;overflow:hidden;"
                >{{ info.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="item.producInfos.productInfo.defaultType&&item.producInfos.productInfo.inputType"
            label="链接地址"
            prop="linkUrl"
          >
            <el-input v-model="item.jumpUrl" placeholder="请输入正确的链接"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="添加跳转页面">
          <el-button type="primary" @click="addPage" size="mini">添加</el-button>
        </el-form-item>
        <el-form-item v-if="pageType==0" label="弹窗文案" prop="copyWrit">
          <el-input
            v-model="ruleForm.copyWrit"
            style="width:400px;"
            type="textarea"
            :rows="2"
            placeholder="请输入弹窗文案"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" type="textarea" :rows="2" placeholder="请输入广告图信息"></el-input>
        </el-form-item>
      </el-form>
      <!-- 操作项 -->
      <div class="btn">
        <el-button v-if="detailType" type="primary" @click="editChange">修改</el-button>
        <el-button v-else type="primary" @click="saveFn('ruleForm')">保存</el-button>
        <el-button @click="cancelFn">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { sysTypeList } from "@/constant.js";
import { upLoadImg } from "@/api/setting_use.js";
import { mapActions } from "vuex";
import { defaultChange } from "@/sets/changeLanguage.js";
export default {
  computed: {
    productType: function() {
      return function(name) {
        for (let item of this.productTypeArr) {
          if (item.linkModel == name) {
            return item.linkName;
          }
        }
      };
    }
  },
  data() {
    return {
      detailType: false, //默认详情不展示
      productTypeArr: [], //产品类型数组
      detailFlag: false,
      ImgBaseUrl: "", //图片baseurl
      sysTypeList: [], //显示系统
      pageType: "", //页面创建类型
      bgFlag: false,
      env: "",
      pageName: "",
      ruleForm: {
        bannerTitle: "", //广告图标题
        bannerType: "", //广告图类型
        positionNo: "", //广告图位置编号
        sysType: "", //显示系统
        imageUrl: "", //图片地址
        imageName: "", //图片名称
        beginTime: "", //开始时间
        endTime: "", //结束时间
        highlight: "", //高亮字体
        highlightColor: "", //高亮字体颜色
        bannerButtons: [
          {
            jumpOrder: 0, //跳转序号
            jumpType: 1,
            productType: "", //产品类型
            producInfos: {
              productArr: [], //关联数据
              // 当产品关联时请求分页参数
              productForm: {
                pageSize: 200,
                pageNum: 1,
                linkModel: ""
              },
              // 附属产品显示功能
              productInfo: {
                defaultType: false, //是否有附属功能
                inputType: false, //属于input还是下拉产品
                pages: 0 //关联产品总共的页数
              }
            }
          }
        ], //跳转页面配置信息
        remark: "", //备注
        timeArr: [] //中转时间
      },
      rules: {
        bannerTitle: [{ required: true, message: "广告图标题不能为空" }],
        timeArr: [{ required: true, message: "时间不能为空" }]
      }
    };
  },
  created() {
    this.defaultChange = defaultChange;
    // 新增页面逻辑
    if (this.$route.query.positionNo !== undefined) {
      // 广告图位置编号
      this.ruleForm.positionNo = this.$route.query.positionNo;
      // 赋值广告图类型
      this.ruleForm.bannerType = this.$route.query.type;
    }
    // 页面创建类型
    this.pageType = this.$route.query.type;
    // 显示系统
    this.sysTypeList = sysTypeList;
    // baseUrl
    this.ImgBaseUrl = this.$ImgBaseUrl;

    this.env = sessionStorage.getItem("env") === "development";
    if (this.$route.query.id !== undefined) {
      this.detailType = true;
    }
    // 判断是详情/修改还是新建
    if (this.detailType) {
      if (this.$route.query.type === "upd") {
        this.pageName = "广告修改";
      } else {
        this.pageName = "广告详情";
      }

      // 获取广告图详情
      this.activityMapDetail(this.$route.query.id).then(res => {
        if (res.data.bannerInfoVo) {
          // 将详情数据和添加的数据关联
          Object.assign(this.ruleForm, res.data.bannerInfoVo);
          // 拼接添加数据的时间参数数组
          this.ruleForm.timeArr = [
            res.data.bannerInfoVo.beginTime,
            res.data.bannerInfoVo.endTime
          ];
          if (this.$route.query.type === "upd") {
            this.editChange();
          }
        }
      });
    } else {
      //   二级title
      this.pageName = this.$route.name.trim();
    }
    // 获取产品类型列表
    this.getProductTypeList().then(data => {
      this.productTypeArr = data.list;
    });
  },
  methods: {
    // 获取产品类型列表
    ...mapActions({
      getProductTypeList: "message/getProductTypeList",
      getProductList: "message/getProductList",
      activityMapAdd: "appConfig/activityMapAdd",
      activityMapDetail: "appConfig/activityMapDetail",
      activityMapUpd: "appConfig/activityMapUpd"
    }),
    // 修改变保存
    editChange() {
      for (let item of this.ruleForm.bannerButtons) {
        item.producInfos = {
          // 当产品关联时请求分页参数
          productForm: {
            pageSize: 200,
            pageNum: 1,
            linkModel: ""
          },
          // 附属产品显示功能
          productInfo: {
            defaultType: false, //是否有附属功能
            inputType: false, //属于input还是下拉产品
            pages: 0 //关联产品总共的页数
          }
        };
      }
      this.detailType = !this.detailType;
    },
    //产品类型发生改变
    typeChange(value, index) {
      this.formChange(index, "productInfo", false, "defaultType");
      // 外部链接
      if (value == "EXTERNAL_LINK") {
        this.formChange(index, "productInfo", true, "defaultType");
        this.formChange(index, "productInfo", true, "inputType");
      } else if (
        value == "MONETARY_FUND" ||
        value == "WMP" ||
        value == "PURE_DEBT_FUND" ||
        value == "DEPOSIT" ||
        value == "CONSULT_PAGE" ||
        value == "ACTIVITY" ||
        value == "INSTITUTION_PAGE"
      ) {
        //  清空二级列表的已选属性
        if (this.ruleForm.bannerButtons[index].productId) {
          this.ruleForm.bannerButtons[index].productId = "";
        }
        this.formChange(index, "productInfo", true, "defaultType");
        this.formChange(index, "productInfo", false, "inputType");
        this.formChange(index, "productForm", value, "linkModel");
        // 请求关联产品 条件（货币基金、理财产品、纯 债产品、存款产品）
        if (value == "CONSULT_PAGE") {
          this.changeTitle = "关联咨询";
        } else if (value == "ACTIVITY") {
          this.changeTitle = "关联已上线活动";
        } else if (value == "INSTITUTION_PAGE") {
          this.changeTitle = "关联机构";
        } else {
          this.changeTitle = "关联产品";
        }
        // 获取关联产品列表
        this.getproList(index);
      }
    },
    formChange(index, type, value, type_1) {
      if (type_1) {
        this.ruleForm.bannerButtons[index]["producInfos"][type][type_1] = value;
      } else {
        this.ruleForm.bannerButtons[index]["producInfos"][type] = value;
      }
    },
    // 获取关联产品列表
    getproList(index) {
      this.formChange(index, "productArr", []);
      this.getProductList(
        this.ruleForm.bannerButtons[index]["producInfos"]["productForm"]
      ).then(data => {
        if (data) {
          if (data.list) {
            let obj = this.ruleForm.bannerButtons[index];
            obj["producInfos"].productArr = data.list;
            this.$set(this.ruleForm.bannerButtons, index, obj);
          }
          if (data.pages) {
            // 获取总页数
            this.formChange(index, "productInfo", data.pages, "pages");
          }
        }
      });
    },
    // 关联产品模糊搜索
    searchChange(value, index) {
      // 关联产品清空
      this.formChange(index, "productArr", []);
      this.getproList(index);
    },
    // 关联产品下拉加载
    loadmore(index) {
      let pageNum = this.ruleForm.bannerButtons[index]["producInfos"][
        "productForm"
      ]["pageNum"];
      let pages = this.ruleForm.bannerButtons[index]["producInfos"][
        "productInfo"
      ]["pages"];
      if (pageNum < pages) {
        this.ruleForm.bannerButtons[index]["producInfos"]["productForm"][
          "pageNum"
        ]++;
        this.getproList(index);
      }
    },
    // 添加跳转页面
    addPage() {
      let obj = {
        jumpOrder: this.ruleForm.bannerButtons.length, //跳转序号
        jumpType: 1,
        productType: "", //产品类型
        producInfos: {
          productArr: [], //关联数据
          // 当产品关联时请求分页参数
          productForm: {
            pageSize: 200,
            pageNum: 1
          },
          // 附属产品显示功能
          productInfo: {
            defaultType: false, //是否有附属功能
            inputType: false, //属于input还是下拉产品
            pages: 0 //关联产品总共的页数
          }
        }
      };
      this.ruleForm.bannerButtons.push(obj);
    },
    // 删除跳转页面组
    deleteItem(index) {
      this.ruleForm.bannerButtons.splice(index, 1);
    },
    uploadBgProcess(file) {
      if (file.status === "ready") {
        this.bgUploadPercent = 0;
        this.bgFlag = true;
        const interval = setInterval(() => {
          this.bgUploadPercent += 1;
          if (this.bgUploadPercent >= 99) {
            window.clearInterval(interval);
            return;
          }
        }, 200);
      }
      if (file.status === "success") {
        this.bgFlag = false;
        this.bgUploadPercent = 100;
      } else {
        this.bgFlag = false;
      }
    },
    // 上传文件
    uploadMapFile(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      const idJPG =
        _file.type === "image/jpeg" ||
        _file.type === "image/gif" ||
        _file.type === "image/png" ||
        _file.type === "image/jpg";
      var formData = new FormData();
      formData.append("file", _file);
      if (!idJPG) {
        this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("请上传2M以下的图片");
        return false;
      }
      upLoadImg(formData).then(res => {
        if (res.success) {
          this.bgFlag = false;
          this.ruleForm.imageUrl = res.data;
          this.ruleForm.imageName = params.file.name;
        }
      });
    },
    // 保存信息
    saveFn(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          let ruleForm = Object.assign({}, this.ruleForm);
          // 将时间赋值并删除无用 参数
          ruleForm.beginTime = this.ruleForm.timeArr[0];
          ruleForm.endTime = this.ruleForm.timeArr[1];
          delete ruleForm.timeArr;
          for (let i in ruleForm.bannerButtons) {
            ruleForm.bannerButtons[i].jumpOrder = i;
            delete ruleForm.bannerButtons[i]["producInfos"];
          }
          if (this.$route.query.id) {
            this.activityMapUpd(ruleForm).then(() => {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.$router.go(-1);
            });
          } else {
            this.activityMapAdd(ruleForm).then(() => {
              this.$message({
                type: "success",
                message: "创建成功!"
              });
              this.$router.go(-1);
            });
          }
        }
      });
    },

    // 取消返回上一级
    cancelFn() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped lang='scss'>
// 底部操作按钮
.btn {
  text-align: center;
  .el-button:nth-child(2) {
    margin-left: 20px;
  }
}
.form-box {
  padding: 20px;
  margin-top: 40px;
  margin-left: 40px;
  .el-input {
    max-width: 400px;
  }
  .el-select {
    max-width: 400px;
  }
  .el-autocomplete {
    max-width: 400px;
  }
  .el-range-editor--mini.el-input__inner {
    max-width: 400px !important;
  }
  .el-textarea {
    max-width: 400px;
  }
}
</style>