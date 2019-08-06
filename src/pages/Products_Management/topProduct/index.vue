<template>
    <div class="componentWaper">
        <div id="forHeader">
            <h3>{{pageName}}</h3>
        </div>

        <div id="forTable">
            <el-tabs v-model="currencyBigType" @tab-click="handleClick">
                <el-tab-pane label="内地" name='0'></el-tab-pane>
                <el-tab-pane label="香港" name='1'></el-tab-pane>
            </el-tabs>
            <isTable
            :inputData="this.$store.state.topProduct.topProductList"
            @tableEmit='tableEmit'/>
        </div>

    </div>
</template>

<script>
import isTable from '../../../components/isTable/isTable';
import { mapActions, mapMutations } from 'vuex';
export default {
    components: {
        isTable,
    },
    data() {
        return{
            pageName: '',
            currencyBigType: '0'
        }
    },
    mounted() {
        this.$store.state.topProduct.topProductList.pageNum = 1;
        this.pageName = this.$route.name;
        this.userDo();
        this.getList({
            pageNum: this.$store.state.topProduct.topProductList.pageNum,
            pageSize: this.$store.state.topProduct.topProductList.pageSize,
            currencyBigType: this.currencyBigType
        });
        this.$store.state.topProduct.topProductList.data.title = [
            {
                title: "置顶序号",
                key: "index",
                minWidth: "100",
                sortable: true
            },
            {
                title: "区域名称",
                key: "areaName",
                minWidth: "120",
            },
            {
                title: "机构名称",
                key: "institutionName",
                minWidth: "120",
            },
            {
                title: "产品名称",
                key: "productName",
                minWidth: "160",
            },
            {
                title: "币种",
                key: "currencyName",
                minWidth: "120",
            },
            {
                title: "收益率",
                key: "rate",
                minWidth: "100",
            },
            // {
            //     title: "置顶",
            //     key: "label",
            //     minWidth: "120",
            // },
        ]
    },
    methods: {
        ...mapActions({
            getList: 'topProduct/getList'
        }),
        ...mapMutations({
            userDo: 'topProduct/userDo'
        }),
        //切换地区
        handleClick(tab) {
            this.currencyBigType = tab.name
            this.$store.state.topProduct.topProductList.pageNum = 1;
            this.getList({
                pageNum: this.$store.state.topProduct.topProductList.pageNum,
                pageSize: this.$store.state.topProduct.topProductList.pageSize,
                currencyBigType: this.currencyBigType
            });
        },
        // 监听表格的操作
        tableEmit(data) {
            switch (data.type) {
                case "regetData": // 分页的emit
                //再次请求列表数据
                    // this.getList({
                    //     pageNum: this.$store.state.activityButton.activityButtonList.pageNum,
                    //     pageSize: this.$store.state.activityButton.activityButtonList.pageSize,
                    // })
                break;
                case "edit": // 编辑按钮
                    // this.edit(data.data);
                break;
                case "delete": // 删除按钮
                    // this.delete(data.data.id);
                break;
            }
        },
    }
}
</script>

<style>

</style>
