<template>
  <div class="componentWaper">
    <div id='forHeader'>
      <h3>{{pageName}}</h3>
      <el-button
        size="mini"
        type="primary"
        @click="addbutton"
        v-if="quanxian.includes('sys_dept_add')"
      >添加</el-button>
      <el-button
        size="mini"
        type="warning"
        @click="editbutton"
        v-if="quanxian.includes('sys_dept_edit')"
      >编辑</el-button>
      <el-button
        size="mini"
        type="danger"
        @click="deleteMenuFn"
        v-if="quanxian.includes('sys_dept_del')"
      >删除</el-button>
    </div>
    <div
      id='forTable'
      style="padding-bottom:0;"
    >
      <div class="menuContent">
        <div class="treeWap">
          <el-tree
            node-key="id"
            :data="menuTree"
            :highlight-current="true"
            :props="defaultProps"
            @node-click="handleNodeClick"
            :default-expanded-keys="hasOpen"
          ></el-tree>
        </div>
        <div class="formWap">
          <el-form
            size='mini'
            :label-position="'right'"
            label-width="80px"
            :model="menuData"
            :rules="rules"
            ref="menuData"
          >
            <el-form-item :label="isAdd?'父级节点':'节点ID'">
              <el-input
                v-model="menuData.deptId"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="节点ID"
              v-show="false"
            >
              <el-input v-model="menuData.menuId"></el-input>
            </el-form-item>
            <el-form-item
              prop="name"
              label="部门名称"
            >
              <el-input
                placeholder="请输入部门名称，最多32字符"
                v-model="menuData.name"
                :readonly='!canChange'
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="code"
              label="部门编码"
            >
              <el-input
                placeholder="请输入部门编码，最多32字符"
                v-model="menuData.code"
                :readonly='!canChange'
              ></el-input>
            </el-form-item>
          </el-form>

          <div v-if='canChange'>
            <el-button
              size="mini"
              type="primary"
              v-if="isAdd"
              @click="addMenuFn"
              
            >保存</el-button>
            <el-button
              size="mini"
              type="warning"
              v-if="!isAdd"
              @click="updateMenuFn"
              
            >更新</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="clearData"
            >取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      pageName: "", // 当前页面名字
      quanxian: [],
      menuTree: [],
      hasOpen: [], // 记录已经展开的
      defaultProps: {
        children: "children",
        label: "name"
      },
      menuData: {}, // 当前节点的数据
      isAdd: false, // 添加按钮点击时变为true
      canChange: false, // 切换输入框是否可编辑
      //表单验证
      rules: {
        name: [
          { required: true, message: "部门名称必须填写", trigger: "blur" },
          { min: 1, max: 19, message: "请输入1-19个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "部门编码必须填写", trigger: "blur" },
          { min: 1, max: 19, message: "请输入1-19个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.canDoWhat();
    this.getAllTree();
  },
  methods: {
    // 用户权限判定
    canDoWhat() {
      let quanxian = JSON.parse(localStorage.getItem("buttenpremissions"));
      let sys_dept_add = quanxian.includes("sys_dept_add");
      let sys_dept_edit = quanxian.includes("sys_dept_edit");
      let sys_dept_del = quanxian.includes("sys_dept_del");
      if (sys_dept_add) {
        this.quanxian.push("sys_dept_add");
      }
      if (sys_dept_edit) {
        this.quanxian.push("sys_dept_edit");
      }
      if (sys_dept_del) {
        this.quanxian.push("sys_dept_del");
      }
    },
    // tree 点击的时候
    handleNodeClick(data) {
      if (!this.canChange) {
        if (!this.hasOpen.includes(data.id)) {
          this.hasOpen.push(data.id);
        } else {
          this.hasOpen = this.hasOpen.filter(item => item != data.id);
        }
        this.$api
          .admin_department_getInfo({
            vm: this,
            data: data.id
          })
          .then(res => {
            if (res) {
              this.menuData = res.data;
            }
          });
      }
    },
    // 获取tree数据
    getAllTree() {
      this.$api
        .admin_department_getTreeData({
          vm: this
        })
        .then(res => {
          if (res) {
            this.menuTree = [...res.data];
          }
        });
    },
    // 切换保存、更新按钮(编辑)
    editbutton() {
      if (!this.canChange) {
        var b = JSON.stringify(this.menuData) == "{}";
        if (!b) {
          this.canChange = true;
          this.$message.warning("请输入变更的数据！");
        } else {
          this.$message.warning("请选择父节点!");
        }
      } else {
        this.$message.warning("请完成上一步操作，取消掉或者保存更新!");
      }
    },
    // 保存按钮
    addMenuFn() {
      this.$refs.menuData.validate(valid => {
        if (valid) {
          this.menuData.parentId = this.menuData.deptId;
          let datas = this.menuData;
          delete datas.updateTime;
          delete datas.createTime;
          delete datas.deptId;
          // 保存新增节点
          this.$api
            .admin_department_savePoint({
              vm: this,
              data: datas
            })
            .then(res => {
              if (res) {
                this.clearData();
              }
            });
        } else {
          this.$message.error("请正确输入完整数据！");
        }
      });
    },
    // 删除节点
    deleteMenuFn() {
      if (this.menuData.deptId) {
        this.$confirm("确定要删除吗？")
          .then(() => {
            this.$api
              .admin_department_deletePoint({
                vm: this,
                data: this.menuData.deptId
              })
              .then(res => {
                if (res) {
                  this.clearData();
                }
              });
          })
          .catch(() => {});
      } else {
        this.$message.error("请选择要删除的节点！");
      }
    },
    // 更新按钮
    updateMenuFn() {
      this.$refs.menuData.validate(valid => {
        if (valid) {
          let datas = this.menuData;
          delete datas.updateTime;
          this.$api
            .admin_department_upPoint({
              vm: this,
              data: datas
            })
            .then(res => {
              if (res) {
                this.clearData();
              }
            });
        } else {
          this.$message.error("请正确输入完整数据！");
        }
      });
    },
    // 重置按钮
    clearData() {
      this.menuData = {};
      this.isAdd = false;
      this.canChange = false;
      this.getAllTree();
    },
    // 添加按钮
    addbutton() {
      if (!this.canChange) {
        var b = JSON.stringify(this.menuData) == "{}";
        if (!b) {
          this.menuData = {
            parentId: this.menuData.parentId,
            deptId: this.menuData.deptId
          };
          this.isAdd = true;
          this.canChange = true;
          this.$message.warning("请输入其他数据!");
        } else {
          this.$message.warning("请选择父节点!");
        }
      } else {
        this.$message.warning("请完成上一步操作，取消掉或者保存更新!");
      }
    }
  },
  beforeDestroy() {
    this.hasOpen = [];
  }
};
</script>
