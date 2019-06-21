<template>
  <div class="componentWaper">

    <div id="forHeader">
      <h3>
        {{pageTitle}}
      </h3>
    </div>

    <div id="addButton">
      <addButtonLeft
      @send="send"/>
      <addButtonRight/>
    </div>

  </div>
</template>
<script>
import addButtonLeft from '../../../components/addButtonLeft';
import addButtonRight from '../../../components/addButtonRight';
import { app_button_add } from '../../../api/setting_use';
export default {
  components:{
    addButtonLeft,
    addButtonRight
  },
  data() {
    return {
      pageTitle: "", // 当前页面名字
    };
  },
  mounted() {
    //设置页面头部名称
   this.pageTitle = this.$route.name;
  },
  methods: {
    send(data) {
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      if (jurisdiction.indexOf("app_button_add") > -1) {
        app_button_add(data).then(res=>{
          this.$router.push(`/home/setting/app-button/list`)
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
};
</script>

<style scoped='true' lang="scss">
  #addButton{
    width:100%;
    overflow-y:auto;
    display:flex;
  }
</style>
