<template>
    <div class="componentWaper">
        <div id="forHeader">
            <h3 style="margin-bottom:10px">
                {{pageName}}
            </h3>
            <div class="adverAddCurrency">
                <div class="addBtn">
                    <el-input clearable placeholder="会员ID" size="mini" v-model="memberId"></el-input>
                </div>
                <div class="addBtn">
                    <el-input clearable placeholder="设备ID" size="mini" v-model="deviceId"></el-input>
                </div>
                <div class="addBtn">
                    <el-input clearable placeholder="点位标识" size="mini" v-model="functionId"></el-input>
                </div>
                <div class="addBtn">
                    <el-select clearable size="mini" v-model="appChannelCode" placeholder="应用渠道标识码">
                        <el-option
                                v-for="item in appChannelCodeList"
                                :key="item.code"
                                :value="item.code"
                                :label="item.name"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="addBtn">
                    <el-select clearable size="mini" v-model="platformCode" placeholder="客户端平台标识码">
                        <el-option
                                v-for="item in platformCodeList"
                                :key="item.code"
                                :value="item.code"
                                :label="item.name"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="adverAddCurrency two">
                <div class="addBtn">
                    <el-input clearable placeholder="城市编码" size="mini" v-model="adCode"></el-input>
                </div>
                <div class="addBtn">
                    <el-input clearable placeholder="用户安装的比财app渠道" size="mini" v-model="appMarketCode"></el-input>
                </div>
                <div class="addBtn">
                    <el-input clearable placeholder="券id" size="mini" v-model="couponId"></el-input>
                </div>
                <div class="addBtn">
                    <el-date-picker
                            clearable
                            value-format='yyyy-MM-dd HH:mm:ss'
                            v-model="riqi"
                            type="datetimerange"
                            range-separator="~"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size='mini'
                            style="width:100%"
                    >
                    </el-date-picker>
                </div>
                <div class="addBtn">
                    <el-button @click="searchFn" type="primary" size="mini">查询</el-button>
                </div>
                <div class="addBtn">
                    <el-button @click="resetFn" size="mini">重置</el-button>
                </div>
            </div>
        </div>
        <div id="forTable">
            <isTable
                    :inputData='this.$store.state.pointLocation.pointLocationList'
                    @tableEmit='tableEmit'
            />
        </div>
        <!--扩展字段表格-->
        <el-dialog title="扩展字段" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
                <el-table-column align="center" property="key" label="字段名" width="150"></el-table-column>
                <el-table-column align="center" property="value" label="值"></el-table-column>
                <el-table-column align="center" property="dec" label="描述"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import isTable from '../../../components/isTable/isTable';

    export default {
        components: {
            isTable
        },
        data() {
            return {
                dialogTableVisible: false, // 扩展字段
                gridData: [], // 扩展字段数据
                pageName: '',
                memberId: '',
                deviceId: '',
                appChannelCode: '',
                platformCode: '',
                queryStartTime: '',
                queryEndTime: '',
                riqi: [],
                appChannelCodeList: [
                    {code: 'bicai', name: '比财'},
                    {code: 'pincai', name: '拼财'},
                    {code: 'yacai', name: '亚财'},
                    {code: 'ancai', name: '安财'}
                ],
                platformCodeList: [
                    {code: 'android', name: '安卓'},
                    {code: 'ios', name: '苹果'},
                    {code: 'h5', name: 'h5'},
                    {code: 'pmp', name: '小程序'}
                ],
                functionId: '',
                adCode: '',
                appMarketCode: '',
                couponId: ''
            }
        },
        mounted() {
            this.userDo()
            this.pageName = this.$route.name.trim();
//            if (localStorage.getItem('objectIdPoint')) {
//                let objId = JSON.parse(localStorage.getItem('objectIdPoint'))
//                this.getList({objectId:objId});
//            } else {
//                this.getList();
//            }
            this.getList();
            this.$store.state.pointLocation.pointLocationList.data.title = [
                {
                    title: "会员ID",
                    key: "memberId",
                    minWidth: "80",
                },{
                    title: "设备ID",
                    key: "deviceId",
                    minWidth: "240"
                },{
                    title: "应用渠道标识码",
                    key: "appChannelCode",
                    minWidth: "180"
                },{
                    title: "客户端平台标识码",
                    key: "platformCode",
                    minWidth: "180"
                },{
                    title: "创建时间",
                    key: "gmtCreated",
                    minWidth: "180"
                },{
                    title: "操作时间",
                    key: "gmtOperated",
                    minWidth: "180"
                },{
                    title: "点位标识",
                    key: "functionId",
                    minWidth: "120"
                },
                {
                    title: "点位名称",
                    key: "functionName",
                    minWidth: "240"
                },
                {
                    title: "城市编码",
                    key: "adCode",
                    minWidth: "120"
                },
                {
                    title: "用户安装的比财app渠道",
                    key: "appMarketCode",
                    minWidth: "180"
                },
                {
                    title: "券id",
                    key: "couponId",
                    minWidth: "120"
                },
                {
                    title: "IOS->idfa广告标识",
                    key: "idfa",
                    minWidth: "180"
                },
                {
                    title: "安卓->imei",
                    key: "imsi",
                    minWidth: "180"
                },
                {
                    title: "ip地址",
                    key: "ipAddress",
                    minWidth: "180"
                },
                {
                    title: "版本号",
                    key: "versionNum",
                    minWidth: "100"
                },
                {
                    title: "版本名称",
                    key: "versionName",
                    minWidth: "180"
                },
                {
                    title: "操作系统",
                    key: "os",
                    minWidth: "200",
                },
                {
                    title: "网络类型",
                    key: "networkType",
                    minWidth: "180",
                },
                {
                    title: "运营商",
                    key: "carrier",
                    minWidth: "180",
                },
                {
                    title: "手机型号",
                    key: "phoneModel",
                    minWidth: "120",
                },
                {
                    title: "备注",
                    key: "remark",
                    minWidth: "180",
                }
            ]
        },
        methods: {
            ...mapActions({
                getList: 'pointLocation/getList',
            }),
            ...mapMutations({
                userDo: 'pointLocation/userDo'
            }),
            resetFn() {
                this.memberId = ''
                this.deviceId = ''
                this.appChannelCode = ''
                this.platformCode = ''
                this.queryStartTime = ''
                this.queryEndTime = ''
                this.functionId = ''
                this.adCode = ''
                this.appMarketCode = ''
                this.couponId = ''
                this.riqi = []
                this.getList({ noPage: true});
            },
            // 搜索
            searchFn() {
                if (this.riqi.length > 0) {
                    this.queryStartTime = this.riqi[0]
                    this.queryEndTime = this.riqi[1]
                }
                this.getList({
                    noPage: true,
                    memberId: this.memberId,
                    deviceId: this.deviceId,
                    appChannelCode: this.appChannelCode,
                    platformCode: this.platformCode,
                    queryStartTime: this.queryStartTime,
                    queryEndTime: this.queryEndTime,
                    functionId: this.functionId,
                    adCode: this.adCode,
                    appMarketCode: this.appMarketCode,
                    couponId: this.couponId
                })
            },
            tableEmit(data) {
                switch (data.type) {
                    case "regetData": // 分页的emit
                        if (this.riqi.length > 0) {
                            this.queryStartTime = this.riqi[0]
                            this.queryEndTime = this.riqi[1]
                        }
                        let params = {
                            memberId: this.memberId,
                            deviceId: this.deviceId,
                            appChannelCode: this.appChannelCode,
                            platformCode: this.platformCode,
                            queryStartTime: this.queryStartTime,
                            queryEndTime: this.queryEndTime,
                            functionId: this.functionId,
                            adCode: this.adCode,
                            appMarketCode: this.appMarketCode,
                            couponId: this.couponId
                        }
//                        if (this.$store.state.pointLocation.pointLocationList.pageNum > 1) {
//                            params.objectId = this.$store.state.pointLocation.pointLocationList.data.list[this.$store.state.pointLocation.pointLocationList.pageSize -1].id
//                            localStorage.setItem('objectIdPoint',JSON.stringify(params.objectId))
//                        } else {
//                            localStorage.removeItem('objectIdPoint',JSON.stringify(params.objectId))
//                        }
                        this.getList(params)
                        break;
                    case "textClick":
                        this.gridData = []
                        if (data.data.expand && Object.keys(data.data.expand).length > 0) {
                            Object.keys(data.data.expand).forEach((v) => {
                                let obj = {}
                                obj.key = v
                                obj.value = data.data.expand[v].split('?????*****')[0] == 'null' ? '' : data.data.expand[v].split('?????*****')[0]
                                obj.dec = data.data.expand[v].split('?????*****')[1]
                                this.gridData.push(obj)
                            })
                        }
                        this.dialogTableVisible = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-data{
        .el-input{
            width: 400px;
        }
        .avatar{
            width: 100px;
        }
    }
    .currencyAdd{
        .el-button{
            float: right;
            margin-right: 20px;
        }
    }
    .adverAddCurrency {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        padding: 20px;
        box-sizing: border-box;
        align-items: center;
        .el-select{
            margin-left: 10px;
        }
        .addBtn{
            margin-right: 20px;
        }
        .addBtn>span{
            font-size: 14px;
        }
        .search {
            width: 300px;
            display: flex;
            justify-content: space-between;
            .el-input{
                width:200px;
            }
        }
    }
    .two{
        padding-top: 0px;
    }
</style>
