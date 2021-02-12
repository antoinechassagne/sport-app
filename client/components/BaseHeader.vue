<template>
  <header>
    <nav class="p-4">
      <ul class="flex flex-row">
        <li v-for="(entry, index) in menu" :key="index" class="px-2">
          <RouteLink :path="entry.path">{{ entry.label }}</RouteLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    loggedUser: {
      type: Object,
    },
  },
  data() {
    return {
      commonEntries: [],
      privateEntries: [
        { label: "Sport App", path: "/" },
        { label: "Se déconnecter", path: "/logout" },
      ],
      publicEntries: [
        { label: "Se connecter", path: "/login" },
        { label: "S'inscrire", path: "/register" },
      ],
    };
  },
  computed: {
    menu() {
      return this.loggedUser
        ? [...this.commonEntries, ...this.privateEntries]
        : [...this.commonEntries, ...this.publicEntries];
    },
  },
};
</script>
