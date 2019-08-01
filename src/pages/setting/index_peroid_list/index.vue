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
            :inputData='this.$store.state.peroid.peroidList'
            @tableEmit='tableEmit'/>
        </div>

        <el-dialog :close-on-click-modal='false' title="修改" :visible.sync="dialogFormVisible">
            <peroid
            :appChannel.sync="this.$store.state.protocol.appChannel"
            :params="params"
            @cancel="cancel"
            @send="send"
            />
        </el-dialog>
    </div>
</template>

<script>
import isTable from '../../../components/isTable/isTable';
import { mapActions, mapMutations } from 'vuex';
import peroid from '../../../components/peroid';
import { peroid_updata, peroid_delete } from '../../../api/setting_use.js';

export default {
    components: {
        isTable,
        peroid
    },
    data() {
        return {
            pageName: '',
            dialogFormVisible: false,
            params: '',
        }
    },
    mounted() {
        this.pageName = this.$route.name;
        this.userDo();
        this.getList({
            pageNum: 1,
            pageSize: this.$store.state.peroid.peroidList.pageSize
        });
        this.getAppChannel();
        this.$store.state.peroid.peroidList.data.title = [
            {
                title: "App",
                key: "appChannelName",
                minWidth: "80"
            },{
                title: "期限名称",
                key: "peroidName",
                minWidth: "120"
            },{
                title: "期限类型",
                key: "peroidTypeCN",
                minWidth: "100"
            },{
                title: "开始天",
                key: "startDay",
                minWidth: "120"
            },{
                title: "结束天",
                key: "endDay",
                minWidth: "120"
            },{
                title: "排序值",
                key: "sort",
                minWidth: "80"
            },{
                title: "有效标识",
                key: "validStatusCN",
                minWidth: "80"
            },{
                title: "显示类型",
                key: "showTypeCN",
                minWidth: "80"
            },{
                title: "限制条数",
                key: "pageSize",
                minWidth: "80"
            },{
                title: "总条数",
                key: "total",
                minWidth: "80"
            }
        ]
    },
    methods: {
        ...mapActions({
            getList: 'peroid/getList',
        }),
        ...mapMutations({
            userDo: 'peroid/userDo',
            getAppChannel:'protocol/getAppChannel'
        }),
        cancel() {
            this.dialogFormVisible = false;
            this.params = {};
        },
        addPeroid() {
            let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
            if (jurisdiction.indexOf("index_peroid_add") > -1) {
                this.$router.push({
                    path:'/home/setting/index-peroid/add'
                })
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
                peroid_delete(data).then(res=> {
                    if(res && res.success) {
                        this.getList({
                            pageNum: this.$store.state.peroid.peroidList.pageNum,
                            pageSize: this.$store.state.peroid.peroidList.pageSize
                        })
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    }
                })
                
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
        },
        //点击保存
        send(data) {
            this.dialogFormVisible = false;
            peroid_updata(data).then(res=> {
                if(res.success) {
                    this.getList({
                        pageNum: this.$store.state.peroid.peroidList.pageNum,
                        pageSize: this.$store.state.peroid.peroidList.pageSize
                    })
                }
            }).catch(res=> {
                //弹出消息提示用户
                this.$message({
                    type: "info",
                    message: `action: ${res.message}`
                });
            })
        },
        // 监听表格的操作
        tableEmit(data) {
            switch (data.type) {
                case "regetData": // 分页的emit
                    this.getList({
                        pageNum: this.$store.state.peroid.peroidList.pageNum,
                        pageSize: this.$store.state.peroid.peroidList.pageSize
                    });
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
