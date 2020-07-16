<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-edit" circle @click="handleCreate"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-col>
      <el-col :span="6">
        <el-select v-model="listQuery" placeholder="分类">
          <el-option
            v-for="item in categoryList"
            :key="item"
            :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Topbar',
  props: ['categoryList'],
  data() {
    return {
      listQuery: {}
    }
  },
  methods: {
    handleCreate() {
      // this.$router.push('/article/create')
    }
  }
}
</script>

<style scoped>

</style>
