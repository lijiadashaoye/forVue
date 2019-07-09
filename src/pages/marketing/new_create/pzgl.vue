<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>

      <el-form label-width="80px" label-position="right" size="mini">
        <el-form-item label="活动编号 :" style="margin-bottom:5px;">
          <el-select placeholder="请选择" v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>&nbsp;
          <el-button size="mini" type="primary" @click="addbutton">添加</el-button>
          <el-button size="mini" type="warning" @click="editbutton">预览</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="forTable">
      <!-- <isTable  :inputData="tableInputData" @tableEmit="tableEmit"/> -->
    </div>
  </div>
</template>

<script>
// import isTable from "../../../components/isTable/isTable.vue";
export default {
  // components: {
  //   isTable
  // },
  data() {
    return {
      pageName: "配置管理", // 当前页面名字
      options: [
        {
          value: "选项1",
          label: "侧边栏-left"
        },
        {
          value: "选项5",
          label: "侧边栏-bottom"
        }
      ],
      // value: "",
      // tableInputData: {
      //   data: {
      //   title: [],// 给表格表头
      //   list: [], // 给表格的数据
      // },
      // },
      
     
    };
  },
  created() {},
  mounted() {},
  methods: {
    addbutton() {
      // console.log(addbutton);
    },
    // editbutton() {
    //   // 跳转到scyl.vue页面,name为scyl.vue页面路由配置里的的name属性
    //   // this.$router.push({ name: "scyl", query: { scylId: this.scylId } });
    // },
    // tableEmit() {}
  }
};
</script>
