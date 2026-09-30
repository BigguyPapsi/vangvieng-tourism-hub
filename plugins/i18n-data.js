// Translates values that live in data files instead of locale files,
// e.g. { lo: "ເກີບ", en: "Shoes" } -> the string for the active locale.
export default function ({ app }, inject) {
  inject("tData", (value) => {
    if (value === null || typeof value !== "object") {
      return value;
    }
    return (
      value[app.i18n.locale] ?? value[app.i18n.fallbackLocale] ?? ""
    );
  });
}
