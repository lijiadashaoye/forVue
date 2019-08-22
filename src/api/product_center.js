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
    //////////////////////////////////////////////////////////////////////////////////
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
            url: `product/pureDebtFund/detail/${data.data}`
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

    // 获取认购
    get_rengou(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/pureDebtFund/${data.type}/${data.id}`
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
            url: `/product/productSeries/tree/wmp`,
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

    //新增产品系列
    add_productSeries(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: '/product/productSeries',
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
            url: `/product/wmp/${data.data}`,
        })
    },
    // 获取理财产品详情
    get_licai_info_data(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/product/wmp/detail/${data.data}`,
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
    // 存款管理左侧系列的新增、编辑
    left_xilie(data) {
        return data.vm.$axios({
            method: data.httpType,
            url: `/product/productSeries`,
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

}