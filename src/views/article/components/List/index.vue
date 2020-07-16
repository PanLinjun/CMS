<template>
  <div class="app-container">
    <topbar class="topbar-container" :categoryList="categoryList"/>
    <list :list="list"/>
  </div>
</template>

<script>
import Topbar from './Topbar'
import List from './List'
import { listArticle } from '@/api/article'

export default {
  name: 'ArticleList',
  components: {
    Topbar,
    List
  },
  data() {
    return {
      list: null,
      categoryList: []
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      listArticle().then(response => {
        const { data } = response
        this.list = data
        console.log(this.list)
        this.categoryList = data.map(article => article.category)
        console.log(this.categoryList)
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
