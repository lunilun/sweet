<template>
  <div class="home">
    <div class="main_menu">
      <div class="title">Do you like sweet?
        <button id="useOut" @click="checkout" v-if="isAdmin">Use Out</button>
      </div>
      <div class="logo" @click="hiddenEvent"></div>
      <div class="buttons">
        <button id="sweet" @click="goPage($event)">Sweets</button>
        <button id="travel" @click="goPage($event)">Travel</button>
        <button id="creater" @click="goPage($event)">Creater</button>
        <button id="diary" @click="goPage($event)" v-if="isAdmin">Diary</button>
      </div>
    </div>
    <div class="present">Copyright 2022. beginner developer portfolio-- by Ayumu</div>
  </div>
</template>

<script>
export default {
  components: {

  },
  mounted(){
    this.clickCount=0;
    if(sessionStorage.getItem("set") == 'true') this.isAdmin=true;
  },
  data(){
    return{
      isAdmin:false,
      clickCount:0,
    }
  },
  methods:{
    goPage(e){
      if(e.currentTarget.id != "creater"){
        this.$router.push(`/${e.currentTarget.id}`);
      }
      else{
        if(e.currentTarget.id=="creater") this.$router.push(`/creater`);
      }
    },
    hiddenEvent(){
      this.clickCount++;
      if(this.clickCount==8){
        var inputString = prompt('관리자 코드를 입력해주세요', "");
        if(inputString==886412) {
          this.$store.commit("SET_DATA", {set:true});
          this.$router.go();
        }
        else {
          alert("비밀번호가 일지하지않습니다.");
          this.clickCount=0;
        }
      }
    },
    checkout(){
      sessionStorage.clear();
      this.$router.go();
    },
  },
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cute+Font&display=swap');
//2022.01.10 ~(webpack)/hot/dev-server.js ./src/main.js 해당 에러 발생 => node_modules 삭제 후 npm i로 재설치(해결) #189
@mixin size-set() {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
@mixin menu-button-hover($size) {
  cursor: pointer;
  transform: translateY(-10px);
  transition: all .4s;
  
  border: 5px solid transparent;
  border-radius: 20px;
  background-image: linear-gradient(white, white), linear-gradient(45deg, #ED4264, #FFEDBC);
  background-origin: border-box;
  background-clip: content-box, border-box;
  font-size: $size;
}
.home {
  width: 100%;
  height: 100%;
  .main_menu {
    position: absolute;
    width: 800px;
    height: 400px;
    @include size-set();
    font-family: 'Cute Font', cursive;
    .title {
      width: 70%;
      font-size: 50px;
      text-align: center;
      transform: translateY(-50%);
      background: linear-gradient(to right top, #dd5e89, #f7bb97);
      color: transparent;
      background-clip: text;
      margin: 0 auto;
      #useOut{
        position: absolute;
        width: 100px;
        height: 50px;
        right: 0;
        background: white;
        border-radius: 30px;
        font-family: 'Cute Font', cursive;
        font-size: 20px;
        box-shadow: -10px 10px 10px grey;   
        &:hover {
          @include menu-button-hover(20px);
        }
      }
      &:hover{
        cursor: default;
      }
    }
    .logo {
      position: absolute;  
      width: 300px;
      height: 300px;
      margin: 0 auto;
      @include size-set();
      z-index: 10;
      background: url("../Image/mainImg.jpg") center no-repeat;
      background-size: contain;
      &:hover{
        cursor: default;
      }
    }
    .buttons {
      width: 100%;
      height: 400px;
      button {
        position: relative;
        width: 150px;
        height: 80px;
        background: white;
        border-radius: 30px;
        font-family: 'Cute Font', cursive;
        font-size: 30px;
        &:nth-child(1) {
          top:0;
          left: 0;
          position: absolute;
          margin-left: 10%;
          margin-top: 10%;
          box-shadow: -10px 10px 10px grey;
          &:hover {
            @include menu-button-hover(35px);
          }
        }
        &:nth-child(2) {
          top:0;
          right: 0;
          position: absolute;
          margin-right: 10%;
          margin-top: 10%;
          box-shadow: 10px 10px 10px grey;
          &:hover {
            @include menu-button-hover(35px);
          }
        }
        &:nth-child(3) {
          bottom:0;
          left:0;
          position: absolute;
          margin-left: 10%;
          margin-bottom: 10%;
          box-shadow: -10px 10px 10px grey;
          &:hover {
            @include menu-button-hover(35px);
          }
        }
        &:nth-child(4) {
          bottom:0;
          right: 0;
          position: absolute;
          margin-right: 10%;
          margin-bottom: 10%;
          box-shadow: 10px 10px 10px grey;
          &:hover {
            @include menu-button-hover(35px);
          }
        }
      }
    }
  }
  .present {
    position: fixed;
    bottom:0;
    right:0;
    margin-right:10px;
    margin-bottom:10px;
    font-family: 'Cute Font', cursive;
    font-size: 22px;
    z-index: -1;
  }
}
</style>