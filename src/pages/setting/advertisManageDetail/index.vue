<template>
  <div class="componentWaper">
    <div id="forHeader">
      <div class="headerName">
        <p class="isPageName">
          <span :class="env?'lineSpan1':'lineSpan'">|</span>
          位置：{{$store.state.for_layout.titles}}{{pageName}}
        </p>
        <el-button size="mini" type="warning" @click="goBack">返回</el-button>
      </div>
    </div>

    <div id="forTable" style="background:#fff;">
      <el-form
        ref="ruleForm"
        style="width:500px;margin:30px auto;"
        :model="ruleForm"
        labelWidth="200px"
        label-position="left"
      >
        <el-form-item
          label="app标识"
          :rules="[
                              { required: true, message: '请选择app标识', trigger: 'change' }
                             ]"
        >
          <el-select filterable disabled v-model="ruleForm.appChannelCode">
            <el-option
              v-for="item in appChannelCodeList"
              :key="item.code"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告标题" prop="advertisTitle">
          <el-input placeholder="请输入" readonly v-model="ruleForm.advertisTitle"></el-input>
        </el-form-item>
        <el-form-item
          label="广告副标题"
          prop="advertisViceTitle"
          :rules="[
                              { required: true, message: '请输入广告副标题', trigger: 'blur' }
                             ]"
        >
          <el-input placeholder="请输入" readonly v-model="ruleForm.advertisViceTitle"></el-input>
        </el-form-item>
        <el-form-item label="广告排序" prop="sort">
          <el-input placeholder="请输入" readonly v-model="ruleForm.sort"></el-input>
        </el-form-item>

        <el-form-item label="广告可见类型" prop="visualType">
          <template>
            <el-radio-group disabled v-model="ruleForm.visualType">
              <el-radio label="NO_LIMIT">不限定</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="广告位置" prop="advertisLocation">
          <el-select filterable disabled v-model="ruleForm.advertisLocation" placeholder="请选择">
            <el-option
              v-for="item in advertisLocationList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="广告显示类型" prop="showType">
          <template>
            <el-radio disabled v-model="ruleForm.showType" label="BANNER">横幅</el-radio>
            <el-radio disabled v-model="ruleForm.showType" label="INFORMATION">信息流</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="广告类型" prop="advertisType">
          <el-select
            filterable
            v-model="ruleForm.advertisType"
            clearable
            placeholder="请选择广告类型"
            @change="typeSelect(ruleForm.advertisType)"
          >
            <el-option
              v-for="(item,ind) in advertisTypeList"
              :key="ind"
              :label="item.linkName"
              :value="item.linkModel"
            >
              <span style="float: left">{{ item.linkName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="inputFlag"
          label="链接地址"
          prop="advertisUrl"
          :rules="[
                        { required: true, message: '请输入链接地址', trigger: 'blur' }
                        ]"
        >
          <el-input v-model="ruleForm.advertisUrl" placeholder="请输入链接地址"></el-input>
        </el-form-item>

        <el-form-item v-else label="关联产品" prop="associatedProducts">
          <el-select
            filterable
            v-model="ruleForm.associatedProducts"
            clearable
            remote
            reserve-keyword
            :remote-method="fuzzySearch"
            v-loadmore="loadmore"
            placeholder="请选择关联产品"
          >
            <el-option
              v-for="(item,ind) in associatedProductsList"
              :key="ind"
              :label="item.name"
              :value="item.id"
            >
              <span style="float: left">{{ item.institutionName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="advertisImageUrl" label="广告图片">
          <img :src="ImgBaseUrl + ruleForm.advertisImageUrl" class="avatar" />
        </el-form-item>
        <el-form-item label="广告开始时间" prop="startTime">
          <el-date-picker
            readonly
            v-model="ruleForm.startTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="广告结束时间" prop="endTime">
          <el-date-picker readonly v-model="ruleForm.endTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="推广用户"></el-form-item>
        <el-form-item label="用户选择" prop="spreadUser">
          <template>
            <el-radio disabled v-model="ruleForm.spreadUser" label="TOTAL">发送给全部用户</el-radio>
            <el-radio disabled v-model="ruleForm.spreadUser" label="PORTION">发送给部分用户</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="添加关联组" v-if="ruleForm.spreadUser != 'TOTAL'">
          <el-select filterable disabled v-model="ruleForm.linkGroup" placeholder="请选择">
            <el-option
              v-for="item in linkGroupList"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广地区选择" v-if="ruleForm.spreadUser != 'TOTAL'">
          <template>
            <el-radio disabled v-model="ruleForm.promoteArea" label="PHONE">按手机号归属地</el-radio>
            <el-radio disabled v-model="ruleForm.promoteArea" label="LOCATION">最后一次登录所在地</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="选择省份" v-if="ruleForm.spreadUser != 'TOTAL'">
          <el-select
            filterable
            disabled
            v-model="ruleForm.spreadLocation"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in spreadLocationList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.spreadUser != 'TOTAL'">
          <div class="tag">
            <el-tag v-for="tag in tagsList" :key="tag.id">{{tag.name}}</el-tag>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  adverdis_detail,
  productUrl_list,
  productList
} from "../../../api/setting_use";
export default {
  props: {},
  components: {},
  data() {
    return {
      env: null,
      appChannelCodeList: [
        // app 标识
        { code: "bicai", name: "比财" },
        { code: "ancai", name: "安财" }
      ],
      inputFlag: false,
      timeout: null, // 关联延时
      relatedInformationList: [], // 关联资讯假数据
      associatedProductsList: [], // 关联产品假数据
      isAdvertisType: false, // 控制广告类型选择
      tagsList: [],
      pageName: "", // 当前页面名字
      list: [],
      spreadLocationList: [
        // 地区假数据
        { id: "0", name: "北京" },
        { id: "1", name: "上海" },
        { id: "2", name: "山西" }
      ], // 省份
      linkGroupList: [
        // 关联组list
        { key: 0, name: "暂无" }
      ],
      advertisTypeList: [], // 广告类型list
      advertisLocationList: [
        { key: "BANNER", value: "发现横幅广告" },
        { key: "FIND_FINANCING", value: "发现理财圈广告" },
        { key: "ADD_FINANCING", value: "新增理财圈列表广告" },
        { key: "ADD_RANKING", value: "新增排行榜横幅广告" },
        { key: "ADD_SIDE", value: "新增侧边栏Banner" },
        { key: "ADD_HOME", value: "新增首页Banner" }
      ], // 广告位置list
      ruleForm: {
        // 表单数据
        multilingual: "CN", // 多语言
        advertisTitle: "", // 标题
        advertisViceTitle: "", // 付标题
        advertisLocation: "", // 广告位置
        appChannelCode: "比财", // 应用渠道code
        appChannelName: "", // 应用渠道name
        advertisType: "", // 广告类型
        advertisId: "", // 广告id
        sort: "", // 广告排序
        visualType: "NO_LIMIT", // 广告可见类型
        showType: "INFORMATION", // 广告显示类型
        advertisUrl: "", // 广告跳转链接url
        relatedInformation: "", // 缺 关联资讯
        associatedProducts: "", // 缺 关联产品
        spreadUser: "TOTAL", // 推广用户(TOTAL:全部用户 PORTION:部分用户)
        promoteArea: "", // 推广地区选择
        spreadLocation: [], // 推广地区
        linkGroup: "", // 关联组
        advertisImageUrl: "", // 广告图片地址
        startTime: "", // 广告开始时间
        endTime: "" // 广告结束时间
      },
      productForm: {
        pageSize: 200,
        pageNum: 1,
        linkModel: "",
        name: null
      },
      ImgBaseUrl: ""
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.ImgBaseUrl = this.$ImgBaseUrl;
    productUrl_list().then(res => {
      if (res && res.success) {
        this.advertisTypeList = res.data.list;
      }
    });
    this.pageName = this.$route.name.trim();
    this.infoFn();
  },
  watch: {
    ruleForm: {
      handler() {
        if (this.ruleForm.advertisLocation == "ADD_FINANCING") {
          this.isAdvertisType = false;
        } else {
          this.isAdvertisType = true;
        }
        if (
          this.ruleForm.spreadLocation &&
          this.ruleForm.spreadLocation.length >= 0
        ) {
          this.tagsList = [];
          for (let i = 0; i < this.spreadLocationList.length; i++) {
            for (let j = 0; j < this.ruleForm.spreadLocation.length; j++) {
              if (
                this.spreadLocationList[i].id == this.ruleForm.spreadLocation[j]
              ) {
                let obj = {
                  id: this.spreadLocationList[i].id,
                  name: this.spreadLocationList[i].name
                };
                this.tagsList.push(obj);
              }
            }
          }
        }
      },
      deep: true
    }
  },
  methods: {
    // 返回
    goBack() {
      this.$router.back();
    },
    loadmore() {
      if (this.productForm.pageNum < this.productPageCount) {
        this.productForm.pageNum++;
        this.getproList(this.productForm);
      }
    },
    fuzzySearch(query) {
      if (query != "" && this.ruleForm.advertisType != "") {
        this.associatedProductsList = [];
        this.productForm.linkName = query;
        this.productForm.linkModel = this.ruleForm.advertisType;
        this.getproList(this.productForm);
      } else {
        this.associatedProductsList = [];
        this.productForm.linkName = null;
        this.productForm.linkModel = this.ruleForm.advertisType;
        this.getproList(this.productForm);
      }
    },
    getproList(form) {
      productList(form)
        .then(res => {
          if (res && res.success) {
            this.productPageCount =
              res.data && Math.ceil(res.data.total / this.productForm.pageSize);
            if (res.data && res.data.list != null && res.data.list != []) {
              const _res = res.data.list;
              this.associatedProductsList = [
                ...this.associatedProductsList,
                ..._res
              ];
            }
          }
        })
        .catch(res => {
          this.$message.error(`${res.message}`);
        });
    },
    //选中产品类型
    typeSelect(val) {
      this.ruleForm.associatedProducts = "";
      this.productForm = {
        pageSize: 200,
        pageNum: 1,
        linkModel: "",
        name: null
      };
      if (val == "EXTERNAL_LINK") {
        this.inputFlag = true;
      } else {
        this.inputFlag = false;
        this.associatedProductsList = [];
        if (val != "" && val != null) {
          this.productForm.linkModel = val;
          this.getproList(this.productForm);
        }
      }
    },
    // 详情
    infoFn() {
      let params = {
        id: this.$route.query.id
      };
      adverdis_detail(params).then(res => {
        if (res) {
          var val = res.data.productRelationDetailsVo.productType;
          if (val == "EXTERNAL_LINK") {
            this.inputFlag = true;
          } else {
            this.inputFlag = false;
            this.associatedProductsList = [];
            if (val != "" && val != null) {
              this.productForm.linkModel = val;
              this.getproList(this.productForm);
            }
          }
          this.ruleForm.multilingual = res.data.multilingual; // 多语言
          this.ruleForm.advertisTitle = res.data.advertisTitle; // 标题
          this.ruleForm.advertisViceTitle = res.data.advertisViceTitle; // 付标题
          this.ruleForm.advertisLocation = res.data.advertisLocation; // 广告位置
          this.ruleForm.appChannelCode = res.data.appChannelCode; // 应用渠道code
          this.ruleForm.appChannelName = res.data.appChannelName; // 应用渠道name
          this.ruleForm.advertisType =
            res.data.productRelationDetailsVo.productType; // 广告类型
          this.ruleForm.advertisUrl = res.data.productRelationDetailsVo.linkUrl; // 广告类型
          this.ruleForm.associatedProducts =
            res.data.productRelationDetailsVo.linkId; // 广告类型
          this.productId =
            res.data.productRelationDetailsVo.id != "" &&
            res.data.productRelationDetailsVo.id != null
              ? res.data.productRelationDetailsVo
              : null;
          this.ruleForm.sort = res.data.sort; // 广告排序
          this.ruleForm.visualType = res.data.visualType; // 广告可见类型
          this.ruleForm.showType = res.data.showType; // 广告显示类型
          this.ruleForm.spreadUser = res.data.spreadUser; // 推广用户(TOTAL:全部用户 PORTION:部分用户)
          this.ruleForm.promoteArea = res.data.promoteArea; // 推广地区
          this.ruleForm.spreadLocation = res.data.spreadLocation; // 推广地区
          this.ruleForm.linkGroup = res.data.linkGroup; // 关联组
          this.ruleForm.advertisImageUrl = res.data.advertisImageUrl; // 广告图片地址
          this.ruleForm.startTime = res.data.startTime; // 广告开始时间
          this.ruleForm.endTime = res.data.endTime;
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
.avatar {
  width: 200px;
  height: 200px;
}
.t-btn {
  float: right;
}
</style>
