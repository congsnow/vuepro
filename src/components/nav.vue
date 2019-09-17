<template>
  <div class="appnav">
       <router-link to='/index'>精选</router-link>
       <router-link to='/cart'>购物车</router-link>
       <router-link to='/my'>我的</router-link>
  </div>
</template>

<script>
export default {
  name: 'appnav',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .appnav{
      height: 1.444444rem;
      display: flex;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background:#fff;
      box-shadow: 1px 2px 25px 0px rgba(0,0,0,0.1);
      z-index: 99;
      padding: .055556rem 0;
   }
   .appnav a{
      display:block;
      width: 33.333%;
      text-align: center;
      font-size: .388889rem;
      color: #666;
   }
</style>
