<template>
  <v-card outlined>
    <v-card-title>
      {{ variant.product.title }}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row class="align-center">
          <v-col lg="2" sm="12">
            {{ variant.selector_values[0].value }}
          </v-col>
          <v-divider
              class="mx-4"
              inset
              vertical
          />
          <v-col lg="2" sm="12">
            {{ variant.dkpc }}
          </v-col>
          <v-divider
              class="mx-4"
              inset
              vertical
          />
          <v-col lg="2" sm="12">
            <v-switch
                v-model="isActive"
                :label="$t('products.activeInDigi')"
            >
            </v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col lg="1" sm="12">
            <v-text-field
                :label="$t('products.ordered')"
                :value="variant.reserved"
                disabled
            />
          </v-col>
          <v-col lg="1" sm="12">
            <v-text-field
                :label="$t('products.inDigiStock')"
                :value="variant.warehouse_stock"
                disabled
            />
          </v-col>
        </v-row>

        <v-row class="align-center">
          <v-col lg="1" sm="12">
            <v-text-field
                :label="$t('products.price')"
                :value="variant.price"
            />
          </v-col>
          <v-col lg="1" sm="12">
            <v-text-field
                :label="$t('products.inventory')"
                :value="variant.our_stock"
            />
          </v-col>
          <v-col lg="2" sm="12">
            <v-btn
                small
                color="success"
                class="mx-1"
            >
              {{ $t('general.submit') }}
            </v-btn>
            <v-btn
                small
                color="red"
                class="mx-1"
            >
              {{ $t('general.iMadeMistake') }}
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="align-center">
          <v-col lg="2" sm="12">
            <v-text-field
                :label="$t('products.priceMin')"
                :value="variant.price_min"
            />
          </v-col>
          <v-col lg="2" sm="12">
            <v-btn
                small
                color="success"
                class="mx-1"
            >
              {{ $t('general.submit') }}
            </v-btn>
            <v-btn
                small
                color="red"
                class="mx-1"
            >
              {{ $t('general.iMadeMistake') }}
            </v-btn>
          </v-col>

          <v-col lg="6" sm="12" class="flex-row-reverse">
            <v-switch
                :label="$t('products.robotActive')"
                :value="variant.is_active"
            />
          </v-col>

        </v-row>

      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'VariantDetails',
  props: ['variant'],
  data() {
    return {
      isActive: this.variant.product.is_active,
      loadingDigiStatus: false,
    }
  },
}
</script>

<style scoped>

</style>