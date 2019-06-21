<template>
  <div id="baseWaper">
    <div class="baseHeaderButton">
      <p>{{pageInfos.title}}</p>
      <div>
        <el-button
          size="mini"
          @click="toEdit()"
        >
          编辑
        </el-button>
        <el-button
          size="mini"
          @click="toUpDown()"
        >
          {{this.shangjia?'下架':'上架'}}
        </el-button>
        <el-button
          size="mini"
          @click="toDelete()"
        >
          删除
        </el-button>
      </div>
    </div>

    <div class="isContentWaper">
      <div class="isContentLong">
        <span class="isTitleLong">
          机构：
        </span>
        <p>
          <img
            style="width:40px"
            :src="pageInfos.logo"
          >
          <br>
          <a
            class="isLink"
            @click="toJiGou"
            title='点击查看'
          >{{pageInfos.name}}</a>
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('jijingongsi')"
        style="line-height:28px;"
      >
        <span class="isTitle">
          基金公司：
        </span>
        <p>
          <a
            class="isLink"
            @click="toJiJin"
            title='点击查看'
          >{{pageInfos.jijingongsi}}</a>
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('xilie')"
      >
        <span class="isTitleLong">
          产品系列：
        </span>
        <p>
          {{pageInfos.xilie}}
        </p>
      </div>
    </div>

    <div class="isContentWaper">
      <div
        class="isContent"
        v-if="isToShow('daima')"
      >
        <span class="isTitle">
          基金代码：
        </span>
        <p>
          {{pageInfos.daima}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('rizhangfu')"
      >
        <span style="width:80px;">
          日涨幅：
        </span>
        <p style="color:red;">
          {{pageInfos.rizhangfu}}%
        </p>
      </div>
    </div>

    <div class="isContentWaper">
      <div
        class="isContent"
        v-if="isToShow('jiaoyizhuangtai')"
      >
        <span class="isTitle">
          交易状态：
        </span>
        <p>
          {{pageInfos.jiaoyizhuangtai}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('yuqishouyi')"
      >
        <span class="isTitleLong">
          预期年化收益率：
        </span>
        <p>
          {{pageInfos.yuqishouyi}}
        </p>
      </div>
    </div>

    <div
      class="isContent"
      v-if="isToShow('miaoshu')"
    >
      <span
        class="isTitle"
        @click="toShowMore(1)"
        title="点击查看全部内容"
        style="cursor: pointer;"
      >
        {{this.pageData.page === "organizational"?'银行描述':'公司描述'}}
        :&nbsp;
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p :class="toShowMoreNum===1?'':'isHidden'">
        {{pageInfos.miaoshu}}
      </p>
    </div>

    <div class="isContentWaper">
      <div
        class="isContent"
        v-if="isToShow('qigou')"
      >
        <span class="isTitle">
          起购金额：
        </span>
        <p>
          {{pageInfos.qigou}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('suoding')"
      >
        <span class="isTitle">
          锁定期：
        </span>
        <p>
          {{pageInfos.suoding}}
        </p>
      </div>
    </div>

    <div class="isContentWaper">
      <div
        class="isContentLong"
        v-if="isToShow('shuhui')"
      >
        <span class="isTitleLong">
          到帐赎回日：
        </span>
        <p>
          {{pageInfos.shuhui}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('shouxufei')"
      >
        <span class="isTitle">
          手续费用：
        </span>
        <p>
          {{pageInfos.shouxufei}}
        </p>
      </div>
    </div>

    <div class="isContentWaper">

      <div
        class="isContentLong"
        v-if="isToShow('qixian')"
      >
        <span class="isTitle">
          期限：
        </span>
        <p>
          {{pageInfos.qixian}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('deadlineAlias')"
      >
        <span class="isTitleLong">
          期限别名：
        </span>
        <p>
          {{pageInfos.deadlineAlias}}
        </p>
      </div>
    </div>

    <div class="isContentWaper">
      <div
        class="isContent"
        v-if="isToShow('qishou')"
      >
        <span class="isTitle">
          起售日期：
        </span>
        <p>
          {{pageInfos.qishou}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('jiezhi')"
      >
        <span class="isTitle">
          截止日期：
        </span>
        <p>
          {{pageInfos.jiezhi}}
        </p>
      </div>
    </div>

    <div class="isContentWaper">
      <div
        class="isContent"
        v-if="isToShow('qixi')"
      >
        <span class="isTitle">
          起息日：
        </span>
        <p>
          {{pageInfos.qixi}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('jiexi')"
      >
        <span class="isTitle">
          结息日：
        </span>
        <p>
          {{pageInfos.jiexi}}
        </p>
      </div>
    </div>

    <div class="isContentWaper">
      <div
        class="isContentLong"
        v-if="isToShow('kaishi')"
      >
        <span class="isTitleLong">
          理财开始日期：
        </span>
        <p>
          {{pageInfos.kaishi}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('jieshu')"
      >
        <span class="isTitleLong">
          理财结束日期：
        </span>
        <p>
          {{pageInfos.jieshu}}
        </p>
      </div>
    </div>

    <div class="isContentWaper">
      <div
        class="isContentLong"
        v-if="isToShow('leibie')"
      >
        <span class="isTitleLong">
          类别别名：
        </span>
        <p>
          {{pageInfos.leibie}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('leixing')"
      >
        <span class="isTitleLong">
          产品类型：
        </span>
        <p>
          {{pageInfos.leixing}}
        </p>
      </div>
    </div>

    <div class="isContentWaper">
      <div
        class="isContentLong"
        v-if="isToShow('lilv')"
      >
        <span class="isTitleLong">
          利率：
        </span>
        <p>
          {{pageInfos.lilv}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('interestRateAlias')"
      >
        <span class="isTitleLong">
          利率别名：
        </span>
        <p>
          {{pageInfos.interestRateAlias}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('maxLilv')"
      >
        <span class="isTitleLong">
          最高利率：
        </span>
        <p>
          {{pageInfos.maxLilv}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('daoqiLilv')"
      >
        <span class="isTitleLong">
          到期利率：
        </span>
        <p>
          {{pageInfos.daoqiLilv}}
        </p>
      </div>

    </div>

    <div class="isContentWaper">
      <div
        class="isContentLong"
        v-if="isToShow('shengyuED')"
      >
        <span class="isTitleLong">
          剩余额度：
        </span>
        <p>
          {{pageInfos.shengyuED}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('jixi')"
      >
        <span class="isTitleLong">
          计息方式：
        </span>
        <p>
          {{pageInfos.jixi}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('zhiqu')"
      >
        <span class="isTitleLong">
          支取时间：
        </span>
        <p>
          {{pageInfos.zhiqu}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('fengxian')"
      >
        <span class="isTitleLong">
          风险等级：
        </span>
        <p>
          {{pageInfos.fengxian}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('fanhuan')"
      >
        <span class="isTitleLong">
          收益返还方式：
        </span>
        <p>
          {{pageInfos.fanhuan}}
        </p>
      </div>

    </div>

    <div class="isContentWaper">
      <div
        class="isContentLong"
        v-if="isToShow('qicun')"
      >
        <span class="isTitleLong">
          起存金额：
        </span>
        <p>
          {{pageInfos.qicun}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('dizengjine')"
      >
        <span class="isTitleLong">
          递增金额：
        </span>
        <p>
          {{pageInfos.dizengjine}}
        </p>
      </div>
    </div>
    <div class="isContentWaper">
      <div
        class="isContentLong"
        v-if="isToShow('zhuancun')"
      >
        <span class="isTitleLong">
          到期是否转存：
        </span>
        <p>
          {{pageInfos.zhuancun}}
        </p>
      </div>

    </div>

    <div class="isContentWaper">
      <div
        class="isContentLong"
        style="width:100%;"
        v-if="isToShow('biaoqian')"
      >
        <span class="isTitleLong">
          标签：
        </span>
        <p>
          <span
            :style='makeStyle()'
            class="withColor"
            v-for='(item,index) in pageInfos.biaoqian'
            :key='index'
          >
            {{item.name}} &nbsp;
          </span>
        </p>
      </div>
    </div>
    <div
      class="isContent"
      v-if="isToShow('mairu')"
    >
      <span class="isTitle">
        买入:
      </span>
      <p>
        {{pageInfos.mairu}}
      </p>
    </div>

    <div
      class="isContentLong"
      v-if="isToShow('shouyiguize')"
    >
      <span
        class="isTitleLong"
        @click="toShowMore(1)"
        title="点击查看全部内容"
        style="cursor: pointer"
      >
        收益规则:<br><span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        :class="toShowMoreNum===1?'':'isHidden'"
        v-html='pageInfos.shouyiguize'
      >
      </p>
    </div>
    <div
      class="isContentLong"
      v-if="isToShow('chanpinmiaoshu')"
    >
      <span
        class="isTitleLong"
        @click="toShowMore(2)"
        title="点击查看全部内容"
        style="cursor: pointer"
      >
        产品描述:<br><span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        :class="toShowMoreNum===2?'':'isHidden'"
        v-html="pageInfos.chanpinmiaoshu"
      >
      </p>
    </div>

    <div class="isContentWaper">
      <div
        class="isContentLong"
        v-if="isToShow('shangjia')"
      >
        <span class="isTitleLong">
          是否上架：
        </span>
        <p>
          {{pageInfos.shangjia}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('jianguan')"
      >
        <span class="isTitleLong">
          监管属性：
        </span>
        <p>
          {{pageInfos.jianguan}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('guanzhuNum')"
      >
        <span class="isTitleLong">
          默认关注数量：
        </span>
        <p>
          {{pageInfos.guanzhuNum}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('mianqian')"
      >
        <span class="isTitleLong">
          是否面签：
        </span>
        <p>
          {{pageInfos.mianqian}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('shiming')"
      >
        <span class="isTitleLong">
          是否实名认证：
        </span>
        <p>
          {{pageInfos.shiming}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('yinhangpage')"
      >
        <span class="isTitleLong">
          是否显示银行页面：
        </span>
        <p>
          {{pageInfos.yinhangpage}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('qianyue')"
      >
        <span class="isTitleLong">
          是否签约：
        </span>
        <p>
          {{pageInfos.qianyue}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('hezuoType')"
      >
        <span class="isTitleLong">
          合作方式：
        </span>
        <p>
          {{pageInfos.hezuoType}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('autoUpDown')"
      >
        <span class="isTitleLong">
          自动上下架：
        </span>
        <p>
          {{pageInfos.autoUpDown}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('duijie')"
      >
        <span class="isTitleLong">
          银行对接方式：
        </span>
        <p>
          {{pageInfos.duijie}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('tuijian')"
      >
        <span class="isTitleLong">
          是否推荐：
        </span>
        <p>
          {{pageInfos.tuijian}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('paihang')"
      >
        <span class="isTitleLong">
          是否首页排行：
        </span>
        <p>
          {{pageInfos.paihang}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('cunkuanbishu')"
      >
        <span class="isTitleLong">
          默认存款笔数：
        </span>
        <p>
          {{pageInfos.cunkuanbishu}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('cunkuanmorenjine')"
      >
        <span class="isTitleLong">
          默认存款金额：
        </span>
        <p>
          {{pageInfos.cunkuanmorenjine}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('bishu')"
      >
        <span class="isTitleLong">
          默认购买笔数：
        </span>
        <p>
          {{pageInfos.bishu}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('morenjine')"
      >
        <span class="isTitleLong">
          默认购买金额:
        </span>
        <p>
          {{pageInfos.morenjine}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('chanpinbiaozhi')"
      >
        <span class="isTitleLong">
          同一产品标识：
        </span>
        <p>
          {{pageInfos.chanpinbiaozhi}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('guanzhushuliang')"
      >
        <span class="isTitleLong">
          默认关注数量：
        </span>
        <p>
          {{pageInfos.guanzhushuliang}}
        </p>
      </div>
      <div
        class="isContentLong"
        v-if="isToShow('bangdan')"
      >
        <span class="isTitleLong">
          榜单专区标识：
        </span>
        <p>
          {{pageInfos.bangdan}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('H5Url')"
      >
        <span class="isTitleLong">
          H5链接：
        </span>
        <p>
          {{pageInfos.H5Url}}
        </p>
      </div>

      <div
        class="isContentLong"
        v-if="isToShow('fuxipinlv')"
      >
        <span class="isTitleLong">
          付息频率：
        </span>
        <p>
          {{pageInfos.fuxipinlv}}
        </p>
      </div>

    </div>
    <div style="position:relative;height:20px;">
      <div class="show_time">
        <span class="isUpTime">
          产品ID：
          {{pageInfos.chanpinID}}&nbsp;
          创建时间：
          {{pageInfos.createTime}}
          &nbsp;
          {{pageInfos.who}}
        </span>
      </div>
    </div>
    <!-- ff -->
    <el-dialog
      :close-on-click-modal='false'
      title="编辑"
      :visible.sync="bianjieDialog"
      width="840px"
      :before-close="toClosebianjieDialog"
    >
      <el-form
        v-if='ruleForm'
        :inline="true"
        size="mini"
        :model="ruleForm"
        label-width="130px"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item
          label="产品名称:"
          class="is50"
          v-if="isToShow1('product')"
          prop="product"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.product"
            :class="isError('product')?'hasError':''"
            @blur="hiddenBorder('product')"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="基金代码:"
          class="is50"
          v-if="isToShow1('daima')"
          prop="daima"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.daima"
            :class="isError('daima')?'hasError':''"
            @blur="hiddenBorder('daima')"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="起购金额:"
          class="is50"
          v-if="isToShow1('qigou')"
          prop="qigou"
        >
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.qigou"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="机构:"
          class="is50"
          v-if="isToShow1('jigou_name')"
        >
          <el-select
            clearable
            placeholder="请输入"
            v-model="ruleForm.jigou_name"
            :class="isError('jigou_name')?'hasError':''"
            @blur="hiddenBorder('jigou_name')"
            @change="change_xilie(ruleForm.jigou_name)"
          >
            <el-option
              size='mini'
              v-for="item in dictData.jigou"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="产品系列:"
          class="is50"
          v-if="isToShow1('xilie')"
        >
          <el-select
            clearable
            placeholder="请选择"
            v-model="ruleForm.xilie"
          >
            <el-option
              size='mini'
              v-for="item in xilie"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item
          label="基金产品名称:"
          class="is50"
          v-if="isToShow1('productjijin')"
          prop="productjijin"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.productjijin"
            :class="isError('productjijin')?'hasError':''"
            @blur="hiddenBorder('productjijin')"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="产品区域:"
          class="is50"
          v-if="isToShow1('quyu')"
        >
          <el-select
            clearable
            placeholder="请输入"
            v-model="ruleForm.quyu"
          >
            <el-option
              size='mini'
              v-for="item in dictData.quyu"
              :key="item.adcode"
              :label="item.name"
              :value="item.adcode"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="收益返还方式:"
          class="is50"
          v-if="isToShow1('fanhuan')"
        >
          <el-select
            clearable
            placeholder="请选择"
            v-model="ruleForm.fanhuan"
          >
            <el-option
              size='mini'
              v-for="item in dictData.income_return_way"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="默认关注数量:"
          class="is50"
          v-if="isToShow1('guanzhuNum')"
          prop="guanzhuNum"
        >
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.guanzhuNum"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="付息频率:"
          style="position:relative"
          class="is50"
          v-if="isToShow1('fuxipinlv')"
        >
          <el-select
            clearable
            placeholder="请选择"
            v-model="ruleForm.fuxipinlv"
          >
            <el-option
              size='mini'
              v-for="item in dictData.frequency_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="存款产品名称:"
          class="is50"
          v-if="isToShow1('productcunkuan')"
          prop="productcunkuan"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.productcunkuan"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="产品类型别名:"
          class="is50"
          v-if="isToShow1('bieming')"
          prop="bieming"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.bieming"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="计息方式"
          style="position:relative"
          class="is50"
          v-if="isToShow1('jixi')"
        >
          <el-select
            clearable
            placeholder="请选择"
            v-model="ruleForm.jixi"
          >
            <el-option
              size='mini'
              v-for="item in dictData.interest_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="日涨幅:"
          class="is50"
          v-if="isToShow1('rizhangfu')"
          style="position:relative;"
          prop="rizhangfu"
        >
          <el-input
            type="number"
            style="width:calc(100% - 25px);"
            clearable
            placeholder="请输入"
            v-model="ruleForm.rizhangfu"
            :class="isError('rizhangfu')?'hasError':''"
            @blur="hiddenBorder('rizhangfu')"
          >
          </el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          label="利率:"
          class="is50"
          v-if="isToShow1('lilv')"
          style="position:relative;"
          prop="lilv"
        >
          <el-input
            type="number"
            style="width:calc(100% - 25px);"
            clearable
            placeholder="请输入"
            v-model="ruleForm.lilv"
            :class="isError('lilv')?'hasError':''"
            @blur="hiddenBorder('lilv')"
          >
          </el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          label="利率别名:"
          class="is50"
          v-if="isToShow1('interestRateAlias')"
          prop="interestRateAlias"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.interestRateAlias"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="最高利率:"
          class="is50"
          v-if="isToShow1('maxLilv')"
          style="position:relative;"
          prop="maxLilv"
        >
          <el-input
            type="number"
            style="width:calc(100% - 25px);"
            clearable
            placeholder="请输入"
            v-model="ruleForm.maxLilv"
          >
          </el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          label="到期利率:"
          class="is50"
          v-if="isToShow1('daoqiLilv')"
          style="position:relative;"
          prop="daoqiLilv"
        >
          <el-input
            type="number"
            style="width:calc(100% - 25px);"
            clearable
            placeholder="请输入"
            v-model="ruleForm.daoqiLilv"
          >
          </el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          label="起存金额:"
          class="is50"
          v-if="isToShow1('qicunjine')"
          prop="qicunjine"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.qicunjine"
            :class="isError('qicunjine')?'hasError':''"
            @blur="hiddenBorder('qicunjine')"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          v-show="isToShow1('marks')"
          label="标签:"
          class="is50"
        >
          <div class="toFlex">
            <el-select
              multiple
              v-model="ruleForm.marks"
              clearable
              placeholder="请选择"
              @change="hiddenBorder('marks')"
            >
              <el-option
                size='mini'
                v-for="item in dictData.marks"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item
          v-show="isToShow1('zhiqu')"
          label="支取时间:"
          class="is50"
        >
          <div class="toFlex">
            <el-select
              v-model="ruleForm.zhiqu"
              clearable
              placeholder="请选择"
            >
              <el-option
                size='mini'
                v-for="item in dictData.pay_time"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item
          label="递增金额:"
          class="is50"
          v-if="isToShow1('dizeng')"
          prop="dizeng"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.dizeng"
            :class="isError('dizeng')?'hasError':''"
            @blur="hiddenBorder('dizeng')"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="预期年化收益率:"
          class="is50"
          v-if="isToShow1('yuqinianhua')"
          prop="yuqinianhua"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.yuqinianhua"
            :class="isError('yuqinianhua')?'hasError':''"
            @blur="hiddenBorder('yuqinianhua')"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          v-show="isToShow1('fengxian')"
          label="风险等级:"
          class="is50"
        >
          <div class="toFlex">
            <el-select
              v-model="ruleForm.fengxian"
              clearable
              placeholder="请选择"
              :class="isError('fengxian')?'hasError':''"
              @change="hiddenBorder('fengxian')"
            >
              <el-option
                size='mini'
                v-for="item in dictData.risk_level"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item
          v-show="isToShow1('shengyuED')"
          label="剩余额度:"
          class="is50"
        >
          <div class="toFlex">
            <el-select
              v-model="ruleForm.shengyuED"
              clearable
              placeholder="请选择"
            >
              <el-option
                size='mini'
                v-for="item in dictData.surplus_quota"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item
          label="起息日:"
          class="is50"
          v-if="isToShow1('qixiri')"
        >
          <el-date-picker
            v-model="ruleForm.qixiri"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="期限:"
          class="is50"
          v-if="isToShow1('qixian')"
          prop="qixian"
        >
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.qixian"
            :class="isError('qixian')?'hasError':''"
            @blur="hiddenBorder('qixian')"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="期限别名:"
          class="is50"
          v-if="isToShow1('deadlineAlias')"
          prop="deadlineAlias"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.deadlineAlias"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          v-if="pageData.page==='structured_deposit'"
          class="is50"
        ></el-form-item>

        <el-form-item
          v-show="isToShow1('qishou')"
          label="起售日期:"
        >
          <el-date-picker
            v-model="ruleForm.qishou"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          v-show="isToShow1('qixi')"
          label="起息日期:"
        >
          <el-date-picker
            v-model="ruleForm.qixi"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          v-show="isToShow1('licairiqi')"
          label="理财日期:"
          class="dateS"
        >
          <el-date-picker
            v-model="ruleForm.licairiqi"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          v-show="isToShow1('muji')"
          label="募集日期:"
          class="dateS"
        >
          <el-date-picker
            v-model="ruleForm.muji"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          label="基金公司:"
          class="is50"
          v-if="isToShow1('gongsi')"
        >

          <el-select
            clearable
            placeholder="请输入"
            v-model="ruleForm.gongsi"
          >
            <el-option
              size='mini'
              v-for="item in dictData.jijin"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="到帐赎回日:"
          class="is50"
          v-if="isToShow1('shuhui')"
          prop="shuhui"
        >
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.shuhui"
            :class="isError('shuhui')?'hasError':''"
            @blur="hiddenBorder('shuhui')"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="锁定期:"
          class="is50"
          v-if="isToShow1('suoding')"
          prop="suoding"
        >
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.suoding"
            :class="isError('suoding')?'hasError':''"
            @blur="hiddenBorder('suoding')"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="买入:"
          class="is50"
          v-if="isToShow1('mairu')"
          prop="mairu"
        >
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.mairu"
            :class="isError('mairu')?'hasError':''"
            @blur="hiddenBorder('mairu')"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="手续费用:"
          class="is50"
          v-if="isToShow1('shouxufei')"
          prop="shouxufei"
        >
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.shouxufei"
            :class="isError('shouxufei')?'hasError':''"
            @blur="hiddenBorder('shouxufei')"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="交易状态:"
          class="is50"
          v-if="isToShow1('jiaoyizhuangtai')"
        >
          <el-select
            clearable
            placeholder="请输入"
            v-model="ruleForm.jiaoyizhuangtai"
            :class="isError('jiaoyizhuangtai')?'hasError':''"
            @blur="hiddenBorder('jiaoyizhuangtai')"
          >
            <el-option
              size='mini'
              v-for="item in dictData.transaction_state"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="到期是否转存:"
          class="is50"
          v-if="isToShow1('zhuancun')"
        >
          <el-radio-group v-model="ruleForm.zhuancun">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-show="isToShow1('chanpinmiaoshu')"
          label="产品描述:"
        >
          <quill-editor
            v-model="ruleForm.chanpinmiaoshu"
            style="width:520px;"
          >
          </quill-editor>
        </el-form-item>

        <el-form-item
          v-show="isToShow1('shouyiguize')"
          label="收益规则:"
        >
          <quill-editor
            v-model="ruleForm.shouyiguize"
            style="width:520px;"
          >
          </quill-editor>
        </el-form-item>

        <el-form-item
          label="同一产品标识:"
          class="is50"
          v-if="isToShow1('chanpinbiaozhi')"
          prop="chanpinbiaozhi"
        >
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.chanpinbiaozhi"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          v-show="isToShow1('jianguan')"
          label="监管属性:"
          class="is50"
        >
          <div class="toFlex">
            <el-select
              v-model="ruleForm.jianguan"
              clearable
              placeholder="请选择"
            >
              <el-option
                size='mini'
                v-for="item in dictData.regulatory_property"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item
          label="是否上架:"
          class="is50"
          v-if="isToShow1('shangjia')"
        >
          <el-radio-group v-model="ruleForm.shangjia">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="是否面签:"
          class="is50"
          v-if="isToShow1('mianqian')"
        >
          <el-radio-group v-model="ruleForm.mianqian">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="是否推荐:"
          class="is50"
          v-if="isToShow1('tuijian')"
        >
          <el-radio-group v-model="ruleForm.tuijian">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="是否首页排行:"
          class="is50"
          v-if="isToShow1('paihang')"
        >
          <el-radio-group v-model="ruleForm.paihang">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="是否实名认证:"
          class="is50"
          v-if="isToShow1('shiming')"
        >
          <el-radio-group v-model="ruleForm.shiming">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="是否签约:"
          class="is50"
          v-if="isToShow1('qianyue')"
        >
          <el-radio-group v-model="ruleForm.qianyue">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="显示银行过渡页:"
          class="is50"
          v-if="isToShow1('yihangTip')"
        >
          <el-radio-group v-model="ruleForm.yihangTip">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="自动上架:"
          class="is50"
          v-if="isToShow1('autoUpDown')"
        >
          <el-radio-group v-model="ruleForm.autoUpDown">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="默认购买笔数:"
          class="is50"
          v-if="isToShow1('goumaibishu')"
          prop="goumaibishu"
        >
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.goumaibishu"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="默认购买金额:"
          class="is50"
          v-if="isToShow1('goumaijine')"
          prop="goumaijine"
        >
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.goumaijine"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="年收费率(%):"
          class="is50"
          v-if="isToShow1('shoufeilv')"
          prop="shoufeilv"
        >
          <el-input
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.shoufeilv"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="榜单专区标识:"
          class="is50"
          v-if="isToShow1('zhuanqubiaozhi')"
        >
          <el-select
            clearable
            placeholder="请选择"
            v-model="ruleForm.zhuanqubiaozhi"
          >
            <el-option
              size='mini'
              v-for="item in dictData.list_area_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="银行对接方式:"
          class="is50"
          v-if="isToShow1('duijie')"
        >
          <el-select
            clearable
            placeholder="请选择"
            v-model="ruleForm.duijie"
          >
            <el-option
              size='mini'
              v-for="item in dictData.connection_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="银行合作方式:"
          class="is50"
          v-if="isToShow1('hezuo')"
        >
          <el-select
            clearable
            placeholder="请选择"
            v-model="ruleForm.hezuo"
          >
            <el-option
              size='mini'
              v-for="item in dictData.cooperation_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <div
          style="width:100%;"
          v-if="isToShow1('H5Url')"
        >
          <label>产品H5链接:</label>
          <el-input
            clearable
            placeholder="请输入"
            v-model="ruleForm.H5Url"
          >
          </el-input>
        </div>

        <div
          v-if="isToShow1('lilvlist')"
          style="width:100%;"
          label="利率"
        >
          <div class="toaddlilv">
            <h3>利率列表</h3>
            <span @click="addNewLilv">新增利率(点击添加)</span>
          </div>
          <ul>
            <li class="isLi">
              <span
                v-for="(tit,ind) in addLilvTable.title"
                :key='ind'
              >
                {{tit}}
              </span>
            </li>
            <li
              class="isLi2"
              :class="index%2!==0?'isOdd':''"
              v-for="(data,index) in addLilvTable.datas"
              :key='index'
            >
              <span style="width:150px;">{{index+1}}</span>
              <span>
                <el-input
                  type="number"
                  v-model="data.limit"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </span>
              <span>
                <el-select
                  size="mini"
                  placeholder="请选择"
                  v-model="data.danwei"
                >
                  <el-option
                    size='mini'
                    v-for="item in dictData.deadline_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </span>
              <span>
                <el-input
                  type='number'
                  v-model="data.lilv"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </span>

              <span>
                <el-input
                  type='number'
                  v-model="data.lockinPeriod"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </span>

              <span>
                <el-input
                  v-model="data.beizhu"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </span>

              <span>
                <el-select
                  size="mini"
                  placeholder="请选择"
                  v-model="data.showList"
                >
                  <el-option
                    size='mini'
                    v-for="item in shelveList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </span>
              <span>
                <el-select
                  size="mini"
                  placeholder="请选择"
                  v-model="data.lockinShowList"
                >
                  <el-option
                    size='mini'
                    v-for="item in shelveList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </span>

              <div
                style="width:30px;cursor: pointer;flex-shrink: 0"
                @click="toShowProp(data)"
              >
                删除
              </div>

            </li>
            <li class="nextPage">
              <span>总共：{{addLilvTable.total}} </span>
              <span>第{{addLilvTable.pageNum+1}}页</span>
              <span @click="pageStep(true)">上一页</span>
              <span @click="pageStep(false)">下一页</span>
            </li>
          </ul>
        </div>

      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="save()"
          type="primary"
        >保 存</el-button>
        <el-button
          size="mini"
          @click="toClosebianjieDialog"
        >取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  props: ["pageData"],
  data() {
    // 验证数字，小数的
    var checkNum2 = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || ("" + value).length < 0) {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    return {
      //表单验证
      rules: {
        product: [
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        daima: [
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        productjijin: [
          { min: 1, max: 19, message: "最多输入319个字", trigger: "blur" }
        ],
        productcunkuan: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        interestRateAlias: [
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        bieming: [
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        deadlineAlias: [
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        shuhui: [
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        chanpinbiaozhi: [
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        shoufeilv: [{ validator: checkNum3, trigger: "blur" }],
        goumaijine: [{ validator: checkNum3, trigger: "blur" }],
        goumaibishu: [{ validator: checkNum2, trigger: "blur" }],
        mairu: [{ validator: checkNum3, trigger: "blur" }],
        suoding: [{ validator: checkNum3, trigger: "blur" }],
        qigou: [{ validator: checkNum3, trigger: "blur" }],
        guanzhuNum: [{ validator: checkNum2, trigger: "blur" }],
        rizhangfu: [{ validator: checkNum3, trigger: "blur" }],
        lilv: [{ validator: checkNum3, trigger: "blur" }],
        maxLilv: [{ validator: checkNum3, trigger: "blur" }],
        daoqiLilv: [{ validator: checkNum3, trigger: "blur" }],
        qicunjine: [{ validator: checkNum3, trigger: "blur" }],
        dizeng: [{ validator: checkNum3, trigger: "blur" }],
        yuqinianhua: [{ validator: checkNum3, trigger: "blur" }],
        qixian: [{ validator: checkNum2, trigger: "blur" }],
        shouxufei: [{ validator: checkNum3, trigger: "blur" }]
      },
      xilie: null, // 产品系列数据
      serverData: null, // 服务器返回的数据
      dictData: null, // 字典数据
      pageInfos: null, // 页面数据
      show: [], // 控制页面显示哪些
      show1: [], // 控制点击编辑时页面显示哪些
      toShowMoreNum: null, // 描述多行文本隐藏切换
      shangjia: true, // 上架、下架切换，为true时，表示目前上架状态
      forEmit: "", // 当编辑完数据后，需要重新获取数据时，emit用
      deleteType: "", // 点击删除时使用
      bianjieDialog: false, // 纯债编辑按钮弹出框显示隐藏
      trade_rules: [], // 下拉的选项
      ruleForm: {
        chanpinIds: "", // 产品id
        // 纯债编辑按钮弹出框
        product: "", // 产品名称
        daima: "", // 基金代码
        jigou_name: "", // 机构名称
        gongsi: "", // 基金公司
        jiaoyizhuangtai: "", // 交易状态
        rizhangfu: "", // 日涨幅
        shangjia: "", // 是否上架
        mianqian: "", // 是否面签
        tuijian: "", // 是否推荐
        paihang: "", // 是否首页排行
        goumaibishu: "", // 默认购买笔数
        goumaijine: "", // 默认购买金额
        qigou: "", // 起购金额
        shuhui: "", // 到帐赎回日
        suoding: "", // 锁定期
        mairu: "", // 买入
        shouxufei: "", // 手续费用
        chanpinmiaoshu: "", // 产品描述
        shouyiguize: "", // 收益规则
        chanpinbiaozhi: "", // 同一产品标识
        guanzhuNum: "", // 默认关注数量
        zhuanqubiaozhi: "", // 榜单专区标识
        xilie: "", // 产品系列
        productjijin: "", // 基金产品名称
        dizeng: "", // 递增金额
        yuqinianhua: "", // 预期年化收益率
        fengxian: "", // 风险等级
        shengyuED: "", // 剩余额度
        qixiri: "", // 起息日
        qixian: "", // 期限
        licairiqi: "", // 理财日期
        muji: "", // 募集日期
        jianguan: "", // 监管属性
        productcunkuan: "", // 存款产品名称
        bieming: "", // 产品类型(别名)
        lilv: "", // 利率
        interestRateAlias: "", // 利率别名
        deadlineAlias: "", // 期限别名
        qicunjine: "", // 起存金额
        marks: "", // 标签
        quyu: "", // 产品区域
        fanhuan: "", // 收益返还方式
        zhuancun: "", // 到期是否转存
        fuxipinlv: "", // 付息频率
        shiming: "", // 是否实名
        qianyue: "", // 是否签约
        shoufeilv: "", // 年收费率(%)
        H5Url: "", // 产品H5链接
        yihangTip: "", // 显示银行过渡页
        duijie: "", // 银行对接方式
        hezuo: "", // 银行合作方式
        autoUpDown: "" // 自动上架
      },
      needValid: [], // 用来保存还有哪些没进行验证
      pageError: [], // 保存当前页面需要验证的项
      copyError: [], // 用来记录本次操作还剩哪些验证
      hasClick: false, // 记录是否点击过保存按钮
      shelveList: [
        {
          label: "是",
          value: "YES"
        },
        {
          label: "否",
          value: "NO"
        }
      ],
      // 新建智能存款底下的利率选项
      addLilvTable: {
        pageNum: 0,
        total: 0,
        title: [
          "序号",
          "* 期限",
          "* 期限单位",
          "* 利率%",
          "* 锁定期限",
          "备注",
          "榜单展示",
          "锁定期榜单展示",
          "操作"
        ],
        dataTotal: [], //
        datas: [] // 用来进行分页展示时的当前展示数据
      }
    };
  },
  created() {
    let page = this.pageData.page;
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    this.trade_rules = {
      money: this.dictData.monetary_unit,
      limit: this.dictData.rule_symbol
    };
    switch (page) {
      // 纯债
      case "pure_debt_fund":
        this.forEmit = "chunzhai";
        this.show = [
          "jijingongsi",
          "daima",
          "rizhangfu",
          "jiaoyizhuangtai",
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "bishu",
          "morenjine"
        ];
        this.show1 = [
          "product",
          "daima",
          "jigou_name",
          "gongsi",
          "jiaoyizhuangtai",
          "rizhangfu",
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "goumaibishu",
          "goumaijine"
        ];
        this.pageError = [
          "product",
          "daima",
          "jigou_name",
          "jiaoyizhuangtai",
          "rizhangfu"
        ];
        break;
      // 货币
      case "money_fund":
        this.forEmit = "huobi";
        this.show = [
          "jijingongsi",
          "qigou",
          "suoding",
          "shuhui",
          "shouxufei",
          "shouyiguize",
          "chanpinmiaoshu",
          "shangjia",
          "mianqian",
          "mairu",
          "cunkuanbishu",
          "cunkuanmorenjine",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "guanzhushuliang",
          "bangdan"
        ];
        this.show1 = [
          "qigou",
          "product",
          "jigou_name",
          "gongsi",
          "shuhui",
          "suoding",
          "mairu",
          "shouxufei",
          "chanpinmiaoshu",
          "shouyiguize",
          "chanpinbiaozhi",
          "guanzhuNum",
          "goumaibishu",
          "goumaijine",
          "zhuanqubiaozhi"
        ];
        this.pageError = ["product", "jigou_name", "shuhui", "suoding"];
        break;
      // 理财
      case "manage_money_matters":
        this.forEmit = "licai";
        this.show = [
          "jijingongsi",
          "yuqishouyi",
          "fengxian",
          "qixian",
          "kaishi",
          "jieshu",
          "chanpinmiaoshu",
          "shangjia",
          "mianqian",
          "bishu",
          "morenjine",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "guanzhushuliang",
          "bangdan",
          "jianguan"
        ];
        this.show1 = [
          "jigou_name",
          "xilie",
          "productjijin",
          "dizeng",
          "yuqinianhua",
          "fengxian",
          "shengyuED",
          "qixiri",
          "qixian",
          "licairiqi",
          "muji",
          "chanpinmiaoshu",
          "jianguan",
          "chanpinbiaozhi",
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "goumaibishu",
          "goumaijine",
          "zhuanqubiaozhi",
          "guanzhuNum"
        ];
        this.pageError = [
          "jigou_name",
          "yuqinianhua",
          "jianguan",
          "dizeng",
          "fengxian",
          "shengyuED",
          "qixian",
          "productjijin"
        ];
        break;
      // 活期存款
      case "demand_deposit":
        this.forEmit = "huoqi";
        this.deleteType = "demand";
        this.show = [
          "xilie",
          "leibie",
          "leixing",
          "lilv",
          "qicun",
          "dizengjine",
          "biaoqian",
          "chanpinmiaoshu",
          "shangjia",
          "mianqian",
          "bishu",
          "morenjine",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "bangdan",
          "interestRateAlias"
        ];
        this.show1 = [
          "jigou_name",
          "xilie",
          "productcunkuan",
          "bieming",
          "lilv",
          "qicunjine",
          "dizeng",
          "marks",
          "chanpinmiaoshu",
          "shangjia",
          "mianqian",
          "bishu",
          "morenjine",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "bangdan",
          "goumaibishu",
          "goumaijine",
          "zhuanqubiaozhi",
          "interestRateAlias"
        ];
        this.pageError = ["jigou_name", "lilv", "qicunjine", "dizeng"];

        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.datas.id,
          title: this.pageData.datas.name, // 上标题，产品名称
          institutionId: this.pageData.datas.institutionId, // 机构id
          name: this.pageData.datas.institutionName, // 机构名称
          logo:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551783667609&di=968aba5a1957ab1d7c552e6a8b6cc769&imgtype=0&src=http%3A%2F%2Fimg2.woyaogexing.com%2F2018%2F01%2F20%2Fa17016d0a174e3b4%2521400x400_big.jpg",
          seriesId: this.pageData.datas.seriesId, // 产品系列ID
          xilie: this.pageData.datas.seriesName, // 产品系列
          leibie: this.pageData.datas.typeAlias, // 存款类别
          leixing: this.pageData.datas.productSubtypeLabel, // 产品类型
          lilv: this.pageData.datas.interest.interestRate, // 利率
          interestRateAlias: this.pageData.datas.interestRateAlias, // 利率别名
          qicun: this.pageData.datas.minAmount, // 起存金额
          dizengjine: this.pageData.datas.increaseAmount, // 递增金额
          chanpinmiaoshu: this.pageData.datas.description, // 产品描述
          shangjia: this.pageData.datas.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
          mianqian:
            this.pageData.datas.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
          tuijian:
            this.pageData.datas.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
          paihang: this.pageData.datas.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
          bishu: this.pageData.datas.appInfo.defaultBuyNum, // 默认购买笔数
          morenjine: this.pageData.datas.appInfo.defaultAmount, // 默认购买金额
          chanpinbiaozhi: this.pageData.datas.appInfo.sameProductFlag, // 同一产品标识
          bangdan: this.pageData.datas.appInfo.listAreaFlagLabel, // 榜单专区标识
          chanpinID: this.pageData.datas.appInfo.productId, // 产品id
          createTime: this.pageData.datas.gmtCreated, // 创建时间
          who: this.pageData.datas.operator, // 创建人
          biaoqian: this.pageData.datas.productTags // 标签
        };
        this.shangjia =
          this.pageData.datas.appInfo.shelve === "YES" ? true : false;
        break;

      // 定期存款
      case "time_deposit":
        this.forEmit = "dingqi";
        this.deleteType = "time";
        this.show = [
          "chanpinmiaoshu",
          "xilie",
          "leibie",
          "leixing",
          "shangjia",
          "paihang",
          "mianqian",
          "yinhangpage", // 显示银行过渡页
          "jianguan",
          "bishu",
          "morenjine",
          "chanpinbiaozhi",
          "qianyue",
          "hezuoType",
          "autoUpDown",
          "biaoqian",
          "qicun",
          "dizengjine",
          "bangdan",
          "tuijian",
          "guanzhuNum", // 默认关注数量
          "quyu", // 产品区域
          "fanhuan", // 收益返还方式
          "zhuancun", // 到期是否转存
          "fuxipinlv", // 付息频率
          "shiming", // 是否实名
          "shoufeilv", // 年收费率(%)
          "H5Url", // 产品H5链接
          "duijie", // 银行对接方式
          "zhiqu" // 支取时间
        ];
        this.show1 = [
          "xilie",
          "bieming",
          "jigou_name",
          "productcunkuan",
          "lilvlist",
          "fanhuan",
          "quyu",
          "zhuancun",
          "qicunjine",
          "fuxipinlv",
          "dizeng",
          "marks",
          "chanpinmiaoshu",
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "shiming",
          "jianguan",
          "goumaibishu",
          "goumaijine",
          "qianyue",
          "chanpinbiaozhi",
          "zhuanqubiaozhi",
          "shoufeilv",
          "guanzhuNum",
          "yihangTip",
          "duijie",
          "H5Url",
          "autoUpDown",
          "zhiqu",
          "hezuo"
        ];
        this.pageError = ["jigou_name"];
        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.datas.id,
          skuId: this.pageData.datas.skuId,
          title: this.pageData.datas.name, // 上标题，产品名称
          institutionId: this.pageData.datas.institutionId, // 机构id
          name: this.pageData.datas.institutionName, // 机构名称
          logo:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551783667609&di=968aba5a1957ab1d7c552e6a8b6cc769&imgtype=0&src=http%3A%2F%2Fimg2.woyaogexing.com%2F2018%2F01%2F20%2Fa17016d0a174e3b4%2521400x400_big.jpg",
          seriesId: this.pageData.datas.seriesId, // 产品系列ID
          xilie: this.pageData.datas.seriesName, // 产品系列
          leibie: this.pageData.datas.typeAlias, // 存款类别
          productSubtype: this.pageData.datas.productSubtype, // 产品子类型
          leixing: this.pageData.datas.productSubtypeLabel, // 产品类型
          qicun: this.pageData.datas.minAmount, // 起存金额
          dizengjine: this.pageData.datas.increaseAmount, // 递增金额
          chanpinbiaozhi: this.pageData.datas.appInfo.sameProductFlag, // 同一产品标识
          bangdan: this.pageData.datas.appInfo.listAreaFlagLabel, // 榜单专区标识
          chanpinID: this.pageData.datas.appInfo.productId, // 产品id
          createTime: this.pageData.datas.gmtCreated, // 创建时间
          who: this.pageData.datas.operator, // 创建人
          biaoqian: this.pageData.datas.productTags, // 标签
          zhuancun: this.pageData.datas.renewal === "YES" ? "是" : "否", // 到期是否转存
          zhiqu: this.pageData.datas.withdrawalTimeLabel, // 支取时间
          fanhuan: this.pageData.datas.incomeReturnWayLabel, // 收益返还方式
          jianguan: this.pageData.datas.regulatoryPropertyLabel, // 监管属性
          chanpinmiaoshu: this.pageData.datas.description, // 产品描述
          fuxipinlv: this.pageData.datas.frequencyType, // 付息频率
          shangjia: this.pageData.datas.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
          mianqian:
            this.pageData.datas.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
          tuijian:
            this.pageData.datas.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
          paihang: this.pageData.datas.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
          bishu: this.pageData.datas.appInfo.defaultBuyNum, // 默认购买笔数
          morenjine: this.pageData.datas.appInfo.defaultAmount, // 默认购买金额
          shiming:
            this.pageData.datas.appInfo.realNameAuth === "YES" ? "是" : "否", // 是否实名
          qianyue: this.pageData.datas.appInfo.signed === "YES" ? "是" : "否", // 是否签约
          guanzhuNum: this.pageData.datas.appInfo.defaultFlowNum, // 默认关注数量
          yinhangpage:
            this.pageData.datas.appInfo.showBankPage === "YES" ? "是" : "否", // 显示银行过渡页
          hezuoType: this.pageData.datas.appInfo.cooperationModeLabel, // 合作方式
          autoUpDown:
            this.pageData.datas.appInfo.autoShelve === "YES" ? "是" : "否", // 自动上架
          shoufeilv: this.pageData.datas.appInfo.yearRate, // 年收费率(%)
          H5Url: this.pageData.datas.appInfo.h5Url, // 产品H5链接
          duijie: this.pageData.datas.appInfo.connectionModeLabel // 银行对接方式
        };
        this.shangjia =
          this.pageData.datas.appInfo.shelve === "YES" ? true : false;
        break;
      // 智能存款
      case "intelligent_deposit":
        this.forEmit = "zhineng";
        this.deleteType = "intelligent";
        this.show = [
          "chanpinmiaoshu",
          "xilie",
          "leibie",
          "leixing",
          "shangjia",
          "paihang",
          "mianqian",
          "jixi",
          "zhiqu",
          "qicun",
          "dizengjine",
          "zhuancun",
          "biaoqian",
          "chanpinmiaoshu",
          "tuijian",
          "cunkuanbishu",
          "cunkuanmorenjine",
          "chanpinbiaozhi",
          "bangdan"
        ];
        this.show1 = [
          "jigou_name",
          "xilie",
          "productcunkuan",
          "bieming",
          "jixi", // 计息方式
          "qicunjine",
          "marks",
          "dizeng",
          "zhuancun",
          "zhiqu",
          "goumaibishu",
          "goumaijine",
          "chanpinbiaozhi",
          "chanpinmiaoshu",
          "lilvlist",
          "interestRateAlias",
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang"
        ];
        this.pageError = ["jigou_name"];

        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.datas.id,
          skuId: this.pageData.datas.skuId,
          title: this.pageData.datas.name, // 上标题，产品名称
          institutionId: this.pageData.datas.institutionId, // 机构id
          name: this.pageData.datas.institutionName, // 机构名称
          jixi: this.pageData.datas.interestModeLabel, // 计息方式
          logo:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551783667609&di=968aba5a1957ab1d7c552e6a8b6cc769&imgtype=0&src=http%3A%2F%2Fimg2.woyaogexing.com%2F2018%2F01%2F20%2Fa17016d0a174e3b4%2521400x400_big.jpg",
          seriesId: this.pageData.datas.seriesId, // 产品系列ID
          xilie: this.pageData.datas.seriesName, // 产品系列
          leibie: this.pageData.datas.typeAlias, // 存款类别
          leixing: this.pageData.datas.productSubtypeLabel, // 产品类型
          qicun: this.pageData.datas.minAmount, // 起存金额
          dizengjine: this.pageData.datas.increaseAmount, // 递增金额
          chanpinbiaozhi: this.pageData.datas.appInfo.sameProductFlag, // 同一产品标识
          bangdan: this.pageData.datas.appInfo.listAreaFlagLabel, // 榜单专区标识
          chanpinID: this.pageData.datas.appInfo.productId, // 产品id
          createTime: this.pageData.datas.gmtCreated, // 创建时间
          who: this.pageData.datas.operator, // 创建人
          biaoqian: this.pageData.datas.productTags, // 标签
          zhuancun: this.pageData.datas.renewal === "YES" ? "是" : "否", // 到期是否转存
          zhiqu: this.pageData.datas.withdrawalTimeLabel, // 支取时间
          chanpinmiaoshu: this.pageData.datas.description, // 产品描述
          shangjia: this.pageData.datas.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
          mianqian:
            this.pageData.datas.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
          tuijian:
            this.pageData.datas.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
          paihang: this.pageData.datas.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
          cunkuanbishu: this.pageData.datas.appInfo.defaultBuyNum, // 默认存款笔数
          cunkuanmorenjine: this.pageData.datas.appInfo.defaultAmount // 默认存款金额
        };
        this.shangjia =
          this.pageData.datas.appInfo.shelve === "YES" ? true : false;
        break;
      // 结构存款
      case "structured_deposit":
        this.forEmit = "jiegou";
        this.deleteType = "structured";
        this.show = [
          "xilie",
          "leibie",
          "leixing",
          "lilv",
          "maxLilv", // 最高利率
          "daoqiLilv", // 到期利率
          "qixian",
          "qicun",
          "dizengjine",
          "shengyuED", // 剩余额度
          "fengxian",
          "qishou", // 起售日期
          "jiezhi", // 截止日期
          "qixi", // 起息日
          "jiexi", // 结息日
          "biaoqian",
          "chanpinmiaoshu",
          "shangjia",
          "mianqian",
          "bishu",
          "morenjine",
          "tuijian",
          "jianguan",
          "bangdan",
          "paihang",
          "chanpinbiaozhi",
          "interestRateAlias",
          "deadlineAlias"
        ];
        this.show1 = [
          "jigou_name",
          "xilie",
          "productcunkuan",
          "bieming",
          "lilv",
          "maxLilv",
          "daoqiLilv",
          "shengyuED",
          "qishou",
          "qixi",
          "qixian",
          "fengxian",
          "jianguan",
          "qicunjine",
          "dizeng",
          "marks",
          "chanpinmiaoshu",
          "shangjia",
          "mianqian",
          "bishu",
          "morenjine",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "bangdan",
          "goumaibishu",
          "goumaijine",
          "zhuanqubiaozhi",
          "interestRateAlias",
          "deadlineAlias"
        ];
        this.pageError = ["jigou_name"];
        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.datas.id,
          skuId: this.pageData.datas.skuId,
          title: this.pageData.datas.name, // 上标题，产品名称
          institutionId: this.pageData.datas.institutionId, // 机构id
          name: this.pageData.datas.institutionName, // 机构名称
          logo:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551783667609&di=968aba5a1957ab1d7c552e6a8b6cc769&imgtype=0&src=http%3A%2F%2Fimg2.woyaogexing.com%2F2018%2F01%2F20%2Fa17016d0a174e3b4%2521400x400_big.jpg",
          seriesId: this.pageData.datas.seriesId, // 产品系列ID
          xilie: this.pageData.datas.seriesName, // 产品系列
          leibie: this.pageData.datas.typeAlias, // 存款类别
          leixing: this.pageData.datas.productSubtypeLabel, // 产品类型
          lilv: this.pageData.datas.interest.interestRate, // 利率
          interestRateAlias: this.pageData.datas.interestRateAlias, // 利率别名
          maxLilv: this.pageData.datas.interest.maxInterestRate, // 最高利率
          daoqiLilv: this.pageData.datas.interest.expireInterestRate, // 到期利率
          deadlineAlias: this.pageData.datas.deadlineAlias, // 期限别名
          qixian: this.pageData.datas.interest.deadline, // 投资期限
          qicun: this.pageData.datas.minAmount, // 起存金额
          shengyuED: this.pageData.datas.surplusQuotaLabel, // 剩余额度
          fengxian: this.pageData.datas.riskLevelLabel, // 风险等级
          jianguan: this.pageData.datas.regulatoryPropertyLabel, // 监管属性
          dizengjine: this.pageData.datas.increaseAmount, // 递增金额
          chanpinmiaoshu: this.pageData.datas.description, // 产品描述
          shangjia: this.pageData.datas.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
          mianqian:
            this.pageData.datas.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
          tuijian:
            this.pageData.datas.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
          paihang: this.pageData.datas.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
          bishu: this.pageData.datas.appInfo.defaultBuyNum, // 默认购买笔数
          morenjine: this.pageData.datas.appInfo.defaultAmount, // 默认购买金额
          chanpinbiaozhi: this.pageData.datas.appInfo.sameProductFlag, // 同一产品标识
          bangdan: this.pageData.datas.appInfo.listAreaFlagLabel, // 榜单专区标识
          chanpinID: this.pageData.datas.appInfo.productId, // 产品id
          createTime: this.pageData.datas.gmtCreated, // 创建时间
          who: this.pageData.datas.operator, // 创建人
          biaoqian: this.pageData.datas.productTags // 标签
        };
        if (this.pageData.datas.sellingDate) {
          // 起售日期
          this.pageInfos.qishou = this.pageData.datas.sellingDate[0];
          // 截止日期
          this.pageInfos.jiezhi = this.pageData.datas.sellingDate[1];
        }
        if (this.pageData.datas.valueDate) {
          this.pageInfos.qixi = this.pageData.datas.valueDate[0]; // 起息日
          this.pageInfos.jiexi = this.pageData.datas.valueDate[1]; // 结息日
        }
        this.shangjia =
          this.pageData.datas.appInfo.shelve === "YES" ? true : false;
        break;
    }
    this.copyError = this.pageError;
  },
  methods: {
    // 新增利率(点击添加)
    addNewLilv() {
      let i = this.addLilvTable.total;
      let idNum = i; // 添加新利率表时，排除已存在的id
      let idArr = this.addLilvTable.dataTotal.map(item => item.id);
      if (idArr.some(tar => tar === i)) {
        idNum += 1;
        while (idArr.some(tar => tar === idNum)) {
          idNum += 1;
        }
      }
      let obj = {
        id: idNum,
        limit: "", // 期限
        danwei: "", // 单位
        lilv: "", // 利率
        lockinPeriod: "", // 锁定期限
        beizhu: "", // 备注
        showList: "", // 榜单展示
        lockinShowList: "" // 锁定期榜单展示
      };

      this.addLilvTable.dataTotal.unshift(obj);
      this.addLilvTable.total += 1;
      let num = this.addLilvTable.dataTotal.length;
      if (num <= 5) {
        this.addLilvTable.datas = this.addLilvTable.dataTotal.slice();
      } else {
        this.addLilvTable.datas = this.addLilvTable.dataTotal.slice(0, 5);
      }
    },
    // 显示删除确认框
    toShowProp(tar) {
      this.$confirm(`确定要删除吗？`)
        .then(_ => {
          this.toDeletelist(tar);
        })
        .catch(() => {});
    },
    // 删除利率
    toDeletelist(item) {
      let num = item,
        obj = this.addLilvTable;
      obj.dataTotal = obj.dataTotal.filter(item => item.id != num.id); // 从总数据中删除要删除的
      obj.datas = obj.datas.filter(item => item.id != num.id); // 更新当前页显示的
      obj.total = obj.dataTotal.length; // 更新总量数

      let arr = [];
      let isShowd = obj.datas;
      // 如果总数大于当前显示的数量，将删除项后边一位的数据补充到datas进行显示
      if (obj.dataTotal.length > isShowd.length) {
        for (let i = isShowd.length; i--; ) {
          arr.push(isShowd[i].id);
        }
        let ids = Math.max(...arr) + 1; // 旧的显示列表id最大的一项的后一项，以索引评判
        let item = null;
        for (let i = obj.dataTotal.length; i--; ) {
          if (obj.dataTotal[i].id === ids) {
            item = obj.dataTotal[i]; // 找到要进行补位的项
          }
        }
        if (item) {
          obj.datas.push(item);
        }
      }
    },
    // 上一页 true、下一页 false
    pageStep(type) {
      if (type) {
        if (this.addLilvTable.pageNum > 0) {
          this.addLilvTable.pageNum -= 1;
          this.addLilvTable.datas = this.addLilvTable.dataTotal.slice(
            this.addLilvTable.pageNum * 5,
            this.addLilvTable.pageNum * 5 + 5
          );
        }
      } else {
        let num1 = this.addLilvTable.total / 5;
        let num2 = this.addLilvTable.pageNum + 1;

        if (this.addLilvTable.total > 5 && num1 > num2) {
          this.addLilvTable.pageNum += 1;
          this.addLilvTable.datas = this.addLilvTable.dataTotal.slice(
            this.addLilvTable.pageNum * 5,
            this.addLilvTable.pageNum * 5 + 5
          );
        }
      }
    },
    /********************************************************************************************/
    // 产品描述的展开与否
    toShowMore(num) {
      if (this.toShowMoreNum === num) {
        this.toShowMoreNum = null;
      } else {
        this.toShowMoreNum = num;
      }
    },
    // 生成随机颜色
    makeStyle() {
      let num1 = Math.random() * 255;
      let num2 = Math.random() * 255;
      let num3 = Math.random() * 255;
      let str = `background:rgba(${num1},${num2},${num3},.7)`;
      return str;
    },
    /********************************************************************************************/
    // logo边上的按钮
    // 编辑
    toEdit() {
      switch (this.pageData.page) {
        case "pure_debt_fund":
          console.log("pure_debt_fund");
          break;
        // 货币
        case "money_fund":
          console.log("money_fund");
          break;
        // 理财
        case "manage_money_matters":
          console.log("manage_money_matters");
          break;
        // 活期存款
        case "demand_deposit":
          this.get_huoqi_edit_data();
          break;
        // 定期存款
        case "time_deposit":
          this.get_dingqi_edit_data();
          break;
        // 智能存款
        case "intelligent_deposit":
          this.get_zhineng_edit_data();
          break;
        // 结构存款
        case "structured_deposit":
          this.get_jiegou_edit_data();
          break;
      }
    },
    // 获取活期存款编辑数据
    get_huoqi_edit_data() {
      this.$api
        .huoqi_edit_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res.success) {
            this.serverData = res.data;
            this.change_xilie(this.serverData.institutionId);
            // 点击编辑按钮
            this.ruleForm = {
              jigou_name: this.serverData.institutionId, // 机构名称
              xilie: this.serverData.seriesId, // 产品系列
              productcunkuan: this.serverData.name, // 存款产品名称
              bieming: this.serverData.typeAlias, // 产品类型(别名)
              lilv: this.serverData.interest.interestRate, // 利率
              interestRateAlias: this.serverData.interestRateAlias, // 利率别名
              deadlineAlias: this.serverData.deadlineAlias, // 期限别名
              qicunjine: this.serverData.minAmount, // 起存金额
              marks: this.serverData.productTags.map(tar => tar.id), // 标签
              dizeng: this.serverData.increaseAmount, // 递增金额
              chanpinmiaoshu: this.serverData.description, // 产品描述
              chanpinbiaozhi: this.serverData.appInfo.sameProductFlag, // 同一产品标识
              shangjia: this.serverData.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
              mianqian:
                this.serverData.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
              tuijian:
                this.serverData.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              goumaibishu: this.serverData.appInfo.defaultBuyNum, // 默认购买笔数
              goumaijine: this.serverData.appInfo.defaultAmount, // 默认购买金额
              zhuanqubiaozhi: this.serverData.appInfo.listAreaFlag // 榜单专区标识
            };
            this.bianjieDialog = true;
          }
        });
    },
    // 获取定期存款编辑数据
    get_dingqi_edit_data() {
      this.$api
        .dingqi_edit_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res.success) {
            this.serverData = res.data;
            this.change_xilie(this.serverData.institutionId);
            // 点击编辑按钮
            this.ruleForm = {
              jigou_name: this.serverData.institutionId, // 机构名称
              xilie: this.serverData.seriesId, // 产品系列
              productcunkuan: this.serverData.name, // 存款产品名称
              goumaibishu: this.serverData.appInfo.defaultBuyNum, // 默认购买笔数
              goumaijine: this.serverData.appInfo.defaultAmount, // 默认购买金额
              qicunjine: this.serverData.minAmount, // 起存金额
              dizeng: this.serverData.increaseAmount, // 递增金额
              chanpinbiaozhi: this.serverData.appInfo.sameProductFlag, // 同一产品标识
              bieming: this.serverData.typeAlias, // 产品类型(别名)
              zhuancun: this.serverData.renewal === "YES" ? "是" : "否", // 到期后是否转存
              zhiqu: this.serverData.withdrawalTime, // 支取时间
              fanhuan: this.serverData.incomeReturnWay, // 收益返还方式
              jianguan: this.serverData.regulatoryProperty, // 监管属性
              fuxipinlv: this.serverData.frequencyType, // 付息频率
              chanpinmiaoshu: this.serverData.description, // 产品描述
              shangjia: this.serverData.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
              mianqian:
                this.serverData.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
              tuijian:
                this.serverData.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              zhuanqubiaozhi: this.serverData.appInfo.listAreaFlag, // 榜单专区标识
              duijie: this.serverData.appInfo.connectionMode, // 银行对接方式
              hezuo: this.serverData.appInfo.cooperationMode, // 银行合作方式
              shoufeilv: this.serverData.appInfo.yearRate, // 年收费率
              yihangTip:
                this.serverData.appInfo.showBankPage === "YES" ? "是" : "否", // 显示银行过渡页
              autoUpDown:
                this.serverData.appInfo.autoShelve === "YES" ? "是" : "否", // 自动上架
              H5Url: this.serverData.appInfo.h5Url, // H5链接
              qianyue: this.serverData.appInfo.signed === "YES" ? "是" : "否", // 是否签约
              guanzhuNum: this.serverData.appInfo.defaultFlowNum, // 默认关注数量
              shiming:
                this.serverData.appInfo.realNameAuth === "YES" ? "是" : "否", // 是否实名
              quyu: this.pageData.datas.appInfo.areaCode, // 产品区域
              marks: this.serverData.productTags.map(tar => tar.id), // 标签
              qishou: this.serverData.riskLevelLabel, // 起售日期
              qixi: this.serverData.valueDate, // 起息日期
              fengxian: this.serverData.riskLevel // 风险等级
            };
            let kk = this.serverData.interestRates.map(item => {
              let obj = {
                id: item.id,
                spuId: item.spuId,
                limit: item.deadline, // 期限
                danwei: item.timeUnitType, // 单位
                lilv: item.interestRate, // 利率
                lockinPeriod: item.lockinPeriod, // 锁定期限
                beizhu: item.remark, // 备注
                showList: item.showList, // 榜单展示
                lockinShowList: item.lockinShowList // 锁定期榜单展示
              };
              return obj;
            });
            this.addLilvTable.total = kk.length;
            this.addLilvTable.dataTotal = kk;
            this.addLilvTable.datas = kk.slice(0, 5);
            this.bianjieDialog = true;
          }
        });
    },
    // 获取智能存款编辑数据
    get_zhineng_edit_data() {
      this.$api
        .zhineng_edit_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res.success) {
            this.serverData = res.data;
            this.change_xilie(this.serverData.institutionId);
            // 点击编辑按钮
            this.ruleForm = {
              jigou_name: this.serverData.institutionId, // 机构名称
              xilie: this.serverData.seriesId, // 产品系列
              productcunkuan: this.serverData.name, // 存款产品名称
              qicunjine: this.serverData.minAmount, // 起存金额
              dizeng: this.serverData.increaseAmount, // 递增金额
              interestRateAlias: this.serverData.interestRateAlias, // 利率别名
              chanpinbiaozhi: this.serverData.appInfo.sameProductFlag, // 同一产品标识
              bieming: this.serverData.typeAlias, // 产品类型(别名)
              zhuancun: this.serverData.renewal === "YES" ? "是" : "否", // 到期后是否转存
              zhiqu: this.serverData.withdrawalTime, // 支取时间
              jixi: this.serverData.interestMode, // 计息方式
              chanpinmiaoshu: this.serverData.description, // 产品描述
              shangjia: this.serverData.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
              mianqian:
                this.serverData.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
              tuijian:
                this.serverData.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              zhuanqubiaozhi: this.serverData.appInfo.listAreaFlag, // 榜单专区标识
              goumaibishu: this.serverData.appInfo.defaultBuyNum, // 默认购买笔数
              goumaijine: this.serverData.appInfo.defaultAmount, // 默认购买金额
              marks: this.serverData.productTags.map(tar => tar.id), // 标签
              lilv: []
            };
            let kk = this.serverData.interestRates.map(item => {
              let obj = {
                id: item.id,
                spuId: item.spuId,
                limit: item.deadline, // 期限
                danwei: item.timeUnitType, // 单位
                lilv: item.interestRate, // 利率
                lockinPeriod: item.lockinPeriod, // 锁定期限
                beizhu: item.remark, // 备注
                showList: item.showList, // 榜单展示
                lockinShowList: item.lockinShowList // 锁定期榜单展示
              };
              return obj;
            });
            this.addLilvTable.total = kk.length;
            this.addLilvTable.dataTotal = kk;
            this.addLilvTable.datas = kk.slice(0, 5);
            this.bianjieDialog = true;
          }
        });
    },
    // 获取结构存款编辑数据
    get_jiegou_edit_data() {
      this.$api
        .jiegou_edit_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res.success) {
            this.serverData = res.data;
            this.change_xilie(this.serverData.institutionId);
            // 点击编辑按钮  fd
            this.ruleForm = {
              jigou_name: this.serverData.institutionId, // 机构名称
              xilie: this.serverData.seriesId, // 产品系列
              productcunkuan: this.serverData.name, // 存款产品名称
              qicunjine: this.serverData.minAmount, // 起存金额
              dizeng: this.serverData.increaseAmount, // 递增金额
              bieming: this.serverData.typeAlias, // 产品类型(别名)
              interestRateAlias: this.serverData.interestRateAlias, // 利率别名
              deadlineAlias: this.serverData.interest.deadlineAlias, // 期限别名
              lilv: this.serverData.interest.interestRate, // 利率
              maxLilv: this.serverData.interest.maxInterestRate, // 最高利率
              daoqiLilv: this.serverData.interest.expireInterestRate, // 到期利率
              marks: this.serverData.productTags.map(tar => tar.id), // 标签
              shengyuED: this.serverData.surplusQuota, // 剩余额度
              fengxian: this.serverData.riskLevel, // 风险等级
              jianguan: this.serverData.regulatoryProperty, // 监管属性
              qixian: this.serverData.interest.investmentPeriod, // 投资期限
              qishou: this.serverData.sellingDate, // 起售日期
              qixi: this.serverData.valueDate, // 起息日期
              chanpinmiaoshu: this.serverData.description, // 产品描述
              shangjia: this.serverData.appInfo.shelve === "YES" ? "是" : "否", // 是否上架
              mianqian:
                this.serverData.appInfo.visaInterview === "YES" ? "是" : "否", // 是否面签
              tuijian:
                this.serverData.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              goumaibishu: this.serverData.appInfo.defaultBuyNum, // 默认购买笔数
              goumaijine: this.serverData.appInfo.defaultAmount, // 默认购买金额
              zhuanqubiaozhi: this.serverData.appInfo.listAreaFlag, // 榜单专区标识
              chanpinbiaozhi: this.serverData.appInfo.sameProductFlag // 同一产品标识
            };
            this.bianjieDialog = true;
          }
        });
    },
    // 变更机构后，要对应调整系列
    change_xilie(id) {
      // 根据机构id，获取对应的产品系列
      let xilieData = JSON.parse(sessionStorage.getItem("xilie_data"));
      this.xilie = xilieData.filter(
        item => item.institutionId === id
      )[0].seriesList;

      if (this.ruleForm.xilie) {
        this.ruleForm.xilie = "";
      }
    },
    // 上、下架
    toUpDown() {
      let message = "";
      if (this.shangjia) {
        message = "下架后客户将不可见，确定下架吗？";
      } else {
        message = "上架后客户将可见，确定上架吗？";
      }
      this.$confirm(message)
        .then(() => {
          this.$api
            .product_chunzhai_UpDown({
              vm: this,
              data: {
                id: this.pageInfos.id,
                status: this.shangjia ? "NO" : "YES"
              }
            })
            .then(res => {
              if (res.success) {
                this.$message.success("操作成功！");
                this.$emit("toReGetData", this.forEmit);
              } else {
                this.$message.success("操作失败！");
              }
            });
        })
        .catch(() => {});
    },
    // 删除
    toDelete() {
      this.$confirm(`确定删除？`)
        .then(_ => {
          this.$api
            .xiangqing_delete({
              vm: this,
              data: this.pageInfos.id,
              type: this.deleteType
            })
            .then(res => {
              if (res.success) {
                this.$message.success("删除成功！");
                this.$router.push({
                  name: "deposit_mainPage"
                });
              } else {
                this.$message.error("删除失败！");
              }
            });
        })
        .catch(() => {});
    },

    // buttonClick(type) {
    //   switch (type) {
    //     case "bianji":
    //       this.bianjieDialog = true;

    //       this.$api
    //         .getChunZhaiInfoData({
    //           vm: this,
    //           id: this.pageInfos.chanpinID
    //         })
    //         .then(res => {
    //           this.serverData = res.data;
    //           this.ruleForm = {
    //             // 纯债编辑按钮弹出框
    //             product: res.data.name,
    //             daima: res.data.code,
    //             jigou_name: res.data.institutionId,
    //             gongsi: res.data.fundHouseId,
    //             jiaoyizhuangtai: +res.data.status,
    //             rizhangfu: res.data.dailyIncrease,
    //             shangjia: res.data.appInfo.shelve === "YES" ? "是" : "否",
    //             mianqian:
    //               res.data.appInfo.visaInterview === "YES" ? "是" : "否",
    //             tuijian: res.data.appInfo.recommend === "YES" ? "是" : "否",
    //             paihang: res.data.appInfo.homePage === "YES" ? "是" : "否",
    //             goumaibishu: res.data.appInfo.defaultNum,
    //             goumaijine: res.data.appInfo.defaultAmount
    //           };
    //         });
    //       break;
    //   }
    // },

    // 点击编辑的保存并验证必填项是否有数据
    save() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let xilieData = JSON.parse(sessionStorage.getItem("xilie_data"));
          let isCanPost = true;
          switch (this.pageData.page) {
            // 纯债基金管理
            case "pure_debt_fund":
              this.hasClick = true;
              this.copyError.forEach(item => {
                if (this.ruleForm[item] === "") {
                  this.needValid.push(item);
                }
              });
              if (this.needValid.length === 0) {
                let obj = {
                  id: this.serverData.id,
                  institutionId: this.ruleForm.jigou_name,
                  institutionName: "",
                  fundHouseId: this.ruleForm.gongsi,
                  fundHouseName: "",
                  name: this.ruleForm.product,
                  code: this.ruleForm.daima,
                  status: this.ruleForm.jiaoyizhuangtai,
                  statusName: "",
                  dailyIncrease: +this.ruleForm.rizhangfu,
                  appInfo: {
                    id: this.serverData.appInfo.id,
                    productId: this.serverData.appInfo.productId,
                    productType: this.serverData.appInfo.productType,
                    defaultNum: +this.ruleForm.goumaibishu,
                    defaultAmount: +this.ruleForm.goumaijine,
                    shelve: this.ruleForm.shangjia === "是" ? "YES" : "NO",
                    visaInterview:
                      this.ruleForm.mianqian === "是" ? "YES" : "NO",
                    recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO",
                    homePage: this.ruleForm.paihang === "是" ? "YES" : "NO"
                  }
                };
                obj.institutionName = this.dictData.jigou.filter(item => {
                  return item.id === obj.institutionId;
                })[0].name;
                obj.fundHouseName = this.dictData.jijin.filter(item => {
                  return item.id === obj.fundHouseId;
                })[0].name;
                obj.statusName = this.dictData.transaction_state.filter(
                  item => {
                    return item.id === obj.status;
                  }
                )[0].label;

                this.$api
                  .putChunZhaiEdit({
                    vm: this,
                    data: obj
                  })
                  .then(res => {
                    if (res) {
                      this.$message.success("修改成功");
                      this.toClosebianjieDialog();
                      this.$emit("reGetData");
                    }
                  });
              } else {
                this.$message.error("请正确填写必要数据!");
              }
              break;
            // 货币
            case "money_fund":
              console.log("money_fund");
              break;
            // 理财
            case "manage_money_matters":
              console.log("manage_money_matters");
              break;
            // 活期存款管理
            case "demand_deposit":
              let huoqiData = {
                id: this.serverData.id, // ID
                productId: this.serverData.productId, // 产品ID
                skuId: this.serverData.skuId, // sku主键
                institutionId: this.ruleForm.jigou_name,
                institutionName: "",
                seriesId: this.ruleForm.xilie,
                seriesName: "",
                productSubtype: this.serverData.productSubtype,
                productSubtypeLabel: this.serverData.productSubtypeLabel,
                typeAlias: this.ruleForm.bieming,
                name: this.ruleForm.productcunkuan,
                minAmount: +this.ruleForm.qicunjine,
                increaseAmount: +this.ruleForm.dizeng,
                interestRateAlias: this.ruleForm.interestRateAlias,
                description: this.ruleForm.chanpinmiaoshu,
                interest: {
                  id: this.serverData.interest.id,
                  spuId: this.serverData.interest.spuId,
                  interestRate: +this.ruleForm.lilv
                },
                productTags: [],
                appInfo: {
                  id: this.serverData.appInfo.id,
                  productId: this.serverData.productId, // 产品ID
                  shelve: this.ruleForm.shangjia === "是" ? "YES" : "NO",
                  visaInterview: this.ruleForm.mianqian === "是" ? "YES" : "NO",
                  recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO",
                  homePage: this.ruleForm.paihang === "是" ? "YES" : "NO",
                  defaultBuyNum: +this.ruleForm.goumaibishu,
                  defaultAmount: +this.ruleForm.goumaijine,
                  listAreaFlag: this.ruleForm.zhuanqubiaozhi,
                  listAreaFlagLabel: "",
                  sameProductFlag: this.ruleForm.chanpinbiaozhi
                }
              };

              // 榜单专区标识Label
              this.dictData.list_area_type.forEach(item => {
                if (item.value === this.ruleForm.zhuanqubiaozhi) {
                  huoqiData.appInfo.listAreaFlagLabel = item.label;
                }
              });

              // 机构名
              xilieData.forEach(item => {
                if (item.institutionId === this.ruleForm.jigou_name) {
                  huoqiData.institutionName = item.institutionName;
                }
              });
              // 系列名
              this.xilie.forEach(item => {
                if (item.id === this.ruleForm.xilie) {
                  huoqiData.seriesName = item.name;
                }
              });

              // 获取标签
              if (this.ruleForm.marks.length > 0) {
                this.dictData.marks.forEach(item => {
                  this.ruleForm.marks.forEach(tar => {
                    if (item.id === tar) {
                      huoqiData.productTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              this.$api
                .edit_HuoQi({
                  vm: this,
                  data: huoqiData
                })
                .then(res => {
                  if (res.success) {
                    this.$message.success("修改成功");
                    this.toClosebianjieDialog();
                    this.$emit("toReGetData", this.forEmit);
                  }
                });
              break;
            // 定期存款管理
            case "time_deposit":
              let dingqiArr = [],
                dingqiData = {};
              // 检查利率列表是否必填项已经填写
              this.addLilvTable.dataTotal.forEach(item => {
                if (
                  item.limit &&
                  item.danwei &&
                  item.lilv &&
                  item.lockinPeriod
                ) {
                  dingqiArr.push(item);
                }
              });
              // 验证利率列表里的数据是否有负数
              for (let i = dingqiArr.length; i--; ) {
                let arr = Object.keys(dingqiArr[i]);
                for (let j = arr.length; j--; ) {
                  let value = dingqiArr[i][arr[j]];
                  if (typeof +value === "number" && value < 0) {
                    isCanPost = false;
                    this.$message.error("利率列表里存在为负数据，请更改！");
                    break;
                  }
                }
              }
              // 如果利率列表里存在为负的数据，则不进行下一步
              if (!isCanPost) {
                return;
              }
              dingqiData = {
                // 利率信息列表
                id: this.serverData.id,
                productId: this.serverData.productId, // 产品ID
                skuId: this.serverData.skuId,
                institutionId: this.ruleForm.jigou_name, // 机构ID
                institutionName: "", // 机构名称
                seriesId: this.ruleForm.xilie, // 产品系列ID
                seriesName: "", // 产品系列名称
                name: this.ruleForm.productcunkuan, // 产品名称
                defaultNum: this.ruleForm.goumaibishu, // 默认购买数量
                defaultAmount: this.ruleForm.goumaijine, // 默认购买金额
                minAmount: this.ruleForm.qicunjine, // 起购金额
                increaseAmount: this.ruleForm.dizeng, // 递增金额
                productSubtype: this.serverData.productSubtype, // 产品子类型
                productSubtypeLabel: this.serverData.productSubtypeLabel, // 产品子类型Label
                typeAlias: this.ruleForm.bieming, // 产品类型（类别别名）
                renewal: this.ruleForm.zhuancun === "是" ? "YES" : "NO", // 到期是否转存
                withdrawalTime: this.ruleForm.zhiqu, // 支取时间
                withdrawalTimeLabel: "", // 支取时间Label
                incomeReturnWay: this.ruleForm.fanhuan, // 收益返还方式
                incomeReturnWayLabel: "", // 收益返还方式Label
                regulatoryProperty: this.ruleForm.jianguan, // 监管属性
                regulatoryPropertyLabel: "", // 监管属性Label
                frequencyType: this.ruleForm.fuxipinlv, //付息频率
                frequencyTypeLabel: "", //付息频率Label
                description: this.ruleForm.chanpinmiaoshu, // 描述
                interestRates: [],
                appInfo: {
                  // 产品配置信息
                  id: this.serverData.appInfo.id, // 主键
                  productId: this.serverData.productId, // 产品id
                  shelve: this.ruleForm.shangjia === "是" ? "YES" : "NO", //是否上架
                  visaInterview: this.ruleForm.mianqian === "是" ? "YES" : "NO", // 是否面签
                  recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO", //是否推荐
                  homePage: this.ruleForm.paihang === "是" ? "YES" : "NO", //是否首页排序
                  listAreaFlag: this.ruleForm.zhuanqubiaozhi, // 榜单专区标识
                  listAreaFlagLabel: "", // 榜单专区标识Label
                  cooperationMode: this.ruleForm.hezuo, // 合作方式
                  cooperationModeLabel: "", //合作方式Label
                  yearRate: this.ruleForm.shoufeilv, // 年收费率
                  autoShelve: this.ruleForm.autoUpDown === "是" ? "YES" : "NO", //自动上架
                  showBankPage: this.ruleForm.yihangTip === "是" ? "YES" : "NO", // 显示银行过渡页
                  connectionMode: this.ruleForm.duijie, // 银行对接方式
                  connectionModeLabel: "", // 银行对接方式Label
                  H5Url: this.ruleForm.H5Url, //H5链接
                  sameProductFlag: this.ruleForm.chanpinbiaozhi, // 同一产品标识
                  realNameAuth: this.ruleForm.shiming === "是" ? "YES" : "NO",
                  signed: this.ruleForm.qianyue === "是" ? "YES" : "NO" // 是否签约
                },
                productTags: [] // 标签
              };
              let jigou_dq = xilieData.filter(
                item => item.institutionId === dingqiData.institutionId
              )[0];
              // 机构名称
              dingqiData.institutionName = jigou_dq.institutionName;
              // 产品系列名称
              dingqiData.seriesName = jigou_dq.seriesList.filter(
                item => item.id === dingqiData.seriesId
              )[0].name;
              // 支取时间Label
              dingqiData.withdrawalTimeLabel = dingqiData.withdrawalTime
                ? this.dictData.pay_time.filter(
                    item => item.value === dingqiData.withdrawalTime
                  )[0].label
                : "";
              // 收益返还方式Label
              dingqiData.incomeReturnWayLabel = dingqiData.incomeReturnWay
                ? this.dictData.income_return_way.filter(
                    item => item.value === dingqiData.incomeReturnWay
                  )[0].label
                : "";
              // 监管属性Label
              dingqiData.regulatoryPropertyLabel = dingqiData.regulatoryProperty
                ? this.dictData.regulatory_property.filter(
                    item => item.value === dingqiData.regulatoryProperty
                  )[0].label
                : "";
              // 付息频率Label
              dingqiData.frequencyTypeLabel = dingqiData.frequencyType
                ? this.dictData.frequency_type.filter(
                    item => item.value === dingqiData.frequencyType
                  )[0].label
                : "";
              // 榜单专区标识Label
              dingqiData.appInfo.listAreaFlagLabel = dingqiData.appInfo
                .listAreaFlag
                ? this.dictData.list_area_type.filter(
                    item => item.value === dingqiData.appInfo.listAreaFlag
                  )[0].label
                : "";
              // 银行合作方式Label
              dingqiData.appInfo.cooperationModeLabel = dingqiData.appInfo
                .cooperationMode
                ? this.dictData.cooperation_mode.filter(
                    item => item.value === dingqiData.appInfo.cooperationMode
                  )[0].label
                : "";
              // 银行对接方式Label
              dingqiData.appInfo.connectionModeLabel = dingqiData.appInfo
                .connectionMode
                ? this.dictData.connection_mode.filter(
                    item => item.value === dingqiData.appInfo.connectionMode
                  )[0].label
                : "";

              // 获取标签
              if (this.ruleForm.marks.length > 0) {
                this.dictData.marks.forEach(item => {
                  this.ruleForm.marks.forEach(tar => {
                    if (item.id === tar) {
                      dingqiData.productTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              if (this.addLilvTable.total != dingqiArr.length) {
                this.$confirm(
                  `利率列表里有些必填项没有数据，将不被保存，是否继续？`
                )
                  .then(_ => {
                    // 如果是编辑服务器返回的数据，需要携带 id和spuId
                    let idArr = this.serverData.interestRates.map(
                      item => item.id
                    );
                    dingqiData.interestRates = dingqiArr.map(item => {
                      if (idArr.some(tar => tar === item.id)) {
                        return {
                          id: item.id,
                          spuId: item.spuId,
                          deadline: +item.limit, // 期限
                          timeUnitType: item.danwei, // 单位
                          interestRate: +item.lilv, // 利率
                          lockinPeriod: +item.lockinPeriod, // 锁定期限
                          remark: item.beizhu, // 备注
                          showList: item.showList, // 榜单展示
                          lockinShowList: item.lockinShowList // 锁定期榜单展示
                        };
                      } else {
                        return {
                          deadline: +item.limit, // 期限
                          timeUnitType: item.danwei, // 单位
                          interestRate: +item.lilv, // 利率
                          lockinPeriod: +item.lockinPeriod, // 锁定期限
                          remark: item.beizhu, // 备注
                          showList: item.showList, // 榜单展示
                          lockinShowList: item.lockinShowList // 锁定期榜单展示
                        };
                      }
                    });
                    this.$api
                      .edit_DingQi({
                        vm: this,
                        data: dingqiData
                      })
                      .then(res => {
                        if (res.success) {
                          this.$message.success("修改成功");
                          this.toClosebianjieDialog();
                          this.$emit("toReGetData", this.forEmit);
                        }
                      });
                  })
                  .catch(() => {});
              } else {
                let idArr = this.serverData.interestRates.map(item => item.id);
                dingqiData.interestRates = dingqiArr.map(item => {
                  if (idArr.some(tar => tar === item.id)) {
                    return {
                      id: item.id,
                      spuId: item.spuId,
                      deadline: +item.limit, // 期限
                      timeUnitType: item.danwei, // 单位
                      interestRate: +item.lilv, // 利率
                      lockinPeriod: +item.lockinPeriod, // 锁定期限
                      remark: item.beizhu, // 备注
                      showList: item.showList, // 榜单展示
                      lockinShowList: item.lockinShowList // 锁定期榜单展示
                    };
                  } else {
                    return {
                      deadline: +item.limit, // 期限
                      timeUnitType: item.danwei, // 单位
                      interestRate: +item.lilv, // 利率
                      lockinPeriod: +item.lockinPeriod, // 锁定期限
                      remark: item.beizhu, // 备注
                      showList: item.showList, // 榜单展示
                      lockinShowList: item.lockinShowList // 锁定期榜单展示
                    };
                  }
                });
                this.$api
                  .edit_DingQi({
                    vm: this,
                    data: dingqiData
                  })
                  .then(res => {
                    if (res.success) {
                      this.$message.success("修改成功");
                      this.toClosebianjieDialog();
                      this.$emit("toReGetData", this.forEmit);
                    }
                  });
              }

              break;

            // 智能存款管理
            case "intelligent_deposit":
              let zhinengArr = [],
                zhinengData = {};
              // 检查利率列表是否必填项已经填写
              this.addLilvTable.dataTotal.forEach(item => {
                if (
                  item.limit &&
                  item.danwei &&
                  item.lilv &&
                  item.lockinPeriod
                ) {
                  zhinengArr.push(item);
                }
              });

              // 验证利率列表里的数据是否有负数

              for (let i = dingqiArr.length; i--; ) {
                let arr = Object.keys(dingqiArr[i]);
                for (let j = arr.length; j--; ) {
                  let value = dingqiArr[i][arr[j]];
                  if (typeof +value === "number" && value < 0) {
                    isCanPost = false;
                    this.$message.error("利率列表里存在为负数据，请更改！");
                    break;
                  }
                }
              }
              // 如果利率列表里存在为负的数据，则不进行下一步
              if (!isCanPost) {
                return;
              }

              zhinengData = {
                // 利率信息列表
                id: this.serverData.id,
                productId: this.serverData.productId, // 产品ID
                skuId: this.serverData.skuId,
                institutionId: this.ruleForm.jigou_name, // 机构ID
                institutionName: "", // 机构名称
                seriesId: this.ruleForm.xilie, // 产品系列ID
                seriesName: "", // 产品系列名称
                name: this.ruleForm.productcunkuan, // 产品名称
                minAmount: this.ruleForm.qicunjine, // 起购金额
                increaseAmount: this.ruleForm.dizeng, // 递增金额
                productSubtype: this.serverData.productSubtype, // 产品子类型
                productSubtypeLabel: this.serverData.productSubtypeLabel, // 产品子类型Label
                typeAlias: this.ruleForm.bieming, // 产品类型（类别别名）
                interestRateAlias: this.ruleForm.interestRateAlias, // 利率别名
                renewal: this.ruleForm.zhuancun === "是" ? "YES" : "NO", // 到期是否转存
                withdrawalTime: this.ruleForm.zhiqu, // 支取时间
                withdrawalTimeLabel: "", // 支取时间Label
                interestMode: this.ruleForm.jixi, // 计息方式
                interestModeLabel: "", //  计息方式Label
                description: this.ruleForm.chanpinmiaoshu, // 描述
                interestRates: [], // 利率列表
                appInfo: {
                  // 产品配置信息
                  id: this.serverData.appInfo.id, // 主键
                  productId: this.serverData.productId, // 产品id
                  shelve: this.ruleForm.shangjia === "是" ? "YES" : "NO", //是否上架
                  visaInterview: this.ruleForm.mianqian === "是" ? "YES" : "NO", // 是否面签
                  recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO", //是否推荐
                  homePage: this.ruleForm.paihang === "是" ? "YES" : "NO", //是否首页排序
                  listAreaFlag: this.ruleForm.zhuanqubiaozhi, // 榜单专区标识
                  listAreaFlagLabel: "", // 榜单专区标识Label
                  defaultBuyNum: this.ruleForm.goumaibishu, // 默认存款笔数
                  defaultAmount: this.ruleForm.goumaijine, // 默认存款金额
                  sameProductFlag: this.ruleForm.chanpinbiaozhi // 同一产品标识
                },
                productTags: [] // 标签
              };
              let jigou_zn = xilieData.filter(
                item => item.institutionId === zhinengData.institutionId
              )[0];
              // 机构名称
              zhinengData.institutionName = jigou_zn.institutionName;
              // 产品系列名称
              zhinengData.seriesName = jigou_zn.seriesList.filter(
                item => item.id === zhinengData.seriesId
              )[0].name;
              // 支取时间Label
              zhinengData.withdrawalTimeLabel = zhinengData.withdrawalTime
                ? this.dictData.pay_time.filter(
                    item => item.value === zhinengData.withdrawalTime
                  )[0].label
                : "";
              // 计息方式Label
              zhinengData.interestModeLabel = zhinengData.interestMode
                ? this.dictData.interest_mode.filter(
                    item => item.value === zhinengData.interestMode
                  )[0].label
                : "";
              // 榜单专区标识Label
              zhinengData.appInfo.listAreaFlagLabel = zhinengData.appInfo
                .listAreaFlag
                ? this.dictData.list_area_type.filter(
                    item => item.value === zhinengData.appInfo.listAreaFlag
                  )[0].label
                : "";
              // 获取标签
              if (this.ruleForm.marks.length > 0) {
                this.dictData.marks.forEach(item => {
                  this.ruleForm.marks.forEach(tar => {
                    if (item.id === tar) {
                      zhinengData.productTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }

              if (this.addLilvTable.total != zhinengArr.length) {
                this.$confirm(
                  `利率列表里有些必填项没有数据，将不被保存，是否继续？`
                )
                  .then(_ => {
                    // 如果是编辑服务器返回的数据，需要携带 id和spuId
                    let idArr = this.serverData.interestRates.map(
                      item => item.id
                    );
                    zhinengData.interestRates = zhinengArr.map(item => {
                      if (idArr.some(tar => tar === item.id)) {
                        return {
                          id: item.id,
                          spuId: item.spuId,
                          deadline: +item.limit, // 期限
                          timeUnitType: item.danwei, // 单位
                          interestRate: +item.lilv, // 利率
                          lockinPeriod: +item.lockinPeriod, // 锁定期限
                          remark: item.beizhu, // 备注
                          showList: item.showList, // 榜单展示
                          lockinShowList: item.lockinShowList // 锁定期榜单展示
                        };
                      } else {
                        return {
                          deadline: +item.limit, // 期限
                          timeUnitType: item.danwei, // 单位
                          interestRate: +item.lilv, // 利率
                          lockinPeriod: +item.lockinPeriod, // 锁定期限
                          remark: item.beizhu, // 备注
                          showList: item.showList, // 榜单展示
                          lockinShowList: item.lockinShowList // 锁定期榜单展示
                        };
                      }
                    });
                    this.$api
                      .edit_ZhiNeng({
                        vm: this,
                        data: zhinengData
                      })
                      .then(res => {
                        if (res.success) {
                          this.$message.success("修改成功");
                          this.toClosebianjieDialog();
                          this.$emit("toReGetData", this.forEmit);
                        }
                      });
                  })
                  .catch(() => {});
              } else {
                let idArr = this.serverData.interestRates.map(item => item.id);
                zhinengData.interestRates = zhinengArr.map(item => {
                  if (idArr.some(tar => tar === item.id)) {
                    return {
                      id: item.id,
                      spuId: item.spuId,
                      deadline: +item.limit, // 期限
                      timeUnitType: item.danwei, // 单位
                      interestRate: +item.lilv, // 利率
                      lockinPeriod: +item.lockinPeriod, // 锁定期限
                      remark: item.beizhu, // 备注
                      showList: item.showList, // 榜单展示
                      lockinShowList: item.lockinShowList // 锁定期榜单展示
                    };
                  } else {
                    return {
                      deadline: +item.limit, // 期限
                      timeUnitType: item.danwei, // 单位
                      interestRate: +item.lilv, // 利率
                      lockinPeriod: +item.lockinPeriod, // 锁定期限
                      remark: item.beizhu, // 备注
                      showList: item.showList, // 榜单展示
                      lockinShowList: item.lockinShowList // 锁定期榜单展示
                    };
                  }
                });
                this.$api
                  .edit_ZhiNeng({
                    vm: this,
                    data: zhinengData
                  })
                  .then(res => {
                    if (res.success) {
                      this.$message.success("修改成功");
                      this.toClosebianjieDialog();
                      this.$emit("toReGetData", this.forEmit);
                    }
                  });
              }
              break;
            // 结构存款管理
            case "structured_deposit":
              let jiegouData = {
                id: this.serverData.id,
                productId: this.serverData.productId, // 产品ID
                skuId: this.serverData.skuId,
                institutionId: this.ruleForm.jigou_name,
                institutionName: "",
                seriesId: this.ruleForm.xilie,
                seriesName: "",
                productSubtype: this.serverData.productSubtype,
                productSubtypeLabel: this.serverData.productSubtypeLabel,
                name: this.ruleForm.productcunkuan,
                typeAlias: this.ruleForm.bieming,
                minAmount: +this.ruleForm.qicunjine,
                increaseAmount: +this.ruleForm.dizeng,
                interestRateAlias: this.ruleForm.interestRateAlias,
                deadlineAlias: this.ruleForm.deadlineAlias,
                surplusQuota: this.ruleForm.shengyuED, // 剩余额度
                surplusQuotaLabel: "",
                riskLevel: this.ruleForm.fengxian, // 风险等级
                riskLevelLabel: "",
                regulatoryProperty: this.ruleForm.jianguan, // 监管属性
                regulatoryPropertyLabel: "",
                sellingDate: this.ruleForm.qishou,
                valueDate: this.ruleForm.qixi,
                description: this.ruleForm.chanpinmiaoshu,
                productTags: [],
                interest: {
                  id: this.serverData.interest.id,
                  spuId: this.serverData.interest.id,
                  deadline: +this.ruleForm.qixian,
                  interestRate: +this.ruleForm.lilv,
                  maxInterestRate: +this.ruleForm.maxLilv,
                  expireInterestRate: +this.ruleForm.daoqiLilv
                },
                appInfo: {
                  id: this.serverData.appInfo.id,
                  productId: this.serverData.productId, // 产品ID
                  shelve: this.ruleForm.shangjia === "是" ? "YES" : "NO",
                  visaInterview: this.ruleForm.mianqian === "是" ? "YES" : "NO",
                  recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO",
                  homePage: this.ruleForm.paihang === "是" ? "YES" : "NO",
                  defaultBuyNum: +this.ruleForm.goumaibishu,
                  defaultAmount: +this.ruleForm.goumaijine,
                  listAreaFlag: this.ruleForm.zhuanqubiaozhi,
                  listAreaFlagLabel: "",
                  sameProductFlag: this.ruleForm.chanpinbiaozhi
                }
              };
              // 机构名
              xilieData.forEach(item => {
                if (item.institutionId === this.ruleForm.jigou_name) {
                  jiegouData.institutionName = item.institutionName;
                }
              });
              // 系列名
              this.xilie.forEach(item => {
                if (item.id === this.ruleForm.xilie) {
                  jiegouData.seriesName = item.name;
                }
              });
              // 剩余额度Label
              this.dictData.surplus_quota.forEach(item => {
                if (item.value === this.ruleForm.shengyuED) {
                  jiegouData.surplusQuotaLabel = item.label;
                }
              });
              // 风险等级Label
              this.dictData.risk_level.forEach(item => {
                if (item.value === this.ruleForm.fengxian) {
                  jiegouData.riskLevelLabel = item.label;
                }
              });

              // 监管属性Label
              this.dictData.regulatory_property.forEach(item => {
                if (item.value === this.ruleForm.jianguan) {
                  jiegouData.regulatoryPropertyLabel = item.label;
                }
              });
              // 专区标识Label
              this.dictData.list_area_type.forEach(item => {
                if (item.value === this.ruleForm.zhuanqubiaozhi) {
                  jiegouData.appInfo.listAreaFlagLabel = item.label;
                }
              });

              // 获取标签
              if (this.ruleForm.marks.length > 0) {
                this.dictData.marks.forEach(item => {
                  this.ruleForm.marks.forEach(tar => {
                    if (item.id === tar) {
                      jiegouData.productTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              this.$api
                .edit_JieGou({
                  vm: this,
                  data: jiegouData
                })
                .then(res => {
                  if (res.success) {
                    this.$message.success("修改成功");
                    this.toClosebianjieDialog();
                    this.$emit("toReGetData", this.forEmit);
                  }
                });
              break;
          }
        } else {
          this.$message.error("请确保输入的数据正确！");
        }
      });
    },

    /****************************************************************************************/
    // 控制当前页面显示哪些
    isToShow(name) {
      return this.show.some(item => item === name);
    },
    // 用来判断点击编辑时当前页需要显示的表单项
    isToShow1(name) {
      return this.show1.some(item => item === name);
    },
    // 表单的验证
    isError(name) {
      return this.needValid.some(item => item === name);
    },
    // 撤销必填项未填的错误提示
    hiddenBorder(name) {
      let value = this.ruleForm[name];
      if (value !== "") {
        // 减少页面需要验证的项
        this.copyError = this.copyError.filter(item => item != name);
        if (this.hasClick) {
          this.needValid = this.copyError;
        }
      } else {
        this.$message.error("请正确填写必要数据!");
      }
    },
    toJiGou() {
      sessionStorage.setItem("page", "机构管理");
      this.$router.push({
        name: "organizational_mainPage"
      });
    },
    toJiJin() {
      sessionStorage.setItem("page", "基金公司管理");
      this.$router.push({
        name: "fund_company_mainPage"
      });
    },
    // 关闭弹框
    toClosebianjieDialog() {
      this.bianjieDialog = false;
      this.copyError = this.pageError;
      this.hasClick = false;
      this.needValid = [];
      this.ruleForm = {
        chanpinIds: "", // 产品id
        // 纯债编辑按钮弹出框
        product: "", // 产品名称
        daima: "", // 基金代码
        jigou_name: "", // 机构名称
        gongsi: "", // 基金公司
        jiaoyizhuangtai: "", // 交易状态
        rizhangfu: "", // 日涨幅
        shangjia: "", // 是否上架
        mianqian: "", // 是否面签
        tuijian: "", // 是否推荐
        paihang: "", // 是否首页排行
        goumaibishu: "", // 默认购买笔数
        goumaijine: "", // 默认购买金额
        qigou: "", // 起购金额
        shuhui: "", // 到帐赎回日
        suoding: "", // 锁定期
        mairu: "", // 买入
        shouxufei: "", // 手续费用
        chanpinmiaoshu: "", // 产品描述
        shouyiguize: "", // 收益规则
        chanpinbiaozhi: "", // 同一产品标识
        guanzhuNum: "", // 默认关注数量
        zhuanqubiaozhi: "", // 榜单专区标识
        xilie: "", // 产品系列
        productjijin: "", // 基金产品名称
        dizeng: "", // 递增金额
        yuqinianhua: "", // 预期年化收益率
        fengxian: "", // 风险等级
        shengyuED: "", // 剩余额度
        qixiri: "", // 起息日
        qixian: "", // 期限
        licairiqi: "", // 理财日期
        muji: "", // 募集日期
        jianguan: "", // 监管属性
        productcunkuan: "", // 存款产品名称
        bieming: "", // 产品类型(别名)
        lilv: "", // 利率
        interestRateAlias: "", // 利率别名
        deadlineAlias: "", // 期限别名
        qicunjine: "", // 起存金额
        marks: "", // 标签
        quyu: "", // 产品区域
        fanhuan: "", // 收益返还方式
        zhuancun: "", // 到期是否转存
        fuxipinlv: "", // 付息频率
        shiming: "", // 是否实名
        qianyue: "", // 是否签约
        shoufeilv: "", // 年收费率(%)
        H5Url: "", // 产品H5链接
        yihangTip: "", // 显示银行过渡页
        duijie: "", // 银行对接方式
        hezuo: "", // 银行合作方式
        autoUpDown: "" // 自动上架
      };
      this.addLilvTable = {
        pageNum: 0,
        total: 0,
        title: [
          "序号",
          "* 期限",
          "* 期限单位",
          "* 利率%",
          "* 锁定期限",
          "备注",
          "榜单展示",
          "锁定期榜单展示",
          "操作"
        ],
        dataTotal: [], //
        datas: [] // 用来进行分页展示时的当前展示数据
      };
      this.$refs["ruleForm"].resetFields();
    }
  }
};
</script>
<style>
@import url("./allCss.scss");
</style>
