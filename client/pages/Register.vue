<template>
  <fragment>
    <Heading level="1">S'inscrire</Heading>
  </fragment>
</template>

<script>
import Heading from "@/components/texts/Heading";

export default {
  name: "PageRegister",
  middleware: ["guest"],
  components: {
    Heading,
  },
};
</script>
