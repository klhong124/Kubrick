<template>
  <v-app>
    <div class="container mx-auto p-4" :class="{ dark: dark_mode }">
      <nuxt />
    </div>
  </v-app>
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
