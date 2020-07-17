<template>
  <el-table
    :data="list"
    border
    style="width: 100%">
    <el-table-column
      fixed
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="role"
      label="用户权限"
      width="150">
      <template slot-scope="{ row }">
        <el-tag type="primary" class="item-wrapper">{{ row.role }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="nickname"
      width="250">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱地址"
      width="150">
    </el-table-column>
    <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="150">
      <template slot-scope="{ row }">
        <el-button type="danger" icon="el-icon-delete" circle size="small" @click="handleDelete(row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { deleteAdmin } from '@/api/admin'
import { mapGetters } from 'vuex'

export default {
  name: 'List',
  inject: ['reload'],
  props: ['list'],
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    handleDelete(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.username === 'admin') {
          this.$notify({
            title: '失败',
            message: '此用户为超级管理员，无法删除',
            type: 'fail',
            duration: 2000
          })
          return
        }
        if (this.username !== 'admin' && row.role === 'admin') {
          this.$notify({
            title: '失败',
            message: '此用户无删除管理员用户权限',
            type: 'fail',
            duration: 2000
          })
          return
        }
        deleteAdmin(row.username).then(response => {
          this.$notify({
            title: '成功',
            message: response.msg || '删除成功',
            type: 'success',
            duration: 2000
          })
          this.reload()
        })
      })
    }
  }
}
</script>

<style lang="scss">
.el-table th.gutter {
  display: table-cell!important;
}
</style>
