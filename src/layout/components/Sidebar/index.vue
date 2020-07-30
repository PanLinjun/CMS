<template>
  <div>
    <sidebar-logo/>
    <el-menu
      mode="vertical"
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
    >
      <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
import SidebarLogo from './SidebarLogo'

import variables from '@/styles/variables/variables.scss'

export default {
  components: {
    SidebarItem,
    SidebarLogo
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    variables() {
      return variables
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>
