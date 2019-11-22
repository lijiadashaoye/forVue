<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <el-input size="mini" v-model="seachInput" placeholder="用户名" style="width:180px;"></el-input>
      <el-button size="mini" type="primary" style="margin-left:20px" @click="seachClick(true)">搜索</el-button>
      <el-button size="mini" type="warning" @click="seachClick(false)">重置</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="buttonRowUpdata(true)"
        v-if="tableInputData.data.quanxian.includes('sys_user_add')"
      >添加</el-button>
      <el-button size="mini" type="danger" @click="toDelete('more')">批量删除</el-button>
    </div>
    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
      <!-- 添加用户弹出框 -->
      <el-dialog
        :close-on-click-modal="false"
        :title="dialog.title"
        :visible.sync="dialog.show"
        width="500px"
        :before-close="dialogClose"
      >
        <el-form size="small" ref="menuData" :model="menuData" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入3-15个字符" v-model="menuData.username"></el-input>
          </el-form-item>

          <el-form-item prop="deptId" label="所属部门">
            <el-cascader
              @change="getRoleData"
              style="width:100%;"
              v-model="menuData.deptId"
              :options="deptdata"
              :props="{checkStrictly: true }"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="角色" prop="roles">
            <el-select
              filterable
              v-model="menuData.roles"
              style="width:100%"
              placeholder="请选择"
              multiple
            >
              <el-option
                v-for="item in ruleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="menuData.phone"></el-input>
          </el-form-item>
          <el-form-item label="是否有效" prop="lockFlag">
            <el-select filterable v-model="menuData.lockFlag" style="width:100%" placeholder="请选择">
              <el-option label="有效" value="0"></el-option>
              <el-option label="无效" value="9"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="重设密码" v-if="menuData.actType==='edit'">
            <el-checkbox @change="setNewPossword"></el-checkbox>
          </el-form-item>

          <el-form-item label="密码" prop="password" v-if="menuData.setPassWord">
            <el-input v-model="menuData.password" type="password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="sure_password" v-if="menuData.setPassWord">
            <el-input v-model="menuData.sure_password" type="password"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogAction(false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="dialogAction(true)">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改手机号弹框 -->
      <el-dialog
        :close-on-click-modal="false"
        title="修改手机号"
        :visible.sync="phoneForm.show"
        width="400px"
        :before-close="closePhone"
      >
        <el-form size="small" ref="phoneForm" :model="phoneForm" :rules="rules" label-width="70px">
          <el-form-item label="用户名">
            <el-input :disabled="true" v-model="phoneForm.name"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <el-input v-model="phoneForm.phone"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="closePhone">取 消</el-button>
          <el-button size="mini" type="primary" @click="postPhone">确 定</el-button>
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
    // 验证手机号
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
      }
    };
    return {
      env: null,
      deleteData: [], // 储存需要删除的数据
      aloneDeleteData: [], // 储存需要单独删除的数据
      loadEnd: false, // 控制当表格的数据全部获取完才显示表格
      pageName: "", // 当前页面名字
      seachInput: "", // 搜索框输入的内容
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
      dialog: {
        // 弹出框的控制
        show: false,
        title: ""
      },
      deptdata: [], // 所属部门级联数据
      ruleList: [], // 角色列表
      //修改、添加用户
      menuData: {
        actType: "", // 记录当前是添加还是编辑
        setPassWord: false, // 是否重上传密码
        username: "", // 用户名
        deptId: [], // 所属部门
        roles: [], // 角色
        phone: "", // 电话
        lockFlag: "0" // 状态
      },
      phoneForm: {
        // 修改手机号弹框
        show: false,
        userId: "",
        name: "",
        phone: ""
      },
      //表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "请输入3-15个字符", trigger: "blur" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        lockFlag: [{ required: true, trigger: "blur" }],
        deptId: [
          { required: true, message: "所属部门必须选择", trigger: "change" }
        ],
        roles: [{ required: true, message: "角色必须填写", trigger: "change" }]
      }
    };
  },
  components: {
    isTable
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.loadEnd = false;
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.canDoWhat();
    this.getUserData();
  },
  methods: {
    // 根据部门获取角色列表
    getRoleData() {
      let id = this.menuData.deptId[this.menuData.deptId.length - 1];
      this.getRole(id);
    },
    getRole(id) {
      return this.$api
        .admin_user_getRole({
          vm: this,
          data: id
        })
        .then(res => {
          if (res) {
            this.ruleList = res.data;
            // 动态清理roles数据
            this.menuData.roles = [];
            return;
          }
        });
    },
    // 关闭弹框
    dialogClose() {
      this.$refs.menuData.resetFields();
      this.dialog.show = false;
      this.menuData = {
        username: "",
        deptId: [],
        roles: [],
        phone: "",
        lockFlag: "0"
      };
    },
    // 弹出框的操作
    dialogAction(type) {
      if (type) {
        this.$refs.menuData.validate(valid => {
          if (valid) {
            let httpType = ""; // 根据是否需要填写密码判定http方式，是否是添加
            if (this.menuData.actType === "add") {
              httpType = "post";
            } else {
              httpType = "put";
            }
            let kk = { ...this.menuData }; // 上传服务器要求的格式数据
            delete kk.actType;
            delete kk.setPassWord;
            delete kk.sure_password;
            // 编辑
            if (!this.menuData.setPassWord) {
              delete kk.password;
            }

            kk.deptId = +this.menuData.deptId[this.menuData.deptId.length - 1];

            var reg = /[`~!@#$%^&*()\\+=<>?:"{}|,/;'[\]·！￥……（）——\\《》？：“”【】；‘’，。、]/g;
            if (reg.test(kk.username)) {
              this.$message.error("用户名中不能使用特殊字符");
              return;
            }

            this.$api
              .admin_user_aboutUser({
                vm: this,
                method: httpType,
                data: kk
              })
              .then(res => {
                if (res) {
                  this.$message.success(`${this.dialog.title}成功！`);
                  this.getUserData();
                  this.dialogClose();
                }
              });
          }
        });
      } else {
        this.dialogClose();
      }
    },
    // 监听表格的操作
    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getUserData();
          break;
        case "phone": // 修改手机号
          this.changePhone(data.data);
          break;
        case "edit": // 编辑按钮
          this.buttonRowUpdata("edit", data.data);
          break;
        case "delete": // 单独删除按钮
          this.aloneDeleteData = [];
          this.aloneDeleteData.push(data.data.userId);
          this.toDelete("alone");
          break;
        case "moreDelete": // 批量删除按钮
          var arr = data.data.map(item => item.userId);
          this.deleteData = arr;
          break;
      }
    },
    // 修改手机号
    changePhone(kk) {
      let data = { ...kk };
      this.phoneForm.name = data.username;
      this.phoneForm.userId = data.userId;
      this.phoneForm.phone = data.phone;
      this.phoneForm.show = true;
    },
    // 修改手机号的保存
    postPhone() {
      let obj = {
        userId: this.phoneForm.userId,
        username: this.phoneForm.name,
        phone: this.phoneForm.phone
      };
      this.$api.admin_user_updatePhone({ vm: this, data: obj }).then(res => {
        if (res) {
          this.$message.success("修改成功！");
          this.getUserData();
          this.closePhone();
        }
      });
    },
    // 修改手机号的弹窗关闭
    closePhone() {
      this.$refs.phoneForm.resetFields();
      this.phoneForm.show = false;
    },
    // 删除、批量删除
    toDelete(type) {
      if (type === "alone") {
        this.$confirm("确认删除吗？")
          .then(() => {
            this.$api
              .admin_user_deleteUser({
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
      if (type == "more") {
        if (this.deleteData.length == 0) {
          this.$message.warning("请选择要删除的！");
        } else {
          this.$confirm("确认删除吗？")
            .then(() => {
              let promiseArr = [];
              let tableData = this.tableInputData.data.list; // 获取表格的数据

              this.deleteData.forEach(item => {
                let del = this.$api
                  .admin_user_deleteUser({
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
                        data: tableData.filter(tar => tar.userId == item)
                      };
                    }
                    return obj;
                  });
                promiseArr.push(del);
              });

              Promise.all(promiseArr).then(arr => {
                this.deleteData = [];
                // 拼接删除结果
                let numSucces = 0;
                let numFail = 0;
                let failName = "";
                arr.forEach(item => {
                  if (item.ok) {
                    numSucces++;
                  } else {
                    numFail++;
                    failName += `<li>用户名称：${item.data[0].username}</li>`;
                  }
                });
                let str = `<p>共操作 ${arr.length} 条数据，成功 ${numSucces} 个，失败 ${numFail} 个</p>`;

                if (numFail > 0) {
                  str += `<p>失败的数据为：</p>
                    <ul>
                      ${failName}
                    </ul>`;
                }
                this.$alert(str, "操作结果提示", {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: "确定",
                  callback: this.getUserData
                });
              });
            })
            .catch(() => {});
        }
      }
    },
    /*获取数字部分：Unicode编码值范围在[48~57]之间即为数字
     *获取英文字母部分：Unicode编码值范围在[65~90]，以及[97~122]之间即为英文字母
     *获取中文部分(大于122)
     */
    checkChinese(rule, value, callback) {
      let pass = ("" + value).split("").some(tar => tar.charCodeAt() > 122);
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.length > 16 || value.length < 6) {
        callback(new Error("请输入6--19个字符"));
      } else if (pass) {
        callback(new Error("请勿使用中文作为密码"));
      } else {
        callback();
      }
    },
    surePassword(rule, value, callback) {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value != this.menuData.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    },
    // 重设密码复选框切换
    setNewPossword(e) {
      let kk = { ...this.menuData };
      if (e) {
        kk.setPassWord = true;
        kk["password"] = "";
        kk["sure_password"] = "";
        this.rules["password"] = [
          { required: true, validator: this.checkChinese, trigger: "blur" }
        ];
        this.rules["sure_password"] = [
          { required: true, validator: this.surePassword, trigger: "blur" }
        ];
      } else {
        kk.setPassWord = false;
        delete kk.password;
        delete kk.sure_password;
        delete this.rules.password;
        delete this.rules.sure_password;
      }
      this.menuData = kk;
    },
    // 添加按钮、表格的编辑按钮
    buttonRowUpdata(type, inData) {
      let promiseArr = [];
      if (type === "edit") {
        // 编辑，获取用户数据
        let promise1 = this.$api
          .admin_user_getUser({
            vm: this,
            data: inData.userId
          })
          .then(res => {
            if (res) {
              return Promise.resolve(res.data);
            }
          });
        promiseArr.push(promise1);
      }
      // 获取级联选择的数据，需要先拿到级联数据
      let promise2 = this.$api
        .admin_user_getTree({
          vm: this
        })
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
            return res.data;
          }
        });
      promiseArr.push(promise2);

      Promise.all(promiseArr).then(resData => {
        // 如果是添加，需要设置密码
        if (type !== "edit") {
          this.dialog.title = "添加";
          this.menuData = {
            actType: "add", // 不显示重设密码
            setPassWord: true, // 显示密码输入框
            username: "", // 用户名
            deptId: [],
            roles: [],
            phone: "",
            lockFlag: "0",
            password: "",
            sure_password: ""
          };
          this.rules["password"] = [
            { required: true, validator: this.checkChinese, trigger: "blur" }
          ];
          this.rules["sure_password"] = [
            { required: true, validator: this.surePassword, trigger: "blur" }
          ];
          this.dialog.show = true;
        } else {
          this.dialog.title = "用户修改";
          new Promise(resolve => {
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
            digui(resData[1]);
            resolve(arrBig);
          })
            .then(arrs => {
              // 获取所属部门的联动层级id
              let arrChoose = [],
                ids = resData[0].deptId;
              for (let i = arrs.length; i--; ) {
                let item = arrs[i];
                if (item.id == ids) {
                  arrChoose.unshift("" + ids);
                  ids = item.parentId;
                }
              }
              return arrChoose;
            })
            .then(depIds => {
              // 根据所属部门的id，获取角色数据列表
              if (depIds.length > 0) {
                let id = depIds[depIds.length - 1];
                return this.getRole(id).then(() => depIds);
              }
            })
            .then(depIds => {
              let roleArr = resData[0].roleList;
              delete this.rules.password;
              delete this.rules.sure_password;
              // 如果是编辑，可以选择是否重设密码
              this.menuData = {
                actType: "edit", // 显示重设密码checkbox
                setPassWord: false, // 不显示密码输入框
                userId: resData[0].userId,
                username: resData[0].username,
                deptId: depIds, // 所属部门
                roles:
                  roleArr.length > 0 ? roleArr.map(item => item.roleId) : [],
                phone: resData[0].phone,
                lockFlag: resData[0].lockFlag
              };
            })
            .then(() => {
              this.dialog.show = true;
            });
        }
      });
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      let quanxian = JSON.parse(sessionStorage.getItem("buttenpremissions"));
      let sys_user_edit = quanxian.includes("sys_user_edit");
      let sys_user_del = quanxian.includes("sys_user_del");
      let sys_user_add = quanxian.includes("sys_user_add");
      // let user_phone_edit = quanxian.includes("user_phone_edit"); // 修改手机号

      if (sys_user_add) {
        this.tableInputData.data.quanxian.push("sys_user_add");
      }

      if (sys_user_edit) {
        this.tableInputData.data.quanxian.push("sys_user_edit");
        this.tableInputData.data.custom.push({
          text: "编辑",
          type: "warning",
          size: "small",
          emit: "edit"
        });
      }

      if (sys_user_del) {
        this.tableInputData.data.quanxian.push("sys_user_del");
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
      }
      // if (user_phone_edit) {
      this.tableInputData.data.quanxian.push("user_phone_edit");
      this.tableInputData.data.custom.push({
        text: "修改手机号",
        type: "info",
        size: "mini",
        emit: "phone"
      });
      // }
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
            if (str === "roleList") {
              let strs = "";
              if (item[str].length > 0) {
                item[str].forEach((tar, index) => {
                  if (index === item[str].length - 1) {
                    strs += tar.roleName;
                  } else {
                    strs += tar.roleName + "，";
                  }
                });
              }
              obj[str] = strs;
            } else {
              obj[str] = item[str];
            }

            if (item.lockFlag == 0) {
              obj.delFlagText = "有效";
            } else if (item.lockFlag == 9) {
              obj.delFlagText = "无效";
            }
          });
          return obj;
        });
        this.tableInputData.data.title = [
          {
            title: "用户名称",
            key: "username",
            minWidth: "100"
          },
          {
            title: "创建时间",
            key: "createTime",
            minWidth: "170"
          },
          {
            title: "更新时间",
            key: "updateTime",
            minWidth: "170"
          },
          {
            title: "状态",
            key: "delFlagText",
            minWidth: "90"
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: "120"
          },
          {
            title: "部门",
            key: "deptName",
            minWidth: "120"
          },
          {
            title: "角色信息",
            key: "roleList",
            minWidth: "120"
          }
        ];
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 搜索框、重置
    seachClick(type) {
      if (!type) {
        this.seachInput = "";
      }
      this.tableInputData.pageSize = 10;
      this.tableInputData.pageNum = 1;
      this.getUserData();
    },
    // 获取用户表格数据
    getUserData() {
      let obj;
      if (this.seachInput) {
        obj = {
          vm: this,
          method: "get",
          search: {
            pageSize: this.tableInputData.pageSize,
            pageNum: this.tableInputData.pageNum,
            username: this.seachInput
          }
        };
      } else {
        obj = {
          vm: this,
          method: "get",
          search: {
            pageSize: this.tableInputData.pageSize,
            pageNum: this.tableInputData.pageNum
          }
        };
      }
      this.$api.admin_user_getTableData(obj).then(res => {
        if (res) {
          this.afterGetData(res.data);
        }
      });
    }
  }
};
</script>
