<template>
  <fragment>
    <BaseHeader :loggedUser="loggedUser" />
    <main class="container mx-auto">
      <Nuxt />
    </main>
  </fragment>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import BaseHeader from "@/components/BaseHeader";
export default {
  name: "DefaultLayout",
  components: {
    BaseHeader,
  },
  computed: {
    ...mapGetters({
      loggedUser: "authentication/loggedUser",
    }),
  },
  methods: {
    ...mapActions({
      fetchLoggedUser: "authentication/fetchLoggedUser",
    }),
  },
  created() {
    this.fetchLoggedUser().catch(() => {
      this.$router.push("/login");
    });
  },
};
</script>
