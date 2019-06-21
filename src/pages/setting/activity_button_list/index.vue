<template>
    <div class="componentWaper">
        <div id="forHeader">
        <h3>{{pageName}}</h3>
        <div class="explosiveAdd">
            <el-button
            type="primary"
            size="mini"
            @click="addActivityButton"
            >
            新建活动按钮
            </el-button>
        </div>
        </div>

        <div id="forTable">
        <isTable
        :inputData="this.$store.state.activityButton.activityButtonList"
        @tableEmit='tableEmit'/>
        </div>
        <!-- 修改/详情的弹框 -->
        <el-dialog :close-on-click-modal='false' :visible.sync="dialogVisible">
            <activityButton
            @send="send"
            :opts="opts"/>
        </el-dialog>
    </div>
</template>

<script>

import isTable from '../../../components/isTable/isTable';
import activityButton from '../../../components/activityButton';
import { activity_button_upd } from '../../../api/setting_use.js';
import { mapActions, mapMutations } from 'vuex';
export default {
    components: {
        isTable,
        activityButton
    },
    data() {
        return {
            pageName: "",//页面名字
            dialogVisible: false,
            opts: {//编辑时传递得信息

            },
            upData:false,
        }
    },
    mounted() {
        this.pageName = this.$route.name;
        this.userDo()
        this.getList();
        this.$store.state.activityButton.activityButtonList.data.title = [
            {
                title: "活动编号",
                key: "activityNumber",
                minWidth: "100",
                sortable: true
            },{
                title: "活动名称",
                key: "activityName",
                minWidth: "160"
            },{
                title: "显示类型",
                key: "showTypeName",
                minWidth: "120"
            },{
                title: "按钮图片",
                key: "buttonImage",
                minWidth: "120",
                isImg: true
            },{
                title: "收缩后按钮图片",
                key: "shrinkImage",
                minWidth: "120",
                isImg: true
            },{
                title: "浮动图片",
                key: "floatImage",
                minWidth: "120",
                isImg: true
            },{
                title: "按钮标题图片",
                key: "buttonTitleImage",
                minWidth: "120",
                isImg: true
            },{
                title: "平台",
                key: "platformName",
                minWidth: "80"
            },{
                title: "按钮文字",
                key: "buttonText",
                minWidth: "120"
            },{
                title: "文字颜色",
                key: "textColor",
                minWidth: "100"
            },{
                title: "活动标题",
                key: "activityTitle",
                minWidth: "160"
            },{
                title: "开奖时间",
                key: "lotteryTime",
                minWidth: "200"
            }
        ]
    },
    methods: {
        ...mapMutations({
            userDo: 'activityButton/userDo'
        }),
        ...mapActions({
            getList: 'activityButton/getList',
            deleteList: 'activityButton/deleteList'
        }),
        //添加按钮
        addActivityButton() {
            let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
            //有权限  跳转到创建页面
            if (jurisdiction.indexOf("activity_button_add") > -1) {
                this.$router.push(`/home/setting/activity-button/add`);
            } else {
                //弹出消息提示用户
                this.$alert("您没有这个权限", {
                    confirmButtonText: "确定"
                });
            } 
        },
        //点击删除
        delete(id) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                this.deleteList(id);
                }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },

        //点击编辑
        edit(data) {
            this.dialogVisible = true;
            this.opts = data;
        },
        //编辑后  保存
        send(data){
            this.dialogVisible = false;
            activity_button_upd(data).then(()=> {
                this.getList();
            }).catch((res) => {
                this.$alert(`${res.message}`, '保存失败', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                    });
                }
                });
            })
        },
        // 监听表格的操作
        tableEmit(data) {
            switch (data.type) {
                case "regetData": // 分页的emit
                //再次请求列表数据
                // this.getList();
                break;
                case "edit": // 编辑按钮
                this.edit(data.data);
                break;
                case "delete": // 删除按钮
                this.delete(data.data.id);
                break;
            }
        },
    }
}
</script>

<style>

</style>
