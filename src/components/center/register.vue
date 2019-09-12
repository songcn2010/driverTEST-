<template>
  <div class="register_body">
    <wv-group title='注册'>
      <wv-input v-model="username" label="用户名" placeholder="请输入用户名" required></wv-input>
      <wv-input v-model="password" label="密　码" placeholder="请输入密码" required></wv-input>
      <wv-input v-model="nickname" label="昵　称" placeholder="请输入昵称" required></wv-input>
    </wv-group>
    <wv-button class="avabtn" @touchend.native="showAvatar=true">上 传 头 像</wv-button>
    <img src="@/assets/user.png" ref="avatarPic">
    <div class="btns">
      <wv-button @touchend.native="toLogin">前往登录</wv-button>
      <wv-button type='primary' @touchend.native="handleReg">注　　册</wv-button>
    </div>

    <!-- 头像弹出层 -->
    <div class="cropAvatar" v-if="showAvatar">
      <vue-avatar :width='250' :height='250' :border='100' :scale='scale' ref="vueAvatar" image="@/assets/user.png">
      </vue-avatar>
      <wv-slider v-model="scale" :show-value='false' :min="1" :max="2" :step="0.01"></wv-slider>
      <div class="cropAvaBtns">
        <wv-button @touchend.native="showAvatar=false">取消</wv-button>
        <wv-button @touchend.native="getAvater">确定</wv-button>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import { VueAvatar } from "vue-avatar-editor-improved";

import { Toast } from "we-vue";

export default {
  components: {
    VueAvatar
  },
  data() {
    return {
      scale: 1,
      showAvatar: false,
      // 注册数据
      username: "",
      password: "",
      nickname: "",
      avatar: ""
    };
  },
  mounted() {
    // 初始化，默认头像
    this.avatar = this.$refs.avatarPic.src;
  },
  methods: {
    // 点击前往登录页
    toLogin() {
      this.$router.push("login");
    },

    // 获取裁切后的头像
    getAvater() {
      // 通过vue-avatar-editor的方法获取裁剪后的图片，并转化base64
      let url = this.$refs.vueAvatar.getImageScaled().toDataURL();
      this.$refs.avatarPic.src = url;
      this.avatar = url;
      this.showAvatar = false;
    },

    // 注册
    async handleReg() {
      let res = await this.axios.post("/api/users/register", {
        username: this.username,
        password: this.password,
        nickname: this.nickname,
        avatar: this.avatar
      });
      let { meta } = res.data;
      Toast.text({
        duration: 1000,
        message: meta.msg
      });
      if (meta.status === 200) {
        setTimeout(() => {
          // 注册成功，清空内容
          this.username = "";
          this.password = "";
          this.nickname = "";
          this.avatar = "";
          // 并跳转到登录页
          this.$router.push("login");
        }, 1100);
      }s
    }
  }
};
</script>

<style scoped>
.register_body {
  width: 90%;
  position: absolute;
  top: 50px;
  bottom: 60px;
  padding: 10px 5%;
}
.avabtn {
  margin: 20px 0;
}
.register_body img {
  width: 100px;
  height: 100px;
  margin-left: 50%;
  transform: translateX(-50%);
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

.cropAvatar {
  width: 80%;
  height: 450px;
  border: 1px solid #ccc;
  background-color: #fff;
  position: absolute;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.cropAvaBtns {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.cropAvaBtns button {
  width: 40%;
  margin: 0;
}
</style>
