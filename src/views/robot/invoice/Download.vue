<template>
  <v-card>
    <v-card-title>{{ $t('general.routes.invoices') }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="8" md="5" lg="3">
          <v-btn color="primary" @click="getReport">{{ $t('robot.getReport') }}</v-btn>
        </v-col>
      </v-row>
<!--      <v-row>-->
<!--        <v-col cols="12" sm="8" md="5" lg="3">-->
<!--          <v-btn color="success" v-show="downloadPath">{{ $t('general.download') }}</v-btn>-->
<!--        </v-col>-->
<!--      </v-row>-->
      <a :href="downloadPath" id="downloadLink" style="display: none"/>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Download',
  data() {
    return {
      downloadPath: null,
    }
  },
  methods: {
    getReport() {
      this.axios.get( this.$api.invoiceExcel)
          .then(res => {
            console.log('invoice', res)
            this.downloadPath = process.env.VUE_APP_SERVER_BASE_URL + '/' +  res.data.path
            console.log('path' , this.downloadPath)
            // console.log(this.$refs.downloadLink)
            // this.$refs.downloadLink.click()
            const link = document.getElementById('downloadLink')
            link.href = this.downloadPath
            link.click()
          })
          .catch(err => {
            this.addSnackbar('red', err.response)
          })
    },
  },
}
</script>

<style scoped>

</style>