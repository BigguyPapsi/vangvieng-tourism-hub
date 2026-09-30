<template>
  <v-app dark>
    <v-app-bar app flat height="70" class="app-bar">
      <!-- Brand -->
      <NuxtLink to="/" class="brand">
        <img
          src="../static/svg/Vangvieng-logo.svg"
          alt="Vangvieng Logo"
          width="50"
          height="50"
        />
        <div class="brand__text">
          <div class="text_gradient">
            <h2>Vangvieng</h2>
          </div>
          <div class="text_subtitle">
            <span>{{ $t("app.title") }}</span>
          </div>
        </div>
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav ref="nav" class="nav ml-5 d-none d-md-flex">
        <span
          class="nav__pill"
          :class="{ 'nav__pill--animated': pill.animated }"
          :style="pillStyle"
        />
        <NuxtLink
          v-for="item in items"
          :key="item.href"
          :to="item.href"
          class="nav__link"
          :class="{ 'nav__link--active': isActive(item.href) }"
        >
          <v-icon small class="nav__icon">{{ item.icon }}</v-icon>
          <span>{{ item.name[$i18n.locale] }}</span>
        </NuxtLink>
      </nav>

      <v-spacer />

      <LanguageSwitcher />

      <!-- Hamburger (mobile / tablet) -->
      <v-app-bar-nav-icon
        class="d-md-none"
        :aria-label="$t('nav.menu')"
        @click="drawer = !drawer"
      />
    </v-app-bar>

    <!-- Mobile navigation drawer -->
    <v-navigation-drawer v-model="drawer" app right temporary width="280">
      <v-list nav dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="item.href"
          :to="item.href"
          class="drawer__link"
          :class="{ 'drawer__link--active': isActive(item.href) }"
          :style="{ animationDelay: drawer ? i * 45 + 'ms' : '0ms' }"
          @click="drawer = false"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name[$i18n.locale] }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div>
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import nav from "~/data/allData.json";
export default {
  name: "DefaultLayout",
  data() {
    return {
      items: nav.navigations,
      drawer: false,
      pill: { left: 0, top: 0, width: 0, height: 0, animated: false },
    };
  },
  computed: {
    pillStyle() {
      return {
        transform: "translateX(" + this.pill.left + "px)",
        top: this.pill.top + "px",
        width: this.pill.width + "px",
        height: this.pill.height + "px",
        opacity: this.pill.width ? 1 : 0,
      };
    },
  },
  watch: {
    $route() {
      this.$nextTick(this.movePill);
    },
    "$i18n.locale"() {
      this.$nextTick(this.movePill);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.movePill();
      // enable the sliding transition only after the first placement
      window.requestAnimationFrame(() => {
        this.pill.animated = true;
      });
    });
    window.addEventListener("resize", this.movePill);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(this.movePill).catch(() => {});
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.movePill);
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    };
  },
  methods: {
    movePill() {
      const navEl = this.$refs.nav;
      if (!navEl) return;
      const links = navEl.querySelectorAll(".nav__link");
      const index = this.items.findIndex((item) => this.isActive(item.href));
      const target = index === -1 ? null : links[index];
      // hidden (mobile) or route not in the menu -> hide the pill
      if (!target || !target.offsetWidth) {
        this.pill.width = 0;
        return;
      }
      this.pill.left = target.offsetLeft;
      this.pill.top = target.offsetTop;
      this.pill.width = target.offsetWidth;
      this.pill.height = target.offsetHeight;
    },
    isActive(href) {
      const path = this.$route.path.replace(/\/+$/, "") || "/";
      if (href === "/") return path === "/";
      const target = href.replace(/\/+$/, "");
      return path === target || path.startsWith(target + "/");
    },
  },
};
</script>
<style scoped>
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex: 0 0 auto;
}
.text_gradient {
  background: #0b7828;
  background: linear-gradient(to right, #0b7828 0%, #0b7828 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.text_gradient h2 {
  margin: 0;
  line-height: 1.2;
}
.text_subtitle {
  color: #47454f;
  font-size: 11pt;
}

.nav {
  position: relative;
  align-items: center;
  gap: 8px;
}

/* the green pill that slides between menu items */
.nav__pill {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  background-color: #e6f4ea;
  pointer-events: none;
  z-index: 0;
}
.nav__pill--animated {
  transition: transform 0.38s cubic-bezier(0.34, 1.3, 0.64, 1),
    width 0.38s cubic-bezier(0.34, 1.3, 0.64, 1),
    top 0.38s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.2s ease;
}

.nav__link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  text-decoration: none;
  color: #47454f;
  font-weight: 700;
  white-space: nowrap;
  background-color: transparent;
  transition: color 0.25s ease, background-color 0.25s ease,
    transform 0.25s ease;
}
.nav__link .nav__icon {
  color: inherit;
  transition: transform 0.3s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.nav__link:hover {
  color: #0b7828;
}
.nav__link:not(.nav__link--active):hover {
  background-color: #eef7f0;
}
.nav__link:active {
  transform: scale(0.96);
}
.nav__link--active {
  color: #0b7828;
}
.nav__link--active .nav__icon {
  transform: translateY(-1px) scale(1.12);
}

@media (prefers-reduced-motion: reduce) {
  .nav__pill--animated,
  .nav__link,
  .nav__link .nav__icon {
    transition: none;
  }
}

/* Drawer: same green pill, never Vuetify blue */
.drawer__link {
  border-radius: 10px;
  transition: color 0.25s ease, background-color 0.25s ease;
  animation: drawer-in 0.32s cubic-bezier(0.34, 1.3, 0.64, 1) both;
}
@keyframes drawer-in {
  from {
    opacity: 0;
    transform: translateX(18px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.drawer__link--active {
  color: #0b7828 !important;
  background-color: #e6f4ea;
}
.drawer__link--active .v-icon,
.drawer__link--active .v-list-item__title {
  color: #0b7828 !important;
}
/* kill Vuetify default active overlay/ripple tint */
.drawer__link::before {
  background-color: #0b7828;
}
.drawer__link--active::before {
  opacity: 0;
}

</style>
