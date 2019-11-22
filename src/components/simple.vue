<template>
  <div id="simpleWaper">
    <div class="isContent">
      <span class="isTitle">交易信息:</span>
      <p>
        <span class="isUpTime">{{pageData.updateTime}}</span>
        <span class="isQuestion" title="有疑问？">
          <i class="fa fa-question-circle-o"></i>
        </span>
      </p>
    </div>
    <div class="isContentWaper">
      <div class="isContent">
        <span class="isTitle">申购笔数：</span>
        <p>
          <input
            v-model="shengouInput"
            :class="isDisable?'shengoutInput':'shengoutInputYes'"
            :disabled="isDisable"
            placeholder="请输入内容"
            @blur="canEdit"
          />
          <span @click="canEdit" style="cursor:pointer;padding:5px;">
            <i class="myIcon14px icon-qichejietubiaoku-"></i>
          </span>
        </p>
      </div>
      <div class="isContent">
        <span class="isTitle">客户评论：</span>
        <p class="withLink">
          <span>{{pageData.kehupinglun}}条</span>
          <span @click=" dialogTableVisible=true">查看评论</span>
        </p>
      </div>
    </div>
    <div class="isContentWaper">
      <div class="isContent">
        <span class="isTitle">关注人数：</span>
        <p>{{pageData.guanzhu}}人</p>
      </div>
      <div class="isContent">
        <span class="isTitle">分享次数：</span>
        <p>{{pageData.fenxiang}}人</p>
      </div>
    </div>
    <el-dialog
      title="用户评论"
      :visible.sync="dialogTableVisible"
      width="90%"
      :close-on-click-modal="false"
    >
      <el-table :data="gridData" max-height="600px" style="margin:0;">
        <el-table-column property="date" label="日期" width="110"></el-table-column>
        <el-table-column property="name" label="姓名" width="80"></el-table-column>
        <el-table-column property="address" label="内容"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["pageData"],
  data() {
    return {
      // 页面用到的数据
      shengouInput: "", // 申购笔数
      isDisable: true, // 申购笔数切换编辑状态
      dialogTableVisible: false,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  created() {
    this.shengouInput = this.pageData.shengoubishu;
  },
  mounted() {},
  methods: {
    canEdit() {
      this.isDisable = !this.isDisable;
    }
  }
};
</script>
