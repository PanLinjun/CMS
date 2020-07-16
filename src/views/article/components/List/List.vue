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
      label="标题"
      width="150">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="150">
    </el-table-column>
    <el-table-column
      prop="date"
      label="更新时间"
      width="150">
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
      label="操作"
      width="150">
      <template>
        <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle size="small"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'List',
  props: ['list']
}
</script>

<style lang="scss">
.el-table th.gutter {
  display: table-cell!important;
}
</style>
