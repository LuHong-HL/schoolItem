<template>
  <div class="content">
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal  v-model="visible" :footer="null" :closable="false" width="0" >
     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Liu_Yifei_at_the_2016_BAZAAR_Stars%E2%80%99_Charity_Night.jpg/220px-Liu_Yifei_at_the_2016_BAZAAR_Stars%E2%80%99_Charity_Night.jpg" alt="liuyifei" title="aaa"/>
    </a-modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        console.log(e);
        this.visible = false;
      },
    },
  };
</script>
