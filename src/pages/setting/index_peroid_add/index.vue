<template>
    <div class="componentWaper">

    <div id="forHeader">
        <h3>
            {{pageName}}
        </h3>
    </div>

    <div id="forTable" style="padding:5px 100px;box-sizing:border-box;"> 
        <peroid
        :appChannel.sync="this.$store.state.protocol.appChannel"
        @send="send"
        />
    </div>


  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import peroid from '../../../components/peroid';
import { peroid_add } from '../../../api/setting_use.js';

export default {
    components: {
        peroid
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
            peroid_add(data).then(res=> {
                if(res && res.success){
                    this.$router.push('/home/setting/index-peroid/list')
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
