<template>
  <div class="col_container">
    <wv-header title="收　　藏" background-color="#f7f7f6">
    </wv-header>

    <div class="col_body">
      <router-view></router-view>
    </div>

    <wv-tabbar class="tabBar">
      <wv-tabbar-item to="/home">
        <img src="../assets/tabbar/home.png">
        <p>首页</p>
      </wv-tabbar-item>
      <wv-tabbar-item to="/collect" is-on>
        <img src="../assets/tabbar/col-active.png">
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
import { Toast } from "we-vue";
export default {
  mounted () {
    let token = window.localStorage.getItem('token');
    if(!token){
      Toast.text({
        duration: 1000,
        message: "请先登录"
      })
      this.$router.push('/center/login')
    }
  }
};
</script>

<style scoped>
.tabBar img {
  width: 30px;
}
.col_container,.col_body {
  height: 100%;
}
</style>
