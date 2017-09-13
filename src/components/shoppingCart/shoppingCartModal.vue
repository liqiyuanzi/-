<template>
  <transition name="cartModal">
      <div class="shop-cart-modal" v-show="modalState.state"  >
          <div class="title">
            <span class="cart">购物车</span>
            <span  class="clear" @click="clearShopCart">清空</span>
          </div>
        <div ref="cartScroll" class="overflow">
          <ul class="shop-list">
            <li class="shop-list-item" v-for="item in selectedItem">
              <b>{{item.name}}</b>
              <div class="price-panel">
                <span class="price-style"><span>￥</span>{{item.price}}</span>
                <price-button :price="price" :goodsItem="item" ></price-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </transition>
</template>

<script>
  import priceButton from '@/components/priceButton/priceButton'
  import BetterScroll from 'better-scroll'
export default {
  props:['price','goods','modalState'],
  components:{
    priceButton
  },
  data () {
    return {
      selectedItem:[]
    }
  },

  methods:{
    showModal(){
      if(this.price.price){
        this.modalState.state = !this.modalState.state;
        if(this.modalState.state){
          this.selectedItem = [];
          this.calcSelectedCount();
          this.$nextTick(()=>{
            this.initScroll();
          })
        }
      }
    },
    initScroll(){
      if(!this.cartScroll){
        this.cartScroll = new BetterScroll(this.$refs.cartScroll,{
          click:true
        });
      }else{
        this.cartScroll.refresh();
      }
    },
    clearShopCart(){
      for(var i = 0;i < this.goods.length;i ++){
        for(var j = 0;j < this.goods[i].foods.length;j ++){
          if(this.goods[i].foods[j].count){
            this.goods[i].foods[j].count = 0;
          }
        }
      }
      this.price.price = 0;
      this.price.priceCount = 0;
      this.$nextTick(()=>{
        this.modalState.state = false;
      })
    },
    calcSelectedCount(){
      for(var i = 0;i < this.goods.length;i ++){
        for(var j = 0;j < this.goods[i].foods.length;j ++){
          if(this.goods[i].foods[j].count){
            this.selectedItem.push(this.goods[i].foods[j]);
          }
        }
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .cartModal-enter-active, .cartModal-leave-active {
    transition: all 0.5s;

  }
  .cartModal-enter, .cartModal-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    transform:translate3d(0,60%,0)!important;
  }

  .shop-cart-modal{
    position:absolute;
    left:0;
    top:0;
    width: 100%;
    background: #fff;
    z-index: -1;
    transform:translate3d(0,-100%,0);
    .overflow{
      max-height:258px;
      overflow: hidden;
    }
    .title{
      border-bottom:  2px solid rgba(7,17,27,0.1);
      padding: 0 18px;
      background: #f3f5f7;
      height: 40px;
      line-height: 40px;
      span{
        font-size: 14px;
      }
      .cart{
        color:rgb(7,17,27);
      }
      .clear{
        font-size: 12px;
        color:rgb(0,160,220);
        float:right;
        padding-left: 14px;
      }
    }
    .shop-list{
      padding: 0 18px;
      padding-bottom: 12px;
      font-size: 14px;
      color:rgb(7,17,27);
      background: #fff;
      .shop-list-item{
        line-height: 47px;
        color:#000;
        border-bottom:  1px solid rgba(7,17,27,0.1);
        .price-panel{
          display: inline-block;
          float:right;
          .price-style{
            color:rgb(240,20,20);
            font-size: 14px;
            font-weight: bold;
            margin-right: 12px;
            span{
              font-size: 10px;
            }
          }
          .price-button{
            height: 47px;
            .add-button,.delete-button{
              padding: 0;
            }
          }
        }
      }
    }
  }
</style>
