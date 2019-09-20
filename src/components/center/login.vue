<template>
  <div class="login_body">
    <wv-group title='登录'>
      <wv-input v-model="username" label="用户名" placeholder="请输入用户名" required></wv-input>
      <wv-input v-model="password" type="password" label="密　码" placeholder="请输入密码" required></wv-input>
      <wv-input v-model="verify" label="验证码" placeholder="请输入验证码" :maxlength='4'>
        <img @touchend="getNewVerify" src="/api/verify" slot="ft" /></wv-input>

    </wv-group>
    <div class="btns">
      <wv-button @touchend.native="toReg">前往注册</wv-button>
      <wv-button type='primary' @touchend.native="login">登　　录</wv-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "we-vue";
export default {
  data() {
    return {
      username: "",
      password: "",
      verify: ""
    };
  },
  methods: {
    // 前往注册页
    toReg() {
      this.$router.push("register");
    },
    // 刷新验证码
    getNewVerify(e) {
      e.target.src = "/api/verify?" + Math.random();
    },

    // 登录
    async login() {
      // 非空排除
      if (!this.username || !this.password || !this.verify) {
        Toast.text({
          duration: 1000,
          message: "请补全登录信息"
        });
        return;
      }
      // 发送登录请求
      let res = await this.axios.post("/api/users/login", {
        username: this.username,
        password: this.password,
        verify: this.verify
      });
      let { meta, data } = res.data;
      console.log(data)
      if (meta.status === 200) {
        // 登陆成功，将token保存，并提示跳转
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('username', data.username);
        window.localStorage.setItem('avatar', data.avatar);
        window.localStorage.setItem('collection', data.collection);
        Toast.success({
          duration: 1000,
          message: meta.msg
        });
        setTimeout(() => {
          this.$router.push("center");
        }, 1000);
      }else{
        Toast.fail({
          duration: 1000,
          message: meta.msg
        });
      }
    }
  }
};
</script>

<style scoped>
.login_body {
  width: 90%;
  position: absolute;
  top: 50px;
  bottom: 60px;
  padding: 10px 5%;
}
.login_body img {
  position: absolute;
  right: 0;
  bottom: 5px;
  border-radius: 4px;
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
