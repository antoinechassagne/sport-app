<template>
  <component :is="`h${level}`" class="font-bold" :class="levelClasses">
    <slot />
  </component>
</template>

<script>
export default {
  name: "Heading",
  props: {
    level: {
      type: String,
      required: true,
    },
  },
  computed: {
    levelClasses() {
      switch (this.level) {
        case "1":
          return "text-6xl";
        case "2":
          return "text-5xl";
        case "3":
          return "text-4xl";
        case "4":
          return "text-3xl";
        case "5":
          return "text-2xl";
        case "6":
          return "text-xl";
      }
    },
  },
};
</script>
