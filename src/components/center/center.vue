<template>
  <div class="ct_body">
    <ul>
      <li class="avatar">
        <img :src="avatar" ref='avatarPic' @touchend="showCropAvatar=true ">
        <div>
          <p>用户名：{{ username }}</p>
          <p>昵　称：{{ nickname }}</p>
        </div>
      </li>
      <li>
        <wv-button @touchend.native="tonick">修改昵称</wv-button>
      </li>
      <li>
        <wv-button @touchend.native="torepass">修改密码</wv-button>
      </li>
      <li>
        <wv-button @touchend.native="tocol">我的收藏</wv-button>
      </li>
      <li>
        <wv-button style="marginTop:50px" @touchend.native="logout" type="warn">退　　出</wv-button>
      </li>
    </ul>

    <!-- 修改头像弹出层 -->
    <div class="cropAvatar" v-if="showCropAvatar">
      <vue-avatar :width='300' :height='300' :border='100' :scale='scale' ref="vueAvatar" image="@/assets/003.png">
      </vue-avatar>
      <wv-slider v-model="scale" :show-value='false' :min="1" :max="2" :step="0.01"></wv-slider>
      <div class="cropAvaBtns">
        <wv-button @touchend.native="showCropAvatar=false">取消</wv-button>
        <wv-button @touchend.native="getAvater">确定</wv-button>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import { VueAvatar } from "vue-avatar-editor-improved";
import { Toast, Dialog } from "we-vue";
export default {
  components: {
    VueAvatar
  },
  data() {
    return {
      showCropAvatar: false,
      scale: 1,

      username: "",
      nickname: "",
      avatar: ""
    };
  },
  mounted() {
    // 登录拦截
    let token = window.localStorage.getItem("token");
    if (!token) {
      this.$router.push("login");
      return;
    }
    this.getUserList();
    if(!this.avatar){
      this.avatar = window.localStorage.getItem('avatar')
    }
  },
  methods: {
    // 修改头像功能
    getAvater() {
      // 通过头像裁切组件的方法将图片地址base64
      let newAva = this.$refs.vueAvatar.getImage().toDataURL();
      // 发送修改头像请求
      this.axios
        .post("/api/users/reavatar", {
          username: window.localStorage.getItem("username"),
          avatar: newAva
        })
        .then(res => {
          console.log(res);
          if (res.data.meta.status === 200) {
            this.avatar = res.data.data.avatar;
            Toast.success({
              duration: 1000,
              message: res.data.meta.msg
            });
            // 因为图片是用用户名命名的，没有变化，所以图片不会再次请求，用一种最low的办法，刷新
            // 还有一种办法，设置一个空白页面，跳转过去，在那边进去就调回来
            this.$router.go(0);
          }
          // 关闭弹出层
          this.showCropAvatar = false;
        });
    },

    // 获取当前用户数据
    async getUserList() {
      let res = await this.axios.get("/api/users/getnow");
      let { meta, data } = res.data;
      // console.log(meta.msg)
      if (meta.status === 200) {
        this.username = data.username;
        this.nickname = data.nickname;
        this.avatar = data.avatar;
      }
      if (meta.status === 403) {
        Dialog({
          title: "提示",
          message: meta.msg,
        }).then(() => {
          this.$router.push('login')
          window.localStorage.removeItem('token')
        })
      }
    },

    // 退出,其实可以不用发请求，直接清除保存的token然后拦截到登录页即可
    logout() {
      Dialog.confirm({
        title: "提示",
        message: "您确认要退出?",
        showCancelButton: true
      })
        .then(() => {
          this.axios.get("/api/users/logout").then(res => {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("username");
            this.$router.push("login");
          });
        })
        .catch(() => {});
    },

    // 页面跳转仨个
    tonick() {
      this.$router.push("nickname");
    },
    torepass() {
      this.$router.push("repass");
      // console.log(1);
    },
    tocol() {
      this.$router.push("/collect/colList");
    }
  }
};
</script>

<style scoped>
.ct_body {
  width: 90%;
  position: absolute;
  top: 50px;
  bottom: 60px;
  padding: 5%;
}
.avatar {
  display: flex;
  justify-content: space-around;
}
.avatar img {
  width: 80px;
  height: 80px;
  box-shadow: 3px 3px 7px #666;
}
.avatar div {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.ct_body li {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}
.ct_body li:last-child {
  border: none;
}

.cropAvatar {
  width: 80%;
  height: 450px;
  border: 1px solid #ccc;
  background-color: #fff;
  position: absolute;
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
