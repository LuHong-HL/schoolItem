<template>
  <div class="header">
    <div class="info">
      <!-- <p class="name"><span>name</span> | <a>注销</a></p> -->
      <!-- 下拉菜单功能 -->
      <a-dropdown >
        <span class="ant-dropdown-link name" href="#">
          name
          <a-icon type="down" />
        </span>
        <a-menu slot="overlay">
          <a-menu-item key="0">
            <a href="#" @click.prevent="modifyInformation">信息修改</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a href="#" @click.prevent="changePassword">修改密码</a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3" @click="logout">注销</a-menu-item>
        </a-menu>
      </a-dropdown>
      <!-- 信息 提醒 功能 -->
     
      <ul>
        <li>
           <a-avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Liu_Yifei_at_the_2016_BAZAAR_Stars%E2%80%99_Charity_Night.jpg/419px-Liu_Yifei_at_the_2016_BAZAAR_Stars%E2%80%99_Charity_Night.jpg" />
        </li>
        <!-- <li>
          <a-badge dot>
            <span class="iconfont" title="公告">&#xe600;</span>
          </a-badge>
        </li>
        <li>
          <a-badge :count="2">
            <span class="iconfont" title="消息">&#xe617;</span>
          </a-badge>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  components: {
    
  },
  methods: {
    //修改密码页面跳转
    changePassword(){
      console.log("修改密码页面跳转");
      this.$router.push({path:'changePassword'});
    },
    //修改信息页面跳转
    modifyInformation(){
        this.$router.push({path:'modifyInformation'});
    },
    //注销账户
    logout(){
      this.axios.delete('/logout').then(
        res=>{
          console.log(res);
          if(res.data.code==0){
            // 注销成功
            let user = JSON.parse(sessionStorage.getItem('myUser')|| '[]');
            user.password = '';
            sessionStorage.setItem('myUser',JSON.stringify(user));
            this.$router.push('/');
          }
        }
      )
    }
  }
};
</script>

<style scoped>
.header {
  width: 85%;
  height: 59px;
  background: #fff;
  position: fixed;
  right: 0;
  top: 0;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.06);
}

.info ul li {
  float: right;
  width: 5%;
  height: 50px;
  line-height: 50px;
}

.name {
  float: right;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  margin-right: 10%;
  cursor: pointer;
}

.name span {
  margin-right: 5px;
}

.name a {
  margin-left: 5px;
}

.iconfont {
  font-size: 20px;
  color: #888;
}

.iconfont:hover {
  cursor: pointer;
  color: rgb(29, 33, 37);
}
.info ul li[data-v-5558831a] {
    float: right;
    width: 40px;
    height: 50px;
    line-height: 50px;
}
/* 设置图片大小 */
.ant-avatar >>> img {
    width: 100%;
    height: auto;
    display: block;
}
</style>
