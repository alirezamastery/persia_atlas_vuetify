<template>
  <v-card flat>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="100"
          item-key="id"
          class="elevation-1"
          dense
          multi-sort
      >
        <!-- Customize table header START -->
        <template v-slot:top>
          <ListViewTableHeader
              :title="$t('general.routes.productTypeSelectorValues')"
              :api-root="apiRoot"
              :add-route="addRoute"
              v-on:search-result="items = $event"
              :show-create-btn="false"
          />
        </template>
        <!-- Customize table header END -->

        <!-- Customize how each row is displayed START -->
        <template v-slot:item.digikala_id="{ item }">
          <v-btn text :to="{name: editRoute, params: {id: item.id}}">
            {{ item.digikala_id }}
          </v-btn>
        </template>

        <template v-slot:item.value="{ item }">
          {{ item.value }}
        </template>

        <template v-slot:item.selector="{ item }">
          {{ item.selector.title }}
        </template>
        <!-- Customize how each row is displayed END -->

        <template v-slot:no-data>
          {{ $t('general.noItemsFound') }}
        </template>

      </v-data-table>

    </v-card-text>
  </v-card>
</template>

<script>
import {listViewMixin} from '@/modules/mixins'
import ListViewTableHeader from '@/components/general/ListViewTableHeader'

export default {
  name: 'List',
  components: {
    ListViewTableHeader,
  },
  mixins: [listViewMixin],
  data() {
    return {
      apiRoot: this.$api.productTypeSelectorValues,
      editRoute: 'productTypeSelectorValueEdit',
      addRoute: 'productTypeSelectorValueAdd',
      headers: [
        {text: this.$t('general.digikalaId'), value: 'digikala_id', sortable: true},
        {text: this.$t('general.value'), value: 'value'},
        {text: this.$t('products.selector'), value: 'selector'},
      ],
    }
  },
}
</script>

<style scoped>

</style>