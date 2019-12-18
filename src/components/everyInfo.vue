<template>
  <div style="overflow-y:auto" id="forTable">
    <!-- 纯债基金管理 -->
    <div class="buju" v-if="pageData.page==='pure_debt_fund'">
      <div>
        <div v-if="pageData.forProduct">
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>

        <div v-if="pageData.forChart">
          <chart :pageData="pageData.forChart" @chartEmit="toReGetData" />
        </div>

        <div style="margin-right:5px;">
          <div class="table_top" v-if="pageData.forLishi">
            <div>
              <span class="guizeTitle">历史业绩</span>
              <span style="padding-left:2px;" class="guizeTitle">
                <i
                  title="历史业绩：在客户端展示的历史业绩，以最后更新数据为准。"
                  class="myIcon14px icon-wenhaoyuanyiwenxianxing"
                ></i>
              </span>
            </div>
            <el-button size="mini" @click="lishiYeJi = true">更新</el-button>
          </div>

          <div v-if="pageData.forLishi">
            <forms :pageData="pageData.forLishi" />
          </div>
        </div>
      </div>
      <div>
        <simple :pageData="pageData.forSimple" v-if="pageData.forSimple" />

        <div class="table_top" v-if="rengou.rengou||shengou.shengou||shuhui.shuhui">
          <div>
            <span class="guizeTitle">交易规则</span>
            <span style="padding-left:5px;">
              <i title="交易规则：在客户端展示的交易规则，以银行交易规则为准" class="myIcon14px icon-wenhaoyuanyiwenxianxing"></i>
            </span>
          </div>
          <el-button size="mini" @click="addNewGuiZe">新增规则</el-button>
        </div>
        <div>
          <forms
            :pageData="rengou"
            v-if="rengou.rengou"
            @tableAct="feilvEmit"
            style="margin-bottom:5px;"
          />
          <forms
            :pageData="shengou"
            v-if="shengou.shengou"
            @tableAct="feilvEmit"
            style="margin-bottom:5px;"
          />
          <forms
            :pageData="shuhui"
            v-if="shuhui.shuhui"
            @tableAct="feilvEmit"
            style="margin-bottom:5px;"
          />
        </div>
      </div>
    </div>

    <!-- 货币基金管理 -->
    <div class="buju" v-if="pageData.page==='money_fund'">
      <div>
        <div v-if="pageData.forProduct">
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData.forSimple" v-if="pageData.forSimple" />
        <chart :pageData="pageData.forChart" v-if="pageData.forChart" @chartEmit="toReGetData" />
      </div>
    </div>

    <!-- 理财管理 -->
    <div class="buju" v-if="pageData.page==='wmp'">
      <div>
        <div v-if="pageData.forProduct">
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
      </div>

      <div>
        <simple :pageData="pageData" v-if="pageData.forSimple" />
        <chart :pageData="pageData" v-if="pageData.forChart" />
      </div>
    </div>

    <!-- 保险理财 -->
    <div class="buju" v-if="pageData.page==='wmp_insurance'">
      <div>
        <div v-if="pageData.forProduct">
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
      </div>

      <div>
        <simple :pageData="pageData" v-if="pageData.forSimple" />
        <chart :pageData="pageData" v-if="pageData.forChart" />
      </div>
    </div>

    <!-- 活期存款管理 -->
    <div class="buju" v-if="pageData.page==='demand_deposit'&&pageData.datas">
      <div>
        <div>
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData" v-if="pageData.forSimple" />
      </div>
    </div>

    <!-- 定期存款管理 -->
    <div class="buju" v-if="pageData.page==='time_deposit'&&pageData.datas">
      <div>
        <div>
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData" />
        <!-- <div v-if="lilvForms.length">
           <forms @tableAct="tableAct" :type="'lilv'" :pageData="pageData" /> 
        </div>-->
        <div>
          <h3 style="display:flex;justify-content:space-between;padding-right:10px;">
            利率列表
            <el-button size="mini" @click="get_isEditButton">编辑</el-button>
          </h3>
          <div class="suolueWap" v-if="lilvForms.length">
            <div v-for="tar of lilvForms" :key="tar.num" class="suolue" title="点击进行编辑">
              <p>
                期限:
                <span
                  v-if="tar.minDeadline!==''"
                  style="font-size:14px;"
                >{{tar.minDeadline}}{{seeDanWei1(tar)}}</span>
                <span
                  v-if="tar.minDeadline!==''"
                  style="font-size:20px; letter-spacing:-5px;"
                >{{seeFuHao1(tar)}}</span>
                &nbsp;存期
                <span
                  v-if="tar.maxDeadline!==''"
                  style="font-size:20px;letter-spacing:-4px;"
                >{{seeFuHao2(tar)}}</span>
                <span
                  v-if="tar.maxDeadline!==''"
                  style="font-size:14px;"
                >&nbsp;&nbsp;{{tar.maxDeadline}}{{seeDanWei2(tar)}}</span>
              </p>
              <p>利率: {{tar.lilv+' %'}}</p>
              <p>榜单展示: {{tar.showList=='YES'?'是':'否'}}</p>
              <p>锁定期限: {{tar.lockinPeriod+'天'}}</p>
              <p>锁定期榜单展示: {{tar.lockinShowList=='YES'?'是':'否'}}</p>
              <p>产品展示: {{tar.showProduct=='YES'?'是':'否'}}</p>
              <p v-if="tar.remark">备注: {{tar.remark}}</p>
              <p v-if="tar.homepageCopywriting">首页文案: {{tar.homepageCopywriting}}</p>
              <p v-if="tar.detailCopywriting">详情页文案: {{tar.detailCopywriting}}</p>
              <p v-if="tar.bankCopywriting">银行文案: {{tar.bankCopywriting}}</p>
              <p v-if="tar.bangdanWrite">榜单期限文案: {{tar.bangdanWrite}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 智能存款管理 -->
    <div class="buju" v-if="pageData.page=='intelligent_deposit'&&pageData.datas">
      <div>
        <div>
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData" />
        <!-- <div v-if="lilvForms.length">
          <forms @tableAct="tableAct" :pageData="pageData.forForms" />
        </div>-->
        <div>
          <h3>利率列表</h3>
          <div class="suolueWap" v-if="lilvForms.length">
            <div v-for="tar of lilvForms" :key="tar.num" class="suolue" title="点击进行编辑">
              <p>
                期限:
                <span
                  v-if="tar.minDeadline!==''"
                  style="font-size:14px;"
                >{{tar.minDeadline}}{{seeDanWei1(tar)}}</span>
                <span
                  v-if="tar.minDeadline!==''"
                  style="font-size:20px; letter-spacing:-5px;"
                >{{seeFuHao1(tar)}}</span>
                &nbsp;存期
                <span
                  v-if="tar.maxDeadline!==''"
                  style="font-size:20px;letter-spacing:-4px;"
                >{{seeFuHao2(tar)}}</span>
                <span
                  v-if="tar.maxDeadline!==''"
                  style="font-size:14px;"
                >&nbsp;&nbsp;{{tar.maxDeadline}}{{seeDanWei2(tar)}}</span>
              </p>
              <p>利率: {{tar.lilv+' %'}}</p>
              <p>榜单展示: {{tar.showList=='YES'?'是':'否'}}</p>
              <p>锁定期限: {{tar.lockinPeriod+'天'}}</p>
              <p>锁定期榜单展示: {{tar.lockinShowList=='YES'?'是':'否'}}</p>
              <p>产品展示: {{tar.showProduct=='YES'?'是':'否'}}</p>
              <p v-if="tar.remark">备注: {{tar.remark}}</p>
              <p v-if="tar.homepageCopywriting">首页文案: {{tar.homepageCopywriting}}</p>
              <p v-if="tar.detailCopywriting">详情页文案: {{tar.detailCopywriting}}</p>
              <p v-if="tar.bankCopywriting">银行文案: {{tar.bankCopywriting}}</p>
              <p v-if="tar.bangdanWrite">榜单期限文案: {{tar.bangdanWrite}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结构存款管理 -->
    <div class="buju" v-if="pageData.page==='structured_deposit'&&pageData.datas">
      <div>
        <div>
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData" />
      </div>
    </div>

    <!-- 大额存款管理 -->
    <div class="buju" v-if="pageData.page==='large_deposit'&&pageData.datas">
      <div>
        <div>
          <baseinfo :pageData="pageData" @toReGetData="toReGetData" />
        </div>
        <div></div>
      </div>

      <div>
        <simple :pageData="pageData" />
        <div>
          <h3 style="display:flex;justify-content:space-between;padding-right:10px;">
            利率列表
            <el-button size="mini" @click="get_isEditButton">编辑</el-button>
          </h3>
          <div class="suolueWap" v-if="lilvForms.length">
            <div v-for="tar of lilvForms" :key="tar.num" class="suolue" title="点击进行编辑">
              <p>
                期限:
                <span
                  v-if="tar.minDeadline!==''"
                  style="font-size:14px;"
                >{{tar.minDeadline}}{{seeDanWei1(tar)}}</span>
                <span
                  v-if="tar.minDeadline!==''"
                  style="font-size:20px; letter-spacing:-5px;"
                >{{seeFuHao1(tar)}}</span>
                &nbsp;存期
                <span
                  v-if="tar.maxDeadline!==''"
                  style="font-size:20px;letter-spacing:-4px;"
                >{{seeFuHao2(tar)}}</span>
                <span
                  v-if="tar.maxDeadline!==''"
                  style="font-size:14px;"
                >&nbsp;&nbsp;{{tar.maxDeadline}}{{seeDanWei2(tar)}}</span>
              </p>
              <p>利率: {{tar.lilv+' %'}}</p>
              <p>榜单展示: {{tar.showList=='YES'?'是':'否'}}</p>
              <p>锁定期限: {{tar.lockinPeriod+'天'}}</p>
              <p>锁定期榜单展示: {{tar.lockinShowList=='YES'?'是':'否'}}</p>
              <p>产品展示: {{tar.showProduct=='YES'?'是':'否'}}</p>
              <p v-if="tar.remark">备注: {{tar.remark}}</p>
              <p v-if="tar.homepageCopywriting">首页文案: {{tar.homepageCopywriting}}</p>
              <p v-if="tar.detailCopywriting">详情页文案: {{tar.detailCopywriting}}</p>
              <p v-if="tar.bankCopywriting">银行文案: {{tar.bankCopywriting}}</p>
              <p v-if="tar.bangdanWrite">榜单期限文案: {{tar.bangdanWrite}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 机构管理 -->
    <div v-if="pageData.page==='organizational'&&forJiGouCom.datas">
      <jigou :forJiGouInfo="forJiGouCom" @toReGetData="toReGetData" />

      <el-radio-group v-model="checkTable" size="mini" @change="changeFn">
        <el-radio-button v-for="(item,index) in checkList" :key="index" :label="item.name"></el-radio-button>
      </el-radio-group>
    </div>

    <!-- 基金公司管理 -->
    <div v-if="pageData.page==='fund_company'&&pageData.datas">
      <jigou :forJiGouInfo="pageData" />

      <el-radio-group v-model="checkTable" size="mini" @change="changeFn">
        <el-radio-button v-for="(item,index) in checkList" :key="index" :label="item.name"></el-radio-button>
      </el-radio-group>
    </div>

    <div id="forTable" v-if="loadEnd">
      <isTable :inputData="tableInputData" @tableEmit="tableEmit" />
    </div>

    <!-- 新增交易规则弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="guize_httpType==='post'?'新增交易规则':'编辑交易规则'"
      :visible.sync="newGuiZe"
      width="930px"
      :before-close="toCloseNewGuiZeDialog"
    >
      <el-checkbox-group
        v-model="edit_list"
        style="margin-bottom:20px;"
        size="mini"
        v-if="guize_httpType==='post'"
      >
        <el-checkbox label="认购">认购</el-checkbox>
        <el-checkbox label="申购">申购</el-checkbox>
        <el-checkbox label="赎回">赎回</el-checkbox>
      </el-checkbox-group>

      <el-form
        v-if="edit_list.includes('认购')"
        ref="rengou_forms"
        size="normal"
        :model="rengou_forms"
        label-width="80px"
        :rules="rules"
      >
        <h3>
          认购
          <el-button :disabled="!isChange" @click="save_rengou" size="mini" type="warning">保 存</el-button>
          <span class="errInfo" v-if="errInfo.includes(1)">适用范围数据有误！</span>
        </h3>
        <div class="toFlex">
          <el-form-item label="适用范围:">
            <div class="toFlex">
              <el-form-item prop="minTransactionAmount">
                <el-input
                  type="number"
                  clearable
                  v-model="rengou_forms.minTransactionAmount"
                  placeholder="最小金额"
                ></el-input>
              </el-form-item>&nbsp;
              <el-form-item prop="minAmountUnit">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="rengou_forms.minAmountUnit"
                >
                  <el-option
                    size="mini"
                    v-for="item in dictData.currency_unit"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>&nbsp;
              <el-form-item prop="minAmountSymbol">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="rengou_forms.minAmountSymbol"
                >
                  <el-option
                    size="mini"
                    v-for="item in dictData.forMax"
                    :key="item.value"
                    :label="item.fuhao"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="交易金额">
            <div class="toFlex">
              <el-form-item prop="maxAmountSymbol">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="rengou_forms.maxAmountSymbol"
                >
                  <el-option
                    size="mini"
                    v-for="item in dictData.forMax"
                    :key="item.value"
                    :label="item.fuhao"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>&nbsp;
              <el-form-item prop="maxTransactionAmount">
                <el-input
                  type="number"
                  clearable
                  v-model="rengou_forms.maxTransactionAmount"
                  placeholder="最大金额"
                ></el-input>
              </el-form-item>&nbsp;
              <el-form-item prop="maxAmountUnit">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="rengou_forms.maxAmountUnit"
                >
                  <el-option
                    size="mini"
                    v-for="item in dictData.currency_unit"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
        </div>

        <el-form-item label="费率:" prop="rate">
          <el-input
            class="isInput"
            clearable
            v-model="rengou_forms.rate"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="费率折扣:" prop="rateDiscount">
          <el-input
            class="isInput"
            clearable
            v-model="rengou_forms.rateDiscount"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="单笔费用:" prop="cost">
          <el-input
            class="isInput"
            clearable
            v-model="rengou_forms.cost"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">元/笔</span>
        </el-form-item>
      </el-form>

      <el-form
        v-if="edit_list.includes('申购')"
        ref="shengou_forms"
        size="normal"
        :model="shengou_forms"
        label-width="80px"
        :rules="rules"
      >
        <h3>
          申购
          <el-button :disabled="!isChange" @click="save_shengou" size="mini" type="warning">保 存</el-button>
          <span class="errInfo" v-if="errInfo.includes(2)">适用范围数据有误！</span>
        </h3>
        <div class="toFlex">
          <el-form-item label="适用范围:">
            <div class="toFlex">
              <el-form-item prop="minTransactionAmount2">
                <el-input
                  type="number"
                  clearable
                  v-model="shengou_forms.minTransactionAmount2"
                  placeholder="最小金额"
                ></el-input>
              </el-form-item>&nbsp;
              <el-form-item prop="minAmountUnit2">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="shengou_forms.minAmountUnit2"
                >
                  <el-option
                    size="mini"
                    v-for="item in dictData.currency_unit"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>&nbsp;
              <el-form-item prop="minAmountSymbol2">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="shengou_forms.minAmountSymbol2"
                >
                  <el-option
                    size="mini"
                    v-for="item in dictData.forMax"
                    :key="item.value"
                    :label="item.fuhao"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>

          <el-form-item label="交易金额">
            <div class="toFlex">
              <el-form-item prop="maxAmountSymbol2">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="shengou_forms.maxAmountSymbol2"
                >
                  <el-option
                    size="mini"
                    v-for="item in dictData.forMax"
                    :key="item.value"
                    :label="item.fuhao"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>&nbsp;
              <el-form-item prop="maxTransactionAmount2">
                <el-input
                  type="number"
                  clearable
                  v-model="shengou_forms.maxTransactionAmount2"
                  placeholder="最大金额"
                ></el-input>
              </el-form-item>&nbsp;
              <el-form-item prop="maxAmountUnit2">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="shengou_forms.maxAmountUnit2"
                >
                  <el-option
                    size="mini"
                    v-for="item in dictData.currency_unit"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
        </div>

        <el-form-item label="费率:" prop="rate2">
          <el-input
            class="isInput"
            clearable
            v-model="shengou_forms.rate2"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="费率折扣:" prop="rateDiscount2">
          <el-input
            class="isInput"
            clearable
            v-model="shengou_forms.rateDiscount2"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="单笔费用:" prop="cost2">
          <el-input
            class="isInput"
            clearable
            v-model="shengou_forms.cost2"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">元/笔</span>
        </el-form-item>
      </el-form>

      <el-form
        v-if="edit_list.includes('赎回')"
        ref="shuhui_forms"
        size="normal"
        :model="shuhui_forms"
        label-width="80px"
        :rules="rules"
      >
        <h3>
          赎回
          <el-button :disabled="!isChange" @click="save_shuhui" size="mini" type="warning">保 存</el-button>
          <span class="errInfo" v-if="errInfo.includes(3)">适用范围数据有误！</span>
        </h3>
        <div class="toFlex">
          <el-form-item label="适用范围:">
            <div class="toFlex">
              <el-form-item prop="minTimeLimit">
                <el-input
                  type="number"
                  clearable
                  v-model="shuhui_forms.minTimeLimit"
                  placeholder="最大期限"
                ></el-input>
              </el-form-item>&nbsp;
              <el-form-item prop="minTimeSymbol">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="shuhui_forms.minTimeSymbol"
                >
                  <el-option
                    v-for="item in dictData.forMax"
                    :key="item.value"
                    :label="item.fuhao"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>

          <el-form-item label="赎回天数" label-width="80px">
            <div class="toFlex">
              <el-form-item prop="maxTimeSymbol">
                <el-select
                  filterable
                  clearable
                  placeholder="请选择"
                  v-model="shuhui_forms.maxTimeSymbol"
                >
                  <el-option
                    v-for="item in dictData.forMax"
                    :key="item.value"
                    :label="item.fuhao"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>&nbsp;
              <el-form-item prop="maxTimeLimit">
                <el-input
                  type="number"
                  clearable
                  v-model="shuhui_forms.maxTimeLimit"
                  placeholder="最大期限"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </div>

        <el-form-item label="费率:" prop="rate3">
          <el-input
            class="isInput"
            clearable
            v-model="shuhui_forms.rate3"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="费率折扣:" prop="rateDiscount3">
          <el-input
            class="isInput"
            clearable
            v-model="shuhui_forms.rateDiscount3"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="单笔费用:" prop="cost3">
          <el-input
            class="isInput"
            clearable
            v-model="shuhui_forms.cost3"
            placeholder="请输入"
            type="number"
          ></el-input>
          <span class="isA">元/笔</span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 新增利率绩弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="newLiLvDia.title"
      :visible.sync="newLiLvDia.show"
      width="530px"
      :before-close="toCloseNewGuiZeDialog"
    >
      <el-form
        size="normal"
        :model="newLiLvDia.data"
        label-width="130px"
        label-suffix=":"
        :rules="rules"
        ref="lilvform"
      >
        <el-form-item label="期限" class="is50" prop="qixian">
          <el-input
            type="number"
            clearable
            v-model="newLiLvDia.data.qixian"
            placeholder="请输入"
            class="isInput"
          ></el-input>
        </el-form-item>

        <el-form-item prop="danwei" label="单位" class="is50">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="newLiLvDia.data.danwei"
          >
            <el-option
              size="mini"
              v-for="item in dictData.deadline_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="利率" class="is50" prop="lilv">
          <el-input
            type="number"
            clearable
            v-model="newLiLvDia.data.lilv"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <a class="isA">%</a>
        </el-form-item>

        <el-form-item label="锁定期限" class="is50" prop="lockQiXian">
          <el-input type="number" v-model="newLiLvDia.data.lockQiXian"></el-input>
        </el-form-item>

        <el-form-item prop="bangdan" label="榜单展示" class="is50">
          <el-select filterable placeholder="请选择" v-model="newLiLvDia.data.bangdan">
            <el-option
              size="mini"
              v-for="item in dictData.qianyueList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="lockBangDan" label="锁定期榜单展示" class="is50">
          <el-select filterable placeholder="请选择" v-model="newLiLvDia.data.lockBangDan">
            <el-option
              size="mini"
              v-for="item in dictData.qianyueList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="beizhu" class="is50">
          <el-input type="textarea" v-model="newLiLvDia.data.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveLiLv()" type="primary">保 存</el-button>
        <el-button @click="toCloseNewGuiZeDialog">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 历史业绩弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="更新业绩"
      :visible.sync="lishiYeJi"
      width="450px"
      :before-close="toCloseNewGuiZeDialog"
    >
      <el-form
        ref="ruleForm1"
        v-if="ruleForm1"
        size="normal"
        :rules="rules"
        :model="ruleForm1"
        label-width="110px"
      >
        <el-form-item label="单日涨幅:" prop="danri">
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.danri"
            style="width:calc(100% - 30px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item label="近一个月涨幅:" prop="oneMonth">
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.oneMonth"
            style="width:calc(100% - 30px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item label="近三个月涨幅:" prop="sanyue">
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.sanyue"
            style="width:calc(100% - 30px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item label="近六个月涨幅:" prop="liuyue">
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.liuyue"
            style="width:calc(100% - 30px);"
            @input="isChange=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item label="近一年涨幅:" prop="yinian">
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm1.yinian"
            style="width:calc(100% - 30px);"
            @input="isChange1=false"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :disabled="isChange" @click="save1" type="primary">保 存</el-button>
        <el-button @click="toCloseNewGuiZeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import baseinfo from "./baseInfo.vue";
import chart from "./chart.vue";
import forms from "./forms.vue";
import simple from "./simple.vue";
import jigou from "./jigou.vue";
import isTable from "./isTable/isTable.vue";
export default {
  props: {
    pageData: Object
  },
  components: {
    baseinfo,
    chart,
    forms,
    simple,
    jigou,
    isTable
  },
  data() {
    // 验证数字
    var checkNum1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum2 = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入"));
      } else if (value > 100) {
        callback(new Error("不能超过100"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || ("" + value).length < 0) {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };

    // 验证数字
    var check_rate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入"));
      } else if (+value > 100) {
        callback(new Error("请输入小于100的值"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.rengou_forms.rate = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_rateDiscount = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入"));
      } else if (+value > 100) {
        callback(new Error("请输入小于100的值"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.rengou_forms.rateDiscount = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_rate2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入"));
      } else if (+value > 100) {
        callback(new Error("请输入小于100的值"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.shengou_forms.rate2 = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_rateDiscount2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入"));
      } else if (+value > 100) {
        callback(new Error("请输入小于100的值"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.shengou_forms.rateDiscount2 = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_rate3 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入"));
      } else if (+value > 100) {
        callback(new Error("请输入小于100的值"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.shuhui_forms.rate3 = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_rateDiscount3 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入"));
      } else if (+value > 100) {
        callback(new Error("请输入小于100的值"));
      } else if (+value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.shuhui_forms.rateDiscount3 = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_danri = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入单日涨幅"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.ruleForm1.danri = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_oneMonth = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入近一个月涨幅"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.ruleForm1.oneMonth = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_sanyue = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入近三个月涨幅"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.ruleForm1.sanyue = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_liuyue = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入近六个月涨幅"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.ruleForm1.liuyue = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_yinian = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入近一年月涨幅"));
      } else if (("" + value).length > 19) {
        callback(new Error("请输入1-19字符"));
      } else {
        this.ruleForm1.yinian = (+value).toFixed(2);
        callback();
      }
    };

    return {
      errInfo: [], // 记录认购、申购、赎回的认证错误
      rengou: {},
      shengou: {},
      shuhui: {},
      lilvForms: [], // 展示利率用
      loadEnd: false, // 控制表格的显示隐藏（机构管理详情底下的表）
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
      dictData: null, // 字典数据
      pageType: null,
      checkTable: null, // 基金公司管理下边的四个表格切换
      checkList: [], // 用来切换表单
      newGuiZe: false, // 新增规则弹框
      lishiYeJi: false, // 历史业绩弹框
      newLiLv: false, // 新增利率弹框
      guize_httpType: "", // 用来控制编辑、新增时显示的checkbox
      edit_list: [], // 用来控制新增时显示哪些表单项
      // 认购
      rengou_forms: {
        rate: "0.00", // 费率
        rateDiscount: "0.00", // 费率折扣
        cost: "", // 单笔费用
        minTransactionAmount: "", // 金额
        minAmountUnit: "1", // 金额单位
        minAmountSymbol: "&le", // 金额符号标识
        maxTransactionAmount: "", // 最大交易金额
        maxAmountUnit: "1", // 交易金额单位
        maxAmountSymbol: "&le" // 交易金额符号标识
      },
      // 申购
      shengou_forms: {
        rate2: "0.00", // 费率
        rateDiscount2: "0.00", // 费率折扣
        cost2: "", // 单笔费用
        minTransactionAmount2: "", // 金额
        minAmountUnit2: "1", // 金额单位
        minAmountSymbol2: "&le", // 金额符号标识
        maxTransactionAmount2: "", // 最大交易金额
        maxAmountUnit2: "1", // 交易金额单位
        maxAmountSymbol2: "&le" // 交易金额符号标识
      },
      // 赎回
      shuhui_forms: {
        rate3: "0.00", // 费率
        rateDiscount3: "0.00", // 费率折扣
        cost3: "", // 单笔费用
        minTimeLimit: "", // 期限
        minTimeSymbol: "&le", // 期限符号标识
        maxTimeLimit: "", // 天数
        maxTimeSymbol: "&le" // 天数符号标识
      },
      ruleForm1: {
        // 历史业绩的更新
        danri: "",
        sanyue: "",
        liuyue: "",
        yinian: "",
        oneMonth: ""
      },
      // 新增利率弹框
      newLiLvDia: {
        show: false,
        title: "",
        data: {
          qixian: "",
          lilv: "",
          beizhu: "",
          danwei: "",
          lockQiXian: "", // 锁定期限
          bangdan: "", // 榜单展示
          lockBangDan: "" // 锁定期榜单展示
        }
      },

      isChange: true, // 控制数据是否可以提交(保存按钮的可点击)
      forJiGouCom: {}, // 传给机构组件的数据
      rules: {
        // 利率弹框的验证
        qixian: [
          { validator: checkNum2, trigger: "blur" },
          { required: true, message: "请输入期限", trigger: "blur" }
        ],
        lilv: [
          { validator: checkNum3, trigger: "blur" },
          { required: true, message: "请输入利率", trigger: "blur" }
        ],
        lockQiXian: [
          { validator: checkNum2, trigger: "blur" },
          { required: true, message: "请输入锁定期限", trigger: "blur" }
        ],
        beizhu: [
          { min: 1, max: 100, message: "字典值为1-100个字符", trigger: "blur" },
          { message: "请输入锁定期限", trigger: "blur" }
        ],
        danwei: [
          { required: true, message: "请选择期限单位", trigger: "blur" }
        ],
        lockBangDan: [
          { required: true, message: "请选锁定期榜单展示", trigger: "change" }
        ],
        bangdan: [
          { required: true, message: "请选择榜单展示", trigger: "change" }
        ],
        danri: [{ required: true, validator: check_danri, trigger: "blur" }],
        oneMonth: [
          { required: true, validator: check_oneMonth, trigger: "blur" }
        ],
        sanyue: [{ required: true, validator: check_sanyue, trigger: "blur" }],
        liuyue: [{ required: true, validator: check_liuyue, trigger: "blur" }],
        yinian: [{ required: true, validator: check_yinian, trigger: "blur" }],

        rate: [{ validator: check_rate, trigger: "blur" }],
        rateDiscount: [{ validator: check_rateDiscount, trigger: "blur" }],

        rate2: [{ validator: check_rate2, trigger: "blur" }],
        rateDiscount2: [{ validator: check_rateDiscount2, trigger: "blur" }],

        rate3: [{ validator: check_rate3, trigger: "blur" }],
        rateDiscount3: [{ validator: check_rateDiscount3, trigger: "blur" }],

        minAmountSymbol: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        minAmountUnit: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        maxAmountSymbol: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        maxAmountUnit: [
          { required: true, message: "请选择", trigger: "change" }
        ],

        minAmountSymbol2: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        minAmountUnit2: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        maxAmountSymbol2: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        maxAmountUnit2: [
          { required: true, message: "请选择", trigger: "change" }
        ],

        minTimeSymbol: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        maxTimeSymbol: [
          { required: true, message: "请选择", trigger: "change" }
        ],

        minTransactionAmount: [{ validator: checkNum1, trigger: "blur" }],
        maxTransactionAmount: [{ validator: checkNum1, trigger: "blur" }],
        minTransactionAmount2: [{ validator: checkNum1, trigger: "blur" }],
        maxTransactionAmount2: [{ validator: checkNum1, trigger: "blur" }],
        minTimeLimit: [{ validator: checkNum1, trigger: "blur" }],
        maxTimeLimit: [{ validator: checkNum1, trigger: "blur" }]
      }
    };
  },
  created() {
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
  },
  mounted() {
    this.init(); // 页面初始化
  },
  methods: {
    get_isEditButton() {
      document.querySelector("#isEditButton").click();
    },
    // 监听表格的操作
    tableEmit(data) {
      let name = "";
      switch (data.type) {
        case "regetData": // 分页的emit
          this.changeFn();
          break;
        case "delete": // 单独删除按钮
          this.toDelete(data.data.id);
          break;
        case "textClick": // 单独删除按钮
          if (this.checkTable != "存款产品") {
            switch (this.checkTable) {
              case "货币基金":
                name = "money_fund_info";
                sessionStorage.setItem("page", "货币基金管理");
                break;
              case "理财产品":
                name = "manage_money_matters_info";
                sessionStorage.setItem("page", "理财管理");
                break;
              case "纯债基金":
                name = "pure_debt_fund_info";
                sessionStorage.setItem("page", "纯债基金管理");
                break;
            }

            this.$router.push({
              name: name,
              query: {
                id: data.data.id,
                type: data.data.productSubtype,
                name: data.data.name
              }
            });
          } else {
            sessionStorage.setItem("page", "存款管理");
            this.$router.push({
              name: "deposit_info",
              query: {
                id: data.data.id, // 产品 id
                name: data.data.name, // 产品名称
                type: data.data.productSubtype // 产品类型
              }
            });
          }
          break;
      }
    },

    init() {
      let page = this.pageData.page;
      switch (page) {
        case "pure_debt_fund": // 纯债基金管理
          this.get_chunzhai_xiangqing();
          break;
        case "money_fund": // 货币基金
          this.get_huobi_xiangqing();
          break;
        case "wmp": // 理财管理
          this.get_licai_xiangqing();
          break;
        case "wmp_insurance": // 保险理财
          this.get_baoxian_xiangqing();
          break;
        case "organizational": // 机构管理
          this.checkList = [
            {
              id: "0",
              name: "纯债基金"
            },
            {
              id: "1",
              name: "货币基金"
            },
            {
              id: "2",
              name: "理财产品"
            },
            {
              id: "3",
              name: "存款产品"
            }
          ];
          this.checkTable = this.checkList[0].name;
          this.forJiGouCom = this.pageData;
          this.jigouguanli_data();
          this.changeFn();
          break;
        case "fund_company": // 基金管理
          this.checkList = [
            {
              id: "0",
              name: "纯债基金"
            },
            {
              id: "1",
              name: "货币基金"
            }
          ];
          this.checkTable = this.checkList[0].name;
          this.get_jijingongsi_xiangqing();
          this.changeFn();
          break;
        case "demand_deposit": // 活期存款管理
          this.get_huoqi_xiangqing();
          break;
        case "time_deposit": // 定期存款管理
          this.get_dingqi_xiangqing();
          break;
        case "large_deposit": // 大额存单管理
          this.get_big_xiangqing();
          break;
        case "intelligent_deposit": // 智能存款管理
          this.get_zhineng_xiangqing();
          break;
        case "structured_deposit": // 结构存款管理
          this.get_jiegou_xiangqing();
          break;
      }
    },
    // // 监听更新利率的表格的操作（暂时作废）
    // tableAct(data) {
    //   if (data.type === "add") {
    //     this.newLiLvDia.data.spuId = +data.data; // 存款ID
    //     this.newLiLvDia.title = "新增利率";
    //     this.newLiLvDia.type = data.type;
    //     this.newLiLvDia.show = true;
    //   } else if (data.type === "edit") {
    //     // 获取利率
    //     this.$api
    //       .get_lilv({
    //         vm: this,
    //         id: data.data.id
    //       })
    //       .then(res => {
    //         if (res) {
    //           this.newLiLvDia = {
    //             type: data.type,
    //             show: false,
    //             title: "编辑利率",
    //             data: {
    //               id: res.data.id,
    //               spuId: res.data.spuId,
    //               qixian: res.data.deadline,
    //               lilv: res.data.interestRate,
    //               beizhu: res.data.remark,
    //               danwei: res.data.timeUnitType,
    //               lockQiXian: res.data.lockinPeriod, // 锁定期限
    //               bangdan: res.data.showList, // 榜单展示
    //               lockBangDan: res.data.lockinShowList // 锁定期榜单展示
    //             }
    //           };
    //           this.newLiLvDia.show = true;
    //         }
    //       });
    //   } else if (data.type === "delete") {
    //     this.$api
    //       .delete_lilv({
    //         vm: this,
    //         data: data.data.id
    //       })
    //       .then(res => {
    //         if (res) {
    //           this.$message.success("操作成功！");
    //           this.init();
    //           this.toCloseNewGuiZeDialog();
    //         }
    //       });
    //   }
    // },
    // 新增利率弹框保存
    // saveLiLv() {
    //   this.$refs.lilvform.validate(valid => {
    //     if (valid) {
    //       let datas = this.newLiLvDia.data,
    //         obj = {}, // 最终使用的数据
    //         httpType = ""; // 请求方式
    //       if (this.newLiLvDia.type === "edit") {
    //         // 编辑
    //         obj = {
    //           id: datas.id,
    //           spuId: datas.spuId,
    //           deadline: +datas.qixian,
    //           timeUnitType: datas.danwei,
    //           timeUnitLabel: "",
    //           interestRate: +datas.lilv,
    //           remark: datas.beizhu,
    //           lockinPeriod: +datas.lockQiXian,
    //           showList: datas.bangdan,
    //           lockinShowList: datas.lockBangDan
    //         };
    //         httpType = "put";
    //       } else {
    //         // 新增
    //         obj = {
    //           spuId: +datas.spuId,
    //           deadline: +datas.qixian,
    //           timeUnitType: datas.danwei,
    //           timeUnitLabel: "",
    //           interestRate: +datas.lilv,
    //           remark: datas.beizhu,
    //           lockinPeriod: +datas.lockQiXian,
    //           showList: datas.bangdan,
    //           lockinShowList: datas.lockBangDan
    //         };
    //         httpType = "post";
    //       }
    //       // 期限label
    //       obj.timeUnitLabel = obj.timeUnitType
    //         ? this.dictData.deadline_type.filter(
    //             item => item.value === obj.timeUnitType
    //           )[0].label
    //         : "";
    //       this.$api
    //         .lilv_list({
    //           vm: this,
    //           httpType: httpType,
    //           data: obj
    //         })
    //         .then(res => {
    //           if (res) {
    //             this.$message.success("操作成功！");
    //             this.init();
    //             this.toCloseNewGuiZeDialog();
    //             this.$refs.lilvform.resetFields();
    //           }
    //         });
    //     } else {
    //       this.$message.error("请输入必填数据！");
    //     }
    //   });
    // },
    // 获取理财管理产品详情
    get_licai_xiangqing() {
      this.$api
        .get_licai_info_data({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "forProduct", null);
            this.$set(this.pageData, "forChart", null);
            let stepsTop = {
              // 步骤条数据
              table: [
                {
                  title: "起购金额",
                  num: res.data.minAmount + " 元"
                },
                {
                  title: "递增金额",
                  num: res.data.increaseAmount + " 元"
                },
                {
                  title: "剩余额度",
                  num: res.data.surplusQuotaLabel
                }
              ],
              steps: [
                {
                  title: "募集开始",
                  text: new Date(res.data.raiseDate[0]).toLocaleDateString()
                },
                {
                  title: "募集结束",
                  text: new Date(res.data.raiseDate[1]).toLocaleDateString()
                },
                {
                  title: "起息日",
                  text: new Date(res.data.valueDate).toLocaleDateString()
                },
                {
                  title: "到期",
                  text: new Date(
                    res.data.managementDate[1]
                  ).toLocaleDateString()
                }
              ]
            };
            this.$nextTick(() => {
              this.$set(this.pageData, "forProduct", res.data);
              this.$set(this.pageData, "forChart", stepsTop);
            });
          }
        });
    },
    // 保险理财产品详情
    get_baoxian_xiangqing() {
      this.$api
        .get_baoxian_info_data({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "forProduct", null);
            this.$set(this.pageData, "forChart", null);
            let stepsTop = {
              // 步骤条数据
              table: [
                {
                  title: "起购金额",
                  num: res.data.minAmount + " 元"
                },
                {
                  title: "递增金额",
                  num: res.data.increaseAmount + " 元"
                },
                {
                  title: "剩余额度",
                  num: res.data.surplusQuotaLabel
                }
              ],
              steps: [
                {
                  title: "起息日",
                  text: new Date(
                    res.data.managementDate[0]
                  ).toLocaleDateString()
                },
                {
                  title: "到期日",
                  text: new Date(
                    res.data.managementDate[1]
                  ).toLocaleDateString()
                }
              ]
            };
            this.$nextTick(() => {
              this.$set(this.pageData, "forProduct", res.data);
              this.$set(this.pageData, "forChart", stepsTop);
            });
          }
        });
    },
    // 机构管理获取数据
    jigouguanli_data() {
      this.$api
        .get_jigouInfo({
          vm: this,
          id: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.forJiGouCom, "datas", null);
            this.$nextTick(() => {
              this.$set(this.forJiGouCom, "datas", res.data);
            });
          }
        });
    },
    // 活期存款数据
    get_huoqi_xiangqing() {
      this.$api
        .huoqi_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            setTimeout(() => this.$set(this.pageData, "datas", res.data));
          }
        });
    },
    // 定期存款数据
    get_dingqi_xiangqing() {
      this.$api
        .dingqi_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            this.$nextTick(() => {
              this.$set(this.pageData, "datas", res.data);
              this.lilvForms = res.data.interestRates.map(item => {
                let obj = {
                  id: item.id,
                  spuId: item.spuId,
                  minDeadline: item.fromTerm, // 最小期限
                  min_danwei: item.fromTermUnitType, // 最小期限单位
                  min_symbol: item.fromTermSymbolType, // 最小单位符号
                  maxDeadline: item.toTerm, // 最大期限
                  max_danwei: item.toTermUnitType, // 最大期限单位
                  max_symbol: item.toTermSymbolType, // 最小单位符号
                  lilv: item.interestRate, // 利率
                  lockinPeriod: item.lockinPeriod, // 锁定期限
                  showList: item.showList, // 榜单展示
                  lockinShowList: item.lockinShowList, // 锁定期榜单展示
                  remark: item.remark, // 备注
                  homepageCopywriting: item.homepageCopywriting, // 首页文案
                  detailCopywriting: item.detailCopywriting, // 详情页文案
                  bankCopywriting: item.bankCopywriting, //  银行文案

                  showProduct: item.productList, //  产品展示
                  bangdanWrite: item.termCopywriting //  榜单期限文案
                };
                return obj;
              });

              // 利率表格的数据
              // let forms = {
              //   type: "dingqi",
              //   dingqi: {
              //     topClick: true, // 表格上边的新增利率
              //     fenye: true, // 是否需要分页
              //     pageNum: 0, // 当前页妈
              //     // 表格头部的蓝点
              //     titleUp: {
              //       pointName: "利率"
              //     },
              //     // 表格头部
              //     title: [
              //       {
              //         prop: "num", // 要显示的属性
              //         label: "序号", // 要显示的文字
              //         width: "100" // 当前项的宽度
              //       },
              //       {
              //         prop: "qixian", // 要显示的属性
              //         label: "期限", // 要显示的文字
              //         width: "100" // 当前项的宽度
              //       },
              //       {
              //         prop: "danwei", // 要显示的属性
              //         label: "单位", // 要显示的文字
              //         width: "100" // 当前项的宽度
              //       },
              //       {
              //         prop: "lilv", // 要显示的属性
              //         label: "利率(%)", // 要显示的文字
              //         width: "100" // 当前项的宽度
              //       },
              //       {
              //         prop: "beizhu", // 要显示的属性
              //         label: "备注", // 要显示的文字
              //         width: "100" // 当前项的宽度
              //       }
              //     ],
              //     handle: [
              //       // 表格执行的操作
              //       {
              //         click: "edit", // 表格操作栏的点击事件
              //         text: "编辑" // 表格操作栏的点击事件
              //       },
              //       {
              //         click: "delete", // 表格操作栏的点击事件
              //         text: "删除" // 表格操作栏的点击事件
              //       }
              //     ],
              //     // 表格数据
              //     dataTotal: []
              //   }
              // };
              // let arr = res.data.interestRates;

              // if (arr.length > 0) {
              //   for (let i = 0; i < arr.length; i++) {
              //     let obj = {
              //       num: i + 1,
              //       qixian: arr[i].deadline,
              //       danwei: arr[i].timeUnitLabel,
              //       lilv: arr[i].interestRate,
              //       beizhu: arr[i].remark,
              //       id: arr[i].id,
              //       parentID: arr[i].spuId
              //     };
              //     forms.dingqi.dataTotal.push(obj);
              //   }
              // }
              // this.$set(this.pageData, "forForms", forms);
            });
          }
        });
    },
    // 大额存款管理
    get_big_xiangqing() {
      this.$api
        .big_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            this.$nextTick(() => {
              this.$set(this.pageData, "datas", res.data);
              this.lilvForms = res.data.interestRates.map(item => {
                let obj = {
                  id: item.id,
                  spuId: item.spuId,
                  minDeadline: item.fromTerm, // 最小期限
                  min_danwei: item.fromTermUnitType, // 最小期限单位
                  min_symbol: item.fromTermSymbolType, // 最小单位符号
                  maxDeadline: item.toTerm, // 最大期限
                  max_danwei: item.toTermUnitType, // 最大期限单位
                  max_symbol: item.toTermSymbolType, // 最小单位符号
                  lilv: item.interestRate, // 利率
                  lockinPeriod: item.lockinPeriod, // 锁定期限
                  showList: item.showList, // 榜单展示
                  lockinShowList: item.lockinShowList, // 锁定期榜单展示
                  remark: item.remark, // 备注
                  homepageCopywriting: item.homepageCopywriting, // 首页文案
                  detailCopywriting: item.detailCopywriting, // 详情页文案
                  bankCopywriting: item.bankCopywriting, //  银行文案

                  showProduct: item.productList, //  产品展示
                  bangdanWrite: item.termCopywriting //  榜单期限文案
                };
                return obj;
              });
            });
          }
        });
    },
    // 智能存款数据
    get_zhineng_xiangqing() {
      this.$api
        .zhineng_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            this.$set(this.pageData, "forForms", null);

            this.$nextTick(() => {
              this.$set(this.pageData, "datas", res.data);
              this.lilvForms = res.data.interestRates.map(item => {
                let obj = {
                  id: item.id,
                  spuId: item.spuId,
                  minDeadline: item.fromTerm, // 最小期限
                  min_danwei: item.fromTermUnitType, // 最小期限单位
                  min_symbol: item.fromTermSymbolType, // 最小单位符号
                  maxDeadline: item.toTerm, // 最大期限
                  max_danwei: item.toTermUnitType, // 最大期限单位
                  max_symbol: item.toTermSymbolType, // 最小单位符号
                  lilv: item.interestRate, // 利率
                  lockinPeriod: item.lockinPeriod, // 锁定期限
                  showList: item.showList, // 榜单展示
                  lockinShowList: item.lockinShowList, // 锁定期榜单展示
                  remark: item.remark, // 备注
                  homepageCopywriting: item.homepageCopywriting, // 首页文案
                  detailCopywriting: item.detailCopywriting, // 详情页文案
                  bankCopywriting: item.bankCopywriting, //  银行文案

                  showProduct: item.productList, //  产品展示
                  bangdanWrite: item.termCopywriting //  榜单期限文案
                };
                return obj;
              });

              // // 利率表格的数据
              // let forms = {
              //   type: "zhineng",
              //   zhineng: {
              //     topClick: true, // 表格上边的新增利率
              //     fenye: true, // 是否需要分页
              //     pageNum: 0, // 当前页妈
              //     // 表格头部的蓝点
              //     titleUp: {
              //       pointName: "利率"
              //     },
              //     // 表格头部
              //     title: [
              //       {
              //         prop: "num", // 要显示的属性
              //         label: "序号", // 要显示的文字
              //         width: "100" // 当前项的宽度
              //       },
              //       {
              //         prop: "qixian", // 要显示的属性
              //         label: "期限", // 要显示的文字
              //         width: "100" // 当前项的宽度
              //       },
              //       {
              //         prop: "danwei", // 要显示的属性
              //         label: "单位", // 要显示的文字
              //         width: "100" // 当前项的宽度
              //       },
              //       {
              //         prop: "lilv", // 要显示的属性
              //         label: "利率(%)", // 要显示的文字
              //         width: "100" // 当前项的宽度
              //       },
              //       {
              //         prop: "beizhu", // 要显示的属性
              //         label: "备注", // 要显示的文字
              //         width: "100" // 当前项的宽度
              //       }
              //     ],
              //     handle: [
              //       // 表格执行的操作
              //       {
              //         click: "edit", // 表格操作栏的点击事件
              //         text: "编辑" // 表格操作栏的点击事件
              //       },
              //       {
              //         click: "delete", // 表格操作栏的点击事件
              //         text: "删除" // 表格操作栏的点击事件
              //       }
              //     ],
              //     // 表格数据
              //     dataTotal: []
              //   }
              // };
              // let arr = res.data.interestRates;

              // if (arr.length > 0) {
              //   for (let i = 0; i < arr.length; i++) {
              //     let obj = {
              //       num: i + 1,
              //       qixian: arr[i].deadline,
              //       danwei: arr[i].timeUnitLabel,
              //       lilv: arr[i].interestRate,
              //       beizhu: arr[i].remark,
              //       id: arr[i].id,
              //       parentID: arr[i].spuId
              //     };

              //     forms.zhineng.dataTotal.push(obj);
              //   }
              // }
              // this.$set(this.pageData, "forForms", forms);
            });
          }
        });
    },
    // 显示预览的单位
    seeDanWei1(tar) {
      let danwei = this.dictData.deadline_type;
      let target = danwei.filter(item => item.value == tar.min_danwei)[0];
      if (target) {
        return target.label;
      }
      return "";
    },
    seeDanWei2(tar) {
      let danwei = this.dictData.deadline_type;
      let target = danwei.filter(item => item.value == tar.max_danwei)[0];
      if (target) {
        return target.label;
      }
      return "";
    },
    seeFuHao1(tar) {
      let target = this.dictData.forMax.filter(
        item => item.value == tar.min_symbol
      )[0];
      if (target) {
        return target.fuhao;
      }
      return "";
    },
    seeFuHao2(tar) {
      let target = this.dictData.forMax.filter(
        item => item.value == tar.max_symbol
      )[0];
      if (target) {
        return target.fuhao;
      }
      return "";
    },
    // 结构存款数据
    get_jiegou_xiangqing() {
      this.$api
        .jigou_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "datas", null);
            setTimeout(() => this.$set(this.pageData, "datas", res.data));
          }
        });
    },
    // 获取认购
    get_rengou() {
      this.$api
        .get_rengou({
          vm: this,
          data: {
            pageNum: this.rengou.pageNum,
            pageSize: this.rengou.pageSize,
            productUuid: this.rengou.productUuid,
            type: "subscribe"
          }
        })
        .then(res => {
          if (res) {
            this.$set(this.rengou, "rengou", null);
            this.$nextTick(() => {
              let rengou_forms = {
                fenye_other: true, // 是否需要分页
                pageNum: 0, // 当前页妈
                // 表格头部的蓝点
                titleUp: {
                  pointName: "认购费率规则"
                },
                total: res.data.total,
                // 表格头部
                title: [
                  {
                    prop: "num",
                    label: "序号",
                    width: "50"
                  },
                  {
                    prop: "id",
                    label: "ID",
                    width: "50"
                  },
                  {
                    prop: "jine",
                    label: "金额",
                    width: "220"
                  },
                  {
                    prop: "feilv",
                    label: "费率(%)",
                    width: "100"
                  },
                  {
                    prop: "danbi",
                    label: "单笔费用",
                    width: "100"
                  },
                  {
                    prop: "youhui",
                    label: "优惠折扣(%)",
                    width: "100"
                  }
                ],
                handle: [
                  // 表格执行的操作
                  {
                    click: "edit",
                    text: "编辑"
                  },
                  {
                    click: "delete",
                    text: "删除"
                  }
                ],
                // 表格数据
                dataTotal: []
              };
              let kk = res.data.list;
              for (let i = 0; i < kk.length; i++) {
                rengou_forms.dataTotal.push({
                  type: "rengou",
                  num: i + 1,
                  id: kk[i].id,
                  jine: kk[i].amountLabel, // 金额
                  feilv: kk[i].rate, // 费率
                  danbi: this.make_point(kk[i].cost, true), // 单笔费用
                  youhui: kk[i].rateDiscount, // 优惠折扣
                  from: kk[i] // 保存原始数据
                });
              }
              this.$set(this.rengou, "rengou", rengou_forms);
            });
          }
        });
    },
    // 获取申购
    get_shengou() {
      this.$api
        .get_shengou({
          vm: this,
          data: {
            pageNum: this.shengou.pageNum,
            pageSize: this.shengou.pageSize,
            productUuid: this.shengou.productUuid,
            type: "apply_for_purchase"
          }
        })
        .then(res => {
          if (res) {
            this.$set(this.shengou, "shengou", null);
            this.$nextTick(() => {
              let shengou_forms = {
                fenye_other: true, // 是否需要分页
                pageNum: 0, // 当前页妈
                // 表格头部的蓝点
                titleUp: {
                  pointName: "申购费率规则"
                },
                total: res.data.total,
                // 表格头部
                title: [
                  {
                    prop: "num",
                    label: "序号",
                    width: "50"
                  },
                  {
                    prop: "id",
                    label: "ID",
                    width: "50"
                  },
                  {
                    prop: "jine",
                    label: "金额",
                    width: "200"
                  },
                  {
                    prop: "feilv",
                    label: "费率(%)",
                    width: "90"
                  },
                  {
                    prop: "danbi",
                    label: "单笔费用",
                    width: "110"
                  },
                  {
                    prop: "youhui",
                    label: "优惠折扣(%)",
                    width: "90"
                  }
                ],
                handle: [
                  // 表格执行的操作
                  {
                    click: "edit",
                    text: "编辑"
                  },
                  {
                    click: "delete",
                    text: "删除"
                  }
                ],
                // 表格数据
                dataTotal: []
              };
              let kk = res.data.list;
              for (let i = 0; i < kk.length; i++) {
                shengou_forms.dataTotal.push({
                  type: "shengou",
                  num: i + 1,
                  id: kk[i].id,
                  jine: kk[i].amountLabel,
                  feilv: kk[i].rate,
                  danbi: this.make_point(kk[i].cost, true),
                  youhui: kk[i].rateDiscount,
                  from: kk[i] // 保存原始数据
                });
              }
              this.$set(this.shengou, "shengou", shengou_forms);
            });
          }
        });
    },
    // 获取赎回
    get_shuhui() {
      this.$api
        .get_shuhui({
          vm: this,
          data: {
            pageNum: this.shuhui.pageNum,
            pageSize: this.shuhui.pageSize,
            productUuid: this.shuhui.productUuid
          }
        })
        .then(res => {
          if (res) {
            this.$set(this.shuhui, "shuhui", null);
            this.$nextTick(() => {
              let shuhui_forms = {
                fenye_other: true, // 是否需要分页
                pageNum: 0, // 当前页妈
                // 表格头部的蓝点
                titleUp: {
                  pointName: "赎回费率规则"
                },
                total: res.data.total,
                // 表格头部
                title: [
                  {
                    prop: "num",
                    label: "序号",
                    width: "50"
                  },
                  {
                    prop: "id",
                    label: "ID",
                    width: "50"
                  },
                  {
                    prop: "jine",
                    label: "金额",
                    width: "220"
                  },
                  {
                    prop: "feilv",
                    label: "费率(%)",
                    width: "100"
                  },
                  {
                    prop: "danbi",
                    label: "单笔费用",
                    width: "100"
                  },
                  {
                    prop: "youhui",
                    label: "优惠折扣(%)",
                    width: "100"
                  }
                ],
                handle: [
                  // 表格执行的操作
                  {
                    click: "edit",
                    text: "编辑"
                  },
                  {
                    click: "delete",
                    text: "删除"
                  }
                ],
                // 表格数据
                dataTotal: []
              };
              let kk = res.data.list;

              for (let i = 0; i < kk.length; i++) {
                shuhui_forms.dataTotal.push({
                  type: "shuhui",
                  num: i + 1,
                  id: kk[i].id,
                  jine: kk[i].timeLabel,
                  feilv: kk[i].rate,
                  danbi: this.make_point(kk[i].cost, true),
                  youhui: kk[i].rateDiscount,
                  from: kk[i] // 保存原始数据
                });
              }
              this.$set(this.shuhui, "shuhui", shuhui_forms);
            });
          }
        });
    },

    // 纯债基金详情页面的所有数据
    get_chunzhai_xiangqing() {
      this.$api // 获取详情 1
        .getChunZhaiInfoData({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "forProduct", null);
            this.$set(this.pageData, "forLishi", null);
            this.$set(this.pageData, "forSimple", null);
            this.$set(this.pageData, "forChart", null);

            this.$nextTick(() => {
              let lishi_forms = {
                  // 历史业绩使用
                  id: res.data.performance.id,
                  productUuid: res.data.performance.productUuid,
                  type: "lishi",
                  lishi: {
                    handle: [],
                    // 表格头部
                    title: [
                      {
                        prop: "date",
                        label: "日期",
                        width: "130"
                      },
                      {
                        prop: "up_down",
                        label: "涨跌",
                        width: "100"
                      }
                    ],
                    // 表格数据
                    dataTotal: [
                      {
                        date: "单日",
                        up_down:
                          res.data.performance.oneDayIncrease > 0
                            ? `+${res.data.performance.oneDayIncrease}%`
                            : `${res.data.performance.oneDayIncrease}%`,
                        color:
                          res.data.performance.oneDayIncrease > 0
                            ? "red"
                            : "green"
                      },
                      {
                        date: "近一个月涨幅",
                        up_down:
                          res.data.performance.oneMonthIncrease > 0
                            ? `+${res.data.performance.oneMonthIncrease}%`
                            : `${res.data.performance.oneMonthIncrease}%`,
                        color:
                          res.data.performance.oneMonthIncrease > 0
                            ? "red"
                            : "green"
                      },
                      {
                        date: "近三个月涨幅",
                        up_down:
                          res.data.performance.threeMonthIncrease > 0
                            ? `+${res.data.performance.threeMonthIncrease}%`
                            : `${res.data.performance.threeMonthIncrease}%`,
                        color:
                          res.data.performance.threeMonthIncrease > 0
                            ? "red"
                            : "green"
                      },
                      {
                        date: "近六个月涨幅",
                        up_down:
                          res.data.performance.sixMonthIncrease > 0
                            ? `+${res.data.performance.sixMonthIncrease}%`
                            : `${res.data.performance.sixMonthIncrease}%`,
                        color:
                          res.data.performance.sixMonthIncrease > 0
                            ? "red"
                            : "green"
                      },
                      {
                        date: "近一年涨幅",
                        up_down:
                          res.data.performance.oneYearIncrease > 0
                            ? `+${res.data.performance.oneYearIncrease}%`
                            : `${res.data.performance.oneYearIncrease}%`,
                        color:
                          res.data.performance.oneYearIncrease > 0
                            ? "red"
                            : "green"
                      }
                    ]
                  },
                  createTime: res.data.performance.gmtModified,
                  who: res.data.performance.modifierName
                },
                simple_data = {
                  id: res.data.id,
                  updateTime: res.data.dealGmtModified,
                  kehupinglun: res.data.commentNum,
                  guanzhu: res.data.flowNum,
                  fenxiang: res.data.shareNum,
                  shengoubishu: res.data.actualBuyNum
                };
              this.$set(this.pageData, "forProduct", res.data);
              this.$set(this.pageData, "forLishi", lishi_forms);
              this.$set(this.pageData, "forSimple", simple_data);
              this.$set(this.pageData, "forChart", {
                page: "pure_debt_fund",
                id: res.data.uuid
              });
              this.rengou = {
                pageNum: 1,
                pageSize: 5,
                productUuid: res.data.uuid,
                type: "rengou",
                rengou: null
              };
              this.shengou = {
                productUuid: res.data.uuid,
                type: "shengou",
                pageNum: 1,
                pageSize: 5,
                shengou: null
              };
              this.shuhui = {
                productUuid: res.data.uuid,
                type: "shuhui",
                pageNum: 1,
                pageSize: 5,
                shuhui: null
              };
              Promise.all([
                this.get_rengou(),
                this.get_shengou(),
                this.get_shuhui()
              ]);
            });
          }
        });
    },

    // 货币基金详情页面的所有数据
    get_huobi_xiangqing() {
      this.$api
        .get_huobi_info_data({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
            this.$set(this.pageData, "forProduct", null);
            this.$set(this.pageData, "forChart", null);

            this.$nextTick(() => {
              this.$set(this.pageData, "forChart", {
                page: "money_fund",
                id: res.data.uuid
              });
              this.$set(this.pageData, "forProduct", res.data);
            });
          }
        });
    },
    // 获取基金公司详情
    get_jijingongsi_xiangqing() {
      this.$api
        .get_jijingongsi_info({
          vm: this,
          id: this.pageData.id
        })
        .then(res => {
          this.$set(this.pageData, "datas", null);
          this.$nextTick(() => (this.pageData.datas = res.data));
        });
    },

    // 各个子编辑完重新获取数据
    toReGetData(type) {
      switch (type) {
        case "chunzhai": // 纯债编辑完
          this.get_chunzhai_xiangqing();
          break;
        case "huoqi": // 活期存款管理编辑完
          this.get_huoqi_xiangqing();
          break;
        case "dingqi": // 定期存款管理编辑完
          this.get_dingqi_xiangqing();
          break;
        case "big": // 大额存单管理
          this.get_big_xiangqing();
          break;
        case "zhineng": // 智能存款管理编辑完
          this.get_zhineng_xiangqing();
          break;
        case "jiegou": // 结构存款管理编辑完
          this.get_jiegou_xiangqing();
          break;
        case "huobi": // 货币基金编辑完
          this.get_huobi_xiangqing();
          break;
        case "licai": // 理财管理编辑完
          this.get_licai_xiangqing();
          break;
        case "baoxian": // 保险理财编辑完
          this.get_baoxian_xiangqing();
          break;
        case "organizational": // 理财管理编辑完
          this.jigouguanli_data();
          break;
      }
    },
    /****************************************************************************/
    // 存款管理左侧系列里的新增、编辑按钮弹框
    // 关闭弹框
    toCloseNewGuiZeDialog() {
      this.newGuiZe = false;
      this.isChange = true;
      this.newLiLvDia = {
        // 新增利率弹框
        type: "",
        show: false,
        title: "",
        data: {
          qixian: "",
          lilv: "",
          beizhu: "",
          danwei: "",
          lockQiXian: "", // 锁定期限
          bangdan: "", // 榜单展示
          lockBangDan: "" // 锁定期榜单展示
        }
      };

      this.lishiYeJi = false;
      this.isChange1 = true;
      this.ruleForm1 = {
        danri: "",
        sanyue: "",
        liuyue: "",
        yinian: "",
        oneMonth: ""
      };
      this.guize_httpType = "";
      this.edit_list = [];
      // 认购
      this.rengou_forms = {
        type: this.guize_httpType,
        rate: "", // 费率
        rateDiscount: "", // 费率折扣
        cost: "", // 单笔费用
        minTransactionAmount: "", // 金额
        minAmountUnit: "", // 金额单位
        minAmountSymbol: "", // 金额符号标识
        maxTransactionAmount: "", // 最大交易金额
        maxAmountUnit: "", // 交易金额单位
        maxAmountSymbol: "" // 交易金额符号标识
      };
      // 申购
      this.shengou_forms = {
        type: this.guize_httpType,
        rate2: "", // 费率
        rateDiscount2: "", // 费率折扣
        cost2: "", // 单笔费用
        minTransactionAmount2: "", // 金额
        minAmountUnit2: "", // 金额单位
        minAmountSymbol2: "", // 金额符号标识
        maxTransactionAmount2: "", // 最大交易金额
        maxAmountUnit2: "", // 交易金额单位
        maxAmountSymbol2: "" // 交易金额符号标识
      };
      // 赎回
      this.shuhui_forms = {
        type: this.guize_httpType, // 类型（认购/申购）
        rate3: "", // 费率
        rateDiscount3: "", // 费率折扣
        cost3: "", // 单笔费用
        minTimeLimit: "", // 期限
        minTimeSymbol: "", // 期限符号标识
        maxTimeLimit: "", // 天数
        maxTimeSymbol: "" // 天数符号标识
      };
    },
    // 切换表单
    changeFn() {
      let datas = {};
      datas.pageSize = this.tableInputData.pageSize;
      datas.pageNum = this.tableInputData.pageNum;

      if (this.pageData.page === "organizational") {
        datas.institutionId = this.pageData.id;
      }
      if (this.pageData.page === "fund_company") {
        datas.fundHouseId = this.pageData.id;
      }

      switch (this.checkTable) {
        case "货币基金":
          this.huobi_list(datas);
          break;
        case "理财产品":
          this.licai_list(datas);
          break;
        case "存款产品":
          this.cunkuan_list(datas);
          break;
        case "纯债基金":
          this.chunzai_list(datas);
          break;
      }
    },
    /////////////////////////////////////////////////////////////////////////////
    // 获取纯债基金数据后的处理
    chunzhai_list_after(data) {
      this.loadEnd = false;
      this.tableInputData = {
        // 传给table子组件的数据
        checkBox: false, // 判断需要不需要添加选择框
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
      };
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let arr = Object.keys(item);
          arr.forEach(str => {
            if (str === "dailyIncrease") {
              item[str] =
                +item[str] > 0
                  ? `+${(+item[str]).toFixed(2)}%`
                  : `${(+item[str]).toFixed(2)}%`;
            }
            if (str === "netAssetValue") {
              item[str] = `${(+item[str]).toFixed(4)}`;
            }
            if (str === "netAccumulateValue") {
              item[str] = `${(+item[str]).toFixed(4)}`;
            }
          });
          return item;
        });
        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "产品名称",
          minWidth: 180,
          from: "name" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "代码",
            key: "code",
            minWidth: "80"
          },
          {
            title: "机构",
            key: "institutionName",
            minWidth: "120"
          },
          {
            title: "交易状态",
            key: "statusName",
            minWidth: "100"
          },
          {
            title: "基金公司名称",
            key: "fundHouseName",
            minWidth: "180"
          },
          {
            title: "日涨幅%",
            key: "dailyIncrease",
            minWidth: "100",
            sortable: true
          },
          {
            title: "单位净值",
            key: "netAssetValue",
            minWidth: "100",
            sortable: true
          },
          {
            title: "累计净值",
            key: "netAccumulateValue",
            minWidth: "100",
            sortable: true
          },
          {
            title: "上架状态",
            key: "shelveStatusLabel",
            minWidth: "180"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "140",
            sortable: true
          }
        ];
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取纯债基金表格数据
    chunzai_list(datas) {
      this.$api
        .get_chunzhaiList({
          vm: this,
          data: datas
        })
        .then(res => {
          if (res) {
            this.chunzhai_list_after(res.data);
          }
        });
    },

    /////////////////////////////////////////////////////////////////////////////

    // 获取存款表格数据
    cunkuan_list(datas) {
      this.$api
        .get_cunkuanlistData({
          vm: this,
          data: datas
        })
        .then(res => {
          if (res) {
            this.cunkuan_list_after(res.data);
          }
        });
    },
    // 获取数据后的处理
    cunkuan_list_after(data) {
      this.loadEnd = false;
      this.tableInputData = {
        // 传给table子组件的数据
        checkBox: false, // 判断需要不需要添加选择框
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
      };
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list;

        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "产品名称",
          minWidth: 120,
          from: "name" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "机构",
            key: "institutionName",
            minWidth: "160"
          },

          {
            title: "产品系列",
            key: "seriesName",
            minWidth: "120"
          },
          {
            title: "存款类别",
            key: "productSubtypeLabel",
            minWidth: "140"
          },
          {
            title: "类别别名",
            key: "typeAlias",
            minWidth: "120"
          },
          {
            title: "上架状态",
            key: "shelveStatusLabel",
            minWidth: "180"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "160",
            sortable: true
          }
        ];
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    /////////////////////////////////////////////////////////////////////////////
    // 获取货币基金数据后的处理
    huobi_list_after(data) {
      this.loadEnd = false;
      this.tableInputData = {
        // 传给table子组件的数据
        checkBox: false, // 判断需要不需要添加选择框
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
      };
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;
        this.tableInputData.data.list = data.list.map(item => {
          let arr = Object.keys(item);
          arr.forEach(str => {
            if (str === "onThe7thOfTheYearYield") {
              item[str] = `+${(+item[str]).toFixed(4)}%`;
            }
            if (str === "thousandsOfYearsYields") {
              item[str] = `${(+item[str]).toFixed(4)}`;
            }
            if (str === "minAmount") {
              item[str] = `${(+item[str]).toFixed(2)}`;
            }
          });
          return item;
        });

        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "产品名称",
          minWidth: 180,
          from: "name" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "机构名称",
            key: "institutionName",
            minWidth: "180"
          },
          {
            title: "基金公司名称",
            key: "fundHouseName",
            minWidth: "100"
          },
          {
            title: "七日年化收益率",
            key: "onThe7thOfTheYearYield",
            minWidth: "130",
            sortable: true
          },
          {
            title: "万份年化收益率",
            key: "thousandsOfYearsYields",
            minWidth: "130",
            sortable: true
          },
          {
            title: "起购金额",
            key: "minAmount",
            minWidth: "120",
            sortable: true
          },

          {
            title: "赎回到账日",
            key: "accountingDate",
            minWidth: "120",
            sortable: true
          },
          {
            title: "上架状态",
            key: "shelveStatusLabel",
            minWidth: "180"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "140",
            sortable: true
          }
        ];
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取表格数据
    huobi_list(datas) {
      this.$api
        .get_huobiList({
          vm: this,
          data: datas
        })
        .then(res => {
          if (res) {
            this.huobi_list_after(res.data);
          }
        });
    },
    /////////////////////////////////////////////////////////////////////////////
    // 获取数据后的处理
    licai_list_after(data) {
      this.loadEnd = false;
      this.tableInputData = {
        // 传给table子组件的数据
        checkBox: false, // 判断需要不需要添加选择框
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
      };
      new Promise(resolve => {
        this.tableInputData.total = data.total;
        this.tableInputData.pageSize = data.pageSize == 0 ? 10 : data.pageSize;
        this.tableInputData.pageNum = data.pageNum == 0 ? 1 : data.pageNum;

        this.tableInputData.data.list = data.list.map(item => {
          let arr = Object.keys(item);
          wap: for (let i = arr.length; i--; ) {
            if (arr[i] === "interestRate") {
              item[arr[i]] = `+${(+item[arr[i]]).toFixed(4)}%`;
              break wap;
            }
          }
          return item;
        });

        // // 设置字体点击事件
        this.tableInputData.actions.click = {
          label: "产品名称",
          minWidth: 180,
          from: "name" // 记录这个交互操作的原数据属性
        };
        this.tableInputData.data.title = [
          {
            title: "机构名称",
            key: "institutionName",
            minWidth: "180"
          },
          {
            title: "系列名称",
            key: "seriesName",
            minWidth: "100"
          },
          {
            title: "预期年化收益率",
            key: "interestRate",
            minWidth: "130",
            sortable: true
          },
          {
            title: "风险等级",
            key: "riskLevelLabel",
            minWidth: "130"
          },
          {
            title: "上架状态",
            key: "shelveStatusLabel",
            minWidth: "180"
          },
          {
            title: "创建时间",
            key: "gmtCreated",
            minWidth: "140",
            sortable: true
          }
        ];
        this.tableInputData.data.custom.push({
          text: "删除",
          type: "danger",
          size: "mini",
          emit: "delete"
        });
        resolve();
      }).then(() => {
        this.loadEnd = true;
      });
    },
    // 获取理财表格数据
    licai_list(datas) {
      this.$api
        .get_licaiList({
          vm: this,
          data: datas
        })
        .then(res => {
          if (res) {
            this.licai_list_after(res.data);
          }
        });
    },
    /////////////////////////////////////////////////////////////////////////////
    // 删除
    toDelete(id) {
      this.$confirm("确认删除吗？")
        .then(() => {
          let url = "";
          switch (this.checkTable) {
            case "货币基金":
              url = `/product/monetaryFund/${id}`; // 货币基金删除
              break;
            case "理财产品":
              url = `/product/pureDebtFund/${id}`; // 理财管理删除
              break;
            case "存款产品":
              url = `/product/deposit/demand/${id}`; // 存款删除
              break;
            case "纯债基金":
              url = `/product/pureDebtFund/${id}`; // 纯债删除
              break;
          }

          this.$api
            .product_all_delete({
              vm: this,
              url: url
            })
            .then(res => {
              if (res) {
                this.$message.success("删除成功！");
                this.changeFn();
              }
            });
        })
        .catch(() => {});
    },

    ////////////////////////////////////////////////////////////////////////////////////
    // 新增交易规则
    addNewGuiZe() {
      this.guize_httpType = "post"; // 新增，三个checkbox都要显示出来
      this.newGuiZe = true;
    },
    // type=true:将数据格式化：xx,xxx,xxx.xxx格式
    // type=false:将格式化的数据转成正常的数据；
    make_point(num, type) {
      let isPoint = /\.+/g.test("" + num),
        arr,
        str1,
        str2;
      if (isPoint) {
        arr = ("" + num).split(".");
        if (type) {
          str1 = arr[0].split("").reverse();
          str2 = "";
          for (let i = 0; i < str1.length; i++) {
            str2 += str1[i];
            if ((i + 1) % 3 === 0 && i + 1 < str1.length) {
              str2 += ",";
            }
          }
          return (
            str2
              .split("")
              .reverse()
              .join("") +
            "." +
            arr[1]
          );
        } else {
          str1 = arr[0].split(",").join("");
          return str1 + "." + arr[1];
        }
      } else {
        return num;
      }
    },
    // 费率表格的emit,切换是编辑还是新增
    feilvEmit(data) {
      if (data.type === "edit") {
        this.guize_httpType = "put";
        // 编辑
        switch (data.data.type) {
          case "rengou":
            this.edit_list = ["认购"];
            this.rengou_forms = {
              id: data.data.id,
              rate: data.data.feilv, // 费率
              rateDiscount: data.data.youhui, // 费率折扣
              cost: this.make_point(data.data.danbi, false), // 单笔费用
              minTransactionAmount: data.data.from.minTransactionAmount, // 金额
              minAmountUnit: data.data.from.minAmountUnit, // 金额单位
              minAmountSymbol: data.data.from.minAmountSymbol, // 金额符号标识
              maxTransactionAmount: data.data.from.maxTransactionAmount, // 最大交易金额
              maxAmountUnit: data.data.from.maxAmountUnit, // 交易金额单位
              maxAmountSymbol: data.data.from.maxAmountSymbol // 交易金额符号标识
            };
            break;
          case "shengou":
            this.edit_list = ["申购"];
            this.shengou_forms = {
              id: data.data.id,
              rate2: data.data.feilv, // 费率
              rateDiscount2: data.data.youhui, // 费率折扣
              cost2: this.make_point(data.data.danbi, false), // 单笔费用
              minTransactionAmount2: data.data.from.minTransactionAmount, // 金额
              minAmountUnit2: data.data.from.minAmountUnit, // 金额单位
              minAmountSymbol2: data.data.from.minAmountSymbol, // 金额符号标识
              maxTransactionAmount2: data.data.from.maxTransactionAmount, // 最大交易金额
              maxAmountUnit2: data.data.from.maxAmountUnit, // 交易金额单位
              maxAmountSymbol2: data.data.from.maxAmountSymbol // 交易金额符号标识
            };
            break;
          case "shuhui":
            this.edit_list = ["赎回"];
            this.shuhui_forms = {
              id: data.data.id,
              rate3: data.data.feilv, // 费率
              rateDiscount3: data.data.youhui, // 费率折扣
              cost3: this.make_point(data.data.danbi, false), // 单笔费用
              minTimeLimit: data.data.from.minTimeLimit, // 期限
              minTimeSymbol: data.data.from.minTimeSymbol, // 期限符号标识
              maxTimeLimit: data.data.from.maxTimeLimit, // 天数
              maxTimeSymbol: data.data.from.maxTimeSymbol // 天数符号标识
            };
            break;
        }
        this.newGuiZe = true;
      } else if (data.type === "delete") {
        // 删除
        switch (data.data.type) {
          case "rengou":
            this.$api
              .rengou_delete({
                vm: this,
                id: data.data.id
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.get_rengou();
                }
              });
            break;
          case "shengou":
            this.$api
              .shengou_delete({
                vm: this,
                id: data.data.id
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.get_shengou();
                }
              });
            break;
          case "shuhui":
            this.$api
              .shuhui_delete({
                vm: this,
                id: data.data.id
              })
              .then(res => {
                if (res) {
                  this.$message.success("删除成功！");
                  this.get_shuhui();
                }
              });
            break;
        }
      } else {
        // 分页
        switch (data.data) {
          case "rengou":
            this.get_rengou();
            break;
          case "shengou":
            this.get_shengou();
            break;
          case "shuhui":
            this.get_shuhui();
            break;
        }
      }
    },

    check_rengou() {
      let isErr = true;
      let errArr = [];
      if (
        +this.rengou_forms.minTransactionAmount *
          +this.rengou_forms.minAmountUnit >
        +this.rengou_forms.maxTransactionAmount *
          +this.rengou_forms.maxAmountUnit
      ) {
        errArr.push(1);
        isErr = false;
      }
      this.errInfo = Array.from(new Set(errArr));
      return isErr;
    },
    // 认购保存
    save_rengou() {
      this.$refs.rengou_forms.validate(valid => {
        if (valid && this.check_rengou()) {
          this.isChange = false;
          let rengou_data = {
            productUuid: this.rengou.productUuid,
            rate: +this.rengou_forms.rate, //费率
            rateDiscount: +this.rengou_forms.rateDiscount, //费率折扣
            cost: +this.rengou_forms.cost, //费用
            minTransactionAmount: +this.rengou_forms.minTransactionAmount, // 最小交易金额
            minAmountUnit: this.rengou_forms.minAmountUnit, // 最小金额单位
            minAmountUnitLabel: "", // 最小金额单位Label
            minAmountSymbol: this.rengou_forms.minAmountSymbol, // 最小金额规则符号
            minAmountSymbolLabel: "", //最小金额规则符号

            maxTransactionAmount: +this.rengou_forms.maxTransactionAmount, // 最大交易金额
            maxAmountUnit: this.rengou_forms.maxAmountUnit, // 最大交易金额单位
            maxAmountUnitLabel: "", //最大交易金额单位Label
            maxAmountSymbol: this.rengou_forms.maxAmountSymbol,
            maxAmountSymbolLabel: "" // 最大交易金额规则符号Label
          };
          // 最小金额单位Label
          if (rengou_data.minAmountUnit) {
            rengou_data.minAmountUnitLabel = this.dictData.currency_unit.filter(
              item => item.value == rengou_data.minAmountUnit
            )[0].label;
          }
          // 最小金额规则符号
          if (rengou_data.minAmountSymbol) {
            rengou_data.minAmountSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == rengou_data.minAmountSymbol
            )[0].label;
          }
          // 最大交易金额单位
          if (rengou_data.maxAmountUnit) {
            rengou_data.maxAmountUnitLabel = this.dictData.currency_unit.filter(
              item => item.value == rengou_data.maxAmountUnit
            )[0].label;
          }
          // 最大交易金额规则符号Label
          if (rengou_data.maxAmountSymbol) {
            rengou_data.maxAmountSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == rengou_data.maxAmountSymbol
            )[0].label;
          }
          if (this.guize_httpType === "put") {
            rengou_data.id = this.rengou_forms.id;
          }

          this.$api
            .put_post_rengou({
              vm: this,
              httpType: this.guize_httpType,
              data: rengou_data
            })
            .then(res => {
              if (res) {
                // 认购
                this.rengou_forms = {
                  rate: "", // 费率
                  rateDiscount: "", // 费率折扣
                  cost: "", // 单笔费用
                  minTransactionAmount: "", // 金额
                  minAmountUnit: "", // 金额单位
                  minAmountSymbol: "", // 金额符号标识
                  maxTransactionAmount: "", // 最大交易金额
                  maxAmountUnit: "", // 交易金额单位
                  maxAmountSymbol: "" // 交易金额符号标识
                };
                this.$refs.rengou_forms.resetFields();
                this.isChange = true;
                this.$message.success(
                  `${
                    this.guize_httpType === "post" ? "添加" : "修改"
                  }规则成功！`
                );
                if (this.guize_httpType === "put") {
                  this.newGuiZe = false;
                }
                this.get_rengou();
              } else {
                this.$message.error(
                  `${
                    this.guize_httpType === "post" ? "添加" : "修改"
                  }规则不成功！`
                );
              }
            });
        }
      });
    },

    check_shengou() {
      let isErr = true;
      let errArr = [];
      if (
        +this.shengou_forms.minTransactionAmount2 *
          +this.shengou_forms.minAmountUnit2 >
        +this.shengou_forms.maxTransactionAmount2 *
          +this.shengou_forms.maxAmountUnit2
      ) {
        errArr.push(2);
        isErr = false;
      }
      this.errInfo = Array.from(new Set(errArr));
      return isErr;
    },
    // 申购保存
    save_shengou() {
      this.$refs.shengou_forms.validate(valid => {
        if (valid && this.check_shengou()) {
          this.isChange = false;
          let shengou_data = {
            productUuid: this.shengou.productUuid,
            rate: +this.shengou_forms.rate2, //费率
            rateDiscount: +this.shengou_forms.rateDiscount2, //费率折扣
            cost: +this.shengou_forms.cost2, //费用

            minTransactionAmount: +this.shengou_forms.minTransactionAmount2, // 最小交易金额
            minAmountUnit: this.shengou_forms.minAmountUnit2, // 最小金额单位
            minAmountUnitLabel: "", // 最小金额单位Label
            minAmountSymbol: this.shengou_forms.minAmountSymbol2, // 最小金额规则符号
            minAmountSymbolLabel: "", //最小金额规则符号

            maxTransactionAmount: +this.shengou_forms.maxTransactionAmount2, // 最大交易金额
            maxAmountUnit: this.shengou_forms.maxAmountUnit2, // 最大交易金额单位
            maxAmountUnitLabel: "", //最大交易金额单位Label
            maxAmountSymbol: this.shengou_forms.maxAmountSymbol2,
            maxAmountSymbolLabel: "" // 最大交易金额规则符号Label
          };
          // 最小金额单位Label
          if (shengou_data.minAmountUnit) {
            shengou_data.minAmountUnitLabel = this.dictData.currency_unit.filter(
              item => item.value == shengou_data.minAmountUnit
            )[0].label;
          }
          // 最小金额规则符号
          if (shengou_data.minAmountSymbol) {
            shengou_data.minAmountSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == shengou_data.minAmountSymbol
            )[0].label;
          }
          // 最大交易金额单位Label
          if (shengou_data.maxAmountUnit) {
            shengou_data.maxAmountUnitLabel = this.dictData.currency_unit.filter(
              item => item.value == shengou_data.maxAmountUnit
            )[0].label;
          }
          // 最大交易金额规则符号Label
          if (shengou_data.maxAmountSymbol) {
            shengou_data.maxAmountSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == shengou_data.maxAmountSymbol
            )[0].label;
          }
          if (this.guize_httpType === "put") {
            shengou_data.id = this.shengou_forms.id;
          }

          this.$api
            .put_post_shengou({
              vm: this,
              httpType: this.guize_httpType,
              data: shengou_data
            })
            .then(res => {
              if (res) {
                // 申购
                this.shengou_forms = {
                  rate2: "", // 费率
                  rateDiscount2: "", // 费率折扣
                  cost2: "", // 单笔费用
                  minTransactionAmount2: "", // 金额
                  minAmountUnit2: "", // 金额单位
                  minAmountSymbol2: "", // 金额符号标识
                  maxTransactionAmount2: "", // 最大交易金额
                  maxAmountUnit2: "", // 交易金额单位
                  maxAmountSymbol2: "" // 交易金额符号标识
                };
                this.$refs.shengou_forms.resetFields();
                this.isChange = true;
                this.$message.success(
                  `${
                    this.rengou_forms.type === "post" ? "添加" : "修改"
                  }规则成功！`
                );
                if (this.guize_httpType === "put") {
                  this.newGuiZe = false;
                }
                this.get_shengou();
              } else {
                this.$message.error(
                  `${
                    this.guize_httpType === "post" ? "添加" : "修改"
                  }规则不成功！`
                );
              }
            });
        }
      });
    },

    check_shuhui() {
      let isErr = true;
      let errArr = [];
      if (+this.shuhui_forms.minTimeLimit > +this.shuhui_forms.maxTimeLimit) {
        errArr.push(3);
        isErr = false;
      }
      this.errInfo = Array.from(new Set(errArr));
      return isErr;
    },
    // 赎回保存
    save_shuhui() {
      this.$refs.shuhui_forms.validate(valid => {
        if (valid && this.check_shuhui()) {
          this.isChange = false;
          let shuhui_data = {
            productUuid: this.shuhui.productUuid,
            rate: +this.shuhui_forms.rate3, //费率
            rateDiscount: +this.shuhui_forms.rateDiscount3, //费率折扣
            cost: +this.shuhui_forms.cost3, //费用

            minTimeLimit: +this.shuhui_forms.minTimeLimit,
            minTimeSymbol: this.shuhui_forms.minTimeSymbol,
            minTimeSymbolLabel: "", // 最小期限符号标识Label
            maxTimeLimit: +this.shuhui_forms.maxTimeLimit,
            maxTimeSymbol: this.shuhui_forms.maxTimeSymbol,
            maxTimeSymbolLabel: "" // 最大期限符号标识Label
          };
          // 最小期限符号标识Label
          if (shuhui_data.minTimeSymbol) {
            shuhui_data.minTimeSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == shuhui_data.minTimeSymbol
            )[0].label;
          }
          // 最大期限符号标识Label
          if (shuhui_data.maxTimeSymbol) {
            shuhui_data.maxTimeSymbolLabel = this.dictData.rule_symbol.filter(
              item => item.value == shuhui_data.maxTimeSymbol
            )[0].label;
          }
          if (this.guize_httpType === "put") {
            shuhui_data.id = this.shuhui_forms.id;
          }

          this.$api
            .put_post_shuhui({
              vm: this,
              httpType: this.guize_httpType,
              data: shuhui_data
            })
            .then(res => {
              if (res) {
                // 赎回
                this.shuhui_forms = {
                  rate3: "", // 费率
                  rateDiscount3: "", // 费率折扣
                  cost3: "", // 单笔费用
                  minTimeLimit: "", // 期限
                  minTimeSymbol: "", // 期限符号标识
                  maxTimeLimit: "", // 天数
                  maxTimeSymbol: "" // 天数符号标识
                };
                this.$refs.shuhui_forms.resetFields();
                this.isChange = true;
                this.$message.success(
                  `${
                    this.rengou_forms.type === "post" ? "添加" : "修改"
                  }规则成功！`
                );
                if (this.guize_httpType === "put") {
                  this.newGuiZe = false;
                }
                this.get_shuhui();
              } else {
                this.$message.error(
                  `${
                    this.guize_httpType === "post" ? "添加" : "修改"
                  }规则不成功！`
                );
              }
            });
        }
      });
    },
    // 历史业绩更新保存
    save1() {
      this.$refs.ruleForm1.validate(valid => {
        if (valid) {
          this.$api
            .post_yeji({
              vm: this,
              data: {
                productUuid: this.pageData.forLishi.productUuid,
                oneDayIncrease: this.ruleForm1.danri,
                oneMonthIncrease: this.ruleForm1.oneMonth,
                threeMonthIncrease: this.ruleForm1.sanyue,
                sixMonthIncrease: this.ruleForm1.liuyue,
                oneYearIncrease: this.ruleForm1.yinian
              }
            })
            .then(res => {
              if (res) {
                this.init();
                this.toCloseNewGuiZeDialog();
              }
            });
        } else {
          this.$message.error("请输入完整数据！");
        }
      });
    }
  }
};
</script>
