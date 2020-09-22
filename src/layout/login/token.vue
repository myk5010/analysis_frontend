<script>
export default {
  created() {
    this.$router.replace({ path: '/' + this.$route.query.path })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
