<template>
  <div id="app">
      <header-block v-bind:seller="seller"></header-block>
      <div class="tab">
         <router-link to="/goods">商品</router-link>
         <router-link to="/ratings">评价</router-link>
         <router-link to="/seller">商家</router-link>
      </div>
      <keep-alive>
        <router-view :seller="seller"  :price="price"></router-view>
      </keep-alive>
  </div>
</template>

<script>

import headerBlock from '@/components/seller/header/header'
import axios from 'axios'

export default {
	name: 'app',
	components:{
		headerBlock
	},
	data () {
		return {
			seller: {},
      price:{
        price:0,
        priceCount:0
      }
		}
	},
	created(){
		var vm = this;
		axios.get('/data/seller').then((response)=>{
			//response = response.data;
			if(response.data){
				if(response.data.errno == 0){
					vm.seller = response.data.seller;
				}
			}
		}).catch(function (error) {
			vm.seller = {};
		})
	}
}

</script>

<style lang="less" rel="stylesheet/less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
	.tab{
		display:flex;
		width:100%;
		height:40px;
		line-height:40px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
		a{
			flex:1;
			text-align:center;
			text-decoration:none;
      font-size: 14px;
      color:rgb(77,85,93);
      font-weight: 400;
		}
		.router-link-active{
			color:rgb(240,20,20);

		}
	}
}
</style>
