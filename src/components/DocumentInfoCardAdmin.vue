<template>
  <div>
    <el-card class="box-card">
      <span style="font-weight: bold">{{ this.doc.title }}</span>
      <el-button
        style="float: right; padding: 3px 0; margin-left: 6px"
        type="text"
        @click="addCopy"
        >新增副本</el-button
      >
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="checkStatus"
        >查询状态</el-button
      >
      <div v-for="(v, k, i) in doc" :key="i" class="text item">
        {{ k + ": " + v }}
      </div>
    </el-card>

    <el-dialog title="副本状态" :visible.sync="statusDialogVisible" width="30%">
      <p>读者ID：{{ this.copyStatus.readerId }}</p>
      <p>文档ID：{{ this.copyStatus.docId }}</p>
      <p>libID：{{ this.copyStatus.libId }}</p>
      <p>copyID：{{ this.copyStatus.copyId }}</p>
      <p>状态：{{ this.copyStatus.isTake }}</p>
      <p>应归时间：{{ this.copyStatus.reserveTime }}</p>
      <p>最晚归还：{{ this.copyStatus.deadline }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="statusDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["doc"],
  data() {
    return {
      statusDialogVisible: false,
      copyStatus: {},
      // uncommnent to use the test data
      // copyStatus: {
      //   readerId: 122344,
      //   docId: 1002,
      //   libId: 2001,
      //   copyId: 1,
      //   isTake: "已取",
      //   reserveTime: "2022-10-20",
      //   deadline: "2022-12-20",
      // },
    };
  },
  methods: {
    addCopy() {
      const { data: res } = await this.$http.post("addCopy", this.doc.docId);
      if (res.meta.status !== 200)
        return this.$message.error("add copy fail...");
      this.$message.success("add copy success!");
      console.log("add Copy: " + this.doc.docId);
      this.$message({
        message: "新增docId" + this.doc.docId + "副本成功！",
        type: "success",
      });
    },
    checkStatus() {
      const { data: res } = await this.$http.post("checkStatus", this.doc);
      if (res.meta.status !== 200)
        return this.$message.error("check status fail...");
      this.$message.success("check status success!");
      this.status = data.status;
      this.statusDialogVisible = true;
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