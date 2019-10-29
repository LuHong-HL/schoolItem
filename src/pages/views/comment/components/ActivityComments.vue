<template>
  <div class="content">
    <!-- 活动详情 -->
    <div class="inner">
      <template>
        <div class="activity">
          <div class="activityHeader">
            <h1>{{title}}</h1>
            <span>发布时间：{{moment(pubTime,'YYYY-MM-DD HH:mm:ss').format('YYYY年MM月DD日 HH时mm分ss秒')}}</span>
            <a href="#" class="a">{{orgName}}</a>
          </div>
          <div class="activityContent">
            <p>活动时间：{{moment(startTime,'YYYY-MM-DD HH:mm:ss').format('YYYY年MM月DD日 HH时mm分ss秒')+' 至 '+moment(endTime,'YYYY-MM-DD HH:mm:ss').format('YYYY年MM月DD日 HH时mm分ss秒')}}</p>
            <p>活动参与人数：{{num}}人</p>
            <div>
              <ul>
                <li v-for="(leader,index) in leaderList" :key="index">
                  <p>活动负责人{{index+1}}: {{leader.userName}} {{leader.phone}}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="activityBottom"></div>
        </div>
      </template>
      <div class="outerComment">
        <!-- 评论详情 -->
        <div class="comment">
          <!-- 表单标签 -->
          <a-list
            class="comment-list"
            :header="`${total} 条评论`"
            itemLayout="horizontal"
            :dataSource="commentsData"
          >
            <a-list-item slot="renderItem" slot-scope="item, index" :rowKey="index">
              <!-- 评论标签 -->
              <a-comment
                :author="item.author"
                :avatar="`${$baseURL+item.userHeadLink}`"
                class="commentItem"
              >
                <template slot="actions">
                  <span v-if="!item.fathId">{{item.username}}</span>
                  <span v-if="item.fathId">{{item.username}} 回复 {{item.fathCommentUsername}}</span>
                  <div class="deleteIcon">
                    <a-popconfirm
                      title="您确定要删除此评论吗"
                      @confirm="confirm(item.id)"
                      okText="确定"
                      cancelText="取消"
                    >
                      <a-icon type="close-circle" class="hotpink"/>
                      <span class="hotpink">删除</span>
                    </a-popconfirm>
                  </div>
                </template>
                <p slot="content">{{item.content}}</p>
                <!-- 时间定义 -->
                <a-tooltip
                  slot="datetime"
                  :title="moment(item.createTime,'YYYY-MM-DD HH:mm:ss').format('YYYY年MM月DD日 HH时mm分ss秒')"
                >
                  <span>{{moment(item.createTime,'YYYY-MM-DD HH:mm:ss').fromNow()}}</span>
                </a-tooltip>
              </a-comment>
            </a-list-item>
          </a-list>
          <div class="pagination">
            <template>
              <a-pagination
                showQuickJumper
                :current="current"
                :total="total"
                @change="currentPageChange"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale(["zh-cn", "zh-tw"]); //会使用'zh-cn'
export default {
  created() {
    this.getCommentsData();
    this.getActivityDetail();
  },
  data() {
    return {
      moment,
      commentsData: "", //评论数据
      current: 1, //当前页码
      limit: 10, //每页的条数
      total: 1, //分页总条数
      title: "", //活动标题
      orgName: "", //社团或机构名字
      pubTime: "", //发布时间
      startTime: "", //活动开始时间
      endTime: "", //活动结束时间
      num: "", //活动参与人数
      leaderList: "", //活动负责人列表
      // flag:true, //标记是否是回复评论
      activityId: this.$route.query.activityId //活动id
    };
  },
  methods: {
    //气泡确认
    confirm(id) {
        this.deleteComment(id);
      },
    //根据评论 id 删除评论
    deleteComment(id) {
      console.log("id:", id);
      this.axios.delete("comment/" + id).then(result => {
        console.log("deleteResult:", result);
        if (result.data.code === 0) {
          this.$message.success("评论删除成功！");
          this.getCommentsData();
        }
      });
    },
    // 当前页面改变的时
    currentPageChange(currentPage) {
      this.current = currentPage;
      this.getCommentsData();
    },
    //获得活动评论的数据
    getCommentsData() {
      let params = {
        type: 2,
        postId: this.activityId,
        page: this.current,
        limit: this.limit
      };
      this.axios.get("/comment", { params }).then(result => {
        console.log("commentsData:", result);
        let temporary = result.data;
        this.commentsData = temporary.data;
        this.total = temporary.totalCount;
      });
    },
    // 获取活动详情
    getActivityDetail() {
      this.axios.get("/activity/" + this.activityId).then(result => {
        console.log("activityDetail:", result);
        let temporary = result.data.data;
        this.title = temporary.title;
        this.orgName = temporary.orgName;
        this.pubTime = temporary.pubTime;
        this.startTime = temporary.startTime;
        this.endTime = temporary.endTime;
        this.num = temporary.num;
        this.leaderList = temporary.leaderList;
      });
    }
  }
};
</script>

<style scoped>
/* 清除浮动的after伪元素方法 */
.clearfix::after {
  content: "";
  height: 0;
  clear: both;
  display: block;
}
.content {
  height: 93vh;
}
.inner {
  margin: 30px 20px 30px 20px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
/* 活动头部 */
.activity {
  padding: 0 20px 20px 20px;
  background-color: #fff;
}
.activityHeader {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
.activityContent {
  margin-top: 20px;
}
h1 {
  font-weight: 700;
  font-size: 24px;
  word-wrap: break-word;
  color: #333;
  line-height: 1.56;
}
.a {
  margin-left: 20px;
  font-size: 14px;
  line-height: 1.56;
  color: #78a5f1;
}
span {
  line-height: 1.56;
  font-size: 14px;
  color: #858585;
}
p {
  color: #333;
  font-size: 14px;
  line-height: 1.56;
}
/* 删除按钮的样式 */
.deleteIcon {
  display: none;
  cursor: pointer;
  font-weight: 700;
  color: hotpink;
}
.hotpink{
  color: hotpink;
}
/* 显示删除按钮 */
.ant-list-item:hover .deleteIcon {
  display: block;
}
/* 评论模块 */
.outerComment {
  padding: 0 0 20px;
  background-color: #fff;
}
.comment {
  background-color: #fff;
  padding: 0 20px 20px 20px;
  margin: 0px 20px;
  border: 1px solid #ccc;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
/* 分页 */
.pagination {
  float: right;
}
/* 使用（深度作用选择器）>>>操作符 操作第三方插件 */
.comment >>> .ant-list-header {
  border-bottom: 1px solid #e8e8e8;
  font-size: 17px;
  font-weight: 700;
  color: #333;
}
</style>