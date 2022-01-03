<template>
  <v-card>
    <v-card-title>
      {{ $t('general.routes.variants') }}
    </v-card-title>
    <v-card-text>
      <v-data-table
          v-if="variants.length"
          dense
          :headers="headers"
          :items="variants"
          item-key="name"
          class="elevation-1"
      >

        <template v-slot:item.is_active="{ item }">
          <v-icon
              v-if="item.is_active"
              right
              small
              color="green"
          >
            mdi-checkbox-marked-circle
          </v-icon>
          <v-icon
              v-else
              right
              small
              color="red"
          >
            mdi-cancel
          </v-icon>
        </template>

        <template v-slot:item.price_min="{ item }">
          {{item.price_min | price}}
        </template>

      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'List',
  data() {
    return {
      variants: [],
      // headers:['dkpc','has_competition','id','is_active','price_min'],
      headers: [
        {
          text: 'DKPC',
          value: 'dkpc',
        },
        {text: 'Has Competition', value: 'has_competition'},
        {text: 'Active', value: 'is_active'},
        {text: 'Price Min', value: 'price_min'},
      ],
    }
  },
  computed: {
    ...mapState({
      globalCardClass: 'globalCardClass',
    }),
  },
  created() {
    this.axios.get('products/variants/')
        .then(res => {
          console.log('variants', res)
          this.variants = res.data
        })
  },
}
</script>

<style scoped>

</style>