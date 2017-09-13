<template>
  <div class="seller-panel" ref="sellerScroll">
    <div >
      <div class="head">
        <div class="collection">
          <div class="top">
            <i class="icon iconfont icon-collection" :class="[parseInt(collectionStatus) ? 'store' : '']" @click="setCollectionStatus">
            </i>
           </div>
          <div class="detail" >
            <span v-if="parseInt(collectionStatus)">已收藏</span>
            <span v-else>收藏&nbsp;</span>
          </div>
        </div>
        <div class="title">
          {{seller.name}}
        </div>
        <div class="ratings-panel">
          <star :score="seller.score" :isSmallStyle="1"></star>
          <span class="ratings-count">({{seller.ratingCount}})</span>
          <span class="sell-count">月售{{seller.sellCount}}单</span>
        </div>
        <div class="foods-info">
          <div class="detail">
            <div class="description">
                起送价
            </div>
            <div class="content">
              {{seller.minPrice}}<span>元</span>
            </div>
          </div>
          <div class="detail">
            <div class="description">
              商家配送
            </div>
            <div class="content">
              {{seller.deliveryPrice}}<span>元</span>
            </div>
          </div>
          <div class="detail">
            <div class="description">
              平均配送时间
            </div>
            <div class="content">
              {{seller.deliveryTime}}<span>分钟</span>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="announcement">
        <div class="title">
          公告与活动
        </div>
        <div class="content">
          {{seller.bulletin}}
        </div>
      </div>
      <ul class="action-info">
        <li class="action-info-item" v-for="(item ,i ) in seller.supports">
          <span class="background" :class="backgroundArray[i]"></span>
          <span class="detail">{{item.description}}</span>
        </li>
      </ul>
      <div class="line"></div>
      <div class="scenery">
        <div class="title">
          商家实景
        </div>
        <div class="slide-panel" >
          <div class="flex-div" ref="imageScroll">
            <div style="display:inherit">
              <div class="slide-item" v-for="item in seller.pics">
                <img :src="item"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="seller-info">
        <div class="title">
          商家信息
        </div>
        <div class="content" v-for="item in seller.infos">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '@/components/star/star'
  import BetterScroll from 'better-scroll'
export default {
  props:['seller'],
  data () {
    return {
      collectionStatus:0,
      backgroundArray:['decrease','discount','guarantee','invoice','special'],
    }
  },
  created(){
    this.collectionStatus =  localStorage.collectionStatus != undefined ? localStorage.collectionStatus : 0;
  },
  mounted(){
    this.$nextTick(() =>{
      this.initScroll();
      this.initImageScroll()
    })
  },
  methods:{
    setCollectionStatus(){
      localStorage.collectionStatus = Math.abs(this.collectionStatus - 1);
      console.log(localStorage.collectionStatus);
      this.collectionStatus = localStorage.collectionStatus;
    },
    initScroll(){
      if(!this.sellerScroll){
        this.sellerScroll = new BetterScroll(this.$refs.sellerScroll,{
          click:true
        });
      }else{
        this.sellerScroll.refresh();
      }
    },
    initImageScroll(){
      if(!this.imageScroll){
        this.imageScroll = new BetterScroll(this.$refs.imageScroll,{
          click:true,scrollX:true
        });
      }else{
        this.imageScroll.refresh();
      }
    }
  },
  components:{
    star
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" rel="stylesheet/less">
  .bg-image(@url){
    background-image:url("@{url}@2x.png");
    @media(-webkit-min-device-pixel-ratio: 3),
    (min-device-pixel-ratio: 3){
      background-image:url("@{url}@3x.png");
    }
  }
  .seller-panel{
    position: absolute;
    width: 100%;
    left:0;
    top:174px;
    bottom: 48px;
    overflow: hidden;
    .line{
      height: 16px;
      width: 100%;
      background: #f3f5f7;
      border-top:1px solid #e6e7e8 ;
      border-bottom:1px solid #e6e7e8 ;
    }
    .head{
      padding: 18px;
      position: relative;
      .collection{
        position: absolute;
        right:18px;
        top:16px;
        .top{
          font-size: 0;
          line-height: 24px;
          height: 24px;
          padding-bottom: 4px;
          text-align: center;
        }
        .detail{
          font-size: 10px;
          color:rgb(77,85,93);
          line-height: 10px;
          width: 36px;
          text-align: center;
        }
        .icon{
          color:#d4d6d9;
          font-size: 24px;
        }
        .store{
          color:rgb(240,20,20)
        }
      }
      .title{
        height: 14px;
        font-size: 14px;
        line-height: 14px;
        color:rgb(7,17,27);
      }
      .ratings-panel{
        margin-top: 8px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        font-size: 0;
        .star{
          padding: 0;
          margin-right: 8px;
          vertical-align: middle;
          display: inline-block;
          height: 14px;
        }
        .ratings-count{
          font-size: 10px;
          color:rgb(77,85,93);
          vertical-align: middle;
          margin-right: 12px;
        }
        .sell-count{
          font-size: 10px;
          color:rgb(77,85,93);
          vertical-align: middle;
        }
      }
      .foods-info{
        display: flex;
        padding-top:18px;
        .detail{
          flex:1;
          text-align: center;
          border-right: 1px solid rgba(7,17,27,0.1);
          &:last-child{
            border: none;
          }
          .description{
            font-size: 10px;
            color:rgb(147,153,159);
            line-height: 12px;
            padding-bottom: 4px;
          }
          .content{
            font-size: 24px;
            line-height: 24px;
            color:rgb(7,17,27);
            font-weight: 200;
            span{
              font-size: 10px;
            }
          }
        }
      }
    }
    .announcement{
      padding: 18px 18px 0 18px;
      .title{
        font-size: 14px;
        color:#000;
      }
      .content{
        padding:8px 12px 16px 12px;
        padding-bottom: 16px;
        color:rgb(240,20,20);
        font-size: 12px;
        line-height:24px ;
      }
    }
    .action-info{
      padding:0 18px;
      .action-info-item{
        padding:16px 12px ;
        line-height: 16px;
        border-top: 1px solid rgba(7,17,27,0.1);
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
          font-size: 12px;
          display: inline-block;
          vertical-align: middle;
        }
        .decrease{
          .bg-image("./decrease_4");
        }
        .discount{
          .bg-image("./discount_4");
        }
        .guarantee{
          .bg-image("./guarantee_4");
        }
        .invoice{
          .bg-image("./invoice_4");
        }
        .special{
          .bg-image("./special_4");
        }
      }
    }
    .scenery{
      padding: 18px;
      font-size: 0;
      .title{
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 12px;
        color: rgb(7,17,27);
      }
      .slide-panel{
        height: 90px;
        overflow: hidden;
        .flex-div{
          display: flex;
          .slide-item{
            flex:0 0 120px;
            height: 90px;
            margin-right: 6px;
            img{
              height: 90px;
              width: 120px;
            }
          }
        }
      }
    }
    .seller-info{
      padding: 18px 18px 0 18px;
      .title{
        font-size: 14px;
        color:#000;
        padding-bottom: 12px;
      }
      .content{
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
        border-top: 1px solid rgba(7,17,27,0.1);
      }
    }
  }
</style>
