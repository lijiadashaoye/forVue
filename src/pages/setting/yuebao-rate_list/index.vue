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
          @click="addYuEBao"
        >
          新增余额宝收益
        </el-button>
      </div>
      <div class="filter">
        <span>收益时间：</span>
        <el-date-picker
          v-model="searchVal"
          type="date"
          placeholder="选择日期"
          @change="search">
        </el-date-picker>
      </div>
    </div>

    <div id="forTable">
       <isTable
        :inputData='this.$store.state.yuebaoRate.yuebaoRateList'
        @tableEmit='tableEmit'
      />
    </div>

    <el-dialog :close-on-click-modal='false'
      title="修改余额宝收益"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <yuebaoAddorUpt
      @reqest="reqest"
      :options="obj"/>
    </el-dialog>

  </div>
</template>
<script>

import { yuebao_updata } from '../../../api/setting_use.js'
import { mapActions, mapMutations } from "vuex";
import isTable from '../../../components/isTable/isTable';
import yuebaoAddorUpt from '../../../components/yuebaoAddorUpt';
import { timestampToTime } from '../../../sets/timeFormat.js';
export default {
  props: {},
  components:{
    isTable,
    yuebaoAddorUpt
  },
  data() {
    return {
      pageName: "", // 当前页面名字
      searchVal: "",
       centerDialogVisible: false,
       obj: {

       }
    };
  },
  created() {
  },
  mounted() {
    this.userDo();
    this.pageName = this.$route.name;
    this.getYebaoRateListData({
            pageNum: this.$store.state.yuebaoRate.yuebaoRateList.pageNum,
            pageSize: this.$store.state.yuebaoRate.yuebaoRateList.pageSize,
        });
    this.$store.state.yuebaoRate.yuebaoRateList.data.title = [
      {
        title: "收益日期",
        key: "rateDate",
        minWidth: "120",
        sortable: true
      },
      {
        title: "七日年化(%)",
        key: "onThe7thOfTheYearYield",
        minWidth: "120",
        sortable: true
      },
      {
        title: "万份收益",
        key: "thousandsOfYearsYields",
        minWidth: "120",
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
        minWidth: "120"
      }
    ];
  },

  methods: {
    ...mapMutations({
      getYebaoRateListData:'yuebaoRate/getYebaoRateListData',
      userDo:'yuebaoRate/userDo',
      deteleList:'yuebaoRate/deteleList'
    }),
    //点击添加
    addYuEBao(){
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("yuebao_rate_add") > -1) {
        this.$router.push(`/home/setting/yuebao-rate/add`);
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
    //点击编辑
    edit(data){
      this.centerDialogVisible = true;
      this.obj = data;
    },
    //编辑后的处理
    reqest(data){
      this.obj = data;
      yuebao_updata(data).then(res=> {
        if(res.success){
          this.centerDialogVisible = false;
          this.getYebaoRateListData({
            pageNum: this.$store.state.yuebaoRate.yuebaoRateList.pageNum,
            pageSize: this.$store.state.yuebaoRate.yuebaoRateList.pageSize,
        });
        }
      }).catch(()=> {
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
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getYebaoRateListData({
            pageNum: this.$store.state.yuebaoRate.yuebaoRateList.pageNum,
            pageSize: this.$store.state.yuebaoRate.yuebaoRateList.pageSize,
        });
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
    search() {
      this.getYebaoRateListData({
        rateStartTime:timestampToTime(this.searchVal)
      })
    }
  },
};
</script>

<style scoped='true' lang="scss">
.explosiveAdd {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  .el-input {
    width: 200px;
  }
}
.filter{
  display:flex;
  align-items: center;
  span{
    width:120px;
  }
}
</style>
