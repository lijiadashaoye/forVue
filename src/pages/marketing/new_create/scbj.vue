<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
    </div>
    <div id="forTable">
      <div class="toflex">
        <div class="toleft">
          <el-form ref="leftForm" :inline="true" :model="leftForm" label-width="80px">
            <el-form-item label="显示名称">
              <el-input v-model="leftForm.name" placeholder="APP标识+平台+登陆状态+描述信息" style="width:107%"></el-input>
            </el-form-item>

            <el-form-item label="排序值" prop="paixu" label-width="95px">
              <el-input v-model="leftForm.paixu" placeholder="请输入整数" style="width:107%"></el-input>
            </el-form-item>

            <el-form-item label="APP标识">
              <el-select v-model="leftForm.appMark" placeholder="全部">
                <el-option
                  v-for="item of selectData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否有效">
              <el-select v-model="leftForm.youxiao" placeholder="请选择">
                <el-option
                  v-for="item of shifou"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="配置点">
              <el-select v-model="leftForm.peizhi" placeholder="请选择">
                <el-option
                  v-for="item of peizhiList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="登录状态">
              <el-select v-model="leftForm.loginStatus" placeholder="请选择">
                <el-option
                  v-for="item of dlzt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="平台">
              <el-select v-model="leftForm.pingtai" placeholder="选择">
                <el-option
                  v-for="item of pingtai"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <div></div>

            <el-form-item label="描述信息" >
              <el-input v-model="leftForm.pingtai" type="textarea" rows="3" placeholder="请输入" style="width:116%"></el-input>
            </el-form-item>

            <el-form-item label="备注信息" label-width="112px">
              <el-input v-model="leftForm.marks" type="textarea" rows="3" placeholder="请输入" style="width:116%"></el-input>
            </el-form-item>
            <div></div>

            <el-form-item label="其他条件">
              <el-button size="mini" @click="toAdd">+</el-button>
            </el-form-item>
            <el-form-item label=" ">
              <el-button type="primary" size="mini" @click="toSave">保存</el-button>
            </el-form-item>

            <ul>
              <li class="aline" v-for="data of leftForm.other" :key="data.num">
                <el-form-item size="mini">
                  <el-select v-model="data.q1" placeholder="请选择">
                    <el-option
                      v-for="item of langueData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item size="mini">
                  <el-select size="mini" v-model="data.q2" placeholder="请选择">
                    <el-option
                      v-for="item of fuhao"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item size="mini">
                  <el-input v-model="data.q3" placeholder="请输入"></el-input>
                </el-form-item>

                <el-button
                  class="toDelete"
                  size="mini"
                  icon="el-icon-close"
                  type="danger"
                  circle
                  title="删除"
                  @click="toDelete(data)"
                ></el-button>
              </li>
            </ul>
          </el-form>
        </div>

        <div class="toright">
          <el-form :inline="true" ref="rightForm" :model="rightForm" label-width="80px">
            <el-form-item label="APP标识">
              <el-select v-model="rightForm.appbs" placeholder="全部">
                <el-option
                  v-for="item of selectData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="平台">
              <el-select v-model="rightForm.pt" placeholder="全部">
                <el-option
                  v-for="item of pingtai"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="登陆状态">
              <el-select v-model="rightForm.rightForm" placeholder="全部">
                <el-option
                  v-for="item of dlzt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="审核">
              <el-select v-model="rightForm.sh" placeholder="全部">
                <el-option
                  v-for="item of shenhe"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
               <button @click="jiade">动态更新假数据</button>
              <el-button @click="tofind()">查询</el-button>
              <button @click="jiade">动态更新假数据</button>
            </el-form-item>
          </el-form>

          <div id="forTable" style="max-height:500px">
            <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isTable from "../../../components/isTable/isTable.vue";
export default {
  props: {},
  components: {
    isTable
  },
  data() {
    return {
      labelPosition: "left",
      loadEnd: false,

      otherDatas: [],
      tableInputData: {
        noIndex: true,
        // 传给table子组件的数据
        checkBox: true, // 判断需要不需要添加选择框
        pageSize: 10, // 分页相关
        pageNum: 1,
        total: null,
        actions: {},
        data: {
          list: [], // 给表格的数据
          quanxian: [], // 记录用户的权限，当前页面显示哪些按钮、表格是否显示操作列
          title: [
            { name: "Test one" },
            { name: "Test two" },
            { name: "Test three" }
          ], // 给表格表头
          custom: [] // 给表格按钮数量、类型（编辑、删除等）
        }
      },
      shifou: [{ label: "是", value: "shi" }, { label: "否", value: "fou" }],
      shenhe: [
        { label: "审核限制", value: "shxz" },
        { label: "正常素材", value: "zcsc" }
      ],
      dlzt: [
        { label: "登陆用户可见", value: "dlyhkj" },
        { label: "非登陆用户可见", value: "fdlyhkj" }
      ],
      selectData: [
        { label: "比财", value: "bc" },
        { label: "拼财", value: "pc" },
        { label: "拼财小程序", value: "pcxcx" },
        { label: "亚财", value: "yc" }
      ],
      langueData: [
        { label: "语言", value: "yy" },
        { label: "APP版本", value: "appbb" },
        { label: "年龄", value: "nl" }
      ],
      fuhao: [
        { label: ">", value: ">" },
        { label: "=", value: "=" },
        { label: "<", value: "<" }
      ],
      pingtai: [
        { label: "苹果", value: "pgg" },
        { label: "安卓", value: "azz" }
      ],
      peizhiList: [
        { label: "左侧侧边栏", value: "left" },
        { label: "底部", value: "bottom" }
      ],
      num: 0, // 其它条件添加时，前端用来计数
      pageName: "", // 当前页面名字,
      // 左侧表单
      leftForm: {
        name: "", // 显示名称
        appMark: "", // APP标识
        paixu: "", // 排序值
        youxiao: "", // 是否有效
        peizhi: "", // 配置点
        loginStatus: "", // 登录状态
        pingtai: "", // 登录状态
        miaoshu: "", // 描述信息
        marks: "", // 备注信息
        other: [] // 其他条件
      },
      // 右边查询
      rightForm: {
        appbs: "", // APP标识
        pt: "", // 平台
        dlzt: "", // 登陆状态
        sh: "" // 审核
      }
    };
  },
  mounted() {
    this.pageName = sessionStorage.getItem("page");
    this.getUserData();
  },
  methods: {
    // 其它条件添加
    toAdd() {
      this.leftForm.other.push({
        num: this.num++,
        q1: "",
        q2: "",
        q3: ""
      });
    },
    // 左侧底下的删除
    toDelete(item) {
      this.leftForm.other = this.leftForm.other.filter(
        tar => tar.num != item.num
      );
    },
    // 左侧的保存
    toSave() {
      console.log(this.leftForm);
    },
    // 右侧的查询
    tofind() {
      console.log(this.rightForm);
    },

    tableEmit(data) {
      switch (data.type) {
        case "regetData": // 分页的emit
          this.getUserData();
          break;
        case "moreDelete": // 批量删除按钮
          var arr = data.data.map(item => item);
          this.deleteData = arr;
          break;
      }
    },
    // 获取表格数据
    getUserData() {
      this.$api
        .member_level_getList({
          vm: this,
          data: {
            levelId: this.seachInput,
            pageSize: this.tableInputData.pageSize,
            pageNum: this.tableInputData.pageNum
          }
        })
        .then(res => {
          if (res) {
            this.afterGetData(res.data);
          }
        });
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
            // 活动管理配置管理设置素材，属性名： sucai
            obj.sucai = [
              {
                text: "素材1",
                img:
                  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563362228441&di=c1434cdc709b17f598337b0d0f531954&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F07%2F20180307125924_43kra.thumb.700_0.jpeg"
              },
              {
                text: "素材2",
                img:
                  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563362228441&di=c1434cdc709b17f598337b0d0f531954&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F07%2F20180307125924_43kra.thumb.700_0.jpeg"
              },
              {
                text: "素材3",
                img:
                  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563362228441&di=c1434cdc709b17f598337b0d0f531954&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F07%2F20180307125924_43kra.thumb.700_0.jpeg"
              }
            ];
          });
          return obj;
        });
        this.tableInputData.data.title = [
          {
            title: "编号",
            key: "name",
            minWidth: "100"
          },
          {
            title: "素材预览",
            key: "sucai",
            minWidth: "200",
            imgArr: true // 展示图片数组
          }
        ];
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    jiade() {
   
    }
  }
};
</script>
<style>
.toflex {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 20px);
}
.toleft {
  width: 50%;
  box-sizing: border-box;
  border-right: 1px solid rgb(228, 224, 224);
}
.toright {
  width: 48%;
}

#toleft > div {
  display: flex;
  justify-content: space-around;
}
.aline {
  display: flex;
  position: relative;
  padding: 5px 0;
  padding-right: 20px;
  background: rgba(165, 206, 230, 0.383);
}
.aline div {
  margin: 0 !important;
  padding: 0 2px;
}

.toDelete {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>

