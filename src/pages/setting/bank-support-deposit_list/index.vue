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
          添加开户银行
        </el-button>
        <div>
          <el-input
            placeholder="请输直销银行名称"
            prefix-icon="el-icon-search"
            v-model.trim="directName"
            size='mini'
            @input='search'>
          </el-input>
        </div>
        
      </div>

    </div>

    <div id="forTable">
      <isTable
      :inputData="this.$store.state.bankSupport.bankSupportList"
      @tableEmit='tableEmit'/>
    </div>
    <!-- 修改/详情的弹框 -->
    <el-dialog :close-on-click-modal='false' :title=" updataFlag ? '修改' : '详情' " :visible.sync="dialogVisible">
      <addBankSupport
      :opts="opts"
      :detailFlag="detailFlag"
      :list="this.$store.state.bankCard.bankCardList.data.list"
      @send="send"
      @close="close"
      @cancel="cancel"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { bank_support_upd } from '../../../api/setting_use.js';
import isTable from '../../../components/isTable/isTable';
import addBankSupport from '../../../components/addBankSupport';
export default {
  props: {},
  components: {
    isTable,
    addBankSupport
  },
  data() {
    return {
      pageName: "",// 当前页面名字
      updataFlag: false,//判断点击的是详情 编辑
      dialogVisible: false,//弹框开关
      detailFlag: false,//详情开关
      opts: {//需要传递的数据

      },
      directName: ''
    };
  },
  mounted() {
    this.userDo();
    this.pageName = this.$route.name;
    this.getBankSupportList({
            pageNum : 1,
            pageSize : this.$store.state.bankSupport.bankSupportList.pageSize 
        });
    this.getBankCardList();
    this.$store.state.bankSupport.bankSupportList.data.title = [
      {
        title: "编号",
        key: "id",
        minWidth: "80",
        sortable: true
      },{
        title: "直销银行名称",
        key: "directName",
        minWidth: "120",
        sortable: true
      },{
        title: "支持开户银行名称",
        key: "bankName",
        minWidth: "200",
        sortable: true
      },{
        title: "日累计限额",
        key: "dailyCumulativeLimit",
        minWidth: "160",
        sortable: true
      },{
        title: "单笔限额",
        key: "eachQuota",
        minWidth: "160",
        sortable: true
      },{
        title: "是否本行卡",
        key: "nowBankCard",
        minWidth: "120",
        sortable: true,
        color:'blue'
      },{
        title: "绑卡时是否需要密码",
        key: "bindingCardIsPassword",
        minWidth: "160",
        sortable: true,
        color:'blue'
      },{
        title: "充值时是否需要密码",
        key: "transactionIsPassword",
        minWidth: "160",
        sortable: true,
        color:'blue'
      },
      {
        title: "LOGO",
        key: "logoPhoto",
        minWidth: "120",
        isImg:true
      }
    ]
  },

  methods: {
    ...mapMutations({
      userDo : 'bankSupport/userDo',
    }),
    ...mapActions({
      getBankSupportList : 'bankSupport/getBankSupportList',
      deleteList: 'bankSupport/deleteList',
      getBankCardList: 'bankCard/getBankCardList'
    }),
    //点击添加按钮
    addBlackList() {
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("support_deposit_add") > -1) {
        this.$router.push(`/home/setting/bank-support-deposit/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //搜索
    search() {
      this.getBankSupportList({
            pageNum : 1,
            pageSize : this.$store.state.bankSupport.bankSupportList.pageSize,
            directName : this.directName
        })
    },
    //点击关闭
    close() {
      this.dialogVisible = false;
    },

    //点击取消
    cancel() {
      this.dialogVisible = false;
    },
    //点击删除
    delete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.deleteList(id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
      });
    },

    //点击详情
    detail(data) {
      this.dialogVisible = true;
      this.updataFlag = false;
      this.detailFlag = true;
      this.opts = data;
    },
    //点击编辑
    edit(data) {
      this.updataFlag = true;
      this.dialogVisible = true;
      this.detailFlag = false;
      this.opts = data;
    },
    //点击保存
    send(data) {
      bank_support_upd(data).then((res)=>{
        this.dialogVisible = false;
        this.$message.success('保存成功')
        this.getBankSupportList({
            pageNum : this.$store.state.bankSupport.bankSupportList.pageNum,
            pageSize : this.$store.state.bankSupport.bankSupportList.pageSize 
        })
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
           //再次请求列表数据
          this.getBankSupportList({
            pageNum : this.$store.state.bankSupport.bankSupportList.pageNum,
            pageSize : this.$store.state.bankSupport.bankSupportList.pageSize 
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
  }
};
</script>

<style scoped='true' lang="scss">
.explosiveAdd{
  width:100%;
  padding:2px 4px;
  box-sizing: border-box;
  display:flex;
  justify-content: space-between;
}
</style>
