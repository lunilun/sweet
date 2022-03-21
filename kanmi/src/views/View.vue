<template>
  <div class="view">
      <div class="wrap">
          <div class="article">

              <div class="header">
                    <div class="postit"></div>
                    <div class="postit"></div>
                    <img id="innerimg" :src="innerUrl" alt="메인 이미지">
                    <div class="headInfo">
                    <div class="date">{{today}}</div>
                    <div class="title">{{inner}}</div>
                </div>
              </div>

              <div class="body">
                  <img :src="backUrl" alt="텍스트 배경" class="background">
                  <div class="substance">
                      <textarea class="cont" placeholder="내용을 입력해주세요" v-model="area" readonly></textarea>
                  </div>
              </div>
          </div>

          <div class="buttons">
              <div class="button">
                    <button disabled="disabled">수정</button>
                    <button @click="del" disabled="disabled">삭제</button>
                    <!-- <button @click="del" :disabled="!isadmin">삭제</button> -->
                    <button @click="back">돌아가기</button>
              </div>
              <div class="noneset"></div>
          </div>
      </div>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  created(){
    // console.log(sessionStorage.getItem("set"));
    if(sessionStorage.getItem("set") == "true"){
        this.isAdmin=true;
    }
    var sendData = {};
    sendData.type = this.$route.params.contents;
    sendData.title = this.$route.params.title;

    axios.
    post(`http://127.0.0.1:3002/view`, sendData)
    .then((response) => {
        this.today = response.data[0].date+this.getWeek();
        this.inner = response.data[0].title;
        this.area = response.data[0].substance;
        if(response.data[0].img!="none") this.innerUrl=require(`../Image/${this.$route.params.contents}/${response.data[0].img}`);
        else this.innerUrl=require(`../Image/base.png`);
    })
  },
  data(){
    return{
        today:'',
        area:'',
        inner:require('../Image/base.png'),
        backUrl:require('../Image/note.png'),
        isAdmin:false,
    }
  },
  methods:{
    getWeek(){
        var week = new Array('일','월','화','수','목','금','토');
        var todayLabel = week[new Date().getDay()];
        return "("+todayLabel+")";
    },
    back(){
        //로딩 컴포넌트도 있어야될듯
        this.$router.replace(`/${this.$route.params.contents}`)
    },
    del(){
        var sendData = {};
        sendData.title = this.$route.params.title;
        sendData.type = this.$route.params.contents;
        sendData.area = this.area;
        axios.
        post(`http://127.0.0.1:3002/delete`, sendData)
        .then((response) => {
            if(response.data == "delete"){
                alert("삭제되었습니다.");
                setTimeout(() => {
                    this.back();
                }, 1500);
            }
        })
    },
  },
};
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cute+Font&display=swap');
@mixin set-WH($height) {
  width: 100%;
  height: $height;
}
@mixin set-Font($size) {
  font-family: 'Cute Font', cursive;
  font-size: $size;
}
@mixin set_outline() {
  border: 3px solid transparent;
  border-image: linear-gradient(45deg, red 0%, orange 50%, yellow 100%);
  border-image-slice: 1;
  outline: none;
}
.wrap{
    width: 800px;
    height: 950px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    .article{
        position: relative;
        @include set-WH(100%);
        flex: 1;
        .header{
            position: relative;
            width: 100%;
            height: 500px;
            #innerimg{
                position: absolute;
                width: 90%;
                height: 90%;
                margin-left: 5%;
                margin-top: 5%;
                z-index: -1;
            }
            .postit{
                width: 120px;
                height: 50px;
                background:rgba(255, 255, 0, 0.8);
                position: absolute;
                &:nth-child(1){
                    top: 0;
                    left: 0;
                    transform: translateX(-10%) translateY(50%) rotate(-45deg);
                }
                &:nth-child(2){
                    bottom: 0;
                    right: 0;
                    transform: translateX(0) translateY(-10%) rotate(-45deg);
                }
            }
            .headInfo{
                border: 1px solid black;
                position: absolute;
                bottom: 0;
                width: 250px;
                height: 60px;
                z-index: 0;
                background: white;
                @include set-Font(22px);
                @include set_outline();
                text-indent: 10px;
            }
        }
        .body{
            position: relative;
            width: 100%;
            height: 440px;
            margin-top: 10px;
            background-size: cover;
            .background{
                position: absolute;
                width: 100%;
                height: 100%;
                left: -8%;
                z-index: -10;
            }
            .substance{
                width: 95%;
                height: 100%;
                .cont{
                    width: 95%;
                    height: 100%;
                    margin-left: 20px;
                    @include set-Font(25px);
                    text-indent: 20px;
                    resize: none;
                    overflow: hidden;
                    background:none;
                    border: none;
                    &:focus{
                        outline: none;
                    }
                }
            }
        }
    }
    .buttons{
        position: relative;
        @include set-WH(100%);
        flex: 0.5;
        .button{
            @include set-WH(30%);
            button{
                display: block;
                width: 150px;
                height: 80px;
                @include set-Font(30px);
                background: white;
                border: 1px solid black;
                border-radius: 15px;
                margin: 0 auto;
                &:nth-child(1),&:nth-child(2),&:nth-child(3){margin-top: 20px;}
                &:hover{
                    cursor: pointer;
                    transform: translateY(-10px);
                    transition: all .5s;
                }
            }
        }
        .noneset{
            @include set-WH(70%);
            border: 1px solid black;
        }
    }
}
</style>