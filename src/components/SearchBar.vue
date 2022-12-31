<template>
  <div>
    <el-input
      placeholder="请输入文档ID、文档名称或者出版社名字"
      v-model="input"
      class="input-with-select"
    >
      <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅" value="1"></el-option>
        <el-option label="订单" value="2"></el-option>
        <el-option label="用户" value="3"></el-option>
      </el-select> -->
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search"
      ></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      select: "",
      Documents: [],
      // uncomment to use the test data
      // Documents: [
      //   {
      //     docId: 1001,
      //     title: "doc title1001",
      //     publisherId: 2001,
      //     publicationDate: "2012-06-07",
      //     types: "book",
      //     publisherName: "pub name1001",
      //     publisherAddress: "pub address1001",
      //     ISBN: "ISBN1001",
      //     authorList: ["author1", "author2", "author3"],
      //   },
      //   {
      //     docId: 1002,
      //     title: "doc title1002",
      //     publisherId: 2002,
      //     publicationDate: "2011-06-07",
      //     types: "book",
      //     publisherName: "pub name1002",
      //     publisherAddress: "pub address1002",
      //     ISBN: "ISBN1002",
      //     authorList: ["author1", "author4"],
      //   },
      //   {
      //     docId: 1003,
      //     title: "doc title1003",
      //     publisherId: 2001,
      //     publicationDate: "2001-06-07",
      //     types: "journal volume",
      //     publisherName: "pub name1003",
      //     publisherAddress: "pub address1003",
      //     journalName: "journalName1003",
      //     scope: "scope1003",
      //     editorList: ["e1", "e2", "e4"],
      //     volumeEditor: ["ve1", "ve2", "ve3", "ve4"],
      //   },
      //   {
      //     docId: 1004,
      //     title: "doc title1004",
      //     publisherId: 2005,
      //     publicationDate: "1999-06-07",
      //     types: "conference proceedings",
      //     publisherName: "pub name1003",
      //     publisherAddress: "pub address1004",
      //     conferenceDate: "1998-07-09",
      //     conferenceLocation: "Shanghai",
      //     conferenceEditor: "ce1",
      //   },
      // ],
    };
  },
  methods: {
    search() {
      var search_word = this.input.trim();
      if (search_word == "") {
        this.$message.error("请输入内容");
        return;
      }
      const { data: res } = await this.$http.post("search", search_word);
      if (res.meta.status !== 200) return this.$message.error("search failed");
      this.$message.success("search sucess!");
      this.Documents = data.docs;
      var res = [];
      for (let i = 0; i < this.Documents.length; ++i) {
        let doc = this.Documents[i];
        if (
          search_word === doc.docId.toString() ||
          doc.title.indexOf(search_word) != -1 ||
          doc.publisherName.indexOf(search_word) != -1
        ) {
          res.push(doc);
        }
      }
      this.$emit("search", res);
    },
    // search() {
    //   // console.log("child" + this.input);
    //   this.axios({
    //     method: "get",
    //     url: "/doc/" + this.input,
    //   })
    //     .then((res) => {
    //       this.$emit("search", JSON.stringify(res.data.data));
    //     })
    //     .catch((err) => {
    //       console.log("errrrr" + err);
    //     });
    // },
  },
};
</script>
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>