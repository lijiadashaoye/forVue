<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div id="forTable" style="padding-bottom:0;">
      <div class="sandow2">
        <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-suffix=" :">
          <el-form-item label="银行" label-width="50px" size="mini">
            <el-select
              filterable
              multiple
              v-model="ruleForm.bank"
              clearable
              placeholder="请选择"
              style="width:300px"
            >
              <el-option-group v-for="group in bankList" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="item.use"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-button size="mini" type="primary" @click="search">查询</el-button>
          <el-button size="mini" type="info" @click="reset">重置</el-button>
          <div class="addPlatformButtons">
            <el-button size="mini" type="primary" @click="addProduct(null)">新增银行配置</el-button>
            <el-button size="mini" type="info" @click="toDelete('more')">批量删除</el-button>
            <div>
              <el-radio-group v-model="ruleForm.type" size="mini" @change="search()">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="未开始"></el-radio-button>
                <el-radio-button label="执行中"></el-radio-button>
                <el-radio-button label="已结束"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </el-form>

        <bankProductList :datas="tableInputData" @tableEmit="tableEmit" />
      </div>
    </div>
  </div>
</template>

<script>
import bankProductList from "./com/is_list.vue";

export default {
  components: {
    bankProductList
  },
  data() {
    return {
      bankList: [],
      env: "",
      pageName: "",
      dictData: "",
      isIndeterminate1: false,
      checkAll1: false,
      isIndeterminate2: false,
      checkAll2: false,
      loadEnd: false,
      aloneDeleteData: [],
      moreDeleteData: [],
      ruleForm: {
        bank: [],
        type: "全部"
      },
      tableInputData: {
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        data: []
      }
    };
  },

  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.search();
    this.getBankList();
  },
  methods: {
    // 获取银行列表
    getBankList() {
      this.$api
        .getBankList({
          vm: this
        })
        .then(res => {
          if (res) {
            this.bankList = [
              {
                label: "已配置银行",
                options: res.data.configured.map(tar => ({
                  id: tar.id,
                  name: tar.name,
                  use: false
                }))
              },
              {
                label: "未配置银行",
                options: res.data.notConfigured.map(tar => ({
                  id: tar.id,
                  name: tar.name,
                  use: true
                }))
              }
            ];
          }
        });
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.search();
          break;
        case "copy": // 复制按钮
        case "edit": // 编辑
          // this.$api
          //   .getLiCaiInfoData({
          //     vm: this,
          //     data: data.data.id
          //   })
          //   .then(res => {
          //     if (res) {
          //      this.addProduct(data.type,res.data)
          //     }
          //   });
          break;
        case "alone": // 单独删除按钮
          this.aloneDeleteData = [];
          this.aloneDeleteData.push(data.data);
          this.toDelete("alone");
          break;
        case "moreDelete": // 批量删除按钮
          this.moreDeleteData = data.data;
          break;
      }
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .product_licai_delete({
                vm: this,
                data: this.aloneDeleteData[0].id
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.search();
                }
              });
          })
          .catch(() => {});
      }
      if (type == "more") {
        if (this.moreDeleteData.length == 0) {
          this.$message.warning("请选择要删除的！");
        } else {
          this.$confirm("确认删除吗？")
            .then(() => {
              let promiseArr = [];
              let tableData = this.tableInputData.data.list; // 获取表格的数据
              this.moreDeleteData.forEach(item => {
                let del = this.$api
                  .product_licai_delete({
                    vm: this,
                    data: item.id,
                    type: item.type
                  })
                  .then(res => {
                    let obj;
                    if (res) {
                      obj = {
                        ok: true,
                        data: item.id
                      };
                    } else {
                      obj = {
                        ok: false,
                        data: tableData.filter(tar => tar.id == item.id)
                      };
                    }
                    return obj;
                  });
                promiseArr.push(del);
              });

              Promise.all(promiseArr).then(arr => {
                this.moreDeleteData = [];
                // 拼接删除结果
                let numSucces = 0;
                let numFail = 0;
                let failName = "";
                arr.forEach(item => {
                  if (item.ok) {
                    numSucces++;
                  } else {
                    numFail++;
                    failName += `<li>名称：${item.data[0].name}</li>`;
                  }
                });
                let str = `<p>共操作 ${arr.length} 条数据，成功 ${numSucces} 个，失败 ${numFail} 个</p>`;

                if (numFail > 0) {
                  str += `<p>失败的数据为：</p>
                    <ul>
                      ${failName}
                    </ul>`;
                }
                this.$alert(str, "操作结果提示", {
                  confirmButtonText: "确定",
                  dangerouslyUseHTMLString: true,
                  callback: this.search()
                });
              });
            })
            .catch(() => {});
        }
      }
    },
    // 查询
    search() {
      let obj = {
        pageSize: this.tableInputData.pageSize,
        pageNum: this.tableInputData.pageNum
      };
      if (this.ruleForm.bank.length) {
        obj.bank = this.ruleForm.bank;
      }
      if (this.ruleForm.type) {
        obj.type = this.ruleForm.type;
      }
      this.getListData(obj);
    },
    // 重置
    reset() {
      this.isIndeterminate1 = false;
      this.checkAll1 = false;
      this.isIndeterminate2 = false;
      this.checkAll2 = false;
      this.ruleForm = {
        bank: [],
        type: "全部"
      };
      this.tableInputData.pageSize = 10;
      this.tableInputData.pageNum = 1;
      this.search();
    },
    // 获取列表数据
    getListData(obj) {
      for (let i = 5; i--; ) {
        this.tableInputData.data.push(
          ...[
            {
              name: "中国工商银行",
              statue: "执行中",
              id: Math.trunc(Math.random() * i * 10000 + 1),
              startTime: "2019-11-23 00:15:02",
              endTime: "",
              one_can: ["≥22岁", "本银行已开户", "辽宁省-沈阳市"],
              notSee: [],
              howOne: "",
              one_two: "",
              other: []
            },
            {
              name: "中国银行",
              statue: "已结束",
              id: Math.trunc(Math.random() * i * 10000 + 2),
              startTime: "2019-11-23 00:15:02",
              endTime: "",
              one_can: ["≥22岁", "本银行已开户", "辽宁省-沈阳市"],
              notSee: [],
              howOne: "",
              one_two: "或",
              other: [
                "≥22岁",
                "本银行已开户",
                "辽宁省-沈阳市",
                "1218理财节",
                "人数拼团",
                "单单返活动",
                "比财已注册"
              ]
            },
            {
              name: "招商银行",
              statue: "未开始",
              id: Math.trunc(Math.random() * i * 10000 + 3),
              startTime: "2019-11-23 00:15:02",
              endTime: "2019-12-02 04:35:22",

              one_can: ["≥22岁", "本银行已开户", "辽宁省-沈阳市"],
              one_not: ["比财未注册", "上海", "单单返活动"],
              howOne: "且",
              one_two: "或",
              two_can: ["≥22岁", "本银行已开户", "辽宁省-沈阳市", "1218理财节"],
              two_not: ["人数拼团", "单单返活动", "比财已注册"],
              howTwo: "或"
            }
          ]
        );
      }
      this.tableInputData.total = this.tableInputData.data.length;
    },
    addProduct(type, data) {
      if (type) {
        // 编辑、复制
        this.$router.push({
          name: "add_bank_product",
          query: {
            from: "bank",
            type: type,
            data: data,
            bankList: JSON.stringify(this.bankList)
          }
        });
      } else {
        this.$router.push({
          name: "add_bank_product",
          query: {
            from: "bank",
            bankList: JSON.stringify(this.bankList)
          }
        });
      }
    }
  }
};
</script>
