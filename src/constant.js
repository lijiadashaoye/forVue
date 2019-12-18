// 系统预警通知类型
export const notifyType = [{
  name: "全部",
  value: "ALL"
}, {
  name: "邮箱",
  value: "EMAIL"
}, {
  name: "手机",
  value: "MOBILE"
}, {
  name: "微信",
  value: "WECHAT"
}, {
  name: "钉钉",
  value: "DING"
},
]
// 发送方式类型
export const messageType = [{
  value: "SYSTEM_MESSAGE",
  name: "系统消息"
}, {
  value: "PRODUCT_MESSAGE",
  name: "产品消息"
}, {
  value: "ACTIVITY_MESSAGE",
  name: "活动消息"
}]

// 短信发送方式
export const sendType = [{
  value: "SYSTEM_USER",
  name: "系统用户"
}, {
  value: "IMPORT_PHONE",
  name: "导入手机号"
}, {
  value: "TEXT",
  name: "文本"
}]

// 短信发送状态
export const sendTargetArr = [{
  value: "WAIT_SEND",
  name: "待发送"
}, {
  value: "SEND_SUCCESS",
  name: "发送成功"
}, {
  value: "SENDFAIL",
  name: "发送失败"
}, {
  value: "SENDING",
  name: '发送中'
}]
// 值域配置关联类型
export const linkTypeArr = [
  {
    name: "资产",
    value: "ASSETS"
  },
  {
    name: "会员",
    value: "MEMBER"
  },
  {
    name: "设置",
    value: "SETTING"
  }
]
// 推送类型
export const pushType = [{
  value: "PUSH",
  name: "推送"
}, {
  value: "STATION",
  name: "站内信"
}, {
  value: "ALL",
  name: "全部"
}]
// 用户选择类型
export const sendTargetType = [{
  value: "TOTAL_USER",
  name: "全部用户"
}, {
  value: "PART_USER",
  name: "部分用户"
}]
// 地区类型
export const changeLocationType = [{
  value: "NO_CHOICE",
  name: "默认发送"
}, {
  value: "PHONE_LOCATION",
  name: "按手机号码归属地"
}]
// 产品类型
export const productType = [{
  value: "NOCLICK",
  label: "无事件"
}, {
  value: "EXTERNAL_LINK",
  label: "外部连接"
}, {
  value: "CONSULT_PAGE",
  label: "咨询页"
}, {
  value: "LOGIN_PAGELOGIN_PAGE",
  label: "登录页"
}, {
  value: "MONETARY_FUND",
  label: "货币基金"
}, {
  value: "FINANCING_PRODUCT",
  label: "理财产品"
}, {
  value: "SHARES_FUND",
  label: "股票基金"
}, {
  value: "LOAN",
  label: "贷款"
}, {
  value: "DEPOSIT",
  label: "存款产品"
}, {
  value: "COMPREHENSIVE_PAGE",
  label: "综合页"
}, {
  value: "NAW_PAGE",
  label: "新品页"
}, {
  value: "RECOMMEND_PAGE",
  label: "推荐页"
}, {
  value: "PURE_DEPT_FUND ",
  label: "纯债基金"
}, {
  value: "INSTITUTION_PAGE ",
  label: "机构页"
}, {
  value: "MY_WELFARE",
  label: "我的福利"
}]
// 省份列表
export const spreadLocationList = [
  // 地区假数据
  {
    label: "北京",
    value: "北京"
  },
  {
    label: "天津",
    value: "天津"
  },
  {
    label: "上海",
    value: "上海"
  },
  {
    label: "重庆",
    value: "重庆"
  },
  {
    label: "河北",
    value: "河北"
  },
  {
    label: "山西",
    value: "山西"
  },
  {
    label: "辽宁",
    value: "辽宁"
  },
  {
    label: "吉林",
    value: "吉林"
  },
  {
    label: "黑龙江",
    value: "黑龙江"
  },
  {
    label: "江苏",
    value: "江苏"
  },
  {
    label: "浙江",
    value: "浙江"
  },
  {
    label: "安徽",
    value: "安徽"
  },
  {
    label: "福建",
    value: "福建"
  },
  {
    label: "江西",
    value: "江西"
  },
  {
    label: "山东",
    value: "山东"
  },
  {
    label: "河南",
    value: "河南"
  },
  {
    label: "湖北",
    value: "湖北"
  },
  {
    label: "湖南",
    value: "湖南"
  },
  {
    label: "广东",
    value: "广东"
  },
  {
    label: "海南",
    value: "海南"
  },
  {
    label: "四川",
    value: "四川"
  },
  {
    label: "贵州",
    value: "贵州"
  },
  {
    label: "云南",
    value: "云南"
  },
  {
    label: "陕西",
    value: "陕西"
  },
  {
    label: "甘肃",
    value: "甘肃"
  },
  {
    label: "青海",
    value: "青海"
  },
  {
    label: "内蒙古",
    value: "内蒙古"
  },
  {
    label: "广西",
    value: "广西"
  },
  {
    label: "西藏",
    value: "西藏"
  },
  {
    label: "宁夏",
    value: "宁夏"
  },
  {
    label: "新疆维吾尔自治区",
    value: "新疆维吾尔自治区"
  },
  {
    label: "香港",
    value: "香港"
  },
  {
    label: "澳门",
    value: "澳门"
  },
  {
    label: "台湾",
    value: "台湾"
  }
] 
/**
 * app 静态数据
 */
// 广告类型数据
export const bannerTypeList = [
  {
    name:'全部',
    value:''
  },
  {
    name:'单图弹窗',
    value:'0'
  },
  {
    name:'单图广告位',
    value:'1'
  },
  {
    name:'多图广告位',
    value:'2'
  },
  {
    name:'升级弹窗',
    value:'3'
  },
  {
    name:'功能区icon',
    value:'4'
  },
  {
    name:'其他',
    value:'5'
  }
]
// 广告位状态
export const bannerStatus = [
  {
    name:'全部',
    value:''
  },
  {
    name:'启用',
    value:'0'
  },
  {
    name:'不启用',
    value:'1'
  }
]
// 终端类型
export const terminalType = [
  {
    name:'全部',
    value:''
  },
  {
    name:'比财APP',
    value:'0'
  },
  {
    name:'亚财APP',
    value:'1'
  }
]
// 系统类型
export const sysTypeList = [
  {
    name:'通用',
    value:'0'
  },
  {
    name:'IOS',
    value:'1'
  },
  {
    name:'Android',
    value:'2'
  }
]
// 广告位置-区域类型
export const regionalTypeList = [
  {
    name:'广告',
    value:1
  },
  {
    name:'产品展示',
    value:2
  },
  {
    name:'银行展示',
    value:3
  },
  {
    name:'活动',
    value:4
  },
  {
    name:'内容',
    value:5
  }
]

// 分辨率
export const resolutionOpt = [
  {
    name: "1242*2688",
    value: "1242*2688"
  },
  {
    name: "1242*2208",
    value: "1242*2208"
  },
  {
    name: "1125*2436",
    value: "1125*2436"
  },
  {
    name: "828*1792",
    value: "828*1792"
  },
  {
    name: "750*1334",
    value: "750*1334"
  },
  {
    name: "640*1136",
    value: "640*1136"
  }
]
// 图片类型
export const imageTypeList = [
  {
    name: "图片",
    value: 1
  },
  {
    name: "视频",
    value: 2
  },
  {
    name: "开屏页",
    value: 3
  }
]