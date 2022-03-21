<template>
  <div class="write">
      <div class="wrap">
          <div class="preview">

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

          <div class="writing">
              <div class="buttons">
                <button @click="save">저장</button>
                <button @click="reset">초기화</button>
                <button @click="back">돌아가기</button>
                <div class="file">
                    <label for="imgs">파일 선택</label>
                    <div id="selName">{{nowUrl}}</div>
                    <input ref="image" type="file" id="imgs" @change="uploadImg">
                </div>
              </div>
              <div class="content">
                  <div class="title">
                      <input type="text" id="title" maxlength="15" placeholder="제목을 입력해주세요" v-model="inner">
                  </div>
                  <div class="substance">
                      <textarea class="cont" placeholder="내용을 입력해주세요" v-model="area"></textarea>
                  </div>
              </div>
          </div>
      </div>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  components: {

  },
  created(){
      this.today = this.getDate()+this.getWeek();
  },
  mounted(){
    this.clickCount=0;
  },
  data(){
    return{
        today:'',
        area:'',
        inner:'',
        innerUrl:require('../Image/base.png'),
        backUrl:require('../Image/note.png'),
        nowUrl:'*선택 파일*',
    }
  },
  methods:{
    getDate(){
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);

      var dateString = year + '-' + month  + '-' + day;
      return dateString;
    },
    getWeek(){
        var week = new Array('일','월','화','수','목','금','토');
        var todayLabel = week[new Date().getDay()];
        return "("+todayLabel+")";
    },
    save(){
        if( (this.area == undefined || this.area == "") || (this.inner==undefined || this.inner=="")){
            alert("제목 및 내용은 필수 입력사항입니다.")
        }else{
            var sendData = {};
            sendData.content = this.area;
            sendData.title = this.inner;
            sendData.date = this.getDate();
            sendData.type = this.$route.params.contents;
            if(this.nowUrl != "*선택 파일*") sendData.img = this.nowUrl;
            else sendData.img = "none";
            
            axios.
            post(`http://127.0.0.1:3002/save`, sendData)
            .then((response) => {
            if (response.data == "save") {
                alert("저장 완료되었습니다.");
                setTimeout(() => {
                    this.back();
                }, 1500);
            }
            })
        }
    },
    reset(){
        this.area=""; this.inner="";
        this.nowUrl="";
        this.innerUrl=require('../Image/base.png');
    },
    back(){
        //로딩 컴포넌트도 있어야될듯
        this.$router.replace(`/${this.$route.params.contents}`)
    },
    uploadImg() {
      var image = this.$refs['image'].files[0];
      this.nowUrl = image.name;
      const url = URL.createObjectURL(image)
      this.innerUrl = url
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
    width: 1100px;
    height: 950px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    .preview{
        position: relative;
        @include set-WH(100%);
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
                    transform: translateX(10%) translateY(-50%) rotate(-45deg);
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
    .writing{
        @include set-WH(100%);
        display: flex;
        flex-direction: column;
        .buttons{
            position: relative;
            @include set-WH(100%);
            margin-left: 20px;
            flex: 1;
            button{
                display: block;
                width: 150px;
                height: 80px;
                @include set-Font(30px);
                background: white;
                border: 1px solid black;
                border-radius: 15px;
                margin-top: 20px;
                &:hover{
                    cursor: pointer;
                    transform: translateY(-10px);
                    transition: all .5s;
                }
            }
            .file{
                position: absolute;
                top: 30%;
                right: 30%;
                @include set-Font(30px);
                label{
                    display: inline-block;
                    width: 150px;
                    height: 50px;
                    background-color: #4a4a4a;
                    color: #fff;
                    cursor: pointer;
                    line-height: 50px;
                    border-radius: 5px;
                    text-align: center;
                }
                #selName{width: 200px;}
                input{
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    margin:-1px;
                    clip: rect(0,0,0,0);
                    overflow: hidden;
                    padding: 0;
                }
            }
        }
        .content{
            @include set-WH(100%);
            margin-left: 20px;
            flex: 2;
             .title{
                width: 500px;
                height: 100px;
                #title{
                    width: 80%;
                    height: 80px;
                    margin-top: 5px;
                    @include set-Font(30px);
                    border: 2px solid black;
                    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
                    text-indent: 10px;
                    &:focus{
                        outline: none;
                    }
                }
            }
            .substance{
                @include set-WH(100%);
                margin-top: 5px;
                .cont{
                    width: 80%;
                    height: 500px;
                    @include set-Font(30px);
                    resize: none;
                    overflow: hidden;
                    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
                    text-indent: 10px;
                    &:focus{
                        outline: none;
                    }
                }
            }
        
        }
    }
}
</style>