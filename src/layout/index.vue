<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <div>
        <navbar />
      </div>
      <div>
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar/index'
import Navbar from './components/Navbar/index'
import AppMain from './components/AppMain/index'

export default {
  components: {
    Sidebar,
    Navbar,
    AppMain
  }
}
</script>

<style lang="scss" scope>

  .app-wrapper {
    height: 100%;
    width: 100%;
  }
</style>
