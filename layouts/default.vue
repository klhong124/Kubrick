<template>
  <div :class="{ dark: dark_mode }">
    <div class="background">

    <div class="overflow-x-hidden absolute w-full h-screen">
      <BackgroundCircle :speed="25" class="w-1/3 left-10 top-1/3 blur opacity-10" />
      <BackgroundCircle :speed="10" class="w-1/5 right-10 top-2/5 blur opacity-10" />
    </div>
    <div class="absolute z-10 w-full h-full">
    <div class="container mx-auto px-4 sm:py-24 py-8 ">
      <nuxt />
    </div>
    </div>
  </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['dark_mode']),
  },

}
</script>
