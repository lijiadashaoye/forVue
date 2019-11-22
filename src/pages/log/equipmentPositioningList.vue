<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env ? 'lineSpan1' : 'lineSpan'">|</span>
        位置：{{ $store.state.for_layout.titles }}{{ pageName }}
      </p>

      <el-form
        :inline="true"
        :model="searchForm"
        label-width="85px"
        label-suffix=":"
        label-position="right"
        size="mini"
        ref="searchForm"
      >
        <el-form-item style="margin-bottom:5px;" label="会员ID">
          <el-input clearable placeholder="会员ID" size="mini" v-model="searchForm.memberId"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="设备ID">
          <el-input clearable placeholder="设备ID" size="mini" v-model="searchForm.deviceId"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="应用渠道标识码" label-width="120px">
          <el-select
            filterable
            clearable
            size="mini"
            v-model="searchForm.appChannelCode"
            placeholder="应用渠道标识码"
          >
            <el-option
              v-for="item in appChannelCodeList"
              :key="item.code"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom:5px;" label="客户端平台标识码" label-width="140px">
          <el-select
            filterable
            clearable
            size="mini"
            v-model="searchForm.platformCode"
            placeholder="客户端平台标识码"
          >
            <el-option
              v-for="item in platformCodeList"
              :key="item.code"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom:0" label="日期">
          <el-date-picker
            clearable
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="riqi"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-bottom:0">
          <el-button @click="searchFn" type="primary" size="mini">查询</el-button>
          <el-button @click="resetFn" size="mini">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="forTable">
      <isTable
        :inputData="this.$store.state.devicePosition.devicePositionList"
        @tableEmit="tableEmit"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import isTable from "@/components/isTable/isTable";

export default {
  components: {
    isTable
  },
  data() {
    return {
      env: null,
      pageName: "",
      searchForm: {
        memberId: "",
        deviceId: "",
        appChannelCode: "",
        platformCode: "",
        queryStartTime: "",
        queryEndTime: ""
      },
      riqi: [],
      appChannelCodeList: [
        { code: "bicai", name: "比财" },
        { code: "pincai", name: "拼财" },
        { code: "yacai", name: "亚财" },
        { code: "ancai", name: "安财" }
      ],
      platformCodeList: [
        { code: "android", name: "安卓" },
        { code: "ios", name: "苹果" },
        { code: "h5", name: "h5" },
        { code: "pmp", name: "小程序" }
      ]
    };
  },
  mounted() {
    this.pageName = this.$route.name.trim();
    //            if (sessionStorage.getItem('objectIdDevice')) {
    //                let objId = JSON.parse(sessionStorage.getItem('objectIdDevice'))
    //                this.getList({objectId:objId});
    //            } else {
    //                this.getList();
    //            }
    this.getList();
    this.$store.state.devicePosition.devicePositionList.data.title = [
      {
        title: "会员ID",
        key: "memberId",
        minWidth: "80"
      },
      {
        title: "设备ID",
        key: "deviceId",
        minWidth: "240"
      },
      {
        title: "应用渠道标识码",
        key: "appChannelName",
        minWidth: "180"
      },
      {
        title: "客户端平台标识码",
        key: "platformName",
        minWidth: "180"
      },
      {
        title: "用户安装的app渠道",
        key: "appMarketCode",
        minWidth: "180"
      },
      {
        title: "IOS->idfa广告标识",
        key: "idfa",
        minWidth: "240"
      },
      {
        title: "安卓->imei",
        key: "imsi",
        minWidth: "180"
      },
      {
        title: "经度",
        key: "lon",
        minWidth: "180"
      },
      {
        title: "纬度",
        key: "lat",
        minWidth: "180"
      },
      {
        title: "经纬度的geohash值",
        key: "geoHashCode",
        minWidth: "180"
      },
      {
        title: "城市编码",
        key: "adCode",
        minWidth: "80"
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "200"
      },
      {
        title: "操作时间",
        key: "gmtModified",
        minWidth: "200"
      }
    ];
  },
  methods: {
    ...mapActions({
      getList: "devicePosition/getList"
    }),
    resetFn() {
      this.searchForm = {
        memberId: "",
        deviceId: "",
        appChannelCode: "",
        platformCode: "",
        queryStartTime: "",
        queryEndTime: ""
      };
      this.riqi = [];
      this.getList({ noPage: false });
    },
    // 搜索
    searchFn() {
      if (this.riqi.length > 0) {
        this.searchForm.queryStartTime = this.riqi[0];
        this.searchForm.queryEndTime = this.riqi[1];
      }
      let obj = {};
      Object.keys(this.searchForm).forEach(str => {
        if (this.searchForm[str] !== "") {
          obj[str] = this.searchForm[str];
        }
      });

      this.getList({
        noPage: false,
        ...obj
      });
    },
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          if (this.riqi.length > 0) {
            this.searchForm.queryStartTime = this.riqi[0];
            this.searchForm.queryEndTime = this.riqi[1];
          }

          //                        if (this.$store.state.devicePosition.devicePositionList.pageNum > 1) {
          //                            params.objectId = this.$store.state.devicePosition.devicePositionList.data.list[this.$store.state.devicePosition.devicePositionList.pageSize -1].id
          //                            sessionStorage.setItem('objectIdDevice',JSON.stringify(params.objectId))
          //                        } else {
          //                            sessionStorage.removeItem('objectIdDevice')
          //                        }
          this.getList(this.searchForm);
          break;
      }
    }
  }
};
</script>
