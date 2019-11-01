<template>
  <div class="content">
    <div class="innerBox">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="请输入旧密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['loginPwdOld', { rules: [{ required: true, message: '请输入旧密码！' }] }]"
          />
        </a-form-item>
        <a-form-item label="请输入新密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['loginPwdNew', { rules: [{ required: true, message: '请输入新密码！' }] }]"
          />
        </a-form-item>
        <a-form-item label="再次输入新密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['loginPwd', { rules: [{ required: true, message: '请再次输入新密码！' }] }]"
          />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">确认修改</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  methods: {
    // 表单确认回调
    handleSubmit(event) {
      event.preventDefault();
      this.form.validateFields((err, values) => {
        let user = JSON.parse(sessionStorage.getItem('myUser') || '[]');
        console.log("user",user)
        console.log("Received values of form: ", values);
        if (!err&&user.password===values.loginPwdOld) {
            if(values.loginPwdNew===values.loginPwd){
                //调用修改密码的接口方法
                
                this.changePassword(values.loginPwd);

            }else{
                this.$message.error("新密码不一致")
            }
        }else{
            this.$message.error("旧密码错误！");
        }
      });
    },
    //修改密码
  
    changePassword(loginPwd){
        let data={loginPwd:loginPwd};
        console.log("data :",data)
        this.axios({
            method:'put',
            url:'/organization',
            data:data,
        }).then(result=>{
            console.log("changePasswordData:",result)
            this.$message.success("密码修改成功！")
            let myUser=JSON.parse(sessionStorage.getItem('myUser'));
            console.log("temporaryPassword",myUser)
            myUser.password=loginPwd;
            sessionStorage.setItem('myUser',JSON.stringify(myUser))
        })
    }
  }
};
</script>

<style  scoped>
.innerBox{
    /* background-color: #e6f7ff; */
    margin: 30px 20px 30px 20px;
}
</style>