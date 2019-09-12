<template>
  <div class="colTest_body">
    <wv-header title="复　　习" background-color="#f7f7f6"></wv-header>
    <wv-icon @touchend.native="backHome" class="cancelbtn" type='cancel'></wv-icon>

    <div class="colTest_info">
      <p>
        <span>问题:</span>{{ testInfo.question }}</p>
      <img :src="testInfo.url" v-if='testInfo.url'>

      <div class="aswBox">
        <span v-if='testInfo.item1'>请选择正确答案</span>
        <div>
          <label @touchend="choose" v-if='testInfo.item1'><input name='answer' type='radio' value='1'>{{ testInfo.item1 }}</label>
          <label @touchend="choose" v-if='testInfo.item2'><input name='answer' type='radio' value='2'>{{ testInfo.item2 }}</label>
          <label @touchend="choose" v-if='testInfo.item3'><input name='answer' type='radio' value='3'>{{ testInfo.item3 }}</label>
          <label @touchend="choose" v-if='testInfo.item4'><input name='answer' type='radio' value='4'>{{ testInfo.item4 }}</label>
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

      testInfo: []
    };
  },

  mounted() {
    // 获取从列表页传来的题目数据
    this.testInfo = this.$route.query;
  },

  methods: {
    //点击退出
    backHome() {
      this.$router.back();
    },

    choose(e) {
      let sel = e.target.value || e.target.children[0].value;
      this.value = sel;
    },

    //查看答案
    showAnswer() {
      if (!this.testInfo.item1) {
        // 数据库没有给选项
        this.value = "";
        this.$router.push("colList");
      }
      if (!this.value) {
        Toast.text({
          duration: 1000,
          message: "请作答"
        });
        return;
      }
      var msg;
      if (this.value == this.testInfo.answer) {
        // 回答正确
        msg = "恭喜您回答正确";
      } else {
        // 回答错误
        msg = "很遗憾回答错误";
      }

      Dialog.confirm({
        title: msg,
        message: this.testInfo.explains,
        skin: "ios",
        showCancelButton: false,
        confirmButtonText: "确认",
        cancelButtonText: "下一题"
      }).then(() => {
        this.value = "";
        this.$router.push("colList");
      });
    }
  }
};
</script>

<style scoped>
.colTest_body {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 888;
}
.colTest_info {
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
.colTest_info span {
  font-size: 24px;
  margin-right: 10px;
}
.colTest_info img {
  width: 100px;
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
