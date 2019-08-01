<template>
  <div class="pageWaper">
    <div class="formWaper">
      <div class="forms">
        <el-form size="small" ref="formData" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="活动名称" prop="activityName">
            <el-input v-model="formData.activityName"></el-input>
          </el-form-item>

          <el-form-item label="活动编号" prop="activityNo">
            <el-input v-model="formData.activityNo"></el-input>
          </el-form-item>

          <el-form-item label="活动时间" prop="time">
            <el-date-picker
              style="width:100%;"
              v-model="formData.time"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="活动类型" required>
            <el-select
              v-model="formData.activityType"
              placeholder="请选择活动类型"
              style="width:100%;"
              clearable
              @change="changeActType"
            >
              <el-option
                v-for="item in methodData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="活动状态">
            <el-select v-model="formData.UP" placeholder="请选择活动状态" style="width:100%;" clearable>
              <el-option
                v-for="item in up_down"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="活动说明" prop="description">
            <el-input rows="5" type="textarea" v-model="formData.description"></el-input>
          </el-form-item>

          <el-form-item label="链接地址" prop="link">
            <el-input rows="5" type="textarea" v-model="formData.link"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tables" v-if="formData.activityType">
        <!-- 签到-连续 -->
        <div v-if="setQIANDAO">
          <div style="width: 100%">
            <table class="isTable">
              <tr>
                <th>行为名称</th>
                <th>人数</th>
                <th>金额</th>
                <th>天数</th>
                <th>行为操作</th>
              </tr>
              <tr>
                <th
                  :rowspan="formData.awardList[0].jiangpin.length+2"
                >{{formData.awardList[0].name}}</th>
                <td>{{formData.awardList[0].renshu}}</td>
                <td>{{formData.awardList[0].jine}}</td>
                <td>{{formData.awardList[0].tianshu}}</td>
                <td>
                  <el-checkbox v-model="formData.awardList[0].isUse">立即使用</el-checkbox>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="addJiangPin(formData.awardList[0])"
                  >添加奖品</el-button>
                </td>
              </tr>
              <tr>
                <th>奖品名称</th>
                <th>中奖概率</th>
                <th>模拟概率</th>
                <th>奖品操作</th>
              </tr>
              <tr v-for="jp in formData.awardList[0].jiangpin" :key="jp.num">
                <td>{{jp.name}}</td>
                <td class="hasAfter">
                  <el-input size="mini" v-model="jp.zhongjiang"></el-input>
                  <span>%</span>
                </td>
                <td class="hasAfter">
                  <el-input size="mini" v-model="jp.moni"></el-input>
                  <span>%</span>
                </td>
                <td>
                  <el-button size="mini" type="primary" @click="editJiangli(jp)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="deleteJiangli(0,jp)">删除</el-button>
                </td>
              </tr>

              <tr>
                <th
                  :rowspan="formData.awardList[1].jiangpin.length+2"
                >{{formData.awardList[1].name}}</th>
                <td>{{formData.awardList[1].renshu}}</td>
                <td>{{formData.awardList[1].jine}}</td>
                <td class="hasAfter">
                  <el-input size="mini" v-model="formData.awardList[1].tianshu"></el-input>
                  <span>天</span>
                </td>
                <td>
                  <el-checkbox v-model="formData.awardList[1].isUse">立即使用</el-checkbox>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="addJiangPin(formData.awardList[1])"
                  >添加奖品</el-button>
                </td>
              </tr>
              <tr>
                <th>奖品名称</th>
                <th>中奖概率</th>
                <th>模拟概率</th>
                <th>奖品操作</th>
              </tr>
              <tr v-for="jp in formData.awardList[1].jiangpin" :key="jp.num">
                <td>{{jp.name}}</td>
                <td class="hasAfter">
                  <el-input size="mini" v-model="jp.zhongjiang"></el-input>
                  <span>%</span>
                </td>
                <td class="hasAfter">
                  <el-input size="mini" v-model="jp.moni"></el-input>
                  <span>%</span>
                </td>
                <td>
                  <el-button size="mini" type="primary" @click="editJiangli(jp)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="deleteJiangli(1,jp)">删除</el-button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!-- 连连转 -->
        <div v-if="setLIANLIAN">
          <table class="isTable">
            <tr>
              <th>行为名称</th>
              <th>人数</th>
              <th>金额</th>
              <th>天数</th>
              <th>行为操作</th>
            </tr>

            <tr>
              <th :rowspan="formData.awardList[0].jiangpin.length+2">{{formData.awardList[0].name}}</th>
              <td>{{formData.awardList[0].renshu}}</td>
              <td>{{formData.awardList[0].jine}}</td>
              <td>{{formData.awardList[0].tianshu}}</td>
              <td>
                <el-checkbox v-model="formData.awardList[0].isUse">立即使用</el-checkbox>
                <el-button
                  size="mini"
                  type="primary"
                  @click="addJiangPin(formData.awardList[0])"
                >添加奖品</el-button>
              </td>
            </tr>
            <tr>
              <th>奖品名称</th>
              <th>中奖概率</th>
              <th>模拟概率</th>
              <th>奖品操作</th>
            </tr>

            <tr v-for="jp in formData.awardList[0].jiangpin" :key="jp.num">
              <td>{{jp.name}}</td>
              <td class="hasAfter">
                <el-input size="mini" v-model="jp.zhongjiang" type="number"></el-input>
                <span>%</span>
              </td>
              <td class="hasAfter">
                <el-input size="mini" v-model="jp.moni" type="number"></el-input>
                <span>%</span>
              </td>
              <td>
                <el-button size="mini" type="primary" @click="editJiangli(jp)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteJiangli(0,jp)">删除</el-button>
              </td>
            </tr>

            <tr>
              <th :rowspan="formData.awardList[1].jiangpin.length+2">{{formData.awardList[1].name}}</th>
              <td class="hasAfter">
                <el-input size="mini" v-model="formData.awardList[1].renshu"></el-input>
                <span>人</span>
              </td>

              <td>{{formData.awardList[1].jine}}</td>
              <td>{{formData.awardList[1].tianshu}}</td>
              <td>
                <el-checkbox v-model="formData.awardList[1].isUse">立即使用</el-checkbox>
                <el-button
                  size="mini"
                  type="primary"
                  @click="addJiangPin(formData.awardList[1])"
                >添加奖品</el-button>
              </td>
            </tr>
            <tr>
              <th>奖品名称</th>
              <th>中奖概率</th>
              <th>模拟概率</th>
              <th>奖品操作</th>
            </tr>
            <tr v-for="jp in formData.awardList[1].jiangpin" :key="jp.num">
              <td>{{jp.name}}</td>
              <td class="hasAfter">
                <el-input size="mini" v-model="jp.zhongjiang"></el-input>
                <span>%</span>
              </td>
              <td class="hasAfter">
                <el-input size="mini" v-model="jp.moni"></el-input>
                <span>%</span>
              </td>
              <td>
                <el-button size="mini" type="primary" @click="editJiangli(jp)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteJiangli(1,jp)">删除</el-button>
              </td>
            </tr>

            <tr>
              <th :rowspan="formData.awardList[2].jiangpin.length+2">{{formData.awardList[2].name}}</th>

              <td class="hasAfter">
                <el-input size="mini" v-model="formData.awardList[2].renshu"></el-input>
                <span>人</span>
              </td>

              <td>{{formData.awardList[2].jine}}</td>
              <td>{{formData.awardList[2].tianshu}}</td>
              <td>
                <el-checkbox v-model="formData.awardList[2].isUse">立即使用</el-checkbox>
                <el-button
                  size="mini"
                  type="primary"
                  @click="addJiangPin(formData.awardList[2])"
                >添加奖品</el-button>
              </td>
            </tr>
            <tr>
              <th>奖品名称</th>
              <th>中奖概率</th>
              <th>模拟概率</th>
              <th>奖品操作</th>
            </tr>
            <tr v-for="jp in formData.awardList[2].jiangpin" :key="jp.num">
              <td>{{jp.name}}</td>
              <td class="hasAfter">
                <el-input size="mini" v-model="jp.zhongjiang"></el-input>
                <span>%</span>
              </td>
              <td class="hasAfter">
                <el-input size="mini" v-model="jp.moni"></el-input>
                <span>%</span>
              </td>
              <td>
                <el-button size="mini" type="primary" @click="editJiangli(jp)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteJiangli(2,jp)">删除</el-button>
              </td>
            </tr>
            <tr>
              <th :rowspan="formData.awardList[3].jiangpin.length+2">{{formData.awardList[3].name}}</th>
              <td>{{formData.awardList[3].renshu}}</td>
              <td class="hasAfter">
                <el-input size="mini" v-model="formData.awardList[3].jine"></el-input>
                <span>元</span>
              </td>
              <td class="hasAfter">
                <el-input size="mini" v-model="formData.awardList[3].tianshu"></el-input>
                <span>天</span>
              </td>
              <td>
                <el-checkbox v-model="formData.awardList[3].isUse">立即使用</el-checkbox>
                <el-button
                  size="mini"
                  type="primary"
                  @click="addJiangPin(formData.awardList[3])"
                >添加奖品</el-button>
              </td>
            </tr>
            <tr>
              <th>奖品名称</th>
              <th>中奖概率</th>
              <th>模拟概率</th>
              <th>奖品操作</th>
            </tr>
            <tr v-for="jp in formData.awardList[3].jiangpin" :key="jp.num">
              <td>{{jp.name}}</td>
              <td class="hasAfter">
                <el-input size="mini" v-model="jp.zhongjiang"></el-input>
                <span>%</span>
              </td>
              <td class="hasAfter">
                <el-input size="mini" v-model="jp.moni"></el-input>
                <span>%</span>
              </td>
              <td>
                <el-button size="mini" type="primary" @click="editJiangli(jp)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteJiangli(3,jp)">删除</el-button>
              </td>
            </tr>

            <tr>
              <th :rowspan="formData.awardList[4].jiangpin.length+2">{{formData.awardList[4].name}}</th>
              <td class="hasAfter">
                <el-input size="mini" v-model="formData.awardList[4].renshu"></el-input>
                <span>人</span>
              </td>
              <td>{{formData.awardList[4].jine}}</td>
              <td>{{formData.awardList[4].tianshu}}</td>
              <td>
                <el-checkbox v-model="formData.awardList[4].isUse">立即使用</el-checkbox>
                <el-button
                  size="mini"
                  type="primary"
                  @click="addJiangPin(formData.awardList[4])"
                >添加奖品</el-button>
              </td>
            </tr>
            <tr>
              <th>奖品名称</th>
              <th>中奖概率</th>
              <th>模拟概率</th>
              <th>奖品操作</th>
            </tr>
            <tr v-for="jp in formData.awardList[4].jiangpin" :key="jp.num">
              <td>{{jp.name}}</td>
              <td class="hasAfter">
                <el-input size="mini" v-model="jp.zhongjiang"></el-input>
                <span>%</span>
              </td>
              <td class="hasAfter">
                <el-input size="mini" v-model="jp.moni"></el-input>
                <span>%</span>
              </td>
              <td>
                <el-button size="mini" type="primary" @click="editJiangli(jp)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteJiangli(4,jp)">删除</el-button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="buttons">
      <el-button @click="step()" type="primary">下一步</el-button>
      <el-button @click="reset" type="info">重 置</el-button>
    </div>

    <el-dialog
      :before-close="toCloseTable"
      :close-on-click-modal="false"
      :visible.sync="toShowTable"
      width="60%"
      title="添加奖励"
    >
      <!-- 卡券 -->
      <div>
        <div id="forHeader">
          <p class="listHeader">卡券列表</p>
          <el-form
            size="small"
            :model="COUPON_tableSearch"
            :rules="rules"
            label-width="80px"
            inline
          >
            <el-form-item style="margin-bottom:2px;" label="持续时间">
              <el-date-picker
                style="width:100%;"
                v-model="COUPON_tableSearch.time"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item style="margin-bottom:2px" label="卡券名称">
              <el-input v-model="COUPON_tableSearch.name"></el-input>
            </el-form-item>

            <el-form-item style="margin-bottom:2px;">
              <el-button size="mini" type="danger" @click="toSearch('COUPON')">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div id="forHeader" style="height:240px;">
          <isTable :inputData="COUPON_table" @tableEmit="tableEmit($event,'coupon')" />
        </div>
      </div>
      <!-- 红包 -->
      <div>
        <div id="forHeader">
          <p class="listHeader">红包列表</p>
          <el-form
            size="small"
            :model="PACKET_tableSearch"
            :rules="rules"
            label-width="80px"
            inline
          >
            <el-form-item style="margin-bottom:2px" label="红包名称">
              <el-input v-model="PACKET_tableSearch.name"></el-input>
            </el-form-item>

            <el-form-item style="margin-bottom:2px;">
              <el-button size="mini" type="danger" @click="toSearch('PACKET')">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div id="forHeader" style="height:240px;">
          <isTable :inputData="PACKET_table" @tableEmit="tableEmit($event,'packet')" />
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :before-close="toCloseTable"
      :close-on-click-modal="false"
      :visible.sync="toShowEdit"
      width="400px"
      title="编辑奖品"
    >
      <el-form
        ref="editForm"
        size="normal"
        :model="editForm"
        label-width="60px"
        label-suffix=":"
        class="isForm"
      >
        <el-form-item label="文本" class="is50">
          <el-input class="isInput" clearable placeholder="请输入" v-model="editForm.text1"></el-input>
        </el-form-item>
        <el-form-item label="图片1" class="is50">
          <imgUpload
            v-if="toShowEdit"
            :datas="{
                  url:'admin/file/up/member',
                  imgUrl:editForm.imgUrl1
                }"
            @selectImg="sharePageImg(1,$event)"
          />
        </el-form-item>
        <el-form-item label="图片2" class="is50">
          <imgUpload
            v-if="toShowEdit"
            :datas="{
                  url:'admin/file/up/member',
                  imgUrl:editForm.imgUrl2
                }"
            @selectImg="sharePageImg(2,$event)"
          />
        </el-form-item>
        <el-form-item label="链接" class="is50">
          <el-input class="isInput" clearable placeholder="请输入" v-model="editForm.link"></el-input>
        </el-form-item>
        <el-form-item label="描述" class="is50">
          <el-input
            class="wi"
            v-model="editForm.miaoshu"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="editDialogButtons">
        <el-button size="mini" type="primary" @click="saveEdit">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" type="info" @click="toCloseTable">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import isTable from "../../../../components/isTable/isTable.vue";
import imgUpload from "../../../../components/upImg.vue";

export default {
  components: {
    isTable,
    imgUpload
  },
  data() {
    return {
      forNum: 0, // 前端用来区分key
      toShowTable: false, // 选择奖励弹框
      toShowEdit: false, // 编辑奖励的
      setQIANDAO: false, // 签到奖励列表
      setLIANLIAN: false, // 连连看奖励列表
      whichAddJP: null, // 用来记录当前点击添加奖品的
      editForm: {
        // 点击编辑奖励时的弹框
        text1: "",
        imgUrl1: "",
        imgUrl2: "",
        link: "",
        miaoshu: ""
      },

      // 传给table子组件的数据
      COUPON_table: {
        pageSize: 40, // 分页相关
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
        // 红包
        // 传给table子组件的数据
        pageSize: 40, // 分页相关
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
      // 卡券列表的搜索
      COUPON_tableSearch: {
        name: "",
        time: []
      },
      // 红包列表的搜索
      PACKET_tableSearch: {
        name: "",
      },
      // 新建活动表单
      formData: {
        activityNo: "", // 活动编号
        activityType: "", // 活动类型
        activityName: "", // 活动名称
        description: "", // 活动规则说明
        awardList: [], // 保存奖励数据
        link: "" // 活动链接
      },
      // 活动奖励选项数据
      methodData: [
        {
          label: "签到有礼",
          value: "qiandao"
        },
        {
          label: "连连转",
          value: "lianlianzhuan"
        }
      ],
      // 活动奖励选项数据
      up_down: [
        {
          label: "上架",
          value: "YES"
        },
        {
          label: "下架",
          value: "NO"
        }
      ],
      //表单验证
      rules: {
        activityName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 64, message: "最多输入64个字", trigger: "blur" }
        ],
        activityNo: [
          { min: 1, max: 32, message: "最多输入32个字", trigger: "blur" },
          { required: true, message: "请输入活动编号", trigger: "blur" }
        ],
        time: [{ required: true, message: "请输入活动时间", trigger: "blur" }],
        description: [
          { required: true, message: "请输入活动规则说明", trigger: "blur" },
          { min: 1, max: 500, message: "最多输入500个字", trigger: "blur" }
        ],
        link: [
          { min: 1, max: 256, message: "最多输入256个字", trigger: "blur" },
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
    if (datas) {
      this.formData = datas;
      switch (this.formData.activityType) {
        case "qiandao":
          this.setQIANDAO = true;
          break;
        case "lianlianzhuan":
          this.setLIANLIAN = true;
          break;
      }
      this.$store.commit("set_asideState", { data: false });
      let kk = this.formData.awardList,
        numArr = [];
      if (kk.length > 0) {
        // 找到最大num值，对forNum进行初始化
        for (let i = 0; i < kk.length; i++) {
          if (kk[i].jiangpin.length > 0) {
            let jj = kk[i].jiangpin;
            for (let j = 0; j < jj.length; j++) {
              numArr.push(jj[j].num);
            }
          }
        }
        this.forNum = Math.max(...numArr) + 1;
      }
    }
    this.getTableData();
  },
  methods: {
    // 编辑奖励时的上传图片
    sharePageImg(num, data) {
      this.editForm[`imgUrl${num}`] = data.url;
    },
    // 获取红包、卡券列表数据
    getTableData() {
      this.COUPON_Search({
        pageSize: this.COUPON_table.pageSize,
        pageNum: this.COUPON_table.pageNum,
        time: []
      });
      this.PACKET_Search({
        pageSize: this.PACKET_table.pageSize,
        pageNum: this.PACKET_table.pageNum
      });
    },
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
          let obj = {
            num: +this.forNum++,
            name: type.data.name,
            zhongjiang: 4,
            moni: 6,
            data: type.data // 保存所选的卡券、红包的完整数据
          };
          this.whichAddJP.jiangpin.push(obj);
          break;
      }
    },
    // 卡券表格的查询
    COUPON_Search(searchData) {
      let obj = {
        pageSize: searchData.pageSize,
        pageNum: searchData.pageNum
      };
      if (searchData.time.length > 0) {
        let start = new Date(searchData.time[0]).getTime();
        let end = new Date(searchData.time[1]).getTime();
        obj.startTime = start;
        obj.endTime = end;
      }
      if (searchData.name) {
        obj.name = searchData.name;
      }
      this.$api
        .market_create_getCouponList({
          vm: this,
          data: obj
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
          }
        });
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
          }
        });
    },
    // 奖励类型切换
    changeActType() {
      this.setQIANDAO = false;
      this.setLIANLIAN = false;
      this.formData.awardList = [];
      switch (this.formData.activityType) {
        case "qiandao":
          this.setQIANDAO = true;
          let obj1 = {
            name: "大转盘",
            renshu: 5,
            jine: 3,
            tianshu: 7,
            isUse: false,
            jiangpin: []
          };
          let obj2 = {
            name: "签到-连续",
            renshu: 2,
            jine: 2,
            tianshu: 2,
            isUse: false,
            jiangpin: []
          };

          this.formData.awardList.push(obj1, obj2);
          break;
        case "lianlianzhuan":
          this.setLIANLIAN = true;
          let obj3 = {
            name: "邀新实名-每人",
            renshu: 2,
            jine: 2,
            tianshu: 2,
            isUse: false,
            jiangpin: []
          };
          let obj4 = {
            name: "邀新实名-累计",
            renshu: 2,
            jine: 3,
            tianshu: 3,
            isUse: false,
            jiangpin: []
          };
          let obj5 = {
            name: "邀新实名-累计",
            renshu: 5,
            jine: 4,
            tianshu: 6,
            isUse: false,
            jiangpin: []
          };
          let obj6 = {
            name: "邀新投资-每人",
            renshu: 7,
            jine: 8,
            tianshu: 5,
            isUse: false,
            jiangpin: []
          };
          let obj7 = {
            name: "邀新注册-循环",
            renshu: 9,
            jine: 3,
            tianshu: 8,
            isUse: false,
            jiangpin: []
          };

          this.formData.awardList.push(obj3, obj4, obj5, obj6, obj7);
          break;
      }
      if (this.formData.activityType) {
        this.$store.commit("set_asideState", { data: false });
      } else {
        this.$store.commit("set_asideState", { data: true });
      }
    },
    // 点击添加奖品
    addJiangPin(item) {
      this.whichAddJP = item;
      this.toShowTable = true; // 添加奖励弹框
    },
    // 删除奖励
    deleteJiangli(num, item) {
      this.formData.awardList[num].jiangpin = this.formData.awardList[
        num
      ].jiangpin.filter(tar => tar.num != item.num);
    },
    // 编辑奖励
    editJiangli(item) {
      this.whichAddJP = item;
      if (item.hasEdit) {
        this.editForm = item.hasEdit;
      }
      this.toShowEdit = true;
    },
    // 编辑弹框的保存
    saveEdit() {
      this.whichAddJP["hasEdit"] = JSON.parse(JSON.stringify(this.editForm));
      this.toCloseTable();
    },
    // 关闭红包、卡券的选择弹框
    toCloseTable() {
      this.whichAddJP = null;
      this.toShowTable = false; // 添加奖励弹框
      this.toShowEdit = false; // 编辑奖励弹框
      this.editForm = {
        text1: "",
        imgUrl1: "",
        imgUrl2: "",
        link: "",
        miaoshu: ""
      };
    },
    // 重置
    reset() {
      this.$refs.formData.resetFields();
      // 卡券列表的搜索
      this.COUPON_tableSearch = {
        name: "",
        time: []
      };
      // 红包列表的搜索
      this.PACKET_tableSearch = {
        name: "",
      };
      this.setQIANDAO = false;
      this.setLIANLIAN = false;
      this.formData = {
        activityType: "",
        activityName: "", // 活动名称
        time: "",
        UP: "", // 活动状态
        awardList: [], // 活动奖励
        description: "", // 活动规则说明
        link: "" // 活动链接
      };
    },
    // 下一步
    step() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          sessionStorage.setItem("step1Data", JSON.stringify(this.formData));
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
.listHeader {
  font-size: 18px;
  font-weight: bold;
}
.isTable {
  border: 1px solid;
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid #c9c5c5;
  border-collapse: collapse;
  text-align: center;
}
th {
  font-size: 14px;
  background: rgba(125, 183, 237, 0.15);
}
td {
  font-size: 14px;
}
tr,
td {
  padding: 4px 0;
}
.editDialogButtons {
  display: flex;
  justify-content: center;
}
.hasAfter {
  position: relative;
}
.hasAfter > span {
  position: absolute;
  right: 8px;
  top: 7px;
  font-weight: bold;
}
</style>
