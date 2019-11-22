import qs from 'qs';

export default {
    // 根据部门获取角色列表
    admin_user_getRole(data) {
        return data.vm.$axios({
            method: "get",
            url: "admin/role/roleList/" + data.data
        })
    },
    // 添加、编辑用户
    admin_user_aboutUser(data) {
        return data.vm.$axios({
            method: data.method,
            url: "admin/user",
            data: data.data
        })

    },
    // 删除用户
    admin_user_deleteUser(data) {
        return data.vm.$axios({
            method: "delete",
            url: "admin/user/" + data.data
        })
    },
    // 编辑用户
    admin_user_getUser(data) {
        return data.vm.$axios({
            method: "get",
            url: "admin/user/" + data.data
        })
    },

    // 获取tree数据
    admin_user_getTree(data) {
        return data.vm.$axios({
            method: "get",
            url: "admin/dept/tree"
        })
    },
    // 获取表格数据
    admin_user_getTableData(data) {
        return data.vm.$axios({
            method: "get",
            url: `admin/user/userPage?${qs.stringify(data.search)}`,

            // url: "admin/user/userPage?pageSize=" +
            //     data.pageSize +
            //     "&pageNum=" +
            //     data.pageNum
        })
    },
    // 修改用户手机号
    admin_user_updatePhone(data) {
        return data.vm.$axios({
            method: "put",
            url: "admin/user/phone",
            data: data.data
        })
    },
    ////////////////////////////////////////////////////////////////////////////////////////
    // 获取表格数据
    admin_menu_getMenu(data) {
        return data.vm.$axios({
            method: "get",
            url: "admin/menu/" + data.data
        })
    },
    // 获取tree列表
    admin_menu_AllTree(data) {
        return data.vm.$axios({
            method: "get",
            url: "admin/menu/allTree",
            data: data.data
        })
    },
    // 保存按钮
    admin_menu_toSave(data) {
        return data.vm.$axios({
            method: "post",
            url: "admin/menu",
            data: data.data
        })
    },
    // 删除菜单
    admin_menu_deleteMenu(data) {
        return data.vm.$axios({
            method: "delete",
            url: "admin/menu/" + data.data
        })
    },
    // 更新菜单
    admin_menu_updateMenu(data) {
        return data.vm.$axios({
            method: "put",
            url: "admin/menu/",
            data: data.data
        })
    },
    ///////////////////////////////////////////////////////////////////////////
    // 删除角色
    admin_role_deleteRole(data) {
        return data.vm.$axios({
            method: "delete",
            url: "admin/role/" + data.data
        })
    },

    // 获取tree数据
    admin_role_getTree(data) {
        return data.vm.$axios({
            method: "get",
            url: "admin/dept/tree"
        })
    },

    // 获取角色数据
    admin_role_getRole(data) {
        return data.vm.$axios({
            method: "get",
            url: "admin/role/" + data.data
        })
    },

    // 获取角色数据
    admin_role_addRole(data) {
        return data.vm.$axios({
            method: data.method,
            url: "admin/role",
            data: data.data
        })
    },
    // 获取tree级联数据
    admin_role_getAllTree(data) {
        return data.vm.$axios({
            method: "get",
            url: "admin/menu/allTree"
        })
    },

    // 获取tree级联数据
    admin_role_getRoleTree(data) {
        return data.vm.$axios({
            method: "get",
            url: "admin/menu/roleTree/" + data.data
        })
    },

    // 上传角色tree权限
    admin_role_upRoleTree(data) {
        return data.vm.$axios({
            method: "put",
            url: "admin/role/roleMenu?roleId=" +
                data.roleId +
                "&menuIds=" +
                data.menuIds
        })
    },

    // 获取表格数据
    admin_role_getTableData(data) {
        return data.vm.$axios({
            method: "get",
            url: "admin/role/rolePage?pageSize=" +
                data.pageSize +
                "&pageNum=" +
                data.pageNum
        })
    },
    /////////////////////////////////////////////////////////////////////////

    // 获取tree 数据
    admin_department_getTreeData(data) {
        return data.vm.$axios({
            method: "get",
            url: 'admin/dept/tree'
        })
    },
    // 点击节点后查看数据
    admin_department_getInfo(data) {
        return data.vm.$axios({
            method: 'get',
            url: 'admin/dept/' + data.data
        })
    },
    // 删除节点
    admin_department_deletePoint(data) {
        return data.vm.$axios({
            method: 'delete',
            url: 'admin/dept/' + data.data
        })
    },

    // 保存新增节点
    admin_department_savePoint(data) {
        return data.vm.$axios({
            method: 'post',
            url: 'admin/dept',
            data: data.data
        })
    },
    // 更新节点
    admin_department_upPoint(data) {
        return data.vm.$axios({
            method: 'put',
            url: 'admin/dept',
            data: data.data
        })
    },
    ////////////////////////////////////////////////////////////////////////////////////////

    // 获取表格数据,查询、重置
    admin_dict_getTableData(data) {
        return data.vm.$axios({
            method: "get",
            url: `admin/dict/dictPage?${qs.stringify(data.search)}`
        })
    },
    // 添加、编辑
    admin_dict_aboutUser(data) {
        return data.vm.$axios({
            method: data.method,
            url: 'admin/dict',
            data: data.data
        })

    },

    // 删除
    admin_dict_deleteUser(data) {
        return data.vm.$axios({
            method: "delete",
            url: 'admin/dict/' + data.id + "/" + data.type,
        })
    },

    // 编辑用户
    admin_dict_getUser(data) {
        return data.vm.$axios({
            method: "get",
            url: "admin/dict/" + data.data
        })
    },
    /////////////////////////////////////////////////////////////////////////
    // 修改当前登录用户的信息
    admin_info_submit(data) {
        return data.vm.$axios({
            method: 'put',
            url: 'admin/user/userInfo',
            data: data.data
        })
    },

}