<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <div style="font-weight: bold; font-size: 20px; color: #666;">欢迎访问管理后台</div>
    <panel-group @panelClick="handlePanelClick"/>
    <div class="card-group">
      <comment-card />
      <chart-card :clickObj="clickObj"/>
    </div>
  </div>
</template>

<script>
  import GithubCorner from '@/components/GithubCorner'
  import PanelGroup from './components/PanelGroup'
  import CommentCard from './components/CommentCard'
  import ChartCard from './components/ChartCard'

  export default {
    name: 'DashboardAdmin',
    components: {
      GithubCorner,
      PanelGroup,
      CommentCard,
      ChartCard
    },
    data() {
      return {
        clickObj: 'article'
      }
    },
    methods: {
      handlePanelClick(data) {
        this.clickObj = data
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0;
      right: 0;
      border: 0;
    }

    .card-group {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
