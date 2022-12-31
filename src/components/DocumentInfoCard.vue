<template>
  <div>
    <el-card class="box-card">
      <span style="font-weight: bold">{{ this.doc.title }}</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="reserveDoc"
        >预定</el-button
      >
      <div v-for="(v, k, i) in doc" :key="i" class="text item">
        {{ k + ": " + v }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["doc"],
  data() {
    return {};
  },
  methods: {
    reserveDoc() {
      const { data: res } = await this.$http.post("reserve", this.doc.docId);
      if (res.meta.status !== 200)
        return this.$message.error("reserve fail...");
      this.$message.success("reserve success!");
      console.log("reserve: " + this.doc.docId);
      this.$message({
        message: "预定成功，请点击个人主页查看！",
        type: "success",
      });
    },
  },
};
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-top: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 300px;
  height: 440px;
}
</style>