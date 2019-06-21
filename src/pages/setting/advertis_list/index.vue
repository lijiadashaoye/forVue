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

        <el-dialog :close-on-click-modal='false' title="修改启动页" :visible.sync="dialogFormVisible">
            <advertis
            :params="params"
            :appChannel.sync="this.$store.state.protocol.appChannel"
            @send='send'/>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import isTable from '../../../components/isTable/isTable';
import advertis from '../../../components/advertis';
import { adverdis_list_status, adverdis_list_upData } from '../../../api/setting_use.js';

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
        this.pageName = this.$route.name;
        this.userDo();
        this.getList();
        this.getAppChannel();
        this.$store.state.advertis.advertisList.data.title = [
            {
                title: "名称",
                key: "advertisName",
                minWidth: "100"
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
                title: "使用版本",
                key: "platformName",
                minWidth: "100"
            },{
                title: "创建者",
                key: "creatorName",
                minWidth: "100"
            }
        ]
    },
    methods: {
        ...mapActions({
            getList: 'advertis/getList',
            deleteList: 'advertis/deleteList'
        }),
        ...mapMutations({
            userDo: 'advertis/userDo',
            getAppChannel: 'protocol/getAppChannel',
        }),
        send(data) {
            this.dialogFormVisible = false;
            adverdis_list_upData(data).then(res=> {
                if(res.success) {
                    this.getList();
                }
            }).catch((res)=> {
                this.$message({
                    type: "info",
                    message: res.message
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
                    this.getList()
                })
            } else {
                adverdis_list_status({
                    id: data.id,
                    status: 'DISABLE'
                }).then(res=> {
                    this.getList()
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
        //修改
        edit(data) {
            this.params = data
            this.dialogFormVisible = true;
        },
        // 监听表格的操作
        tableEmit(data) {
            switch (data.type) {
                case "regetData": // 分页的emit
                    this.getList();
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
