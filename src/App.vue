<template>
  <v-app>
    <v-app-bar
        v-if="isLoggedIn"
        app
        flat
    >
      <v-toolbar-title>پرشیا اطلس</v-toolbar-title>

      <v-spacer/>
      <!--      <v-form>-->
      <!--        <v-text-field-->
      <!--            dense-->
      <!--            flat-->
      <!--            hide-details-->
      <!--            rounded-->
      <!--            outlined-->
      <!--            prepend-inner-icon="mdi-magnify"-->
      <!--        />-->
      <!--      </v-form>-->

      <search/>

      <v-spacer></v-spacer>

      <v-btn
          v-for="link in links"
          :key="link.title"
          class="mx-3"
          text
          rounded
          outlined
          :color="link.color || ''"
          :to="link.url"
      >
        {{ link.title }}
      </v-btn>

      <v-btn icon v-if="!$vuetify.theme.dark" @click="toggleTheme()">
        <v-icon class="mr-1" color="blue-grey darken-4">mdi-lightbulb</v-icon>
      </v-btn>
      <v-btn icon v-if="$vuetify.theme.dark" @click="toggleTheme()">
        <v-icon color="yellow darken-3">mdi-lightbulb-outline</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main class="mt-10 mb-40 mx-20">
      <router-view/>
    </v-main>

    <v-footer app>
      کلیه حقوق سایت متعلق به خودمونه
    </v-footer>

  </v-app>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import Search from "@/components/Header/Search";

export default {
  name: 'App',
  components: {
    Search
  },
  data() {
    return {
      links: [
        {title: 'خانه', url: '/'},
        {title: 'خروج', url: '/logout', color: 'red'},
      ]
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user
    }),
    ...mapGetters({
      isLoggedIn: 'auth/isAuthenticated'
    })
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>
