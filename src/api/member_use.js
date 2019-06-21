import qs from 'qs';
export default {
    // 获取徽章墙列表
    member_badgewall_getListData(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/member/badge-wall?${qs.stringify(data.data)}`,
        })
    },

    // 删除徽章墙
    member_badgewall_deleteData(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/member/manager/badge-wall/${data.data}`,
        })
    },

    // 徽章列表里切换发放、停止
    member_badgewall_UpDown(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/member/manager/badge-wall/status`,
            data: data.data
        })
    },

    // 徽章详情
    member_badgeWall_getInfo(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/member/badge-wall/${data.data}`
        })
    },
    // 徽章墙上传数据
    member_badgeWall_upFinalData(data) {
        return data.vm.$axios({
            method: data.method,
            url: '/member/manager/badge-wall',
            data: data.data
        })
    },
    ////////////////////////////////////////////////////////////////
    // 获取标签列表
    member_manager_getMarkLise(data) {
        console.log(data)
        return data.vm.$axios({
            method: 'get',
            url: `/member/manager/label?${qs.stringify(data.data.search)}`,
        })
    },

    // 新建、修改标签数据
    member_labelList_upLabelData(data) {
        return data.vm.$axios({
            method: data.method,
            url: '/member/manager/label',
            data: data.data
        })
    },

    // 删除标签
    member_labelList_deleteData(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/member/manager/label/${data.data}`,
        })
    },
    // 标签的启用停用
    member_label_UpDown(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/member/manager/label/status`,
            data: data.data
        })
    },
    ////////////////////////////////////////////////////////////////////////
    // 获取会员列表
    member_manager_getListData(data) {
        return data.vm.$axios({
            method: 'post',
            url: `/member/manager/member/select`,
            data: data.data
        })
    },

    // 变更会员状态
    manager_list_UpDown(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/member/manager/member/status`,
            data: data.data
        })
    },

    // 会员详情
    member_manager_getInfo(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/member/manager/member/${data.data}`
        })
    },
    // 单次给会员打标签
    member_user_singleMark(data) {
        return data.vm.$axios({
            method: 'post',
            url: `/member/manager/member-label`,
            data: data.data
        })
    },

    // 单次给会员打标签
    member_user_moreMark(data) {
        return data.vm.$axios({
            method: 'post',
            url: `/member/manager/member-label/batch`,
            data: data.data
        })
    },

    // 删除会员标签
    member_user_deleteMark(data) {
        return data.vm.$axios({
            method: 'delete',
            url: `/member/manager/member-label/${data.data}`,
        })
    },
    ////////////////////////////////////////////////////////////////////////
    //查询等级列表接口
    member_level_getList(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/member/manager/level?${qs.stringify(data.data)}`
        })
    },
    //批量修改会员等级或状态
    member_level_moreAction(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/member/manager/member/batch/level-status`,
            data: data.data
        })
    },
    ///////////////////////////////////////////////////////////////////////////
    // 变更等级状态
    member_level_UpDown(data) {
        return data.vm.$axios({
            method: 'put',
            url: `/member/manager/level/status`,
            data: data.data
        })
    },

    // 删除等级信息
    member_level_deleteLevel(data) {
        return data.vm.$axios({
            method: "delete",
            url: "member/manager/level/" + data.data
        })
    },
    // 新建、修改等级信息
    member_level_createNewLevel(data) {
        return data.vm.$axios({
            method: data.method,
            url: '/member/manager/level',
            data: data.data
        })
    },

    //查询等级详情接口
    member_level_getInfo(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/member/manager/level/${data.data}`
        })
    },

    ////////////////////////////////////////////////////////////////

    // 查询任务列表接口
    member_mission_getList(data) {
        return data.vm.$axios({
            method: 'get',
            url: `/member/manager/mission?${qs.stringify(data.data)}`
        })
    },
}