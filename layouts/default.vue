<template>
  <div class="container mx-auto p-4" :class="{ dark: dark_mode }">
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dark_mode: false,
    }
  },
}
</script>
