<template>
    <div class="componentWaper">
        <div id="forHeader">
            <h3>{{pageName}}</h3>
            <div class="explosiveAdd">
                <el-button
                type="primary"
                size="mini"
                @click="addPeroid"
                >
                新建
                </el-button>
            </div>
        </div>

        <div id="forTable">
            <isTable
            :inputData='this.$store.state.comment.commentList'
            @tableEmit='tableEmit'/>
        </div>

        <el-dialog :close-on-click-modal='false' title="新增评论" :visible.sync="dialogFormVisible">
            <!-- <noticeAdd
            :params="params"
            :updata="updataFlag"
            :appChannel.sync="this.$store.state.protocol.appChannel"
            @send='send'/> -->
        </el-dialog>
    </div>
</template>

<script>
import isTable from '../../../components/isTable/isTable';
import { mapActions, mapMutations } from 'vuex';
import {  } from '../../../api/setting_use.js';

export default {
    components: {
        isTable,
    },
    data() {
        return {
            pageName: '',
            dialogFormVisible: false,
            params: '',
            updataFlag: false,
        }
    },
    mounted() {
        this.pageName = this.$route.name;
        this.userDo();
        this.getList();
        this.getAppChannel();
        this.$store.state.comment.commentList.data.title = [
            {
                title: "作品ID",
                key: "composeId",
                minWidth: "80"
            },{
                title: "作品标题",
                key: "composeTitle",
                minWidth: "120"
            },{
                title: "作品类型",
                key: "composeTypeCN",
                minWidth: "100"
            },{
                title: "内容",
                key: "content",
                minWidth: "180"
            },{
                title: "创建时间",
                key: "gmtCreated",
                minWidth: "120"
            }
        ]
    },
    methods: {
        ...mapActions({
            getList: 'comment/getList',
            deleteList: 'comment/deleteList'
        }),
        ...mapMutations({
            userDo: 'comment/userDo',
            getAppChannel:'protocol/getAppChannel'
        }),
        //添加
        addPeroid() {
            // let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
            // if (jurisdiction.indexOf("comment_add") > -1) {
            //     this.dialogFormVisible = true;
            //     this.updataFlag = false;
            //     this.params = '';
            // } else {
            //     //弹出消息提示用户
            // }
            this.$alert("暂时没有这项功能哦", {
                confirmButtonText: "确定"
            });
        },
        //删除
        delete(data) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                this.deleteList(data);
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },
        //修改
        edit(data) {
            this.dialogFormVisible = true;
            this.params = data;
            this.updataFlag = true;
        },
        //点击保存
        send(data) {
            this.dialogFormVisible = false;
            if(this.updataFlag) {
                notice_updata(data).then(res=> {
                    if(res.success) {
                        this.getList()
                    }
                }).catch(res=> {
                    //弹出消息提示用户
                    this.$message({
                        type: "info",
                        message: `action: ${res.message}`
                    });
                })
            } else {
                notice_add(data).then(res => {
                    this.getList()
                }).catch(res=> {
                    this.$message({
                        type: 'info',
                        message: `action: ${ res.message }`
                    });
                })
            }
        },
        // 监听表格的操作
        tableEmit(data) {
            switch (data.type) {
                case "regetData": // 分页的emit
                    this.getList();
                break;
                case "delete": // 删除按钮
                    this.delete(data.data.id);
                break;
                case "edit": // 修改
                    this.edit(data.data)
                break;
            }
        },
    }
}
</script>

<style>

</style>
