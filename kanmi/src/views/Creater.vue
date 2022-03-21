<template>
  <div class="creater">
    <div class="header">
      <div class="title">Who am I?</div>
      <div class="warp">
        <div class="profile">
          <img :src="profileimg" alt="프로필 이미지" class="profileimg">
        </div>
        <div class="intro">
          <div class="i_title">Introduce</div>
          <div class="name"><span class="maru">◎</span>&nbsp;Name&nbsp;<span>강다빈</span></div>
          <div class="age"><span class="maru">◎</span>&nbsp;Age&nbsp;<span>29</span></div>
          <div class="brithday"><span class="maru">◎</span>&nbsp;BrithDay&nbsp;<span>1994.11.07</span></div>
          <div class="mail"><span class="maru">◎</span>&nbsp;Mail&nbsp;<span>lunilun310@gmail.com</span></div>
          <div class="phone"><span class="maru">◎</span>&nbsp;Phone&nbsp;<span>010-4437-0162</span></div>
          <div class="adderss"><span class="maru">◎</span>&nbsp;Adress&nbsp;<span>부산광역시 북구</span></div>
          <div class="sns"><span class="maru">◎</span>&nbsp;SNS&nbsp;
            <span id="kakao">rainbowd</span><div id="whatK">카카오톡</div>
            &nbsp;/&nbsp;
            <span id="line">kkyao</span><div id="whatL">라인</div>
          </div>
        </div>
      </div>
    </div>
    <button id="gohome" @click="goHome">Go Home</button>
    <div class="present">Copyright 2022. beginner developer portfolio-- by Ayumu</div>
  </div>
</template>

<script>
export default {
  components: {

  },
  mounted(){

  },
  data(){
    return{
      profileimg:require("../Image/base.png"),
    }
  },
  methods:{
    goHome(){
        this.$router.push('/');
    },
  },
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cute+Font&display=swap');//305
@mixin size-set() {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
@mixin menu-button-hover() {
  cursor: pointer;
  transform: translateY(-15px);
  transition: all .4s;
  
  border: 5px solid transparent;
  border-radius: 20px;
  background-image: linear-gradient(white, white), linear-gradient(45deg, #ED4264, #FFEDBC);
  background-origin: border-box;
  background-clip: content-box, border-box;
  font-size: 35px;
}
@mixin set-WH($height) {
  width: 100%;
  height: $height;
}
@mixin set-Font($size) {
  font-family: 'Cute Font', cursive;
  font-size: $size;
}
@mixin set-button() {
   background: white;
   border: 1px solid black;
   border-radius: 10px;
}
@mixin what-button-hover() {
  opacity: 1;
  transition: all 1s;
  background: linear-gradient(to right top, #dd5e89, #f7bb97);
  color: transparent;
  background-clip: text;
}
.creater {
  width: 100%;
  height: 100%;
  .header {
    position: absolute;
    width: 800px;
    height: 400px;
    @include size-set();
    .title {
      @include set-Font(50px);
      text-align: center;
      transform: translateY(-50%);
      background: linear-gradient(to right top, #dd5e89, #f7bb97);
      color: transparent;
      background-clip: text;
      &:hover{
        cursor: default;
      }
    }
    .warp{
      @include set-WH(100%);
      display: flex;
      .profile{
        position: relative;
        @include set-WH(100%);
        flex: 1;
        .profileimg{
          width: 90%;
          height: 90%;
          margin-top: 5%;
          margin-left: 5%;
        }
      }
      .intro{
        @include set-WH(100%);
        flex: 1.5;
        display: flex;
        flex-direction: column;
        background: url("../Image/note.png") center no-repeat;
        div{
          @include set-WH(100%);
          line-height: 45px;
          &:first-child{
            text-align: center;
            @include set-Font(40px);
          }
          &:not(:first-child){
            text-align: left;
            @include set-Font(35px);
            text-indent: 15px;
          }
          .maru{
            @include set-Font(20px);
          }
          &:hover{cursor: default;}
        }
        .sns{
          position: relative;
          #whatK,#whatL{
            width: 100px;
            height: 30px;
            @include set-Font(25px);
            position: absolute;
            top: -45%;
            opacity: 0;
          }
          #whatK{left: 20%;}
          #whatL{left: 47%;}
        }
        #kakao:hover, #line:hover{
          cursor: pointer;
          color: #f35626;
          background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: hue 3s infinite linear;
        }
        #kakao:hover+#whatK, #line:hover+#whatL{@include what-button-hover();}
      }
    }
  }
  #gohome{
    width: 150px;
    height: 80px;
    top: 15%;
    right: 15%;
    background: white;
    border-radius: 30px;
    font-family: 'Cute Font', cursive;
    font-size: 30px;
    position: absolute;
    box-shadow: -10px 10px 10px grey;   
    &:hover {
      @include menu-button-hover();
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
@keyframes hue {
  from {-webkit-filter: hue-rotate(0deg);}
  to { -webkit-filter: hue-rotate(-360deg);}
}
</style>