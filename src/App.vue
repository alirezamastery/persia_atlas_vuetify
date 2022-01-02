<template>
  <v-app>
    <v-progress-linear
        :active="hasHttpRequestWaiting"
        :indeterminate="hasHttpRequestWaiting"
        color="yellow darken-2"
        :fixed="true"
        style="z-index: 10000"
    />
    <!--    <v-app-bar-->
    <!--        v-if="isAuthenticated"-->
    <!--        app-->
    <!--        flat-->
    <!--    >-->
    <!--      <v-toolbar-title>پرشیا اطلس</v-toolbar-title>-->

    <!--      <v-spacer/>-->
    <!--      &lt;!&ndash;      <v-form>&ndash;&gt;-->
    <!--      &lt;!&ndash;        <v-text-field&ndash;&gt;-->
    <!--      &lt;!&ndash;            dense&ndash;&gt;-->
    <!--      &lt;!&ndash;            flat&ndash;&gt;-->
    <!--      &lt;!&ndash;            hide-details&ndash;&gt;-->
    <!--      &lt;!&ndash;            rounded&ndash;&gt;-->
    <!--      &lt;!&ndash;            outlined&ndash;&gt;-->
    <!--      &lt;!&ndash;            prepend-inner-icon="mdi-magnify"&ndash;&gt;-->
    <!--      &lt;!&ndash;        />&ndash;&gt;-->
    <!--      &lt;!&ndash;      </v-form>&ndash;&gt;-->

    <!--      <Search/>-->

    <!--      <v-spacer></v-spacer>-->

    <!--      <v-btn-->
    <!--          v-for="link in links"-->
    <!--          :key="link.title"-->
    <!--          class="mx-3"-->
    <!--          text-->
    <!--          rounded-->
    <!--          outlined-->
    <!--          :color="link.color || ''"-->
    <!--          :to="link.url"-->
    <!--      >-->
    <!--        {{ link.title }}-->
    <!--      </v-btn>-->

    <!--      <v-btn icon v-if="!$vuetify.theme.dark" @click="toggleTheme()">-->
    <!--        <v-icon class="mr-1" color="blue-grey darken-4">mdi-lightbulb</v-icon>-->
    <!--      </v-btn>-->
    <!--      <v-btn icon v-if="$vuetify.theme.dark" @click="toggleTheme()">-->
    <!--        <v-icon color="yellow darken-3">mdi-lightbulb-outline</v-icon>-->
    <!--      </v-btn>-->

    <!--    </v-app-bar>-->
    <Sidebar/>

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
import Search from '@/components/Header/Search'
import Sidebar from '@/components/layout/Sidebar'

export default {
  name: 'App',
  components: {
    // Search
    Sidebar,
  },
  data() {
    return {
      links: [
        {title: 'خانه', url: '/'},
        {title: 'خروج', url: '/logout', color: 'red'},
      ],
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user,
      requestQueueLength: state => state.httpRequestQueue,
    }),
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      hasHttpRequestWaiting: 'hasHttpRequestWaiting',
    }),
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
  mounted() {
    console.log(this.$t('general.routes.home'))
  },
}
</script>
