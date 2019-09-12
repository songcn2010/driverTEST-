<template>
    <div class="home_content">
        <wv-group title="请选择考题类型">
            <wv-cell title="选择科目" is-link :value="subject.name" @click.native="subPickerShow = true" />
            <wv-cell title="驾驶车型" is-link :value="drive.type" @click.native="drivePickerShow = true" />
        </wv-group>
        <!-- 科目的菜单 -->
        <wv-picker @confirm='selSub' :visible.sync="subPickerShow" :columns="subColumns" value-key="name" />
        <!-- 车型菜单 -->
        <wv-picker @confirm='selDri' :visible.sync="drivePickerShow" :columns="driveColumns" value-key="type" />

        <!-- 题目顺序 -->
        <wv-radio title="选择出题方式" v-model="selPlan" :options="plans"></wv-radio>
        
        <!-- 答题个数 -->
        <wv-number-spinner  :min="1" :max="100" v-model="num"></wv-number-spinner>
        

        <wv-button type="primary" @touchend.native="startTest">开始答题</wv-button>

    </div>
</template>

<script>
export default {
  data() {
    return {
      //点击是否展示
      subPickerShow: false,
      //   当前选中的科目
      subject: {
        name: "科目一",
        value: 1
      },
      //   这是表示展开的菜单，里面有多少列，数组中就由多少个对象，键都是用values
      subColumns: [
        {
          values: [
            {
              name: "科目一",
              value: 1
            },
            {
              name: "科目四",
              value: 4
            }
          ]
        }
      ],

      //   车型选择
      drivePickerShow: false,
      drive: { type: "c1" },
      driveColumns: [
        {
          values: [
            {
              type: "c1"
            },
            {
              type: "c2"
            },
            {
              type: "a1"
            },
            {
              type: "a2"
            },
            {
              type: "b1"
            },
            {
              type: "b2"
            }
          ]
        }
      ],

      //   考试类型
      selPlan: "rand",
      plans: [
        {
          label: '随机测试',
          value: 'rand'
        },
        {
          label: '顺序测试',
          value: 'order'
        }
      ],

    //   题目数量
    num: 100
    };
  },
  methods: {
    selSub(picker, value) {
      //   console.log(picker.getValues());
      this.subject = picker.getValues()[0];
    },
    selDri(picker, value) {
      //   console.log(picker.getValues());
      this.drive = picker.getValues()[0];
    },


    

    startTest(){
      // 把答题需要的参数通过地址栏传过去
      this.$router.push(`test?type=${this.subject.value}&car=${this.drive.type}&plan=${this.selPlan}&num=${this.num}`)
    }
  }
};
</script>

<style scoped>
.home_content {
  width: 80%;
  position: absolute;
  top: 50px;
  bottom: 60px;
  padding: 0 10%;
}
button.weui-btn, input.weui-btn {
    margin-top: 20px;
}

.wv-number-spinner {
    margin-top: 20px;
}
</style>
