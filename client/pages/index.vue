<template>
  <fragment>
    <Heading level="1">{{ welcomeMessage }}</Heading>
  </fragment>
</template>

<script>
import { mapGetters } from "vuex";
import Heading from "@/components/texts/Heading";

export default {
  name: "PageHome",
  middleware: ["authenticated"],
  components: {
    Heading,
  },
  computed: {
    ...mapGetters({
      loggedUser: "authentication/loggedUser",
    }),
    welcomeMessage() {
      return `Bonjour ${this.loggedUser.firstName} ${this.loggedUser.lastName}`;
    },
  },
};
</script>
