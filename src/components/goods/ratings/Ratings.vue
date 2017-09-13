<template>
  <div class="ratings-panel">
     <ul class="ratings-select-panel clear">
       <li class="all" @click="setRatingsState(-1)" :class="{ activeRatings:ratingsState == -1}">
         <span >
           全部
         </span>
         <span class="count" v-if="ratingsDetail">
           {{ratingsDetail.length ? ratingsDetail.length : 0}}
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
          <span class="time">{{dealTime(item.rateTime)}}</span>
          <div class="user">
            <span class="detail">{{item.username}}</span>
            <span class="image" >
              <img :src="item.avatar" />
            </span>
          </div>
        </div>
        <div class="ratings-list-detail">
          <i class="icon iconfont icon-unsatisfy" v-if="parseInt(item.rateType)"></i>
          <i class="icon iconfont icon-satisfy" v-else></i>
          <span>{{item.text}}</span>
        </div>
      </li>
    </ul>
    <div class="no-ratings" v-if="!ratingsContent.length">暂无评论信息</div>
  </div>
</template>

<script>
  import Vue from 'vue'
export default {
  props:['ratingsDetail','initScroll'],
  data () {
    return {
      /* ""：全部,0：推荐,1：吐槽*/
      ratingsState:-1,
      /*0：全部评价,1：有内容评价*/
      ratingsContentState:false,
      satisfyCount:0,
      unsatisfyCount:0,
      ratingsContent:[]
    }
  },
  beforeMount(){
    this.ratingsContent = this.ratingsDetail;
    if(this.ratingsDetail.length){
      for(var i = 0;i < this.ratingsDetail.length;i ++){
        if(this.ratingsDetail[i].rateType == '0'){
          this.satisfyCount += 1;
        }
        if(this.ratingsDetail[i].rateType == '1'){
          this.unsatisfyCount += 1;
        }
      }
    }
  },
  methods:{
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
    calcRatings:function() {
      this.ratingsContent = [];
      for(var i = 0;i < this.ratingsDetail.length;i ++){
        var item = this.ratingsDetail[i];
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
  .ratings-panel{
    padding-top: 12px;
    padding-bottom: 12px;
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
        height: 12px;
        line-height: 12px;
        color:rgb(147,153,159);
        font-size: 10px;
        .time{

        }
        .user{
          float:right;
          .detail{
            margin-right: 6px;
          }
        }
        .image{
          img{
            width: 12px;
            height: 12px;
            border-radius: 12px;
          }
        }
      }
      .ratings-list-detail{
        font-size: 0;
        span{
          font-size: 12px;
        }
        line-height: 24px;
        .icon{
          font-size: 12px;
          margin-right: 4px;
          color:#b7bbbf
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
