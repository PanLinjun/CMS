<template>
  <div class="sidebar-logo">
    <router-link to="/dashboard">
      <svg-icon icon-class="sidebarlogo" style="display: inline-block; height: 36px; width: 36px; margin: 0px; vertical-align: middle;"/>
      <span class="sidebar-title">CMS Admin</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'SidebarLogo'
  }
</script>

<style lang="scss" scoped>
  .sidebar-logo {
    height: 50px;
    margin: 0;
    padding: 5px;
    text-align: center;
    background: #2b2f3a;
    .sidebar-title {
      margin: 0;
      font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
      color: #ffffff;
      font-weight: 600;
      font-size: 18px;
      vertical-align: middle;
    }
  }
</style>
