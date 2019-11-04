<template>
  <div class="content">
    <div class="inner">
      <div class="header">
        <!-- 活动申请人信息下载 -->
        <a :href="$baseURL+'/excel/petitioner/activity/'+actId"><a-button icon="download" type="primary">导出成员名单</a-button></a>
      </div>
      <a-table
        :columns="columns"
        :dataSource="applicantInformation"
        class="myTable"
        :rowKey="record=>record.id"
        :pagination="false"
      >
        <!-- 申请时间 -->
        <template slot="applyTime" slot-scope="applyTime">
          <div>
            <span>{{moment(applyTime,'YYYY-MM-DD HH:mm:ss').format('YYYY年MM月DD日')}}</span>
          </div>
        </template>
        <!-- 申请状态 -->
        <template slot="result" slot-scope="result">
          <div>
            <span v-if="result==0">未审核</span>
            <span v-if="result==1">已通过</span>
            <span v-if="result==2">未通过</span>
          </div>
        </template>

        <!-- 操作 -->
        <span slot="action" slot-scope="action,record" class="action">
          <a href="javascript:void(0);" @click="choicePass(record.id)">
            <span>同意</span>
          </a>
          <span>|</span>
          <a href="javascript:void(0);" @click="choiceRefuse(record.id)">
            <span>拒绝</span>
          </a>
        </span>
      </a-table>
      <div class="pagination">
        <a-pagination
          :showQuickJumper="true"
          :total="total"
          @change="currentPageChange"
        />
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
    title: "申请人",
    dataIndex: "username",
    width: "10%"
  },
  {
    title: "联系方式",
    dataIndex: "phone",
    width: "10%"
  },
  {
    title: "申请时间",
    dataIndex: "applyTime",
    scopedSlots: { customRender: "applyTime" },
    width: "10%"
  },
  {
    title: "申请活动",
    dataIndex: "title",
    width: "10%"
  },
  {
    title: "状态",
    dataIndex: "result",
    scopedSlots: { customRender: "result" },
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
    // this.getActivityData();
    this.getApplicantInformation();
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

      applicantInformation: null, //活动申请人信息
      actId: this.$route.query.activityId //活动id
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
      this.getApplicantInformation();
    },
    // 获取活动申请信息
    getApplicantInformation() {
      let params = {
        act_id: this.actId,
        page: this.currentPage,
        limit: this.limit
      };
      this.axios.get("/petitioner/activity", { params }).then(result => {
        console.log("applicantInformation:", result);
        this.total = result.data.totalElements;
        this.applicantInformation = result.data.data;
      });
    },
    //通过审核
    choicePass(id) {
      console.log("petitionerId:", id);
      let data = {
        pet_id: id,
        result: 1
      };
      this.axios({
        method: "put",
        url: "/petitioner",
        params: data
      }).then(result => {
        // console.log("publishResult:",result)
        this.getApplicantInformation();
      });
    },
    //不通过审核
    choiceRefuse(id) {
      console.log("petitionerId:", id);
      let data = {
        pet_id: id,
        result: 2
      };
      this.axios({
        method: "put",
        url: "/petitioner",
        params: data
      }).then(result => {
        // console.log("publishResult:",result)
        this.getApplicantInformation();
      });
    },
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
/* header 样式 */
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