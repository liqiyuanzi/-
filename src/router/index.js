import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'

Vue.use(Router)
let router = new Router();
router.push("/goods")
export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
	{
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
	{
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ]
})