<template>
  <div class="header">
    <a-button icon="user-add" type="primary" @click="showModal">添加成员</a-button>
    <div class="modalClass">
      <a-modal title="请填写需要添加的子组织信息" v-model="visible"  width="85%" :footer="null">
        <div class="innerBox">
          <div class="text">
            <p>名称：</p>
            <a-input v-model="name" class="mySize" />
            <!-- <br /> -->
            <p>所归属学院(无则空)：</p>
            <a-input v-model="collage" class="mySize" />
            <!-- <br /> -->
            <p>登录账号：</p>
            <a-input v-model="loginName" class="mySize" />
            <br />
            <p>登录密码：</p>
            <a-input v-model="loginPwd" class="mySize" />
            <br />
            <span style="float:left">组织介绍：</span>
            <a-textarea
              placeholder="本组织介绍"
              :autosize="{ minRows: 6, maxRows: 15 }"
              v-model="intro"
            />
            <a-button type="primary" class="button" @click="createOrganization">确认创建</a-button>
            <div class="imageBox">
              <a-upload :beforeUpload="beforeUpload" :showUploadList="false" class="imageButton">
                <a-button>
                  <a-icon type="upload" />上传图标
                </a-button>
              </a-upload>
              <p>图标</p>
              <img :src="$baseURL+logoLink" alt class="image" v-if="logoLink"/>
            </div>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    // this.getOrganizationData();
  },
  data() {
    return {
      visible: false, //模态框是否可见
      name: "", //名称
      intro: "", //介绍
      collage: "", //学院
      logoLink: "", //图标地址
      type: 1, //文件上传类型 图片
      loginName: "", //组织登录账号
      loginPwd: "" ,// 组织登录密码
      flag:false, //其他组件获取数据的标志
    };
  },
  methods: {
    // 弹出添加直属组织的模态框
    showModal() {
      this.visible = true;
    },
    //创建子组织
    createOrganization(){
        let data={
            name:this.name,
            collage:this.collage,
            intro:this.intro,
            loginName:this.loginName,
            loginPwd:this.loginPwd,
            logoLink:this.logoLink,
            // organizationData:null,
        };
        this.axios({
            method:'post',
            url:'/organization',
            data:data,
        }).then(result=>{
            console.log("createOrganization:",result)
            if(result.data.code==0){
                 this.$message.success("创建子组织成功！")
                 this.$emit('postFlag',!this.flag);
            }
            if(result.data.code==1){
                this.$message.error("创建子组织失败！")
            }
           
        });
    },
    //获取组织下全部直属组织的信息
    // getOrganizationData() {
      
    //   this.axios.get("/organization/list/"+this.fathId).then(result => {
    //     console.log("organizationData:", result);

    //     this.organizationData = result.data.data;
    //   });
    // },
    // 更换图片
    beforeUpload(file) {
      //   // 创建一个新的 FormData 对象。
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
            this.logoLink=result.data.data; //先保存到服务器
            
          }
        });
       return false;
    },
  }
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
/* 模态框内容样式 */
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
  border: 1px solid #ccc;
  margin-top: 10px;
}
.button {
  margin-top: 15px;
}
.imageButton {
  position: absolute;
  top: 0;
  right: 0;
}
/* 修改模态框标题样式 */
/* .modalClass >>>.ant-modal-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
} */
</style>
