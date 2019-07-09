<template>
    <div class="componentWaper">

    <div id="forHeader">
        <h3>
            {{pageName}}
        </h3>
    </div>

    <div id="forTable" style="padding:5px 100px;box-sizing:border-box;"> 
        <slider
        :appChannel.sync="this.$store.state.protocol.appChannel"
        @send="send"
        />
    </div>


  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import slider from '../../../components/slider';
import { slider_add } from '../../../api/setting_use.js';

export default {
    components: {
        slider
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
            slider_add(data).then(res=> {
                if(res && res.success) {
                    this.$router.push('/home/setting/sidebar/list')
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
