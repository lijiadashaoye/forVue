<template>
    <el-card class="box-card">
        <!-- 产品类型 -->
        <div slot="header" class="clearfix">
          <div class="product-item">
            <span class="item-name">*产品类型:</span>
            <el-select v-model="productType"  clearable  placeholder="请选择">
              <el-option
                v-for="item in productTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </div>

          <!-- 产品名称 -->
          <div class="product-item">
            <span class="item-name">*产品名称:</span>
            <el-select v-model="productName" :disabled="changeFlag"  clearable  placeholder="请选择">
              <el-option
                v-for="item in this.productNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
            <span class="item-name">图片:</span>
            <div class="item-img">
              <el-upload
                class="avatar-uploader"
                action="customize"
                :show-file-list="false"
                :http-request="upload"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <el-button v-else>选择图片</el-button>
              </el-upload>
            </div>
          </div>

          <div class="product-bottom">
            <el-button @click="save">保存</el-button>
            <el-button >取消</el-button>
          </div>
        </div>
    </el-card>
</template>

<script>
import { upLoadImg } from '../../api/setting_use.js';
export default {
  name:'SettingExplosiveCommend',
  props:['productTypeList', 'productNameList', 'opts', 'dataType'],
  data() {
    return {
      flag: true,
      productType: "",
      productName: "",
      defaultTime:[],
      pickerOpt: {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }]
    },
    timeVal: '',
    imageUrl: ''
    }
  },
  mounted(){
    if(this.opts){
      this.productType = this.opts.productTypeName;
      this.productName = this.opts.productName;
      this.timeVal = [this.opts.startTime,this.opts.endTime];
    }
  },
  methods:{
    upload(params) {
      const _file = params.file;
      const isLt5M = _file.size / 1024 / 1024 < 5;
      var formData = new FormData();
      formData.append("file", _file);
      if (!isLt5M) {
          this.$message.error("请上传5M以下的图片");
          return false;
      }
      upLoadImg(formData).then(res=> {
          if(res.success){
              this.imageUrl = this.$ImgBaseUrl + res.data
          }
      })
    },
    save(){
      if(this.productType && this.productName && this.timeVal){
        let id;
        this.productNameList.forEach((v, i)=> {
          if(v.value === this.productName){
            id = v.id
          }
        })
        //整理params
        let obj = {
          id:this.opts ? this.opts.id : "",
          productType:this.productType,
          productName:this.productName,
          startTime:new Date(this.timeVal[0]).getTime(),
          endTime:new Date(this.timeVal[1]).getTime(),
          productId:id,
          code:"12",
          productTypeName:this.productType,
          dataType:this.dataType
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
  },
  watch:{
    'opts.productTypeName'(){
      this.productType = this.opts.productTypeName;
    },
    'opts.productName'(){
      this.productName = this.opts.productName;
    },
    'opts.startTime'(){
      this.timeVal = [this.opts.startTime,this.opts.endTime];
    }
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
