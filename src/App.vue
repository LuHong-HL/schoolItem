<template>
<!-- <a-locale-provider :locale="zh_CN"> -->
  <div id="app">
   <routerView></routerView>
  </div>
    <!-- </a-locale-provider> -->
</template>

<script>
  // import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  // import moment from 'moment';
  // import 'moment/locale/zh-cn';
  // moment.locale('zh-cn');


export default {
  // data(){
  //   return{
  //      zh_CN,
  //   }
  // },

  name: 'App',
}
</script>

<style>
  .ant-menu-dark .ant-menu-inline.ant-menu-sub{background: rgb(46, 63, 78);}
  .ant-badge-multiple-words{
    padding: 0;
  }
  /* 修改模态框标题样式 */
 .modalClass .ant-modal-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  }
</style>
