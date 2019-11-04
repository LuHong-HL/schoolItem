<template>
  <div class="content">
    <div class="inner">
      <!-- 模态框 -->
      <a-modal v-model="visible" :footer="null" :closable="false" width="400px">
        <img :src="imageUrl" alt="图片加载失败" />
      </a-modal>
      <!-- 列表 -->
      <a-table
        :columns="columns"
        :dataSource="activityData"
        class="myTable"
        :rowKey="record=>record.id"
        :pagination="false"
      >
        <!-- 图片渲染加载 -->
        <template slot="pictures" slot-scope="pictures">
          <a href="javascript:void(0);" @click="showModal($baseURL+pictures)">
            <img :src="$baseURL+pictures" class="img" />
          </a>
        </template>
        <!-- 开始时间 -->
        <template slot="startTime" slot-scope="startTime">
          <div>
            <span>{{moment(startTime,'YYYY-MM-DD HH:mm:ss').format('YYYY年MM月DD日')}}</span>
          </div>
        </template>
        <!-- 结束时间 -->
        <template slot="endTime" slot-scope="endTime">
          <div>
            <span>{{moment(endTime,'YYYY-MM-DD HH:mm:ss').format('YYYY年MM月DD日')}}</span>
          </div>
        </template>
        <!-- 结束时间 -->
        <template slot="num" slot-scope="num">
          <div>
            <span>{{num}}人</span>
          </div>
        </template>
        <!-- 操作 -->
        <template slot="action" slot-scope="action,record" class="action">
          <div>
            <a href="javascript:void(0);" @click="jumpPublishActivityLook(record)"><span>查看</span></a>
            <span>|</span>
            <a href="javascript:void(0);"><span @click="jumpPublishActivity(record)">修改</span></a>
            <span>|</span>
            <a href="javascript:void(0);"><span @click="jumpInformationCheck(record.id)">申请审核</span></a>
          </div>
        </template>
      </a-table>
      <div class="pagination">
        <a-pagination :showQuickJumper="true" :total="total" @change="currentPageChange" />
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>



<script>
// 导入moment第三方插件
import moment from "moment";
moment.locale(["zh-cn", "zh-tw"]); //会使用'zh-cn'

let columns = [
  {
    title: "海报",
    dataIndex: "pictures",
    scopedSlots: { customRender: "pictures" },
    width: "10%"
  },
  {
    title: "活动标题",
    dataIndex: "title",
    width: "10%"
  },
  {
    title: "活动开始时间",
    dataIndex: "startTime",
    scopedSlots: { customRender: "startTime" },
    width: "10%"
  },
  {
    title: "活动结束时间",
    dataIndex: "endTime",
    scopedSlots: { customRender: "endTime" },
    width: "10%"
  },
  {
    title: "参与人数",
    dataIndex: "num",
    scopedSlots: { customRender: "num" },
    width: "10%"
  },
  {
    title: "负责人",
    dataIndex: "leaderList[0].userName",
    width: "10%"
  },
  {
    title: "联系方式",
    dataIndex: "leaderList[0].phone",
    width: "10%"
  },
  {
    title: "操作",
    // key: 'action',
    scopedSlots: { customRender: "action" },
    width: "11%"
  }
];

export default {
  created() {
    this.getActivityData();
  },
  data() {
    return {
      moment, //moment第三方插件
      columns, //表格的列标题
      visible: false, //模态框是否可视
      limit: 10, //每页条数
      currentPage: 1, //当前页
      total: 0, //总条数
      imageUrl: null, //每行数据对应的图片
      activityData: null, //活动信息列表
      status:2,//活动信息状态 1保存 2发布
    };
  },

  methods: {
    //展示模态框
    showModal(url, name) {
      this.visible = true;
      this.imageUrl = url;
    },
    // 当前页面改变的时
    currentPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getActivityData();
    },
    // 获取活动信息
    getActivityData() {
      let params = {
        page: this.currentPage,
        limit: this.limit,
        status:this.status
      };
      this.axios.get("/activity/list", { params }).then(result => {
        console.log("activityData:", result);
        this.total = result.data.totalElements;
        console.log("total", this.total);
        this.activityData = result.data.data;
      });
    },
    //   查看审核信息 跳转
    jumpInformationCheck(activityId) {
      this.$router.push({ path:"informationCheck",query:{activityId:activityId} });
    },
    //跳转到发布活动修改页面
    jumpPublishActivity(record){
        this.$router.push({ path:"publishActivity",query:{activityId:record.id,type:2} });
    },
    //跳转到发布活动查看页面
    jumpPublishActivityLook(record){
        this.$router.push({ path:"publishActivity",query:{activityId:record.id,type:1} });
    }
  }
};
</script>
<style  scoped>
.action >>> .iconfont {
  color: red;
  cursor: pointer;
}
.img {
  height: 50px;
  width: auto;
}
img {
  width: 100%;
}
.myTable >>> .ant-table td {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myTable >>> table {
  table-layout: fixed;
}
/* 分页样式 */
.pagination {
  float: right;
  padding: 22px 22px 25px 0;
}
/* 伪元素清除浮动 */
.clearfix::after {
  content: "";
  height: 0;
  display: block;
  clear: both;
}
/* 外层样式 */
.content {
  height: 93vh;
}
.inner {
  margin: 30px 20px 30px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.inner >>> .ant-table-pagination.ant-pagination {
  margin: 16px 20px;
}
</style>