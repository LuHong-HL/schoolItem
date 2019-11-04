<template>
  <div class="header">
    <a-button icon="user-add" type="primary" @click="userAdd">添加成员</a-button>
    <a :href="$baseURL+'/excel/organization/user'"><a-button icon="download" type="primary">导出模板</a-button></a>
    <!-- 导入功能 -->
    <a-upload
      name="file"
      :beforeUpload="beforeUpload" 
      :multiple="true"
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
      flag:false,
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
// 更换图片
    beforeUpload(file) {
      // 创建一个新的 FormData 对象。
      let param = new FormData();
      // 向 FormData 中添加新的属性值，FormData 对应的属性值存在也不会覆盖原值，而是新增一个值，如果属性不存在则新增一项属性值。
      param.append("file", file);
      // param.append("type", this.type);
      // 送出时的编码类型被设为 "multipart/form-data"，FormData()它会使用和表单一样的格式。
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // 请求数据
      this.axios.post("/excel/organization/user", param, config).then(result => {
        console.log("userFileUpload:",result);
        if(result.data.code==0){
          this.$message.success("数据导入成功！");
          // this.getUserData();
          this.flag=!this.flag;
          this.$emit("getFlag",this.flag);
        }else if(result.data.code==1){
          let data=result.data.data;
          for(var i=0;i<data.length;i++){
            this.$message.error( data[i])
          }
         
        }
      });
     return false;
    },


    //文件上传时 状态的输出
    // handleChange(info) {
    //     if (info.file.status !== 'uploading') {
    //       console.log(info.file, info.fileList);
    //     }
    //     if (info.file.status === 'done') {
    //       this.$message.success(`${info.file.name} file uploaded successfully`);
    //     } else if (info.file.status === 'error') {
    //       this.$message.error(`${info.file.name} file upload failed.`);
    //     }
    //   },
    userAdd(){
      console.log("灵儿");
      //传递的参数用{{ $route.query.goodsId }}获取
      this.$router.push({path:'userAdd'});
    },
    //请求社团机构成员的数据
    // getUserData() {
    //   // let pageInformation = {
    //   //   username: this.username,
    //   //   password: this.password
    //   // };
    //   this.axios
    //     .get("/user/organization", { params:{page:1, limit:10,input:this.searchValue} })
    //     .then(result => {
    //         console.log("result:",result);
    //         this.userData = result.data.data;
    //         this.total = result.data.data.length;
            
    //     });
    // }
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
