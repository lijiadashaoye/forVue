<template>
    <div class="componentWaper">
        <div id="forHeader">
            <h3>{{pageName}}</h3>
            <div class="searchHeader">
                <el-button
                type="primary"
                size="mini"
                @click="addPeroid"
                >
                新建
                </el-button>
                <el-input
                    placeholder="请输入公告关键字"
                    prefix-icon="el-icon-search"
                    size='mini'
                    v-model="content"
                    @input='search'>
                </el-input>
            </div>
        </div>

        <div id="forTable">
            <isTable
            :inputData='this.$store.state.notice.noticeList'
            @tableEmit='tableEmit'/>
        </div>

        <el-dialog :title=title :visible.sync="dialogFormVisible" :close-on-click-modal='false' :before-close="beforeClose">
            <noticeAdd
            :params="params"
            :updata="updataFlag"
            :overFlag="overFlag"
            :appChannel.sync="this.$store.state.protocol.appChannel"
            @send='send'
            @cancel='cancel'/>
        </el-dialog>
    </div>
</template>

<script>
import isTable from '../../../components/isTable/isTable';
import noticeAdd from '../../../components/noticeAdd';
import { mapActions, mapMutations } from 'vuex';
import { notice_updata, notice_add , notice_list_status } from '../../../api/setting_use.js';

export default {
    components: {
        isTable,
        noticeAdd
    },
    data() {
        return {
            pageName: '',
            dialogFormVisible: false,
            params: '',
            updataFlag: false,
            title: '',
            content: '',
            overFlag: false,
        }
    },
    mounted() {
        this.pageName = this.$route.name;
        this.userDo();
        this.getList({
            pageNum: 1,
            pageSize: this.$store.state.notice.noticeList.pageSize,
        });
        this.getAppChannel();
        this.$store.state.notice.noticeList.data.title = [
            {
                title: "App",
                key: "appChannelName",
                minWidth: "80"
            },{
                title: "系统",
                key: "platformName",
                minWidth: "80"
            },{
                title: "内容",
                key: "content",
                minWidth: "120"
            },{
                title: "开始时间",
                key: "startTime",
                minWidth: "80"
            },{
                title: "结束时间",
                key: "endTime",
                minWidth: "80"
            },{
                title: "状态",
                key: "statusCN",
                minWidth: "80"
            },
        ]
    },
    methods: {
        ...mapActions({
            getList: 'notice/getList',
            deleteList: 'notice/deleteList'
        }),
        ...mapMutations({
            userDo: 'notice/userDo',
            getAppChannel:'protocol/getAppChannel'
        }),
        cancel() {
            this.dialogFormVisible = false;
        },

        //查询
        search() {
            this.getList({
                pageNum: this.$store.state.notice.noticeList.pageNum,
                pageSize: this.$store.state.notice.noticeList.pageSize,
                content: this.content != '' ? this.content : null
            })
        },
        beforeClose() {
            this.overFlag = true;
            this.dialogFormVisible = false;
        },
        //添加
        addPeroid() {
            this.overFlag = false;
            let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
            if (jurisdiction.indexOf("notice_add") > -1) {
                this.title = '添加'
                this.dialogFormVisible = true;
                this.updataFlag = false;
                this.params = '';
            } else {
                //弹出消息提示用户
                this.$alert("您没有这个权限", {
                    confirmButtonText: "确定"
                });
            }
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
            this.overFlag = false;
            this.title = '修改';
        },
        switchAction(data) {
            if(data.switch) {
                notice_list_status({
                    id: data.id,
                    status: 'ENABLE'
                }).then(res => {
                    this.getList({
                        pageNum: this.$store.state.notice.noticeList.pageNum,
                        pageSize: this.$store.state.notice.noticeList.pageSize,
                        content: this.content != '' ? this.content : null
                    })
                })
            } else {
                notice_list_status({
                    id: data.id,
                    status: 'DISABLE'
                }).then(res=> {
                    this.getList({
                pageNum: this.$store.state.notice.noticeList.pageNum,
                pageSize: this.$store.state.notice.noticeList.pageSize,
                content: this.content != '' ? this.content : null
            })
                })
            }
        },
        //点击保存
        send(data) {
            if(this.updataFlag) {
                notice_updata(data).then(res=> {
                    if( res && res.success) {
                        this.dialogFormVisible = false;
                        this.overFlag = true;
                        this.$message.success('保存成功')
                        this.getList({
                            pageNum: this.$store.state.notice.noticeList.pageNum,
                            pageSize: this.$store.state.notice.noticeList.pageSize,
                            content: this.content != '' ? this.content : null
                        })
                    } else {
                        this.overFlag = false;
                    }
                }).catch(res=> {
                    //弹出消息提示用户
                    this.overFlag = false;
                    this.$message({
                        type: "error",
                        message: `${res.message}`
                    });
                })
            } else {
                notice_add(data).then(res => {
                    if(res && res.success) {
                        this.dialogFormVisible = false;
                        this.overFlag = true;
                        this.getList({
                            pageNum: this.$store.state.notice.noticeList.pageNum,
                            pageSize: this.$store.state.notice.noticeList.pageSize,
                            content: this.content != '' ? this.content : null
                        })
                    } else {
                        this.overFlag = false
                    }
                }).catch(res=> {
                    this.overFlag = false
                    this.$message({
                        type: 'error',
                        message: `${ res.message }`
                    });
                })
            }
        },
        // 监听表格的操作
        tableEmit(data) {
            switch (data.type) {
                case "regetData": // 分页的emit
                    this.getList({
                        pageNum: this.$store.state.notice.noticeList.pageNum,
                        pageSize: this.$store.state.notice.noticeList.pageSize,
                        content: this.content != '' ? this.content : null
                    });
                break;
                case "delete": // 删除按钮
                    this.delete(data.data.id);
                break;
                case "edit": // 修改
                    this.edit(data.data)
                break;
                case "switch": // switch 变换
                    this.switchAction(data.data);
                break;
            }
        },
    }
}
</script>

<style lang='scss'>
    .searchHeader{
        display:flex;
        width:100%;
        justify-content: space-between;
        padding:5px;
        box-sizing: border-box;
        .el-input{
            width:220px;
        }
    }
</style>
