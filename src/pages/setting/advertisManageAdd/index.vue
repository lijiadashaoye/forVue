<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div id="forTable" style="background:#fff;">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        labelWidth="200px"
        label-position="left"
        style="width:500px;margin:30px auto;"
      >
        <el-form-item
          label="app标识"
          :rules="[
              { required: true, message: '请选择app标识', trigger: 'change' }
            ]"
        >
          <el-select filterable v-model="ruleForm.appChannelCode">
            <el-option
              v-for="(item,index) in appChannelCodeList"
              :key="index"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="广告标题"
          prop="advertisTitle"
          :rules="[
            { required: true, message: '请输入广告标题', trigger: 'blur' }
            ]"
        >
          <el-input
            placeholder="请输入"
            v-model="ruleForm.advertisTitle"
            maxlength="18"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item
          label="广告副标题"
          prop="advertisViceTitle"
          :rules="[{ required: true, message: '请输入广告副标题', trigger: 'blur' }]"
        >
          <el-input
            placeholder="请输入"
            v-model="ruleForm.advertisViceTitle"
            maxlength="18"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item
          label="广告排序"
          prop="sort"
          :rules="[
              { required: true, message: '请输入广告排序', trigger: 'blur' },
              { pattern: /^\+?[1-9]\d*$/,message: '只能输入大于0的正整数', trigger: 'blur' }
            ]"
        >
          <el-input placeholder="请输入" v-model.number="ruleForm.sort" maxlength="6" show-word-limit></el-input>
        </el-form-item>

        <el-form-item
          label="广告可见类型"
          prop="visualType"
          :rules="[
            { required: true, message: '请选择广告可见类型', trigger: 'change' },
            ]"
        >
          <template>
            <el-radio-group v-model="ruleForm.visualType">
              <el-radio label="NO_LIMIT">不限定</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item
          label="广告位置"
          prop="advertisLocation"
          :rules="[
            { required: true, message: '请选择广告位置', trigger: 'change' }
            ]"
        >
          <el-select
            filterable
            v-model="ruleForm.advertisLocation"
            placeholder="请选择"
            @change="changeAdvertisLocation"
          >
            <el-option
              v-for="item in advertisLocationList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="广告显示类型"
          prop="showType"
          :rules="[
            { required: true, message: '请选择广告显示类型', trigger: 'change' },
            ]"
        >
          <template>
            <el-radio v-model="ruleForm.showType" label="BANNER" :disabled="bannerFlag">横幅</el-radio>
            <el-radio
              v-model="ruleForm.showType"
              label="INFORMATION"
              :disabled="informationFlag"
            >信息流</el-radio>
          </template>
        </el-form-item>

        <el-form-item
          label="广告类型"
          prop="advertisType"
          :rules="[
            { required: true, message: '请选择广告类型', trigger: 'change' }
            ]"
        >
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
          <el-input
            v-model="ruleForm.advertisUrl"
            maxlength="100"
            show-word-limit
            placeholder="请输入链接地址"
          ></el-input>
        </el-form-item>

        <el-form-item v-else label="关联产品" prop="associatedProducts">
          <el-select
            filterable
            v-model="ruleForm.associatedProducts"
            v-loadmore="loadmore"
            clearable
            remote
            reserve-keyword
            :remote-method="fuzzySearch"
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

        <el-form-item
          prop="advertisImageUrl"
          label="广告图片"
          :rules="[{ required: true, message: '请选择图片', trigger: 'change' }]"
        >
          <el-upload
            class="avatar-uploader"
            action="customize"
            :show-file-list="false"
            :http-request="upload"
            v-loading="advertisImageUrlLoading"
          >
            <img
              v-if="ruleForm.advertisImageUrl"
              :src="ImgBaseUrl + ruleForm.advertisImageUrl"
              width="200px"
            />
            <div v-else>
              <el-button>
                选择图片
                <br />
                <span style="font-size:12px;color:red">不能大于2M</span>
                <br />
                <span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span>
              </el-button>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item
          label="广告开始时间"
          prop="startTime"
          :rules="[
            { required: true, message: '请输入广告开始时间', trigger: 'change' }
            ]"
        >
          <el-date-picker v-model="ruleForm.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item
          label="广告结束时间"
          prop="endTime"
          :rules="[
            { required: true, message: '请输入广告结束时间', trigger: 'change' },
            ]"
        >
          <el-date-picker
            v-model="ruleForm.endTime"
            type="datetime"
            placeholder="选择日期时间"
            :picker-options="pickerEndDate"
            :disabled="endTimeSelect"
            @focus="endTimeCheck"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="推广用户"></el-form-item>
        <el-form-item label="用户选择" prop="spreadUser">
          <template>
            <el-radio v-model="ruleForm.spreadUser" label="TOTAL">发送给全部用户</el-radio>
            <el-radio v-model="ruleForm.spreadUser" label="PORTION" :disabled="true">发送给部分用户</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="添加关联组" v-if="ruleForm.spreadUser != 'TOTAL'">
          <el-select filterable v-model="ruleForm.linkGroup" placeholder="请选择">
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
            <el-radio v-model="ruleForm.promoteArea" label="PHONE">按手机号归属地</el-radio>
            <el-radio v-model="ruleForm.promoteArea" label="LOCATION">最后一次登录所在地</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="选择省份" v-if="ruleForm.spreadUser != 'TOTAL'">
          <el-select filterable v-model="ruleForm.spreadLocation" multiple placeholder="请选择">
            <el-option
              v-for="item in spreadLocationList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.spreadUser != 'TOTAL'">
          <div class="tag">
            <el-tag
              v-for="tag in tagsList"
              :key="tag.id"
              closable
              @close="handleClose(tag)"
            >{{tag.name}}</el-tag>
          </div>
        </el-form-item>
       <div class="bottomBtn">
          <el-button type="primary" @click="saveFn('ruleForm')">保存</el-button>
          <el-button @click="cancelFn">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  adverdis_add,
  adverdis_detail,
  adverdis_edit,
  upLoadImg,
  productUrl_list,
  productList
} from "../../../api/setting_use";
export default {
  props: {},
  components: {},
  data() {
    return {
      env: null,
      endTimeSelect: true,
      advertisImageUrlLoading: false,
      pickerEndDate: {
        disabledDate: time => {
          if (this.ruleForm.startTime) {
            return time.getTime() < new Date(this.ruleForm.startTime).getTime();
          }
        }
      },
      appChannelCodeList: [
        // app 标识
        { code: "bicai", name: "比财" },
        { code: "ancai", name: "安财" }
      ],
      productId: "", //产品对象id
      inputFlag: false,
      timeout: null, // 关联延时
      associatedProductsList: [], // 关联产品
      bannerFlag: false, // 控制广告类型选择
      informationFlag: false,
      tagsList: [],
      pageName: "", // 当前页面名字
      list: [],
      spreadLocationList: [
        // 地区假数据
        {
          label: "北京",
          value: "北京"
        },
        {
          label: "天津",
          value: "天津"
        },
        {
          label: "上海",
          value: "上海"
        },
        {
          label: "重庆",
          value: "重庆"
        },
        {
          label: "河北",
          value: "河北"
        },
        {
          label: "山西",
          value: "山西"
        },
        {
          label: "辽宁",
          value: "辽宁"
        },
        {
          label: "吉林",
          value: "吉林"
        },
        {
          label: "黑龙江",
          value: "黑龙江"
        },
        {
          label: "江苏",
          value: "江苏"
        },
        {
          label: "浙江",
          value: "浙江"
        },
        {
          label: "安徽",
          value: "安徽"
        },
        {
          label: "福建",
          value: "福建"
        },
        {
          label: "江西",
          value: "江西"
        },
        {
          label: "山东",
          value: "山东"
        },
        {
          label: "河南",
          value: "河南"
        },
        {
          label: "湖北",
          value: "湖北"
        },
        {
          label: "湖南",
          value: "湖南"
        },
        {
          label: "广东",
          value: "广东"
        },
        {
          label: "海南",
          value: "海南"
        },
        {
          label: "四川",
          value: "四川"
        },
        {
          label: "贵州",
          value: "贵州"
        },
        {
          label: "云南",
          value: "云南"
        },
        {
          label: "陕西",
          value: "陕西"
        },
        {
          label: "甘肃",
          value: "甘肃"
        },
        {
          label: "青海",
          value: "青海"
        },
        {
          label: "内蒙古",
          value: "内蒙古"
        },
        {
          label: "广西",
          value: "广西"
        },
        {
          label: "西藏",
          value: "西藏"
        },
        {
          label: "宁夏",
          value: "宁夏"
        },
        {
          label: "新疆维吾尔自治区",
          value: "新疆维吾尔自治区"
        },
        {
          label: "香港",
          value: "香港"
        },
        {
          label: "澳门",
          value: "澳门"
        },
        {
          label: "台湾",
          value: "台湾"
        }
      ], // 省份
      linkGroupList: [
        // 关联组list
        { key: 0, name: "暂无" }
      ],
      advertisTypeList: [], // 广告类型list
      advertisLocationList: [
        { key: "BANNER", value: "发现横幅广告" },
        { key: "FIND_FINANCING", value: "发现理财圈广告" },
        { key: "ADD_FINANCING", value: "理财圈列表广告" },
        { key: "ADD_RANKING", value: "排行榜横幅广告" },
        { key: "ADD_SIDE", value: "侧边栏Banner" },
        { key: "ADD_HOME", value: "首页Banner" }
      ], // 广告位置list
      ruleForm: {
        // 表单数据
        multilingual: "CN", // 多语言
        advertisTitle: "", // 标题
        advertisViceTitle: "", // 付标题
        advertisLocation: "", // 广告位置
        appChannelCode: "", // 应用渠道code
        appChannelName: "", // 应用渠道name
        advertisType: "", // 广告类型
        advertisId: "", // 广告id
        sort: "", // 广告排序
        visualType: "NO_LIMIT", // 广告可见类型
        showType: "", // 广告显示类型
        advertisUrl: "", // 广告跳转链接url
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
  watch: {
    ruleForm: {
      handler() {
        if (this.ruleForm.advertisLocation == "FIND_FINANCING") {
          this.bannerFlag = true;
          this.informationFlag = false;
        } else if (this.ruleForm.advertisLocation == "ADD_FINANCING") {
          this.bannerFlag = false;
          this.informationFlag = false;
        } else {
          this.bannerFlag = false;
          this.informationFlag = true;
        }
        if (
          this.ruleForm.spreadLocation &&
          this.ruleForm.spreadLocation.length >= 0
        ) {
          this.tagsList = [];
          for (let i = 0; i < this.spreadLocationList.length; i++) {
            for (let j = 0; j < this.ruleForm.spreadLocation.length; j++) {
              if (
                this.spreadLocationList[i].value ==
                this.ruleForm.spreadLocation[j]
              ) {
                let obj = {
                  id: this.spreadLocationList[i].value,
                  name: this.spreadLocationList[i].label
                };
                this.tagsList.push(obj);
              }
            }
          }
        }
      },
      deep: true
    },
    "ruleForm.startTime"() {
      if (this.ruleForm.startTime != "" && this.ruleForm.startTime != null) {
        this.endTimeSelect = false;
      } else {
        this.endTimeSelect = true;
      }
    }
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.ImgBaseUrl = this.$ImgBaseUrl;
    productUrl_list().then(res => {
      if (res && res.success) {
        this.advertisTypeList = res.data.list;
      }
    });
    if (this.$route.query.id) {
      this.pageName = "编辑广告";
      this.infoFn();
    } else {
      this.pageName = "创建广告";
    }
  },
  methods: {
    endTimeCheck() {
      if (this.ruleForm.startTime != "" && this.ruleForm.startTime != null) {
        this.endTimeSelect = false;
      } else {
        this.endTimeSelect = true;
      }
    },
    changeAdvertisLocation() {
      this.ruleForm.showType = "";
    },
    // 关闭tag
    handleClose(tag) {
      this.ruleForm.spreadLocation.forEach((t, i) => {
        if (tag.id == t) {
          this.ruleForm.spreadLocation.splice(i, 1);
        }
      });
    },
    loadmore() {
      if (this.productForm.pageNum < this.productPageCount) {
        this.productForm.pageNum++;
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
        this.ruleForm.advertisUrl = null;
        this.associatedProductsList = [];

        if (val != "" && val != null) {
          this.productForm.linkModel = val;
          this.getproList(this.productForm);
        }
      }
    },
    //图片上传
    upload(params) {
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
      this.advertisImageUrlLoading = true;
      upLoadImg(formData).then(res => {
        if (res && res.success) {
          this.advertisImageUrlLoading = false;
          this.ruleForm.advertisImageUrl = res.data;
        }
      });
    },
    // 详情
    infoFn() {
      let params = {
        id: this.$route.query.id
      };
      adverdis_detail(params).then(res => {
        if (res) {
          var val = res.data.productRelationDetailsVo
            ? res.data.productRelationDetailsVo.productType
            : null;
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
          this.ruleForm.advertisType = res.data.productRelationDetailsVo
            ? res.data.productRelationDetailsVo.productType
            : null; // 广告类型
          this.ruleForm.advertisUrl = res.data.productRelationDetailsVo
            ? res.data.productRelationDetailsVo.linkUrl
            : null; // 广告类型
          this.ruleForm.associatedProducts = res.data.productRelationDetailsVo
            ? res.data.productRelationDetailsVo.linkId
            : null; // 广告类型
          this.productId =
            res.data.productRelationDetailsVo != null &&
            res.data.productRelationDetailsVo.id != null
              ? res.data.productRelationDetailsVo.id
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
          this.appChannelCodeList.forEach(v => {
            if (this.ruleForm.appChannelCode == v.code) {
              this.appChannelName = v.name;
            }
          });
          var params = {
            multilingual: this.ruleForm.multilingual, // 多语言
            advertisTitle: this.ruleForm.advertisTitle, // 标题
            advertisViceTitle: this.ruleForm.advertisViceTitle, // 付标题
            appChannelCode: this.ruleForm.appChannelCode, // 应用渠道code
            appChannelName: this.appChannelName, // 应用渠道name
            showType: this.ruleForm.showType,
            productRelationDetailsVo: {
              modelType: "ADVERMANAGE",
              // modelId:
              //   this.productId != "" && this.productId != null
              //     ? this.productId
              //     : null,
              productType:
                this.ruleForm.advertisType != "" &&
                this.ruleForm.advertisType != null
                  ? this.ruleForm.advertisType
                  : null,
              linkUrl:
                this.ruleForm.advertisUrl != "" &&
                this.ruleForm.advertisUrl != null
                  ? this.ruleForm.advertisUrl
                  : null,
              linkId:
                this.ruleForm.associatedProducts != "" &&
                this.ruleForm.associatedProducts != null
                  ? this.ruleForm.associatedProducts
                  : null
            },
            sort: this.ruleForm.sort, // 广告排序
            visualType: this.ruleForm.visualType, // 广告可见类型
            advertisLocation: this.ruleForm.advertisLocation, // 广告位置
            spreadUser: this.ruleForm.spreadUser, // 推广用户(TOTAL:全部用户 PORTION:部分用户)
            advertisImageUrl: this.ruleForm.advertisImageUrl, // 广告图片地址
            startTime: new Date(this.ruleForm.startTime).getTime(), // 广告开始时间
            endTime: new Date(this.ruleForm.endTime).getTime()
          };
          if (this.ruleForm.spreadUser != "TOTAL") {
            params.linkGroup = this.ruleForm.linkGroup; // 关联组
            params.promoteArea = this.ruleForm.promoteArea; // 推广地区选择
            params.spreadLocation = this.ruleForm.spreadLocation; // 省份
          }
          // if (this.ruleForm.advertisLocation == "ADD_FINANCING") {
          //   params.showType = "INFORMATION";
          // } else {
          //   params.showType = "BANNER";
          // }
          if (this.$route.query.id) {
            params.id = this.$route.query.id;
            adverdis_edit(params).then(res => {
              if (res && res.success) {
                this.$message.success("编辑成功");
                this.$router.push(`/home/setting/advertis-manage/list`);
              } else {
                this.$message.error("编辑失败");
              }
            });
          } else {
            adverdis_add(params)
              .then(res => {
                if (res && res.success) {
                  this.$message.success("新增成功");
                  this.$router.push(`/home/setting/advertis-manage/list`);
                }
              })
              .catch(res => {
                this.$$message.error(`${res.message}`);
              });
          }
        } else {
          this.$message.error("有未填的必填项*");
        }
      });
    }
  }
};
</script>

