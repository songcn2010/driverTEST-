<template>
  <div class="nickname_body">
    <wv-group title='修改昵称'>
      <wv-input v-model="nickname" label="新昵称" placeholder="请输入新昵称" required></wv-input>
    </wv-group>
    <div class="btns">
      <wv-button @touchend.native="tocenter">取　　消</wv-button>
      <wv-button @touchend.native="selnick" type='primary'>修　　改</wv-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "we-vue";
export default {
  data() {
    return {
      nickname: ""
    };
  },
  methods: {
    tocenter() {
      this.$router.push("center");
    },

    // 修改昵称
    selnick() {
      if (!this.nickname) {
        Toast.fail({
          duration: 1000,
          message: "请输入新昵称"
        });
        return;
      }
      this.axios
        .post("/api/users/nickname", {
          username: window.localStorage.getItem("username"),
          nickname: this.nickname
        })
        .then(res => {
          // console.log(res);
          if (res.data.meta.status === 200) {
            Toast.success({
              duration: 1000,
              message: "修改成功"
            });
            setTimeout(() => {
              this.$router.push("center");
            }, 1000);
          }
        });
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
