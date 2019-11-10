<template>
  <div class="content">
    <a-cascader
      :options="options"
      @change="onChange"
      :loadData="loadData"
      placeholder="Please select"
      changeOnSelect
    />
  </div>
</template>
<script>
export default {
  created() {
    this.firstLoadData();
  },
  data() {
    return {
      options: [], //级联选择可选项数据源 数组对象
    };
  },
  methods: {
    onChange(value, selectedOptions) {
      console.log("selectedOptions:", selectedOptions);
      let selected = selectedOptions[selectedOptions.length - 1];
      this.fullName = selected.fullName;
      console.log(selected);
    },
    firstLoadData() {
      this.axios.get("/organization/list/1").then(res => {
        var firstData = res.data.data;
        for (var index = 0; index < firstData.length; index++) {
          var myData = firstData[index];
          var item = {
            fullName: myData.fullName,
            value: myData.id,
            label: myData.name,
            isLeaf: false
          };
          this.options.push(item);
        }
      });
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      let id = targetOption.value;
      this.axios.get("/organization/list/" + id).then(res => {
        var firstData = res.data.data;
        let children = [];
        for (var index = 0; index < firstData.length; index++) {
          var myData = firstData[index];
          var item = {
            fullName: myData.fullName,
            value: myData.id,
            label: myData.name,
            isLeaf: false
          };
          children.push(item);
        }
        setTimeout(() => {
          if (children.length === 0) {
            targetOption.isLeaf = true;
          } else {
            targetOption.children = children;
          }
          this.options = [...this.options];
        });
        targetOption.loading = false;
      }, 1000);
    }
  }
};
</script>