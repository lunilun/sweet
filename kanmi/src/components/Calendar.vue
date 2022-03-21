<template>
  <div class="calendar">
      <div class="cal">
          <div class="caltop">
              <!-- <button class="prev" @click="prevMonth">◁</button> -->
              <div class="selday">{{this.year+"년" +this.month+"월"}}</div>
              <!-- <button class="next" @click="nextMonth">▷</button> -->
          </div>
          <div class="calbody">
              <div class="header">
                <div class="week" v-for="(i,index) in tweek" v-bind:key="index"><div :style="
                [index!==6 && index!==0? setBlack: index===0?setRed: index===6? setBlue: setBlack]">{{tweek[index]}}</div></div>
              </div>

              <div class="body">
                  <div class="day" v-for="(i,index) in eday+sday+15" v-bind:key="index" :style="[index%7!==0 && index%7!==6? setBlack: index%7===0?setRed:setBlue]">
                      <span id="prevday" v-if="i!==sday+1 && index<sday">{{prevEday-(sday-i)}}</span>
                      <span id="curday" v-else-if="index-sday<eday">{{index-sday+1}}</span>
                      <span id="nextday" v-else>{{index-eday-sday+1}}</span>
                  </div>
              </div>

          </div>
      </div>
  </div>
</template>

<script>
export default {

  created(){
    this.sday = new Date('2022-01-01').getDay();
    this.year = new Date().getFullYear();
    this.setEndday();
  },
  mounted(){
    var to = new Date().getDate(); 
    const element = document.getElementsByClassName('day');
    for(var i=0; i<element.length;i++){
        if(parseInt(element[i].innerText) == parseInt(to)) {
            element[i].style.backgroundColor = 'black';
            element[i].style.color = 'white';
            element[i].style.border = '1px soild black';
            element[i].style.borderRadius = '10px';
        }
    }
  },
  data(){
    return{
      tweek:['일','월','화','수','목','금','토'],
      sday:0, eday:0,
      nextEday:0,prevEday:0,
      month:1, year:0,
      setRed: {color: 'red',},
      setBlue: {color: 'blue',},
      setBlack: {color: 'black',},
    }
  },
  methods:{
    prevMonth(){
        this.month-=1;
        this.setEndday();

        if(this.month<1) {
            this.year-=1;
            this.month=12;
        }

        var fullday= this.year+"-"+this.month+"-01";
        this.sday=new Date(fullday).getDay();
    },
    nextMonth(){
        this.month+=1;
        this.setEndday();

        if(this.month>12) {
            this.year+=1;
            this.month=1;
        }
        var fullday= this.year+"-"+this.month+"-01";
        this.sday=new Date(fullday).getDay();
    },
    setEndday(){
        var prevDate = new Date(this.year, this.month-1, 0).getDate();
        var curDate = new Date(this.year, this.month, 0).getDate();
        var nextDate = new Date(this.year, this.month + 1, 0).getDate();

        this.prevEday = prevDate;
        this.nextEday = nextDate;
        this.eday=curDate;
    }
  }
}
</script>

<style scoped lang='scss'>
.calendar{
    width: 100%;
    height: 100%; 
    .cal{
        margin: 0 auto;
        text-align: center;
        .caltop{
            width: 100%;
            height: 30px;
            font-size: 25px;
            // display: flex;
            // justify-content: space-between;
            button{
                background: white;
                width: 50px;
                border: none;
            }
            .selday:hover{cursor: default;}
            .prev, .next:hover{
                cursor: pointer;
            }
        }
        .calbody{
            width: 100%;
            height: calc(300px - 25px);
            .header{
                height: 30px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                .week{
                    width: 40px;
                    &:hover{cursor: default;}
                }
            }
            .body{
                width: 100%;
                height: 250px;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                overflow: hidden;
                line-height: 35px;
                &:hover{cursor: default;}
                .day{
                    width: calc(100% / 7);
                    height: calc(100% / 6);
                    #prevday, #nextday{color: rgba(128,128,128,0.5);}
                }
            }
        }
    }
}
</style>