<template>
  <div class="content">
    <span>名称：</span>
    <a-input v-model="name" class="size"/>
     <a-input size="large" placeholder="large size" width="300px" class="size"/>
    <a-input placeholder="default size" />
    <a-input size="small" placeholder="small size" />
  </div>
</template>
<script>
export default {
    data () {
        return {
            name:"爱你"
        }
    },
    methods(){

    }
}
</script>
<style scoped>
  .size {
    width: 200px;
    margin: 0 8px 8px 0;
  }
</style>
