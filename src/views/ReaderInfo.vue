<template>
  <div>
    <p style="text-align: right; marigin-bottom: 20px">
      Hello, {{ this.account }}
    </p>
    <el-divider></el-divider>
    <div class="fine">您当前欠费{{ this.fine }}￥</div>
    <el-divider></el-divider>
    <div class="table">
      <el-table
        :data="reservedDocuments"
        border
        style="width: 70%"
        @cell-click="returnDoc"
      >
        <el-table-column prop="docId" label="文档ID" width="120">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="150">
        </el-table-column>
        <el-table-column prop="lib" label="所在分管" width="120">
        </el-table-column>
        <el-table-column prop="isTake" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="reserveTime" label="应取时间" width="200">
        </el-table-column>
        <el-table-column prop="deadline" label="归还时间" width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
          column-key="return"
        >
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            > -->
            <el-button type="text" size="small">归还</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      fine: 0,
      reservedDocuments: [],
      // uncommnet to use the test data
      // reservedDocuments: [
      //   {
      //     docId: 1001,
      //     title: "title1001",
      //     lib: "lib1",
      //     isTake: "未取",
      //     reserveTime: "2022-12-22",
      //     deadline: "2022-01-03",
      //   },
      //   {
      //     docId: 1002,
      //     title: "title1002",
      //     lib: "lib3",
      //     isTake: "已取",
      //     reserveTime: "2022-12-22",
      //     deadline: "2022-01-03",
      //   },
      //   {
      //     docId: 1003,
      //     title: "title1003",
      //     lib: "lib1",
      //     isTake: "已取",
      //     reserveTime: "2022-12-22",
      //     deadline: "2022-01-03",
      //   },
      //   {
      //     docId: 1004,
      //     title: "title1004",
      //     lib: "lib4",
      //     isTake: "未取",
      //     reserveTime: "2022-12-22",
      //     deadline: "2022-01-03",
      //   },
      // ],
    };
  },
  mounted() {
    this.account = this.$route.params.account;
    this.getFine();
    this.getReservedDocuments();
  },
  methods: {
    getReservedDocuments() {
      const { data: res } = await this.$http.get("reservedDocuments");
      if (res.meta.status !== 200)
        return this.$message.error("get reserved documents fail...");
      this.$message.success("get reserved documents success!");
      this.reservedDocuments = data.reserveddocs;
    },
    getFine() {
      const { data: res } = await this.$http.post("getFine", this.account);
      if (res.meta.status !== 200)
        return this.$message.error("get fine fail...");
      this.$message.success("get fine success!");
      this.fine = data.fine;
    },
    returnDoc(row, column, cell, event) {
      if (column.columnKey == "return") {
        console.log(row.docId);
        const { data: res } = await this.$http.post(
          "returnDocument",
          row.docId
        );
        // console.log(res)
        if (res.meta.status !== 200)
          return this.$message.error("return document fail...");
        this.$message.success("return document success!");
        this.$message({
          message: "归还文档" + row.docId + "成功",
          type: "success",
        });
        for (var i = 0; i < this.reservedDocuments.length; ++i) {
          if (this.reservedDocuments[i].docId.toString() == row.docId) {
            this.reservedDocuments.splice(i, 1);
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.fine {
  text-align: center;
  margin-top: 30px;
}
.table {
  margin-top: 30px;
  margin-left: 100px;
}
</style>