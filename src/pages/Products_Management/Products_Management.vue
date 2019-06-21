<template>
  <div>
    <router-view v-if="toShow"></router-view>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      toShow: false
    };
  },
  beforeMount() {
    this.toShow = false;
    let dict = sessionStorage.getItem("dict");
    if (!dict) {
      // 获取数据字典信息
      let promiseArr = [];
      let arr = [
        "cooperation_mode", // 银行合作方式
        "connection_mode", // 对接方式
        "risk_level", // 风险等级
        "deposit_type", //  存款类型
        "surplus_quota", // 剩余额度
        "pay_time", //  支付时间
        "regulatory_property", // 监管属性
        "monetary_unit", // 货币单位
        "rule_symbol", // <、<=等等 规则符号
        "transaction_state" // 交易状态
      ];
      arr.forEach((str, index) => {
        let kk = new Promise(resolve => {
          this.$api
            .get_dict({
              vm: this,
              data: str
            })
            .then(res => {
              if (res) {
                resolve(res.data);
              }
            });
        });
        promiseArr.push(kk);
      });

      // 获取产品标签列表 3
      promiseArr.push(
        this.$api.get_marksData({ vm: this }).then(res => {
          if (res) {
            return res.data;
          }
        })
      );

      // 获取隶属机构数据 2
      promiseArr.push(
        this.$api
          .get_parentList({
            vm: this
          })
          .then(res => {
            if (res) {
              return res.data;
            }
          })
      );
      // 机构列表 1
      promiseArr.push(
        this.$api
          .getJiJin_JiGou_list({
            vm: this,
            url: "product/institution/list"
          })
          .then(res => {
            if (res) {
              return res.data;
            }
          })
      );

      // 基金公司列表 0
      promiseArr.push(
        this.$api
          .getJiJin_JiGou_list({
            vm: this,
            url: "product/fundHouse/list"
          })
          .then(res => {
            if (res) {
              return res.data;
            }
          })
      );

      let obj = {};
      Promise.all(promiseArr)
        .then(datas => {
          let arr1 = datas.slice(-4);
          let arr2 = datas.slice(0, -4);

          obj.marks = arr1[0] ? arr1[0] : [];
          obj.paren = arr1[1] ? arr1[1] : [];
          obj.jigou = arr1[2] ? arr1[2] : [];
          obj.jijin = arr1[3] ? arr1[3] : [];

          arr2.forEach((item, index) => {
            obj[arr[index]] = item ? item : [];
          });
          obj.shelveList = [
            // 上架下拉的数据
            {
              label: "上架中",
              value: "YES"
            },
            {
              label: "已下架",
              value: "NO"
            }
          ];
          sessionStorage.setItem("dict", JSON.stringify(obj));
          this.toShow = true;
        })
        .then(() => {
          setTimeout(() => {
            let promiseArr = [];
            let arr = [
              "interest_mode", //  计息方式
              "income_return_way", //  收益返还方式
              "deadline_type", // 期限类型
              "frequency_type", // 付息频率
              "list_area_type", // 榜单专区标识
              "product_coverage_type", // 产品覆盖类型
              "channel_coverage_type", //  渠道覆盖类型
              "customer_classification", // 客户分类
              "institution_star", // 银行星级
              "institution_type" // 机构类型
            ];
            arr.forEach((str, index) => {
              let kk = new Promise(resolve => {
                this.$api
                  .get_dict({
                    vm: this,
                    data: str
                  })
                  .then(res => {
                    if (res) {
                      resolve(res.data);
                    }
                  });
              });
              promiseArr.push(kk);
            });
            // 区域数据 3
            promiseArr.push(
              this.$api
                .get_quyu({
                  vm: this
                })
                .then(res => {
                  if (res) {
                    return res.data;
                  }
                })
            );
            Promise.all(promiseArr).then(datas => {
              let arr1 = datas.slice(-1);
              let arr2 = datas.slice(0, -1);
              obj.quyu = arr1[0] ? arr1[0] : [];
              arr2.forEach((item, index) => {
                obj[arr[index]] = item ? item : [];
              });
              sessionStorage.setItem("dict", JSON.stringify(obj));
            });
          }, 500);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.toShow = true;
    }
  }
};
</script>
<style lang='scss'>
@import url("../../components/allCss.scss");
</style>
