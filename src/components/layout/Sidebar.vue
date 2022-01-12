<template>
  <v-navigation-drawer
      app
      v-model="sidebarOpen"
      right
      fixed
      :permanent="!isMobileWidth"
      :temporary="isMobileWidth"
  >
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user }}</v-list-item-title>
          <v-list-item-subtitle>خوش اومدی</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <div v-if="isMobileWidth" class="pa-2">
        <v-btn
            color="red"
            block
            @click="logout"
        >
          {{ $t('general.routes.logout') }}
        </v-btn>
      </div>
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
          class="px-10"
          :to="{name: subItem.routeName}"
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
import {mapGetters, mapState} from 'vuex'
import menuItems from '@/components/layout/sideMenuItems'

export default {
  name: 'Sidebar',
  data() {
    return {
      userMenuItems: menuItems,
    }
  },
  computed: {
    ...mapState({
      sidebarOpen: state => state.sidebarOpen,
      user: state => state.auth.user,
    }),
    ...mapGetters(['isMobileWidth']),
    sidebarOpen: {
      get() {
        return this.$store.state.sidebarOpen
      },
      set(value) {
        this.$store.dispatch('HandleSidebarOpenStatus', value)
      },
    },
  },
  methods: {
    async logout(){
      await this.$store.dispatch('auth/LogOut')
      await this.$router.push({name: 'Login'})
    }
  },
}
</script>

<style scoped>

</style>