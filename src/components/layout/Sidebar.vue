<template>
  <v-navigation-drawer
      absolute
      app
      permanent
      right
  >
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Jane Smith</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list-group
        :value="true"
        v-for="(item, i) in userMenuItems"
        :key="i"
        :prepend-icon="item.icon"
    >
      <template v-slot:activator>
        <v-list-item-title v-text="$t(item.titleI18n)"/>
      </template>
      <v-list-item
          v-for="(subItem, j) in item.children"
          :key="j"
          link
          ripple
      >
<!--        <v-list-item-icon>-->
<!--          <v-icon v-text="subItem.icon"/>-->
<!--        </v-list-item-icon>-->
        <v-list-item-title v-text="$t(subItem.titleI18n)"/>
      </v-list-item>
    </v-list-group>
  </v-navigation-drawer>
</template>

<script>
import menuItems from '@/components/layout/sideMenuItems'

export default {
  name: 'Sidebar',
  data() {
    return {
      userMenuItems: menuItems,
    }
  },
}
</script>

<style scoped>

</style>