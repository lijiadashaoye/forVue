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
                新建启动页
                </el-button>
            </div>
        </div>

        <div id="forTable">
            <isTable
            :inputData="this.$store.state.advertis.advertisList"
            @tableEmit='tableEmit'/>
        </div>

        <el-dialog :close-on-click-modal='false' title="修改启动页" :visible.sync="dialogFormVisible" :show-close='false'>
            <advertis
            :params.sync="params"
            :appChannel.sync="this.$store.state.protocol.appChannel"
            @cancel="cancel"
            @send='send'/>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import isTable from '../../../components/isTable/isTable';
import advertis from '../../../components/advertis';
import { adverdis_list_status, adverdis_list_upData, adverdis_Page_del } from '../../../api/setting_use.js';

export default {
    components: {
        isTable,
        advertis
    },
    data() {
        return {
            pageName: '',
            dialogFormVisible: false,//修改弹窗开关
            params: '',//修改传递的数据
        }
    },
    mounted() {
        this.$store.state.advertis.advertisList.pageNum = 1;
        this.getList({
            pageNum: this.$store.state.advertis.advertisList.pageNum,
            pageSize: this.$store.state.advertis.advertisList.pageSize,
        });
        this.pageName = this.$route.name;
        this.getAppChannel();
        this.$store.state.advertis.advertisList.data.title = [
            {
                title: "APP",
                key: "appChannelName",
                minWidth: "120"
            },{
                title: "名称",
                key: "advertisName",
                minWidth: "140"
            },{
                title: "类型",
                key: "showTypeCN",
                minWidth: "120",
            },{
                title: "闪屏时长",
                key: "displayTime",
                minWidth: "120",
            },{
                title: "状态",
                key: "statusCN",
                minWidth: "100"
            },{
                title: "适用平台",
                key: "platformName",
                minWidth: "120"
            },{
                title: "创建者",
                key: "creatorName",
                minWidth: "120"
            }
        ]
        this.userDo();
    },
    methods: {
        ...mapActions({
            getList: 'advertis/getList',
        }),
        ...mapMutations({
            userDo: 'advertis/userDo',
            getAppChannel: 'protocol/getAppChannel',
        }),
        cancel() {
            this.params = null
            this.dialogFormVisible = false;
        },
        send(data) {
            adverdis_list_upData(data).then(res=> {
                if(res && res.success) {
                    this.dialogFormVisible = false;
                    this.getList({
                        pageNum: this.$store.state.advertis.advertisList.pageNum,
                        pageSize: this.$store.state.advertis.advertisList.pageSize,
                    });
                    this.$message({
                        type: "success",
                        message: `修改成功`
                    });
                    this.params = {};
                }
            }).catch((res)=> {
                this.$message({
                    type: "error",
                    message: `${res.message}`
                });
            })
        },
        //修改状态
        switchAction(data) {
            if(data.switch) {
                adverdis_list_status({
                    id: data.id,
                    status: 'ENABLE'
                }).then(res => {
                    this.getList({
                        pageNum: this.$store.state.advertis.advertisList.pageNum,
                        pageSize: this.$store.state.advertis.advertisList.pageSize,
                    })
                })
            } else {
                adverdis_list_status({
                    id: data.id,
                    status: 'DISABLE'
                }).then(res=> {
                    this.getList({
                        pageNum: this.$store.state.advertis.advertisList.pageNum,
                        pageSize: this.$store.state.advertis.advertisList.pageSize,
                    })
                })
            }
        },
        //删除
        delete(id) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                adverdis_Page_del(id).then(res=> {
                    this.getList({
                        pageNum: this.$store.state.advertis.advertisList.pageNum,
                        pageSize: this.$store.state.advertis.advertisList.pageSize,
                    })
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                }).catch(res=> {
                    this.$message({
                    type: "error",
                    message: `${res.message}`
                });
                })
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },
        //修改
        edit(data) {
            this.params = data;
            this.dialogFormVisible = true;
        },
        // 监听表格的操作
        tableEmit(data) {
            switch (data.type) {
                case "regetData": // 分页的emit
                    this.getList({
                        pageNum: this.$store.state.advertis.advertisList.pageNum,
                        pageSize: this.$store.state.advertis.advertisList.pageSize,
                    });
                break;
                case "delete": // 单独删除按钮
                    this.delete(data.data.id)
                break;
                case "edit": // 单独删除按钮
                    this.edit(data.data)
                break;
                case "switch": // switch 变换
                    this.switchAction(data.data);
                break;
            }
        },
        addActivityButton() {
            let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
            if (jurisdiction.indexOf("advertis_add") > -1) {
                this.$router.push({
                    path:'/home/setting/advertis/add'
                })
            } else {
                //弹出消息提示用户
                this.$alert("您没有这个权限", {
                    confirmButtonText: "确定"
                });
            }
        }
    }
}
</script>

<style>

</style>
