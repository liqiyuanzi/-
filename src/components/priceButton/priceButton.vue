<template>
  <div class="price-button">
    <transition name="animate" >
      <div class="delete-button" v-show="this.goodsItem.count > 0" @click.stop="deletePrice(goodsItem.price)">
        <i class="icon iconfont icon-delete"></i>
      </div>
    </transition>
    <span class="count-panel" v-if="this.goodsItem.count > 0">{{this.goodsItem.count}}</span>
    <div class="add-button" @click.stop="addPrice(goodsItem.price,$event)">
      <i class="icon iconfont icon-add"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
export default {
  props:['price','goodsItem'],
  data () {
    return {
      addCount:0
    }
  },
  methods: {
    addPrice(price, event) {
      if(!this.goodsItem.count){
        Vue.set(this.goodsItem,'count',1);
      } else{
        this.goodsItem.count += 1;
        console.log(this.goodsItem.count);
      }
      this.getEleInfo(event);
      this.price.price += price;
      this.price.priceCount += 1;
    },
    getEleInfo(event) {
      var ele = event.target;
      var cartEle = document.getElementById("cartEle");
      var positionObj = ele.getBoundingClientRect();
      var newEle = document.createElement("div");
      var innerEle = document.createElement("div");
      newEle.classList.add("child");
      innerEle.classList.add("inner");
      newEle.style.left = positionObj.left - 16 + "px";
      newEle.style.top = -(document.body.clientHeight - positionObj.bottom - 33) + "px";
      newEle.appendChild(innerEle);
      cartEle.appendChild(newEle);
      setTimeout(function () {
        this.startMove(newEle, innerEle, positionObj);
      }.bind(this), 20)
    },
    startMove(moveEle, innerEle, positionObj) {
      //moveEle.style.transition="-webkit-transform 500ms ease-out";
      moveEle.style.transform = "translate3d(" + -(positionObj.left - 24) + "px, 0px, 0px)"
      innerEle.style.transform = "translate3d(0," + (document.body.clientHeight - positionObj.bottom - 33) + "px, 0px)";
      setTimeout(function () {
        moveEle.style.display = "none";
      }, 400)
    },
    deletePrice(price) {
      if(this.goodsItem.count > 0){
        this.goodsItem.count -= 1;
        this.price.price -= price;
        this.price.priceCount -= 1;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .price-button{
    position: relative;
    float:right;
    transition: all 0.4s linear;
    .add-button{
      display: inline-block;
      padding: 6px;
      color:#00a0dc;
      position: relative;

    }
    .delete-button{
      padding: 6px;
      display: inline-block;
      color:#00a0dc;
    }
    .animate-enter-active{
      transition: all .3s linear;
    }
    .animate-leave-active{
      transition: all .3s linear;
    }
    .animate-enter,.animate-leave-to{
      transform: translateX(34px) rotate(180deg);
      opacity: 0;
    }

    .count-panel{
      display: inline-block;
      font-size: 12px;
      vertical-align: 3px;
    }
    .icon{
      font-size: 20px!important;
    }
  }


</style>
