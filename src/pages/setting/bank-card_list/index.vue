<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <div class="explosiveAdd">
        <el-button
          type="primary"
          size="mini"
          @click="addBankCardList"
        >
          添加银行卡
        </el-button>
      </div>
    </div>

    <div id="forTable">
      <isTable
      :inputData="this.$store.state.bankCard.bankCardList"
      @tableEmit='tableEmit'/>
    </div>
    <!-- 修改/详情的弹框 -->
    <el-dialog :close-on-click-modal='false' :title=" updataFlag ? '修改' : '详情' " :visible.sync="dialogVisible">
      <bankCardAddUpd
      :detailFlag.sync="detailFlag"
      :list.sync="this.$store.state.bank.bankList.data.list"
      @cancel="cancel"
      @close="close"
      @send="send"
      :opts="opts"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { bank_card_upd } from '../../../api/setting_use.js';
import isTable from '../../../components/isTable/isTable';
import bankCardAddUpd from '../../../components/bankCardAddUpd';
export default {
  props: {},
  components: {
    isTable,
    bankCardAddUpd
  },
  data() {
    return {
      pageName: "",// 当前页面名字
      updataFlag: false,//判断点击的是详情 编辑
      dialogVisible: false,//弹框开关
      detailFlag: false,//详情开关
      opts: {

      },
    };
  },
  mounted() {
    this.userDo();
    this.getBankCardList();
    this.getList();
    this.pageName = this.$route.name;
    this.$store.state.bankCard.bankCardList.data.title = [
      {
        title: "机构代码",
        key: "organizationCode",
        minWidth: "100",
        sortable: true
      },{
        title: "银行名称",
        key: "bankName",
        minWidth: "200",
        sortable: true
      },{
        title: "卡长度",
        key: "cardLength",
        minWidth: "80",
        sortable: true
      },{
        title: "卡前缀",
        key: "cardPrefix",
        minWidth: "100",
        sortable: true
      },{
        title: "卡类型",
        key: "cardType",
        minWidth: "100",
        sortable: true
      },{
        title: "清算行行号",
        key: "clearingBankNumber",
        minWidth: "120",
        sortable: true
      },{
        title: "银行logo图片",
        key: "logoPhoto",
        minWidth: "100",
        isImg: true
      },{
        title: "银行背景图",
        key: "background",
        minWidth: "100",
        isImg: true
      },
    ]
  },

  methods: {
    ...mapMutations({
      userDo : 'bankCard/userDo',
      deleteList: 'bankCard/deleteList'
    }),
    ...mapActions({
      getBankCardList: 'bankCard/getBankCardList',
      getList: 'bank/getList'
    }),
    //添加权限确认
    addBankCardList() {
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("bank_card_add") > -1) {
        this.$router.push(`/home/setting/bank-card/add`);
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    },
    //点击取消
    cancel() {
      this.dialogVisible = false;
    },

    //点击关闭
    close() {
      this.dialogVisible = false;
    },
    //点击保存
    send(data) {
      this.dialogVisible = false;
      bank_card_upd(data).then(res=> {
          this.getBankCardList();
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
    //点击编辑
    edit(data) {
      this.updataFlag = true;
      this.dialogVisible = true;
      this.detailFlag = false;
      this.opts = data;
    },

    //点击详情
    detail(data) {
      this.updataFlag = false;
      this.dialogVisible = true;
      this.detailFlag = true;
      this.opts = data;
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
           //再次请求列表数据
          this.getBankCardList();
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
