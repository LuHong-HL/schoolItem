<template>
	<!-- 根div的class为content确保内容在右边区域出现 -->
	<div class="content">
		<div class="inner">
			<OrganizationHeader @postFlag="getFlag"></OrganizationHeader>
			<OrganizationTable :flag="this.flag"></OrganizationTable>
		</div>	
	</div>
</template>

<script>
import OrganizationHeader from './components/OrganizationHeader'
import OrganizationTable from './components/OrganizationTable'
	export default {
		data(){
			return{
				organizationData:null,
				flag:false,
			}
		},
		components:{
			OrganizationHeader,
			OrganizationTable
		},
		methods:{
			getFlag(flag){
				this.flag=flag;
				console.log("flag:",this.flag)
			},
		},
		watch:{
			organizationData(newValue,oldValue){
				console.log("newvalue,oldValue",newValue,oldValue)
			}
		}
	}
</script>
<style scoped>
/* 导入第三方样式或者你写的样式，切记不要在main.js引入，因为可能污染其它组件的样式 */
/* @import '../../assets/styles/css/yourcss.css'; */
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
