<template>
  <NuxtLink :to="path" class="text-indigo-500 hover:underline">
    <slot />
  </NuxtLink>
</template>

<script>
export default {
  name: "RouteLink",
  props: {
    path: {
      type: String,
      required: true,
    },
  },
};
</script>
