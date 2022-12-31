<template>
  <div>
    <p style="text-align: right">Hello, {{ this.account }}</p>
    <el-button style="float: left" type="danger" size="mini" @click="logout"
      >退出登录</el-button
    >
    <p style="text-align: right">
      <el-button type="text" @click="enterReaderInfo">个人主页</el-button>
    </p>
    <div class="sb">
      <search-bar @search="search" />
    </div>
    <div class="doc-info-card" v-for="res in searchResults" :key="res.docId">
      <document-info-card :doc="res" />
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import DocumentInfoCard from "../components/DocumentInfoCard.vue";

export default {
  components: {
    SearchBar,
    DocumentInfoCard,
  },
  data() {
    return {
      account: "",
      searchResults: [],
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
    enterReaderInfo() {
      this.$router.push({
        name: "ReaderInfo",
        params: {
          account: this.account,
        },
      });
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
</style>