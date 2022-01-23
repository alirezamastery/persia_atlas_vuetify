<template>
  <v-navigation-drawer
      v-model="sidebarOpen"
      :permanent="!isMobileWidth"
      :temporary="isMobileWidth"
      app
      :right="$vuetify.rtl"
      fixed
  >
    <template v-slot:prepend>
      <v-list-item two-line :to="{name: 'Profile'}">
        <v-list-item-avatar>
          <img v-if="profile.avatar" :src="profile.avatar" alt="">
          <img v-else src="@/assets/svg/user-blank.svg" alt="">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user }}</v-list-item-title>
          <v-list-item-subtitle>{{ fullName }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <div v-if="isMobileWidth" class="pa-2">
        <v-btn
            color="red"
            block
            :to="{name: 'Logout'}"
        >
          {{ $t('general.routes.logout') }}
        </v-btn>
      </div>
    </template>

    <v-divider/>

    <v-list expand dense nav>
      <v-list-group
          v-for="(item, i) in userMenuItems"
          :key="i"
          :value="!item.collapsed"
          :prepend-icon="item.icon"
      >
        <template v-slot:activator>
          <v-list-item-title v-text="$t(item.titleI18n)"/>
        </template>
        <v-list-item
            v-for="(subItem, j) in item.children"
            :key="j"
            :to="{name: subItem.routeName}"
            class="px-10"
            ripple
            link
        >
          <v-list-item-title v-text="$t(subItem.titleI18n)"/>
        </v-list-item>
      </v-list-group>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import menuItems from '@/components/layout/sideMenuItems'

export default {
  name: 'Sidebar',
  data() {
    return {
      userMenuItems: menuItems,
      avatarSrc: null,
    }
  },
  computed: {
    ...mapState({
      sidebarOpen: state => state.sidebarOpen,
      user: state => state.auth.user,
      userAvatarURL: state => state.auth.userAvatarURL,
      profile: state => state.auth.profile,
    }),
    ...mapGetters({
      isMobileWidth: 'isMobileWidth',
    }),
    sidebarOpen: {
      get() {
        return this.$store.state.sidebarOpen
      },
      set(value) {
        this.$store.dispatch('HandleSidebarOpenStatus', value)
      },
    },
    fullName() {
      const firstName = this.profile.first_name || ''
      const lastName = this.profile.last_name || ''
      return firstName + ' ' + lastName
    },
  },
}
</script>

<style scoped>

</style>