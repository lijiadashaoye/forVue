<template>
  <div class="pageWaper">
    <p
      v-if="actID"
      style="padding-bottom:10px;"
    >活动编号：{{formData.activityNo}}</p>
    <div class="formWaper">
      <div class="forms">
        <el-form
          size="small"
          ref="formData"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >

          <el-form-item
            label="活动名称"
            prop="activityName"
          >
            <el-input v-model="formData.activityName"></el-input>
          </el-form-item>

          <el-form-item
            label="活动编号"
            prop="activityNo"
          >
            <el-input v-model="formData.activityNo"></el-input>
          </el-form-item>

          <el-form-item
            label="活动时间"
            prop="time"
          >
            <el-date-picker
              style="width:100%;"
              v-model="formData.time"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item
            label="活动奖励"
            required
          >
            <el-select
              v-model="whichAward"
              placeholder="请输入活动奖励类型"
              style="width:100%;"
              clearable
              multiple
              @change="toShowAwardList"
            >
              <el-option
                v-for="item in methodData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div v-if="jiangliKaQuan.length>0||jiangliHongBao.length>0">
            <p style="font-weight:bold;font-size:14px;margin-bottom:5px;">已使用的：(点击可以删除)</p>
            <div class="hasSelectJiangLi">
              <p
                v-for="(tar,ind1) in jiangliKaQuan"
                :key="ind1+'a'"
                @click="deleteJiangli(tar)"
                title="删除"
              >
                <span>卡券：</span>
                <span>{{tar.name}}</span>
              </p>
              <p
                v-for="(tars,ind2) in jiangliHongBao"
                :key="ind2+'b'"
                @click="deleteJiangli(tars)"
              >
                <span>红包：</span>
                <span>{{tars.name}}</span>
              </p>
            </div>
          </div>

          <el-form-item
            label="活动奖励说明"
            prop="description"
          >
            <el-input
              rows='5'
              type='textarea'
              v-model="formData.description"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="链接地址"
            prop="link"
          >
            <el-input
              rows='5'
              type='textarea'
              v-model="formData.link"
            ></el-input>
          </el-form-item>

        </el-form>
      </div>
      <div
        class="tables"
        v-if='whichAward.includes("COUPON")||whichAward.includes("PACKET")'
      >
        <!-- 卡券 -->
        <div v-if="setCOUPON">
          <div id='forHeader'>
            <el-form
              size="small"
              :model="COUPON_tableSearch"
              :rules="rules"
              label-width="80px"
              inline
            >
              <el-form-item
                style="margin-bottom:2px;"
                label="持续时间"
              >
                <el-date-picker
                  style="width:100%;"
                  v-model="COUPON_tableSearch.time"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                style="margin-bottom:2px"
                label="卡券名称"
              >
                <el-input v-model="COUPON_tableSearch.name"></el-input>
              </el-form-item>
              <el-form-item
                style="margin-bottom:2px;"
                label="卡券说明"
              >
                <el-input v-model="COUPON_tableSearch.couponExplain"></el-input>
              </el-form-item>

              <el-form-item style="margin-bottom:2px;">
                <el-button
                  size="mini"
                  type="danger"
                  @click="toSearch('COUPON')"
                >查询</el-button>
              </el-form-item>

            </el-form>

          </div>
          <div
            id='forHeader'
            style="height:240px;"
          >

            <isTable
              v-if="COUPON_table.show"
              :inputData='COUPON_table'
              @tableEmit='tableEmit($event,"coupon")'
            />
          </div>
        </div>
        <!-- 红包 -->
        <div v-if="setPACKET">
          <div id='forHeader'>
            <el-form
              size="small"
              :model="PACKET_tableSearch"
              :rules="rules"
              label-width="80px"
              inline
            >
              <el-form-item
                style="margin-bottom:2px"
                label="红包名称"
              >
                <el-input v-model="PACKET_tableSearch.name"></el-input>
              </el-form-item>
              <el-form-item
                style="margin-bottom:2px;"
                label="红包说明"
              >
                <el-input v-model="PACKET_tableSearch.couponExplain"></el-input>
              </el-form-item>

              <el-form-item style="margin-bottom:2px;">
                <el-button
                  size="mini"
                  type="danger"
                  @click="toSearch('PACKET')"
                >查询</el-button>
              </el-form-item>

            </el-form>

          </div>
          <div
            id='forHeader'
            style="height:240px;"
          >
            <isTable
              v-if="PACKET_table.show"
              :inputData='PACKET_table'
              @tableEmit="tableEmit($event,'packet')"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="buttons">
      <el-button
        @click="step()"
        type="primary"
      >下一步</el-button>
      <el-button
        @click="reset"
        type="info"
      >重 置</el-button>
    </div>
  </div>
</template>
<script>
import isTable from "../../../../components/isTable/isTable.vue";

export default {
  components: {
    isTable
  },
  data() {
    return {
      actID: "", // 如果是点击编辑，会有id传过来
      setCOUPON: false, // 活动奖励备选项表格(卡券)
      setPACKET: false, // 活动奖励备选项表格(红包)
      jiangliKaQuan: [], // 保存已经添加的卡券奖励
      jiangliHongBao: [], // 保存已经添加的红包奖励

      COUPON_table: {
        show: false,
        // 卡券
        // 传给table子组件的数据
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      PACKET_table: {
        show: false,
        // 红包
        // 传给table子组件的数据
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      COUPON_tableSearch: {
        name: "",
        couponExplain: "",
        time: []
      },
      // 红包列表的搜索
      PACKET_tableSearch: {
        name: "",
        couponExplain: ""
      },
      whichAward: [], // 活动奖励类型
      formData: {
        activityNo: "", // 活动编号
        activityName: "", // 活动名称
        description: "", // 活动规则说明
        link: "" // 活动链接
      },
      methodData: [
        // 活动奖励选项数据
        {
          label: "卡劵",
          value: "COUPON"
        },
        {
          label: "红包",
          value: "PACKET"
        },
        {
          label: "现金",
          value: "CASH"
        },
        {
          label: "其它",
          value: "OTHER"
        }
      ],
      //表单验证
      rules: {
        activityName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 12, message: "最多输入12个字", trigger: "blur" }
        ],
        time: [{ required: true, message: "请输入活动时间", trigger: "blur" }],
        description: [
          { required: true, message: "请输入活动规则说明", trigger: "blur" },
          { min: 1, max: 800, message: "最多输入800个字", trigger: "blur" }
        ],
        link: [
          { required: true, message: "请输入跳转链接地址", trigger: "blur" }
        ]
      }
    };
  },
  beforeDestroy() {
    this.$store.commit("set_asideState", { data: true });
  },
  mounted() {
    let datas = JSON.parse(sessionStorage.getItem("step1Data"));
    this.actID = this.$route.query["id"];
    if (datas || this.actID) {
      // 如果有datas 表示曾经编辑过step1，或者是从列表点击修改
      if (this.actID) {
        // 如果有id表示是编辑
        this.$api
          .market_create_getActData({
            vm: this,
            data: this.actID
          })
          .then(res => {
            if (res) {
              sessionStorage.setItem("fromHttp", JSON.stringify(res.data));

              this.formData = {
                id: this.actID,
                activityNo: res.data.activityNo ? res.data.activityNo : "", // 活动编号
                activityName: res.data.activityName
                  ? res.data.activityName
                  : "", // 活动名称
                description: res.data.description ? res.data.description : "", // 活动规则说明
                link: res.data.link ? res.data.link : "", // 活动链接
                time: [new Date(res.data.startTime), new Date(res.data.endTime)]
              };

              if (res.data.packetList.length > 0) {
                this.$store.commit("set_asideState", { data: false });
                this.whichAward.push("PACKET");
                // 红包
                res.data.packetList.forEach(item => {
                  let obj2 = {
                    // 用来显示已经添加了哪些卡券
                    type: "PACKET",
                    name: item.name,
                    num: item.awardValue,
                    id: item.id
                  };
                  this.jiangliHongBao.push(obj2);
                  if (!this.formData.awardList) {
                    this.formData.awardList = [];
                  }
                  this.formData.awardList.push({
                    id: item.id,
                    awardType: "PACKET",
                    awardValue: item.awardValue,
                    id: item.id
                  });
                });
                this.toSearch("PACKET");
              }
              if (res.data.couponList.length > 0) {
                this.$store.commit("set_asideState", { data: false });
                // 卡券
                this.whichAward.push("COUPON");
                res.data.couponList.forEach(item => {
                  let obj2 = {
                    // 用来显示已经添加了哪些卡券
                    type: "COUPON",
                    name: item.name,
                    num: item.awardValue,
                    id: item.id
                  };
                  this.jiangliKaQuan.push(obj2);
                  // 如果没有执行过上边红包的添加，则要对formData.awardList初始化，
                  // formData 初始化时并没有 awardList
                  if (!this.formData.awardList) {
                    this.formData.awardList = [];
                  }
                  this.formData.awardList.push({
                    id: item.id,
                    awardType: "COUPON",
                    awardValue: item.awardValue,
                    id: item.id
                  });
                });
                this.toSearch("COUPON");
              }
            }
          });
      } else {
        // 表示是曾经编辑过的step1
        this.formData = datas;
        if (sessionStorage.getItem("whichAward")) {
          this.whichAward = JSON.parse(sessionStorage.getItem("whichAward"));
        }
        if (sessionStorage.getItem("jiangliHongBao")) {
          this.jiangliHongBao = JSON.parse(
            sessionStorage.getItem("jiangliHongBao")
          );
        }
        if (sessionStorage.getItem("jiangliKaQuan")) {
          this.jiangliKaQuan = JSON.parse(
            sessionStorage.getItem("jiangliKaQuan")
          );
        }
        if (this.whichAward.length > 0) {
          this.whichAward.forEach(item => this.toShowAwardList());
        }
      }
    } else {
    }
  },
  methods: {
    // 备选表格的查询
    toSearch(type) {
      switch (type) {
        case "COUPON": // 卡券查询
          this.COUPON_Search(this.COUPON_tableSearch);
          break;
        case "PACKET": // 红包查询
          this.PACKET_Search(this.PACKET_tableSearch);
          break;
      }
    },
    // 监听表格的操作
    tableEmit(type, data) {
      switch (type.type) {
        case "regetData": // 分页的emit
          if (data === "coupon") {
            let obj = {
              pageNum: this.COUPON_table.pageNum,
              pageSize: this.COUPON_table.pageSize,
              time: []
            };
            this.COUPON_Search(obj);
          }
          if (data === "packet") {
            let obj = {
              pageNum: this.PACKET_table.pageNum,
              pageSize: this.PACKET_table.pageSize
            };
            this.PACKET_Search(obj);
          }
          break;
        case "toUse": // 添加活动奖励
          if (!this.formData.awardList) {
            this.formData.awardList = [];
          }
          if (data === "coupon") {
            // 添加卡券
            if (this.formData.awardList.length == 0) {
              let obj = {
                awardType: "COUPON",
                awardValue: type.data.id
              };
              this.formData.awardList.push(obj);
              let obj2 = {
                // 用来显示已经添加了哪些卡券
                type: "COUPON",
                name: type.data.name,
                num: type.data.id
              };
              this.jiangliKaQuan.push(obj2);
            } else {
              let isIn = this.formData.awardList.some(item => {
                return (
                  item.awardType == "COUPON" && item.awardValue == type.data.id
                );
              });
              if (!isIn) {
                let obj = {
                  awardType: "COUPON",
                  awardValue: type.data.id
                };
                this.formData.awardList.push(obj);
                let obj2 = {
                  // 用来显示已经添加了哪些卡券
                  type: "COUPON",
                  name: type.data.name,
                  num: type.data.id
                };
                this.jiangliKaQuan.push(obj2);
              } else {
                this.$message.warning("已经使用了！");
              }
            }
          }
          if (data === "packet") {
            // 添加红包
            if (this.formData.awardList.length == 0) {
              let obj = {
                awardType: "PACKET",
                awardValue: type.data.id
              };
              this.formData.awardList.push(obj);
              let obj2 = {
                // 用来显示已经添加了哪些卡券
                type: "PACKET",
                name: type.data.name,
                num: type.data.id
              };
              this.jiangliHongBao.push(obj2);
            } else {
              let isIn = this.formData.awardList.some(item => {
                return (
                  item.awardType == "PACKET" && item.awardValue == type.data.id
                );
              });
              if (!isIn) {
                let obj = {
                  awardType: "PACKET",
                  awardValue: type.data.id
                };
                this.formData.awardList.push(obj);
                let obj2 = {
                  // 用来显示已经添加了哪些红包
                  type: "PACKET",
                  name: type.data.name,
                  num: type.data.id
                };
                this.jiangliHongBao.push(obj2);
              } else {
                this.$message.warning("已经使用了！");
              }
            }
          }
          break;
      }
    },
    // 删除奖励
    deleteJiangli(item) {
      if (item.type === "PACKET") {
        this.jiangliHongBao = this.jiangliHongBao.filter(tar => {
          return tar.num != item.num;
        });
      }
      if (item.type === "COUPON") {
        this.jiangliKaQuan = this.jiangliKaQuan.filter(tar => {
          return tar.num != item.num;
        });
      }
      // 红包和卡券有可能id相同，所以只能用删除项在awardList 的索引进行删除
      let num;
      for (let i = this.formData.awardList.length; i--; ) {
        if (
          this.formData.awardList[i].awardValue == item.num &&
          this.formData.awardList[i].awardType === item.type
        ) {
          num = i;
        }
      }
      this.formData.awardList.splice(num, 1);
    },
    // 卡券表格的查询
    COUPON_Search(searchData) {
      let obj = {};
      if (searchData.time.length > 0) {
        let start = new Date(searchData.time[0]).getTime();
        let end = new Date(searchData.time[1]).getTime();
        obj.startTime = start;
        obj.endTime = end;
      }
      if (searchData.name) {
        obj.name = searchData.name;
      }
      if (searchData.couponExplain) {
        obj.couponExplain = searchData.couponExplain;
      }
      let setData = datas => {
        this.$api
          .market_create_getCouponList({
            vm: this,
            data: datas
          })
          .then(res => {
            if (res) {
              this.COUPON_table.total = res.data.total > 0 ? res.data.total : 1;
              // title 里显示的没有额外设置的表头，其他有额外设置的，需要另添加
              this.COUPON_table.data.title = [
                {
                  title: "卡券名称",
                  key: "name",
                  minWidth: "80"
                },
                {
                  title: "卡券说明",
                  key: "couponExplain",
                  minWidth: "80"
                },
                {
                  title: "持续时间",
                  key: "durationDay",
                  minWidth: "70"
                },
                {
                  title: "有效期开始时间",
                  key: "startTime",
                  minWidth: "160"
                },
                {
                  title: "有效期结束时间",
                  key: "endTime",
                  minWidth: "160"
                }
              ];
              this.COUPON_table.data.custom = [
                {
                  text: "使用",
                  type: "warning",
                  size: "small",
                  emit: "toUse"
                }
              ];
              this.COUPON_table.data.list = [...res.data.list];
              this.COUPON_table.data.quanxian = ["1"];
              this.setCOUPON = true;
              this.COUPON_table.show = true;
            }
          });
      };
      setData(obj);
    },
    // 红包表格的查询
    PACKET_Search(data) {
      this.$api
        .market_create_getPacketList({
          vm: this,
          data: data
        })
        .then(res => {
          if (res) {
            this.PACKET_table.total = res.data.total > 0 ? res.data.total : 1;
            // title 里显示的没有额外设置的表头，其他有额外设置的，需要另添加
            this.PACKET_table.data.title = [
              {
                title: "红包名称",
                key: "name",
                minWidth: "80"
              },
              {
                title: "红包说明",
                key: "packetExplain",
                minWidth: "80"
              },
              {
                title: "总金额",
                key: "totalAmount",
                minWidth: "70"
              },
              {
                title: "总个数",
                key: "totalNum",
                minWidth: "60"
              },
              {
                title: "创建时间",
                key: "gmtCreated",
                minWidth: "160"
              }
            ];
            this.PACKET_table.data.custom = [
              {
                text: "使用",
                type: "warning",
                size: "small",
                emit: "toUse"
              }
            ];
            this.PACKET_table.data.quanxian = ["1"];
            this.PACKET_table.data.list = [...res.data.list];
            this.setPACKET = true;
            this.PACKET_table.show = true;
          }
        });
    },
    // 奖励类型表格
    toShowAwardList() {
      // 卡券
      if (this.whichAward.includes("COUPON")) {
        if (!this.formData.awardList) {
          this.formData.awardList = [];
        }
        this.setCOUPON = true;
        this.$store.commit("set_asideState", { data: false });
        if (this.COUPON_table.data.list.length == 0) {
          this.COUPON_Search({
            pageSize: this.COUPON_table.pageSize,
            pageNum: this.COUPON_table.pageNum,
            time: []
          });
        }
      } else {
        this.setCOUPON = false;
        this.jiangliKaQuan.forEach(item => this.deleteJiangli(item));
        this.jiangliKaQuan = []; // 保存已经添加的卡券奖励
      }
      // 红包
      if (this.whichAward.includes("PACKET")) {
        if (!this.formData.awardList) {
          this.formData.awardList = [];
        }
        this.setPACKET = true;
        this.$store.commit("set_asideState", { data: false });
        if (this.PACKET_table.data.list.length == 0) {
          this.PACKET_Search({
            pageSize: this.PACKET_table.pageSize,
            pageNum: this.PACKET_table.pageNum
          });
        }
      } else {
        this.setPACKET = false;
        this.jiangliHongBao.forEach(item => this.deleteJiangli(item));
        this.jiangliHongBao = []; // 保存已经添加的红包奖励
      }
      if (this.whichAward.length === 0) {
        this.$store.commit("set_asideState", { data: true });
      }
    },
    // 重置
    reset() {
      this.$refs.formData.resetFields();
      this.jiangliKaQuan = []; // 保存已经添加的卡券奖励
      this.jiangliHongBao = []; // 保存已经添加的红包奖励
      this.COUPON_table = {
        // 卡券
        // 传给table子组件的数据
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      };
      this.PACKET_table = {
        // 红包
        // 传给table子组件的数据
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {}, // 记录表格内需要额外添加的点击事件
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      };
      this.COUPON_tableSearch = {
        name: "",
        couponExplain: "",
        time: []
      };
      // 红包列表的搜索
      this.PACKET_tableSearch = {
        name: "",
        couponExplain: ""
      };
      this.whichAward = []; // 活动奖励类型
      this.formData = {
        activityName: "", // 活动名称
        time: "",
        awardList: [], // 活动奖励
        description: "", // 活动规则说明
        link: "" // 活动链接
      };
    },
    // 下一步
    step() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (
            (this.whichAward.includes("COUPON") ||
              this.whichAward.includes("PACKET")) &&
            this.formData.awardList.length == 0
          ) {
            // 如果活动奖励下拉框选择了红包、卡券却没有添加
            this.$message.error(
              "请选择使用的卡券或红包，否则取消使用活动奖励！"
            );
            return;
          }
          sessionStorage.setItem("step1Data", JSON.stringify(this.formData));
          sessionStorage.setItem("whichAward", JSON.stringify(this.whichAward));
          sessionStorage.setItem(
            "jiangliKaQuan",
            JSON.stringify(this.jiangliKaQuan)
          );
          sessionStorage.setItem(
            "jiangliHongBao",
            JSON.stringify(this.jiangliHongBao)
          );
          this.$router.push({ name: `activity_create_step2` });
        } else {
          this.$message.error("请输入完整数据！");
        }
      });
    }
  }
};
</script>

<style scoped='true' lang="scss">
.pageWaper {
  min-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.formWaper {
  display: flex;
  justify-content: center;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding-left: 60px;
  width: 30%;
}
.forms {
  max-width: 500px;
  min-width: 400px;
}
.tables {
  width: 100%;
  min-width: 520px;
  margin-left: 30px;
}
.hasSelectJiangLi {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-collapse: collapse;
  font-size: 14px;
  margin-bottom: 5px;
}
.hasSelectJiangLi p {
  border: 1px solid rgb(235, 233, 233);
  padding: 2px 5px;
  margin: 0 2px 2px 0;
  cursor: pointer;
}
.hasSelectJiangLi p:hover {
  background: rgb(209, 208, 208);
}
</style>
