<template>
<div class="content">
<div class="mavon-editor">
    <div class="mavon-header">
      <p>
        <label for="organization">机构社团：</label>
        <a-input placeholder="名称" style="margin-left: 12px;" id="organization" v-model="orgName" :disabled="false"/>
        <label for="title">活动标题：</label>
        <a-input placeholder="标题" id="title" v-model="title" />
      </p>
      <p style="margin-top: 20px;">
        <label for="type">参与者类型：</label>
        <a-cascader :options="options" @change="selectChange" changeOnSelect v-model="fullRole" placeholder="请选择"
          style="width: 400px;margin-right: 20px;" />
        <label for="num">参与人数：</label>
        <a-input placeholder="参与人数" id="num" v-model="num" />
      </p>

      <p style="margin-top:20px">
        <label for="startTime">开始时间：</label>
        <a-date-picker showTime placeholder="开始时间" style="margin-left: 12px;margin-right:20px;width: 400px;"
          id="startTime" format="YYYY-MM-DD HH:mm" @change="startTimeChange" v-model="startTime"/>
        <label for="endTime">结束时间：</label>
        <a-date-picker showTime placeholder="结束时间"  style="width: 400px;" id="endTime" 
          format="YYYY-MM-DD HH:mm" @change="endTimeChange" v-model="endTime"/>
      </p>
      <p style="margin-top:20px" v-for="(item,index) in people" :key="item">
        <label for="person">活动负责人：</label>
        <a-input placeholder="活动负责人" id="person" v-model="leaderList[index].userName" />
        <label for="phone">联系方式：</label>
        <a-input placeholder="手机号码" id="phone" v-model="leaderList[index].phone" />
        <a-button type="danger" @click="delPeople(index)" v-if="item !== people ">删除</a-button>

        <a-button type="primary" @click="addPeople" v-if="item == people " ghost>添加</a-button>
      </p>
      <p style="margin-top: 20px;">
        <label for="ativity" style="float: left;">活动海报：</label>
        <a-upload listType="picture-card" :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload"
          :multiple="true" id="ativity">
          <div v-if="fileList.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <div style="clear: both;"></div>
      </p>
    </div>
    <div class="mavon-btn">
      <a-button type="primary" ghost @click="saveActivity" >
        保存至草稿箱
      </a-button>
      <a-button type="primary" ghost @click="getActivity" style="margin-left: 10px;" >
        草稿箱
      </a-button>
      <a-button type="primary" ghost @click="postActivity" style="margin-left: 10px;"
        v-if="status == 2">
        发布
      </a-button>
      <a-button type="primary" ghost @click="modifyActivity" style="margin-left: 10px;" v-if="status == 1">
        修改
      </a-button>
    </div>
    <a-drawer title="草稿箱" placement="right" :closable="false" @close="drawerClose" :visible="drawerVisible"
      class="my-drawer">
      <ul>
        <li v-for="item in draftList" :key="item.articleId" @click="changeActivity(item.id)">
          <span>{{item.title}}</span></li>
      </ul>
      <div v-if="!draftList.length">暂无草稿</div>
    </a-drawer>
    <mavon-editor v-model="description" :ishljs="true" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"
      @change="getRenderVal">
    </mavon-editor>
  </div>
</div>

</template>
<script>
  import {
    mavonEditor
  } from 'mavon-editor'
  import marked from 'marked'
  import highlightJs from 'highlight.js'
  import 'mavon-editor/dist/css/index.css'
  marked.setOptions({
    highlight: (code) => highlightJs.highlightAuto(code).value
  })
import moment from "moment";
  export default {
    components: {
      mavonEditor,
    },
    created() {
      this.getActivityById()
      this.getOrganization();
      this.getfullName(1);
    },
    // beforeDestroy() {
    //   if (!this.isPost) { //关闭网页如果还没发布，则保存到草稿箱
    //     this.saveArticle();
    //   }
    // },
    data() {
      return {
        id: '',
        orgName: '',
        title: '',
        description: '',
        renderVal: '',
        fullRole: [],
        fullName:'',
        fileList: [],
        endTime: {},
        leaderList: [{
          userName: '',
          phone: ''
        }],
        num: '',
        pictures: '',
        startTime: {},
        status: 2,
        people: 1,
        type: 6,
        imgList: [],
        options: [],
        drawerVisible: false,
        page: 1,
        pageSize: 100,
        draftList: [],
        moment,
      }
    },
    methods: {
      startTimeChange(value){
        this.startTime  = value;
      },
      endTimeChange(value){
        this.endTime = value;
      },
      getOrganization() {
        this.axios.get('/organization/0').then(res => {
          this.orgName = res.data.data.name;
        })
      },
      addPeople() {
        let item = {
          userName: '',
          phone: ''
        }
        this.leaderList.push(item);
        this.people++;
      },
      delPeople(index) {
        this.leaderList.splice(index, 1);
        this.people--;
      },

      selectChange(value,selectedOptions) {
        this.fullRole = value;
        this.fullName = selectedOptions[0].label;
        console.log(selectedOptions);
      },
      beforeUpload(file) {
        let param = new FormData();
        param.append("file", file);
        param.append('type', this.type)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.axios.post('/file', param, config).then(res => {
          let data = res.data;
          if (data.code == 0) {
            let item = {
              uid: data.data,
              status: 'done',
              url: this.$baseURL + data.data
            }
            this.pictures = data.data;
            this.fileList.push(item);
          }
        })
        return false;
      },
      handleRemove() {
        this.fileList.splice(0, 1);
        this.pictures = '';
      },
      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('file', $file);
        formdata.append('type', this.type)
        this.axios.post('/file', formdata).then(res => {
          let data = res.data.data.replace(/\\/g, "/");
          if (res.data.code == 0) {
            this.$refs.md.$img2Url(pos, this.$baseURL + data);
            this.imgList.push(data);
          }
        })
      },
      $imgDel([url, file]) {
        for (let i = 0; i < this.imgList.length; i++) {
          if (this.$baseURL + this.imgList[i] == url) {
            this.delArticleImg(this.imgList[i].replace(/\//g, "\\"))
            break;
          }
        }

      },
      delArticleImg(url) {
        this.axios.delete('/file' + url).then(res => {
          if (res.data.code != 0) {
            this.$message.error('图片删除失败');
          }
        })
      },
      getRenderVal(value, render) {
        this.description = value;
        this.renderVal = marked(value);
      },
      checkPhone() {
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        for (let i = 0; i < this.leaderList.length; i++) {
          if (!reg.test(this.leaderList[i].phone))
            return false;
        }
        return true;
      },
      checkInput() {
        if (!this.title) {
          this.$message.error('请填写活动标题');
          return false;
        } else if (!this.fullRole) {
          this.$message.error('请选择参与者类型');
          return false;
        } else if (!this.num || typeof (parseInt(this.num)) != 'number') {
          this.$message.error('参与人数填写不正确');
          return false;
        } else if (!this.startTime) {
          this.$message.error('请填写活动开始时间');
          return false;
        } else if (!this.endTime) {
          this.$message.error('请填写活动结束时间');
          return false;
        } else if (!this.leaderList[0].userName) {
          this.$message.error('请填写负责人');
          return false;
        } else if (!this.checkPhone()) {
          this.$message.error('请正确填写负责人联系方式');
          return false;
        } else if (!this.pictures) {
          this.$message.error('请上传活动海报');
          return false;
        } else if (!this.description) {
          this.$message.error('请填写活动详情');
          return false;
        }
        return true;
      },
      saveOrPostActivity() {
        if (this.checkInput()) {
          let activity = {
            description: this.renderVal,
            orgName: this.orgName,
            fullRole: this.fullRole[0],
            fullName:this.fullName,
            num: parseInt(this.num),
            pictures: this.pictures,
            title: this.title,
            startTime: new Date(this.startTime.valueOf()),
            endTime: new Date(this.endTime.valueOf()),
            leaderList: this.leaderList,
            status: this.status,
          }
          console.log(activity)
          this.axios.put('/activity', activity).then(res => {
            console.log(res)
            if (res.data.code == 0) {
              if(this.status == 2)
                this.$message.success('发布成功');
                else if(this.status == 1)
                this.$message.success('修改成功');
            }
          })
        }
      },
      postActivity() {
        this.status = 2;
        this.saveOrPostActivity();
      },
      saveActivity() {
        this.status = 1;
        this.saveOrPostActivity();
      },
      modifyActivity() {
        if (this.checkInput()) {
          this.status = 2;
          let activity = {
            id: this.id,
            description: this.renderVal,
            orgName: this.orgName,
            fullRole: this.fullRole[0],
            fullName:this.fullName,
            num: parseInt(this.num),
            pictures: this.pictures,
            title: this.title,
            startTime: new Date(this.startTime.valueOf()),
            endTime: new Date(this.endTime.valueOf()),
            leaderList: this.leaderList,
            status: this.status,
          }
          console.log(activity)
          this.axios.put('/activity', activity).then(res => {
            console.log(res)
            if (res.data.code == 0) {
              this.$message.success('修改成功');
              this.status = 2;
            }
          })
        }
      },
      getfullName(id) {
        this.axios.get('/organization/list/' + id).then(res => {
          let item;
          if (res.data.code == 0) {
            let data = res.data.data;
            for (let i = 0; i < data.length; i++) {
              item = {
                value: data[i].fullNameIdPth,
                label: data[i].fullName,
                id: data[i].id,
                children: [],
              }
              item.children = this.getfullName(data[i].id);
              this.options.push(item);
            }
            return item;
          }
        })
      },
      getActivity() {

        this.status = 1;
        this.axios.get('/activity/list?page=' + this.page + '&limit=' + this.pageSize + '&status=' + this.status)
          .then(res => {
            console.log(res)
            if (res.data.code == 0) {
              this.draftList = res.data.data;
              this.drawerVisible = true;
            }

          })
      },
      drawerClose() {
        this.drawerVisible = false;
      },
      changeActivity(id) {
        this.pictures = 0;
        this.fileList = [];
        this.id = id;
        this.axios.get('/activity/' + id).then(res => {
          let data = res.data.data;
            console.log(res);
          if (res.data.code == 0) {
            this.title = data.title;
            this.pictures = data.pictures;
            this.startTime = this.moment(data.startTime);
            this.endTime = this.moment(data.endTime);
            this.num = data.num;
            console.log(this.num);
            this.fullRole = [];
            this.fullRole.push(data.fullRole);
            this.fullName = data.fullName,
            console.log(data.leaderList)
            this.people = data.leaderList.length;
            this.leaderList = data.leaderList;
            let item = {
              uid: data.pictures,
              status: 'done',
              url: this.$baseURL + data.pictures
            }
            this.fileList.push(item)
            this.pictures = data.pictures;
            this.description = data.description;
            this.drawerVisible = false;
          }
        })
      },
      getActivityById(){
        let id = this.$route.query.activityId;
        console.log(id);
        if(id){
          this.status = 1;
          this.changeActivity(id);
        }
      }

    }
  }

</script>
<style scoped>
  .markdown-body {
    color: #24292e;
    font-size: 14px;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }

  .mavon-editor {
    width: 100%;
    /* height: 100%; */
    height: 100vh;
    background: #fff;
  }

  .markdown-body {
    height: 100%;
  }

  .mavon-header {
    padding: 50px 60px 20px 60px
  }

  .ant-input {
    width: 400px;
    margin-right: 20px;
  }

  .ant-calendar-picker-container {
    z-index: 10000 !important;
  }

  .mavon-editor>>>.ant-upload {
    margin-left: 75px;
  }

  .mavon-editor>>>.ant-upload-list-picture-card .ant-upload-list-item {
    width: 180px;
    height: 150px;
  }

  .mavon-editor>>>.ant-upload-list-picture-card {
    margin-left: 15px;
  }

  .mavon-editor>>>.ant-upload.ant-upload-select-picture-card {
    width: 180px;
    height: 150px;
  }

  .mavon-btn {
    position: absolute;
    top: 10px;
    right: 20px;
  }

  input::placeholder {
    color: #999;
  }

  .ant-drawer-body ul li {
    line-height: 2;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }

  .ant-drawer-body ul li:hover {
    color: rgb(70, 70, 247);
  }

  .article-popover {
    padding: 0 0 10px 0;
  }

  .article-popover h1 {
    font-size: 14px;
    color: #666;
    margin: 10px 0;
  }

  .article-popover h1:first-child {
    margin-top: 0;
  }

</style>
