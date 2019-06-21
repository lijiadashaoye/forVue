<template>
    <div class="componentWaper">
        <div id="forHeader">
            <h3>
                {{pageName}}
            </h3>
        </div>

        <div id="forTable">
            <activityButton
            @send="send"/>
        </div>
    </div>
</template>

<script>
import activityButton from '../../../components/activityButton';
import { activity_button_add } from '../../../api/setting_use.js'
export default {
    components: {
        activityButton
    },
    data() {
        return {
            pageName: ""
        }
    },
    mounted() {
        this.pageName = this.$route.name;
    },
    methods: {
        send(data) {
            let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
            if (jurisdiction.indexOf("activity_button_add") > -1) {
                activity_button_add(data).then(res=>{
                    this.$router.push('/home/setting/activity-button/list')
                }).catch(()=> {
                    this.$alert(`${res.message}`, '保存失败', {
                        confirmButtonText: '确定',
                        callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                        }
                    });
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
