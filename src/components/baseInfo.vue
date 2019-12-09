<template>
  <div id="baseWaper">
    <div class="baseHeaderButton">
      <p>{{pageInfos.title}}</p>
      <div>
        <el-button size="mini" @click="toEdit" id="isEditButton">编辑</el-button>
        <el-button size="mini" @click="toDelete">删除</el-button>
      </div>
    </div>

    <div class="isContentWaper">
      <div class="isContentLong">
        <span class="isTitle">机构：</span>
        <p>
          <img style="width:40px" :src="this.$ImgBaseUrl+ pageInfos.logo" />
          <br />
          <a
            class="isLink"
            style="font-size:14px;"
            @click="toJiGou"
            title="点击查看"
          >{{pageInfos.institutionName?pageInfos.institutionName:'无'}}</a>
        </p>
      </div>

      <div class="isContentLong" v-if="isToShow('jijingongsi')" style="line-height:28px;">
        <span class="isTitle">基金公司：</span>
        <p>
          <a
            class="isLink"
            @click="toJiJin"
            title="点击查看"
          >{{pageInfos.jijingongsi?pageInfos.jijingongsi:'无'}}</a>
        </p>
      </div>

      <div class="isContentLong" v-if="isToShow('xilie')">
        <span class="isTitleLong">产品系列：</span>
        <p>{{pageInfos.xilie?pageInfos.xilie:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('productHome')">
        <span class="isTitleLong">产品公司名称：</span>
        <p>{{pageInfos.productHome?pageInfos.productHome:'无'}}</p>
      </div>
    </div>

    <div class="isContentWaper">
      <div class="isContent" v-if="isToShow('daima')">
        <span class="isTitleLong">基金代码：</span>
        <p>{{pageInfos.daima?pageInfos.daima:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('rizhangfu')">
        <span style="width:80px;">日涨幅：</span>
        <p style="color:red;">{{pageInfos.rizhangfu?pageInfos.rizhangfu+'%':'无'}}</p>
      </div>
    </div>

    <div class="isContentWaper">
      <div class="isContent" v-if="isToShow('jiaoyizhuangtai')">
        <span class="isTitleLong">交易状态：</span>
        <p>{{pageInfos.jiaoyizhuangtai?pageInfos.jiaoyizhuangtai:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('yuqishouyi')">
        <span class="isTitleLong">预期年化收益率：</span>
        <p>{{pageInfos.yuqishouyi?pageInfos.yuqishouyi+'%':'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('contentVersion')">
        <span class="isTitleLong">产品版本标识：</span>
        <p>{{pageInfos.contentVersion?pageInfos.contentVersion:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('productFeature')">
        <span class="isTitleLong">产品特性：</span>
        <p>{{pageInfos.productFeature?pageInfos.productFeature:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('chanpinquyu')">
        <span class="isTitleLong">产品区域：</span>
        <p>{{pageInfos.chanpinquyu?pageInfos.chanpinquyu:'无'}}</p>
      </div>
    </div>

    <div class="isContentWaper">
      <div class="isContent" v-if="isToShow('qigou')">
        <span class="isTitleLong">起购金额：</span>
        <p>{{pageInfos.qigou?pageInfos.qigou+'元':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('qicunjine')">
        <span class="isTitleLong">起存金额：</span>
        <p>{{pageInfos.qicunjine?pageInfos.qicunjine+'元':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('dizeng')">
        <span class="isTitleLong">递增金额：</span>
        <p>{{pageInfos.dizeng?pageInfos.dizeng+'元':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('zhiqu')">
        <span class="isTitleLong">支取时间：</span>
        <p>{{pageInfos.zhiqu?pageInfos.zhiqu:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('suoding')">
        <span class="isTitleLong">锁定期：</span>
        <p>{{pageInfos.suoding?pageInfos.suoding+'天':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('shuhui')">
        <span class="isTitleLong">赎回到帐日：</span>
        <p>{{pageInfos.shuhui?pageInfos.shuhui:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('shouxufei')">
        <span class="isTitleLong">手续费用：</span>
        <p>{{pageInfos.shouxufei?pageInfos.shouxufei:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('qixian')">
        <span class="isTitleLong">投资期限：</span>
        <p>{{pageInfos.qixian?pageInfos.qixian+'天':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('deadlineAlias')">
        <span class="isTitleLong">期限别名：</span>
        <p>{{pageInfos.deadlineAlias?pageInfos.deadlineAlias:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('qici')">
        <span class="isTitleLong">期次：</span>
        <p>{{pageInfos.qici?pageInfos.qici:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('shouyiType')">
        <span class="isTitleLong">收益类型：</span>
        <p>{{pageInfos.shouyiType?pageInfos.shouyiType:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('minShuHui')">
        <span class="isTitleLong">最小赎回金额：</span>
        <p>{{pageInfos.minShuHui?pageInfos.minShuHui+'元':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('maxShuHui')">
        <span class="isTitleLong">最大赎回金额：</span>
        <p>{{pageInfos.maxShuHui?pageInfos.maxShuHui+'元':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('dayShuHui')">
        <span class="isTitleLong">单日最大赎回金额：</span>
        <p>{{pageInfos.dayShuHui?pageInfos.dayShuHui+'元':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('eduBi')">
        <span class="isTitleLong">剩余额度百分比：</span>
        <p>{{pageInfos.eduBi?pageInfos.eduBi+'%':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('qujianMax')">
        <span class="isTitleLong">收益率区间最大值：</span>
        <p>{{pageInfos.qujianMax?pageInfos.qujianMax+"%":'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('jixiBase')">
        <span class="isTitleLong">计息基础：</span>
        <p>{{pageInfos.jixiBase?pageInfos.jixiBase:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('qingsuan')">
        <span class="isTitleLong">产品结算日：</span>
        <p>{{pageInfos.qingsuan?pageInfos.qingsuan:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('canShenGou')">
        <span class="isTitleLong">是否可以申购：</span>
        <p>{{pageInfos.canShenGou?pageInfos.canShenGou:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('canShuHui')">
        <span class="isTitleLong">是否可以赎回：</span>
        <p>{{pageInfos.canShuHui?pageInfos.canShuHui:'无'}}</p>
      </div>
      <div class="isContent" v-if="isToShow('canZhuanrang')">
        <span class="isTitleLong">是否可转让:</span>
        <p>{{pageInfos.canZhuanrang?pageInfos.canZhuanrang:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('netAssetValue')">
        <span class="isTitleLong">单位净值：</span>
        <p>{{pageInfos.netAssetValue?pageInfos.netAssetValue:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('netAccumulateValue')">
        <span class="isTitleLong">累计净值：</span>
        <p>{{pageInfos.netAccumulateValue?pageInfos.netAccumulateValue:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('bottomGuardYield')">
        <span class="isTitleLong">保底收益率：</span>
        <p>{{pageInfos.bottomGuardYield?pageInfos.bottomGuardYield+'%':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('onThe7thOfTheYearYield')">
        <span class="isTitleLong">七日年化收益率：</span>
        <p>{{pageInfos.onThe7thOfTheYearYield?pageInfos.onThe7thOfTheYearYield+'%':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('thousandsOfYearsYields')">
        <span class="isTitleLong">万份年化收益：</span>
        <p>{{pageInfos.thousandsOfYearsYields?pageInfos.thousandsOfYearsYields:'无'}}</p>
      </div>

      <div class="isContent" v-if="isToShow('qishou')">
        <span class="isTitleLong">起售日期：</span>
        <p>{{pageInfos.qishou?pageInfos.qishou:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('jiezhi')">
        <span class="isTitleLong">截止日期：</span>
        <p>{{pageInfos.jiezhi?pageInfos.jiezhi:'无'}}</p>
      </div>

      <div class="isContent" v-if="isToShow('qixi')">
        <span class="isTitleLong">起息日：</span>
        <p>{{pageInfos.qixi?pageInfos.qixi:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('jiexi')">
        <span class="isTitleLong">结息日：</span>
        <p>{{pageInfos.jiexi?pageInfos.jiexi:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('leibie')">
        <span class="isTitleLong">类别别名：</span>
        <p>{{pageInfos.leibie?pageInfos.leibie:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('leixing')">
        <span class="isTitleLong">产品类型：</span>
        <p>{{pageInfos.leixing?pageInfos.leixing:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('lilv')">
        <span class="isTitleLong">利率：</span>
        <p>{{pageInfos.lilv?pageInfos.lilv+'%':'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('interestRateAlias')">
        <span class="isTitleLong">利率别名：</span>
        <p>{{pageInfos.interestRateAlias?pageInfos.interestRateAlias:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('maxLilv')">
        <span class="isTitleLong">最高利率：</span>
        <p>{{pageInfos.maxLilv?pageInfos.maxLilv+'%':'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('daoqiLilv')">
        <span class="isTitleLong">到期利率：</span>
        <p>{{pageInfos.daoqiLilv?pageInfos.daoqiLilv+'%':'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('shoufeilv')">
        <span class="isTitleLong">年收费率：</span>
        <p>{{pageInfos.shoufeilv?pageInfos.shoufeilv+'%':'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('shengyuED')">
        <span class="isTitleLong">剩余额度：</span>
        <p>{{pageInfos.shengyuED?pageInfos.shengyuED:'无'}}</p>
      </div>
      <div class="isContentLong" v-if="isToShow('jixi')">
        <span class="isTitleLong">计息方式：</span>
        <p>{{pageInfos.jixi?pageInfos.jixi:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('fengxian')">
        <span class="isTitleLong">风险等级：</span>
        <p>{{pageInfos.fengxian?pageInfos.fengxian:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('fanhuan')">
        <span class="isTitleLong">收益返还方式：</span>
        <p>{{pageInfos.fanhuan?pageInfos.fanhuan:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('bizhong')">
        <span class="isTitleLong">币种：</span>
        <p>{{pageInfos.bizhong?pageInfos.bizhong:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('zhuancun')">
        <span class="isTitleLong">到期是否转存：</span>
        <p>{{pageInfos.zhuancun?pageInfos.zhuancun:'无'}}</p>
      </div>

      <div class="isContent" v-if="isToShow('mairu')">
        <span class="isTitleLong">买入:</span>
        <p>{{pageInfos.mairu?pageInfos.mairu:'无'}}</p>
      </div>

      <div class="isContent" v-if="isToShow('jisuan_day')">
        <span class="isTitleLong">利息计算天数:</span>
        <p>{{pageInfos.jisuan_day?pageInfos.jisuan_day+'天':'无'}}</p>
      </div>
      <div class="isContent" v-if="isToShow('faxing_start')">
        <span class="isTitleLong">发行开始时间:</span>
        <p>{{pageInfos.faxing_start?pageInfos.faxing_start:'无'}}</p>
      </div>
      <div class="isContent" v-if="isToShow('faxing_end')">
        <span class="isTitleLong">发行结束时间:</span>
        <p>{{pageInfos.faxing_end?pageInfos.faxing_end:'无'}}</p>
      </div>
      <div class="isContent" v-if="isToShow('faxing_num')">
        <span class="isTitleLong">发行量:</span>
        <p>{{pageInfos.faxing_num?pageInfos.faxing_num:'无'}}</p>
      </div>

      <div class="isContent" style="width:100%;" v-if="isToShow('zhesuan')">
        <span class="isTitleLong">买方折算年化利率:</span>
        <p>{{pageInfos.zhesuan?pageInfos.zhesuan:'无'}}</p>
      </div>
    </div>

    <div class="isContentWaper" v-if="isToShow('biaoqian')">
      <div class="isContentLong" style="width:100%;">
        <span class="isTitleLong">标签：</span>
        <p>
          <span
            :style="makeStyle()"
            class="withColor"
            v-for="(item,index) in pageInfos.biaoqian"
            :key="index"
          >{{item.name}} &nbsp;</span>
        </p>
      </div>
    </div>

    <div class="isContentLong" v-if="isToShow('shouyiguize')">
      <span class="isTitleLong" @click="toShowMore(1)" title="点击查看全部内容" style="cursor: pointer">
        收益规则:
        <br />
        <p v-if="toShowMoreNum!==1" style="font-size:12px;color:#aaabac;">内容已被截取</p>
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        v-if="pageInfos.shouyiguize"
        :class="toShowMoreNum===1?'isShowContent':'isHidden'"
        v-html="pageInfos.shouyiguize"
      ></p>
      <p v-if="!pageInfos.shouyiguize" v-html="'无'" style="text-aling:left"></p>
    </div>

    <div class="isContentLong" v-if="isToShow('cunru')">
      <span class="isTitleLong" @click="toShowMore(7)" title="点击查看全部内容" style="cursor: pointer">
        存入规则:
        <br />
        <p v-if="toShowMoreNum!==7" style="font-size:12px;color:#aaabac;">内容已被截取</p>
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        v-if="pageInfos.cunru"
        :class="toShowMoreNum===7?'isShowContent':'isHidden'"
        v-html="pageInfos.cunru"
      ></p>
      <p v-if="!pageInfos.cunru" v-html="'无'" style="text-aling:left"></p>
    </div>

    <div class="isContentLong" v-if="isToShow('zhuanchu')">
      <span class="isTitleLong" @click="toShowMore(9)" title="点击查看全部内容" style="cursor: pointer">
        转出规则:
        <br />
        <p v-if="toShowMoreNum!==9" style="font-size:12px;color:#aaabac;">内容已被截取</p>
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        v-if="pageInfos.zhuanchu"
        :class="toShowMoreNum===9?'isShowContent':'isHidden'"
        v-html="pageInfos.zhuanchu"
      ></p>
      <p v-if="!pageInfos.zhuanchu" v-html="'无'" style="text-aling:left"></p>
    </div>

    <div class="isContentLong" v-if="isToShow('zhiquRule')">
      <span class="isTitleLong" @click="toShowMore(10)" title="点击查看全部内容" style="cursor: pointer">
        支取规则:
        <br />
        <p v-if="toShowMoreNum!==10" style="font-size:12px;color:#aaabac;">内容已被截取</p>
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        v-if="pageInfos.zhiquRule"
        :class="toShowMoreNum===10?'isShowContent':'isHidden'"
        v-html="pageInfos.zhiquRule"
      ></p>
      <p v-if="!pageInfos.zhiquRule" v-html="'无'" style="text-aling:left"></p>
    </div>

    <div class="isContentLong" v-if="isToShow('chanpinmiaoshu')">
      <span class="isTitleLong" @click="toShowMore(2)" title="点击查看全部内容" style="cursor: pointer">
        产品描述:
        <br />
        <p v-if="toShowMoreNum!==2" style="font-size:12px;color:#aaabac;">内容已被截取</p>
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        v-if="pageInfos.chanpinmiaoshu"
        :class="toShowMoreNum===2?'isShowContent':'isHidden'"
        v-html="pageInfos.chanpinmiaoshu"
      ></p>
      <p v-if="!pageInfos.chanpinmiaoshu" v-html="'无'" style="text-aling:left"></p>
    </div>

    <div class="isContentLong" v-if="isToShow('newPlayer')">
      <span class="isTitleLong" @click="toShowMore(4)" title="点击查看全部内容" style="cursor: pointer">
        新手专享推荐理由:
        <br />
        <p v-if="toShowMoreNum!==4" style="font-size:12px;color:#aaabac;">内容已被截取</p>
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        v-if="pageInfos.newPlayer"
        :class="toShowMoreNum===4?'isShowContent':'isHidden'"
        v-html="pageInfos.newPlayer"
      ></p>
      <p v-if="!pageInfos.newPlayer" v-html="'无'" style="text-aling:left"></p>
    </div>

    <div class="isContentLong" v-if="isToShow('pintuan')">
      <span class="isTitleLong" @click="toShowMore(5)" title="点击查看全部内容" style="cursor: pointer">
        拼团推荐理由:
        <br />
        <p v-if="toShowMoreNum!==5" style="font-size:12px;color:#aaabac;">内容已被截取</p>
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        v-if="pageInfos.pintuan"
        :class="toShowMoreNum===5?'isShowContent':'isHidden'"
        v-html="pageInfos.pintuan"
      ></p>
      <p v-if="!pageInfos.pintuan" v-html="'无'" style="text-aling:left"></p>
    </div>

    <div class="isContentLong" v-if="isToShow('productTuiJian')">
      <span class="isTitleLong" @click="toShowMore(6)" title="点击查看全部内容" style="cursor: pointer">
        产品推荐理由:
        <br />
        <p v-if="toShowMoreNum!==6" style="font-size:12px;color:#aaabac;">内容已被截取</p>
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        v-if="pageInfos.productTuiJian"
        :class="toShowMoreNum===6?'isShowContent':'isHidden'"
        v-html="pageInfos.productTuiJian"
      ></p>
      <p v-if="!pageInfos.productTuiJian" v-html="'无'" style="text-aling:left"></p>
    </div>

    <div class="isContentLong" v-if="isToShow('qicunfanwei')">
      <span class="isTitleLong" @click="toShowMore(3)" title="点击查看全部内容" style="cursor: pointer">
        起存范围说明:
        <br />
        <p v-if="toShowMoreNum!==3" style="font-size:12px;color:#aaabac;">内容已被截取</p>
        <span style="font-size:12px;color:#aaabac;">(可点击)</span>
      </span>
      <p
        v-if="pageInfos.qicunfanwei"
        :class="toShowMoreNum===3?'isShowContent':'isHidden'"
        v-html="pageInfos.qicunfanwei"
      ></p>
      <p v-if="!pageInfos.qicunfanwei" v-html="'无'" style="text-aling:left"></p>
    </div>

    <div class="isContent" v-if="isToShow('miaoshu')">
      <span class="isTitleLong" @click="toShowMore(1)" title="点击查看全部内容" style="cursor: pointer;">
        {{this.pageData.page === "organizational"?'银行描述':'公司描述'}}
        :&nbsp;
        <span
          style="font-size:12px;color:#aaabac;"
        >(可点击)</span>
      </span>
      <p
        v-if="pageInfos.miaoshu"
        :class="toShowMoreNum===1?'isShowContent':'isHidden'"
      >{{pageInfos.miaoshu}}</p>
      <p v-if="!pageInfos.miaoshu" v-html="'无'" style="text-aling:left"></p>
    </div>

    <div class="isContentWaper">
      <div class="isContentLong" v-if="isToShow('shangjia')">
        <span class="isTitleLong">上架状态：</span>
        <p>{{pageInfos.shangjia?pageInfos.shangjia:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('jianguan')">
        <span class="isTitleLong">监管属性：</span>
        <p>{{pageInfos.jianguan?pageInfos.jianguan:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('guanzhuNum')">
        <span class="isTitleLong">默认关注数量：</span>
        <p>{{pageInfos.guanzhuNum?pageInfos.guanzhuNum:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('mianqian')">
        <span class="isTitleLong">是否面签：</span>
        <p>{{pageInfos.mianqian?pageInfos.mianqian:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('shiming')">
        <span class="isTitleLong">是否实名认证：</span>
        <p>{{pageInfos.shiming?pageInfos.shiming:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('yinhangpage')">
        <span class="isTitleLong">显示银行提示页：</span>
        <p>{{pageInfos.yinhangpage?pageInfos.yinhangpage:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('qianyue')">
        <span class="isTitleLong">是否签约：</span>
        <p>{{pageInfos.qianyue?pageInfos.qianyue:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('hezuoType')">
        <span class="isTitleLong">合作方式：</span>
        <p>{{pageInfos.hezuoType?pageInfos.hezuoType:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('autoUpDown')">
        <span class="isTitleLong">自动上下架：</span>
        <p>{{pageInfos.autoUpDown?pageInfos.autoUpDown:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('duijie')">
        <span class="isTitleLong">银行对接方式：</span>
        <p>{{pageInfos.duijie?pageInfos.duijie:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('tuijian')">
        <span class="isTitleLong">是否推荐：</span>
        <p>{{pageInfos.tuijian?pageInfos.tuijian:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('paihang')">
        <span class="isTitleLong">是否首页排行：</span>
        <p>{{pageInfos.paihang?pageInfos.paihang:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('cunkuanbishu')">
        <span class="isTitleLong">默认存款笔数：</span>
        <p>{{pageInfos.cunkuanbishu?pageInfos.cunkuanbishu+'笔':'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('cunkuanmorenjine')">
        <span class="isTitleLong">默认存款金额：</span>
        <p>{{pageInfos.cunkuanmorenjine?pageInfos.cunkuanmorenjine+'元':'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('goumaibishu')">
        <span class="isTitleLong">默认购买笔数：</span>
        <p>{{pageInfos.goumaibishu?pageInfos.goumaibishu+'笔':'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('goumaimorenjine')">
        <span class="isTitleLong">默认购买金额:</span>
        <p>{{pageInfos.goumaimorenjine?pageInfos.goumaimorenjine+'元':'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('chanpinbiaozhi')">
        <span class="isTitleLong">同一产品标识：</span>
        <p>{{pageInfos.chanpinbiaozhi?pageInfos.chanpinbiaozhi:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('zhuanqubiaozhi')">
        <span class="isTitleLong">榜单专区标识：</span>
        <p>{{pageInfos.zhuanqubiaozhi?pageInfos.zhuanqubiaozhi:'无'}}</p>
      </div>

      <div class="isContentLong" v-if="isToShow('fuxipinlv')">
        <span class="isTitleLong">付息频率：</span>
        <p>{{pageInfos.fuxipinlv?pageInfos.fuxipinlv:'无'}}</p>
      </div>
      <div></div>

      <div class="forH5" v-if="isToShow('h5Url')">
        <span class="isTitleLong">H5链接：</span>
        <p>{{pageInfos.h5Url?pageInfos.h5Url:'无'}}</p>
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
    <!-- 编辑弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="编辑"
      :visible.sync="bianjieDialog"
      width="900px"
      :before-close="toClosebianjieDialog"
    >
      <el-form
        v-if="ruleForm"
        :inline="true"
        size="mini"
        :model="ruleForm"
        label-width="130px"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="产品名称:" class="is50" v-if="isToedit('product')" prop="product">
          <el-input clearable placeholder="请输入" v-model="ruleForm.product"></el-input>
        </el-form-item>

        <el-form-item label="基金代码:" class="is50" v-if="isToedit('daima')" prop="daima">
          <el-input clearable placeholder="请输入" v-model="ruleForm.daima" type="number"></el-input>
        </el-form-item>

        <el-form-item prop="jigou_name" label="机构:" class="is50" v-if="isToedit('jigou_name')">
          <el-select
            filterable
            clearable
            placeholder="请输入"
            v-model="ruleForm.jigou_name"
            @change="change_xilie(ruleForm.jigou_name)"
          >
            <el-option
              size="mini"
              v-for="item in dictData.jigou"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品系列:" class="is50" v-if="isToedit('xilie')">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.xilie">
            <el-option
              size="mini"
              v-for="item in xilie"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="基金产品名称:"
          class="is50"
          v-if="isToedit('productjijin')"
          prop="productjijin"
        >
          <el-input clearable placeholder="请输入" v-model="ruleForm.productjijin"></el-input>
        </el-form-item>

        <el-form-item
          label="产品公司名称:"
          class="is50"
          v-if="isToedit('productHome')"
          prop="productHome"
        >
          <el-input clearable placeholder="请输入" v-model="ruleForm.productHome"></el-input>
        </el-form-item>

        <el-form-item
          label="存款产品名称:"
          class="is50"
          v-if="isToedit('productcunkuan')"
          prop="productcunkuan"
        >
          <el-input clearable placeholder="请输入" v-model="ruleForm.productcunkuan"></el-input>
        </el-form-item>

        <el-form-item label="产品区域:" class="is50" v-if="isToedit('chanpinquyu')" prop="chanpinquyu">
          <el-select filterable clearable placeholder="请输入" v-model="ruleForm.chanpinquyu">
            <el-option
              size="mini"
              v-for="item in dictData.quyu"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="收益返还方式:" class="is50" v-if="isToedit('fanhuan')">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.fanhuan">
            <el-option
              size="mini"
              v-for="item in dictData.income_return_way"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="默认关注数量:" class="is50" v-if="isToedit('guanzhuNum')" prop="guanzhuNum">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.guanzhuNum"></el-input>
        </el-form-item>

        <el-form-item
          label="付息频率:"
          style="position:relative"
          class="is50"
          v-if="isToedit('fuxipinlv')"
        >
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.fuxipinlv">
            <el-option
              size="mini"
              v-for="item in dictData.frequency_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品类别别名:" class="is50" v-if="isToedit('bieming')" prop="bieming">
          <el-input clearable placeholder="请输入" v-model="ruleForm.bieming"></el-input>
        </el-form-item>

        <el-form-item label="计息方式" class="is50" v-if="isToedit('jixi')" prop="jixi">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.jixi">
            <el-option
              size="mini"
              v-for="item in dictData.interest_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品特性" class="is50" v-if="isToedit('productFeature')">
          <el-select
            filterable
            class="isInput"
            clearable
            placeholder="请选择"
            v-model="ruleForm.productFeature"
          >
            <el-option
              size="mini"
              v-for="item in dictData.product_feature_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="产品版本标识:"
          class="is50"
          v-if="isToedit('contentVersion')"
          prop="contentVersion"
        >
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.contentVersion"></el-input>
        </el-form-item>

        <el-form-item
          label="利率:"
          class="is50"
          v-if="isToedit('lilv')"
          style="position:relative;"
          prop="lilv"
        >
          <el-input
            type="number"
            style="width:calc(100% - 25px);"
            clearable
            placeholder="请输入"
            v-model="ruleForm.lilv"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          label="利率别名:"
          class="is50"
          v-if="isToedit('interestRateAlias')"
          prop="interestRateAlias"
        >
          <el-input clearable placeholder="请输入" v-model="ruleForm.interestRateAlias"></el-input>
        </el-form-item>

        <el-form-item
          label="最高利率:"
          class="is50"
          v-if="isToedit('maxLilv')"
          style="position:relative;"
          prop="maxLilv"
        >
          <el-input
            type="number"
            style="width:calc(100% - 25px);"
            clearable
            placeholder="请输入"
            v-model="ruleForm.maxLilv"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          label="到期利率:"
          class="is50"
          v-if="isToedit('daoqiLilv')"
          style="position:relative;"
          prop="daoqiLilv"
        >
          <el-input
            type="number"
            style="width:calc(100% - 25px);"
            clearable
            placeholder="请输入"
            v-model="ruleForm.daoqiLilv"
          ></el-input>
          <span class="isAd"></span>
        </el-form-item>

        <el-form-item
          v-if="isToedit('biaoqian')&&'actBiaoQian' in ruleForm"
          label="活动标签:"
          class="is50"
        >
          <el-select filterable multiple v-model="ruleForm.actBiaoQian" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.activityTags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="isToedit('biaoqian')&&'selfBiaoQian' in ruleForm"
          label="自定义标签:"
          class="is50"
        >
          <el-select
            filterable
            multiple
            v-model="ruleForm.selfBiaoQian"
            clearable
            placeholder="请选择"
          >
            <el-option
              size="mini"
              v-for="item in dictData.selfDefiningTags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="'chanpinBiaoQian' in ruleForm && isToedit('biaoqian')"
          label="产品标签:"
          class="is50"
        >
          <el-select
            filterable
            multiple
            v-model="ruleForm.chanpinBiaoQian"
            clearable
            placeholder="请选择"
          >
            <el-option
              size="mini"
              v-for="item in dictData.productTags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="zhiqu" v-show="isToedit('zhiqu')" label="支取时间:" class="is50">
          <el-select filterable v-model="ruleForm.zhiqu" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.pay_time"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="起存金额:" class="is50" v-if="isToedit('qicunjine')" prop="qicunjine">
          <el-input clearable placeholder="请输入" v-model="ruleForm.qicunjine"></el-input>
        </el-form-item>

        <el-form-item label="起购金额:" class="is50" v-if="isToedit('qigou')" prop="qigou">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.qigou"></el-input>
        </el-form-item>

        <el-form-item prop="dizeng" label="递增金额:" class="is50" v-if="isToedit('dizeng')">
          <el-input clearable placeholder="请输入" type="number" v-model="ruleForm.dizeng"></el-input>
        </el-form-item>

        <el-form-item label="预期年化收益率:" class="is50" v-if="isToedit('yuqishouyi')" prop="yuqishouyi">
          <el-input clearable placeholder="请输入" type="number" v-model="ruleForm.yuqishouyi"></el-input>
        </el-form-item>

        <el-form-item v-show="isToedit('fengxian')" label="风险等级:" class="is50" prop="fengxian">
          <el-select filterable v-model="ruleForm.fengxian" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.risk_level"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-show="isToedit('shengyuED')" label="剩余额度:" class="is50" prop="shengyuED">
          <el-select filterable v-model="ruleForm.shengyuED" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in dictData.surplus_quota"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="利息计算天数:" class="is50" v-if="isToedit('jisuan_day')" prop="jisuan_day">
          <el-input clearable type="number" placeholder="请输入" v-model="ruleForm.jisuan_day"></el-input>
        </el-form-item>

        <el-form-item
          label="发行开始时间:"
          class="is50"
          v-if="isToedit('faxing_start')"
          prop="faxing_start"
        >
          <el-date-picker
            type="datetime"
            v-model="ruleForm.faxing_start"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="发行结束时间:" class="is50" v-if="isToedit('faxing_end')" prop="faxing_end">
          <el-date-picker
            type="datetime"
            v-model="ruleForm.faxing_end"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="发行量:" class="is50" v-if="isToedit('faxing_num')" prop="faxing_num">
          <el-input clearable type="number" placeholder="请输入" v-model="ruleForm.faxing_num"></el-input>
        </el-form-item>

        <el-form-item label="起息日:" class="is50" v-if="isToedit('qixiri')" prop="qixiri">
          <el-date-picker
            type="datetime"
            v-model="ruleForm.qixiri"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="到期日:" class="is50" v-if="isToedit('daoqiri')" prop="daoqiri">
          <el-date-picker
            type="datetime"
            v-model="ruleForm.daoqiri"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="产品结算日:" class="is50" v-if="isToedit('qingsuan')" prop="qingsuan">
          <el-date-picker
            type="datetime"
            v-model="ruleForm.qingsuan"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="投资期限:" class="is50" v-if="isToedit('qixian')" prop="qixian">
          <el-input type="number" placeholder="请输入" v-model="ruleForm.qixian" class="isInput"></el-input>
          <span class="isA">天</span>
        </el-form-item>

        <el-form-item
          label="期限别名:"
          class="is50"
          v-if="isToedit('deadlineAlias')"
          prop="deadlineAlias"
        >
          <el-input clearable placeholder="请输入" v-model="ruleForm.deadlineAlias"></el-input>
        </el-form-item>

        <el-form-item label="币种:" class="is50" v-if="isToedit('bizhong')" prop="bizhong">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.bizhong">
            <el-option
              size="mini"
              v-for="item in dictData.bizhong"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="isToedit('qishou')" label="起售日期:" prop="qishou">
          <el-date-picker
            v-model="ruleForm.qishou"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>

        <el-form-item v-show="isToedit('qixi')" label="起息日期:" prop="qixi">
          <el-date-picker
            v-model="ruleForm.qixi"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            @blur="setQixian"
          ></el-date-picker>
          <span v-if="ruleForm.qixi">&nbsp;&nbsp;投资期限：{{ruleForm.qixian}} 天</span>
        </el-form-item>

        <el-form-item v-show="isToedit('licairiqi')" label="理财日期:" class="dateS" prop="licairiqi">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="ruleForm.licairiqi"
            type="datetimerange"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item v-show="isToedit('muji')" label="募集日期:" class="dateS" prop="muji">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="ruleForm.muji"
            type="datetimerange"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="基金公司:" class="is50" v-if="isToedit('jijingongsi')">
          <el-select filterable clearable placeholder="请输入" v-model="ruleForm.jijingongsi">
            <el-option
              size="mini"
              v-for="item in dictData.jijin"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="赎回到帐日:" class="is50" v-if="isToedit('shuhui')" prop="shuhui">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.shuhui"></el-input>
        </el-form-item>

        <el-form-item label="锁定期:" prop="suoding" class="is50" v-if="isToedit('suoding')">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.suoding"></el-input>
        </el-form-item>

        <el-form-item label="买入:" class="is50" v-if="isToedit('mairu')" prop="mairu">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.mairu"></el-input>
        </el-form-item>

        <el-form-item label="手续费用:" class="is50" v-if="isToedit('shouxufei')" prop="shouxufei">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.shouxufei"></el-input>
        </el-form-item>

        <el-form-item label="期次:" class="is50" v-if="isToedit('qici')" prop="qici">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.qici"></el-input>
        </el-form-item>

        <el-form-item label="收益类型:" class="is50" v-if="isToedit('shouyiType')" prop="shouyiType">
          <el-input clearable placeholder="请输入" v-model="ruleForm.shouyiType"></el-input>
        </el-form-item>

        <el-form-item label="最小赎回额:" class="is50" v-if="isToedit('minShuHui')" prop="minShuHui">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.minShuHui"></el-input>
        </el-form-item>
        <el-form-item label="最大赎回额:" class="is50" v-if="isToedit('maxShuHui')" prop="maxShuHui">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.maxShuHui"></el-input>
        </el-form-item>
        <el-form-item label="单日最大赎回额:" class="is50" v-if="isToedit('dayShuHui')" prop="dayShuHui">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.dayShuHui"></el-input>
        </el-form-item>
        <el-form-item label="剩余额度百分比:" class="is50" v-if="isToedit('eduBi')" prop="eduBi">
          <el-input
            class="isInput"
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.eduBi"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="收益率区间最大值:" class="is50" v-if="isToedit('qujianMax')" prop="qujianMax">
          <el-input
            class="isInput"
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.qujianMax"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item label="计息基础:" class="is50" v-if="isToedit('jixiBase')" prop="jixiBase">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.jixiBase"></el-input>
        </el-form-item>

        <el-form-item
          prop="jiaoyizhuangtai"
          label="交易状态:"
          class="is50"
          v-if="isToedit('jiaoyizhuangtai')"
        >
          <el-select filterable clearable placeholder="请输入" v-model="ruleForm.jiaoyizhuangtai">
            <el-option
              size="mini"
              v-for="item in dictData.transaction_state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="最小起存金额:"
          class="is50"
          v-if="isToedit('qicunjineMin')"
          prop="qicunjineMin"
        >
          <el-input clearable placeholder="请输入" v-model="ruleForm.qicunjineMin"></el-input>
        </el-form-item>

        <el-form-item
          label="最大起存金额:"
          class="is50"
          v-if="isToedit('qicunjineMax')"
          prop="qicunjineMax"
        >
          <el-input clearable placeholder="请输入" v-model="ruleForm.qicunjineMax"></el-input>
        </el-form-item>

        <el-form-item v-show="isToedit('qicunfanwei')" label="起存范围说明:">
          <editor-bar
            v-model="ruleForm.qicunfanwei"
            :url="'admin/file/up/product'"
            style="width:590px;"
          ></editor-bar>
        </el-form-item>

        <el-form-item v-show="isToedit('chanpinmiaoshu')" label="产品描述:">
          <editor-bar
            v-model="ruleForm.chanpinmiaoshu"
            :url="'admin/file/up/product'"
            style="width:590px;"
          ></editor-bar>
        </el-form-item>

        <el-form-item v-show="isToedit('shouyiguize')" label="收益规则:">
          <editor-bar
            v-model="ruleForm.shouyiguize"
            :url="'admin/file/up/product'"
            style="width:590px;"
          ></editor-bar>
        </el-form-item>

        <el-form-item label="买方折算年化利率:" v-if="isToedit('zhesuan')" prop="zhesuan">
          <el-input
            style="width:590px;"
            clearable
            placeholder="请输入数字，并以“,”逗号分隔"
            v-model="ruleForm.zhesuan"
            type="textarea"
          ></el-input>
        </el-form-item>

        <el-form-item label="存入规则:" v-if="isToedit('cunru')" prop="cunru">
          <el-input
            style="width:590px;"
            clearable
            placeholder="请输入"
            v-model="ruleForm.cunru"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="转让规则:" v-if="isToedit('zhuanrang')" prop="zhuanrang">
          <el-input
            style="width:590px;"
            clearable
            placeholder="请输入"
            v-model="ruleForm.zhuanrang"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="转出规则:" v-if="isToedit('zhuanchu')" prop="zhuanchu">
          <el-input
            style="width:590px;"
            clearable
            placeholder="请输入"
            v-model="ruleForm.zhuanchu"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="支取规则:" v-if="isToedit('zhiquRule')" prop="zhiquRule">
          <el-input
            style="width:590px;"
            clearable
            placeholder="请输入"
            v-model="ruleForm.zhiquRule"
            type="textarea"
          ></el-input>
        </el-form-item>

        <el-form-item label="新手专享推荐理由:" v-if="isToedit('newPlayer')" prop="newPlayer">
          <el-input
            style="width:590px;"
            clearable
            placeholder="请输入"
            v-model="ruleForm.newPlayer"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="拼团推荐理由:" v-if="isToedit('pintuan')" prop="pintuan">
          <el-input
            style="width:590px;"
            clearable
            placeholder="请输入"
            v-model="ruleForm.pintuan"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品推荐理由:" v-if="isToedit('productTuiJian')" prop="productTuiJian">
          <el-input
            style="width:590px;"
            clearable
            placeholder="请输入"
            v-model="ruleForm.productTuiJian"
            type="textarea"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="同一产品标识:"
          class="is50"
          v-if="isToedit('chanpinbiaozhi')"
          prop="chanpinbiaozhi"
        >
          <el-input clearable placeholder="请输入" v-model="ruleForm.chanpinbiaozhi"></el-input>
        </el-form-item>

        <el-form-item
          label="单位净值:"
          class="is50"
          v-if="isToedit('netAssetValue')"
          prop="netAssetValue"
        >
          <el-input clearable type="number" placeholder="请输入" v-model="ruleForm.netAssetValue"></el-input>
        </el-form-item>

        <el-form-item
          label="累计净值:"
          class="is50"
          v-if="isToedit('netAccumulateValue')"
          prop="netAccumulateValue"
        >
          <el-input clearable type="number" placeholder="请输入" v-model="ruleForm.netAccumulateValue"></el-input>
        </el-form-item>

        <el-form-item
          label="保底收益率:"
          class="is50"
          v-if="isToedit('bottomGuardYield')"
          prop="bottomGuardYield"
        >
          <el-input
            class="isInput"
            type="number"
            clearable
            placeholder="请输入"
            v-model="ruleForm.bottomGuardYield"
          ></el-input>
          <span class="isA">%</span>
        </el-form-item>

        <el-form-item
          label="七日年化收益率:"
          class="is50"
          v-if="isToedit('onThe7thOfTheYearYield')"
          prop="onThe7thOfTheYearYield"
        >
          <el-input
            clearable
            type="number"
            placeholder="请输入"
            v-model="ruleForm.onThe7thOfTheYearYield"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="万份年化收益:"
          class="is50"
          v-if="isToedit('thousandsOfYearsYields')"
          prop="thousandsOfYearsYields"
        >
          <el-input
            clearable
            type="number"
            placeholder="请输入"
            v-model="ruleForm.thousandsOfYearsYields"
          ></el-input>
        </el-form-item>

        <el-form-item prop="jianguan" v-show="isToedit('jianguan')" label="监管属性:" class="is50">
          <div class="toFlex">
            <el-select filterable v-model="ruleForm.jianguan" clearable placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in dictData.regulatory_property"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item prop="shangjia" label="上下架状态:" class="is50" v-if="isToedit('shangjia')">
          <el-select filterable placeholder="请选择" v-model="ruleForm.shangjia">
            <!-- @focus="addTishi"> -->
            <el-option
              size="mini"
              v-for="item in dictData.shelve_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否面签:" class="is50" v-if="isToedit('mianqian')" prop="mianqian">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.mianqian">
            <el-option
              size="mini"
              v-for="item in dictData.visa_interview_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="到期是否转存:" class="is50" v-if="isToedit('zhuancun')">
          <el-radio-group v-model="ruleForm.zhuancun">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否推荐:" class="is50" v-if="isToedit('tuijian')">
          <el-radio-group v-model="ruleForm.tuijian">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否首页排行:" class="is50" v-if="isToedit('paihang')">
          <el-radio-group v-model="ruleForm.paihang">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否实名认证:" class="is50" v-if="isToedit('shiming')">
          <el-radio-group v-model="ruleForm.shiming">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否签约:" class="is50" v-if="isToedit('qianyue')">
          <el-radio-group v-model="ruleForm.qianyue">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="显示银行提示页:" class="is50" v-if="isToedit('yinhangpage')">
          <el-radio-group v-model="ruleForm.yinhangpage">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="自动上架:" class="is50" v-if="isToedit('autoUpDown')">
          <el-radio-group v-model="ruleForm.autoUpDown">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否可以申购:" class="is50" v-if="isToedit('canShenGou')">
          <el-radio-group v-model="ruleForm.canShenGou">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否可以赎回:" class="is50" v-if="isToedit('canShuHui')">
          <el-radio-group v-model="ruleForm.canShuHui">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否可转让:" class="is50" v-if="isToedit('canZhuanrang')">
          <el-radio-group v-model="ruleForm.canZhuanrang">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="默认存款笔数:"
          class="is50"
          v-if="isToedit('cunkuanbishu')"
          prop="cunkuanbishu"
        >
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.cunkuanbishu"></el-input>
        </el-form-item>

        <el-form-item
          label="默认存款金额:"
          class="is50"
          v-if="isToedit('cunkuanmorenjine')"
          prop="cunkuanmorenjine"
        >
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.cunkuanmorenjine"></el-input>
        </el-form-item>

        <el-form-item
          label="默认购买笔数:"
          class="is50"
          v-if="isToedit('goumaibishu')"
          prop="goumaibishu"
        >
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.goumaibishu"></el-input>
        </el-form-item>

        <el-form-item
          label="默认购买金额:"
          class="is50"
          v-if="isToedit('goumaimorenjine')"
          prop="goumaimorenjine"
        >
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.goumaimorenjine"></el-input>
        </el-form-item>

        <el-form-item label="年收费率(%):" class="is50" v-if="isToedit('shoufeilv')" prop="shoufeilv">
          <el-input type="number" clearable placeholder="请输入" v-model="ruleForm.shoufeilv"></el-input>
        </el-form-item>

        <el-form-item label="榜单专区标识:" class="is50" v-if="isToedit('zhuanqubiaozhi')">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.zhuanqubiaozhi">
            <el-option
              size="mini"
              v-for="item in dictData.list_area_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="duijie" label="银行对接方式:" class="is50" v-if="isToedit('duijie')">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.duijie">
            <el-option
              size="mini"
              v-for="item in dictData.bank_connection_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="银行合作方式:" class="is50" v-if="isToedit('hezuoType')" prop="hezuoType">
          <el-select filterable clearable placeholder="请选择" v-model="ruleForm.hezuoType">
            <el-option
              size="mini"
              v-for="item in dictData.cooperation_mode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <div style="width:723px;display:flex;" v-if="isToedit('h5Url')">
          <label style="width:142px;text-align:right;margin-right:12px;">产品H5链接:</label>
          <el-input clearable placeholder="请输入" v-model="ruleForm.h5Url"></el-input>
        </div>
      </el-form>
      <div v-if="isToedit('lilvlist')" style="width:100%;">
        <addLiLv :addLiLvProp="addLiLvProp" v-if="bianjieDialog"></addLiLv>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="save" type="primary">保 存</el-button>
        <el-button size="mini" @click="toClosebianjieDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EditorBar from "@/components/wangEnduit";
import addLiLv from "@/components/addLiLv.vue";

export default {
  components: {
    EditorBar,
    addLiLv
  },
  props: ["pageData"],
  data() {
    // 验证数字
    var checkNum1 = (rule, value, callback) => {
      if (+value < 0 || +value > 100 || value === "") {
        callback(new Error("请输入0--100"));
      } else if (("" + value).length > 19 || value === "") {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };

    // 验证数字，小数的
    var checkNum2 = (rule, value, callback) => {
      if (+value < 0 || +value > 100000 || value === "") {
        callback(new Error("请输入0--100000正数"));
      } else {
        this.ruleForm.qixian = (+value).toFixed(0);
        callback();
      }
    };
    // 验证数字，小数的
    var check_guanzhu = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入大于0的正数"));
      } else if (("" + value).length > 19 || value === "") {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkNum3 = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 19 || value === "") {
        callback(new Error("请输入1-19字符"));
      } else {
        callback();
      }
    };

    // 验证数字
    var check_yuqinianhua = (rule, value, callback) => {
      if (+value < 0 || +value > 100 || value === "") {
        callback(new Error("请输入0--100正数"));
      } else {
        let reg = /\./;
        if (reg.test("" + value)) {
          let val = ("" + value).split(".")[1];
          if (val.length > 4) {
            callback(new Error("最多输入4位！"));
            this.ruleForm.yuqishouyi = (+value).toFixed(4);
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    };

    // 验证数字，小数的
    var checkBishu = (rule, value, callback) => {
      let reg = /\./;
      if (reg.test(value)) {
        callback(new Error("请输入整数"));
      } else if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 10 || value === "") {
        callback(new Error("请输入1-10字符"));
      } else {
        callback();
      }
    };
    // 验证数字
    var checkJine = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (("" + value).length > 14 || value === "") {
        callback(new Error("请输入1-14字符"));
      } else {
        callback();
      }
    };

    // 验证数字
    var check_dizeng = (rule, value, callback) => {
      if (+value < 0 || +value >= 10000000) {
        callback(new Error("请输入0--10000000正数"));
      } else {
        this.ruleForm.dizeng = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var check_qigou = (rule, value, callback) => {
      if (+value < 0 || +value >= 10000000) {
        callback(new Error("请输入0--10000000正数"));
      } else {
        this.ruleForm.qigou = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var checkNum4 = (rule, value, callback) => {
      if (+value < 0 || !value || +value > 10000000) {
        callback(new Error("请输入0--10000000正数"));
      } else if (+value > +this.ruleForm.qicunjineMax) {
        callback(new Error("不能大于最大起购额"));
      } else {
        this.ruleForm.qicunjineMin = (+value).toFixed(2);
        callback();
      }
    };
    // 验证数字
    var checkNum5 = (rule, value, callback) => {
      if (+value < 0 || !value || +value > 10000000) {
        callback(new Error("请输入0--10000000正数"));
      } else if (+value < +this.ruleForm.qicunjineMin) {
        callback(new Error("不能小于最小起购额"));
      } else {
        this.ruleForm.qicunjineMax = (+value).toFixed(2);
        callback();
      }
    };
    // 验证利率
    var check_lilv = (rule, value, callback) => {
      let reg = /\./;
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (+value >= 100) {
        callback(new Error("利率不能大于或等于100"));
      } else if (reg.test(value)) {
        let str = ("" + value).split(".")[1];
        if (str.length > 4) {
          this.ruleForm.lilv = (+value).toFixed(4);
          callback(new Error("最多输入4位小数"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    // 验证利率
    var check_maxLilv = (rule, value, callback) => {
      let reg = /\./;
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (+value >= 100) {
        callback(new Error("利率不能大于或等于100"));
      } else if (reg.test(value)) {
        let str = ("" + value).split(".")[1];
        if (str.length > 4) {
          this.ruleForm.maxLilv = (+value).toFixed(4);
          callback(new Error("最多输入4位小数"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    // 验证利率
    var check_daoqiLilv = (rule, value, callback) => {
      let reg = /\./;
      if (value < 0) {
        callback(new Error("请输入正数"));
      } else if (+value >= 100) {
        callback(new Error("利率不能大于或等于100"));
      } else if (reg.test(value)) {
        let str = ("" + value).split(".")[1];
        if (str.length > 4) {
          this.ruleForm.daoqiLilv = (+value).toFixed(4);
          callback(new Error("最多输入4位小数"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    var chec_suoding = (rule, value, callback) => {
      if (+value < 0 || +value > 100000 || !value) {
        callback(new Error("请输入0--100000正数"));
      } else {
        this.ruleForm.suoding = (+value).toFixed(0);
        callback();
      }
    };
    // 检查额度比
    var check_eduBi = (rule, value, callback) => {
      if (+value < 0 || +value > 100 || !value) {
        callback(new Error("请输入0--100正数"));
      } else {
        this.ruleForm.eduBi = (+value).toFixed(2);
        callback();
      }
    };
    var chec_jisuan_day = (rule, value, callback) => {
      if (+value < 0 || +value > 100000 || !value) {
        callback(new Error("请输入0--100000正数"));
      } else {
        this.ruleForm.jisuan_day = (+value).toFixed(0);
        callback();
      }
    };

    return {
      addLiLvProp: {},
      rules: {}, // 实际使用到的验证
      //表单验证
      Rules: {
        jisuan_day: [{ validator: chec_jisuan_day, trigger: "blur" }],
        chanpinquyu: [
          { required: true, message: "请选择产品区域", trigger: "change" }
        ],
        shangjia: [
          { required: true, message: "请选择上下架状态", trigger: "change" }
        ],
        bizhong: [{ required: true, message: "请选择币种", trigger: "change" }],
        mianqian: [
          { required: true, message: "请选择面签", trigger: "change" }
        ],
        jigou_name: [
          { required: true, message: "请选择机构", trigger: "change" }
        ],
        product: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        jiaoyizhuangtai: [
          { required: true, message: "请选择交易状态", trigger: "change" }
        ],

        qishou: [{ required: true, message: "请选择", trigger: "change" }],
        qixi: [{ required: true, message: "请选择", trigger: "change" }],

        daima: [
          { required: true, message: "请输入基金代码", trigger: "blur" },
          { min: 1, max: 6, message: "最多输入6个字", trigger: "blur" }
        ],
        productjijin: [
          { required: true, message: "请输入基金名称", trigger: "blur" },
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
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
          { required: true, message: "请输入", trigger: "blur" },
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        chanpinbiaozhi: [
          { min: 1, max: 19, message: "最多输入19个字", trigger: "blur" }
        ],
        suoding: [
          { required: true, message: "请输入锁定期", trigger: "blur" },
          { validator: chec_suoding, trigger: "blur" }
        ],
        shoufeilv: [{ validator: checkNum1, trigger: "blur" }],
        goumaibishu: [{ validator: checkBishu, trigger: "blur" }],
        goumaimorenjine: [{ validator: checkJine, trigger: "blur" }],
        cunkuanbishu: [
          { required: true, validator: checkBishu, trigger: "blur" }
        ],
        cunkuanmorenjine: [
          { required: true, validator: checkJine, trigger: "blur" }
        ],
        mairu: [{ validator: checkNum3, trigger: "blur" }],
        qigou: [{ required: true, validator: check_qigou, trigger: "blur" }],
        guanzhuNum: [{ validator: check_guanzhu, trigger: "blur" }],
        rizhangfu: [{ validator: checkNum3, trigger: "blur" }],
        lilv: [{ required: true, validator: check_lilv, trigger: "blur" }],
        maxLilv: [
          { required: true, validator: check_maxLilv, trigger: "blur" }
        ],
        daoqiLilv: [
          { required: true, validator: check_daoqiLilv, trigger: "blur" }
        ],
        qicunjine: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: checkNum3, trigger: "blur" }
        ],
        qicunjineMin: [
          { required: true, message: "请输入最小起存额", trigger: "blur" },
          { validator: checkNum4, trigger: "blur" }
        ],
        qicunjineMax: [
          { required: true, message: "请输入最大起存额", trigger: "blur" },
          { validator: checkNum5, trigger: "blur" }
        ],

        dizeng: [
          { required: true, message: "请输入递增金额", trigger: "blur" },
          { validator: check_dizeng, trigger: "blur" }
        ],
        yuqishouyi: [
          { required: true, validator: check_yuqinianhua, trigger: "blur" }
        ],
        qixian: [{ required: true, validator: checkNum2, trigger: "blur" }],
        shouxufei: [{ validator: checkNum3, trigger: "blur" }],
        fengxian: [
          { required: true, message: "请选择风险等级", trigger: "change" }
        ],
        shengyuED: [
          { required: true, message: "请选择剩余额度", trigger: "change" }
        ],
        qixiri: [
          { required: true, message: "请选择起息日", trigger: "change" }
        ],
        daoqiri: [{ required: true, message: "请选择到期日", trigger: "blur" }],
        qingsuan: [
          { required: true, message: "请选择清算日", trigger: "blur" }
        ],

        licairiqi: [
          { required: true, message: "请选择理财日期", trigger: "change" }
        ],
        jianguan: [
          { required: true, message: "请选择监管属性", trigger: "change" }
        ],
        muji: [
          { required: true, message: "请选择募集日期", trigger: "change" }
        ],
        zhiqu: [
          { required: true, message: "请选择支取时间！", trigger: "change" }
        ],
        hezuoType: [
          { required: true, message: "请选择合作方式", trigger: "change" }
        ],
        duijie: [
          { required: true, message: "请选择银行对接方式", trigger: "change" }
        ],
        jixi: [{ required: true, message: "请选择", trigger: "change" }],
        eduBi: [{ required: true, validator: check_eduBi, trigger: "blur" }]
      },
      xilie: null, // 产品系列数据
      serverData: null, // 服务器返回的数据
      dictData: {}, // 字典数据
      pageInfos: null, // 页面数据
      show: [], // 控制页面显示哪些
      edit: [], // 控制点击编辑时页面的验证项
      forRule: [],
      toShowMoreNum: null, // 描述多行文本隐藏切换
      forEmit: "", // 当编辑完数据后，需要重新获取数据时，emit用
      deleteType: "", // 点击删除时使用
      bianjieDialog: false, // 纯债编辑按钮弹出框显示隐藏
      ruleForm: null,

      // 新建智能存款底下的利率选项
      addLilvTable: {
        pageNum: 0,
        total: 0,
        title: [
          "序号",
          "期限",
          "期限单位",
          "利率%",
          "锁定期限(天)",
          "备注",
          "榜单展示",
          "锁定期榜单展示",
          "操作"
        ],
        dataTotal: [],
        datas: [] // 用来进行分页展示时的当前展示数据
      },
      diguiTime: 0 // 用来修改描述里面的图片
    };
  },
  created() {
    let page = this.pageData.page;
    this.dictData = JSON.parse(sessionStorage.getItem("dict"));
    switch (page) {
      // 纯债基金管理
      case "pure_debt_fund":
        this.forEmit = "chunzhai";
        this.show = [
          "jijingongsi",
          "daima",
          "jiaoyizhuangtai",
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "goumaibishu",
          "goumaimorenjine",
          "contentVersion",
          "h5Url",
          "yinhangpage",
          "shiming",
          "chanpinquyu", // 产品区域
          "bizhong"
        ];
        this.edit = [
          "product",
          "daima",
          "jigou_name",
          "jijingongsi",
          "jiaoyizhuangtai",
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "goumaibishu",
          "goumaimorenjine",
          "shiming",
          "contentVersion",
          "h5Url",
          "yinhangpage",
          "yinhangpage",
          "chanpinquyu", // 产品区域
          "bizhong"
        ];
        this.forRule = [...this.edit];
        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.forProduct.id,
          skuId: this.pageData.forProduct.skuId,
          title: this.pageData.forProduct.name, // 上标题，产品名称
          institutionId: this.pageData.forProduct.institutionId, // 机构id
          institutionName: this.pageData.forProduct.institutionName, // 机构名称
          logo: this.pageData.forProduct.logo
            ? this.pageData.forProduct.logo
            : "",
          jijingongsi: this.pageData.forProduct.fundHouseName,
          contentVersion: this.pageData.forProduct.contentVersion,
          daima: this.pageData.forProduct.code,
          jiaoyizhuangtai: this.pageData.forProduct.statusName,
          shangjia: this.pageData.forProduct.appInfo.shelveStatusLabel,
          mianqian: this.pageData.forProduct.appInfo.visaInterviewLabel,
          tuijian:
            this.pageData.forProduct.appInfo.recommend === "YES" ? "是" : "否",
          paihang:
            this.pageData.forProduct.appInfo.homePage === "YES" ? "是" : "否",
          goumaibishu: this.pageData.forProduct.appInfo.defaultBuyNum,
          goumaimorenjine: this.pageData.forProduct.appInfo.defaultAmount,
          h5Url: this.pageData.forProduct.appInfo.h5Url,
          yinhangpage:
            this.pageData.forProduct.appInfo.showBankPage === "YES"
              ? "是"
              : "否",
          shiming:
            this.pageData.forProduct.appInfo.realNameAuth === "YES"
              ? "是"
              : "否",
          chanpinID: this.pageData.forProduct.id,
          createTime: this.pageData.forProduct.gmtCreated,
          who: this.pageData.forProduct.creatorName,

          chanpinquyu: this.pageData.forProduct.appInfo.areaName,
          bizhong: this.pageData.forProduct.currencyName
        };

        break;
      // 货币基金管理
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
          "goumaibishu",
          "goumaimorenjine",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "guanzhuNum",
          "zhuanqubiaozhi",
          "contentVersion",
          "yinhangpage",
          "h5Url",
          "qianyue",
          "shiming",
          "hezuoType",
          "shoufeilv",
          "bizhong",
          "chanpinquyu",
          "biaoqian"
        ];
        this.edit = [
          "qigou",
          "product",
          "jigou_name",
          "jijingongsi",
          "shuhui",
          "suoding",
          "mairu",
          "shouxufei",
          "chanpinmiaoshu",
          "shouyiguize",
          "chanpinbiaozhi",
          "guanzhuNum",
          "goumaibishu",
          "goumaimorenjine",
          "zhuanqubiaozhi",
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "contentVersion",
          "yinhangpage",
          "h5Url",
          "qianyue",
          "shiming",
          "hezuoType",
          "shoufeilv",
          "bizhong",
          "chanpinquyu",
          "biaoqian"
        ];
        this.forRule = [...this.edit];

        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.forProduct.id,
          skuId: this.pageData.forProduct.skuId,
          title: this.pageData.forProduct.name, // 上标题，产品名称
          institutionId: this.pageData.forProduct.institutionId, // 机构id
          institutionName: this.pageData.forProduct.institutionName, // 机构名称
          logo: this.pageData.forProduct.logo
            ? this.pageData.forProduct.logo
            : "",
          jijingongsi: this.pageData.forProduct.fundHouseName,
          qigou: this.pageData.forProduct.minAmount,
          suoding: this.pageData.forProduct.lockinPeriod,
          shuhui: this.pageData.forProduct.accountingDate,
          shouxufei: this.pageData.forProduct.commission,
          shoufeilv: this.pageData.forProduct.appInfo.yearRate,
          shouyiguize: this.pageData.forProduct.yieldRule,
          chanpinmiaoshu: this.pageData.forProduct.description,
          shangjia: this.pageData.forProduct.appInfo.shelveStatusLabel,
          mianqian: this.pageData.forProduct.appInfo.visaInterviewLabel,
          mairu: this.pageData.forProduct.buyIn,
          goumaibishu: this.pageData.forProduct.appInfo.defaultBuyNum,
          goumaimorenjine: this.pageData.forProduct.appInfo.defaultAmount,
          tuijian:
            this.pageData.forProduct.appInfo.recommend === "YES" ? "是" : "否 ",
          paihang:
            this.pageData.forProduct.appInfo.homePage === "YES" ? "是" : "否 ",
          chanpinbiaozhi: this.pageData.forProduct.appInfo.sameProductFlag,
          guanzhuNum: this.pageData.forProduct.appInfo.defaultFlowNum,
          zhuanqubiaozhi: this.pageData.forProduct.appInfo.listAreaFlagLabel,
          chanpinID: this.pageData.forProduct.id,
          createTime: this.pageData.forProduct.gmtCreated,
          who: this.pageData.forProduct.operator,
          h5Url: this.pageData.forProduct.appInfo.h5Url,
          hezuoType: this.pageData.forProduct.appInfo.cooperationModeLabel,
          contentVersion: this.pageData.forProduct.contentVersion,
          bizhong: this.pageData.forProduct.currencyName,
          chanpinquyu: this.pageData.forProduct.appInfo.areaName,
          yinhangpage:
            this.pageData.forProduct.appInfo.showBankPage === "YES"
              ? "是"
              : "否",
          shiming:
            this.pageData.forProduct.appInfo.realNameAuth === "YES"
              ? "是"
              : "否",
          qianyue:
            this.pageData.forProduct.appInfo.signed === "YES" ? "是" : "否",
          biaoqian: [
            ...this.pageData.forProduct.activityTags,
            ...this.pageData.forProduct.selfDefiningTags
          ] // 标签
        };

        break;
      // 理财管理
      case "wmp":
        this.forEmit = "licai";
        this.show = [
          "leixing",
          "xilie",
          "yuqishouyi",
          "fengxian",
          "qixian",
          "chanpinmiaoshu",
          "shangjia",
          "mianqian",
          "goumaibishu",
          "goumaimorenjine",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "guanzhuNum",
          "zhuanqubiaozhi",
          "jianguan",
          "productFeature",
          "contentVersion",
          "h5Url",
          "qianyue",
          "shiming",
          "hezuoType",
          "shoufeilv",
          "chanpinquyu",
          "autoUpDown",
          "duijie",
          "qigou",
          "dizeng",
          "bizhong",
          "biaoqian"
        ];
        this.edit = [
          "jigou_name",
          "xilie",
          "productjijin",
          "dizeng",
          "yuqishouyi",
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
          "goumaimorenjine",
          "zhuanqubiaozhi",
          "guanzhuNum",
          "productFeature",
          "contentVersion",
          "h5Url",
          "qianyue",
          "shiming",
          "hezuoType",
          "shoufeilv",
          "autoUpDown",
          "chanpinquyu",
          "duijie",
          "bizhong",
          "qigou",
          "biaoqian"
        ];
        this.forRule = [...this.edit];
        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.forProduct.id,
          skuId: this.pageData.forProduct.skuId,
          title: this.pageData.forProduct.name, // 上标题，产品名称
          institutionId: this.pageData.forProduct.institutionId, // 机构id
          institutionName: this.pageData.forProduct.institutionName, // 机构名称
          logo: this.pageData.forProduct.logo
            ? this.pageData.forProduct.logo
            : "",
          xilie: this.pageData.forProduct.seriesName,
          yuqishouyi: this.pageData.forProduct.interestRate,
          fengxian: this.pageData.forProduct.riskLevelLabel,
          qixian: this.pageData.forProduct.deadline,
          leixing: this.pageData.forProduct.productSubtypeLabel,
          chanpinmiaoshu: this.pageData.forProduct.description,
          shangjia: this.pageData.forProduct.appInfo.shelveStatusLabel,
          mianqian: this.pageData.forProduct.appInfo.visaInterviewLabel,
          goumaibishu: this.pageData.forProduct.appInfo.defaultBuyNum,
          goumaimorenjine: this.pageData.forProduct.appInfo.defaultAmount,
          shoufeilv: this.pageData.forProduct.appInfo.yearRate,
          bizhong: this.pageData.forProduct.currencyName,
          tuijian:
            this.pageData.forProduct.appInfo.recommend === "YES" ? "是" : "否",
          paihang:
            this.pageData.forProduct.appInfo.homePage === "YES" ? "是" : "否",
          chanpinbiaozhi: this.pageData.forProduct.appInfo.sameProductFlag,
          guanzhuNum: this.pageData.forProduct.appInfo.defaultFlowNum,
          zhuanqubiaozhi: this.pageData.forProduct.appInfo.listAreaFlagLabel,
          jianguan: this.pageData.forProduct.regulatoryPropertyLabel,
          chanpinID: this.pageData.forProduct.id,
          createTime: this.pageData.forProduct.gmtCreated,
          who: this.pageData.forProduct.operator,
          productFeature: this.pageData.forProduct.productFeatureLabel,
          contentVersion: this.pageData.forProduct.contentVersion,
          chanpinquyu: this.pageData.forProduct.appInfo.areaName,
          yinhangpage:
            this.pageData.forProduct.appInfo.showBankPage === "YES"
              ? "是"
              : "否",
          shiming:
            this.pageData.forProduct.appInfo.realNameAuth === "YES"
              ? "是"
              : "否",
          qianyue:
            this.pageData.forProduct.appInfo.signed === "YES" ? "是" : "否",
          hezuoType: this.pageData.forProduct.appInfo.cooperationModeLabel,
          h5Url: this.pageData.forProduct.appInfo.h5Url,
          qigou: this.pageData.forProduct.minAmount,
          dizeng: this.pageData.forProduct.increaseAmount,
          duijie: this.pageData.forProduct.appInfo.connectionModeLabel,
          autoUpDown:
            this.pageData.forProduct.appInfo.autoShelve === "YES" ? "是" : "否", // 自动上架
          biaoqian: [
            ...this.pageData.forProduct.activityTags,
            ...this.pageData.forProduct.selfDefiningTags
          ] // 标签
        };
        break;
      // 保险
      case "wmp_insurance":
        this.forEmit = "baoxian";
        this.show = [
          "productHome",
          "qigou",
          "dizeng",
          "yuqishouyi",
          "fengxian",
          "jianguan",
          "chanpinmiaoshu",
          "shengyuED",
          "qixian",
          "contentVersion",
          "bizhong",
          "leixing",
          "xilie",
          "qici",
          "shouyiType",
          "minShuHui",
          "maxShuHui",
          "dayShuHui",
          "eduBi",
          "qujianMax",
          "jixiBase",
          "qingsuan",
          "canShenGou",
          "canShuHui",
          "newPlayer",
          "pintuan",
          "productTuiJian",
          "netAssetValue",
          "netAccumulateValue",
          "bottomGuardYield",
          "onThe7thOfTheYearYield",
          "thousandsOfYearsYields",
          "jijingongsi",
          "shangjia",
          "mianqian",
          "goumaibishu",
          "goumaimorenjine",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "guanzhuNum",
          "zhuanqubiaozhi",
          "shiming",
          "qianyue",
          "hezuoType",
          "duijie",
          "shoufeilv",
          "zhuancun",
          "yinhangpage",
          "h5Url",
          "chanpinquyu",
          "biaoqian"
        ];
        this.edit = [
          "productHome",
          "jigou_name",
          "jijingongsi",
          "qigou",
          "dizeng",
          "yuqishouyi",
          "fengxian",
          "jianguan",
          "chanpinmiaoshu",
          "shengyuED",
          "qixian",
          "contentVersion",
          "bizhong",
          "xilie",
          "qici",
          "shouyiType",
          "minShuHui",
          "maxShuHui",
          "dayShuHui",
          "eduBi",
          "qujianMax",
          "jixiBase",
          "qingsuan",
          "canShenGou",
          "canShuHui",
          "newPlayer",
          "pintuan",
          "productTuiJian",
          "netAssetValue",
          "netAccumulateValue",
          "bottomGuardYield",
          "onThe7thOfTheYearYield",
          "thousandsOfYearsYields",
          "jijingongsi",
          "shangjia",
          "mianqian",
          "goumaibishu",
          "goumaimorenjine",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "guanzhuNum",
          "zhuanqubiaozhi",
          "shiming",
          "qianyue",
          "hezuoType",
          "duijie",
          "shoufeilv",
          "zhuancun",
          "yinhangpage",
          "h5Url",
          "chanpinquyu",
          "biaoqian",
          "product",
          "qixiri",
          "daoqiri"
        ];
        this.forRule = [...this.edit];
        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.forProduct.id,
          skuId: this.pageData.forProduct.skuId,
          title: this.pageData.forProduct.name, // 上标题，产品名称
          institutionId: this.pageData.forProduct.institutionId, // 机构id
          institutionName: this.pageData.forProduct.institutionName, // 机构名称
          logo: this.pageData.forProduct.logo
            ? this.pageData.forProduct.logo
            : "",
          jijingongsi: this.pageData.forProduct.fundHouseName,
          productHome: this.pageData.forProduct.productCompanyName, // 产品公司名称
          xilie: this.pageData.forProduct.seriesName,
          leixing: this.pageData.forProduct.productSubtypeLabel,
          yuqishouyi: this.pageData.forProduct.interestRate,
          fengxian: this.pageData.forProduct.riskLevelLabel,
          qixian: this.pageData.forProduct.deadline,
          chanpinmiaoshu: this.pageData.forProduct.description,
          shangjia: this.pageData.forProduct.appInfo.shelveStatusLabel,
          mianqian: this.pageData.forProduct.appInfo.visaInterviewLabel,
          goumaibishu: this.pageData.forProduct.appInfo.defaultBuyNum,
          goumaimorenjine: this.pageData.forProduct.appInfo.defaultAmount,
          shoufeilv: this.pageData.forProduct.appInfo.yearRate,
          bizhong: this.pageData.forProduct.currencyName,
          tuijian:
            this.pageData.forProduct.appInfo.recommend === "YES" ? "是" : "否",
          paihang:
            this.pageData.forProduct.appInfo.homePage === "YES" ? "是" : "否",
          chanpinbiaozhi: this.pageData.forProduct.appInfo.sameProductFlag,
          guanzhuNum: this.pageData.forProduct.appInfo.defaultFlowNum,
          zhuanqubiaozhi: this.pageData.forProduct.appInfo.listAreaFlagLabel,
          jianguan: this.pageData.forProduct.regulatoryPropertyLabel,
          chanpinID: this.pageData.forProduct.id,
          createTime: this.pageData.forProduct.gmtCreated,
          who: this.pageData.forProduct.operator,
          contentVersion: this.pageData.forProduct.contentVersion,
          chanpinquyu: this.pageData.forProduct.appInfo.areaName,
          yinhangpage:
            this.pageData.forProduct.appInfo.showBankPage === "YES"
              ? "是"
              : "否",
          shiming:
            this.pageData.forProduct.appInfo.realNameAuth === "YES"
              ? "是"
              : "否",
          qici: this.pageData.forProduct.period, // 期次
          shouyiType: this.pageData.forProduct.revenueType, // 收益类型
          minShuHui: this.pageData.forProduct.minRedemptionAmount, // 最小赎回金额
          maxShuHui: this.pageData.forProduct.maxRedemptionAmount, // 最大赎回金额
          dayShuHui: this.pageData.forProduct.singleDayAmount, // 单日最大赎回金额
          eduBi: this.pageData.forProduct.surplusAmountPercentage, // 产品剩余额度百分比
          qujianMax: this.pageData.forProduct.maxReturnInterval, // 产品收益区间最大值
          jixiBase: this.pageData.forProduct.interestBasis, // 计息基础
          qingsuan: this.pageData.forProduct.settlementDay, // 产品结算日
          canShenGou:
            this.pageData.forProduct.appInfo.isAllowPurchase === "YES"
              ? "是"
              : "否",
          canShuHui:
            this.pageData.forProduct.appInfo.isAllowRedeem === "YES"
              ? "是"
              : "否",
          newPlayer: this.pageData.forProduct.appInfo.noviceVipReason,
          pintuan: this.pageData.forProduct.appInfo.assembleReason,
          productTuiJian: this.pageData.forProduct.appInfo.productReason,
          netAssetValue: this.pageData.forProduct.insuranceFinancing
            .netAssetValue,
          netAccumulateValue: this.pageData.forProduct.insuranceFinancing
            .netAccumulateValue,
          bottomGuardYield: this.pageData.forProduct.insuranceFinancing
            .bottomGuardYield,
          onThe7thOfTheYearYield: this.pageData.forProduct.insuranceFinancing
            .onThe7thOfTheYearYield,
          thousandsOfYearsYields: this.pageData.forProduct.insuranceFinancing
            .thousandsOfYearsYields,

          zhuancun: this.pageData.forProduct.renewal === "YES" ? "是" : "否",

          shengyuED: this.pageData.forProduct.surplusQuotaLabel,
          qianyue:
            this.pageData.forProduct.appInfo.signed === "YES" ? "是" : "否",
          hezuoType: this.pageData.forProduct.appInfo.cooperationModeLabel,
          h5Url: this.pageData.forProduct.appInfo.h5Url,
          qigou: this.pageData.forProduct.minAmount,
          dizeng: this.pageData.forProduct.increaseAmount,
          duijie: this.pageData.forProduct.appInfo.connectionModeLabel,
          autoUpDown:
            this.pageData.forProduct.appInfo.autoShelve === "YES" ? "是" : "否", // 自动上架
          biaoqian: [
            ...this.pageData.forProduct.activityTags,
            ...this.pageData.forProduct.selfDefiningTags
          ] // 标签
        };
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
          "qicunjine",
          "dizeng",
          "biaoqian",
          "jianguan",
          "chanpinmiaoshu",
          "shangjia",
          "mianqian",
          "cunkuanbishu",
          "cunkuanmorenjine",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "zhuanqubiaozhi",
          "interestRateAlias",
          "qicunfanwei",
          "fuxipinlv",
          "bizhong",
          "contentVersion",
          "shiming",
          "guanzhuNum",
          "hezuoType",
          "shoufeilv",
          "yinhangpage",
          "duijie",
          "h5Url",
          "chanpinquyu",
          "jianguan",
          "qianyue",
          "deadlineAlias"
        ];
        this.edit = [
          "jigou_name",
          "xilie",
          "productcunkuan",
          "bieming",
          "lilv",
          "dizeng",
          "biaoqian",
          "chanpinmiaoshu",
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "goumaibishu",
          "goumaimorenjine",
          "zhuanqubiaozhi",
          "interestRateAlias",
          "qicunjineMin",
          "qicunjineMax",
          "qicunfanwei",
          "jianguan",
          "fuxipinlv",
          "bizhong",
          "contentVersion",
          "shiming",
          "guanzhuNum",
          "hezuoType",
          "shoufeilv",
          "yinhangpage",
          "duijie",
          "h5Url",
          "chanpinquyu",
          "deadlineAlias",
          "qianyue"
        ];
        this.forRule = [...this.edit];
        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.datas.id,
          title: this.pageData.datas.name, // 上标题，产品名称
          institutionId: this.pageData.datas.institutionId, // 机构id
          institutionName: this.pageData.datas.institutionName, // 机构名称
          logo: this.pageData.datas.institutionLogo
            ? this.pageData.datas.institutionLogo
            : "",
          seriesId: this.pageData.datas.seriesId, // 产品系列ID
          xilie: this.pageData.datas.seriesName, // 产品系列
          leibie: this.pageData.datas.typeAlias, // 存款类别
          leixing: this.pageData.datas.productSubtypeLabel, // 产品类型
          lilv: this.pageData.datas.interest.interestRate, // 利率
          interestRateAlias: this.pageData.datas.interestRateAlias, // 利率别名
          deadlineAlias: this.pageData.datas.deadlineAlias,
          qicunjine:
            this.pageData.datas.minAmount +
            " ~ " +
            this.pageData.datas.maxAmount, // 起存金额
          qicunfanwei: this.pageData.datas.amountRangeExplain, // 起存范围说明
          dizeng: this.pageData.datas.increaseAmount, // 递增金额
          chanpinmiaoshu: this.pageData.datas.description, // 产品描述
          shangjia: this.pageData.datas.appInfo.shelveStatusLabel, // 上架状态
          mianqian: this.pageData.datas.appInfo.visaInterviewLabel, // 是否面签
          tuijian:
            this.pageData.datas.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
          paihang: this.pageData.datas.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
          shiming:
            this.pageData.datas.appInfo.realNameAuth === "YES" ? "是" : "否", // 是否实名
          qianyue: this.pageData.datas.appInfo.signed === "YES" ? "是" : "否", // 是否签约
          guanzhuNum: this.pageData.datas.appInfo.defaultFlowNum, // 默认关注数量
          hezuoType: this.pageData.datas.appInfo.cooperationModeLabel, // 合作方式
          duijie: this.pageData.datas.appInfo.connectionModeLabel, // 银行对接方式
          shoufeilv: this.pageData.datas.appInfo.yearRate, // 银行对接方式
          yinhangpage:
            this.pageData.datas.appInfo.showBankPage === "YES" ? "是" : "否", // 是否显示银行过渡页
          h5Url: this.pageData.datas.appInfo.h5Url, // H5链接
          cunkuanbishu: this.pageData.datas.appInfo.defaultBuyNum, // 默认购买笔数
          cunkuanmorenjine: this.pageData.datas.appInfo.defaultAmount, // 默认购买金额
          chanpinbiaozhi: this.pageData.datas.appInfo.sameProductFlag, // 同一产品标识
          zhuanqubiaozhi: this.pageData.datas.appInfo.listAreaFlagLabel, // 榜单专区标识
          chanpinID: this.pageData.datas.id, // 产品id
          createTime: this.pageData.datas.gmtCreated, // 创建时间
          who: this.pageData.datas.operator, // 创建人
          biaoqian: [
            ...this.pageData.datas.activityTags,
            ...this.pageData.datas.productTags,
            ...this.pageData.datas.selfDefiningTags
          ], // 标签
          fuxipinlv: this.pageData.datas.frequencyTypeLabel, // 付息频率
          bizhong: this.pageData.datas.currencyName, // 币种
          contentVersion: this.pageData.datas.contentVersion,
          chanpinquyu: this.pageData.datas.appInfo.areaName,
          jianguan: this.pageData.datas.regulatoryPropertyLabel
        };
        break;
      // 定期存款
      case "time_deposit":
        this.forEmit = "dingqi";
        this.deleteType = "time";
        this.show = [
          "xilie",
          "leibie",
          "leixing",
          "interestRateAlias",
          "deadlineAlias",
          "dizeng",
          "chanpinbiaozhi",
          "zhuancun", // 到期是否转存
          "zhiqu", // 支取时间
          "fanhuan", // 收益返还方式
          "jianguan",
          "fuxipinlv", // 付息频率
          "bizhong",
          "chanpinmiaoshu",
          "contentVersion",
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "cunkuanbishu",
          "cunkuanmorenjine",
          "shiming", // 是否实名
          "qianyue",
          "guanzhuNum", // 默认关注数量
          "zhuanqubiaozhi",
          "hezuoType",
          "shoufeilv", // 年收费率(%)
          "autoUpDown",
          "yinhangpage", // 显示银行过渡页
          "duijie", // 银行对接方式
          "h5Url", // 产品H5链接
          "biaoqian",
          "qicunjine",
          "dizeng",
          "qicunfanwei", // 起存范围说明
          "chanpinquyu", // 产品区域
          "shengyuED"
        ];
        this.edit = [
          "xilie",
          "bieming",
          "jigou_name",
          "productcunkuan",
          "lilvlist",
          "fanhuan",
          "chanpinquyu",
          "zhuancun",
          "bizhong",
          "fuxipinlv",
          "dizeng",
          "biaoqian",
          "chanpinmiaoshu",
          "qicunjineMin",
          "qicunjineMax",
          "qicunfanwei",
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "shiming",
          "jianguan",
          "qianyue",
          "chanpinbiaozhi",
          "zhuanqubiaozhi",
          "shoufeilv",
          "guanzhuNum",
          "yinhangpage",
          "duijie",
          "h5Url",
          "autoUpDown",
          "zhiqu",
          "deadlineAlias",
          "hezuoType",
          "interestRateAlias",
          "contentVersion",
          "cunkuanbishu",
          "cunkuanmorenjine",
          "shengyuED"
        ];
        this.forRule = [...this.edit];

        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.datas.id,
          skuId: this.pageData.datas.skuId,
          title: this.pageData.datas.name, // 上标题，产品名称
          institutionId: this.pageData.datas.institutionId, // 机构id
          institutionName: this.pageData.datas.institutionName, // 机构名称
          contentVersion: this.pageData.datas.contentVersion,
          bizhong: this.pageData.datas.currencyName, // 币种
          shengyuED: this.pageData.datas.surplusQuotaLabel,
          logo: this.pageData.datas.institutionLogo
            ? this.pageData.datas.institutionLogo
            : "",
          seriesId: this.pageData.datas.seriesId, // 产品系列ID
          xilie: this.pageData.datas.seriesName, // 产品系列
          leibie: this.pageData.datas.typeAlias, // 存款类别
          chanpinquyu: this.pageData.datas.appInfo.areaName, // 产品区域
          deadlineAlias: this.pageData.datas.deadlineAlias, // 期限别名
          interestRateAlias: this.pageData.datas.interestRateAlias, // 利率别名
          leixing: this.pageData.datas.productSubtypeLabel, // 产品类型
          qicunjine:
            this.pageData.datas.minAmount +
            " ~ " +
            this.pageData.datas.maxAmount, // 起存金额
          dizeng: this.pageData.datas.increaseAmount, // 递增金额
          chanpinbiaozhi: this.pageData.datas.appInfo.sameProductFlag, // 同一产品标识
          zhuanqubiaozhi: this.pageData.datas.appInfo.listAreaFlagLabel, // 榜单专区标识
          chanpinID: this.pageData.datas.id, // 产品id
          createTime: this.pageData.datas.gmtCreated, // 创建时间
          who: this.pageData.datas.operator, // 创建人
          biaoqian: [
            ...this.pageData.datas.activityTags,
            ...this.pageData.datas.productTags,
            ...this.pageData.datas.selfDefiningTags
          ], // 标签
          zhuancun: this.pageData.datas.renewal === "YES" ? "是" : "否", // 到期是否转存
          zhiqu: this.pageData.datas.withdrawalTimeLabel, // 支取时间
          fanhuan: this.pageData.datas.incomeReturnWayLabel, // 收益返还方式
          jianguan: this.pageData.datas.regulatoryPropertyLabel, // 监管属性
          chanpinmiaoshu: this.pageData.datas.description, // 产品描述
          fuxipinlv: this.pageData.datas.frequencyTypeLabel, // 付息频率
          shangjia: this.pageData.datas.appInfo.shelveStatusLabel, // 上架状态
          mianqian: this.pageData.datas.appInfo.visaInterviewLabel, // 是否面签
          tuijian:
            this.pageData.datas.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
          paihang: this.pageData.datas.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
          cunkuanbishu: this.pageData.datas.appInfo.defaultBuyNum, // 默认购买笔数
          cunkuanmorenjine: this.pageData.datas.appInfo.defaultAmount, // 默认购买金额
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
          h5Url: this.pageData.datas.appInfo.h5Url, // 产品H5链接
          qicunfanwei: this.pageData.datas.amountRangeExplain, // 起存范围说明
          duijie: this.pageData.datas.appInfo.connectionModeLabel // 银行对接方式
        };
        break;

      // 大额存款
      case "large_deposit":
        this.forEmit = "big";
        this.deleteType = "largeDeposit";
        this.show = [
          "interestRateAlias",
          "xilie",
          "qicunjine",
          "qicunfanwei", // 起存范围说明
          "dizeng",
          "deadlineAlias",
          "leixing",
          "leibie",
          "zhuancun", // 到期是否转存
          "zhiqu", // 支取时间
          "jianguan", // 监管属性
          "fuxipinlv", // 付息频率
          "bizhong",
          "chanpinmiaoshu",
          "contentVersion",
          "biaoqian",
          "jixi", // 计息方式
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "cunkuanbishu",
          "cunkuanmorenjine",
          "shiming", // 是否实名
          "qianyue",
          "guanzhuNum", // 默认关注数量
          "zhuanqubiaozhi",
          "duijie", // 银行对接方式
          "hezuoType", // 合作方式
          "shoufeilv", // 年收费率(%)
          "yinhangpage", // 显示银行过渡页
          "h5Url", // 产品H5链接
          "chanpinbiaozhi",
          "chanpinquyu", // 产品区域
          "cunru", // 存入规则
          "zhuanrang", // 转让规则
          "zhuanchu", // 转出规则
          "zhiquRule", // 支取规则
          "jisuan_day", // 利息计算天数
          "zhesuan", // 买方折算年化利率
          "suoding", // 锁定期
          "faxing_start", // 发行开始时间
          "faxing_end", // 发行结束时间
          "faxing_num", // 发行量
          "newPlayer", //  新手专享推荐理由
          "pintuan", //  拼团推荐理由
          "productTuiJian", //  产品推荐理由
          "canZhuanrang", // 是否可转让
          "canShuHui" // 是否可以赎回
        ];
        this.edit = [
          "deadlineAlias",
          "jigou_name",
          "interestRateAlias",
          "xilie",
          "qicunjineMin",
          "qicunjineMax",
          "qicunfanwei", // 起存范围说明
          "dizeng",
          "leixing",
          "leibie",
          "zhuancun", // 到期是否转存
          "zhiqu", // 支取时间
          "jianguan", // 监管属性
          "fuxipinlv", // 付息频率
          "bizhong",
          "bieming",
          "chanpinmiaoshu",
          "contentVersion",
          "biaoqian",
          "jixi", // 计息方式
          "shangjia",
          "mianqian",
          "tuijian",
          "paihang",
          "cunkuanbishu",
          "cunkuanmorenjine",
          "shiming", // 是否实名
          "qianyue",
          "guanzhuNum", // 默认关注数量
          "zhuanqubiaozhi",
          "duijie", // 银行对接方式
          "hezuoType", // 合作方式
          "shoufeilv", // 年收费率(%)
          "yinhangpage", // 显示银行过渡页
          "h5Url", // 产品H5链接
          "chanpinbiaozhi",
          "chanpinquyu", // 产品区域
          "productcunkuan", // 产品名称
          "cunru", // 存入规则
          "zhuanrang", // 转让规则
          "zhuanchu", // 转出规则
          "zhiquRule", // 支取规则
          "jisuan_day", // 利息计算天数
          "zhesuan", // 买方折算年化利率
          "suoding", // 锁定期
          "faxing_start", // 发行开始时间
          "faxing_end", // 发行结束时间
          "faxing_num", // 发行量
          "newPlayer", //  新手专享推荐理由
          "pintuan", //  拼团推荐理由
          "productTuiJian", //  产品推荐理由
          "canZhuanrang", // 是否可转让
          "canShuHui", // 是否可以赎回
          "lilvlist"
        ];
        this.forRule = [...this.edit];

        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.datas.id,
          skuId: this.pageData.datas.skuId,
          title: this.pageData.datas.name, // 上标题，产品名称
          institutionId: this.pageData.datas.institutionId, // 机构id
          institutionName: this.pageData.datas.institutionName, // 机构名称
          contentVersion: this.pageData.datas.contentVersion,
          bizhong: this.pageData.datas.currencyName, // 币种
          logo: this.pageData.datas.institutionLogo
            ? this.pageData.datas.institutionLogo
            : "",
          deadlineAlias: this.pageData.datas.deadlineAlias, // 期限别名
          seriesId: this.pageData.datas.seriesId, // 产品系列ID
          xilie: this.pageData.datas.seriesName, // 产品系列
          leibie: this.pageData.datas.typeAlias, // 存款类别
          chanpinquyu: this.pageData.datas.appInfo.areaName, // 产品区域
          interestRateAlias: this.pageData.datas.interestRateAlias, // 利率别名
          leixing: this.pageData.datas.productSubtypeLabel, // 产品类型
          qicunjine:
            this.pageData.datas.minAmount +
            " ~ " +
            this.pageData.datas.maxAmount, // 起存金额
          dizeng: this.pageData.datas.increaseAmount, // 递增金额
          chanpinbiaozhi: this.pageData.datas.appInfo.sameProductFlag, // 同一产品标识
          zhuanqubiaozhi: this.pageData.datas.appInfo.listAreaFlagLabel, // 榜单专区标识
          chanpinID: this.pageData.datas.id, // 产品id
          createTime: this.pageData.datas.gmtCreated, // 创建时间
          who: this.pageData.datas.operator, // 创建人
          biaoqian: [
            ...this.pageData.datas.activityTags,
            ...this.pageData.datas.productTags,
            ...this.pageData.datas.selfDefiningTags
          ], // 标签
          zhuancun: this.pageData.datas.renewal === "YES" ? "是" : "否", // 到期是否转存
          zhiqu: this.pageData.datas.withdrawalTimeLabel, // 支取时间
          jianguan: this.pageData.datas.regulatoryPropertyLabel, // 监管属性
          chanpinmiaoshu: this.pageData.datas.description, // 产品描述
          fuxipinlv: this.pageData.datas.frequencyTypeLabel, // 付息频率
          shangjia: this.pageData.datas.appInfo.shelveStatusLabel, // 上架状态
          mianqian: this.pageData.datas.appInfo.visaInterviewLabel, // 是否面签
          tuijian:
            this.pageData.datas.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
          paihang: this.pageData.datas.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
          cunkuanbishu: this.pageData.datas.appInfo.defaultBuyNum, // 默认购买笔数
          cunkuanmorenjine: this.pageData.datas.appInfo.defaultAmount, // 默认购买金额
          shiming:
            this.pageData.datas.appInfo.realNameAuth === "YES" ? "是" : "否", // 是否实名
          qianyue: this.pageData.datas.appInfo.signed === "YES" ? "是" : "否", // 是否签约
          guanzhuNum: this.pageData.datas.appInfo.defaultFlowNum, // 默认关注数量
          yinhangpage:
            this.pageData.datas.appInfo.showBankPage === "YES" ? "是" : "否", // 显示银行过渡页
          hezuoType: this.pageData.datas.appInfo.cooperationModeLabel, // 合作方式
          shoufeilv: this.pageData.datas.appInfo.yearRate, // 年收费率(%)
          h5Url: this.pageData.datas.appInfo.h5Url, // 产品H5链接
          jixi: this.pageData.datas.interestModeLabel, // 计息方式
          qicunfanwei: this.pageData.datas.amountRangeExplain, // 起存范围说明
          duijie: this.pageData.datas.appInfo.connectionModeLabel, // 银行对接方式

          cunru: this.pageData.datas.depositRule, // 存入规则
          zhuanrang: this.pageData.datas.transferRule, // 转让规则
          zhuanchu: this.pageData.datas.rollOutRule, // 转出规则
          zhiquRule: this.pageData.datas.drawRule, // 支取规则
          jisuan_day: this.pageData.datas.daysInterestCalculation, // 利息计算天数
          zhesuan: this.pageData.datas.buyerConvertYearRate, // 买方折算年化利率
          suoding: this.pageData.datas.lockinPeriod, // 锁定期
          faxing_start: this.pageData.datas.issueBeginDate, // 发行开始时间
          faxing_end: this.pageData.datas.issueEndDate, // 发行结束时间
          faxing_num: this.pageData.datas.issueNum, // 发行量
          newPlayer: this.pageData.datas.appInfo.noviceVipReason, //  新手专享推荐理由
          pintuan: this.pageData.datas.appInfo.assembleReason, //  拼团推荐理由
          productTuiJian: this.pageData.datas.appInfo.productReason, //  产品推荐理由
          canZhuanrang:
            this.pageData.datas.appInfo.isAllowTransfer === "YES" ? "是" : "否", // 是否可转让
          canShuHui:
            this.pageData.datas.appInfo.isAllowRedeem === "YES" ? "是" : "否" // 是否可以赎回
        };
        break;
      // 智能存款
      case "intelligent_deposit":
        this.forEmit = "zhineng";
        this.deleteType = "intelligent";
        this.show = [
          "xilie",
          "leibie",
          "leixing",
          "shangjia",
          "paihang",
          "mianqian",
          "jixi",
          "zhiqu",
          "qicunjine",
          "dizeng",
          "zhuancun",
          "biaoqian",
          "chanpinmiaoshu",
          "tuijian",
          "cunkuanbishu",
          "cunkuanmorenjine",
          "chanpinbiaozhi",
          "zhuanqubiaozhi",
          "deadlineAlias",
          "qicunfanwei",
          "interestRateAlias",
          "jianguan",
          "bizhong",
          "contentVersion",
          "shiming",
          "qianyue",
          "guanzhuNum",
          "hezuoType",
          "autoUpDown",
          "duijie",
          "h5Url",
          "chanpinquyu",
          "yinhangpage",
          "shoufeilv",
          "fuxipinlv",
          "shengyuED"
        ];
        this.edit = [
          "jigou_name",
          "xilie",
          "productcunkuan",
          "bieming",
          "jixi", // 计息方式
          "biaoqian",
          "dizeng",
          "zhuancun",
          "zhiqu",
          "cunkuanbishu",
          "cunkuanmorenjine",
          "chanpinbiaozhi",
          "chanpinmiaoshu",
          "lilvlist",
          "interestRateAlias",
          "shangjia",
          "mianqian",
          "tuijian",
          "deadlineAlias",
          "paihang",
          "qicunjineMin",
          "qicunjineMax",
          "qicunfanwei",
          "interestRateAlias",
          "jianguan",
          "fuxipinlv",
          "bizhong",
          "contentVersion",
          "zhuanqubiaozhi",
          "shiming",
          "qianyue",
          "guanzhuNum",
          "hezuoType",
          "autoUpDown",
          "duijie",
          "h5Url",
          "chanpinquyu",
          "yinhangpage",
          "shoufeilv",
          "shengyuED"
        ];
        this.forRule = [...this.edit];
        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.datas.id,
          skuId: this.pageData.datas.skuId,
          title: this.pageData.datas.name, // 上标题，产品名称
          institutionId: this.pageData.datas.institutionId, // 机构id
          institutionName: this.pageData.datas.institutionName, // 机构名称
          contentVersion: this.pageData.datas.contentVersion,
          bizhong: this.pageData.datas.currencyName, // 币种
          jixi: this.pageData.datas.interestModeLabel, // 计息方式
          chanpinquyu: this.pageData.datas.appInfo.areaName, // 产品区域
          interestRateAlias: this.pageData.datas.interestRateAlias, // 利率别名
          qicunfanwei: this.pageData.datas.amountRangeExplain, // 起存范围说明
          jianguan: this.pageData.datas.regulatoryPropertyLabel, // 监管属性
          duijie: this.pageData.datas.appInfo.connectionModeLabel, // 银行对接方式
          h5Url: this.pageData.datas.appInfo.h5Url, // 产品H5链接
          logo: this.pageData.datas.institutionLogo
            ? this.pageData.datas.institutionLogo
            : "",
          seriesId: this.pageData.datas.seriesId, // 产品系列ID
          xilie: this.pageData.datas.seriesName, // 产品系列
          leibie: this.pageData.datas.typeAlias, // 存款类别
          deadlineAlias: this.pageData.datas.deadlineAlias, // 期限别名
          leixing: this.pageData.datas.productSubtypeLabel, // 产品类型
          shoufeilv: this.pageData.datas.appInfo.yearRate,
          shengyuED: this.pageData.datas.surplusQuotaLabel,
          qicunjine:
            this.pageData.datas.minAmount +
            " ~ " +
            this.pageData.datas.maxAmount, // 起存金额
          dizeng: this.pageData.datas.increaseAmount, // 递增金额
          chanpinbiaozhi: this.pageData.datas.appInfo.sameProductFlag, // 同一产品标识
          zhuanqubiaozhi: this.pageData.datas.appInfo.listAreaFlagLabel, // 榜单专区标识
          chanpinID: this.pageData.datas.id, // 产品id
          createTime: this.pageData.datas.gmtCreated, // 创建时间
          who: this.pageData.datas.operator, // 创建人
          biaoqian: [
            ...this.pageData.datas.activityTags,
            ...this.pageData.datas.productTags,
            ...this.pageData.datas.selfDefiningTags
          ], // 标签
          zhuancun: this.pageData.datas.renewal === "YES" ? "是" : "否", // 到期是否转存
          zhiqu: this.pageData.datas.withdrawalTimeLabel, // 支取时间
          chanpinmiaoshu: this.pageData.datas.description, // 产品描述
          shangjia: this.pageData.datas.appInfo.shelveStatusLabel, // 上架状态
          mianqian: this.pageData.datas.appInfo.visaInterviewLabel, // 是否面签
          tuijian:
            this.pageData.datas.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
          paihang: this.pageData.datas.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
          cunkuanbishu: this.pageData.datas.appInfo.defaultBuyNum, // 默认存款笔数
          cunkuanmorenjine: this.pageData.datas.appInfo.defaultAmount, // 默认存款金额
          shiming:
            this.pageData.datas.appInfo.realNameAuth === "YES" ? "是" : "否", // 是否实名
          qianyue: this.pageData.datas.appInfo.signed === "YES" ? "是" : "否", // 是否签约
          guanzhuNum: this.pageData.datas.appInfo.defaultFlowNum, // 默认关注数量
          yinhangpage:
            this.pageData.datas.appInfo.showBankPage === "YES" ? "是" : "否", // 显示银行过渡页
          hezuoType: this.pageData.datas.appInfo.cooperationModeLabel, // 合作方式
          fuxipinlv: this.pageData.datas.frequencyTypeLabel, // 付息频率
          autoUpDown:
            this.pageData.datas.appInfo.autoShelve === "YES" ? "是" : "否" // 自动上架
        };

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
          "fuxipinlv", // 付息频率
          "qixian",
          "qicunjine",
          "dizeng",
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
          "cunkuanbishu",
          "cunkuanmorenjine",
          "tuijian",
          "jianguan",
          "zhuanqubiaozhi",
          "paihang",
          "chanpinbiaozhi",
          "interestRateAlias",
          "deadlineAlias",
          "qicunfanwei",
          "contentVersion",
          "bizhong",
          "guanzhuNum",
          "shiming",
          "qianyue",
          "hezuoType",
          "autoUpDown",
          "duijie",
          "h5Url",
          "chanpinquyu",
          "shoufeilv",
          "yinhangpage"
        ];
        this.edit = [
          "jigou_name",
          "xilie",
          "productcunkuan",
          "qicunjineMin",
          "qicunjineMax",
          "qicunfanwei",
          "fuxipinlv", // 付息频率
          "bieming",
          "lilv",
          "maxLilv",
          "daoqiLilv",
          "shengyuED",
          "qishou",
          "qixi",
          "fengxian",
          "jianguan",
          "dizeng",
          "biaoqian",
          "chanpinmiaoshu",
          "shangjia",
          "mianqian",
          "cunkuanbishu",
          "cunkuanmorenjine",
          "tuijian",
          "paihang",
          "chanpinbiaozhi",
          "zhuanqubiaozhi",
          "interestRateAlias",
          "deadlineAlias",
          "bizhong",
          "guanzhuNum",
          "shiming",
          "qianyue",
          "hezuoType",
          "autoUpDown",
          "duijie",
          "h5Url",
          "chanpinquyu",
          "shoufeilv",
          "yinhangpage",
          "contentVersion"
        ];
        this.forRule = [...this.edit];
        this.pageInfos = {
          // 展示页面详情数据
          id: this.pageData.datas.id,
          skuId: this.pageData.datas.skuId,
          title: this.pageData.datas.name, // 上标题，产品名称
          institutionId: this.pageData.datas.institutionId, // 机构id
          institutionName: this.pageData.datas.institutionName, // 机构名称
          contentVersion: this.pageData.datas.contentVersion,
          bizhong: this.pageData.datas.currencyName, // 币种
          chanpinquyu: this.pageData.datas.appInfo.areaName, // 产品区域
          qicunjine:
            this.pageData.datas.minAmount +
            " ~ " +
            this.pageData.datas.maxAmount, // 起存金额
          logo: this.pageData.datas.institutionLogo
            ? this.pageData.datas.institutionLogo
            : "",
          seriesId: this.pageData.datas.seriesId, // 产品系列ID
          xilie: this.pageData.datas.seriesName, // 产品系列
          leibie: this.pageData.datas.typeAlias, // 存款类别
          leixing: this.pageData.datas.productSubtypeLabel, // 产品类型
          lilv: this.pageData.datas.interest.interestRate, // 利率
          interestRateAlias: this.pageData.datas.interestRateAlias, // 利率别名
          maxLilv: this.pageData.datas.interest.maxInterestRate, // 最高利率
          daoqiLilv: this.pageData.datas.interest.expireInterestRate, // 到期利率
          deadlineAlias: this.pageData.datas.deadlineAlias, // 期限别名
          qixian: this.pageData.datas.interest.fromTerm, // 投资期限
          shengyuED: this.pageData.datas.surplusQuotaLabel, // 剩余额度
          fengxian: this.pageData.datas.riskLevelLabel, // 风险等级
          jianguan: this.pageData.datas.regulatoryPropertyLabel, // 监管属性
          dizeng: this.pageData.datas.increaseAmount, // 递增金额
          chanpinmiaoshu: this.pageData.datas.description, // 产品描述
          shangjia: this.pageData.datas.appInfo.shelveStatusLabel, // 上架状态
          mianqian: this.pageData.datas.appInfo.visaInterviewLabel, // 是否面签
          tuijian:
            this.pageData.datas.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
          paihang: this.pageData.datas.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
          cunkuanbishu: this.pageData.datas.appInfo.defaultBuyNum, // 默认购买笔数
          cunkuanmorenjine: this.pageData.datas.appInfo.defaultAmount, // 默认购买金额
          chanpinbiaozhi: this.pageData.datas.appInfo.sameProductFlag, // 同一产品标识
          zhuanqubiaozhi: this.pageData.datas.appInfo.listAreaFlagLabel, // 榜单专区标识
          chanpinID: this.pageData.datas.id, // 产品id
          createTime: this.pageData.datas.gmtCreated, // 创建时间
          who: this.pageData.datas.operator, // 创建人
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
          h5Url: this.pageData.datas.appInfo.h5Url, // 产品H5链接
          duijie: this.pageData.datas.appInfo.connectionModeLabel,
          qicunfanwei: this.pageData.datas.amountRangeExplain,
          fuxipinlv: this.pageData.datas.frequencyTypeLabel, // 付息频率
          biaoqian: [
            ...this.pageData.datas.activityTags,
            ...this.pageData.datas.productTags,
            ...this.pageData.datas.selfDefiningTags
          ] // 标签
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

        break;
    }
  },
  mounted() {
    // 动态添加验证项
    let rule = Object.keys(this.Rules);
    this.forRule.forEach(str => {
      if (rule.includes(str)) {
        this.rules[str] = this.Rules[str];
      }
    });
    // 调整描述里的图片居中问题
    let digui = () => {
      if (this.diguiTime < 5) {
        let kk = document.querySelectorAll(".isHidden");
        kk.forEach(tar => {
          let img = [...tar.getElementsByTagName("img")];
          let father_width = tar.offsetWidth;
          img.forEach(im => {
            let child_width = im.offsetWidth;
            if (child_width > father_width) {
              im.style.width = "100%";
            }
          });
        });
        setTimeout(digui, 100);
      }
      this.diguiTime++;
    };
    setTimeout(digui, 100);
  },
  methods: {
    // 上下架变更时验证可否变更
    // addTishi() {
    //   this.$api
    //     .get_where({
    //       vm: this,
    //       data: this.pageInfos.id
    //     })
    //     .then(res => {
    //       if (res && !res.data) {
    //         return false; // 可变更
    //       } else {
    //         let state = "" + this.ruleForm.shangjia;
    //         this.$message.error(`该产品为${res.data}，暂不支持编辑！`);
    //       }
    //     });
    // },
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
        // 纯债基金
        case "pure_debt_fund":
          this.get_chunzhai_edit_data();
          break;
        // 货币基金管理
        case "money_fund":
          this.get_huobi_edit_data();
          break;
        // 理财管理
        case "wmp":
          this.get_licai_edit_data();
          break;
        // 保险
        case "wmp_insurance":
          this.get_baoxian_edit_data();
          break;
        // 活期存款
        case "demand_deposit":
          this.get_huoqi_edit_data();
          break;
        // 定期存款
        case "time_deposit":
          this.get_dingqi_edit_data();
          break;

        // 大额存款
        case "large_deposit":
          this.get_big_edit_data();
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
    // 获取纯债基金详情页面点击编辑时的数据
    get_chunzhai_edit_data() {
      this.$api
        .getChunZhaiInfo({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          this.serverData = res.data;
          this.ruleForm = {
            chanpinquyu: this.serverData.appInfo.areaCode, // 产品区域
            bizhong: this.serverData.currencyCode,
            product: this.serverData.name,
            daima: this.serverData.code,
            jigou_name: this.serverData.institutionId,
            jijingongsi: this.serverData.fundHouseId,
            jiaoyizhuangtai: this.serverData.status,
            shangjia: this.serverData.appInfo.shelveStatus,
            mianqian: this.serverData.appInfo.visaInterview,
            tuijian: this.serverData.appInfo.recommend === "YES" ? "是" : "否",
            paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否",
            goumaibishu: this.serverData.appInfo.defaultBuyNum,
            goumaimorenjine: this.serverData.appInfo.defaultAmount,
            shiming:
              this.serverData.appInfo.realNameAuth === "YES" ? "是" : "否",
            h5Url: this.serverData.appInfo.h5Url,
            contentVersion: this.serverData.contentVersion,
            yinhangpage:
              this.serverData.appInfo.showBankPage === "YES" ? "是" : "否"
          };
          this.bianjieDialog = true;
        });
    },
    // 获取活期存款编辑数据
    get_huoqi_edit_data() {
      this.$api
        .huoqi_edit_info({
          vm: this,
          data: this.pageData.id
        })
        .then(res => {
          if (res) {
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
              actBiaoQian: this.serverData.activityTags.map(tar => tar.id), // 活动标签
              selfBiaoQian: this.serverData.selfDefiningTags.map(tar => tar.id), // 自定义标签
              chanpinBiaoQian: this.serverData.productTags.map(tar => tar.id), // 产品标签
              dizeng: this.serverData.increaseAmount, // 递增金额
              chanpinmiaoshu: this.serverData.description, // 产品描述
              chanpinbiaozhi: this.serverData.appInfo.sameProductFlag, // 同一产品标识
              shangjia: this.serverData.appInfo.shelveStatus, // 上架状态
              mianqian: this.serverData.appInfo.visaInterview, // 是否面签
              tuijian:
                this.serverData.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              goumaibishu: this.serverData.appInfo.defaultBuyNum, // 默认购买笔数
              goumaimorenjine: this.serverData.appInfo.defaultAmount, // 默认购买金额
              zhuanqubiaozhi: this.serverData.appInfo.listAreaFlag, // 榜单专区标识
              qicunjineMin: this.serverData.minAmount, // 最小起购金额
              qicunjineMax: this.serverData.maxAmount, // 最大起购金额
              qicunfanwei: this.serverData.amountRangeExplain, // 起购范围说明
              jianguan: this.serverData.regulatoryProperty, // 监管属性
              fuxipinlv: this.serverData.frequencyType, // 付息频率
              bizhong: this.serverData.currencyCode, // 币种
              contentVersion: this.serverData.contentVersion, // 内容版本号
              shiming:
                this.serverData.appInfo.realNameAuth === "YES" ? "是" : "否", // 是否推荐
              guanzhuNum: this.serverData.appInfo.defaultFlowNum, // 默认关注数量
              hezuoType: this.serverData.appInfo.cooperationMode, // 合作方式
              shoufeilv: this.serverData.appInfo.yearRate, // 年收费率
              yinhangpage:
                this.serverData.appInfo.showBankPage === "YES" ? "是" : "否", // 是否推荐
              duijie: this.serverData.appInfo.connectionMode, // 银行对接方式
              h5Url: this.serverData.appInfo.h5Url, // 最小起购金额
              chanpinquyu: this.serverData.appInfo.areaCode, // 最小起购金额
              qianyue: this.serverData.appInfo.signed === "YES" ? "是" : "否" // 是否推荐
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
          if (res) {
            this.serverData = res.data;
            this.change_xilie(this.serverData.institutionId);
            // 点击编辑按钮
            this.ruleForm = {
              jigou_name: this.serverData.institutionId, // 机构名称
              xilie: this.serverData.seriesId, // 产品系列
              productcunkuan: this.serverData.name, // 存款产品名称
              cunkuanbishu: this.serverData.appInfo.defaultBuyNum, // 默认购买笔数
              cunkuanmorenjine: this.serverData.appInfo.defaultAmount, // 默认购买金额
              dizeng: this.serverData.increaseAmount, // 递增金额
              chanpinbiaozhi: this.serverData.appInfo.sameProductFlag, // 同一产品标识
              bieming: this.serverData.typeAlias, // 产品类型(别名)
              zhuancun: this.serverData.renewal === "YES" ? "是" : "否", // 到期后是否转存
              zhiqu: this.serverData.withdrawalTime, // 支取时间
              fanhuan: this.serverData.incomeReturnWay, // 收益返还方式
              jianguan: this.serverData.regulatoryProperty, // 监管属性
              fuxipinlv: this.serverData.frequencyType, // 付息频率
              chanpinmiaoshu: this.serverData.description, // 产品描述
              shangjia: this.serverData.appInfo.shelveStatus, // 上架状态
              mianqian: this.serverData.appInfo.visaInterview, // 是否面签
              shengyuED: this.serverData.surplusQuota, // 剩余额度
              tuijian:
                this.serverData.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              zhuanqubiaozhi: this.serverData.appInfo.listAreaFlag, // 榜单专区标识
              duijie: this.serverData.appInfo.connectionMode, // 银行对接方式
              hezuoType: this.serverData.appInfo.cooperationMode, // 银行合作方式
              shoufeilv: this.serverData.appInfo.yearRate, // 年收费率
              yinhangpage:
                this.serverData.appInfo.showBankPage === "YES" ? "是" : "否", // 显示银行过渡页
              autoUpDown:
                this.serverData.appInfo.autoShelve === "YES" ? "是" : "否", // 自动上架
              h5Url: this.serverData.appInfo.h5Url, // H5链接
              qianyue: this.serverData.appInfo.signed === "YES" ? "是" : "否", // 是否签约
              guanzhuNum: this.serverData.appInfo.defaultFlowNum, // 默认关注数量
              shiming:
                this.serverData.appInfo.realNameAuth === "YES" ? "是" : "否", // 是否实名
              chanpinquyu: this.pageData.datas.appInfo.areaCode, // 产品区域
              actBiaoQian: this.serverData.activityTags.map(tar => tar.id), // 活动标签
              selfBiaoQian: this.serverData.selfDefiningTags.map(tar => tar.id), // 自定义标签
              chanpinBiaoQian: this.serverData.productTags.map(tar => tar.id), // 产品标签
              qishou: this.serverData.riskLevelLabel, // 起售日期
              qixi: this.serverData.valueDate, // 起息日期
              fengxian: this.serverData.riskLevel, // 风险等级
              lilv: [],
              interestRateAlias: this.serverData.interestRateAlias, // 利率别名
              deadlineAlias: this.serverData.deadlineAlias, // 期限别名
              bizhong: this.serverData.currencyCode, // 币种
              contentVersion: this.serverData.contentVersion, // 内容版本号
              qicunjineMin: this.serverData.minAmount, // 最小起购金额
              qicunjineMax: this.serverData.maxAmount, // 最大起购金额
              qicunfanwei: this.serverData.amountRangeExplain // 起购范围说明
            };
            this.ruleForm.lilv = this.serverData.interestRates.map(item => {
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

            this.addLiLvProp = {
              isInput: false, // 记录表单是否发生数据输入
              lilv_data: this.ruleForm.lilv,
              num: this.ruleForm.lilv.length + 1
            };
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
          if (res) {
            this.serverData = res.data;
            this.change_xilie(this.serverData.institutionId);
            // 点击编辑按钮
            this.ruleForm = {
              jigou_name: this.serverData.institutionId, // 机构名称
              xilie: this.serverData.seriesId, // 产品系列
              productcunkuan: this.serverData.name, // 存款产品名称
              dizeng: this.serverData.increaseAmount, // 递增金额
              interestRateAlias: this.serverData.interestRateAlias, // 利率别名
              chanpinbiaozhi: this.serverData.appInfo.sameProductFlag, // 同一产品标识
              bieming: this.serverData.typeAlias, // 产品类型(别名)
              zhuancun: this.serverData.renewal === "YES" ? "是" : "否", // 到期后是否转存
              zhiqu: this.serverData.withdrawalTime, // 支取时间
              jixi: this.serverData.interestMode, // 计息方式
              chanpinmiaoshu: this.serverData.description, // 产品描述
              shangjia: this.serverData.appInfo.shelveStatus, // 上架状态
              shoufeilv: this.serverData.appInfo.yearRate, // 年收费率
              mianqian: this.serverData.appInfo.visaInterview, // 是否面签
              shengyuED: this.serverData.surplusQuota, // 剩余额度
              tuijian:
                this.serverData.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              zhuanqubiaozhi: this.serverData.appInfo.listAreaFlag, // 榜单专区标识
              cunkuanbishu: this.serverData.appInfo.defaultBuyNum, // 默认购买笔数
              cunkuanmorenjine: this.serverData.appInfo.defaultAmount, // 默认购买金额
              actBiaoQian: this.serverData.activityTags.map(tar => tar.id), // 活动标签
              selfBiaoQian: this.serverData.selfDefiningTags.map(tar => tar.id), // 自定义标签
              chanpinBiaoQian: this.serverData.productTags.map(tar => tar.id), // 产品标签
              deadlineAlias: this.serverData.deadlineAlias,
              lilv: [],
              chanpinquyu: this.pageData.datas.appInfo.areaCode, // 产品区域
              guanzhuNum: this.serverData.appInfo.defaultFlowNum, // 默认关注数量
              fuxipinlv: this.serverData.frequencyType, // 付息频率
              bizhong: this.serverData.currencyCode, // 币种
              contentVersion: this.serverData.contentVersion, // 内容版本号
              qicunjineMin: this.serverData.minAmount, // 最小起购金额
              qicunjineMax: this.serverData.maxAmount, // 最大起购金额
              qicunfanwei: this.serverData.amountRangeExplain, // 起购范围说明
              duijie: this.serverData.appInfo.connectionMode, // 银行对接方式
              hezuoType: this.serverData.appInfo.cooperationMode, // 银行合作方式
              yinhangpage:
                this.serverData.appInfo.showBankPage === "YES" ? "是" : "否", // 显示银行过渡页
              autoUpDown:
                this.serverData.appInfo.autoShelve === "YES" ? "是" : "否", // 自动上架
              h5Url: this.serverData.appInfo.h5Url, // H5链接
              qianyue: this.serverData.appInfo.signed === "YES" ? "是" : "否", // 是否签约
              jianguan: this.serverData.regulatoryProperty, // 监管属性
              shiming:
                this.serverData.appInfo.realNameAuth === "YES" ? "是" : "否" // 是否实名
            };

            this.ruleForm.lilv = this.serverData.interestRates.map(item => {
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

            this.addLiLvProp = {
              isInput: false, // 记录表单是否发生数据输入
              lilv_data: this.ruleForm.lilv,
              num: this.ruleForm.lilv.length + 1
            };
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
          if (res) {
            this.serverData = res.data;
            this.change_xilie(this.serverData.institutionId);
            // 点击编辑按钮
            this.ruleForm = {
              contentVersion: this.serverData.contentVersion,
              jigou_name: this.serverData.institutionId, // 机构名称
              xilie: this.serverData.seriesId, // 产品系列
              productcunkuan: this.serverData.name, // 存款产品名称
              dizeng: this.serverData.increaseAmount, // 递增金额
              bieming: this.serverData.typeAlias, // 产品类型(别名)
              interestRateAlias: this.serverData.interestRateAlias, // 利率别名
              deadlineAlias: this.serverData.deadlineAlias, // 期限别名
              lilv: this.serverData.interest.interestRate, // 利率
              maxLilv: this.serverData.interest.maxInterestRate, // 最高利率
              daoqiLilv: this.serverData.interest.expireInterestRate, // 到期利率
              fuxipinlv: this.serverData.frequencyType, // 付息频率
              shengyuED: this.serverData.surplusQuota, // 剩余额度
              fengxian: this.serverData.riskLevel, // 风险等级
              jianguan: this.serverData.regulatoryProperty, // 监管属性
              qixian: "", // 投资期限
              qishou: this.serverData.sellingDate, // 起售日期
              qixi: this.serverData.valueDate, // 起息日期
              guanzhuNum: this.serverData.appInfo.defaultFlowNum, // 默认关注数量
              bizhong: this.serverData.currencyCode, // 币种
              qicunjineMin: this.serverData.minAmount, // 最小起购金额
              qicunjineMax: this.serverData.maxAmount, // 最大起购金额
              qicunfanwei: this.serverData.amountRangeExplain, // 起购范围说明
              shiming:
                this.serverData.appInfo.realNameAuth === "YES" ? "是" : "否", // 是否实名
              duijie: this.serverData.appInfo.connectionMode, // 银行对接方式
              hezuoType: this.serverData.appInfo.cooperationMode, // 银行合作方式
              yinhangpage:
                this.serverData.appInfo.showBankPage === "YES" ? "是" : "否", // 显示银行过渡页
              autoUpDown:
                this.serverData.appInfo.autoShelve === "YES" ? "是" : "否", // 自动上架
              h5Url: this.serverData.appInfo.h5Url, // H5链接
              qianyue: this.serverData.appInfo.signed === "YES" ? "是" : "否", // 是否签约
              shoufeilv: this.serverData.appInfo.yearRate, // 年收费率
              chanpinquyu: this.pageData.datas.appInfo.areaCode, // 产品区域
              chanpinmiaoshu: this.serverData.description, // 产品描述
              shangjia: this.pageData.datas.appInfo.shelveStatus, // 上架状态
              mianqian: this.pageData.datas.appInfo.visaInterview, // 是否面签
              tuijian:
                this.serverData.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
              paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
              cunkuanbishu: this.serverData.appInfo.defaultBuyNum, // 默认存款笔数
              cunkuanmorenjine: this.serverData.appInfo.defaultAmount, // 默认存款金额
              zhuanqubiaozhi: this.serverData.appInfo.listAreaFlag, // 榜单专区标识
              chanpinbiaozhi: this.serverData.appInfo.sameProductFlag, // 同一产品标识
              actBiaoQian: this.serverData.activityTags.map(tar => tar.id), // 活动标签
              selfBiaoQian: this.serverData.selfDefiningTags.map(tar => tar.id), // 自定义标签
              chanpinBiaoQian: this.serverData.productTags.map(tar => tar.id) // 产品标签
            };
            this.setQixian();
            this.bianjieDialog = true;
          }
        });
    },
    // 根据起息日期自动计算投资期限
    setQixian() {
      if (this.ruleForm.qixi && this.ruleForm.qixi.length) {
        let cha =
          new Date(this.ruleForm.qixi[1].split(" ")[0]).getTime() -
          new Date(this.ruleForm.qixi[0].split(" ")[0]).getTime();
        this.ruleForm.qixian = cha / (1000 * 60 * 60 * 24);
      } else {
        this.ruleForm.qixian = null;
      }
    },
    // 获取货币基金编辑数据
    get_huobi_edit_data() {
      this.$api
        .get_huobi_edit_data({
          vm: this,
          data: this.pageInfos.id
        })
        .then(res => {
          this.serverData = res.data;

          this.ruleForm = {
            shangjia: this.serverData.appInfo.shelveStatus,
            mianqian: this.serverData.appInfo.visaInterview,
            tuijian: this.serverData.appInfo.recommend === "YES" ? "是" : "否",
            paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否",
            qigou: this.serverData.minAmount,
            product: this.serverData.name,
            jigou_name: this.serverData.institutionId,
            jijingongsi: this.serverData.fundHouseId,
            shuhui: "" + this.serverData.accountingDate,
            suoding: this.serverData.lockinPeriod,
            mairu: this.serverData.buyIn,
            shouxufei: this.serverData.commission,
            chanpinmiaoshu: this.serverData.description,
            shouyiguize: this.serverData.yieldRule,
            chanpinbiaozhi: this.serverData.appInfo.sameProductFlag,
            guanzhuNum: this.serverData.appInfo.defaultFlowNum,
            goumaibishu: this.serverData.appInfo.defaultBuyNum,
            goumaimorenjine: this.serverData.appInfo.defaultAmount,
            zhuanqubiaozhi: this.serverData.appInfo.listAreaFlag,
            bizhong: this.serverData.currencyCode,
            chanpinquyu: this.serverData.appInfo.areaCode,
            qianyue: this.serverData.appInfo.signed === "YES" ? "是" : "否",
            contentVersion: this.serverData.contentVersion,
            yinhangpage:
              this.serverData.appInfo.showBankPage === "YES" ? "是" : "否",
            h5Url: this.serverData.appInfo.h5Url,
            shiming:
              this.serverData.appInfo.realNameAuth === "YES" ? "是" : "否",
            hezuoType: this.serverData.appInfo.cooperationMode,
            shoufeilv: this.serverData.appInfo.yearRate,
            actBiaoQian: this.serverData.activityTags.map(tar => tar.id), // 活动标签
            selfBiaoQian: this.serverData.selfDefiningTags.map(tar => tar.id) // 自定义标签
          };
          this.bianjieDialog = true;
        });
    },
    // 获取理财管理编辑数据
    get_licai_edit_data() {
      this.$api
        .getLiCaiInfoData({
          vm: this,
          data: this.pageData.forProduct.id
        })
        .then(res => {
          if (res) {
            this.serverData = res.data;
            this.change_xilie(this.serverData.institutionId);
            this.ruleForm = {
              jigou_name: res.data.institutionId,
              xilie: res.data.seriesId,
              productjijin: res.data.name,
              yuqishouyi: res.data.interestRate,
              fengxian: res.data.riskLevel,
              shengyuED: res.data.surplusQuota,
              qixiri: res.data.valueDate,
              qixian: res.data.deadline,
              licairiqi: res.data.managementDate,
              muji: res.data.raiseDate,
              chanpinmiaoshu: res.data.description,
              jianguan: res.data.regulatoryProperty,
              chanpinbiaozhi: res.data.appInfo.sameProductFlag,
              shangjia: this.serverData.appInfo.shelveStatus,
              mianqian: this.serverData.appInfo.visaInterview,
              tuijian:
                this.serverData.appInfo.recommend === "YES" ? "是" : "否",
              paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否",
              goumaibishu: res.data.appInfo.defaultBuyNum,
              goumaimorenjine: res.data.appInfo.defaultAmount,
              zhuanqubiaozhi: res.data.appInfo.listAreaFlag,
              guanzhuNum: res.data.appInfo.defaultFlowNum,
              productFeature: res.data.productFeature,
              qianyue: this.serverData.appInfo.signed === "YES" ? "是" : "否",
              contentVersion: this.serverData.contentVersion,
              yinhangpage:
                this.serverData.appInfo.showBankPage === "YES" ? "是" : "否",
              h5Url: this.serverData.appInfo.h5Url,
              shiming:
                this.serverData.appInfo.realNameAuth === "YES" ? "是" : "否",
              hezuoType: this.serverData.appInfo.cooperationMode,
              shoufeilv: this.serverData.appInfo.yearRate,
              qigou: this.serverData.minAmount,
              dizeng: this.serverData.increaseAmount,
              autoUpDown:
                this.serverData.appInfo.autoShelve === "YES" ? "是" : "否",
              chanpinquyu: this.pageData.forProduct.appInfo.areaCode,
              duijie: this.pageData.forProduct.appInfo.connectionMode,
              bizhong: this.pageData.forProduct.currencyCode,
              actBiaoQian: this.serverData.activityTags.map(tar => tar.id), // 活动标签
              selfBiaoQian: this.serverData.selfDefiningTags.map(tar => tar.id) // 自定义标签
            };
            this.bianjieDialog = true;
          }
        });
    },
    // 获取保险编辑数据
    get_baoxian_edit_data() {
      this.serverData = this.pageData.forProduct;
      this.change_xilie(this.serverData.institutionId);

      this.ruleForm = {
        productHome: this.serverData.productCompanyName,
        jijingongsi: this.serverData.fundHouseId,
        jigou_name: this.serverData.institutionId,
        xilie: this.serverData.seriesId,
        product: this.serverData.name,
        yuqishouyi: this.serverData.interestRate,
        fengxian: this.serverData.riskLevel,
        shengyuED: this.serverData.surplusQuota,
        qixian: this.serverData.deadline,
        chanpinmiaoshu: this.serverData.description,
        jianguan: this.serverData.regulatoryProperty,
        chanpinbiaozhi: this.serverData.appInfo.sameProductFlag,
        shangjia: this.serverData.appInfo.shelveStatus,
        mianqian: this.serverData.appInfo.visaInterview,
        tuijian: this.serverData.appInfo.recommend === "YES" ? "是" : "否",
        paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否",
        goumaibishu: this.serverData.appInfo.defaultBuyNum,
        goumaimorenjine: this.serverData.appInfo.defaultAmount,
        zhuanqubiaozhi: this.serverData.appInfo.listAreaFlag,
        guanzhuNum: this.serverData.appInfo.defaultFlowNum,
        qianyue: this.serverData.appInfo.signed === "YES" ? "是" : "否",
        contentVersion: this.serverData.contentVersion,
        yinhangpage:
          this.serverData.appInfo.showBankPage === "YES" ? "是" : "否",
        h5Url: this.serverData.appInfo.h5Url,
        shiming: this.serverData.appInfo.realNameAuth === "YES" ? "是" : "否",
        hezuoType: this.serverData.appInfo.cooperationMode,
        shoufeilv: this.serverData.appInfo.yearRate,
        qigou: this.serverData.minAmount,
        dizeng: this.serverData.increaseAmount,
        chanpinquyu: this.pageData.forProduct.appInfo.areaCode,
        duijie: this.pageData.forProduct.appInfo.connectionMode,
        bizhong: this.pageData.forProduct.currencyCode,
        actBiaoQian: this.serverData.activityTags.map(tar => tar.id), // 活动标签
        selfBiaoQian: this.serverData.selfDefiningTags.map(tar => tar.id), // 自定义标签
        qixiri: this.serverData.managementDate[0],
        daoqiri: this.serverData.managementDate[1],
        qici: this.serverData.period,
        shouyiType: this.serverData.revenueType,
        minShuHui: this.serverData.minRedemptionAmount,
        maxShuHui: this.serverData.maxRedemptionAmount,
        dayShuHui: this.serverData.singleDayAmount,
        eduBi: this.serverData.surplusAmountPercentage,
        qujianMax: this.serverData.maxReturnInterval,
        jixiBase: this.serverData.interestBasis,
        qingsuan: this.serverData.settlementDay,
        canShenGou:
          this.serverData.appInfo.isAllowPurchase === "YES" ? "是" : "否",
        canShuHui:
          this.serverData.appInfo.isAllowRedeem === "YES" ? "是" : "否",
        newPlayer: this.serverData.appInfo.noviceVipReason,
        pintuan: this.serverData.appInfo.assembleReason,
        productTuiJian: this.serverData.appInfo.productReason,
        netAssetValue: this.serverData.insuranceFinancing.netAssetValue,
        netAccumulateValue: this.serverData.insuranceFinancing
          .netAccumulateValue,
        bottomGuardYield: this.serverData.insuranceFinancing.bottomGuardYield,
        onThe7thOfTheYearYield: this.serverData.insuranceFinancing
          .onThe7thOfTheYearYield,
        thousandsOfYearsYields: this.serverData.insuranceFinancing
          .thousandsOfYearsYields,
        zhuancun: this.serverData.renewal === "YES" ? "是" : "否"
      };

      this.bianjieDialog = true;
    },
    // 获取大额存单
    get_big_edit_data() {
      this.serverData = this.pageData.datas;
      this.change_xilie(this.serverData.institutionId);

      this.ruleForm = {
        deadlineAlias: this.serverData.deadlineAlias, // 期限别名
        // 展示页面详情数据
        bieming: this.serverData.typeAlias, // 产品类型(别名)
        productcunkuan: this.serverData.name, // 存款产品名称
        interestRateAlias: this.serverData.interestRateAlias, // 利率别名
        xilie: this.serverData.seriesId, // 产品系列
        jigou_name: this.serverData.institutionId, // 机构名称
        qicunjineMin: this.serverData.minAmount, // 最小起购金额
        qicunjineMax: this.serverData.maxAmount, // 最大起购金额
        qicunfanwei: this.serverData.amountRangeExplain, // 起购范围说明
        dizeng: this.serverData.increaseAmount, // 递增金额
        leibie: this.pageData.datas.typeAlias, // 存款类别
        zhuancun: this.serverData.renewal === "YES" ? "是" : "否", // 到期后是否转存
        zhiqu: this.serverData.withdrawalTime, // 支取时间
        jianguan: this.serverData.regulatoryProperty, // 监管属性
        fuxipinlv: this.serverData.frequencyType, // 付息频率
        bizhong: this.serverData.currencyCode, // 币种
        chanpinmiaoshu: this.serverData.description, // 产品描述
        contentVersion: this.serverData.contentVersion, // 内容版本号
        jixi: this.serverData.interestMode, // 计息方式
        shangjia: this.serverData.appInfo.shelveStatus, // 上架状态
        mianqian: this.serverData.appInfo.visaInterview, // 是否面签
        tuijian: this.serverData.appInfo.recommend === "YES" ? "是" : "否", // 是否推荐
        paihang: this.serverData.appInfo.homePage === "YES" ? "是" : "否", // 是否首页排行
        cunkuanbishu: this.serverData.appInfo.defaultBuyNum, // 默认购买笔数
        cunkuanmorenjine: this.serverData.appInfo.defaultAmount, // 默认购买金额
        shiming: this.serverData.appInfo.realNameAuth === "YES" ? "是" : "否", // 是否实名
        qianyue: this.serverData.appInfo.signed === "YES" ? "是" : "否", // 是否签约
        guanzhuNum: this.serverData.appInfo.defaultFlowNum, // 默认关注数量
        zhuanqubiaozhi: this.serverData.appInfo.listAreaFlag, // 榜单专区标识
        duijie: this.serverData.appInfo.connectionMode, // 银行对接方式
        hezuoType: this.serverData.appInfo.cooperationMode, // 银行合作方式
        shoufeilv: this.serverData.appInfo.yearRate, // 年收费率
        yinhangpage:
          this.serverData.appInfo.showBankPage === "YES" ? "是" : "否", // 显示银行过渡页
        h5Url: this.serverData.appInfo.h5Url, // H5链接
        chanpinbiaozhi: this.serverData.appInfo.sameProductFlag, // 同一产品标识
        chanpinquyu: this.pageData.datas.appInfo.areaCode, // 产品区域
        newPlayer: this.serverData.appInfo.noviceVipReason, //  新手专享推荐理由
        pintuan: this.serverData.appInfo.assembleReason, //  拼团推荐理由
        productTuiJian: this.serverData.appInfo.productReason, //  产品推荐理由
        canZhuanrang:
          this.serverData.appInfo.isAllowTransfer === "YES" ? "是" : "否", // 是否可转让
        canShuHui:
          this.serverData.appInfo.isAllowRedeem === "YES" ? "是" : "否", // 是否可以赎回
        actBiaoQian: this.serverData.activityTags.map(tar => tar.id), // 活动标签
        selfBiaoQian: this.serverData.selfDefiningTags.map(tar => tar.id), // 自定义标签
        chanpinBiaoQian: this.serverData.productTags.map(tar => tar.id), // 产品标签
        lilv: [],
        cunru: this.serverData.depositRule, // 存入规则
        zhuanrang: this.serverData.transferRule, // 转让规则
        zhuanchu: this.serverData.rollOutRule, // 转出规则
        zhiquRule: this.serverData.drawRule, // 支取规则

        jisuan_day: this.serverData.daysInterestCalculation, // 利息计算天数
        zhesuan: this.serverData.buyerConvertYearRate, // 买方折算年化利率
        suoding: this.serverData.lockinPeriod, // 锁定期
        faxing_start: this.serverData.issueBeginDate, // 发行开始时间
        faxing_end: this.serverData.issueEndDate, // 发行结束时间
        faxing_num: this.serverData.issueNum // 发行量
      };
      this.ruleForm.lilv = this.serverData.interestRates.map(item => {
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

      this.addLiLvProp = {
        isInput: false, // 记录表单是否发生数据输入
        lilv_data: this.ruleForm.lilv,
        num: this.ruleForm.lilv.length + 1
      };
      this.bianjieDialog = true;
    },
    // 变更机构后，要对应调整系列
    change_xilie(id) {
      // 根据机构id，获取对应的产品系列
      let xilieData = null;
      if (
        this.pageData.page === "wmp" ||
        this.pageData.page === "wmp_insurance"
      ) {
        xilieData = JSON.parse(sessionStorage.getItem("xilie_licai"));
      } else {
        xilieData = JSON.parse(sessionStorage.getItem("xilie_cunkuan"));
      }

      let xilie = xilieData.filter(item => item.institutionId === id);
      if (xilie.length) {
        this.xilie = xilie[0].seriesList;
      } else {
        this.xilie = [];
        this.ruleForm.xilie = "";
      }

      if (this.ruleForm && this.ruleForm.xilie) {
        this.ruleForm.xilie = "";
      }
    },
    // 删除
    toDelete() {
      let type = "", // 存款和纯债的接口有一点不同
        routePage = ""; // 修改完要跳转的路由
      switch (this.pageData.page) {
        case "pure_debt_fund": // 纯债基金
          type = "pureDebtFund";
          routePage = "pure_debt_fund_mainPage";
          break;
        case "money_fund": // 货币基金
          type = "monetaryFund";
          routePage = "money_fund_mainPage";
          break;
        case "wmp": // 理财管理
          type = "wmp";
          routePage = "manage_money_matters_mainPage";
          break;
        case "wmp_insurance": // 保险
          type = "wmp/insurance";
          routePage = "manage_money_matters_mainPage";
          break;
        // 存款
        case "demand_deposit":
        case "time_deposit":
        case "large_deposit":
        case "intelligent_deposit":
        case "structured_deposit":
          type = `deposit/${this.deleteType}`;
          routePage = "deposit_mainPage";
          break;
      }

      this.$confirm(`确定删除？`)
        .then(() => {
          this.$api
            .xiangqing_delete({
              vm: this,
              data: this.pageInfos.id,
              type: type
            })
            .then(res => {
              if (res) {
                this.$message.success("删除成功！");
                this.$router.push({
                  name: routePage
                });
              } else {
                this.$message.error("删除失败！");
              }
            });
        })
        .catch(() => {});
    },

    // 点击编辑的保存并验证必填项是否有数据
    save() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let xilieData = null;
          if (
            this.pageData.page === "wmp" ||
            this.pageData.page === "wmp_insurance"
          ) {
            xilieData = JSON.parse(sessionStorage.getItem("xilie_licai"));
          } else {
            xilieData = JSON.parse(sessionStorage.getItem("xilie_cunkuan"));
          }
          switch (this.pageData.page) {
            // 纯债基金管理
            case "pure_debt_fund":
              var chunzhaiData = {
                id: this.serverData.id,
                uuid: this.serverData.uuid,
                skuId: this.serverData.skuId,
                institutionId: this.ruleForm.jigou_name,
                institutionName: "",
                fundHouseId: this.ruleForm.jijingongsi,
                fundHouseName: "",
                name: this.ruleForm.product,
                code: this.ruleForm.daima,
                status: this.ruleForm.jiaoyizhuangtai,
                statusName: "",
                contentVersion: this.ruleForm.contentVersion,

                appInfo: {
                  id: this.serverData.appInfo.id,
                  productUuid: this.serverData.appInfo.productUuid,
                  defaultBuyNum: +this.ruleForm.goumaibishu,
                  defaultAmount: +this.ruleForm.goumaimorenjine,
                  shelveStatus: this.ruleForm.shangjia,
                  shelveStatusLabel: "",
                  visaInterview: this.ruleForm.mianqian,
                  visaInterviewLabel: "",
                  realNameAuth: this.ruleForm.shiming === "是" ? "YES" : "NO",
                  h5Url: this.ruleForm.h5Url,
                  recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO",
                  homePage: this.ruleForm.paihang === "是" ? "YES" : "NO",
                  showBankPage: this.ruleForm.paihang === "是" ? "YES" : "NO"
                }
              };
              chunzhaiData.institutionName = this.dictData.jigou.filter(
                item => item.id === chunzhaiData.institutionId
              )[0].name;
              chunzhaiData.fundHouseName = chunzhaiData.fundHouseId
                ? this.dictData.jijin.filter(
                    item => item.id === chunzhaiData.fundHouseId
                  )[0].name
                : "";
              chunzhaiData.statusName = this.dictData.transaction_state.filter(
                item => item.value === chunzhaiData.status
              )[0].label;
              // 上架状态
              chunzhaiData.appInfo.shelveStatusLabel = this.ruleForm.shangjia
                ? this.dictData.shelve_status.filter(
                    item => item.value === this.ruleForm.shangjia
                  )[0].label
                : "";
              // 是否面签Label
              chunzhaiData.appInfo.visaInterviewLabel = this.ruleForm.mianqian
                ? this.dictData.visa_interview_type.filter(
                    item => item.value === this.ruleForm.mianqian
                  )[0].label
                : "";

              // 产品区域

              chunzhaiData.appInfo.areaCode = this.ruleForm.chanpinquyu;
              let chunzhaiquyu = this.dictData.quyu;
              wap: for (let i = chunzhaiquyu.length; i--; ) {
                if (chunzhaiquyu[i].value == chunzhaiData.appInfo.areaCode) {
                  chunzhaiData.appInfo.areaName = chunzhaiquyu[i].label;
                  break wap;
                }
              }

              // 币种
              let chunzhaikk = this.dictData.bizhong.filter(
                tar => tar.value === this.ruleForm.bizhong
              )[0];
              chunzhaiData.currencyName = chunzhaikk.label;
              chunzhaiData.currencyUnit = chunzhaikk.unit;
              chunzhaiData.currencyCode = this.ruleForm.bizhong;

              this.$api
                .putChunZhaiEdit({
                  vm: this,
                  data: chunzhaiData
                })
                .then(res => {
                  if (res) {
                    this.$message.success("修改成功");
                    this.toClosebianjieDialog();
                    this.$emit("toReGetData", this.forEmit);
                  }
                });
              break;
            // 货币
            case "money_fund":
              var huobiData = {
                id: this.serverData.id,
                uuid: this.serverData.uuid,
                skuId: this.serverData.skuId,
                institutionId: this.ruleForm.jigou_name,
                institutionName: "",
                fundHouseId: this.ruleForm.jijingongsi,
                fundHouseName: "",
                name: this.ruleForm.product,
                minAmount: +this.ruleForm.qigou,
                accountingDate: +this.ruleForm.shuhui,
                lockinPeriod: +this.ruleForm.suoding,
                buyIn: +this.ruleForm.mairu,
                commission: +this.ruleForm.shouxufei,
                description: this.ruleForm.chanpinmiaoshu,
                yieldRule: this.ruleForm.shouyiguize,
                contentVersion: +this.ruleForm.contentVersion,
                currencyCode: this.ruleForm.bizhong, // 币种编码
                currencyName: "",
                currencyUnit: "",
                selfDefiningTags: [],
                activityTags: [],
                appInfo: {
                  id: this.serverData.appInfo.id,
                  productUuid: this.serverData.appInfo.productUuid,
                  shelveStatus: this.ruleForm.shangjia,
                  shelveStatusLabel: "",
                  visaInterview: this.ruleForm.mianqian,
                  visaInterviewLabel: "",
                  defaultBuyNum: +this.ruleForm.goumaibishu,
                  defaultFlowNum: +this.ruleForm.guanzhuNum,
                  defaultAmount: +this.ruleForm.goumaimorenjine,
                  listAreaFlag: this.ruleForm.zhuanqubiaozhi,
                  listAreaFlagLabel: "",
                  sameProductFlag: this.ruleForm.chanpinbiaozhi,
                  recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO",
                  homePage: this.ruleForm.paihang === "是" ? "YES" : "NO",
                  realNameAuth: this.ruleForm.shiming === "是" ? "YES" : "NO",
                  signed: this.ruleForm.qianyue === "是" ? "YES" : "NO",
                  cooperationMode: this.ruleForm.hezuoType,
                  cooperationModeLabel: "",
                  yearRate: +this.ruleForm.shoufeilv,
                  areaCode: this.ruleForm.chanpinquyu, // 区域编码
                  areaName: "",
                  h5Url: this.ruleForm.h5Url,
                  showBankPage:
                    this.ruleForm.yinhangpage === "是" ? "YES" : "NO"
                }
              };
              huobiData.institutionName = this.dictData.jigou.filter(item => {
                return item.id === huobiData.institutionId;
              })[0].name;
              if (huobiData.fundHouseId) {
                huobiData.fundHouseName = this.dictData.jijin.filter(item => {
                  return item.id === huobiData.fundHouseId;
                })[0].name;
              }
              if (huobiData.appInfo.listAreaFlag) {
                huobiData.appInfo.listAreaFlagLabel = this.dictData.list_area_type.filter(
                  item => {
                    return item.value === huobiData.appInfo.listAreaFlag;
                  }
                )[0].label;
              }
              // 银行合作方式Label
              huobiData.appInfo.cooperationModeLabel = huobiData.appInfo
                .cooperationMode
                ? this.dictData.cooperation_mode.filter(
                    item => item.value === huobiData.appInfo.cooperationMode
                  )[0].label
                : "";
              // 上架状态
              huobiData.appInfo.shelveStatusLabel = this.ruleForm.shangjia
                ? this.dictData.shelve_status.filter(
                    item => item.value === this.ruleForm.shangjia
                  )[0].label
                : "";
              // 是否面签Label
              huobiData.appInfo.visaInterviewLabel = this.ruleForm.mianqian
                ? this.dictData.visa_interview_type.filter(
                    item => item.value === this.ruleForm.mianqian
                  )[0].label
                : "";
              // 币种
              if (huobiData.currencyCode) {
                var kk = this.dictData.bizhong.filter(
                  tar => tar.value === huobiData.currencyCode
                )[0];
                huobiData.currencyName = kk.label;
                huobiData.currencyUnit = kk.unit;
              }
              // 所属区域
              huobiData.appInfo.areaName = huobiData.appInfo.areaCode
                ? this.dictData.quyu.filter(
                    item => item.value === huobiData.appInfo.areaCode
                  )[0].label
                : "";
              // 获取自定义标签
              if (this.ruleForm.selfBiaoQian.length > 0) {
                this.dictData.selfDefiningTags.forEach(item => {
                  this.ruleForm.selfBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      huobiData.selfDefiningTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              // 获取活动标签
              if (this.ruleForm.actBiaoQian.length > 0) {
                this.dictData.activityTags.forEach(item => {
                  this.ruleForm.actBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      huobiData.activityTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              this.$api
                .putHuoBiEdit({
                  vm: this,
                  data: huobiData
                })
                .then(res => {
                  if (res) {
                    this.$message.success("修改成功");
                    this.toClosebianjieDialog();
                    this.$emit("toReGetData", this.forEmit);
                  }
                });
              break;
            // 理财
            case "wmp":
              // 时间越早，数值越小
              // 起息日期
              var valueDate = new Date(this.ruleForm.qixiri);
              // 理财日期
              var managementDate1 = new Date(this.ruleForm.licairiqi[0]);
              var managementDate2 = new Date(this.ruleForm.licairiqi[1]);
              // 募集日期
              var raiseDate2 = new Date(this.ruleForm.muji[1]);
              if (valueDate < managementDate1 || valueDate > managementDate2) {
                this.$message.error("起息日期应介于理财日期之间！");
                return;
              }
              if (valueDate < raiseDate2) {
                this.$message.error("起息日期应晚于募集日期！");
                return;
              }
              if (raiseDate2 > managementDate1) {
                this.$message.error("募集日期应早于理财日期！");
                return;
              }
              var licaiData = {
                id: this.serverData.id,
                uuid: this.serverData.uuid,
                skuId: this.serverData.skuId,
                institutionId: this.ruleForm.jigou_name,
                institutionName: "",
                seriesId: this.ruleForm.xilie,
                seriesName: "",
                name: this.ruleForm.productjijin,
                minAmount: +this.ruleForm.qigou,
                increaseAmount: +this.ruleForm.dizeng,
                interestRate: this.ruleForm.yuqishouyi,
                productFeature: this.ruleForm.productFeature,
                productFeatureLabel: "",
                riskLevel: this.ruleForm.fengxian,
                riskLevelLabel: "",
                surplusQuota: this.ruleForm.shengyuED,
                surplusQuotaLabel: "",
                regulatoryProperty: this.ruleForm.jianguan,
                regulatoryPropertyLabel: "",
                valueDate: this.ruleForm.qixiri,
                deadline: this.ruleForm.qixian,
                managementDate: this.ruleForm.licairiqi,
                raiseDate: this.ruleForm.muji,
                description: this.ruleForm.chanpinmiaoshu,
                contentVersion: this.ruleForm.contentVersion,
                currencyCode: this.ruleForm.bizhong, // 币种编码
                currencyName: "",
                currencyUnit: "",
                selfDefiningTags: [],
                activityTags: [],
                appInfo: {
                  id: this.serverData.appInfo.id,
                  productUuid: this.serverData.appInfo.productUuid,
                  defaultBuyNum: +this.ruleForm.goumaibishu,
                  defaultFlowNum: +this.ruleForm.guanzhuNum,
                  defaultAmount: +this.ruleForm.goumaimorenjine,
                  listAreaFlag: this.ruleForm.zhuanqubiaozhi,
                  listAreaFlagLabel: "",
                  sameProductFlag: this.ruleForm.chanpinbiaozhi,
                  shelveStatus: this.ruleForm.shangjia,
                  shelveStatusLabel: "",
                  visaInterview: this.ruleForm.mianqian,
                  visaInterviewLabel: "",
                  recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO",
                  homePage: this.ruleForm.paihang === "是" ? "YES" : "NO",
                  realNameAuth: this.ruleForm.shiming === "是" ? "YES" : "NO",
                  signed: this.ruleForm.qianyue === "是" ? "YES" : "NO",
                  cooperationMode: this.ruleForm.hezuoType,
                  cooperationModeLabel: "",
                  yearRate: +this.ruleForm.shoufeilv,
                  autoShelve: this.ruleForm.autoUpDown === "是" ? "YES" : "NO",
                  showBankPage:
                    this.ruleForm.yinhangpage === "是" ? "YES" : "NO",
                  connectionMode: this.ruleForm.duijie,
                  connectionModeLabel: "",
                  h5Url: this.ruleForm.h5Url,
                  areaCode: this.ruleForm.chanpinquyu,
                  areaName: ""
                }
              };
              // 机构名
              xilieData.forEach(item => {
                if (item.institutionId === this.ruleForm.jigou_name) {
                  licaiData.institutionName = item.institutionName;
                }
              });
              if (this.ruleForm.xilie) {
                // 系列名
                this.xilie.forEach(item => {
                  if (item.id === this.ruleForm.xilie) {
                    licaiData.seriesName = item.name;
                  }
                });
              }
              // 产品特性
              licaiData.productFeatureLabel = licaiData.productFeature
                ? this.dictData.product_feature_type.filter(
                    item => item.value === licaiData.productFeature
                  )[0].label
                : "";
              // 风险等级Label
              this.dictData.risk_level.forEach(item => {
                if (item.value === this.ruleForm.fengxian) {
                  licaiData.riskLevelLabel = item.label;
                }
              });
              // 剩余额度Label
              this.dictData.surplus_quota.forEach(item => {
                if (item.value === this.ruleForm.shengyuED) {
                  licaiData.surplusQuotaLabel = item.label;
                }
              });
              // 监管属性Label
              this.dictData.regulatory_property.forEach(item => {
                if (item.value === this.ruleForm.jianguan) {
                  licaiData.regulatoryPropertyLabel = item.label;
                }
              });
              // 专区标识Label
              this.dictData.list_area_type.forEach(item => {
                if (item.value === this.ruleForm.zhuanqubiaozhi) {
                  licaiData.appInfo.listAreaFlagLabel = item.label;
                }
              });
              // 上架状态
              licaiData.appInfo.shelveStatusLabel = licaiData.appInfo
                .shelveStatus
                ? this.dictData.shelve_status.filter(
                    item => item.value === licaiData.appInfo.shelveStatus
                  )[0].label
                : "";
              // 是否面签Label
              licaiData.appInfo.visaInterviewLabel = licaiData.appInfo
                .visaInterview
                ? this.dictData.visa_interview_type.filter(
                    item => item.value === licaiData.appInfo.visaInterview
                  )[0].label
                : "";
              // 银行合作方式Label
              licaiData.appInfo.cooperationModeLabel = licaiData.appInfo
                .cooperationMode
                ? this.dictData.cooperation_mode.filter(
                    item => item.value === licaiData.appInfo.cooperationMode
                  )[0].label
                : "";
              // 银行对接方式
              licaiData.appInfo.connectionModeLabel = licaiData.appInfo
                .connectionMode
                ? this.dictData.bank_connection_mode.filter(
                    item => item.value === licaiData.appInfo.connectionMode
                  )[0].label
                : "";
              // 币种
              if (licaiData.currencyCode) {
                var kk_l = this.dictData.bizhong.filter(
                  tar => tar.value === licaiData.currencyCode
                )[0];
                licaiData.currencyName = kk_l.label;
                licaiData.currencyUnit = kk_l.unit;
              }
              // 所属区域
              licaiData.appInfo.areaName = licaiData.appInfo.areaCode
                ? this.dictData.quyu.filter(
                    item => item.value === licaiData.appInfo.areaCode
                  )[0].label
                : "";
              // 获取自定义标签
              if (this.ruleForm.selfBiaoQian.length > 0) {
                this.dictData.selfDefiningTags.forEach(item => {
                  this.ruleForm.selfBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      licaiData.selfDefiningTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              // 获取活动标签
              if (this.ruleForm.actBiaoQian.length > 0) {
                this.dictData.activityTags.forEach(item => {
                  this.ruleForm.actBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      licaiData.activityTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              this.$api
                .put_LiCai_data({
                  vm: this,
                  data: licaiData
                })
                .then(res => {
                  if (res) {
                    this.$message.success("修改成功");
                    this.toClosebianjieDialog();
                    this.$emit("toReGetData", this.forEmit);
                  }
                });
              break;

            //保险
            case "wmp_insurance":
              var baoxianData = {
                id: this.serverData.id,
                uuid: this.serverData.uuid,
                skuId: this.serverData.skuId,
                institutionId: this.ruleForm.jigou_name, // 机构名称
                institutionName: "",
                fundHouseId: this.ruleForm.jijingongsi, // 所属基金公司名称
                fundHouseName: "",
                productCompanyName: this.ruleForm.productHome,
                seriesId: this.ruleForm.xilie, // 产品系列ID
                seriesName: "",
                name: this.ruleForm.product, // 产品名称
                minAmount: +this.ruleForm.qigou, // 起购金额
                increaseAmount: +this.ruleForm.dizeng, // 递增金额
                interestRate: +this.ruleForm.yuqishouyi, // 预期年化收益率
                riskLevel: this.ruleForm.fengxian, // 风险等级
                riskLevelLabel: "",
                surplusQuota: this.ruleForm.shengyuED, // 剩余额度
                surplusQuotaLabel: "",
                valueDate: this.ruleForm.qixiri, // 起息日
                deadline: +this.ruleForm.qixian, // 期限
                managementDate: [this.ruleForm.qixiri, this.ruleForm.daoqiri], //起息日,到期日
                regulatoryProperty: this.ruleForm.jianguan, //监管属性
                regulatoryPropertyLabel: "",
                description: this.ruleForm.chanpinmiaoshu, // 产品描述
                contentVersion: +this.ruleForm.contentVersion, //  产品版本标识
                currencyCode: this.ruleForm.bizhong, // 币种编码
                selfDefiningTags: [],
                activityTags: [],
                period: +this.ruleForm.qici, // 期次
                revenueType: this.ruleForm.shouyiType, // 收益类型
                minRedemptionAmount: +this.ruleForm.minShuHui, //  最小赎回金额
                maxRedemptionAmount: +this.ruleForm.maxShuHui, //  最大赎回金额
                singleDayAmount: this.ruleForm.dayShuHui, //  单日最大赎回金额
                surplusAmountPercentage: +this.ruleForm.eduBi, //  产品剩余额度百分比
                maxReturnInterval: +this.ruleForm.qujianMax, //  产品收益区间最大值
                interestBasis: +this.ruleForm.jixiBase, //  计息基础
                settlementDay: this.ruleForm.qingsuan, //  产品结算日
                renewal: this.ruleForm.zhuancun === "否" ? "NO" : "YES", // 到期转存
                insuranceFinancing: {
                  // 保险理财详情表
                  id: this.serverData.insuranceFinancing.id,
                  netAssetValue: +this.ruleForm.netAssetValue, // 单位净值
                  netAccumulateValue: +this.ruleForm.netAccumulateValue, // 累计净值
                  bottomGuardYield: +this.ruleForm.bottomGuardYield, // 保底收益率
                  onThe7thOfTheYearYield: +this.ruleForm.onThe7thOfTheYearYield, // 七日年化收益率
                  thousandsOfYearsYields: +this.ruleForm.thousandsOfYearsYields // 万份年化收益
                },
                appInfo: {
                  id: this.serverData.appInfo.id,
                  productUuid: this.serverData.appInfo.productUuid,
                  shelveStatus: this.ruleForm.shangjia, // 上下架
                  shelveStatusLabel: "",
                  visaInterview: this.ruleForm.mianqian, // 是否面签
                  visaInterviewLabel: "",
                  recommend: this.ruleForm.tuijian === "否" ? "NO" : "YES", // 是否推荐
                  homePage: this.ruleForm.paihang === "否" ? "NO" : "YES", // 是否首页排行
                  defaultAmount: +this.ruleForm.goumaimorenjine, // 默认购买金额
                  defaultBuyNum: this.ruleForm.goumaibishu // 默认购买数量
                    ? +this.ruleForm.goumaibishu
                    : 0,
                  defaultFlowNum: this.ruleForm.guanzhuNum // 默认关注数量
                    ? +this.ruleForm.guanzhuNum
                    : 0,
                  listAreaFlag: this.ruleForm.zhuanqubiaozhi, // 榜单专区标识
                  listAreaFlagLabel: "",
                  sameProductFlag: this.ruleForm.chanpinbiaozhi, // 同一产品标识
                  realNameAuth: this.ruleForm.shiming === "否" ? "NO" : "YES", // 是否实名
                  signed: this.ruleForm.qianyue === "否" ? "NO" : "YES", // 是否签约
                  cooperationMode: this.ruleForm.hezuoType, // 合作方式
                  cooperationModeLabel: "",
                  yearRate: +this.ruleForm.shoufeilv, // 年收费率
                  showBankPage:
                    this.ruleForm.yinhangpage === "否" ? "NO" : "YES", // 显示银行提示页
                  connectionMode: this.ruleForm.duijie, // 银行对接方式
                  connectionModeLabel: "",
                  h5Url: this.ruleForm.h5Url, // 产品H5链接
                  areaCode: "", // 区域编码
                  areaName: "",
                  isAllowPurchase:
                    this.ruleForm.canShenGou === "否" ? "NO" : "YES", // 是否可以申购
                  isAllowRedeem:
                    this.ruleForm.canShuHui === "否" ? "NO" : "YES", // 是否可以赎回
                  noviceVipReason: this.ruleForm.newPlayer, // 新手专享推荐理由
                  assembleReason: this.ruleForm.pintuan, // 拼团推荐理由
                  productReason: this.ruleForm.productTuiJian // 产品推荐理由
                }
              };
              // 机构
              baoxianData.institutionName = this.dictData.jigou.filter(item => {
                return item.id === baoxianData.institutionId;
              })[0].name;

              if (this.ruleForm.xilie) {
                // 系列名
                this.xilie.forEach(item => {
                  if (item.id === this.ruleForm.xilie) {
                    baoxianData.seriesName = item.name;
                  }
                });
              }
              // 基金
              baoxianData.fundHouseName = baoxianData.fundHouseId
                ? this.dictData.jijin.filter(
                    item => item.id === baoxianData.fundHouseId
                  )[0].name
                : "";
              // 风险等级
              if (baoxianData.riskLevel) {
                baoxianData.riskLevelLabel = this.dictData.risk_level.filter(
                  item => item.value == baoxianData.riskLevel
                )[0].label;
              }

              // 币种
              if (baoxianData.currencyCode) {
                var kk_b = this.dictData.bizhong.filter(
                  tar => tar.value === baoxianData.currencyCode
                )[0];
                baoxianData.currencyName = kk_b.label;
                baoxianData.currencyUnit = kk_b.unit;
              }
              // 剩余额度
              if (baoxianData.surplusQuota) {
                baoxianData.surplusQuotaLabel = this.dictData.surplus_quota.filter(
                  item => item.value == baoxianData.surplusQuota
                )[0].label;
              }
              // 监管属性
              if (baoxianData.regulatoryProperty) {
                baoxianData.regulatoryPropertyLabel = this.dictData.regulatory_property.filter(
                  item => item.value == baoxianData.regulatoryProperty
                )[0].label;
              }

              // 上架状态
              baoxianData.appInfo.shelveStatusLabel = baoxianData.appInfo
                .shelveStatus
                ? this.dictData.shelve_status.filter(
                    item => item.value === baoxianData.appInfo.shelveStatus
                  )[0].label
                : "";

              // 是否面签Label
              baoxianData.appInfo.visaInterviewLabel = baoxianData.appInfo
                .visaInterview
                ? this.dictData.visa_interview_type.filter(
                    item => item.value === baoxianData.appInfo.visaInterview
                  )[0].label
                : "";
              // 榜单专区标识
              if (baoxianData.appInfo.listAreaFlag) {
                baoxianData.appInfo.listAreaFlagLabel = this.dictData.list_area_type.filter(
                  item => item.value == baoxianData.appInfo.listAreaFlag
                )[0].label;
              }

              // 银行合作方式Label
              baoxianData.appInfo.cooperationModeLabel = baoxianData.appInfo
                .cooperationMode
                ? this.dictData.cooperation_mode.filter(
                    item => item.value === baoxianData.appInfo.cooperationMode
                  )[0].label
                : "";

              // 银行对接方式
              baoxianData.appInfo.connectionModeLabel = baoxianData.appInfo
                .connectionMode
                ? this.dictData.bank_connection_mode.filter(
                    item => item.value === baoxianData.appInfo.connectionMode
                  )[0].label
                : "";

              // 产品区域
              if (this.ruleForm.chanpinquyu) {
                baoxianData.appInfo.areaCode = this.ruleForm.chanpinquyu;
                var quyu = this.dictData.quyu;
                wap: for (let i = quyu.length; i--; ) {
                  if (quyu[i].value == baoxianData.appInfo.areaCode) {
                    baoxianData.appInfo.areaName = quyu[i].label;
                    break wap;
                  }
                }
              }

              // 获取自定义标签
              if (this.ruleForm.selfBiaoQian.length > 0) {
                this.dictData.selfDefiningTags.forEach(item => {
                  this.ruleForm.selfBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      baoxianData.selfDefiningTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              // 获取活动标签
              if (this.ruleForm.actBiaoQian.length > 0) {
                this.dictData.activityTags.forEach(item => {
                  this.ruleForm.actBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      baoxianData.activityTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }

              this.$api
                .edit_baoxian({
                  vm: this,
                  data: baoxianData
                })
                .then(res => {
                  if (res) {
                    this.$message.success("修改成功");
                    this.toClosebianjieDialog();
                    this.$emit("toReGetData", this.forEmit);
                  }
                });

              break;

            // 活期存款管理
            case "demand_deposit":
              var huoqiData = {
                id: this.serverData.id, // ID
                uuid: this.serverData.uuid,
                skuId: this.serverData.skuId,
                institutionId: this.ruleForm.jigou_name,
                institutionName: "",
                seriesId: this.ruleForm.xilie,
                seriesName: "",
                name: this.ruleForm.productcunkuan,
                productSubtype: this.serverData.productSubtype,
                productSubtypeLabel: this.serverData.productSubtypeLabel,
                typeAlias: this.ruleForm.bieming,
                maxAmount: +this.ruleForm.qicunjineMax,
                minAmount: +this.ruleForm.qicunjineMin,
                amountRangeExplain: this.ruleForm.qicunfanwei,
                increaseAmount: +this.ruleForm.dizeng,
                interestRateAlias: this.ruleForm.interestRateAlias,
                deadlineAlias: this.ruleForm.deadlineAlias,
                regulatoryProperty: this.ruleForm.jianguan,
                regulatoryPropertyLabel: "",
                frequencyType: +this.ruleForm.fuxipinlv,
                frequencyTypeLabel: "",
                currencyCode: this.ruleForm.bizhong,
                currencyName: "",
                currencyUnit: "",
                description: this.ruleForm.chanpinmiaoshu,
                contentVersion: +this.ruleForm.contentVersion,
                interest: {
                  id: this.serverData.interest.id,
                  spuId: this.serverData.interest.spuId,
                  interestRate: +this.ruleForm.lilv
                },
                productTags: [],
                selfDefiningTags: [],
                activityTags: [],
                appInfo: {
                  id: this.serverData.appInfo.id,
                  productUuid: this.serverData.appInfo.productUuid,
                  shelveStatus: this.ruleForm.shangjia,
                  shelveStatusLabel: "",
                  visaInterview: this.ruleForm.mianqian,
                  visaInterviewLabel: "",
                  recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO",
                  homePage: this.ruleForm.paihang === "是" ? "YES" : "NO",
                  defaultBuyNum: +this.ruleForm.goumaibishu,
                  defaultAmount: +this.ruleForm.goumaimorenjine,
                  listAreaFlag: this.ruleForm.zhuanqubiaozhi,
                  listAreaFlagLabel: "",
                  sameProductFlag: this.ruleForm.chanpinbiaozhi,
                  realNameAuth: this.ruleForm.shiming === "是" ? "YES" : "NO",
                  signed: this.ruleForm.qianyue === "是" ? "YES" : "NO",
                  defaultFlowNum: this.ruleForm.guanzhuNum,
                  cooperationMode: this.ruleForm.hezuoType,
                  cooperationModeLabel: "",
                  yearRate: this.ruleForm.shoufeilv,
                  showBankPage:
                    this.ruleForm.yinhangpage === "是" ? "YES" : "NO",
                  connectionMode: this.ruleForm.duijie,
                  connectionModeLabel: "",
                  h5Url: this.ruleForm.h5Url,
                  areaCode: this.ruleForm.chanpinquyu,
                  areaName: ""
                }
              };
              // 机构名
              xilieData.forEach(item => {
                if (item.institutionId === this.ruleForm.jigou_name) {
                  huoqiData.institutionName = item.institutionName;
                }
              });
              if (this.ruleForm.xilie) {
                // 系列名
                this.xilie.forEach(item => {
                  if (item.id === this.ruleForm.xilie) {
                    huoqiData.seriesName = item.name;
                  }
                });
              }
              // 榜单专区标识Label
              this.dictData.list_area_type.forEach(item => {
                if (item.value === this.ruleForm.zhuanqubiaozhi) {
                  huoqiData.appInfo.listAreaFlagLabel = item.label;
                }
              });
              // 监管属性Label
              this.dictData.regulatory_property.forEach(item => {
                if (item.value === this.ruleForm.jianguan) {
                  huoqiData.regulatoryPropertyLabel = item.label;
                }
              });
              // 付息频率Label
              huoqiData.frequencyTypeLabel = huoqiData.frequencyType
                ? this.dictData.frequency_type.filter(
                    item => item.value == huoqiData.frequencyType
                  )[0].label
                : "";
              // 币种
              if (huoqiData.currencyCode) {
                var kk_h = this.dictData.bizhong.filter(
                  tar => tar.value === huoqiData.currencyCode
                )[0];
                huoqiData.currencyName = kk_h.label;
                huoqiData.currencyUnit = kk_h.unit;
              }
              // 上架状态
              huoqiData.appInfo.shelveStatusLabel = huoqiData.appInfo
                .shelveStatus
                ? this.dictData.shelve_status.filter(
                    item => item.value === huoqiData.appInfo.shelveStatus
                  )[0].label
                : "";
              // 是否面签Label
              huoqiData.appInfo.visaInterviewLabel = huoqiData.appInfo
                .visaInterview
                ? this.dictData.visa_interview_type.filter(
                    item => item.value === huoqiData.appInfo.visaInterview
                  )[0].label
                : "";
              // 榜单专区标识Label
              huoqiData.appInfo.listAreaFlagLabel = huoqiData.appInfo
                .listAreaFlag
                ? this.dictData.list_area_type.filter(
                    item => item.value === huoqiData.appInfo.listAreaFlag
                  )[0].label
                : "";
              // 银行合作方式Label
              huoqiData.appInfo.cooperationModeLabel = huoqiData.appInfo
                .cooperationMode
                ? this.dictData.cooperation_mode.filter(
                    item => item.value === huoqiData.appInfo.cooperationMode
                  )[0].label
                : "";
              // 银行对接方式
              huoqiData.appInfo.connectionModeLabel = huoqiData.appInfo
                .connectionMode
                ? this.dictData.bank_connection_mode.filter(
                    item => item.value === huoqiData.appInfo.connectionMode
                  )[0].label
                : "";
              // 所属区域
              huoqiData.appInfo.areaName = huoqiData.appInfo.areaCode
                ? this.dictData.quyu.filter(
                    item => item.value === huoqiData.appInfo.areaCode
                  )[0].label
                : "";
              // 获取产品标签
              if (this.ruleForm.chanpinBiaoQian.length > 0) {
                this.dictData.productTags.forEach(item => {
                  this.ruleForm.chanpinBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      huoqiData.productTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              // 获取自定义标签
              if (this.ruleForm.selfBiaoQian.length > 0) {
                this.dictData.selfDefiningTags.forEach(item => {
                  this.ruleForm.selfBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      huoqiData.selfDefiningTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              // 获取活动标签
              if (this.ruleForm.actBiaoQian.length > 0) {
                this.dictData.activityTags.forEach(item => {
                  this.ruleForm.actBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      huoqiData.activityTags.push({
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
                  if (res) {
                    this.$message.success("修改成功");
                    this.toClosebianjieDialog();
                    this.$emit("toReGetData", this.forEmit);
                  }
                });
              break;
            // 定期存款管理
            case "time_deposit":
              if (this.addLiLvProp.isInput) {
                this.$confirm(
                  `利率表单已经填过数据，但不完整，是否抛弃当前已填数据？`
                )
                  .then(() => {
                    if (!this.ruleForm.lilv.length) {
                      this.$message.error("利率列表不能为空！");
                      return;
                    } else {
                      this.putDingQi(xilieData);
                    }
                  })
                  .catch(() => {});
              } else {
                this.putDingQi(xilieData);
              }
              break;

            // 大额存款管理
            case "large_deposit":
              if (this.addLiLvProp.isInput) {
                this.$confirm(
                  `利率表单已经填过数据，但不完整，是否抛弃当前已填数据？`
                )
                  .then(() => {
                    if (!this.ruleForm.lilv.length) {
                      this.$message.error("利率列表不能为空！");
                      return;
                    } else {
                      this.putBig(xilieData);
                    }
                  })
                  .catch(() => {});
              } else {
                this.putBig(xilieData);
              }
              break;
            // 智能存款管理
            case "intelligent_deposit":
              if (this.addLiLvProp.isInput) {
                this.$confirm(
                  `利率表单已经填过数据，但不完整，是否抛弃当前已填数据？`
                )
                  .then(() => {
                    if (!this.ruleForm.lilv.length) {
                      this.$message.error("利率列表不能为空！");
                      return;
                    } else {
                      this.putZhiNeng(xilieData);
                    }
                  })
                  .catch(() => {});
              } else {
                this.putZhiNeng(xilieData);
              }
              break;
            // 结构存款管理
            case "structured_deposit":
              var jiegouData = {
                id: this.serverData.id, // ID
                uuid: this.serverData.uuid,
                skuId: this.serverData.skuId,
                institutionId: this.ruleForm.jigou_name,
                institutionName: "",
                seriesId: this.ruleForm.xilie,
                seriesName: "",
                name: this.ruleForm.productcunkuan,
                productSubtype: this.serverData.productSubtype,
                productSubtypeLabel: this.serverData.productSubtypeLabel,
                maxAmount: +this.ruleForm.qicunjineMax,
                minAmount: +this.ruleForm.qicunjineMin,
                amountRangeExplain: this.ruleForm.qicunfanwei,
                typeAlias: this.ruleForm.bieming,
                increaseAmount: +this.ruleForm.dizeng,
                interestRateAlias: this.ruleForm.interestRateAlias, // 期限别名
                deadlineAlias: this.ruleForm.deadlineAlias,
                frequencyType: this.ruleForm.fuxipinlv, // 付息频率
                frequencyTypeLabel: "",
                surplusQuota: this.ruleForm.shengyuED,
                surplusQuotaLabel: "",
                riskLevel: this.ruleForm.fengxian,
                riskLevelLabel: "",
                regulatoryProperty: this.ruleForm.jianguan,
                regulatoryPropertyLabel: "",
                sellingDate: this.ruleForm.qishou,
                valueDate: this.ruleForm.qixi,
                currencyCode: this.ruleForm.bizhong, // 币种编码
                currencyName: "",
                currencyUnit: "",
                description: this.ruleForm.chanpinmiaoshu,
                contentVersion: +this.ruleForm.contentVersion, // 内容版本号
                interest: {
                  id: this.serverData.interest.id,
                  spuId: this.serverData.interest.spuId,
                  fromTerm: +this.ruleForm.qixian,
                  interestRate: +this.ruleForm.lilv,
                  maxInterestRate: +this.ruleForm.maxLilv,
                  expireInterestRate: +this.ruleForm.daoqiLilv
                },
                appInfo: {
                  id: this.serverData.appInfo.id,
                  productUuid: this.serverData.appInfo.productUuid,
                  shelveStatus: this.ruleForm.shangjia,
                  shelveStatusLabel: "",
                  visaInterview: this.ruleForm.mianqian,
                  visaInterviewLabel: "",
                  recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO",
                  homePage: this.ruleForm.paihang === "是" ? "YES" : "NO",
                  defaultBuyNum: +this.ruleForm.cunkuanbishu,
                  defaultAmount: +this.ruleForm.cunkuanmorenjine,
                  listAreaFlag: this.ruleForm.zhuanqubiaozhi,
                  listAreaFlagLabel: "",
                  sameProductFlag: this.ruleForm.chanpinbiaozhi,
                  defaultFlowNum: +this.ruleForm.guanzhuNum, // 默认关注数量
                  signed: this.ruleForm.qianyue === "是" ? "YES" : "NO", // 是否签约
                  connectionMode: this.ruleForm.duijie, // 银行对接方式
                  connectionModeLabel: "",
                  cooperationMode: this.ruleForm.hezuoType, // 合作方式
                  cooperationModeLabel: "",
                  yearRate: +this.ruleForm.shoufeilv, // 年收费率
                  autoShelve: this.ruleForm.autoUpDown === "是" ? "YES" : "NO", // 自动上架
                  showBankPage:
                    this.ruleForm.yinhangpage === "是" ? "YES" : "NO", // 显示银行过渡页
                  h5Url: this.ruleForm.h5Url,
                  areaCode: this.ruleForm.chanpinquyu, // 区域编码
                  areaName: "",
                  realNameAuth: this.ruleForm.shiming === "是" ? "YES" : "NO"
                },
                productTags: [],
                selfDefiningTags: [],
                activityTags: []
              };
              // 机构名
              xilieData.forEach(item => {
                if (item.institutionId === this.ruleForm.jigou_name) {
                  jiegouData.institutionName = item.institutionName;
                }
              });
              if (this.ruleForm.xilie) {
                // 系列名
                this.xilie.forEach(item => {
                  if (item.id === this.ruleForm.xilie) {
                    jiegouData.seriesName = item.name;
                  }
                });
              }
              // 付息频率Label
              jiegouData.frequencyTypeLabel = jiegouData.frequencyType
                ? this.dictData.frequency_type.filter(
                    item => item.value === jiegouData.frequencyType
                  )[0].label
                : "";
              // 剩余额度Label
              jiegouData.surplusQuotaLabel = jiegouData.surplusQuota
                ? this.dictData.surplus_quota.filter(
                    item => item.value === jiegouData.surplusQuota
                  )[0].label
                : "";
              // 风险等级Label
              jiegouData.riskLevelLabel = jiegouData.riskLevel
                ? this.dictData.risk_level.filter(
                    item => item.value === jiegouData.riskLevel
                  )[0].label
                : "";
              // 监管属性Label
              jiegouData.regulatoryPropertyLabel = jiegouData.regulatoryProperty
                ? this.dictData.regulatory_property.filter(
                    item => item.value === jiegouData.regulatoryProperty
                  )[0].label
                : "";
              // 币种
              if (jiegouData.currencyCode) {
                var kk_j = this.dictData.bizhong.filter(
                  tar => tar.value === jiegouData.currencyCode
                )[0];
                jiegouData.currencyName = kk_j.label;
                jiegouData.currencyUnit = kk_j.unit;
              }
              // 上架状态
              jiegouData.appInfo.shelveStatusLabel = jiegouData.appInfo
                .shelveStatus
                ? this.dictData.shelve_status.filter(
                    item => item.value === jiegouData.appInfo.shelveStatus
                  )[0].label
                : "";
              // 是否面签Label
              jiegouData.appInfo.visaInterviewLabel = jiegouData.appInfo
                .visaInterview
                ? this.dictData.visa_interview_type.filter(
                    item => item.value === jiegouData.appInfo.visaInterview
                  )[0].label
                : "";
              // 榜单专区标识Label
              jiegouData.appInfo.listAreaFlagLabel = jiegouData.appInfo
                .listAreaFlag
                ? this.dictData.list_area_type.filter(
                    item => item.value === jiegouData.appInfo.listAreaFlag
                  )[0].label
                : "";
              // 银行对接方式Label
              jiegouData.appInfo.connectionModeLabel = jiegouData.appInfo
                .connectionMode
                ? this.dictData.bank_connection_mode.filter(
                    item => item.value === jiegouData.appInfo.connectionMode
                  )[0].label
                : "";
              // 银行合作方式Label
              jiegouData.appInfo.cooperationModeLabel = jiegouData.appInfo
                .cooperationMode
                ? this.dictData.cooperation_mode.filter(
                    item => item.value === jiegouData.appInfo.cooperationMode
                  )[0].label
                : "";
              // 所属区域
              jiegouData.appInfo.areaName = jiegouData.appInfo.areaCode
                ? this.dictData.quyu.filter(
                    item => item.value === jiegouData.appInfo.areaCode
                  )[0].label
                : "";
              // 获取产品标签
              if (this.ruleForm.chanpinBiaoQian.length > 0) {
                this.dictData.productTags.forEach(item => {
                  this.ruleForm.chanpinBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      jiegouData.productTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              // 获取自定义标签
              if (this.ruleForm.selfBiaoQian.length > 0) {
                this.dictData.selfDefiningTags.forEach(item => {
                  this.ruleForm.selfBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      jiegouData.selfDefiningTags.push({
                        id: tar,
                        name: item.name
                      });
                    }
                  });
                });
              }
              // 获取活动标签
              if (this.ruleForm.actBiaoQian.length > 0) {
                this.dictData.activityTags.forEach(item => {
                  this.ruleForm.actBiaoQian.forEach(tar => {
                    if (item.id === tar) {
                      jiegouData.activityTags.push({
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
                  if (res) {
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
    // 上传定期的修改数据
    putDingQi(xilieData) {
      let dingqiData = {
        // 利率信息列表
        id: this.serverData.id,
        uuid: this.serverData.uuid, // 产品ID
        skuId: this.serverData.skuId,
        institutionId: +this.ruleForm.jigou_name, // 机构ID
        institutionName: "", // 机构名称
        seriesId: +this.ruleForm.xilie, // 产品系列ID
        seriesName: "", // 产品系列名称
        name: this.ruleForm.productcunkuan, // 产品名称
        minAmount: +this.ruleForm.qicunjineMin, // 最小起购金额
        maxAmount: +this.ruleForm.qicunjineMax, // 最大起购金额
        amountRangeExplain: this.ruleForm.qicunfanwei, // 起购范围说明
        increaseAmount: +this.ruleForm.dizeng, // 递增金额
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
        currencyCode: this.ruleForm.bizhong, //币种
        currencyName: "",
        currencyUnit: "",
        description: this.ruleForm.chanpinmiaoshu, // 描述
        interestRates: [],
        contentVersion: this.ruleForm.contentVersion,
        deadlineAlias: this.ruleForm.deadlineAlias,
        interestRateAlias: this.ruleForm.interestRateAlias, // 利率别名
        surplusQuota: this.ruleForm.shengyuED,
        surplusQuotaLabel: "",

        appInfo: {
          // 产品配置信息
          id: +this.serverData.appInfo.id, // 主键
          productUuid: this.serverData.appInfo.productUuid, // 产品id
          shelveStatus: this.ruleForm.shangjia, // 上下架状态
          shelveStatusLabel: "",
          visaInterview: this.ruleForm.mianqian, // 是否面签
          visaInterviewLabel: "",
          recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO", //是否推荐
          homePage: this.ruleForm.paihang === "是" ? "YES" : "NO", //是否首页排序
          listAreaFlag: this.ruleForm.zhuanqubiaozhi, // 榜单专区标识
          listAreaFlagLabel: "", // 榜单专区标识Label
          cooperationMode: this.ruleForm.hezuoType, // 合作方式
          cooperationModeLabel: "", //合作方式Label
          yearRate: +this.ruleForm.shoufeilv, // 年收费率
          autoShelve: this.ruleForm.autoUpDown === "是" ? "YES" : "NO", //自动上架
          showBankPage: this.ruleForm.yinhangpage === "是" ? "YES" : "NO", // 显示银行过渡页
          connectionMode: this.ruleForm.duijie, // 银行对接方式
          connectionModeLabel: "", // 银行对接方式Label
          h5Url: this.ruleForm.h5Url, //H5链接
          defaultBuyNum: +this.ruleForm.cunkuanbishu, // 默认购买数量
          defaultAmount: +this.ruleForm.cunkuanmorenjine, // 默认购买金额
          defaultFlowNum: +this.ruleForm.guanzhuNum, // 默认关注数量
          sameProductFlag: this.ruleForm.chanpinbiaozhi, // 同一产品标识
          realNameAuth: this.ruleForm.shiming === "是" ? "YES" : "NO",
          signed: this.ruleForm.qianyue === "是" ? "YES" : "NO", // 是否签约
          areaCode: this.ruleForm.chanpinquyu,
          areaName: ""
        },
        productTags: [],
        selfDefiningTags: [],
        activityTags: []
      };
      let jigou_dq = xilieData.filter(
        item => item.institutionId === dingqiData.institutionId
      )[0];
      // 机构名称
      dingqiData.institutionName = jigou_dq.institutionName;

      if (this.ruleForm.xilie) {
        // 产品系列名称
        dingqiData.seriesName = jigou_dq.seriesList.filter(
          item => item.id === dingqiData.seriesId
        )[0].name;
      }
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
      // 剩余额度Label
      dingqiData.surplusQuotaLabel = dingqiData.surplusQuota
        ? this.dictData.surplus_quota.filter(
            item => item.value === dingqiData.surplusQuota
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
      // 币种
      if (dingqiData.currencyCode) {
        let kk = this.dictData.bizhong.filter(
          tar => tar.value === dingqiData.currencyCode
        )[0];
        dingqiData.currencyName = kk.label;
        dingqiData.currencyUnit = kk.unit;
      }

      // 上架状态
      dingqiData.appInfo.shelveStatusLabel = dingqiData.appInfo.shelveStatus
        ? this.dictData.shelve_status.filter(
            item => item.value === dingqiData.appInfo.shelveStatus
          )[0].label
        : "";
      // 是否面签Label
      dingqiData.appInfo.visaInterviewLabel = dingqiData.appInfo.visaInterview
        ? this.dictData.visa_interview_type.filter(
            item => item.value === dingqiData.appInfo.visaInterview
          )[0].label
        : "";
      // 榜单专区标识Label
      dingqiData.appInfo.listAreaFlagLabel = dingqiData.appInfo.listAreaFlag
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
      dingqiData.appInfo.connectionModeLabel = dingqiData.appInfo.connectionMode
        ? this.dictData.bank_connection_mode.filter(
            item => item.value === dingqiData.appInfo.connectionMode
          )[0].label
        : "";

      // 所属区域
      dingqiData.appInfo.areaName = dingqiData.appInfo.areaCode
        ? this.dictData.quyu.filter(
            item => item.value === dingqiData.appInfo.areaCode
          )[0].label
        : "";

      // 获取产品标签
      if (this.ruleForm.chanpinBiaoQian.length > 0) {
        this.dictData.productTags.forEach(item => {
          this.ruleForm.chanpinBiaoQian.forEach(tar => {
            if (item.id === tar) {
              dingqiData.productTags.push({
                id: tar,
                name: item.name
              });
            }
          });
        });
      }

      // 获取自定义标签
      if (this.ruleForm.selfBiaoQian.length > 0) {
        this.dictData.selfDefiningTags.forEach(item => {
          this.ruleForm.selfBiaoQian.forEach(tar => {
            if (item.id === tar) {
              dingqiData.selfDefiningTags.push({
                id: tar,
                name: item.name
              });
            }
          });
        });
      }
      // 获取活动标签
      if (this.ruleForm.actBiaoQian.length > 0) {
        this.dictData.activityTags.forEach(item => {
          this.ruleForm.actBiaoQian.forEach(tar => {
            if (item.id === tar) {
              dingqiData.activityTags.push({
                id: tar,
                name: item.name
              });
            }
          });
        });
      }

      dingqiData.interestRates = this.ruleForm.lilv.map(item => {
        let kk = {
          fromTerm: item.minDeadline !== "" ? +item.minDeadline : 1, // 最小期限
          fromTermUnitType: item.min_danwei !== "" ? item.min_danwei : "1", // 最小期限单位
          fromTermUnitLabel: "天",
          fromTermSymbolType: item.min_symbol !== "" ? item.min_symbol : "&le", // 限制条件符号
          fromTermSymbolTypeLabel: "小于等于",

          toTerm: item.maxDeadline !== "" ? +item.maxDeadline : "", // 最大期限
          toTermUnitType: item.max_danwei !== "" ? item.max_danwei : "", // 最大期限单位
          toTermUnitLabel: "",
          toTermSymbolType: item.max_symbol !== "" ? item.max_symbol : "", // 限制条件符号
          toTermSymbolTypeLabel: "",

          interestRate: +item.lilv, // 利率
          lockinPeriod: +item.lockinPeriod, // 锁定期限
          showList: item.showList, // 榜单展示
          lockinShowList: item.lockinShowList, // 锁定期榜单展示
          remark: item.remark, // 备注
          homepageCopywriting: item.homepageCopywriting, // 首页文案
          detailCopywriting: item.detailCopywriting, // 详情页文案
          bankCopywriting: item.bankCopywriting, //  银行文案
          productList: item.showProduct === "YES" ? "YES" : "NO", //  产品展示
          termCopywriting: item.bangdanWrite //  榜单期限文案
        };
        if (item.id) {
          kk.id = item.id;
          kk.spuId = item.spuId;
        } else {
          kk.spuId = this.serverData.id;
        }

        kk.fromTermUnitLabel = kk.fromTermUnitType
          ? this.dictData.deadline_type.filter(
              tar => tar.value === kk.fromTermUnitType
            )[0].label
          : "";
        kk.fromTermSymbolTypeLabel = kk.fromTermSymbolType
          ? this.dictData.rule_symbol.filter(
              tar => tar.value === kk.fromTermSymbolType
            )[0].label
          : "";

        kk.toTermUnitLabel = kk.toTermUnitType
          ? this.dictData.deadline_type.filter(
              tar => tar.value === kk.toTermUnitType
            )[0].label
          : "";
        kk.toTermSymbolTypeLabel = kk.toTermSymbolType
          ? this.dictData.rule_symbol.filter(
              tar => tar.value === kk.toTermSymbolType
            )[0].label
          : "";
        return kk;
      });
      if (!this.ruleForm.lilv.length) {
        this.$message.error("请输入利率数据！");
        return;
      }
      this.$api
        .edit_DingQi({
          vm: this,
          data: dingqiData
        })
        .then(res => {
          if (res) {
            this.$message.success("修改成功");
            this.toClosebianjieDialog();
            this.$emit("toReGetData", this.forEmit);
          }
        });
    },
    // 上传大额的修改数据
    putBig(xilieData) {
      let bigData = {
        id: this.serverData.id,
        uuid: this.serverData.uuid, // 产品ID
        skuId: this.serverData.skuId,
        institutionId: +this.ruleForm.jigou_name, // 机构ID
        institutionName: "",
        deadlineAlias: this.ruleForm.deadlineAlias, // 期限别名
        interestRateAlias: this.ruleForm.interestRateAlias, // 利率别名
        seriesId: +this.ruleForm.xilie, // 产品系列ID
        seriesName: "", //  产品系列名称
        name: this.ruleForm.productcunkuan, // 产品名称
        minAmount: +this.ruleForm.qicunjineMin, // 最小起购金额
        maxAmount: +this.ruleForm.qicunjineMax, // 最大起购金额
        amountRangeExplain: this.ruleForm.qicunfanwei, // 起购范围说明
        increaseAmount: +this.ruleForm.dizeng, // 递增金额
        productSubtype: this.serverData.productSubtype, // 产品子类型
        productSubtypeLabel: this.serverData.productSubtypeLabel, // 产品子类型Label
        typeAlias: this.ruleForm.bieming, // 产品类型（类别别名）
        renewal: this.ruleForm.zhuancun === "是" ? "YES" : "NO", // 到期是否转存
        withdrawalTime: this.ruleForm.zhiqu, // 支取时间
        withdrawalTimeLabel: "", // 支取时间Label
        regulatoryProperty: this.ruleForm.jianguan, // 监管属性
        regulatoryPropertyLabel: "",
        frequencyType: this.ruleForm.fuxipinlv, // 付息频率
        frequencyTypeLabel: "",
        currencyCode: this.ruleForm.bizhong, // 币种编码
        currencyName: "",
        currencyUnit: "",
        description: this.ruleForm.chanpinmiaoshu,
        contentVersion: this.ruleForm.contentVersion
          ? +this.ruleForm.contentVersion
          : "", // 内容版本号
        interestRates: [], // 利率信息列表
        productTags: [], // 产品标签
        selfDefiningTags: [], // 自定义标签
        activityTags: [], // 活动标签
        depositRule: this.ruleForm.cunru, // 存入规则
        transferRule: this.ruleForm.zhuanrang, // 转让规则
        rollOutRule: this.ruleForm.zhuanchu, // 转出规则
        drawRule: this.ruleForm.zhiquRule, // 支取规则
        daysInterestCalculation: this.ruleForm.jisuan_day
          ? +this.ruleForm.jisuan_day
          : "", // 利息计算天数
        buyerConvertYearRate: this.ruleForm.zhesuan
          ? this.ruleForm.zhesuan
          : "", // 买方折算年化利率
        lockinPeriod: this.ruleForm.suoding ? +this.ruleForm.suoding : "", // 锁定期
        issueBeginDate: this.ruleForm.faxing_start, // 发行开始时间
        issueEndDate: this.ruleForm.faxing_end, // 发行结束时间
        issueNum: this.ruleForm.faxing_num ? +this.ruleForm.faxing_num : "", // 发行量
        interestMode: this.ruleForm.jixi, // 计息方式
        interestModeLabel: "",
        appInfo: {
          id: +this.serverData.appInfo.id, // 主键
          productUuid: this.serverData.appInfo.productUuid, // 产品id
          shelveStatus: this.ruleForm.shangjia, // 上下架状态
          shelveStatusLabel: "",
          visaInterview: this.ruleForm.mianqian, // 是否面签
          visaInterviewLabel: "",
          recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO", // 是否推荐
          homePage: this.ruleForm.paihang === "是" ? "YES" : "NO", // 是否首页排序
          defaultBuyNum: +this.ruleForm.cunkuanbishu, // 默认存款笔数
          defaultAmount: +this.ruleForm.cunkuanmorenjine, // 默认存款金额
          realNameAuth: this.ruleForm.shiming === "是" ? "YES" : "NO", // 是否实名
          signed: this.ruleForm.qianyue === "是" ? "YES" : "NO", // 是否签约
          defaultFlowNum: +this.ruleForm.guanzhuNum, // 默认关注数量
          listAreaFlag: this.ruleForm.zhuanqubiaozhi, // 榜单专区标识
          listAreaFlagLabel: "",
          connectionMode: this.ruleForm.duijie, // 银行对接方式
          connectionModeLabel: "",
          cooperationMode: this.ruleForm.hezuoType, // 合作方式
          cooperationModeLabel: "",
          yearRate: +this.ruleForm.shoufeilv, // 年收费率
          showBankPage: this.ruleForm.yinhangpage === "是" ? "YES" : "NO", // 显示银行过渡页
          h5Url: this.ruleForm.h5Url,
          sameProductFlag: this.ruleForm.chanpinbiaozhi, // 同一产品标识
          areaCode: this.ruleForm.chanpinquyu, // 区域编码
          areaName: "",
          noviceVipReason: this.ruleForm.newPlayer, // 新手专享推荐理由
          assembleReason: this.ruleForm.pintuan, // 拼团推荐理由
          productReason: this.ruleForm.productTuiJian, // 产品推荐理由
          isAllowTransfer: this.ruleForm.zhuanrang === "是" ? "YES" : "NO", // 是否可转让
          isAllowRedeem: this.ruleForm.canShuHui === "是" ? "YES" : "NO" // 是否可以赎回
        }
      };

      let jigou_dq = xilieData.filter(
        item => item.institutionId === bigData.institutionId
      )[0];
      // 机构名称
      bigData.institutionName = jigou_dq.institutionName;
      if (this.ruleForm.xilie) {
        // 产品系列名称
        bigData.seriesName = jigou_dq.seriesList.filter(
          item => item.id === bigData.seriesId
        )[0].name;
      }
      // 支取时间Label
      bigData.withdrawalTimeLabel = bigData.withdrawalTime
        ? this.dictData.pay_time.filter(
            item => item.value === bigData.withdrawalTime
          )[0].label
        : "";
      // 监管属性Label
      bigData.regulatoryPropertyLabel = bigData.regulatoryProperty
        ? this.dictData.regulatory_property.filter(item => {
            return item.value === bigData.regulatoryProperty;
          })[0].label
        : "";
      // 付息频率Label
      bigData.frequencyTypeLabel = bigData.frequencyType
        ? this.dictData.frequency_type.filter(
            item => item.value === bigData.frequencyType
          )[0].label
        : "";
      // 币种
      if (bigData.currencyCode) {
        let kk = this.dictData.bizhong.filter(
          tar => tar.value === bigData.currencyCode
        )[0];
        bigData.currencyName = kk.label;
        bigData.currencyUnit = kk.unit;
      }

      // 上架状态
      bigData.appInfo.shelveStatusLabel = bigData.appInfo.shelveStatus
        ? this.dictData.shelve_status.filter(
            item => item.value === bigData.appInfo.shelveStatus
          )[0].label
        : "";
      // 是否面签Label
      bigData.appInfo.visaInterviewLabel = bigData.appInfo.visaInterview
        ? this.dictData.visa_interview_type.filter(
            item => item.value === bigData.appInfo.visaInterview
          )[0].label
        : "";
      // 榜单专区标识Label
      bigData.appInfo.listAreaFlagLabel = bigData.appInfo.listAreaFlag
        ? this.dictData.list_area_type.filter(
            item => item.value === bigData.appInfo.listAreaFlag
          )[0].label
        : "";

      // 银行合作方式Label
      bigData.appInfo.cooperationModeLabel = bigData.appInfo.cooperationMode
        ? this.dictData.cooperation_mode.filter(
            item => item.value === bigData.appInfo.cooperationMode
          )[0].label
        : "";
      // 银行对接方式Label
      bigData.appInfo.connectionModeLabel = bigData.appInfo.connectionMode
        ? this.dictData.bank_connection_mode.filter(
            item => item.value === bigData.appInfo.connectionMode
          )[0].label
        : "";

      // 所属区域
      bigData.appInfo.areaName = bigData.appInfo.areaCode
        ? this.dictData.quyu.filter(
            item => item.value === bigData.appInfo.areaCode
          )[0].label
        : "";
      // 计息方式Label
      bigData.interestModeLabel = bigData.interestMode
        ? this.dictData.interest_mode.filter(
            item => item.value === bigData.interestMode
          )[0].label
        : "";

      // 获取产品标签
      if (this.ruleForm.chanpinBiaoQian.length > 0) {
        this.dictData.productTags.forEach(item => {
          this.ruleForm.chanpinBiaoQian.forEach(tar => {
            if (item.id === tar) {
              bigData.productTags.push({
                id: tar,
                name: item.name
              });
            }
          });
        });
      }

      // 获取自定义标签
      if (this.ruleForm.selfBiaoQian.length > 0) {
        this.dictData.selfDefiningTags.forEach(item => {
          this.ruleForm.selfBiaoQian.forEach(tar => {
            if (item.id === tar) {
              bigData.selfDefiningTags.push({
                id: tar,
                name: item.name
              });
            }
          });
        });
      }
      // 获取活动标签
      if (this.ruleForm.actBiaoQian.length > 0) {
        this.dictData.activityTags.forEach(item => {
          this.ruleForm.actBiaoQian.forEach(tar => {
            if (item.id === tar) {
              bigData.activityTags.push({
                id: tar,
                name: item.name
              });
            }
          });
        });
      }

      bigData.interestRates = this.ruleForm.lilv.map(item => {
        let kk = {
          fromTerm: item.minDeadline !== "" ? +item.minDeadline : 1, // 最小期限
          fromTermUnitType: item.min_danwei !== "" ? item.min_danwei : "1", // 最小期限单位
          fromTermUnitLabel: "天",
          fromTermSymbolType: item.min_symbol !== "" ? item.min_symbol : "&le", // 限制条件符号
          fromTermSymbolTypeLabel: "小于等于",

          toTerm: item.maxDeadline !== "" ? +item.maxDeadline : "", // 最大期限
          toTermUnitType: item.max_danwei !== "" ? item.max_danwei : "", // 最大期限单位
          toTermUnitLabel: "",
          toTermSymbolType: item.max_symbol !== "" ? item.max_symbol : "", // 限制条件符号
          toTermSymbolTypeLabel: "",

          interestRate: +item.lilv, // 利率
          lockinPeriod: +item.lockinPeriod, // 锁定期限
          showList: item.showList, // 榜单展示
          lockinShowList: item.lockinShowList, // 锁定期榜单展示
          remark: item.remark, // 备注
          homepageCopywriting: item.homepageCopywriting, // 首页文案
          detailCopywriting: item.detailCopywriting, // 详情页文案
          bankCopywriting: item.bankCopywriting, //  银行文案
          productList: item.showProduct === "YES" ? "YES" : "NO", //  产品展示
          termCopywriting: item.bangdanWrite //  榜单期限文案
        };
        if (item.id) {
          kk.id = item.id;
          kk.spuId = item.spuId;
        } else {
          kk.spuId = this.serverData.id;
        }

        kk.fromTermUnitLabel = kk.fromTermUnitType
          ? this.dictData.deadline_type.filter(
              tar => tar.value === kk.fromTermUnitType
            )[0].label
          : "";
        kk.fromTermSymbolTypeLabel = kk.fromTermSymbolType
          ? this.dictData.rule_symbol.filter(
              tar => tar.value === kk.fromTermSymbolType
            )[0].label
          : "";

        kk.toTermUnitLabel = kk.toTermUnitType
          ? this.dictData.deadline_type.filter(
              tar => tar.value === kk.toTermUnitType
            )[0].label
          : "";
        kk.toTermSymbolTypeLabel = kk.toTermSymbolType
          ? this.dictData.rule_symbol.filter(
              tar => tar.value === kk.toTermSymbolType
            )[0].label
          : "";
        return kk;
      });
      if (!this.ruleForm.lilv.length) {
        this.$message.error("请输入利率数据！");
        return;
      }

      this.$api
        .edit_big({
          vm: this,
          data: bigData
        })
        .then(res => {
          if (res) {
            this.$message.success("修改成功");
            this.toClosebianjieDialog();
            this.$emit("toReGetData", this.forEmit);
          }
        });
    },

    putZhiNeng(xilieData) {
      let zhinengData = {
        // 利率信息列表
        id: this.serverData.id,
        uuid: this.serverData.uuid, // 产品ID
        skuId: this.serverData.skuId,
        institutionId: +this.ruleForm.jigou_name, // 机构ID
        institutionName: "", // 机构名称
        seriesId: +this.ruleForm.xilie, // 产品系列ID
        seriesName: "", // 产品系列名称
        name: this.ruleForm.productcunkuan, // 产品名称
        minAmount: +this.ruleForm.qicunjineMin, // 最小起购金额
        maxAmount: +this.ruleForm.qicunjineMax, // 最大起购金额
        amountRangeExplain: this.ruleForm.qicunfanwei, // 起购范围说明
        increaseAmount: +this.ruleForm.dizeng, // 递增金额
        productSubtype: this.serverData.productSubtype, // 产品子类型
        productSubtypeLabel: this.serverData.productSubtypeLabel, // 产品子类型Label
        typeAlias: this.ruleForm.bieming, // 产品类型（类别别名）
        deadlineAlias: this.ruleForm.deadlineAlias, // 期限别名
        interestRateAlias: this.ruleForm.interestRateAlias, // 利率别名
        renewal: this.ruleForm.zhuancun === "是" ? "YES" : "NO", // 到期是否转存
        withdrawalTime: this.ruleForm.zhiqu, // 支取时间
        interestMode: this.ruleForm.jixi, // 计息方式
        interestModeLabel: "",
        regulatoryProperty: this.ruleForm.jianguan, // 监管属性
        regulatoryPropertyLabel: "", // 监管属性Label
        frequencyType: this.ruleForm.fuxipinlv, //付息频率
        frequencyTypeLabel: "", //付息频率Label
        currencyCode: this.ruleForm.bizhong, //币种
        currencyName: "",
        currencyUnit: "",
        description: this.ruleForm.chanpinmiaoshu, // 描述
        interestRates: [],
        contentVersion: this.ruleForm.contentVersion,
        surplusQuota: this.ruleForm.shengyuED,
        surplusQuotaLabel: "",
        appInfo: {
          // 产品配置信息
          id: +this.serverData.appInfo.id, // 主键
          productUuid: this.serverData.appInfo.productUuid, // 产品id
          shelveStatus: this.ruleForm.shangjia, // 上下架状态
          shelveStatusLabel: "",
          visaInterview: this.ruleForm.mianqian, // 是否面签
          visaInterviewLabel: "",
          recommend: this.ruleForm.tuijian === "是" ? "YES" : "NO", //是否推荐
          homePage: this.ruleForm.paihang === "是" ? "YES" : "NO", //是否首页排序
          listAreaFlag: this.ruleForm.zhuanqubiaozhi, // 榜单专区标识
          listAreaFlagLabel: "", // 榜单专区标识Label
          cooperationMode: this.ruleForm.hezuoType, // 合作方式
          cooperationModeLabel: "", //合作方式Label
          yearRate: +this.ruleForm.shoufeilv, // 年收费率
          autoShelve: this.ruleForm.autoUpDown === "是" ? "YES" : "NO", //自动上架
          showBankPage: this.ruleForm.yinhangpage === "是" ? "YES" : "NO", // 显示银行过渡页
          connectionMode: this.ruleForm.duijie, // 银行对接方式
          connectionModeLabel: "", // 银行对接方式Label
          h5Url: this.ruleForm.h5Url, //H5链接
          defaultBuyNum: +this.ruleForm.cunkuanbishu, // 默认购买数量
          defaultAmount: +this.ruleForm.cunkuanmorenjine, // 默认购买金额
          defaultFlowNum: +this.ruleForm.guanzhuNum, // 默认关注数量
          sameProductFlag: this.ruleForm.chanpinbiaozhi, // 同一产品标识
          realNameAuth: this.ruleForm.shiming === "是" ? "YES" : "NO", // 是否实名
          signed: this.ruleForm.qianyue === "是" ? "YES" : "NO", // 是否签约
          areaCode: this.ruleForm.chanpinquyu,
          areaName: ""
        },
        productTags: [],
        selfDefiningTags: [],
        activityTags: []
      };

      let jigou_dq = xilieData.filter(
        item => item.institutionId === zhinengData.institutionId
      )[0];
      // 机构名称
      zhinengData.institutionName = jigou_dq.institutionName;

      if (this.ruleForm.xilie) {
        // 产品系列名称
        zhinengData.seriesName = jigou_dq.seriesList.filter(
          item => item.id === zhinengData.seriesId
        )[0].name;
      }
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
      // 剩余额度Label
      zhinengData.surplusQuotaLabel = zhinengData.surplusQuota
        ? this.dictData.surplus_quota.filter(
            item => item.value === zhinengData.surplusQuota
          )[0].label
        : "";

      // 监管属性Label
      zhinengData.regulatoryPropertyLabel = zhinengData.regulatoryProperty
        ? this.dictData.regulatory_property.filter(
            item => item.value === zhinengData.regulatoryProperty
          )[0].label
        : "";
      // 付息频率Label
      zhinengData.frequencyTypeLabel = zhinengData.frequencyType
        ? this.dictData.frequency_type.filter(
            item => item.value === zhinengData.frequencyType
          )[0].label
        : "";
      // 币种
      if (zhinengData.currencyCode) {
        let kk = this.dictData.bizhong.filter(
          tar => tar.value === zhinengData.currencyCode
        )[0];
        zhinengData.currencyName = kk.label;
        zhinengData.currencyUnit = kk.unit;
      }
      // 上架状态
      zhinengData.appInfo.shelveStatusLabel = zhinengData.appInfo.shelveStatus
        ? this.dictData.shelve_status.filter(
            item => item.value === zhinengData.appInfo.shelveStatus
          )[0].label
        : "";
      // 是否面签Label
      zhinengData.appInfo.visaInterviewLabel = zhinengData.appInfo.visaInterview
        ? this.dictData.visa_interview_type.filter(
            item => item.value === zhinengData.appInfo.visaInterview
          )[0].label
        : "";
      // 榜单专区标识Label
      zhinengData.appInfo.listAreaFlagLabel = zhinengData.appInfo.listAreaFlag
        ? this.dictData.list_area_type.filter(
            item => item.value === zhinengData.appInfo.listAreaFlag
          )[0].label
        : "";

      // 银行合作方式Label
      zhinengData.appInfo.cooperationModeLabel = zhinengData.appInfo
        .cooperationMode
        ? this.dictData.cooperation_mode.filter(
            item => item.value === zhinengData.appInfo.cooperationMode
          )[0].label
        : "";
      // 银行对接方式Label
      zhinengData.appInfo.connectionModeLabel = zhinengData.appInfo
        .connectionMode
        ? this.dictData.bank_connection_mode.filter(
            item => item.value === zhinengData.appInfo.connectionMode
          )[0].label
        : "";

      // 所属区域
      zhinengData.appInfo.areaName = zhinengData.appInfo.areaCode
        ? this.dictData.quyu.filter(
            item => item.value === zhinengData.appInfo.areaCode
          )[0].label
        : "";

      // 获取产品标签
      if (this.ruleForm.chanpinBiaoQian.length > 0) {
        this.dictData.productTags.forEach(item => {
          this.ruleForm.chanpinBiaoQian.forEach(tar => {
            if (item.id === tar) {
              zhinengData.productTags.push({
                id: tar,
                name: item.name
              });
            }
          });
        });
      }

      // 获取自定义标签
      if (this.ruleForm.selfBiaoQian.length > 0) {
        this.dictData.selfDefiningTags.forEach(item => {
          this.ruleForm.selfBiaoQian.forEach(tar => {
            if (item.id === tar) {
              zhinengData.selfDefiningTags.push({
                id: tar,
                name: item.name
              });
            }
          });
        });
      }
      // 获取活动标签
      if (this.ruleForm.actBiaoQian.length > 0) {
        this.dictData.activityTags.forEach(item => {
          this.ruleForm.actBiaoQian.forEach(tar => {
            if (item.id === tar) {
              zhinengData.activityTags.push({
                id: tar,
                name: item.name
              });
            }
          });
        });
      }
      if (!this.ruleForm.lilv.length) {
        this.$message.error("请输入利率数据！");
        return;
      }

      zhinengData.interestRates = this.ruleForm.lilv.map(item => {
        let kk = {
          fromTerm: item.minDeadline !== "" ? +item.minDeadline : 1, // 最小期限
          fromTermUnitType: item.min_danwei !== "" ? item.min_danwei : "1", // 最小期限单位
          fromTermUnitLabel: "天",
          fromTermSymbolType: item.min_symbol !== "" ? item.min_symbol : "&le", // 限制条件符号
          fromTermSymbolTypeLabel: "小于等于",

          toTerm: item.maxDeadline !== "" ? +item.maxDeadline : "", // 最大期限
          toTermUnitType: item.max_danwei !== "" ? item.max_danwei : "", // 最大期限单位
          toTermUnitLabel: "",
          toTermSymbolType: item.max_symbol !== "" ? item.max_symbol : "", // 限制条件符号
          toTermSymbolTypeLabel: "",

          interestRate: +item.lilv, // 利率
          lockinPeriod: +item.lockinPeriod, // 锁定期限
          showList: item.showList, // 榜单展示
          lockinShowList: item.lockinShowList, // 锁定期榜单展示
          remark: item.remark, // 备注
          homepageCopywriting: item.homepageCopywriting, // 首页文案
          detailCopywriting: item.detailCopywriting, // 详情页文案
          bankCopywriting: item.bankCopywriting, //  银行文案

          productList: item.showProduct === "YES" ? "YES" : "NO", //  产品展示
          termCopywriting: item.bangdanWrite //  榜单期限文案
        };
        if (item.id) {
          kk.id = item.id;
          kk.spuId = item.spuId;
        } else {
          kk.spuId = this.serverData.id;
        }

        kk.fromTermUnitLabel = kk.fromTermUnitType
          ? this.dictData.deadline_type.filter(
              tar => tar.value === kk.fromTermUnitType
            )[0].label
          : "";
        kk.fromTermSymbolTypeLabel = kk.fromTermSymbolType
          ? this.dictData.rule_symbol.filter(
              tar => tar.value === kk.fromTermSymbolType
            )[0].label
          : "";

        kk.toTermUnitLabel = kk.toTermUnitType
          ? this.dictData.deadline_type.filter(
              tar => tar.value === kk.toTermUnitType
            )[0].label
          : "";
        kk.toTermSymbolTypeLabel = kk.toTermSymbolType
          ? this.dictData.rule_symbol.filter(
              tar => tar.value === kk.toTermSymbolType
            )[0].label
          : "";
        return kk;
      });
      this.$api
        .edit_ZhiNeng({
          vm: this,
          data: zhinengData
        })
        .then(res => {
          if (res) {
            this.$message.success("修改成功");
            this.toClosebianjieDialog();
            this.$emit("toReGetData", this.forEmit);
          }
        });
    },
    /****************************************************************************************/
    // 控制当前页面显示哪些
    isToShow(name) {
      return this.show.some(item => item === name);
    },
    // 用来判断点击编辑时当前页需要显示的表单项
    isToedit(name) {
      return this.edit.some(item => item === name);
    },
    // 点击机构名称
    toJiGou() {
      sessionStorage.setItem("page", "机构管理");
      this.$router.push({
        name: "organizational_info",
        query: {
          id: this.pageData.forProduct
            ? this.pageData.forProduct.institutionId
            : this.pageData.datas.institutionId,
          institutionName: this.pageData.forProduct
            ? this.pageData.forProduct.institutionName
            : this.pageData.datas.institutionName
        }
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
      this.ruleForm = null;
      this.$refs["ruleForm"].resetFields();
    }
  }
};
</script>
