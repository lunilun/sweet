<template>
  <div id="app">
  <Back/>
  <Load v-if="isload"/>
  <router-view />
  </div>
</template>

<script>
import Load from "@/components/Loading.vue"
import Back from "@/components/Background.vue"
export default {
  components:{
    Load,
    Back
  },
  data(){
    return{
      isload:false,
    }
  },
  watch: { $route(to, from) { 
    if (to.path != from.path) {
      if(this.$route.params.contents != null || this.$route.params.contents != undefined){
        this.isload=true;
        setTimeout(() => {
          this.isload=false;
        }, 2000);
      }
      }
    }
  }
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
