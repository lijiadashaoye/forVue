<template>
  <div class="componentWaper">
    <div id="forHeader">
      <p class="isPageName">
        <span :class="env?'lineSpan1':'lineSpan'">|</span>
        位置：{{$store.state.for_layout.titles}}{{pageName}}
      </p>
      <el-button
        size="mini"
        type="primary"
        @click="addbutton"
        v-if="quanxian.includes('sys_menu_add')"
      >添加</el-button>
      <el-button
        size="mini"
        type="warning"
        @click="editbutton"
        v-if="quanxian.includes('sys_menu_edit')"
      >编辑</el-button>
      <el-button
        size="mini"
        type="danger"
        @click="deleteMenuFn"
        v-if="quanxian.includes('sys_menu_del')"
      >删除</el-button>
    </div>
    <div id="forTable" style="padding-bottom:0;">
      <div class="menuContent">
        <div class="treeWap">
          <el-tree
            :data="menuTree"
            :highlight-current="true"
            :props="defaultProps"
            @node-click="handleNodeClick"
            @node-collapse="node_close"
            @node-expand="node_open"
            node-key="id"
            :default-expanded-keys="hasOpen"
          ></el-tree>
        </div>
        <div class="formWap">
          <el-form
            ref="menuData"
            size="mini"
            :label-position="'right'"
            label-width="80px"
            :model="menuData"
            :rules="rules"
          >
            <el-form-item :label="isAdd?'父级节点':'节点ID'">
              <el-input v-model="menuData.menuId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="节点ID" v-show="false">
              <el-input v-model="menuData.menuId"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="name">
              <el-input placeholder="请输入标题，最多32字符" v-model="menuData.name" :disabled="toEdit"></el-input>
            </el-form-item>
            <el-form-item prop="permission" label="权限标识">
              <el-input
                placeholder="请输入权限标识，最多32字符"
                v-model="menuData.permission"
                :disabled="toEdit"
              ></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
              <el-input :disabled="toEdit" v-model="menuData.icon" placeholder="请输入图标"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="类型">
              <el-select
                filterable
                :disabled="toEdit"
                v-model="menuData.type"
                placeholder="请输入资源请求类型"
                style="width:100%;"
                @change="set_after(menuData.type)"
              >
                <el-option
                  v-for="item in typeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="url" label="资源路径">
              <el-input :disabled="toEdit" v-model="menuData.url" placeholder="请输入资源路径"></el-input>
            </el-form-item>
            <el-form-item prop="method" label="请求方法">
              <el-select
                filterable
                :disabled="toEdit"
                v-model="menuData.method"
                placeholder="请输入资源请求方法"
                style="width:100%;"
                clearable
              >
                <el-option
                  v-for="item in methodData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="sort" label="排序">
              <el-input
                type="number"
                :disabled="toEdit"
                v-model="menuData.sort"
                placeholder="请输入排序，只能输入正整数，最多11字符"
              ></el-input>
            </el-form-item>

            <el-form-item label="前端地址" prop="path">
              <el-input :disabled="toEdit" v-model="menuData.path" placeholder="请输入前端地址"></el-input>
            </el-form-item>
          </el-form>
          <div v-if="!toEdit">
            <el-button size="mini" type="primary" v-if="isAdd" @click="addMenuFn">保存</el-button>
            <el-button size="mini" type="warning" v-if="!isAdd" @click="updateMenuFn">更新</el-button>
            <el-button size="mini" type="danger" @click="clearData">取消</el-button>
          </div>
        </div>

        <!-- 查看图标库 -->
        <ul style="padding:5px;overflow-y:auto;" v-if="false">
          <li v-for="name in iconList" :key="name">
            <i :class="`myIcon22px icon-${name}`"></i>
            <span>{{name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    // 验证sort
    var checkSort = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入排序"));
      } else if (("" + value).length > 11 || ("" + value).length < 0) {
        callback(new Error("请输入1-11字符"));
      } else {
        callback();
      }
    };

    return {
      env: null,
      hasOpen: [], // 记录已经展开的
      pageName: "", // 当前页面名字
      quanxian: [],
      menuTree: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      isAdd: false, // 切换保存、更新按钮，为true时，为添加
      toEdit: true, // 切换input框为是否只读，为true时，为只读
      menuData: {}, // 当前节点的数据
      typeData: [
        // 资源请求类型
        {
          value: "MENU",
          label: "菜单"
        },
        {
          value: "BUTTON",
          label: "按钮"
        }
      ],
      methodData: [
        // 请求方法
        {
          value: "GET",
          label: "GET"
        },
        {
          value: "POST",
          label: "POST"
        },
        {
          value: "PUT",
          label: "PUT"
        },
        {
          value: "DELETE",
          label: "DELETE"
        }
      ],
      rules: {
        name: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 32, message: "请输入1-32个字符", trigger: "blur" }
        ],
        type: [
          { min: 1, max: 50, message: "请输入1-50个字符", trigger: "blur" },
          { required: true, message: "请输入资源请求类型", trigger: "blur" }
        ],
        sort: [{ validator: checkSort, trigger: "blur" }],
        permission: [
          { required: true, message: "请输入权限标识", trigger: "blur" },
          { min: 1, max: 32, message: "请输入1-32个字符", trigger: "blur" }
        ],
        icon: [{ min: 1, max: 30, message: "请输入1-30", trigger: "blur" }],
        path: [
          { min: 1, max: 100, message: "请输入1-100个字符", trigger: "blur" }
        ]
      },

      // 图标名
      iconList: [
        "jigou01",
        "success",
        "jianpan",
        "heimingdan",
        "shuangyou",
        "app",
        "huizhang",
        "xinshou",
        "yuebao",
        "add",
        "kaihu",
        "chanpinzhongxin",
        "huodong",
        "49shurushanchu-1",
        "qiaquan",
        "down-trangle",
        "yinhangqia",
        "yingxiao",
        "tuichu",
        "hongbao",
        "chanpin",
        "wenhaoyuanyiwenxianxing",
        "iconDeleteitem",
        "user",
        "xieyi",
        "huiyuan",
        "allLeft",
        "renwu",
        "Bursting",
        "xiasanjiaoxiangxiamianxing",
        "SysManagement",
        "down-trangle-copy",
        "yemian-copy",
        "fujindehuodong",
        "jichuguanli",
        "yonghu",
        "yinhang",
        "qichejietubiaoku-",
        "yousanjiaoxiangyoumianxing",
        "shezhi"
      ]
    };
  },
  mounted() {
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.canDoWhat();
    this.getAllTree();
  },
  beforeDestroy() {
    this.hasOpen = [];
  },
  methods: {
    // 根据类型切换验证规则（资源路径、请求方法）
    set_after(type) {
      let kk = { ...this.rules },
        data = JSON.parse(JSON.stringify(this.menuData));
      data.method = "";
      if (type === "MENU") {
        kk.url = [
          { min: 1, max: 50, message: "请输入1-50个字符", trigger: "blur" }
        ];
        delete kk.method;
      } else {
        kk.url = [
          { min: 1, max: 50, message: "请输入1-50个字符", trigger: "blur" },
          { required: true, message: "请输入资源路径", trigger: "blur" }
        ];
        kk.method = [
          { required: true, message: "请输入资源请求方法", trigger: "change" }
        ];
      }
      this.rules = kk;

      setTimeout(() => {
        this.$refs.menuData.resetFields();
        this.menuData = { ...data };
      });
    },
    // 菜单数据发生变动后重新获取导航数据
    sureReGetAside() {
      this.$confirm("导航菜单数据已经发生变动，是否更新导航？")
        .then(() => {
          this.$store.dispatch("reGetAside", this);
        })
        .catch(() => {});
    },
    // 用户权限判定，之后表格右侧会有不同的操作按钮
    canDoWhat() {
      let quanxian = JSON.parse(sessionStorage.getItem("buttenpremissions"));
      let sys_menu_add = quanxian.includes("sys_menu_add");
      let sys_menu_edit = quanxian.includes("sys_menu_edit");
      let sys_menu_del = quanxian.includes("sys_menu_del");
      if (sys_menu_add) {
        this.quanxian.push("sys_menu_add");
      }
      if (sys_menu_edit) {
        this.quanxian.push("sys_menu_edit");
      }
      if (sys_menu_del) {
        this.quanxian.push("sys_menu_del");
      }
    },
    // 节点被关闭时触发的事件
    node_close(data) {
      let num = this.hasOpen.findIndex(tar => tar == data.id);
      this.hasOpen.splice(num, 1);
    },
    // 节点被展开时触发的事件
    node_open(data) {
      this.hasOpen.push(data.id);
    },
    // tree 点击的时候
    handleNodeClick(data) {
      if (this.toEdit) {
        this.$api
          .admin_menu_getMenu({
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
        .admin_menu_AllTree({
          vm: this,
          data: -1
        })
        .then(res => {
          if (res) {
            this.menuTree = res.data;
          }
        });
    },
    // 编辑按钮点击，切换保存、更新按钮
    editbutton() {
      if (this.toEdit) {
        var b = JSON.stringify(this.menuData) == "{}";
        if (!b) {
          this.isAdd = false;
          this.toEdit = false;
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
          this.menuData.parentId = this.menuData.menuId;
          let datas = this.menuData;
          delete datas.updateTime;
          delete datas.createTime;
          delete datas.menuId;
          datas.sort = +datas.sort;
          this.$api
            .admin_menu_toSave({
              vm: this,
              data: datas
            })
            .then(res => {
              if (res) {
                this.clearData();
              }
            })
            .then(() => this.sureReGetAside());
        } else {
          this.$message.error("请正确输入数据！");
        }
      });
    },
    // 删除节点
    deleteMenuFn() {
      if (this.menuData.menuId) {
        this.$confirm("确定要删除吗？")
          .then(() => {
            this.$api
              .admin_menu_deleteMenu({
                vm: this,
                data: this.menuData.menuId
              })
              .then(res => {
                if (res) {
                  this.clearData();
                }
              })
              .then(() => this.sureReGetAside());
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
          datas.sort = +datas.sort;
          this.$api
            .admin_menu_updateMenu({
              vm: this,
              data: datas
            })
            .then(res => {
              if (res) {
                this.clearData();
              }
            })
            .then(() => this.sureReGetAside());
        } else {
          this.$message.error("请正确输入数据！");
        }
      });
    },
    // 重置按钮
    clearData() {
      this.menuData = {};
      this.getAllTree();
      this.toEdit = true;
      this.isAdd = false;
      this.$refs.menuData.resetFields();
    },
    // 添加按钮
    addbutton() {
      if (this.toEdit) {
        var b = JSON.stringify(this.menuData) == "{}";
        if (!b) {
          this.menuData = {
            parentId: this.menuData.parentId,
            menuId: this.menuData.menuId
          };
          this.isAdd = true;
          this.toEdit = false;
          this.$message.warning("请输入其他数据!");
        } else {
          this.$message.warning("请选择父节点!");
        }
      } else {
        this.$message.warning("请完成上一步操作，取消掉或者保存更新!");
      }
    }
  }
};
</script>