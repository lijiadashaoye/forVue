<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
    </div>
    <div
      id='forTable'
      v-if="!isOk"
    >
      <el-form
        ref="ruleForm"
        size="normal"
        :model="ruleForm"
        label-width="150px"
        label-suffix=':'
        class="isForm"
        :rules="rules"
      >

        <el-form-item
          size="mini"
          label="是否已签约"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.signedUp"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>

        </el-form-item>

        <el-form-item
          size="mini"
          label="是否在线开户"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.openedAccount"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>

        </el-form-item>

        <el-form-item
          size="mini"
          label="是否可购买"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.buyable"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="客户分类"
          class="is50"
          prop="kehufenlei"
        >
          <el-select
            clearable
            placeholder="请选择"
            v-model="ruleForm.customerClassification"
          >
            <el-option
              size='mini'
              v-for="item in dictData.customer_classification"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
        <el-form-item
          label="安卓开户地址"
          class="is50"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.androidOpeningAddress"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="ios 开户地址"
          class="is50"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.iosOpeningAddress"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="安卓包名"
          class="is50"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.androidPkgName"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="ios 包名"
          class="is50"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.iosPkgName"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="安卓H5链接"
          class="is50"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.androidH5Link"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="ios H5链接"
          class="is50"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.iosH5Link"
          ></el-input>
        </el-form-item>

        <el-form-item
          size="mini"
          label="是否打通OpenApi"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.directConnect"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          size="mini"
          label="是否列表展示"
          class="is50"
        >
          <el-radio-group
            v-model="ruleForm.listView"
            class="isInput"
          >
            <el-radio-button
              label="是"
              class="isRadio"
            ></el-radio-button>
            <el-radio-button
              label="否"
              class="isRadio"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="排序号"
          class="is50"
        >
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.topNo"
          ></el-input>
        </el-form-item>

      </el-form>

      <div class="nextButtons">
        <el-button
          size="mini"
          type="primary"
          @click="before"
        >上一步</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button
          size="mini"
          type="primary"
          @click="next"
          :disabled="isSaveIng"
        >保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button
          size="mini"
          type="info"
          @click="back"
        >取消</el-button>
      </div>
    </div>

    <div
      id="forTable"
      v-if="isOk"
    >
      <hasSuccess @isOver="isOver" />
    </div>

  </div>
</template>
<script>
import hasSuccess from "../../../../components/success.vue";
export default {
  components: { hasSuccess },
  data() {
    return {
      isSaveIng: false, // 切换保存按钮的可点击状态
      isOk: false,
      pageName: "", // 当前页面名字
      ruleForm: {
        signedUp: "", // 是否签约
        openedAccount: "", // 是否在线开户
        buyable: "", // 是否可购买
        customerClassification: "", // 客户分类
        channel_coverage: [], // 渠道覆盖类型
        product_coverage: [], //产品覆盖类型
        androidOpeningAddress: "", // Android开户地址
        iosOpeningAddress: "", // IOS开户地址
        androidPkgName: "", // Android包名
        iosPkgName: "", // IOS包名
        androidH5Link: "", // 安卓H5链接
        iosH5Link: "", // IOS H5链接
        directConnect: "", // 是否银行直连（OpenAPI）
        listView: "", // 是否列表展示
        topNo: "" // 置顶序号
      },
      dictData: {}, // 数据字典
      //表单验证
      rules: {
        kehufenlei: [
          { required: true, message: "请选择机构客户分类", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page") + " > 新增机构第二步"; // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    let step2 = sessionStorage.getItem("organizational_step2");
    if (step2) {
      this.ruleForm = JSON.parse(step2);
    }
  },

  methods: {
    next() {
      let step1 = JSON.parse(sessionStorage.getItem("organizational_step1"));
      let fromHttp = sessionStorage.getItem("organizational_http");
      let httpType = "",
        obj = {};

      if (fromHttp) {
        // 编辑
        httpType = "put";
        let httpData = JSON.parse(fromHttp);
        obj = {
          id: httpData.id,
          institutionId: httpData.institutionId,
          locationId: step1.locationId,
          locationName: "",
          name: step1.name,
          type: step1.type,
          typeLabel: "",
          aum: step1.aum,
          logo: step1.logo,
          starRatingDesc: step1.starRatingDesc,
          description: step1.description,
          operator: httpData.operator,
          contentVersion: httpData.contentVersion,
          parentId: step1.parentId ? step1.parentId : "-1",
          parentName: "",
          configuration: {
            id: httpData.configuration.id,
            signedUp: this.ruleForm.signedUp === "是" ? "YES" : "NO",
            customerClassification: this.ruleForm.customerClassification,
            customerClassificationLabel: "",
            openedAccount: this.ruleForm.openedAccount === "是" ? "YES" : "NO",
            buyable: this.ruleForm.buyable === "是" ? "YES" : "NO",
            androidOpeningAddress: this.ruleForm.androidOpeningAddress,
            iosOpeningAddress: this.ruleForm.iosOpeningAddress,
            androidPkgName: this.ruleForm.androidPkgName,
            iosPkgName: this.ruleForm.iosPkgName,
            androidH5Link: this.ruleForm.androidH5Link,
            iosH5Link: this.ruleForm.iosH5Link,
            directConnect: this.ruleForm.directConnect === "是" ? "YES" : "NO",
            listView: this.ruleForm.listView === "是" ? "YES" : "NO",
            topNo: this.ruleForm.topNo
          },
          channelCoverageList: [],
          productCoverageList: []
        };

        this.dictData.channel_coverage_type.forEach(item => {
          this.ruleForm.channel_coverage.forEach(str => {
            if (item.label === str) {
              obj.channelCoverageList.push({
                institutionId: httpData.institutionId,
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
                institutionId: httpData.institutionId,
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
          locationId: step1.locationId,
          locationName: "",
          type: step1.type,
          typeLabel: "",
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
            openedAccount: this.ruleForm.openedAccount === "是" ? "YES" : "NO",
            buyable: this.ruleForm.buyable === "是" ? "YES" : "NO",
            androidOpeningAddress: this.ruleForm.androidOpeningAddress,
            iosOpeningAddress: this.ruleForm.iosOpeningAddress,
            androidPkgName: this.ruleForm.androidPkgName,
            iosPkgName: this.ruleForm.iosPkgName,
            androidH5Link: this.ruleForm.androidH5Link,
            iosH5Link: this.ruleForm.iosH5Link,
            directConnect: this.ruleForm.directConnect === "是" ? "YES" : "NO",
            listView: this.ruleForm.listView === "是" ? "YES" : "NO",
            topNo: this.ruleForm.topNo
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

      this.dictData.institution_type.forEach(item => {
        if (item.id === step1.type) {
          obj.typeLabel = item.label;
        }
      });

      this.dictData.institution_star.forEach(item => {
        if (item.id === step1.star) {
          obj.starLabel = item.label;
        }
      });
      this.dictData.customer_classification.forEach(item => {
        if (item.id === this.ruleForm.customerClassification) {
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
            this.isOk = true;
          }
        });
    },
    isOver(type) {
      sessionStorage.setItem("page", "机构管理 ");
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
