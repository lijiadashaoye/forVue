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



//app按钮列表数据
export const getMenuData = (data) => {
    return AxiosGet(`/setting/manager/app-button`, data)
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
    return AxiosGet('setting/manager/explosive', data)
}

//爆款删除
export const explosive_delete = (id) => {
    return AxiosDelete(`setting/manager/explosive/${id}`)
}

//新增爆款
export const explosive_add = (obj) => {
    return AxiosPost(`setting/manager/explosive`, obj)
}

//修改爆款产品
export const explosive_updata = (obj) => {
    return AxiosPut(`setting/manager/explosive`, obj)
}

//新手专享

//新手列表
export const commend_list = (data) => {
    return AxiosGet(`setting/manager/explosive`, data)
}

//新增新手
export const commend_add = (obj) => {
    return AxiosPost(`setting/manager/explosive`, obj)
}

//修改新手产品
export const commend_updata = (obj) => {
    return AxiosPut(`setting/manager/explosive`, obj)
}

//删除新手
export const commend_delete = (id) => {
    return AxiosDelete(`setting/manager/explosive/${id}`)
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
    return AxiosGet(`setting/manager/member-black-list`, obj)
}

//黑名单删除
export const black_list_del = (id) => {
    return AxiosDelete(`setting/manager/member-black-list/${id}`)
}


//黑名单编辑
export const black_list_upd = (data) => {
    return AxiosPut(`setting/manager/member-black-list/`, data)
}


//黑名单添加
export const black_list_add = (data) => {
    return AxiosPost(`setting/manager/member-black-list/`, data)
}


//黑名单详情
export const black_list_detail = (id) => {
    return AxiosGet(`setting/manager/member-black-list/${id}`)
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
    return AxiosGet(`setting/manager/news-manage`, data)
}

//新增新闻
export const news_manger_add = (data) => {
    return AxiosPost(`/setting/manager/news-manage/`,data)
}




//广告管理

//列表
export const adverdis_list = (data)=> {
    return AxiosGet(`setting/manager/advertis-manage`, data)
}
// 新增
export const adverdis_add = (data)=> {
    return AxiosPost(`setting/manager/advertis-manage`, data)
}
// 详情
export const adverdis_detail = (data)=> {
    return AxiosGet(`setting/manager/advertis-manage/${data.id}`)
}
// 修改
export const adverdis_edit = (data)=> {
    return AxiosPut(`setting/manager/advertis-manage`, data)
}
// 删除
export const adverdis_del = (data)=> {
    return AxiosDelete(`setting/manager/advertis-manage/${data.id}`)
}

//版本管理

//列表
export const clientVersion_list = (data)=> {
    return AxiosGet(`setting/manager/client-version`, data)
}
// 新增
export const clientVersion_add = (data)=> {
    return AxiosPost(`setting/manager/client-version`, data)
}
// 详情
export const clientVersion_detail = (data)=> {
    return AxiosGet(`setting/manager/client-version/${data.id}`)
}
// 修改
export const clientVersion_edit = (data)=> {
    return AxiosPut(`setting/manager/client-version`, data)
}
// 删除
export const clientVersion_del = (data)=> {
    return AxiosDelete(`setting/manager/client-version/${data.id}`)
}

// 建议与反馈
//列表
export const proposal_list = (data)=> {
    return AxiosGet(`setting/manager/proposal`, data)
}

// 删除
export const proposal_del = (data)=> {
    return AxiosDelete(`setting/manager/proposal/${data.id}`)
}


//启动页

//列表
export const getAdverdisList = (data) => {
    return AxiosGet(`/setting/manager/advertis`,data)
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
    return AxiosPut(`/setting/manager/advertis/status`,data)
}

//修改
export const adverdis_list_upData = (data)=> {
    return AxiosPut(`/setting/manager/advertis`,data)
}


//侧边栏

//列表数据
export const slider_list = (data) => {
    return AxiosGet(`/setting/manager/sidebar`,data)
}

//增加
export const slider_add = (data) => {
    return AxiosPost(`/setting/manager/sidebar`,data)
}

//修改
export const slider_updata = (data) => {
    return AxiosPut(`/setting/manager/sidebar`,data)
}

//首页期限

//列表
export const peroid_list = (data) => {
    return AxiosGet(`/setting/manager/index-peroid`,data)
}

//新增 
export const peroid_add = (data) => {
    return AxiosPost(`/setting/manager/index-peroid`,data)
}

//修改
export const peroid_updata = (data) => {
    return AxiosPut(`/setting/manager/index-peroid`,data)
}

//删除
export const peroid_delete = (id) => {
    return AxiosDelete(`/setting/manager/index-peroid/${id}`)
}

//公告

//列表
export const notice_list = (data)=> {
    return AxiosGet(`/setting/manager/notice`,data)
}

export const notice_add = (data)=> {
    return AxiosPost(`/setting/manager/notice`,data)
}

//删除
export const notice_delete = (id)=> {
    return AxiosDelete(`/setting/manager/notice/${id}`)
}

//修改
export const notice_updata = (data) => {
    return AxiosPut(`/setting/manager/notice/`,data)
}

export const notice_list_status = (data) => {
    return AxiosPut(`/setting/manager/notice/status`, data)
}
//评论

//列表
export const comment_list = (data) => {
    return AxiosGet(`/setting/manager/comment`,data)
}

//新增
export const comment_add = (data)=> {
    return AxiosPost(`/setting/manager/comment`,data)
}


//删除
export const comment_del = (id) => {
    return AxiosDelete(`/setting/manager/notice/${id}`)
}