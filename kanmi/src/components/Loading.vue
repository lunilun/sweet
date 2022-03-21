<template>
  <div class="Loading">
    <div class="back"></div>
    <div class="loader"></div>
    <div class="pumpingText">
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  data () {
    return {
    }
  },
}
</script>
<style lang="scss">
@mixin pos-set() {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 999;
  position: fixed;
}
.back{
    background:white;
    position: absolute;
    width: 100%;
    min-height: 1000px;
    opacity: 0.3;
    top: 0;
    left: 0;
    z-index: 998;
    :hover{cursor: default;}
}
.loader{
    width: 120px;
    height: 120px;
    border: 16px solid #FF6363;
    border-top: 16px solid #FFFDA2;
    animation: spin 1.5s linear infinite;
    border-radius: 50%;
    @include pos-set();
    :hover{cursor: default;}
}
.pumpingText{
  position: absolute;
  font-size: 50px;
  @include pos-set();
  color: black;
  :hover{cursor: default;}
  span{
    display: inline-block;
    animation: loading .7s infinite;
  }
}
@keyframes spin{
    0%{transform:translate(-50%,-50%) rotate(0deg);}
    100%{transform:translate(-50%,-50%) rotate(360deg);}
}
.pumpingText 
.pumpingText span:nth-child(2) {animation-delay: .1s;}
.pumpingText span:nth-child(3) {animation-delay: .2s;}
.pumpingText span:nth-child(4) {animation-delay: .3s;}
.pumpingText span:nth-child(5) {animation-delay: .4s;}
.pumpingText span:nth-child(6) {animation-delay: .5s;}
.pumpingText span:nth-child(7) {animation-delay: .6s;}
@keyframes loading {
  0%, 100% {transform: translateY(0);}
  50% {transform: translateY(20px);}
}
</style>