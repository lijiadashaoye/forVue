<template>
  <div class="componentWaper">
    <div class="headerName">
      <h3>{{pageName}}</h3>
      <el-button size="mini" type="warning" @click="back">返回</el-button>
    </div>
    <div>
      <el-button size="mini" type="primary" @click="addGroup">新建组</el-button>
    </div>
    <div class="groupWap">
      <div class="group" v-for="(team,index) in group" :key="index">
        <h4>{{team.groupName}}</h4>
        <div>
          <el-button size="mini" type="warning" @click="addCoupon(team)">添加券</el-button>
          <!-- <el-button size="mini" type="primary" @click="seeGroup(team.groupId)">查看组详情</el-button> -->
          <forms
            v-if="team[team['type']]"
            @tableAct="tableAct"
            style="with:100%;"
            :pageData="team"
          />
        </div>
      </div>
    </div>
    <!--新建组、添加卡券弹出框 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="add_Newgroup.title"
      :visible.sync="add_Newgroup.show"
      width="500px"
      :before-close="dialogClose"
    >
      <el-form size="small" :model="add_Newgroup.data" label-width="115px">
        <el-form-item label="组名">
          <el-input
            :readonly="add_Newgroup.notUse"
            v-model="add_Newgroup.data.groupName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="准备添加的卡券" v-if="!add_Newgroup.notUse">
          <table class="hasAdd">
            <tr>
              <th>卡券ID</th>
              <th>卡券名称</th>
              <th>操作</th>
            </tr>
            <tr v-for="kk in add_Newgroup.data.couponIds" :key="kk.couponId">
              <td>{{kk.couponId}}</td>
              <td>{{kk.couponName}}</td>
              <td title="点击删除" @click="removeKaQuan(kk)">删除</td>
            </tr>
          </table>
        </el-form-item>
      </el-form>
      <forms @tableAct="tableAct" style="with:100%;" :pageData="add_Newgroup.kaquanList" />

      <span slot="footer" class="dialog-footer" v-if="!add_Newgroup.notUse">
        <el-button size="mini" @click="addNewgroup(false)">取 消</el-button>
        <el-button size="mini" type="primary" @click="addNewgroup(true)">确 定</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-if="add_Newgroup.notUse">
        <el-button size="mini" @click="addNewgroup(false)">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import forms from "../../../components/forms.vue";

export default {
  components: {
    forms
  },
  data() {
    return {
      pageName: "",
      group: [],
      kaquanTable: {}, // 保存卡券列表
      add_Newgroup: {
        show: false,
        notUse: false, // 组名不可编辑
        title: "",
        forForms: {}, // 待选表格数据
        data: {
          groupName: "",
          couponIds: []
        }
      }
    };
  },

  created() {
    this.pageName = sessionStorage.getItem("page");
    this.getGroup();
  },
  methods: {
    // 关闭弹框
    dialogClose() {
      this.add_Newgroup = {
        show: false,
        notUse: false, // 组名不可编辑
        title: "",
        forForms: {}, // 待选表格数据
        data: {
          groupName: "",
          couponIds: []
        }
      };
    },
    /************************************************** */
    // 获取可选用的卡券列表
    getList() {
      return this.$api
        .get_group_use_list({
          vm: this,
          data: {
            withOutGroup: true,
            pageSize: 100,
            pageNum: 1
          }
        })
        .then(res => {
          let kk = res.data.list;
          this.$set(this.kaquanTable, "kaquanList", null);
          this.$nextTick(() => {
            this.kaquanTable.type = "kaquanList";
            this.kaquanTable.kaquanList = {
              fenye: true, // 是否需要分页
              pageNum: 0, // 当前页码
              titleUp: {
                pointName: "可选用的卡券"
              },
              // 表格头部
              title: [
                {
                  prop: "couponId", // 要显示的属性
                  label: "ID", // 要显示的文字
                  width: "50" // 当前项的宽度
                },
                {
                  prop: "couponName", // 要显示的属性
                  label: "卡券名称", // 要显示的文字
                  width: "140" // 当前项的宽度
                }
              ],
              handle: [
                {
                  click: "use", // 表格操作栏的点击事件
                  text: "添加" // 表格操作栏的点击事件
                }
              ],
              // 表格数据
              dataTotal: kk.map(item => {
                return {
                  couponId: item.id,
                  couponName: item.name
                };
              })
            }; // 待选表格数据
          });
        });
    },
    // 卡券弹框中删除已家的卡券
    removeKaQuan(data) {
      this.add_Newgroup.data.couponIds = this.add_Newgroup.data.couponIds.filter(
        tar => tar.couponId != data.couponId
      );
    },
    // 新建组、添加卡券的确认框
    addNewgroup(type) {
      if (type) {
        // 添加分组
        if (
          this.add_Newgroup.data.couponIds.length &&
          this.add_Newgroup.data.groupName
        ) {
          let obj = {
            groupName: this.add_Newgroup.data.groupName,
            couponIds: this.add_Newgroup.data.couponIds.map(tar => tar.couponId)
          };
          this.$api
            .add_group({
              vm: this,
              data: obj
            })
            .then(res => {
              if (res) {
                this.dialogClose();
                this.getGroup();
              }
            });
        } else {
          this.$message.error("请正确输入信息(组名及当前组包含的卡券)！");
        }
      } else {
        this.dialogClose();
      }
    },
    // 新建组
    addGroup() {
      this.getList().then(res => {
        this.kaquanTable.pageNum = 0;
        this.add_Newgroup = {
          show: true,
          notUse: false, // 组名不可编辑
          title: "添加分组",
          kaquanList: this.kaquanTable,
          data: {
            groupName: "",
            couponIds: []
          }
        };
      });
    },
    // 添加券
    addCoupon(item) {
      this.getList().then(res => {
        this.kaquanTable.pageNum = 0;
        this.add_Newgroup = {
          show: true,
          notUse: true, // 组名不可编辑
          title: "添加卡券",
          kaquanList: this.kaquanTable,
          data: {
            groupId: item.groupId,
            groupName: item.groupName,
            couponIds: []
          }
        };
      });
    },
    // 查看组详情
    // seeGroup(id) {
    //   this.$api
    //     .see_group({
    //       vm: this,
    //       data: id
    //     })
    //     .then(res => {
    //       if (res) {
    //         console.log(res);
    //       }
    //     });
    // },
    // 往已存在的组内添加卡券
    addToHasBuild(id) {
      this.$api
        .add_group({
          vm: this,
          data: {
            groupId: this.add_Newgroup.data.groupId,
            groupName: this.add_Newgroup.data.groupName,
            couponIds: [id]
          }
        })
        .then(res => {
          if (res) {
            this.getGroup();
            this.$message.success("添加成功！");
          } else {
            this.$message.error("添加失败！");
          }
        });
    },
    // 监听表格操作
    tableAct(data) {
      let item = data.data;
      switch (data.type) {
        case "use":
          if (this.add_Newgroup.notUse) {
            this.addToHasBuild(item.couponId); // 添加卡券
          } else {
            // 新建组中的添加卡券
            let kk = this.add_Newgroup.data.couponIds.some(
              tar => tar.couponId == data.data.couponId
            );
            if (!kk) {
              this.add_Newgroup.data.couponIds.push(data.data);
            } else {
              this.$message.error("当前分组中已经添加此卡券！");
            }
          }

          break;
        case "delete":
          let isGet = false;
          this.$api
            .remove_coupon({
              vm: this,
              data: item.couponId
            })
            .then(res => {
              if (res) {
                this.getGroup();
              }
            });

          break;
      }
    },
    // 获取组数据
    getGroup() {
      // 获取分组数据
      this.$api
        .get_group({
          vm: this
        })
        .then(res => {
          if (res) {
            this.$set(this, "group", []);
            this.$nextTick(() => {
              this.group = res.data.map(item => {
                return {
                  groupId: item.groupId,
                  groupName: item.groupName,
                  type: "group",
                  group: {
                    fenye: true, // 是否需要分页
                    pageNum: 0, // 当前页码
                    titleUp: {
                      pointName: "当前分组包含的卡券"
                    },
                    // 表格头部
                    title: [
                      {
                        prop: "couponId", // 要显示的属性
                        label: "ID", // 要显示的文字
                        width: "50" // 当前项的宽度
                      },
                      {
                        prop: "couponName", // 要显示的属性
                        label: "卡券名称", // 要显示的文字
                        width: "140" // 当前项的宽度
                      }
                    ],
                    handle: [
                      {
                        click: "delete", // 表格操作栏的点击事件
                        text: "删除" // 表格操作栏的点击事件
                      }
                    ],
                    // 表格数据
                    dataTotal: [...item.couponList]
                  }
                };
              });
            });
          }
        });
    },
    // 返回按钮
    back() {
      sessionStorage.setItem("page", "卡券列表");
      window.history.back();
    }
  }
};
</script>

<style scoped='true' lang="scss">
.headerName {
  display: flex;
  justify-content: space-between;
}
.groupWap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.group {
  background: #ffffff;
  padding: 5px;
  margin: 5px;
  border-radius: 6px;
}
.hasAdd {
  width: 100%;
  font-size: 12px;
  line-height: 18px;
  border: 1px solid rgb(236, 236, 236);
  border-collapse: collapse;
}
.hasAdd td {
  text-align: center;
}
.hasAdd > tr:not(:nth-of-type(1)):hover {
  background: #e9f6fc;
}
.hasAdd > tr > td:nth-child(3):hover {
  cursor: pointer;
  background: rgb(224, 222, 222);
}
</style>
