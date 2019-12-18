<template>
  <div class="AddTiaoJianPage">
    <div class="pageTop">
      <p>配置条件</p>
      <i class="el-icon-close" @click="close"></i>
    </div>
    <div style="height:calc(100% - 43px);overflow: auto;padding:15px;min-width: 950px;">
      <el-form ref="ruleForm" :model="ruleForm" label-width="124px" label-suffix="：">
        <el-form-item label="配置可见条件" style="margin-bottom:5px;">
          <el-radio-group v-model="ruleForm.canSee">
            <el-radio label="可见条件"></el-radio>
            <el-radio label="不可见条件"></el-radio>
          </el-radio-group>
        </el-form-item>

        <p class="pagePart">用户管理配置</p>

        <el-form-item label="年龄">
          <div class="setCunQi">
            <p v-if="hasError.age.act" class="hasError">{{hasError.age.content}}</p>
            <el-select
              filterable
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.minAge_symbol"
              style="width:15%;flex-shrink:0;"
              @change="validAge"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-input
              min="0"
              max="9999999999"
              size="mini"
              @input="validAge"
              type="number"
              style="width:15%;flex-shrink:0;"
              v-model="ruleForm.minAge"
              placeholder="请输入"
            ></el-input>
            <span class="ageBack">岁</span>
            <el-radio-group v-model="ruleForm.age_fuhao" size="mini" @change="validAge">
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select
              filterable
              size="mini"
              @change="validAge"
              placeholder="限制条件"
              v-model="ruleForm.maxAge_symbol"
              style="width:15%;flex-shrink:0;"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-input
              min="0"
              max="9999999999"
              size="mini"
              @input="validAge"
              type="number"
              style="width:15%;flex-shrink:0;"
              v-model="ruleForm.maxAge"
              placeholder="最大期限"
            ></el-input>
            <span class="ageBack">岁</span>

            <el-button size="mini" type="info" @click="resetAge" class="resetBtn">重 置</el-button>
          </div>
        </el-form-item>

        <p style="font-size: 14px;color: #606266;padding-bottom:10px;">
          比财注册状态与时间:
          <el-button size="mini" type="info" @click="resetSta" class="resetBtn">重 置</el-button>
        </p>
        <div class="forSta">
          <el-form-item label="状态" style="margin-bottom:0;">
            <el-radio-group v-model="ruleForm.statue">
              <el-radio label="已注册"></el-radio>
              <el-radio label="未注册"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="配置时间" style="  position: relative;">
            <p v-if="hasError.time.act" class="hasError">{{hasError.time.content}}</p>

            <el-select
              :disabled="!ruleForm.statue"
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.time1_symbol"
              style="width:12%;flex-shrink:0;"
              @change="validStatue"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              :disabled="!ruleForm.statue"
              v-model="ruleForm.time1"
              size="mini"
              type="datetime"
              @change="validStatue"
              placeholder="请选择时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio-group
              :disabled="!ruleForm.statue"
              v-model="ruleForm.time1_time2"
              size="mini"
              @change="validStatue"
            >
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select
              filterable
              :disabled="!ruleForm.statue"
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.time2_symbol"
              style="width:12%;flex-shrink:0;"
              @change="validStatue"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              :disabled="!ruleForm.statue"
              v-model="ruleForm.time2"
              @change="validStatue"
              size="mini"
              type="datetime"
              placeholder="请选择时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item style="margin-bottom:5px;" label="比财实名状态">
          <el-radio-group v-model="ruleForm.realName">
            <el-radio label="已实名"></el-radio>
            <el-radio label="未实名"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.realName=''" class="resetBtn">重 置</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="比财开户状态">
          <el-radio-group v-model="ruleForm.kaihu">
            <el-radio label="已开户"></el-radio>
            <el-radio label="未开户"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.kaihu=''" class="resetBtn">重 置</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="比财投资状态">
          <el-radio-group v-model="ruleForm.touzi">
            <el-radio label="已投资"></el-radio>
            <el-radio label="未投资"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.touzi=''" class="resetBtn">重 置</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;" label="比财持仓状态">
          <el-radio-group v-model="ruleForm.chicang">
            <el-radio label="已持仓"></el-radio>
            <el-radio label="未持仓"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.chicang=''" class="resetBtn">重 置</el-button>
        </el-form-item>

        <el-form-item label="比财持仓金额">
          <div class="setCunQi">
            <p v-if="hasError.chicang.act" class="hasError">{{hasError.chicang.content}}</p>
            <el-select
              filterable
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.minChiCang_symbol"
              style="width:15%;flex-shrink:0;"
              @change="validChiCang"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-tooltip
              :content="danwei(ruleForm.minChiCang).content"
              placement="bottom"
              effect="light"
              manual
              :value="danwei(ruleForm.minChiCang).show"
            >
              <el-input
                min="0"
                max="9999999999"
                size="mini"
                @input="validChiCang"
                type="number"
                style="width:15%;flex-shrink:0;"
                v-model="ruleForm.minChiCang"
                placeholder="请输入金额"
              ></el-input>
            </el-tooltip>

            <span class="ageBack">元</span>
            <el-radio-group v-model="ruleForm.ChiCang_fuhao" size="mini" @change="validChiCang">
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select
              filterable
              size="mini"
              @change="validChiCang"
              placeholder="限制条件"
              v-model="ruleForm.maxChiCang_symbol"
              style="width:15%;flex-shrink:0;"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-tooltip
              :content="danwei(ruleForm.maxChiCang).content"
              placement="bottom"
              effect="light"
              manual
              :value="danwei(ruleForm.maxChiCang).show"
            >
              <el-input
                min="0"
                max="9999999999"
                size="mini"
                @input="validChiCang"
                type="number"
                style="width:15%;flex-shrink:0;"
                v-model="ruleForm.maxChiCang"
                placeholder="请输入金额"
              ></el-input>
            </el-tooltip>

            <span class="ageBack">元</span>
            <el-button size="mini" type="info" @click="resetChiCang" class="resetBtn">重 置</el-button>
          </div>
        </el-form-item>

        <p style="font-size: 14px;color: #606266;padding-bottom:10px;">
          本银行开户状态与时间:
          <el-button size="mini" type="info" @click="resetBank" class="resetBtn">重 置</el-button>
        </p>
        <div class="forSta">
          <el-form-item label="状态" style="margin-bottom:0;">
            <el-radio-group v-model="ruleForm.bankStatue">
              <el-radio label="已开户"></el-radio>
              <el-radio label="未开户"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="配置时间" style="  position: relative;">
            <p v-if="hasError.bank.act" class="hasError">{{hasError.bank.content}}</p>

            <el-select
              filterable
              :disabled="!ruleForm.bankStatue"
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.bank1_symbol"
              style="width:12%;flex-shrink:0;"
              @change="validBankStatue"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-date-picker
              :disabled="!ruleForm.bankStatue"
              v-model="ruleForm.bank1"
              size="mini"
              type="datetime"
              @change="validBankStatue"
              placeholder="请选择时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio-group
              :disabled="!ruleForm.bankStatue"
              v-model="ruleForm.bank1_bank2"
              size="mini"
              @change="validBankStatue"
            >
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select
              filterable
              :disabled="!ruleForm.bankStatue"
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.bank2_symbol"
              style="width:12%;flex-shrink:0;"
              @change="validBankStatue"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-date-picker
              :disabled="!ruleForm.bankStatue"
              v-model="ruleForm.bank2"
              @change="validBankStatue"
              size="mini"
              type="datetime"
              placeholder="请选择时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item style="margin-bottom:5px;" label="本银行投资状态">
          <el-radio-group v-model="ruleForm.bankTouZi">
            <el-radio label="已投资"></el-radio>
            <el-radio label="未投资"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.bankTouZi=''" class="resetBtn">重 置</el-button>
        </el-form-item>

        <el-form-item style="margin-bottom:5px;" label="本银行持仓状态">
          <el-radio-group v-model="ruleForm.bankChiCang">
            <el-radio label="有持仓"></el-radio>
            <el-radio label="无持仓"></el-radio>
          </el-radio-group>
          <el-button size="mini" type="info" @click="ruleForm.bankChiCang=''" class="resetBtn">重 置</el-button>
        </el-form-item>

        <el-form-item label="本银行持仓金额">
          <div class="setCunQi">
            <p v-if="hasError.bankChiCang.act" class="hasError">{{hasError.bankChiCang.content}}</p>
            <el-select
              filterable
              size="mini"
              placeholder="限制条件"
              v-model="ruleForm.minBankChiCang_symbol"
              style="width:15%;flex-shrink:0;"
              @change="validBankChiCang"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-tooltip
              :content="danwei(ruleForm.minBankChiCang).content"
              placement="bottom"
              effect="light"
              manual
              :value="danwei(ruleForm.minBankChiCang).show"
            >
              <el-input
                min="0"
                max="9999999999"
                size="mini"
                @input="validBankChiCang"
                type="number"
                style="width:15%;flex-shrink:0;"
                v-model="ruleForm.minBankChiCang"
                placeholder="请输入金额"
              ></el-input>
            </el-tooltip>
            <span class="ageBack">元</span>
            <el-radio-group
              v-model="ruleForm.bankChiCang_fuhao"
              size="mini"
              @change="validBankChiCang"
            >
              <el-radio-button label="且"></el-radio-button>
              <el-radio-button label="或"></el-radio-button>
            </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select
              filterable
              size="mini"
              @change="validBankChiCang"
              placeholder="限制条件"
              v-model="ruleForm.maxBankChiCang_symbol"
              style="width:15%;flex-shrink:0;"
            >
              <el-option
                v-for="item in dictData.forAge"
                :key="item.value"
                :label="item.fuhao +' '+ item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;
            <el-tooltip
              :content="danwei(ruleForm.maxBankChiCang).content"
              placement="bottom"
              effect="light"
              manual
              :value="danwei(ruleForm.maxBankChiCang).show"
            >
              <el-input
                min="0"
                max="9999999999"
                size="mini"
                @input="validBankChiCang"
                type="number"
                style="width:15%;flex-shrink:0;"
                v-model="ruleForm.maxBankChiCang"
                placeholder="请输入金额"
              ></el-input>
            </el-tooltip>

            <span class="ageBack">元</span>
            <el-button size="mini" type="info" @click="resetBankChiCang" class="resetBtn">重 置</el-button>
          </div>
        </el-form-item>

        <p class="canDelete">
          限制地域:
          <el-button size="mini" type="info" @click="resetArea" class="resetBtn">重 置</el-button>
        </p>

        <el-form-item label-width="0" style="margin-bottom:0;">
          <div>
            <div
              v-for="tar in ruleForm.areaTJ"
              :key="tar.num"
              :class="{'selectList2':env,'selectList1':!env,'selectList':true}"
            >
              <div>
                <div class="hasadd">
                  <p>省份：</p>
                  <p>
                    <span>{{tar.sheng.name}}</span>
                  </p>
                </div>
                <div class="hasadd">
                  <p>市区：</p>
                  <p>
                    <span v-for="shi in tar.shi" :key="shi.adcode">{{shi.name}}</span>
                  </p>
                </div>
                <div class="hasadd">
                  <p>条件：</p>
                  <p>
                    <span v-for="tiao in tar.tiaojian" :key="tiao">{{tiao}}</span>
                  </p>
                </div>
              </div>
              <div style="width:60px; flex-shrink: 0;">
                <i
                  class="el-icon-edit isI"
                  @click="areaAction({ type: 'edit', data: tar })"
                  title="编辑"
                ></i>
                <i
                  class="el-icon-delete isI"
                  @click="areaAction({ type: 'delete', data: tar })"
                  title="删除"
                ></i>
              </div>
            </div>
          </div>
          <Area @areaAction="areaAction" ref="child" />
        </el-form-item>
        <div class="add_new_area" @click="areaAction({type:'add'})">
          <p style="padding:5px;">
            <span v-if="isAdd">新增限制地域</span>
            <span v-else style="color:red;">保存数据</span>
          </p>
          <span v-if="hasError.canDelete.act">{{hasError.canDelete.content}}</span>
        </div>
        <div v-if="yingxiaoDatas">
          <p class="pagePart">
            营销管理配置
            <span>(*以下条件至少配置一项)</span>
            <el-button size="mini" type="primary" @click="selectAll">以下全选</el-button>
          </p>

          <p style="font-size: 14px;color: #606266;padding-bottom:10px;">
            产品展示位置与时间:
            <el-button size="mini" type="info" @click="resetSide" class="resetBtn">重 置</el-button>
          </p>

          <div class="forSta">
            <el-form-item :label="`${type==='bank'?'银行展示':'产品展示'}位置`" style="margin-bottom:0;">
              <el-select
                v-if="type==='bank'"
                multiple
                filterable
                size="mini"
                placeholder="限制条件"
                v-model="ruleForm.side"
                style="width:50%"
                @change="timeAction({type:'new'})"
              >
                <el-option
                  v-for="item in yingxiaoDatas.weizhi_bank"
                  :key="item.positionNo"
                  :label="item.positionTitle"
                  :value="item.positionNo"
                ></el-option>
              </el-select>

              <el-select
                v-if="type==='bank_product'"
                multiple
                filterable
                size="mini"
                placeholder="限制条件"
                v-model="ruleForm.side"
                style="width:50%"
                @change="timeAction({type:'new'})"
              >
                <el-option
                  v-for="item in yingxiaoDatas.weizhi_product"
                  :key="item.positionNo"
                  :label="item.positionTitle"
                  :value="item.positionNo"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="时间" style="  position: relative;">
              <div class="setTime" v-if="ruleForm.time.length>0">
                <TimeSide
                  ref="sideTime"
                  @timeaction="timeAction"
                  v-for="tar in ruleForm.time"
                  :key="tar.num"
                  :inData="tar"
                />
              </div>
              <div class="add_new_area" @click="timeAction({type:'add'})" style="padding:0;">
                <p>
                  <span v-if="timeChange">新增限制位置时间</span>
                  <span v-else style="color:red;">保存数据</span>
                </p>
                <span v-if="hasError.sideTime.act">{{hasError.sideTime.content}}</span>
              </div>
            </el-form-item>
          </div>

          <el-form-item label="广告位">
            <el-select
              filterable
              multiple
              size="mini"
              placeholder="请选择广告位"
              v-model="ruleForm.ad_side"
              style="width:50%"
            >
              <el-option
                v-for="item in yingxiaoDatas.guangao"
                :key="item.positionNo"
                :label="item.positionTitle"
                :value="item.positionNo"
              ></el-option>
            </el-select>
            <el-button size="mini" type="info" @click="ruleForm.ad_side=[]" class="resetBtn">重 置</el-button>
          </el-form-item>
          <el-form-item label="活动">
            <el-select
              filterable
              multiple
              size="mini"
              placeholder="请选择活动"
              v-model="ruleForm.active"
              style="width:50%;"
            >
              <el-option
                v-for="item in yingxiaoDatas.huodong"
                :key="item.positionNo"
                :label="item.positionTitle"
                :value="item.positionNo"
              ></el-option>
            </el-select>
            <el-button size="mini" type="info" @click="ruleForm.active=[]" class="resetBtn">重 置</el-button>
          </el-form-item>
          <el-form-item label="内容">
            <el-select
              filterable
              multiple
              size="mini"
              placeholder="请选择内容"
              v-model="ruleForm.content"
              style="width:50%"
            >
              <el-option
                v-for="item in yingxiaoDatas.neirong"
                :key="item.positionNo"
                :label="item.positionTitle"
                :value="item.positionNo"
              ></el-option>
            </el-select>
            <el-button size="mini" type="info" @click="ruleForm.content=[]" class="resetBtn">重 置</el-button>
          </el-form-item>

          <el-form-item label="创新层">
            <el-radio-group v-model="ruleForm.chuang" size="mini">
              <el-radio label="组合购买"></el-radio>
            </el-radio-group>
            <el-button size="mini" type="info" @click="ruleForm.chuang=''" class="resetBtn">重 置</el-button>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button size="mini" type="primary" @click="save">保存</el-button>
          <el-button size="mini" type="info" @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Area from "./area.vue";
import TimeSide from "./time_side.vue";
export default {
  props: {
    type: String,
    forEdit: Object
  },
  components: { Area, TimeSide },
  data() {
    return {
      time: null,
      env: "",
      pageName: "",
      num: 1,
      isAdd: true, // 监听限制地域的数据变动
      timeChange: true, // 监听产品展示位置与时间数据变动，true为新增
      hasError: {
        // 页面内各种验证的错误提示
        age: {
          // 年龄
          act: false,
          content: ""
        },
        time: {
          // 比财注册状态与时间
          act: false,
          content: ""
        },
        chicang: {
          // 比财持仓金额
          act: false,
          content: ""
        },
        bank: {
          // 本银行开户状态与时间
          act: false,
          content: ""
        },
        bankChiCang: {
          // 本银行持仓金额
          act: false,
          content: ""
        },
        canDelete: {
          // 限制地域的错误提示
          act: false,
          content: ""
        },
        sideTime: {
          // 产品展示位置与时间的错误提示
          act: false,
          content: ""
        }
      },
      ruleForm: {
        // 用户管理配置
        canSee: "可见条件", // 可见条件

        minAge: "", // 左边年龄
        minAge_symbol: "", // 左边年龄的符号
        maxAge: "", // 右边年龄
        maxAge_symbol: "", // 右边年龄的符号
        age_fuhao: "", // 中间的且、或

        statue: "", // 比财注册状态与时间
        time1: "", // 左边的时间
        time1_symbol: "", // 左边时间的符号
        time2: "", // 右边的时间
        time2_symbol: "", // 右边时间的符号
        time1_time2: "", // 时间中间的且或

        realName: "", //比财实名状态
        kaihu: "", //比财开户状态
        touzi: "", //比财投资状态

        chicang: "", //比财持仓状态
        minChiCang: "", // 左边持仓金额
        minChiCang_symbol: "", // 左边持仓的符号
        maxChiCang: "", // 右边持仓金额
        maxChiCang_symbol: "", // 右边持仓的符号
        ChiCang_fuhao: "", // 中间的且、或

        bankStatue: "", // 本银行开户状态与时间
        bank1: "", // 左边的时间
        bank1_symbol: "", // 左边时间的符号
        bank2: "", // 右边的时间
        bank2_symbol: "", // 右边时间的符号
        bank1_bank2: "", // 时间中间的且或

        minBankChiCang: "", // 左边持仓
        minBankChiCang_symbol: "", // 左边持仓的符号
        maxBankChiCang: "", // 右边持仓
        maxBankChiCang_symbol: "", // 右边持仓的符号
        bankChiCang_fuhao: "", // 中间的且、或

        bankTouZi: "", //本银行投资状态
        bankChiCang: "", //本银行持仓状态
        areaTJ: [], //地域限制条件
        // 营销管理配置
        side: [], // 位置
        time: [], // 时间数据
        ad_side: [], // 广告位
        active: [], // 活动
        content: [], // 内容
        chuang: "" // 创新层
      },
      // 暂存产品展示位置与时间之前的位置数据
      sideTimeBefore: [],

      yingxiaoDatas: null // 营销管理配置各个下拉列表的数据集合
    };
  },
  created() {
    this.num = this.forEdit.num + 1;
    this.env = sessionStorage.getItem("env") === "development";
    this.pageName = sessionStorage.getItem("page"); // 获取页面名称
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));

    this.$store.state.areaList = this.dictData.china;
    this.forYingXiaoSet();

    if (this.forEdit.tiaojian.length > 0) {
      // 编辑
      this.ruleForm = { ...this.zhuanhuan(false, this.forEdit) };
      this.toResetList();
    }
  },
  methods: {
    // 对数据进行转化
    zhuanhuan(type, data) {
      if (type) {
        // 将本页面生成的数据转换为方便上一个页面显示用
        let tiaojian = [];
        tiaojian = [
          {
            text: "年龄",
            showDatas: [],
            data: {
              minAge: data.minAge, // 左边年龄
              minAge_symbol: data.minAge_symbol, // 左边年龄的符号
              maxAge: data.maxAge, // 右边年龄
              maxAge_symbol: data.maxAge_symbol, // 右边年龄的符号
              age_fuhao: data.age_fuhao // 中间的且、或
            }
          },
          {
            text: "比财注册状态与时间",
            showDatas: [],
            data: {
              statue: data.statue, // 比财注册状态与时间
              time1: data.time1, // 左边的时间
              time1_symbol: data.time1_symbol, // 左边时间的符号
              time2: data.time2, // 右边的时间
              time2_symbol: data.time2_symbol, // 右边时间的符号
              time1_time2: data.time1_time2 // 时间中间的且或
            }
          },
          {
            text: "比财实名状态",
            showDatas: [],
            data: {
              realName: data.realName //比财实名状态
            }
          },
          {
            text: "比财开户状态",
            showDatas: [],
            data: {
              kaihu: data.kaihu //比财开户状态
            }
          },
          {
            text: "比财投资状态",
            showDatas: [],
            data: {
              touzi: data.touzi //比财投资状态
            }
          },
          {
            text: "比财持仓状态",
            showDatas: [],
            data: {
              chicang: data.chicang //比财持仓状态
            }
          },
          {
            text: "比财持仓金额",
            showDatas: [],
            data: {
              minChiCang: data.minChiCang, // 左边持仓金额
              minChiCang_symbol: data.minChiCang_symbol, // 左边持仓的符号
              maxChiCang: data.maxChiCang, // 右边持仓金额
              maxChiCang_symbol: data.maxChiCang_symbol, // 右边持仓的符号
              ChiCang_fuhao: data.ChiCang_fuhao // 中间的且、或
            }
          },
          {
            text: "本银行开户状态与时间",
            showDatas: [],
            data: {
              bankStatue: data.bankStatue, // 本银行开户状态与时间
              bank1: data.bank1, // 左边的时间
              bank1_symbol: data.bank1_symbol, // 左边时间的符号
              bank2: data.bank2, // 右边的时间
              bank2_symbol: data.bank2_symbol, // 右边时间的符号
              bank1_bank2: data.bank1_bank2 // 时间中间的且或
            }
          },
          {
            text: "本银行持仓金额",
            showDatas: [],
            data: {
              minBankChiCang: data.minBankChiCang, // 左边持仓
              minBankChiCang_symbol: data.minBankChiCang_symbol, // 左边持仓的符号
              maxBankChiCang: data.maxBankChiCang, // 右边持仓
              maxBankChiCang_symbol: data.maxBankChiCang_symbol, // 右边持仓的符号
              bankChiCang_fuhao: data.bankChiCang_fuhao // 中间的且、或
            }
          },
          {
            text: "本银行投资状态",
            showDatas: [],
            data: {
              bankTouZi: data.bankTouZi //本银行投资状态
            }
          },
          {
            text: "本银行持仓状态",
            showDatas: [],
            data: {
              bankChiCang: data.bankChiCang //本银行持仓状态
            }
          },

          {
            text: "限制地域",
            showDatas: [],
            data: {
              areaTJ: data.areaTJ //限制地域
            }
          },
          {
            text: "产品展示位置与时间", // 标题
            showDatas: [], // 用来展示的数据
            data: {
              side: data.side, // 位置
              time: data.time // 时间数据
            }
          },
          {
            text: "广告位",
            showDatas: [],
            data: {
              ad_side: data.ad_side //广告位
            }
          },
          {
            text: "活动",
            showDatas: [],
            data: {
              active: data.active //活动
            }
          },
          {
            text: "内容",
            showDatas: [],
            data: {
              content: data.content //内容
            }
          },
          {
            text: "创新层",
            showDatas: [],
            data: {
              chuang: data.chuang //比财实名状态
            }
          }
        ];
        tiaojian.forEach(item => {
          item["num"] = ++this.num;
          switch (item.text) {
            case "年龄":
              if (data.minAge) {
                let str = "",
                  fuhao1 = this.dictData.forAge.filter(
                    tar => tar.value === data.minAge_symbol
                  )[0].fuhao;
                if (data.age_fuhao) {
                  let fuhao2 = this.dictData.forAge.filter(
                    tar => tar.value === data.maxAge_symbol
                  )[0].fuhao;

                  str = `${fuhao1}${data.minAge}岁 ${data.age_fuhao} ${fuhao2}${data.maxAge}岁`;
                } else {
                  str = `${fuhao1}${data.minAge}岁`;
                }
                item.showDatas.push(str);
              }
              break;
            case "比财注册状态与时间":
              if (data.statue) {
                let fuhao1 = this.dictData.forAge.filter(
                  tar => tar.value === data.time1_symbol
                )[0].fuhao;

                if (data.time1_time2) {
                  let fuhao2 = this.dictData.forAge.filter(
                    tar => tar.value === data.time2_symbol
                  )[0].fuhao;

                  item.showDatas.push(
                    `状态:${data.statue}，`,
                    `时间:${fuhao1}${data.time1} ${data.time1_time2} ${fuhao2}${data.time2}`
                  );
                } else {
                  item.showDatas.push(
                    `状态:${data.statue}，`,
                    `时间:${fuhao1} ${data.time1}`
                  );
                }
              }
              break;
            case "比财实名状态":
              if (data.realName) {
                item.showDatas.push(data.realName);
              }
              break;
            case "比财开户状态":
              if (data.kaihu) {
                item.showDatas.push(data.kaihu);
              }
              break;
            case "比财投资状态":
              if (data.touzi) {
                item.showDatas.push(data.touzi);
              }
              break;
            case "比财持仓状态":
              if (data.chicang) {
                item.showDatas.push(data.chicang);
              }
              break;
            case "比财持仓金额":
              if (data.minChiCang) {
                let str = "",
                  fuhao1 = this.dictData.forAge.filter(
                    tar => tar.value === data.minChiCang_symbol
                  )[0].fuhao;

                if (data.ChiCang_fuhao) {
                  // 设置了两个年龄数据
                  let fuhao2 = this.dictData.forAge.filter(
                    tar => tar.value === data.maxChiCang_symbol
                  )[0].fuhao;
                  str = `${fuhao1}${data.minChiCang}元 ${data.ChiCang_fuhao} ${fuhao2}${data.maxChiCang}元`;
                } else {
                  str = `${fuhao1}${data.minChiCang}元`;
                }
                item.showDatas.push(str);
              }
              break;
            case "本银行开户状态与时间":
              if (data.bankStatue) {
                let fuhao1 = this.dictData.forAge.filter(
                  tar => tar.value === data.bank1_symbol
                )[0].fuhao;

                if (data.bank1_bank2) {
                  // 设置了两个时间数据
                  let fuhao2 = this.dictData.forAge.filter(
                    tar => tar.value === data.bank2_symbol
                  )[0].fuhao;

                  item.showDatas.push(
                    `状态:${data.bankStatue}`,
                    `时间:${fuhao1}${data.bank1} ${data.bank1_bank2} ${fuhao2}${data.bank2}`
                  );
                } else {
                  item.showDatas.push(
                    `状态:${data.bankStatue}`,
                    `时间:${fuhao1} ${data.bank1}`
                  );
                }
              }
              break;
            case "本银行持仓金额":
              if (data.minBankChiCang) {
                let str = "",
                  fuhao1 = this.dictData.forAge.filter(
                    tar => tar.value === data.minBankChiCang_symbol
                  )[0].fuhao;

                if (data.ChiCang_fuhao) {
                  let fuhao2 = this.dictData.forAge.filter(
                    tar => tar.value === data.maxBankChiCang_symbol
                  )[0].fuhao;
                  str = `${fuhao1}${data.minBankChiCang}元 ${data.ChiCang_fuhao} ${fuhao2}${data.maxBankChiCang}元`;
                } else {
                  str = `${fuhao1}${data.minBankChiCang}元`;
                }
                item.showDatas.push(str);
              }
              break;

            case "本银行投资状态":
              if (data.bankTouZi) {
                item.showDatas.push(data.bankTouZi);
              }
              break;
            case "本银行持仓状态":
              if (data.bankChiCang) {
                item.showDatas.push(data.bankChiCang);
              }
              break;
            case "广告位":
              if (data.ad_side.length > 0) {
                item.showDatas.push(data.ad_side.join("、"));
              }
              break;
            case "活动":
              if (data.active.length > 0) {
                item.showDatas.push(data.active.join("、"));
              }
              break;
            case "内容":
              if (data.content.length > 0) {
                item.showDatas.push(data.content.join("、"));
              }
              break;
            case "创新层":
              if (data.chuang) {
                item.showDatas.push(data.chuang);
              }
              break;
            case "限制地域":
              if (data.areaTJ.length > 0) {
                data.areaTJ.forEach(tar => {
                  item.showDatas = data.areaTJ;
                });
              }
              break;
            case "产品展示位置与时间":
              if (data.side.length > 0) {
                item.showDatas.push({
                  side: data.side.join("、"),
                  time: data.time
                    .map(tar => {
                      if (tar.type === "日期") {
                        if (tar.endTime) {
                          return `${tar.startTime} 至 ${tar.endTime}`;
                        } else {
                          return `${tar.startTime}`;
                        }
                      } else {
                        let kk = this.$refs.sideTime[0].list.filter(d =>
                            tar.zhouqi.includes(d.value)
                          ),
                          str = "";
                        kk.forEach(tar => {
                          if (kk.length > 1) {
                            str += tar.label + ",";
                          } else {
                            str = tar.label;
                          }
                        });

                        return str;
                      }
                    })
                    .join(" 或 ")
                });
              }
              break;
          }
        });
        return tiaojian;
      } else {
        // 将上一个页面用的数据，转换为本页面使用的编辑数据
        let obj = {
          canSee: this.forEdit.type === 1 ? "可见条件" : "不可见条件"
        };
        this.forEdit.tiaojian.forEach(tar => {
          obj = { ...obj, ...tar.data };
        });
        return obj;
      }
    },
    // 对数据数据深拷贝，只接收数组
    deepCopy(data) {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {};
        Object.keys(data[i]).forEach(str => {
          if (
            typeof data[i][str] === "string" ||
            typeof data[i][str] === "number"
          ) {
            obj[str] = data[i][str];
          } else {
            obj[str] = []; // children
            data[i][str].forEach(tar => {
              let k = {};
              Object.keys(tar).forEach(str1 => {
                k[str1] = tar[str1];
              });
              obj[str].push(k);
            });
          }
        });
        arr.push(obj);
      }
      return arr;
    },
    // 获取营销管理使用的下拉数据
    forYingXiaoSet() {
      let pro = [];
      for (let i = 1; i < 6; i++) {
        pro.push(
          this.$api.forYingXiaoSet({
            vm: this,
            data: { regionalType: i }
          })
        );
      }
      //  1广告 2产品展示 3银行展示 4活动 5内容
      Promise.all(pro).then(res => {
        this.yingxiaoDatas = {};
        this.yingxiaoDatas.neirong = res[4].data.list;
        this.yingxiaoDatas.huodong = res[3].data.list;
        this.yingxiaoDatas.guangao = res[0].data.list;
        this.yingxiaoDatas.weizhi_bank = res[2].data.list;
        this.yingxiaoDatas.weizhi_product = res[1].data.list;
      });
    },
    // 过滤省、市字典数据
    toResetList() {
      // 初始化store深拷贝一下字典数据
      let china = this.deepCopy(this.dictData.china), // 深拷贝一下字典数据
        hasSelect = this.ruleForm.areaTJ;
      for (let i = hasSelect.length; i--; ) {
        if (hasSelect[i].sheng.adcode) {
          let num = hasSelect[i].sheng.index;

          // 获取省对应的字典列表数据
          let shiList = china.splice(num, 1)[0],
            shi = hasSelect[i].shi.map(tar => tar.adcode); // 获取已经选择的市
          if (shi.length > 0 && shi.length < shiList.children.length) {
            shiList.children = shiList.children.filter(
              tar => !shi.includes(tar.adcode)
            );
            china.splice(num, 0, shiList);
          }
        }
      }
      this.$store.state.areaList = china;
    },
    // 用来检查用户管理配置是否输入过数据
    checkIsInput() {
      let isInput = false;
      Object.keys(this.ruleForm).forEach(str => {
        let data = this.ruleForm[str],
          type = Object.prototype.toString // 获取数据类型
            .call(data)
            .slice(-7, -1)
            .toLowerCase();

        if (type === "string") {
          if (str !== "canSee" && data !== "") {
            isInput = true;
          }
        } else if (str !== "areaTJ" && data.length > 0) {
          isInput = true;
        } else if (str === "areaTJ") {
          isInput = this.areaAction({ type: "checkareaTJ" });
        }
      });

      return isInput;
    },
    // 保存数据，营销管理配置属于必填项
    async save() {
      if (
        this.ruleForm.side.length > 0 ||
        this.ruleForm.time.length > 0 ||
        this.ruleForm.ad_side.length > 0 ||
        this.ruleForm.active.length > 0 ||
        this.ruleForm.content.length > 0 ||
        this.ruleForm.chuang !== ""
      ) {
        let checks = await this.areaAction({ type: "beforeLeave" });
        if (checks.wrong) {
          let str = "",
            wap = "";

          checks.list.forEach(t => {
            str += `<li>${t}</li>`;
          });
          wap = `<ul>${str}</ul>`;

          this.$alert(wap, "错误提示", {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定"
          });
        } else {
          this.forEdit.tiaojian = [...this.zhuanhuan(true, this.ruleForm)];
          this.forEdit.num = ++this.num;
          this.forEdit.type = this.ruleForm.canSee === "可见条件" ? 1 : 2; // 1可见，2不可见
          this.$emit("TiaoJianEmit", { num: 3, data: ++this.num });
        }
      } else {
        this.$message.error("营销管理配置至少配置一项!");
      }
    },
    close() {
      // 这里需要判断页面的内有没有填入数据
      if (this.checkIsInput()) {
        this.$confirm("是否暂存已编写的数据?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning"
        })
          .then(() => {
            this.save();
          })
          .catch(() => {
            this.$emit("TiaoJianEmit", { num: 3 });
          });
      } else {
        this.$emit("TiaoJianEmit", { num: 3 });
      }
    },
    // 重置年龄
    resetAge() {
      this.ruleForm.minAge = "";
      this.ruleForm.minAge_symbol = "";
      this.ruleForm.maxAge = "";
      this.ruleForm.maxAge_symbol = "";
      this.ruleForm.age_fuhao = "";
      this.hasError.age.act = false;
      this.hasError.age.content = "";
    },
    // 对年龄设置进行验证
    validAge() {
      let obj = {
        left: this.ruleForm.minAge,
        left_symbol: this.ruleForm.minAge_symbol,
        right: this.ruleForm.maxAge,
        right_symbol: this.ruleForm.maxAge_symbol,
        fuhao: this.ruleForm.age_fuhao,
        errorObj: this.hasError.age
      };
      this.forValid(obj);
    },
    // 重置比财注册状态与时间
    resetSta() {
      this.ruleForm.statue = ""; // 状态
      this.ruleForm.time1 = ""; // 左边的时间
      this.ruleForm.time1_symbol = ""; // 左边时间的符号
      this.ruleForm.time2 = ""; // 右边的时间
      this.ruleForm.time2_symbol = ""; // 右边时间的符号
      this.ruleForm.time1_time2 = ""; // 时间中间的且或
      this.hasError.time.act = false;
      this.hasError.time.content = "";
    },
    validStatue() {
      let obj = {
        left: this.ruleForm.time1,
        left_symbol: this.ruleForm.time1_symbol,
        right: this.ruleForm.time2,
        right_symbol: this.ruleForm.time2_symbol,
        fuhao: this.ruleForm.time1_time2,
        errorObj: this.hasError.time
      };
      this.forValid(obj);
    },
    // 重置比财持仓状态与时间
    resetChiCang() {
      this.ruleForm.minChiCang = ""; // 左边持仓
      this.ruleForm.minChiCang_symbol = ""; // 左边持仓的符号
      this.ruleForm.maxChiCang = ""; // 右边的持仓
      this.ruleForm.maxChiCang_symbol = ""; // 右边持仓的符号
      this.ruleForm.ChiCang_fuhao = ""; // 持仓中间的且或
      this.hasError.chicang.act = false;
      this.hasError.chicang.content = "";
    },
    validChiCang() {
      let obj = {
        left: this.ruleForm.minChiCang,
        left_symbol: this.ruleForm.minChiCang_symbol,
        right: this.ruleForm.maxChiCang,
        right_symbol: this.ruleForm.maxChiCang_symbol,
        fuhao: this.ruleForm.ChiCang_fuhao,
        errorObj: this.hasError.chicang
      };
      this.forValid(obj);
    },
    // 本银行开户状态与时间
    resetBank() {
      this.ruleForm.bankStatue = ""; // 状态
      this.ruleForm.bank1 = ""; // 左边的时间
      this.ruleForm.bank1_symbol = ""; // 左边时间的符号
      this.ruleForm.bank2 = ""; // 右边的时间
      this.ruleForm.bank2_symbol = ""; // 右边时间的符号
      this.ruleForm.bank1_bank2 = ""; // 时间中间的且或
      this.hasError.bank.act = false;
      this.hasError.bank.content = "";
    },
    validBankStatue() {
      let obj = {
        left: this.ruleForm.bank1,
        left_symbol: this.ruleForm.bank1_symbol,
        right: this.ruleForm.bank2,
        right_symbol: this.ruleForm.bank2_symbol,
        fuhao: this.ruleForm.bank1_bank2,
        errorObj: this.hasError.bank
      };
      this.forValid(obj);
    },
    // 重置本银行持仓状态与时间
    resetBankChiCang() {
      this.ruleForm.minBankChiCang = ""; // 左边持仓
      this.ruleForm.minBankChiCang_symbol = ""; // 左边持仓的符号
      this.ruleForm.maxBankChiCang = ""; // 右边的持仓
      this.ruleForm.maxBankChiCang_symbol = ""; // 右边持仓的符号
      this.ruleForm.bankChiCang_fuhao = ""; // 持仓中间的且或
      this.hasError.bankChiCang.act = false;
      this.hasError.bankChiCang.content = "";
    },
    validBankChiCang() {
      let obj = {
        left: this.ruleForm.minBankChiCang,
        left_symbol: this.ruleForm.minBankChiCang_symbol,
        right: this.ruleForm.maxBankChiCang,
        right_symbol: this.ruleForm.maxBankChiCang_symbol,
        fuhao: this.ruleForm.bankChiCang_fuhao,
        errorObj: this.hasError.bankChiCang
      };
      this.forValid(obj);
    },
    // 重置限制地域
    resetArea() {
      this.ruleForm.areaTJ = [];
      this.$refs.child.data.sheng = "";
      this.$refs.child.data.shi = [];
      this.$refs.child.data.tiaojian = [];
    },
    // 封装验证
    forValid(obj) {
      let fuhao = obj.fuhao,
        left = obj.left,
        left_symbol = obj.left_symbol,
        right = obj.right,
        right_symbol = obj.right_symbol,
        errorObj = obj.errorObj;
      // 全部填入数据了
      if (fuhao && left !== "" && left_symbol && right !== "" && right_symbol) {
        if (fuhao === "且") {
          // 如果左边是小于或小于等于时
          if (left_symbol === "&lt" || left_symbol === "&le") {
            // 右边是小于或小于等于
            if (right_symbol === "&lt" || right_symbol === "&le") {
              errorObj.content = "包含重复区间！";
              errorObj.act = true;
            }
            // 右边是大于或大于等于
            else {
              if (+left <= +right) {
                errorObj.content = "无法同时满足两个区间！";
                errorObj.act = true;
              } else {
                errorObj.content = "";
                errorObj.act = false;
              }
            }
          }
          // 如果左边是大于或大于等于时
          else {
            // 右边是小于或小于等于
            if (right_symbol === "&lt" || right_symbol === "&le") {
              if (+left >= +right) {
                errorObj.content = "无法同时满足两个区间！";
                errorObj.act = true;
              } else {
                errorObj.content = "";
                errorObj.act = false;
              }
            }
            // 右边是大于或大于等于
            else {
              errorObj.content = "包含重复区间！";
              errorObj.act = true;
            }
          }
        } else {
          // 或的情况
          errorObj.content = "";
          errorObj.act = false;
        }
      } else {
        // 如果有一项已经填入数据
        if (
          fuhao ||
          left !== "" ||
          left_symbol ||
          right !== "" ||
          right_symbol
        ) {
          // 如果左边已经填写，右边未知时
          if (left !== "" && left_symbol) {
            // 选择了且、或
            if (fuhao) {
              if (right === "" || !right_symbol) {
                errorObj.content = "请将右侧设置数据填写完整！";
                errorObj.act = true;
              }
            } else {
              if (right !== "" || right_symbol) {
                errorObj.content = "请确定左侧和右侧的关系！";
                errorObj.act = true;
              } else if (right === "" || !right_symbol) {
                errorObj.content = "";
                errorObj.act = false;
              }
            }
          } else {
            errorObj.content = "请将左侧的数据填写完整！";
            errorObj.act = true;
          }
        } else {
          errorObj.content = "";
          errorObj.act = false;
        }
      }
    },
    // 监听地域限制组件
    areaAction(data) {
      let isOk = true,
        wrongs = {
          wrong: false,
          list: []
        }, // 记录最终保存时的验证错误
        sheng = [],
        shiData = [],
        child = this.$refs.child.data; // 拿到子组件的数据
      switch (data.type) {
        case "delete": // 删除限制地域
          this.ruleForm.areaTJ = this.ruleForm.areaTJ.filter(
            tar => tar.num != data.data.num
          );
          this.toResetList();
          break;
        case "add": // 新增一条限制地域数据
          if (child.sheng === "") {
            isOk = false;
            this.hasError.canDelete.content = "请选择地域限的省份！";
            this.hasError.canDelete.act = true;
          } else if (child.tiaojian.length === 0) {
            isOk = false;
            this.hasError.canDelete.content = "请将地域限的限制条件正确填写！";
            this.hasError.canDelete.act = true;
          }
          if (isOk) {
            sheng = [...this.deepCopy(this.dictData.china)].filter(
              tar => tar.adcode === child.sheng
            )[0]; // 深拷贝一下字典数据
            shiData = [];
            if (child.shi.length) {
              shiData = sheng.children.filter(tar =>
                child.shi.includes(tar.adcode)
              );
            } else {
              shiData = sheng.children;
            }
            // 生成最终数据到ruleForm中
            this.ruleForm.areaTJ.push({
              num: ++this.num,
              sheng: {
                adcode: sheng.adcode,
                name: sheng.name,
                index: sheng.index
              },
              shi: shiData,
              tiaojian: child.tiaojian
            });
            // 重置子组件
            this.$refs.child.data = {
              sheng: "",
              shi: [],
              tiaojian: []
            };
            this.isAdd = true;
            this.toResetList();
            this.hasError.canDelete.content = "";
            this.hasError.canDelete.act = false;
          }
          break;
        case "checkareaTJ": // 离开前检查地域限制
          if (child.sheng === "" && child.tiaojian.length === 0) {
            return false;
          } else {
            return true;
          }
          break;
        case "beforeLeave": // 离开页面前保存地域限制数据
          if (child.sheng && child.tiaojian.length > 0) {
            sheng = [...this.deepCopy(this.dictData.china)].filter(
              tar => tar.adcode === child.sheng
            )[0]; // 深拷贝一下字典数据
            let shiData = [];
            if (child.shi.length) {
              shiData = sheng.children.filter(tar =>
                child.shi.includes(tar.adcode)
              );
            } else {
              shiData = sheng.children;
            }
            // 生成最终数据到ruleForm中
            this.ruleForm.areaTJ.push({
              num: ++this.num,
              sheng: {
                adcode: sheng.adcode,
                name: sheng.name,
                index: sheng.index
              },
              shi: shiData,
              tiaojian: child.tiaojian
            });
            return true;
          } else {
            if (child.sheng || child.tiaojian.length > 0) {
              wrongs.wrong = true;
              wrongs.list.push("限制地域数据输入不全，无法保存!");

              this.hasError.canDelete.content = "请同时输入数据！";
              this.hasError.canDelete.act = true;
            }
          }
          if (
            this.ruleForm.statue &&
            (!this.ruleForm.time1 || !this.ruleForm.time1_symbol)
          ) {
            wrongs.wrong = true;
            wrongs.list.push("比财注册状态与时间数据输入不全，无法保存!");

            this.hasError.time.content = "请同时输入数据！";
            this.hasError.time.act = true;
          }

          if (
            this.ruleForm.bankStatue &&
            (!this.ruleForm.bank1 || !this.ruleForm.bank1_symbol)
          ) {
            wrongs.wrong = true;
            wrongs.list.push("本银行开户状态与时间数据输入不全，无法保存!");

            this.hasError.bank.content = "请同时输入数据！";
            this.hasError.bank.act = true;
          }
          return wrongs;
          break;
        case "noError":
          this.hasError.canDelete.content = "";
          this.hasError.canDelete.act = false;
          break;
        case "isAdd":
          this.isAdd = data.data;
          break;
        case "edit": // 编辑
          let obj;
          this.ruleForm.areaTJ = this.ruleForm.areaTJ.filter(tar => {
            if (tar.num === data.data.num) {
              obj = { ...tar };
            }
            return tar.num != data.data.num;
          });

          this.toResetList();
          this.$refs.child.data = {
            sheng: obj.sheng.adcode,
            shi: obj.shi.map(tar => tar.adcode),
            tiaojian: obj.tiaojian
          };
          this.$refs.child.resetList();
          break;
      }
    },
    // 金额的单位格式化
    danwei(data) {
      let obj = {};
      if (data) {
        let num = data / 10000;
        if (num >= 1 && num < 10) {
          obj = {
            content: "万",
            show: true
          };
        } else if (num >= 10 && num < 100) {
          obj = {
            content: "十万",
            show: true
          };
        } else if (num >= 100 && num < 1000) {
          obj = {
            content: "百万",
            show: true
          };
        } else if (num >= 1000 && num < 10000) {
          obj = {
            content: "千万",
            show: true
          };
        } else if (num >= 10000) {
          obj = {
            content: "亿",
            show: true
          };
        } else {
          obj = {
            content: "",
            show: false
          };
        }
      } else {
        obj = {
          content: "",
          show: false
        };
      }
      return obj;
    },
    // 重置产品展示位置与时间
    resetSide() {
      this.ruleForm.side = []; // 位置
      this.ruleForm.time = []; // 时间
      this.hasError.sideTime.content = "";
      this.hasError.sideTime.act = false;
    },
    // 产品展示位置与时间,全选按钮
    selectAll() {
      let kk;
      if (this.type === "bank") {
        kk = this.yingxiaoDatas.weizhi_bank;
      } else {
        kk = this.yingxiaoDatas.weizhi_product;
      }

      this.ruleForm.side = kk.map(tar => tar.positionNo);
      this.ruleForm.ad_side = this.yingxiaoDatas.guangao.map(
        tar => tar.positionNo
      );
      this.ruleForm.active = this.yingxiaoDatas.huodong.map(
        tar => tar.positionNo
      );
      this.ruleForm.content = this.yingxiaoDatas.neirong.map(
        tar => tar.positionNo
      );
      this.ruleForm.chuang = "组合购买";

      let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate();

      if (this.yingxiaoDatas.weizhi_bank.length > 0) {
        this.ruleForm.time = [
          {
            type: "日期",
            startTime: `${year}-${month}-${day} 00:00:00`,
            endTime: "",
            zhouqi: []
          }
        ];
      }
    },
    // 新增限制位置时间
    timeAction(obj) {
      switch (obj.type) {
        case "change":
          this.timeChange = false;
          break;
        case "new": // 选择好位置，但还未选时间
          if (this.sideTimeBefore.length === 0) {
            if (
              this.ruleForm.side.length === 1 &&
              this.ruleForm.time.length === 0
            ) {
              this.ruleForm.time.push({
                num: ++this.num,
                type: "",
                startTime: "",
                endTime: "",
                zhouqi: []
              });
            }
            this.sideTimeBefore = this.ruleForm.side;
            this.timeChange = false;
          } else {
            // 添加位置
            if (this.sideTimeBefore.length < this.ruleForm.side.length) {
              this.sideTimeBefore = this.ruleForm.side;
            } else {
              // 减少
              if (this.ruleForm.side.length === 0) {
                this.ruleForm.time = [];
                this.timeChange = true;
              }
              this.sideTimeBefore = this.ruleForm.side;
            }
          }
          break;
        case "add": // 已选址位置、时间
          if (this.ruleForm.side.length > 0) {
            let isOk = true; // 判断时间类型、时间数据是否已选好
            this.ruleForm.time.forEach(item => {
              if (!item.type) {
                isOk = false;
              } else if (item.type === "周期" && item.zhouqi.length === 0) {
                isOk = false;
              } else if (item.type === "日期" && !item.startTime) {
                isOk = false;
              }
            });

            if (isOk) {
              this.hasError.sideTime.act = false;
              this.hasError.sideTime.content = "";

              if (this.timeChange) {
                // 新增
                this.ruleForm.time.push({
                  num: ++this.num,
                  type: "",
                  startTime: "",
                  endTime: "",
                  zhouqi: []
                });
              }
              this.timeChange = true;
            } else {
              this.hasError.sideTime.act = true;
              this.hasError.sideTime.content = "请先将当前数据输入完整！";
            }
          } else {
            this.hasError.sideTime.act = true;
            this.hasError.sideTime.content = "请先选择位置！";
          }
          break;
        case "delete":
          if (this.ruleForm.time.length > 1) {
            this.ruleForm.time = this.ruleForm.time.filter(
              tar => tar.num != obj.data.num
            );
          } else {
            this.hasError.sideTime.act = true;
            this.hasError.sideTime.content = "请至少保留一个或者完全重置！";
          }
          break;
      }
    }
  }
};
</script>
<style scoped>
.AddTiaoJianPage {
  background: rgb(253, 253, 253);
}

.pageTop {
  display: flex;
  font-weight: bold;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 1px solid rgb(230, 228, 228);
}

.pageTop > p {
  width: 100%;
  font-size: 16px;
  color: rgb(78, 75, 75);
}

.pageTop > i {
  display: inline-block;
  width: 30px;
  color: rgb(145, 141, 141);
}

.pageTop > i:hover {
  cursor: pointer;
  color: rgb(12, 12, 12);
  font-weight: bold;
}

.pagePart {
  border-left: 5px solid #1a80df;
  font-size: 16px;
  padding: 3px 10px;
  margin-left: -15px;
}
.pagePart > span {
  font-size: 14px;
  color: red;
  padding: 0 30px 0 10px;
}
.setCunQi {
  display: flex;
  justify-content: flex-start;
  padding: 5px 4px 0 2px;
  position: relative;
  align-items: center;
}
.hasError {
  position: absolute;
  bottom: -28px;
  color: red;
  padding: 0 5px;
}

.ageBack {
  display: inline-block;
  padding: 0 20px 0 5px;
  color: rgb(197, 195, 195);
}
.forSta {
  background: rgba(221, 220, 220, 0.7);
}
.canDelete {
  font-size: 14px;
  color: #606266;
  padding-bottom: 10px;
}
.canDelete > span {
  font-size: 14px;
  color: rgb(248, 18, 18);
  padding-left: 20px;
}
.resetBtn {
  margin-left: 30px;
}
.setTime {
  border: 1px solid rgb(161, 159, 159);
  padding: 0 10px 8px 10px;
}

.isI {
  font-size: 22px;
  color: rgb(78, 75, 75);
  padding: 2px;
  border-radius: 3px;
  margin-left: 4px;
}
.isI:hover {
  font-size: 22px;
  cursor: pointer;
  background: rgb(134, 134, 134);
  color: #fff;
}

.selectList {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  padding: 2px 0;
}
.selectList1 {
  background: rgb(206, 223, 243);
}
.selectList2 {
  background: rgb(243, 229, 250);
}
.hasadd {
  line-height: 12px;
  padding: 1px 5px;
  margin: 0;
  font-size: 12px;
  display: flex;
}
.hasadd > p:nth-of-type(1) {
  width: 40px;
  flex-shrink: 0;
  height: 100%;
  font-weight: bold;
}
.hasadd > p:nth-of-type(2) > span {
  display: inline-block;
  padding: 2px 6px;
  flex-shrink: 0;
}
</style>
