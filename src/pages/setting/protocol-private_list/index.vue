<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <div class="explosiveAdd">
        <el-button
          type="primary"
          size="mini"
          @click="addProtocol(true)"
        >
          新增协议政策
        </el-button>

        <div>
          <el-input
            placeholder="请输入App名称"
            prefix-icon="el-icon-search"
            size='mini'
            v-model="inputVal">
          </el-input>       
          <el-button
            type="primary"
            size="mini"
            @click="search"
            style="marginLeft:10px"
          >
            查询
          </el-button>
        </div>
        
      </div>
    </div>

    <div id="forTable">
      <isTable
      :inputData="this.$store.state.protocol.protocolList"
      @tableEmit='tableEmit'/>
    </div>

     <!-- 修改/详情信息的dialog -->
    <el-dialog :close-on-click-modal='false' :title=" detailFlag ? '详情' : '修改服务协议' " :visible.sync="dialogFormVisible">
      <protocolAddUpt
      :upd.sync="upd"
      :appChannel.sync="this.$store.state.protocol.appChannel"
      :opts="opts"
      :detailFlag.sync="detailFlag"
      @req="req"
      @close="close"
      @cancle="cancle"/>
    </el-dialog>
  </div>
</template>

<script>
import isTable from '../../../components/isTable/isTable';
import protocolAddUpt from '../../../components/protocolAddUpt';
import { protocol_upd, protocol_delete } from '../../../api/setting_use.js';
import { mapMutations } from 'vuex';
export default {
  props: {},
  components: {
    isTable,
    protocolAddUpt
  },
  data() {
    return {
      pageName: "", // 当前页面名字
      dialogFormVisible: false,
      inputVal: "",
      upd: false,
      detailFlag: true,
      opts:{

      }
    };
  },
  mounted() {
    this.pageName = this.$route.name;
    this.userDo();
    this.$store.state.protocol.protocolList.pageNum = 1;
    this.getProtocolListData({
            pageNum: this.$store.state.protocol.protocolList.pageNum,
            pageSize: this.$store.state.protocol.protocolList.pageSize
          });
    this.getAppChannel();
    this.$store.state.protocol.protocolList.data.title = [
      {
        title: "编号",
        key: "id",
        minWidth: "80",
        sortable:true
      },{
        title: "标题",
        key: "title",
        minWidth: "200",
        sortable:true
      },{
        title: "App",
        key: "appChannelName",
        minWidth: "120",
        sortable:true
      },{
        title: "高亮字体说明",
        key: "highlight",
        minWidth: "200",
        sortable:true
      },{
        title: "高亮字体颜色",
        key: "highlightColor",
        minWidth: "200",
        sortable:true
      }
    ]
  },

  methods: {
    ...mapMutations({
      userDo:'protocol/userDo',
      getProtocolListData: 'protocol/getProtocolListData',
      getAppChannel: 'protocol/getAppChannel',
    }),
    //点击新增按钮
    addProtocol(){
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("protocol_private_add") > -1) {
        this.$router.push(`/home/setting/protocol-private/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //点击保存
    req(data){
      protocol_upd(data).then(res=> {
        if(res && res.success){
          this.$message.success('保存成功')
          this.dialogFormVisible = false;
          this.upd = false;
          this.getProtocolListData({
            pageNum: this.$store.state.protocol.protocolList.pageNum,
            pageSize: this.$store.state.protocol.protocolList.pageSize
          })
        }
      })
    },

    //点击关闭
    close(data) {
      this.dialogFormVisible = data;
      this.opts = {};
    },

    //点击取消
    cancle() {
      this.dialogFormVisible = false;
      this.opts = null;
    },
    //点击修改
    edit(data){
      this.dialogFormVisible = true;
      this.detailFlag = false;
      this.opts = data;
      this.upd = true;
    },
    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        protocol_delete(id).then(res => {
          if(res && res.success) {
            this.getProtocolListData({
              pageNum: this.$store.state.protocol.protocolList.pageNum,
              pageSize: this.$store.state.protocol.protocolList.pageSize,
              appChannelName: this.inputVal ? this.inputVal : null,
            });
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        }).catch(res=>{
          this.$message({
            type: "error",
            message: `${res.message}`
          });
        })
      })
    },
    //点击详情
    detail(data){
      this.dialogFormVisible = true;
      this.detailFlag = true;
      this.opts = data;
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
           //再次请求列表数据
          this.getProtocolListData({
            pageNum: this.$store.state.protocol.protocolList.pageNum,
            pageSize: this.$store.state.protocol.protocolList.pageSize,
            appChannelName: this.inputVal ? this.inputVal : null,
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
      }
    },
    search() {
      this.getProtocolListData({
        pageNum:1,
        pageSize:this.$store.state.protocol.protocolList.pageSize,
        appChannelName: this.inputVal ? this.inputVal : null
      })
    }
  }
};
</script>

<style scoped='true' lang="scss">
  .explosiveAdd {
    width: 100%;
    height:68px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
    }
  }
</style>
