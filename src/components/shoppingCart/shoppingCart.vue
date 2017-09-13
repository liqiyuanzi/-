<template>
  <div>
    <div class="shop-cart">
      <div id="cartEle" class="shop-image" :class="{ activeImage: price.price}" @click="showShopCartModal" >
        <i class="icon iconfont icon-shop" :class="{ activeIcon: price.price}"></i>
        <span class="price-count" v-if="price.price">
          {{price.priceCount}}
        </span>
      </div>
      <div class="fl" >
        <div class="price" :class="{ activePrice: price.price}">
          ￥{{price.price}}
        </div>
        <div class="delivery-price">
          另需配送费{{seller.deliveryPrice}}元
        </div>
      </div>
        <div class="send-price" v-if="!price.price">
          ￥{{seller.minPrice}}元起送
        </div>
      <div class="send-price" v-else-if="price.price < 20">
        还差￥{{seller.minPrice - price.price}}元起送
      </div>
      <div class="send-price send-ok" v-else="price.price < 20">
        去结算
      </div>
      <shoppingCartModal ref="shopCartModal" :price="price" :goods="goods" :modalState="modalState"></shoppingCartModal>
    </div>
    <transition name="modalStatus">
     <div class="mask" v-show="modalState.state" @click="setModalState"></div>
    </transition>
</div>
</template>

<script>
  import shoppingCartModal from "./shoppingCartModal"

export default {
  components:{
    shoppingCartModal
  },
  props:['seller','price','goods'],
  data () {
    return {
      modalState:{
        state:false
      }
    }
  },
  methods:{
    showShopCartModal(){
      this.$refs.shopCartModal.showModal();
    },
    setModalState(){
      this.modalState.state = false;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

  .modalStatus-enter-active, .modalStatus-leave-active {
    transition: opacity 0.5s;
  }
  .modalStatus-enter, .modalStatus-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
  }
  .mask{
    position: fixed;
    height: 100%;
    z-index: 99;
    width: 100%;
    background-color: rgba(7,17,27,0.6);
    left: 0;
    bottom: 0;
  }
  .shop-cart{
    font-size: 0;
    height: 48px;
    position: fixed;
    bottom:0;
    width:100%;
    background-color: #131d26;
    z-index: 100;
    .price-count{
      position: absolute;
      top: -6px;
      right: -6px;
      font-size:10px;
      background: rgb(240,20,20);
      color:#fff;
      display: inline-block;
      line-height: 16px;
      text-align: center;
      font-weight: bold;
      padding:2px 6px;
      border-radius: 16px;
    }

    .activeImage{
      background: rgb(0,160,220)!important;
    }
    .activeIcon{
      color:#fff!important;;
    }
    .activePrice{
      color:#fff!important
    }
    .shop-image{
      height: 44px;
      width: 44px;
      background: #2b343c;
      line-height: 44px;
      border-radius: 44px;
      text-align: center;
      position: absolute;
      border: 6px solid #131d26 ;
      top:-12px;
      left: 12px;
      .icon{
        color:#80858a;
        font-size: 22px;
      }
      .child{
        height: 16px;
        width: 16px;
        position: absolute;
        z-index: 200;
        left:0;
        top:0;
        transition: all 0.4s linear;
        .inner{
          transition: all 0.4s cubic-bezier(.44,-0.55,.83,.67);
          height: 16px;
          width: 16px;
          border-radius: 16px;
          background:#00a0dc ;
        }
      }
    }
    .price{
      font-size: 18px;
      font-weight: bold;
      color: #6a6e72;
      line-height: 24px;
      padding: 4px 0px 0 72px;
      height: 20px;
    }
    .delivery-price{
      font-size: 10px;
      color: #919396;
      line-height: 20px;
      height: 20px;
      padding-left: 72px;

    }
    .send-price{
      line-height: 48px;
      text-align: center;
      font-weight: bold;
      color:rgba(255,255,255,0.4) ;
      font-size: 12px;
      float:right;
      width:104px;
      background: #2b333b;
    }
    .send-ok{
      color:#fff;
      background: #19bd19;
    }
  }
</style>
