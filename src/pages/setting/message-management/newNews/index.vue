<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>
        <span @click="$router.back()">{{title}}></span>
        <span v-if="$route.query.title">修改信息</span>
        <span v-else>{{pageName}}</span>
      </h3>
    </div>
    <div id="forTable">
      <div class="form-box" style="display:inline-block;">
        <span class="boldTitle">基本信息</span>
        <br />
        <br />
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="ruleForm"
          labelWidth="200px"
          label-position="left"
        >
          <el-form-item label="标题" prop="title">
            <el-input maxlength="30" v-model="ruleForm.title" placeholder="请输入30个字符以内的标题"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="pushContent">
            <el-input
              v-model="ruleForm.pushContent"
              style="width:400px;"
              type="textarea"
              :rows="2"
              placeholder="请输入新闻摘要"
            ></el-input>
          </el-form-item>
          <el-form-item label="消息类型" prop="messageType">
            <el-radio-group v-model="ruleForm.messageType">
              <el-radio label="SYSTEM_MESSAGE">系统信息</el-radio>
              <el-radio label="PRODUCT_MESSAGE">产品信息</el-radio>
              <el-radio label="ACTIVITY_MESSAGE">活动信息</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="pushWay" label="推送方式">
            <el-radio-group v-model="ruleForm.pushWay">
              <el-radio label="ALL">全部</el-radio>
              <el-radio label="STATION">站内信</el-radio>
              <el-radio label="PUSH">推送</el-radio>
            </el-radio-group>
          </el-form-item>
          <span class="boldTitle">点击类型</span>
          <br />
          <br />
          <el-form-item label="点击类型" prop="productType">
            <el-select
              filterable
              v-loadmore="loadmore"
              @change="typeChange"
              v-model="ruleForm.productType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in productTypeArr"
                :key="item.id"
                :label="item.linkName"
                :value="item.linkModel"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 产品类型附属结构 -->
          <el-form-item
            v-if="productInfo.defaultType&&!productInfo.inputType"
            prop="linkId"
            :label="changeTitle"
          >
            <el-select
              filterable
              clearable
              remote
              reserve-keyword
              @change="selectChange"
              :remote-method="searchChange"
              v-loadmore="loadmore"
              v-model="ruleForm.linkId"
              placeholder="请选择"
            >
              <el-option
                style="display:flex;"
                v-for="(item,index) in productArr"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left;flex:1;">{{ item.institutionName }}</span>
                <span
                  style="float: right; color: #8492a6; font-size: 13px;flex:1;overflow:hidden;"
                >{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            v-if="productInfo.defaultType&&productInfo.inputType"
            label="链接地址"
            prop="linkUrl"
          >
            <el-input v-model="ruleForm.linkUrl" placeholder="请输入正确的链接"></el-input>
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
          <span class="boldTitle">收信联系人</span>
          <br />
          <br />
          <el-form-item prop="sendTarget" label="用户选择">
            <el-radio-group v-model="ruleForm.sendTarget">
              <el-radio label="TOTAL_USER">发送给全部用户</el-radio>
              <el-radio label="PART_USER">发送给部分用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 自定义发送时间显示 -->
          <template v-if="ruleForm.sendTarget=='PART_USER'">
            <span class="boldTitle">消息推广地区选择</span>
            <br />
            <br />
            <el-form-item label="发送方式" prop="changeLocation">
              <el-radio-group v-model="ruleForm.changeLocation">
                <el-radio label="PHONE_LOCATION">按手机号归属地</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item multiple label="选择省份" prop="sendLocationList">
              <el-select filterable multiple v-model="ruleForm.sendLocationList" placeholder="请选择">
                <el-option
                  v-for="(item,index) in locationList"
                  :key="index"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <!-- 操作项 -->
      <div class="btn">
        <el-button type="primary" @click="saveFn('ruleForm')">保存</el-button>
        <el-button @click="cancelFn">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { spreadLocationList } from "@/constant.js";
import { websiteRegx } from "@/sets/regex.js";
import messageMixin from "../../short-message-list/messageMixin.js";
export default {
  name: "sendMessage",
  components: {},
  mixins: [messageMixin],
  data() {
    // 网址正则
    const validateWebsite = (rule, value, callback) => {
      if (!value) {
        callback(new Error("链接地址不能为空"));
      } else if (!websiteRegx(value)) {
        callback("请输入正确网址");
      } else {
        callback();
      }
    };
    return {
      changeTitle: "产品名称",
      ruleMiddleForm: {}, //中转的数据
      locationList: [],
      title: "推送列表",
      sendType: 0, //设定发送时间为立即发送
      pageName: "", // 当前页面名字
      productTypeArr: [], //产品类型数组
      productArr: [], //关联产品数组
      searchValue: "", //关联产品时的模糊搜索
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
      // 当产品关联时请求分页参数
      productForm: {
        pageSize: 200,
        pageNum: 1,
        linkModel: "",
        name: null
      },
      // 附属产品显示功能
      productInfo: {
        defaultType: false, //是否有附属功能
        inputType: false, //属于input还是下拉产品
        pages: 0 //关联产品总共的页数
      },
      ruleForm: {
        // 表单数据
        productType: "",
        title: "", // 标题
        pushContent: "", //内容
        messageType: "SYSTEM_MESSAGE", //发送方式
        pushWay: "ALL", // 推送方式

        linkUrl: "", // 外部链接地址-产品类型选择时

        linkId: "", // 除链接外产品关联
        linkName: "", //关联产品名称
        sendTarget: "TOTAL_USER", //收信联系人发送方式
        changeLocation: "PHONE_LOCATION", //
        sendTimeList: [], //定时发送的时间数组
        selectTime: "", //下拉框选择的时间  提交会删除
        sendLocationList: [] //发送地名的数组
      },
      rules: {
        title: [{ required: true, message: "标题不能为空" }],
        pushContent: [{ required: true, message: "内容不能为空" }],
        messageType: [{ required: true }],
        pushWay: [{ required: true }],
        productType: [{ required: true, message: "产品类型不能为空" }],
        linkUrl: [
          {
            validator: validateWebsite,
            required: true
          }
        ],
        sendTarget: [{ required: true }],
        changeLocation: [{ required: true }],
        sendLocationList: [{ required: true, message: "省份不能为空" }],
        selectTime: [{ required: true, message: "时间不能为空" }]
      }
    };
  },
  created() {
    // 省份列表
    this.locationList = spreadLocationList;
    // 判断是否是修改数据
    if (this.$route.query.title) {
      this.title = this.$route.query.title;
      // 合并详情参数和新建的默认参数
      let fromInfo = this.$store.state.message.newsDetailInfo;
      for (let item in this.ruleForm) {
        this.ruleForm[item] = fromInfo[item];
      }
      // 部分用户显示地址
      if (this.ruleForm.sendTarget == "PART_USER") {
        this.ruleForm.sendLocationList = fromInfo.sendLocation.split(",");
      }
      // 详情参数时间是字符串拼接成数组
      this.ruleForm.selectTime = fromInfo.sendTime;
      this.ruleForm.sendTimeList = [fromInfo.sendTime];
      delete this.ruleForm["sendTime"];
      // 产品关联列表显示
      this.typeChange(this.ruleForm.productType);
      // 判断信息是否是自定义发送
      if (this.ruleForm.sendLocationList.length != 0) {
        this.sendType = 1;
      }
    }
    // 获取产品类型列表
    this.getProductTypeList().then(data => {
      this.productTypeArr = data.list;
    });
  },
  mounted() {
    //   获取二级title
    this.pageName = this.$route.name.trim();
  },
  methods: {
    // 获取产品类型列表
    ...mapActions({
      getProductTypeList: "message/getProductTypeList",
      getProductList: "message/getProductList",
      addProduct: "message/addProduct",
      changePushManage: "message/changePushManage"
    }),

    // 产品关联改变时触发记录linkName
    selectChange(id) {
      for (let item of this.productArr) {
        if (item.id == id) {
          this.ruleForm.linkName = item.name;
          return;
        }
      }
    },
    //产品类型发生改变
    typeChange(value) {
      this.productInfo.defaultType = false;
      // 外部链接
      if (value == "EXTERNAL_LINK") {
        this.productInfo.defaultType = true;
        this.productInfo.inputType = true;
      } else if (
        value == "MONETARY_FUND" ||
        value == "WMP" ||
        value == "PURE_DEBT_FUND" ||
        value == "DEPOSIT" ||
        value == "CONSULT_PAGE" ||
        value == "ACTIVITY" ||
        value == "Institution_Page"
      ) {
        // }else{
        //  清空二级列表的已选属性
        if (this.ruleForm.linkId) {
          this.ruleForm.linkId = "";
        }
        this.productInfo.defaultType = true;
        this.productInfo.inputType = false;
        // 请求关联产品 条件（货币基金、理财产品、纯 债产品、存款产品）
        this.productForm.linkModel = value;
        if (value == "CONSULT_PAGE") {
          this.changeTitle = "关联咨询";
        } else if (value == "ACTIVITY") {
          this.changeTitle = "关联已上线活动";
        } else if (value == "Institution_Page") {
          this.changeTitle = "关联机构";
        } else {
          this.changeTitle = "关联产品";
        }
        // 获取关联产品列表
        this.getproList();
      }
    },
    // 获取关联产品列表
    getproList() {
      this.getProductList(this.productForm).then(data => {
        if (data) {
          if (data.list) {
            this.productArr = data.list;
          }
          if (data.pages) {
            // 获取总页数
            this.pages = data.pages;
          }
        }
      });
    },
    // 关联产品下拉加载
    loadmore() {
      if (this.productForm.pageNum < this.pages) {
        this.productForm.pageNum++;
        this.getproList(this.productForm);
      }
    },
    // 关联产品模糊搜索
    searchChange(value) {
      if (value != "") {
        this.productForm.linkName = value;
      } else {
        this.productForm.linkName = null;
      }
      // 关联产品清空
      this.productArr = [];
      this.getproList(this.productForm);
    },

    // 取消
    cancelFn() {
      this.$refs["ruleForm"].resetFields();
      this.$router.back();
    },
    // 保存
    saveFn(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.ruleMiddleForm = Object.assign({}, this.ruleForm);
          // 删除time的中转数据
          delete this.ruleMiddleForm["selectTime"];
          // 避免自定义发送时间参数 干扰
          if (this.sendType == 0) {
            delete this.ruleMiddleForm["sendTimeList"];
          } else {
            this.ruleMiddleForm.sendTimeList = this.ruleMiddleForm.sendTimeList.map(
              item => {
                return new Date(item).getTime();
              }
            );
          }
          // 产品类型判断
          if (!this.productInfo.defaultType) {
            // 没有附属功能清空附属参数
            delete this.ruleMiddleForm["linkId"];
            delete this.ruleMiddleForm["linkUrl"];
            delete this.ruleMiddleForm["linkName"];
          } else if (
            this.productInfo.defaultType &&
            this.productInfo.inputType
          ) {
            // 附属链接
            delete this.ruleMiddleForm["linkId"];
            delete this.ruleMiddleForm["linkName"];
          } else {
            // 附属关联
            delete this.ruleMiddleForm["linkUrl"];
          }
          // 部分用户才有选择地区
          if (this.ruleMiddleForm.sendTarget == "TOTAL_USER") {
            delete this.ruleMiddleForm["sendLocationList"];
            delete this.ruleMiddleForm["changeLocation"];
          }
          if (this.$route.query.title) {
            this.changePushManage(this.ruleMiddleForm).then(() => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$router.back();
            });
          } else {
            this.addProduct(this.ruleMiddleForm).then(() => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$router.back();
            });
          }
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
// 底部操作按钮
.btn {
  text-align: center;
  .el-button:nth-child(2) {
    margin-left: 20px;
  }
}
// 加黑标题
.boldTitle {
  font-weight: bold;
  position: relative;
  left: -15px;
}
</style>
