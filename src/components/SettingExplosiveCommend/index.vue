<template>
    <el-card class="box-card">
        <!-- 产品类型 -->
        <div slot="header" class="clearfix">
          <div class="product-item">
            <span class="item-name">*产品类型:</span>
            <el-select v-model="productType"  clearable  @change="typeSelect(productType)" placeholder="请选择">
              <el-option
                v-for="(item,ind) in productTypeList"
                :key="ind"
                :label="item.linkName"
                :value="item.linkModel"
                >
              </el-option>
            </el-select>
          </div>

          <!-- 产品名称 -->
          <div class="product-item">
            <span class="item-name">*产品名称:</span>
            <el-select v-model="productId" :disabled="changeFlag"  clearable filterable placeholder="请选择">
              <el-option
                v-for="(item,ind) in this.productNameList"
                :key="ind"
                :label="item.name"
                :value="item.id"
                remote
                reserve-keyword
                :remote-method="fuzzySearch"
                v-loadmore='loadmore'>
              </el-option>
            </el-select>
          </div>
          <!-- 生效时间 -->
          <div class="product-item">
            <span class="item-name">*生效时间:</span>
            <el-date-picker
              v-model="timeVal"
              type="daterange"
              align="right"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="defaultTime"
              :picker-options="pickerOpt">
            </el-date-picker>
          </div>

          <div class="product-item">
            <span class="item-name">*图片:</span>
            <div class="item-img">
              <el-upload
                class="avatar-uploader"
                action="customize"
                :show-file-list="false"
                :http-request="upload"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div v-else>
                  <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
                </div>
              </el-upload>
            </div>
          </div>

          <div class="product-bottom">
            <el-button @click="save">保存</el-button>
            <el-button @click='cancel'>取消</el-button>
          </div>
        </div>
    </el-card>
</template>

<script>
import { upLoadImg, productUrl_list, productList } from '../../api/setting_use.js';
export default {
  name:'SettingExplosiveCommend',
  props:['opts', 'dataType'],
  data() {
    return {
      flag: true,
      productForm: {
        pageSize: 200,
        pageNum: 1,
        linkLocationEnum: '',
        name: null
      },
      productType: "",
      productId: "",
      productName: "",
      productTypeName: '',
      defaultTime:[],
      productTypeList: [],
      productNameList: [],
      pickerOpt: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }],
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
    timeVal: '',
    imageUrl: ''
    }
  },
  mounted(){
    productUrl_list().then(res=> {
      if(res && res.success) {
        this.productTypeList = res.data.list.filter(v=> {
          return v.linkUrl != '' && v.linkUrl != null && v.linkUrl != 0;
        });
      }
    });
    if(this.opts){
      this.productForm.pageNum = 1;
      this.productType = this.opts.productType;
      this.productName = this.opts.productName;
      this.productId = this.opts.productId;
      this.timeVal = [this.opts.startTime,this.opts.endTime];
      this.imageUrl = this.opts.productImageUrl;
    }
  },
  methods:{
    upload(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      const idJPG = _file.type === "image/jpeg" || "image/gif" || "image/png" || "image/jpg";
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
      upLoadImg(formData).then(res=> {
          if(res && res.success){
              this.imageUrl = this.$ImgBaseUrl + res.data
          }
      })
    },
    loadmore() {
      if(this.productForm.pageNum < this.productPageCount) {
        this.productForm.pageNum++;
        this.getproList(this.productForm);
      }
    },
    getproList(form) {
      productList(form).then(res=> {
        if(res && res.success) {
          this.productPageCount = res.data && Math.ceil(res.data.total/this.productForm.pageSize)
          if(res.data && res.data.list != null && res.data.list != []) {
            const _res = res.data.list
            this.productNameList = [...this.productNameList,..._res]
          }
        }
      }).catch(res=> {
        this.$message.error(`${res.message}`)
      })
    },
    fuzzySearch(query) {
      if(query!= '' && this.productType != '') {
          this.productNameList = [];
          this.productForm.name = query;
          this.productForm.linkLocationEnum = this.productType;
          this.getproList(this.productForm)
      } else {
          this.productNameList = [];
          this.productForm.name = null;
          this.productForm.linkLocationEnum = this.productType;
          this.getproList(this.productForm)
      }
    },
    cancel() {
      this.$emit('cancel')
      if(!this.opts) {
        this.productType = '';
        this.productId = '';
        this.timeVal = [];
        this.imageUrl = '';
      }
    },
    save(){
      if(this.productType && this.productId && this.timeVal && this.imageUrl){
        let id;
        this.productNameList.forEach((v, i)=> {
          if(v.id === this.productId){
            this.productName = v.name
          }
        })
        this.productTypeList.forEach(v=> {
          if(this.productType == v.linkModel) {
            this.productTypeName = v.linkName
          }
        })
        //整理params
        let obj = {
          id:this.opts ? this.opts.id : "",
          productType:this.productType,
          productId:this.productId,
          productName: this.productName,
          startTime:new Date(this.timeVal[0]).getTime(),
          endTime:new Date(this.timeVal[1]).getTime(),
          code:"12",
          productTypeName:this.productTypeName,
          dataType:this.dataType,
          productImageUrl: this.imageUrl,
          // dataType: this.opts.dataType ?  this.opts.dataType : ''
        }
        //向父组件传递   请求你事需要的参数
        this.$emit('reqs',obj)
      }else{
        this.$alert('*号是必填项', '提交失败', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        })
      }
    },
    //选择产品类型
    typeSelect(val) {
      this.productNameList = [];
      this.productForm = {
        pageSize: 200,
        pageNum: 1,
        linkLocationEnum: '',
        name: null
      }
      this.productForm.linkLocationEnum = val;
      this.getproList(this.productForm)
    },
  },
  watch:{
    'opts.id'() {
      this.productForm.pageNum = 1;
      this.productType = this.opts.productType;
      this.productTypeName = this.opts.productTypeName;
      this.productName = this.opts.productName;
      this.productId = this.opts.productId;
      this.timeVal = [this.opts.startTime,this.opts.endTime];
      this.imageUrl = this.opts.productImageUrl;
    },
    'productType'() {
      if(this.productType != '' && this.productType != null) {
        this.productForm.linkLocationEnum = this.productType;
        this.getproList(this.productForm)
      }
    }
    // 'opts.productTypeName'(){
    //   this.productType = this.opts.productTypeName;
    // },
    // 'opts.productId'(){
    //   this.productId = this.opts.productId;
    // },
    // 'opts.startTime'(){
    //   this.timeVal = [this.opts.startTime,this.opts.endTime];
    // }
  },
  computed:{
    changeFlag(){
      return this.flag = this.productType === "";
    }
  }
}
</script>

<style scoped='true' lang="scss">
  .product-item{
    width:100%;
    height:100px;
    padding:20px;
    display:flex;
    box-sizing:border-box;
    .item-name{
      width:200px;
      margin-right: 20px;
    }
    .item-img{
      width:100px;
      height:80px;
      display:flex;
      align-items: center;
      img{
          width:80px;
          height:80px;
      }
    }
  }
  // .img{
  //   width:40px;
  //   height:40px;
  // }
  .product-bottom{
    width:60%;
    margin-top:50px;
    text-align: center;
  }
</style>
