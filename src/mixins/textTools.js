export const textToolsMixin = {
  methods: {
    fillTranslationString(sentence, payload) {
      return this.$t(sentence).replace('{0}', payload.toString())
    },
    fillTranslationI18Path(sentence, i18Path) {
      return this.$t(sentence).replace('{0}', this.$t(i18Path))
    },
    itemAction(sentence, itemType, item) {
      return this.$t(sentence)
          .replace('{0}', itemType)
          .replace('{1}', item.toString())
    },
    createNewTitle(i18Path) {
      return this.$t('general.createANew').replace('{0}', this.$t(i18Path))
    },
  },
}