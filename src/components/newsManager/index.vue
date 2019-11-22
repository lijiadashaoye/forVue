<template>
  <div class="news">
    <div style="width:90%;padding:10px;margin:0 auto;">
      <el-steps :active="active" finish-status="success">
        <el-step title="新闻基本信息"></el-step>
        <el-step title="新闻内容"></el-step>
        <el-step title="关联产品"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>

    <!-- 第一步 -->
    <el-form
      style="width:530px;margin:0 auto;"
      :model="firstForm"
      :rules="firstRules"
      ref="firstForm"
      label-width="140px"
      label-position="left"
      v-if="active == 0"
    >
      <el-form-item label="标题" prop="newsTitle">
        <el-input
          v-model="firstForm.newsTitle"
          placeholder="请输入新闻标题"
          maxlength="60"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="位图" prop="newsImageUrl">
        <el-upload
          class="avatar-uploader"
          action="customize"
          :show-file-list="false"
          :http-request="upload"
          v-loading="newsImageUrlLoading"
        >
          <img
            v-if="firstForm.newsImageUrl"
            :src="ImgBaseUrl + firstForm.newsImageUrl"
            class="avatar"
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

      <el-form-item label="来源" prop="source">
        <el-input v-model="firstForm.source" placeholder="请输入来源"></el-input>
      </el-form-item>

      <el-form-item label="摘要" prop="summary">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 3}"
          placeholder="请输入摘要"
          v-model="firstForm.summary"
        ></el-input>
      </el-form-item>

      <el-form-item label="初始访问量" prop="visitNumber">
        <el-input v-model.number="firstForm.visitNumber" placeholder="请输入初始访问量"></el-input>
      </el-form-item>

      <el-form-item label="初始点赞量" prop="fabulousNumber">
        <el-input
          v-model.number="firstForm.fabulousNumber"
          placeholder="请输入初始点赞量"
          @input="fabNumContrast"
        ></el-input>
      </el-form-item>

      <el-form-item label="新闻开始时间" prop="startTime">
        <el-date-picker
          v-model="firstForm.startTime"
          type="datetime"
          :placeholder="new Date().toLocaleDateString() +' '+ ' '+ new Date().toLocaleTimeString()"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="新闻结束时间" prop="endTime">
        <el-date-picker
          v-model="firstForm.endTime"
          type="datetime"
          :placeholder="new Date().toLocaleDateString() +' '+ ' '+ new Date().toLocaleTimeString()"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="标记" prop="sign">
        <el-radio-group v-model="firstForm.sign">
          <el-radio v-for="(item,ind) in signOpt" :key="ind" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>

     <div class="bottomBtn">
        <el-button @click="resetFirstForm('firstForm')">取消</el-button>
        <el-button type="primary" @click="toSecond('firstForm')">下一步</el-button>
      </div>
    </el-form>
    <!-- 第二步 -->
    <el-form
      style="width:530px;margin:0 auto;"
      :model="secondForm"
      :rules="firstRules"
      ref="secondForm"
      label-width="80px"
      label-position="left"
      v-if="active == 1"
    >
      <el-form-item label="内容" prop="content" class="input-quill">
        <editor-bar v-model="secondForm.content" :url="'admin/file/up/setting'" :isClear="isClear"></editor-bar>
      </el-form-item>

      <el-form-item label="内容链接" prop="contentUrl">
        <el-input v-model="secondForm.contentUrl" placeholder="请输入内容链接"></el-input>
      </el-form-item>

     <div class="bottomBtn">
        <el-button type="warning" @click="toFirst">上一步</el-button>
        <el-button type="primary" @click="toThird('secondForm')">下一步</el-button>
      </div>
    </el-form>

    <!-- 第三步 -->
    <div style="padding:30px;" v-if="active == 2">
      <el-button type="primary" size="mini" @click="addProduct">新增</el-button>
      <el-form :model="productRelationListVo" ref="form">
        <el-form-item>
          <el-table :data="productRelationListVo.tableData" style="width:100%">
            <el-table-column type="index" sortable width="80" label="序号" :index="indexMethod"></el-table-column>
           
            <el-table-column label="产品类型" width="200px">
              <template slot-scope="scope">
                <el-form-item>
                  <el-select style="width:100%;"
                    filterable
                    v-model="scope.row.productType"
                    placeholder="请选择产品类型"
                    @change="typeSelect(scope.row,scope.row.productType)"
                  >
                    <el-option
                      v-for="(item,ind) in channelData"
                      :key="ind"
                      :label="item.linkName"
                      :value="item.linkModel"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="产品名称">
              <template slot-scope="scope">
                <el-form-item >
                  <el-input style="width:100%;"
                    v-if="scope.row.inputFlag"
                    v-model="scope.row.linkId"
                    placeholder="请输入产品链接"
                  ></el-input>
                  <el-select style="width:100%;"
                    filterable
                    v-else
                    v-model="scope.row.linkId"
                    clearable
                    remote
                    reserve-keyword
                    @focus="selectFocus(scope.row)"
                    :remote-method="(query)=>{fuzzySearch(query,scope.row)}"
                    v-loadmore="loadmore(scope.row)"
                    placeholder="请选择产品名称"
                    @change="selectLinkId(scope.row.linkId,scope)"
                   >
                    <el-option
                      v-for="(item,ind) in scope.row.productNameOpt"
                      :key="ind"
                      :label="item.name"
                      :value="item.id"
                    >
                      <span style="float: left">{{ item.institutionName }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="80px" align="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <div class="bottomBtn">
          <el-button type="warning" @click="thirdToSecond">上一步</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  upLoadImg,
  productList,
  productUrl_list
} from "../../api/setting_use.js";
import EditorBar from "../wangEnduit";

export default {
  name: "newsManager",
  props: ["opts", "success", "dialogFormVisible"],
  components: {
    // quill
    EditorBar
  },
  data() {
    return {
      isClear: false,
      id: "",
      videoUrl: "",
      firstForm: {
        newsTitle: "", //新闻标题
        newsImageUrl: "", //新闻图片
        source: "", //来源
        summary: "", //摘要
        visitNumber: "", //初始访问量
        fabulousNumber: "", //初始点赞量
        startTime: "", //开始时间
        endTime: "", //结束时间
        sign: [] //标记
      },
      firstRules: {
        newsTitle: [
          { required: true, message: "请输入新闻标题", trigger: "blur" }
        ],
        newsImageUrl: [
          { required: true, message: "请上传新闻图片", trigger: "blur" }
        ],
        source: [
          { required: true, message: "请输入新闻来源", trigger: "blur" }
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        contentUrl: [
          { required: true, message: "请输入内容链接", trigger: "blur" }
        ],

        summary: [
          { required: true, message: "请输入新闻摘要", trigger: "blur" }
        ],
        visitNumber: [
          { required: true, message: "请输入初始访问量", trigger: "blur" },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "只能输入大于0的正整数",
            trigger: "blur"
          }
        ],
        fabulousNumber: [
          { required: true, message: "请输入初始点赞量", trigger: "blur" },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "只能输入大于0的正整数",
            trigger: "blur"
          }
        ],
        startTime: [
          { required: true, message: "请输入开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请输入结束时间", trigger: "blur" }
        ],
        sign: [{ required: true, message: "请选择标记", trigger: "blur" }]
      },
      secondForm: {
        content: ``, //内容
        contentUrl: "" //内容链接
      },
      channelData: [],
      newsImageUrlLoading: false,
      productRelationListVo: {
        //关联产品对象[{},{}]
        tableData: [
          {
            productType: "",
            linkId: "",
            inputFlag: false,
            productNameOpt: []
          }
        ] //关联产品的表数据
      },
      active: 0,
      newsType: "ORDINARY_NEWS", //新闻类型
      // signStr: [],//标记是汉字 需要给后台传递成英文字段
      productForm: {
        pageSize: 200,
        pageNum: 1,
        linkModel: "",
        name: null
      },

      signOpt: [
        {
          label: "全部",
          value: "ALL"
        },
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
      ImgBaseUrl: ""
    };
  },
  mounted() {
    this.active = 0;
    this.ImgBaseUrl = this.$ImgBaseUrl;
    productUrl_list().then(res => {
      if (res && res.success) {
        this.channelData = res.data.list.filter(v => {
          return v.linkUrl != "" && v.linkUrl != null && v.remarks == "news";
        });
      }
    });
    if (this.opts != null && this.opts != undefined) {
      this.id = this.opts.id;
      this.firstForm.newsTitle = this.opts.newsTitle;
      this.firstForm.newsImageUrl = this.opts.newsImageUrl;
      this.firstForm.source = this.opts.source;
      this.firstForm.summary = this.opts.summary;
      this.firstForm.visitNumber = this.opts.visitNumber;
      this.firstForm.fabulousNumber = this.opts.fabulousNumber;
      this.firstForm.startTime = this.opts.startTime;
      this.firstForm.endTime = this.opts.endTime;
      this.firstForm.sign = this.opts.sign;
      this.secondForm.content = this.opts.content;
      this.secondForm.contentUrl = this.opts.contentUrl;
      this.productRelationListVo.tableData.length = this.opts.productRelationListVo.length;
      this.opts.productRelationListVo &&
        this.opts.productRelationListVo.forEach((v, i) => {
          this.productRelationListVo.tableData[i] = {};
          this.productRelationListVo.tableData[
            i
          ].productType = this.opts.productRelationListVo[i].productType;
          this.productRelationListVo.tableData[
            i
          ].id = this.opts.productRelationListVo[i].id;
          if (
            this.opts.productRelationListVo[i].productType == "EXTERNAL_LINK"
          ) {
            this.productRelationListVo.tableData[i].inputFlag = true;
            this.productRelationListVo.tableData[
              i
            ].linkId = this.opts.productRelationListVo[i].linkUrl;
          } else {
            this.productRelationListVo.tableData[i].inputFlag = false;
            this.productRelationListVo.tableData[
              i
            ].linkId = this.opts.productRelationListVo[i].linkId;
          }
        });
      this.productRelationListVo.tableData.forEach(v => {
        if (v.productType != "EXTERNAL_LINK") {
          this.productForm.pageNum = 1;
          this.getproList(
            {
              pageSize: 200,
              pageNum: 1,
              linkModel: v.productType,
              name: null
            },
            v
          );
        }
      });
    } else {
      this.id = null;
    }
  },
  methods: {
    //  index
    indexMethod(index) {
      return index + 1;
    },
    //产品列表select获取焦点时候根据前面的类型请求数据
    selectFocus(row) {
      if (row.productType != "") {
        this.productForm = {
          pageSize: 200,
          pageNum: 1,
          linkModel: "",
          name: null
        };
        this.productForm.linkModel = row.productType;
        this.getproList(this.productForm, row);
      }
    },
    //比较出示点赞量小于访问量
    fabNumContrast() {
      if (this.firstForm.fabulousNumber > this.firstForm.visitNumber) {
        this.$message.error("初始点赞量不能大于初始访问量");
        this.firstForm.fabulousNumber = "";
      }
    },
    //产品下拉框   下拉加载
    loadmore(row) {
      if (this.productForm.pageNum < this.productPageCount) {
        this.productForm.pageNum++;
        this.getproList(this.productForm, row);
      }
    },
    //获取产品下拉数据
    getproList(form, row) {
      form.linkModel = row.productType;
      productList(form).then(async res => {
        row.productNameOpt = [];
        if (res && res.success) {
          this.productPageCount =
            res.data && Math.ceil(res.data.total / this.productForm.pageSize);
          if (res.data && res.data.list != null && res.data.list != []) {
            const _res = res.data.list;
            row.productNameOpt = [...row.productNameOpt, ..._res];
          }
        }
      });
    },
    //
    selectLinkId(id, scope) {
      this.$set(this.productRelationListVo.tableData, scope.$index, scope.row);
      this.$forceUpdate();
    },
    //模糊搜索  产品
    fuzzySearch(query, row) {
      if (query != "" && row.productType != "") {
        row.productNameOpt = [];
        this.productForm.linkName = query;
        this.productForm.linkModel = row.productType;
        this.getproList(this.productForm, row);
      } else {
        row.productNameOpt = [];
        this.productForm.linkName = null;
        this.productForm.linkModel = row.productType;
        this.getproList(this.productForm, row);
      }
    },
    //选择产品类型
    typeSelect(row, val) {
      row.linkId = "";
      this.productForm = {
        pageSize: 200,
        pageNum: 1,
        linkModel: "",
        name: null
      };
      if (val == "EXTERNAL_LINK") {
        row.inputFlag = true;
      } else if (val != "" && val != null && val != undefined) {
        row.inputFlag = false;
        this.productForm.linkModel = row.productType;
        this.getproList(this.productForm, row);
      }
    },
    //添加列表
    addProduct() {
      if (this.productRelationListVo.tableData.length < 5) {
        if (
          this.productRelationListVo.tableData.length == 0 ||
          (this.productRelationListVo.tableData[
            this.productRelationListVo.tableData.length - 1
          ].productType != "" &&
            this.productRelationListVo.tableData[
              this.productRelationListVo.tableData.length - 1
            ].productType != null &&
            this.productRelationListVo.tableData[
              this.productRelationListVo.tableData.length - 1
            ].linkId != "")
        ) {
          this.productRelationListVo.tableData.push({
            productType: "",
            linkId: "",
            inputFlag: false,
            productNameOpt: []
          });
        } else {
          this.$message.error("请将上条数据填写完整");
        }
      }
    },
    //删除列表
    handleDelete(index) {
      this.productRelationListVo.tableData.splice(index, 1);
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
      this.newsImageUrlLoading = true;
      upLoadImg(formData).then(res => {
        if (res && res.success) {
          this.newsImageUrlLoading = false;
          this.firstForm.newsImageUrl = res.data;
        }
      });
    },
    //点击进入第二页
    toSecond(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let startTime = this.firstForm.startTime;
          let endTime = this.firstForm.endTime;
          if (startTime < endTime) {
            this.active = 1;
          } else {
            this.$message.error("新闻开始时间与结束时间数据有问题，请更正！");
          }
        } else {
          return false;
        }
      });
    },
    //点击取消
    resetFirstForm(formName) {
      this.$refs[formName].resetFields();
      this.productRelationListVo = {
        tableData: [
          {
            productType: "",
            linkId: "",
            inputFlag: false,
            productNameOpt: []
          }
        ]
      };
      this.$emit("closeDialog");
    },
    //去第一步
    toFirst() {
      this.active = 0;
    },
    //去第三步
    toThird() {
      this.$refs.secondForm.validate(valid => {
        if (valid) {
          this.active = 2;
        }
      });
    },
    //第三步去第二步
    thirdToSecond() {
      this.active = 1;
    },
    //点击保存
    save() {
      var products = [];
      this.productRelationListVo.tableData.length > 0 &&
        this.productRelationListVo.tableData.forEach((v, i) => {
          products[i] = {};
          products[i].modelType = "NEWSMANAGE";
          products[i].productType = this.productRelationListVo.tableData[
            i
          ].productType;
          products[i].id =
            this.productRelationListVo.tableData[i].id != null &&
            this.productRelationListVo.tableData[i].id != ""
              ? this.productRelationListVo.tableData[i].id
              : null;
          if (
            this.productRelationListVo.tableData[i].productType ==
            "EXTERNAL_LINK"
          ) {
            products[i].linkUrl = this.productRelationListVo.tableData[
              i
            ].linkId;
          } else {
            products[i].linkId = this.productRelationListVo.tableData[i].linkId;
            this.productRelationListVo.tableData[i].productNameOpt &&
              this.productRelationListVo.tableData[i].productNameOpt.forEach(
                item => {
                  if (
                    this.productRelationListVo.tableData[i].linkId == item.id
                  ) {
                    products[i].productName = item.name;
                  }
                }
              );
          }
        });
      let obj = {
        id: this.id != "" && this.id != null ? this.id : "",
        newsTitle: this.firstForm.newsTitle,
        newsType: this.newsType,
        sign: this.firstForm.sign,
        summary: this.firstForm.summary,
        newsImageUrl: this.firstForm.newsImageUrl,
        content: this.secondForm.content,
        contentUrl: this.secondForm.contentUrl,
        visitNumber: this.firstForm.visitNumber,
        fabulousNumber: this.firstForm.fabulousNumber,
        startTime: new Date(this.firstForm.startTime).getTime(),
        endTime: new Date(this.firstForm.endTime).getTime(),
        source: this.firstForm.source,
        productRelationListVo: products
      };
      this.$emit("save", obj);
    }
  },
  watch: {
    dialogFormVisible() {
      this.active = 0;
      this.id = this.opts != null ? this.opts.id : "";
      if (
        this.dialogFormVisible &&
        this.opts != null &&
        this.opts != undefined
      ) {
        this.opts.id != null && this.opts.id != "" ? this.opts.id : "";
        this.firstForm.newsTitle = this.opts.newsTitle;
        this.firstForm.newsImageUrl = this.opts.newsImageUrl;
        this.firstForm.source = this.opts.source;
        this.firstForm.summary = this.opts.summary;
        this.firstForm.visitNumber = this.opts.visitNumber;
        this.firstForm.fabulousNumber = this.opts.fabulousNumber;
        this.firstForm.startTime = this.opts.startTime;
        this.firstForm.endTime = this.opts.endTime;
        this.firstForm.sign = this.opts.sign;
        this.secondForm.content = this.opts.content;
        this.secondForm.contentUrl = this.opts.contentUrl;
        this.productRelationListVo.tableData.length = this.opts
          .productRelationListVo.length
          ? this.opts.productRelationListVo.length
          : 0;
        this.opts.productRelationListVo &&
          this.opts.productRelationListVo.forEach((v, i) => {
            this.productRelationListVo.tableData[i] = {};
            this.productRelationListVo.tableData[
              i
            ].productType = this.opts.productRelationListVo[i].productType;
            this.productRelationListVo.tableData[
              i
            ].id = this.opts.productRelationListVo[i].id;
            if (
              this.opts.productRelationListVo[i].productType == "EXTERNAL_LINK"
            ) {
              this.productRelationListVo.tableData[i].inputFlag = true;
              this.productRelationListVo.tableData[
                i
              ].linkId = this.opts.productRelationListVo[i].linkUrl;
            } else {
              this.productRelationListVo.tableData[i].inputFlag = false;
              this.productRelationListVo.tableData[
                i
              ].linkId = this.opts.productRelationListVo[i].linkId;
            }
          });
        this.productRelationListVo.tableData.forEach(v => {
          if (v.productType != "EXTERNAL_LINK") {
            this.productForm.pageNum = 1;
            this.getproList(
              {
                pageSize: 200,
                pageNum: 1,
                linkModel: v.productType,
                name: null
              },
              v
            );
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-step__head.is-process {
  color: orange;
  border-color: orange;
}
/deep/.el-step__title.is-process {
  color: orange;
}
</style>
