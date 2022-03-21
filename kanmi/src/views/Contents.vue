<template>
  <div class="contents">

      <div class="wrap" v-if="properConnect">
        <div class="header">
          <div class="maintitle">{{title}}</div>
          <div class="buttons">
              <button class="gowrite" v-if="isAdmin" @click="goWrite">글쓰기</button>
              <button class="gohome" @click="goHome">홈으로</button>
          </div>
      </div>

      <div class="ariticle">

        <div class="cont">
            <div class="griding">
                <li v-for="(i,index) in paginatedData" v-bind:key="index">
                    <div class="item" @click="goView(i.title)">
                        <img id="indeximg" :src="require(`../Image/${this.$route.params.contents}/${this.img_lists[index]}`)" alt="index image">
                        <div class="usingAni"></div>
                        <p class="title">{{i.title}}<br>{{i.date}}</p> 
                    </div>
                </li>
                <div class="noItem" v-if="noItem">작성된 게시물이 없습니다.</div>
            </div>
            <div class="stateinfo">
                <div class="users">
                    <div class="img">
                       <div class="userimg"></div>
                    </div>
                     <div class="name">Hosikawa Auyumu</div>
                    <div class="tag">
                        <div class="one">
                            <span>#Sweet&nbsp;</span>
                            <span>#Travel&nbsp;</span>
                            <span>#Japan&nbsp;</span>
                        </div>
                        <div class="two">
                            <span>#Korean&nbsp;</span>
                            <span>#beginner programmer&nbsp;</span>
                        </div>
                    </div>
                </div>
                <div class="watch">
                    <div id="cur">현재시간</div>
                    <span id="time">{{ttime}}</span>
                </div>
                <div class="calendar">
                    <Calend/>
                </div>
               
            </div>
        </div>
        
        <div class="pageing">
            <button :disabled="pagingNum === 0" @click="prevPage" class="page-btn">이전</button>
            <span class="page-count">{{ pagingNum + 1 }} / {{ pageCount }} 페이지</span>
        </div>
      </div>

      <div class="footer">
          Copyright 2022. Present by Ayumu
      </div>
    </div>


    <div class="wrongconnect" v-if="!properConnect">
        <div class="errorImg"></div>
        <div class="errorTxt">잘못된 연결입니다. 주소를 확인해주세요</div>
        <button class="error_gohome" @click="goHome">홈으로</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Calend from '@/components/Calendar.vue';
export default {
  components:{
      Calend,
  },
  created(){
    if(sessionStorage.getItem("set") == 'true') this.isAdmin=true;
    if(this.$route.params.contents == "sweet" && this.$route.params.contents == "travel") this.title = this.upper(this.$route.params.contents)+" Diary";
    else this.title = this.upper(this.$route.params.contents);
    if(this.$route.params.contents != "sweet" && this.$route.params.contents != "travel" && this.$route.params.contents != "diary"){
        this.properConnect = false;
    }

    if(this.properConnect){
        var sendData = {};
        sendData.type = this.$route.params.contents;
        axios.
        post(`http://127.0.0.1:3002/load`, sendData)
        .then((response) => {
            for(var i=response.data.length-1; i>=0;i--){
                this.item_lists.push(response.data[i]);
                if(response.data[i].img=='none') this.img_lists.push('base.png');
                else this.img_lists.push(response.data[i].img);
            }
        });
    }
  },
  mounted() {
    setInterval(() => {
        this.ttime= this.getTime();
        if(this.item_lists.length==0) this.noItem =true;
        else this.noItem = false;
    }, 600);
  },
  data(){
    return{
        delay:true,
        title:'',
        isAdmin:false,
        properConnect:true,
        pagingNum: 0,
        item_lists:[],
        img_lists:[],
        max_len:9,
        ttime:'',
        noItem:false,
    }
  },
  computed:{
      pageCount() {
        let listLeng, listSize, page;
        listLeng = this.item_lists.length;
        listSize = this.max_len,
        page = Math.floor(listLeng / listSize);
        page = Math.floor((listLeng - 1) / listSize) + 1;
        return page;
    },
    paginatedData () {
        var start=0, end=0
        start = this.pagingNum * this.max_len; 
        end = start + this.max_len;
        return this.item_lists.slice(start, end);
    },
  },
  methods:{
    nextPage () {this.pagingNum += 1;},
    prevPage () {this.pagingNum -= 1;},
    goHome(){
        this.$router.push('/');
    },
    goWrite(){
        this.$router.push(`/${this.$route.params.contents}/write`);
    },
    upper(value){
        return value.toUpperCase()
    },
    goView(title){
        // console.log(title);
        this.$router.push(`/view/${this.$route.params.contents}/${title}`);
    },
    getTime(){
      var today = new Date();
      var hh = ('0' + today.getHours()).slice(-2); 
      var mm = ('0' + today.getMinutes()).slice(-2); 
      var ss = ('0' + today.getSeconds()).slice(-2); 

      var timeString = hh + ':' + mm  + ':' + ss;
      return timeString;
    },
  },
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cute+Font&display=swap');
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
@mixin set-button-Event() {
   cursor: pointer;
   transform: translateY(-10px);
   transition: all .5s;
}
@mixin set-BA(){
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 95%;
    height: 95%;
    transform: translate(-50%,-50%);
    transition: all .5s;
    z-index: 3;
}
@mixin set-Error($top) {
    position: absolute;
    top: $top;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
li{
    list-style: none;
}
.contents{
    width: 100%;
    height: 1000px;
    .wrap{
        width: 1050px;
        height: auto;
        margin: 0 auto;
        .header{
            @include set-WH(75px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            .maintitle{
                @include set-Font(50px);
                margin-left:10px;
                &:hover{cursor: default;}
            }
            .buttons button{
                width: 100px;
                height: 50px;
                @include set-button();
                @include set-Font(25px);
                &:nth-child(1){margin-right: 10px;}
                &:nth-child(2){margin-left: 10px; margin-right: 10px}
                &:hover{
                    @include set-button-Event();
                }
            }
        }
        .ariticle{
            @include set-WH(850px);
            margin-top: 10px;
            margin-bottom: 10px;
            border-top: 1px solid black;
            border-bottom: 1px solid black;
            .cont{
                display: flex;
                .griding{
                    height: 750px;
                    margin-top: 30px;
                    margin-bottom: 10px;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(3, minmax(100px, auto));
                    gap: 30px;
                    flex: 3;
                    .item{
                        position: relative;
                        width: 220px;
                        height: 220px;
                        box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
                        #indeximg{
                            width:220px;
                            height:220px;
                            z-index: 1;
                        }
                        .title{
                            position: absolute;
                            width: 100%;
                            text-align: center;
                            top: 50%;
                            margin: 0;
                            transform: translateY(-50%);
                            @include set-Font(25px);
                            color: white;
                            opacity: 0;
                            z-index: 2;
                        }
                        .usingAni{
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            background-color: rgba(0,0,0,.0);
                            z-index: 2;
                        }
                        &::before{
                            @include set-BA();
                            border-top: 2px solid #fff;
                            border-bottom: 2px solid #fff;
                            width: 0;
                        }
                        &::after{
                            @include set-BA();
                            border-left: 2px solid #fff;
                            border-right: 2px solid #fff;
                            height: 0;
                        }
                        &:hover{
                            cursor: pointer;
                            .title{opacity: 1; transition: all .5s;};
                            .usingAni{background-color: rgba(0,0,0,.6); transition: all .5s;};
                            &::before{width: 98%;};
                            &::after{height: 98%;};
                        }
                    }
                }
                .noItem{
                    @include set-WH(150px);
                    @include set-Font(30px);
                }
                .stateinfo{
                    @include set-WH(100%);
                    margin-top: 20px;
                    flex: 1;
                    .users{
                        @include set-WH(300px);
                        text-align: center;
                        .img{
                            @include set-WH(220px);
                            .userimg{
                                width: 200px;
                                height: 200px;
                                margin: 0 auto;
                                background: url("../Image/mainImg.jpg") center no-repeat;
                                background-size: cover;
                                border: 2px dotted black;
                                border-radius: 50%;
                                &:hover{
                                    cursor: default;
                                }
                            }
                        }
                        .name{
                            margin-top: -12px;
                            @include set-WH(30px);
                            @include set-Font(30px);
                            color: #f35626;
                            background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
                            background-clip: text;
                            -webkit-text-fill-color: transparent;
                            animation: hue 3s infinite linear;
                        }
                        .tag{
                            @include set-WH(50px);
                            margin-top: 5px;
                        }
                    }
                    .watch{
                        margin-top: 20px;
                        @include set-WH(85px);
                        border: 1px solid black;
                        border-radius: 30px;
                        background: black;
                        color: white;
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                        #time{
                            @include set-Font(50px);
                            @include set-WH(100%);
                        }
                        #cur{
                            @include set-Font(25px);
                            @include set-WH(100%);
                        }
                    }
                    .calendar{
                        @include set-Font(20px);
                        margin-top: 20px;
                    }
                }
            }
            .pageing{
                width: 300px;
                margin: 0 auto;
                @include set-Font(25px);
                button{
                    width: 80px;
                    height: 50px;
                    @include set-button();
                    @include set-Font(20px);
                    &:nth-child(1){margin-right: 10px;}
                    &:nth-child(3){margin-left: 10px;}
                    &:hover{
                        @include set-button-Event();
                    }
                }
            }
        }
        .footer{
            @include set-WH(60px);
            @include set-Font(30px);
            text-align: center;
            transform: translateY(25%);
        }
    }
     .wrongconnect{
        position: relative;  
        @include set-Font(35px);
        @include set-WH(600px);
        .errorImg {
            width: 300px;
            height: 300px;
            z-index: 10;
            background: url("../Image/error.png") center no-repeat;
            background-size: contain;
            @include set-Error(50%);
            &:hover{
                cursor: default;
            }
        }
        .errorTxt{
            @include set-Error(80%);
        }
        .error_gohome{
            width: 100px;
            height: 50px;
            @include set-button();
            @include set-Font(25px);
            @include set-Error(90%);
            &:hover{
                cursor: pointer;
            }
        }
    }
}
@keyframes hue {
  from {-webkit-filter: hue-rotate(0deg);}
  to { -webkit-filter: hue-rotate(-360deg);}
}
</style>