<template>
  <div class="app-container">
    <topbar class="topbar-container" :categoryList="categoryList" :ids="ids"/>
    <list :list="list" @ids="handleId"/>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import Topbar from './Topbar'
import List from './List'
import { listArticle, getCategory, listTag } from '@/api/article'
import Pagination from '@/components/Pagination'

export default {
  name: 'ArticleList',
  components: {
    Topbar,
    List,
    Pagination
  },
  data() {
    return {
      list: null,
      tagList: [],
      categoryList: [],
      total: 0,
      listQuery: {
        pageSize: 10
      },
      ids: []
    }
  },
  mounted() {
    this.getList()
    this.getCategoryList()
    this.getTagList()
  },
  methods: {
    getList() {
      let listQuery = {}
      listQuery = Object.assign(this.listQuery, this.$route.query)
      listArticle(listQuery).then(response => {
        const {
          data,
          total
        } = response
        this.list = data
        this.list = this.list.map(article => {
          article.tag = article.tag.split(',')
          return article
        })
        this.total = total
      })
    },
    getCategoryList() {
      getCategory().then(response => {
        this.categoryList = response.data
      })
    },
    getTagList() {
      listTag().then(response => {
        this.tagList = response.data
      })
    },
    handleId(ids) {
      this.ids = ids
    }
  }
}
</script>

<style lang="scss" scoped>
  .topbar-container {
    margin-bottom: 20px;
  }
</style>
