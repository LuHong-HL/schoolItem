<template>
  <div class="header">
    <a-button icon="user-add" type="primary" @click="userAdd">添加成员</a-button>
    <a-button icon="download" type="primary">导出模板</a-button>
    <!-- 导入功能 -->
    <a-upload
      name="file"
      :multiple="true"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      @change="handleChange"
      :showUploadList="false"
    >
      <a-button icon="upload" type="primary">导入成员</a-button>
    </a-upload>
    <!-- 信息搜索 -->
    <a-input-search placeholder="请您输入搜索信息" style="width: 20%" @search="onSearch" class="float" v-model="searchValue"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchValue:'',
    };
  },
  methods: {
    //信息搜索
    onSearch(value) {
      console.log("sonvalue",this.searchValue);
      // this.searchValue=value;
      this.$emit("transferSearchValue",this.searchValue);
      // this.getUserData();

    },
    //文件上传时 状态的输出
    handleChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          this.$message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} file upload failed.`);
        }
      },
    userAdd(){
      console.log("灵儿");
      //传递的参数用{{ $route.query.goodsId }}获取
      this.$router.push({path:'userAdd'});
    },
    //请求社团机构成员的数据
    getUserData() {
      // let pageInformation = {
      //   username: this.username,
      //   password: this.password
      // };
      this.axios
        .get("/user/organization", { params:{page:1, limit:10,input:this.searchValue} })
        .then(result => {
            console.log("result:",result);
            this.userData = result.data.data;
            this.total = result.data.data.length;
            
        });
    }
  },
};

</script>
<style scoped>
.header {
  padding: 20px;
  background-color: #f9f0d9;
}

.float {
  float: right;
}
.ant-btn-primary {
  color: #fff;
  background-color: #a3d0c3;
  border-color: #a3d0c3;
}
</style>
