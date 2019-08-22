import {
    comment_list,
    comment_del
} from '../../api/setting_use'
const state = {
    commentList: {
        checkBox: false, // 判断需要不需要添加选择框
        pageSize: 10,
        pageNum: 1,
        total: null,
        actions: {

        },
        data: {
            list: [],
            quanxian: [],
            title: [],
            custom: []
        },
    }
}
const mutations = {
    //获取列表数据
    getCommentListData(state,data) {
        comment_list(data).then(res => {
            if (res) {
                state.commentList.data.list = res.data.list;
                state.commentList.total = res.data.total;
                state.commentList.data.list && state.commentList.data.list.forEach(v => {
                    if (v.composeType === 'ADVERT') {
                        v.composeTypeCN = '广告'
                    } else if (v.composeType === 'NEWS') {
                        v.composeTypeCN = '新闻'
                    } else if (v.composeType === 'CONSULT') {
                        v.composeTypeCN = '咨询'
                    }
                })
            }
        })
    },
    //权限认证
    userDo(state) {
        state.commentList.data.custom = [];
        let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
        if (jurisdiction.indexOf('comment_del') > -1) {
            state.commentList.data.custom.push({
                text: "删除",
                type: "danger",
                size: "mini",
                emit: "delete"
            });
        }
    },
}

const actions = {
    getList({
        commit
    },data) {
        commit('getCommentListData',data)
    },
    deleteList({
        commit
    }, id) {
        comment_del(id).then((res) => {
            if (res) {
                commit('getCommentListData', {
                    pageNum: state.commentList.pageNum,
                    pageSize: state.commentList.pageSize,
                })
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}