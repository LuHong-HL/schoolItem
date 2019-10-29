<template>
  <!-- 根div的class为content确保内容在右边区域出现 -->
  <div class="content">
    <div class="inner">
      <UserHeader @transferSearchValue="getSearchValue"></UserHeader>
      <UserTable :sonSearchValue="fatherSearchValue"></UserTable>
    </div>
  </div>
</template>
<script>
// 局部导入组件
import UserHeader from "./components/UserHeader.vue";
import UserTable from "./components/UserTable.vue";
// const userData = [];

export default {
  // created() {
  //   this.getUserData();
  //   //  console.log(this.userData);
  // },
  data() {
    return {
      // userData: []
      fatherSearchValue:'',
    };
  },
  components: {
    UserTable,
    UserHeader
  },
  methods: {
    // 获取子组件传过来的数据
    getSearchValue(searchValue){
        this.fatherSearchValue=searchValue;
    },
    //将数据传给子组件



    // 获取人员信息
    // getUserData() {
    //   // let pageInformation = {
    //   //   username: this.username,
    //   //   password: this.password
    //   // };
    //   this.axios
    //     .get("/user/organization", this.$qs.stringify({ page: 1, limit: 10 }))
    //     .then(result => {
    //         console.log("result:",result);
    //         this.userData = result.data.data;
    //     });
    // }
  }
};
</script>
<style scoped>
/* 导入第三方样式或者你写的样式，切记不要在main.js引入，因为可能污染其它组件的样式 */
/* @import '../../assets/styles/css/yourcss.css'; */
.content {
  height: 93vh;
}
.inner {
  margin: 30px 20px 30px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.inner >>> .ant-table-pagination.ant-pagination {
  margin: 16px 20px;
}
</style>
