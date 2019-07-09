<template>
  <div class="componentWaper">
    <div id="forHeader">
      <h3>{{pageName}}</h3>
    </div>
    <div id="forTable">
      <div id="toflex">
        <div id="toleft">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="显示名称" style="width:597px;">
              <el-input v-model="formLabelAlign.o1" placeholder="APP标识+平台+登陆状态+描述信息"></el-input>
            </el-form-item>
          </el-form>

          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="APP标识" label-width="80px">
              <el-select v-model="formLabelAlign.o0" placeholder="全部">
                <el-option
                  v-for="item of selectData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序值" label-width="80px">
              <el-input v-model="formLabelAlign.o2" placeholder="10"></el-input>
            </el-form-item>
          </el-form>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="是否有效" label-width="80px">
              <el-select v-model="formLabelAlign.o4" placeholder="是">
                <el-option
                  v-for="item of shifou"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="配置点" label-width="80px">
              <el-input v-model="formLabelAlign.o3" placeholder="侧边栏"></el-input>
            </el-form-item>
          </el-form>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="登录状态" label-width="80px">
              <el-select v-model="formLabelAlign.o5" placeholder="全部">
                <el-option
                  v-for="item of dlzt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台" label-width="80px">
              <el-select v-model="formLabelAlign.o6" placeholder="选择" style="width:206px;">
                <el-option
                  v-for="item of pingtai"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :model="formInline" class="demo-form-inline">
            <el-form-item label="描述信息" label-width="80px" style="width:597px;">
              <el-input v-model="formLabelAlign.o7" placeholder="正常方案"></el-input>
            </el-form-item>
            <el-form-item label="备注信息" label-width="80px" style="width:597px;">
              <el-input v-model="formLabelAlign.o8" placeholder></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="formInline" class="demo-form-inline">
            <el-form-item label="其他条件" label-width="80px">
              <el-button @click="toAdd">+</el-button>
              <!-- <el-button type="primary" @click="toSave($event)" v-show="ok">保存</el-button> -->

              <!-- <el-button type="primary" @click="toSave" v-if="otherDatas.length">保存</el-button> -->
            </el-form-item>
            <div id="add1">
              <ul>
                <li class="aline" v-for="data of otherDatas" :key="data.num">
                  <el-form-item size="mini" label-width="80px">
                    <el-select v-model="data.q1" placeholder="请选择" style="width:150px;">
                      <el-option
                        v-for="item of langueData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-select size="mini" v-model="data.q2" placeholder="请选择" style="width:150px;">
                    <el-option
                      v-for="item of fuhao"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-form-item size="mini">
                    <el-input v-model="data.q3" placeholder="请输入" style="width:150px;"></el-input>
                  </el-form-item>
                  <el-form-item size="mini">
                    <el-button label-width="2px" @click="toDelete(data)">删除</el-button>
                  </el-form-item>
                </li>
              </ul>
            </div>
          </el-form>
        </div>

        <div id="toright">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="APP标识" label-width="80px">
              <el-select v-model="formL.appbs" placeholder="全部" style="width:170px;">
                <el-option
                  v-for="item of selectData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台" label-width="80px">
              <el-select v-model="formL.pt" placeholder="全部" style="width:170px;">
                <el-option
                  v-for="item of pingtai"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button label-width="2px" @click="tofind()">查询</el-button>
            </el-form-item>
          </el-form>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
            <el-form-item label="登陆状态" label-width="80px">
              <el-select v-model="formL.dlzt" placeholder="全部" style="width:170px;">
                <el-option
                  v-for="item of dlzt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核" label-width="80px">
              <el-select v-model="formL.sh" placeholder="全部" style="width:170px;">
                <el-option
                  v-for="item of shenhe"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button label-width="2px" @click="toaddd()">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otherDatas: [],
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
      num: 0, // 其它条件添加时，前端用来计数
      pageName: "素材编辑", // 当前页面名字,
      // ok: true,
      file: "",
      form: {
        name: ""
      },
      formInline: {
        user: "",
        region: ""
      },
      formLabelAlign: {
        o0: "",
        name1: "",
        name2: "",
        name3: "",
        name4: "",
        o1: "",
        o2: "",
        o3: "",
        o4: "",
        o6: "",
        o5: "",
        o7: "",
        o8: ""
      },
      formL:{
        appbs:"",
        pt:"",
        dlzt:"",
        sh:"",
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // del(index, id) {
    //   this.dataArr.splice(index, 1);
    // },
    // 其它条件添加
    toAdd() {
      this.otherDatas.push({
        id: this.num++,
        q1: "",
        q2: "",
        q3: ""
      });
    },
    toDelete(item) {
      this.otherDatas = this.otherDatas.filter(tar => tar.id != item.id);
    },
    toSave(event) {
      this.otherDatas = [];
      // this.file = event.target.files[];
    },
    tofind() {
      console.log(this.formL);
    },
    toaddd() {}
  }
};
</script>
<style>
#toflex {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}
#toleft {
  width: 48%;
  padding-right: 5px;
  margin-top: 10px;
  width: 100%;
}
#toright {
  width: 49.9%;
  border-left: 1px solid gainsboro;
  padding-left: 10px;
  margin-top: 10px;
  width: 100%;
}
.aline {
  display: flex;
  justify-content: space-between;
}
</style>

