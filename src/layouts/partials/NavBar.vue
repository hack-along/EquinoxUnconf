<template>
  <header class="header sticky top-0 bg-white">
    <div class="h-2 w-full bg-primary-500"></div>
    <nav class="flex items-center justify-between flex-wrap py-6 container">
      <!-- site title / logo -->
      <div class="flex items-center flex-no-shrink mr-6 h-10">
        <g-link
          class="text-accent-600 uppercase py-3 text-right font-bold"
          to="/"
          :title="$static.metadata.siteName"
        >
          Equinox 23/09/2022
          <!-- <g-image src="../../static/logo.svg" width="50" height="50" alt="logo" fit="outside" /> -->
        </g-link>
      </div>
      <!-- end site title / logo -->

      <!-- mobile navigation toggle -->
      <div class="block md:hidden">
        <button
          @click="toggle"
          class="nav-toggle"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <!-- end navigation toggle -->

      <!-- Navigation Links-->

      <scrollactive
        :class="open ? 'block': 'hidden'"
        class="w-full md:flex md:items-center md:w-auto flex-grow md:flex-grow-0"
        active-class="active"
        :offset="120"
        :duration="100"
        bezier-easing-value="0,0,.58,1"
      >
        <router-link
          to="/#unconference"
          class="nav-link scrollactive-item"
        >unconference</router-link>
        <router-link
          to="/#teach"
          class="nav-link scrollactive-item"
        >teach</router-link>
        <router-link
          to="/#learn"
          class="nav-link scrollactive-item"
        >learn</router-link>
        <router-link
          to="/#share"
          class="nav-link scrollactive-item"
        >share</router-link>
        <g-link
          to="/#FAQ"
          class="nav-link scrollactive-item"
        >FAQ</g-link>
        <g-link
          to="/2020-autumn"
          class="nav-link scrollactive-item"
        >2020</g-link>

      </scrollactive>

      <!-- End navigation Links-->
    </nav>
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  .nav-toggle {
    @apply flex items-center px-3 py-2 text-primary-500;
    &:hover {
      @apply text-primary-400;
    }
  }
  .nav-link {
    display: block;
    @apply text-primary-900 uppercase py-3 text-right font-bold;
    @screen sm {
      @apply flex px-3 py-0 whitespace-no-wrap text-left;
    }
    &:hover,
    &:focus,
    &.active {
      @apply text-accent-600;
    }
  }
}
</style>
