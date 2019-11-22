<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
    <el-form-item label="产品类型:" prop="productType">
      <el-select
        style="width:100%;"
        filterable
        v-model="ruleForm.productType"
        clearable
        @change="typeSelect(ruleForm.productType)"
        placeholder="请选择"
      >
        <el-option
          v-for="(item,ind) in productTypeList"
          :key="ind"
          :label="item.linkName"
          :value="item.linkModel"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="产品名称:" prop="productId">
      <el-select
        style="width:100%;"
        filterable
        v-model="ruleForm.productId"
        :disabled="changeFlag"
        clearable
        v-loadmore="loadmore"
        remote
        reserve-keyword
        :remote-method="fuzzySearch"
        placeholder="请选择"
      >
        <el-option
          v-for="(item,ind) in productNameList"
          :key="ind"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="生效时间:" prop="timeVal">
      <el-date-picker
        style="width:100%;"
        v-model="ruleForm.timeVal"
        type="daterange"
        align="right"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="defaultTime"
        :picker-options="pickerOpt"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="图片:" prop="imageUrl">
      <el-upload
        class="avatar-uploader"
        action="customize"
        :show-file-list="false"
        :http-request="upload"
        v-loading="imageUrlLoading"
      >
        <img v-if="ruleForm.imageUrl!= ''" :src="ImgBaseUrl + ruleForm.imageUrl" class="avatar" />
        <div v-else-if="ruleForm.imageUrl == ''">
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

    <div class="bottomBtn">
      <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>-->
      <el-button size="mini" type="primary" @click="save('ruleForm')">保存</el-button>
      <el-button size="mini" type="info" @click="cancel('ruleForm')">取消</el-button>
    </div>
  </el-form>
</template>

<script>
import {
  upLoadImg,
  productUrl_list,
  productList
} from "../../api/setting_use.js";
export default {
  name: "SettingExplosiveCommend",
  props: ["opts", "dataType", "flag"],
  data() {
    return {
      imageUrlLoading: false,
      productForm: {
        pageSize: 200,
        pageNum: 1,
        linkModel: "",
        name: null
      },
      ruleForm: {
        productType: "",
        productId: "",
        timeVal: [],
        imageUrl: ""
      },
      rules: {
        productType: [
          { required: true, message: "请填写产品类型", trigger: "blur" }
        ],
        productId: [
          { required: true, message: "请填写产品名称", trigger: "blur" }
        ],
        timeVal: [
          { required: true, message: "请填写生效时间", trigger: "blur" }
        ],
        imageUrl: [{ required: true, message: "请上传图片", trigger: "blur" }]
      },
      productName: "",
      productTypeName: "",
      defaultTime: [],
      productTypeList: [],
      productNameList: [],
      pickerOpt: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ],
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      ImgBaseUrl: ""
    };
  },
  mounted() {
    this.ImgBaseUrl = this.$ImgBaseUrl;
    productUrl_list().then(res => {
      if (res && res.success) {
        this.productTypeList = res.data.list.filter(v => {
          return (
            v.linkUrl != "" &&
            v.linkUrl != null &&
            v.linkUrl != 0 &&
            v.remarks == "news"
          );
        });
      }
    });
    if (this.opts) {
      this.productForm.pageNum = 1;
      this.ruleForm.productType = this.opts.productType;
      this.productName = this.opts.productName;
      this.ruleForm.productId = this.opts.productId;
      this.ruleForm.timeVal = [this.opts.startTime, this.opts.endTime];
      this.ruleForm.imageUrl = this.opts.productImageUrl;
      if (
        this.ruleForm.productType != "" &&
        this.ruleForm.productType != null
      ) {
        this.productForm.linkModel = this.ruleForm.productType;
        this.getproList(this.productForm);
      }
    }
  },
  computed: {
    changeFlag() {
      return this.ruleForm.productType === "";
    }
  },
  methods: {
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
      this.imageUrlLoading = true;
      upLoadImg(formData).then(res => {
        if (res && res.success) {
          this.imageUrlLoading = false;
          this.ruleForm.imageUrl = res.data;
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
      this.productNameList = [];
      productList(form).then(res => {
        if (res && res.success) {
          this.productPageCount =
            res.data && Math.ceil(res.data.total / this.productForm.pageSize);
          if (res.data && res.data.list != null && res.data.list != []) {
            const _res = res.data.list;
            this.productNameList = [...this.productNameList, ..._res];
          }
        }
      });
    },
    fuzzySearch(query) {
      this.productNameList = [];
      if (query != "" && this.ruleForm.productType != "") {
        this.productForm.linkName = query;
        this.productForm.linkModel = this.ruleForm.productType;
        this.getproList(this.productForm);
      } else {
        this.productForm.linkName = null;
        this.productForm.linkModel = this.ruleForm.productType;
        this.getproList(this.productForm);
      }
    },
    cancel(formName) {
      this.$emit("cancel");
      this.$refs[formName].resetFields();
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.productNameList &&
            this.productNameList.forEach(v => {
              if (v.id === this.ruleForm.productId) {
                this.productName = v.name;
              }
            });
          this.productNameList &&
            this.productTypeList.forEach(v => {
              if (this.ruleForm.productType == v.linkModel) {
                this.productTypeName = v.linkName;
              }
            });
          //整理params
          let obj = {
            id: this.opts ? this.opts.id : "",
            productType: this.ruleForm.productType,
            productId: this.ruleForm.productId,
            productName: this.productName,
            startTime: new Date(this.ruleForm.timeVal[0]).getTime(),
            endTime: new Date(this.ruleForm.timeVal[1]).getTime(),
            code: "12",
            productTypeName: this.productTypeName,
            dataType: this.dataType,
            productImageUrl: this.ruleForm.imageUrl
            // dataType: this.opts.dataType ?  this.opts.dataType : ''
          };
          //向父组件传递   请求你事需要的参数
          this.$emit("reqs", obj);
        } else {
          return false;
        }
      });
      // if(this.ruleForm.productType && this.ruleForm.productId && this.ruleForm.timeVal && this.ruleForm.imageUrl){

      // }else{
      //   this.$alert('*号是必填项', '提交失败', {
      //     confirmButtonText: '确定',
      //     callback: action => {
      //       this.$message({
      //         type: 'info',
      //         message: `action: ${ action }`
      //       });
      //     }
      //   })
      // }
    },
    //选择产品类型
    typeSelect(val) {
      if (val != "") {
        this.ruleForm.productId = "";
        this.productForm = {
          pageSize: 200,
          pageNum: 1,
          linkModel: "",
          name: null
        };
        this.productForm.linkModel = val;
        this.getproList(this.productForm);
      }
    }
  },
  watch: {
    flag() {
      if (this.flag) {
        this.productForm.pageNum = 1;
        this.ruleForm.productType = this.opts.productType;
        this.productTypeName = this.opts.productTypeName;
        this.productName = this.opts.productName;
        this.ruleForm.productId = this.opts.productId;
        this.ruleForm.timeVal = [this.opts.startTime, this.opts.endTime];
        this.ruleForm.imageUrl = this.opts.productImageUrl;
        if (
          this.ruleForm.productType != "" &&
          this.ruleForm.productType != null
        ) {
          this.productForm.linkModel = this.ruleForm.productType;
          this.getproList(this.productForm);
        }
      }
    }
  }
};
</script>
