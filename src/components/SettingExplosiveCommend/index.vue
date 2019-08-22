<template>
<el-card class="box-card">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
     <el-form-item label="产品类型:" prop="productType">
        <el-select v-model="ruleForm.productType"  clearable  @change="typeSelect(ruleForm.productType)" placeholder="请选择">
          <el-option
            v-for="(item,ind) in productTypeList"
            :key="ind"
            :label="item.linkName"
            :value="item.linkModel"
            >
          </el-option>
        </el-select>
     </el-form-item>
     
    <el-form-item label="产品名称:" prop="productId">
      <el-select
        v-model="ruleForm.productId"
        :disabled="changeFlag"
        clearable 
        filterable
        v-loadmore='loadmore'
        remote
        reserve-keyword
        :remote-method="fuzzySearch"
        placeholder="请选择">
            <el-option
              v-for="(item,ind) in productNameList"
              :key="ind"
              :label="item.name"
              :value="item.id"
              >
            </el-option>
          </el-select>
    </el-form-item>

    <el-form-item label="生效时间:" prop="timeVal">
      <el-date-picker
        v-model="ruleForm.timeVal"
        type="daterange"
        align="right"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="defaultTime"
        :picker-options="pickerOpt">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="图片:" prop="imageUrl">
      <el-upload
        class="avatar-uploader"
        action="customize"
        :show-file-list="false"
        :http-request="upload"
        :on-change="uploadProcess"
        >
        <img v-if="ruleForm.imageUrl!= '' && videoFlag == false" :src="ImgBaseUrl + ruleForm.imageUrl" class="avatar">
        <div v-else-if='ruleForm.imageUrl == "" && videoFlag == false'>
          <el-button>选择图片<br/><span style="font-size:12px;color:red">不能大于2M</span><br/><span style="font-size:12px;color:red">jpg/png/gif/jpeg格式</span></el-button>
        </div>
        <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      <el-button @click="save('ruleForm')">保存</el-button>
      <el-button @click='cancel("ruleForm")'>取消</el-button>
    </el-form-item>

     
  </el-form>
</el-card>
</template>

<script>
import { upLoadImg, productUrl_list, productList } from '../../api/setting_use.js';
import { clearInterval } from 'timers';
export default {
  name:'SettingExplosiveCommend',
  props:['opts', 'dataType'],
  data() {
    return {
      flag: true,
      videoFlag: false,
      videoUploadPercent: 0,
      productForm: {
        pageSize: 200,
        pageNum: 1,
        linkLocationEnum: '',
        name: null
      },
      ruleForm: {
        productType: "",
        productId: "",
        timeVal: [],
        imageUrl: '',
      },
      rules: {
        productType: [{ required: true, message: '请填写产品类型', trigger: 'blur' }],
        productId: [{ required: true, message: '请填写产品名称', trigger: 'blur' }],
        timeVal: [{ required: true, message: '请填写生效时间', trigger: 'blur' }],
        imageUrl: [{ required: true, message: '请上传图片', trigger: 'blur' }],
      },
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
      ImgBaseUrl: ''
    }
  },
  mounted(){
    this.ImgBaseUrl = this.$ImgBaseUrl;
    productUrl_list().then(res=> {
      if(res && res.success) {
        this.productTypeList = res.data.list.filter(v=> {
          return v.linkUrl != '' && v.linkUrl != null && v.linkUrl != 0 && v.remarks == 'news';
        });
      }
    });
    if(this.opts){
      this.productForm.pageNum = 1;
      this.ruleForm.productType = this.opts.productType;
      this.productName = this.opts.productName;
      this.ruleForm.productId = this.opts.productId;
      this.ruleForm.timeVal = [this.opts.startTime,this.opts.endTime];
      this.ruleForm.imageUrl = this.opts.productImageUrl;
      if(this.ruleForm.productType != '' && this.ruleForm.productType != null) {
        this.productForm.linkLocationEnum = this.ruleForm.productType;
        this.getproList(this.productForm)
      }
    }
  },
  methods:{
    upload(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      const idJPG = _file.type === "image/jpeg" || _file.type === "image/gif" || _file.type === "image/png" || _file.type === "image/jpg";
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
              this.videoFlag = false;
              this.ruleForm.imageUrl = res.data
          }
      })
    },
    loadmore() {
      if(this.productForm.pageNum < this.productPageCount) {
        this.productForm.pageNum++;
        this.getproList(this.productForm);
      }
    },
    uploadProcess(file, fileList){
      if(file.status === 'ready') {
        this.videoUploadPercent = 0;
        this.videoFlag = true;
        const interval = setInterval(() => {
          this.videoUploadPercent += 1;
          if(this.videoUploadPercent >= 99) {
            window.clearInterval(interval)
            return
          }
        }, 200);
      }
      if(file.status === 'success') {
        window.clearInterval(interval)
        this.videoFlag = false;
        this.videoUploadPercent = 100;
      }
    },
    getproList(form) {
      console.log(1)
      this.productNameList = [];
      productList(form).then(res=> {
        if(res && res.success) {
          this.productPageCount = res.data && Math.ceil(res.data.total/this.productForm.pageSize)
          if(res.data && res.data.list != null && res.data.list != []) {
            const _res = res.data.list
            this.productNameList = [...this.productNameList,..._res]
            console.log(this.productNameList)
          }
        }
      })
    },
    fuzzySearch(query) {
      this.productNameList = [];
      if(query!= '' && this.ruleForm.productType != '') {
          this.productForm.name = query;
          this.productForm.linkLocationEnum = this.ruleForm.productType;
          this.getproList(this.productForm)
      } else {
        this.productForm.name = null;
          this.productForm.linkLocationEnum = this.ruleForm.productType;
          this.getproList(this.productForm)
      }
    },
    cancel() {
      this.$emit('cancel')
      if(!this.opts) {
        this.ruleForm.productType = '';
        this.ruleForm.productId = '';
        this.ruleForm.timeVal = [];
        this.ruleForm.imageUrl = '';
      }
    },
    save(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let id;
            this.productNameList.forEach((v, i)=> {
              if(v.id === this.ruleForm.productId){
                this.productName = v.name
              }
            })
            this.productTypeList.forEach(v=> {
              if(this.ruleForm.productType == v.linkModel) {
                this.productTypeName = v.linkName
              }
            })
            //整理params
            let obj = {
              id:this.opts ? this.opts.id : "",
              productType:this.ruleForm.productType,
              productId:this.ruleForm.productId,
              productName: this.productName,
              startTime:new Date(this.ruleForm.timeVal[0]).getTime(),
              endTime:new Date(this.ruleForm.timeVal[1]).getTime(),
              code:"12",
              productTypeName:this.productTypeName,
              dataType:this.dataType,
              productImageUrl: this.ruleForm.imageUrl,
              // dataType: this.opts.dataType ?  this.opts.dataType : ''
            }
            //向父组件传递   请求你事需要的参数
            this.$emit('reqs',obj)
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
      if(val != '') {
        this.ruleForm.productId = '';
        this.productForm = {
          pageSize: 200,
          pageNum: 1,
          linkLocationEnum: '',
          name: null
        }
        this.productForm.linkLocationEnum = val;
        this.getproList(this.productForm)
      }
    },
  },
  watch:{
    'opts.id'() {
      this.productForm.pageNum = 1;
      this.ruleForm.productType = this.opts.productType;
      this.productTypeName = this.opts.productTypeName;
      this.productName = this.opts.productName;
      this.ruleForm.productId = this.opts.productId;
      this.ruleForm.timeVal = [this.opts.startTime,this.opts.endTime];
      this.ruleForm.imageUrl = this.opts.productImageUrl;
      if(this.ruleForm.productType != '' && this.ruleForm.productType != null) {
        this.productForm.linkLocationEnum = this.ruleForm.productType;
        this.getproList(this.productForm)
      }
    },
    'ruleForm.productType'() {
      // if(this.ruleForm.productType != '' && this.ruleForm.productType != null) {
      //   this.productForm.linkLocationEnum = this.ruleForm.productType;
      //   this.getproList(this.productForm)
      // }
    }
    // 'opts.productTypeName'(){
    //   this.ruleForm.productType = this.opts.productTypeName;
    // },
    // 'opts.ruleForm.productId'(){
    //   this.ruleForm.productId = this.opts.ruleForm.productId;
    // },
    // 'opts.startTime'(){
    //   this.ruleForm.timeVal = [this.opts.startTime,this.opts.endTime];
    // }
  },
  computed:{
    changeFlag(){
      return this.flag = this.ruleForm.productType === "";
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
