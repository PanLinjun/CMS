<template>
  <el-table
    :data="list"
    border
    style="width: 100%"
    highlight-current-row
    @sort-change="sortChange"
    @selection-change="handleSelectionChange">
    <el-table-column
      fixed
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="150">
    </el-table-column>
    <el-table-column
      label="状态"
      width="150">
      <template slot-scope="{ row }">
        <svg-icon icon-class="point" :class="{'point-active': isActive(row.state)}" style="height: 9px; width: 9px; margin: 0 5px; vertical-align: middle"/>
        <span style="vertical-align: middle">{{row.state}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="150">
    </el-table-column>
    <el-table-column
      prop="createDate"
      sortable="custom"
      label="创建时间"
      width="250">
    </el-table-column>
    <el-table-column
      prop="category"
      label="文档类别"
      width="150">
      <template slot-scope="{ row }">
        <el-tag type="primary" class="item-wrapper">{{ row.category }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="tag"
      label="文档标签"
      min-width="150">
      <template slot-scope="{ row }">
        <el-tag v-for="item in row.tag" :label="item.label" :key="item.value" type="success" class="item-wrapper">{{ item }}</el-tag>
      </template>
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
      width="200">
      <template slot-scope="{ row }">
        <el-button type="primary" icon="el-icon-edit" size="small" @click="handleUpdate(row)">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDelete(row)">删除</el-button>
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
  data() {
    return {
      listQuery: {}
    }
  },
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
        const id = [ row.id ]
        deleteArticle(id).then(response => {
          this.$notify({
            title: '成功',
            message: response.msg || '删除成功',
            type: 'success',
            duration: 2000
          })
          this.reload()
        })
      })
    },
    sortChange(data) {
      const { prop, order } = data
      console.log(order)
      if (prop === 'createDate') {
        this.sortByCreateDate(order)
      }
    },
    sortByCreateDate(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleFilter() {
      let listQuery = {}
      listQuery = Object.assign(this.$route.query, this.listQuery)
      this.$router.push({
        path: '/article/list',
        query: listQuery
      }).catch(() => {})
      this.reload()
    },
    isActive(state) {
      if (state === '已发布') {
        return true
      }
      return false
    },
    handleSelectionChange(rows) {
      const ids = rows.map(row => row.id)
      this.$emit('ids', ids)
    }
  }
}
</script>

<style lang="scss">
.el-table th.gutter {
  display: table-cell!important;
}
  .item-wrapper {
    margin-right: 15px!important;
  }

  .point-active {
    color: #13ce66;
  }
</style>
