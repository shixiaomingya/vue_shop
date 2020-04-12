<template>
  <div>
    <!-- 首先加入面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 加入card -->
    <el-card class="box-card">
      <!-- 顶部工具栏 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="params.query" clearable @clear="clearQuery">
            <el-button slot="append" icon="el-icon-search" @click="queryUser"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">添加</el-button>
        </el-col>
      </el-row>
      <!-- 表格数据栏 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名称"></el-table-column>
        <el-table-column prop="role_name" label="用户角色"></el-table-column>
        <el-table-column prop="mobile" label="用户电话"></el-table-column>
        <el-table-column prop="email" label="用户邮箱"></el-table-column>
        <el-table-column label="用户状态" align="center" width="120px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop label="操作" align="center">
          <template>
            <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button size="mini" type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格分页栏 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserList()
  },
  data() {
    return {
      userList: [],
      params: {
        // 查询条件
        query: '',
        // 页码
        pagenum: 1,
        // 记录数
        pagesize: 2
      },
      total: 0
    }
  },
  methods: {
    getUserList() {
      this.$http
        .get('users', {
          params: this.params
        })
        .then(({ data }) => {
          this.params.pagenum = data.data.pagenum
          this.total = data.data.total
          this.userList = data.data.users
        })
        .catch(({ data }) => {
          this.$message.error(data.meta.msg)
        })
    },
    changeState(row) {
      this.$http
        .put(`users/${row.id}/state/${row.mg_state}`)
        .then(({ data }) => {
          console.log(data)
          this.$message.success(data.meta.msg)
        })
        .catch(({ data }) => {
          this.$message.error(data.meta.msg)
        })
    },
    queryUser() {
      // 点击搜索按钮后，重新查询用户列表（query字段双向绑定了input）
      this.getUserList()
    },
    clearQuery() {
      this.getUserList()
    },
    handleSizeChange(newValue) {
      this.params.pagesize = newValue
      this.getUserList()
    },
    handleCurrentChange(newValue) {
      this.params.pagenum = newValue
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
