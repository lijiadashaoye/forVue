import {
    mapState,
    mapMutations
} from "vuex";
export default {
    data() {
        return {
            env: null,
            pageName: "" //二级title
        };
    },
    created() {
        this.env = sessionStorage.getItem("env") === "development";
        //   二级title
        this.pageName = this.$route.name.trim();
        // 清空还原table数据
        this.RESETTABLEINFO();
        // 获取权限
        this.USERDO(this.userArr);
        // 设置table头
        this.SETTITLELIST(this.tableTitle);
    },
    computed: {
        ...mapState({
            userInfoArr: ({
                powerTable
            }) => powerTable.tableInfo.data.quanxian, // 权限数组
            tableInfo: ({
                powerTable
            }) => powerTable.tableInfo,
        })
    },
    methods: {
        ...mapMutations({
            RESETTABLEINFO: "powerTable/RESETTABLEINFO",
            USERDO: "powerTable/USERDO",
            SETTITLELIST: "powerTable/SETTITLELIST",
            SETDRAGABLE:"powerTable/SETDRAGABLE"
        }),
        // 删除单条条目
        deleteIndex(obj) {
            this.$confirm("此操作将永久删除此信息, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    this.startDelete(obj)
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    },
};