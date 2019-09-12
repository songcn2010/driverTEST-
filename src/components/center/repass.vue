<template>
  <div class="nickname_body">
    <wv-group title='修改密码'>
      <wv-input v-model="newpass" type="password" label="新密码" placeholder="请输入新密码" required></wv-input>
      <wv-input v-model="password" type="password" label="确认密码" placeholder="请输入确认密码" required></wv-input>
    </wv-group>
    <div class="btns">
      <wv-button @touchend.native="tocenter">取　　消</wv-button>
      <wv-button @touchend.native="repass" type='primary'>修　　改</wv-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "we-vue";
export default {
  data() {
    return {
      newpass: "",
      password: ""
    };
  },
  methods: {
    tocenter() {
      this.$router.push("center");
    },
    // 修改密码
    repass() {
      if (!this.password || !this.newpass) {
        Toast.text({
          duration: 1000,
          message: "密码不能为空"
        });
        return;
      }
      if (this.password != this.newpass) {
        Toast.text({
          duration: 1000,
          message: "两次输入密码不相同"
        });
        return;
      }

      // 异常情况排除，发送修改请求
      this.axios.post('/api/users/repass',{
        username: window.localStorage.getItem('username'),
        password: this.password
      }).then(res => {
        console.log(res);
        if(res.data.meta.status === 200){
          Toast.success({
            duration: 1000,
            message: res.data.meta.msg
          })
          setTimeout(() => {
            this.$router.push('center')
          }, 1000)
        }
      })
    }
  }
};
</script>

<style scoped>
.nickname_body {
  width: 90%;
  position: absolute;
  top: 50px;
  bottom: 60px;
  padding: 10px 5%;
}
.btns {
  display: flex;
  align-items: center;
  padding-top: 20px;
  justify-content: space-around;
}
.btns button {
  margin: 0;
  width: 40%;
}
</style>
