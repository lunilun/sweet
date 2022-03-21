<template>
  <div class="background">
    <div class="one"></div>
    <div class="two"></div>
  </div>
</template>
<script>
export default {
  name: 'background',
  data () {
    return {
    }
  },
}
</script>
<style lang="scss">
.background{
  position: relative;
  opacity: .35;
  z-index: -1000;
  .one{
    position: absolute;
    width: 90%;
    height: 250px;
    top: 0;
    right: 0;
    background:url('../Image/background.png') repeat-x center;
    background-size: contain;
    z-index: -1000;
  }
  .two{
    position: absolute;
    width: 90%;
    height: 250px;
    top: 0;
    left: 0;
    background:url('../Image/background.png') repeat-x center;
    background-size: contain;
    z-index: -1000;
  }
}

</style>