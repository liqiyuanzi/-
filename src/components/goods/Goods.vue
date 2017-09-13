<template>
  <div>
    <div class="goods-wraper">
      <div ref="listScroll">
        <ul class="list" >
          <li class="list-item list-item-hook" v-on:click="setCurrentIndex(index,$event)" v-for="(item,index) in goods" :class="{'active':calcCurrentIndex == index}">
            <span class="text">
              <span class="background"  v-if="parseInt(item.type)>-1" :class="backgroundArray[item.type]">
              </span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div ref="contentScroll">
        <div class="content">

          <div class="content-list content-list-hook"  v-for="item in goods">
            <div class="title">
              {{item.name}}
            </div>
            <div class="detail-list" v-for="(goodsItem,index) in item.foods" v-on:click="showGoodsDetail(goodsItem)">
               <div class="detail-list-item">
                 <div class="image">
                   <img width="56" height="56" :src="goodsItem.icon"/>
                 </div>
                 <div class="goods-detail">
                   <div class="name">{{goodsItem.name}}</div>
                   <div class="description">{{goodsItem.description}}</div>
                   <div class="sell-info">
                     <span class="sell-count">月售{{goodsItem.sellCount}}份</span>
                     <span class="sell-rating">好评率{{goodsItem.rating}}%</span>
                   </div>
                   <div class="price">
                     <span class="now-price"><span>￥</span>{{goodsItem.price}}</span>
                     <span class="old-price" v-if="goodsItem.oldPrice"><span>￥</span>{{goodsItem.oldPrice}}</span>
                     /* price：购物车信息,goodItems：价格信息,index：索引值*/
                      <price-button :price="price" :goodsItem="goodsItem" ></price-button>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <shopping-cart :price="price" :seller="seller" :goods="goods"> </shopping-cart>
    <goods-detail ref="goodsRef" :goodsDetail="goodsDetail" :showGoodsDetail="showGoodsDetail"  :price="price"></goods-detail>
  </div>
</template>

<script>
  import axios from 'axios'
  import BetterScroll from 'better-scroll'
  import priceButton from '@/components/priceButton/priceButton'
  import goodsDetail from './goodsDetail/goodsDetail'
  import shoppingCart from '@/components/shoppingCart/shoppingCart'
  import vm from "vue";
export default {
  props:['price','seller'],
  components:{
    priceButton,goodsDetail,shoppingCart
  },
  data () {
    return {
      goods:{},
      positionY:0,
      contentListArray:[],
      backgroundArray:['decrease','discount','guarantee','invoice','special'],
      goodsDetail:{},
      data:{}
    }
  },
  created(){
    var vm = this;
    axios.get('/data/goods').then((response)=>{
      //response = response.data;
      if(response.data){
        if(response.data.errno == 0){
          vm.goods = response.data.goods;
          this.$nextTick(()=>{
            this.initScroll();
            this.calcHeight();
          })
        }
      }
    }).catch(function (error) {
      vm.goods = {};
    })
  },
  methods:{
    initScroll(){
      this.listScroll = new BetterScroll(this.$refs.listScroll,{
        click:true
      });
      this.contentScroll = new BetterScroll(this.$refs.contentScroll,{
        probeType:3,click:true
      });

      var _this = this;
      this.contentScroll.on('scroll',(pos) =>{
        _this.positionY = Math.abs(Math.round(pos.y));
      });
    },
    /*显示商品详情*/
    showGoodsDetail(goodsItem){
      this.$refs.goodsRef.showHideFlag(true);
      if(goodsItem != undefined){
        this.goodsDetail = goodsItem;
      }
    },
    /*计算全部高度*/
    calcHeight(){
      this.contentListArray = [0];
      var contentList = this.$refs.contentScroll.getElementsByClassName('content-list-hook');
      var allHeight = 0;
      for(var i = 0;i < contentList.length;i ++){
        allHeight += contentList[i].clientHeight
        this.contentListArray.push(allHeight)
      }
    },
    setCurrentIndex(index,$event){
      var eleList = this.$refs.contentScroll.getElementsByClassName('content-list-hook');
      var ele = eleList[index];
      this.contentScroll.scrollToElement(ele,300);
    }
  },
  computed:{
    calcCurrentIndex(){
      for(var k = 0;k < this.contentListArray.length;k ++){
        var topHeight = this.contentListArray[k];
        var bottomHeight = this.contentListArray[k + 1];
        if(this.$refs.listScroll){
          if(!bottomHeight || topHeight <= this.positionY && bottomHeight > this.positionY){
            var eleList = this.$refs.listScroll.getElementsByClassName('list-item-hook');
            var ele = eleList[k];
            if(this.listScroll){
              this.listScroll.scrollToElement(ele,300);
            }
            return k;
          }
        }
      }
      return 0;
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
  .active{
    background: #fff;
    font-weight: bold;
    .text{
      border-bottom: 1px solid #fff!important;
    }
  }
  .decrease{
    .bg-image("./decrease_3");
  }
  .discount{
    .bg-image("./discount_3");
  }
  .guarantee{
    .bg-image("./guarantee_3");
  }
  .invoice{
    .bg-image("./invoice_3");
  }
  .special{
    .bg-image("./special_3");
  }
  .goods-wraper{
    position:absolute;
    width: 100%;
    top:175px;
    bottom:48px;
    overflow: hidden;
    display: flex;
    .list{
      z-index: 100;
      background-color: #f3f5f7;
      flex:0 0 80px;
      width: 80px;
      .list-item{
        width: 56px;
        height: 54px;
        font-size: 12px;
        color: #333;
        display: table;
        padding-left: 12px;
        padding-right: 12px;
        .text{
          .background{
            display: inline-block;
            height: 12px;
            width: 12px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
          }
          display: table-cell;
          vertical-align: middle;
          line-height: 14px;
          border-bottom: 1px solid rgba(7,17,27,0.1);
        }
      }
    }
    .content{
      flex:1;
      .content-list{
        .title{
          line-height: 26px;
          height: 26px;
          color: rgb(147,153,159);
          text-indent: 14px;
          font-size: 12px;
          background-color: #f3f5f7;
          border-left: 2px solid #d9dde1;
        }
        .detail-list{
          font-size: 0;
          margin: 18px 18px 0 18px;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          &:last-child{
            border:none;
          }
          min-height: 78px;
          .detail-list-item{
            display: flex;
            .image{
              flex:0 0 56px
            }
            .goods-detail{
              flex:1;
              margin-left: 10px;
              .name{
                font-weight: bold;
                font-size: 14px;
                color:rgb(7,17,27);
                line-height: 18px;
              }
              .description{
                font-size: 10px;
                color: rgb(147,153,159);
                line-height: 18px;

              }
              .sell-info{
                color: rgb(147,153,159);
                font-size: 0;
                .sell-count {
                  margin-right: 10px;
                  font-size: 10px;
                }
                .sell-rating{
                  font-size: 10px;
                }
              }
              .price{
                .now-price{
                  font-size: 14px;
                  font-weight: bold;
                  color:#f01414;
                  line-height: 35px;
                  margin-right: 8px;

                  span{
                    font-size: 10px;
                    font-weight: normal;
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
              }
            }
          }

        }
      }
    }
  }
</style>
