<template>
  <div class="content">
    <!-- 列表数据展示 -->
    <div style="background-color: #ececec; padding: 20px;">
      <a-row :gutter="16">
        <a-col :span="6" v-for="item in activityData" :key="item.id" class="showIcon">
          <a-card hoverable @click="toComments(item.id)" tabChange class="card" size="small">
            <div class="image-box">
              <img
                alt="example"
                :src="$baseURL+item.pictures"
                slot="cover"
              />
            </div>

            <!-- 气泡确认框插件 -->
            <template>
              <a-popconfirm title="您确定删除此活动吗？" @confirm="confirm(item.id)" okText="确定" cancelText="取消">
                <a-icon type="close-circle" class="delete" @click.stop="deleteActivity" />
              </a-popconfirm>
            </template>
            <!-- <a-icon type="close-circle" class="delete" @click.stop="deleteActivity" /> -->
            <a-card-meta :title="item.title">
              <template slot="description">
                <div>
                  <!-- {{item.startTime+'-'+item.endTime}} -->
                  <p>开始时间：{{moment(item.startTime,'YYYY-MM-DD HH:mm:ss').format('YYYY年MM月DD日 HH时mm分')}}</p>
                  <p>结束时间：{{moment(item.endTime,'YYYY-MM-DD HH:mm:ss').format('YYYY年MM月DD日 HH时mm分')}}</p>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <!-- 分页 每页8条 -->
    <div class="pagination">
      <template>   
        <a-pagination showQuickJumper :total="total" :defaultPageSize="8" @change="currentPageChange"  :current="current"/>
        
      </template>
    </div>
  </div>
</template>
<script>
// 导入moment第三方插件
import moment from "moment";
moment.locale(["zh-cn", "zh-tw"]); //会使用'zh-cn'

export default {
  created() {
    this.getActivityData();
  },
  data: function() {
    return {
      moment,
      current: 1,
      activityData:null,
      total: 1,
      limit: 8,
      status:2,//活动信息状态 1保存 2发布

      // link:'\file\head_link\6fc5b7c333754395bd0cd1f3ecf39fa9.jpg',
    };
  },
  methods: {
    // 当前页面改变的时
    currentPageChange(currentPage) {
      this.current = currentPage;
      this.getActivityData();
    },
    //获得活活动的数据
    getActivityData() {
      console.log("current:", this.current);
      let params = {
        page: this.current,
        limit: this.limit,
        status:this.status
      };
      this.axios.get("/activity/list", { params }).then(result => {
        console.log("activityComment:",result);
        this.total = result.data.totalElements;
        // console.log(this.total)
        this.activityData = result.data.data;
      });
      // this.total = 300;
    },
    //跳转到相对活动的评论区
    toComments(id) {
      // id为对应活动的id
      console.log("id",id)
      // this.$router.push({ name: "activityComments",params:{activityId:id} });
      this.$router.push({ path:"activityComments",query:{activityId:id} });
    },
    //删除活动阻止冒泡
    deleteActivity() {},
    //删除活动成功的回调函数
    confirm(id) {
      console.log("activityId",id);
      this.axios.delete("/activity/"+id).then(result=>{
            console.log(result);
            this.$message.success("删除成功！");
            this.getActivityData();
      });
      
    }
  },
  components: {}
};
</script>
<style scoped>
.content {
  height: 93vh;
}

.bodyStyle,
.headStyle {
  display: flex;
  flex: 2;
}

.ant-col-6 {
  padding: 8px;
}

.delete {
  position: absolute;
  top: 8px;
  right: 8px;
  color: #ccc;
  font-size: 37px;
  display: none;
}
.showIcon:hover .delete {
  display: block;
}

.pagination {
  float: right;
  padding-bottom: 25px;
  padding-right: 22px;
}
/* 图片外层盒子样式 */
.image-box {
  height: 300px;
  position: relative;
  overflow: hidden;
}
/* 图片样式 */
.image-box img {
  max-width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
