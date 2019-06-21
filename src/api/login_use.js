import qs from 'qs';
export default {
    // 登录页面使用
    toLogin(datas) {
        return datas.vm.$axios({
            method: 'post',
            url: 'auth/oauth/token',
            data: qs.stringify(datas.data)
        })
    },
    getInfo(vm) {
        return vm.$axios({
            method: 'get',
            url: 'admin/user/info'
        })
    },
    getAside(vm) {
        return vm.$axios({
            method: 'get',
            url: 'admin/menu/userMenu'
        })
    }
}
