<template>
  <div class="header">
    <a-input-search placeholder="请您输入需要添加的成员信息" @search="onSearch" class="input" v-model="value"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value:'',
    }
  },
  methods: {
    // 搜素信息回调
    onSearch(value) {
      console.log("sonValue1",this.value);
      // this.value=value;
      // 向父组件传递value的值
      this.$emit('getSearchValue',this.value);
    },
  },
};

</script>
<style scoped>
.input {
  width: 20%;
  float: right;
  /*margin: 20px auto;*/
}

.header {
  padding: 20px;
  background-color: #f9f0d9;
  overflow: hidden;
}

</style>
