<template>
  <div class="clist_body">
    <!-- header定位的两个按钮 -->
    <wv-button @touchend.native="onControl" style="position:absolute;top:10px;left:10px;z-index:999" type='info' mini>操作</wv-button>
    <wv-button @touchend.native='offControl' v-if="control" style="position:absolute;top:-5px;right:10px;z-index:999" type='info' mini>取消</wv-button>
    <wv-button @touchend.native='reload' v-if="!control" style="position:absolute;top:-5px;right:10px;z-index:999" type='info' mini>刷新</wv-button>

    <div v-if='colList.length === 0' class="clist_content">您还没有收藏任何考题。</div>
    <div v-else class="clist_content">
      <div class="title">
        <span>已收藏的题目</span>
        <wv-button @touchend.native="cancelCols" v-if="control" type='info' mini>删除</wv-button>
      </div>
      <div>
        <ul>
          <li v-for="(item,index) in colList" :key="index">
            <input type="checkbox" v-if="control" ref='chk' :id="item.id">
            <div @touchend="handleToTest(item)">
              <img :src="item.url" :style="item.url?'visibility:visible':'visibility:hidden'">
              <p :class="control&&!item.url ?'question':''">{{ item.question }}</p>
              <p>》</p>
            </div>
          </li>

          <li></li>
          <!-- <wv-loadmore type="line" text="loading· · ·" v-if="loadmore"></wv-loadmore> -->
          <!-- <wv-loadmore type="line" text="没有更多收藏" v-if='loadmore'></wv-loadmore> -->
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loadmore: true,
      control: false,

      colList: [],
      collections: "",

      // 选中删除后剩下的
      cancelCol: ""
    };
  },

  mounted() {
    this.getnow();
    this.collections = window.localStorage.getItem("collection");
    if (this.collections) {
      this.getColList();
    }
  },

  activated() {
    this.getnow();
    this.collections = window.localStorage.getItem("collection");
    this.getColList();
  },

  methods: {
    reload() {
      this.$router.go(0);
    },
    async getnow() {
      let that = this;
      let res = await this.axios.get("/api/users/getnow");
      if (res.data.data.username == window.localStorage.getItem("username")) {
        window.localStorage.setItem("collection", res.data.data.collection);
      }
    },
    // 获取删除后剩下的id字符串
    cancelCols() {
      // console.log(1)

      let arrcol = this.collections.split(',')
      this.$refs.chk.forEach(e => {
        if(e.checked){
          let idx = arrcol.findIndex(item => item == e.id);
          arrcol.splice(idx,1)
        }
      })

     this.collections = arrcol.join(',')
      this.tip();
    },

    onControl() {
      this.control = true;
    },
    offControl() {
      this.control = false;
      this.cancelCol = "";
    },

    // 取消收藏请求
    async tip() {
      let username = window.localStorage.getItem("username");
      let res = await this.axios.get(
        `/api/users/cancelcol?username=${username}&collection=${this.collections}`
      );
      console.log(res);
      if (res.data.meta.status == 200) {
        window.localStorage.setItem("collection", this.collections);
        this.control = false;
        this.getnow();
        this.collections = window.localStorage.getItem("collection");
        this.getColList();
      }
    },

    // 获取当前页的收藏列表
    async getColList() {
      let collection = this.collections;
      let res = await this.axios.get(
        `/api/users/colList?collection=${collection}`
      );
      console.log(res.data)
      let { meta, data } = res.data;
      if (meta.status === 200) {
        this.collections = res.data.collection;
        this.colList = data;        
      }
    },

    // 答题
    handleToTest(item) {
      // 通过地址栏吧题目参数传过去
      this.$router.push({
        path: "colTest",
        query: item
      });
    }
  }
};
</script>

<style scoped>
.clist_body {
  height: 100%;
  position: relative;
}
.clist_content {
  overflow-y: auto;
  width: 90%;
  position: absolute;
  top: 50px;
  bottom: 60px;
  padding: 5%;
}

.clist_content .title {
  position: relative;
}
.clist_content .title button {
  position: absolute;
  right: 0;
  top: -5px;
}
.clist_content li {
  height: 80px;
  border-top: 1px solid #ccc;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.clist_content li div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.clist_content li img {
  width: 60px;
  height: 60px;
}
.clist_content li p:first-of-type {
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.clist_content li input {
  margin-right: 20px;
  width: 20px;
  height: 20px;
}
</style>
