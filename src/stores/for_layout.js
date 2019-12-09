// 定义状态，有哪些需要管理的状态属性
const state = {
    titles: '',
    asideState: true,
    reGetAsideData: 0,
    areaList: []
};

// 存放可以被组件直接将名字作为属性使用的函数
const getters = {
    get_asideState: state => state.asideState,
    get_reGetAsideData: state => state.reGetAsideData,
    get_whicePath: state => state.whicePath,
}
// 同步执行状态变更
const mutations = {
    set_asideState: (state, data) => {
        state.asideState = data.data;
    },
    get_reGetAsideData: (state) => {
        state.reGetAsideData++;
    },
    set_path: (state, data) => {
        state.whicePath = data;
    },
    set_title: (state, data) => {
        state.titles = data;
        sessionStorage.setItem('road', data)
    }
}
// 异步执行状态变更
const actions = {
    // 登录
    login({
        dispatch
    }, datas) {
        sessionStorage.setItem('env', process.env.NODE_ENV)

        return datas.vm.$api.toLogin(datas)
            .then(res => {
                if (res) {
                    sessionStorage.setItem('token', '' + res.access_token);
                    return dispatch('getUserData', datas.vm)
                } else {
                    return false
                }
            })
    },
    // 获取用户数据
    getUserData({}, vm) {
        let userInfo = vm.$api.getInfo(vm)
            .then(res => {
                if (res) {
                    let kk = res.data.permissions;
                    sessionStorage.setItem("buttenpremissions", JSON.stringify(kk));
                    return res.data
                }
            })
        let asideData = vm.$api.getAside(vm)
            .then(res => {
                if (res) {
                    return res.data
                }
            });

        return Promise.all([userInfo, asideData]).then(res => {
            if (res.length === 2) {
                let userDatas = res[0];
                let asideData = res[1];
                sessionStorage.setItem("userData", JSON.stringify(userDatas));
                sessionStorage.setItem("asideData", JSON.stringify(asideData));
                return true
            } else {
                vm.$message.error(res.message);
                return false
            }

        })
    },
    // 菜单数据变更后的重新获取
    reGetAside({
        commit,
        dispatch
    }, vm) {
        dispatch('getUserData', vm).then((isOk) => {
            if (isOk) {
                commit('get_reGetAsideData')
            }
        })
    },
    // 注销
    logout({}, vm) {
        vm.$router.push({
            name: 'login'
        })
    },
    // 获取数据字典
    get_dict({}, vm) {
        let obj = {};
        // 获取数据字典信息
        let promiseArr1 = [];
        let arr = [
            "cooperation_mode", // 银行合作方式
            "risk_level", // 风险等级
            "deposit_type", //  存款类型
            "surplus_quota", // 剩余额度
            "pay_time", //  支付时间
            "regulatory_property", // 监管属性
            "rule_symbol", // <、<=等等 规则符号
            'visa_interview_type', // 是否面签
            "transaction_state", // 交易状态
            'bank_type', // 银行类型
            'product_feature_type', // 产品特性
            'product_all_type', // 产品类型 字典
            'product_area', // 地区标签
            'application_type', // app名称
            'continent_type', // 币种分类   
        ];

        arr.forEach((str) => {
            let kk = new Promise(resolve => {
                vm.$api
                    .get_dict({
                        vm: vm,
                        data: str
                    })
                    .then(res => {
                        if (res) {
                            resolve(res.data);
                        }
                    });
            });
            promiseArr1.push(kk);
        });

        let promiseArr2 = [];
        let arr2 = [
            '/product/fundHouse/list', // 基金公司列表 0
            "/product/institution/list", // 机构列表 1
            '/product/institution/topList', // 获取隶属机构数据 2
            '/log/common/area/tree/two', // 区域数据 3
            '/product/product_currency/all_currency', // 币种 4
            "/log/common/area/tree/three" // 具体到市的区域数据 5
        ]

        arr2.forEach((str) => {
            let kk = new Promise(resolve => {
                vm.$api
                    .get_fn({
                        vm: vm,
                        url: str
                    })
                    .then(res => {
                        if (res) {
                            resolve(res.data);
                        }
                    });
            });
            promiseArr2.push(kk);
        });

        let promiseArr3 = [];
        let arr3 = [
            "interest_mode", //  计息方式
            "income_return_way", //  收益返还方式
            "deadline_type", // 期限类型
            "frequency_type", // 付息频率
            "list_area_type", // 榜单专区标识
            "product_coverage_type", // 产品覆盖类型
            "channel_coverage_type", //  渠道覆盖类型
            "customer_classification", // 客户分类
            "institution_star", // 银行星级
            "institution_type", // 机构类型
            'shelve_status', // 上架状态
            'currency_unit', // 货币单位
            'channel_coverage_type', // 渠道覆盖类型
            'product_coverage_type', // 产品覆盖类型
            'bank_connection_mode', // 银行对接方式
            'income_return_way', // 收益返回方式
            'currency_type', // 货币种类
            'visa_interview_type' // 面签类型
        ];

        arr3.forEach(str => {
            let kk = new Promise(resolve => {
                vm.$api
                    .get_dict({
                        vm: vm,
                        data: str
                    })
                    .then(res => {
                        if (res) {
                            resolve(res.data);
                        }
                    });
            });
            promiseArr3.push(kk);
        });

        let promiseArr4 = [];
        let arr4 = [
            'product_tag', // 获取产品标签列表 0
            'self_defining_tag', // 获取自定义标签列表 1
            'activity_tag', // 获取活动标签列表 2
        ];

        arr4.forEach((str) => {
            let kk = new Promise(resolve => {
                vm.$api
                    .post_fn({
                        vm: vm,
                        url: '/product/tag/list',
                        data: {
                            type: str
                        }
                    })
                    .then(res => {
                        if (res) {
                            resolve(res.data);
                        }
                    });
            });
            promiseArr4.push(kk);
        });

        async function Pro() {
            let kk1 = await Promise.all(promiseArr1);
            let kk2 = await Promise.all(promiseArr2);
            let kk3 = await Promise.all(promiseArr3);
            let kk4 = await Promise.all(promiseArr4);

            [...arr, ...arr3].forEach((item, index) => {
                obj[item] = [...kk1, ...kk3][index] ? [...kk1, ...kk3][index] : [];
            });
            obj.jijin = kk2[0] ? kk2[0] : [];
            obj.jigou = kk2[1] ? kk2[1] : [];
            obj.paren = kk2[2] ? kk2[2] : [];

            obj.productTags = kk4[0] ? kk4[0] : [];
            obj.selfDefiningTags = kk4[1] ? kk4[1] : [];
            obj.activityTags = kk4[2] ? kk4[2] : [];

            if (kk2[3]) {
                obj.quyu = kk2[3].map(item => {
                    if (item.children) {
                        return {
                            value: item.adcode,
                            label: item.name,
                            children: item.children.map(tar => {
                                return {
                                    value: tar.adcode,
                                    label: tar.name,
                                    paren: item.adcode
                                }
                            })
                        }

                    } else {
                        return {
                            value: item.adcode,
                            label: item.name,
                        }
                    }
                })

            } else {
                obj.quyu = []
            }

            if (kk2[4]) {
                obj.bizhong = kk2[4].map(item => ({
                    label: item.currencyName,
                    value: item.currencyCode,
                    unit: item.currencyUnit
                }))

            } else {
                obj.bizhong = []
            }

            if (kk2[5]) {
                obj.china = kk2[5].filter(tar => tar.adcode === '100000')[0].children
                    .map(item => {
                        let obj = {
                            adcode: item.adcode,
                            name: item.name,
                            children: []
                        };
                        if (item.children) {
                            obj.children = item.children.map(tar => ({
                                adcode: tar.adcode,
                                name: tar.name
                            }));
                        }
                        return obj;
                    });
            } else {
                obj.bizhong = []
            }


            obj.qianyueList = [{
                    label: "是",
                    value: "YES"
                },
                {
                    label: "否",
                    value: "NO"
                }
            ];

            obj.forMax = []
            obj.forAge = []
            obj.rule_symbol.forEach(tar => {
                switch (tar.value) {
                    case "&lt":
                        obj.forMax.push({
                            label: tar.label,
                            fuhao: "<",
                            value: tar.value
                        });
                        obj.forAge.push({
                            label: tar.label,
                            fuhao: "<",
                            value: tar.value
                        });
                        break;
                    case "&le":
                        obj.forMax.push({
                            label: tar.label,
                            fuhao: "≤",
                            value: tar.value
                        });
                        obj.forAge.push({
                            label: tar.label,
                            fuhao: "≤",
                            value: tar.value
                        });
                        break;
                    case "&gt":
                        obj.forAge.push({
                            label: tar.label,
                            fuhao: ">",
                            value: tar.value
                        });
                        break;
                    case "&ge":
                        obj.forAge.push({
                            label: tar.label,
                            fuhao: "≥",
                            value: tar.value
                        });
                        break;
                    case "&eq":
                        obj.forMax.push({
                            label: tar.label,
                            fuhao: "=",
                            value: tar.value
                        });
                        break;
                }
            });

            return obj;
        }
        return Pro()
    },
    clearToken() {
        sessionStorage.clear();
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}