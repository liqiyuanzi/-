<template>
  <div class="modal">
    <div class="title">{{seller.name}}</div>
    <star :score="seller.score" ></star>
    <div class="info-title">
      <div class="line"></div>
      <div class="text">优惠信息</div>
      <div class="line"></div>
    </div>
    <div class="discount-panel" v-if="seller.supports">
      <div class="discount-item" v-for="(item,i) in seller.supports">
        <span class="background" :class="backgroundArray[i]">

        </span>
        <span class="detail">
          {{item.description}}
        </span>
      </div>
    </div>
    <div class="info-title">
      <div class="line"></div>
      <div class="text">商家公告</div>
      <div class="line"></div>
    </div>
    <div class="modal-detail">{{seller.bulletin}}</div>
  </div>
</template>

<script>
  import star from '@/components/star/star'
export default {
  props: ['seller','backgroundArray'],
  data () {
    return {
      msg: 'seller'
    }
  },
  components:{
    star
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
  .modal{
    padding-bottom: 96px;
    color:#fff;
    font-size: 12px;
    .title{
      font-size: 16px;
      font-weight: 700;
      line-height: 16px;
      padding-top: 64px;
      text-align: center;
    }
    .info-title{
      font-size: 14px;
      padding: 28px 36px 24px 36px;
      display: flex;
      .line{
        flex:1;
        width:224px;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        position: relative;
        top:-7px
      }
      .text{
        font-weight: bold;
        padding: 0 12px;
      }
    }
    .discount-panel{
      padding-left: 48px;
      .discount-item{
        margin-bottom: 12px;
        &:last-child{
          margin:0;
        }
        .background{
          background-repeat: no-repeat;
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: 16px 16px;
          margin-right: 6px;
          vertical-align: middle;
        }
        .detail{
          line-height: 16px;
          display: inline-block;
          vertical-align: middle;
        }
        .decrease{
          .bg-image("./decrease_2");
        }
        .discount{
          .bg-image("./discount_2");
        }
        .guarantee{
          .bg-image("./guarantee_2");
        }
        .invoice{
          .bg-image("./invoice_2");
        }
        .special{
          .bg-image("./special_2");
        }
      }
    }
    .modal-detail{
      padding: 0 48px;
      line-height: 24px;
    }
  }
</style>
