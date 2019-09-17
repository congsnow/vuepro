<template>
  <div class="index">
      <mt-search
          v-model="value"
          cancel-text="取消"
          placeholder="搜索商品">
      </mt-search>
      <mt-swipe :auto="4000">
          <mt-swipe-item v-for="item in bannerarr" v-bind:key="item.url"><img v-bind:src="item.url"></mt-swipe-item>
      </mt-swipe>
      <bar></bar>
      <appnav></appnav>
  </div>
</template>

<script>
import bar from './bar.vue'
import appnav from './nav.vue'
export default {
  name: 'index',
  data () {
    return {
      value:'磨牙棒',
      bannerarr:[]
    }
  },
  components:{
    bar,
    appnav
  },
  mounted(){
    this.axios
      .get('./static/banner.json')
      .then(response => (
          this.bannerarr = response.data.banner
          // console.log(response.data.banner,this.bannerarr)
      ))
  }
}
</script>

<style scoped></style>
