<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>

    <div class="sandow">
      <div class="sandow_top">
        <p>查询信息</p>
        <div>
          <el-button size="mini" type="primary" @click="search">查询</el-button>
          <el-button size="mini" type="info" @click="reset">重置</el-button>
        </div>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" label-width="78px" label-suffix=" :">
        <el-form-item label="银行" size="mini">
          <el-select
            filterable
            multiple
            v-model="ruleForm.bank"
            clearable
            placeholder="请选择"
            style="width:497px;"
          >
            <el-option-group v-for="group in kkk" :key="group.label" :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item label="渠道" size="mini">
          <div class="sandow_radioGrop">
            <el-form-item label="内部渠道">
              <el-checkbox
                style="display:inline-block;margin:0 20px 0 13px;"
                :indeterminate="isIndeterminate1"
                v-model="checkAll1"
                @change="handleCheckAllChange1"
              >全部</el-checkbox>
              <el-checkbox-group
                style="display:inline-block;"
                v-model="ruleForm.inset"
                @change="handleCheckedCitiesChange1"
              >
                <el-checkbox v-for="t in insetList" :label="t" :key="t">{{t}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="外部渠道">
              <el-checkbox
                style="display:inline-block;margin:0 20px 0 13px;"
                :indeterminate="isIndeterminate2"
                v-model="checkAll2"
                @change="handleCheckAllChange2"
              >全部</el-checkbox>
              <el-checkbox-group
                style="display:inline-block;"
                v-model="ruleForm.outset"
                @change="handleCheckedCitiesChange2"
              >
                <el-checkbox v-for="t in outsetList" :label="t" :key="t">{{t}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <div class="sandow_content">
        <div>
          <el-button size="mini" type="primary" @click="add_new('new')">新增</el-button>
          <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
        </div>

        <div v-if="loadEnd">
          <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isTable from "@/components/isTable/isTable.vue";

export default {
  props: {},
  data() {
    return {
      kkk: [
        {
          label: "未配置过",
          options: [
            {
              value: "Shanghai",
              label: "上海"
            },
            {
              value: "Beijing",
              label: "北京"
            }
          ]
        },
        {
          label: "已配置过",
          options: [
            {
              value: "Chengdu",
              label: "成都"
            },
            {
              value: "Shenzhen",
              label: "深圳"
            },
            {
              value: "Guangzhou",
              label: "广州"
            },
            {
              value: "Dalian",
              label: "大连"
            }
          ]
        }
      ],
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
        inset: [],
        outset: []
      },
      insetList: ["比财APP", "拼财APP", "拼财小程序"],
      outsetList: ["异业", "同业", "直投"],
      tableInputData: {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      }
    };
  },
  components: {
    isTable
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    this.canDoWhat();
    this.search();
  },
  methods: {
    // 查询
    search() {
      let obj = {
        pageSize: this.tableInputData.pageSize,
        pageNum: this.tableInputData.pageNum
      };
      if (this.ruleForm.inset.length) {
        obj.inset = this.ruleForm.inset;
      }
      if (this.ruleForm.outset.length) {
        obj.outset = this.ruleForm.outset;
      }
      if (this.ruleForm.bank) {
        obj.bank = this.ruleForm.bank;
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
        inset: [],
        outset: []
      };
      this.tableInputData.pageSize = 10;
      this.tableInputData.pageNum = 1;
      this.search();
    },
    // 内部渠道checkbox
    handleCheckAllChange1(val) {
      this.ruleForm.inset = val ? this.insetList : [];
      this.isIndeterminate1 = false;
    },
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.insetList.length;
      this.isIndeterminate1 =
        checkedCount > 0 && checkedCount < this.insetList.length;
    },
    // 内部渠道checkbox
    handleCheckAllChange2(val) {
      this.ruleForm.outset = val ? this.outsetList : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.outsetList.length;
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.outsetList.length;
    },
    // 新增
    add_new(type, data) {
      switch (type) {
        case "new":
          this.$router.push({
            name: "platform_add"
          });
          break;
        case "edit":
          this.$router.push({
            name: "platform_add",
            query: {
              id: data,
              type: "edit"
            }
          });
          break;
        case "copy":
          this.$router.push({
            name: "platform_add",
            query: {
              id: data,
              type: "copy"
            }
          });
          break;
      }
    },
    // 监听表格的操作
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.search();
          break;
        case "edit": // 分页的emit
          this.add_new("edit", data.data.id);
          break;
        case "copy": // 复制按钮
          this.add_new("copy", data.data.id);
          break;
        case "delete": // 单独删除按钮
          this.aloneDeleteData = [];
          data.data.productSubtype === "wmp"
            ? this.aloneDeleteData.push({ type: "", id: data.data.id })
            : this.aloneDeleteData.push({
                type: "insurance/",
                id: data.data.id
              });
          this.toDelete("alone");
          break;
        case "moreDelete": // 批量删除按钮
          this.moreDeleteData = data.data;
          // .map(item => {

          //   return item.id ;
          // });
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
                type: this.aloneDeleteData[0].type,
                data: this.aloneDeleteData[0].id
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.seachClick("search");
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
                  callback: this.seachClick("reset")
                });
              });
            })
            .catch(() => {});
        }
      }
    },

    // 获取数据后的处理
    shelveStatus(data) {
      this.loadEnd = false;
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let arr = Object.keys(item),
            obj = {};
          arr.forEach(str => {
            obj[str] = item[str];
            if (str === "inset" || str === "outset") {
              obj[str] = "";
              if (item[str].length) {
                item[str].forEach(tar => {
                  obj[str] += tar.name + " ; ";
                });
              } else {
                obj[str] = "";
              }
            }
          });
          return obj;
        });

        this.tableInputData.data.title = [
          {
            title: "银行",
            key: "name",
            minWidth: "180"
          },
          {
            title: "内部渠道",
            key: "inset",
            minWidth: "180"
          },
          {
            title: "外部渠道",
            key: "outset",
            minWidth: "180"
          },

          {
            title: "创建时间",
            key: "time",
            minWidth: "140"
          }
        ];
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取列表数据
    getListData(obj) {
      // this.$api
      //   .get_licaiList({
      //     vm: this,
      //     data: obj
      //   })
      //   .then(res => {
      //     if (res) {
      //       this.shelveStatus(res.data);
      //     }
      //   });
      let datas = {
        total: 10,
        pageSize: 10,
        pageNum: 1,
        list: [
          {
            id: 1,
            name: "银行",
            inset: [
              {
                name: "比财APP",
                value: "bicai"
              },
              {
                name: "拼财APP",
                value: "pincai"
              }
            ],
            outset: [
              {
                name: "直投",
                value: "zhitou"
              }
            ],
            time: "2019-12-2"
          },
          {
            id: 2,
            name: "银行",
            inset: [
              {
                name: "拼财小程序",
                value: "xiaochengxu"
              }
            ],
            outset: [
              {
                name: "异业",
                value: "yiye"
              }
            ],
            time: "2019-12-2"
          },
          {
            id: 3,
            name: "银行",
            inset: [],
            outset: [
              {
                name: "异业",
                value: "yiye"
              },
              {
                name: "同业",
                value: "tongye"
              }
            ],
            time: "2019-12-2"
          }
        ]
      };

      this.shelveStatus(datas);
    },
    // 查询权限，设定表格操作按钮
    canDoWhat() {
      // let quanxian = JSON.parse(sessionStorage.getItem("buttenpremissions"));
      // this.tableInputData.data.custom.push({
      //   text: "复制",
      //   type: "primary",
      //   size: "mini",
      //   emit: "copy"
      // });
      this.tableInputData.data.custom.push({
        text: "修改",
        type: "primary",
        size: "mini",
        emit: "edit"
      });
      this.tableInputData.data.custom.push({
        text: "复制",
        type: "warning",
        size: "mini",
        emit: "copy"
      });
      this.tableInputData.data.custom.push({
        text: "删除",
        type: "danger",
        size: "mini",
        emit: "delete"
      });
    }
  }
};
</script>
