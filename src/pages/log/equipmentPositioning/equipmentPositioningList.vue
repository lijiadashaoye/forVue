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
                    :inputData='this.$store.state.devicePosition.devicePositionList'
                    @tableEmit='tableEmit'
            />
        </div>
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
            }
        },
        mounted() {
            this.pageName = this.$route.name.trim();
//            if (localStorage.getItem('objectIdDevice')) {
//                let objId = JSON.parse(localStorage.getItem('objectIdDevice'))
//                this.getList({objectId:objId});
//            } else {
//                this.getList();
//            }
            this.getList();
            this.$store.state.devicePosition.devicePositionList.data.title = [
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
                    key: "appChannelName",
                    minWidth: "180"
                },{
                    title: "客户端平台标识码",
                    key: "platformName",
                    minWidth: "180"
                },{
                    title: "用户安装的app渠道",
                    key: "appMarketCode",
                    minWidth: "180"
                },
                {
                    title: "IOS->idfa广告标识",
                    key: "idfa",
                    minWidth: "240"
                },
                {
                    title: "安卓->imei",
                    key: "imsi",
                    minWidth: "180"
                },
                {
                    title: "经度",
                    key: "lon",
                    minWidth: "180"
                },
                {
                    title: "纬度",
                    key: "lat",
                    minWidth: "180"
                },
                {
                    title: "经纬度的geohash值",
                    key: "geoHashCode",
                    minWidth: "180"
                },
                {
                    title: "城市编码",
                    key: "adCode",
                    minWidth: "80"
                },
                {
                    title: "创建时间",
                    key: "gmtCreated",
                    minWidth: "200",
                },{
                    title: "操作时间",
                    key: "gmtModified",
                    minWidth: "200",
                }
            ]
        },
        methods: {
            ...mapActions({
                getList: 'devicePosition/getList'
            }),
            resetFn() {
                this.memberId = ''
                this.deviceId = ''
                this.appChannelCode = ''
                this.platformCode = ''
                this.queryStartTime = ''
                this.queryEndTime = ''
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
                        }
//                        if (this.$store.state.devicePosition.devicePositionList.pageNum > 1) {
//                            params.objectId = this.$store.state.devicePosition.devicePositionList.data.list[this.$store.state.devicePosition.devicePositionList.pageSize -1].id
//                            localStorage.setItem('objectIdDevice',JSON.stringify(params.objectId))
//                        } else {
//                            localStorage.removeItem('objectIdDevice')
//                        }
                        this.getList(params)
                        break;
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
