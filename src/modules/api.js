const api = process.env.VUE_APP_API_URL

export default {
  userProfile: 'users/profile/',

  brands: 'products/brands/',
  actualProducts: 'products/actual-products/',
  products: 'products/products/',
  productTypes: 'products/products-types/',
  productTypeSelectors: 'products/product-type-selectors/',
  productTypeSelectorValues: 'products/product-type-selector-values/',
  variants: 'products/variants/',

  invoices: 'products/invoices/',
  invoiceItems: 'products/invoice-items/',

  actualProductVariants: 'products/actual-product-variants/',
  updateVariantData: 'products/update-variant-data/',
  updateVariantStatus: 'products/update-variant-status/',
  updateVariantPriceMin: 'products/update-variant-price-min/',
  invoiceExcel: 'products/invoice-excel/',

  costs: 'accounting/costs/',
  costTypes: 'accounting/cost-types/',
}
