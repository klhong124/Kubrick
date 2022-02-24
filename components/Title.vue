<template>
  <h1 class="text-4xl sm:text-5xl md:text-6xl  text-[#14f279] font-serif leading-normal sm:leading-relaxed md:leading-relaxed ">
    <span v-for="(line, i) in lines" :key="i">
      <div class="overflow-hidden relative w-[700px]" :class="{ 'ml-12 sm:ml-24': i % 2 }">
        <span ref="boarder" class="boarder border-l-[1px] transition duration-500 ease-out"></span>
        <span
          ref="line"
          class="absolute -translate-x-full transition duration-[1500ms] ease-out"
        >
          {{ i != lines.length - 1 ? `${line} -` : line }}
        </span>
      </div>
    </span>
  </h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
  computed: {
    lines: (app) => {
      return app.title.split('|')
    },
  },
  async mounted() {
    this.$refs['line'][0].style.transform = 'translateX(0px)'
    await this.sleep(1000)
    this.$refs['line'][1].style.transform = 'translateX(0px)'
    await this.sleep(1000)
    this.$refs['line'][2].style.transform = 'translateX(0px)'
    await this.sleep(1000)
    this.$refs['boarder'][0].style.opacity = 0
    this.$refs['boarder'][1].style.opacity = 0
    this.$refs['boarder'][2].style.opacity = 0
  },
  methods:{
      sleep:async (ms)=>{
          await new Promise(r => setTimeout(r, ms));
      }
  }

}
</script>
