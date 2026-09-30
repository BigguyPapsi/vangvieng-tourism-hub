// Remembers the language the visitor picked, without letting the browser
// language override the Lao default on a first visit.
const COOKIE_KEY = "app_locale";
const ONE_YEAR = 60 * 60 * 24 * 365;

function readLocaleCookie() {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + COOKIE_KEY + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeLocaleCookie(locale) {
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(
    locale
  )}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}

export default async function ({ app }) {
  const i18n = app.i18n;

  i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    writeLocaleCookie(newLocale);
  };

  const saved = readLocaleCookie();
  if (saved && i18n.localeCodes.includes(saved) && saved !== i18n.locale) {
    await i18n.setLocale(saved);
  }
}
