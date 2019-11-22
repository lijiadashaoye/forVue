<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <div class="adverAdd">
        <el-input
          style="width:200px;"
          placeholder="请输入银行名称"
          size="mini"
          prefix-icon="el-icon-search"
          v-model.trim="bankName"
          @input="search"
        ></el-input>
        <el-button type="primary" size="mini" @click="addBankCardList">添加银行卡</el-button>
      </div>
    </div>

    <div id="forTable">
      <isTable :inputData="this.$store.state.bankCard.bankCardList" @tableEmit="tableEmit" />
    </div>
    <!-- 修改/详情的弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :title=" updataFlag ? '修改' : '详情' "
      :visible.sync="dialogVisible"
      width="400px"
    >
      <bankCardAddUpd
        :detailFlag.sync="detailFlag"
        :list.sync="this.$store.state.bank.bankList.data.list"
        :dialogVisible="dialogVisible"
        @cancel="cancel"
        @close="close"
        @send="send"
        :opts="opts"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { bank_card_upd, bank_card_del } from "../../../api/setting_use.js";
import isTable from "../../../components/isTable/isTable";
import bankCardAddUpd from "../../../components/bankCardAddUpd";
export default {
  props: {},
  components: {
    isTable,
    bankCardAddUpd
  },
  data() {
    return {
      env: null,
      pageName: "", // 当前页面名字
      updataFlag: false, //判断点击的是详情 编辑
      dialogVisible: false, //弹框开关
      detailFlag: false, //详情开关
      opts: {},
      bankName: ""
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.userDo();
    this.$store.state.bankCard.bankCardList.pageNum = 1;
    this.getBankCardList({
      pageNum: this.$store.state.bankCard.bankCardList.pageNum,
      pageSize: this.$store.state.bankCard.bankCardList.pageSize
    });
    this.getList();
    this.pageName = this.$route.name;
    this.$store.state.bankCard.bankCardList.data.title = [
      {
        title: "银行名称",
        key: "bankName",
        minWidth: "200",
        sortable: true
      },
      {
        title: "卡长度",
        key: "cardLength",
        minWidth: "80",
        sortable: true
      },
      {
        title: "卡前缀",
        key: "cardPrefix",
        minWidth: "100",
        sortable: true
      },
      {
        title: "卡类型",
        key: "cardType",
        minWidth: "100",
        sortable: true
      },
      {
        title: "清算行行号",
        key: "clearingBankNumber",
        minWidth: "120",
        sortable: true
      }
    ];
  },

  methods: {
    ...mapMutations({
      userDo: "bankCard/userDo",
      deleteList: "bankCard/deleteList"
    }),
    ...mapActions({
      getBankCardList: "bankCard/getBankCardList",
      getList: "bank/getList"
    }),
    //添加权限确认
    addBankCardList() {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
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
    search() {
      this.$store.state.bankCard.bankCardList.pageNum = 1;
      this.getBankCardList({
        pageNum: this.$store.state.bankCard.bankCardList.pageNum,
        pageSize: this.$store.state.bankCard.bankCardList.pageSize,
        bankName:
          this.bankName != "" && this.bankName != null ? this.bankName : null
      });
    },
    //点击保存
    send(data) {
      bank_card_upd(data).then(res => {
        if (res) {
          this.dialogVisible = false;
          this.$message.success("保存成功");
          this.getBankCardList({
            pageNum: this.$store.state.bankCard.bankCardList.pageNum,
            pageSize: this.$store.state.bankCard.bankCardList.pageSize
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
      }).then(() => {
        bank_card_del(id).then(res => {
          if (res && res.success) {
            this.getBankCardList({
              pageNum: this.$store.state.bankCard.bankCardList.pageNum,
              pageSize: this.$store.state.bankCard.bankCardList.pageSize,
              bankName:
                this.bankName != "" && this.bankName != null
                  ? this.bankName
                  : null
            });
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
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
          this.getBankCardList({
            pageNum: this.$store.state.bankCard.bankCardList.pageNum,
            pageSize: this.$store.state.bankCard.bankCardList.pageSize,
            bankName:
              this.bankName != "" && this.bankName != null
                ? this.bankName
                : null
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
    }
  }
};
</script>
