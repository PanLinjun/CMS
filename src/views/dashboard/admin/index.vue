<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <div style="font-weight: bold;font-size: 20px;color: #666;">欢迎访问管理后台</div>
    <panel-group />
  </div>
</template>

<script>
  import GithubCorner from '@/components/GithubCorner'
  import PanelGroup from './components/PanelGroup'

  export default {
    name: 'DashboardAdmin',
    components: {
      GithubCorner,
      PanelGroup
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
  }
</style>
