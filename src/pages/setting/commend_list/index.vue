<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>
        {{pageName}}
      </h3>
      <div class="explosiveAdd">
        <el-button
          type="primary"
          size="mini"
          @click="addCommend"
        >
          新增新手专享
        </el-button>
      </div>
      <div>
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm searchForm">
          <el-form-item label="产品名称" prop="productName">
            <!-- <el-select v-model="ruleForm.productName" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in this.$store.state.commend.commendList.productNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
            <el-input
              placeholder="请输入产品名称"
              prefix-icon="el-icon-search"
              v-model="ruleForm.productName">
            </el-input>
          </el-form-item>

          <el-form-item label="生效时间" prop="time">
            <el-date-picker
              v-model="ruleForm.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search('ruleForm')">查询</el-button>
            <el-button @click="resetForm('ruleForm')">清除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 列表 -->
    <div id="forTable">
      <isTable
        :inputData='this.$store.state.commend.commendList'
        @tableEmit='tableEmit'
      />
    </div>
    <!-- 修改遮罩 -->
    <el-dialog :close-on-click-modal='false' title="修改" :visible.sync="flag">
      <SettingExplosiveCommend
        :productTypeList="productTypeList"
        :productNameList="productNameList"
        :opts="opts"
        @reqs="reqs"
        :dataType="type"
        @cancel='cancel'/>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import isTable from "../../../components/isTable/isTable";
import SettingExplosiveCommend from "../../../components/SettingExplosiveCommend";
import datePicker from '../../../components/datePicker';
import { commend_updata } from '../../../api/setting_use.js';
import { timestampToTime } from '../../../sets/timeFormat.js';
export default {
  props: {},
  components: {
    isTable,
    SettingExplosiveCommend,
    effectTime:datePicker
  },
  data() {
    return {
      pageName: "", // 当前页面名字
      searchVal: "",
      msg:"",
      flag: false,
      type: 'RECOMMEND',
      ruleForm: {
        productName: '',
        time: [],
      },
      rules: {},
      productTypeList:[{
        value: "货币基金",
        label: "货币基金"
      },{
        value: "理财产品",
        label: "理财产品"
      },{
        value: "纯债基金",
        label: "纯债基金"
      },{
        value: "存款产品",
        label: "存款产品"
      }],
      productNameList:[{
        id: 1,
        value: "美金",
        label: "美金"
      },{
        id: 2,
        value: "欧元",
        label: "欧元"
      },{
        id: 3,
        value: "卢比",
        label: "卢比"
      },{
        id: 4,
        value: "人民币",
        label: "人民币"
      }],
      opts:{

      },
      searchOpt: [],//搜索列表
      list: [],
      states: [],
      productList:[],
      loading: true,
      effectTimeVal: "",//生效时间
    };
  },
  mounted() {
    this.getCommendList({
      pageNum: 1,
      pageSize: this.$store.state.commend.commendList.pageSize,
      dataType:"RECOMMEND"
    });
    this.getProNameList();
    this.userDo();
    this.pageName = this.$route.name;
    this.$store.state.commend.commendList.data.title = [
      {
        title: "ID",
        key: "id",
        minWidth: "100",
        sortable: true
      },
      {
        title: "产品名称",
        key: "productName",
        minWidth: "120"
      },
      {
        title: "产品类型",
        key: "productTypeName",
        minWidth: "100"
      },
      {
        title: "开始时间",
        key: "startTime",
        minWidth: "200",
        sortable: true
      },
      {
        title: "结束时间",
        key: "endTime",
        minWidth: "200",
        sortable: true
      },
      {
        title: "操作时间",
        key: "gmtModified",
        minWidth: "200",
        sortable: true
      },
      {
        title: "操作人",
        key: "modifierName",
        minWidth: "100"
      }
    ];
  },
  methods: {
    ...mapMutations({
      getCommendList: "commend/getCommendList",
      getProNameList: "commend/getProNameList",
      userDo: "commend/userDo",
      deteleList: "commend/deleteList"
    }),
    ...mapActions({
    }),
    addCommend() {
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("commend_add") > -1) {
        this.$router.push(`/home/setting/commend/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //点击详情
    open() {
      this.$alert("您好，此项暂未开启", "产品详情", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    },
    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // window.location.reload();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.deteleList(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cancel() {
      this.opts = {}
      this.flag = false;
    },
    //修改后点击保存
    reqs(data){
      this.opts = data
      commend_updata(data).then(res=> {
        if(res && res.success){
          this.flag = false;
          this.getCommendList({
              dataType:"RECOMMEND",
              startTime:this.ruleForm.time[0] ? timestampToTime(this.ruleForm.time[0]) : null,
              endTime: this.ruleForm.time[1] ? timestampToTime(this.ruleForm.time[1]) : null,
              productName: this.ruleForm.productName != '' ? this.ruleForm.productName : null,
              pageNum: this.$store.state.commend.commendList.pageNum,
              pageSize: this.$store.state.commend.commendList.pageSize,});
        }
      }).catch(()=>{
        this.$alert(`${res.message}`, '保存失败', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      })
    },
    //点击编辑
    edit(data){
      this.flag = true;
      data.dataType = "RECOMMEND";
      this.opts = data;
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
           this.getCommendList({dataType:"RECOMMEND",
              startTime:this.ruleForm.time[0] ? timestampToTime(this.ruleForm.time[0]) : null,
              endTime: this.ruleForm.time[1] ? timestampToTime(this.ruleForm.time[1]) : null,
              productName: this.ruleForm.productName != '' ? this.ruleForm.productName : null,
              pageNum: this.$store.state.commend.commendList.pageNum,
              pageSize: this.$store.state.commend.commendList.pageSize,});
          break;
        case "edit": // 编辑按钮
          this.edit(data.data);
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
        case "detail": // 详情
          this.open();
          break;
      }
    },
   search(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getCommendList({
              dataType:"RECOMMEND",
              startTime:this.ruleForm.time[0] ? timestampToTime(this.ruleForm.time[0]) : null,
              endTime: this.ruleForm.time[1] ? timestampToTime(this.ruleForm.time[1]) : null,
              productName: this.ruleForm.productName != '' ? this.ruleForm.productName : null,
              pageNum: 1,
              pageSize: this.$store.state.commend.commendList.pageSize,
            })
          } else {
            return false;
          }
      });
    },
    //清除
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>

<style scoped='true' lang="scss">
.explosiveAdd {
  width: 100%;
  height:68px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  .el-input {
    width: 200px;
  }
}
.Dialog {
  width:100%;
  height:100%;
  background: rgba(0,0,0,.6);
  padding:100px;
  box-sizing:border-box;
}
.searchForm{
  display:flex;
  flex-wrap: nowrap;
}
</style>
