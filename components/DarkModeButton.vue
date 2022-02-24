<template>
  <div class="flex items-center justify-center mb-12">
    <label for="dark_mode" class="flex items-center cursor-pointer">
      <!-- toggle -->
      <div class="relative">
        <!-- input -->
        <input
          id="dark_mode"
          type="checkbox"
          class="sr-only"
          :checked="dark_mode"
          @change="setDarkMode($event.target.checked)"
        />
        <!-- line -->
        <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
        <!-- dot -->
        <div
          class="dot absolute w-6 h-6 bg-gray-100 rounded-full shadow-md -left-1 -top-1 transition"
        ></div>
      </div>
      <!-- label -->
      <div class="ml-3 text-gray-700 font-medium dark:text-white">
        Dark Mode
      </div>
    </label>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
// dark mode state in vuex
export default {
  computed: {
    ...mapState(['dark_mode']),
  },
  methods: {
    ...mapMutations(['setDarkMode']),
  },
}
</script>

<style>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #48bb78;
}
</style>
