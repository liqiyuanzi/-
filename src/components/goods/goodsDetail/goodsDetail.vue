<template>
  <transition name="foods" v-if="showFlag" >
      <div class="goods-panel" ref="goodsScroll">
        <div >
          <div class="head-image">
            <img  :src="goodsDetail.image"/>
          </div>
          <div class="return" @click="showHideFlag(false)">
            <i class="icon iconfont icon-return"></i>
          </div>
          <div class="goods-info">
            <div class="title">{{goodsDetail.name}}</div>
            <div class="sale-info">
              <span class="sale-count">
                月售{{goodsDetail.sellCount}}份
              </span>
              <span class="">
                好评率{{goodsDetail.rating}}%
              </span>
            </div>
            <div class="price">
              <span class="new-price"><span>￥</span>{{goodsDetail.price}}</span>
              <span class="old-price">
                {{goodsDetail.oldPrice}}
              </span>

              <transition name="fade" v-if="!parseInt(goodsDetail.count)">
                <span class="add-cart"  @click="addCount($event)">
                  加入购物车
                </span>
              </transition>
              <price-button ref="shopCart"  v-else :price="price" :goodsItem="goodsDetail" ></price-button>
            </div>

          </div>
          <div class="line"></div>
          <div v-if="goodsDetail.info">
            <div class="description">
              <div class="title">
                商品介绍
              </div>
              <div class="detail">
                {{goodsDetail.info}}
              </div>
            </div>
            <div class="line"></div>
          </div>
          <ratings-panel :initScroll="initScroll" ref="showRatingsRef" v-if="goodsDetail.ratings.length" :ratingsDetail="goodsDetail.ratings" ></ratings-panel>
        </div>
      </div>
  </transition>

</template>

<script>
  import BetterScroll from 'better-scroll'
  import ratingsPanel from '@/components/goods/ratings/Ratings'
  import priceButton from '@/components/priceButton/priceButton'
  import Vue from 'vue'
  export default {
    components:{
      ratingsPanel,priceButton
    },
    props:['goodsDetail','showGoodsDetail','price'],
    data () {
      return {
        showFlag:false
      }
    },
    methods:{
      addPrice(price,event){
        this.getEleInfo(event);
        this.price.price += price;
        this.price.priceCount += 1;
      },
      addCount(event){
        Vue.set(this.goodsDetail,'count',1);
        this.price.price += this.goodsDetail.price;
        this.price.priceCount += 1;
        Vue.nextTick(() => {
          this.$refs.shopCart.getEleInfo(event);
        })
      },
      showHideFlag(flag){
        this.showFlag = flag;
        if(flag == true){
          Vue.nextTick(() => {
            this.goodsScroll = "";
            this.initScroll();
          })
        }
      },
      initScroll(){
        if(!this.goodsScroll){
          this.goodsScroll = new BetterScroll(this.$refs.goodsScroll,{
            probeType:3,click:true
          })
        }else{
          this.goodsScroll.refresh();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .goods-panel{
    position:fixed;
    bottom:48px;
    background: #fff;
    width:100%;
    top:0;
    left: 0;
    z-index:30;
    transform: translate3d(0,0,0);
    .return{
      position: absolute;
      top:0;
      left: 0;
      width: 50px;
      text-align: center;
      line-height: 50px;
      color:#fff;
    }
    .head-image{
      img{
        position:absolute;
        height: 100%;
        width: 100%;
        top:0;
      }
      position: relative;
      font-size: 0;
      width: 100%;
      height: 0;
      padding-top: 100%;
    }
    .goods-info{
      padding: 18px;
      .title{
        font-size: 14px;
        font-weight: 700;
        color:rgb(7,17,27);
        line-height: 14px;
      }
      .sale-info{
        color:rgb(147,153,159);
        font-size: 10px;
        line-height: 42px;
        .sale-count{
          margin-right: 12px;
        }
      }
      .price{
        .new-price{
          font-size: 14px;
          line-height:24px ;
          color: rgb(240,20,20);
          font-weight: bold;
          span{
            font-size: 10px;
            font-weight: bold;
          }
        }
        .old-price{
          font-size: 10px;
          font-weight: bold;
          color:rgb(147,153,159);
          line-height: 24px;
          text-decoration:line-through;
          span{
            font-size: 10px;
            font-weight: normal;
          }
        }
        .add-cart{
          padding: 0 13px;
          font-size: 10px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          background: #00a0dc;
          color: #fff;
          float: right;
          position: absolute;
          right: 18px;
          border-radius: 10px;
        }
        .price-button{
          top:-6px
        }
      }
    }
    .line{
      height: 16px;
      width: 100%;
      background: #f3f5f7;
      border-top:1px solid #e6e7e8 ;
      border-bottom:1px solid #e6e7e8 ;
    }
    .description{
      padding: 18px;
      .title{
        font-size: 14px;
        line-height: 14px;
        color:rgb(7,17,27);
      }
      .detail{
        padding: 6px 8px;
        line-height: 24px;
        font-size: 12px;font-weight: 200;
        color:rgb(77,85,93);
      }
    }

  }
  .foods-enter-active, .foods-leave-active {
    transition:all  0.2s linear;
  }
  .foods-enter, .foods-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    transform: translate3d(100%,0,0);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
