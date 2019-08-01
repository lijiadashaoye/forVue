<template>
    <div class="componentWaper">
        <div id="forHeader">
            <h3>{{pageName}}</h3>
            <div class="explosiveAdd">
                <el-button
                type="primary"
                size="mini"
                @click="addSlider"
                >
                新建
                </el-button>
            </div>
        </div>

        <div id="forTable">
            <isTable
            :inputData="this.$store.state.slider.sliderList"
            @tableEmit='tableEmit'/>
        </div>

        <el-dialog :close-on-click-modal='false' title="修改" :visible.sync="dialogFormVisible" :before-close='cancel'>
            <slider
            :appChannel.sync="this.$store.state.protocol.appChannel"
            :params="params"
            @send='send'
            @cancel='cancel'/>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import isTable from '../../../components/isTable/isTable';
import slider from '../../../components/slider';
import { slider_updata } from '../../../api/setting_use.js'

export default {
    components: {
        isTable,
        slider
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
        this.getList({
            pageNum: 1,
            pageSize: this.$store.state.slider.sliderList.pageSize,
        });
        this.getAppChannel();
        this.$store.state.slider.sliderList.data.title = [
            {
                title: "App",
                key: "appChannelName",
                minWidth: "80"
            },{
                title: "栏目标题",
                key: "title",
                minWidth: "100",
            },{
                title: "栏目图片",
                key: "columnImage",
                minWidth: "120",
                isImg: true
            },{
                title: "栏目key",
                key: "columnKey",
                minWidth: "120",
            },{
                title: "标题颜色",
                key: "columnColor",
                minWidth: "100",
            },{
                title: "文字说明",
                key: "textExplain",
                minWidth: "160",
            },{
                title: "文字颜色",
                key: "textExplainColor",
                minWidth: "100",
            },{
                title: "显示状态",
                key: "isShowCN",
                minWidth: "100",
            },{
                title: "显示位置",
                key: "buttonTypeName",
                minWidth: "100",
            },{
                title: "系统",
                key: "platformName",
                minWidth: "80",
            },{
                title: "排序值",
                key: "sort",
                minWidth: "80",
                sortable:true
            },
        ]
    },
    methods: {
        ...mapActions({
            getList: 'slider/getList',
        }),
        ...mapMutations({
            userDo: 'slider/userDo',
            getAppChannel:'protocol/getAppChannel'
        }),
        //修改保存
        send(data) {
            slider_updata(data).then(res=> {
                if(res && res.success) {
                    this.dialogFormVisible = false;
                    this.$message({
                        type: 'success',
                        message: `保存成功`
                    })
                    this.getList({
                        pageNum: this.$store.state.slider.sliderList.pageNum,
                        pageSize: this.$store.state.slider.sliderList.pageSize,
                    })
                }
            }).catch(res => {
                //弹出消息提示用户
                this.$message({
                    type: "info",
                    message: `${res.message}`
                });
            })
        },
        //取消
        cancel() {
            this.params = {};
            this.dialogFormVisible = false;
        },
        //修改
        edit(data) {
            this.dialogFormVisible = true;
            this.params = data;
        },
        // 监听表格的操作
        tableEmit(data) {
            switch (data.type) {
                case "regetData": // 分页的emit
                    this.getList({
                        pageNum: this.$store.state.slider.sliderList.pageNum,
                        pageSize: this.$store.state.slider.sliderList.pageSize,
                    });
                break;
                case "edit": // 修改
                    this.edit(data.data)
                break;
            }
        },
        //新增侧边栏
        addSlider() {
            let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
            if (jurisdiction.indexOf("sidebar_add") > -1) {
                this.$router.push({
                    path:'/home/setting/sidebar/add'
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
