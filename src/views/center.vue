<template>
  <div class="center_container">
    <wv-header title="个人中心" background-color="#f7f7f6"></wv-header>

    <div class="center_body">
      <router-view></router-view>
    </div>

    <wv-tabbar class="tabBar" v-if="show">
      <wv-tabbar-item to="/home">
        <img src="../assets/tabbar/home.png">
        <p>首页</p>
      </wv-tabbar-item>
      <wv-tabbar-item to="/collect">
        <img src="../assets/tabbar/col.png">
        <p>收藏</p>
      </wv-tabbar-item>
      <wv-tabbar-item to="/center" is-on>
        <img src="../assets/tabbar/my-active.png">
        <p>我的</p>
      </wv-tabbar-item>
    </wv-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  mounted () {
    window.onresize = () => {
      console.log(document.body.clientHeight)
      if(document.body.clientHeight< 500){
        this.show =false
      }else{
        this.show = true
      }
    }
  }
};
</script>

<style scoped>
.tabBar img {
  width: 30px;
}
.center_container,.center_body {
  height: 100%;
}
</style>
