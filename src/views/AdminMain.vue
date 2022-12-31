<template>
  <div>
    <el-button style="float: right" type="danger" size="mini" @click="logout"
      >退出登录</el-button
    >
    <p style="text-align: right; marigin-bottom: 20px; margin-right: 100px">
      Hello, {{ this.account }}
    </p>
    <!-- <el-divider></el-divider> -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="查询和新增副本" name="first">
        <div class="sb">
          <search-bar @search="search" />
        </div>
        <div
          class="doc-info-card"
          v-for="res in searchResults"
          :key="res.docId"
        >
          <document-info-card-admin :doc="res" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="新增读者" name="second">
        <div class="add-reader-form">
          <el-form
            ref="addReaderForm"
            :model="addReaderForm"
            label-width="80px"
          >
            <el-form-item label="账户">
              <el-input v-model="addReaderForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="addReaderForm.password"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="名字">
              <el-input v-model="addReaderForm.name"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="addReaderForm.address"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="addReaderForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-radio-group v-model="addReaderForm.type">
                <el-radio label="学生"></el-radio>
                <el-radio label="教师"></el-radio>
                <el-radio label="行政人员"></el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="add-reader-form-button">
              <el-button type="primary" @click="onSubmitAddReaderForm"
                >新增</el-button
              >
              <el-button @click="cancelAddReaderForm">取消</el-button>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="查询分馆位置信息" name="third">
        <el-button @click="searchLibs">查询</el-button>
        <div style="marigh-top: 50px; margin-left: 50px">
          <el-table :data="libs" style="width: 30%">
            <el-table-column prop="name" label="读者" width="180">
            </el-table-column>
            <el-table-column prop="location" label="位置" width="180">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="查询分馆读者借阅前十" name="seventh">
        <span>请输入分馆名称</span
        ><el-input v-model="seachLibName" style="width: 15%" />
        <el-button @click="searchBorrower">查询</el-button>
        <div style="marigh-top: 50px; margin-left: 50px">
          <el-table :data="borrowers" style="width: 30%">
            <el-table-column prop="name" label="馆名" width="180">
            </el-table-column>
            <el-table-column prop="num_book" label="借阅数量" width="180">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="查询分馆借阅文档前十" name="fourth">
        <span>请输入分馆名称</span
        ><el-input v-model="seachLibName" style="width: 15%" />
        <el-button @click="searchBorrowedBooks">查询</el-button>
        <div style="marigh-top: 50px; margin-left: 50px">
          <el-table :data="borrowedBooks" style="width: 20%">
            <el-table-column prop="name" label="书名" width="180">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="查询年度文档前十" name="fifth">
        <span>请输入年份</span
        ><el-input v-model="seachYear" style="width: 15%" />
        <el-button @click="searchPopularBooks">查询</el-button>
        <div style="marigh-top: 50px; margin-left: 50px">
          <el-table :data="popularBooks" style="width: 20%">
            <el-table-column prop="name" label="书名" width="180">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="查询读者平均费用" name="sixth">
        <el-button @click="searchAveFinePerReader">查询</el-button>
        <div style="marigh-top: 50px; margin-left: 50px">
          <el-table :data="aveFinePerReader" style="width: 40%">
            <el-table-column prop="reader" label="读者" width="180">
            </el-table-column>
            <el-table-column prop="aveFine" label="平均费用" width="180">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import DocumentInfoCardAdmin from "../components/DocumentInfoCardAdmin.vue";

export default {
  components: {
    SearchBar,
    DocumentInfoCardAdmin,
  },
  data() {
    return {
      account: "",
      activeName: "first",
      searchResults: [],
      addReaderForm: {
        account: "",
        password: "",
        name: "",
        address: "",
        phone: "",
        type: "",
      },
      libs: [],
      seachLibName: "",
      borrowers: [],
      borrowedBooks: [],
      seachYear: "",
      popularBooks: [],
      aveFinePerReader: [],
    };
  },
  mounted() {
    this.account = this.$route.params.account;
  },
  methods: {
    logout() {
      this.account = "";
      this.$router.push({
        name: "Login",
      });
    },
    search(res) {
      console.log(res);
      this.searchResults = res;
    },
    cancelAddReaderForm() {
      console.log("reset");
      this.$refs["addReaderForm"].resetFields();
    },
    onSubmitAddReaderForm() {
      const { data: res } = await this.$http.post(
        "addReader",
        this.addReaderForm
      );
      // console.log(res)
      if (res.meta.status !== 200)
        return this.$message.error("add reader fail...");
      this.$message.success("add reader success!");
      console.log(this.addReaderForm);
      this.$message({
        message: "新增读者成功",
        type: "success",
      });
    },
    searchLibs() {
      const { data: res } = await this.$http.get("searchLibs");
      if (res.meta.status !== 200)
        return this.$message.error("search libs fail...");
      this.$message.success("search libs success!");
      this.libs = data.libs;
      // this.libs = [
      //   {
      //     name: "lib1",
      //     location: "loc1",
      //   },
      //   {
      //     name: "lib2",
      //     location: "loc2",
      //   },
      //   {
      //     name: "lib3",
      //     location: "loc3",
      //   },
      // ];
    },
    searchBorrower() {
      const { data: res } = await this.$http.get(
        "searchBorrowers",
        this.seachLibName
      );
      if (res.meta.status !== 200)
        return this.$message.error("search borrowers fail...");
      this.$message.success("search borrowers success!");
      this.borrowers = data.borrowers;
      // this.borrowers = [
      //   {
      //     name: "reader1",
      //     num_book: 500,
      //   },
      //   {
      //     name: "reader2",
      //     num_book: 200,
      //   },
      //   {
      //     name: "reader3",
      //     num_book: 100,
      //   },
      //   {
      //     name: "reader4",
      //     num_book: 90,
      //   },
      //   {
      //     name: "reader5",
      //     num_book: 80,
      //   },
      //   {
      //     name: "reader6",
      //     num_book: 70,
      //   },
      //   {
      //     name: "reader7",
      //     num_book: 50,
      //   },
      //   {
      //     name: "reader8",
      //     num_book: 40,
      //   },
      //   {
      //     name: "reader9",
      //     num_book: 30,
      //   },
      //   {
      //     name: "reader10",
      //     num_book: 22,
      //   },
      // ];
    },
    searchBorrowedBooks() {
      const { data: res } = await this.$http.get(
        "searchBorrowedBooks",
        this.seachLibName
      );
      if (res.meta.status !== 200)
        return this.$message.error("search borrowed books fail...");
      this.$message.success("search borrowed books success!");
      this.borrowedBooks = data.borrowedBooks;
      // this.borrowedBooks = [
      //   {
      //     name: "book1",
      //   },
      //   {
      //     name: "book2",
      //   },
      //   {
      //     name: "book3",
      //   },
      //   {
      //     name: "book4",
      //   },
      //   {
      //     name: "book5",
      //   },
      //   {
      //     name: "book6",
      //   },
      //   {
      //     name: "book7",
      //   },
      //   {
      //     name: "book8",
      //   },
      //   {
      //     name: "book9",
      //   },
      //   {
      //     name: "book10",
      //   },
      // ];
    },
    searchPopularBooks() {
      const { data: res } = await this.$http.get(
        "searchPopularBooks",
        this.seachYear
      );
      if (res.meta.status !== 200)
        return this.$message.error("search popular books fail...");
      this.$message.success("search popular books success!");
      this.popularBooks = data.popularBooks;
      // this.popularBooks = [
      //   {
      //     name: "book111",
      //   },
      //   {
      //     name: "book22",
      //   },
      //   {
      //     name: "book33",
      //   },
      //   {
      //     name: "book44",
      //   },
      //   {
      //     name: "book53",
      //   },
      //   {
      //     name: "book62",
      //   },
      //   {
      //     name: "book72",
      //   },
      //   {
      //     name: "book81",
      //   },
      //   {
      //     name: "book90",
      //   },
      //   {
      //     name: "book10",
      //   },
      // ];
    },
    searchAveFinePerReader() {
      const { data: res } = await this.$http.get("searchAveFinePerReader");
      if (res.meta.status !== 200)
        return this.$message.error("search average fine fail...");
      this.$message.success("search average fine success!");
      this.aveFinePerReader = data.aveFinePerReader;
      // this.aveFinePerReader = [
      //   {
      //     reader: "reader1",
      //     aveFine: 100,
      //   },
      //   {
      //     reader: "reader2",
      //     aveFine: 320,
      //   },
      //   {
      //     reader: "reader3",
      //     aveFine: 3,
      //   },
      //   {
      //     reader: "reader4",
      //     aveFine: 31,
      //   },
      // ];
    },
  },
};
</script>
<style scoped>
.sb {
  margin-top: 30px;
  margin-left: 100px;
  margin-right: 100px;
}
.doc-info-card {
  display: inline;
  float: left;
  margin-top: 30px;
  margin-left: 30px;
}
.add-reader-form {
  margin-top: 30px;
  width: 50%;
}
.add-reader-form-button {
  margin-left: 250px;
}
</style>