<script>
export default {
    created() {
      this.$auth0.loginWithRedirect();
    }
  };
</script>
