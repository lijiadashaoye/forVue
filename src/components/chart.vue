<template>
  <div id="chartWap">
    <div v-if='showWhich'>
      <p class="stepsTopsP">交易规则</p>
      <ul class="stepsTops">
        <li
          v-for="(item,index) in stepsTop.table"
          :key="index"
        >
          <span>{{item.title}}</span>
          <span>{{item.num}}</span>
        </li>
      </ul>
      <el-steps
        :active="stepsTop.steps.length"
        align-center
      >
        <el-step
          v-for="(item,index) in stepsTop.steps"
          :key="index"
          :title="item.title"
          :description="item.text"
        ></el-step>
      </el-steps>

    </div>

    <div v-else>
      <div class="chartWaper">
        <div>
          <div class='chartTop'>
            <div>
              <span
                class="isChartTitleDate"
                title='以当日最后更新数据为准'
              >
                今日:{{today}}
              </span>
              <span class="showNum1">{{ruleForm.danweijingzhi}}</span>
              <span class="showNum2">{{ruleForm.leijingjingzhi}}</span>
            </div>
            <el-button
              style="margin-top:10px;"
              size="mini"
              @click="bianjieDialog = true"
            >
              更新
            </el-button>
          </div>
          <ve-line
            :data="chartDatas"
            v-bind='{"height": "240px","width":"103%"}'
          ></ve-line>
        </div>
        <div>
          <el-radio-group
            v-model="radioBtn.checked"
            size="mini"
            class="radioGroup"
            @change="changeFn($event)"
          >
            <el-radio-button
              class="setRadioBtn"
              v-for='(item,index) in radioBtn.buttons'
              :key="index"
              :label="item.name"
            ></el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <div class="show_time">
        <span class="isUpTime">
          更新时间：
          {{pageInfo.createTime}}
          &nbsp;
          {{pageInfo.who}}
        </span>
      </div>
    </div>
    <el-dialog :close-on-click-modal='false'
      title="编辑"
      :visible.sync="bianjieDialog"
      width="380px"
      :before-close="toClosebianjieDialog"
    >
      <el-form
        v-if='ruleForm'
        :inline="true"
        size="normal"
        :model="ruleForm"
        label-width="90px"
      >
        <el-form-item :label="dialogLabel[0]">
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.danweijingzhi"
            @input="isChange=false"
            type='number'
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="dialogLabel[1]">
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.leijingjingzhi"
            @input="isChange=false"
            type='number'
          >
          </el-input>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          :disabled="isChange"
          @click="save()"
          type="primary"
        >更 新</el-button>
        <el-button @click="toClosebianjieDialog">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import xiangqingDatas from "./isData.js";
import VCharts from "v-charts";
import VeLine from "v-charts/lib/line";
import Vue from "vue";

export default {
  props: ["pageData"],
  data() {
    return {
      pageInfo: null, // 页面用到的信息
      chartDatas: {},
      radioBtn: {
        buttons: null,
        checked: null
      },
      today: "", // 记录页面打开日期
      bianjieDialog: false, // 更新弹框
      ruleForm: {
        // 更新按钮弹出框
        danweijingzhi: "21.2",
        leijingjingzhi: "22.5"
      },
      isChange: true, // 控制数据是否可以提交
      dialogLabel: [],
      stepsTop: null, // 步骤条数据
      showWhich: null // 控制显示图表还是进度条
    };
  },
  created() {
    Vue.use(VCharts);

    if (this.pageData.page === "manage_money_matters") {
      this.showWhich = true;
      this.stepsTop = { ...this.pageData.forChart };
    } else {
      this.showWhich = false;
      this.today = new Date().toLocaleDateString();
      this.pageInfo = this.pageData.forChart;
      console.log(this.pageData);
      this.radioBtn = {
        buttons:
          //         this.pageData.map(item=>{
          //           let obj={
          // id: '0',
          //             name: '最近一个月'
          //           }
          //         })
          [
            {
              id: "0",
              name: "最近一个月"
            },
            {
              id: "1",
              name: "最近一季"
            },
            {
              id: "2",
              name: "最近半年"
            },
            {
              id: "3",
              name: "最近一年"
            },
            {
              id: "4",
              name: "今年"
            }
          ],
        checked: [...this.pageInfo.chartList][0]["name"]
      };
      this.chartDatas = { ...this.pageInfo.chartData.data0 };
      // console.log(this.chartDatas)
      this.dialogLabel = this.chartDatas.columns.slice(1);
    }
  },
  methods: {
    // 切换图表
    changeFn(da) {
      this.radioBtn.buttons.forEach(item => {
        if (item.name === da) {
          let data = this.pageInfo.chartData;
          this.chartDatas = { ...data[`data${item.id}`] };
          this.dialogLabel = this.chartDatas.columns.slice(1);
        }
      });
    },
    // 关闭弹框
    toClosebianjieDialog() {
      this.bianjieDialog = false;
      this.isChange = true;
    },
    // 保存更新数据
    save() {
      console.log(this.ruleForm);
      // this.toClosebianjieDialog();
    }
  }
};
</script>
<style>
@import url("./allCss.scss");
</style>
