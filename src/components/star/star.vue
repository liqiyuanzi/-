<template>
  <div class="star">
    <span  class="starStyle" v-for="item in starStyleClass"  :class="[isSmallStyle == 1 ? 'isMiddleStyle' : isSmallStyle == 2  ? 'isSmallStyle' : '', item]">
    </span>
  </div>
</template>

<script>
  const LENGTH = 5;
export default {
  props:['score','isSmallStyle'],
  data () {
    return {
      starStyleClass:{
        type:Array
      }
    }
  },
  watch: {
    score: function () {
      this.calcStar();
    }
  },
  mounted(){
    this.calcStar();
  },
  methods:{
    calcStar:function(){
      var starClass = Math.floor((this.score ? this.score : 0) * 2) / 2;

      var starClassArray = [];
      for(var j = 0;j < Math.floor(starClass);j ++){
        starClassArray.push("star-on");
      }
      if(starClass % 1 != 0){
        starClassArray.push("star-half");
      }
      while(starClassArray.length < LENGTH){
        starClassArray.push("star-off");
      }
      this.starStyleClass = starClassArray;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .bg-image(@url){
    background-image:url("@{url}@2x.png");
    @media(-webkit-min-device-pixel-ratio: 3),
    (min-device-pixel-ratio: 3){
      background-image:url("@{url}@3x.png");
    }
  }
  .star{
    padding-top: 16px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    .starStyle{
      background-size: 22px 22px;
      height: 22px;
      width: 22px;
      display: inline-block;
      margin-right: 30px;
      &:last-child{
        margin: 0;
      }
    }
    .isSmallStyle{
      background-size: 10px 10px;
      height: 10px;
      width: 10px;
      display: inline-block;
      margin-right: 6px;
      &:last-child{
        margin: 0;
      }
    }
    .isMiddleStyle{
        background-size: 14px 14px;
        height: 14px;
        width: 14px;
        display: inline-block;
        margin-right: 6px;
        &:last-child{
          margin: 0;
        }
    }
    .star-on{
      .bg-image("./star24_on");
    }
    .star-half{
      .bg-image("./star24_half");
    }
    .star-off{
      .bg-image("./star24_off");
    }
  }

</style>
