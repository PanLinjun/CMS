<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="10">
        <el-row type="flex" justify="space-around">
          <el-col :span="7">
            <el-select v-model="listQuery.category" placeholder="请选择分类" @change="handleFilter">
              <el-option
                v-for="item in categoryList"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-input
              v-model="listQuery.title"
              placeholder="请输入关键字"
              @keyup.enter.native="handleFilter"
              @clear="handleFilter"
              @blur="handleFilter"
            />
          </el-col>
          <el-col :span="7">
            <el-input
              v-model="listQuery.author"
              placeholder="请输入作者"
              @keyup.enter.native="handleFilter"
              @clear="handleFilter"
              @blur="handleFilter"
            />
          </el-col>
          <el-button icon="el-icon-search" circle @click="handleRefresh"></el-button>
        </el-row>
      </el-col>
      <el-col :span="3">
        <el-row type="flex" justify="space-around">
          <el-button type="primary" icon="el-icon-plus"  @click="handleCreate"></el-button>
          <el-button type="danger" icon="el-icon-delete" ></el-button>
          <el-button type="success" icon="el-icon-refresh-left"  @click="handleRefresh"></el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
  name: 'Topbar',
  inject: ['reload'],
  props: ['categoryList'],
  data() {
    return {
      listQuery: {}
    }
  },
  created() {
    this.parseQuery()
  },
  methods: {
    parseQuery() {
      // 收集查询条件
      const query = Object.assign({}, this.$route.query)
      let listQuery = {}
      if (query) {
        listQuery = {
          ...query
        }
      }
      this.listQuery = listQuery
    },
    handleCreate() {
      this.$router.push('/article/create')
    },
    handleRefresh() {
      this.reload()
    },
    handleFilter() {
      this.$router.push({
        path: '/article/list',
        query: this.listQuery
      })
      this.reload()
    }
  }
}
</script>

<style scoped>

</style>
