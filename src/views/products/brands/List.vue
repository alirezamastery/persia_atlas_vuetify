<template>
  <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      item-key="name"
      show-select
      multi-sort
      class="elevation-1"
  >
  </v-data-table>
</template>

<script>
export default {
  name: "List",
  data () {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts:[],
    }
  },
  created() {
    this.axios.get(this.$api.variants)
        .then(res => {
          console.log('main items', res)
          this.desserts = res.data
        })
        .catch(err => {
          console.log('main items error', err)
        })
  }
}
</script>

<style scoped>

</style>