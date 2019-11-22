<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
    </div>
    <div id="forTable" style="background:#fff;">
      <!-- 新增产品 -->
      <SettingExplosiveCommend
        style="width:500px;margin:0 auto;padding-top:30px;"
        :productTypeList="productTypeList"
        :productNameList="productNameList"
        :dataType="type"
        @reqs="reqs"
      />
    </div>
  </div>
</template>

<script>
import { commend_add } from "../../../api/setting_use.js";
import SettingExplosiveCommend from "../../../components/SettingExplosiveCommend";
export default {
  props: {},
  components: {
    SettingExplosiveCommend
  },
  data() {
    return {
      env: null,

      pageName: "", // 当前页面名字
      type: "RECOMMEND",
      productTypeList: [
        {
          value: "货币基金",
          label: "货币基金"
        },
        {
          value: "理财产品",
          label: "理财产品"
        },
        {
          value: "纯债基金",
          label: "纯债基金"
        },
        {
          value: "存款产品",
          label: "存款产品"
        }
      ],
      productNameList: [
        {
          id: 1,
          value: "美金",
          label: "美金"
        },
        {
          id: 2,
          value: "欧元",
          label: "欧元"
        },
        {
          id: 3,
          value: "卢比",
          label: "卢比"
        },
        {
          id: 4,
          value: "人民币",
          label: "人民币"
        }
      ]
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";

    this.pageName = this.$route.name;
  },
  methods: {
    //接受子组件传递的信息
    reqs(obj) {
      let jurisdiction = JSON.parse(
        sessionStorage.getItem("buttenpremissions")
      );
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("commend_add") > -1) {
        commend_add(obj)
          .then(res => {
            if (res.success) {
              //添加成功  跳转到列表页面
              this.$router.push("/home/setting/commend/list");
            }
          })
          .catch(err => {
            this.$alert(`${err.message}`, "保存失败", {
              confirmButtonText: "确定",
              callback: action => {
                this.$message({
                  type: "info",
                  message: `action: ${action}`
                });
              }
            });
          });
      } else {
        //弹出消息提示用户
        this.$alert("您没有这个权限", {
          confirmButtonText: "确定"
        });
      }
    }
  },
  computed: {}
};
</script>

<style scoped='true' lang="scss">
</style>
