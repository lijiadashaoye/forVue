<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <el-button size="mini" type="primary" style="margin-left:20px" @click="seachClick(true)">搜索</el-button>
      <el-button size="mini" type="info" @click="seachClick(false)">重置</el-button>
      <el-button size="mini" :disabled="true" type="warning" @click="moreDengJi()">批量修改等级</el-button>
      <el-button size="mini" type="info" @click="moreStatue()">批量修改状态</el-button>
      <el-button size="mini" :disabled="true" type="danger" @click="moreJiFen()">批量调整积分</el-button>
      <el-button size="mini" type="primary" @click="moreMark()">批量打标签</el-button>
      <!-- <div class="forTableTitle">
        <span>配置表头</span>
        <el-select filterable v-model="tableTitle" placeholder="请选择" size="small" @change="setTableTitle">
          <el-option
            v-for="item in options"
            :key="item.type"
            :label="item.title"
            :value="item.type"
          ></el-option>
        </el-select>
      </div>-->

      <el-form
        :inline="true"
        :model="searchForm"
        label-width="105px"
        label-suffix=":"
        label-position="right"
        size="mini"
        ref="searchForm"
        :rules="rules"
        style="margin-top:5px;"
      >
        <el-form-item label="会员等级" style="margin-bottom:5px;">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="searchForm.levelId"
          >
            <el-option
              size="mini"
              v-for="item in dengjiList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="会员名称">
          <el-input v-model="searchForm.memberName" placeholder="会员名称"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select filterable v-model="searchForm.sex" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in sexList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机" prop="memberPhone">
          <el-input v-model="searchForm.memberPhone"></el-input>
        </el-form-item>

        <el-form-item label="会员标签">
          <el-select filterable v-model="searchForm.labelIds" multiple placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in markList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="剩余开始积分">
          <el-input v-model="searchForm.surplusStartIntegral" type="number"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="剩余结束积分">
          <el-input v-model="searchForm.surplusEndIntegral" type="number"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="获取开始积分">
          <el-input v-model="searchForm.gainStartIntegral" type="number"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="获取结束积分">
          <el-input v-model="searchForm.gainEndIntegral" type="number"></el-input>
        </el-form-item>

        <el-form-item label="年龄范围">
          <div class="forAge">
            <el-input v-model="searchForm.startAge" min="0" type="number"></el-input>
            <span>&nbsp;~&nbsp;</span>
            <el-input v-model="searchForm.endAge" min="0" type="number"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="加入时间范围">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="searchForm.joinTime"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="生日范围">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="searchForm.birthday"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
      <!-- 标签弹出框 -->
      <el-dialog
        :close-on-click-modal="false"
        :title="dialogMark.title"
        :visible.sync="dialogMark.show"
        width="500px"
        :before-close="markDialogClose"
        style="padding:0;"
      >
        <makeTag :inputData="forMark" @toSearch="getMarkList" />

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="markDialogAction(false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="markDialogAction(true)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 批量修改等级按钮点击弹框 -->
      <el-dialog
        :close-on-click-modal="false"
        :title="dengjiDialog.title"
        :visible.sync="dengjiDialog.show"
        width="400px"
        :before-close="dengjiDialogClose"
        style="padding:0;"
      >
        <el-select filterable style="width:100%;" v-model="dengjiDialog.ids" placeholder="请选择">
          <el-option
            v-for="item in dengjiDialog.levelList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="levelDialogAction(false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="levelDialogAction(true)">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 批量修改状态按钮点击弹框 -->
      <el-dialog
        :close-on-click-modal="false"
        :title="statueDialog.title"
        :visible.sync="statueDialog.show"
        width="400px"
        :before-close="dengjiDialogClose"
        style="padding:0;"
      >
        <el-select filterable style="width:100%;" v-model="statueDialog.ids" placeholder="请选择">
          <el-option
            v-for="item in statueDialog.levelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="statueDialogAction(false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="statueDialogAction(true)">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 批量打标签按钮点击弹框 -->
      <el-dialog
        :close-on-click-modal="false"
        :title="marksDialog.title"
        :visible.sync="marksDialog.show"
        width="400px"
        :before-close="dengjiDialogClose"
        style="padding:0;"
      >
        <el-select
          filterable
          style="width:100%;"
          v-model="marksDialog.ids"
          placeholder="请选择"
          multiple
        >
          <el-option
            v-for="item in marksDialog.levelList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="marksDialogAction(false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="marksDialogAction(true)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import isTable from "../../../components/isTable/isTable.vue";
import makeTag from "../../../components/makeTag.vue";

export default {
  props: {},
  data() {
    // 验证手机号
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
      }
    };
    return {
      // options: [
      //   // 配置表头下拉
      //   {
      //     type: "jifen",
      //     title: "累计积分"
      //   },
      //   {
      //     type: "grow",
      //     title: "累计成长值"
      //   },
      //   {
      //     type: "time",
      //     title: "最近登录时间"
      //   }
      // ],
      // tableTitle: "", // 表格表头配置类型
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      sexList: [
        {
          label: "男",
          value: "MAN"
        },
        {
          label: "女",
          value: "WOMAN"
        },
        {
          label: "未知",
          value: "UNKNOW"
        }
      ],
      dengjiList: [
        // 会员等级下拉
      ],
      markList: [
        // 会员标签使用
      ],
      searchForm: {
        levelId: "", // 等级id
        memberName: "", // 会员名称
        memberPhone: "", // 会员手机
        labelIds: [], // 标签id列表
        joinTime: [], // 加入时间
        sex: "", // 性别
        startAge: "", // 开始年龄
        endAge: "", // 结束年龄
        birthday: [], //生日
        surplusStartIntegral: "", // 剩余开始积分
        surplusEndIntegral: "", // 剩余结束积分
        gainStartIntegral: "", // 获取开始积分
        gainEndIntegral: "" // 获取结束积分
      }, // 搜索表单

      moreAction: [],
      tableInputData: {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      // 标签组件使用的数据结构
      forMark: {
        list: [], // 备选数据
        hasSelect: [], // 添加的标签
        willAdd: [], // 从已有的中准备删除的
        toDelete: [], // 彻底删除的
        name: "" // 搜索的内容
      },
      // 控制本页面标签弹框
      dialogMark: {
        show: false,
        title: ""
      },

      // 控制本页面等级弹框
      dengjiDialog: {
        levelList: [], // 存储从服务器获取的等级列表数据
        show: false,
        title: "批量修改等级",
        pageSize: 100, // 分页相关
        pageNum: 1,
        ids: "" // 存储要进行变更的id
      },
      // 批量标签弹框
      marksDialog: {
        levelList: [], // 存储从服务器获取的等级列表数据
        show: false,
        title: "批量添加标签",
        pageSize: 100, // 分页相关
        pageNum: 1,
        ids: [] // 存储要进行变更的id
      },
      // 控制本页面状态弹框
      statueDialog: {
        levelList: [
          {
            // 下拉列表备选数据
            label: "启用",
            value: "ENABLE"
          },
          {
            label: "冻结",
            value: "DISABLE"
          }
        ],
        show: false,
        title: "批量修改状态",
        ids: [] // 存储要进行变更的id
      },
      rules: {
        memberPhone: [{ validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  components: {
    isTable,
    makeTag
  },
  mounted() {
    this.loadEnd = false;
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.canDoWhat();
    this.seachClick(false);

    let aa = sessionStorage.getItem("huiyuan_mark"),
      bb = sessionStorage.getItem("huiyuan_dengji");
    if (!(aa && bb)) {
      this.getSearchData();
    } else {
      this.markList = JSON.parse(aa);
      this.dengjiList = JSON.parse(bb);
    }
  },
  methods: {
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.seachClick(true);
          break;
        case "switch": // switch 变换
          this.switchAction(data.data);
          break;
        case "xiangqing": // 详情按钮点击
          this.xiangqing(data.data);
          break;
        case "mark": // 标签按钮点击
          this.mark(data.data);
          break;
        case "dengji": // 等级按钮点击
          this.dengji(data.data);
          break;
        case "jifen": // 积分按钮点击
          this.jifen(data.data);
          break;
        case "moreDelete": // 批量修改、打标签、调整积分时选中的列表项
          this.moreAction = data.data;
          break;
      }
    },
    // 表格里的switch事件,启用、停用
    switchAction(data) {
      this.$api
        .manager_list_UpDown({
          vm: this,
          data: {
            id: data.id,
            status: data.switch ? "ENABLE" : "DISABLE"
          }
        })
        .then(res => {
          if (res) {
            this.seachClick(true);
          }
        });
    },
    // 查看会员详情
    xiangqing(data) {
      sessionStorage.setItem("page", "会员详情");
      this.$router.push({
        name: "manager_info",
        query: { id: data.id }
      });
    },
    ////////////////////////////////////////////
    // 标签按钮点击
    mark(data) {
      this.forMark.memberId = data.id;
      // 获取用户详情数据
      let getUserMark = this.$api
        .member_manager_getInfo({
          vm: this,
          data: data.id
        })
        .then(res => {
          if (res) {
            return res.data.memberLabelList;
          }
        });
      Promise.all([getUserMark, this.getMarkList()]).then(res => {
        // 查询用户已经有哪些标签，并显示出来
        if (res[0].length > 0) {
          this.forMark.hasSelect = res[0].map(item => {
            return {
              id: item.id,
              labelId: item.labelId,
              name: item.labelName,
              bkColor: this.makeStyle()
            };
          });
        }
        this.dialogMark.title = "标签";
        this.dialogMark.show = true;
      });
    },
    // 查询标签，组件里也有实时搜索
    getMarkList() {
      return this.$api
        .member_manager_getMarkLise({
          vm: this,
          data: {
            name: this.forMark.name
          }
        })
        .then(res => {
          if (res) {
            this.forMark.list = res.data.list.map(item => {
              return {
                labelId: item.id,
                name: item.name,
                bkColor: this.makeStyle()
              };
            });
          }
        });
    },
    // 随机设置背景色
    makeStyle() {
      let num1 = Math.random() * 255;
      let num2 = Math.random() * 255;
      let num3 = Math.random() * 255;
      let str = `rgba(${num1},${num2},${num3},.3)`;
      return str;
    },
    // 标签弹出框的取消、确定按钮
    markDialogAction(type) {
      if (type) {
        let promiseArr = [];
        // 删除标签
        if (this.forMark.toDelete.length > 0) {
          let arr = this.forMark.toDelete.map(item => item.id);
          arr.forEach(id => {
            promiseArr.push(
              this.$api.member_user_deleteMark({
                vm: this,
                data: id
              })
            );
          });
        }
        // 添加标签
        if (this.forMark.willAdd.length > 0) {
          let obj = {
            memberId: this.forMark.memberId,
            labelIds: this.forMark.willAdd.map(item => item.labelId)
          };
          promiseArr.push(
            this.$api.member_user_singleMark({
              // 打标签
              vm: this,
              data: obj
            })
          );
        }
        if (promiseArr.length === 0) {
          this.$message.error("请选择标签！");
        } else {
          Promise.all(promiseArr).then(res => {
            this.$message.success("操作成功！");
            this.markDialogClose();
          });
        }
      } else {
        // 修改
        this.markDialogClose();
      }
    },
    // 标签弹框的关闭
    markDialogClose() {
      this.forMark = {
        list: [], // 备选数据
        hasSelect: [], // 添加的标签
        willAdd: [], // 从已有的中准备删除的
        toDelete: [], // 彻底删除的
        name: "" // 搜索的内容
      };
      this.dialogMark = {
        show: false,
        title: ""
      };
    },
    ////////////////////////////////////////////
    // 等级按钮点击
    dengji(data) {},
    // 批量修改等级
    moreDengJi() {
      // if (this.moreAction.length != 0) {
      //   if (this.dengjiDialog.levelList.length == 0) {
      //     this.$api
      //       .member_level_getList({
      //         vm: this,
      //         data: {
      //           pageSize: this.dengjiDialog.pageSize,
      //           pageNum: this.dengjiDialog.pageNum
      //         }
      //       })
      //       .then(res => {
      //         if (res) {
      //           this.dengjiDialog.levelList = res.data.list;
      //           this.dengjiDialog.show = true;
      //         }
      //       });
      //   } else {
      //     this.dengjiDialog.show = true;
      //   }
      // } else {
      //   this.$message.error("请选择要操作的列表项！");
      // }
    },
    // 关闭等级框、状态框、积分框
    dengjiDialogClose() {
      this.dengjiDialog.show = false;
      this.dengjiDialog.ids = "";

      this.statueDialog.show = false;
      this.statueDialog.ids = "";

      this.marksDialog.show = false;
      this.marksDialog.ids = [];
    },
    // 等级框的取消、确定
    levelDialogAction(type) {
      if (type) {
        if (this.dengjiDialog.ids) {
          this.$api
            .member_level_moreAction({
              vm: this,
              data: {
                type: "LEVEL",
                ids: this.moreAction.map(tar => tar.id),
                levelId: this.dengjiDialog.ids
              }
            })
            .then(res => {
              if (res) {
                this.$message.success("操作成功！");
                this.seachClick(true);
                this.dengjiDialogClose();
              }
            });
        } else {
          this.$message.error("请选择数据！");
        }
      } else {
        this.dengjiDialogClose();
      }
    },
    //////////////////////////////////////////////////////////////////////////
    // 批量修改状态
    moreStatue() {
      if (this.moreAction.length != 0) {
        this.statueDialog.show = true;
      } else {
        this.$message.error("请选择要操作的列表项！");
      }
    },
    // 状态弹框的取消、确定
    statueDialogAction(type) {
      if (type) {
        if (this.statueDialog.ids) {
          this.$api
            .member_level_moreAction({
              vm: this,
              data: {
                type: "STATUS",
                ids: this.moreAction.map(tar => tar.id),
                status: this.statueDialog.ids
              }
            })
            .then(res => {
              if (res) {
                this.$message.success("操作成功！");
                this.seachClick(true);
                this.dengjiDialogClose();
              }
            });
        } else {
          this.$message.error("请选择状态！");
        }
      } else {
        this.dengjiDialogClose();
      }
    },
    //////////////////////////////////////////////////////////////////////////
    // 批量积分
    moreJiFen() {
      if (this.moreAction.length != 0) {
      } else {
        this.$message.error("请选择要操作的列表项！");
      }
    },
    //////////////////////////////////////////////////////////////////////////
    // 批量标签
    moreMark() {
      if (this.moreAction.length != 0) {
        // 获取标签列表
        this.$api
          .member_manager_getMarkLise({
            vm: this,
            data: {
              name: this.forMark.name
            }
          })
          .then(res => {
            if (res) {
              this.marksDialog.levelList = res.data.list;
              this.marksDialog.show = true;
            }
          });
      } else {
        this.$message.error("请选择要操作的列表项！");
      }
    },

    marksDialogAction(type) {
      if (type) {
        if (this.marksDialog.ids.length > 0) {
          this.$api
            .member_user_moreMark({
              vm: this,
              data: {
                labelIds: this.marksDialog.ids,
                memberIds: this.moreAction.map(tar => tar.id)
              }
            })
            .then(res => {
              if (res) {
                this.$message.success("添加成功！");
                this.dengjiDialogClose();
              }
            });
        } else {
          this.$message.error("请选择要添加的标签！");
        }
      } else {
        this.dengjiDialogClose();
      }
    },
    /////////////////////////////////////////////////
    // 积分按钮点击
    jifen(data) {
      console.log(data);
    },
    // 搜索框、重置
    seachClick(type) {
      let obj = {};
      if (type) {
        // 规范查询数据格式
        Object.keys(this.searchForm).forEach(str => {
          if (this.searchForm[str]) {
            if (str == "joinTime" && this.searchForm[str].length) {
              obj["joinStartTime"] = this.searchForm[str][0];
              obj["joinEndTime"] = this.searchForm[str][1];
            } else if (str == "birthday" && this.searchForm[str].length) {
              obj["startBirthday"] = this.searchForm[str][0] + " 00:00:00";
              obj["endBirthday"] = this.searchForm[str][1] + " 23:59:59";
            } else if (str == "labelIds" && this.searchForm[str].length) {
              obj[str] = this.searchForm[str];
            } else {
              if (str != "joinTime" && str != "birthday" && str != "labelIds") {
                obj[str] = isNaN(+this.searchForm[str])
                  ? this.searchForm[str]
                  : +this.searchForm[str];
              }
              if (str == "memberPhone" || str == "memberName") {
                obj[str] = this.searchForm[str];
              }
            }
          }
        });
      } else {
        this.searchForm = {
          levelId: "", // 等级id
          memberName: "", // 会员名称
          memberPhone: "", // 会员手机
          labelIds: [], // 标签id列表
          joinTime: [], // 加入时间
          sex: "", // 性别
          startAge: "", // 开始年龄
          endAge: "", // 结束年龄
          birthday: [], //生日
          surplusStartIntegral: "", // 剩余开始积分
          surplusEndIntegral: "", // 剩余结束积分
          gainStartIntegral: "", // 获取开始积分
          gainEndIntegral: "" // 获取结束积分
        };
        this.$refs.searchForm.resetFields();
        this.tableInputData.pageSize = 10;
        this.tableInputData.pageNum = 1;
      }

      obj.pageSize = this.tableInputData.pageSize;
      obj.pageNum = this.tableInputData.pageNum;
      this.getUserData(obj);
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      let quanxian = JSON.parse(localStorage.getItem("buttenpremissions"));

      let member_manager_detail = quanxian.includes("member_manager_detail");
      let member_manager_add_label = quanxian.includes(
        "member_manager_add_label"
      );

      let member_manager_upd_status = quanxian.includes(
        "member_manager_upd_status"
      );
      let batch_upd_level_status = quanxian.includes("batch_upd_level_status");
      let batch_add_label = quanxian.includes("batch_add_label");

      if (member_manager_detail) {
        this.tableInputData.data.quanxian.push("member_manager_detail");
        this.tableInputData.data.custom.push({
          text: "详情",
          type: "warning",
          size: "small",
          emit: "xiangqing"
        });
      }
      if (member_manager_add_label) {
        this.tableInputData.data.quanxian.push("member_manager_add_label");
        this.tableInputData.data.custom.push({
          text: "标签",
          type: "primary",
          size: "small",
          emit: "mark"
        });
      }
      // this.tableInputData.data.custom.push({
      //   text: "等级",
      //   type: "info",
      //   size: "small",
      //   emit: "dengji",
      // });
      // this.tableInputData.data.custom.push({
      //   text: "积分",
      //   type: "danger",
      //   size: "small",
      //   emit: "jifen"
      // });

      if (member_manager_upd_status) {
        this.tableInputData.data.quanxian.push("member_manager_upd_status");
      }
      if (batch_upd_level_status) {
        this.tableInputData.data.quanxian.push("batch_upd_level_status");
      }
      if (batch_add_label) {
        this.tableInputData.data.quanxian.push("batch_add_label");
      }
    },
    // 获取数据后的处理
    afterGetData(data) {
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
            if (str === "status") {
              delete obj[str];
              // 会员状态(ENABLE:启用 DISABLE:冻结)
              switch (item[str]) {
                case "ENABLE":
                  obj["switch"] = true;
                  obj["action"] = "启用";
                  break;
                case "DISABLE":
                  obj["switch"] = false;
                  obj["action"] = "冻结";
                  break;
              }
            }
          });
          return obj;
        });

        this.tableInputData.data.title = [
          {
            title: "会员编号",
            key: "no",
            minWidth: "80"
          },
          {
            title: "会员姓名",
            key: "name",
            minWidth: "90"
          },
          {
            title: "会员昵称",
            key: "nickname",
            minWidth: "90"
          },
          // {
          //   title: "会员等级",
          //   key: "levelName",
          //   minWidth: "90"
          // },
          {
            title: "会员手机号",
            key: "phone",
            minWidth: "110"
          },
          {
            title: "来源",
            key: "appChannelCode",
            minWidth: "90"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "140"
          }
        ];
        this.tableInputData.actions.setColor = {
          label: "状态",
          minWidth: 70,
          from: "action",
          with: "switch"
        };
        // 设置需要的额外switch事件
        this.tableInputData.actions.switch = {
          label: "启用/冻结",
          minWidth: 80,
          from: "status" // 记录这个交互操作的原数据属性
        };
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取用户表格数据
    getUserData(data) {
      // 获取列表数据
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          if (data.startAge || data.endAge) {
            if (
              !(data.startAge && data.endAge) ||
              +data.startAge > +data.endAge
            ) {
              this.$message.error("年龄范围输入错误");
              return;
            }
          }
          this.$api
            .member_manager_getListData({
              vm: this,
              data: data
            })
            .then(res => {
              if (res) {
                this.afterGetData(res.data);
              }
            });
        }
      });
    },
    // 获取搜索下拉的数据
    getSearchData() {
      // 获取标签数据 0 获取等级数据 1
      Promise.all([
        this.$api.member_manager_getMarkLise({
          vm: this,
          data: {}
        }),
        this.$api.member_level_getList({
          vm: this,
          data: {}
        })
      ]).then(datas => {
        if (datas[0]) {
          datas[0].data.list.forEach(item => {
            if (item.status == "ENABLE") {
              this.markList.push({ label: item.name, value: item.id });
            }
          });
          sessionStorage.setItem("huiyuan_mark", JSON.stringify(this.markList));
        }
        if (datas[1]) {
          this.dengjiList = datas[1].data.list.map(item => ({
            label: item.name,
            value: item.id
          }));
          sessionStorage.setItem(
            "huiyuan_dengji",
            JSON.stringify(this.dengjiList)
          );
        }
      });
    }
  }
};
</script>
<style >
.forAge {
  width: 200px;
  display: flex !important;
  justify-content: space-between !important;
}
</style>
