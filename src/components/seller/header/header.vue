<template>
  <div class="header">
    <transition name="fade">
      <div class="modal-panel" v-show="modalState">
        <div class="modal-content">
          <modal :seller="seller" :backgroundArray="backgroundArray"></modal>
        </div>
        <div class="modal-close">
          <i class="icon iconfont icon-close" @click="showModal(false)"></i>
        </div>
      </div>
    </transition>
    <div class="position-background">
      <img width="100%" height="100%" :src="seller.avatar"/>
    </div>
    <div class="header-img">
      <img width="64" height="64" :src="seller.avatar"/>
    </div>
    <div class="content">
      <div class="title">
        <span class="background"></span>
        <span>{{seller.name}}</span>
      </div>
      <div class="description">
        {{seller.description}}
      </div>
      <div class="supports">
        <span v-if="seller.supports" class="background" :class="backgroundArray[seller.supports[0].type]"></span>
        <span v-if="seller.supports" class="detail">
            {{seller.supports[0].description}}
          </span>
        <span class="count" @click="showModal(true)">
            <span v-if="seller.supports">{{seller.supports.length}}个</span>
            <i class="icon iconfont icon-right"></i>
          </span>
      </div>
    </div>

    <div class="header-bottom">
      <span class="background">
      </span>
      <span class="detail">
        {{seller.bulletin}}
      </span>
      <i class="icon iconfont icon-right" @click="showModal(true)"></i>
    </div>

  </div>
</template>

<script>
  import modal from "../modal/modal"
  export default {
    components:{
      modal
    },
    data () {
      return {
        backgroundArray:['decrease','discount','guarantee','invoice','special'],
        modalState:false
      }
    },
    props: ['seller'],
    methods:{
      showModal:function(state){
        this.modalState = state
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

   .bg-image(@url){
     background-image:url("@{url}@2x.png");
     @media(-webkit-min-device-pixel-ratio: 3),
     (min-device-pixel-ratio: 3){
       background-image:url("@{url}@3x.png");
     }
   }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s!important;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .modal-panel{
    overflow: auto;
    position: fixed;
    z-index: 900;
    height: 100%;
    width: 100%;
    background: rgba(7,17,27,0.8);
    .modal-content{
      min-height: 100%;
      margin-bottom: -96px;

    }
    .modal-close{
      height: 64px;
      line-height: 64px;
      padding-bottom: 32px;
      text-align: center;
      .icon-close{
        font-size:32px ;
        color:rgba(255,255,255,0.5)
      }
    }
  }
  .header{
    font-size: 0;
    .position-background{
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .header-bottom{
      align-items: center;
      padding-left:12px;
      display: flex;
      font-size: 0;
      height: 28px;
      line-height: 28px;
      color:#fff;
      .detail{
        letter-spacing: 0.5px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        margin: 0 4px;
        font-size: 10px;
        line-height: 28px;
        height: 28px;
        font-weight: 200;
        display: inline-block;
        flex:1;

      }
      .icon-right{
        margin-right: 20px;
        font-size: 12px;
      }
      .background{
        background-repeat: no-repeat;
        vertical-align: middle;
        height: 12px;
        width: 22px;
        background-size: 22px 12px;
        display: inline-block;
        .bg-image("./bulletin");
      }
      background: rgba(7,17,27,0.2);
    }
    position: relative;
    background: rgba(0,0,0,0.5);
    .header-img{
      display: inline-block;
      img{
        margin:24px 16px 18px 24px;
      }
    }
    .content{
      color:#fff;
      margin-top: 26px;
      vertical-align: top;
      display: inline-block;
      .title{
        height: 24px;
        .background{
          margin: 2px 6px 8px 0;
          height: 18px;
          width: 30px;
          .bg-image("./brand");
          background-size:30px 18px ;
        }
        span{
          display: inline-block;
          vertical-align: top;
          font-size: 16px;
          font-weight: bold;
        }
      }
      .description{
        height: 18px;
        font-size: 12px;
        font-weight: 200;
        line-height: 18px;
      }
      .supports{
        height: 18px;
        line-height: 18px;
        vertical-align: middle;
        .background{
          display: inline-block;
          height: 12px;
          width: 12px;
          background-size: 12px 12px;
          vertical-align: middle;
          margin-right: 4px;
        }
        .decrease{
          .bg-image("./decrease_1");
        }
        .discount{
          .bg-image("./discount_1");
        }
        .guarantee{
          .bg-image("./guarantee_1");
        }
        .invoice{
          .bg-image("./invoice_1");
        }
        .special{
          .bg-image("./special_1");
        }
        .detail{
          vertical-align: middle;
          font-size: 10px;
          line-height: 10px;
          display: inline-block;
        }
        .count{
          padding: 0 8px;
          position: absolute;
          z-index: 2;
          right:12px;
          top:64px;
          border-radius: 12px;
          text-align: center;
          display: inline-block;
          font-weight: 200;
          height:24px;
          line-height: 24px;
          background: rgba(0,0,0,0.2);
          font-size: 10px;
          .icon-right{
            font-size: 10px;
          }
        }
      }
    }

  }
</style>
