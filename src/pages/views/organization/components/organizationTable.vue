<template>
  <div>
    <!-- 模态框 -->
    <a-modal v-model="visible" :footer="null" :closable="false" width="400px">
      <img :src="imageUrl" alt="图片加载失败" />
    </a-modal>
    <!-- 列表 -->
    <a-table
      :columns="columns"
      :dataSource="userData"
      class="myTable"
      :rowKey="record=>record.id"
      :pagination="false"
    >
      <!-- 性别渲染 -->
      <span slot="sex" slot-scope="sex">{{sex?"男":"女"}}</span>
      <!-- 图片渲染加载 -->
      <template slot="headLink" slot-scope="headLink">
        <a href="javascript:void(0);" @click="showModal($baseURL+headLink)">
          <img :src="$baseURL+headLink" class="img"/>
        </a>
      </template>
      <span slot="action" slot-scope="text, record" class="action">
        <!-- 操作气泡确认框 -->
        <a-popconfirm title="您确认添加此信息吗？" @confirm="confirm(record)" okText="确认" cancelText="取消">
          <span class="iconfont iconshanchu"></span>
        </a-popconfirm>
      </span>
    </a-table>
    <div class="pagination">
      <a-pagination :showQuickJumper="true" :total="total" @change="currentPageChange" />
    </div>
    <div class="clearfix"></div>
  </div>
</template>



<script>
let columns = [
  {
    title: "头像",
    dataIndex: "headLink",
    scopedSlots: { customRender: "headLink" },
    width: "10%"
  },
  {
    title: "学号",
    dataIndex: "no",
    width: "10%"
  },
  {
    title: "姓名",
    dataIndex: "name",
    width: "10%"
  },
  {
    title: "性别",
    dataIndex: "sex",
    scopedSlots: { customRender: "sex" },
    width: "10%"
  },
  {
    title: "学院",
    dataIndex: "specialtyName",
    width: "13%"
  },
  {
    title: "社团、机构",
    dataIndex: "instituteName",
    width: "12%"
  },
  {
    title: "电话",
    dataIndex: "phone",
    width: "10%"
  },
  {
    title: "邮箱",
    dataIndex: "email",
    width: "15%"
  },

  {
    title: "操作",
    // key: 'action',
    scopedSlots: { customRender: "action" },
    width: "10%"
  }
];

export default {
  props: ["sonSearchValue"],
  created() {
    this.getUserData();
  },
  data() {
    return {
      columns,
      visible: false,
      limit: 10,
      // paginationConfig,
      currentPage: 1,
      total: 0,
      userData: [],
      imageUrl:null,//每行数据对应的图片
    };
  },

  methods: {
    //气泡确认框点击确认的回调函数
    confirm(record) {
      console.log(record);
      this.deleteUser(record.id);
    },
    // 删除成员
    deleteUser(id) {
      this.axios.delete("/organization/user/" + id).then(result => {
        console.log(result);
        if (result.data.code === 0) {
          this.$message.success("删除成功！");
          this.getUserData();
        } else {
          this.$message.success("删除失败！");
        }
      });
    },
    //展示模态框
    showModal(url,name) {
      this.visible = true;
      this.imageUrl=url;
    },
    onChange(pageNumber) {
      console.log("Page: ", pageNumber);
    },
    // 当前页面改变的时
    currentPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getUserData();
    },
    //请求社团机构成员的数据
    getUserData() {
      let params = {
        page: this.currentPage,
        limit: this.limit,
        input: this.sonSearchValue
      };
      this.axios.get("/user/organization", { params }).then(result => {
        console.log("result:", result);
        this.total = result.data.totalElements;
        console.log("total", this.total);
        this.userData = result.data.data;
      });
    }
  },
  watch: {
    sonSearchValue: function() {
      this.currentPage = 1;
      this.getUserData();
    },
    userData: function(newValue, oldValue) {
      console.log("newValue", newValue);
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
</style>