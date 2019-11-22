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
        <el-form-item style="margin-bottom:5px;" label="券ID">
          <el-input clearable placeholder="券ID" size="mini" v-model="searchForm.couponId"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="点位标识">
          <el-input clearable placeholder="点位标识" size="mini" v-model="searchForm.functionId"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="应用渠道标识码" label-width="120px">
          <el-select
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
          <el-select clearable size="mini" v-model="searchForm.platformCode" placeholder="客户端平台标识码">
            <el-option
              v-for="item in platformCodeList"
              :key="item.code"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom:5px;" label="城市编码">
          <el-input clearable placeholder="城市编码" size="mini" v-model="searchForm.adCode"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="用户安装的比财app渠道" label-width="180px">
          <el-input
            clearable
            placeholder="用户安装的比财app渠道"
            size="mini"
            v-model="searchForm.appMarketCode"
          ></el-input>
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
        :inputData="this.$store.state.pointLocation.pointLocationList"
        @tableEmit="tableEmit"
      />
    </div>

    <!--扩展字段表格-->
    <el-dialog title="扩展字段" :visible.sync="dialogTableVisible" width="740px">
      <p>
        <span>点位名称：</span>
        <span>{{pointName ? pointName : ''}}</span>
      </p>
      <p>
        <span>点位标识：</span>
        <span>{{pointCode ? pointCode : ''}}</span>
      </p>

      <el-table :data="gridData">
        <el-table-column align="center" property="key" label="字段名" width="150"></el-table-column>
        <el-table-column align="center" property="value" label="值" width="150"></el-table-column>
        <el-table-column align="center" property="dec" label="描述"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import isTable from "@/components/isTable/isTable";

export default {
  components: {
    isTable
  },
  data() {
    return {
      env: null,
      pointName: "",
      pointCode: "",
      dialogTableVisible: false, // 扩展字段
      gridData: [], // 扩展字段数据
      pageName: "",

      appChannelCodeList: [
        { code: "bicai", name: "比财" },
        { code: "pincai", name: "拼财" },
        { code: "yacai", name: "亚财" },
        { code: "ancai", name: "安财" }
      ],
      platformCodeList: [
        { code: "android", name: "安卓" },
        { code: "IOS", name: "苹果" },
        { code: "h5", name: "h5" },
        { code: "pmp", name: "小程序" }
      ],

      riqi: [],
      searchForm: {
        memberId: "",
        deviceId: "",
        functionId: "",
        appChannelCode: "",
        platformCode: "",
        adCode: "",
        appMarketCode: "",
        couponId: "",
        queryStartTime: "",
        queryEndTime: ""
      }
    };
  },
  mounted() {
    this.userDo();
    this.pageName = this.$route.name.trim();
    this.getList();
    this.$store.state.pointLocation.pointLocationList.data.title = [
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
        key: "appChannelCode",
        minWidth: "180"
      },
      {
        title: "客户端平台标识码",
        key: "platformCode",
        minWidth: "180"
      },
      {
        title: "创建时间",
        key: "gmtCreated",
        minWidth: "180"
      },
      {
        title: "操作时间",
        key: "gmtOperated",
        minWidth: "180"
      },
      {
        title: "点位标识",
        key: "functionId",
        minWidth: "120"
      },
      {
        title: "点位名称",
        key: "functionName",
        minWidth: "240"
      },
      {
        title: "城市编码",
        key: "adCode",
        minWidth: "120"
      },
      {
        title: "用户安装的比财app渠道",
        key: "appMarketCode",
        minWidth: "180"
      },
      {
        title: "券id",
        key: "couponId",
        minWidth: "120"
      },
      {
        title: "IOS->idfa广告标识",
        key: "idfa",
        minWidth: "180"
      },
      {
        title: "安卓->imei",
        key: "imsi",
        minWidth: "180"
      },
      {
        title: "ip地址",
        key: "ipAddress",
        minWidth: "180"
      },
      {
        title: "版本号",
        key: "versionNum",
        minWidth: "100"
      },
      {
        title: "版本名称",
        key: "versionName",
        minWidth: "180"
      },
      {
        title: "操作系统",
        key: "os",
        minWidth: "200"
      },
      {
        title: "网络类型",
        key: "networkTypeCN",
        minWidth: "180"
      },
      {
        title: "运营商",
        key: "carrier",
        minWidth: "180"
      },
      {
        title: "手机型号",
        key: "phoneModel",
        minWidth: "120"
      },
      {
        title: "备注",
        key: "remark",
        minWidth: "180"
      }
    ];
  },
  methods: {
    ...mapActions({
      getList: "pointLocation/getList"
    }),
    ...mapMutations({
      userDo: "pointLocation/userDo"
    }),
    resetFn() {
      this.searchForm = {
        memberId: "",
        deviceId: "",
        functionId: "",
        appChannelCode: "",
        platformCode: "",
        adCode: "",
        appMarketCode: "",
        couponId: "",
        queryStartTime: "",
        queryEndTime: ""
      };
      this.riqi = [];
      this.getList({ noPage: true });
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

          this.getList(this.searchForm);
          break;
        case "textClick":
          this.gridData = [];
          this.pointName = data.data.functionName;
          this.pointCode = data.data.functionId;
          if (data.data.expand && Object.keys(data.data.expand).length > 0) {
            Object.keys(data.data.expand).forEach(v => {
              let obj = {};
              obj.key = v;
              obj.value =
                data.data.expand[v].split("?????*****")[0] == "null"
                  ? ""
                  : data.data.expand[v].split("?????*****")[0];
              obj.dec = data.data.expand[v].split("?????*****")[1];
              this.gridData.push(obj);
            });
          }
          this.dialogTableVisible = true;
      }
    }
  }
};
</script>
