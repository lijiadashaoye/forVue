<template>
  <div id="simpleWaper">
    <div class="isContent">
      <span class="isTitle">
        交易信息:
      </span>
      <p>
        <span class="isUpTime">
          {{pageInfos.updateTime}}
        </span>
        <span
          class="isQuestion"
          title='有疑问？'
        >
          <i class="fa fa-question-circle-o"></i>
        </span>
      </p>
    </div>
    <div class="isContentWaper">
      <div class="isContent">
        <span class="isTitle">
          申购笔数：
        </span>
        <p>
          <input
            v-model="shengouInput"
            :class="isDisable?'shengoutInput':'shengoutInputYes'"
            :disabled="isDisable"
            placeholder="请输入内容"
            @blur="canEdit"
          >
          <span @click="canEdit" style="cursor:pointer;padding:5px;">
            <i class="myIcon14px icon-qichejietubiaoku-"></i>
          </span>
        </p>
      </div>
      <div class="isContent">
        <span class="isTitle">
          客户评论：
        </span>
        <p class="withLink">
          <span>
            {{pageInfos.kehupinglun}}条
          </span>
          <router-link
            class="isLink"
            to="/Products_Management/pure_debt_fund"
            tag="a"
            title='点击查看'
          >查看评论</router-link>
        </p>
      </div>
    </div>
    <div class="isContentWaper">
      <div class="isContent">
        <span class="isTitle">
          关注人数：
        </span>
        <p>
          {{pageInfos.guanzhu}}人
        </p>
      </div>
      <div class="isContent">
        <span class="isTitle">
          分享次数：
        </span>
        <p>
          {{pageInfos.fenxiang}}人
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import xiangqingDatas from "./isData.js";

export default {
  props: ["pageData"],
  data() {
    return {
      // 页面用到的数据
      pageInfos: null,
      shengouInput: "", // 申购笔数
      isDisable: true // 申购笔数切换编辑状态
    };
  },
  created() {
    this.pageInfos = { ...xiangqingDatas.forJiaoYiInfo };
    this.shengouInput = this.pageInfos.shengoubishu;
  },
  mounted() {},
  methods: {
    canEdit() {
      // console.log(this.shengouInput);
      if (this.shengouInput !== this.pageInfos.shengoubishu) {
        setTimeout(_ => {
          this.isDisable = !this.isDisable;
        }, 2000);
      } else {
        this.isDisable = !this.isDisable;
      }
    }
  }
};
</script>
<style>
@import url("./allCss.scss");
</style>
