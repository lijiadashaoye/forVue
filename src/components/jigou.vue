<template>
  <div id="jigouWaper">
    <div class="jigouHeader">
      <div class="header_one">
        <img :src="pageInfos.logo" />
      </div>
      <div class="header_two">
        <p>{{pageInfos.name}}</p>
        <p v-if="pageType===1">{{pageInfos.where}}</p>
        <p v-if="pageType===2">{{pageInfos.zhuceri}}</p>
      </div>
      <div>
        <el-button size="mini" @click="buttonClick('bianji')">编辑</el-button>
        <el-button v-if="pageType===1" size="mini" @click="buttonClick('qianyue')">{{buttonText}}</el-button>
        <el-button size="mini" @click="buttonClick('shanchu')">删除</el-button>
      </div>
    </div>

    <div class="isContentWaper" v-if="pageType===2">
      <div class="isContent">
        <span class="isTitle">资产规模：</span>
        <p>
          {{pageInfos.zichan}}
          <span>亿</span>
        </p>
      </div>
      <div class="isContentLong">
        <span class="isTitleLong">旗下基金数：</span>
        <p>{{pageInfos.qixia}}</p>
      </div>
    </div>

    <div class="isContentWaper" v-if="pageType===1">
      <div class="isContent">
        <span class="isTitle">资产规模：</span>
        <p>
          {{pageInfos.zichan}}
          <span>亿</span>
        </p>
      </div>
      <div class="isContent">
        <span class="isTitle">银行星级：</span>
        <p>{{pageInfos.xingji}}</p>
      </div>
      <div class="isContent">
        <span class="isTitle">机构类型：</span>
        <p>{{pageInfos.leixing}}</p>
      </div>
    </div>

    <div class="isContent">
      <span class="isTitle" @click="toShowMore(1)" title="点击查看全部内容" style="cursor: pointer;">
        {{this.forJiGouInfo.page === "organizational"?'银行描述':'公司描述'}}
        :
        <br />
        <p v-if="toShowMoreNum!==1" style="font-size:12px;color:#aaabac;">内容已被截取</p>
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p :class="toShowMoreNum===1?'':'isHidden'" v-html="pageInfos.miaoshu"></p>
    </div>
    <div v-if="pageType===1">
      <div class="isContentLong">
        <span class="isTitleLong" @click="toShowMore(2)" title="点击查看全部内容" style="cursor: pointer">
          星级评定描述:
          <br />
          <p v-if="toShowMoreNum!==2" style="font-size:12px;color:#aaabac;">内容已被截取</p>
          <span style="font-size:12px;color:#aaabac;">(可点击)</span>
        </span>
        <p :class="toShowMoreNum===2?'':'isHidden'" v-html="pageInfos.xingjimiaoshu"></p>
      </div>
      <div class="isContentWaper">
        <div class="isContentLong">
          <span class="isTitleLong">是否已签约：</span>
          <p>{{pageInfos.qianyue}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">是否可购买：</span>
          <p>{{pageInfos.goumai}}</p>
        </div>

        <div class="isContentLong">
          <span class="isTitleLong">维护时间：</span>
          <p>{{pageInfos.weihu}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">客服服务时间：</span>
          <p>{{pageInfos.kefu}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">银行对接方式：</span>
          <p>{{pageInfos.connectionMode}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">版本标识：</span>
          <p>{{pageInfos.banben}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">是否同卡进出：</span>
          <p>{{pageInfos.tongka}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">是否可绑定多张卡：</span>
          <p>{{pageInfos.bangding}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">是否可换绑卡：</span>
          <p>{{pageInfos.huanka}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">是否需要认证授权：</span>
          <p>{{pageInfos.renzheng}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">是否热门：</span>
          <p>{{pageInfos.hotRecommend}}</p>
        </div>

        <div class="isContentLong">
          <span class="isTitleLong">渠道覆盖类型：</span>
          <p>
            <span v-for="(item,index) in pageInfos.qudaofugai" :key="index">{{item}} &nbsp;</span>
          </p>
        </div>

        <div class="isContentLong">
          <span class="isTitleLong">是否在线开户：</span>
          <p>{{pageInfos.zaixiankaihu}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">客户分类：</span>
          <p>{{pageInfos.kehufenlei}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">产品覆盖类型：</span>
          <p>
            <span v-for="(item,index) in pageInfos.chanpinfugai" :key="index">{{item}} &nbsp;</span>
          </p>
        </div>

        <div class="isContentLong">
          <span class="isTitleLong">安卓开户地址：</span>
          <p>{{pageInfos.Android_dizhi}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">安卓包名：</span>
          <p>{{pageInfos.Android_baoming}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">安卓 H5链接：</span>
          <p>{{pageInfos.Android_H5}}</p>
        </div>

        <div class="isContentLong">
          <span class="isTitleLong">ios 开户地址：</span>
          <p>{{pageInfos.Ios_dizhi}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">ios 包名：</span>
          <p>{{pageInfos.Ios_baoming}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">ios H5链接：</span>
          <p>{{pageInfos.Ios_H5}}</p>
        </div>

        <div class="isContentLong">
          <span class="isTitleLong">是否列表展示：</span>
          <p>{{pageInfos.leibiaozhanshi}}</p>
        </div>
        <div class="isContentLong">
          <span class="isTitleLong">排序号：</span>
          <p>{{pageInfos.paixu}}</p>
        </div>
      </div>
    </div>
    <div style="position:relative;height:20px;">
      <div class="show_time" v-if="pageType===1">
        <span class="isUpTime">
          银行ID：
          {{pageInfos.id}}&nbsp;
          创建时间：
          {{pageInfos.createTime}}
          &nbsp;
          {{pageInfos.who}}
        </span>
      </div>
      <div class="show_time" v-if="pageType===2">
        <span class="isUpTime">
          基金公司ID：
          {{pageInfos.id}}&nbsp;
          创建时间：
          {{pageInfos.createTime}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["forJiGouInfo"],
  data() {
    return {
      page: "",
      buttonText: "", // 签约、解约文字切换
      pageInfos: {},
      toShowMoreNum: null, // 银行描述多行文本隐藏切换
      pageType: null // 确定是机构管理还是基金公司管理
    };
  },
  mounted() {
    this.page = this.forJiGouInfo.page;
    let infoData = this.forJiGouInfo.datas;

    if (this.page === "organizational") {
      this.pageType = 1; // 机构管理
      this.pageInfos = {
        institutionId: infoData.institutionId,
        id: infoData.id,
        name: infoData.name, // 机构名称
        logo: this.$ImgBaseUrl + infoData.logo,
        where: infoData.locationName, // 地址
        zichan: infoData.aum, // 资产规模
        xingji: infoData.starLabel, // 银行星级
        miaoshu: infoData.description, // 银行描述
        leixing: infoData.subTypeLabel, // 机构类型
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
        leibiaozhanshi: infoData.configuration.listView === "YES" ? "是" : "否", // 是否列表展示
        paixu: infoData.configuration.topNo, // 排序号
        createTime: infoData.gmtCreated, // 创建时间
        who: infoData.operator, // 创建人
        connectionMode: infoData.configuration.connectionModeLabel,
        weihu: infoData.configuration.maintainStartTime
          ? infoData.configuration.maintainStartTime +
            " ~ " +
            infoData.configuration.maintainEndTime
          : "", // 维护时间
        kefu: infoData.configuration.serviceTime
          ? infoData.configuration.serviceTime.split(" ")[0] +
            " ~ " +
            infoData.configuration.serviceTime.split(" ")[1]
          : "", // 客服服务时间
        banben: infoData.configuration.version, // 版本标识
        tongka: infoData.configuration.sameCardIo === "YES" ? "是" : "否", // 是否同卡进出
        bangding: infoData.configuration.multipleCards === "YES" ? "是" : "否", // 是否支持绑定多张卡
        huanka: infoData.configuration.replacementCard === "YES" ? "是" : "否", // 是否可换绑卡
        renzheng:
          infoData.configuration.needAuthentication === "YES" ? "是" : "否", // 是否需要认证授权
        hotRecommend:
          infoData.configuration.hotRecommend === "YES" ? "是" : "否" // 是否热门
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
      if (this.pageInfos.qianyue === "否") {
        this.buttonText = "签约";
      } else {
        this.buttonText = "解约";
      }
    }
    if (this.page === "fund_company") {
      this.pageType = 2; // 基金公司管理
      this.pageInfos = {
        id: infoData.id,
        name: infoData.name,
        logo: infoData.logo ? this.$ImgBaseUrl + infoData.logo : "",
        zhuceri: infoData.registrationDate, // 注册日
        zichan: infoData.aum, // 资产规模
        miaoshu: infoData.description, // 公司描述
        createTime: infoData.gmtCreated // 创建时间
      };
    }
  },

  methods: {
    // 页面内的按钮点击
    buttonClick(type) {
      switch (type) {
        case "bianji":
          if (this.page === "fund_company") {
            // 基金管理
            sessionStorage.setItem(
              "jijin_edit_data",
              JSON.stringify(this.forJiGouInfo.datas)
            );
            this.$router.push({
              name: "fund_company_step1"
            });
          }
          if (this.page === "organizational") {
            // 机构管理
            sessionStorage.setItem("jigou_edit", true);
            sessionStorage.setItem(
              "organizational_http",
              JSON.stringify(this.forJiGouInfo.datas)
            );

            let infoData = this.forJiGouInfo.datas;

            let organizational_step1 = {
              name: infoData.name, //  机构名称
              locationId: [], // 所属省/直辖市ID
              type: infoData.subType,
              aum: infoData.aum, // 资产规模
              parentId: infoData.parentId == "-1" ? "" : infoData.parentId, // 隶属机构ID
              hotLine: infoData.hotLine, // 热线电话
              logo: infoData.logo,
              star: +infoData.star, // 星级
              starRatingDesc: infoData.starRatingDesc, // 星级评定描述
              description: infoData.description, // 银行描述
              backgroundImage: infoData.configuration.backgroundImage, // 背景图
              semicircleBackgroundImage:
                infoData.configuration.semicircleBackgroundImage, // 半圆背景图
              textLogo: infoData.configuration.textLogo, // 文字商标
              version: infoData.configuration.version, //版本标识
              serviceTime: "",
              uuid: infoData.uuid,
              weihu: infoData.configuration.maintainStartTime
                ? [
                    infoData.configuration.maintainStartTime,
                    infoData.configuration.maintainEndTime
                  ]
                : [],
              serviceTime: infoData.configuration.serviceTime
                ? infoData.configuration.serviceTime.split(" ")
                : []
            };

            // 查询区域数据，填充location数组
            if (infoData.locationId) {
              let quyu = JSON.parse(sessionStorage.getItem("dict")).quyu;
              wap: for (let i = quyu.length; i--; ) {
                if (quyu[i].value == infoData.locationId) {
                  organizational_step1.locationId = ["" + infoData.locationId];
                  break wap;
                } else {
                  let child = quyu[i].children;
                  if (child) {
                    for (let j = child.length; j--; ) {
                      if (child[j].value == infoData.locationId) {
                        organizational_step1.locationId = [
                          "" + quyu[i].value,
                          "" + infoData.locationId
                        ];
                        break wap;
                      }
                    }
                  }
                }
              }
            }

            if (
              infoData.configuration.maintainStartTime &&
              infoData.configuration.maintainEndTime
            ) {
              organizational_step1.weihu = [
                infoData.configuration.maintainStartTime,
                infoData.configuration.maintainEndTime
              ];
            }

            let organizational_step2 = {
              signedUp: infoData.configuration.signedUp === "YES" ? "是" : "否", // 是否签约
              openedAccount:
                infoData.configuration.openedAccount === "YES" ? "是" : "否", // 是否在线开户
              buyable: infoData.configuration.buyable === "YES" ? "是" : "否", // 是否可购买
              customerClassification:
                infoData.configuration.customerClassification, // 客户分类
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
              listView: infoData.configuration.listView === "YES" ? "是" : "否", // 是否列表展示
              topNo: infoData.configuration.topNo, // 置顶序号
              connectionMode: infoData.configuration.connectionMode,
              hotRecommend:
                infoData.configuration.hotRecommend === "YES" ? "是" : "否", // 是否同卡进出
              sameCardIo:
                infoData.configuration.sameCardIo === "YES" ? "是" : "否", // 是否同卡进出
              multipleCards:
                infoData.configuration.multipleCards === "YES" ? "是" : "否", // 是否支持绑定多张卡
              replacementCard:
                infoData.configuration.replacementCard === "YES" ? "是" : "否", // 是否可换绑卡
              needAuthentication:
                infoData.configuration.needAuthentication === "YES"
                  ? "是"
                  : "否" // 是否需要认证授权
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
          this.$confirm(`确定要${this.buttonText}吗？`)
            .then(() => {
              this.$api
                .product_jigou_qianyue({
                  vm: this,
                  data: {
                    id: this.pageInfos.institutionId,
                    status: this.pageInfos.qianyue === "是" ? "NO" : "YES"
                  }
                })
                .then(res => {
                  if (res) {
                    this.$message.success(`${this.buttonText}成功！`);
                    this.$emit("toReGetData", "organizational");
                  } else {
                    this.$message.success(`${this.buttonText}失败！`);
                  }
                });
            })
            .catch(() => {});
          break;
        case "shanchu":
          if (this.page === "organizational") {
            this.$confirm(`确定要删除吗？`)
              .then(() => {
                this.$api
                  .product_jigou_delete({
                    vm: this,
                    data: this.pageInfos.id
                  })
                  .then(res => {
                    if (res) {
                      this.$router.push({
                        name: "organizational_mainPage"
                      });
                    }
                  });
              })
              .catch(() => {});
          } else {
            this.$confirm(`确定要删除吗？`)
              .then(() => {
                this.$api
                  .product_jijin_delete({
                    vm: this,
                    data: this.pageInfos.id
                  })
                  .then(res => {
                    if (res) {
                      this.$router.push({
                        name: "fund_company_mainPage"
                      });
                    }
                  });
              })
              .catch(() => {});
          }

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
