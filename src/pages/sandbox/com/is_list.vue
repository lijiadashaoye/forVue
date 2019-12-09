<template>
  <div class="add_bank_product">
    <div class="isList" v-for="tar in datas.data" :key="tar.id">
      <div class="names">
        <div>
          <el-checkbox
            @change="forMoreDelete(tar)"
            v-model="tar.checked"
            class="forName"
          >{{tar.name}}</el-checkbox>
          <p :class="tar.statue!=='已结束'?'useing':'over'">{{tar.statue}}</p>
        </div>
        <div class="forAction">
          <el-link type="primary" @click="action(1,tar)">修改</el-link>
          <el-link type="warning" @click="action(2,tar)">复制</el-link>
          <el-link type="danger" @click="action(3,tar)">删除</el-link>
        </div>
      </div>
      <p class="setFontSize">ID：{{tar.id}}</p>
      <p class="setFontSize">
        生效时间：
        {{tar.startTime}}
        至
        {{tar.endTime?tar.endTime:'~'}}
      </p>

      <div class="everyTJ">
        <div>
          <p class="canseeTitle">可见条件：</p>
          <ul>
            <li v-for="can in tar.one_can" :key="can">{{can}}</li>
          </ul>
        </div>
        <p class="howCan_Not" v-if="tar.howOne">{{tar.howOne}}</p>
        <div v-if="tar.howOne">
          <p class="notseeTitle">不可见条件：</p>
          <ul>
            <li v-for="not in tar.one_not" :key="not">{{not}}</li>
          </ul>
        </div>
      </div>

      <p class="howCan_Not" style="padding-left:0;" v-if="tar.one_two">{{tar.one_two}}</p>

      <div class="everyTJ" v-if="tar.one_two">
        <div>
          <p class="canseeTitle">可见条件：</p>
          <ul>
            <li v-for="can in tar.two_can" :key="can">{{can}}</li>
          </ul>
        </div>
        <p class="howCan_Not" v-if="tar.howTwo">{{tar.howTwo}}</p>
        <div v-if="tar.howTwo">
          <p class="notseeTitle">不可见条件：</p>
          <ul>
            <li v-for="not in tar.two_not" :key="not">{{not}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content:flex-end;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="datas.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="datas.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="datas.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: { datas: Object },
  data() {
    return {
      env: "",
      pageName: "",
      moreDelete: [] // 批量删除用
    };
  },
  created() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
  },
  methods: {
    action(num, tar) {
      switch (num) {
        case 1: // 修改
          this.$emit("tableEmit", { type: "edit", data: tar });
          break;
        case 2: // 复制
          this.$emit("tableEmit", { type: "copy", data: tar });
          break;
        case 3: // 删除
          this.$emit("tableEmit", { type: "alone", data: tar.id });
          break;
      }
    },
    // 单选框
    forMoreDelete(tar) {
      if (tar.checked) {
        this.moreDelete.push(tar);
      } else {
        this.moreDelete = this.moreDelete.filter(item => item.id != tar.id);
      }
      this.$emit("tableEmit", { type: "moreDelete", data: this.moreDelete });
    },
    handleSizeChange(val) {
      this.datas.pageSize = val;
      this.$emit("tableEmit", { type: "regetData" });
    },
    handleCurrentChange(val) {
      this.datas.pageNum = val;
      this.$emit("tableEmit", { type: "regetData" });
    }
  }
};
</script>

