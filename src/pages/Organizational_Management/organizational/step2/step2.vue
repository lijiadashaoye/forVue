<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
    </div>
    <div id="forTable" v-if="!isOk">
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=":"
        class="isForm"
        :rules="rules"
      >
        <el-form-item size="mini" label="是否已签约" class="is50">
          <el-radio-group v-model="ruleForm.signedUp" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否在线开户" class="is50">
          <el-radio-group v-model="ruleForm.openedAccount" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否可购买" class="is50">
          <el-radio-group v-model="ruleForm.buyable" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item size="mini" label="是否同卡进出" class="is50">
          <el-radio-group v-model="ruleForm.sameCardIo" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="是否支持绑定多张卡" class="is50">
          <el-radio-group v-model="ruleForm.multipleCards" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="是否可换绑卡" class="is50">
          <el-radio-group v-model="ruleForm.replacementCard" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="是否列表展示" class="is50">
          <el-radio-group v-model="ruleForm.listView" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="是否需要认证授权" class="is50">
          <el-radio-group v-model="ruleForm.needAuthentication" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini" label="是否热门" class="is50">
          <el-radio-group v-model="ruleForm.hotRecommend" class="isInput">
            <el-radio-button label="是" class="isRadio"></el-radio-button>
            <el-radio-button label="否" class="isRadio"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序号" class="is50" prop="topNo">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.topNo"></el-input>
        </el-form-item>

        <div class="form_middle">
          <p>渠道覆盖类型:</p>
          <el-checkbox-group v-model="ruleForm.channel_coverage">
            <el-checkbox
              v-for="(channel,index) of dictData.channel_coverage_type"
              :key="index"
              :label="channel.label"
            ></el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="form_middle">
          <p>产品覆盖类型:</p>
          <el-checkbox-group v-model="ruleForm.product_coverage">
            <el-checkbox
              v-for="(product) of dictData.product_coverage_type"
              :key="product.id"
              :label="product.label"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
        <el-form-item label="安卓开户地址" class="is50" prop="androidOpeningAddress">
          <el-input clearable placeholder="请输入" v-model="ruleForm.androidOpeningAddress"></el-input>
        </el-form-item>

        <el-form-item label="ios 开户地址" class="is50" prop="iosOpeningAddress">
          <el-input clearable placeholder="请输入" v-model="ruleForm.iosOpeningAddress"></el-input>
        </el-form-item>

        <el-form-item label="安卓包名" class="is50" prop="androidPkgName">
          <el-input clearable placeholder="请输入" v-model="ruleForm.androidPkgName"></el-input>
        </el-form-item>

        <el-form-item label="ios 包名" class="is50" prop="iosPkgName">
          <el-input clearable placeholder="请输入" v-model="ruleForm.iosPkgName"></el-input>
        </el-form-item>

        <el-form-item label="安卓H5链接" class="is50" prop="androidH5Link">
          <el-input clearable placeholder="请输入" v-model="ruleForm.androidH5Link"></el-input>
        </el-form-item>

        <el-form-item label="ios H5链接" class="is50">
          <el-input clearable placeholder="请输入" v-model="ruleForm.iosH5Link"></el-input>
        </el-form-item>

        <el-form-item label="银行对接方式" class="is50" prop="connectionMode">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.connectionMode">
            <el-option
              size="mini"
              v-for="item in dictData.bank_connection_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户分类" class="is50" prop="customerClassification">
          <el-select
            filterable
            clearable
            placeholder="请选择"
            v-model="ruleForm.customerClassification"
          >
            <el-option
              size="mini"
              v-for="item in dictData.customer_classification"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="nextButtons">
        <el-button size="mini" type="warning" @click="before">上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="primary" @click="next" :disabled="isSaveIng">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="danger" @click="back" v-if="!fromHttp">取消</el-button>
        <el-button size="mini" type="info" @click="to_xiangqing" v-if="fromHttp">到详情</el-button>
      </div>
    </div>

    <div id="forTable" v-if="isOk&&!editOver">
      <hasSuccess @isOver="isOver" />
    </div>

    <div id="forTable" v-if="isOk&&editOver">
      <div class="successWaper">
        <div class="isOk">
          <span class="myIcon icon-success setText"></span>
          <p class="okText">完成！</p>
        </div>
        <div class="buttons">
          <el-button size="mini" type="primary" @click="to_xiangqing">到详情</el-button>
          <el-button size="mini" type="warning" @click="back">到列表</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hasSuccess from "../../../../components/success.vue";
export default {
  components: { hasSuccess },
  data() {
    // 验证资产规模
    var checkNum = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 11 || ("" + value).length < 0) {
        callback(new Error("请输入1-11字符"));
      } else {
        callback();
      }
    };
    return {
      editOver: false, // 如果是编辑，则要退回到详情页面
      fromHttp: null, // 如果是编辑，则会有值
      isSaveIng: false, // 切换保存按钮的可点击状态
      isOk: false,
      pageName: "", // 当前页面名字
      ruleForm: {
        signedUp: "否", // 是否签约
        openedAccount: "否", // 是否在线开户
        buyable: "否", // 是否可购买
        customerClassification: "", // 客户分类
        channel_coverage: [], // 渠道覆盖类型
        product_coverage: [], //产品覆盖类型
        androidOpeningAddress: "", // Android开户地址
        iosOpeningAddress: "", // IOS开户地址
        androidPkgName: "", // Android包名
        iosPkgName: "", // IOS包名
        androidH5Link: "", // 安卓H5链接
        iosH5Link: "", // IOS H5链接
        listView: "否", // 是否列表展示
        topNo: "", // 排序号
        connectionMode: "", // 银行对接方式
        sameCardIo: "否", // 是否同卡进出
        multipleCards: "否", // 是否支持绑定多张卡
        replacementCard: "否", // 是否可换绑卡
        hotRecommend: "否", // 是否热门
        needAuthentication: "否" // 是否需要认证授权
      },
      dictData: {}, // 数据字典
      //表单验证
      rules: {
        customerClassification: [
          { required: true, message: "请选择机构客户分类", trigger: "change" }
        ],
        connectionMode: [
          { required: true, message: "请选择银行对接方式", trigger: "change" }
        ],
        androidOpeningAddress: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        iosOpeningAddress: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        androidPkgName: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        iosPkgName: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        androidH5Link: [
          { min: 1, max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        topNo: [{ validator: checkNum, trigger: "blur" }]
      }
    };
  },
  mounted() {
    let isEdit = sessionStorage.getItem("jigou_edit");
    if (isEdit) {
      this.pageName = sessionStorage.getItem("page") + " > 编辑机构第一步"; // 获取页面名称
    } else {
      this.pageName = sessionStorage.getItem("page") + " > 新增机构第一步"; // 获取页面名称
    }

    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.fromHttp = sessionStorage.getItem("organizational_http");
    let step2 = sessionStorage.getItem("organizational_step2");
    if (step2) {
      this.ruleForm = JSON.parse(step2);
    }
  },

  methods: {
    next() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let step1 = JSON.parse(
            sessionStorage.getItem("organizational_step1")
          );
          let httpType = "",
            obj = {};
          if (this.fromHttp) {
            // 编辑
            httpType = "put";
            let httpData = JSON.parse(this.fromHttp);

            obj = {
              id: httpData.id,
              uuid: httpData.uuid,
              locationId: "",
              locationName: "",
              name: step1.name,
              subType: step1.type,
              subTypeLabel: "",
              aum: step1.aum,
              logo: step1.logo,
              star: step1.star,
              starLabel: "",
              starRatingDesc: step1.starRatingDesc,
              description: step1.description,
              operator: httpData.operator, // 创建人
              contentVersion: step1.version,
              parentId: step1.parentId ? step1.parentId : "-1",
              parentName: "",
              configuration: {
                id: httpData.configuration.id,
                signedUp: this.ruleForm.signedUp === "是" ? "YES" : "NO",
                customerClassification: this.ruleForm.customerClassification,
                customerClassificationLabel: "",
                openedAccount:
                  this.ruleForm.openedAccount === "是" ? "YES" : "NO",
                buyable: this.ruleForm.buyable === "是" ? "YES" : "NO",
                androidOpeningAddress: this.ruleForm.androidOpeningAddress,
                iosOpeningAddress: this.ruleForm.iosOpeningAddress,
                androidPkgName: this.ruleForm.androidPkgName,
                iosPkgName: this.ruleForm.iosPkgName,
                androidH5Link: this.ruleForm.androidH5Link,
                iosH5Link: this.ruleForm.iosH5Link,
                listView: this.ruleForm.listView === "是" ? "YES" : "NO",
                topNo: this.ruleForm.topNo,
                connectionMode: this.ruleForm.connectionMode,
                connectionModeLabel: "",
                hotRecommend:
                  this.ruleForm.hotRecommend === "是" ? "YES" : "NO",

                sameCardIo: this.ruleForm.sameCardIo === "是" ? "YES" : "NO", // 是否同卡进出
                multipleCards:
                  this.ruleForm.multipleCards === "是" ? "YES" : "NO", // 是否支持绑定多张卡
                replacementCard:
                  this.ruleForm.replacementCard === "是" ? "YES" : "NO", // 是否可换绑卡
                needAuthentication:
                  this.ruleForm.needAuthentication === "是" ? "YES" : "NO", // 是否需要认证授权
                backgroundImage: step1.backgroundImage, // 背景图
                semicircleBackgroundImage: step1.semicircleBackgroundImage, // 半圆背景图
                textLogo: step1.textLogo, // 文字商标
                maintainStartTime: "", // 维护开始时间
                maintainEndTime: "", // 维护结束时间
                serviceTime: "", // 客服服务时间
                version: step1.version //版本标识
              },
              channelCoverageList: [],
              productCoverageList: []
            };

            this.dictData.channel_coverage_type.forEach(item => {
              this.ruleForm.channel_coverage.forEach(str => {
                if (item.label === str) {
                  obj.channelCoverageList.push({
                    institutionUid: httpData.uuid,
                    channelName: item.label,
                    channelCode: item.value
                  });
                }
              });
            });
            this.dictData.product_coverage_type.forEach(item => {
              this.ruleForm.product_coverage.forEach(str => {
                if (item.label === str) {
                  obj.productCoverageList.push({
                    institutionUid: httpData.uuid,
                    productName: item.label,
                    productCode: item.value
                  });
                }
              });
            });
          } else {
            // 新建
            httpType = "post";
            obj = {
              name: step1.name,
              locationId: "",
              locationName: "",
              subType: step1.type,
              subTypeLabel: "",
              parentId: step1.parentId ? step1.parentId : "-1",
              parentName: "",
              aum: step1.aum,
              logo: step1.logo,
              star: step1.star,
              starLabel: "",
              hotLine: step1.hotLine,
              starRatingDesc: step1.starRatingDesc,
              description: step1.description,
              configuration: {
                signedUp: this.ruleForm.signedUp === "是" ? "YES" : "NO",
                customerClassification: this.ruleForm.customerClassification,
                customerClassificationLabel: "",
                hotRecommend:
                  this.ruleForm.hotRecommend === "是" ? "YES" : "NO",
                openedAccount:
                  this.ruleForm.openedAccount === "是" ? "YES" : "NO",
                buyable: this.ruleForm.buyable === "是" ? "YES" : "NO",
                androidOpeningAddress: this.ruleForm.androidOpeningAddress,
                iosOpeningAddress: this.ruleForm.iosOpeningAddress,
                androidPkgName: this.ruleForm.androidPkgName,
                iosPkgName: this.ruleForm.iosPkgName,
                androidH5Link: this.ruleForm.androidH5Link,
                iosH5Link: this.ruleForm.iosH5Link,
                listView: this.ruleForm.listView === "是" ? "YES" : "NO",
                topNo: this.ruleForm.topNo,
                connectionMode: this.ruleForm.connectionMode,
                connectionModeLabel: "",
                sameCardIo: this.ruleForm.sameCardIo === "是" ? "YES" : "NO", // 是否同卡进出
                multipleCards:
                  this.ruleForm.multipleCards === "是" ? "YES" : "NO", // 是否支持绑定多张卡
                replacementCard:
                  this.ruleForm.replacementCard === "是" ? "YES" : "NO", // 是否可换绑卡
                needAuthentication:
                  this.ruleForm.needAuthentication === "是" ? "YES" : "NO", // 是否需要认证授权
                backgroundImage: step1.backgroundImage, // 背景图
                semicircleBackgroundImage: step1.semicircleBackgroundImage, // 半圆背景图
                textLogo: step1.textLogo, // 文字商标
                maintainStartTime: "", // 维护开始时间
                maintainEndTime: "", // 维护结束时间
                serviceTime: "", // 客服服务时间
                version: step1.version //版本标识
              },
              channelCoverageList: [],
              productCoverageList: []
            };

            this.dictData.channel_coverage_type.forEach(item => {
              this.ruleForm.channel_coverage.forEach(str => {
                if (item.label === str) {
                  obj.channelCoverageList.push({
                    channelName: item.label,
                    channelCode: item.value
                  });
                }
              });
            });
            this.dictData.product_coverage_type.forEach(item => {
              this.ruleForm.product_coverage.forEach(str => {
                if (item.label === str) {
                  obj.productCoverageList.push({
                    productName: item.label,
                    productCode: item.value
                  });
                }
              });
            });
          }

          // 查询区域数据，填充location数组
          if (step1.locationId.length) {
            obj.locationId = step1.locationId[step1.locationId.length - 1];
            wap: for (let i = this.dictData.quyu.length; i--; ) {
              if (this.dictData.quyu[i].value == obj.locationId) {
                obj.locationName = this.dictData.quyu[i].label;
                break wap;
              } else {
                let child = this.dictData.quyu[i].children;
                if (child) {
                  for (let j = child.length; j--; ) {
                    if (child[j].value == obj.locationId) {
                      obj.locationName =
                        this.dictData.quyu[i].label + "/" + child[j].label;
                      break wap;
                    }
                  }
                }
              }
            }
          }
          
          if (step1.serviceTime.length) {
            obj.configuration.serviceTime =
              step1.serviceTime[0] + " " + step1.serviceTime[1];
          }
          if (step1.weihu.length) {
            obj.configuration.maintainStartTime = step1.weihu[0];
            obj.configuration.maintainEndTime = step1.weihu[1];
          }

          this.dictData.bank_connection_mode.forEach(item => {
            if (item.value === this.ruleForm.connectionMode) {
              obj.configuration.connectionModeLabel = item.label;
            }
          });

          this.dictData.bank_type.forEach(item => {
            if (item.value === step1.type) {
              obj.subTypeLabel = item.label;
            }
          });

          this.dictData.institution_star.forEach(item => {
            if (item.value == step1.star) {
              obj.starLabel = item.label;
            }
          });
          this.dictData.customer_classification.forEach(item => {
            if (item.value === this.ruleForm.customerClassification) {
              obj.configuration.customerClassificationLabel = item.label;
            }
          });
          this.dictData.paren.forEach(item => {
            if (item.id === step1.parentId) {
              obj.parentName = item.name;
            }
          });

          this.isSaveIng = true;
          this.$api
            .add_newJiGou({
              vm: this,
              data: obj,
              httpType: httpType
            })
            .then(res => {
              this.isSaveIng = false;
              if (res) {
                this.$store.dispatch("get_dict", this).then(res => {
                  sessionStorage.setItem("dict", JSON.stringify(res));
                  this.isOk = true;
                  if (this.fromHttp) {
                    this.editOver = true;
                  }
                });
              }
            });
        }
      });
    },
    // 返回到详情页
    to_xiangqing() {
      let httpData = JSON.parse(this.fromHttp);
      sessionStorage.removeItem("jigou_edit");
      sessionStorage.removeItem("organizational_step1");
      sessionStorage.removeItem("organizational_step2");
      sessionStorage.removeItem("organizational_http");
      this.$router.push({
        name: "organizational_info",
        query: {
          id: httpData.id,
          institutionName: httpData.name
        }
      });
    },
    // 新增的保存完毕
    isOver(type) {
      sessionStorage.setItem("page", "机构管理 ");
      sessionStorage.removeItem("jigou_edit");
      if (type === "back") {
        this.$router.push({ name: `organizational_mainPage` });
      } else {
        sessionStorage.removeItem("organizational_step1");
        sessionStorage.removeItem("organizational_step2");
        sessionStorage.removeItem("organizational_http");
        this.$router.push({ name: `organizational_step1` });
      }
    },
    // 取消
    back() {
      this.$router.push({
        name: "organizational_mainPage"
      });
    },
    // 上一步
    before() {
      sessionStorage.setItem(
        "organizational_step2",
        JSON.stringify(this.ruleForm)
      );
      this.$router.push({
        name: "organizational_step1"
      });
    }
  }
};
</script>
