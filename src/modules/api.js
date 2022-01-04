const api = process.env.VUE_APP_API_URL

export default {
  products: api + 'products/products/',
  brands: api + 'products/brands/',
  actualProducts: api + 'products/actual-products/',
  variants: api + 'products/variants/',
  invoices: api + 'products/invoices/',
  invoiceItems: api + 'products/invoice-items/',

  actualProductVariants: api + 'products/actual-product-variants/',
  updateVariantData: api + 'products/update-variant-data/',
  updateVariantStatus: api + 'products/update-variant-status/',
  updateVariantPriceMin: api + 'products/update-variant-price-min/',
  invoiceExcel: api + 'products/invoice-excel/',
}
