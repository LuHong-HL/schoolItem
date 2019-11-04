<template>
  <div class="content">
    <div class="innerBox">
      <div class="text">
        <p>名称：</p>
        <a-input v-model="name" class="mySize" label="帅" />
        <br />
        <p v-if="collage">学院：</p>
        <a-input v-model="collage" class="mySize" v-if="collage" />
        <span style="float:left">介绍：</span>
        <a-textarea placeholder="本组织介绍" :autosize="{ minRows: 6, maxRows: 15 }" v-model="intro" />
        <a-button type="primary" class="button" @click="changeInformation">确认修改</a-button>
        <div class="imageBox">
          <a-upload :beforeUpload="beforeUpload" :showUploadList="false" class="imageButton" >
            <a-button>
              <a-icon type="upload" />更换
            </a-button>
          </a-upload>
          <p v-if="logoLink">图片</p>
          <img :src="$baseURL+logoLink" alt class="image" v-if="logoLink" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getOrganizationData();
  },
  data() {
    return {
      name: "",//名称
      intro: "", //介绍
      collage: "",//学院
      logoLink: "",//图标地址
      type:1, //文件上传类型 图片
    };
  },
  methods: {
    // 获取组织信息
    getOrganizationData() {
      this.axios({
        method: "get",
        url: "organization/0"
      }).then(result => {
        console.log("organizationData:", result);
        let data = result.data.data;
        this.name = data.name;
        this.collage = data.collage;
        this.intro = data.intro;
        this.logoLink = data.logoLink;
      });
    },
    // 更换图片
    beforeUpload(file) {
      // 创建一个新的 FormData 对象。
      let param = new FormData();
      // 向 FormData 中添加新的属性值，FormData 对应的属性值存在也不会覆盖原值，而是新增一个值，如果属性不存在则新增一项属性值。
      param.append("file", file);
      param.append("type", this.type);
      // 送出时的编码类型被设为 "multipart/form-data"，FormData()它会使用和表单一样的格式。
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // 请求数据
      this.axios.post("/file", param, config).then(result => {
        console.log("fileUpload:",result);
        // this.logoLink=result.data
        if(result.data.code==0){
          // this.logoLink=result.data.data; //先保存到服务器
          let data=result.data.data;
          //组织图片信息上传
          this.axios({
              method:'put',
              url:"/organization",
              data:{logoLink:data},
          }).then(result=>{
            // 图片上传成功
              if(result.data.code==0){
                  this.logoLink=data;
                  this.$message.success("图片修改成功！");
              }
          })
        }
      });
     return false;
    },

    //更改信息
    changeInformation() {
      // 直接调用修改即可
      this.axios({
          method:"put",
          url:"/organization",
          data:{intro:this.intro,name:this.name,collage:this.collage},
      }).then(result=>{
          console.log("changeInformation:",result)
          this.$message.success("修改信息成功！");
      });
    }
  }
};
</script>
<style scoped>
.mySize {
  width: 500px;
  margin: 0 8px 8px 0;
}
.text {
  width: 500px;
  margin: 0 auto;
  position: relative;
  left: -100px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.8;
}
.innerBox {
  margin: 100px;
}
/* 图片外层盒子 */
.imageBox {
  width: 200px;
  position: absolute;
  top: 0;
  right: -230px;
}
.image {
  width: 100%;
  height: auto;
  padding: 10px;
  margin-top: 10px;
  background-color:#fff;
  border: 1px solid #ccc;
}
.button {
  margin-top: 15px;
}
.imageButton {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
