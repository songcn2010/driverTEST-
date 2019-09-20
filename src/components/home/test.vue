<template>
  <div class="test_body">
    <wv-header title="测　　试" background-color="#f7f7f6"></wv-header>
    <wv-icon @touchend.native="backHome" class="cancelbtn" type='cancel'></wv-icon>

    <div class="test_info">
      <p>
        <span>问题:</span>{{ testList[index].question }}</p>
      <img :src="testList[index].url" v-if="testList[index].url">

      <div class="aswBox">
        <span v-if='testList[index].item1'>请选择正确答案</span>
        <div>
          <label @touchend="choose" v-if='testList[index].item1'><input name='answer' type='radio' value='1'>{{ testList[index].item1 }}</label>
          <label @touchend="choose" v-if='testList[index].item2'><input name='answer' type='radio' value='2'>{{ testList[index].item2 }}</label>
          <label @touchend="choose" v-if='testList[index].item3'><input name='answer' type='radio' value='3'>{{ testList[index].item3 }}</label>
          <label @touchend="choose" v-if='testList[index].item4'><input name='answer' type='radio' value='4'>{{ testList[index].item4 }}</label>
        </div>
      </div>

      <wv-button @touchend.native="showAnswer" type='primary'>确定</wv-button>
    </div>

  </div>
</template>

<script>
import { Dialog, Toast } from "we-vue";
export default {
  data() {
    return {
      // 答案
      value: "",
      // 选中的答案
      selasw: "",

      // 当前题目的小标
      index: 0,
      // 题目列表
      testList: []
    };
  },
  mounted() {
    // console.log(this.$route.query);
    this.getTestList();
  },
  methods: {
    // 获取题目数据
    async getTestList() {
      let res = await this.axios.post("/api/subject", this.$route.query);
      // console.log(res.data.data);
      // 把当前科目类型保存起来，方便收藏
      this.nowType = this.$route.query.type;
      this.testList = res.data.data;
    },

    choose(e) {
      let sel = e.target.value || e.target.children[0].value;
      this.value = sel;
    },

    //点击退出
    backHome() {
      Dialog.confirm({
        title: "提示",
        message: "您是否要退出答题?",
        showCancelButton: true
      })
        .then(() => {
          this.$router.push("/home");
        })
        .catch(() => {});
    },

    // 收藏
    async addCol() {
      let res = await this.axios.post("/api/users/collect", {
        username: window.localStorage.getItem("username"),
        collection: this.testList[this.index].id
      });
      // console.log(res);
      if(res.data.meta.status === 200){
        Toast.success({
          duration: 1000,
          message: res.data.meta.msg
        })
      }
    },

    //查看答案
    showAnswer() {
      if (!this.testList[this.index].item1) {
        // 数据库没有给选项
        // 直接到下一题
        this.index++;
        // 重置单选框状态
        let arr = document.getElementsByTagName("input");
        arr = Array.from(arr);
        arr.forEach(e => {
          e.checked = false;
        });
        this.value = "";
      }
      if (!this.value) {
        Toast.text({
          duration: 1000,
          message: "请作答"
        });
        return;
      }
      var msg;
      if (this.value == this.testList[this.index].answer) {
        // 回答正确
        msg = "恭喜您回答正确";
      } else {
        // 回答错误
        msg = "很遗憾回答错误";
      }

      Dialog.confirm({
        title: msg,
        message: this.testList[this.index].explains,
        skin: "ios",
        showCancelButton: true,
        confirmButtonText: "收藏",
        cancelButtonText: "下一题"
      })
        .then(() => {
          let token = window.localStorage.getItem("token");
          if (!token) {
            Toast.text({
              duration: 1000,
              message: "该功能需登录"
            });
          } else {
            // 发送收藏请求
            this.addCol();
            // 提示都在请求中
          }
          // 然后同样要切换到下一题
          this.index++;
          // 重置单选框状态
          let arr = document.getElementsByTagName("input");
          arr = Array.from(arr);
          arr.forEach(e => {
            e.checked = false;
          });
          this.value = "";
        })
        .catch(() => {
          // 这里面切换题目到下一题,通过绑定的数据
          this.index++;
          // 重置单选框状态
          let arr = document.getElementsByTagName("input");
          arr = Array.from(arr);
          arr.forEach(e => {
            e.checked = false;
          });
          this.value = "";
        });
    }
  }
};
</script>

<style scoped>
.test_body {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 888;
}
.test_info {
  width: 90%;
  position: absolute;
  top: 50px;
  bottom: 10px;
  padding: 10px 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.test_info span {
  font-size: 24px;
  margin-right: 10px;
}
.test_info img {
  height: 100px;
}
.cancelbtn {
  position: absolute;
  right: 24px;
  top: 14px;
  z-index: 999;
  color: #fff;
  font-weight: 700;
  text-shadow: 2px 2px 2px #666;
}
.aswBox > div {
  display: flex;
  flex-direction: column;
}
.aswBox label {
  padding: 10px;
  background-color: #fff;
}
.aswBox label input {
  width: 20px;
  height: 20px;
  position: relative;
  top: 4px;
  margin-right: 15px;
}
.aswBox label.active {
  background-color: #ccc;
}
</style>
