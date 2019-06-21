// 定义状态，有哪些需要管理的状态属性
const state = {
    asideState: true,
    reGetAsideData: 0,
    whicePath: ''
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
}
// 异步执行状态变更
const actions = {
    // 登录
    login({
        dispatch
    }, datas) {
        return datas.vm.$api.toLogin(datas)
            .then(res => {
                if (res) {
                    localStorage.setItem('token', '' + res.access_token);
                    return dispatch('getUserData', datas.vm)
                } else {
                    return false
                }
            })
    },
    // 获取用户数据
    getUserData({ }, vm) {
        let userInfo = vm.$api.getInfo(vm)
            .then(res => {
                if (res) {
                    let kk = res.data.permissions;
                    localStorage.setItem("buttenpremissions", JSON.stringify(kk));
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
            let userDatas = res[0] || [];
            let asideData = res[1] || [];
            if (userDatas && asideData) {
                localStorage.setItem("userData", JSON.stringify(userDatas));
                localStorage.setItem("asideData", JSON.stringify(asideData));
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
    logout({ }, vm) {
        vm.$router.push({
            name: 'login'
        })
    },
    clearToken() {
        localStorage.removeItem("buttenpremissions");
        localStorage.removeItem("token");
        localStorage.removeItem("asideData");
        localStorage.removeItem("userData");
        sessionStorage.removeItem("xilie_data");
        sessionStorage.removeItem("xilie_jigou");
        sessionStorage.removeItem("page");
        sessionStorage.removeItem("dict");
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}