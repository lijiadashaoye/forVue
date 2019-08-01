<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
      <el-button
        size="mini"
        type="primary"
        @click="buttonRowUpdata('add')"
        v-if="tableInputData.data.quanxian.includes('sys_role_add')"
      >添加</el-button>
      <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
      <!-- 编辑、添加 -->
      <el-dialog
        :close-on-click-modal="false"
        :title="dialog.title"
        :visible.sync="dialog.show"
        width="500px"
        :before-close="dialogClose"
      >
        <el-form
          size="small"
          ref="updataUser"
          :model="updataUser"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="updataUser.roleName"></el-input>
          </el-form-item>

          <el-form-item label="角色标识" prop="roleCode">
            <el-input v-model="updataUser.roleCode"></el-input>
          </el-form-item>

          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="updataUser.roleDesc"></el-input>
          </el-form-item>

          <el-form-item prop="roleDeptId" label="所属部门">
            <el-cascader
              style="width:100%;"
              v-model="updataUser.roleDeptId"
              :options="deptdata"
              change-on-select
            ></el-cascader>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogAction(false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="dialogAction(true)">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 权限 -->
      <el-dialog
        :close-on-click-modal="false"
        :title="dialog.title"
        :visible.sync="dialog.show1"
        width="750px"
        :before-close="roleclear"
        show-checkbox
        ref="tree1"
      >
        <div style="display:flex;justify-content:space-between;" v-show="dialog.show1">
          <div v-for="(item,index) in getMenuAllTree" :key="index">
            <el-tree
              :data="item"
              show-checkbox
              default-expand-all
              :default-checked-keys="checkedArr"
              node-key="id"
              :ref="`tree${index+1}`"
              highlight-current
              :props="defaultProps"
              :check-strictly="false"
              check-on-click-node
            ></el-tree>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="roleclear">取 消</el-button>
          <el-button type="primary" @click="updateRoleFN">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import isTable from "../../../components/isTable/isTable.vue";

export default {
  props: {},
  data() {
    return {
      // 权限tree数据
      getMenuAllTree: [],
      checkedArr: [], // 已选的tree项

      defaultProps: {
        children: "children",
        label: "label"
      },
      updata: {}, // 权限弹出框保存的数据
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      tableInputData: {
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [],
          quanxian: [],
          title: [],
          custom: []
        }
      },
      dialog: {
        // 弹出框的控制
        show: false, // 编辑、添加
        show1: false, // 权限
        title: ""
      },
      deptdata: [], // 所属部门级联数据
      ruleList: [], // 角色列表
      //修改、添加用户
      updataUser: {
        roleName: "", // 角色名称
        roleCode: "", // 角色标识
        roleDesc: "", // 角色描述
        roleDeptId: [] // 所属部门
      },
      //表单验证
      rules: {
        roleName: [
          { required: true, message: "角色名称必须填写", trigger: "blur" },
          { min: 1, max: 64, message: "请输入1-64个字符", trigger: "blur" }
        ],
        roleCode: [
          { required: true, message: "角色标识必须填写", trigger: "blur" },
          { min: 1, max: 64, message: "请输入1-64个字符", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "角色描述必须填写", trigger: "blur" },
          { min: 1, max: 255, message: "请输入1-255个字符", trigger: "blur" }
        ],
        roleDeptId: [
          { required: true, message: "所属部门必须选择", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    isTable
  },
  created() {
    this.loadEnd = false;
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.canDoWhat();
    this.getUserData();
  },
  methods: {
    // 关闭弹框
    dialogClose() {
      this.$refs.updataUser.resetFields();
      this.dialog.show = false;
      this.updataUser = {
        roleName: "", // 角色名称
        roleCode: "", // 角色标识
        roleDesc: "", // 角色描述
        roleDeptId: [] // 所属部门
      };
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .admin_role_deleteRole({
                vm: this,
                data: this.aloneDeleteData[0]
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.getUserData();
                }
              });
          })
          .catch(() => {});
      }
      if (type === "more") {
        if (this.deleteData.length == 0) {
          this.$message.warning("请选择要删除的！");
        } else {
          this.$confirm("确认删除吗？")
            .then(() => {
              let promiseArr = [];
              let tableData = this.tableInputData.data.list; // 获取表格的数据
              this.deleteData.forEach(item => {
                let del = this.$api
                  .admin_role_deleteRole({
                    vm: this,
                    data: item
                  })
                  .then(res => {
                    let obj;
                    if (res) {
                      obj = {
                        ok: true,
                        data: item
                      };
                    } else {
                      obj = {
                        ok: false,
                        data: tableData.filter(tar => tar.roleId == item)
                      };
                    }
                    return obj;
                  });
                promiseArr.push(del);
              });
              Promise.all(promiseArr).then(arr => {
                // 拼接删除结果
                let numSucces = 0;
                let numFail = 0;
                let failName = "";
                let titleText = `失败的数据为：\n `;
                arr.forEach(item => {
                  if (item.ok) {
                    numSucces++;
                  } else {
                    numFail++;
                    failName += `角色名称：${item.data[0].roleName} \n`;
                  }
                });
                let str = `共操作${arr.length}条数据，成功${numSucces}个，失败${numFail}个 \n`;

                if (numFail > 0) {
                  str += titleText + failName;
                }
                this.$alert(str, "操作结果提示", {
                  confirmButtonText: "确定",
                  callback: this.getUserData
                });
              });
            })
            .catch(() => {});
        }
      }
    },
    // 添加按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      // 获取级联选择的数据
      let getTreeDatas = this.$api
        .admin_role_getTree({ vm: this })
        .then(res => {
          // 重构数据，以试用联动表单
          if (res) {
            let setStyle = da => {
              let obj = {
                value: "" + da.id,
                label: da.name,
                parentId: da.parentId
              };
              return obj;
            };
            let arrs = [];
            let digui = (datas, arr) => {
              datas.forEach((item, index) => {
                let obj = setStyle(item);
                arr[index] = obj;
                if (item.children.length > 0) {
                  obj["children"] = [];
                  digui(item.children, obj.children);
                }
              });
            };
            digui(res.data, arrs);
            this.deptdata = arrs;
            return arrs;
          }
        });

      switch (type) {
        case "add": // 添加
          if (this.deptdata.length === 0) {
            getTreeDatas.then(() => {
              this.dialog.title = "添加";
              this.dialog.show = true;
            });
          } else {
            this.dialog.title = "添加";
            this.dialog.show = true;
          }
          break;
        case "edit": // 编辑
          this.edit_addFn(getTreeDatas, inData);
          break;
        case "quanxian":
          this.roleAuthFN(inData);
          break;
      }
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getUserData();
          break;
        case "edit": // 编辑按钮
        case "quanxian": //权限按钮
          this.buttonRowUpdata(data.type, data.data);
          break;
        case "delete": // 单独删除按钮
          this.aloneDeleteData = [];
          this.aloneDeleteData.push(data.data.roleId);
          this.toDelete("alone");
          break;
        case "moreDelete": // 批量删除按钮
          this.deleteData = [];
          var arr = data.data.map(item => item.roleId);
          this.deleteData = arr;
          break;
      }
    },
    // 编辑、添加
    edit_addFn(getTreeDatas, inData) {
      var promiseArr = [];
      var getUserDatas = this.$api
        .admin_role_getRole({ vm: this, data: inData.roleId })
        .then(res => {
          if (res) {
            let obj = Object.assign(this.updataUser, res.data);
            delete obj.roleDeptId;
            this.updataUser = { ...obj };
            return res.data;
          }
        });
      promiseArr.push(getUserDatas);
      if (this.deptdata.length === 0) {
        promiseArr.push(getTreeDatas);
      }
      Promise.all(promiseArr)
        .then(resArr => {
          // 将所属部门数据拉平成为一维数组，后边使用
          let arrBig = [];
          let digui = arr => {
            arr.forEach(item => {
              arrBig.push(item);
              if (item.children) {
                digui(item.children);
              }
            });
          };
          digui(this.deptdata);
          // 获取所属部门的联动层级id
          let arrChose = [],
            ids = resArr[0].roleDeptId;
          for (let i = arrBig.length; i--; ) {
            let item = arrBig[i];
            if (item.value == ids) {
              arrChose.unshift("" + ids);
              ids = item.parentId;
            }
          }
          return arrChose;
        })
        .then(arrchose => {
          this.dialog.title = "编辑";
          this.updataUser.roleDeptId = arrchose; // 所属部门
          this.dialog.show = true;
        });
    },
    // 弹出框的操作
    dialogAction(type) {
      if (type) {
        this.$refs.updataUser.validate(valid => {
          if (valid) {
            let httpType = ""; // 根据是否需要填写密码判定http方式，是否是添加
            if (this.dialog.title === "添加") {
              httpType = "post";
            } else {
              httpType = "put";
            }

            let kk = { ...this.updataUser }; // 上传服务器要求的格式数据
            kk.roleDeptId = +this.updataUser.roleDeptId[
              this.updataUser.roleDeptId.length - 1
            ];
            this.$api
              .admin_role_addRole({
                method: httpType,
                vm: this,
                data: kk
              })
              .then(res => {
                if (res) {
                  this.$message.success(`${this.dialog.title}成功！`);
                  this.$store
                    .dispatch("getUserData", this)
                    .then(res => {
                      if (res) {
                        this.canDoWhat();
                      }
                    })
                    .then(() => {
                      this.getUserData();
                    })
                    .then(() => {
                      this.dialogClose();
                    });
                }
              });
          }
        });
      } else {
        this.dialogClose();
      }
    },
    // 权限按钮
    roleAuthFN(inData) {
      this.checkedArr = [];
      this.updata.roleId = inData.roleId;
      // 获取tree级联数据
      let pro1 = this.$api.admin_role_getAllTree({ vm: this }).then(res => {
        if (res) {
          this.getMenuAllTree = [];
          let resData = res.data;
          for (let i = 0; i < resData.length; i += 2) {
            let arr = resData.slice(i, i + 2);
            this.getMenuAllTree.push(arr);
          }
        }
        return res.data;
      });
      // // 根据角色获取权限
      let pro2 = this.$api
        .admin_role_getRoleTree({
          vm: this,
          data: inData.roleCode
        })
        .then(res => {
          if (res) {
            this.updata.menuIds = res.data;
            return res.data;
          }
        });
      Promise.all([pro1, pro2])
        .then(datas => {
          let treeData = datas[0]; // tree 的结构数据
          let selectArr = datas[1]; // 服务器返回的已选数据
          let toShow = [];
          let arrBig = [];
          let digui = arr => {
            arr.forEach(item => {
              arrBig.push(item);
              if (item.children) {
                digui(item.children);
              }
            });
          };
          digui(treeData);

          arrBig.forEach(item => {
            if (selectArr.includes(item.id) && item.children.length == 0) {
              toShow.push(item.id);
            }
          });
          this.checkedArr = toShow;
        })
        .then(() => (this.dialog.show1 = true));
    },
    // 关闭弹框的清零工作
    roleclear() {
      this.dialog.show1 = false;
      this.checkedArr = [];
      this.updata = {};
    },
    // 权限弹框保存按钮
    updateRoleFN() {
      let arrKey = Object.keys(this.$refs);
      let arr = [];
      for (let i = arrKey.length; i--; ) {
        if (arrKey[i] !== "updataUser") {
          arr = arr.concat(this.$refs[arrKey[i]][0].getCheckedKeys());
          arr = arr.concat(this.$refs[arrKey[i]][0].getHalfCheckedKeys());
        }
      }
      this.updata.menuIds = arr.join(",");
      this.$api
        .admin_role_upRoleTree({
          vm: this,
          roleId: this.updata.roleId,
          menuIds: this.updata.menuIds ? this.updata.menuIds : []
        })
        .then(res => {
          if (res) {
            this.roleclear();
            this.$message.success("设置成功！");
            this.$store.dispatch("getUserData", this);
          }
        });
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      // 变更用户权限后需要重新获取数据
      this.tableInputData.data.quanxian = [];
      this.tableInputData.data.custom.length = 0;
      let quanxian = JSON.parse(localStorage.getItem("buttenpremissions"));

      let sys_role_edit = quanxian.includes("sys_role_edit");
      let sys_role_del = quanxian.includes("sys_role_del");
      let sys_role_perm = quanxian.includes("sys_role_perm");
      let sys_role_add = quanxian.includes("sys_role_add");

      if (sys_role_add) {
        this.tableInputData.data.quanxian.push("sys_role_add");
      }

      if (sys_role_edit) {
        this.tableInputData.data.quanxian.push("sys_role_edit");
        this.tableInputData.data.custom.push({
          text: "编辑",
          type: "primary",
          size: "small",
          emit: "edit"
        });
      }
      if (sys_role_del) {
        this.tableInputData.data.quanxian.push("sys_role_del");
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
      }
      if (sys_role_perm) {
        this.tableInputData.data.quanxian.push("sys_role_perm");
        this.tableInputData.data.custom.push({
          text: "权限",
          type: "warning",
          size: "mini",
          emit: "quanxian"
        });
      }
    },
    // 获取数据后的处理
    afterGetData(data) {
      this.tableInputData.total = null;
      this.tableInputData.pageSize = null;
      this.tableInputData.pageNum = null;
      this.tableInputData.data.list = [];
      this.tableInputData.data.title = [];
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let obj = {},
            arr = Object.keys(item);
          arr.forEach(str => {
            obj[str] = item[str];
          });
          return obj;
        });
        this.tableInputData.data.title = [
          {
            title: "角色名称",
            key: "roleName",
            minWidth: "120"
          },
          {
            title: "角色标识",
            key: "roleCode",
            minWidth: "230"
          },
          {
            title: "角色描述",
            key: "roleDesc",
            minWidth: "160"
          },
          {
            title: "所属部门",
            key: "deptName",
            minWidth: "120"
          },
          {
            title: "创建时间",
            key: "createTime",
            minWidth: "180"
          }
        ];
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取用户表格数据
    getUserData() {
      this.$api
        .admin_role_getTableData({
          vm: this,
          pageSize: this.tableInputData.pageSize,
          pageNum: this.tableInputData.pageNum
        })
        .then(res => {
          if (res) {
            this.afterGetData(res.data);
          }
        });
    }
  }
};
</script>
