<template>
  <div class="ratings-content" ref="ratingsScroll">
    <div >
      <div class="star-panel">
        <div class="left-panel">
            <div class="highlight-style">
              {{seller.score}}
            </div>
            <div class="detail">
              综合评分
            </div>
            <div class="description">
              <span v-if="seller.rankRate > 0">高于</span>
              <span v-else>低于</span>
              <span>
                周边商家{{parseInt(seller.rankRate)}}%
              </span>
            </div>
        </div>
        <div class="right-panel">
          <div class="score">
            <span class="detail">商品评分</span><star :score="seller.foodScore" :isSmallStyle="1"></star>
            <span class="highlight-span">{{seller.foodScore}}</span>
          </div>
          <div class="score">
            <span class="detail">服务态度</span>
            <star :score="seller.serviceScore" :isSmallStyle="1"></star>
            <span class="highlight-span">{{seller.serviceScore}}</span>
          </div>
          <div class="score">
            <span class="detail">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="line"></div>
     <ul class="ratings-select-panel clear">
       <li class="all" @click="setRatingsState(-1)" :class="{ activeRatings:ratingsState == -1}">
         <span >
           全部
         </span>
         <span class="count" v-if="ratings">
           {{ratings.length ? ratings.length : 0}}
         </span>
       </li>
       <li class="satisfy" @click="setRatingsState(0)" :class="{ activeRatings:ratingsState == 0}">
         <span >
           推荐
         </span>
         <span class="count">
           {{this.satisfyCount}}
         </span>
       </li>
       <li class="unsatisfy" @click="setRatingsState(1)" :class="{ activeBadRatings:ratingsState == 1}">
         <span >
           吐槽
         </span>
         <span class="count">
           {{this.unsatisfyCount}}
         </span>
       </li>
     </ul>
      <div class="ratings-checked">
        <i class="icon iconfont icon-checked" :class="{ checked: ratingsContentState}" @click="setCheckedFlag"></i>
        <span>只看有内容的评论</span>
      </div>
      <ul class="ratings-list">
        <li v-for="(item,index) in ratingsContent"  v-if="ratingsContent.length">
          <div class="ratings-list-title">
            <div class="user">
              <span class="image" >
                <img :src="item.avatar" />
              </span>
              <div class="user-detail">
                <div class="detail">{{item.username}}</div>
                <star :score="item.score" :isSmallStyle="2"></star>
              </div>
              <span class="time">{{dealTime(item.rateTime)}}</span>
            </div>

          </div>
          <div class="ratings-list-detail">
            <span>{{item.text}}</span>
          </div>
          <div class="ratings-detail">
            <i class="icon iconfont icon-unsatisfy" v-if="parseInt(item.rateType)"></i>
            <i class="icon iconfont icon-satisfy" v-else></i>
            <span v-for="description in item.recommend">
              {{description}}
            </span>
          </div>
        </li>
      </ul>
      <div class="no-ratings" v-if="!ratingsContent.length">暂无评论信息</div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import BetterScroll from 'better-scroll'
  import star from '@/components/star/star'
  import axios from 'axios'

export default {
  components:{
    star
  },
  props:['seller'],
  created(){
    var vm = this;
    axios.get('/data/ratings').then((response)=>{
      if(response.data){
        if(response.data.errno == 0){
          vm.ratings = response.data.ratings;
          vm.$nextTick(()=>{
            vm.initRatings(()=>{
              vm.initScroll();
            });
          })
        }
      }
    }).catch(function (error) {
      vm.ratings = {};
    })
  },
  data () {
    return {
      ratings:{},
      /* ""：全部,0：推荐,1：吐槽*/
      ratingsState:-1,
      /*0：全部评价,1：有内容评价*/
      ratingsContentState:false,
      satisfyCount:0,
      unsatisfyCount:0,
      ratingsContent:[]
    }
  },
  methods:{
    initScroll(){
      if(!this.ratingsScroll){
        this.ratingsScroll = new BetterScroll(this.$refs.ratingsScroll,{
          click:true
        });
      }else{
        this.ratingsScroll.refresh();
      }
    },
    showRatings(){
      this.showFlag = true;
    },
    setCheckedFlag(){
      this.ratingsContentState = !this.ratingsContentState;
      this.calcRatings();
      this.$nextTick(()=>{
        this.initScroll();
      })
    },
    setRatingsState(ratingsState){
      this.ratingsState = ratingsState;
      this.calcRatings();
      this.$nextTick(()=>{
        this.initScroll();
      })
    },
    dealTime:function(date){
      return new Date(parseInt(date)).toLocaleString()
    },
    initRatings:function(callback){
      this.ratingsContent = this.ratings;
      if(this.ratings.length){
        for(var i = 0;i < this.ratings.length;i ++){
          if(this.ratings[i].rateType == '0'){
            this.satisfyCount += 1;
          }
          if(this.ratings[i].rateType == '1'){
            this.unsatisfyCount += 1;
          }
        }
      }
      if(callback){
       this.$nextTick(function () {
         callback();
       })
      }
    },
    calcRatings:function() {
      this.ratingsContent = [];
      for(var i = 0;i < this.ratings.length;i ++){
        var item = this.ratings[i];
        if((!this.ratingsContentState || (this.ratingsContentState&&item.text)) && ((this.ratingsState == parseInt(item.rateType)) || this.ratingsState == -1)){
          this.ratingsContent.push(item);
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .ratings-content{
    .line{
      height: 16px;
      width: 100%;
      background: #f3f5f7;
      border-top:1px solid #e6e7e8 ;
      border-bottom:1px solid #e6e7e8 ;
    }
    position: absolute;
    width: 100%;
    overflow: hidden;
    top:175px;
    bottom:66px;
    .star-panel{
      margin-top: 18px;
      margin-bottom: 18px;
      display: flex;
      .star{
        height: 14px;
        line-height: 14px;
        display: inline-block;
        padding: 0;
      }
      .left-panel{
        font-size: 0;
        flex:0 0 137px;
        height: 100%;
        @media screen and (max-width: 320px){
          flex:0 0 110px;
        }
        text-align: center;
        border-right: 1px solid #e6e7e8;
        .highlight-style{
          color:#ff9900;
          font-size: 24px;
          line-height: 31px;
        }
        .detail{
          font-size: 12px;
          color: rgb(7,17,27);
          line-height: 18px;
        }
        .description{
          font-size: 0;
          span {
            font-size: 10px;
            vertical-align: middle;
          }
          color:#b4b8bb;
          line-height: 20px;
        }
      }
      .right-panel{
        padding-left: 24px;
        @media screen and (max-width: 320px){
          padding-left: 12px;
        }
        .score{
          margin-bottom: 6px;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          .highlight-span{
            color:#ff9900;
          }
          .detail{
            color: rgb(7,17,27);
            margin-right: 12px;
          }
          .star{
            margin-right: 6px;
          }
          .time{
            color:#93999f
          }
        }

      }
    }
    .ratings-select-panel{
      padding: 18px 0px;
      margin:0 18px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      li{
        width: 60px;
        height: 32px;
        line-height: 32px;
        margin-right: 8px;
        border-radius: 2px;
        font-size: 12px;
        text-align: center;
        float:left
      }
      .all,.satisfy{
        background-color: #ccecf8;
        color:rgb(77,85,93);
      }
      .unsatisfy{
        background-color: #e9ebec;
        color:rgb(77,85,93);
      }
      .count{
        font-size: 8px;
        padding-left: 4px;
      }
      .activeRatings{
        background-color: #00a0dc;
        color:#fff;
      }
      .activeBadRatings{
        background-color: #44494F;
        color:#fff;
      }
    }
    .ratings-checked{
      height: 48px;
      line-height: 48px;
      text-indent: 18px;
      font-size: 12px;
      color: rgb(147,153,159);
      border-bottom: 1px solid #e6e7e8;
      .icon{
        font-size: 24px;
        margin-right: 4px;
        vertical-align: middle;
        color:#b7bbbf
      }
      .checked{
        color:#00a0dc;
      }
      span{
        vertical-align: middle;
      }
    }
    .ratings-list{
      padding: 0px 18px;
      li{
        border-bottom: 1px solid rgba(7,17,27,0.1);
        padding-bottom: 14px;
        padding-top: 16px;
      }
      .ratings-list-title{
        color:rgb(147,153,159);
        font-size: 10px;
        .user{
          .image{
            vertical-align: middle;
            display: inline-block;
            height: 28px;
            width: 28px;
            margin-right: 12px;
            img{
              width: 28px;
              height: 28px;
              border-radius: 28px;
            }
          }
          .user-detail{
            vertical-align: middle;
            display: inline-block;
            height: 28px;
            .detail{
              color:rgb(7,17,27);
              margin-right: 6px;
              line-height: 14px;
            }
            .star{
              padding: 0;
              height: 10px;
              line-height: 14px;
            }
          }
          .time{
            float:right;
          }
        }

      }
      .ratings-list-detail{
        font-size: 0;
        color:rgb(7,17,27);
        padding-left: 40px;
        margin-top: 6px;
        font-size: 12px;
        line-height: 18px;

      }
      .ratings-detail{
        font-size: 0;
        margin-left: 40px;
        span{
          font-size: 10px;
          color:rgb(147,153,159);
          margin-right: 8px;
          margin-top: 8px;
          display: inline-block;
          width:64px;
          @media screen and (max-width: 320px){
            width:52px;
          }
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 6px;
          height: 16px;
          text-align: center;
          line-height: 16px;
          border: 1px solid #e6e7e8;
          vertical-align: middle;
        }
        .icon{
          font-size: 16px;
          vertical-align: -8px;
          color:#b7bbbf;
          margin-right:8px
        }
        .icon-satisfy{
          color:#00a0dc!important;
        }
      }
    }
    .no-ratings{
      font-size: 12px;
      color:#93999f;
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
