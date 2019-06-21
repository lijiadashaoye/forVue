<template>
    <div class="componentWaper">


    <div id="forHeader">
        <h3>
            {{pageName}}
        </h3>
    </div>

    <div id="forTable" style="padding:5px 100px;box-sizing:border-box;"> 
        <advertis
        :appChannel.sync="this.$store.state.protocol.appChannel"
        @send="send"/>
    </div>


  </div>
</template>

<script>
import advertis from '../../../components/advertis';
import { mapMutations } from 'vuex';
export default {
    components: {
        advertis
    },
    data() {
        return {
            pageName: '',
        }
    },
    mounted() {
        this.pageName = this.$route.name;
        this.getAppChannel();
    },
    methods: {
        ...mapMutations({
            getAppChannel:'protocol/getAppChannel'
        }),
        //点击保存
        send(data) {
            adverdis_Page_add(data).then(res=> {
                if(res.success) {
                    this.$router.push('/home/setting/advertis/list')
                }
            }).catch((res)=>{
                this.$message({
                    type: 'info',
                    message: `action: ${ res.message }`
                });
            })
        }
    }
}
</script>

<style>

</style>
