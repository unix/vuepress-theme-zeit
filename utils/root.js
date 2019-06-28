import Vue from 'vue'

export default {
  async mounted() {
    const zeit = await import('@zeit-ui/vue')
    zeit.install(Vue)
    this.$forceUpdate()
  },
}
