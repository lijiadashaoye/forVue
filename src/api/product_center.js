import qs from 'qs';
export default {

    // 获取字典数据
    get_dict(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/admin/dict/type/${data.data}`,
        })
    },
    // 其他get方法的数据获取
    get_fn(data) {
        return data.vm.$axios({
            method: 'get',
            url: data.url,
        })
    },
    // 其他get方法的数据获取
    post_fn(data) {
        return data.vm.$axios({
            method: 'post',
            url: data.url,
            data: data.data
        })
    },
    // 检查系列之类的是否可以删除
    // 1 机构  2基金公司  3 系列
    check_type(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/appInfo/isDel/${data.id}/${data.type}`,
        })
    },
    ///////////////////////////////////////////////////////////////////////////////////
    // 纯债基金管理
    // 分页列表数据
    get_chunzhaiList(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/pureDebtFund/page?${qs.stringify(data.data)}`,
        })
    },

    // 删除纯债基金
    product_chunzhai_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/pureDebtFund/${data.data}`,
        })
    },
    // 上/下架
    product_chunzhai_UpDown(data) {
        let url = '';
        if (data.data.status === 'YES') {
            url = `/product/appInfo/shelve/${data.data.id}`
        } else {
            url = `/product/appInfo/unShelve/${data.data.id}`
        }
        return data.vm.$axios({
            method: 'put',
            url: url,
        })
    },
    // 新增纯债基金
    add_chunzhai(data) {
        return data.vm.$axios({
            method: 'post',
            url: 'product/pureDebtFund',
            data: data.data
        })
    },
    // 获取纯债基金详情
    getChunZhaiInfo(data) {
        return data.vm.$axios({
            method: 'get',
            url: `product/pureDebtFund/${data.data}`
        })
    },
    //获取纯债基金编辑信息
    getChunZhaiInfoData(data) {
        return data.vm.$axios({
            method: 'get',
            url: `product/pureDebtFund/pureDebtFundDetail/${data.data}`
        })
    },
    //编辑纯债基金
    putChunZhaiEdit(data) {
        return data.vm.$axios({
            method: 'put',
            url: `product/pureDebtFund`,
            data: data.data
        })
    },

    // 获取纯债基金净值
    get_jingzhi(data) {
        return data.vm.$axios({
            method: 'get',
            url: `product/pureDebtFund/net_detail/${data.id}/${data.time}`
        })
    },
    //更新净值
    post_jingzhi(data) {
        return data.vm.$axios({
            method: 'post',
            url: `product/pureDebtFund/netValue`,
            data: data.data
        })
    },
    //更新业绩
    post_yeji(data) {
        return data.vm.$axios({
            method: 'post',
            url: `product/pureDebtFund/performance`,
            data: data.data
        })
    },
    // 获取认购
    get_rengou(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/pureDebtFund/pageBuyRule?${qs.stringify(data.data)}`
        })
    },
    // 新增、编辑认购
    put_post_rengou(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/pureDebtFund/subscribeRule`,
            data: data.data
        })
    },
    // 删除认购
    rengou_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/pureDebtFund/subscribeRule/${data.id}`,
        })
    },

    // 获取申购
    get_shengou(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/pureDebtFund/pageBuyRule?${qs.stringify(data.data)}`
        })
    },
    // 新增、编辑申购
    put_post_shengou(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/pureDebtFund/applyForPurchaseRule`,
            data: data.data
        })
    },
    // 删除申购
    shengou_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/pureDebtFund/applyForPurchaseRule/${data.id}`,
        })
    },

    // 获取赎回
    get_shuhui(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/pureDebtFund/pageRedemptionRule?${qs.stringify(data.data)}`
        })
    },
    // 新增、编辑赎回
    put_post_shuhui(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/pureDebtFund/redemptionRule`,
            data: data.data
        })
    },
    // 删除赎回
    shuhui_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/pureDebtFund/redemptionRule/${data.id}`,
        })
    },
    //////////////////////////////////////////////////////////////////////////////////
    // 货币基金
    // 分页列表
    get_huobiList(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/monetaryFund/page?${qs.stringify(data.data)}`,
        })
    },
    // 新增货币基金
    add_huobijijin(data) {
        return data.vm.$axios({
            method: 'post',
            url: 'product/monetaryFund',
            data: data.data
        })
    },
    //获取货币基金编辑信息(复制、编辑)
    get_huobi_edit_data(data) {
        return data.vm.$axios({
            method: 'get',
            url: `product/monetaryFund/${data.data}`
        })
    },
    //获取货币基金页面展示信息
    get_huobi_info_data(data) {
        return data.vm.$axios({
            method: 'get',
            url: `product/monetaryFund/detail/${data.data}`
        })
    },
    //编辑货币基金
    putHuoBiEdit(data) {
        return data.vm.$axios({
            method: 'put',
            url: `product/monetaryFund`,
            data: data.data
        })
    },
    // 删除货币基金
    product_huobi_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/monetaryFund/${data.data}`,
        })
    },
    get_huobi_chartData(data) {
        return data.vm.$axios({
            method: 'get',
            url: `product/monetaryFund/yield/${data.id}/${data.time}`,
        })
    },

    //更新收益
    post_shouyi(data) {
        return data.vm.$axios({
            method: 'post',
            url: `product/monetaryFund/yield`,
            data: data.data
        })
    },

    //////////////////////////////////////////////////////////////////////////////////
    // 理财产品
    // 分页列表
    get_licaiList(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/wmp/page?${qs.stringify(data.data)}`,
        })
    },
    // "pure_debt_fund", "纯债基金"；
    // monetary_fund", "货币基金"；
    // "wmf", "理财产品"；

    // 获取tree数据
    get_licaiTree(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/productSeries/tree/${data.type}`,
        })
    },
    // 新增理财产品
    add_licai(data) {
        // console.log(data)
        return data.vm.$axios({
            method: 'post',
            url: '/product/wmp',
            data: data.data
        })
    },


    // 获取理财产品信息
    getLiCaiInfoData(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/wmp/${data.data}`,
        })
    },
    // 删除理财产品
    product_licai_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/wmp/${data.type}${data.data}`,
        })
    },
    // 获取理财产品详情
    get_licai_info_data(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/wmp/detail/${data.data}`,
        })
    },

    // 保险产品详情
    get_baoxian_info_data(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/wmp/insurance/detail/${data.data}`,
        })
    },
    // 编辑理财管理
    put_LiCai_data(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/product/wmp`,
            data: data.data
        })
    },

    //////////////////////////////////////////////////////////////////////////////////
    // 存款管理
    // 存款管理获取tree数据
    // "deposit", "存款产品"；
    get_treeData(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/productSeries/tree/deposit`,
        })
    },
    // 获取页面初始化列表数据、查询
    get_cunkuanlistData(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/deposit/page?${qs.stringify(data.data)}`,
        })
    },
    // 删除列表项
    product_cunkuan_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/deposit/demand/${data.data}`,
        })
    },
    // 详情页面里的存款产品删除按钮
    xiangqing_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/${data.type}/${data.data}`,
        })
    },
    //新增产品系列
    add_xilie(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: '/product/productSeries',
            data: data.data
        })
    },
    // 存款管理左侧系列的删除
    left_xilie_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/productSeries/${data.id}`,
        })
    },
    /************************************************************/
    //新增活期存款
    add_newHuoQi(data) {
        return data.vm.$axios({
            method: 'post',
            url: '/product/deposit/demand',
            data: data.data
        })
    },

    // 活期存款查看详情
    huoqi_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `product/deposit/demand/detail/${data.data}`
        })
    },

    // 存款管理详情页面编辑按钮点击获取数据
    huoqi_edit_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/deposit/demand/${data.data}`,
        })
    },

    // 编辑活期存款
    edit_HuoQi(data) {
        return data.vm.$axios({
            method: 'put',
            url: '/product/deposit/demand',
            data: data.data
        })
    },
    /************************************************************/
    // 新增定期存款
    save_dingqi(data) {
        return data.vm.$axios({
            method: 'post',
            url: '/product/deposit/time',
            data: data.data
        })
    },
    // 定期存款查看详情
    dingqi_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `product/deposit/time/detail/${data.data}`
        })
    },

    // 存款管理详情页面编辑按钮点击获取数据
    dingqi_edit_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/deposit/time/${data.data}`,
        })
    },
    // 编辑活期存款
    edit_DingQi(data) {
        return data.vm.$axios({
            method: 'put',
            url: '/product/deposit/time',
            data: data.data
        })
    },
    /************************************************************/
    // 新增智能存款
    save_zhineng(data) {
        return data.vm.$axios({
            method: 'post',
            url: '/product/deposit/intelligent',
            data: data.data
        })
    },

    // 智能存款查看详情
    zhineng_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `product/deposit/intelligent/detail/${data.data}`
        })
    },

    // 存款管理详情页面编辑按钮点击获取数据 智能存款
    zhineng_edit_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/deposit/intelligent/${data.data}`,
        })
    },
    // 编辑智能存款
    edit_ZhiNeng(data) {
        return data.vm.$axios({
            method: 'put',
            url: '/product/deposit/time',
            data: data.data
        })
    },
    // 智能存款的利率表格点击编辑
    get_lilv(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/deposit/interest/${data.id}`,
        })
    },
    // 智能存款、定期存款的利率表格上传数据
    lilv_list(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/deposit/interest`,
            data: data.data
        })
    },
    // 智能存款的利率表格点击删除
    delete_lilv(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/deposit/interest/${data.data}`,
        })
    },
    /************************************************************/

    // 新增结构存款
    save_jiegou(data) {
        return data.vm.$axios({
            method: 'post',
            url: '/product/deposit/structured',
            data: data.data
        })
    },
    // 结构存款查看详情
    jigou_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `product/deposit/structured/detail/${data.data}`
        })
    },

    // 存款管理详情页面编辑按钮点击获取数据 结构存款
    jiegou_edit_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/deposit/structured/${data.data}`,
        })
    },
    // 编辑智能存款
    edit_JieGou(data) {
        return data.vm.$axios({
            method: 'put',
            url: '/product/deposit/structured',
            data: data.data
        })
    },
    /************************************************************/

    // 新增大额存款
    save_big(data) {
        return data.vm.$axios({
            method: 'post',
            url: '/product/deposit/largeDeposit',
            data: data.data
        })
    },
    // 大额存款查看详情
    big_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `product/deposit/largeDeposit/${data.data}`
        })
    },
    // 编辑活期存款
    edit_big(data) {
        return data.vm.$axios({
            method: 'put',
            url: '/product/deposit/largeDeposit',
            data: data.data
        })
    },

    //////////////////////////////////////////////////////////////////////////////////
    // 机构管理
    // 分页列表
    get_jigouList(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/institution/page?${qs.stringify(data.data)}`,
        })
    },

    //新增机构
    add_newJiGou(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: '/product/institution',
            data: data.data
        })
    },

    // 机构管理点击机构名称查看详情
    get_jigouInfo(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/institution/${data.id}`,
        })
    },
    // 机构管理删除机构
    product_jigou_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/institution/${data.data}`,
        })
    },

    product_all_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: data.url,
        })
    },
    // 机构管理签约
    product_jigou_qianyue(data) {
        let url = '';
        if (data.data.status === 'YES') {
            url = `/product/institution/signUp/${data.data.id}`
        } else {
            url = `/product/institution/terminate/${data.data.id}`
        }
        return data.vm.$axios({
            method: 'post',
            url: url,
        })
    },
    //////////////////////////////////////////////////////////////////
    // 基金公司管理

    // 获取基金公司列表
    get_jijingongsi(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/fundHouse/page?${qs.stringify(data.data)}`,
        })
    },
    // 新增基金公司
    save_jijingonsi(data) {
        return data.vm.$axios({
            method: 'post',
            url: '/product/fundHouse',
            data: data.data
        })
    },
    // 获取基金公司信息
    get_jijingongsi_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/fundHouse/${data.id}`,
        })
    },

    // 删除基金公司
    product_jijin_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/fundHouse/${data.data}`,
        })
    },
    // 新增基金公司
    put_jijingonsi(data) {
        return data.vm.$axios({
            method: 'put',
            url: '/product/fundHouse',
            data: data.data
        })
    },

    //////////////////////////////////////////////////////////////////////

    // 获取标签列表
    get_markList(data) {
        return data.vm.$axios({
            method: 'post',
            url: `/product/tag/list`,
            data: data.data
        })
    },
    // 新增标签
    marks_action(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/tag/${data.type}`,
            data: data.data
        })
    },
    // 获取标签列表
    delete_marks(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/tag/${data.data}`,
        })
    },
    // 上下架产品时查询产品设置
    get_where(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/appInfo/validPro/${data.data}`,
        })
    },
    //////////////////////////////////////////////////////////////////////

    // 新增保险
    add_baoxian(data) {
        return data.vm.$axios({
            method: 'post',
            url: `/product/wmp/insurance/add`,
            data: data.data
        })
    },
    // 修改保险
    edit_baoxian(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/product/wmp/insurance/update`,
            data: data.data
        })
    },
    /////////////////////////////////////////////////////////////////////
    // 获取产品协议列表、查询
    product_agreement_list(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/agreement/listPage?${qs.stringify(data.search)}`,
        })
    },
    // 删除协议
    delete_product_agreement(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/agreement/${data.id}`,
        })
    },
    // 新增、修改协议
    add_product_agreement(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/agreement`,
            data: data.data
        })
    },

    // 获取产品协议详情
    product_agreement_single(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/agreement/${data.data}`,
        })
    },
    /////////////////////////////////////////////////////////////
    // 币种管理查询
    coin_list(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/product_currency/page?${qs.stringify(data.search)}`,
        })
    },
    // 获取产品协议详情
    coin_info(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/product_currency/detail/${data.data}`,

        })
    },

    // 新增、修改币种
    coin_add(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/product_currency/currency`,
            data: data.data
        })
    },

    // 删除协议
    coin_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/product_currency/currency/${data.id}`,
        })
    },


    // 首页期限配置管理 > 首页期限列表同步按钮
    tongbu(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/indexPeriod/resetPeriodProducts`,
        })
    },

    /////////////////////////////////////////////////////////
    // 获取投融资产品列表
    get_financingList(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/investment/page?${qs.stringify(data.data)}`,
        })
    },
    // 获取投融资产品详情
    getFinancing(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/investment/${data.id}`,
        })
    },

    // 新增投融资
    add_financing(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/investment`,
            data: data.data
        })
    },

    // 删除投融资产品
    financing_delete(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/product/investment/${data.data}`,
        })
    },
    //////////////////////////////////////////////////////////////////////
    // 获取投融资告知书详情
    risk_notice_item(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/investment/risk/${data.id}`,
        })
    },
    // 获取投融资告知书列表
    risk_notice_list(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/investment/risk/page?${qs.stringify(data.search)}`,
        })
    },
    // 新增投融资
    risk_notice(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/investment/risk`,
            data: data.data
        })
    },
    //////////////////////////////////////////////////////////

    // 获取投融资告知书详情
    get_project_description(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/investment/project/${data.id}`,
        })
    },

    // 新增、修改项目说明书
    add_project_description(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/investment/project`,
            data: data.data
        })
    },
    // 获取项目说明书列表
    get_project_description_list(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/investment/project/page?${qs.stringify(data.search)}`,
        })
    },
    // 更新历史
    toEditHistory(data) {
        return data.vm.$axios({
            method: 'get',
            url: `${data.url}?${qs.stringify(data.data)}`,
        })
    },
    // 保存纯债基金的更新历史
    save_toEditHistory(data) {
        return data.vm.$axios({
            method: 'put',
            url: data.url,
            data: data.data
        })
    }

}