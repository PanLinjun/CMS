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
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="150">
    </el-table-column>
    <el-table-column
      prop="createDate"
      label="创建时间"
      width="250">
    </el-table-column>
    <el-table-column
      prop="category"
      label="文档类别"
      width="150">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="文档标签"
      width="150">
    </el-table-column>
    <el-table-column
      prop="click"
      label="点击"
      width="150">
    </el-table-column>
    <el-table-column
      prop="comment"
      label="评论数"
      width="150">
    </el-table-column>
    <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="150">
      <template slot-scope="{ row }">
        <el-button type="primary" icon="el-icon-edit" circle size="small" @click="handleUpdate(row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle size="small" @click="handleDelete(row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { deleteArticle } from '@/api/article'

export default {
  name: 'List',
  inject: ['reload'],
  props: ['list'],
  methods: {
    handleUpdate(row) {
      this.$router.push(`/article/edit/${row.id}`)
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(row.id).then(response => {
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
