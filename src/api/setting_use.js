import {
    AxiosGet,
    AxiosDelete,
    AxiosPost,
    AxiosPut
} from '../sets/axiosMethods';



//获取渠道
export const getAppChannel = (type) => {
    return AxiosGet(`/admin/dict/type/${type}`)
}
//上传图片
export const upLoadImg = (data) => {
    return AxiosPost(`/admin/file/up/setting`, data)
}

//大文件接口   视频之类的
export const bigFileUpload = (data) => {
    return AxiosPost(`/admin/file/slice-up/setting`,data)
}

//机构列表
export const institutionList = (data) => {
    return AxiosGet(`/product/institution/list`, data)
}

//查询产品
export const productList = (data) => {
    return AxiosGet(`/setting/manager/confing-url/product-list`, data)
}

//直销银行
export const searchBank = (data)=> {
    return AxiosGet(`/setting/manager/bank-card/searchBank`,data)
}

//app按钮列表数据
export const getMenuData = (data) => {
    return AxiosGet(`/setting/manager/app-button`, data)
}

//修改状态
export const app_button_status = (data) => {
    return AxiosPut(`/setting/manager/app-button/status`, data)
}



//新增app按钮
export const app_button_add = (data) => {
    return AxiosPost(`setting/manager/app-button`, data)
}

//修改app按钮
export const app_button_upd = (data) => {
    return AxiosPut(`setting/manager/app-button/`, data)
}

//删除app按钮
export const app_button_del = (id) => {
    return AxiosDelete(`setting/manager/app-button/${id}`)
}

/**
 * app配置-广告图位置模块
 */
// app-广告图位置-列表
export const position_map_list = (data) => {
    return AxiosPost(`configuration/bannerPosition/select`, data)
}
// app-广告图位置-添加
export const position_map_add = (data) => {
    return AxiosPost(`configuration/bannerPosition`,data)
}
// app-广告图位置-修改
export const position_map_upd = (data) => {
    return AxiosPut(`configuration/bannerPosition`,data)
}
// app-广告图位置-删除
export const position_map_del = (data) => {
    return AxiosPost(`configuration/bannerPosition/delete`,data)
}
// app-广告图位置-详情
export const position_map_detail = (id) => {
    // let obj = {
    //     id:id
    // }
    return AxiosGet(`configuration/bannerPosition/${id}`)
}
/**
 * app配置-广告图模块
 */
// app-广告图-列表
export const activity_map_list = (data) => {
    return AxiosPost(`configuration/banner/select`, data)
}
// app-广告图-添加
export const activity_map_add = (data) => {
    return AxiosPost(`configuration/banner`,data)
}
// app-广告图-修改
export const activity_map_upd = (data) => {
    return AxiosPut(`configuration/banner`,data)
}
// app-广告图-删除
export const activity_map_del = (id) => {
    return AxiosDelete(`configuration/banner/${id}`)
}
// app-广告图-详情
export const activity_map_detail = (id) => {
    return AxiosGet(`configuration/banner/${id}`)
}
/**
 * app配置-升级弹框
 */
// app-升级弹框-更新弹框
export const upgrade_box_add = (data) => {
    return AxiosPost(`configuration/bannerUpgrade`,data)
}
// app-升级弹框-查询最新一条信息
export const upgrade_box_detail = (id) => {
    return AxiosGet(`configuration/bannerUpgrade/${id}`)
}
/**
 * app配置-底部菜单和导航条
 */
// app-创建底部菜单和导航条
export const bannerMenu_add = (data) => {
    return AxiosPost(`configuration/bannerMenu`,data)
}
// app-查询所有的底部菜单和导航条
export const bannerMenu_list = (data) => {
    return AxiosGet(`configuration/bannerMenu`,data)
}


//活动按钮

//活动按钮列表
export const activity_button_list = (data) => {
    return AxiosGet(`setting/manager/activity-button`, data)
}

//活动列表
export const activity_list = () => {
    return AxiosGet(`marketing/manager/activity`)
}

//添加活动按钮
export const activity_button_add = (data) => {
    return AxiosPost(`setting/manager/activity-button/`, data)
}

//删除
export const activity_button_del = (id) => {
    return AxiosDelete(`setting/manager/activity-button/${id}`)
}

//修改活动按钮
export const activity_button_upd = (data) => {
    return AxiosPut(`setting/manager/activity-button/`, data)
}




//爆款

//爆款获取列表数据
export const explosive_list = (data) => {
    return AxiosGet('product/manager/explosive', data)
}

//爆款删除
export const explosive_delete = (id) => {
    return AxiosDelete(`product/manager/explosive/${id}`)
}

//新增爆款
export const explosive_add = (obj) => {
    return AxiosPost(`product/manager/explosive`, obj)
}

//修改爆款产品
export const explosive_updata = (obj) => {
    return AxiosPut(`product/manager/explosive`, obj)
}

//新手专享

//新手列表
export const commend_list = (data) => {
    return AxiosGet(`product/manager/explosive`, data)
}

//新增新手
export const commend_add = (obj) => {
    return AxiosPost(`product/manager/explosive`, obj)
}

//修改新手产品
export const commend_updata = (obj) => {
    return AxiosPut(`product/manager/explosive`, obj)
}

//删除新手
export const commend_delete = (id) => {
    return AxiosDelete(`product/manager/explosive/${id}`)
}

//余额宝

//余额宝列表数据
export const yuebao_list = (data) => {
    return AxiosGet(`setting/manager/yuebao-rate`, data)
}

//余额宝列表删除
export const yuebao_delete = (id) => {
    return AxiosDelete(`setting/manager/yuebao-rate/${id}`)
}

//余额宝新增
export const yuebao_add = (obj) => {
    return AxiosPost(`setting/manager/yuebao-rate`, obj)
}

//余额宝修改
export const yuebao_updata = (obj) => {
    return AxiosPut(`setting/manager/yuebao-rate`, obj)
}

//服务协议

//协议列表
export const protocol_list = (data) => {
    // console.log(data)
    return AxiosGet(`setting/manager/commonly-config`, data)
}

// 添加服务协议/隐私政策
export const protocol_add = (data) => {
    return AxiosPost(`setting/manager/commonly-config`, data)
}

//服务协议详情
export const protocol_detail = (id) => {
    return AxiosGet(`setting/manager/commonly-config/${id}`)
}

//修改服务协议
export const protocol_upd = (data) => {
    return AxiosPut(`setting/manager/commonly-config`, data)
}

//服务协议列表删除
export const protocol_delete = (id) => {
    return AxiosDelete(`setting/manager/commonly-config/${id}`)
}


//登录页管理

//登录页列表数据
export const loginSpread_list = (obj) => {
    return AxiosGet(`setting/manager/login-page-spread`, obj)
}

//添加登录页列表数据
export const loginSpread_add = (data) => {
    return AxiosPost(`setting/manager/login-page-spread`, data)
}

//删除列表数据
export const loginSpread_del = (id) => {
    return AxiosDelete(`setting/manager/login-page-spread/${id}`)
}

//更改状态
export const loginSpread_status_upd = (data) => {
    return AxiosPut(`setting/manager/login-page-spread/status`, data)
}

//修改列表数据
export const loginSpread_updata = (data) => {
    return AxiosPut(`setting/manager/login-page-spread`, data)
}

//银行
//银行列表数据
export const bank_list = (data) => {
    return AxiosGet(`setting/manager/bank`, data)
}

//添加银行列表数据
export const bank_add = (data) => {
    return AxiosPost(`setting/manager/bank`, data)
}

//删除银行列表数据
export const bank_list_delete = (id) => {
    return AxiosDelete(`setting/manager/bank/${id}`)
}

//修改银行列表
export const bank_list_upd = (data) => {
    return AxiosPut(`setting/manager/bank`, data)
}


//黑名单

//黑名单列表
export const black_list = (obj) => {
    return AxiosGet(`member/manager/member-black-list`, obj)
}

//黑名单删除
export const black_list_del = (id) => {
    return AxiosDelete(`member/manager/member-black-list/${id}`)
}


//黑名单编辑
export const black_list_upd = (data) => {
    return AxiosPut(`member/manager/member-black-list/`, data)
}


//黑名单添加
export const black_list_add = (data) => {
    return AxiosPost(`member/manager/member-black-list/`, data)
}


//黑名单详情
export const black_list_detail = (id) => {
    return AxiosGet(`member/manager/member-black-list/${id}`)
}





//银行卡片

//银行卡片列表
export const bank_card_list = (obj) => {
    return AxiosGet(`setting/manager/bank-card`, obj)
}


//银行卡删除
export const bank_card_del = (id) => {
    return AxiosDelete(`setting/manager/bank-card/${id}`)
}

//银行卡修改
export const bank_card_upd = (obj) => {
    return AxiosPut(`setting/manager/bank-card`, obj)
}

//银行卡添加
export const bank_card_add = (obj) => {
    return AxiosPost(`setting/manager/bank-card`, obj)
}

//银行卡详情
export const bank_card_detail = (id) => {
    return AxiosGet(`setting/manager/bank-card/${id}`)
}




//支持开户的银行


//开户银行列表
export const bank_support_list = (obj) => {
    return AxiosGet(`setting/manager/bank-support-deposit`, obj)
}

//开户行删除
export const bank_support_del = (id) => {
    return AxiosDelete(`setting/manager/bank-support-deposit/${id}`)
}

//添加开户银行
export const bank_support_add = (data) => {
    return AxiosPost(`setting/manager/bank-support-deposit`, data)
}

//修改开户银行
export const bank_support_upd = (obj) => {
    return AxiosPut(`setting/manager/bank-support-deposit`, obj)
}


//   新闻管理

//列表
export const news_manager_list = (data) => {
    return AxiosPost(`/setting/manager/news-manage/select`, data)
}

//新增新闻
export const news_manger_add = (data) => {
    return AxiosPost(`/setting/manager/news-manage`, data)
}

//是否置顶
export const news_isTop = (data) => {
    return AxiosPut(`/setting/manager/news-manage/status`, data)
}

//删除
export const news_delete = (id) => {
    return AxiosDelete(`/setting/manager/news-manage/${id}`)
}

//修改
export const news_upData = (data) => {
    return AxiosPut(`/setting/manager/news-manage/`, data)
}


//广告管理

//列表
export const adverdis_list = (data) => {
    return AxiosGet(`setting/manager/advertis-manage`, data)
}
// 新增
export const adverdis_add = (data) => {
    return AxiosPost(`setting/manager/advertis-manage`, data)
}
// 详情
export const adverdis_detail = (data) => {
    return AxiosGet(`setting/manager/advertis-manage/${data.id}`)
}
// 修改
export const adverdis_edit = (data) => {
    return AxiosPut(`setting/manager/advertis-manage`, data)
}
// 删除
export const adverdis_del = (data) => {
    return AxiosDelete(`setting/manager/advertis-manage/${data.id}`)
}

//版本管理

//列表
export const clientVersion_list = (data) => {
    return AxiosGet(`setting/manager/client-version`, data)
}
// 新增
export const clientVersion_add = (data) => {
    return AxiosPost(`setting/manager/client-version`, data)
}
// 详情
export const clientVersion_detail = (data) => {
    return AxiosGet(`setting/manager/client-version/${data.id}`)
}
// 修改
export const clientVersion_edit = (data) => {
    return AxiosPut(`setting/manager/client-version`, data)
}
// 删除
export const clientVersion_del = (data) => {
    return AxiosDelete(`setting/manager/client-version/${data.id}`)
}

// 建议与反馈
//列表
export const proposal_list = (data) => {
    return AxiosGet(`setting/manager/proposal`, data)
}

// 删除
export const proposal_del = (data) => {
    return AxiosDelete(`setting/manager/proposal/${data.id}`)
}


//启动页

//列表
export const getAdverdisList = (data) => {
    return AxiosGet(`/setting/manager/advertis`, data)
}

//新增
export const adverdis_Page_add = (data) => {
    return AxiosPost(`/setting/manager/advertis`, data)
}

//删除
export const adverdis_Page_del = (id) => {
    return AxiosDelete(`/setting/manager/advertis/${id}`)
}

//停用启用
export const adverdis_list_status = (data) => {
    return AxiosPut(`/setting/manager/advertis/status`, data)
}

//修改
export const adverdis_list_upData = (data) => {
    return AxiosPut(`/setting/manager/advertis`, data)
}


//侧边栏

//列表数据
export const slider_list = (data) => {
    return AxiosGet(`/setting/manager/sidebar`, data)
}

//增加
export const slider_add = (data) => {
    return AxiosPost(`/setting/manager/sidebar`, data)
}

//修改
export const slider_updata = (data) => {
    return AxiosPut(`/setting/manager/sidebar`, data)
}

//删除
export const slider_delete = (id) => {
    return AxiosDelete(`/setting/manager/sidebar/${id}`)
}

//首页期限

//列表
export const peroid_list = (data) => {
    return AxiosGet(`/setting/manager/index-peroid/page`, data)
}

//新增 
export const peroid_add = (data) => {
    return AxiosPost(`/setting/manager/index-peroid`, data)
}

//修改
export const peroid_updata = (data) => {
    return AxiosPut(`/setting/manager/index-peroid`, data)
}

//删除
export const peroid_delete = (id) => {
    return AxiosDelete(`/setting/manager/index-peroid/${id}`)
}

//公告

//列表
export const notice_list = (data) => {
    return AxiosGet(`/setting/manager/notice`, data)
}

export const notice_add = (data) => {
    return AxiosPost(`/setting/manager/notice`, data)
}

//删除
export const notice_delete = (id) => {
    return AxiosDelete(`/setting/manager/notice/${id}`)
}

//修改
export const notice_updata = (data) => {
    return AxiosPut(`/setting/manager/notice/`, data)
}

export const notice_list_status = (data) => {
    return AxiosPut(`/setting/manager/notice/status`, data)
}
//评论

//列表
export const comment_list = (data) => {
    return AxiosGet(`/setting/manager/comment`, data)
}

//新增
export const comment_add = (data) => {
    return AxiosPost(`/setting/manager/comment`, data)
}


//删除
export const comment_del = (id) => {
    return AxiosDelete(`/setting/manager/comment/${id}`)
}


//通用地址
//列表
export const productUrl_list = (data) => {
    return AxiosGet(`/setting/manager/confing-url`, data)
}

//新增
export const productUrl_add = (data) => {
    return AxiosPost(`/setting/manager/confing-url`, data)
}

//修改
export const productUrl_uopdate = (data) => {
    return AxiosPut(`/setting/manager/confing-url`, data)
}

//删除
export const productUrl_delete = (id) => {
    return AxiosDelete(`/setting/manager/confing-url/${id}`)
}




//////////////////////

/////会员中心   

//提现管理

//列表数据
export const cash_out_list = (data) => {
    return AxiosPost(`/member/manager/member-wallet/cash-orders`, data)
}

//确认付款

export const cash_out_payment = (data) => {
    return AxiosPost('/member/manager/member-wallet/confirm-pay', data)
}

//申请付款
export const cash_out_applyFor = (id) => {
    return AxiosPost(`/member/manager/member-wallet/cash-pay/${id}`)
}

//驳回申请
export const cash_out_turnDown = (id) => {
    return AxiosPost(`member/manager/member-wallet/reject-pay/${id}`)
}

//手动查单
export const cash_out_operation = (id) => {
    return AxiosPost(`/member/manager/member-wallet/pay-status/${id}`)
}

//导出
export const cash_out_export = (data) => {
    return AxiosGet(`/member/manager/member-wallet/excel`, data)
}


//产品中心

//榜单置顶

//列表
export const top_product_list = (data) => {
    return AxiosGet(`/product/topProduct/page`, data)
}

//币种
export const currency_Code = (data) => {
    return AxiosGet(`/product/product_currency/list/${data}`)
}

//期限
export const period_Code = (data) => {
    return AxiosPost(`/setting/index/select`, data)
}

//产品列表
export const product_list = (data) => {
    return AxiosGet(`/product/topProduct/period_product_page`, data)
}

//榜单删除
export const top_product_delete = (id) => {
    return AxiosDelete(`/product/topProduct/product/${id}`)
}

//榜单修改
export const top_product_upData = (data) => {
    return AxiosPut(`/product/topProduct/product`, data)
}

//新增置顶
export const top_product_add = (data) => {
    return AxiosPost(`/product/topProduct/product`, data)
}


//   产品支取提示
//产品所属银行
export const productBank = (data)=> {
    return AxiosGet(`/product/institution/page`,data)
}
//列表
export const prompt_list = (data)=> {
    return AxiosGet(`/product/prompt-message`,data)
}

//根据机构id获取产品
export const getProList = (id)=> {
    return AxiosGet(`/product/institution/searchPro/${id}`)
}

//新增提示
export const prompt_add = (data)=> {
    return AxiosPost(`/product/prompt-message`,data)
}
//修改提示
export const prompt_upd = (data) => {
    return AxiosPut(`/product/prompt-message`, data)
}

//删除提示
export const prompt_delete = (id) => {
    return AxiosDelete(`/product/prompt-message/${id}`)
}




//      短信模块

// 短信列表
export const sms_manage = (data) => {
    return AxiosGet(`/message/sms-manage`, data)
}
// 短信模板列表获取 
export const get_sms_list = (id) => {
    return AxiosGet(`/message/manager/sms-template/${id}`)
}
// 新增短信
export const add_sms_manage = (data) => {
    return AxiosPost(`/message/sms-manage`,data)
}
// 获取短信详情
export const get_sms_detail = (id) => {
    return AxiosGet(`/message/sms-manage/${id}`)
}
// 短信模版下载
export const download_template = () => {
    return AxiosGet('/message/sms-manage/downloadTemplate')
}

// 短信上传模板
export const upload_file = (data,type) => {
    return AxiosPost(`/admin/file/up/${type}`, data)
}
// 删除短信
export const delete_sms_manage = (id) => {
    return AxiosDelete(`/message/sms-manage/${id}`)
}


//      推送信息模块

// 推送信息列表
export const push_message = (data) => {
    return AxiosGet(`/message/push-message`,data)
}
// 获取推送信息详情
export const get_message_detail = (id) => {
    return AxiosGet(`/message/push-message/${id}`)
}
// 新增推送信息
export const add_push_message = (data) => {
    return AxiosPost(`/message/push-message`, data)
}
// 修改推送消息
export const change_push_manage = (data) => {
    return AxiosPut(`/message/push-message`,data)
}
// 删除推送信息
export const delete_push_message = (data) => {
    return AxiosPost(`/message/push-message/deletes`,data)
}


//      依赖配置模块

// 分页查询父子集依赖
export const get_relation_list = (data) => {
    return AxiosGet(`/setting/manager/parent-tree`,data)
}
// 新增父子级依赖
export const add_relation = (data) => {
    return AxiosPost(`/setting/manager/parent-tree`,data)
}
// 修改父子集配置
export const modify_relation = (data) => {
    return AxiosPut(`/setting/manager/parent-tree`,data)
}
// 删除父子级配置
export const delete_relation = (id) => {
    return AxiosDelete(`/setting/manager/parent-tree/${id}`)
}
// 查询父子级详情
export const relation_detail = (id) => {
    return AxiosGet(`/setting/manager/parent-tree/${id}`)
}


// 短信权限模块

// 短信权限分页列表
export const get_smsRule_list = (data) => {
    return AxiosGet(`/message/manager/sms-rule`,data)
}
// 获取短信权限详情
export const smsRule_detail = (id) => {
    return AxiosGet(`/message/manager/sms-rule/${id}`)
}
// 新增短信规则
export const add_smsRule = (data) => {
    return AxiosPost(`/message/manager/sms-rule`,data)
}
// 修改短信规则
export const modify_smsRule = (data) => {
    return AxiosPut(`/message/manager/sms-rule`,data)
}
// 删除短信规则
export const delete_smsRule = (id) => {
    return AxiosDelete(`/message/manager/sms-rule/${id}`)
}

// 短信模版模块

// 短信模版分页列表
export const get_templateRule_list = (data) => {
    return AxiosGet(`/message/manager/sms-template`,data)
}
// 获取短信模版详情
export const smsTemplate_detail = (id) => {
    return AxiosGet(`/message/manager/sms-template/detail/${id}`)
}
// 新增短信模版
export const add_smsTemplate = (data) => {
    return AxiosPost(`/message/manager/sms-template`,data)
}
// 修改短信模版
export const modify_smsTemplate = (data) => {
    return AxiosPut(`/message/manager/sms-template`,data)
}
// 删除短信模版
export const delete_smsTemplate = (id) => {
    return AxiosDelete(`/message/manager/sms-template/${id}`)
}
// 获取短信渠道列表
export const get_sms_channel = (data) => {
    return AxiosGet(`/message/manager/sms-channel`,data)
}


//新增建议
export const add_proposal = (data)=> {
    return AxiosPost(`setting/manager/proposal`,data)
}

//系统预警配置

// 获取预警信息列表
export const get_alarm_list = (data) => {
    return AxiosPost(`/alarm/config/pageList`,data)
}
// 删除系统预警条目
export const delete_alarm  = (id) => {
    return AxiosDelete(`/alarm/config/delete/${id}`)
}
// 系统预警条目详情
export const detail_alarm  = (id) => {
    return AxiosGet(`/alarm/config/searchDetail/${id}`)
}
// 新增系统预警
export const add_alarm = (data)=> {
    return AxiosPost(`/alarm/config/add`,data)
}
// 修改系统预警条目
export const modify_alarm = (data) => {
    return AxiosPut(`/alarm/config/update`,data)
}


//问题信息

//列表
export const problemInfo_list = (data) => {
    return AxiosGet(`/setting/manager/question-info`,data)
}

//新增问题
export const problemInfo_add = (data) => {
    return AxiosPost(`/setting/manager/question-info`,data)
}


//修改问题
export const problemInfo_update = (data) => {
    return AxiosPut(`/setting/manager/question-info`,data)
}

//删除问题
export const problemInfo_delete = (id) => {
    return AxiosDelete(`/setting/manager/question-info/${id}`)
}



//问题分类

//列表
export const questionDispose_list = (data) => {
    return AxiosGet(`/setting/manager/question-dispose`,data)
}


//新建
export const questionDispose_add = (data) => {
    return AxiosPost(`/setting/manager/question-dispose`,data)
}

//详情
export const questionDispose_detail = (id) => {
    return AxiosGet(`/setting/manager/question-dispose/${id}`)
}

//修改置顶
export const questionDispose_isTop = (data)=> {
    return AxiosPut(`/setting/manager/question-dispose/istop`,data)
}

export const questionDispose_updata = (data) => {
    return AxiosPut(`/setting/manager/question-dispose`,data)
}

export const questionDispose_delete = (id) => {
    return AxiosDelete(`/setting/manager/question-dispose/${id}`)
}



//  会员登录记录

export const login_record_list = (data) => {
    return AxiosGet(`/member/manager/login-record`, data)
}