<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  user-select: none;
}
html,body,#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
body .el-container {
  margin-bottom: 40px;
  height: 100%;
}
</style>
