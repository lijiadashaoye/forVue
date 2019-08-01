<template>
   <div class="componentWaper">

    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <div class="explosiveAdd">
        <el-button
          type="primary"
          size="mini"
          @click="addloginPage"
        >
          创建登录页
        </el-button>
      </div>
    </div>

    <div id="forTable">
      <isTable
      :inputData="this.$store.state.loginSpread.loginSpreadList"
      @tableEmit='tableEmit'/>
    </div>

    <!-- 修改/详情的弹框 -->
    <el-dialog :close-on-click-modal='false' :title=" updataFlag ? '修改登录页' : '详情' " :visible.sync="dialogVisible">
      <loginSpread
      :appChannel.sync="this.$store.state.protocol.appChannel"
      :opts.sync="opts"
      :updataFlag.sync="updataFlag"
      :detailFlag.sync="detailFlag"
      @req="req"
      @close="close"
      @cancel="cancel"/>
    </el-dialog>

    <!-- 更改状态 弹框 -->
    <el-dialog :close-on-click-modal='false'
      title="状态更新"
      :visible.sync="statusVisible"
      width="40%">
      <span slot="footer" class="statusFoot">
        <el-button type="danger" @click="checked('DISABLE')">停 用</el-button>
        <el-button type="primary" @click="checked('ENABLE')">启 用</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import isTable from '../../../components/isTable/isTable';
import loginSpread from '../../../components/loginSpread';
import { loginSpread_status_upd, loginSpread_updata,loginSpread_del } from '../../../api/setting_use.js';
import { mapMutations } from 'vuex';
export default {
  props: {},
  components:{
    isTable,
    loginSpread
  },
  data() {
    return {
      pageName: "", // 当前页面名字
      updataFlag: true,//判断是详情  修改
      dialogVisible: false,//dialog开关
      statusVisible: false,//状态dialog开关
      detailFlag: true,//详情开关
      opts: {

      },
      statusMsg: [{
        label: 'ENABLE',
        value: '启用'
      },{
        label: 'DISABLE',
        value: '停用'
      }]
    };
  },
  mounted() {
    this.pageName = this.$route.name;
    this.getLoginSpreadListData({
        pageNum: 1,
        pageSize: this.$store.state.loginSpread.loginSpreadList.pageSize
    });
    this.userDo();
    this.getAppChannel();
    this.$store.state.loginSpread.loginSpreadList.data.title = [
      {
        title: "App名称",
        key: "appChannelName",
        minWidth: "120",
      },{
        title: "字体颜色",
        key: "fontColor",
        minWidth: "120",
      },{
        title: "字体大小",
        key: "fontSize",
        minWidth: "80",
      },{
        title: "状态",
        key: "status",
        minWidth: "100",
        color:'blue'
      },{
        title: "修改人",
        key: "modifierName",
        minWidth: "120",
      },{
        title: "修改时间",
        key: "gmtModified",
        minWidth: "200",
      }
    ];
  },

  methods: {
    ...mapMutations({
      getAppChannel: 'protocol/getAppChannel',
      getLoginSpreadListData: 'loginSpread/getLoginSpreadListData',
      userDo: 'loginSpread/userDo',
    }),

    //点击新增
    addloginPage(){
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("login_page_spread_add") > -1) {
        this.$router.push(`/home/setting/login-page-spread/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },

    //点击关闭
    close(data) {
      this.dialogVisible = data
    },

    //点击取消
    cancel(data) {
      this.dialogVisible = data
    },
    //接受更改后的信息  请求
    req(data) {
      loginSpread_updata(data).then((res)=> {
        if(res && res.success){
          this.dialogVisible = false;
          this.getLoginSpreadListData({
              pageNum: this.$store.state.loginSpread.loginSpreadList.pageNum,
              pageSize: this.$store.state.loginSpread.loginSpreadList.pageSize
          });
        }
      }).catch((res) => {
        this.$message({
          type: 'error',
          message: `${res.message}`
        });
      })
    },

    //status更新
    checked(msg) {
      let message;
      if(msg === 'DISABLE'){
        message = '停用'
      }else{
        message = '启用'
      }
      this.$confirm(`确定将状态更改为${message}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          loginSpread_status_upd({
            id:this.opts.id,
            status:msg
          }).then(res=> {
            if(res && res.success) {
              this.statusVisible = false;
              this.$message({
                type: 'success',
                message: '更改成功!'
              });
              this.getLoginSpreadListData({
                  pageNum: this.$store.state.loginSpread.loginSpreadList.pageNum,
                  pageSize: this.$store.state.loginSpread.loginSpreadList.pageSize
              });
            }
          }).catch(res=> {
            this.statusVisible = false;
            this.$message({
              type: 'error',
              message: `${res.massage}`
            });          
          })
        }).catch(() => {
          this.statusVisible = false;
          this.$message({
            type: 'info',
            message: '已取消更新'
          });          
        });
    },

    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        loginSpread_del(id).then(res=> {
          if(res && res.success) {
            this.getLoginSpreadListData({
                pageNum: this.$store.state.loginSpread.loginSpreadList.pageNum,
                pageSize: this.$store.state.loginSpread.loginSpreadList.pageSize
            });
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        }).catch(res=> {
          this.$message({
            type: "error",
            message: `${res.massage}`
          });
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },

    //点击详情
    detail(data){
      this.dialogVisible = true;
      this.detailFlag = true;
      this.updataFlag = false;
      this.opts = data;
    },

    //点击修改
    edit(data){
      this.dialogVisible = true;
      this.updataFlag = true;
      this.opts = data;
      this.detailFlag = false;
    },

    //点击更改状态
    upStatus(data) {
      this.statusVisible = true;
      this.opts = data;
    },

    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
           //再次请求列表数据
          this.getLoginSpreadListData({
              pageNum: this.$store.state.loginSpread.loginSpreadList.pageNum,
              pageSize: this.$store.state.loginSpread.loginSpreadList.pageSize
          });
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
        case "upStatus"://更改状态
          this.upStatus(data.data)
          break;
      }
    },
  }
};
</script>

<style scoped='true' lang="scss">
  .explosiveAdd {
    width: 100%;
    height: 68px;
    padding: 20px;
    box-sizing: border-box;
    .el-button--mini{
      height:100%;
    }
  }
  .statusFoot{
    width:100%;
    height:100px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
</style>
