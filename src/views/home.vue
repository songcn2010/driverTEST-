<template>
  <div class="home_container">
    <wv-header title="首　　页" background-color="#f7f7f6"></wv-header>


    
    <div class="home_body">
      <router-view></router-view>
    </div>


    <wv-tabbar class="tabBar">
      <wv-tabbar-item to="/home" is-on>
      <img src="../assets/tabbar/home-active.png">
        <p>首页</p>
      </wv-tabbar-item>
      <wv-tabbar-item to="/collect">
      <img src="../assets/tabbar/col.png">
        <p>收藏</p>
      </wv-tabbar-item>
      <wv-tabbar-item to="/center">
      <img src="../assets/tabbar/my.png">
        <p>我的</p>
      </wv-tabbar-item>
    </wv-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.tabBar img {
  width: 30px;
}

.home_container,.home_body {
  height: 100%;
}
</style>
