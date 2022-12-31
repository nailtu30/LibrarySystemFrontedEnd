<template>
  <div class="container">
    <p>欢迎来到大学图书馆</p>
    <el-card class="box-card">
      <el-form
        :model="loginForm"
        ref="loginForm"
        label-width="50px"
        class="loginForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLoginForm">登录</el-button>
          <el-button @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
      <div v-if="isAdmin">
        <el-button class="text1" type="text" @click="changeRole"
          >当前为管理员登录，点击切换读者登录</el-button
        >
      </div>
      <div v-else>
        <el-button class="text1" type="text" @click="changeRole"
          >当前为读者登录，点击切换管理员登录</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        account: "Tom1024",
        password: "123456",
      },
      isAdmin: false,
    };
  },
  methods: {
    submitLoginForm() {
      console.log("submit");
      //todo: backend
      if (this.isAdmin) {
        const { data: res } = await this.$http.post(
          "loginAdmin",
          this.loginForm
        );
        // console.log(res)
        if (res.meta.status !== 200)
          return this.$message.error("login fail...");
        this.$message.success("login success!");
        this.$router.push({
          name: "AdminMain",
          params: {
            account: this.loginForm.account,
          },
        });
      } else {
        const { data: res } = await this.$http.post("login", this.loginForm);
        // console.log(res)
        if (res.meta.status !== 200)
          return this.$message.error("login fail...");
        this.$message.success("login success!");
        this.$router.push({
          name: "ReaderMain",
          params: {
            account: this.loginForm.account,
          },
        });
      }
    },
    resetLoginForm() {
      console.log("reset");
      this.$refs["loginForm"].resetFields();
    },
    changeRole() {
      this.isAdmin = !this.isAdmin;
    },
  },
};
</script>
<style scoped>
/* .container { */
/* margin: 0 auto; */
/* } */
.text {
  font-size: 14px;
}

.text1 {
  font-size: 10px;
  float: right;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  margin: 0 auto;
  margin-top: 200px;
}
.loginForm {
  margin-left: 10px;
  margin-right: 20px;
  margin-top: 30px;
  text-align: center;
}
</style>