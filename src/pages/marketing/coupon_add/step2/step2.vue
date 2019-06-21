<template>
  <div class="pageWaper">
    <div v-if="!isOk">
      <div class="formWaper">
        <div class="forms">
          <el-form
            size="small"
            ref="formData"
            :model="formData"
            :rules="rules"
            label-width="70px"
          >
            <div style="padding-bottom:10px;">
              <el-radio
                v-model="formData.type"
                label="ALL"
                @change="howChange()"
              >全部</el-radio>
              <el-radio
                v-model="formData.type"
                label="PART"
                @change="howChange()"
              >自定义</el-radio>
            </div>

            <el-form-item
              label="备注"
              prop="remark"
            >
              <el-input
                placeholder="请输入"
                rows='2'
                type='textarea'
                v-model="formData.remark"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="操作人"
              v-for="(tar,index) in Actor"
              :key='index'
            >
              <span v-if="tar.createId">{{'ID：'+tar.createId}}<br></span>
              <span v-if="tar.createName">{{'名字：'+tar.createName}}<br></span>
              <span v-if="tar.createTime"> {{'时间：'+tar.createTime}}</span>
            </el-form-item>

            <div v-if="Product_select.length>0">
              <p style="font-weight:bold;font-size:14px;margin-bottom:5px;">已使用的：(点击可以删除)</p>
              <div class="hasSelectJiangLi">
                <p
                  v-for="(tar,ind1) in Product_select"
                  :key="ind1+10"
                  @click="deleteJiangli(tar)"
                  title="删除"
                >
                  <span>产品：</span>
                  <span>{{tar.name}}</span>
                </p>
              </div>
            </div>
          </el-form>
        </div>
        <div
          class="tables"
          v-if="formData.type==='PART'"
        >
          <div>
            <div id='forHeader'>
              <el-form
                size="small"
                :model="Product_tableSearch"
                :rules="rules"
                label-width="80px"
                inline
              >
                <el-form-item
                  style="margin-bottom:2px;"
                  label="持续时间"
                >
                  <el-date-picker
                    style="width:100%;"
                    v-model="Product_tableSearch.time"
                    type="daterange"
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item
                  style="margin-bottom:2px"
                  label="卡券名称"
                >
                  <el-input v-model="Product_tableSearch.name"></el-input>
                </el-form-item>
                <el-form-item
                  style="margin-bottom:2px;"
                  label="卡券说明"
                >
                  <el-input v-model="Product_tableSearch.couponExplain"></el-input>
                </el-form-item>

                <el-form-item style="margin-bottom:2px;">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="ProductList()"
                  >查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div
              id='forHeader'
              style="height:240px;"
            >
              <isTable
                v-if="Product_table.show"
                :inputData='Product_table'
                @tableEmit='tableEmit($event)'
              />
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <el-button
          @click="step('before')"
          type="primary"
        >上一步</el-button>
        <el-button
          @click="step()"
          type="primary"
          :disabled="isSaveIng"
        >保存</el-button>
        <el-button
          @click="reset"
          type="info"
        >重 置</el-button>
      </div>
    </div>
    <hasSuccess
      @isOver="isOver"
      v-if="isOk"
    />
  </div>
</template>
<script>
import isTable from "../../../../components/isTable/isTable.vue";
import hasSuccess from "../../../../components/success.vue";

export default {
  components: {
    isTable,
    hasSuccess
  },
  data() {
    return {
      isSaveIng: false, // 切换保存按钮的可点击状态
      Actor: "", // 操作人
      isOk: false,
      formData: {
        type: "ALL",
        remark: "",
        productList: [] // 产品列表
      },
      Product_select: [], // 保存已经添加的产品

      Product_table: {
        // 红包备选表格
        show: false,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      Product_tableSearch: {
        pageSize: 10,
        pageNum: 1,
        productType: "",
        productName: "",
        prdIndexId: "",
        orgName: ""
      },
      //表单验证
      rules: {
        remark: [
          { required: true, message: "请输入备注", trigger: "blur" },
          { min: 1, max: 200, message: "最多输入200个字", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    let https = JSON.parse(sessionStorage.getItem("fromHttp"));
    let step2 = JSON.parse(sessionStorage.getItem("step2Data"));
    if (step2) {
      this.Product_select = JSON.parse(
        sessionStorage.getItem("Product_select")
      );
      this.formData = { ...step2 };
      this.ProductList();
      this.$store.commit("set_asideState", { data: false });
    } else {
      if (https) {
        this.Actor = https.operationRecordList;
        this.$store.commit("set_asideState", { data: false });
        this.formData.remark = https.remark;
        this.formData.type = https.applyProductType;
        if (https.productList.length > 0) {
          https.productList.forEach(item => {
            let obj = {
              id: item.id,
              shareType: item.productType,
              shareId: item.productId
            };
            this.formData.productList.push(obj);
            let obj2 = {
              // 用来显示已经添加了哪些卡券
              type: item.productType,
              name: item.productName,
              num: item.productId
            };
            this.Product_select.push(obj2);
            this.ProductList();
          });
        }
      }
    }
  },
  methods: {
    isOver(type) {
      sessionStorage.clear();
      if (type === "back") {
        sessionStorage.setItem("page", "卡券列表");
        this.$router.push({ name: `coupon_list` });
      } else {
        sessionStorage.setItem("page", "新建卡券");
        this.$router.push({ name: `coupon_add` });
      }
    },
    // 使用条件变更
    howChange() {
      this.formData.productList = [];
      this.Product_select = [];
      if (this.formData.type === "PART") {
        this.ProductList();
        this.$store.commit("set_asideState", { data: false });
      } else {
        this.$store.commit("set_asideState", { data: true });
      }
    },
    // 监听表格的操作
    tableEmit(type) {
      switch (type.type) {
        case "regetData": // 分页的emit
          this.ProductList();
          break;
        case "toUse": // 添加活动奖励
          // 添加产品
          if (this.formData.productList.length == 0) {
            let obj = {
              shareType: type.data.productType,
              shareId: type.data.prdIndexId
            };
            this.formData.productList.push(obj);
            let obj2 = {
              // 用来显示已经添加了哪些卡券
              type: type.data.productType,
              name: type.data.productName,
              num: type.data.prdIndexId
            };
            this.Product_select.push(obj2);
          } else {
            let isIn = this.formData.productList.some(item => {
              return (
                item.shareType == type.data.productType &&
                item.shareId == type.data.prdIndexId
              );
            });
            if (!isIn) {
              let obj2 = {
                // 用来显示已经添加了哪些卡券
                type: type.data.productType,
                name: type.data.productName,
                num: type.data.prdIndexId
              };
              this.Product_select.push(obj2);
              let obj = {
                shareType: type.data.productType,
                shareId: type.data.prdIndexId
              };
              this.formData.productList.push(obj);
            } else {
              this.$message.warning("已经使用了！");
            }
          }
      }
    },
    // 删除产品
    deleteJiangli(item) {
      this.Product_select = this.Product_select.filter(tar => {
        return tar.num != item.num;
      });
      // 红包和卡券有可能id相同，所以只能用删除项在awardList 的索引进行删除
      let num;
      for (let i = this.formData.productList.length; i--; ) {
        if (
          this.formData.productList[i].shareId == item.num &&
          this.formData.productList[i].shareType === item.type
        ) {
          num = i;
        }
      }
      this.formData.productList.splice(num, 1);
    },
    // 产品表格的查询
    ProductList() {
      let obj = {};
      let arr = Object.keys(this.Product_tableSearch);
      arr.forEach(str => {
        if (this.Product_tableSearch[str]) {
          obj[str] = this.Product_tableSearch[str];
        }
      });
      this.$api
        .market_coupon_getProdutList({
          vm: this,
          data: obj
        })
        .then(res => {
          if (res) {
            this.Product_table.show = false;
            this.Product_table.total = res.data.count > 0 ? res.data.count : 1;
            this.Product_table.data.quanxian = ["1"];
            this.Product_table.data.title = [
              {
                title: "产品ID",
                key: "prdIndexId",
                minWidth: "80"
              },
              {
                title: "银行名称",
                key: "orgName",
                minWidth: "100"
              },
              {
                title: "产品名称",
                key: "productName",
                minWidth: "120"
              },
              {
                title: "产品类型",
                key: "productType",
                minWidth: "80"
              },
              {
                title: "上线状态",
                key: "isEnabled",
                minWidth: "80"
              }
            ];
            this.Product_table.data.custom = [
              {
                text: "使用",
                type: "warning",
                size: "small",
                emit: "toUse"
              }
            ];
            this.Product_table.data.list = res.data.list.map(item => {
              let obj = { ...item };
              switch (item.productType) {
                case 1:
                  obj.productType = "货币基金";
                  break;
                case 2:
                  obj.productType = "理财";
                  break;
                case 3:
                  obj.productType = "纯债";
                  break;
              }
              switch (item.isEnabled) {
                case 1:
                  obj.isEnabled = "是";
                  break;
                case 2:
                  obj.isEnabled = "否";
                  break;
              }
              return obj;
            });
            setTimeout(() => (this.Product_table.show = true));
          }
        });
    },
    // 重置
    reset() {
      this.$refs.formData.resetFields();
      this.Product_select = []; // 保存已经添加的产品
      this.Product_table = {
        // 红包备选表格
        show: false,
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      };
      this.Product_tableSearch = {
        pageSize: 10,
        pageNum: 1,
        productType: "",
        productName: "",
        prdIndexId: "",
        orgName: ""
      };
      this.formData = {
        type: "ALL",
        remark: "",
        productList: []
      };
      this.$store.commit("set_asideState", { data: true });
    },
    // 保存
    step(type) {
      if (type) {
        sessionStorage.setItem("step2Data", JSON.stringify(this.formData));
        sessionStorage.setItem(
          "Product_select",
          JSON.stringify(this.Product_select)
        );
        this.$store.commit("set_asideState", { data: true });
        this.$router.push({ name: `coupon_add_step1` });
      } else {
        this.$refs.formData.validate(valid => {
          if (valid) {
            if (
              this.formData.type === "PART" &&
              this.formData.productList.length == 0
            ) {
              this.$message.error("请选择将数据填写完整，或取消使用自定义！");
            } else {
              let step1 = JSON.parse(sessionStorage.getItem("step1Data"));
              let https = JSON.parse(sessionStorage.getItem("fromHttp"));
              let upData = {
                httpType: "",
                data: {}
              };
              if (https) {
                upData.httpType = "put";
                upData.data = {
                  id: step1.id,
                  type: step1.type,
                  name: step1.name,
                  couponExplain: step1.description,
                  money: step1.money,
                  durationDay: step1.days,
                  getLimit: step1.limit,
                  useNotice: step1.toKnow,
                  issueNum: step1.total,
                  useConditions: step1.how,
                  discountsList: step1.discountsList ? step1.discountsList : [],
                  expiryType: step1.useType,
                  applyProductType: this.formData.type,
                  remark: this.formData.remark,
                  productList: this.formData.productList,

                  startTime: step1.gudingTime
                    ? new Date(step1.gudingTime[0]).getTime()
                    : null,
                  endTime: step1.gudingTime
                    ? new Date(step1.gudingTime[1]).getTime()
                    : null,
                  dayType: null,
                  expiryDay: null
                };
                if (step1.useType === "GET") {
                  upData.data.dayType = step1.afterGet;
                  upData.data.expiryDay = step1.afterGetValue;
                }
                if (step1.useType === "USE") {
                  upData.data.dayType = step1.afterUse;
                  upData.data.expiryDay = step1.afterUseValue;
                }
              } else {
                upData.httpType = "post";
                upData.data = {
                  type: step1.type,
                  name: step1.name,
                  couponExplain: step1.description,
                  money: step1.money,
                  durationDay: step1.days,
                  getLimit: step1.limit,
                  useNotice: step1.toKnow,
                  issueNum: step1.total,
                  useConditions: step1.how,
                  discountsList: step1.discountsList ? step1.discountsList : [],
                  expiryType: step1.useType,
                  applyProductType: this.formData.type,
                  remark: this.formData.remark,
                  productList: this.formData.productList,

                  startTime: step1.gudingTime
                    ? new Date(step1.gudingTime[0]).getTime()
                    : null,
                  endTime: step1.gudingTime
                    ? new Date(step1.gudingTime[1]).getTime()
                    : null,
                  dayType: step1.dayType,
                  expiryDay: step1.expiryDay
                };
                if (step1.useType === "GET") {
                  upData.data.dayType = step1.afterGet;
                  upData.data.expiryDay = step1.afterGetValue;
                }
                if (step1.useType === "USE") {
                  upData.data.dayType = step1.afterUse;
                  upData.data.expiryDay = step1.afterUseValue;
                }
              }
              this.isSaveIng = true;
              this.$api
                .market_coupon_upCoupon({
                  vm: this,
                  data: upData
                })
                .then(res => {
                  this.isSaveIng = false;
                  if (res) {
                    this.isOk = true;
                  }
                });
            }
          } else {
            this.$message.error("请选择将数据填写完整！");
          }
        });
      }
    }
  }
};
</script>

<style scoped='true' lang="scss">
.pageWaper {
  min-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.formWaper {
  display: flex;
  justify-content: center;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding-left: 60px;
  width: 30%;
}
.forms {
  width: 100%;
  max-width: 500px;
  min-width: 400px;
}
.tables {
  max-width: 700px;
  margin-left: 30px;
}
.hasSelectJiangLi {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-collapse: collapse;
  font-size: 14px;
  margin-bottom: 5px;
}
.hasSelectJiangLi p {
  border: 1px solid rgb(235, 233, 233);
  padding: 2px 5px;
  margin: 0 2px 2px 0;
  cursor: pointer;
}
.hasSelectJiangLi p:hover {
  background: rgb(209, 208, 208);
}
</style>
