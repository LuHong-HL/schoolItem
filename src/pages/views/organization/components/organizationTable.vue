<template>
  <div>
    <!-- 模态框 -->
    <a-modal v-model="visible" :footer="null" :closable="false" width="400px">
      <img :src="imageUrl" alt="图片加载失败" />
    </a-modal>
    <!-- 列表 -->
    <a-table
      :columns="columns"
      :dataSource="organizationData"
      class="myTable"
      :rowKey="record=>record.id"
      :pagination="false"
    >
      <!-- 图片渲染加载 -->
      <template slot="logoLink" slot-scope="logoLink">
        <a href="javascript:void(0);" @click="showModal($baseURL+logoLink)">
          <img :src="$baseURL+logoLink" class="img"/>
        </a>
      </template>
      <span slot="action" slot-scope="text, record" class="action">
        <!-- 操作气泡确认框 -->
        <a-popconfirm title="您确认删除此信息吗？" @confirm="confirm(record)" okText="确认" cancelText="取消">
          <span class="iconfont iconshanchu"></span>
        </a-popconfirm>
      </span>
    </a-table>
    <div class="clearfix"></div>
  </div>
</template>



<script>
let columns = [
  {
    title: "头像",
    dataIndex: "logoLink",
    scopedSlots: { customRender: "logoLink" },
    width: "10%"
  },
  {
    title: "名称",
    dataIndex: "name",
    width: "10%"
  },
  {
    title: "学院",
    dataIndex: "collage",
    width: "10%"
  },
  {
    title: "介绍",
    dataIndex: "intro",
    width: "60%"
  },
 
  {
    title: "操作",
    // key: 'action',
    scopedSlots: { customRender: "action" },
    width: "10%"
  }
];

export default {
  // props: ["sonSearchValue"],
  created() {
    this.getOrganizationData();
  },
  props:['flag'],
  data() {
    return {
      columns,//列表的表头
      visible: false,//模态框是否可视
      imageUrl:null,//每行数据对应的图片

      fathId:0,//0 代表所有直属子组织
      organizationData:null,//直属子组织的数据
    };
  },

  methods: {
    // 气泡确认框点击确认的回调函数
    confirm(record) {
      console.log("organizationItem",record);
      this.deleteOrganization(record.id);
    },
    // 删除子组织
    deleteOrganization(id) {
      this.axios.delete("/organization/" + id).then(result => {
        console.log("deleteResult:",result);
        if (result.data.code === 0) {
          this.$message.success("删除成功！");
          this.getOrganizationData();
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
  
    //获取组织下全部直属组织的信息
    getOrganizationData() {
      
      this.axios.get("/organization/list/"+this.fathId).then(result => {
        console.log("organizationData:", result);

        this.organizationData = result.data.data;
      });
    }
  },
  watch: {
    flag(newValue){
      console.log("newValue:",newValue)
      this.getOrganizationData();
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