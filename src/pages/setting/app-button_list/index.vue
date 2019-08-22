<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3 style="margin-bottom:10px">
        {{pageName}}
      </h3>
      
      <el-button
      type="primary"
      size="mini"
      @click="addButton"
      >
      新增按钮
      </el-button>
    </div>

    <div id="forTable">
      <isTable
        :inputData='this.$store.state.app_button_add.tableMenu'
        @tableEmit='tableEmit'
      />
    </div>
    <!-- 修改/详情的弹框 -->
    <el-dialog :close-on-click-modal='false' :visible.sync="dialogVisible">
      <addButtonLeft
      :opts="opts"
      :upData.sync="upData"
      :isWxFlag="isWxFlag"
      @send="send"
      @cancel='cancel'/>
    </el-dialog>
  </div>
</template>

<script>
import isTable from '../../../components/isTable/isTable';
import addButtonLeft from '../../../components/addButtonLeft';
import { app_button_upd, app_button_status, app_button_del } from '../../../api/setting_use.js';
import { mapActions, mapMutations } from 'vuex';
export default {
  props: {},
  components:{
    isTable,
    addButtonLeft
  },
  data() {
    return {
      pageName: "" ,// 当前页面名字
      flag : false,
      opts: {
        
      },
      dialogVisible: false,//弹框开关
      isWxFlag: true,//点击修改判断是不是wx
      upData: false,
    };
  },
  created() {
    this.$store.state.app_button_add.tableMenu.pageNum = 1;
    this.canDoWhat()
    //请求表格数据
    this.getTableMenudata({
      pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
      pageSize: this.$store.state.app_button_add.tableMenu.pageSize,
      url: this.$ImgBaseUrl
    })
    this.pageName = this.$route.name;
    this.$store.state.app_button_add.tableMenu.data.title = [
      {
        title: "按钮名称",
        key: "buttonText",
        minWidth: "100"
      },{
        title: "选中后按钮图片",
        key: "buttonSelectedIcon",
        minWidth: "120",
        isImg: true,
      },{
        title: "未选中按钮图片",
        key: "buttonUnselectedIcon",
        minWidth: "120",
        isImg: true,
      },{
        title: "选中后文字颜色",
        key: "buttonSelectedTextColor",
        minWidth: "120"
      },{
        title: "未选中文字颜色",
        key: "buttonUnselectedTextColor",
        minWidth: "120"
      },{
        title: "平台",
        key: "platformName",
        minWidth: "100"
      },{
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "200",
        sortable:true
      },{
        title:"创建人",
        key:"modifier",
        minWidth:"100"
      },{
        title: "状态",
        key: "statusCN",
        minWidth: "100"
      }
    ]
  },
  methods: {
    ...mapMutations({
      getTableMenudata:'app_button_add/getTableMenudata',
      canDoWhat: 'app_button_add/canDoWhat'
    }),
    //点击  跳转 
    addButton(){
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
       if (jurisdiction.indexOf("app_button_add") > -1) {
        this.$router.push({
          path:'/home/setting/app-button/add'
        })
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },

    //点击编辑
    edit(data) {
      if(data.appChannelCode == "pincaiwx"){
        this.isWxFlag = false;
      }else {
        this.isWxFlag = true;
      }
      this.dialogVisible = true;
      this.upData = true;
      this.opts = data;
    },
    //点击取消
    cancel() {
      this.dialogVisible = false;
      this.upData = false;
      this.opts= {};
    },
    //编辑后  保存
    send(data){
      app_button_upd(data).then((res)=> {
        this.dialogVisible = false;
        this.getTableMenudata({
          pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
          pageSize: this.$store.state.app_button_add.tableMenu.pageSize,
          url: this.$ImgBaseUrl
        });
      }).catch((res) => {
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
    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        app_button_del(id).then(res=> {
          if(res && res.success) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getTableMenudata({
              pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
              pageSize: this.$store.state.app_button_add.tableMenu.pageSize,
              url: this.$ImgBaseUrl
            });
          }
        }).catch(res => {
          this.$message({
            type: "error",
            message: `res.message`
          });
        })
      })
    },
    //修改状态
    switchAction(data) {
      if(data.switch) {
          app_button_status({
              id: data.id,
              status: 'ENABLE'
          }).then(res => {
            this.getTableMenudata({
              pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
              pageSize: this.$store.state.app_button_add.tableMenu.pageSize,
              url: this.$ImgBaseUrl
            })
          })
      } else {
          app_button_status({
              id: data.id,
              status: 'DISABLE'
          }).then(res=> {
              this.getTableMenudata({
                pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
                pageSize: this.$store.state.app_button_add.tableMenu.pageSize,
                url: this.$ImgBaseUrl
              })
          })
      }
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
            this.getTableMenudata({
              pageNum: this.$store.state.app_button_add.tableMenu.pageNum,
              pageSize: this.$store.state.app_button_add.tableMenu.pageSize,
              url: this.$ImgBaseUrl
            });
          break;
        case "edit": // 编辑按钮
            this.edit(data.data)
          break;
        case "delete": // 单独删除按钮
            this.delete(data.data.id)
          break;
        case "switch": // switch 变换
            this.switchAction(data.data);
        break;
      }
    }
  }
};
</script>

<style scoped='true' lang="scss">
.app-menu{
  width:100%;
  margin-top:10px;
  padding:0 10px;
  box-sizing:border-box;
}
</style>
