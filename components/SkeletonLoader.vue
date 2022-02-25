<template>
  <div class="flex animate-pulse flex-row space-x-5 mt-4">
    <div class="flex flex-col space-y-3">
      <div v-for="i in 5" :key="i">
        <div
          ref="bar"
          class="w-0 bg-[#4973ff] h-3 rounded-md transition-width duration-500 ease"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    //  animation timeline in when page is loaded
    this.$refs['bar'].forEach((a) => {
      a.style.width = 0
    })
    await this.sleep(300)
    this.$refs['bar'][0].style.width = '16rem'
    this.$refs['bar'][1].style.width = '8rem'
    this.$refs['bar'][2].style.width = '12rem'
    this.$refs['bar'][3].style.width = '18rem'
    this.$refs['bar'][4].style.width = '13rem'
  },
  methods: {
    sleep: async (ms) => {
      await new Promise((r) => setTimeout(r, ms))
    },
  },
}
</script>
