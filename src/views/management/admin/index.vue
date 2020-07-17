<template>
  <div class="app-container">
    <topbar class="topbar-container" :categoryList="categoryList"/>
    <list :list="list"/>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
  import Topbar from './components/Topbar'
  import List from './components/List'
  import { listAdmin } from '@/api/admin'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'ManagementAdmin',
    components: {
      Topbar,
      List,
      Pagination
    },
    data() {
      return {
        list: null,
        categoryList: [],
        total: 0,
        listQuery: {
          pageSize: 10
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        let listQuery = {}
        listQuery = Object.assign(this.listQuery, this.$route.query)
        listAdmin(listQuery).then(response => {
          const {
            data,
            total
          } = response
          this.list = data
          this.total = total
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topbar-container {
    margin-bottom: 20px;
  }
</style>
