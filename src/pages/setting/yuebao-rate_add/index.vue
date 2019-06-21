<template>
  <div class="componentWaper">


    <div id="forHeader">
      <h3>
        {{pageName}}
      </h3>
    </div>

    <div id="forTable">
      <yuebaoAddorUpt
      @reqest="reqest"/>
    </div>


  </div>
</template>


<script>
import yuebaoAddorUpt from '../../../components/yuebaoAddorUpt';
import { yuebao_add } from '../../../api/setting_use.js'
export default {
  props: {},
  components:{
    yuebaoAddorUpt
  },
  data() {
    return {
      pageName: "" // 当前页面名字
    };
  },
  mounted() {
    this.pageName = this.$route.name;
  },
  methods: {
    //接受子组件传递的信息
    reqest(obj){
      let jurisdiction = JSON.parse(localStorage.getItem("buttenpremissions"));
      //有权限  跳转到创建页面
      if (jurisdiction.indexOf("yuebao_rate_add") > -1) {
        yuebao_add(obj).then(res => {
          if(res.success){//添加成功  跳转到列表页面
            this.$router.push('/home/setting/yuebao-rate/list')
          }
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

</style>
