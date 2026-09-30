<template>
  <v-menu offset-y bottom left>
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" :aria-label="$t('nav.language')" v-on="on">
        <img v-if="currentLocale.name ==='English'" src="../static/svg/En_lang.svg" alt="Language Flag" width="30" height="30">
        <img v-else src="../static/svg/La_lang.svg" alt="Language Flag" width="30" height="30">
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        :input-value="locale.code === $i18n.locale"
        @click="switchLocale(locale.code)"
      >
        <v-list-item-title>{{ locale.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "LanguageSwitcher",
  computed: {
    availableLocales() {
      return this.$i18n.locales;
    },
    currentLocale() {
      return (
        this.availableLocales.find((l) => l.code === this.$i18n.locale) ||
        this.availableLocales[0]
      );
    },
  },
  methods: {
    async switchLocale(code) {
      if (code === this.$i18n.locale) return;
      await this.$i18n.setLocale(code);
    },
  },
};
</script>
