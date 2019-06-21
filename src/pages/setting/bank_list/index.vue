<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <div class="explosiveAdd">
        <el-button
          type="primary"
          size="mini"
          @click="addbank"
        >
          创建银行
        </el-button>
      </div>
    </div>

    <div id="forTable">
      <isTable
      :inputData="this.$store.state.bank.bankList"
      @tableEmit='tableEmit'/>
    </div>
    <!-- 修改/详情的弹框 -->
    <el-dialog :close-on-click-modal='false' :title=" updataFlag ? '修改' : '详情' " :visible.sync="dialogVisible">
      <addBankDetail
      :detailFlag="detailFlag"
      :opts="opts"
      @send="send"/>
    </el-dialog>
  </div>
</template>

<script>
import isTable from '../../../components/isTable/isTable';
import { mapMutations, mapActions } from 'vuex';
import { bank_list_upd } from '../../../api/setting_use.js';
import addBankDetail from '../../../components/addBankDetail';
export default {
  props: {},
  components: {
    isTable,
    addBankDetail
  },
  data() {
    return {
      pageName: "", // 当前页面名字
      updataFlag: true,//判断是详情  修改
      dialogVisible: false,//弹框开关
      detailFlag: false,
      opts: {

      }
    };
  },
  mounted() {
    this.pageName = this.$route.name;
    this.userDo();
    this.getList()
    this.$store.state.bank.bankList.data.title = [
      {
        title: "银行名称",
        key: "bankName",
        minWidth: "120",
      },{
        title: "logo",
        key: "logoPhoto",
        minWidth: "120",
        isImg:true
      },{
        title: "银行背景图",
        key: "background",
        minWidth: "120",
        isImg:true
      },{
        title: "创建人名称",
        key: "creatorName",
        minWidth: "120",
      },{
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "200",
      },{
        title: "修改人名称",
        key: "modifierName",
        minWidth: "120",
      },{
        title: "修改时间",
        key: "gmtModified",
        minWidth: "200",
      }
    ]
  },

  methods: {
    ...mapMutations({
      userDo: 'bank/userDo',
      deleteList: 'bank/deleteList'
    }),
    ...mapActions({
      getList: 'bank/getList'
    }),
    //点击保存
    send(data) {
      this.dialogVisible = false;
      bank_list_upd(data).then((res)=> {
          this.getList();
      }).catch(() => {
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

    //点击添加
    addbank(){
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("bank_add") > -1) {
        this.$router.push(`/home/setting/bank/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      } 
    },

    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.deleteList(id);
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
      });
    },

    //点击详情
    detail(data) {
      this.updataFlag = false;
      this.dialogVisible = true;
      this.detailFlag = true;
      this.opts = data;
    },

    //点击编辑
    edit(data){
      this.updataFlag = true;
      this.dialogVisible = true;
      this.detailFlag = false;
      this.opts = data;
    },

    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
           //再次请求列表数据
          this.getList();
          break;
        case "edit": // 编辑按钮
          this.edit(data.data);
          break;
        case "delete": // 删除按钮
          this.delete(data.data.id);
          break;
        case "detail": // 详情
          this.detail(data.data);
          break;
      }
    },
  }
};
</script>

<style scoped='true' lang="scss">
  .explosiveAdd {
    width: 100%;
    height: 80px;
    padding: 20px;
    box-sizing: border-box;
    .el-button--mini{
      height:100%;
    }
  }
</style>
