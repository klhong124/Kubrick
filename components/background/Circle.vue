<template>
  <div class="absolute" ref="circle">
    <svg viewBox="0 0 100 100" fill="#14f279">
      <circle cx="50" cy="50" r="50" />
    </svg>
  </div>
</template>

<script>
export default {
  props: ['speed'],
  mounted() {
    window.addEventListener('mousemove', ({ clientX, clientY }) => {
      let x =
        ((clientX - window.innerWidth / 2) / window.innerWidth) *
        2 *
        -this.speed
      let y =
        ((window.innerHeight / 2 - clientY) / window.innerHeight) *
        2 *
        this.speed

      this.$refs['circle'].style.margin =`${y}px ${-x}px 0 ${x}px`
    })
  },
}
</script>
