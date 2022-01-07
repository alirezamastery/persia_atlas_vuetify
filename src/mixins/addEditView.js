export const AddEditViewMixin = {
  methods: {
    createNewTitle(i18Path) {
      return this.$t('general.createANew').replace('{0}', this.$t(i18Path))
    },
  },
}

