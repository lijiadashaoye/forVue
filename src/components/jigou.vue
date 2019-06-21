<template>
  <div id="jigouWaper">
    <div class="jigouHeader">
      <div class="header_one">
        <img :src="pageInfos.logo">
      </div>
      <div class="header_two">
        <p>{{pageInfos.name}}</p>
        <p v-if="pageType===1">{{pageInfos.where}}</p>
        <p v-if="pageType===2">{{pageInfos.zhuceri}}</p>
      </div>
      <div>
        <el-button
          size="mini"
          @click="buttonClick('bianji')"
        >
          编辑
        </el-button>
        <el-button
          v-if="pageType===1"
          size="mini"
          @click="buttonClick('qianyue')"
        >
          签约
        </el-button>
        <el-button
          size="mini"
          @click="buttonClick('shangchu')"
        >
          删除
        </el-button>
      </div>
    </div>

    <div
      class="isContentWaper"
      v-if="pageType===2"
    >
      <div class="isContent">
        <span class="isTitle">
          资产规模：
        </span>
        <p>
          {{pageInfos.zichan}}
        </p>
      </div>
      <div class="isContentLong">
        <span class="isTitleLong">
          旗下基金数：
        </span>
        <p>
          {{pageInfos.qixia}}
        </p>
      </div>
    </div>

    <div
      class="isContentWaper"
      v-if="pageType===1"
    >
      <div class="isContent">
        <span class="isTitle">
          资产规模：
        </span>
        <p>
          {{pageInfos.zichan}}
        </p>
      </div>
      <div class="isContent">
        <span class="isTitle">
          银行星级：
        </span>
        <p>
          {{pageInfos.xingji}}
        </p>
      </div>
      <div class="isContent">
        <span class="isTitle">
          机构类型：
        </span>
        <p>
          {{pageInfos.leixing}}
        </p>
      </div>
    </div>

    <div class="isContent">
      <span
        class="isTitle"
        @click="toShowMore(1)"
        title="点击查看全部内容"
        style="cursor: pointer;"
      >
        {{this.forJiGouInfo.page === "organizational"?'银行描述':'公司描述'}}
        :<br>
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        :class="toShowMoreNum===1?'':'isHidden'"
        v-html="pageInfos.miaoshu"
      >

      </p>
    </div>
    <div v-if="pageType===1">
      <div class="isContentLong">
        <span
          class="isTitleLong"
          @click="toShowMore(2)"
          title="点击查看全部内容"
          style="cursor: pointer"
        >
          星级评定描述:<br>
          <span style="font-size:12px;color:#aaabac;">(可点击)</span>
        </span>
        <p
          :class="toShowMoreNum===2?'':'isHidden'"
          v-html="pageInfos.xingjimiaoshu"
        >

        </p>
      </div>
      <div class="isContentWaper">
        <div class="isContentLong">
          <span class="isTitleLong">
            是否已签约：
          </span>
          <p>
            {{pageInfos.qianyue}}
          </p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">
            是否可购买：
          </span>
          <p>
            {{pageInfos.goumai}}
          </p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">
            渠道覆盖类型：
          </span>
          <p>
            <span
              v-for='(item,index) in pageInfos.qudaofugai'
              :key='index'
            >
              {{item}} &nbsp;
            </span>
          </p>
        </div>

        <div class="isContentLong">
          <span class="isTitleLong">
            是否在线开户：
          </span>
          <p>
            {{pageInfos.zaixiankaihu}}
          </p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">
            客户分类：
          </span>
          <p>
            {{pageInfos.kehufenlei}}
          </p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">
            产品覆盖类型：
          </span>
          <p>
            <span
              v-for='(item,index) in pageInfos.chanpinfugai'
              :key='index'
            >
              {{item}} &nbsp;
            </span>
          </p>
        </div>

        <div class="isContentLong">
          <span class="isTitleLong">
            安卓开户地址：
          </span>
          <p>
            {{pageInfos.Android_dizhi}}
          </p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">
            安卓包名：
          </span>
          <p>
            {{pageInfos.Android_baoming}}

          </p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">
            安卓 H5链接：
          </span>
          <p>
            {{pageInfos.Android_H5}}
          </p>
        </div>

        <div class="isContentLong">
          <span class="isTitleLong">
            ios 开户地址：
          </span>
          <p>
            {{pageInfos.Ios_dizhi}}
          </p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">
            ios 包名：
          </span>
          <p>
            {{pageInfos.Ios_baoming}}
          </p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">
            ios H5链接：
          </span>
          <p> {{pageInfos.Ios_H5}}
          </p>
        </div>

        <div class="isContentLong">
          <span class="isTitleLong">
            是否列表展示：
          </span>
          <p>
            {{pageInfos.leibiaozhanshi}}
          </p>
        </div>
        <div class="isContentLong">
          <span
            class="isTitleLong"
            style="width:120px;flex-shrink: 0"
          >
            是否打通open api：
          </span>
          <p>
            {{pageInfos.datong}}
          </p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">
            排序号：
          </span>
          <p>
            {{pageInfos.paixu}}
          </p>
        </div>
      </div>
    </div>
    <div style="position:relative;height:20px;">
      <div
        class="show_time"
        v-if="pageType===1"
      >
        <span class="isUpTime">
          银行ID：
          {{pageInfos.id}}&nbsp;
          创建时间：
          {{pageInfos.createTime}}
          &nbsp;
          {{pageInfos.who}}
        </span>
      </div>
      <div
        class="show_time"
        v-if="pageType===2"
      >
        <span class="isUpTime">
          基金公司ID：
          {{pageInfos.id}}&nbsp;
          创建时间：
          {{pageInfos.createTime}}
          &nbsp;
          {{pageInfos.who}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import xiangqingDatas from "./isData.js";

export default {
  props: ["forJiGouInfo"],
  data() {
    return {
      pageInfos: {},
      toShowMoreNum: null, // 银行描述多行文本隐藏切换
      pageType: null // 确定是机构管理还是基金公司管理
    };
  },
  mounted() {
    let page = this.forJiGouInfo.page;
    if (page === "organizational") {
      this.pageType = 1; // 机构管理
    }
    if (page === "fund_company") {
      this.pageType = 2; // 基金公司管理
    }
    let infoData = this.forJiGouInfo.datas;

    this.pageInfos = {
      id: infoData.id,
      name: infoData.name, // 机构名称
      // logo: this.$ImgBaseUrl + infoData.logo,
      logo: infoData.logo,
      where: infoData.locationName, // 地址
      zichan: infoData.aum, // 资产规模
      xingji: infoData.starLabel, // 银行星级
      miaoshu: infoData.description, // 银行描述
      leixing: infoData.typeLabel, // 机构类型
      xingjimiaoshu: infoData.starRatingDesc, // 星级评定描述
      qianyue: infoData.configuration.signedUp === "YES" ? "是" : "否", // 是否签约
      goumai: infoData.configuration.buyable === "YES" ? "是" : "否", // 是否可买
      qudaofugai: [], // 渠道覆盖类型
      zaixiankaihu:
        infoData.configuration.openedAccount === "YES" ? "是" : "否", // 是否在线开户
      kehufenlei: infoData.configuration.customerClassificationLabel, // 客户分类
      chanpinfugai: [], // 产品覆盖类型
      Android_dizhi: infoData.configuration.androidOpeningAddress, // 安卓开户地址
      Android_baoming: infoData.configuration.androidPkgName, // 安卓包名
      Android_H5: infoData.configuration.androidH5Link, // 安卓 H5
      Ios_dizhi: infoData.configuration.iosOpeningAddress, // ios 开户地址
      Ios_baoming: infoData.configuration.iosPkgName, // ios 包名
      Ios_H5: infoData.configuration.iosH5Link, // ios H5
      leibiaozhanshi: infoData.configuration.signedUp === "YES" ? "是" : "否", // 是否列表展示
      datong: infoData.configuration.directConnect === "YES" ? "是" : "否", // 是否打通openApi
      paixu: infoData.configuration.topNo, // 排序号
      createTime: infoData.gmtCreated, // 创建时间
      who: infoData.operator // 创建人
    };
    if (infoData.productCoverageList.length > 0) {
      infoData.productCoverageList.forEach(item => {
        this.pageInfos.chanpinfugai.push(item.productName);
      });
    }
    if (infoData.channelCoverageList.length > 0) {
      infoData.channelCoverageList.forEach(item => {
        this.pageInfos.qudaofugai.push(item.channelName);
      });
    }
  },

  methods: {
    // 页面内的按钮点击
    buttonClick(type) {
      switch (type) {
        case "bianji":
          if (this.forJiGouInfo.page === "fund_company") {
            this.$router.push({
              name: "fund_company_step1"
              // query: {
              //   page: "fund_company"
              // }
            });
          }
          if (this.forJiGouInfo.page === "organizational") {
            sessionStorage.setItem(
              "organizational_http",
              JSON.stringify(this.forJiGouInfo.datas)
            );

            let infoData = this.forJiGouInfo.datas;
            let organizational_step1 = {
              name: infoData.name, //  机构名称
              locationId: infoData.locationId, // 所属省/直辖市ID
              type: +infoData.type, //  机构类型
              aum: infoData.aum, // 资产规模
              parentId: infoData.parentId, // 隶属机构ID
              hotLine: infoData.hotLine, // 热线电话
              logo: infoData.logo,
              star: +infoData.star, // 星级
              starRatingDesc: infoData.starRatingDesc, // 星级评定描述
              description: infoData.description // 银行描述
            };
            let organizational_step2 = {
              signedUp:
                infoData.configuration.description === "YES" ? "是" : "否", // 是否签约
              openedAccount:
                infoData.configuration.description === "YES" ? "是" : "否", // 是否在线开户
              buyable:
                infoData.configuration.description === "YES" ? "是" : "否", // 是否可购买
              customerClassification: +infoData.configuration
                .customerClassification, // 客户分类
              channel_coverage: infoData.channelCoverageList.map(
                item => item.channelName
              ), // 渠道覆盖类型
              product_coverage: infoData.productCoverageList.map(
                item => item.productName
              ), //产品覆盖类型
              androidOpeningAddress:
                infoData.configuration.androidOpeningAddress, // Android开户地址
              iosOpeningAddress: infoData.configuration.iosOpeningAddress, // IOS开户地址
              androidPkgName: infoData.configuration.androidPkgName, // Android包名
              iosPkgName: infoData.configuration.iosPkgName, // IOS包名
              androidH5Link: infoData.configuration.androidH5Link, // 安卓H5链接
              iosH5Link: infoData.configuration.iosH5Link, // IOS H5链接
              directConnect:
                infoData.configuration.directConnect === "YES" ? "是" : "否", // 是否银行直连（OpenAPI）
              listView: infoData.configuration.listView === "YES" ? "是" : "否", // 是否列表展示
              topNo: infoData.configuration.topNo // 置顶序号
            };

            sessionStorage.setItem(
              "organizational_step1",
              JSON.stringify(organizational_step1)
            );
            sessionStorage.setItem(
              "organizational_step2",
              JSON.stringify(organizational_step2)
            );
            this.$router.push({
              name: "organizational_step1"
            });
          }
          break;
        case "qianyue":
          console.log(type);
          break;
        case "shangchu":
          console.log(type);
          break;
      }
    },
    toShowMore(num) {
      if (this.toShowMoreNum === num) {
        this.toShowMoreNum = null;
      } else {
        this.toShowMoreNum = num;
      }
    }
  }
};
</script>
<style>
@import url("./allCss.scss");
</style>
