<template></template>
<script>
import { mapActions } from "vuex";
export default {
  name: "PageLogout",
  methods: {
    ...mapActions({
      logoutUser: "authentication/logoutUser",
    }),
  },
  created() {
    this.logoutUser().then(() => {
      this.$router.push("/login");
    });
  },
};
</script>
