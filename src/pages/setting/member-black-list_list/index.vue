<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <div class="explosiveAdd">
        <el-button
          type="primary"
          size="mini"
          @click="addBlackList"
        >
          添加黑名单
        </el-button>
      </div>
    </div>

    <div id="forTable">
      <isTable
      :inputData="this.$store.state.blackList.blackNameList"
      @tableEmit='tableEmit'/>
    </div>
    <!-- 修改/详情的弹框 -->
    <el-dialog :close-on-click-modal='false' :visible.sync="dialogVisible">
      <memberBlackList
      :opts="opts"
      :detailFlag="detailFlag"
      @send="send"
      @cancel="cancel"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { black_list_upd } from '../../../api/setting_use.js'
import isTable from '../../../components/isTable/isTable';
import memberBlackList from '../../../components/memberBlackList';
export default {
  props: {},
  components: {
    isTable,
    memberBlackList
  },
  data() {
    return {
      pageName: "",// 当前页面名字
      detailFlag: false,//判断点击的是详情 编辑
      dialogVisible: false,//弹框开关
      opts: {

      }
    };
  },
  mounted() {
    this.userDo();
    this.getBlackNameListData();
    this.pageName = this.$route.name;
    this.$store.state.blackList.blackNameList.data.title = [
      {
        title: "手机号",
        key: "memberPhone",
        minWidth: "120",
      },{
        title: "处理方式",
        key: "joinTypeCN",
        minWidth: "120",
      },{
        title: "原因描述",
        key: "dealTypeCN",
        minWidth: "120",
      },{
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "200",
      }
    ]
  },

  methods: {
    ...mapMutations({
      userDo : 'blackList/userDo',
      getBlackNameListData : 'blackList/getBlackNameListData',
      deleteList: 'blackList/deleteList'
    }),

    addBlackList() {
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("black_list_add") > -1) {
        this.$router.push(`/home/setting/member-black-list/add`);
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
        // window.location.reload();
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
    //修改点击取消
    cancel() {
      this.dialogVisible = false;
    },
    //修改点击保存
    send(data){
      black_list_upd(data).then(res=> {
        if(res) {
          this.dialogVisible = false;
          this.getBlackNameListData({
            pageNum: this.$store.state.protocol.protocolList.pageNum,
            pageSize: this.$store.state.protocol.protocolList.pageSize
          })
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
  //  点击修改
    edit(data) {
      this.opts = data;
      this.dialogVisible = true;
      this.detailFlag = false;
    },
    //点击详情
    detail(data) {
      this.opts = data;
      this.dialogVisible = true;
      this.detailFlag = true;
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
           //再次请求列表数据
          this.getBlackNameListData();
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

</style>
