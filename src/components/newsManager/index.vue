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
          <el-input v-model="newsTitle" placeholder="请输入新闻标题" maxlength="60" show-word-limit></el-input>
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
            <img v-if="newsImageUrl" :src="ImgBaseUrl + newsImageUrl" class="avatar">
            <div v-else>
              <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
            </div>
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
          <el-input v-model="fabulousNumber" placeholder="请输入初始点赞量" type="number" @input='fabNumContrast'></el-input>
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
          <!-- <el-checkbox-group v-model="sign" class="signNoWrap">
            <el-checkbox
              v-for="(item,ind) in signOpt"
              :label="item.label"
              :value="item.value"
              :key="ind"
            ></el-checkbox>
          </el-checkbox-group> -->
          <el-radio-group v-model="sign">
            <el-radio v-for="(item,ind) in signOpt" :key="ind" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>

    <div class="stepItemSec" v-if="active == 1">

      <div class="card-item item-quill">
        <span class="item-text">内容:</span>
        <div class="item-input input-quill">
          <quill :url="'/admin/file/up/setting'" v-model="content"/>
        </div>
      </div>

      <div class="card-item">
        <span class="item-text">内容链接:</span>
        <div class="item-input">
          <el-input v-model="contentUrl" placeholder="请输入内容链接"></el-input>
        </div>
      </div>
    </div>

    <div class="stepItem" v-if="active == 2">
      <el-card class="box-card tabCard">
        <el-button type="primary" size="mini" @click="addProduct">新增</el-button>
        <el-form :model="productRelationListVo" ref="form">
        <el-table
          :data="productRelationListVo.tableData"
          style="width:100%">
          <el-table-column
            type="index"
            sortable
            width="80"
            label="序号"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            label="产品类型">
            <template slot-scope="scope">
              <el-form-item>
                <el-select filterable v-model="scope.row.productType" placeholder="请选择产品类型" @change="typeSelect(scope.row,scope.row.productType)">
                  <el-option
                    v-for="(item,ind) in channelData"
                    :key="ind"
                    :label="item.linkName"
                    :value="item.linkModel">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="产品名称">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-if="scope.row.inputFlag" v-model="scope.row.linkId" placeholder="请输入产品链接"></el-input>
                <el-select filterable
                  v-else
                  v-model="scope.row.linkId"
                  
                  clearable
                  remote
                  reserve-keyword
                  @focus='selectFocus(scope.row)'
                  :remote-method="(query)=>{fuzzySearch(query,scope.row)}"
                  v-loadmore='loadmore(scope.row)'
                  placeholder="请选择产品名称"
                  @change="selectLinkId(scope.row.linkId,scope)">
                  <el-option
                    v-for="(item,ind) in scope.row.productNameOpt"
                    :key="ind"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.institutionName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        </el-form>
      </el-card>
    </div>

    <div class="card-footer">
      <el-button style="margin-top: 12px;" @click="clickStep('prev')">{{prevStep}}</el-button>
      <el-button style="margin-top: 12px;" @click="clickStep()">{{nextStep}}</el-button>
    </div>

  </el-card>
</template>

<script>
import { upLoadImg, productList, productUrl_list } from "../../api/setting_use.js";
import quill from '../../components/quill';

export default {
  name: "newsManager",
  props: ['opts', 'success'],
  components: {
    quill
  },
  data() {
    return {
      id: '',
      videoUrl: '',
      channelData: [],
      productRelationListVo: {//关联产品对象[{},{}]
        tableData: [{
          productType: '',
          linkId: '',
          inputFlag: false,
          productNameOpt: []
        }],//关联产品的表数据
      },
      prevStep: "取消",
      nextStep: "下一步",
      active: 0,
      newsTitle: "", //新闻标题
      newsType: "ORDINARY_NEWS", //新闻类型
      // signStr: [],//标记是汉字 需要给后台传递成英文字段
      sign: [], //标记
      summary: "", //摘要
      productForm: {
        pageSize: 200,
        pageNum: 1,
        linkLocationEnum: '',
        name: null
      },
      newsImageUrl: "", //新闻图片
      content: ``, //内容
      contentUrl: "", //内容链接
      visitNumber: "", //初始访问量
      fabulousNumber: "", //初始点赞量
      source: "", //来源
      startTime: "", //开始时间
      endTime: "", //结束时间
      signOpt: [
        {
            label: '全部',
            value: 'ALL'
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
      ImgBaseUrl: ''
    };
  },
  mounted() {
    this.ImgBaseUrl = this.$ImgBaseUrl;
    productUrl_list().then(res=> {
      if(res && res.success) {
        this.channelData = res.data.list.filter(v=> {
          return v.linkUrl != '' && v.linkUrl != null && v.remarks == 'news';;
        });
      }
    });
    if(this.opts != null && this.opts != undefined) {
      this.id = this.opts.id;
      this.newsTitle = this.opts.newsTitle;
      this.newsImageUrl = this.opts.newsImageUrl;
      this.source = this.opts.source;
      this.summary = this.opts.summary;
      this.visitNumber = this.opts.visitNumber;
      this.fabulousNumber = this.opts.fabulousNumber;
      this.startTime = this.opts.startTime;
      this.endTime = this.opts.endTime;
      this.sign = this.opts.sign;
      this.content = this.opts.content;
      this.contentUrl = this.opts.contentUrl;
      this.productRelationListVo.tableData.length = this.opts.productRelationListVo.length;
      this.opts.productRelationListVo && this.opts.productRelationListVo.forEach((v,i)=> {
        this.productRelationListVo.tableData[i] = {};
        this.productRelationListVo.tableData[i].productType = this.opts.productRelationListVo[i].productType;
        this.productRelationListVo.tableData[i].id = this.opts.productRelationListVo[i].id;
        if(this.opts.productRelationListVo[i].productType == 'EXTERNAL_LINK') {
          this.productRelationListVo.tableData[i].inputFlag = true;
          this.productRelationListVo.tableData[i].linkId = this.opts.productRelationListVo[i].linkUrl;
        } else {
          this.productRelationListVo.tableData[i].inputFlag = false;
          this.productRelationListVo.tableData[i].linkId = this.opts.productRelationListVo[i].linkId;
        }
      })
      this.productRelationListVo.tableData.forEach(v=> {
        if(v.productType != 'EXTERNAL_LINK') {
          this.productForm.pageNum = 1;
          this.getproList({
            pageSize: 200,
            pageNum: 1,
            linkLocationEnum: v.productType,
            name: null
          },v)
        }
      })
    } else {
      this.id = null
    }
  },
  methods: {

    //  index
    indexMethod(index) {
      return index+1
    },
    //产品列表select获取焦点时候根据前面的类型请求数据
    selectFocus(row) {
      if(row.productType != '') {
        this.productForm = {
          pageSize: 200,
          pageNum: 1,
          linkLocationEnum: '',
          name: null
        }
        this.productForm.linkLocationEnum = row.productType;
        this.getproList(this.productForm,row);
      }
    },
    //比较出示点赞量小于访问量
    fabNumContrast() {
      if(this.fabulousNumber > this.visitNumber) {
        this.$message.error('初始点赞量不能大于初始访问量');
        this.fabulousNumber = '';
      }
    },
    //产品下拉框   下拉加载
    loadmore(row) {
      if(this.productForm.pageNum < this.productPageCount) {
        this.productForm.pageNum++;
        this.getproList(this.productForm,row);
      }
    },
    //获取产品下拉数据
    getproList(form,row) {
      form.linkLocationEnum = row.productType
      productList(form).then(async res=> {
        row.productNameOpt = [];
        if(res && res.success) {
          this.productPageCount = res.data && Math.ceil(res.data.total/this.productForm.pageSize)
          if(res.data && res.data.list != null && res.data.list != []) {
            const _res = res.data.list
            row.productNameOpt = [...row.productNameOpt,..._res]
          }
        }
      })
    },
    //
    selectLinkId(id,scope) {
      this.$set(this.productRelationListVo.tableData,scope.$index,scope.row)
      this.$forceUpdate();
    },
    //模糊搜索  产品
    fuzzySearch(query,row) {
      if(query!= '' && row.productType != '') {
          row.productNameOpt = [];
          this.productForm.name = query;
          this.productForm.linkLocationEnum = row.productType;
          this.getproList(this.productForm,row)
      } else {
          row.productNameOpt = [];
          this.productForm.name = null;
          this.productForm.linkLocationEnum = row.productType;
          this.getproList(this.productForm,row)
      }
    },
    //选择产品类型
    typeSelect(row,val) {
      row.linkId = '';
      this.productForm = {
        pageSize: 200,
        pageNum: 1,
        linkLocationEnum: '',
        name: null
      }
      if(val == 'EXTERNAL_LINK') {
        row.inputFlag = true;
      } else if(val != '' && val != null && val != undefined) {
        row.inputFlag = false;
        this.productForm.linkLocationEnum = row.productType;
        this.getproList(this.productForm,row)
      }
    },
    //添加列表
    addProduct() {
      if(this.productRelationListVo.tableData.length < 5) {
        if(this.productRelationListVo.tableData.length == 0 || this.productRelationListVo.tableData[this.productRelationListVo.tableData.length-1].productType != '' && this.productRelationListVo.tableData[this.productRelationListVo.tableData.length-1].productType != null && this.productRelationListVo.tableData[this.productRelationListVo.tableData.length-1].linkId != '') {
          this.productRelationListVo.tableData.push({
            productType: '',
            linkId: '',
            inputFlag: false,
            productNameOpt: []
          })
        } else {
          this.$message.error('请将上条数据填写完整')
        }
      }
    },
    //删除列表
    handleDelete(index,val) {
      this.productRelationListVo.tableData.splice(index,1)
    },
    //图片上传
    upload(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      const idJPG = _file.type === "image/jpeg" ||  _file.type === "image/gif" ||  _file.type === "image/png" ||  _file.type === "image/jpg";
      var formData = new FormData();
      formData.append("file", _file);
      if(!idJPG) {
          this.$message.error("只能上传jpg/png/gif/jpeg格式的图片");
          return false
      }
      if (!isLt2M) {
          this.$message.error("请上传2M以下的图片");
          return false;
      }
      upLoadImg(formData).then(res => {
        if (res && res.success) {
          this.newsImageUrl = res.data;
        }
      });
    },

    clickStep(data) {
      if (data === "prev") {//点击上一步
        if(this.active > 0) {
          this.active--;
        }
        if(this.prevStep == '取消'){
          this.$emit('closeDialog')
          this.id = null;
          this.videoUrl = '';
          this.channelData = [];
          // this.productNameOpt = [];
          this.productRelationListVo = {//关联产品对象[{},{}]
            tableData: [{
              productType: '',
              linkId: '',
              inputFlag: false,
              productNameOpt: []
            }]//关联产品的表数据
          };
          this.prevStep = "取消"
          this.nextStep = "下一步"
          this.active = 0
          this.newsTitle = "" //新闻标题
          this.newsType = "ORDINARY_NEWS"; //新闻类型
          this.sign = []; //标记
          this.summary = ""; //摘要
          this.newsImageUrl = ""; //新闻图片
          this.content = ``; //内容
          this.contentUrl = ""; //内容链接
          this.visitNumber = ""; //初始访问量
          this.fabulousNumber = ""; //初始点赞量
          this.source = ""; //来源
          this.startTime = ""; //开始时间
          this.endTime = ""; //结束时间
        }
      } else {//点击下一步
        if(this.active < 3) {
          this.active++;
        }
      }
      if (this.active == 0) {
        // this.sign = this.sign.split('&')
        // this.sign.forEach((v, i) => {
        //   this.signOpt.forEach(item => {
        //     if (v == item.value) {
        //       this.sign[i] = item.label;
        //     }
        //   });
        // });
        this.prevStep = "取消";
        this.nextStep = "下一步";
      } else if (this.active == 1) {
        // if(typeof(this.sign) == 'object') {
        //   this.sign.forEach((v, i) => {
        //     this.signOpt.forEach(item => {
        //       if (v == item.label) {
        //         this.sign[i] = item.value;
        //       }
        //     });
        //   });
        // this.sign = this.sign.join('&');
        // }
        this.nextStep = "下一步";
        this.prevStep = "上一步";
      } else if (this.active == 2) {
        this.prevStep = "上一步";
        this.nextStep = "保存";
      } else if (this.active > 2) {
        this.save();
        if(this.success) {
          // this.prevStep = "上一步";
          // this.nextStep = "下一步";
          this.active = 0
          this.prevStep = "取消"
          this.nextStep = "下一步"
          this.newsTitle = "" //新闻标题
          this.newsType = "ORDINARY_NEWS"; //新闻类型
          this.sign = []; //标记
          this.summary = ""; //摘要
          this.newsImageUrl = ""; //新闻图片
          this.content = ``; //内容
          this.contentUrl = ""; //内容链接
          this.visitNumber = ""; //初始访问量
          this.fabulousNumber = ""; //初始点赞量
          this.source = ""; //来源
          this.startTime = ""; //开始时间
          this.endTime = ""; //结束时间
        } else {
          this.active = 2;
          this.prevStep = "上一步";
          this.nextStep = "保存";
        }
        // this.active = 2;
      }
    },
    //点击保存
    save() {
        var products = [];
        this.productRelationListVo.tableData.length > 0 && this.productRelationListVo.tableData.forEach((v,i)=> {
          products[i] = {}
          products[i].modelType = 'NEWSMANAGE'
          products[i].productType = this.productRelationListVo.tableData[i].productType;
          products[i].id = this.productRelationListVo.tableData[i].id != null && this.productRelationListVo.tableData[i].id != '' ? this.productRelationListVo.tableData[i].id : null;
          if(this.productRelationListVo.tableData[i].productType == 'EXTERNAL_LINK') {
            products[i].linkUrl = this.productRelationListVo.tableData[i].linkId;
          } else {
            products[i].linkId = this.productRelationListVo.tableData[i].linkId;
            this.productRelationListVo.tableData[i].productNameOpt && this.productRelationListVo.tableData[i].productNameOpt.forEach(item=> {
              if(this.productRelationListVo.tableData[i].linkId == item.id) {
                products[i].productName = item.name;
              }
            })
          }
        })
      if( this.newsTitle && this.newsImageUrl && this.source && this.summary && this.visitNumber && this.fabulousNumber && this.startTime && this.endTime ) {
        let obj = {
          id: this.id != '' && this.id != null ? this.id : '',
          newsTitle: this.newsTitle,
          newsType: this.newsType,
          sign: this.sign,
          summary: this.summary,
          newsImageUrl: this.newsImageUrl,
          content: this.content,
          contentUrl: this.contentUrl,
          visitNumber: this.visitNumber,
          fabulousNumber: this.fabulousNumber,
          startTime: new Date(this.startTime).getTime(),
          endTime: new Date(this.endTime).getTime(),
          source: this.source,
          productRelationListVo: products
        }
        this.$emit('save',obj)
        this.id = null;
        this.active = 0;
      } else {
        this.$alert("*号是必填项", "提交失败", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
            type: "error",
            message: `*号是必填项`
            });
          }
        });
      }
    }
  },
  watch: {
    'opts.id'() {
      if(this.opts != null && this.opts != undefined) {
        this.id = this.opts.id !=null && this.opts.id != '' ? this.opts.id : '';
        this.newsTitle = this.opts.newsTitle;
        this.newsImageUrl = this.opts.newsImageUrl;
        this.source = this.opts.source;
        this.summary = this.opts.summary;
        this.visitNumber = this.opts.visitNumber;
        this.fabulousNumber = this.opts.fabulousNumber;
        this.startTime = this.opts.startTime;
        this.endTime = this.opts.endTime;
        this.sign = this.opts.sign;
        this.content = this.opts.content;
        this.contentUrl = this.opts.contentUrl;
        this.productRelationListVo.tableData.length = this.opts.productRelationListVo.length ? this.opts.productRelationListVo.length : 0;
        this.opts.productRelationListVo && this.opts.productRelationListVo.forEach((v,i)=> {
          this.productRelationListVo.tableData[i] = {};
          this.productRelationListVo.tableData[i].productType = this.opts.productRelationListVo[i].productType;
          this.productRelationListVo.tableData[i].id = this.opts.productRelationListVo[i].id;
          if(this.opts.productRelationListVo[i].productType == 'EXTERNAL_LINK') {
            this.productRelationListVo.tableData[i].inputFlag = true;
            this.productRelationListVo.tableData[i].linkId = this.opts.productRelationListVo[i].linkUrl;
          } else {
            this.productRelationListVo.tableData[i].inputFlag = false;
            this.productRelationListVo.tableData[i].linkId = this.opts.productRelationListVo[i].linkId;
          }
        })
        this.productRelationListVo.tableData.forEach(v=> {
          if(v.productType != 'EXTERNAL_LINK') {
            this.productForm.pageNum = 1;
            this.getproList({
              pageSize: 200,
              pageNum: 1,
              linkLocationEnum: v.productType,
              name: null
            },v)
          }
        })
      } else {
        this.id = null
      }
    },
    'productRelationListVo.tableData'() {

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
  width: 90%;
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
    // width: 100px;
    // height: 80px;
    display: flex;
    align-items: center;
    img {
      width:100%;
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
.el-form-item{
  margin-bottom:0;
}
</style>
